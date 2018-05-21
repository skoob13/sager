'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var prefix = '@@api';

/**
 * The action creator helper function.
 * Receives the basic type name and returns object containing request,
 * success and failure types.
 * @param {string} type
 * @returns {Object}
 */
var typeCreator = function typeCreator(type) {
  return {
    request: prefix + '/' + type + '/request',
    success: prefix + '/' + type + '/success',
    failure: prefix + '/' + type + '/failure'
  };
};

exports.default = typeCreator;
module.exports = exports['default'];