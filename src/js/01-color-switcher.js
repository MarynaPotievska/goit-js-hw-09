const body = document.querySelector('body')
const start = document.querySelector('[data-start]');
const stop = document.querySelector('[data-stop]');

let changeColorTimer;

function restartPage () {
	stop.disabled = 'true';
}

function getRandomHexColor() {
	return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

function onStartClick (evt) {
	evt.target.disabled = 'true';
	evt.target.nextElementSibling.removeAttribute('disabled');
	changeColorTimer = setInterval (() => {
		body.style.background = getRandomHexColor();
	}, 1000)
}

function onStopClick (evt) {	
	clearInterval(changeColorTimer);
	evt.target.disabled = 'true';
	evt.target.previousElementSibling.removeAttribute('disabled');
}

restartPage();

start.addEventListener('click', onStartClick);
stop.addEventListener('click', onStopClick);