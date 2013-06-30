/**
 * Standard library path for dependencies
 */
var lib = function(x) {
  return '/library/' + x + '.js';
};

/**
 * Underscore Mixins
 */
define([lib('underscore-min')], function (_) {
  
  _.mixin({
    
    'append': function (el, query, attrs) {
      if (query instanceof Element) {
        el.appendChild(query);
        if (attrs) {
          throw new Error("Attrs cannot be specified on existing node");
        }
        return query;
      }
      var created = _.create(query, attrs);
      el.appendChild(created);
      return created;
    },
    
    'create': function (query, attrs) {
      if (typeof query === 'object') { attrs = query; query = ''; }
      attrs = attrs || {}; query = query.split('.');
      attrs.className =
        (attrs.className ? attrs.className + ' ' : '') +
        query.splice(1).join(' ');
      
      /**
       * Substitute innerHTML for html
       */
      if (attrs.html) {
        attrs.innerHTML = attrs.html;
        delete attrs.html;
      }
      
      /**
       * Substitute innerText for text
       */
      if (attrs.text) {
        attrs.innerText = attrs.text;
        delete attrs.text;
      }

      var created = document.createElement(query[0] || 'div');
      _.extend(created, attrs);
      return created;
    },
    
    /**
     * Create a new class and inherit from all prototypes in given arguments
     */
    'subclass': function () {
      var cls = function () {};
      _.each(arguments, function (inherit) {
        _.extend(cls.prototype, inherit.prototype);
      });
      return cls;
    }
    
  });
  
  return _;
});
