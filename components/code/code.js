/**
 * Dependency paths
 */
var lib = window.lib,
    cmp = window.cmp;

/**
 * Code
 */
define([lib('underscore'), cmp('base')], function (_, BaseComponent) {

  /**
   * Create the Code subclass of BaseComponent
   */
  return _.class(BaseComponent, function (proto) {

    /**
     * Initialize Code  component
     */
    proto.init = function initCodeComponent(el) {
      el.append('code').text(this.spec.code.join('\n'));
    };
    
  });
  
});
