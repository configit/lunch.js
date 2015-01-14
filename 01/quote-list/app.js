'use strict';

var React = require( 'react' );

var quotes = [
  { id: 1, name: 'First Quote' },
  { id: 2, name: 'Second Quote' },
  { id: 3, name: 'Third Quote' },
  { id: 4, name: 'Forth Quote' },
];

var CheckedLine = React.createClass( {

  getInitialState: function() {
    return { checked: false };
  },

  handleClick: function() {
    var toggledCheck = !this.state.checked;
    this.setState( { checked: toggledCheck } );
    this.props.onCheckChanged( this.props.id, toggledCheck );
  },

  render: function() {
    var icon = this.state.checked ? 'icon-check' : 'icon-empty';
    return <li onClick={this.handleClick}>
      <i className={icon}/> {this.props.children}
    </li>;
  }
} );

var Summary = React.createClass( {

  render: function() {
    return <div>{this.props.checkedCount} Selected</div>
  }
} );

var QuoteList = React.createClass( {

  getInitialState: function() {
    return { checkedStatus: {} };
  },

  getCheckedQuotes: function() {
    return Object.keys( this.state.checkedStatus )
      .filter( k => this.state.checkedStatus[k] )
      .length;
  },

  render: function() {
    return <div>
      <ul>{this.renderQuotes()}</ul>
      <Summary checkedCount={this.getCheckedQuotes()}/>
    </div>;
  },

  handleCheckChanged: function( id, checked ) {
    var checkedStatus = this.state.checkedStatus;
    checkedStatus[id] = checked;
    this.setState( { checkedStatus: checkedStatus } );
  },

  renderQuotes: function() {
    return this.props.quotes.map( (q) => (
      <CheckedLine id={q.id} onCheckChanged={this.handleCheckChanged}>
        {q.id} {q.name}
      </CheckedLine>
    ) );
  }
} );

React.render(
  <QuoteList quotes={quotes}/>,
  document.body
);
