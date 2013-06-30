/**
 * Standard library path for dependencies
 */
var lib = function(x) {
  return '/library/' + x + '.js';
};

/**
 * Underscore Mixins
 */
define([lib('underscore-min')], function (_) {
  return _;
});
