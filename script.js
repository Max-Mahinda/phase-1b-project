document.getElementById("main-bird").addEventListener('click', function (event) {
  event.preventDefault();
});

function getRandomBird() {
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {

      if ((this.readyState == 4) && (this.status == 200)) {
          let bird = JSON.parse(this.responseText)[0];
          console.log(bird);
          document.getElementById("main-bird").src = bird;

      }
  }
  xhttp.open('GET', 'https://shibe.online/api/birds', true);
  xhttp.send();
}

// getRandomBird();

document.getElementById("main-cat").addEventListener('click', function (event) {
  event.preventDefault();
});

function getRandomCat() {
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {

      if ((this.readyState == 4) && (this.status == 200)) {
          let cat = JSON.parse(this.responseText)[0];
          console.log(cat);
          document.getElementById("main-cat").src = cat;

      }
  }
  xhttp.open('GET', 'https://shibe.online/api/cats', true);
  xhttp.send();
}

// getRandomCat();

document.getElementById("main-shiba").addEventListener('click', function (event) {
  event.preventDefault();
});

function getRandomShiba() {
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {

      if ((this.readyState == 4) && (this.status == 200)) {
          let shiba = JSON.parse(this.responseText)[0];
          console.log(shiba);
          document.getElementById("main-shiba").src = shiba;

      }
  }
  xhttp.open('GET', 'https://shibe.online/api/shibes', true);
  xhttp.send();
}

// getRandomShiba();

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.getElementById("random-form").addEventListener('submit', function (event) {
  event.preventDefault();
});

function getRandomAnimal() {
  let randomNumber = getRandomInt(1, 30);
  console.log(randomNumber);

  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {

      if ((this.readyState == 4) && (this.status == 200)) {
          let animal = JSON.parse(this.responseText)[0];
          console.log(animal);
          document.getElementById("random-animal").src = animal;
      }
  }
  if (randomNumber < 11) {
      xhttp.open('GET', 'https://shibe.online/api/birds', true);
  } else if (randomNumber > 10 && randomNumber < 21) {
      xhttp.open('GET', 'https://shibe.online/api/cats', true);
  } else {
      xhttp.open('GET', 'https://shibe.online/api/shibes', true);
  }
  xhttp.send();
}

getRandomAnimal();

document.getElementById("gallery-form").addEventListener('submit', function (event) {
  event.preventDefault();
});

let num;
let animal;
let selected;
let output;
function getAnimals() {
  let xhttp = new XMLHttpRequest();

  num = document.getElementById("gallery-input-number").value;
  console.log(num);
  selected = document.querySelector('#gallery-input-animal');
  output = selected.options[selected.selectedIndex].value;


  xhttp.onreadystatechange = function () {

      if ((this.readyState == 4) && (this.status == 200)) {
          let shibas = JSON.parse(this.responseText);
          if (shibas.length != num) {
              console.log("Error: expected " + num + " images but got " + shibas.length);
              return;
          }
          console.log("shibas: " + shibas);
          displayAnimals(shibas);
      }

  };

  xhttp.open("GET", "https://shibe.online/api/" + output + "?count=" + num + "&urls=true&httpsUrls=true");
  xhttp.send();

  document.getElementById("gallery-input-number").value = "";
}

function displayAnimals(arr) {
  for (let i = 0; i < 6; i++) {
      document.getElementById("gallery-animal-" + (i + 1)).style.display = "none";
  }

  for (let i = 0; i < arr.length; i++) {
      document.getElementById("gallery-animal-" + (i + 1)).src = arr[i];
      document.getElementById("gallery-animal-" + (i + 1)).style.display = "block";
      console.log(arr[i]);
  }
}

document.getElementById("game-form").addEventListener('submit', function (event) {
  event.preventDefault();
});

function getRandomGameAnimal() {
  let randomNumber = getRandomInt(1, 30);
  console.log(randomNumber);

  document.getElementById("game-guess-btn").style.display= "inline-block";

  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {

      if ((this.readyState == 4) && (this.status == 200)) {
          let animal = JSON.parse(this.responseText)[0];
          console.log(animal);
          document.getElementById("game-animal").src = animal;
          document.getElementById("game-animal").style.filter = "blur(10px)";
          // document.getElementById("game-animal").style.zIndex = "-1";
      }
  }
  if (randomNumber < 11) {
      xhttp.open('GET', 'https://shibe.online/api/birds', true);
      document.getElementById("game-animal").value = "bird";
  } else if (randomNumber > 10 && randomNumber < 21) {
      xhttp.open('GET', 'https://shibe.online/api/cats', true);
      document.getElementById("game-animal").value = "cat";
  } else {
      xhttp.open('GET', 'https://shibe.online/api/shibes', true);
      document.getElementById("game-animal").value = "shiba";
  }
  xhttp.send();
  console.log(document.getElementById("game-animal").value);
}

getRandomGameAnimal(document.getElementById("game-animal").value);

let selectedGame;
let outputGame;
let image;
let streak = 0;
let bestStreak = 0;
function checkGameAnimal() {
  selectedGame = document.querySelector('#game-input-animal');
  outputGame = selectedGame.options[selectedGame.selectedIndex].value;
  image = document.getElementById("game-animal");

  document.getElementById("game-guess-btn").style.display= "none";

  if (image.value == outputGame) {
      streak++;
      document.getElementById("streak").innerHTML = "Correct! Current streak: " + streak;
      console.log("Correct!");
      if (streak > bestStreak) {
          bestStreak = streak;
          document.getElementById("best-streak").innerHTML = "Highest streak: " + bestStreak;
      }
  } else {
      streak = 0;
      document.getElementById("streak").innerHTML = "Incorrect! Current streak: " + streak;
      console.log("Incorrect! The answer was: " + image.value);
  }
  image.style.filter = "none";
}