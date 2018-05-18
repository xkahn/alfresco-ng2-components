/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Lucian Tuca on 04/02/2015.
 */

var Page = require("astrolabe").Page;
var TestConfig = require("../../../test.config.js");
var Util = require("../../../util/util.js");

var navbar = require("../components/navbar.js");
/**
 * Provides the Tasks page.
 * @module pages
 * @submodule activiti
 * @submodule workflow
 * @class pages.activiti.workflow.TasksPage
 */
module.exports = Page.create({
    /**
     * Indicates this page's url.
     *
     * @property url
     * @type {String}
     * @default TestConfig.main.webContextRoot + '/workflow/#/tasks'
     */
    url: {value: TestConfig.main.webContextRoot + '/workflow/#/tasks'},

    /**
     * Provides the top navigation bar.
     *
     * @property navbar
     * @type astrolabe.Page
     */
    navbar: {
        get: function () {
            return navbar;
        }
    },

    /**
     * Selects a task (by clicking it) from the left panel list based on the index parameter.
     *
     * @param index {int}
     * @method selectTask
     */
    selectTask: {
        value: function (index) {
            Util.waitUntilElementIsVisible(element(by.css("ul[ng-if*='model.tasks.length'] .ng-scope.active")));
            items = $$("ul[ng-if*='model.tasks.length'] .ng-scope.active");

            // note the index originally started from 1, hence index-1
            items.get(index - 1).click();
        }
    },

    /**
     * Clicks an completing task button based on the button text parameter given.
     *
     * @param buttonText
     * @method clickTaskButton
     */
    clickTaskButton: {
        value: function (buttonText) {
            Util.waitUntilElementIsVisible(element(by.xpath(".//div[@id='formsection']//button[text()='" + buttonText + "']")));
            element(by.xpath(".//div[@id='formsection']//button[text()='" + buttonText + "']")).click();
        }
    },

    /**
     * Provides the create task button
     *
     * @property createTaskButton
     * @type protractor.Element
     */
    createTaskButton: {
        get: function () {
            return element(by.css(".toggle-create-task"));
        }
    },

    /**
     * Clicks the create task button opening the create task dialog.
     *
     * @method clickCreateTask
     */
    clickCreateTask: {
        value: function () {
            Util.waitUntilElementIsVisible(this.createTaskButton);
            this.createTaskButton.click();
        }
    },

    /**
     * Provides the input for the task name.
     *
     * @property txtTaskName
     * @type protractor.Element
     */
    txtTaskName: {
        get: function () {
            return element(by.css('div>input[enter-pressed="confirmTaskCreation()"]'));
        }
    },

    /**
     * Fills in the task name
     *
     * @param taskName {String}
     * @method fillTaskName
     */
    fillTaskName: {
        value: function (taskName) {
            Util.waitUntilElementIsVisible(this.txtTaskName);
            this.txtTaskName.clear();
            this.txtTaskName.sendKeys(taskName)
        }
    },

    /**
     * Provides the text input for the task description
     *
     * @property txtTaskDescription
     * @type protractor.Element
     */
    txtTaskDescription: {
        get: function () {
            return element(by.id("add-comment-input"));
        }
    },

    /**
     * Fills in the task description
     *
     * @param taskDescription
     * @method fillTaskDescription
     */
    fillTaskDescription: {
        value: function (taskDescription) {
            Util.waitUntilElementIsVisible(this.txtTaskDescription);
            this.txtTaskDescription.clear();
            this.txtTaskDescription.sendKeys(taskDescription);
        }
    },

    /**
     * Provides the create button inside the new task popup
     *
     * @property btnCreate
     * @type protractor.Element
     */
    btnCreate: {
        get: function () {
            return element(by.css("button[ng-click='confirmTaskCreation();']"));
        }
    },

    /**
     * Clicks the create button inside the new task popup
     *
     * @method clickCreate
     */
    clickCreate: {
        value: function () {
            Util.waitUntilElementIsVisible(this.btnCreate);
            this.btnCreate.click();
        }
    },

    /**
     * Creates a new task give a task name and description.
     *
     * @param taskName {String}
     * @param taskDescription {String}
     * @method createNewTask
     */
    createNewTask: {
        value: function (taskName, taskDescription) {
            this.clickCreateTask();
            this.fillTaskName(taskName);
            this.fillTaskDescription(taskDescription);
            this.clickCreate();
        }
    },

    /**
     * Provides the complete button for a standalone task.
     *
     * @property btnComplete
     * @type protractor.Element
     */
    btnComplete: {
        get: function () {
            return element(by.css('button[ng-click="completeTask()"]'));
        }
    },

    /**
     * Clicks the complete button for a task.
     * @method clickComplete
     */
    clickComplete: {
        value: function () {
            Util.waitUntilElementIsVisible(this.btnComplete);
            this.btnComplete.click();
        }
    },

    /**
     * Provides the outcome button
     *
     * @param buttonText {String}
     * @method btnOutcome
     */
    btnOutcome: {
        value: function (buttonText) {
            return element(by.xpath('.//div[@id="formsection"]//button[text()="' + buttonText + '"]'));
        }
    },

    /**
     * Clicks a form outcome button based on it's text
     *
     * @param buttonText {String}
     * @method clickOutcomeButton
     */
    clickOutcomeButton: {
        value: function (buttonText) {
            Util.waitUntilElementIsVisible(this.btnOutcome(buttonText));
            Util.waitUntilElementIsClickable(this.btnOutcome(buttonText));
            var outcome = this.btnOutcome(buttonText).getWebElement();

            browser.actions().
            mouseMove(outcome).
            mouseDown(outcome).
            mouseUp(outcome).
            perform();
            //outcome.click();
        }
    },

    /**
     * Provides access on the callback to the task name.
     * @method getTaskName
     * @param callback {Function} Provides access to current task name.
     */
    getTaskName: {
        value: function (callback) {
            var taskNameElement = element(by.xpath("//div[contains(@class,'column-full-height')]/div[contains(@class,'column-full-height')]/div[contains(@class,'column-header-large')]/h2/*"));
            Util.waitUntilElementIsVisible(taskNameElement);
            taskNameElement.getText().then(function (text) {
                callback(text);
            });
        }
    },
    
    //TODO Delete element, since it is moved to taskDetailsPage
    /**
     * empty content text
     * @property empty_content_element
     * @type protractor.Element
     */
    empty_content_element: {
        get: function () {
            return element(by.css('div[class="help-text ng-scope'))
        }
    },

    //TODO Delete function, since it is moved to taskDetailsPage
    /**
     * Opens the people selector whether or not the task has added content or not.
     *
     * @method openPeopleSelector
     */
    openPeopleSelector: {
        value: function () {
            this.empty_content_element.isPresent().then(function (isPresent) {
                if (isPresent) {
                    // workaround for invisible element that otherwise gets clicked by default
                    $$('span[on-people-selected="involvePerson(user)"]').get(1).click();
                }
                else {
                    element(by.css('h3[on-people-selected="involvePerson(user)"]')).click();
                }
            });
        }
    },

    //TODO Delete element, since it is moved to taskDetailsPage
    /**
     * Provides the people select input inside the pop-up.
     *
     * @property peopleSelect
     * @type protractor.Element
     */
    peopleSelect: {
        get: function () {
            return element(by.id("people-select-input"));
        }
    },

    //TODO Delete function, since it is moved to taskDetailsPage
    /**
     * Involves a person in the task.
     *
     * @param personName
     * @method involvePerson
     */
    involvePerson: {
        value: function (personName) {
            this.openPeopleSelector();
            this.peopleSelect.sendKeys(personName);
            this.peopleSelect.sendKeys(protractor.Key.DOWN);
            this.peopleSelect.sendKeys(protractor.Key.ENTER, protractor.Key.ESCAPE);
        }
    },

    /**
     * Opens the comment input whether or not content has been added before.
     *
     * @method openCommentInput
     */
    openCommentInput: {
        value: function () {
            // bizarrely, ":last-child" doesn't return results if only one child is found, hence resorting to jQuery
            //element(by.css('[ng-click*="toggleCreateComment()"]:last-child')).click();
            //list = element.all(by.css('[ng-click*="toggleCreateComment()"]'));

            this.empty_content_element.isPresent().then(function (isPresent) {
                if (isPresent) {
                    element(by.css("div[ng-click='toggleCreateComment()']:last-child")).click();
                }
                else {
                    element(by.css("h3[ng-click='toggleCreateComment()']")).click();
                }
            });
        }
    },

    /**
     * Adds a comment to the task
     *
     * @param comment {String}
     * @method addComment
     */
    addComment: {
        value: function (comment) {
            this.openCommentInput();
            var commentInput;
            var commentAddButton;

            this.empty_content_element.isPresent().then(function (isPresent) {
                if (isPresent) {

                    commentInput = element.all(by.model('model.commentSummary.newComment')).get(1);
                    commentAddButton = element.all(by.buttonText('Add comment')).get(1);
                }
                else {

                    commentInput = element.all(by.model('model.commentSummary.newComment')).get(0);
                    commentAddButton = element.all(by.buttonText('Add comment')).get(0);
                }
                commentInput.sendKeys(comment);
                commentAddButton.click();
            });
        }
    },

    //TODO Delete function, since it is moved to taskDetailsPage
    /**
     * Checks to see whether or not an involved person is displayed within the task.
     *
     * @param {String} personFullName
     * @return {Boolean}
     * @method isInvolvedPersonDisplayed
     */
    isInvolvedPersonDisplayed: {
        value: function (personFullName) {
            Util.waitUntilElementIsVisible(element(by.xpath("//h3[@on-people-selected='involvePerson(user)']")));
            return element(by.xpath("//li[@ng-repeat='person in model.task.involvedPeople']//span[@user-name='person' and contains(text(), '" + personFullName + "')]"))
                .isPresent();
        }
    },

    /**
     * Checks to see whether or not an uploaded file is displayed within the task.
     *
     * @param {String} fileName
     * @return {Boolean}
     * @method isUploadedFileDisplayed
     */
    isUploadedFileDisplayed: {
        value: function (fileName) {
            return element(by.css('ul[id="related-content-list"]>li[title="' + fileName + '"]')).isPresent();
        }
    },

    /**
     * Checks to see whether or not an added comment is displayed within the task.
     *
     * @param {String} comment
     * @return {Boolean}
     * @method isAddedCommentDisplayed
     */
    isAddedCommentDisplayed: {
        value: function (comment) {
            return element(by.cssContainingText('ul>li[ng-repeat="comment in model.comments.data"]>div[class="message ng-binding"]', comment)).isPresent();
        }
    },

    /**
     * Removes an involved person.
     *
     * @param {String} personFullName
     * @method removeInvolvedPerson
     */
    removeInvolvedPerson: {
        value: function (personFullName) {
            var person = element(by.cssContainingText('div>div>ul>li>span[user-name="person"]', personFullName));
            person.click();
            var delete_button = person.element(by.xpath('../div/a/i[@ng-click="removeInvolvedUser(person)"]'));
            delete_button.click();
        }
    },

    /**
     * Provides the assignee element
     *
     * @property txtAssignee
     * @type protractor.Element
     */
    txtAssignee: {
        get: function () {
            return element(by.css('span[user-name="model.task.assignee"]'));
        }
    },

    /**
     * On the callback this provides the current task assignee.
     * @param callback {Function} Provides access to the current task assignee.
     * @method getCurrentAssignee
     */
    getCurrentAssignee: {
        value: function (callback) {
            return this.txtAssignee.getText().then(function (text) {
                callback(text);
            });
        }
    },

    /**
     * Opens the assignee people select
     *
     * @method openAssigneeSelect
     */
    openAssigneeSelect: {
        value: function () {
            Util.waitUntilElementIsVisible(this.txtAssignee);
            this.txtAssignee.click();
        }
    },

    /**
     * Changes the assignee of the task
     *
     * @param newAssigneeFullName
     * @method changeAssignee
     */
    changeAssignee: {
        value: function (newAssigneeFullName) {
            this.openAssigneeSelect();
            var assigneeSelector = element(by.id('people-select-input'));
            assigneeSelector.sendKeys(newAssigneeFullName);
            assigneeSelector.sendKeys(protractor.Key.DOWN);
            assigneeSelector.sendKeys(protractor.Key.ENTER);
        }
    },

    /**
     * Clicks the filter button
     *
     * @method clickFilterButton
     */
    clickFilterButton: {
        value: function () {
            browser.executeScript('window.scrollTo(0,10000);');
            element(by.id('list-header')).click();
        }
    },

    /**
     * Clicks the completed filter button once the popup is opened
     *
     * @method clickCompletedFilterButton
     */
    clickCompletedFilterButton: {
        value: function () {
            element(by.css("div[id='main-list'] div[class='selection toggle']>div:nth-child(2)")).click();
        }
    },

    /**
     * Attach file to the task.
     *
     * @param fileLocation
     * @method attachFile
     */
    attachFile: {
        value: function (fileLocation) {
            var divXpath;
            this.empty_content_element.isPresent().then(function (isPresent) {
                var fileUploadChooseButton, fileUploadInput;
                if (isPresent) {
                    divXpath = "//div[@class='help-text ng-scope']";
                    element(by.css('div[ng-click="toggleCreateContent()"]:last-child')).click();
                }
                else {
                    divXpath = "//div[@class='section pack']";
                    element(by.css('h3[ng-click="checkTaskStatusAndToggleCreateContent()"]')).click();
                }
                fileUploadChooseButton = element(by.xpath(divXpath + "//div[@class='select-file ng-binding ng-scope']//button"));
                fileUploadInput = element(by.xpath(divXpath + "//div[contains(@class,'selection ng-scope')]//input[@type='file']"));
                if (browser.browserName == "firefox") {
                    element(by.xpath("//div[@class='dropzone selection ng-scope']")).isPresent().then(function (present) {
                        var divElem = element(by.xpath(divXpath + "//div[@class='dropzone selection ng-scope' and @ng-if='!folderSelect']"));
                        browser.executeScript("$(arguments[0]).removeClass('dropzone')", divElem.getWebElement());
                    });
                }
                Util.uploadFile(fileUploadChooseButton, fileUploadInput, fileLocation);
            });
        }
    },

    /**
     * Returns form tab
     *
     * @param tabName
     * @method tab
     */

    tab: {
        value: function (tabName) {
            return element(by.cssContainingText('ul[class~=tabs]>li[ng-show="tab.isVisible"]>a', tabName));
        }
    },

    /**
     * Clicks form tab
     *
     * @param tabName
     * @method clickTab
     */
    clickTab: {
        value: function (tabName) {
            Util.waitUntilElementIsVisible(this.tab(tabName));
            this.tab(tabName).click();
        }
    },

    /**
     * Returns header form field by name
     *
     * @param headerName
     * @method headerField
     */
    headerField: {
        value: function (headerName) {
            return element(by.cssContainingText('div[class~="form-group"]>h3', headerName));
        }
    },

    /**
     * Clicks on No checklist
     *
     * @method clickNoChecklist
     */
    clickNoChecklist: {
        value: function () {
            var elemXpath = "//div[@class='summary-header']//div[@class='title title-lg ng-binding' and contains(@ng-show,'model.checklistSummary.count')]";

            Util.waitUntilElementIsVisible(element(by.xpath(elemXpath)));
            element(by.xpath(elemXpath)).click();
        }
    },

    /**
     * Add task to checklist
     *
     * @method addTaskToChecklist
     */
    addTaskToChecklist: {
        value: function () {
            var elemXpath = "//div[@ng-click='toggleCreateChecklistTask()']/span[text()='Add a task to checklist']";

            Util.waitUntilElementIsVisible(element(by.xpath(elemXpath)));
            element(by.xpath(elemXpath)).click();
        }
    },

    /**
     * Create checklist task
     *
     * @param taskName {String}
     * @method createChecklistTask
     */
    createChecklistTask: {
        value: function (taskName) {
            var checkListSummary = "//div[@class='help-text ng-scope']//div[@ng-show='model.checklistSummary.addTask']";
            var input = checkListSummary + "//input";
            var confirm = checkListSummary + "//button[@ng-click='confirmChecklistNewTask()']";
            element(by.xpath(input)).sendKeys(taskName);
            element(by.xpath(confirm)).click();
        }
    },

    /**
     * Create checklist task
     *
     * @param taskName {String}
     * @method openChecklistTask
     */
    openChecklistTask: {
        value: function (taskName) {
            var task = "//li[@ng-repeat='subtask in model.checklist.data']//div[contains(text(),'" + taskName + "')]";

            Util.waitUntilElementIsVisible(element(by.xpath(task)));
            element(by.xpath(task)).click();
        }
    },

    /**
     * Create checklist task
     *
     * @param taskName {String}
     * @method openParent
     */
    openParent: {
        value: function (taskName) {
            var parentTask = "//span[@ng-if='model.task.parentTaskId']/a[text()='" + taskName + "']";

            Util.waitUntilElementIsVisible(element(by.xpath(parentTask)));
            element(by.xpath(parentTask)).click();
        }
    },

    /**
     * Open filters in the left menu
     *
     * @param filterName {String}
     * @method openTaskFilters
     */
    openTaskFilters: {
        value: function (filterName) {
            var locator = "//li[@ng-repeat='filter in model.filters']/div[text()='" + filterName + "']";

            Util.waitUntilElementIsVisible(element(by.xpath(locator)));
            element(by.xpath(locator)).click();
            expect((element(by.xpath(locator + "/preceding-sibling::a"))).isPresent()).toBeTruthy();
        }
    },

    /**
     * Get tasks
     *
     * @param taskName {String}
     * @param index {String}
     * @method getTaskInFilterList
     */
    getTaskInFilterList: {
        value: function (taskName, index) {
            var elem;
            if (index === undefined) {
                elem = element(by.xpath("//li[@ng-repeat='task in model.tasks']//div[contains(@class,'title') and contains(text(),'" + taskName + "')]"));
            }
            else {
                elem = element(by.xpath("(//li[@ng-repeat='task in model.tasks']//div[contains(@class,'title') and contains(text(),'" + taskName + "')])[" + index + "]"));
            }
            return elem;
        }
    },

    /**
     * Get tasks
     *
     * @param taskName {String}
     * @param index {String}
     * @method clickTaskInFilterList
     */
    clickTaskInFilterList: {
        value: function (taskName, index) {
            Util.waitUntilElementIsVisible(this.getTaskInFilterList(taskName, index));
            return this.getTaskInFilterList(taskName, index).click();
        }
    },

    /**
     * Get document preview element
     *
     * @property creatingPreview
     * @type protractor.Element
     */
    creatingPreview: {
        get: function () {
            return element(by.xpath("//div[@class='nothing-to-see']//span[contains(@ng-show,'content.contentAvailable') and text()='Creating preview...']"));
        }
    },

    /**
     * Get search input
     *
     * @property searchInput
     * @type protractor.Element
     */
    searchInput: {
        get: function () {
            return element(by.xpath("input[@ng-model='model.filter.edit.filter.name']"));
        }
    },

    /**
     * form link for task
     * @property formLink
     * @type protractor.Element
     */
    formLink: {
        get:function(){
            return element(by.css('a[ng-click="showSelectForm()"]'));
        }
    },

    /**
     * open dialog to see form list
     * @method clickFormLink
     */
    clickFormLink:{
        value:function(){
            Util.waitUntilElementIsVisible(this.formLink);
            return this.formLink.click();
        }
    },

    /**
     * Provides access on the callback to the form name.
     * @method getFormNameAttachedToTask
     * @param callback {Function} Provides access to current form name.
     */
    getFormNameAttachedToTask:{
        value :function(callback){
            Util.waitUntilElementIsVisible(this.formLink);
            return this.formLink.getText().then(function(text){
                callback(text);
            });
        }
    },


    /**
     * Provides QueuedFilter locator
     * @method queuedFilterButton
     * @type protractor.Element
     */
    queuedFilterButton: {
        get: function () {
            return element.all(by.repeater('filter in model.filters'));
        }
    },

    /**
     * Clicks Completed filter link
     */
    clickCompletedFilterButton:{
        value:function(){
            this.queuedFilterButton.get(3).click();
        }
    },

    /**
     * Clicks Queued filter link
     * @method clickQueuedFilterButton
     */
    clickQueuedFilterButton:{
        value:function(){
            this.queuedFilterButton.get(2).click();
        }
    },

    /**
     * Provides involved people locator
     * @method involvedPeopleLocatorInQueuedTasks
     * @type protractor.Element
     */
    involvedPeopleLocatorInQueuedTasks:{
        get:function(){
            return element(by.repeater('person in model.task.involvedPeople'));
        }
    },

    /**
     * Provides access on the callback to the involved people name for queued tasks.
     * @method getInvolvedPeopleInQueuedTasks
     * @param callback
     */
    getInvolvedPeopleInQueuedTasks:{
        value:function(callback){
            Util.waitUntilElementIsVisible(this.involvedPeopleLocatorInQueuedTasks);
            return this.involvedPeopleLocatorInQueuedTasks.getText().then(function(personName){
                callback(personName)
            });
        }
    },
    uploadedContentLink: {
        get: function () {
            return element(by.repeater('content in group.content'));
        }
    },
    contentViewFrame:{
        get:function(){
            return  element(by.css('div[class="modal-content"]'));
        }
    },

    viewUploadedContent: {
        value: function () {
            Util.waitUntilElementIsVisible(this.uploadedContentLink);
            this.uploadedContentLink.click();
            Util.waitUntilElementIsVisible(this.contentViewFrame);

        }
    },



});
