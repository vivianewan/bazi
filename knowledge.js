(async function () {
  const listEl = document.getElementById('article-list');
  const bodyEl = document.getElementById('article-body');

  async function loadIndex() {
    const res = await fetch('content/articles/index.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('Could not load article index');
    return res.json();
  }

  function parseFrontMatter(raw) {
    if (!raw.startsWith('---')) {
      return { meta: {}, body: raw };
    }
    const end = raw.indexOf('\n---', 3);
    if (end === -1) return { meta: {}, body: raw };
    const fm = raw.slice(3, end).trim();
    const body = raw.slice(end + 4).replace(/^\s+/, '');
    const meta = {};
    fm.split('\n').forEach((line) => {
      const i = line.indexOf(':');
      if (i === -1) return;
      const key = line.slice(0, i).trim();
      let val = line.slice(i + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      meta[key] = val;
    });
    return { meta, body };
  }

  if (listEl) {
    try {
      const index = await loadIndex();
      if (!index.articles || !index.articles.length) {
        listEl.innerHTML = '<p class="muted">还没有文章。站长可在 Admin CMS 或 <code>content/articles/</code> 添加 Markdown。</p>';
        return;
      }
      listEl.innerHTML = index.articles
        .map(
          (a) => `
        <a class="article-card" href="article.html?slug=${encodeURIComponent(a.slug)}">
          ${a.cover ? `<img src="${a.cover}" alt="">` : ''}
          <div>
            <h3>${a.title || a.slug}</h3>
            <p class="muted">${a.date || ''} ${a.summary ? '· ' + a.summary : ''}</p>
          </div>
        </a>`
        )
        .join('');
    } catch (err) {
      listEl.innerHTML = `<p class="error">Failed to load articles: ${err.message}</p>`;
    }
  }

  if (bodyEl) {
    const slug = new URLSearchParams(location.search).get('slug');
    if (!slug) {
      bodyEl.innerHTML = '<p class="error">Missing article slug.</p>';
      return;
    }
    try {
      const res = await fetch(`content/articles/${encodeURIComponent(slug)}.md`, { cache: 'no-store' });
      if (!res.ok) throw new Error('Article not found');
      const raw = await res.text();
      const { meta, body } = parseFrontMatter(raw);
      document.title = `${meta.title || slug} · Lucky Charm`;
      const cover = meta.cover
        ? `<img class="article-cover" src="${meta.cover}" alt="">`
        : '';
      bodyEl.innerHTML = `
        <h2>${meta.title || slug}</h2>
        <p class="muted">${meta.date || ''} ${meta.summary ? '· ' + meta.summary : ''}</p>
        ${cover}
        <div class="article-content">${marked.parse(body)}</div>
      `;
    } catch (err) {
      bodyEl.innerHTML = `<p class="error">${err.message}</p>`;
    }
  }
})();
