'use strict';

var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var taskObj = require('../../mixins/task-item');
var actions = require('../../actions/actions');
var UserStore = require('../../stores/user');
var Keys = require('react-keybinding');

module.exports = React.createClass({
  mixins: [
    Router.State,
    Reflux.connect(UserStore, 'user'),
    taskObj,
    Keys
  ],

  keybindings: {
    'e': function() {
      this.edit();
    },
    's': function() {
      this.skip();
    },
    'f': function() {
      this.fixed();
    }
  },

  edit: function() {
    actions.taskEdit();
  },

  skip: function() {
    actions.taskData(this.getParams().task);
  },

  fixed: function() {
    actions.taskDone(this.getParams().task);
  },

  render: function() {
    var taskTitle = taskObj(this.getParams().task).title;
    var taskActions = (
      /* jshint ignore:start */
      <nav className='tabs col12 clearfix'>
        <a onClick={this.skip} className='col12 animate icon refresh'>Another task</a>
      </nav>
      /* jshint ignore:end */
    );

    if (this.state.user && this.state.user.auth) {
      taskActions = (
        /* jshint ignore:start */
        <nav className='tabs col12 clearfix'>
          <button onClick={this.edit} className='col4 animate unround'>Edit</button>
          <button onClick={this.skip} className='col4 animate'>Skip</button>
          <button onClick={this.fixed} className='col4 animate'>Fixed</button>
        </nav>
        /* jshint ignore:end */
      );
    }

    return (
      /* jshint ignore:start */
      <div className='editbar pin-bottomleft col12 pad4 z1'>
        <div className='dark round col6 margin3'>
          {taskActions}
          <div className='fill-darken1 round-bottom col12 pad2x pad1y center strong inline'>{taskTitle}</div>
        </div>
      </div>
      /* jshint ignore:end */
    );
  }
});
