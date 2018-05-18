/*
 * Copyright 2005-2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Lucian Tuca on 04/02/2015.
 */

/*
 * Updated bt Sohel Saiyed on 10/10/2017
 */

var TestConfig = require("../../../test.config.js");
Util = require('../../../util/util.js');
var navbar = require("../components/navbar.js");
var createProcessDialog = require("./components/createProcessDialog.js");

var ProcessesPage = function () {


    var url = TestConfig.main.webContextRoot + '/editor/#/processes';

    var btnCreateProcess = element(by.css("div[class='fixed-container']>div>button[ng-click='createProcess()']"));
    var stepEditorPage = element(by.xpath('//div[@ng-controller="KickstartReadOnlyModelDesignController"]'));
    var btnImportProcess = element(by.css("div[class='fixed-container']>div>button[ng-click='importProcess()']"));
    var processesRepeater = element.all(by.repeater('process in model.processes.data track by $index'));


    this.go = function () {
        browser.get(url);
        browser.waitForAngular();
    };
    /**
     * Provides the top navigation bar.
     * @property navbar
     */
    this.navbar = function () {
        return navbar;
    };

    /**
     * Provides the create process dialog
     */
    this.createProcessDialog = function () {
        return createProcessDialog;
    };

    /**
     * Provides the create process dialog
     */
    this.createProcessDialog = function () {
        return createProcessDialog;
    };
    /**
     * Clicks the create process button
     *
     * @method clickCreateProcess
     */
    this.clickCreateProcess = function () {
        btnCreateProcess.click();
    };

    /**
     * Click visual editor button by process index
     *
     * @param index
     * @method clickVisualEditorButtonByIndex
     */
    this.clickVisualEditorButtonByIndex = function (index) {
        var visualEditorBtn = element(by.xpath("(.//*[@id='editButton'])[" + index + "]"));
        visualEditorBtn.click();
    };

    /**
     * Click visual editor button by process name
     *
     * @param processName
     * @method clickFormEditorButtonByName
     */
    this.clickVisualEditorButtonByName = function (processName) {
        var visualEditorBtn = element(by.xpath(".//*[@title='" + processName + "']//parent::div//preceding-sibling::div//child::button[@id='editButton']"));

        browser.actions()
            .mouseMove(element(by.xpath("//h3[contains(text(),'" + processName + "')]"))).perform();
        Util.waitUntilElementIsVisible(visualEditorBtn);

        visualEditorBtn.click();
    };

    /**
     * Clicks the import process button
     *
     * @method clickImportProcessButton
     */
    this.clickImportProcess = function () {
        btnImportProcess.click();
    };

    /**
     * Opens the process specified by index
     *
     * @param index
     * @method openProcessByIndex
     */
    this.openProcessByIndex = function (index) {
        this.isMyProcessListPageLoaded();
        var indexProcess = element(by.xpath('//div[@id="main"]//div[@ng-repeat="process in model.processes.data track by $index"][' + index + ']/div'));
        Util.waitUntilElementIsVisible(indexProcess);
        indexProcess.click();
        this.isStepEditorProcessPageLoaded();
    };
    /**
     * Opens the process specified by name
     *
     * @param name
     * @method openProcessByName
     */
    this.openProcessByName = function (name) {
        this.isMyProcessListPageLoaded();
        var process = element(by.css("div[class='details'] > h3[title='" + name + "']"));
        Util.waitUntilElementIsVisible(process);
        process.click();
    };

    /**
     * Opens the process visual editor, process is specified by name
     *
     * @param name
     * @method openProcessByName
     */
    this.openProcessVisualEditorByName = function (name) {
        this.isMyProcessListPageLoaded();
        var process = element(by.css("div[class='details'] > h3[title='" + name + "']"));
        Util.waitUntilElementIsVisible(process);
        process.click();
    };

    /**
     * Creates a new process with the given name and editor
     * @param name
     * @param editor
     * @method createNewProcess
     */
    this.createNewProcess = function (name, editor) {
        this.clickCreateProcess();
        createProcessDialog.fillName(name);
        createProcessDialog.selectEditorType(editor);
        createProcessDialog.clickOk();
    };

    this.isMyProcessListPageLoaded = function () {
        var itemProcessList = element(by.id("list-items"));
        Util.waitUntilElementIsVisible(itemProcessList);
    };

    this.isStepEditorProcessPageLoaded = function () {

        Util.waitUntilElementIsVisible(stepEditorPage);
    };

    this.sideFilterLocator = function (filterName) {
        return element(by.cssContainingText('.ng-binding', filterName));
    };

    this.clickSideFilterByName = function (filterName) {
        Util.waitUntilElementIsVisible(this.sideFilterLocator(filterName));
        this.sideFilterLocator(filterName).click();
    };

    this.getProcessByName = function (name) {
        Util.waitUntilElementIsVisible(element(by.css("div[class='details'] > h3[title='" + name + "']")));
        return element(by.css("div[class='details'] > h3[title='" + name + "']"));

    };
    this.getNumberOfProcesses = function () {
        return processesRepeater.count();
    }
};


module.exports = ProcessesPage;
