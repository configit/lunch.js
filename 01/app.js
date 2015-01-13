'use strict';

var React = require( 'react' );
var quotes = [
  { id: 1, name: 'First Quote' },
  { id: 2, name: 'Second Quote' },
  { id: 3, name: 'Third Quote' },
  { id: 4, name: 'Forth Quote' },
];

var CheckableQuote = React.createClass( {

  getInitialState: function() {
    return { checked: false };
  },

  isChecked: function( ) {
    return this.state.checked;
  },

  checkHandler: function() {
    this.setState( {checked: !this.state.checked })
  },

  checkIcon: function() {
    return this.isChecked( ) ? 'icon-check-ok' : 'icon-check-empty';
  },

  render: function() {
    var q = this.props.quote;
    return <li onClick={this.checkHandler}>
        <i className={this.checkIcon()}/> {q.id} {q.name}
      </li>;
  }
} );

var QuoteList = React.createClass( {

  render: function() {
    return (
      <div>
        <ul>{this.renderQuotes()}</ul>
      </div>
    );
  },

  renderQuotes: function(){
    return this.props.quotes.map( ( q ) => (
      <CheckableQuote quote={q} />
    ) );
  }
} );


React.render( <QuoteList quotes={quotes}/>, document.body );
