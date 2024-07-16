// Select necessary DOM elements
const form = document.querySelector("form");
const moviecontainer = document.querySelector(".movie-container");
const input = document.querySelector(".input");
const movienotfound = document.querySelector(".movienotfound");

// Function to display movie information
const showmovie = (data) => {
    // Clear previous movie content
    moviecontainer.textContent = "";
    if (data.Response === "False") {
        // Display 'movie not found' message
        const msg = document.createElement("h1");
        msg.innerText = "Movie not found!!";
        moviecontainer.appendChild(msg);
    } else {
        // Destructure movie data
        const { Title, imdbRating, Genre, Released, Runtime, Actors, Poster, Plot } = data;

        // Create main movie container
        const main = document.createElement("div");
        main.classList.add("main");

        // Create and append movie poster
        const movieposter = document.createElement("div");
        movieposter.classList.add("moviepic");
        main.appendChild(movieposter);
        moviecontainer.appendChild(main);
        movieposter.innerHTML = `<img src="${Poster}"/>`;

        // Create and append movie description
        const discriptionDiv = document.createElement("div");
        discriptionDiv.classList.add("discriptionDiv");
        discriptionDiv.innerHTML = ` 
            <h1>${Title}</h1>
            <h3>${imdbRating}⭐</h3>`;

        // Create and append genre tags
        const genre = document.createElement("div");
        genre.classList.add("genre");
        Genre.split(",").forEach(element => {
            const p = document.createElement("p");
            p.innerHTML = element;
            genre.appendChild(p);
        });

        // Create and append movie data
        const moviedata = document.createElement("div");
        moviedata.classList.add("moviedata");
        moviedata.innerHTML = ` 
            <H4>Released date: <span>${Released}</span></H4>
            <h4>Duration: <span>${Runtime}</span></h4>
            <h4>Actors: <span>${Actors}</span></h4>
            <h4>Plot: <span>${Plot}</span></h4>`;

        discriptionDiv.appendChild(genre);
        discriptionDiv.appendChild(moviedata);
        main.appendChild(discriptionDiv);
    }
};

// Function to fetch and display movie data
const moviecontent = async (movie) => {
    const my_apikey = "c3519517";
    const url = `http://www.omdbapi.com/?apikey=${my_apikey}&t=${movie}`;

    // Display loading message
    moviecontainer.innerHTML = "<h2>Loading...</h2>";

    try {
        const response = await fetch(url);
        const data = await response.json();
        showmovie(data);
    } catch (error) {
        console.error("Error fetching the movie data:", error);
        moviecontainer.innerHTML = "<h2>Error loading movie data. Please try again.</h2>";
    }
};

// Function to handle form submission
function movieshow(e) {
    e.preventDefault();
    const inputtext = input.value.trim();
    input.value = "";

    // Fetch and display movie data if input is not empty
    if (inputtext !== "") {
        moviecontent(inputtext);
    }
}

// Add event listener to the form
form.addEventListener("submit", movieshow);
