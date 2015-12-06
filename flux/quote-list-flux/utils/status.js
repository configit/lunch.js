'use strict';

var NEW = 'New';
var SENT = 'Sent';
var CLOSED = 'Closed';

var isNew = ( status ) => status === NEW;
var isSent = ( status ) => status === SENT;
var isClosed = ( status ) => status === CLOSED;

module.exports = {
  isNew,
  isSent,
  isClosed,
  next: ( status ) => (
    isNew( status ) ? SENT :
      isSent( status ) ? CLOSED : null
  )
};
