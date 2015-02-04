'use strict';

var React = require( 'react' );

var InstanceListItem = React.createClass( {

  propTypes: {
    sceInstance: React.PropTypes.shape( {
      instanceId: React.PropTypes.number,
      ooclassName: React.PropTypes.string
    } ).isRequired
  },

  render: function() {
    var q = this.props.sceInstance;
    return <li>
        {q.instanceId} &mdash; <small>{q.ooclassName}</small>
      </li>;
  }
} );

module.exports = InstanceListItem;
