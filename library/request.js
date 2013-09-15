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
  var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

  var escapeHtml = function(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  };
   
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
        scope.callback(scope.req.responseText, scope.req);
    };
    
    scope.getRequest = function() {
      if (window.ActiveXObject)
        return new window.ActiveXObject('Microsoft.XMLHTTP');
      else if (window.XMLHttpRequest)
        return new XMLHttpRequest();
      return false;
    };
    
    scope.postBody = data || "";
    scope.callback = fn;
    scope.url = url;
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
    'get': function requestGet(url, fn) {
      request(url, fn);
    },
    'json': function requestJSON(url, data, fn) {
      if (typeof data === 'function') {
        fn = data; data = null;
      }
      
      /**
       * Parse JSON Callback
       */
      var callbackJSON = function (text) {
        var json;
        try {
          json = JSON.parse(text);
        }
        catch (e) {
          json = {"$": "error", "message": "Invalid JSON: " +
            escapeHtml(text.substr(0, 100)) +
            (text.length > 20 ? '...' : '')};
        }
        finally {
          fn(json);
        }
      };
      
      /**
       * Allow multiple failover URLs
       */
      var callback;
      if (url.constructor === Array) {
        var urlIndex = 0;
        var urlList = url;
        url = urlList[urlIndex];
        callback = function (text, req) {
          /**
           * Handle success
           */
          if (req.status === 200) {
            callbackJSON(text);
          }
          
          else {
            if (urlIndex < urlList.length - 1) {
              urlIndex += 1;
              url = urlList[urlIndex];
              request(url, data, callback);
            }
            
            else {
              throw new Error('Could not load any of the following URLs: ' + urlList.join(', '));
            }
          }
        };
      }
      else {
        callback = callbackJSON;
      }
      request(url, data, callback);
    }
  };

});
