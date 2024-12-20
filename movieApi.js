export class MovieAPI {
    constructor() {
        this.apiKey = "cddc7806aed6b337c6bfc8ae11f8cd8e";
        this.baseImageURL = "https://image.tmdb.org/t/p/w1280";
        this.popularURL = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=tr-TR`;
        this.upcomingURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${this.apiKey}&language=tr-TR`;
        this.topRatedURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${this.apiKey}&language=tr-TR`;
        this.nowPlayingURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.apiKey}&language=tr-TR`;
        this.genreURL = `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&language=tr-TR&with_genres=`;
        this.searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=`;
        this.baseDiscoverURL = `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&language=tr-TR`;
        this.movies = document.querySelector(".movies");

        // Varsayılan sıralama ve platform özellikleri
        this.sortBy = "popularity.desc"; // Varsayılan sıralama
        this.platform = "all"; // Varsayılan platform
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

        // Filmleri doğru şekilde göster
        if (movies && movies.results) {
            this.displayInfo(movies);
        } else {
            this.movies.innerHTML = "<p style='color: white;'>Sonuç bulunamadı!</p>";
        }
    }


    getPlatformFilter() {
        switch (this.platform) {
            case "netflix":
                return "&with_companies=213"; // Netflix Company ID
            case "amazon":
                return "&with_companies=1024"; // Amazon Company ID
            case "disney":
                return "&with_companies=2"; // Disney+ Company ID
            case "hbo":
                return "&with_companies=3268"; // HBO Max Company ID
            case "apple":
                return "&with_companies=420"; // Apple TV+ Company ID
            default:
                return ""; // Tüm platformlar
        }
    }

    displayInfo(movies) {
        this.movies.innerHTML = "";
    
        if (movies.results.length === 0) {
            this.movies.innerHTML = "<p style='color: white;'>Sonuç bulunamadı!</p>";
            return;
        }
    
        movies.results.forEach((movie) => {
            const posterPath = movie.poster_path
                ? `${this.baseImageURL}${movie.poster_path}`
                : "https://via.placeholder.com/230x345";
    
            const movieTitle = movie.title || "Bilinmeyen Başlık";
            const movieRating = movie.vote_average || "0";
    
            // Film Kartı HTML
            this.movies.innerHTML += `
                <div class="movie" style="width: 230px; margin: 15px; display: flex; flex-direction: column; align-items: center; background-color: #222; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); overflow: hidden; transition: transform 0.3s ease, box-shadow 0.3s ease;"data-id="${movie.id}">
                    <img class="moviePicture" width="230" height="345" src="${posterPath}" alt="${movieTitle}" style="border-bottom: 3px solid #FFB100;">
                    <div class="info" style="padding: 10px; text-align: center;">
                        <h4 class="movieName" style="font-size: 16px; font-weight: bold; color: #FFB100; margin-bottom: 5px;">${movieTitle}</h4>
                        <h5 class="imdbPoint ${this.changeColor(movieRating)}" style="font-size: 14px; font-weight: bold; margin: 0;">${Math.round(movieRating)}</h5>
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
                    console.error("Film ID bulunamadı.");
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


