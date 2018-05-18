/**
 * Created by ssaiyed on 16/03/18.
 */

let Util = require('../../../util/util');
let Filters = require('../../../restAPI/APS/models/Filter');

let filter = JSON.stringify(new Filters());

/**
 * Create and manage process-filter JSON Object
 *
 * @param details - JSON object used to overwrite the default values
 * @constructor
 */

let ProcessFilter = function (details) {

    this.appId = '1';
    this.filter = JSON.parse(filter);
    this.icon = Util.generateRandomString();
    this.name = Util.generateRandomString();

  Object.assign(this, details);
};
module.exports = ProcessFilter;
