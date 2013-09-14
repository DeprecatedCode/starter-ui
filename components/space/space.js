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
   * Create the Space subclass of BaseComponent
   */
  return _.class(BaseComponent, function (proto) {

    /**
     * Initialize Space component
     */
    proto.init = function initSpaceComponent(el) {
      el.append('p');
    };
    
  });
  
});
