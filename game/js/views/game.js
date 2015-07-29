'use strict';

module.exports = {
  deps: ['StateTracker', 'CurrentState'],
  type: 'View',
  func: function (tracker, currentState) {
    var $ = require('zepto-browserify').$;
    var each = require('lodash').each;

    var overlay = require('../../views/partials/inputTesting.jade');
    var keyPartial = require('../../views/partials/key-state.jade');

    var updateKeyState = function(id, keyState) {
      if (keyState.pressed) {
        $('#' + id).addClass('it-works');
      }
      if (keyState.singleKey) {
        $('#' + id).removeClass('initial-border').addClass('single-key-works');
      }
    };

    var theKeys = function (state) { return state.inputTesting.keys; };

    return function () {
      $('#overlay').append(overlay());

      each(currentState().get(theKeys), function(keyState) {
        $('#inputTesting').append(keyPartial(keyState));
      });

      tracker().onElementChanged(theKeys, updateKeyState);
    };
  }
};