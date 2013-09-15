/**
 * Dependency paths
 */
var lib = window.lib,
    cmp = window.cmp;

/**
 * Code
 */
define([lib('underscore'), cmp('base'), lib('request')], function (_, BaseComponent, Request) {

  /**
   * Create the Code subclass of BaseComponent
   */
  return _.class(BaseComponent, function (proto) {

    /**
     * Initialize Code  component
     */
    proto.init = function initCodeComponent(el) {
      var pre = el.append('pre');
      
      var ready = function (code) {
        pre.append('code').text(code);
        
        if (window.hljs) {
          window.hljs.highlightBlock(pre._wrapped);
        }
      };
      
      if (this.spec.code) {
        ready(this.spec.code.constructor === Array ?
          this.spec.code.join('\n') : this.spec.code);
      }
      
      if (this.spec.src) {
        Request.get(this.spec.src, ready);
      }
    };
    
  });
  
});
