'use strict';

var React = require( 'react' );
var QuoteStore = require( './stores/QuoteStore' );
var Summary = require( './components/Summary' );
var QuoteList = require( './components/QuoteList' );


function getStateFromStores() {
  return {
    quotes: QuoteStore.getAll(),
    statusSummary: QuoteStore.getStatusSummary( )
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
      </div>
    );
  }
} );

React.render( <App/>, document.body );
