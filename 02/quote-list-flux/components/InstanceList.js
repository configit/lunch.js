'use strict';

var React = require( 'react' );
var InstanceListItem = require( './InstanceListItem' );

var InstanceList = React.createClass( {

  render: function() {
    return <ul>{ this.renderQuotes() }</ul>;
  },

  renderQuotes: function() {
    return this.props.sceInstances.map( inst =>    	
		<InstanceListItem sceInstance={inst}  />
    );
  }
} );

module.exports = InstanceList;
