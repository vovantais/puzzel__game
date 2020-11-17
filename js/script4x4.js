const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ''],
	arrResult = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ""],
	field = document.querySelectorAll('.game-board'),
	dice = document.querySelectorAll('.dice'),
	count = document.querySelector('.counter'),
	timer = document.querySelector('.timer'),
	start_game = document.querySelector('.start-game'),
	game_board_wrapper = document.querySelector('.game-board-wrapper'),
	screen_container = document.querySelector('.screen__container'),
	wrapper_hidden = document.querySelector('.wrapper__hidden'),
	go_back = document.querySelector('.go_back'),
	congratulations_step = document.querySelector('.congratulations__step'),
	congratulations_time = document.querySelector('.congratulations__time'),
	pause = document.querySelector('.pause'),
	settings = document.querySelector('.settings'),
	settings_row = document.querySelector('.settings__row'),
	settings_icon = document.querySelector('.settings__icon'),
	item_volume = document.querySelector('.item__volume-settings'),
	volume_up = document.querySelector('.fa-volume-up'),
	date_results = document.querySelector('.date__results'),
	time_results = document.querySelector('.time__results'),
	moves_results = document.querySelector('.moves__results'),
	results_name = document.querySelector('.results__name'),
	results_date = document.querySelector('.results__date'),
	results_time = document.querySelector('.results__time'),
	results_moves = document.querySelector('.results__moves'),
	results_size = document.querySelector('.results__size');

let switchState = true;
let score = 0;
let sec = 0;
let min = 0;
let bigMin = 0;
let taimer = null;

let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
localStorage.setItem('items', JSON.stringify(itemsArray));

function startGame() {
	start_game.addEventListener('click', () => {
		if (!(pause.classList.contains('active'))) {
			start_game.classList.toggle('active');
			if (start_game.classList.contains('active')) {
				start_game.textContent = 'finish';
				shuffle(arr);
				makeGameField(arr);
				Sound();
				Timer();
			} else {
				start_game.textContent = 'start';
				clearInterval(taimer);
				score = 0;
				sec = 0;
				min = 0;
				bigMin = 0;
				count.textContent = score;
				timer.textContent = `${bigMin}${min}:0${sec}`;
			}
		}
	});
}
startGame();

function shuffle(arr) {
	arr.sort(() => Math.random() - 0.5);
	return arr;
}
function Timer() {
	taimer = setInterval(() => {
		if (!(pause.classList.contains('active'))) {
			sec++;
			if (sec < 10) {
				timer.textContent = `${bigMin}${min}:0${sec}`;
			}
			if (sec >= 10) {
				timer.textContent = `${bigMin}${min}:${sec}`;
			}
			if (sec >= 59) {
				min++;
				sec = -1;
			}
			if (min > 9) {
				bigMin++;
				min = 0;
			}
		}
	}, 1000);
}

function timeInSec(bigMin, min, sec) {
	let totalTimeSec = null;
	let oneMinInSec = 60;
	if (bigMin === 0 && min === 0) {
		return sec;
	}
	else if (min === 1 && bigMin === 0) {
		totalTimeSec = (min * oneMinInSec) + sec;
		return totalTimeSec;
	}
	else if (min > 1 && bigMin === 0) {
		totalTimeSec = (min * oneMinInSec) + sec;
		return totalTimeSec;
	}
	else if (bigMin > 0) {
		totalTimeSec = ((bigMin * oneMinInSec * 10) + (min * oneMinInSec) + sec);
		return totalTimeSec;
	}
}

function makeGameField(arr) {
	for (let i = 0; i < arr.length; i++) {
		dice[i].innerHTML = arr[i];
		if (dice[i].innerHTML === '') {
			dice[i].classList.add('empty')
		}
		if (!(dice[i].innerHTML === '')) {
			dice[i].classList.remove('empty')
		}
	}
}
function pauseGame() {
	pause.addEventListener('click', (e) => {
		e.preventDefault();
		pause.classList.toggle('active');
		if (pause.classList.contains('active')) {
			pause.textContent = 'Resume game';
		} else {
			pause.textContent = 'Pause game';
		}
	})
}
pauseGame();

