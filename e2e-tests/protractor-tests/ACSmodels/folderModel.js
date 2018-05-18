/*
 * Created by Cristina Jalba on 08/11/2017.
 */
var Util = require("./../util/util.js");

var FolderModel = function (details) {

    this.id = Util.generateRandomString();
    this.name = Util.generateRandomString();
    this.shortName = this.name;
    this.tooltip = this.name;
    this.location = "";

    this.getName = function () {
        return this.name;
    };

    this.getShortName = function () {
        return this.shortName;
    };

    this.getTooltip = function () {
        return this.tooltip;
    };

    this.getId = function () {
        return this.id;
    };

    this.getLocation = function () {
        return this.location;
    };

    Object.assign(this, details);

};
module.exports = FolderModel;

