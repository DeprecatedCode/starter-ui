/**
 * Dependency paths
 */
var lib = window.lib,
    cmp = window.cmp;

/**
 * Base
 */
define([lib('underscore'), lib('request')], function (_, Request) {

  /**
   * Base Class
   */
  return _.class(function (proto, cls) {

    /**
     * Default initialization
     */
    proto.init = function initBaseComponent(el) {
      this.element.html(JSON.stringify(this.spec));
    };

    /**
     * Create child components
     */
    proto.createChildComponents = function createChildComponents() {

      _(this.spec['+']).each(
        _(cls.create).curry({arg: 0}, this.depth + 1, this.append.bind(this))
      );

    };

    /**
     * Append child component
     */
    proto.append = function append(element) {
      (this.womb || this.element).append(element);
    };

    /**
     * Static method to create a component
     */
    cls.create = function createComponent(spec, depth, callback, ready, element) {
      
      /**
       * Handle arrays of components
       */
      if (spec && spec.constructor === Array) {
        return spec.forEach(function (each) {
          cls.create(each, depth, callback, ready);
        });
      }
      
      /**
       * Prepare element
       */
      if (!element) {
        element = _.create();
      }

      if (spec['.']) {
        element.addClass(spec['.']);
      }

      /**
       * Callback when element is ready
       */
      callback(element);
      
      /**
       * Handle components with $src, this supercedes all else
       */
      if (spec.$src) {
        return Request.json(spec.$src, function (data) {
          cls.create(data, depth, callback, ready, element);
        });
      }

      /**
       * Spec basics
       */
      if (!spec.component) {
        spec.component = spec.$ || 'view';
      }

      /**
       * Construct and return new component
       */
      require([cmp(spec.component)], function componentConstructor(Component) {

        var component = new Component();
        component.depth = (depth || 0) + (spec.depth || 0);
        component.spec = spec;
        component.component = spec.component;

        /**
         * Create component DOM element
         */
        component.element = element;
        component.element.addClass('component-' + component.component);

        /**
         * Apply style if specified
         */
        if (spec.style) {
          component.element.style(spec.style);
        }

        /**
         * Init component and child components
         */
        component.init(component.element);
        component.createChildComponents();
        
        /**
         * Callback when component has been rendered
         */
        typeof ready === 'function' && ready(component.element);
      });

    };

  });

});
