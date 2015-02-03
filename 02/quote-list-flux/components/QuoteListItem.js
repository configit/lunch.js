'use strict';

var React = require( 'react' );
var QuoteActions = require( '../actions/QuoteActions' );
var LinkButton = require( './LinkButton' );

var QuoteListItem = React.createClass( {

  propTypes: {
    quote: React.PropTypes.shape( {
      id: React.PropTypes.number,
      name: React.PropTypes.string,
      status: React.PropTypes.string
    } ).isRequired
  },

  handleStatusButtonClick: function( ) {
    QuoteActions.setNextStatus( this.props.quote );
  },

  getNextStatusText: function() {
    var quote = this.props.quote;
    return {New: 'Send', Sent: 'Close'}[quote.status];
  },

  render: function() {
    var q = this.props.quote;
    var nextStatusText = this.getNextStatusText();

    return <li>
        {q.name} &mdash; <small>{q.status}</small>
        {
          nextStatusText &&
          <LinkButton onClick={this.handleStatusButtonClick}>
            {this.getNextStatusText()}
          </LinkButton>
        }
      </li>;
  }
} );

module.exports = QuoteListItem;
