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
  }

  Tile.prototype = {
      draw: function(context) {
        context.fillStyle = this.color;
        context.strokeStyle = 'black';
        context.lineWidth = 1;
        context.fillRect(this.x, this.y, this.tileWidth, this.tileHeight);
        context.strokeRect(this.x, this.y, this.tileWidth, this.tileHeight);
      },
      clone: function() {
        return new Tile(this.x, this.y, this.i, this.j,
          this.color, this.colorIndex);
      }
  };

  // We export the tile
  window.Tile = Tile;
})();
