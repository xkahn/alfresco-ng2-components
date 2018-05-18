/**
 * Created by Cristina Jalba on 17/05/2018.
 */

var FormFields = require("../formFields.js");

var Header = function () {

    var formFields = new FormFields();

    var labelLocator = by.css("span[id='container-header-label']");

    this.getFieldLabel = function (fieldId) {
        return formFields.getFieldLabel(fieldId, labelLocator);
    };

};

module.exports = Header;
