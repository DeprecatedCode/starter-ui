/**
 * Dependency paths
 */
var lib = window.lib,
    cmp = window.cmp,
    css = window.css;

/**
 * Activity
 */
define([lib('underscore'), cmp('base')], function (_, BaseComponent) {

  /**
   * Create the Activity subclass of BaseComponent
   */
  return _.class(BaseComponent, function (proto) {

    /**
     * Initialize Activity component
     */
    proto.init = function initActivityComponent(el) {

      if(this.spec.title) {
        el.append('h1', {'html': this.spec.title});
      }

      if(this.spec.description) {
        el.append('p', {'html': this.spec.description});
      }
    };

  });

});
