const API_KEY = 'api_key=f8c61ba8b87e28b16fd664a36b974f41';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

getMovies(API_URL);

function getMovies(url) {

    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        showMovies(data.results);
    })
}

function showMovies(data) {
    main.innerHTML = '';

    data.forEach(movie => {
        const { title, poster_path, vote_average, release_date } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img src="${IMG_URL + poster_path}">
                <div class="movie-info">
                    <h4><b><u>${title}</u></b><br><br>
                    Rating: ${vote_average}<br>
                    Release Date:${release_date}</h4>

                </div>
        
        `

        main.appendChild(movieEl);

    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    if (searchTerm) {
        getMovies(searchURL + '&query=' + searchTerm)

    } else { getMovies(API_URL); }

})
