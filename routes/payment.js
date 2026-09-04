const express = require('express');
const { Supporter, tierFor } = require('../db');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();
const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY || '';

router.post('/initialize', async (req, res) => {
  if (!PAYSTACK_SECRET) {
    return res.status(500).json({ error: 'Payments are not configured yet. Add PAYSTACK_SECRET_KEY — see README.' });
  }
  const { email, amount_naira, tier } = req.body;
  if (!email || !amount_naira) return res.status(400).json({ error: 'Email and amount are required' });
  try {
    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: { Authorization: `Bearer ${PAYSTACK_SECRET}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        amount: Math.round(Number(amount_naira) * 100),
        metadata: { tier: tier || 'supporter', user_id: req.session && req.session.userId ? req.session.userId : null },
        callback_url: `${req.protocol}://${req.get('host')}/support.html?paid=1`,
      }),
    });
    const json = await response.json();
    if (!json.status) return res.status(400).json({ error: json.message || 'Could not start payment' });
    res.json({ authorization_url: json.data.authorization_url, reference: json.data.reference });
  } catch (err) {
    res.status(500).json({ error: 'Payment provider unreachable' });
  }
});

router.get('/verify/:reference', async (req, res) => {
  if (!PAYSTACK_SECRET) return res.status(500).json({ error: 'Payments are not configured yet.' });
  try {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${req.params.reference}`, {
      headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` },
    });
    const json = await response.json();
    const success = json.status && json.data && json.data.status === 'success';
    if (success) {
      const meta = json.data.metadata || {};
      await Supporter.create({
        email: json.data.customer.email,
        user_id: meta.user_id || null,
        amount_naira: json.data.amount / 100,
        reference: req.params.reference,
      });
    }
    res.json({ success });
  } catch (err) {
    res.status(500).json({ error: 'Could not verify payment' });
  }
});

router.get('/supporters', requireAuth, async (req, res) => {
  const supporters = await Supporter.find().sort({ created_at: -1 });
  res.json(supporters.map(s => ({ ...s.toObject(), tier: tierFor(s.amount_naira) })));
});

module.exports = router;
