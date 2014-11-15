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