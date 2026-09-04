const express = require('express');
const { Comment } = require('../db');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// GET /api/comments?post_id=...  (public) — works for articles, clips, banter, match reports
router.get('/', async (req, res) => {
  try {
    const { post_id } = req.query;
    const filter = {};
    if (post_id) filter.post_id = post_id;
    const comments = await Comment.find(filter).sort({ created_at: 1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Could not load comments' });
  }
});

// POST /api/comments  (public — logged-in users get their name attached automatically)
router.post('/', async (req, res) => {
  try {
    const { post_id, comment } = req.body;
    let { name } = req.body;
    if (!post_id || !comment || !comment.trim()) {
      return res.status(400).json({ error: 'A comment is required' });
    }
    let user_id = null;
    if (req.session && req.session.userId) {
      name = req.session.userName;
      user_id = req.session.userId;
    }
    if (!name || !name.trim()) name = 'Guest';

    const entry = await Comment.create({ post_id, name, comment: comment.trim(), user_id });
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ error: 'Could not post comment' });
  }
});

// DELETE /api/comments/:id  (admin only — moderation)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Could not delete comment' });
  }
});

module.exports = router;
