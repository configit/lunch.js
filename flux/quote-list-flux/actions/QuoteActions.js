'use strict';

var AppDispatcher = require( '../dispatcher/AppDispatcher' ),
    QuoteConstants = require( '../constants/QuoteConstants' );

var QuoteActions = {

  setNextStatus( q ) {
    AppDispatcher.dispatchViewAction( {
      type: QuoteConstants.SET_NEXT_STATUS,
      quote: q
    } );
  },

  closeAllQuotes() {
    AppDispatcher.dispatchViewAction( {
      type: QuoteConstants.CLOSE_ALL_QUOTES
    } );
  }
}

module.exports = QuoteActions;
