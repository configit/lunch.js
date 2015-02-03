'use strict';

var React = require( 'react' );

var linkButtonStyle = {
  float: 'right',
  color: 'rgb(45, 107, 158)',
  cursor: 'pointer',
  border: 'none',
  background: 'none'
};

var summaryStyle = {
  border: '1px solid #bbb',
  padding: '20px 12px',
  fontSize: '12px',
  backgroundColor: '#eee'
};

var StatusUtils = {
  isNew: ( status ) => status === 'New',
  isSent: ( status ) => status === 'Sent',
  isClosed: ( status ) => status === 'Closed',
  next: ( status ) => (
    StatusUtils.isNew( status ) ? 'Sent' :
    StatusUtils.isSent( status ) ? 'Closed' : null
  )
};

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

var quotes = [
  { id: 1, name: 'First Quote', status: 'New' },
  { id: 2, name: 'Second Quote', status: 'New' },
  { id: 3, name: 'Third Quote', status: 'New' },
  { id: 4, name: 'Forth Quote', status: 'New' },
];

var LinkButton = React.createClass( {

  render: function( ) {
    return <button style={linkButtonStyle} onClick={this.props.onClick}>
      {this.props.children}
    </button>
  }
} );

var QuoteListItem = React.createClass( {

  propTypes: {
    quote: React.PropTypes.shape( {
      id: React.PropTypes.number,
      name: React.PropTypes.string,
      status: React.PropTypes.string
    } ).isRequired,
    onQuoteChanged: React.PropTypes.func.isRequired
  },

  handleStatusButtonClick: function( ) {
    var quote = this.props.quote;
    var newQuote = {
      id: quote.id,
      name: quote.name,
      status: StatusUtils.next( quote.status )
    };

    this.props.onQuoteChanged( newQuote, quote );
  },

  getNextStatusText: function() {
    var quote = this.props.quote;
    return { New: 'Send', Sent: 'Close' }[quote.status];
  },

  render: function() {
    var q = this.props.quote;
    var nextStatusText = this.getNextStatusText();

    return <li>
        {q.name} &mdash; <small>{q.status}</small>
        {
          nextStatusText &&
          <LinkButton onClick={this.handleStatusButtonClick}>
            {nextStatusText}
          </LinkButton>
        }
      </li>;
  }
} );

var Summary = React.createClass( {

  propTypes: {
    statusSummary: React.PropTypes.shape( {
      newCount: React.PropTypes.number,
      sentCount: React.PropTypes.number,
      closedCount: React.PropTypes.number
    } ).isRequired,
    onCloseAllQuotes: React.PropTypes.func.isRequired
  },

  handleCloseAllQuotes: function( ) {
    this.props.onCloseAllQuotes();
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

var QuoteList = React.createClass( {

  render: function() {
    return <div>
      <ul>{this.renderQuotes()}</ul>
    </div>;
  },

  renderQuotes: function() {
    return this.props.quotes
      .map( (q) => (
        <QuoteListItem quote={q} onQuoteChanged={this.props.onQuoteChanged} />
      ) );
  }
} );

var App = React.createClass( {

  getInitialState: function() {
    return { quotes: quotes, statusSummary: getStatusSummary( quotes ) };
  },

  handleQuoteChanged: function( newQuote, oldQuote ) {
    var quotes = this.state.quotes;
    var idx = quotes.indexOf( oldQuote )
    quotes[idx] = newQuote;
    this.setState( {
      quotes: quotes,
      statusSummary: getStatusSummary( quotes )
    } );
  },

  handleCloseAllQuotes: function( ) {
    var quotes = this.state.quotes.map( q => {
      return { id: q.id, name: q.name, status: 'Closed' }
    });
    this.setState( {
      quotes: quotes,
      statusSummary: getStatusSummary( quotes )
    } );
  },

  render: function() {
    return <div>
        <Summary
          statusSummary={this.state.statusSummary}
          onCloseAllQuotes={this.handleCloseAllQuotes}/>
        <QuoteList
          quotes={this.state.quotes}
          onQuoteChanged={this.handleQuoteChanged}/>
      </div>;
  }
} );

React.render( <App/>, document.body );

