var logo = require( './logo/logo.js' );
var grid = require( './grid/grid.js' );

const products = ['B', 'A', 'M', 'Q'];

let run = () =>  {
  var appElm = document.getElementById( 'app' );
  var welcome = "<h1>Products</h1>";

  var logos = products.map( p => logo( p ) );
  var productGrid = grid( logos );

  appElm.innerHTML = welcome + productGrid;
}

module.exports = run;