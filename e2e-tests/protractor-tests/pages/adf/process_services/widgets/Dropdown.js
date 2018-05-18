/**
 * Created by Cristina Jalba on 17/05/2018.
 */

var FormFields = require("../formFields.js");

var Dropdown = function () {

    var formFields = new FormFields();

    var selectedOptionLocator = by.css("mat-select[id='dropdown'] span span");

    this.getSelectedOptionText = function (fieldId) {
        return formFields.getFieldText(fieldId, selectedOptionLocator);
    };

};

module.exports = Dropdown;
