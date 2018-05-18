/**
 * Created by Cristina Jalba on 15/03/2018.
 */

var Util = require("./../util/util.js");

var AcsUserModel = function (details) {

    this.displayName = Util.generateRandomString();
    this.id = Util.generateRandomString();

    this.getId = function () {
        return this.id;
    };

    this.getDisplayName = function () {
        return this.displayName;
    };

    Object.assign(this, details);

};
module.exports = AcsUserModel;
