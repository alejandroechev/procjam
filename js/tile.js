/**
 * Represents a single tile of the grid
 */
(function() {
  function Tile(x, y, i, j, tileWidth, tileHeight, color, colorIndex) {
   this.x = x;
   this.y = y;
   this.i = i;
   this.j = j;
   this.tileWidth = tileWidth;
   this.tileHeight = tileHeight;
   this.color = color;
   this.colorIndex = colorIndex;
   this.mark = 0;
  }

  Tile.prototype = {
    clone: function() {
      return new Tile(this.x, this.y, this.i, this.j,
        this.color, this.colorIndex);
    },
    draw: function(context) {
      context.fillStyle = this.color == 'black' ? '#459633' : '#9dd2f2';
      context.strokeStyle = this.color == 'black' ? '#459633' : '#9dd2f2';
      context.lineWidth = 1;
      context.fillRect(this.x, this.y, this.tileWidth, this.tileHeight);
      context.strokeRect(this.x, this.y, this.tileWidth, this.tileHeight);
    },
    setMarked: function() {
      if (this.mark === 1) return;
      this.color = 'black';
      this.colorIndex = -1;
      this.mark = 1;
    }
  };

  // We export the tile
  window.Tile = Tile;
})();
