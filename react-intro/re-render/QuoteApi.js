'use strict';

var statuses = [
  'New', 'Draft', 'Sent', 'Confirmed', 'Rejected'
];

function generateQuotes( count ) {
  var quotes = [];
  for ( var i = 0; i < count; i++ ) {
    var ri = getRandomInt( 0, statuses.length );
    quotes[i] = { id: i, name: 'Quote ' + i, status: statuses[ri] };
  }
  return quotes;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
  get: generateQuotes
};
