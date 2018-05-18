/**
 * Created by ssaiyed on 01/11/17.
 */


var Util = require('../../../util/util.js');

/**
 * Create User JSON Object
 *
 * @param details - JSON object used to overwrite the default values
 * @constructor
 */

var User = function (details) {
    
    this.email = Util.generateRandomEmail();
    this.firstName = Util.generateRandomString();
    this.lastName = Util.generateRandomString();
    this.password = Util.generatePasswordString();
    this.type = 'enterprise';
    this.tenantId = "1";
    this.company = null;

    Object.assign(this, details);
};
module.exports = User;
