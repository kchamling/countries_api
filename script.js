const countriesContainer = document.querySelector(".countries-container");

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {

    console.log(data);
    data.forEach((country) => {

      const countryCard = document.createElement("a");
      countryCard.classList.add("country-card");
      countryCard.href = `/country.html?name=${country.name.common}`

      const cardHTML = `
            <img src=${country.flags.svg} alt=${country.name.common} />
            <div class="card-text">
                <h3 class="card-title">${country.name.common}</h3>
                <p><b>Population: </b>${country.population.toLocaleString('en-DE')}</p>
                <p><b>Region: </b>${country.region}</p>
                <p><b>Capital: </b>${country.capital?.[0]}</p>
            </div>
            `;
      countryCard.innerHTML = cardHTML;
      countriesContainer.append(countryCard);
    });
  });
