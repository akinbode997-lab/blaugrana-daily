const express = require('express');
const { Message, Subscriber } = require('../db');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ error: 'Name, email, and message are required' });
  await Message.create({ name, email, message });
  res.status(201).json({ ok: true });
});

router.get('/messages', requireAuth, async (req, res) => {
  res.json(await Message.find().sort({ created_at: -1 }));
});

router.delete('/messages/:id', requireAuth, async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

router.post('/newsletter', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });
  const existing = await Subscriber.findOne({ email: email.toLowerCase() });
  if (existing) return res.status(200).json({ ok: true, note: 'Already subscribed' });
  await Subscriber.create({ email: email.toLowerCase() });
  res.status(201).json({ ok: true });
});

router.get('/subscribers', requireAuth, async (req, res) => {
  res.json(await Subscriber.find().sort({ created_at: -1 }));
});

router.delete('/subscribers/:id', requireAuth, async (req, res) => {
  await Subscriber.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
