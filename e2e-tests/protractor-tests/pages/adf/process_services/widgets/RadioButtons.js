/**
 * Created by Cristina Jalba on 17/05/2018.
 */

var FormFields = require("../formFields.js");
var Util = require("../../../../util/util.js");

var RadioButtons = function () {

    var formFields = new FormFields();

    this.getSpecificOptionLabel = function (fieldId, optionNumber) {
        var optionLocator = by.css("label[for*='radiobuttons-option_" + optionNumber + "'] div[class*='content']");
        var option = formFields.getWidget(fieldId).element(optionLocator);
        Util.waitUntilElementIsVisible(option);
        return option.getText();
    };

};

module.exports = RadioButtons;
