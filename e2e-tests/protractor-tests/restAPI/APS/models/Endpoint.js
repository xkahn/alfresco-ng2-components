/**
 * Created by ctopala on 28/02/18.
 */


var Util = require('../../../util/util.js');

/**
 * Create Tenant Endpoint JSON Object
 *
 * @param details - JSON object used to overwrite the default values
 * @constructor
 */

var Endpoint = function (details) {

    this.protocol = 'HTTP';
    this.name = Util.generateRandomString();
    this.tenantId = null;
    this.host=null;
    this.port=null;
    this.path=null;

    Object.assign(this, details);
};

module.exports = Endpoint;