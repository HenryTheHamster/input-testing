'use strict';

var each = require('lodash').each;

var overlay = require('../../views/partials/inputTesting.jade');
var keyPartial = require('../../views/partials/key-state.jade');

function theKeys (state) { return state.inputTesting.keys; };

module.exports = {
  type: 'OnReady',
  deps: ['StateTracker', 'CurrentState', '$'],
  func: function InputTesting (tracker, currentState, $) {

    function updateKeyState (id, keyState) {
      if (keyState.pressed) {
        $()('#' + id).addClass('it-works');
      }
      if (keyState.singleKey) {
        $()('#' + id).removeClass('initial-border').addClass('single-key-works');
      }
    };

    return function setup () {
      $()('#overlay').append(overlay());

      each(currentState().get(theKeys), function appendEachKey (keyState) {
        $()('#inputTesting').append(keyPartial(keyState));
      });

      tracker().onElementChanged(theKeys, updateKeyState);
    };
  }
};