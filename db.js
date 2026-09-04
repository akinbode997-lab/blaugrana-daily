// db.js — MongoDB connection + all data models (Mongoose).
// Data now lives in MongoDB Atlas (free tier, never expires) instead of a
// local file — this is what makes comments/articles/signups survive
// restarts and redeploys on a free host.
//
// You MUST set MONGODB_URI as an environment variable before starting the
// server. See README.md for how to get a free connection string from
// MongoDB Atlas (takes about 5 minutes, no card required).

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('----------------------------------------------------');
  console.error('MONGODB_URI is not set. The app cannot start without it.');
  console.error('See README.md for how to get a free MongoDB Atlas connection string.');
  console.error('----------------------------------------------------');
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => { console.error('MongoDB connection failed:', err.message); process.exit(1); });

// ---------- Schemas ----------

const AdminSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password_hash: { type: String, required: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: false } });

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, unique: true, sparse: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password_hash: { type: String, required: true },
  profile_pic_url: { type: String, default: '' },
}, { timestamps: { createdAt: 'created_at', updatedAt: false } });

const PostSchema = new mongoose.Schema({
  type: { type: String, required: true }, // 'article' | 'matchreport' | 'clip' | 'banter'
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  excerpt: { type: String, default: '' },
  tag: { type: String, default: '' },
  tag_label: { type: String, default: '' },
  read_time: { type: String, default: '' },
  body: { type: String, default: '' },
  image_url: { type: String, default: '' },
  video_url: { type: String, default: '' },
  embed_url: { type: String, default: '' },
  source_url: { type: String, default: '' },
  source_label: { type: String, default: '' },
}, { timestamps: { createdAt: 'created_at', updatedAt: false } });

const CommentSchema = new mongoose.Schema({
  post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  name: { type: String, required: true },
  comment: { type: String, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
}, { timestamps: { createdAt: 'created_at', updatedAt: false } });

const MessageSchema = new mongoose.Schema({
  name: String, email: String, message: String,
}, { timestamps: { createdAt: 'created_at', updatedAt: false } });

const SubscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: false } });

const SupporterSchema = new mongoose.Schema({
  email: String,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  amount_naira: Number,
  reference: String,
}, { timestamps: { createdAt: 'created_at', updatedAt: false } });

const SettingsSchema = new mongoose.Schema({
  site_name: { type: String, default: 'Blaugrana Daily' },
  tagline: { type: String, default: 'Barça — the history, the present, and what comes next.' },
  logo_url: { type: String, default: '' },
  hero_media_url: { type: String, default: '' },
  hero_media_type: { type: String, default: 'image' },
  contact_email: { type: String, default: 'youremail@example.com' },
  contact_phone: { type: String, default: '+234 000 000 0000' },
  whatsapp_number: { type: String, default: '' },
  facebook_url: { type: String, default: 'https://facebook.com/' },
  tiktok_url: { type: String, default: 'https://www.tiktok.com/' },
  instagram_url: { type: String, default: '' },
  twitter_url: { type: String, default: '' },
  youtube_url: { type: String, default: '' },
  paystack_public_key: { type: String, default: '' },
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Post = mongoose.model('Post', PostSchema);
const Comment = mongoose.model('Comment', CommentSchema);
const Message = mongoose.model('Message', MessageSchema);
const Subscriber = mongoose.model('Subscriber', SubscriberSchema);
const Supporter = mongoose.model('Supporter', SupporterSchema);
const Settings = mongoose.model('Settings', SettingsSchema);

// ---------- Tier calculation (used by profile + admin) ----------
function tierFor(totalNaira) {
  if (totalNaira >= 50000) return { name: 'Crown', icon: '👑' };
  if (totalNaira >= 15000) return { name: 'Medal', icon: '🏅' };
  if (totalNaira >= 2000) return { name: 'Star', icon: '⭐' };
  return { name: 'Supporter', icon: '🎽' };
}

// ---------- First-run setup ----------
async function seed() {
  const adminCount = await Admin.countDocuments();
  if (adminCount === 0) {
    const hash = bcrypt.hashSync('changeme123', 10);
    await Admin.create({ username: 'bode', password_hash: hash });
    console.log('----------------------------------------------------');
    console.log('Default admin created:');
    console.log('  username: bode');
    console.log('  password: changeme123');
    console.log('Log in at /admin.html (hidden link — see README) and change this immediately.');
    console.log('----------------------------------------------------');
  }

  const settingsCount = await Settings.countDocuments();
  if (settingsCount === 0) {
    await Settings.create({});
    console.log('Default settings created.');
  }

  const postCount = await Post.countDocuments();
  if (postCount === 0) {
    const seedPosts = require('./seed-posts')();
    await Post.insertMany(seedPosts);
    console.log(`Seeded ${seedPosts.length} posts.`);
  }
}

module.exports = { mongoose, Admin, User, Post, Comment, Message, Subscriber, Supporter, Settings, tierFor, seed };
