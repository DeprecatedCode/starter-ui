/**
 * Polyfill
 */
define(function () {
  
  /**
   * Element.matchesSelector Polyfill
   */
  window.Element && (function (ElementPrototype) {
    ElementPrototype.matchesSelector = ElementPrototype.matchesSelector ||
    ElementPrototype.mozMatchesSelector ||
    ElementPrototype.msMatchesSelector ||
    ElementPrototype.oMatchesSelector ||
    ElementPrototype.webkitMatchesSelector ||
    function matchesSelector(selector) {
      var
      results = this.parentNode.querySelectorAll(selector),
      resultsIndex = -1;
    
      while (results[++resultsIndex] && results[resultsIndex] != this) {}
    
      return !!results[resultsIndex];
    };
  })(Element.prototype);
  
  return {};
});
