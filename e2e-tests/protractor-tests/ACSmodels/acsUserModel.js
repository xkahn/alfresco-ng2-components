/*
 * Created by Cristina Jalba on 30/10/2017.
 */
var Util = require("./../util/util.js");

var AcsUserModel = function (details) {

    this.firstName = Util.generateRandomString();
    this.lastName = Util.generateRandomString();
    this.password = Util.generateRandomString();
    this.email = Util.generateRandomString();
    this.id = Util.generateRandomString();
    this.jobTitle = "N/A";

    this.getFirstName = function () {
        return this.firstName;
    };

    this.getLastName = function () {
        return this.lastName;
    };

    this.getPassword = function () {
        return this.password;
    };

    this.getEmail = function () {
        return this.email;
    };

    this.getId = function () {
        return this.id;
    };

    this.getJobTitle = function () {
        return this.jobTitle;
    };

    Object.assign(this, details);

};
module.exports = AcsUserModel;