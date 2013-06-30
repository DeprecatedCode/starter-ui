/**
 * Request
 */
define(function () {
  
  /**
   * Request (url, [data], function)
   * 
   * Copyright (c) 2008 Stefan Lange-Hegermann
   * 
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   * 
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   * 
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */
  var request = function request(url, data, fn) {
    
    var scope = {};

    if (typeof data === 'function') {
      fn = data; data = null;
    }

    scope.bindFunction = function (caller, object) {
      return function() {
        return caller.apply(object, [object]);
      };
    };
    
    scope.stateChange = function (object) {
      if (scope.req.readyState==4)
        scope.callback(scope.req.responseText);
    };
    
    scope.getRequest = function() {
      if (window.ActiveXObject)
        return new window.ActiveXObject('Microsoft.XMLHTTP');
      else if (window.XMLHttpRequest)
        return new XMLHttpRequest();
      return false;
    };
    
    scope.postBody = data || "";
    scope.callback=fn;
    scope.url=url;
    scope.req = scope.getRequest();
    
    if(scope.req) {
      var req = scope.req;
      req.onreadystatechange = scope.bindFunction(scope.stateChange, scope);
    
      if (scope.postBody !== "") {
        req.open("POST", url, true);
        req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        req.setRequestHeader('Connection', 'close');
      } else {
        req.open("GET", url, true);
      }
    
      req.send(scope.postBody);
    }
  };

  return {
    'json': function requestJSON(url, data, fn) {
      if (typeof data === 'function') {
        fn = data; data = null;
      }
      request(url, data, function parseJSON(x) { fn(JSON.parse(x)); });
    }
  };

});
