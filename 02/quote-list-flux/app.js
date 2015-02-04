'use strict';

var React = require( 'react' );

var QuoteStore = require( './stores/QuoteStore' );
var InstanceStore = require( './stores/InstanceStore' );

var Summary = require( './components/Summary' );
var QuoteList = require( './components/QuoteList' );
var InstanceList = require( './components/InstanceList' );

function getStateFromStores() {
  return {
    quotes: QuoteStore.getAll(),
    statusSummary: QuoteStore.getStatusSummary( ),
    sceInstances: InstanceStore.getAll()
  };
}

var App = React.createClass( {

  getInitialState: function() {
    return getStateFromStores()
  },

  componentDidMount: function() {
    QuoteStore.addChangeListener( this._onChange );
  },

  componentWillUnmount: function() {
    QuoteStore.removeChangeListener( this._onChange );
  },

  _onChange() {
    this.setState( getStateFromStores() );
  },

  render: function() {
    return (
      <div>
        <Summary statusSummary={this.state.statusSummary}/>
        <QuoteList quotes={this.state.quotes}/>
        <InstanceList sceInstances={this.state.sceInstances}/>
      </div>
    );
  }
} );

React.render( <App/>, document.body );
