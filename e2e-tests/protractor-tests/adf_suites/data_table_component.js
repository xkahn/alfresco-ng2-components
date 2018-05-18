/*
 * Created by Cristina Jalba on 05/08/2017.
 */
var AdfLoginPage = require('../pages/adf/loginPage.js');
var DataTablePage = require('../pages/adf/dataTablePage.js');
var AcsUserModel = require("../ACSmodels/acsUserModel.js");
var PeopleAPI = require('../restAPI/ACM/PeopleAPI.js');
var TestConfig = require("../test.config.js");

describe("Test Datatable component", function () {

    var dataTablePage = new DataTablePage();
    var adfLoginPage = new AdfLoginPage();
    var acsUser = new AcsUserModel();
    var adminUserModel = new AcsUserModel({"id" : TestConfig.adf.mainAdminEmail, "password" : TestConfig.adf.mainAdminPassword});

    beforeAll(function (done)
    {
        PeopleAPI.createUserViaAPI(adminUserModel, acsUser);
        adfLoginPage.loginUsingUserModel(acsUser);
        dataTablePage.goToDatatable();
        done();
    });

    it("1. DataTable allows extra rows to be added", function () {
        dataTablePage.getNumberOfRows().then(function (result) {
            dataTablePage.addRow();
            expect(dataTablePage.getNumberOfRows()).toEqual(result + 1);
            dataTablePage.addRow();
            expect(dataTablePage.getNumberOfRows()).toEqual(result + 2);
        });
    });

    it("2. Data Table can replace rows", function () {
        dataTablePage.replaceRows(1);
    });

    it("3. Data Table can replace columns", function () {
        dataTablePage.replaceColumns();
    });
    
});
