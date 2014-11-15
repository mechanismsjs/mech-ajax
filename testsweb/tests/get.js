// README: 
// Must $ gulp webserver then browse to
// http://test.development.com:4050 or Access-Control-Allow-Origin exception is thrown
// TODO: Get mocha testing working with asynchronous mechanisms. Right now, we have our own assert

describe("running web specific tests", function() {

	beforeEach(function() {
		for (var key in m.cellWorkBook) {
			if (m.cellWorkBook.hasOwnProperty(key)) {
				delete m.cellWorkBook[key]; // slow but for tests ok
			}
		}
	});

	it("should not wipeout Object prototype and be a mechanism", function() {
		var mech = m.ajax.get();
		expect(mech).to.have.property('toString');
		expect(m.ajax._.GetF).to.not.eql(undefined);
	});

	it("should have correct properties", function() {
		var mech = m.ajax.get("http://test.development.com/testdata/test01.json");
		expect(mech.uri).to.equal("http://test.development.com/testdata/test01.json");
	});

	// TODO: Need this to be "testable". May not even need it.
	it("should not invoke any behavior after asynchronous call when m.async.bh is undefined or null", function() {
		var mech = m.async(
			m.ajax.get("http://test.development.com:4050/testsweb/testdata/test01.json")
		).go;

		var mech2 = m.async(
			m.ajax.get("http://test.development.com:4050/testsweb/testdata/test01.json"),
			null
		).go;
	});

	it ("should invoke a mechanism after asynchronous call", function() {
	  var mech2 = m.async(
	    m.ajax.get( "http://test.development.com:4050/testsweb/testdata/test01.json" ),
	    m.writeLn("HELLO!")
	  ).go;
	});

	it ("should not get unhappy if no parent mechanism.", function() {
	  var mech = m.ajax.get(
	    "http://test.development.com:4050/testsweb/testdata/test01.json"
	  ).go;
	});

	// asyncmc - the asynchronous mechanism to run
	// dstmc - a reference to the destination mechanism where the result is stored - sets "v" property
	// optional bhmc - the behavior to run after the asynchronous call is completed
	it("should be easy to use asynchronous results", function() {
		m.cell("A:1", 5); // define the cell
		var mech = m.async(
			m.ajax.get("http://test.development.com:4050/testsweb/testdata/test02.json"),
			m.cellRef("A:1"),
			m.assert(m.eqlNum(5, m.cellGet("A:1")), "Expected result to be 5")
		).go;
		// need to allows an assert here by adding mechanism support to mocha.
	});

});