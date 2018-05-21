'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hash = undefined;

var _objectHash = require('object-hash');

var _objectHash2 = _interopRequireDefault(_objectHash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hash = exports.hash = function hash(o) {
  return (0, _objectHash2.default)(o);
};