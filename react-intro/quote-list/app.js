'use strict';

var React = require( 'react' );

var quotes = [
  { id: 1, name: 'First Quote' },
  { id: 2, name: 'Second Quote' },
  { id: 3, name: 'Third Quote' },
  { id: 4, name: 'Forth Quote' }
];

var CheckedLine = React.createClass( {

  getInitialState() {
    return { checked: false };
  },

  handleClick() {
    var toggledCheck = !this.state.checked;

    this.setState( { checked: toggledCheck } );
    this.props.onCheckChanged( toggledCheck );
  },

  render() {
    var icon = this.state.checked ? 'icon-check' : 'icon-empty';
    return <div onClick={this.handleClick}>
      <i className={icon}/> {this.props.children}
    </div>;
  }
} );

var Summary = React.createClass( {
  render() {
    return <div>{this.props.checkedCount} Checked</div>;
  }
} );

var QuoteList = React.createClass( {

  getInitialState() {
    return {
      checkedQuotes: {}
    };
  },

  getCheckedQuoteCount() {
    var checkedQuotes = this.state.checkedQuotes;
    return Object.keys( checkedQuotes )
      .filter( k => checkedQuotes[k] )
      .length;
  },

  getCheckChangedHandler( q ) {
    return check => {
      var checkedQuotes = this.state.checkedQuotes;
      checkedQuotes[q.id] = check;
      this.setState( { checkedQuotes: checkedQuotes } );
    };
  },

  render: function() {
    return <div>
      <ul>{this.renderQuotes()}</ul>
      <Summary checkedCount={this.getCheckedQuoteCount()}/>
    </div>;
  },

  renderQuotes: function() {
    return this.props.quotes.map( (q) => (
      <li>
        <CheckedLine onCheckChanged={this.getCheckChangedHandler(q)}>
          {q.id} {q.name}
        </CheckedLine>
      </li>
    ) );
  }
} );

React.render(
  <QuoteList quotes={quotes}/>,
  document.body
);
