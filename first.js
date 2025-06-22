const searchForm = document.querySelector("form");
const movieContainer = document.querySelector(".movieContainer");
const inputBox = document.querySelector(".inputBox");
const hamburger = document.querySelector(".hamburger");
const navList = document.querySelector(".nav-list");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navList.classList.toggle("active");
});

// Close menu when clicking a link
document.querySelectorAll(".nav-list li a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navList.classList.remove("active");
  });
});

// Function to fetch movie details using OMDb API
const getMovieInfo = async (movie) => {
  // const myAPIkey = "26dbda";
  const url = `http://www.omdbapi.com/?apikey=${myAPIkey}&t=${movie}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
    showMovieData(data);
  } catch (error) {
    console.error("Error fetching movie data:", error);
  }
};

function showMovieData(data) {
  if (data.Response === "False") {
    movieContainer.innerHTML = `<div class="error">${data.Error}</div>`;
    return;
  }

  const {
    Title,
    imdbRating,
    Genre,
    Released,
    Runtime,
    Actors,
    Plot,
    Poster,
    Director,
    Year,
  } = data;

  const movieElement = document.createElement("div");
  movieElement.classList.add("movie");

  movieElement.innerHTML = `
          <div class="movie-poster">
              ${
                Poster !== "N/A"
                  ? `<img src="${Poster}" alt="${Title} poster">`
                  : '<div class="no-poster">No Poster Available</div>'
              }
          </div>
          <div class="movie-info">
              <h2>${Title} (${Year})</h2>
              <div class="movie-meta">
                  <div class="meta-item">
                      <strong>Rating</strong>
                      ⭐ ${imdbRating}/10
                  </div>
                  <div class="meta-item">
                      <strong>Runtime</strong>
                      ${Runtime}
                  </div>
                  <div class="meta-item">
                      <strong>Released</strong>
                      ${Released}
                  </div>
                  <div class="meta-item">
                      <strong>Genre</strong>
                      ${Genre}
                  </div>
              </div>
              <div class="meta-item">
                  <strong>Director</strong>
                  ${Director}
              </div>
              <div class="meta-item">
                  <strong>Cast</strong>
                  ${Actors}
              </div>
              <div class="plot">
                  <strong>Plot</strong>
                  <p>${Plot}</p>
              </div>
          </div>
      `;

  movieContainer.innerHTML = "";
  movieContainer.appendChild(movieElement);
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const movieName = inputBox.value.trim();
  if (movieName) {
    getMovieInfo(movieName);
  }
});
