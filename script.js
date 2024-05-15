const countriesContainer = document.querySelector(".countries-container");

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
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
  })
  .catch((error) => {
    console.log("Error fetching data:", error);
  });