function moveDice(e) {
	let diceMove = e.target.closest(".dice");
	if (!diceMove || diceMove.textContent == "") {
		return;
	}
	let next = arr.indexOf(+diceMove.textContent);
	if (!(pause.classList.contains('active')) && (start_game.classList.contains('active'))) {
		setTimeout(() => {
			if (arr[next + 1] == "" && diceMove != dice[3] && diceMove != dice[7] && diceMove != dice[11] &&
				diceMove != dice[16]) {
				arr[next + 1] = arr[next];
				arr[next] = "";
				makeGameField(arr);
				count.textContent = ++score;
			}
			if (arr[next - 1] == "" && diceMove != dice[0] && diceMove != dice[4] && diceMove != dice[8] &&
				diceMove != dice[12]) {
				arr[next - 1] = arr[next];
				arr[next] = "";
				makeGameField(arr);
				count.textContent = ++score;
			}
			if (arr[next + 4] == "") {
				arr[next + 4] = arr[next];
				arr[next] = "";
				makeGameField(arr);
				count.textContent = ++score;
			}

			if (arr[next - 4] == "") {
				arr[next - 4] = arr[next];
				arr[next] = "";
				makeGameField(arr);
				count.textContent = ++score;
			}
		}, 300);
	}
	setTimeout(() => {
		if (arr.join(',') === arrResult.join(',')) {
			if (switchState) {
				switchState = !switchState;
			}
			congratulations_step.textContent = `You won the game in ${score} moves!`;
			congratulations_time.textContent = `You've spent ${bigMin}${min}min ${sec}sec and you solved puzzle 4x4!`;
			let information = {
				name: 'User',
				data: getDateNow(),
				time: `${bigMin}${min}min ${sec}sec`,
				moves: score,
				secTime: timeInSec(bigMin, min, sec),
				size: localStorage.getItem('SIZE') === null ? '4x4' : localStorage.getItem('SIZE'),
			};

			itemsArray.push(information);
			localStorage.setItem('items', JSON.stringify(itemsArray));

			setTimeout(() => {
				wrapper_hidden.classList.add('active');
			}, 200);
			setTimeout(() => {
				screen_container.classList.add('active');
			}, 400);
			go_back.addEventListener('click', () => {
				wrapper_hidden.classList.remove('active');
				screen_container.classList.remove('active');
				window.location.reload();
			});
			clearInterval(taimer);
			score = 0;
			sec = 0;
			min = 0;
			bigMin = 0;
			count.textContent = score;
			timer.textContent = `${bigMin}${min}:0${sec}`;
			start_game.textContent = 'start';
			start_game.classList.remove('active');
		}
	}, 310);
}

function settingsModal() {
	settings_icon.addEventListener('click', () => {
		settings_icon.classList.toggle('active');
		if (settings_icon.classList.contains('active')) {
			setTimeout(() => {
				settings.classList.add('active');
				settings_row.classList.add('active');
			}, 200)
		} else {
			settings.classList.remove('active');
			settings_row.classList.remove('active');
		}
	})
}
settingsModal();

function switchSound() {
	const icon_off = document.createElement('i');
	const icon_on = document.createElement('i');
	item_volume.addEventListener('click', () => {
		item_volume.classList.toggle('active');
		switchState = !switchState;
		if (item_volume.classList.contains('active')) {
			volume_up.remove();
			icon_on.remove();
			icon_off.className = 'fas fa-volume-mute';
			item_volume.append(icon_off);
		}
		else {
			icon_off.remove()
			icon_on.className = 'fas fa-volume-up';
			item_volume.append(icon_on);
		}
	})
}
switchSound();

function Sound() {
	field[0].addEventListener('click', () => {
		if (switchState) {
			clickSound = new Audio("./sound/click.mp3");
			clickSound.play();
		}
	});
}

function setName(e) {
	if (e.type === 'keypress') {
		if (e.which == 13 || e.keyCode == 13) {
			localStorage.setItem('name', e.target.textContent);
			name_user.blur();
		}
	} else {
		localStorage.setItem('name', e.target.textContent);
	}
}

function getDateNow() {
	let DateNow = new Date(),
		date = DateNow.getDate(),
		month = DateNow.getMonth() + 1,
		year = DateNow.getFullYear();
	return `${date}.${month}.${year}`;
}

function addDataTolocalStorage() {

	const data = JSON.parse(localStorage.getItem('items'));
	const sortData = data.sort((a, b) => {
		if (a.secTime > b.secTime) {
			return 1;
		}
		if (a.secTime < b.secTime) {
			return -1;
		}
		return 0;
	})

	sortData.forEach((item, index) => {
		if (index <= 9) {

			const user = document.createElement('p'),
				date = document.createElement('p'),
				time = document.createElement('p'),
				moves = document.createElement('p'),
				size = document.createElement('p');

			user.className = 'name__user';
			date.className = 'date__results';
			time.className = 'time__results';
			moves.className = 'moves__results';
			size.className = 'size__field';

			user.textContent = `${index + 1}.${item.name}`;
			date.textContent = item.data;
			time.textContent = item.time;
			moves.textContent = item.moves;
			size.textContent = item.size;

			results_name.append(user);
			results_date.append(date);
			results_time.append(time);
			results_moves.append(moves);
			results_size.append(size);
		}
		return;
	})
}
addDataTolocalStorage();

game_board_wrapper.addEventListener('click', moveDice);