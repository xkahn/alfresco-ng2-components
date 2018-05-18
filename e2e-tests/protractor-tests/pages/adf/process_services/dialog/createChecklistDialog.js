/*
 * Created by Cristina Jalba on 14/02/2018.
 */

var Util = require("../../../../util/util.js");

var ChecklistDialog = function () {

    var nameField = element(by.css("input[data-automation-id='checklist-name']"));
    var checklistButton = element(by.css("button[id='add-check'] span"));

    this.addName = function (name) {
        Util.waitUntilElementIsVisible(nameField);
        nameField.sendKeys(name);
        return this;
    };

    this.clickCreateChecklistButton = function () {
        Util.waitUntilElementIsVisible(checklistButton);
        checklistButton.click();
    };

};
module.exports = ChecklistDialog;