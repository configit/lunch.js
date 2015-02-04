'use strict';

var assign = require( 'object-assign' );
var EventEmitter = require( 'events' ).EventEmitter;
var QuoteConstants = require( '../constants/QuoteConstants' );
var AppDispatcher = require( '../dispatcher/AppDispatcher' );
var StatusUtils = require( '../utils/status' );
var InstanceAPI = require( '../utils/InstanceAPI' );

var CHANGE_EVENT = 'change';

var _instances = InstanceAPI.getAllInstances();

var InstanceStore = assign( {}, EventEmitter.prototype, {

  getAll() {
    return _instances;
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

// todo should we register?

module.exports = InstanceStore;
