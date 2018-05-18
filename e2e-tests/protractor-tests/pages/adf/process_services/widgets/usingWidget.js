/**
 * Created by Cristina Jalba on 17/05/2018.
 */

var MultilineText = require("./MultilineText.js");
var Header = require("./Header.js");
var DisplayText = require("./DisplayText.js");
var DisplayValue = require("./DisplayValue.js");
var RadioButtons = require("./RadioButtons.js");
var Hyperlink = require("./Hyperlink.js");
var Dropdown = require("./Dropdown.js");
var DynamicTable = require("./DynamicTable.js");

var UsingWidget = function () {

    this.usingMultilineTextWidget = function () {
        return new MultilineText();
    };

    this.usingHeaderWidget = function () {
        return new Header();
    };

    this.usingDisplayTextWidget = function () {
        return new DisplayText();
    };

    this.usingDisplayValueWidget = function () {
        return new DisplayValue();
    };

    this.usingRadioWidget = function () {
        return new RadioButtons();
    };

    this.usingHyperlink = function () {
        return new Hyperlink();
    };

    this.usingDropdown = function () {
        return new Dropdown();
    };

    this.usingDynamicTable = function () {
        return new DynamicTable();
    };

};

module.exports = UsingWidget;

