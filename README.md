# Personal journal

A static personal website built with HTML, CSS, and JavaScript. No build step or dependencies; suitable for GitHub Pages.

To preview locally, run `python3 -m http.server 8000` in this directory and visit http://localhost:8000.

- `index.html`: page shell, profile, navigation, and search dialog.
- `style.css`: responsive layout, typography, and light/dark themes.
- `posts.js`: eight mock posts, including full article content.
- `app.js`: topic filtering, pagination, search, and hash-based page navigation.

Edit the name and profile in `index.html`, and the About/Now text in `app.js`. Replace the sample writing in `posts.js` with your own.

For Supabase, load post records before the app renders and replace `window.journalPosts` with the query result. The current shape is `{ id, title, category, date, read, pinned, excerpt, body }`, where `date` is `YYYY-MM-DD`, `read` is minutes, and `body` is an array of paragraph strings. All post text is escaped before rendering. Keep Supabase service-role keys out of client code and configure row-level security for your eventual public read/editor access.

Navigation uses URL hashes so article links work on GitHub Pages without rewrite rules. Theme preference is saved locally. Google Fonts is optional; system serif and sans-serif fallbacks work offline.
