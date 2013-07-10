/**
 * Standard library path for dependencies
 */
window.lib = function (x) {
  return '/library/' + x + '.js';
};

/**
 * Standard component path for dependencies
 */
window.cmp = function(x) {
  return '/components/' + x + '.js';
};

/**
 * Standard CSS path for dependencies
 */
window.css = function (x) {
  return 'css!/components/css/' + x + '.css';
};

/**
 * Dependency paths
 */
var lib = window.lib,
    cmp = window.cmp,
    css = window.css;

/**
 * CSS Loading
 */
require.config({
  shim: {
    '/library/underscore-min.js': {
      exports: '_'
    }
  },
  'paths': {
		'css': '/library/css'
	}
});

/**
 * Starter UI Component - App
 * @author Nate Ferrero
 */
define([lib('underscore'), lib('request'), cmp('base'), lib('domReady'),
        lib('polyfill'), lib('errors'), css('app')],

function (_, Request, BaseComponent, domReady) {

  /**
   * Start when ready
   */
  domReady(function () {

    var script = document.head.querySelector('script');

    if (!script) {
      throw new Error('No <script> element found in <head>');
    }

    if (!script.dataset.start) {
      throw new Error('No "data-start" attribute found on first <script> element in <head>');
    }

    /**
     * Load the first component spec and initialize, append to body
     */
    Request.json(script.dataset.start,  function handleStart(spec) {
      BaseComponent.create(spec, function (component) {
        document.body.appendChild(component.element);
      });
    });

  });

});
