/**
 * Created by Cristina Jalba on 19/03/2018.
 */

var AdfLoginPage = require('../pages/adf/loginPage.js');
var ProcessServicesPage = require('../pages/adf/process_services/processServicesPage.js');
var TasksPage = require('../pages/adf/process_services/tasksPage.js');

var UserAPI = require('../restAPI/APS/enterprise/UsersAPI');
var TaskModel = require('../restAPI/APS/responseModel/TaskModel.js');
var CONSTANTS = require("../util/constants");
var RequestEnterpriseBase = require('../restAPI/APS/enterprise/RequestEnterpriseBase');
baseUrl = new RequestEnterpriseBase().getBaseURL(CONSTANTS.APPLICATION.ADF_APS);
var TaskAPI = require('../restAPI/APS/enterprise/TaskAPI');
var FormModelsAPI = require('../restAPI/APS/enterprise/FormModelsAPI.js');
var FormModel = require('../restAPI/APS/responseModel/FormModel.js');
var FormDefinitionModel = require('../restAPI/APS/responseModel/FormDefinitionModel.js');
var AppDefinitionsAPI = require('../restAPI/APS/enterprise/AppDefinitionsAPI');
var User = require('../restAPI/APS/models/User');
var BasicAuthorization = require('../restAPI/httpRequest/BasicAuthorization');
var TenantsAPI = require('../restAPI/APS/enterprise/TenantsAPI');
var Tenant = require('../restAPI/APS/models/Tenant');
var AppPublish = require('../restAPI/APS/models/AppPublish');
var RuntimeAppDefinitionAPI = require('../restAPI/APS/enterprise/RuntimeAppDefinitionAPI');
var AppDefinition = require('../restAPI/APS/models/AppDefinition');
var UsingWidget = require("../pages/adf/process_services/widgets/usingWidget.js");

var TestConfig = require("../test.config.js");
var resources = require("../util/resources.js");
var Task = require('../restAPI/APS/models/Task');

var formInstance = new FormDefinitionModel();

