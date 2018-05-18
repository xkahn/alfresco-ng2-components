/**
 * Created by Cristina Jalba on 17/05/2018.
 */

var FormFields = require("../formFields.js");

var MultilineText = function () {

    var formFields = new FormFields();

    var valueLocator = by.css("textarea");

    this.getFieldValue = function (fieldId) {
        return formFields.getFieldValue(fieldId, valueLocator);
    };

};

module.exports = MultilineText;

