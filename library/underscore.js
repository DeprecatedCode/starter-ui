/**
 * Standard library path for dependencies
 */
var lib = window.lib;

/**
 * Underscore Mixins
 */
define([lib('underscore-min')], function (_) {

  _.mixin({

    'append': function (el, query, attrs) {
      if (query._wrapped) {
        query = query._wrapped;
      }
      if (query instanceof Element) {
        el.appendChild(query);
        if (attrs) {
          throw new Error("Attrs cannot be specified on existing node");
        }
        return query;
      }
      var created = _.create(query, attrs);
      el.appendChild(created._wrapped);
      return created;
    },

    'create': function (query, attrs) {
      if (typeof query === 'object') { attrs = query; query = ''; }
      attrs = attrs || {};
      query = typeof query === 'string' ? query.split('.') : ['div'];
      attrs.className =
        (attrs.className ? attrs.className + ' ' : '') +
        query.splice(1).join(' ');

      /**
       * Substitute innerHTML for html
       */
      if (attrs.html) {
        attrs.innerHTML = _.magic(attrs.html);
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
      return _(created);
    },
    
    /**
     * Add CSS Class to an element
     */
    'addClass': function (el, cls) {
      return _(cls.split(' ')).each(function (item) {
        el.classList.add(item);
      });
    },
    
    /**
     * Remove CSS Class from an element
     */
    'removeClass': function (el, cls) {
      return _(cls.split(' ')).each(function (item) {
        el.classList.remove(item);
      });
    },
    
    /**
     * Set or read HTML from an element
     */
    'html': function (el, html) {
      if (html) {
        el.innerHTML = _.magic(html);
        return this;
      }
      return el.innerHTML;
    },
    
    /**
     * Set or read Text from an element
     */
    'text': function (el, text) {
      if (text) {
        el.innerText = text;
        return this;
      }
      return el.innerText;
    },
    
    /**
     * Set or read style from an element
     */
    'style': function (el, style) {
      if (style) {
        _.extend(el.style, style);
        return this;
      }
      return el.style;
    },
    
    /**
     * Attach event listener to element
     */
    'on': function(el, event, fn) {
      el.addEventListener(event, fn);
      return this;
    },

    /**
     * Create a new class and inherit from all prototypes in given arguments
     */
    'class': function () {
      var Class = function () {};
      var args = Array.prototype.slice.call(arguments, 0);
      var fn = args.pop();
      _.each(args, function (inherit) {
        _.extend(Class.prototype, inherit.prototype);
      });
      fn(Class.prototype, Class);
      return Class;
    },

    /**
     * Create a function that will call the original function with new args
     *
     * Example:
     *
     *  var myFunc = _(function(a, b, c) { return a + b * c; })
     *    .curry(4, {arg: 1}, {arg: 0});
     *
     *  myFunc(2, 3); // Result: 10
     *
     * Explanation:
     *
     *  a == 4
     *  b == arg 1 == 3
     *  c == arg 0 == 2
     *  a + b * c == 4 + 3 * 2 == 10
     */
    'curry': function () {
      var args = Array.prototype.slice.call(arguments, 0);
      var fn = args.shift();

      var finalFn = function() {

        var finalArgs = arguments;

        return fn.apply(
          finalFn, _(args).map(function (arg) {

            if (arg && typeof arg.arg === 'number') {
              return finalArgs[arg.arg];
            }

            return arg;

          })
        );
      };

      return finalFn;
    },
    
    /**
     * Magic
     */
    'magic': function(html) {
      return html.replace(/\@icon-([a-z0-9\-]+)/, '<i class="icon-$1"></i>');
    }

  });

  return _;
});
