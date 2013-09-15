/**
 * Dependency paths
 */
var lib = window.lib,
    cmp = window.cmp;

/**
 * View
 */
define([lib('underscore'), cmp('base')], function (_, BaseComponent) {

  /**
   * Create the View subclass of BaseComponent
   */
  return _.class(BaseComponent, function (proto) {

    /**
     * Initialize View component
     */
    proto.init = function initViewComponent(el) {
      
      if(this.spec.title) {
        if (document.title === '') {
          document.title = this.spec.title;
        }
        el.append('h' + _.min([6, this.depth + 1]), {'html': this.spec.title});
      }

      if(this.spec.description) {
        el.append('p', {'html': this.spec.description});
      }

    };

  });

});
