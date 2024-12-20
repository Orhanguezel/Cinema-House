import { MovieAPI } from "./movieApi.js";

const form = document.querySelector("#form");
const sectionTitle = document.querySelector(".section-title");
const searchInput = document.querySelector("#searchInput");
const movieApi = new MovieAPI();
const sidebarLinks = document.querySelectorAll(".sidebar ul li");
const platformSelect = document.querySelector("#platformSelect");
const sortSelect = document.querySelector("#sortSelect");

const genres = {
    Action: 28,
    Drama: 18,
    Komödie: 35,
    Horror: 27,
    "Science-Fiction": 878,
    Dokumentationen: 99,
};

runEventListeners();

function runEventListeners() {
    document.addEventListener("DOMContentLoaded", () => movieApi.getMoviesWithFilters());
    form.addEventListener("submit", searchMovies);

    sidebarLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            const genreName = e.target.innerText;
            if (genreName in genres) {
                movieApi.getMoviesByGenre(genres[genreName]);
                sectionTitle.textContent = genreName;
            } else if (genreName === "Populär") {
                movieApi.getMoviesWithFilters();
                sectionTitle.textContent = "Populär";
            } else if (genreName === "Neuerscheinungen") {
                movieApi.getUpcomingMovies();
                sectionTitle.textContent = "Neuerscheinungen";
            } else if (genreName === "Top bewertet") {
                movieApi.getTopRatedMovies();
                sectionTitle.textContent = "Top bewertet";
            }
        });
    });

    platformSelect.addEventListener("change", (e) => {
        movieApi.platform = e.target.value; // Platform seçimini güncelle
        movieApi.getMoviesWithFilters();
    });

    sortSelect.addEventListener("change", (e) => {
        movieApi.sortBy = e.target.value; // Sıralama seçimini güncelle
        movieApi.getMoviesWithFilters();
    });
}

function searchMovies(e) {
    e.preventDefault();
    const movieName = searchInput.value.trim();
    if (movieName) {
        movieApi.getMoviesByName(movieName);
        sectionTitle.textContent = `Arama Sonuçları: ${movieName}`;
    }
}

document.querySelectorAll(".movie").forEach((movie) => {
    movie.addEventListener("click", (e) => {
      const movieId = e.currentTarget.getAttribute("data-id");
      if (movieId) {
        window.location.href = `details.html?id=${movieId}`;
      } else {
        console.error("Film ID bulunamadı.");
      }
    });
  });


 

  

