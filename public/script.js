// script.js - shared frontend behaviour for MyMoviesAcademy

// HELPER to create element HTML safely
function escapeHtml(s) { return (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

/* ---------- movies.html: load all movies and submit add-movie form ---------- */
if (document.getElementById('movieList')) {
  // load movies
  async function loadMovies() {
    const res = await fetch('/movies');
    const movies = await res.json();
    const container = document.getElementById('movieList');
    container.innerHTML = '';
    movies.forEach(m => {
      const card = document.createElement('div');
      card.className = 'movie-card';
      card.innerHTML = `
        <img src="${escapeHtml(m.poster || '')}" alt="${escapeHtml(m.title)}" onerror="this.src='https://via.placeholder.com/400x600?text=No+Poster'">
        <h3>${escapeHtml(m.title)} (${m.year || ''})</h3>
      `;
      card.addEventListener('click', () => {
        location.href = `movie.html?id=${m._id}`;
      });
      container.appendChild(card);
    });
  }

  loadMovies();

  // add movie form
  const addForm = document.getElementById('addMovieForm');
  addForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
      title: document.getElementById('title').value,
      genre: document.getElementById('genre').value,
      year: document.getElementById('year').value,
      poster: document.getElementById('poster').value,
      description: document.getElementById('description').value
    };
    const res = await fetch('/movies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      addForm.reset();
      loadMovies();
    } else {
      const json = await res.json();
      alert('Error: ' + (json.error || 'Could not add movie'));
    }
  });
}

/* ---------- movie.html: load details for given id ---------- */
if (document.getElementById('movieDetails')) {
  (async function(){
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    if (!id) {
      document.getElementById('movieDetails').innerHTML = '<p>No movie id provided.</p>';
      return;
    }
    const res = await fetch(`/movies/${id}`);
    if (!res.ok) {
      document.getElementById('movieDetails').innerHTML = '<p>Movie not found.</p>';
      return;
    }
    const m = await res.json();
    document.getElementById('movieDetails').innerHTML = `
      <img src="${escapeHtml(m.poster)}" alt="${escapeHtml(m.title)}" onerror="this.src='https://via.placeholder.com/800x1000?text=No+Poster'">
      <h2>${escapeHtml(m.title)} (${m.year || ''})</h2>
      <p><strong>Genre:</strong> ${escapeHtml(m.genre || '—')}</p>
      <p>${escapeHtml(m.description || 'No description available.')}</p>
      <p><a href="movies.html">← Back to list</a></p>
    `;
  })();
}

/* ---------- login.html: simple login POST (uses existing /login endpoint) ---------- */
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const res = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (res.ok) {
      alert('Login successful!');
      location.href = 'movies.html';
    } else {
      document.getElementById('errorMessage').textContent = data.error || 'Login failed';
    }
  });
}
