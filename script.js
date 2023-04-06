let countryBtn = document.querySelector("#getCountry");
let countryText = document.querySelector("#searchCountry");

// Add a eventlistener to the button variable to listen for clicks and execute a function
countryBtn.addEventListener("click", retriveCountry);

// Country Information Fetch, function that is called with countryBtn
function retriveCountry() {
  //Fetch the API in question with a query
  fetch(`https://date.nager.at/api/v3/CountryInfo/${countryText.value}`)
    .then((response) => {
      // Error message handling
      if (!response.ok) {
        throw Error("Error!");
      }
      // return json
      return response.json();
    })
    // Write to the div with resultBox as id all the different object information
    .then((data) => {
      // Write the country specified fetch data to the div
      document.querySelector("#resultBox").innerHTML = `
      <h3>Name: <strong>${data.commonName}</strong><br>
      Official Name: <strong>${data.officialName}</strong><br>
      Country Code: <strong>${data.countryCode}</strong><br>
      Geographic Region: <strong>${data.region}</strong><br>
      Flag: <br> <br>
      <img src="img/${data.commonName}.jpg">
      </h3>
      <h2>-- Neighbors --</h2>
      `;

      // Loop through each neighboor and create a header for each
      for (i = 0; i < data.borders.length; i++) {
        let newElement = document.createElement("h3");
        newElement.innerHTML = `
        Name: <strong>${data.borders[i].commonName}</strong><br>
        Official Name: <strong>${data.borders[i].officialName}</strong><br>
        Country Code: <strong>${data.borders[i].countryCode}</strong><br>
        Geographic Region: <strong>${data.borders[i].region}</strong><br>
        Flag: <br> <br>
        <img src="img/${data.borders[i].commonName}.jpg">
       `;

        // append the content of newElement to the div
        let resultBox = document.querySelector("#resultBox");
        resultBox.appendChild(newElement);
      }
    })
    .catch((error) => {
      // Catch to handle errors
      console.log(error);
    });
}