function Snake (context, settings) {
  const _INITIAL_SETTINGS = {
    color: 'red',
  };

  const {
    color,
  } = { ..._INITIAL_SETTINGS, ...settings };

  let _body = [], _sectionSize = 0, _residue = false;

  this.setBody = function (body) {
    _body = body;
  }

  this.getBody = function () {
    return _body;
  }

  this.setSize = function (size) {
    _sectionSize = size;
  }

  function checkSelfCollision() {
    if (_body.length === 1) return false;

    const head = _body[0];
    const body = _body.slice(1);

    return body.some(section => section.x === head.x && section.y === head.y);
  }

  this.checkCollision = function (colliders) {
    const head = _body[0];
  	return colliders.some(section => section.x === head.x && section.y === head.y);
  }

  this.move = function (direction, foodPosition, maxTilesHor, maxTilesVer) {
    if (direction) {
      let head = {..._body[0]};
      switch (direction) {
        case 'left':
          head.x = head.x - 1;
          break;
        case 'right':
          head.x = head.x + 1;
          break;
        case 'up':
          head.y = head.y - 1;
          break;
        case 'down':
          head.y = head.y + 1;
          break;
      }
  
      if (head.x >= maxTilesHor) head.x = 0;
      if (head.y >= maxTilesVer) head.y = 0;
      if (head.x < 0) head.x = maxTilesHor - 1;
      if (head.y < 0) head.y = maxTilesVer - 1;

      const hasEaten = (head.x === foodPosition.x && head.y === foodPosition.y);

      if (!hasEaten) {
        _residue = _body.pop();
      }
      this.setBody([head, ..._body]);

      const hasSelfEaten = checkSelfCollision();

      return [ hasEaten, hasSelfEaten ];
    }
    return [ false, false ];
  }

  function clearResidue () {
    if (!_residue) return;
    context.clearRect(_residue.x * _sectionSize, _residue.y * _sectionSize, _sectionSize, _sectionSize);
    _residue = false;
  }

  this.draw = function () {
    clearResidue();

    context.fillStyle = color;
    for (let i = 0; i < _body.length; i++) {
      const {x, y} = _body[i];
      context.fillRect(x * _sectionSize, y * _sectionSize, _sectionSize, _sectionSize);
    }
  }
}
