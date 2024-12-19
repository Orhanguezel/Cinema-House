const form = document.querySelector("#form");
const sectionTitle = document.querySelector(".section-title");
const searchInput = document.querySelector("#searchInput");
const movieApi = new MovieAPI();
const sidebarLinks = document.querySelectorAll(".sidebar ul li");
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
    document.addEventListener("DOMContentLoaded", () => movieApi.getPopularMovies());
    form.addEventListener("submit", searchMovies);

    sidebarLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            const genreName = e.target.innerText;
            if (genreName in genres) {
                movieApi.getMoviesByGenre(genres[genreName]);
                sectionTitle.textContent = genreName;
            } else if (genreName === "Populär") {
                movieApi.getPopularMovies();
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
}

function searchMovies(e) {
    e.preventDefault();
    const movieName = searchInput.value.trim();
    if (movieName) {
        movieApi.getMoviesByName(movieName);
    }
}
