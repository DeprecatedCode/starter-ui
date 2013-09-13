/**
 * Dependency paths
 */
var lib = window.lib;

/**
 * Errors
 */
define([lib('underscore')], function (_) {
  
  window.onerror = function(message, url, line, x) {  
    document.body.className = 'error';
    document.body.innerHTML = '<h1>Application Error</h1>' +
      '<p>' + _.escape(message) + '</p>';
    return false;
  };
  
  return {};
});
