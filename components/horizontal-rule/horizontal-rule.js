/**
 * Dependency paths
 */
var lib = window.lib,
    cmp = window.cmp;

/**
 * HorizontalRule
 */
define([lib('underscore'), cmp('base')], function (_, BaseComponent) {

  /**
   * Create the Horizontal Rule subclass of BaseComponent
   */
  return _.class(BaseComponent, function (proto) {

    /**
     * Initialize Horizontal Rule component
     */
    proto.init = function initHorizontalRuleComponent(el) {
      el.append('hr');
    };
    
  });
  
});
