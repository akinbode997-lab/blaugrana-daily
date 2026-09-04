const express = require('express');
const session = require('express-session');
const path = require('path');
const cron = require('node-cron');

const db = require('./db');
const { sendDailyDigest } = require('./digest');

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');
const settingsRoutes = require('./routes/settings');
const contactRoutes = require('./routes/contact');
const paymentRoutes = require('./routes/payment');
const profileRoutes = require('./routes/profile');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'change-this-secret-before-deploying-anywhere-public',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true }
}));

app.use('/api', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api', contactRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/profile', profileRoutes);

// Manual/external-cron trigger for the daily digest — hit this once a day
// from a free service like cron-job.org, or rely on the built-in schedule
// below if your host keeps the process running continuously.
app.post('/api/send-digest', async (req, res) => {
  const result = await sendDailyDigest();
  res.json(result);
});

app.use(express.static(path.join(__dirname, 'public')));

db.seed().then(() => {
  app.listen(PORT, () => {
    console.log(`Blaugrana Daily running at http://localhost:${PORT}`);
  });

  // Runs at 08:00 server time every day, IF the process stays alive that long.
  // Free hosts that sleep when idle won't fire this reliably — use the
  // /api/send-digest endpoint with an external pinger (cron-job.org) instead.
  cron.schedule('0 8 * * *', () => {
    sendDailyDigest().catch(err => console.error('Digest failed:', err));
  });
});
