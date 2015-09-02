var pkg = require('../package.json');

describe("the modules were built correctly", function() {
	it("should have the library", function() {
		expect(m).to.not.eql(undefined);
		expect(m).to.not.eql(undefined);
		expect(m.ajax).to.not.eql(undefined);
		expect(m.ajax._).to.not.eql(undefined);
	});

	it("should have the correct version", function() {
		expect(m.ajax._["version-" + pkg.namesub]).to.equal('0.2.0');
	});
});