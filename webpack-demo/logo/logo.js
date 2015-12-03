require( './logo.css' );

function render( product ) {
  var img = require( '../images/' + product + '.png' );
  return (
    '<a href="#' + product + '" class="logo-link">' +
      '<div class="logo logo-' + product + '"></div>' +
    '</a>'
  );
}

module.exports = render;