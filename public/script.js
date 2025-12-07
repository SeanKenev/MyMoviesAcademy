const form = document.getElementById('movieForm');
const movieList = document.getElementById('movieList');

// Load all movies on page load
window.onload = loadMovies;

// Handle form submit
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const genre = document.getElementById('genre').value;
    const year = document.getElementById('year').value;

    const response = await fetch('/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, genre, year })
    });

    if (response.ok) {
        form.reset();
        loadMovies();
    }
});

// Fetch and display all movies
async function loadMovies() {
    const response = await fetch('/movies');
    const movies = await response.json();
    movieList.innerHTML = '';
    movies.forEach(movie => {
        const li = document.createElement('li');
        li.textContent = `${movie.title} (${movie.year}) - ${movie.genre}`;
        movieList.appendChild(li);
    });
}
