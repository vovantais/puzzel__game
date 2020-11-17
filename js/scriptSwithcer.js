const select_feild = document.querySelector('.selection'),
	choose_field_btn = document.querySelector('.choose-field'),
	fieldSelection = document.getElementById('fieldSelection'),
	dices = document.querySelectorAll('.dice'),
	game_board = document.querySelector('.game-board');
size = localStorage.getItem("SIZE");
choose_field_btn.addEventListener('click', (e) => {
	e.preventDefault();
	let valueOption = select_feild.options[select_feild.selectedIndex].value;
	if (valueOption === "3x3" || valueOption === "4x4" || valueOption === "5x5") {
		localStorage.setItem("SIZE", valueOption);
		location.href = "";
	}
})
if (size === "3x3") {
	const script = document.createElement("script");
	script.src = "./js/script3x3-min.js";
	fieldSelection.append(script);
	game_board.classList.add('small');
	makeSmallField();
} else if (size === "5x5") {
	game_board.classList.remove('small')
	const script = document.createElement("script");
	script.src = "./js/script5x5-min.js";
	fieldSelection.append(script);
	game_board.classList.add('big');
	makeBigField();
} else {
	if (game_board.classList.contains('small') || game_board.classList.contains('big')) {
		game_board.classList.remove('small');
		game_board.classList.remove('big');
	}
	claerField();
	const script = document.createElement("script");
	script.src = "./js/script4x4-min.js";
	fieldSelection.append(script);
}

function makeSmallField() {
	for (let i = 0; i < dices.length; i++) {
		if (dices[i].classList.contains('field-big')) {
			dices[i].classList.remove('field-big');
		}
		if (i <= 8) {
			dices[i].classList.add('field-small');
		}
		if (i >= 9) {
			dices[i].classList.add('hidden');
		}
	}
}

function makeBigField() {
	for (let i = 0; i < dices.length; i++) {
		if (dices[i].classList.contains('field-small') || dices[i].classList.contains('hidden') || dices[i].classList.contains('big')) {
			dices[i].classList.remove('field-small');
			dices[i].classList.remove('hidden');
			dices[i].classList.remove('big');
		}
	}
}

function claerField() {
	for (let i = 0; i < dices.length; i++) {
		if (dices[i].classList.contains('field-small') || dices[i].classList.contains('hidden') || dices[i].classList.contains('field-big')) {
			dices[i].classList.remove('field-small');
			dices[i].classList.remove('hidden');
			dices[i].classList.remove('field-big');
		}
	}
}