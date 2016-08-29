// mech-ajax.js
// version: 0.2.2
// author: Eric Hosick <erichosick@gmail.com> (http://www.erichosick.com/)
// license: MIT
(function() {
"use strict";

var root = this; // window (browser) or exports (server)
var m = root.m || {}; // merge with previous or new module
m._ = m._ || {};
m.ajax = m.ajax || {}; // merge with pervious or new sub-module
m.ajax._ = m.ajax._ || {}; // merge with pervious or new sub-module
m.ajax._["version-ajax"] = '0.2.2'; // version set through gulp build

// export module for node or the browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = m;
} else {
  root.m = m;
}

function assert(eql, msg) {
  var f = Object.create(AssertF.prototype);
  f._eql = eql;
  f._msg = msg;
  return f;
}

function AssertF() {}
AssertF.prototype = Object.create(Object.prototype, {
  isMech: {
    get: function() {
      return true;
    }
  },
  mc: {
    enumerable: false,
    get: function() {
      return this._mc;
    }
  },
  go: {
    enumerable: false,
    get: function() {
      var result = this._eql.isMech ? this._eql.goBool : this._eql;
      if (!result) {
        throw (this._msg);
      }
      return true;
    }
  }
});
m.assert = assert;
m._.AssertF = AssertF;

// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
function get(uri) {
  var that = Object.create(GetF.prototype);
  that._uri = uri;
  if (window.XMLHttpRequest) { // Mozilla, Safari, ...
    that.request = new XMLHttpRequest();
  } else if (window.ActiveXObject) { // IE 8 and older
    that.request = new ActiveXObject("Microsoft.XMLHTTP");
  }
  that.request.onreadystatechange = function(result) {
    that.result = result;
    return that._goRetAsync;
  };
  return that;
}

function GetF() {}
GetF.prototype = Object.create(Object.prototype, {
  isMech: {
    get: function() {
      return true;
    }
  },
  uri: {
    enumerable: false,
    get: function() {
      return this._uri;
    }
  },
  go: {
    enumerable: false,
    get: function() {
      this.request.open("GET", this._uri, true);
      this.request.send();
      return "";
    }
  },
  _goRetAsync: {
    enumerable: false,
    get: function() {
      var srcResp = this.result.srcElement;
      if (4 === srcResp.readyState && 200 === srcResp.status) {
        if (this._parDir) {
          this._parDir.v = srcResp.response;
          return this._parDir._goRet;
        }
      } else {
        return undefined;
      }
    }
  }
});
m.ajax.get = get;
m.ajax._.GetF = GetF;


}.call(this));