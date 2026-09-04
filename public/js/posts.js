// Fetches/renders posts (articles, match reports, clips, banter) and comments.
// Every post type supports comments — clips and banter included.

function sourceHTML(post) {
  if (!post.source_url) return '';
  return `<p style="margin-top:30px; font-size:.82rem; color:var(--paper-dim);">Source: <a href="${post.source_url}" target="_blank" rel="noopener" style="color:var(--gold);">${post.source_label || post.source_url}</a></p>`;
}

function cardHTML(post) {
  const img = post.image_url ? `<img class="card-img" src="${post.image_url}" alt="">` : '';
  return `
    <a href="article.html?slug=${encodeURIComponent(post.slug)}" class="card glass reveal in" data-tag="${post.tag}">
      ${img}
      <div class="card-body">
        <div class="meta"><span>${post.tag_label || ''}</span><span>·</span><span>${post.read_time || ''}</span></div>
        <h3>${post.title}</h3>
        <p>${post.excerpt || ''}</p>
        <span class="read-more">Read →</span>
      </div>
    </a>
  `;
}

function toEmbedUrl(url) {
  if (!url) return '';
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([\w-]+)/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  return url;
}

function clipCardHTML(post) {
  const embed = toEmbedUrl(post.video_url);
  const isVertical = /tiktok\.com/.test(post.video_url || '');
  return `
    <div class="card glass reveal in clip-card" data-tag="${post.tag}">
      ${embed ? `<iframe class="clip-embed ${isVertical ? 'vertical' : ''}" src="${embed}" allowfullscreen loading="lazy"></iframe>` : ''}
      <div class="card-body">
        <div class="meta"><span>${post.tag_label || ''}</span><span>·</span><span>${post.read_time || ''}</span></div>
        <h3>${post.title}</h3>
        <p>${post.excerpt || ''}</p>
        ${miniCommentsHTML(post._id)}
      </div>
    </div>
  `;
}

function banterCardHTML(post) {
  const tweetMatch = (post.embed_url || '').match(/(?:twitter|x)\.com\/[\w]+\/status\/(\d+)/);
  const content = tweetMatch
    ? `<blockquote class="twitter-tweet"><a href="${post.embed_url}"></a></blockquote>`
    : `<p style="color:var(--paper-dim); font-size:.94rem;">${post.body || post.excerpt || ''}</p>`;
  return `
    <div class="card glass reveal in banter-card">
      <div class="meta"><span>${post.tag_label || ''}</span></div>
      <h3 style="margin:10px 0;">${post.title}</h3>
      <div class="tweet-embed">${content}</div>
      ${miniCommentsHTML(post._id)}
    </div>
  `;
}

// A compact comment box used inline on clip/banter cards (not a full page).
function miniCommentsHTML(postId) {
  return `
    <div class="mini-comments" data-post-id="${postId}" style="margin-top:14px; border-top:1px solid var(--glass-border); padding-top:12px;">
      <button class="mini-comment-toggle" style="background:none;border:none;color:var(--gold);font-size:.82rem;cursor:pointer;">💬 Comments</button>
      <div class="mini-comment-body" style="display:none; margin-top:10px;">
        <div class="mini-comment-list" style="display:flex; flex-direction:column; gap:8px; margin-bottom:10px;"></div>
        <form class="mini-comment-form" style="display:flex; gap:8px;">
          <input type="text" class="mini-comment-name" placeholder="Name (optional)" style="flex:1; font-size:.82rem; padding:8px 10px;">
          <input type="text" class="mini-comment-text" placeholder="Say something..." required style="flex:2; font-size:.82rem; padding:8px 10px;">
          <button class="btn btn-primary" type="submit" style="padding:8px 14px; font-size:.8rem;">Post</button>
        </form>
      </div>
    </div>
  `;
}

function wireMiniComments(container) {
  container.querySelectorAll('.mini-comments').forEach(box => {
    const postId = box.dataset.postId;
    const toggle = box.querySelector('.mini-comment-toggle');
    const body = box.querySelector('.mini-comment-body');
    const list = box.querySelector('.mini-comment-list');
    const form = box.querySelector('.mini-comment-form');
    let loaded = false;

    async function loadComments() {
      const res = await fetch(`/api/comments?post_id=${postId}`);
      const comments = await res.json();
      list.innerHTML = comments.length
        ? comments.map(c => `<div style="font-size:.82rem;"><strong>${c.name}:</strong> ${c.comment}</div>`).join('')
        : `<div style="font-size:.8rem; color:var(--paper-dim);">No comments yet.</div>`;
    }

    toggle.addEventListener('click', () => {
      const showing = body.style.display !== 'none';
      body.style.display = showing ? 'none' : 'block';
      if (!loaded && !showing) { loadComments(); loaded = true; }
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = form.querySelector('.mini-comment-name').value;
      const comment = form.querySelector('.mini-comment-text').value;
      await fetch('/api/comments', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: postId, name, comment }),
      });
      form.reset();
      loadComments();
    });
  });
}

