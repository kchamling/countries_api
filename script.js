const countriesContainer = document.querySelector(".countries-container");
const searchQuery = document.querySelector("#search-query");
const filterByRegion = document.querySelector(".filter-by-region");
const themeChanger = document.querySelector(".theme-changer");
const icon = document.querySelector(".theme-changer i");

let allCountriesData;

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.body.classList.add(savedTheme);
}

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    renderCountries(data);
    allCountriesData = data;
  })
  .catch((error) => {
    console.log("Error fetching data:", error);
  });

function renderCountries(data) {
  countriesContainer.innerHTML = "";
  data.forEach((country) => {
    // Check if the country has a capital property and it's an array
    if (country.hasOwnProperty("capital") && Array.isArray(country.capital)) {
      let capitalInfo;
      // Check if the country has multiple capitals
      if (country.capital.length > 1) {
        capitalInfo = country.capital.join(", ");
      } else if (country.capital.length === 1) {
        capitalInfo = country.capital[0];
      } else {
        capitalInfo = "N/A";
      }

      // Create country card
      const countryCard = document.createElement("a");
      countryCard.href = `/country.html?name=${country.name.common}`;
      countryCard.classList.add("country-card");
      countryCard.innerHTML = `
        <div class="country-flag">
          <img src="${country.flags.svg}"/>
        </div>
        <h2>${country.name.common}</h2>
        <div class="country-details">
          <p><b>Population:</b>&nbsp;${country.population}</p>
          <p><b>Region:</b>&nbsp;${country.region}</p>
          <p><b>Capital:</b>&nbsp;${capitalInfo}</p>
        </div> 
      `;
      countriesContainer.append(countryCard);
    }
  });
}

filterByRegion.addEventListener("change", (e) => {
  fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
    .then((res) => res.json())
    .then((data) => {
      renderCountries(data);
    });
});

searchQuery.addEventListener("input", (e) => {
  console.log(e.target.value);

  const filteredCountries = allCountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  );
  renderCountries(filteredCountries);
});

themeChanger.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const theme = document.body.classList.contains("dark") ? "dark" : "";
  localStorage.setItem("theme", theme);
  document.querySelector(".header-container").classList.toggle("dark");
  document.querySelector("header").classList.toggle("dark");
  themeChanger.innerHTML = `<i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Light Mode `;
});
