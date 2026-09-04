const express = require('express');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcryptjs');
const { Admin, User } = require('../db');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'public', 'uploads')),
  filename: (req, file, cb) => cb(null, `avatar-${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`),
});
const upload = multer({ storage, limits: { fileSize: 4 * 1024 * 1024 } });

// ===== ADMIN AUTH =====

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
  const admin = await Admin.findOne({ username });
  if (!admin || !bcrypt.compareSync(password, admin.password_hash)) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
  req.session.adminId = admin._id.toString();
  req.session.username = admin.username;
  res.json({ ok: true, username: admin.username });
});

router.post('/logout', (req, res) => {
  req.session.adminId = null;
  res.json({ ok: true });
});

router.get('/me', (req, res) => {
  if (req.session && req.session.adminId) return res.json({ loggedIn: true, username: req.session.username });
  res.json({ loggedIn: false });
});

router.post('/change-password', requireAuth, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword || newPassword.length < 8) {
    return res.status(400).json({ error: 'New password must be at least 8 characters' });
  }
  const admin = await Admin.findById(req.session.adminId);
  if (!bcrypt.compareSync(currentPassword, admin.password_hash)) {
    return res.status(401).json({ error: 'Current password is incorrect' });
  }
  admin.password_hash = bcrypt.hashSync(newPassword, 10);
  await admin.save();
  res.json({ ok: true });
});

// Multiple admins: any logged-in admin can create another admin account.
router.post('/admins', requireAuth, async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password || password.length < 8) {
    return res.status(400).json({ error: 'Username and an 8+ character password are required' });
  }
  if (await Admin.findOne({ username })) {
    return res.status(400).json({ error: 'That username is already taken' });
  }
  await Admin.create({ username, password_hash: bcrypt.hashSync(password, 10) });
  res.status(201).json({ ok: true });
});

router.get('/admins', requireAuth, async (req, res) => {
  const admins = await Admin.find({}, 'username created_at');
  res.json(admins);
});

router.delete('/admins/:id', requireAuth, async (req, res) => {
  const count = await Admin.countDocuments();
  if (count <= 1) return res.status(400).json({ error: 'Cannot delete the last remaining admin' });
  await Admin.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

// ===== PUBLIC USER AUTH (readers — signup/login/comments/profile) =====

router.post('/signup', upload.single('avatar'), async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name || !email || !password || password.length < 6) {
      return res.status(400).json({ error: 'Name, email, and a password (6+ characters) are required' });
    }
    if (await User.findOne({ email: email.toLowerCase() })) {
      return res.status(400).json({ error: 'An account with that email already exists' });
    }
    if (username && await User.findOne({ username })) {
      return res.status(400).json({ error: 'That username is already taken' });
    }
    const user = await User.create({
      name, email: email.toLowerCase(),
      username: username || undefined,
      password_hash: bcrypt.hashSync(password, 10),
      profile_pic_url: req.file ? `/uploads/${req.file.filename}` : '',
    });
    req.session.userId = user._id.toString();
    req.session.userName = user.name;
    res.status(201).json({ ok: true, name: user.name });
  } catch (err) {
    res.status(500).json({ error: 'Could not create account' });
  }
});

router.post('/login-user', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  req.session.userId = user._id.toString();
  req.session.userName = user.name;
  res.json({ ok: true, name: user.name });
});

router.post('/logout-user', (req, res) => {
  req.session.userId = null;
  req.session.userName = null;
  res.json({ ok: true });
});

router.get('/me-user', (req, res) => {
  if (req.session && req.session.userId) return res.json({ loggedIn: true, name: req.session.userName });
  res.json({ loggedIn: false });
});

module.exports = router;
