'use strict';

var React = require( 'react' );
var LinkButton = require( './LinkButton' );
var QuoteActions = require( '../actions/QuoteActions' );

var summaryStyle = {
  border: '1px solid #bbb',
  padding: '20px 12px',
  fontSize: '12px',
  backgroundColor: '#eee'
};


var Summary = React.createClass( {

  propTypes: {
    statusSummary: React.PropTypes.shape( {
      newCount: React.PropTypes.number,
      sentCount: React.PropTypes.number,
      closedCount: React.PropTypes.number
    } ).isRequired
  },

  handleCloseAllQuotes: function( ) {
    QuoteActions.closeAllQuotes();
  },

  render: function() {
    return <div style={summaryStyle}>
      {this.props.statusSummary.newCount} New Quotes, { }
      {this.props.statusSummary.sentCount} Sent Quotes and { }
      {this.props.statusSummary.closedCount} Closed Quotes
      <LinkButton onClick={this.handleCloseAllQuotes}>
      Close All
      </LinkButton>
    </div>;
  }
} );

module.exports = Summary;
