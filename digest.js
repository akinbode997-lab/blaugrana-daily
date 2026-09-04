// digest.js — sends a daily email to every subscriber with the newest posts.
// Needs EMAIL_USER + EMAIL_PASS (or an equivalent SMTP service) set as
// environment variables — see README for how to get these for free.

const nodemailer = require('nodemailer');
const { Post, Subscriber } = require('./db');

function getTransporter() {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return null;
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp-relay.brevo.com',
    port: Number(process.env.EMAIL_PORT) || 587,
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });
}

async function sendDailyDigest() {
  const transporter = getTransporter();
  if (!transporter) {
    console.log('Digest skipped: EMAIL_USER/EMAIL_PASS not set.');
    return { sent: 0, skipped: true };
  }

  const since = new Date(Date.now() - 24 * 3600 * 1000);
  const posts = await Post.find({ type: 'article', created_at: { $gte: since } }).sort({ created_at: -1 });
  if (posts.length === 0) {
    console.log('Digest skipped: no new articles in the last 24 hours.');
    return { sent: 0, skipped: true };
  }

  const subscribers = await Subscriber.find();
  const listHtml = posts.map(p => `<li><a href="https://YOUR-DOMAIN-HERE/article.html?slug=${p.slug}">${p.title}</a></li>`).join('');
  const html = `<h2>Today on Blaugrana Daily</h2><ul>${listHtml}</ul><p style="color:#888;font-size:12px;">You're receiving this because you subscribed at Blaugrana Daily.</p>`;

  for (const sub of subscribers) {
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: sub.email,
        subject: `Blaugrana Daily — ${posts.length} new ${posts.length === 1 ? 'story' : 'stories'} today`,
        html,
      });
    } catch (err) {
      console.error(`Failed to email ${sub.email}:`, err.message);
    }
  }
  console.log(`Digest sent to ${subscribers.length} subscribers.`);
  return { sent: subscribers.length, skipped: false };
}

module.exports = { sendDailyDigest };