describe("Form widgets", function () {

    var adfLoginPage = new AdfLoginPage();
    var processServicesPage = new ProcessServicesPage();
    var basicAuthAdmin = new BasicAuthorization(TestConfig.adf_aps.apsAdminEmail, TestConfig.adf_aps.apsAdminPassword);
    var basicAuth, processUserModel;
    var app = resources.Files.PROCESSES.WIDGETS_SMOKE_TEST;
    var appFilds = app.form_fields;
    var taskPage = new TasksPage();
    var appModel, modelId;
    var taskModel, formModel;
    var newTask = "First task";
    var usingWidget = new UsingWidget();

    beforeAll(function (done)
    {
        new TenantsAPI().createTenant(basicAuthAdmin, new Tenant())
            .then(function (result) {
                return new UserAPI().createUser(basicAuthAdmin, processUserModel = new User({ tenantId: JSON.parse(result.responseBody).id }));
            })
            .then(function(response) {
                basicAuth = new BasicAuthorization(processUserModel.email, processUserModel.password);
                return new AppDefinitionsAPI().importApp(basicAuth, app.file_location);
            })
            .then(function(response) {
                appModel = JSON.parse(response.responseBody);
                modelId = appModel.definition.models[0].id;
                return appModel.id;
            })
            .then(function() {
                return new AppDefinitionsAPI().publishApp(basicAuth, appModel.id.toString(), new AppPublish());
            })
            .then(function(response) {
                return new RuntimeAppDefinitionAPI().deployApp(basicAuth, new AppDefinition({id: appModel.id.toString()}));
            })
            .then(function (response) {
                done();
            });
    });

    it("Check text, multiline widgets - label, value and displayed", function () {
        adfLoginPage.loginToProcessServicesUsingUserModel(processUserModel);
        processServicesPage.goToProcessServices().goToApp(appModel.name)
            .clickTasksButton().createNewTask().addName(newTask).addDescription("Description").addForm(app.formName).clickStartButton()
            .then(function () {
                taskPage.usingTasksListPage().checkTaskIsDisplayedInTasksList(newTask);
                taskPage.usingFormFields().checkFormIsDisplayed();
                expect(taskPage.usingTaskDetails().getTitle()).toEqual("Activities");
            })
            .then(function () {
                return TaskAPI.tasksQuery(basicAuth, new Task({sort: "created-desc"}));
            })
            .then(function (response) {
                taskModel = new TaskModel(JSON.parse(response.responseBody).data[0]);
                return new FormModelsAPI().getForm(basicAuth, taskModel.getFormKey());
            })
            .then (function (response) {
                formModel = new FormModel(JSON.parse(response.responseBody));
                expect(taskPage.usingTaskDetails().getFormName())
                    .toEqual(formModel.getName() == null ? CONSTANTS.TASKDETAILS.NO_FORM : formModel.getName());
            })
            .then (function () {
                return new FormModelsAPI().getFormModel(basicAuth, formModel.modelId.toString());
            })
            .then (function (response) {
                formInstance.setFields(JSON.parse(response.responseBody).formDefinition.fields);
                formInstance.setAllWidgets(JSON.parse(response.responseBody).formDefinition.fields);
                return formInstance;
            })
            .then (function () {
                expect(taskPage.usingFormFields().getFieldLabel(appFilds.text_id))
                    .toEqual(formInstance.getWidgetBy("id", appFilds.text_id).name);
                expect(taskPage.usingFormFields().getFieldValue(appFilds.text_id))
                    .toEqual(formInstance.getWidgetBy("id", appFilds.text_id).value || '');

                expect(usingWidget.usingMultilineTextWidget().getFieldValue(appFilds.multiline_id))
                    .toEqual(formInstance.getWidgetBy("id", appFilds.multiline_id).value || '');
                expect(taskPage.usingFormFields().getFieldLabel(appFilds.multiline_id))
                    .toEqual(formInstance.getWidgetBy("id", appFilds.multiline_id).name);
            });

    });

    it("Check number, amount widgets - label, value and displayed", function () {

        expect(taskPage.usingFormFields().getFieldValue(appFilds.number_id))
            .toEqual(formInstance.getWidgetBy("id", appFilds.number_id).value || '');
        expect(taskPage.usingFormFields().getFieldLabel(appFilds.number_id))
            .toEqual(formInstance.getWidgetBy("id", appFilds.number_id).name);

        expect(taskPage.usingFormFields().getFieldValue(appFilds.amount_id))
            .toEqual(formInstance.getWidgetBy("id", appFilds.amount_id).value || '');
        expect(taskPage.usingFormFields().getFieldLabel(appFilds.amount_id))
            .toEqual(formInstance.getWidgetBy("id", appFilds.amount_id).name);
    });

    it("Check attachfolder, attachfile widgets - label and displayed", function () {

        expect(taskPage.usingFormFields().getFieldLabel(appFilds.attachfolder_id))
            .toEqual(formInstance.getWidgetBy("id", appFilds.attachfolder_id).name);
        expect(taskPage.usingFormFields().getFieldLabel(appFilds.attachfile_id))
            .toEqual(formInstance.getWidgetBy("id", appFilds.attachfile_id).name);
    });

    it("Check date, date & time widgets - label, value and displayed", function () {

        expect(taskPage.usingFormFields().getFieldLabel(appFilds.date_id))
            .toContain(formInstance.getWidgetBy("id", appFilds.date_id).name);
        expect(taskPage.usingFormFields().getFieldValue(appFilds.date_id))
            .toEqual(formInstance.getWidgetBy("id", appFilds.date_id).value || '');

        expect(taskPage.usingFormFields().getFieldLabel(appFilds.dateTime_id))
            .toContain(formInstance.getWidgetBy("id", appFilds.dateTime_id).name);
        expect(taskPage.usingFormFields().getFieldValue(appFilds.dateTime_id))
            .toEqual(formInstance.getWidgetBy("id", appFilds.dateTime_id).value || '');
    });

    it("Check people, group widgets - label, value and displayed", function () {

        expect(taskPage.usingFormFields().getFieldValue(appFilds.people_id))
            .toEqual(formInstance.getWidgetBy("id", appFilds.people_id).value || '');
        expect(taskPage.usingFormFields().getFieldLabel(appFilds.people_id))
            .toEqual(formInstance.getWidgetBy("id", appFilds.people_id).name);

        expect(taskPage.usingFormFields().getFieldValue(appFilds.group_id))
            .toEqual(formInstance.getWidgetBy("id", appFilds.group_id).value || '');
        expect(taskPage.usingFormFields().getFieldLabel(appFilds.group_id))
            .toEqual(formInstance.getWidgetBy("id", appFilds.group_id).name);
    });

    it("Check displayText, displayValue widgets - value and displayed", function () {

        expect(usingWidget.usingDisplayTextWidget().getFieldLabel(appFilds.displaytext_id))
            .toEqual(formInstance.getWidgetBy("id", appFilds.displaytext_id).value);
        expect(usingWidget.usingDisplayValueWidget().getFieldLabel(appFilds.displayvalue_id))
            .toEqual(formInstance.getWidgetBy("id", appFilds.displayvalue_id).value || 'Unknown type: readonly');
    });

    it("Check typeahead, header widgets - label, value and displayed", function () {

        expect(usingWidget.usingHeaderWidget().getFieldLabel(appFilds.header_id))
            .toEqual(formInstance.getWidgetBy("id", appFilds.header_id).name);

        expect(taskPage.usingFormFields().getFieldValue(appFilds.typeahead_id))
            .toEqual(formInstance.getWidgetBy("id", appFilds.typeahead_id).value || '');
        expect(taskPage.usingFormFields().getFieldLabel(appFilds.typeahead_id))
            .toEqual(formInstance.getWidgetBy("id", appFilds.typeahead_id).name);
    });

    it("Check checkbox, radiobuttons widgets - label, value and displayed", function () {
        var radioOption = 1;

        expect(taskPage.usingFormFields().getFieldLabel(appFilds.checkbox_id))
            .toContain(formInstance.getWidgetBy("id", appFilds.checkbox_id).name);

        expect(taskPage.usingFormFields().getFieldLabel(appFilds.radiobuttons_id))
            .toContain(formInstance.getWidgetBy("id", appFilds.radiobuttons_id).name);
        expect(usingWidget.usingRadioWidget().getSpecificOptionLabel(appFilds.radiobuttons_id, radioOption))
            .toContain(formInstance.getWidgetBy("id", appFilds.radiobuttons_id).options[radioOption-1].name);
    });

    it("Check hyperlink, dropdown, dynamictable widgets - label, value and displayed", function () {

        expect(usingWidget.usingHyperlink().getFieldText(appFilds.hyperlink_id))
            .toEqual(formInstance.getWidgetBy("id", appFilds.hyperlink_id).hyperlinkUrl || '');
        expect(taskPage.usingFormFields().getFieldLabel(appFilds.hyperlink_id))
            .toEqual(formInstance.getWidgetBy("id", appFilds.hyperlink_id).name);

        expect(taskPage.usingFormFields().getFieldLabel(appFilds.dropdown_id))
            .toContain(formInstance.getWidgetBy("id", appFilds.dropdown_id).name);
        expect(usingWidget.usingDropdown().getSelectedOptionText(appFilds.dropdown_id))
            .toContain(formInstance.getWidgetBy("id", appFilds.dropdown_id).value);

        expect(usingWidget.usingDynamicTable().getFieldLabel(appFilds.dynamictable_id))
            .toContain(formInstance.getWidgetBy("id", appFilds.dynamictable_id).name);
        expect(usingWidget.usingDynamicTable().getColumnName(appFilds.dynamictable_id))
            .toContain(formInstance.getWidgetBy("id", appFilds.dynamictable_id).columnDefinitions[0].name);
    });

    afterAll( function (done) {
        return new TenantsAPI().deleteTenant(basicAuthAdmin, processUserModel.tenantId.toString())
            .then(function (result) {
                done();
            })
            .catch(function(error) {
                console.log('Failed with error: ', error);
            });
    });

});

