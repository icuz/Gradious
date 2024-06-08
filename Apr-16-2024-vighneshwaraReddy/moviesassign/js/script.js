let movies = [
	{
		"movieId": "MOV1",
		"name": "Harry Porter",
		"poster": "https://imgs.search.brave.com/vwYTiFnUlEi7tNawN8MutKeVTUfmOCfQNa7d2hXOrHw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/ZXVyb3Bvc3RlcnMu/ZXUvaW1hZ2UvMzUw/L3Bvc3RlcnMvaGFy/cnktcG90dGVyLXBo/aWxvc29waGVyLXMt/c3RvbmUtaTEwNDYz/OS5qcGc",
		"director": "J.K. Rowling",
		"genre": "horror",
		"year":"2004",
		"duration":"2hrs",
		"collection":"128cr",
		"rating":"9.5/10"
	},
	{
		"movieId": "MOV2",
		"name": "Oppenheinmer",
		"poster": "https://imgs.search.brave.com/sD0alEHESiHxvD6kKiov4qxIaqD7viyAXPONzPrhUYo/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tb3Zp/ZXMudW5pdmVyc2Fs/cGljdHVyZXMuY29t/L21lZGlhL29wci10/c3Ixc2hlZXQzLWxv/b2syLXJnYi0zLTEt/MS02NDU0NWMwZDE1/ZjFlLTEuanBn",
		"director": "christopher nolan",
		"genre": "comedy",
		"year":"2011",
		"duration":"2hrs",
		"collection":"111cr",
		"rating":"7/10"
	},
	{
		"movieId": "MOV3",
		"name": "fast and furious",
		"poster": "https://imgs.search.brave.com/9yB5XYHYkteRgFAtpEpIyym38OCiFXSk0m89FVeWuLM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFxbDhrSXJQS0wu/anBn",
		"director": "will foile",
		"genre": "family",
		"year":"2016",
		"duration":"2hrs",
		"collection":"12cr",
		"rating":"4/10"
	},
	{
		"movieId": "MOV4",
		"name": "TITANIC",
		"poster": "https://imgs.search.brave.com/6g0LqPkZDciOrzcAXKvJ4TY8FqhxJhRzJ0_0MZjQ25w/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9oaXBz/LmhlYXJzdGFwcHMu/Y29tL2htZy1wcm9k/L2ltYWdlcy90aXRh/bmljLWZhY3RzLW1v/dmllLXBvc3Rlci0x/NTEyNjY0MjQ2Lmpw/Zz9jcm9wPTAuOTQ1/eHc6MC45NTV4aDsw/LjAyODd4dywwLjAx/Njd4aCZyZXNpemU9/OTgwOio",
		"director": "james camroon",
		"genre": "horror",
		"year":"2006",
		"duration":"2hrs",
		"collection":"19cr",
		"rating":"8.5/10"
	},
	{
		"movieId": "MOV5",
		"name": "peeky blinders",
		"poster": "https://imgs.search.brave.com/BFbxmAMZpbRG0nOQ0JoFPIz8Pw_BToZitrizqderJyk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDE4OTA2/MjQuanBn",
		"director": "abel tsefye",
		"genre": "action",
		"year":"1994",
		"duration":"2hrs",
		"collection":"11cr",
		"rating":"7.5/10"
	}
];
var updatingId = null;

function visibilemovieForm() {
    var form = document.getElementById('addmovieForm');
    form.style.display = 'block';
    var button = document.getElementById('addmovieButton');
    if (updatingId) {
		document.getElementById('add').style.display = 'none';
		document.getElementById('update').style.display = 'block';
    } else {
        document.getElementById('add').style.display = 'block';
    	document.getElementById('update').style.display = 'none';
    }
}

if(localStorage.getItem('movies') === null) {
	localStorage.setItem('movies', JSON.stringify(movies));
}else{
	movies = JSON.parse(localStorage.getItem('movies'));
}

