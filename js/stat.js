// stat.js
'use strict';

var histogramHeight = 150;
var barWidth = 40;
var step = 50 + barWidth;
var initialX = 120;
var initialY = 250;
var indent = 15;

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

function createShadowOfRect(ctx) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);
}

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
  var maxTime = getMaxValue(times);
  var reducedHeight = histogramHeight / maxTime;
  for (var i = 0; i < times.length; i++) {
    // отрисовать столбцы
    setFillStyle(names, i, ctx);
    ctx.fillRect(initialX + i * step, initialY, barWidth, -times[i] * reducedHeight);

    // подписать время и имя
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillText(times[i], initialX + i * step, initialY - times[i] * reducedHeight - indent);
    ctx.fillText(names[i], initialX + i * step, initialY + indent);
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
