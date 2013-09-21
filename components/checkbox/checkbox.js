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
      this.label = this.field.append('label.checkbox.checked');
      this.input = this.label.append('input', {type: 'checkbox'});
      this.box = this.label.append('span');
      this.tick = this.box.append('i.icon-check');
      this.tick.addClass('hidden');
      this.label.append('font', {html: this.spec.description});
      var component = this;
      this.input.on('change', function () {
        var method = (component.input._wrapped.checked ? 'remove' : 'add');
        component.tick[method + 'Class']('hidden');
      });
    };
    
  });
  
});
