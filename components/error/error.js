/**
 * Dependency paths
 */
var lib = window.lib,
    cmp = window.cmp;

/**
 * Error
 */
define([lib('underscore'), cmp('base')], function (_, BaseComponent) {

  /**
   * Create the Error subclass of BaseComponent
   */
  return _.class(BaseComponent, function (proto) {

    /**
     * Initialize Error component
     */
    proto.init = function initErrorComponent(el) {
      el.addClass('alert danger');
      el.append('span', {html: this.spec.message || 'Unknown Error'});
    };
    
  });
  
});
