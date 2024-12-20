import { MovieAPI } from "./movieApi.js";

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

if (!movieId) {
    console.error("Film-ID fehlt.");
    document.body.innerHTML = "<p style='color: white;'>Film-Informationen nicht gefunden.</p>";
} else {
    fetchMovieDetails(movieId);
    fetchCastDetails(movieId);
}

async function fetchMovieDetails(movieId) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=cddc7806aed6b337c6bfc8ae11f8cd8e&language=de-DE`);
        if (!response.ok) {
            throw new Error("API-Anfrage fehlgeschlagen.");
        }
        const movieDetails = await response.json();
        displayMovieDetails(movieDetails);
    } catch (error) {
        console.error("Fehler beim Abrufen der Filmdetails:", error);
        document.body.innerHTML = "<p style='color: white;'>Beim Abrufen der Filmdetails ist ein Fehler aufgetreten.</p>";
    }
}

async function fetchCastDetails(movieId) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=cddc7806aed6b337c6bfc8ae11f8cd8e&language=de-DE`);
        if (!response.ok) {
            throw new Error("Darstellerinformationen konnten nicht abgerufen werden.");
        }
        const castData = await response.json();
        displayCastDetails(castData.cast);
    } catch (error) {
        console.error("Fehler beim Abrufen der Darstellerinformationen:", error);
    }
}

function displayMovieDetails(movie) {
    const detailsContainer = document.querySelector("#details-container");
    detailsContainer.style.backgroundImage = `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`;

    detailsContainer.innerHTML = `
        <div class="details-container">
            <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.title}">
            <div class="details-info">
                <h1>${movie.title} (${movie.release_date.split("-")[0]})</h1>
                <p>${movie.overview}</p>
                <p><strong>Bewertung:</strong> ${movie.vote_average} / 10</p>
                <p><strong>Veröffentlichungsdatum:</strong> ${movie.release_date}</p>
                <div class="details-genres">
                    ${movie.genres.map(genre => `<span>${genre.name}</span>`).join("")}
                </div>
            </div>
        </div>
    `;
}

function displayCastDetails(cast) {
    const castSection = document.querySelector("#cast-section");
    castSection.innerHTML = `
        <h2>Hauptdarsteller</h2>
        <div class="cast-list">
            ${cast
                .slice(0, 6)
                .map(
                    actor => `
                        <div class="cast-card">
                            <img src="https://image.tmdb.org/t/p/w185${actor.profile_path}" alt="${actor.name}">
                            <p>${actor.name}</p>
                            <p>${actor.character}</p>
                        </div>
                    `
                )
                .join("")}
        </div>
    `;
}
