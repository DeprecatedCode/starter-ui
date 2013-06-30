/**
 * Dependency paths
 */
var lib = window.lib,
    cmp = window.cmp,
    css = window.css;
    
/**
 * Base
 */
define([lib('underscore')], function (_) {
  
  var Base = function Base() {};
  
  /**
   * Create child components
   */
  Base.prototype.createChildComponents = function createChildComponents() {
    ;
  };
  
  /**
   * Static method to create a component
   */
  Base.create = function createComponent(spec, callback) {
    
    /**
     * Validate spec basics
     */
    if (!spec.component) {
      throw new Error("Component spec is missing `component` key indicating type");
    }

    /**
     * Construct and return new component
     */
    require([cmp(spec.component)], function componentConstructor(Component) {
      var component = new Component();
      component.spec = spec;
      component.component = spec.component;
      component.element = document.createElement('div');
      component.element.classList.add('component-' + component.component);
      
      /**
       * Callback processing
       */
      component.init(function () {
        if (callback) {
          callback(component);
        }
      });
    });
  };
  
  /**
   * Export
   */
  return Base;
  
});
