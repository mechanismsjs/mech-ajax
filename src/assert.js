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