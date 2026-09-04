const express = require('express');
const multer = require('multer');
const path = require('path');
const { Post, Comment } = require('../db');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'public', 'uploads')),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `img-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (/^image\/(png|jpe?g|webp|gif)$/.test(file.mimetype)) cb(null, true);
    else cb(new Error('Only image files are allowed'));
  },
});

function slugify(title) {
  return title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').slice(0, 60);
}

// GET /api/posts?type=article&tag=modern&page=1&perPage=9  (public)
router.get('/', async (req, res) => {
  try {
    const { type, tag } = req.query;
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const perPage = Math.max(1, parseInt(req.query.perPage) || 9);
    const filter = {};
    if (type) filter.type = type;
    if (tag && tag !== 'all') filter.tag = tag;

    const total = await Post.countDocuments(filter);
    const totalPages = Math.max(1, Math.ceil(total / perPage));
    const items = await Post.find(filter)
      .sort({ created_at: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.json({ items, total, page, perPage, totalPages });
  } catch (err) {
    res.status(500).json({ error: 'Could not load posts' });
  }
});

// GET /api/posts/:slug  (public)
router.get('/:slug', async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ error: 'Not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Could not load post' });
  }
});

// POST /api/posts  (admin only)
router.post('/', requireAuth, upload.single('image'), async (req, res) => {
  try {
    const { type, title, excerpt, tag, tag_label, read_time, body, video_url, embed_url, source_url, source_label } = req.body;
    if (!type || !title) return res.status(400).json({ error: 'Type and title are required' });

    let slug = slugify(title);
    if (await Post.findOne({ slug })) slug = `${slug}-${Date.now()}`;

    const post = await Post.create({
      type, slug, title,
      excerpt: excerpt || '', tag: tag || '', tag_label: tag_label || '',
      read_time: read_time || '', body: body || '',
      video_url: video_url || '', embed_url: embed_url || '',
      source_url: source_url || '', source_label: source_label || '',
      image_url: req.file ? `/uploads/${req.file.filename}` : (req.body.image_url || ''),
    });
    res.status(201).json({ id: post._id, slug: post.slug });
  } catch (err) {
    res.status(500).json({ error: 'Could not create post' });
  }
});

// PUT /api/posts/:id  (admin only)
router.put('/:id', requireAuth, upload.single('image'), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Not found' });

    const fields = ['title', 'excerpt', 'tag', 'tag_label', 'read_time', 'body', 'video_url', 'embed_url', 'type', 'source_url', 'source_label'];
    fields.forEach(f => { if (req.body[f] !== undefined && req.body[f] !== '') post[f] = req.body[f]; });
    if (req.file) post.image_url = `/uploads/${req.file.filename}`;
    else if (req.body.image_url) post.image_url = req.body.image_url;

    await post.save();
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Could not update post' });
  }
});

// DELETE /api/posts/:id  (admin only)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: 'Not found' });
    await Comment.deleteMany({ post_id: post._id });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Could not delete post' });
  }
});

module.exports = router;
