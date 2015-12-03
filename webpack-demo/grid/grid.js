require( './grid.css' );

function render( cells ) {
  var result = '<div class="grid-row">';

  result += cells.map( function( cell ) {
    return '<div>' + cell + '</div>';
  } ).join( '\n' );

  result += '</div>';
  return result;
}

module.exports = render;