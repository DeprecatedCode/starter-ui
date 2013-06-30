/**
 * Dependency paths
 */
var lib = window.lib,
    cmp = window.cmp,
    css = window.css;
    
/**
 * View
 */
define([lib('underscore'), cmp('base'), css('view')], function (_, Base) {
  
  /**
   * Create the View subclass of Base
   */
  var View = _.subclass(Base);
  
  /**
   * Initialize View component
   */
  View.prototype.init = function initViewComponent(callback) {
    
    /**
     * Wrap component element in underscore for easy use
     */
    var el = _(this.element);
    
    if(this.spec.title) {
      el.append('h1', {'html': this.spec.title});
    }
    
    if(this.spec.description) {
      el.append('p', {'html': this.spec.description});
    }
    
    this.createChildComponents();
    
    /**
     * No need to pass this to the callback, that is done automatically by Base
     */
    callback();
  };
  
  /**
   * Export
   */
  return View;
  
});
