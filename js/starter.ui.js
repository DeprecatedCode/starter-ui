/**
 * Polyfill
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

/**
 * Starter UI
 * @author Nate Ferrero
 */
(function (_) {
  window.onload = function () {
    
    _.requestJSON('/interface/start.json', function (data) {
      console.log(data);
      
      if (data.theme && data.theme.background) {
        _.doc.body.style.backgroundColor = data.theme.background;
      }
      
      if (data.theme && data.theme.font) {
        _.doc.body.style.color = data.theme.font;
      }
      
      if (data.title) {
        _.doc.title = data.title;
        _.append(_.doc.body, 'h1', {'innerText': data.title});
      }
      
      if (data.activities) {
        _.each(data.activities, function (key, spec) {
          spec.link = '/activities/' + key + '/start.json';
          var activity = _.ui.activity(spec);
          _.append(_.doc.body, activity);
        });
      }
    });
    
    /**
     * Variables
     */
    _.data = {
      'activities'  : {}
    };
    
    _.data.shade = _.append(_.doc.body, '.shade.hidden');
    
    _.doc.body.onclick = function (evt) {
      var el = _.matching(evt.target, '.activity');
      if (!el) {return;}
      var activity = el.dataset.activity;
      
      if (!_.data.activities[activity]) {
         _.data.activities[activity] = _.create('.activity-view');
      }
      
      var view = _.data.activities[activity];
      view.style.top = el.offsetTop + 'px';
      view.style.left = el.offsetLeft + 'px';
      var pW = el.offsetParent.parentNode.clientWidth;
      var pH = el.offsetParent.parentNode.clientHeight;
      view.style.right = pW - el.offsetLeft - el.offsetWidth + 'px';
      view.style.bottom = pH - el.offsetTop - el.offsetHeight + 'px';
      _.append(_.doc.body, view);
      _.show(_.data.shade);
      _.show(view);
      _.data.shade.onclick = function () {
        _.hide(_.data.shade);
        _.hide(view);
        view.classList.remove('active');
      };
      view.innerHTML = '';
      _.delay(0.1, function () {
        view.classList.add('active');
        _.delay(0.2, function() {
          view.innerHTML = el.innerHTML;
        });
      });
    };
  
  };
  
  window.onerror = function(message, url, line, x) {  
    _.doc.body.className = 'error';
    _.doc.body.innerHTML = '<h1>Application Error</h1>' +
      '<p>' + message + '</p>';
    return false;
  };

  /**
   * Shortcuts
   * @author Nate Ferrero
   */
  window._ = _;
  
  /**
   * UI
   */
  _.ui = {};
  
  /**
   * UI - Activity
   */
  _.ui.activity = function uiActivity(spec) {
    var ac = _.create('.activity');
    var ct = _.append(ac, '.content');
    if (spec.title) {
      _.append(ct, 'h4', {'innerText': spec.title});
    }
    if (spec.description) {
      _.append(ct, 'p', {'innerText': spec.description});
    }
    return ac;
  };
  
  /**
   * Each (hash, function(key, value))
   */
  _.each = function (hash, fn) {
    var o = [];
    for (var i in hash) {
      if (!hash.hasOwnProperty(i)) {
        continue;
      }
      o.push(fn(i, hash[i]));
    }
    return o;
  };
  
  /**
   * Delay ([seconds], fn)
   */
  _.delay = function delay(dt, fn) {
    if (!fn) {
      fn = dt; dt = 0.25;
    }
    window.setTimeout(fn, 1000 * dt);
  };
  
  /**
   * Map (iterable, function(item))
   */
  _.map = function map(it, fn) {
    var o = [];
    for (var i = 0; i < it.length; i++) { o.push(fn(it[i], i)); }
    return o;
  };
  
  /**
   * Extend (object, attrs)
   */
  _.extend = function extend(ob, attrs) {
    for (var k in attrs) {ob[k] = attrs[k];}
  };
  
  /**
   * Match (element, query)
   */
  _.matching = function matching(el, q) {
    while (true) {
      if (el.webkitMatchesSelector(q)) {
        return el;
      }
      
      el = el.parentNode;
      if (el === _.doc || !el) {
        break;
      }
    }
    return null;
  };
  

  /**
   * Query (element, query, [function])
   */
  _.query = function query(el, q, fn) {
    q = el.querySelectorAll(q);
    if (fn) { return _.map(q, fn); }
    return q;
  };

  /**
   * Append (element, [query], [attrs])
   */
  _.append = function append(el, q, attrs) {
    if (q instanceof Element) {
      el.appendChild(q);
      if (attrs) {
        throw new Error("Attrs cannot be specified on existing node");
      }
      return q;
    }
    var nx = _.create(q, attrs);
    el.appendChild(nx);
    return nx;
  };
  
  /**
   * Create ([query], [attrs])
   */
  _.create = function create(q, attrs) {
    if (typeof q === 'object') { attrs = q; q = ''; }
    attrs = attrs || {}; q = q.split('.');
    attrs.className =
      (attrs.className ? attrs.className + ' ' : '') + q.splice(1).join(' ');
    var nx = _.doc.createElement(q[0] || 'div');
    _.extend(nx, attrs);
    return nx;
  };
  
  /**
   * Show (element)
   */
  _.show = function show(el) {
    el.classList.remove('hidden');
  };

  /**
   * Hide (element)
   */
  _.hide = function hide(el) {
    el.classList.add('hidden');
  };
  
  /**
   * Reveal a single element
   */
  _.showOnly = function showOnly(el) {
    _.map(el.parentNode.childNodes, _.hide);
    _.show(el);
  };
  
  /**
   * Request JSON
   */
  _.requestJSON = function requestJSON(url, data, fn) {
    if (typeof data === 'function') {
      fn = data; data = null;
    }
    _.request(url, data, function parseJSON(x) { fn(JSON.parse(x)); });
  };
  
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
  _.request = function request(url, data, fn) {
    
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

})({doc: document});
