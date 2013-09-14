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
  return '/components/' + x + '/' + x + '.js';
};

/**
 * Dependency paths
 */
var lib = window.lib,
    cmp = window.cmp;

/**
 * Script Loading
 */
require.config({
  shim: {
    '/library/underscore-min.js': {
      exports: '_'
    }
  }
});

/**
 * Starter UI Component - App
 * @author Nate Ferrero
 */
define([lib('underscore'), lib('request'), cmp('base'), lib('domReady'),
        lib('native.history'), lib('polyfill'), lib('errors')],

function (_, Request, BaseComponent, domReady) {
  
  /**
   * App
   */
  var app = {
    'load': function (title, url, newState) {
      if (newState !== false) {
        history.pushState({}, title, url);
      }
      document.body.style.cursor = 'progress';
      document.title = 'Loading';
      Request.json('/interface' + url.replace(/\/$/, '/index') + '.json', function handleLoad(spec) {
        document.body.innerHTML = '';
        document.title = '';
        document.body.style.cursor = 'default';
        BaseComponent.create(spec, 0, function (element) {
          _(document.body).append(element);
        });
      });
    }
  };

  /**
   * Start when ready
   */
  domReady(function () {
    
    /**
     * Handle Link Clicks
     */
    document.body.addEventListener('click', function handleClickEvent(evt) {
      if (!evt.ctrlKey && evt.target && evt.target.hostname == window.location.hostname) {
        app.load(evt.target.innerText, evt.target.pathname);
        evt.preventDefault();
        return false;
      }
    });
    
    /**
     * Handle Pop State
     */
    window.addEventListener('popstate', function (evt) {
        app.load('', window.location.pathname, false);
    });

    /**
     * Load the first component spec and initialize, append to body
     */
    var url = '/index';
    if (window.location.hash.length) {
      url = window.location.hash.replace('#', '').replace(/\/$/, '/index');
    }
    url = '/interface' + url + '.json';
    Request.json(url, function handleIndex(spec) {
      BaseComponent.create(spec, 0, function (element) {
        _(document.body).append(element);
      });
    });

  });

});
