(() => {
  const posts = window.journalPosts;
  const main = document.getElementById('main');
  const dialog = document.getElementById('search-dialog');
  const input = document.getElementById('search-input');
  const categories = ['All writing', 'Life & things', 'Philosophy', 'Politics', 'The internet'];
  let category = 'All writing';
  let visible = 4;
  const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const date = value => new Date(value + 'T12:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const meta = post => `<div class="post-meta"><span class="post-category">${escape(post.category)}</span><span class="meta-dot">·</span><time datetime="${post.date}">${date(post.date)}</time>${post.pinned ? '<span class="pinned"><span aria-hidden="true">↗</span> PINNED</span>' : ''}</div>`;
  const card = post => `<article class="post">${meta(post)}<a class="post-link" href="#post/${post.id}"><h2>${escape(post.title)}</h2><p class="post-excerpt">${escape(post.excerpt)}</p><div class="post-bottom"><span>${post.read} min read</span><span class="post-arrow" aria-hidden="true">↗</span></div></a></article>`;
  function renderJournal() {
    const filtered = posts.filter(p => category === 'All writing' || p.category === category);
    main.innerHTML = `<section class="intro"><p class="eyebrow">Notes from a curious mind</p><h1>A place to think<br>out loud<span style="color:var(--accent)">.</span></h1><svg class="asterisk" viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M40 5v70M5 40h70M15 15l50 50M15 65l50-50M27 8l26 64M8 27l64 26M8 53l64-26M27 72 53 8"/></svg><p class="intro-description">Thoughts on being a person. The things I’m into, the things I’m questioning, and the occasional rant.<br>No particular niche. Just me.</p><div class="little-note"><span>↳</span> A personal journal, not a personal brand.</div></section><section aria-label="Journal posts"><div class="journal-toolbar"><div class="filters" aria-label="Filter by topic">${categories.map(c => `<button class="filter ${c === category ? 'active' : ''}" aria-pressed="${c === category}" data-category="${escape(c)}">${escape(c)}</button>`).join('')}</div><span class="post-total">${String(filtered.length).padStart(2,'0')} entries</span></div><div id="post-list">${filtered.slice(0,visible).map(card).join('')}</div>${filtered.length > visible ? '<div class="load-more-wrap"><button class="load-more" id="load-more">A little more writing <span>↓</span></button></div>' : '<div class="load-more-wrap"><span style="font-size:11px;color:var(--muted)">You’ve reached the beginning. Thanks for reading.</span></div>'}</section>`;
    main.querySelectorAll('[data-category]').forEach(button => button.addEventListener('click', () => {
      category = button.dataset.category; visible = 4; const top = window.scrollY; renderJournal(); window.scrollTo(0, top); main.querySelector('.filter.active').focus({preventScroll:true});
    }));
    document.getElementById('load-more')?.addEventListener('click', () => {
      const previous = visible; const top = window.scrollY; visible += 4; renderJournal(); window.scrollTo(0,top); const next = main.querySelectorAll('.post-link')[previous]; next?.focus({preventScroll:true});
    });
  }
  function render() {
    const hash = location.hash.slice(1);
    const view = hash === 'about' || hash === 'now' ? hash : 'journal';
    document.querySelectorAll('[data-view]').forEach(a => { a.classList.toggle('active', a.dataset.view === view); if(a.dataset.view === view) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current'); });
    document.title = 'Oniyitzuka — a little corner of the internet';
    if (hash.startsWith('post/')) {
      const post = posts.find(p => p.id === hash.slice(5));
      if (!post) { main.innerHTML = '<section class="prose"><a class="back-link" href="#">← Back to the journal</a><h1 class="page-heading">Nothing here, yet.</h1><p>This entry couldn’t be found. There’s more to read back in the journal.</p></section>'; return; }
      document.title = `${post.title} — Oniyitzuka`;
      main.innerHTML = `<article class="prose"><a class="back-link" href="#">← Back to the journal</a>${meta(post)}<h1 class="article-title">${escape(post.title)}</h1><p class="lead">${escape(post.excerpt)}</p><span style="font-size:11px;color:var(--muted)">${post.read} min read</span><div class="article-body">${post.body.map(p => `<p>${escape(p)}</p>`).join('')}</div><p class="end-note">Thanks for spending a little time here. — Oniyitzuka</p><a class="back-link" href="#">← All writing</a></article>`;
    } else if (view === 'about') {
      document.title = 'A little about me — Oniyitzuka';
      main.innerHTML = `<section class="prose"><p class="eyebrow">The person behind the page</p><h1 class="page-heading">Hi, I’m Oniyitzuka.</h1><p class="lead">A person in Pakistan, trying to make things and make sense of things. Usually at the same time.</p><p>I’m interested in how we live with technology, how we organise our societies, and why a good book can change the shape of an ordinary afternoon.</p><p>I like building things for the web. I also like the parts of life that happen away from a screen: long walks, tea that’s gone cold, and conversations that take longer than planned.</p><h2>What this place is for</h2><p>I wanted somewhere to write without having to fit into a feed. So you’ll find a mix of personal notes, things I’m interested in, political frustrations, and philosophical questions I haven’t found an answer to.</p><p>I don’t have a publishing schedule. I’ll write when I have something to say, and sometimes to find out what I think.</p><h2>A few recurring interests</h2><p>The independent web. Literature. Political life in Pakistan. Music that rewards a second listen. Making useful things with code. The everyday business of being a person.</p><p class="end-note">This is a personal site. Opinions are provisional; curiosity is permanent.</p></section>`;
    } else if (view === 'now') {
      document.title = 'What I’m up to — Oniyitzuka';
      main.innerHTML = `<section class="prose"><p class="eyebrow">A snapshot, not a résumé</p><h1 class="page-heading">What I’m up to.</h1><p class="lead">The things taking up space in my days lately.</p><p style="font-size:11px;color:var(--muted)">Last updated 8 November 2026 · Mock content</p><div class="now-item"><h2>Building a home on the web</h2><p>Putting this site together, learning by making, and trying not to spend three hours choosing a font. Mixed results on that last one.</p></div><div class="now-item"><h2>Reading, a little at a time</h2><p>The Book of Disquiet by Fernando Pessoa. A few pages, a long pause, a pencil in the margin.</p></div><div class="now-item"><h2>On repeat</h2><p>Radiohead’s In Rainbows. Particularly on evenings when the weather finally lets you leave the window open.</p></div><div class="now-item"><h2>Practising paying attention</h2><p>More walks without headphones. Fewer reflexive visits to the same three apps. Trying to notice what’s already here.</p></div><p class="end-note">A now page is a small answer to “what have you been doing lately?” This is mine.</p></section>`;
    } else renderJournal();
  }
  function search() {
    const query = input.value.trim().toLowerCase();
    const results = posts.filter(p => `${p.title} ${p.excerpt} ${p.category} ${p.body.join(' ')}`.toLowerCase().includes(query));
    document.getElementById('search-results').innerHTML = !query ? '<p class="empty-results">Try “politics”, “books”, or whatever’s on your mind.</p>' : results.length ? results.map(p => `<a class="search-result" href="#post/${p.id}"><span>${escape(p.category)} · ${date(p.date)}</span><strong>${escape(p.title)}</strong></a>`).join('') : '<p class="empty-results">No entries found. Try a different word.</p>';
  }
  function openSearch() { input.value = ''; search(); if (!dialog.open) dialog.showModal(); input.focus(); }
  document.getElementById('search-open').addEventListener('click', openSearch);
  input.addEventListener('input', search);
  document.getElementById('search-results').addEventListener('click', e => { if (e.target.closest('a')) dialog.close(); });
  dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if(e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
  document.addEventListener('keydown', e => { if (e.key === '/' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName) && !e.ctrlKey && !e.metaKey && !e.altKey && !dialog.open) { e.preventDefault(); openSearch(); } });
  const themeButton = document.getElementById('theme-toggle');
  let theme; try { theme = localStorage.getItem('journal-theme'); } catch {}
  function applyTheme(dark) { document.body.classList.toggle('dark',dark); themeButton.textContent = dark ? '☾' : '☼'; themeButton.setAttribute('aria-label',`Switch to ${dark ? 'light' : 'dark'} theme`); document.querySelector('meta[name="theme-color"]').content = dark ? '#1d211e' : '#f7f6f2'; }
  applyTheme(theme === 'dark');
  themeButton.addEventListener('click', () => { const dark = !document.body.classList.contains('dark'); applyTheme(dark); try { localStorage.setItem('journal-theme',dark ? 'dark' : 'light'); } catch {} });
  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('back-top').addEventListener('click', e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
  window.addEventListener('hashchange', () => { render(); window.scrollTo(0,0); main.focus({preventScroll:true}); });
  render();
})();
