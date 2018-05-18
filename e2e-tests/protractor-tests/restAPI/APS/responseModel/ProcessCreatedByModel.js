/**
 * Created by jdosti on 13/03/2018.
 */

var ProcessCreatedByModel = function (details) {

    this.id;
    this.firstName;
    this.lastName;
    this.email;

    this.getFirstName = function () {
        return this.firstName;
    };

    this.getId = function () {
        return this.id;
    };

    this.getLastName = function () {
        return this.lastName;
    };

    this.getEmail = function () {
        return this.email;
    };

    this.getEntireName = function() {
        return this.firstName + " " + this.getLastName();
    };

    Object.assign(this, details);

};

module.exports = ProcessCreatedByModel;
