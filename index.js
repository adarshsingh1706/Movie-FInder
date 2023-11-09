import ApiKey from "./apikey.js";

document.addEventListener("DOMContentLoaded", function () {
  const input = document.querySelector("#input_id");
  const searchForm = document.querySelector("#searchForm");
  const ulElement = document.querySelector(".searchResult");

  searchForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const movieTitle = input.value.trim();
    if (movieTitle === "") {
      alert("Please enter a movie title."); // Display an alert if the input is empty
      return;
    }
    await fetchMovieInfo(movieTitle);
    // input.value = '3 idiots';
  });

  async function fetchMovieInfo(movieTitle) {
    const apiKey = ApiKey; //  TMDb API key

    
    

    // Construct the API URL
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieTitle}`;

    try {
      // Clear previous search results by setting innerHTML to an empty string
      ulElement.innerHTML = "";

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      const result = data.results;
      const keyToPrint = "original_title";
      const description = "overview";
      const poster_path = "poster_path";

      result.forEach(function (item) {
        //creating Elements
        const baseurl = "http://image.tmdb.org/t/p/w500";

        const movieContainer = document.createElement("div");
        movieContainer.classList.add("moviediv");

       
       
       

        const posterImage = document.createElement("img");
        posterImage.src = baseurl + item.poster_path; // Set the src attribute to the poster path
        posterImage.width = 200; // Set the width to a fixed value (e.g., 200 pixels)
        posterImage.height = 300; // Set the height to a fixed value (e.g., 300 pixels)
        // posterImage.alt = item.poster_path; // Set alt text for accessibility

        const titleElement = document.createElement("h2");
        titleElement.classList.add("movieli");
        const descriptionElement = document.createElement("p");
        descriptionElement.classList.add("moviepara");
        //changing textContent
        titleElement.textContent = item[keyToPrint];
        descriptionElement.textContent = item[description];

        //appending elements to the div
        movieContainer.appendChild(posterImage);
        movieContainer.appendChild(titleElement);
        movieContainer.appendChild(descriptionElement);

        //appending it to the main ul now

        ulElement.appendChild(movieContainer);

        
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }
});
