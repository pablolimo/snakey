function Background (context, settings) {

  const _INITIAL_SETTINGS = {
    bgColor: '#000000',
    lineColor: '#ffffff',
    lineWidth: 1
  };

  const {
    bgColor,
    lineColor,
    lineWidth
  } = { ..._INITIAL_SETTINGS, ...settings };

  let _width = 0, _height = 0, _tileSize = 0;

  this.setDimensions = function (width, height, tileSize) {
    _width = width;
    _height = height;
    _tileSize = tileSize;
  }

  function drawLine ( begin, end ) {
    context.strokeStyle = lineColor;
    context.lineWidth = lineWidth;
    context.beginPath();
    context.moveTo(...begin);
    context.lineTo(...end);
    context.stroke();
  }

  this.draw = function () {
    context.fillStyle = bgColor;
    context.fillRect(0, 0, _width, _height);
    for (let i = _tileSize; i < _width; i+=_tileSize) {
      drawLine([i, 0], [i, _height]);
      drawLine([0, i], [_width, i]);
    }
  }

  this.clear = function () {
    context.clearRect(0, 0, _width, _height);
  }

}
