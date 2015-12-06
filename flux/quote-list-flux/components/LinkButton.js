'use strict';

var React = require( 'react' );

var linkButtonStyle = {
  float: 'right',
  color: 'rgb(45, 107, 158)',
  cursor: 'pointer',
  border: 'none',
  background: 'none'
};

var LinkButton = React.createClass( {

  render: function( ) {
    return <button style={linkButtonStyle} onClick={this.props.onClick}>
      {this.props.children}
    </button>
  }
} );

module.exports = LinkButton;
