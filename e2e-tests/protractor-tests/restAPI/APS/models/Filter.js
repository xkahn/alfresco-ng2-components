/**
 * Created by ssaiyed on 19/03/18.
 */

var Util = require('../../../util/util');

/**
 * Create and manage Filter JSON Object
 * @param details - JSON object used to overwrite the default values
 * @constructor
 */
var Filters = function (details) {
    this.asc = true;

    Object.assign(this, details);
};
module.exports = Filters;