async function loadFeatured() {
  const grid = document.getElementById('featured-grid');
  if (!grid) return;
  const res = await fetch('/api/posts?type=article&perPage=3');
  const data = await res.json();
  grid.innerHTML = data.items.map(cardHTML).join('') || '<p style="color:var(--paper-dim);">No articles yet.</p>';
}

async function loadArticleGrid() {
  const grid = document.getElementById('articles-grid');
  const paginationEl = document.getElementById('articles-pagination');
  if (!grid) return;
  let currentTag = 'all';
  let currentPage = 1;

  async function render() {
    const url = `/api/posts?type=article&tag=${encodeURIComponent(currentTag)}&page=${currentPage}&perPage=9`;
    const res = await fetch(url);
    const data = await res.json();
    grid.innerHTML = data.items.length ? data.items.map(cardHTML).join('') : '<p style="color:var(--paper-dim);">No articles in this category yet.</p>';
    renderPagination(data.totalPages, data.page);
  }

  function renderPagination(totalPages, page) {
    if (!paginationEl) return;
    if (totalPages <= 1) { paginationEl.innerHTML = ''; return; }
    let html = '';
    for (let i = 1; i <= totalPages; i++) html += `<div class="page-btn glass ${i === page ? 'active' : ''}" data-page="${i}">${i}</div>`;
    paginationEl.innerHTML = html;
    paginationEl.querySelectorAll('.page-btn').forEach(btn => {
      btn.addEventListener('click', () => { currentPage = Number(btn.dataset.page); render(); window.scrollTo({ top: grid.offsetTop - 120, behavior: 'smooth' }); });
    });
  }

  render();

  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentTag = chip.dataset.filter;
      currentPage = 1;
      render();
    });
  });
}

async function loadClipsGrid() {
  const grid = document.getElementById('clips-grid');
  if (!grid) return;
  const res = await fetch('/api/posts?type=clip&perPage=50');
  const data = await res.json();
  grid.innerHTML = data.items.map(clipCardHTML).join('') || '<p style="color:var(--paper-dim);">No clips posted yet.</p>';
  wireMiniComments(grid);
}

async function loadBanterGrid() {
  const grid = document.getElementById('banter-grid');
  if (!grid) return;
  const res = await fetch('/api/posts?type=banter&perPage=50');
  const data = await res.json();
  grid.innerHTML = data.items.map(banterCardHTML).join('') || '<p style="color:var(--paper-dim);">Nothing posted yet.</p>';
  wireMiniComments(grid);
  if (window.twttr && window.twttr.widgets) window.twttr.widgets.load();
}

async function loadMatchReports() {
  const grid = document.getElementById('matchreports-grid');
  if (!grid) return;
  const res = await fetch('/api/posts?type=matchreport&perPage=50');
  const data = await res.json();
  grid.innerHTML = data.items.map(cardHTML).join('') || '<p style="color:var(--paper-dim);">No match reports yet.</p>';
}

async function loadSingleArticle() {
  const container = document.getElementById('article-content');
  if (!container) return;
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  if (!slug) { container.innerHTML = '<p>No article specified.</p>'; return; }
  const res = await fetch(`/api/posts/${encodeURIComponent(slug)}`);
  if (!res.ok) { container.innerHTML = '<p>Not found.</p>'; return; }
  const post = await res.json();
  document.title = `${post.title} — Blaugrana Daily`;

  const metaEl = document.getElementById('article-meta');
  const titleEl = document.getElementById('article-title');
  const bodyEl = document.getElementById('article-body-content');
  const imgEl = document.getElementById('article-hero-img');
  const sourceEl = document.getElementById('article-source');

  if (metaEl) metaEl.textContent = `${(post.tag_label || '').toUpperCase()} · ${(post.read_time || '').toUpperCase()}`;
  if (titleEl) titleEl.textContent = post.title;
  if (imgEl && post.image_url) { imgEl.src = post.image_url; imgEl.style.display = 'block'; }
  if (bodyEl) {
    const paragraphs = (post.body || '').split('\n\n').filter(p => p.trim());
    bodyEl.innerHTML = paragraphs.map(p => `<p>${p.trim()}</p>`).join('');
  }
  if (sourceEl) sourceEl.innerHTML = sourceHTML(post);

  initComments(post._id);
}

async function initComments(postId) {
  const list = document.getElementById('comment-list');
  const form = document.getElementById('comment-form');
  if (!list) return;

  async function render() {
    const res = await fetch(`/api/comments?post_id=${postId}`);
    const comments = await res.json();
    list.innerHTML = comments.length ? comments.map(c => `
      <div class="comment-item glass">
        <div class="comment-meta"><span class="comment-name">${c.name}</span><span class="comment-date">${new Date(c.created_at).toLocaleDateString()}</span></div>
        <p>${c.comment}</p>
      </div>
    `).join('') : '<p style="color:var(--paper-dim); font-size:.9rem;">No comments yet — be the first.</p>';
  }
  render();

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('comment-name').value;
      const comment = document.getElementById('comment-text').value;
      await fetch('/api/comments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ post_id: postId, name, comment }) });
      form.reset();
      render();
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadFeatured();
  loadArticleGrid();
  loadClipsGrid();
  loadBanterGrid();
  loadMatchReports();
  loadSingleArticle();
});
