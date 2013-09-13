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
    }

  });

  return _;
});
