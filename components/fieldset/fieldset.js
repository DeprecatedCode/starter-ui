/**
 * Dependency paths
 */
var lib = window.lib,
    cmp = window.cmp;

/**
 * Fieldset
 */
define([lib('underscore'), cmp('base')], function (_, BaseComponent) {

  /**
   * Create the Fieldset subclass of BaseComponent
   */
  return _.class(BaseComponent, function (proto) {

    /**
     * Initialize Fieldset component
     */
    proto.init = function initFieldsetComponent(el) {
      this.womb = el.append('fieldset');
      if (this.spec.title) {
        this.womb.append('legend', {html: this.spec.title});
      }
    };
    
  });
  
});
