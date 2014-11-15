/**
 * Represents a single tile of the grid
 */
(function() {
  function Tile(x, y, i, j, color, colorIndex) {
   this.x = x;
   this.y = y;
   this.i = i;
   this.j = j;
   this.color = color;
   this.colorIndex = colorIndex;
  }

  Tile.prototype = {
      draw: function(context) {
        context.fillStyle = this.color;
        context.strokeStyle = 'black';
        context.lineWidth = 1;
        context.fillRect(this.x, this.y, tileWidth, tileHeight);
        context.strokeRect(this.x, this.y, tileWidth, tileHeight);
      },
      clone: function() {
        return new Tile(this.x, this.y, this.i, this.j,
          this.color, this.colorIndex);
      }
  };

  // We export the tile
  window.Tile = Tile;
})();
