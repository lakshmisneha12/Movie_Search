const apiKey = "thewdb";   // Temporary working key

let currentSearch = "";
let currentPage = 1;
let totalResults = 0;

const moviesContainer = document.getElementById("moviesContainer");
const pagination = document.getElementById("pagination");

function searchMovies(page = 1) {
    const searchInput = document.getElementById("searchInput").value.trim();
    if (!searchInput) return;

    if (page === 1) currentSearch = searchInput;

    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${currentSearch}&page=${page}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            if (data.Response === "True") {
                displayMovies(data.Search);
                totalResults = parseInt(data.totalResults);
                currentPage = page;
                createPagination();
            } else {
                moviesContainer.innerHTML = `<p style="color:red;">${data.Error}</p>`;
                pagination.innerHTML = "";
            }
        })
        .catch(error => {
            moviesContainer.innerHTML = "<p style='color:red;'>Network Error</p>";
        });
}

function displayMovies(movies) {
    moviesContainer.innerHTML = "";

    movies.forEach(movie => {
        const div = document.createElement("div");
        div.classList.add("movie");

        div.innerHTML = `
            <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/180x250"}">
            <h4>${movie.Title}</h4>
            <p>${movie.Year}</p>
        `;

        moviesContainer.appendChild(div);
    });
}

function createPagination() {
    pagination.innerHTML = "";

    const totalPages = Math.ceil(totalResults / 10);

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.innerText = i;

        if (i === currentPage) {
            btn.style.backgroundColor = "#007bff";
            btn.style.color = "white";
        }

        btn.addEventListener("click", () => {
            searchMovies(i);
        });

        pagination.appendChild(btn);
    }
}
