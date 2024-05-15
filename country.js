const countryName = new URLSearchParams(location.search).get("name");
const flagImage = document.querySelector(".country-details-container img");
const countyNameH2 = document.querySelector(".country-details-text h2");
const nativeName = document.querySelector("#native-name");
const population = document.querySelector("#population");
const capital = document.querySelector("#capital");
const region = document.querySelector("#region");
const subRegion = document.querySelector("#sub-region");
const topLevelDomain = document.querySelector("#top-level-domain");
const currency = document.querySelector("#currencies");
const language = document.querySelector("#languages");
const borderCountries = document.querySelector(".border-countries");

// fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
//   .then((res) => res.json())
//   .then( (data) => {
//     console.log(data);
//   }
//     // console.log(country.borders);

//     // countyNameH1.innerText = country.name.common;
//     // region.innerText = country.region;
//     // flagImage.src = country.flags.svg;
//     // population.innerText = country.population.toLocaleString("en-DE");
//     // topLevelDomain.innerText = country.tld.join(", ");

//     // if (country.name.nativeName) {
//     //   nativeName.innerText = Object.values(country.name.nativeName)[0].common;
//     // } else {
//     //   nativeName.innerText = country.name.common;
//     // }

//     // if (country.capital) {
//     //   capital.innerText = country.capital?.[0];
//     // }

//     // if (country.subregion) {
//     //   subRegion.innerText = country.subregion;
//     // }

//     // if (country.currencies) {
//     //   currency.innerText = Object.values(country.currencies)
//     //     .map((currency) => currency.name)
//     //     .join(", ");
//     // }

//     // if (country.languages) {
//     //   language.innerText = Object.values(country.languages).join(", ");
//     // }

//     // if (country.borders) {
//     //   country.borders.forEach((border) => {
//     //     fetch(`https://restcountries.com/v3.1/alpha/${border}`)
//     //       .then((res) => res.json())
//     //       .then(([borderCountry]) => {
//     //         console.log(borderCountry);

//     //         const borderCountryTag = document.createElement("a");
//     //         borderCountryTag.innerText = borderCountry.name.common;
//     //         borderCountryTag.href = `country.html?name=${ borderCountry.name.common}`

//     //         borderCountries.append(borderCountryTag);
//     //       });
//     //   });
//     // }
//   })

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    console.log(country);

    flagImage.src = country.flags.svg;
    countyNameH2.innerText = country.name.common;
    region.innerText = country.region;
    subRegion.innerText = country.subregion;
    topLevelDomain.innerText = country.tld;
  
    population.innerText = country.population.toLocaleString("en-DE");
  });
