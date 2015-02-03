'use strict';

var NEW = 'New';
var SENT = 'Sent';
var CLOSED = 'Closed';

module.exports = {
  isNew: function( status ) { return status === NEW; },

  isSent: function( status ) { return status === SENT; },

  isClosed: function( status ) { return status === CLOSED; },

  next: function( status ) {
    if ( status === NEW ) {
      return SENT;
    }
    if ( status === SENT ) {
      return CLOSED;
    }
    throw new Error( 'invalid status' );
  }
};
