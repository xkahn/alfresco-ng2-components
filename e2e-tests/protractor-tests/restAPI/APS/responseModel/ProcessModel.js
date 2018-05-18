/*
 * Created by Cristina Jalba on 12/02/2018.
 */

var ProcessCreatedByModel = require('./ProcessCreatedByModel.js');

var ProcessModel = function (details) {

    this.id;
    this.name;
    this.version;
    this.modelType;
    this.description;
    this.createdByFullName;
    this.createdBy;
    this.lastUpdatedByFullName;
    this.lastUpdatedBy;
    this.lastUpdated;
    this.startedBy = {};

    this.getName = function () {
        return this.name;
    };

    this.getId = function () {
        return this.id;
    };

    this.getVersion = function () {
        return this.version;
    };

    this.getModelType = function () {
        return this.modelType;
    };

    this.getDescription = function () {
        return this.description;
    };

    this.getCreatedByFullName = function () {
        return this.createdByFullName;
    };

    this.getCreatedBy = function () {
        return this.createdBy;
    };

    this.getLastUpdatedByFullName = function () {
        return this.lastUpdatedByFullName;
    };

    this.getLastUpdatedBy = function () {
        return this.lastUpdatedBy;
    };

    this.getLastUpdated = function () {
        return this.lastUpdated;
    };

    this.getStartedBy = function () {
        return this.startedBy;
    };

    Object.assign(this, details);
    Object.assign(this.startedBy, new ProcessCreatedByModel(details.startedBy));


};
module.exports = ProcessModel;
