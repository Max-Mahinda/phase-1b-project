let holidayText = document.querySelector("#holidayText");
let holidayBtn = document.querySelector("#getHoliday");

// Add a event listener to the input button, it listens for a "click" event and executes a function when that happens
holidayBtn.addEventListener("click", searchHolidays);

// Search holiday function, function that is called by holidayBtn
function searchHolidays() {
  // make a GET fetch request to the api with a query
  fetch(`https://date.nager.at/api/v3/PublicHolidays/2022/${holidayText.value}`)
    .then((response) => {
      // Error message
      if (!response.ok) {
        throw Error("Error!");
      }
      // return json
      return response.json();
    })
    // Handle the data we have received
    .then((data) => {
      // ForEach, creates a header for each item in the array
      data.forEach((country) => {
        let newElement = document.createElement("h3");
        newElement.innerHTML = `
        ${country.localName}<br> <strong>${country.date}</strong>
        `;

        //Append the newly created element to holidayBox
        let holidayBox = document.querySelector("#holidayBox");
        holidayBox.appendChild(newElement);
      });
    })
    .catch((error) => {
      // Catch to handle errors
      console.log(error);
    });
}