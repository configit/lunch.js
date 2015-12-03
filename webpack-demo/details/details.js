require( '../style.css' );
require( './details.css' );

var logo = require( '../logo/logo.js' );

var PRODUCT_DESCRIPTIONS = {
  Q: 'Integrated configure-price-quote solution ideal for organizations selling complex configurable products using SAP Variant Configurator.',
  A: 'An enterprise application for managing configuration complexity throughout the entire product life cycle.',
  M: 'Modeling and runtime environments that make developing configurator applications fast and efficient.',
  B: 'Build the desired configurator user experience with the comprehensive configure-price-quote kit for the visual solution configuration of advanced products.'
};

function run() {
  var appElm = document.getElementById( 'app' );
  var product = window.location.hash.replace( '#', '' );

  var logoHtml = logo( product );
  var description =
    '<p class="product-intro">' +
       PRODUCT_DESCRIPTIONS[product] +
    '</p>';

  appElm.innerHTML = logoHtml + description;
}

module.exports = run;