function addMovieToDOM(movie) {
    var root = document.getElementById('root');
    var movieDiv = document.createElement('div');
    movieDiv.className = 'movie';
    movieDiv.innerHTML = `
        <div class="img-container">
            <img src="${movie.poster}" class='movie-image' alt="movie image" />
        </div>
        <div class="movie-detail">
            <p class="movie-name">Title: ${movie.name}</p>
            <p class="movie-director"><span>Director:</span> ${movie.director}</p>
			<p class="movie-gerne"><span>Genre:</span>  ${movie.genre}</p>
			<p class="year"><span>year:</span>  ${movie.year}</p>
			<p class="collection"><span>collection:</span>  ${movie.collection}</p>
			<p class="rating"><span>Rating:</span> ⭐${movie.rating}</p>
			<p class="duration"><span>Duration:</span>${movie.duration}</p>

        </div>
        <div class='three-btn'>
            <div class="dropdown">
                <a class="" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-three-dots-vertical"></i></a>
                <ul class="dropdown-menu">
                    <li><button onclick='deleteItem("${movie.movieId}")' class="dropdown-item ">Delete</button></li>
                    <li><button onclick='update("${movie.movieId}")' class="dropdown-item">Edit</button></li>
                </ul>
            </div>
        </div>
    `;
    root.appendChild(movieDiv); 
}
window.onload = function() {
	var movies = JSON.parse(localStorage.getItem('movies'));
	movies.forEach(addMovieToDOM);
}

function addmovie() {
	var form = document.getElementById('addmovieForm');
	var name = form.elements['name'].value;
	var poster = form.elements['posterLink'].value;
	var director = form.elements['director'].value;
	var year = form.elements['year'].value;
	var collection = form.elements['collection'].value;
	var genreValue = form.elements['genre'].value;
	var rating = form.elements['rating'].value;
	var duration = form.elements['duration'].value;

	var genreRegex = /^[a-zA-Z\s]*$/;

	if (!name || !poster || !director || !genre || !year || !collection || !rating) {
		alert('All fields must be filled out');
		return;
	}
	if (!genreRegex.test(genreValue)) {
        alert('Genre must only contain letters and spaces');
        event.preventDefault();
    }
	var movieId = 'MOV' + Math.floor(Math.random() * 10000);
	var newmovie = {
		movieId: movieId,
		name: name,
		poster: poster,
		director: director,
		genre: genreValue,
		year:year,
		collection:collection,
		rating:rating,
		duration:duration
	};

	var movies = JSON.parse(localStorage.getItem('movies')) || [];
	movies.unshift(newmovie);
	localStorage.setItem('movies', JSON.stringify(movies));
	addMovieToDOM(newmovie);
}

function deleteItem(movieId) {
	var movies = JSON.parse(localStorage.getItem('movies'));
	var newmovies = movies.filter(movie => movie.movieId !== movieId);
	localStorage.setItem('movies', JSON.stringify(newmovies));
	window.location.reload();
}

function update(movieId) {
	document.getElementById('addmovieForm').dataset.movieId = movieId;
	updatingId = movieId;
	visibilemovieForm();
	document.getElementById('add').style.display = 'none';
    document.getElementById('update').style.display = 'block';

    var movies = JSON.parse(localStorage.getItem('movies'));
    var movie = movies.find(movie => movie.movieId === movieId);

    if (movie) {
        var form = document.getElementById('addmovieForm');
        form.elements['name'].value = movie.name;
        form.elements['posterLink'].value = movie.poster;
        form.elements['director'].value = movie.director;
		form.elements['year'].value = movie.year;
		form.elements['collection'].value = movie.collection;
        form.elements['genre'].value = movie.genre;
		form.elements['rating'].value  = movie.rating;
		form.elements['duration'].value = movie.duration;

        form.dataset.movieId = movieId;
    }
}

function updatemovie() {
    var movieId = document.getElementById('addmovieForm').dataset.movieId;

    var movies = JSON.parse(localStorage.getItem('movies'));
    var movieIndex = movies.findIndex(movie => movie.movieId === movieId);

    if (movieIndex !== -1) {
        var form = document.getElementById('addmovieForm');
        var name = form.elements['name'].value;
        var poster = form.elements['posterLink'].value;
        var director = form.elements['director'].value;
        var year = form.elements['year'].value;
        var collection = form.elements['collection'].value;
        var genre = form.elements['genre'].value;
        var rating = form.elements['rating'].value;
        var duration = form.elements['duration'].value;

        var genreRegex = /^[a-zA-Z\s]*$/;
        if (!name || !poster || !director || !genre) {
            alert('All fields are required');
            return;
        }
        if (!genreRegex.test(genre)) {
            alert('Genre must only contain letters and spaces');
            return;
        }
        movies[movieIndex] = {
            ...movies[movieIndex],
            name,
            poster,
            director,
            genre,
            year,
            collection,
            rating,
            duration,
        };

        localStorage.setItem('movies', JSON.stringify(movies));
    }
}