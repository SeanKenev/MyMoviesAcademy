const API_KEY = "109fb2153399ce7f24bd49347fbf0e4c";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

/* ===========================
   HOMEPAGE MOVIES
=========================== */
const moviesContainer = document.getElementById("movies");

if (moviesContainer) {
  fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      moviesContainer.innerHTML = "";

      data.results.forEach(movie => {
        const movieDiv = document.createElement("div");
        movieDiv.className = "movie";

        movieDiv.innerHTML = `
          <a href="movie.html?id=${movie.id}">
            <img src="${IMAGE_URL + movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
          </a>
        `;

        moviesContainer.appendChild(movieDiv);
      });
    })
    .catch(err => console.error(err));
}

/* ===========================
   LOGIN LOGIC (USERNAME)
=========================== */
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", e => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("errorMessage");

    if (username === "admin" && password === "admin123") {
      alert("Login successful!");
      window.location.href = "index.html";
    } else {
      errorMessage.textContent = "Invalid username or password";
    }
  });
}
