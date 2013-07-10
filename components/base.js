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

  /**
   * Base Class
   */
  return _.class(function (proto, cls) {

    /**
     * Default initialization
     */
    proto.init = function initBaseComponent(el) {
      this.element.innerHTML = JSON.stringify(this.spec);
    };

    /**
     * Create child components
     */
    proto.createChildComponents = function createChildComponents() {

      _(this.spec.children).each(
        _(cls.create).curry({arg: 0}, this.appendChildComponent.bind(this))
      );

    };

    /**
     * Append child component
     */
    proto.appendChildComponent = function appendChildComponent(component) {
        this.element.appendChild(component.element);
    };

    /**
     * Static method to create a component
     */
    cls.create = function createComponent(spec, callback) {

      /**
       * Validate spec basics
       */
      if (!spec.component) {
        console.error('Bad spec:', spec);
        throw new Error("Component spec is missing `component` key indicating type");
      }

      /**
       * Construct and return new component
       */
      require([cmp(spec.component)], function componentConstructor(Component) {

        var component = new Component();
        component.spec = spec;
        component.component = spec.component;

        /**
         * Create componennt DOM element
         */
        component.element = document.createElement('div');
        component.element.classList.add('component-' + component.component);

        /**
         * Apply style if specified
         */
        if (spec.style) {
          _.extend(component.element.style, spec.style);
        }

        /**
         * Init component and child components
         */
        component.init(_(component.element));
        component.createChildComponents();

        /**
         * Callback when complete
         */
        callback(component);

      });

    };

  });

});
