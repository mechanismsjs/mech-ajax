var merge = require("merge");
m = require("../node_modules/mech-core/dist/mech-core.js");
m2 = require("../node_modules/mech-scope-cell/dist/mech-scope-cell.js");
m3 = require("../node_modules/mech-math/dist/mech-math.js");
m4 = require("../node_modules/mech-async/dist/mech-async.js");
m5 = require("..");
merge.recursive(m, m5);
merge.recursive(m, m4);
merge.recursive(m, m3);
merge.recursive(m, m2);
expect = require("chai").expect;
require("./run-all.js");