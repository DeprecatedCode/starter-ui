/**
 * Dependency paths
 */
var lib = window.lib,
    cmp = window.cmp;

/**
 * Form
 */
define([lib('underscore'), cmp('base')], function (_, BaseComponent) {

  /**
   * Create the Form subclass of BaseComponent
   */
  return _.class(BaseComponent, function (proto) {

    /**
     * Initialize Form component
     */
    proto.init = function initFormComponent(el) {
      this.womb = el.append('form');
      if (this.spec.title) {
        this.womb.append('h' + _.min([6, this.depth + 1]), {'html': this.spec.title});
      }

      if(this.spec.description) {
        this.womb.append('p', {'html': this.spec.description});
      }
    };
    
  });
  
});
