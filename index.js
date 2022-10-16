'use strict';

window.addEventListener('load', () => {
	const backgroundCanvas = document.querySelector('#background');
	const gameCanvas = document.querySelector('#game');
	if (!gameCanvas?.getContext) {
		alert('No hay mapanare :(');
	}

	const game = new Game(gameCanvas, backgroundCanvas);
	let levelNumber = 0;

	const _restart = () => {
		levelNumber = 0;
		game.restart();
	};

	const _nextLevel = () => {
		levelNumber++;
		game.restart(levelNumber);
	};

	addDomEvents(_restart, _nextLevel);

	game.startGame();
});
