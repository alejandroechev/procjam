/**
 * Represents a single tile of the grid
 */
 var terrainColor = '#459633';
 var terrainDark = '#197e09';
 var waterColor = '#9dd2f2';
 var waveColor = '#254ace';
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
        
        context.lineWidth = 1;
        if(this.color == 'black')
        {
          context.fillStyle = terrainColor;
          context.strokeStyle = terrainDark;

          context.lineWidth = 2;
          context.beginPath();
          context.arc(this.x, this.y,this.tileWidth/2,Math.PI/4,2*Math.PI);
          context.stroke();
          context.fill();

          context.lineWidth = 1;
          //context.strokeRect(this.x, this.y, this.tileWidth, this.tileHeight);
          //context.fillRect(this.x, this.y, this.tileWidth, this.tileHeight);
        }
        else
        {
          
          context.fillStyle = waterColor;
          context.strokeStyle = waterColor;
          context.fillRect(this.x, this.y, this.tileWidth, this.tileHeight);
          context.strokeRect(this.x, this.y, this.tileWidth, this.tileHeight);
          
          context.strokeStyle = waveColor;
          context.beginPath();
          context.arc(this.x, this.y,this.tileWidth/2,0,Math.PI);
          context.stroke();
          
        }
      },
      clone: function() {
        return new Tile(this.x, this.y, this.i, this.j,
          this.color, this.colorIndex);
      }
  };

  // We export the tile
  window.Tile = Tile;
})();
