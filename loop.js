function Loop (ts, callback) {
	let stop = false;
	let sleepTime = ts;

	this.gameLoop = function () {
		if (stop) {
			return;
		}
		callback();
		setTimeout(() => {
			this.gameLoop();
		}, sleepTime);
	}

	this.stopLoop = function () {
		stop = true;
	}
}