/**
 * Created by Cristina Jalba on 17/05/2018.
 */

var FormFields = require("../formFields.js");

var DynamicTable = function () {

    var formFields = new FormFields();

    var labelLocator = by.css("dynamic-table-widget div div");
    var columnNameLocator = by.css("table[id*='dynamic-table'] th");

    this.getFieldLabel = function (fieldId) {
        return formFields.getFieldLabel(fieldId, labelLocator);
    };

    this.getColumnName = function (fieldId) {
        return formFields.getFieldText(fieldId, columnNameLocator);
    };

};

module.exports = DynamicTable;
