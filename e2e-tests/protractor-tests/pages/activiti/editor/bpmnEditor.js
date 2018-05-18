/*
 * Copyright 2005-2016 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Brindusa Gamaniata on 01/28/2016.
 */

var Page = require("astrolabe").Page;
var TestConfig = require("../../../test.config.js");
var Constants = require("../../../util/constants.js");
var Util = require("../../../util/util.js");

var refFormDialog = require("./components/formRefBPMNProcessDialog.js");
var createNewFormDialog = require("./components/createFormDialog.js");
var attrMappingDialog = require("./components/attrMappBPMNProcessDialog.js");

var refDTDialog = require("./components/dtRefBPMNProcessDialog.js");
var createRefNewDTDialog = require("./components/decision_tables/createRefDTDialog.js");

var editorSection = "//div[@class='ORYX_Editor']//*[contains(@id,'sid')]//*[@class='stencils']";
var canvas = "//div[@id='canvasSection']";
var leftMenu = ".//div[@id='paletteSection']";
var propertiesSection = ".//*[@id='propertySection']";
var editorHeader = ".//*[@id='editor-header']";

/**
 * Provides the BPMN Editor
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.BPMNEditor
 */
module.exports = Page.create({

    /**
     * Get editor header element
     *
     * @property editorHeader
     */
    editorHeader: {
        get: function () {
            return element(by.xpath(editorHeader))
        }
    },

    /**
     * Get guide tour element
     *
     * @property getGuideSection
     */
    getGuideSection: {
        get: function () {
            return element(by.xpath(".//*[@id='step-0']"))
        }
    },

    /**
     * Click next in guide tour
     *
     * @property clickGuideNextButton
     */
    clickGuideNextButton: {
        value: function () {
            var nextBtn = element(by.xpath("//button[@data-role='next']"));

            Util.waitUntilElementIsVisible(nextBtn);
            nextBtn.click();
        }
    },

    /**
     * Click Got it! in guide tour
     *
     * @property clickGuideEndButton
     */
    clickGuideEndButton: {
        value: function () {
            var endBtn = element(by.xpath("//button[@data-role='end']"));

            Util.waitUntilElementIsVisible(endBtn);
            endBtn.click();
        }
    },

    /**
     * View guide tour
     *
     * @property viewGuideTour
     */
    viewGuideTour: {
        value: function () {

            for (i = 0; i < 6; i++) {
                Util.waitUntilElementIsVisible(element(by.xpath(".//*[@id='step-" + i + "']//button[@data-role='next']")));
                this.clickGuideNextButton();
            }
            this.clickGuideEndButton();
        }
    },

    /**
     * Dismiss guide tour
     *
     * @property clickGuideEndButton
     */
    dismissGuideTour: {
        value: function () {
            var guideTourPopover = element(by.xpath(".//*[@id='step-0']"));
            if(guideTourPopover.isDisplayed()) {
                guideTourPopover.click().then(function() {
                    browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
                });
                Util.waitUntilElementIsStale(guideTourPopover);
            }
        }
    },

    /**
     * Clicks Save button from header section
     *
     * @method saveProcess
     */
    saveProcess: {
        value: function () {
            var saveBtn = element(by.xpath(editorHeader + "//div[contains(@class,'pull-left')]//button[1]"));

            Util.waitUntilElementIsVisible(saveBtn);
            saveBtn.click();
        }
    },

    /**
     * Clicks Validate button from header section
     *
     * @method validateProcess
     */
    validateProcess: {
        value: function () {
            var validateBtn = element(by.xpath(editorHeader + "//div[contains(@class,'pull-left')]//button[2]"));

            Util.waitUntilElementIsVisible(validateBtn);
            validateBtn.click();
        }
    },

    /**
     * Colapse step properties
     *
     * @method colapseStepProperties
     */
    colapseStepProperties: {
        value: function () {
            var colapseElem = element(by.xpath("/.//*[@id='propertySection']//a[@ng-click='propertyWindowState.toggle()']"));

            Util.waitUntilElementIsVisible(colapseElem);
            colapseElem.click();
        }
    },

    /**
     * Clicks Close button from header section
     *
     * @method closeProcess
     */
    closeProcess: {
        value: function () {
            var closeBtn = element(by.xpath(editorHeader + "//div[contains(@class,'pull-right')]//button[1]"));

            Util.waitUntilElementIsVisible(closeBtn);
            closeBtn.click();
        }
    },

    /**
     * ClickStep
     *
     * @method clickStep
     * @param stepName {String}
     */
    clickStep: {
        value: function (stepName) {
            Util.waitUntilElementIsVisible(element(by.xpath(leftMenu)));
            var stepElem = element(by.xpath(".//*[text()='" + stepName + "']"));
            Util.waitUntilElementIsVisible(stepElem);
            stepElem.click();
        }
    },

    /**
     * Show step settings
     *
     * @method showStepSettings
     * @param index {int}
     */
    showStepSettings: {
        value: function (index) {
            var settingsBtn = element(by.xpath("(" + editorSection + "//*[contains(@id,'frame')])[" + index + "]"));

            Util.waitUntilElementIsVisible(element(by.xpath(editorSection)));
            Util.waitUntilElementIsVisible(settingsBtn);
            browser.actions().doubleClick(settingsBtn).perform();
        }
    },

    /**
     * Clicks the change step button
     *
     * @method changeStepTypeButton
     */
    changeStepTypeButton: {
        value: function () {
            var changeType = element(by.xpath(".//*[@id='morph-button']/img"));

            Util.waitUntilElementIsVisible(changeType);
            changeType.click()
        }
    },

    /**
     * Changes current step with the selection
     *
     * @param stepType {String}
     * @method selectStepTypeFromList
     */
    selectStepTypeFromList: {
        value: function (stepType) {
            var selectBtn = element(by.xpath("//button[@ng-click='select()']"));
            Util.waitUntilElementIsVisible(selectBtn);
            var selectType = element(by.xpath("//div[@class='modal-dialog']//div[contains(@class,'ui-grid-cell-contents') and text()='" + stepType + "']"));
            Util.waitUntilElementIsVisible(selectType);
            selectType.click();
            selectBtn.click();
        }
    },

    /**
     * Clicks the User task button in quick menu
     *
     * @method userTaskStepButton
     */
    userTaskStepButton: {
        value: function () {
            var userTask = element(by.xpath("//div[@id='canvasHelpWrapper']//*[@id='UserTask']/img"));

            Util.waitUntilElementIsVisible(userTask);
            userTask.click()
        }
    },

    /**
     * Creates the sequence flow
     *
     * @param stepNameTarget {String}
     * @param stepNameDestination {String}
     * @method sequenceFlowAction
     */
    sequenceFlowAction: {
        value: function (stepNameTarget, stepNameDestination) {
            var arrow = element(by.xpath("//div[@id='canvasHelpWrapper']//*[@id='SequenceFlow']/img"));
            var step = element(by.xpath(".//*[contains(@id,'text_name')]//*[text()='" + stepNameDestination + "']/ancestor::*/*[contains(@id,'bg_frame')]"));

            this.clickStep(stepNameTarget);
            browser.actions().mouseDown(arrow)
                .click(step)
                .mouseUp(arrow)
                .perform();
        }
    },

    /**
     * Clicks the End step button in quick menu
     *
     * @method endStepButton
     */
    endStepButton: {
        value: function () {
            var endStep = element(by.xpath("//div[@id='canvasHelpWrapper']//*[@id='EndNoneEvent']/img"));

            Util.waitUntilElementIsVisible(endStep);
            endStep.click()
        }
    },

    /**
     * Clicks the End step button in quick menu
     *
     * @method expandLeftMenu
     */
    expandLeftMenu: {
        value: function (menu) {
            Util.waitUntilElementIsVisible(element(by.xpath(leftMenu)));
            var menuElem = element(by.xpath(leftMenu + "//span[normalize-space(.) = '" + menu + "']"));

            Util.waitUntilElementIsVisible(menuElem);
            menuElem.click();
            // by default ul class is "stencil-group ng-scope collapsed"
            Util.waitUntilElementIsVisible(element(by.xpath(leftMenu + "//span[normalize-space(.) = '" + menu + "']//ancestor::ul[@class='stencil-group ng-scope']")));
        }
    },

    dropElemInCanvas: {
        value: function (draggableElem, toRight, toBottom) {
            var canvasElem = element(by.xpath(canvas));
            console.log("platform: " + process.platform);

            if (process.platform == "darwin" || process.platform == "linux") {
                if (browser.browserName == "firefox") {
                    browser.actions().mouseDown(draggableElem)
                        .mouseMove(canvasElem, {x: toRight, y: toBottom})
                        .click(canvasElem)
                        .mouseUp(draggableElem)
                        .perform();
                } else {
                    browser.actions().mouseDown(draggableElem)
                        .mouseMove(canvasElem, {x: toRight, y: toBottom})
                        .mouseMove(canvasElem)
                        .mouseDown(canvasElem)
                        .mouseUp(draggableElem)
                        .mouseUp(canvasElem)
                        .perform();
                }
            } else {
                browser.actions().mouseDown(draggableElem)
                    .mouseMove(canvasElem, {x: toRight, y: toBottom})
                    .click(canvasElem)
                    .mouseUp(draggableElem)
                    .perform();
            }

        }
    },

    /**
     * Adds a new step. Need to expand corresponding left menu first
     *
     * @param type Type of the step. (See Constants.js)
     * @method addStep
     */
    addStep: {
        value: function (type, x, y) {
            if (x == y && x == undefined) {
                x = 50;
                y = 50;
            }

            switch (type) {
                case Constants.STEP_TYPES.HUMAN:
                    this.dropElemInCanvas(element(by.xpath(leftMenu + "//*[@id='UserTask']")), x, y);
                    break;
                case Constants.STEP_TYPES.END_STEP:
                    this.dropElemInCanvas(element(by.xpath(leftMenu + "//*[@id='EndNoneEvent']")), x, y);
                    break;
                case Constants.STEP_TYPES.EMAIL:
                    this.dropElemInCanvas(element(by.xpath(leftMenu + "//*[@id='MailTask']")), x, y);
                    break;
                case Constants.STEP_TYPES.DECISION_STEP:
                    this.dropElemInCanvas(element(by.xpath(leftMenu + "//*[@id='DecisionTask']")), x, y);
                    break;
                case Constants.STEP_TYPES.CHOICE:
                    this.dropElemInCanvas(element(by.xpath(leftMenu + "//*[@id='ExclusiveGateway']")), x, y);
                    break;
                case Constants.STEP_TYPES.SUBPROCESS:
                    this.dropElemInCanvas(element(by.xpath(leftMenu + "//*[@id='SubProcess']")), x, y);
                    break;
                case Constants.STEP_TYPES.PUBLISH_TO_ALFRESCO:
                    this.dropElemInCanvas(element(by.xpath(leftMenu + "//*[@id='PublishToAlfrescoCloudTask']")), x, y);
                    break;
                case Constants.STEP_TYPES.STORE_ENTITY_TASK:
                    this.dropElemInCanvas(element(by.xpath(leftMenu + "//*[@id='StoreEntityTask']")), x, y);
                    break;
                default:
                    this.dropElemInCanvas(element(by.xpath(leftMenu + "//*[@id='UserTask']")), x, y);
                    break;
            }
            browser.executeScript("window.scrollBy(0,250)", "");
        }
    },

    /**
     * Wait for new step to be visible in editor
     *
     * @param type Type of the step. (See Constants.js)
     * @param index index of step
     * @method waitAddedStep
     */
    waitAddedStep: {
        value: function (type, index) {
            Util.waitUntilElementIsVisible(element(by.xpath("(//*[@class='stencils']//*[contains(@id,'" + type + "')])[" + index + "]")));
        }
    },

    /**
     * Show process errors
     *
     * @method errorsProcess
     */
    errorsProcess: {
        value: function () {
            var errorsElem = element(by.xpath("//*[@id='ROOT-process-definition-validate-button']/img"));

            Util.waitUntilElementIsVisible(errorsElem);
            errorsElem.click();
        }
    },

    /**
     * Show start event step errors
     *
     * @method errorsStartEventStep
     */
    errorsStartEventStep: {
        value: function () {
            var errorStartElem = element(by.xpath("//*[@id='startEvent1-validate-button']/img"));

            Util.waitUntilElementIsVisible(errorStartElem);
            errorStartElem.click();
        }
    },

    waitForProcessProperties: {
        value: function () {
            var propertyField = propertiesSection + "//span[contains(text(),'Process identifier')]/following-sibling::span[@class='value']";
            Util.waitUntilElementIsVisible(element(by.id("propertiesHelpWrapper")));
            Util.waitUntilElementIsVisible(element(by.xpath(propertyField)));
        }
    },

    /**
     * Click step property(bottom section) and get property field
     *
     * @param propertyName
     * @method clickProperty
     */
    clickProperty: {
        value: function (propertyName) {
            var propertyField = propertiesSection + "//span[contains(text(),'" + propertyName + "')]/following-sibling::span[@class='value']";
            Util.waitUntilElementIsVisible(element(by.id("propertiesHelpWrapper")));
            Util.waitUntilElementIsVisible(element(by.xpath(propertyField)));
            element(by.xpath(propertyField)).click();
        }
    },

    /**
     * Click step property(bottom section) and get property field
     *
     * @param propertyTitle
     * @method clickPropertyByTitle
     */
    clickPropertyByTitle: {
        value: function (propertyTitle) {
            var propertyField = element(by.xpath(propertiesSection + "//child::span[contains(@title, '" + propertyTitle + "')]"));
            Util.waitUntilElementIsVisible(propertyField);
            propertyField.click();
        }
    },

    /**
     * Fill in step property(bottom section)
     *
     * @param propertyName
     * @param propertyValue
     * @method fillProperty
     */
    fillProperty: {
        value: function (propertyName, propertyValue) {
            var propertyField = propertiesSection + "//span[contains(text(),'" + propertyName + "')]/following-sibling::span[@class='value']";
            var el = element(by.xpath(propertyField + "//input"));

            Util.waitUntilElementIsVisible(el);
            el.sendKeys(propertyValue);
            el.sendKeys(protractor.Key.chord(protractor.Key.DOWN));
            el.sendKeys(protractor.Key.chord(protractor.Key.ENTER, protractor.Key.ESCAPE));
        }
    },

    /**
     * Provides the form reference dialog
     *
     * @property formRefDialog
     * @type astrolabe.Page
     */
    formRefDialog: {
        get: function () {
            return refFormDialog;
        }
    },

    /**
     * Provides the create new form dialog
     *
     * @attribute createNewFormDialog
     * @type astrolabe.Page
     */
    createNewFormDialog: {
        get: function () {
            return createNewFormDialog;
        }
    },

    /**
     * Creates a new form
     *
     * @param formName
     * @method createNewForm
     */
    createNewForm: {
        value: function (formName) {

            this.createNewFormDialog.fillName(formName);
            this.createNewFormDialog.createForm();
        }
    },

    /**
     * Provides the decision table reference dialog
     *
     * @property dtRefDialog
     * @type astrolabe.Page
     */
    dtRefDialog: {
        get: function () {
            return refDTDialog;
        }
    },

    /**
     * Provides the create new decision table dialog
     *
     * @attribute createNewDTDialog
     * @type astrolabe.Page
     */
    createRefNewDTDialog: {
        get: function () {
            return createRefNewDTDialog;
        }
    },

    /**
     * Creates a new decision table
     *
     * @param dtName
     * @method createNewDT
     */
    createNewDT: {
        value: function (dtName) {

            this.createRefNewDTDialog.fillName(dtName);
            this.createRefNewDTDialog.clickCreateDT();
        }
    },

    /**
     * Provides the attribute mappinf dialog
     *
     * @attribute attrMappingDialog
     * @type astrolabe.Page
     */
    attrMappingDialog: {
        get: function () {
            return attrMappingDialog;
        }
    },

    /*
     * @param message
     */
    waitTopMessage: {
        value: function (message) {
            browser.wait(protractor.until.elementLocated(by.xpath("//div[contains(@class, 'fadein')]/span[text()='" + message + "']")), TestConfig.main.presence_timeout);
        }
    }
});