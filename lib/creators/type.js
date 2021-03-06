"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
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
    request: prefix + "/" + type + "/request",
    success: prefix + "/" + type + "/success",
    failure: prefix + "/" + type + "/failure"
  };
};

var _default = typeCreator;
exports.default = _default;