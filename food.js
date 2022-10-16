function Food (context, settings) {
  const _INITIAL_SETTINGS = {
    bgColor: '#65f90e',
  };

  const {
    bgColor,
  } = { ..._INITIAL_SETTINGS, ...settings };

  let _x = 0, _y = 0, _size = 0;

  function setPosition(x, y) {
    _x = x;
    _y = y;
  }

  this.getPosition = function () {
    return { x: _x, y: _y };
  }

  this.setSize = function (size) {
    _size = size;
  }

  this.setRandomPosition = function (occupiedTiles, maxTilesHor, maxTilesVer) {
    const randomPos = (occupiedTiles) => {
      const x = Math.round(Math.random() * maxTilesHor);
      const y = Math.round(Math.random() * maxTilesVer);
      if (occupiedTiles.some(section => (section.x === x && section.y === y)) || x >= maxTilesHor || y >= maxTilesVer) {
        return randomPos(occupiedTiles);
      }
      return [ x, y ];
    };
  
    setPosition(...randomPos(occupiedTiles));
  }

  this.draw = function() {
    context.fillStyle = bgColor;
    context.fillRect(_x * _size, _y * _size, _size, _size);
  }

}
