function Game (gameCanvas, backgroundCanvas) {
	const _backgroundContext = backgroundCanvas.getContext('2d');
	const _gameContext = gameCanvas.getContext('2d');
	const _levelMaker = new LevelCreator();
	const _background = new Background(_backgroundContext);
	const _gameCanvas = new Background(_gameContext);
	const _obstacles = new StaticObstacles(_backgroundContext);
	const _food = new Food(_gameContext);
	const _snake = new Snake(_gameContext);

	const _drawGrid = () => _background.draw();
	const _drawObstacles = () => _obstacles.draw();
	const _drawFood = () => _food.draw();
	const _drawSnake = () => _snake.draw();
	const _clearGameCanvas = () => _gameCanvas.clear();

	let _levelNumber = 0,
		_scoreMax = 0,
		_sleepTime = 0,
		_maxTilesHor = 0,
		_maxTilesVer = 0,
		_started = false,
		_direction = false,
		_loop = false,
		_score = 0,
		_totalScore = 0;

	function init (levelNumber = 0) {
		updateLevel(levelNumber);

		const {
			scoreMax,
			sleepTime,
			canvasMaxWidth,
			canvasMaxHeight,
			tileSize,
			staticObstacles,
			snakeBody
		} = _levelMaker.getLevel(levelNumber);

		_levelNumber = levelNumber;
		_scoreMax = scoreMax;
		_sleepTime = sleepTime;
		_maxTilesHor = Math.round(canvasMaxWidth / tileSize);
		_maxTilesVer = Math.round(canvasMaxHeight / tileSize);
		_started = true;
		_direction = false;

		_background.setDimensions(canvasMaxWidth, canvasMaxHeight, tileSize);
		_gameCanvas.setDimensions(canvasMaxWidth, canvasMaxHeight, tileSize);

		_obstacles.setBody(staticObstacles);
		_obstacles.setSize(tileSize);

		_snake.setBody([snakeBody]);
		_snake.setSize(tileSize);

		_food.setRandomPosition([..._snake.getBody(), ..._obstacles.getObstacles()], _maxTilesHor, _maxTilesVer);
		_food.setSize(tileSize);

		_loop = new Loop(_sleepTime, redraw);
		_score = 0;
		_totalScore = _totalScore && levelNumber ? _totalScore : 0;
		updateScore(_totalScore);
	};

	function reAnimate () {
		_loop.stopLoop();
		_loop = new Loop(_sleepTime, redraw);
		_loop.gameLoop();
	}

	function redraw () {
		const [ hasEaten, hasSelfEaten ] = _snake.move(_direction, _food.getPosition(), _maxTilesHor, _maxTilesVer);

		const isCollided = hasSelfEaten || _snake.checkCollision(_obstacles.getObstacles());

		if (hasEaten) {
			_score++;
			_totalScore++;
			updateScore(_totalScore);
			_food.setRandomPosition([..._snake.getBody(), ..._obstacles.getObstacles()], _maxTilesHor, _maxTilesVer);
		}

		// CONDITIONS THAN END THE GAME
		if (isCollided || _score === _scoreMax) {
			_loop.stopLoop();
			_started = false;
			_clearGameCanvas();
			_drawGrid();

			if (isCollided) {
				hideModalDefeat(false);
			} else
			if (_score === _scoreMax) {
				updateModalNextLvl(_levelNumber + 1);
			}

			return;
		}

		_drawGrid();
		_drawObstacles();
		_drawFood();
		_drawSnake();
	}

	this.startGame = function () {
		gameCanvas.addEventListener('keydown', ({ key }) => {
			if (!_started) return;

			if (
				'awsd'.match(key) ||
				'ArrowRight|ArrowDown|ArrowLeft|ArrowUp'.match(key)
			) {
				const keys = {
					a:'left',
					w: 'up',
					s: 'down',
					d: 'right',
					ArrowRight: 'right',
					ArrowDown: 'down',
					ArrowLeft: 'left',
					ArrowUp: 'up'
				};
				const newDirection = keys[key];

				if (
					(_direction === 'left' && newDirection === 'right') ||
					(_direction === 'up' && newDirection === 'down') ||
					(_direction === 'right' && newDirection === 'left') ||
					(_direction === 'down' && newDirection === 'up') ||
					(_direction === newDirection)
				) {
					return;
				}
				_direction = keys[key];
				reAnimate();
			}
		});

		init();
		_drawGrid();
		reAnimate();
	}

	this.restart = function (levelNumber = 0) {
		init(levelNumber);
		reAnimate();
		gameCanvas.focus();
	}
}
