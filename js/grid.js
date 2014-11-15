(function() {
  function Grid(numRows, numColumns, width, height, xOrigin, yOrigin) {
    this.numRows = numRows;
    this.numColumns = numColumns;
    this.width = width;
    this.height = height;
    this.xOrigin = xOrigin;
    this.yOrigin = yOrigin;
    this.tileWidth = width / numColumns;
    this.tileHeight = height / numRows;

    this.deltaI = [-1, 1, 0, 0];
    this.deltaJ = [0, 0, -1, 1];

    this.grid = new Array(numRows);
    for (var i = 0; i < this.grid.length; i++) {
      this.grid[i] = new Array(numColumns);
    }

    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid[i].length; j++) {
        var randProbability = Math.random();
        /*var randColorIndex = 0;
        if(randProbability > 0.55)
          randColorIndex = 1;*/
        var randColorIndex = Math.floor((Math.random() * numberOfColors));
        var xy = this.getXYforIJ(i, j);
        this.grid[i][j] = new Tile(xy.x, xy.y, i, j,
          this.tileWidth, this.tileHeight,
          colors[randColorIndex], randColorIndex);
      }
    }
  }

  /**
   * Class Methods
   */
  Grid.positionToIndex = function(i, j) {
    return i + numRows * j;
  };

  /**
   * Instance Methods
   */
  Grid.prototype = {
    checkNeighbours: function(tile) {
      var neighbours = [];
      for (var i = 0; i < this.deltaI.length; i++) {
        var dI = this.deltaI[i];
        var dJ = this.deltaJ[i];
        if (this.checkBounds(tile.i + dI, tile.j + dJ)) {
          var neighbour = this.grid[tile.i + dI][tile.j + dJ];
          if (neighbour.color == tile.color) neighbours.push(neighbour);
        }
      }
      return neighbours;
    },
    checkBounds: function(i, j) {
      if (i < 0) return false;
      if (j < 0) return false;
      if (i >= numRows) return false;
      if (j >= numColumns) return false;
      return true;
    },
    /**
     * Renders the grid to the canvas
     * @param {Canvas 2D context} currentContext
     */
    draw: function(currentContext) {
      for (var i = 0; i < this.grid.length; i++) {
        for (var j = 0; j < this.grid[i].length; j++) {
          this.grid[i][j].draw(currentContext);
        }
      }
    },
    getGridIndexesFromMouse: function(pos) {
      var i = Math.floor((pos.y - this.yOrigin) / this.tileHeight);
      var j = Math.floor((pos.x - this.xOrigin) / this.tileWidth);
      return { i: i, j: j };
    },
    getXYforIJ: function(i, j) {
      return{
        x: j * this.tileWidth + this.xOrigin,
        y: i * this.tileHeight + this.yOrigin
      };
    },
    toString: function() {
      var string = '';
      for (var i = 0; i < this.grid.length; i++) {
        for (var j = 0; j < this.grid[i].length; j++) {
          if (this.grid[i][j].color == 'black') {
            string = string + ' ';
          }
          else {
            string = string + '*';
          }
        }
        string = string + '\n';
      }
      return string;
    },
    updateGrid: function(i, j, visitedArray) {
      var tile = this.grid[i][j];
      var neighbours = this.checkNeighbours(tile);
      this.grid[tile.i][tile.j].color = 'black';
      this.grid[tile.i][tile.j].colorIndex = -1;
      visitedArray[Grid.positionToIndex(tile.i, tile.j)] = true;
      for (var i = 0; i < neighbours.length; i++) {
        if (!visitedArray[
            Grid.positionToIndex(neighbours[i].i, neighbours[i].j)])
          this.updateGrid(neighbours[i].i, neighbours[i].j, visitedArray);
      }
    }
  };

  // We export the variable
  window.Grid = Grid;
})();
