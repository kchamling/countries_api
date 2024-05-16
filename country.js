const countryName = new URLSearchParams(location.search).get("name");
const flagImage = document.querySelector(".country-details-container img");
const countyNameH2 = document.querySelector(".country-details-text h2");
const nativeName = document.querySelector("#native-name");
const population = document.querySelector("#population");
const capital = document.querySelector("#capital");
const region = document.querySelector("#region");
const subRegion = document.querySelector("#sub-region");
const topLevelDomain = document.querySelector("#top-level-domain");
const currencies = document.querySelector("#currencies");
const language = document.querySelector("#languages");
const borderCountries = document.querySelector(".border-countries-container");

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    console.log(country);

    if (country.name.nativeName) {
      nativeName.innerText = Object.values(country.name.nativeName)
        .map((nativeName) => nativeName.official)
        .join(", ");
    } else {
      nativeName.innerText = country.name.common;
    }

    if (Array.isArray(country.capital) && country.capital) {
      if (country.capital.length === 1) {
        capital.innerText = country.capital[0];
      } else if (country.capital.length > 1) {
        capital.innerText = country.capital.join(", ");
      } else {
        capital.innerText = "N/A";
      }
    }

    if (country.currencies) {
      currencies.innerText = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(", ");
    } else {
      currencies.innerText = "N/A";
    }

    if (country.languages) {
      language.innerText = Object.values(country.languages).join(", ");
    } else {
      language.innerText = "N/A";
    }
    flagImage.src = country.flags.svg;
    countyNameH2.innerText = country.name.common;
    region.innerText = country.region;
    subRegion.innerText = country.subregion;
    topLevelDomain.innerText = country.tld;
    population.innerText = country.population.toLocaleString("en-DE");

    if (Array.isArray(country.borders) && country.borders) {
      country.borders.forEach((border) => {
        // console.log(border);

        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => {
            console.log(borderCountry);

            const borderCountryTag = document.createElement("a");
            borderCountryTag.innerText = borderCountry.name.common;
            borderCountryTag.href = `/country.html?name=${borderCountry.name.common}`;

            borderCountries.append(borderCountryTag);
          });
      });
    }
  });
