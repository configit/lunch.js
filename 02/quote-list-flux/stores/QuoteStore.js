'use strict';

var assign = require( 'object-assign' );
var EventEmitter = require( 'events' ).EventEmitter;
var QuoteConstants = require( '../constants/QuoteConstants' );
var AppDispatcher = require( '../dispatcher/AppDispatcher' );
var StatusUtils = require( '../utils/status' );

var CHANGE_EVENT = 'change';

var _quotes = [
  { id: 1, name: 'First Quote', status: 'New' },
  { id: 2, name: 'Second Quote', status: 'New' },
  { id: 3, name: 'Third Quote', status: 'New' },
  { id: 4, name: 'Forth Quote', status: 'New' },
];

function updateAllStatus( status ) {
  _quotes = _quotes.map( q => {
    return { id: q.id, name: q.name, status: status };
  } );
}

function setNextStatus( q ) {
  var idx = _quotes.indexOf( q );
  _quotes[idx].status = StatusUtils.next( _quotes[idx].status );
}

function getStatusSummary( quotes ) {
  return quotes.reduce( function( sum, q ) {
    if ( StatusUtils.isNew( q.status ) ) {
      sum.newCount++;
    }
    if ( StatusUtils.isSent( q.status ) ) {
      sum.sentCount++;
    }
    if ( StatusUtils.isClosed( q.status ) ) {
      sum.closedCount++;
    }
    return sum;
  }, { newCount: 0, sentCount: 0, closedCount: 0 } );
}

var QuoteStore = assign( {}, EventEmitter.prototype, {

  getAll() {
    return _quotes;
  },

  getStatusSummary() {
    return getStatusSummary( _quotes );
  },

  emitChange() {
    this.emit( CHANGE_EVENT );
  },

  addChangeListener( callback ) {
    this.on( CHANGE_EVENT, callback );
  },

  removeChangeListener( callback ) {
    this.removeListener( CHANGE_EVENT, callback );
  }
} );

AppDispatcher.register( function( payload ) {

  var action = payload.action;

  switch( action.type ) {
    case QuoteConstants.SET_NEXT_STATUS :
      setNextStatus( action.quote );
      break;
    case QuoteConstants.CLOSE_ALL_QUOTES :
      updateAllStatus( 'Closed' )
      break;
  }

  QuoteStore.emitChange();

  return true;
} );

module.exports = QuoteStore;
