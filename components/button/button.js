/**
 * Dependency paths
 */
var lib = window.lib,
    cmp = window.cmp;

/**
 * Button
 */
define([lib('underscore'), cmp('base')], function (_, BaseComponent) {

  /**
   * Create the Button subclass of BaseComponent
   */
  return _.class(BaseComponent, function (proto) {

    /**
     * Initialize Button component
     */
    proto.init = function initButtonComponent(el) {
      
      var type = this.spec.type || 'default';

      if (this.spec.link && (window.location.hash.length === 0 &&
        this.spec.link === window.location.pathname ||
        '#' + this.spec.link === window.location.hash)) {
        type = "info";
      }
      
      el.addClass('pretty btn ' + (this.spec.size || 'medium') + ' ' + type);
      if (this.spec.icon) {
        el.addClass('icon-left icon-' + this.spec.icon);
      }
      var opts = {
        href: (this.spec.link || ''),
        html: this.spec.title || 'Click'
      };
      this.link = el.append('a', opts);
    };
    
  });
  
});
