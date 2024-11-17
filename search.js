
const toggleSearchBar = () => {
    const user = localStorage.getItem("selected_user"); 
    const profileHeader = document.querySelector('.profile-header');
    const existingSearchBar = document.querySelector('.search-bar');

    if (existingSearchBar) {
        existingSearchBar.remove(); 
        return;
    }

    const searchBar = document.createElement('div');
    searchBar.classList.add('search-bar');
    searchBar.innerHTML = `
        <form id="search-form">
            <input type="text" id="search-input" placeholder="Search movies..." required>
            <button type="submit" class="search-btn" style="background-color: #E50914; color: #fff; border: none; padding: 5px 10px; cursor: pointer;">Search</button>
        </form>
    `;

    profileHeader.after(searchBar); 

    
    document.getElementById('search-form').addEventListener('submit', (ev) => {
        ev.preventDefault();
        const query = document.getElementById('search-input').value.trim();
        if (!query) {
            alert('Please enter a valid search term.');
            return;
        }
        searchContr(query, user); 
    });
};

// Search Controller: Fetches movies from the API
const searchContr = (query, user) => {
    const API_URL = 'https://api.themoviedb.org/3/search/movie';
    const API_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTY1ODVjMWNiYTVkYzQwZWZhYWM2NjhlYmNjOWUwNiIsIm5iZiI6MTczMTgzNzI4MC4yMDEwNDMsInN1YiI6IjY3MzRkMmJhMTJkNzI5MDEwYjkyNjNhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uMO8MPxsET-zISfYVKTS7cxh_qSx6QEDIPUM5Z1zVfM';

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: API_TOKEN,
        },
    };

    fetch(`${API_URL}?query=${query}`, options)
        .then(response => response.json())
        .then(data => resultsView(data.results, user)) // Pass results and user to the view
        .catch(err => console.error('Error:', err));
};

// Results View: Displays the search results
const resultsView = (results, user) => {
    const mainContainer = document.getElementById('main');
    mainContainer.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <button class="back-button">Back</button>
            <button class="home-button" style="background: none; border: none; color: #E50914; font-size: 1.5rem; cursor: pointer;">🏠 Home</button>
        </div>
        <h2>Search Results</h2>
        <div id="search-results">
            ${
                results.length === 0
                    ? '<p>No results found.</p>'
                    : results
                          .map((result, index) => `
                    <div class="movie">
                        <img src="https://image.tmdb.org/t/p/w200${result.poster_path}" alt="${result.title}" onerror="this.src='files/noimage.png'">
                        <div class="title">${result.title}</div>
                        <p>Release Date: ${result.release_date || 'Unknown'}</p>
                        <button class="add-from-api" data-index="${index}">Add</button>
                    </div>
                `).join('')
            }
        </div>
    `;

    
    document.querySelector('.home-button').addEventListener('click', () => {
        indexContr(user); 
    });

    
    document.querySelector('.back-button').addEventListener('click', () => {
        welcomeContr(); 
    });

    
    document.querySelectorAll('.add-from-api').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = btn.getAttribute('data-index');
            addFromAPIContr(results[index], user);
        });
    });
};



const addFromAPIContr = (movie, user) => {
    const my_movies_key = `my_movies_${user}`;
    const my_movies = JSON.parse(localStorage.getItem(my_movies_key)) || [];

   
    if (my_movies.some(m => m.title === movie.title)) {
        alert('This movie already exists in your profile!');
        return;
    }

    
    const button = document.querySelector(`.add-from-api[data-index="${movie.index}"]`);
    if (button) {
        button.disabled = true; 
        button.textContent = "Adding..."; 
    }

    
    my_movies.push({
        title: movie.title || 'Unknown Title',
        director: movie.director || 'Unknown',
        thumbnail: movie.poster_path
            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
            : 'files/noimage.png',
    });

    localStorage.setItem(my_movies_key, JSON.stringify(my_movies));

  
    if (button) {
        button.textContent = "Added!";
        button.disabled = true;
    }

  
    alert('Movie added successfully to your profile!');
};

const getTrendingMovies = () => {
    const API_URL = 'https://api.themoviedb.org/3/trending/movie/day'; // Endpoint para tendencias
    const API_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTY1ODVjMWNiYTVkYzQwZWZhYWM2NjhlYmNjOWUwNiIsIm5iZiI6MTczMTgzNzI4MC4yMDEwNDMsInN1YiI6IjY3MzRkMmJhMTJkNzI5MDEwYjkyNjNhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uMO8MPxsET-zISfYVKTS7cxh_qSx6QEDIPUM5Z1zVfM';

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: API_TOKEN,
        },
    };

    return fetch(API_URL, options)
        .then(response => response.json())
        .then(data => data.results) // Devuelve solo los resultados
        .catch(err => {
            console.error('Error fetching trending movies:', err);
            return [];
        });
};

const trendingView = (trendingMovies) => {
    if (!trendingMovies || trendingMovies.length === 0) {
        return '<p>No trending movies available at the moment.</p>';
    }

    return `
        <h2 class="profile-subheader">Trending Movies</h2>
        <div class="trending-movies">
            ${trendingMovies.map((movie, index) => `
                <div class="movie">
                    <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}" onerror="this.src='files/noimage.png'">
                    <div class="title">${movie.title}</div>
                    <p>Release Date: ${movie.release_date || 'Unknown'}</p>
                    <button class="add-trending" data-index="${index}" style="background-color: #E50914; color: #fff; border: none; padding: 5px 10px; cursor: pointer;">Add</button>
                </div>
            `).join('')}
        </div>
    `;
};

const addTrendingContr = (movie, user) => {
    const my_movies_key = `my_movies_${user}`;
    const my_movies = JSON.parse(localStorage.getItem(my_movies_key)) || [];

    // Verificar si la película ya existe en favoritos
    if (my_movies.some(m => m.title === movie.title)) {
        alert('This movie already exists in your favorites!');
        return;
    }

    // Agregar la película a las favoritas
    const newMovie = {
        title: movie.title || 'Unknown Title',
        director: 'Unknown', // No tenemos información del director en tendencias
        thumbnail: movie.poster_path
            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
            : 'files/noimage.png',
    };

    my_movies.push(newMovie);
    localStorage.setItem(my_movies_key, JSON.stringify(my_movies));

    // Actualizar la sección de películas favoritas en el DOM
    const favoritesList = document.querySelector('.movie-list');
    const newMovieElement = document.createElement('div');
    newMovieElement.classList.add('movie');
    newMovieElement.innerHTML = `
        <img src="${newMovie.thumbnail}" onerror="this.src='files/noimage.png'" alt="${newMovie.title}">
        <div class="title">${newMovie.title}</div>
        <div class="actions">
            <button class="show" data-my-id="${my_movies.length - 1}">Show</button>
            <button class="edit" data-my-id="${my_movies.length - 1}">Edit</button>
            <button class="delete" data-my-id="${my_movies.length - 1}">Delete</button>
        </div>
    `;
    favoritesList.appendChild(newMovieElement);

    // Asociar eventos a los botones de la nueva película
    newMovieElement.querySelector('.show').addEventListener('click', () => showContr(my_movies.length - 1));
    newMovieElement.querySelector('.edit').addEventListener('click', () => editContr(my_movies.length - 1));
    newMovieElement.querySelector('.delete').addEventListener('click', () => deleteContr(my_movies.length - 1));

    // Confirmación
    alert('Movie added successfully to your favorites!');
};




