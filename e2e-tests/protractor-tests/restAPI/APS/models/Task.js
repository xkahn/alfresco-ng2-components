/**
 * Created by ssaiyed on 08/11/17.
 */

var Util = require('../../../util/util.js');

/**
 * Create and manage task JSON Object
 *
 * @param details - JSON object used to overwrite the default values
 * @constructor
 */

var Task = function (details) {

    this.processInstanceId;
    this.sort;

    Object.assign(this, details);
};
module.exports = Task;
