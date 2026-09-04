const express = require('express');
const multer = require('multer');
const path = require('path');
const { User, Supporter, tierFor } = require('../db');
const requireUser = require('../middleware/requireUser');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'public', 'uploads')),
  filename: (req, file, cb) => cb(null, `avatar-${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`),
});
const upload = multer({ storage, limits: { fileSize: 4 * 1024 * 1024 } });

// GET /api/profile  (the logged-in reader's own profile + payment history + tier)
router.get('/', requireUser, async (req, res) => {
  const user = await User.findById(req.session.userId);
  if (!user) return res.status(404).json({ error: 'Account not found' });

  const payments = await Supporter.find({ user_id: user._id }).sort({ created_at: -1 });
  const total = payments.reduce((sum, p) => sum + (p.amount_naira || 0), 0);
  const tier = tierFor(total);

  res.json({
    name: user.name, username: user.username, email: user.email,
    profile_pic_url: user.profile_pic_url, created_at: user.created_at,
    total_supported_naira: total, tier, payments,
  });
});

// PUT /api/profile  (update name/username + optional new profile picture)
router.put('/', requireUser, upload.single('avatar'), async (req, res) => {
  const user = await User.findById(req.session.userId);
  if (!user) return res.status(404).json({ error: 'Account not found' });

  if (req.body.name) user.name = req.body.name;
  if (req.body.username) {
    const existing = await User.findOne({ username: req.body.username });
    if (existing && existing._id.toString() !== user._id.toString()) {
      return res.status(400).json({ error: 'That username is already taken' });
    }
    user.username = req.body.username;
  }
  if (req.file) user.profile_pic_url = `/uploads/${req.file.filename}`;

  await user.save();
  req.session.userName = user.name;
  res.json({ ok: true });
});

module.exports = router;
