'use strict';

var NEW = 'New';
var SENT = 'Sent';
var CLOSED = 'Closed';

module.exports = {
  isNew: ( status ) => status === 'New',
  isSent: ( status ) => status === 'Sent',
  isClosed: ( status ) => status === 'Closed',
  next: ( status ) => (
    StatusUtils.isNew( status ) ? 'Sent' :
    StatusUtils.isSent( status ) ? 'Closed' : null
  )
};
