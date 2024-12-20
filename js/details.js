import { MovieAPI } from "./movieApi.js";

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

if (!movieId) {
    console.error("Film ID eksik.");
    document.body.innerHTML = "<p style='color: white;'>Film bilgisi bulunamadı.</p>";
} else {
    fetchMovieDetails(movieId);
}

async function fetchMovieDetails(movieId) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=cddc7806aed6b337c6bfc8ae11f8cd8e&language=tr-TR`);
        if (!response.ok) {
            throw new Error("API isteği başarısız.");
        }
        const movieDetails = await response.json();
        displayMovieDetails(movieDetails);
    } catch (error) {
        console.error("Film detayları alınırken hata oluştu:", error);
        document.body.innerHTML = "<p style='color: white;'>Film detayları alınırken bir hata oluştu.</p>";
    }
}

function displayMovieDetails(movie) {
    const detailsContainer = document.querySelector("#details-container");
    detailsContainer.innerHTML = `
        <div style="padding: 20px; text-align: center;">
            <h1 style="color: #FFB100;">${movie.title}</h1>
            <img src="https://image.tmdb.org/t/p/w1280${movie.poster_path}" alt="${movie.title}" style="max-width: 100%; border-radius: 10px; margin-bottom: 20px;">
            <p style="color: white;">${movie.overview}</p>
            <p style="color: #FFB100;">Çıkış Tarihi: ${movie.release_date}</p>
            <p style="color: #4CAF50;">Puan: ${movie.vote_average}</p>
        </div>
    `;
}
