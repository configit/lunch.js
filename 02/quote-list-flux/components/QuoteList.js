'use strict';

var React = require( 'react' );
var QuoteListItem = require( './QuoteListItem' );

var QuoteList = React.createClass( {

  render: function() {
    return <ul>{ this.renderQuotes() }</ul>;
  },

  renderQuotes: function() {
    return this.props.quotes.map( q =>
      <QuoteListItem quote={q} onQuoteChanged={this.props.onQuoteChanged} />
    );
  }
} );

module.exports = QuoteList;
