function getSuccessModal () {
	return document.querySelector('#notify-success');
}

function getReStartOnSuccessButton () {
	return document.querySelector('#notify-success input');
}

function getDefeatModal () {
	return document.querySelector('#notify-defeat');
}

function getReStartOnDefeatButton () {
	return document.querySelector('#notify-defeat input');
}

function getNextLevelModal () {
	return document.querySelector('#notify-next-lvl');
}

function getNextLevelButton () {
	return document.querySelector('#notify-next-lvl input');
}

function hideModalSuccess ( hide = true ) {
	getSuccessModal().classList.toggle('hidden', hide);
	if (!hide) {
		getReStartOnSuccessButton().focus();
	}
}

function hideModalNextLevel ( hide = true ) {
	getNextLevelModal().classList.toggle('hidden', hide);
	if (!hide) {
		getNextLevelButton().focus();
	}
}

function hideModalDefeat ( hide = true ) {
	getDefeatModal().classList.toggle('hidden', hide);
	if (!hide) {
		getReStartOnDefeatButton().focus();
	}
}

function updateModalNextLvl (level = 0) {
	document.getElementById('msg-next-lvl').textContent = `LVL ${level + 1}`;
	hideModalNextLevel(false);
}

function updateScore (score) {
	document.getElementById('score').textContent = `SCORE ${score}`;
}

function updateLevel (levelNumber) {
	document.getElementById('level').textContent = `LVL ${levelNumber + 1}`;
}

function addDomEvents (restart, nextLevel) {
	getReStartOnDefeatButton().addEventListener('click', () => {
		hideModalDefeat(true);
		restart();
	});

	getReStartOnDefeatButton().addEventListener('keypress', (e) => {
		e.preventDefault();
		if (e.key === 'Enter') {
			hideModalDefeat(true);
			restart();
		}
	});

	getNextLevelButton().addEventListener('click', () => {
		hideModalNextLevel(true);
		nextLevel();
	});

	getNextLevelButton().addEventListener('keypress', (e) => {
		e.preventDefault();
		if (e.key === 'Enter') {
			hideModalNextLevel(true);
			nextLevel();
		}
	});

	getReStartOnSuccessButton().addEventListener('click', () => {
		hideModalSuccess(true);
		restart();
	});

	getReStartOnSuccessButton().addEventListener('keypress', (e) => {
		e.preventDefault();
		if (e.key === 'Enter') {
			hideModalSuccess(true);
			restart();
		}
	});
}