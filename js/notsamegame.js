var currentContext;
var width, height;

// Initial Values
var grid;
var tileWidth = 15;
var tileHeight = 15;
var numRows = 125;
var numColumns = 200;
var numberOfColors = 2;
var xOrigin = 0;
var yOrigin = 0;
var randomClicks = 100;

var colors = ['#d0e8de', '#cf808b', '#57374d', '#dec4a6', '#999999'];

/**
 * Initializes the canvas
 * @param {HTMLCanvas} canvas
 */
function load(canvas) {
  width = canvas.width;
  height = canvas.height;
  currentContext = canvas.getContext('2d');

  canvas.addEventListener('mousedown', onMouseClicked, false);
  document.getElementById('colorSlider')
    .addEventListener('change', onColorSliderChanged, false);
  document.getElementById('rowsSlider')
    .addEventListener('change', onRowsSliderChanged, false);
  document.getElementById('columnsSlider')
    .addEventListener('change', onColumnsSliderChanged, false);
  document.getElementById('updateButton')
    .addEventListener('click', onUpdateClicked, false);
  document.getElementById('postProcessButton')
    .addEventListener('click', onPostProcessClicked, false);
  update();
}

function init() {
  for (var i = 0; i < randomClicks; i++) {
    var indexI = randNumber(numRows - 1);
    var indexJ = randNumber(numColumns - 1);
    var visitedArray = {};
    grid.updateGrid(indexI, indexJ, visitedArray);
  }
}

/**
 * Resets the state of the grid to reflect the new variables
 */
function update() {
  grid = new Grid(numRows, numColumns, width, height, xOrigin, yOrigin);
  init();
  exportGridAsText();
  requestAnimationFrame(draw);
}

/**
 * Resets the canvas and draws the grid
 */
function draw() {
  currentContext.fillStyle = '#222';
  currentContext.strokeStyle = 'white';
  currentContext.fillRect(0, 0, width, height);
  currentContext.strokeRect(0, 0, width, height);
  grid.draw(currentContext);
}

/**
 * Gets the mouse coords within the canvas
 * @param {MouseEvent} evt
 * @return {Object} {x: xCoord, y: yCoord}
 */
function getMousePos(evt) {
  var canvas = document.getElementById('display');
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
  };
}

//*************************************************************************
// EVENTS

function onMouseClicked(event) {
  var pos = getMousePos(event);
  var indexes = grid.getGridIndexesFromMouse(pos);
  var visitedArray = {};
  grid.updateGrid(indexes.i, indexes.j, visitedArray);
  exportGridAsText();
  draw();
}

function onColorSliderChanged(event) {
  numberOfColors = Math.floor(event.target.value);
}

function onRowsSliderChanged(event) {
  numRows = Math.floor(event.target.value);
}

function onColumnsSliderChanged(event) {
  numColumns = Math.floor(event.target.value);
}

function onUpdateClicked(event) {
  update();
}

function onPostProcessClicked(event) {
  var masks = document.getElementsByClassName('mask');
  var mask = [];
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      mask[i] = mask[i] || [];
      mask[i][j] = masks[j + 3 * i].checked ? 1 : 0;
    }
  }

  grid.postProcess(mask);

}

function exportGridAsText() {
  document.getElementById('textGrid').value = grid.toString();
}

function randNumber(max) {
  return Math.floor(max * Math.random() + 1);
}
