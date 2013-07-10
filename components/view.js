/**
 * Dependency paths
 */
var lib = window.lib,
    cmp = window.cmp,
    css = window.css;

/**
 * View
 */
define([lib('underscore'), cmp('base'), css('view')], function (_, BaseComponent) {

  /**
   * Create the View subclass of BaseComponent
   */
  return _.class(BaseComponent, function (proto) {

    /**
     * Initialize View component
     */
    proto.init = function initViewComponent(el) {

      if(this.spec.title) {
        el.append('h1', {'html': this.spec.title});
      }

      if(this.spec.description) {
        el.append('p', {'html': this.spec.description});
      }

    };

  });

});
