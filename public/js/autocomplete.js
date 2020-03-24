// ===============================================================
// =====================---EXAMPLE COFIG---=======================
// ===============================================================
// *************autocomplete widget for omdbAPI*******************
// ***************************************************************
// createAutoComplete({
//   root: document.querySelector(".autocomplete"),
//   renderOption(movie) {
//     // quick check if movie has poster in database, if not source will be set as empty string
//     const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
//     return `
//       <img src="${imgSrc}" />
//       ${movie.Title} (${movie.Year})
//     `;
//   },
//   onOptionSelect(movie) {
//     onMovieSelect(movie); //function declared in index.js
//   },
//   inputValue(movie) {
//     return movie.Title;
//   },
//   async fetchData(searchTerm) {
//     const response = await axios.get("http://www.omdbapi.com/", {
//       params: {
//         apikey: "912e4b6b",
//         s: searchTerm
//       }
//     });
//     if (response.data.Error) {
//       return [];
//     }
//     return response.data.Search;
//   }
// });
// ===============================================================
const createAutoComplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData
}) => {
  //   BULMA CSS LIBRARY USED
  //     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.css" />
  // make search input and dropdown menu base
  root.innerHTML = `
  <label><b>Search</b></label>
  <input class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
    `;

  const input = root.querySelector("input");
  const dropdown = root.querySelector(".dropdown");
  const resultsWrapper = root.querySelector(".results");

  const onInput = async event => {
    const items = await fetchData(event.target.value);
    // if there are no items found don't show a dropdown
    if (!items.length) {
      dropdown.classList.remove("is-active");
      return;
    }
    //  Clearing list before new search
    resultsWrapper.innerHTML = "";
    // add class to make dropdown visible
    dropdown.classList.add("is-active");
    // creating dropdown menu element for found items
    for (let item of items) {
      const option = document.createElement("a");

      option.classList.add("dropdown-item");
      option.innerHTML = renderOption(item);
      // when click on an option from a dropdown, close dropdown and update input value by a clicked item
      // then call function which render request for a chosen item
      option.addEventListener("click", () => {
        dropdown.classList.remove("is-active");
        input.value = inputValue(item);
        onOptionSelect(item);
      });

      resultsWrapper.appendChild(option);
    }
  };
  // function from utils.js
  input.addEventListener("input", debounce(onInput, 650));
  // look for click in any other place than dropdown menu, if so- close dropdown
  document.addEventListener("click", event => {
    if (!root.contains(event.target)) {
      dropdown.classList.remove("is-active");
    }
  });
};
