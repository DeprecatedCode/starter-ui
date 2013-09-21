/**
 * Dependency paths
 */
var lib = window.lib,
    cmp = window.cmp;

/**
 * Checkbox
 */
define([lib('underscore'), cmp('base')], function (_, BaseComponent) {

  /**
   * Create the Checkbox subclass of BaseComponent
   */
  return _.class(BaseComponent, function (proto) {

    /**
     * Initialize Checkbox component
     */
    proto.init = function initCheckboxComponent(el) {
      this.field = el.append('.field');
      this.label = this.field.append('label.checkbox');
      this.input = this.label.append('input', {type: 'checkbox'});
      this.label.append('span');
      this.label.append('font', {html: this.spec.description});
    };
    
  });
  
});
