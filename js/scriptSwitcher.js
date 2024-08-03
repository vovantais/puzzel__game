const selectField = document.querySelector(".selection"),
  chooseFieldBtn = document.querySelector(".choose-field"),
  fieldSelection = document.getElementById("fieldSelection"),
  dices = document.querySelectorAll(".dice"),
  gameBoard = document.querySelector(".game-board");
size = localStorage.getItem("SIZE");
chooseFieldBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let valueOption = selectField.options[selectField.selectedIndex].value;
  if (valueOption === "3x3" || valueOption === "4x4" || valueOption === "5x5") {
    localStorage.setItem("SIZE", valueOption);
    location.href = "";
  }
});
if (size === "3x3") {
  const script = document.createElement("script");
  script.src = "./js/script3x3-min.js";
  fieldSelection.append(script);
  gameBoard.classList.add("small");
  makeSmallField();
} else if (size === "5x5") {
  gameBoard.classList.remove("small");
  const script = document.createElement("script");
  script.src = "./js/script5x5-min.js";
  fieldSelection.append(script);
  gameBoard.classList.add("big");
  makeBigField();
} else {
  if (
    gameBoard.classList.contains("small") ||
    gameBoard.classList.contains("big")
  ) {
    gameBoard.classList.remove("small");
    gameBoard.classList.remove("big");
  }
  clearField();
  const script = document.createElement("script");
  script.src = "./js/script4x4-min.js";
  fieldSelection.append(script);
}

function makeSmallField() {
  for (let i = 0; i < dices.length; i++) {
    if (dices[i].classList.contains("field-big")) {
      dices[i].classList.remove("field-big");
    }
    if (i <= 8) {
      dices[i].classList.add("field-small");
    }
    if (i >= 9) {
      dices[i].classList.add("hidden");
    }
  }
}

function makeBigField() {
  for (let i = 0; i < dices.length; i++) {
    if (
      dices[i].classList.contains("field-small") ||
      dices[i].classList.contains("hidden") ||
      dices[i].classList.contains("big")
    ) {
      dices[i].classList.remove("field-small");
      dices[i].classList.remove("hidden");
      dices[i].classList.remove("big");
    }
  }
}

function clearField() {
  for (let i = 0; i < dices.length; i++) {
    if (
      dices[i].classList.contains("field-small") ||
      dices[i].classList.contains("hidden") ||
      dices[i].classList.contains("field-big")
    ) {
      dices[i].classList.remove("field-small");
      dices[i].classList.remove("hidden");
      dices[i].classList.remove("field-big");
    }
  }
}
