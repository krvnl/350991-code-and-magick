// stat.js
'use strict';

(function () {
  window.renderStatistics = function (ctx, names, times) {
    times = roundArrayValues(times);
    createShadowOfRect(ctx);
    createRect(ctx);
    writeTitle(ctx);
    createHistogram(ctx, times, names);
  };

  var roundArrayValues = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i] = Math.round(arr[i]);
    }

    return arr;
  };

  var createShadowOfRect = function (ctx) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(110, 20, 420, 270);
  };

  var createRect = function (ctx) {
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx.strokeRect(100, 10, 420, 270);
    ctx.fillRect(100, 10, 420, 270);
  };

  var writeTitle = function (ctx) {
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.font = '16px PT Mono';
    ctx.fillText('Ура вы победили!', 120, 40);
    ctx.fillText('Список результатов:', 120, 60);
  };

  var createHistogram = function (ctx, times, names) {
    var HISTOGRAM_HEIGHT = 150;
    var BAR_WIDTH = 40;
    var STEP = 50 + BAR_WIDTH;
    var INITIAL_X = 120;
    var INITIAL_Y = 250;
    var INDENT = 15;
    var maxTime = getMaxValue(times);
    var reducedHeight = HISTOGRAM_HEIGHT / maxTime;
    for (var i = 0; i < times.length; i++) {
      // отрисовать столбцы
      setFillStyle(names, i, ctx);
      ctx.fillRect(INITIAL_X + i * STEP, INITIAL_Y, BAR_WIDTH, -times[i] * reducedHeight);

      // подписать время и имя
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillText(times[i], INITIAL_X + i * STEP, INITIAL_Y - times[i] * reducedHeight - INDENT);
      ctx.fillText(names[i], INITIAL_X + i * STEP, INITIAL_Y + INDENT);
    }
  };

  var getMaxValue = function (arr) {
    var max = arr[0];
    for (var i = 0; i < arr.length; i++) {
      if (max < arr[i]) {
        max = arr[i];
      }
    }

    return max;
  };

  var setFillStyle = function (names, i, ctx) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var transparency = generateTransparency(1, 0.1);
      ctx.fillStyle = 'rgba(0, 0, 255, ' + transparency + ')';
    }
  };

  var generateTransparency = function (max, min) {
    return Math.random() * (max - min) + min;
  };
})();

