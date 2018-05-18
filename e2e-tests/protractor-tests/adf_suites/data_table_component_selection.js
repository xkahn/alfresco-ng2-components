/**
 * Created by Cristina Jalba on 05/08/2017.
 */
var AdfLoginPage = require('../pages/adf/loginPage.js');
var DataTablePage = require('../pages/adf/dataTablePage.js');
var TestConfig = require("../test.config.js");
var AcsUserModel = require("../ACSmodels/acsUserModel.js");
var PeopleAPI = require('../restAPI/ACM/PeopleAPI.js');

describe("Test Datatable component - selection", function () {

    var dataTablePage = new DataTablePage();
    var adfLoginPage = new AdfLoginPage();
    var acsUser = new AcsUserModel();
    var adminUserModel = new AcsUserModel({"id" : TestConfig.adf.mainAdminEmail, "password" : TestConfig.adf.mainAdminPassword});

    beforeAll(function (done) {
        PeopleAPI.createUserViaAPI(adminUserModel, acsUser);
        adfLoginPage.loginUsingUserModel(acsUser);
        dataTablePage.goToDatatable();
        done();
    });

    it("1. Data Table Selection Modes", function () {
        dataTablePage.selectRow("2");
        dataTablePage.checkRowIsSelected("2");
        dataTablePage.getNumberOfSelectedRows().then(function (result) {
            expect(result).toEqual(1);
        });
        dataTablePage.selectRow("3");
        dataTablePage.checkRowIsSelected("3");
        dataTablePage.getNumberOfSelectedRows().then(function (result) {
            expect(result).toEqual(1);
        });
        dataTablePage.selectSelectionMode("Multiple");
        dataTablePage.selectRow("1");
        dataTablePage.selectRowWithKeyboard("3");
        dataTablePage.checkRowIsSelected("1");
        dataTablePage.checkRowIsSelected("3");
        dataTablePage.checkRowIsNotSelected("2");
        dataTablePage.checkRowIsNotSelected("4");
        dataTablePage.selectSelectionMode("None");
        dataTablePage.selectRow("1");
        dataTablePage.checkNoRowIsSelected();
    });

    it("2. Data Table allows the multiselection of rows", function () {
        dataTablePage.clickMultiSelect();
        dataTablePage.clickCheckbox("1");
        dataTablePage.checkRowIsChecked("1");
        dataTablePage.clickCheckbox("3");
        dataTablePage.checkRowIsChecked("3");
        dataTablePage.checkRowIsNotChecked("2");
        dataTablePage.checkRowIsNotChecked("4");
        dataTablePage.clickCheckbox("3");
        dataTablePage.checkRowIsNotChecked("3");
        dataTablePage.checkRowIsChecked("1");
    });

    it("3. Can select all in data table", function () {
        dataTablePage.checkAllRows();
        dataTablePage.checkRowIsChecked("1");
        dataTablePage.checkRowIsChecked("2");
        dataTablePage.checkRowIsChecked("3");
        dataTablePage.checkRowIsChecked("4");
     });
});
