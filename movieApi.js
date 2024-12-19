class MovieAPI {
    constructor() {
        this.apiKey = "cddc7806aed6b337c6bfc8ae11f8cd8e";
        this.baseImageURL = "https://image.tmdb.org/t/p/w1280";
        this.popularURL = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=tr-TR`;
        this.upcomingURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${this.apiKey}&language=tr-TR`;
        this.topRatedURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${this.apiKey}&language=tr-TR`;
        this.nowPlayingURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.apiKey}&language=tr-TR`;
        this.genreURL = `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&language=en-TR&with_genres=`;
        this.searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=`;
        this.movies = document.querySelector(".movies");
    }

    // Popüler Filmleri Getir
    async getPopularMovies() {
        const response = await fetch(this.popularURL);
        const movies = await response.json();
        this.displayInfo(movies);
    }

    // Yeni Çıkan Filmleri Getir
    async getUpcomingMovies() {
        const response = await fetch(this.upcomingURL);
        const movies = await response.json();
        this.displayInfo(movies);
    }

    // En Yüksek Puanlı Filmleri Getir
    async getTopRatedMovies() {
        const response = await fetch(this.topRatedURL);
        const movies = await response.json();
        this.displayInfo(movies);
    }

    // Şu Anda Gösterimde Olan Filmleri Getir
    async getNowPlayingMovies() {
        const response = await fetch(this.nowPlayingURL);
        const movies = await response.json();
        this.displayInfo(movies);
    }

    // Kategoriye Göre Filmleri Getir
    async getMoviesByGenre(genreId) {
        const response = await fetch(`${this.genreURL}${genreId}`);
        const movies = await response.json();
        this.displayInfo(movies);
    }

    // Film Adına Göre Arama Yap
    async getMoviesByName(movieName) {
        const response = await fetch(this.searchURL + movieName);
        const movies = await response.json();
        this.displayInfo(movies);
    }

    // Filmleri Sayfada Göster
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
            this.movies.innerHTML += `
                <div class="movie">
                    <img class="moviePicture" width="230" height="345" src="${posterPath}" alt="${movie.title}">
                    <div class="info">
                        <h4 class="movieName">${movie.title}</h4>
                        <h5 class="imdbPoint ${this.changeColor(movie.vote_average)}">${Math.round(movie.vote_average)}</h5>
                    </div>
                </div>
            `;
        });
    }

    // IMDb Puanına Göre Renk Değiştir
    changeColor(imdbPoint) {
        if (imdbPoint >= 8) {
            return "green";
        } else if (imdbPoint >= 7) {
            return "yellow";
        }
        return "red";
    }
}
