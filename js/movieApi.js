export class MovieAPI {
    constructor() {
        this.apiKey = "cddc7806aed6b337c6bfc8ae11f8cd8e";
        this.baseImageURL = "https://image.tmdb.org/t/p/w1280";
        this.popularURL = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=de-DE`;
        this.upcomingURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${this.apiKey}&language=de-DE`;
        this.topRatedURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${this.apiKey}&language=de-DE`;
        this.nowPlayingURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.apiKey}&language=de-DE`;
        this.genreURL = `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&language=de-DE&with_genres=`;
        this.searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=`;
        this.baseDiscoverURL = `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&language=de-DE`;
        this.movies = document.querySelector(".movies");

        // Standard-Sortierung und Plattform-Einstellungen
        this.sortBy = "popularity.desc"; 
        this.platform = "all"; 
    }

    async getPopularMovies() {
        const response = await fetch(this.popularURL);
        const movies = await response.json();
        this.displayInfo(movies);
    }

    async getUpcomingMovies() {
        const response = await fetch(this.upcomingURL);
        const movies = await response.json();
        this.displayInfo(movies);
    }

    async getTopRatedMovies() {
        const response = await fetch(this.topRatedURL);
        const movies = await response.json();
        this.displayInfo(movies);
    }

    async getNowPlayingMovies() {
        const response = await fetch(this.nowPlayingURL);
        const movies = await response.json();
        this.displayInfo(movies);
    }

    async getMoviesByGenre(genreId) {
        const response = await fetch(`${this.genreURL}${genreId}`);
        const movies = await response.json();
        this.displayInfo(movies);
    }

    async getMoviesByName(movieName) {
        const response = await fetch(this.searchURL + movieName);
        const movies = await response.json();
        this.displayInfo(movies);
    }

    async getMoviesWithFilters() {
        const platformFilter = this.getPlatformFilter();
        const response = await fetch(
            `${this.baseDiscoverURL}&sort_by=${this.sortBy}${platformFilter}`
        );
        const movies = await response.json();

        if (movies && movies.results) {
            this.displayInfo(movies);
        } else {
            this.movies.innerHTML = "<p style='color: white;'>Keine Ergebnisse gefunden!</p>";
        }
    }


    getPlatformFilter() {
        switch (this.platform) {
            case "netflix":
                return "&with_companies=213"; 
            case "amazon":
                return "&with_companies=1024";
            case "disney":
                return "&with_companies=2";
            case "hbo":
                return "&with_companies=3268";
            case "apple":
                return "&with_companies=420";
            default:
                return ""; 
        }
    }

    displayInfo(movies) {
        this.movies.innerHTML = "";
    
        if (movies.results.length === 0) {
            this.movies.innerHTML = "<p style='color: white;'>Keine Ergebnisse gefunden!</p>";
            return;
        }
    
        movies.results.forEach((movie) => {
            const posterPath = movie.poster_path
                ? `${this.baseImageURL}${movie.poster_path}`
                : "https://via.placeholder.com/230x345";
    
            const movieTitle = movie.title || "Unbekannter Titel";
            const movieRating = movie.vote_average || "0";
    
            // Film Kartı HTML
            this.movies.innerHTML += `
            <div class="movie" data-id="${movie.id}">
                <img class="moviePicture" src="${posterPath}" alt="${movieTitle}">
                <div class="info">
                    <h4 class="movieName">${movieTitle}</h4>
                    <h5 class="imdbPoint ${this.changeColor(movieRating)}">${Math.round(movieRating)}</h5>
                </div>
            </div>
        `;
    });
    
        // Kart Hover Efektleri
        const movieCards = document.querySelectorAll(".movie");
        movieCards.forEach((card) => {
            card.addEventListener("mouseenter", () => {
                card.style.transform = "scale(1.05)";
                card.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.3)";
            });
            card.addEventListener("mouseleave", () => {
                card.style.transform = "scale(1)";
                card.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
            });
        });

        this.addCardListeners();
    }

    // Film Kartlarına Event Listener Ekleyen Fonksiyon
    addCardListeners() {
        const movieCards = document.querySelectorAll(".movie");
        movieCards.forEach((card) => {
            card.addEventListener("click", () => {
                const movieId = card.getAttribute("data-id");
                if (movieId) {
                    window.location.href = `details.html?id=${movieId}`;
                } else {
                    console.error("Film-ID fehlt.");
                }
            });
        });
    }
    
    

    changeColor(imdbPoint) {
        if (imdbPoint >= 8) {
            return "green";
        } else if (imdbPoint >= 7) {
            return "yellow";
        }
        return "red";
    }
}


