/**
 * Created by ssaiyed on 01/11/17.
 */

var Util = require('../../../util/util.js');

/**
 * Create tenant JSON Object
 *
 * @param details - JSON object used to overwrite the default values
 * @constructor
 */
var Tenant = function (details) {
    this.active = true;
    this.configuration = "DefaultConfig";
    this.domain = "DefaultDomain";
    this.maxUsers = 10;
    this.name = Util.generateRandomString();

    Object.assign(this, details);
};

module.exports = Tenant;