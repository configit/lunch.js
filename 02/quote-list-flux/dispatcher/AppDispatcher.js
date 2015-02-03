/*
 * AppDispatcher
 *
 * A singleton that operates as the central hub for application updates.
 */

var Dispatcher = require( 'flux' ).Dispatcher;
var assign = require ( 'object-assign' );

var AppDispatcher = assign( new Dispatcher(), {

  /**
   * A bridge function between the views and the dispatcher, marking the action
   * as a view action.  Another variant here could be dispatchServerAction.
   * @param {object} action The data coming from the view.
   */
   dispatchViewAction: function( action ) {
    this.dispatch( {
      source: 'VIEW_ACTION',
      action: action
    } );
  },

  /**
   * @param {object} action The details of the action, including the action's
   * type and additional data coming from the server.
   */
   dispatchServerAction: function( action ) {
    this.dispatch( {
      source: 'SERVER_ACTION',
      action: action
    } );
  }
});

module.exports = AppDispatcher;
