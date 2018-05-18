/**
 * Created by Cristina Jalba on 17/05/2018.
 */

var FormFields = require("../formFields.js");

var Hyperlink = function () {

    var formFields = new FormFields();

    var fieldLocator = by.css("div[class='adf-hyperlink-widget '] a");

    this.getFieldText = function (fieldId) {
        return formFields.getFieldText(fieldId, fieldLocator);
    };

};

module.exports = Hyperlink;