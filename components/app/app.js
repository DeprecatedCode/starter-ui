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
      
      var target = document.body; // TODO
      
      target.style.cursor = 'progress';
      document.title = 'Loading';
      
      if (url.substr(url.length - 1, 1) == '/') {
        url = '/interface' + url + 'index.json';
      }
  
      else {
        url = ['/interface' + url + '.json', '/interface' + url + '/index.json'];
      }
      
      Request.json(url, function handleLoad(spec) {
        var removeElements = [];
        [].forEach.call(target.children, function (el) {
          if (el && el.classList) {
            el.classList.add('marked-for-deletion');
            removeElements.push(el);
          }
        });
        document.title = '';
        var switched = false;
        target.style.cursor = 'default';
        BaseComponent.create(spec, 0, function (element) {
          _(target).append(element);
          element.addClass('hidden');
        }, function (element) {
          element.removeClass('hidden');
          if (switched) {
            return;
          }
          removeElements.forEach(function (el) {
            target.removeChild(el);
          });
          switched = true;
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
    var url = '/';
    if (window.location.hash.length) {
      url = window.location.hash.replace('#', '');
    }

    app.load('', url, false);

  });

});
