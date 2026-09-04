const express = require('express');
const multer = require('multer');
const path = require('path');
const { Settings } = require('../db');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'public', 'uploads')),
  filename: (req, file, cb) => cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`),
});
const upload = multer({ storage, limits: { fileSize: 8 * 1024 * 1024 } });

router.get('/', async (req, res) => {
  const settings = await Settings.findOne();
  res.json(settings || {});
});

router.put('/', requireAuth, upload.fields([{ name: 'logo' }, { name: 'hero_media' }]), async (req, res) => {
  const settings = await Settings.findOne();
  const allowed = [
    'site_name', 'tagline', 'contact_email', 'contact_phone', 'whatsapp_number',
    'facebook_url', 'tiktok_url', 'instagram_url', 'twitter_url', 'youtube_url',
    'hero_media_type', 'paystack_public_key',
  ];
  allowed.forEach(key => { if (req.body[key] !== undefined) settings[key] = req.body[key]; });
  if (req.files && req.files.logo && req.files.logo[0]) settings.logo_url = `/uploads/${req.files.logo[0].filename}`;
  if (req.files && req.files.hero_media && req.files.hero_media[0]) settings.hero_media_url = `/uploads/${req.files.hero_media[0].filename}`;
  await settings.save();
  res.json({ ok: true, settings });
});

module.exports = router;
