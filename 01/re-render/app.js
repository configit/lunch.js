'use strict';

require( './style.css' );
var React = require( 'react' );
var QuoteApi = require( './QuoteApi' );

var QuoteList = React.createClass( {
  render: function() {
    return (<table>
      <thead>
        <tr><th>Id</th><th>Name</th><th>Country</th></tr>
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
        <td>{q.country}</td>
      </tr>
    } );
  }
} );

var App = React.createClass( {

  getInitialState: function() {
    return { quotes: QuoteApi.get( 200 ) };
  },

  componentDidMount: function() {
    setInterval( function() {
      this.setState( { quotes: QuoteApi.get( 200 ).sort( function( q1, q2 ) {
        return q1.country.localeCompare( q2.country );
      } ) } );
    }.bind( this ), 100 );
  },

  render: function( ) {
    return <QuoteList quotes={this.state.quotes}/>
  }
} );

React.render( <App/>, document.body );