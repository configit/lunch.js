'use strict';

var React = require( 'react' );
var QuoteApi = require( './QuoteApi' );

var QuoteList = React.createClass( {
  render: function() {
    return (<table>
      <thead>
        <tr><th>Id</th><th>Name</th><th>Status</th></tr>
      </thead>
      <tbody>
        {this.renderQuotes()}
      </tbody>
    </table>);
  },

  renderQuotes: function() {
    return this.props.quotes.map( function( q ) {
      return <tr key={q.id}>
        <td>{q.id}</td>
        <td>{q.name}</td>
        <td>{q.status}</td>
      </tr>;
    } );
  }
} );

var App = React.createClass( {

  getInitialState: function() {
    return { quotes: QuoteApi.get( 200 ) };
  },

  componentDidMount: function() {
    setInterval( () => {
      var newQuotes = QuoteApi.get( 200 );
        //.sort( (q1, q2) => q1.status.localeCompare( q2.status ) );
      this.setState( { quotes: newQuotes } );
    }, 1000 );
  },

  render: function( ) {
    return <QuoteList quotes={this.state.quotes}/>;
  }
} );

React.render( <App/>, document.body );