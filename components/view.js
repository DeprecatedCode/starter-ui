/**
 * Dependency paths
 */
var lib = window.lib,
    cmp = window.cmp,
    css = window.css;
    
/**
 * View
 */
define([lib('underscore'), css('view')], function (_) {
  
  var View = function View() {};
  
  /**
   * Static method to create a component
   */
  View.prototype.init = function initViewComponent(callback) {
    callback();
  };
  
  /**
   * Export
   */
  return View;
  
});
