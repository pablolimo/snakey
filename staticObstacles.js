function StaticObstacles (context, settings) {

  const _INITIAL_SETTINGS = {
    bgColor: '#ffffff',
  };

  const {
    bgColor,
  } = { ..._INITIAL_SETTINGS, ...settings };

  let _body = [], _size = 0;

  this.setSize = function (size) {
    _size = size;
  }

  this.setBody = function (body) {
    _body = body;
  }

  this.getObstacles = function () {
    return _body;
  }

  this.draw = function () {
    if (!_body?.length) return;
  
    context.fillStyle = bgColor;
    for (let i = 0; i < _body.length; i++) {
      const {x, y} = _body[i];
      context.fillRect(x * _size, y * _size, _size, _size);
    }
  }
}
