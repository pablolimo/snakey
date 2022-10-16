function LevelCreator () {

	const CORNERS = [
		"0:0;0:1;0:2;1:0;2:0;9:0;9:1;9:2;8:0;7:0;0:9;0:8;0:7;1:9;2:9;9:9;9:8;9:7;8:9;7:9",
		"0:0;0:1;0:2;1:0;2:0;14:0;14:1;14:2;13:0;12:0;0:14;0:13;0:12;1:14;2:14;14:14;14:13;14:12;13:14;12:14",
		"0:0;0:1;0:2;1:0;2:0;19:0;19:1;19:2;18:0;17:0;0:19;0:18;0:17;1:19;2:19;19:19;19:18;19:17;18:19;17:19",
		"0:0;0:1;0:2;1:0;2:0;29:0;29:1;29:2;28:0;27:0;0:29;0:28;0:27;1:29;2:29;29:29;29:28;29:27;28:29;27:29"
	];
	const SQUARES = [
		"0:0;9:0;2:2;3:2;6:2;7:2;2:3;7:3;2:4;7:4;2:5;7:5;2:6;7:6;2:7;3:7;6:7;7:7;0:9;9:9",
		"0:0;14:0;2:2;3:2;4:2;5:2;6:2;8:2;9:2;10:2;11:2;12:2;2:3;12:3;2:4;12:4;2:5;12:5;2:6;12:6;2:7;7:7;12:7;2:8;12:8;2:9;12:9;2:10;12:10;2:11;12:11;2:12;3:12;4:12;5:12;6:12;8:12;9:12;10:12;11:12;12:12;0:14;14:14",
		"0:0;19:0;2:2;3:2;4:2;5:2;6:2;7:2;8:2;11:2;12:2;13:2;14:2;15:2;16:2;17:2;2:3;17:3;2:4;17:4;2:5;17:5;2:6;17:6;2:7;17:7;2:8;17:8;2:9;17:9;2:10;17:10;2:11;17:11;2:12;17:12;2:13;17:13;2:14;17:14;2:15;17:15;2:16;17:16;2:17;3:17;4:17;5:17;6:17;7:17;8:17;11:17;12:17;13:17;14:17;15:17;16:17;17:17;0:19;19:19;6:6;7:6;8:6;9:6;10:6;11:6;12:6;13:6;6:7;13:7;6:8;13:8;6:11;13:11;6:12;13:12;6:13;7:13;8:13;9:13;10:13;11:13;12:13;13:13",
		"0:0;0:1;0:2;1:0;2:0;29:0;29:1;29:2;28:0;27:0;0:29;0:28;0:27;1:29;2:29;29:29;29:28;29:27;28:29;27:29;3:4;4:4;5:4;6:4;7:4;9:4;10:4;11:4;12:4;13:4;3:5;13:5;3:6;13:6;3:7;13:7;3:8;13:8;3:9;8:9;13:9;3:10;13:10;3:11;13:11;3:12;13:12;3:13;13:13;3:14;4:14;5:14;6:14;7:14;9:14;10:14;11:14;12:14;13:14;16:4;17:4;18:4;19:4;20:4;22:4;23:4;24:4;25:4;26:4;16:5;26:5;16:6;26:6;16:7;26:7;16:8;26:8;16:9;21:9;26:9;16:10;26:10;16:11;26:11;16:12;26:12;16:13;26:13;16:14;17:14;18:14;19:14;20:14;22:14;23:14;24:14;25:14;26:14;3:15;4:15;5:15;6:15;7:15;9:15;10:15;11:15;12:15;13:15;3:16;13:16;3:17;13:17;3:18;13:18;3:19;13:19;3:20;8:20;13:20;3:21;13:21;3:22;13:22;3:23;13:23;3:24;13:24;3:25;4:25;5:25;6:25;7:25;9:25;10:25;11:25;12:25;13:25;16:15;17:15;18:15;19:15;20:15;22:15;23:15;24:15;25:15;26:15;16:16;26:16;16:17;26:17;16:18;26:18;16:19;26:19;16:20;21:20;26:20;16:21;26:21;16:22;26:22;16:23;26:23;16:24;26:24;16:25;17:25;18:25;19:25;20:25;22:25;23:25;24:25;25:25;26:25"
	];
	const FACES = [
		"2:2;7:2;2:3;7:3;2:6;7:6;3:7;4:7;5:7;6:7",
		"4:2;10:2;3:3;4:3;5:3;10:3;9:3;11:3;4:4;10:4;7:6;6:7;7:7;8:7;2:10;12:10;3:11;4:11;5:11;6:11;7:11;8:11;9:11;10:11;11:11;4:12;10:12",
		"3:2;4:2;5:2;6:2;3:3;7:3;5:4;5:5;12:2;13:2;14:2;15:2;12:3;16:3;14:4;14:5;7:10;11:10;8:11;9:11;10:11;5:15;5:14;7:15;7:16;9:15;9:14;11:15;11:16;13:15;13:14",
		"5:5;4:6;5:6;6:6;7:6;3:7;8:7;5:8;6:8;6:9;5:11;6:11;17:5;16:6;17:6;18:6;19:6;15:7;20:7;17:8;18:8;18:9;17:11;18:11;12:11;11:12;10:13;9:14;8:15;8:16;9:17;10:17;11:17;7:20;8:21;9:21;10:21;11:20;12:20;13:21;14:21;15:21;16:20;10:25;11:25;12:25;13:25;11:26;12:26;24:9;25:8;26:7;27:7;28:8;28:9;28:10;27:11;27:12;26:13;25:13;24:12"
	];

	const MAX_LEVEL_NUMBER = 1000;
	const INITIAL_SCORE_MAX = 10;
	const MAX_SCORE_PER_LEVEL = 150;
	const SCOREMAX_MULTIPLIER = 1;
	const INITIAL_SLEEP_TIME = 500;
	const SLEEPTIME_DIVIDEND = 95;
	const MIN_SLEEP_TIME = 50;
	const CANVAS_SIZE = { canvasMaxWidth: 360, canvasMaxHeight: 360 };
	const LEVEL_TILE_UNIT_CONFIGS = [36, 24, 18, 12];
	const LEVEL_OBSTACLE_OPTIONS = [
		CORNERS,
		SQUARES,
		FACES
	];

	let _obtacleKind = false;

	function getSnakeInitialPosition (occupiedTiles, maxTilesHor, maxTilesVer) {
		const randomPos = (occupiedTiles) => {
			const x = Math.round(Math.random() * maxTilesHor);
			const y = Math.round(Math.random() * maxTilesVer);
			if (occupiedTiles.some(section => (section.x === x && section.y === y)) || x >= maxTilesHor || y >= maxTilesVer) {
				return randomPos(occupiedTiles);
			}
			return { x, y };
		};
	
		return randomPos(occupiedTiles);
	}

	function getLevelObstacleConfiguration (levelNumber, tileSize) {
		if (levelNumber === 0) return [];

		if (_obtacleKind === false || _obtacleKind === (LEVEL_OBSTACLE_OPTIONS.length - 1)) {
			_obtacleKind = 0;
		} else {
			_obtacleKind++;
		}

		const levelKind = LEVEL_OBSTACLE_OPTIONS[_obtacleKind];
		let levelChosen = levelKind[0];

		switch (tileSize) {
			case LEVEL_TILE_UNIT_CONFIGS[0]:
				levelChosen = levelKind[0];
				break;
			case LEVEL_TILE_UNIT_CONFIGS[1]:
				levelChosen = levelKind[1];
				break;
			case LEVEL_TILE_UNIT_CONFIGS[2]:
				levelChosen = levelKind[2];
				break;
			case LEVEL_TILE_UNIT_CONFIGS[3]:
				levelChosen = levelKind[3];
				break;
		}

		return levelChosen.split(';').map(coords => {
			const [x, y] = coords.split(':');
			return { x: Number(x), y: Number(y) }
		});
	}

	function getLevelConfig (levelNumber) {
		if (levelNumber === 0) return {
			tileSize: LEVEL_TILE_UNIT_CONFIGS[0],
			obstacles: [],
			snake: getSnakeInitialPosition(
				[],
				Math.round(CANVAS_SIZE.canvasMaxWidth / LEVEL_TILE_UNIT_CONFIGS[0]),
				Math.round(CANVAS_SIZE.canvasMaxHeight / LEVEL_TILE_UNIT_CONFIGS[0])
			)
		};

		let tileSize = 30;

		if (levelNumber <= 3) {
			tileSize = LEVEL_TILE_UNIT_CONFIGS[0];
		} else
		if (levelNumber <= 6) {
			tileSize = LEVEL_TILE_UNIT_CONFIGS[1];
		} else
		if (levelNumber <= 9) {
			tileSize = LEVEL_TILE_UNIT_CONFIGS[2];
		} else {
			tileSize = LEVEL_TILE_UNIT_CONFIGS[3];
		}

		const obstacles = getLevelObstacleConfiguration(levelNumber, tileSize);
		const snake = getSnakeInitialPosition(
			obstacles,
			Math.round(CANVAS_SIZE.canvasMaxWidth / tileSize),
			Math.round(CANVAS_SIZE.canvasMaxHeight / tileSize)
		);

		return {
			tileSize,
			obstacles,
			snake
		};
	}

	this.getLevel = function ( levelNumber ) {
		if (levelNumber >= MAX_LEVEL_NUMBER) return;

		const { tileSize, obstacles, snake } = getLevelConfig(levelNumber);

		let levelScoreMax = levelNumber < 995 ?
			INITIAL_SCORE_MAX + ( levelNumber * SCOREMAX_MULTIPLIER ) : MAX_SCORE_PER_LEVEL;

		let levelSleepTime = INITIAL_SLEEP_TIME;
		if (levelNumber > 0) {
			for (let i = 1; i <= levelNumber; i++) {
				const timeReduction = Math.round(SLEEPTIME_DIVIDEND / Math.min(i, 5));
				levelSleepTime = levelSleepTime - timeReduction;
	
				if (levelSleepTime < MIN_SLEEP_TIME) {
					levelSleepTime = MIN_SLEEP_TIME;
					break;
				}
			}
		}

		const newLevel = {
			...CANVAS_SIZE,
			tileSize,
			scoreMax: levelScoreMax,
			sleepTime: levelSleepTime,
			staticObstacles: obstacles,
			snakeBody: snake,
		}

		return newLevel;
	}
}