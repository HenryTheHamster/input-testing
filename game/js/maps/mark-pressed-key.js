'use strict';

var each = require('lodash').each;
var select = require('lodash').select;

function setKeyAsPressed (key, prop) {
  return function (state) {
    var keys = state.for('inputTesting').get('keys');

    select(keys, {id: key})[0][prop] = true;

    return {
      inputTesting: {
        keys: keys
      }
    };
  };
}

function markPressedKeys () {
  var keys = [
    'escape', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12',
    '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'delete',
    'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\',
    'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'enter',
    'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/',
    'space', 'left', 'up', 'down', 'right'
  ];

  var modifiers = [
    ['ctrl'],
    ['alt'],
    ['shift'],
    ['ctrl', 'alt'], ['ctrl', 'shift'], ['alt', 'shift'],
    ['ctrl', 'alt', 'shift']
  ];

  var invalidIds = {
    '=': 'equals',
    ';': 'semicolon',
    '\'': 'single-quote',
    ',': 'comma',
    '.': 'period',
    '/': 'forward-slash',
    '\\': 'back-slash',
    '`': 'back-tick',
    '[': 'open-square-bracket',
    ']': 'close-square-bracket'
  };

  function safeId (key) {
    return invalidIds[key] ? invalidIds[key] : key;
  }

  var actionMap = {};

  each(keys, function(key) {
    var safeKey = safeId(key);
    actionMap[key] = [
      {
        target: setKeyAsPressed(safeKey, 'pressed')
      },
      {
        target: setKeyAsPressed(safeKey, 'singleKey'),
        onRelease: true
      }
    ];

    each(modifiers, function(modifier) {
      var modifiedKey = modifier.join('_') + '_' + safeKey;

      if (modifiedKey === 'ctrl_tab' || modifiedKey === 'ctrl_shift_tab') {
        return;
      }

      actionMap[key].push({
        target: setKeyAsPressed(modifiedKey, 'pressed'),
        modifiers: modifier
      });
      actionMap[key].push({
        target: setKeyAsPressed(modifiedKey, 'singleKey'),
        modifiers: modifier,
        onRelease: true
      });
    });
  });

  return actionMap;
}

module.exports = {
  type: 'ActionMap',
  func: markPressedKeys
};