/*
 * Created by Cristina Jalba on 20/12/2017.
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
var AppDefinitionsAPI = require('../restAPI/APS/enterprise/AppDefinitionsAPI');
var User = require('../restAPI/APS/models/User');
var BasicAuthorization = require('../restAPI/httpRequest/BasicAuthorization');
var TenantsAPI = require('../restAPI/APS/enterprise/TenantsAPI');
var Tenant = require('../restAPI/APS/models/Tenant');

var TestConfig = require("../test.config.js");
var resources = require("../util/resources.js");
var Task = require('../restAPI/APS/models/Task');

var dateFormat = require('dateformat');

describe("Start Task - Task App", function () {

    var adfLoginPage = new AdfLoginPage();
    var processServicesPage = new ProcessServicesPage();
    var basicAuthAdmin = new BasicAuthorization(TestConfig.adf_aps.apsAdminEmail, TestConfig.adf_aps.apsAdminPassword);
    var basicAuth, processUserModel, assigneeUserModel;
    var app = resources.Files.SIMPLE_APP_WITH_USER_FORM;
    var formTextField = app.form_fields.form_fieldId;
    var formFieldValue = "First value ";
    var taskPage = new TasksPage();
    var taskModel, formModel;
    var firstComment = "comm1", firstChecklist = "checklist1";
    var tasks = ["Modifying task", "Information box", "No form", "Not Created", "Refreshing form", "Assignee task"];

    beforeAll(function (done)
    {
        new TenantsAPI().createTenant(basicAuthAdmin, new Tenant())
            .then(function (result) {
                new UserAPI().createUser(basicAuthAdmin, assigneeUserModel = new User({ tenantId: JSON.parse(result.responseBody).id }));
                return new UserAPI().createUser(basicAuthAdmin, processUserModel = new User({ tenantId: JSON.parse(result.responseBody).id }));
            })
            .then(function(response) {
                basicAuth = new BasicAuthorization(processUserModel.email, processUserModel.password);
                return new AppDefinitionsAPI().importApp(basicAuth, app.file_location);
            })
            .then(function () {
                done();
            });
    });

    it("Modifying task", function () {
        adfLoginPage.loginToProcessServicesUsingUserModel(processUserModel);
        processServicesPage.goToProcessServices().goToTaskApp()
            .clickTasksButton().createNewTask().addName(tasks[0])
            .addForm(app.formName).clickStartButton()
            .then(function () {
                taskPage.usingTasksListPage().checkTaskIsDisplayedInTasksList(tasks[0]);
                taskPage.usingTaskDetails().clickInvolvePeopleButton()
                    .typeUser(assigneeUserModel.firstName+" "+assigneeUserModel.lastName)
                    .selectUserToInvolve(assigneeUserModel.firstName+" "+assigneeUserModel.lastName)
                    .checkUserIsSelected(assigneeUserModel.firstName+" "+assigneeUserModel.lastName);
                taskPage.usingTaskDetails().clickAddInvolvedUserButton();
                expect(taskPage.usingTaskDetails().getInvolvedUserEmail(assigneeUserModel.firstName+" "+assigneeUserModel.lastName))
                    .toEqual(assigneeUserModel.email);
                taskPage.usingTaskDetails().selectActivityTab().addComment(firstComment)
                    .checkCommentIsDisplayed(firstComment);
                taskPage.clickOnAddChecklistButton().addName(firstChecklist).clickCreateChecklistButton();
                taskPage.checkChecklistIsDisplayed(firstChecklist);
                taskPage.usingTaskDetails().selectDetailsTab();
            });
    });

    it("Information box", function () {
        processServicesPage.goToProcessServices().goToTaskApp()
            .clickTasksButton().createNewTask().addName(tasks[1]).addDescription("Description")
            .addForm(app.formName).clickStartButton()
            .then(function () {
                expect(taskPage.usingTaskDetails().getTitle()).toEqual("Activities");
            })
            .then(function () {
                return TaskAPI.tasksQuery(basicAuth, new Task({sort: "created-desc"}))
            })
            .then (function (response) {
                taskModel = new TaskModel(JSON.parse(response.responseBody).data[0]);
                taskPage.usingTasksListPage().checkTaskIsDisplayedInTasksList(taskModel.getName());
                expect(taskPage.usingTaskDetails().getCreated()).toEqual(dateFormat(taskModel.getCreated(), CONSTANTS.TASKDATAFORMAT));
                expect(taskPage.usingTaskDetails().getId()).toEqual(taskModel.getId());
                expect(taskPage.usingTaskDetails().getDescription()).toEqual(taskModel.getDescription());
                expect(taskPage.usingTaskDetails().getAssignee()).toEqual(taskModel.getAssignee().getEntireName());
                expect(taskPage.usingTaskDetails().getCreatedBy()).toEqual(taskModel.getAssignee().getEntireName());
                expect(taskPage.usingTaskDetails().getCategory())
                    .toEqual(taskModel.getCategory() == null ? CONSTANTS.TASKDETAILS.NO_CATEGORY : taskModel.getCategory());
                expect(taskPage.usingTaskDetails().getDueDate())
                    .toEqual(taskModel.getDueDate() == null ? CONSTANTS.TASKDETAILS.NO_DATE : taskModel.getDueDate());
                expect(taskPage.usingTaskDetails().getParentName())
                    .toEqual(taskModel.getParentTaskName() == null ? CONSTANTS.TASKDETAILS.NO_PARENT : taskModel.getParentTaskName());
                expect(taskPage.usingTaskDetails().getStatus()).toEqual(CONSTANTS.TASKSTATUS.RUNNING);
                return new FormModelsAPI().getForm(basicAuth, taskModel.getFormKey());
            })
            .then (function (response) {
                formModel = new FormModel(JSON.parse(response.responseBody));
                expect(taskPage.usingTaskDetails().getFormName())
                    .toEqual(formModel.getName() == null ? CONSTANTS.TASKDETAILS.NO_FORM : formModel.getName());
            });
    });

    it("Start task with no form", function () {
        processServicesPage.goToProcessServices().goToTaskApp()
            .clickTasksButton().createNewTask().addName(tasks[2]).clickStartButton()
            .then(function () {
                taskPage.usingTasksListPage().checkTaskIsDisplayedInTasksList(tasks[2]);
                taskPage.usingFormFields().noFormIsDisplayed();
                expect(taskPage.usingTaskDetails().getFormName()).toEqual(CONSTANTS.TASKDETAILS.NO_FORM);
            });
    });

    it("Start task buttons", function () {
        processServicesPage.goToProcessServices().goToTaskApp().clickTasksButton();
        taskPage.usingFiltersPage().goToFilter(CONSTANTS.TASKFILTERS.MY_TASKS);
        taskPage.createNewTask().checkStartButtonIsDisabled().addName(tasks[3])
            .checkStartButtonIsEnabled().clickCancelButton()
            .then(function () {
                taskPage.usingTasksListPage().checkTaskIsNotDisplayedInTasksList(tasks[3]);
                expect(taskPage.usingFiltersPage().getActiveFilter()).toEqual(CONSTANTS.TASKFILTERS.MY_TASKS);
            });
    });

    it("Refreshing the form", function () {
        processServicesPage.goToProcessServices().goToTaskApp()
            .clickTasksButton().createNewTask()
            .addForm(app.formName).addName(tasks[4]).clickStartButton()
            .then(function () {
                taskPage.usingTasksListPage().checkTaskIsDisplayedInTasksList(tasks[4]);
                expect(taskPage.usingFormFields().setFieldValue(by.id, formTextField, formFieldValue)
                    .getFieldValue(by.id, formTextField)).toEqual(formFieldValue);
                taskPage.usingFormFields().refreshForm().checkFieldValue(by.id, formTextField, "");
                taskPage.usingTasksListPage().checkTaskIsDisplayedInTasksList(tasks[4]);
                taskPage.usingFormFields().setFieldValue(by.id, formTextField, formFieldValue)
                    .checkFieldValue(by.id, formTextField, formFieldValue);
                taskPage.usingFormFields().saveForm().getFieldValue(by.id, formTextField, formFieldValue);
            });
    });

    it("Assign User", function () {
        processServicesPage.goToProcessServices().goToTaskApp()
            .clickTasksButton().createNewTask().addName(tasks[5])
            .addAssignee(assigneeUserModel.firstName).clickStartButton()
            .then(function () {
                taskPage.usingTasksListPage().checkTaskListIsLoaded();
                taskPage.usingTasksListPage().waitForTableBody();
                taskPage.usingFiltersPage().goToFilter(CONSTANTS.TASKFILTERS.INV_TASKS);
                taskPage.usingTasksListPage().checkTaskIsDisplayedInTasksList(tasks[5]).selectTaskFromTasksList(tasks[5]);
                taskPage.checkTaskTitle(tasks[5]);
                expect(taskPage.usingTaskDetails().getAssignee()).toEqual(assigneeUserModel.firstName + " " + assigneeUserModel.lastName );
            });
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
