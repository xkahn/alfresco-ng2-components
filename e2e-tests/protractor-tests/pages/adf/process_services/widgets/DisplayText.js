/**
 * Created by Cristina Jalba on 17/05/2018.
 */

var FormFields = require("../formFields.js");

var DisplayText = function () {

    var formFields = new FormFields();

    var labelLocator = by.css("div[class*='display-text-widget']");

    this.getFieldLabel = function (fieldId) {
        return formFields.getFieldLabel(fieldId, labelLocator);
    };

};

module.exports = DisplayText;

