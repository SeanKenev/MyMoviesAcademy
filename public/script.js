const API_KEY = "109fb2153399ce7f24bd49347fbf0e4c";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const moviesContainer = document.getElementById("movies");

fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
  .then(response => response.json())
  .then(data => {
    data.results.forEach(movie => {
      const movieDiv = document.createElement("div");
      movieDiv.classList.add("movie");

      movieDiv.innerHTML = `
        <img src="${IMAGE_URL + movie.poster_path}" alt="${movie.title}">
        <h3>${movie.title}</h3>
      `;

      moviesContainer.appendChild(movieDiv);
    });
  })
  .catch(error => console.error("Error fetching movies:", error));
