/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Lucian Tuca on 05/06/2015.
 */
var Util = require('../../../util/util.js');
var Page = require("astrolabe").Page;
var TestConfig = require("../../../test.config.js");
var Constants = require("../../../util/constants.js");

/**
 * Provides the Step Editor
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.StepEditor
 */
module.exports = Page.create({

    /**
     * Expands the Process start
     *
     * @method expandStep
     */
    expandProcessStart: {
        value: function() {
            Util.waitUntilElementIsVisible(element(by.xpath("//div[contains(@class,'line-marker')]/h4[@ng-click='toggleProcessStartExpanded()']")));
            element(by.xpath("//div[contains(@class,'line-marker')]/h4[@ng-click='toggleProcessStartExpanded()']")).click();
        }
    },

    /**
     * Expands the step specified by index
     *
     * @method expandStep
     * @param index {int}
     */
    expandStep: {
        value: function(index) {
            Util.waitUntilElementIsVisible(element(by.xpath('//div[@ng-repeat="step in steps"][' + index + ']/div/h4')));
            element(by.xpath('//div[@ng-repeat="step in steps"][' + index + ']/div/h4')).click();
        }
    },

    /**
     * Clicks the first add step button
     *
     * @method _clickFirstAddStepButton
     */
    clickFirstAddStepButton: {
        value: function() {
            Util.waitUntilElementIsVisible(element(by.css('.step-placeholder')));
            element(by.css('.step-placeholder')).click();
        }
    },

    /**
     * Clicks the step button for steps added after the start
     *
     * @param index
     * @method clickAddStepButton
     */
    clickAddStepButton: {
        value: function(index) {
            element.all(by.css('div[class="step-placeholder ng-scope"]')).get(index).click()
        }
    },

    /**
     * Adds a new step
     *
     * @param index The index of the plus button that will be clicked to add a step
     * @param type Type of the step. (See Constants.js)
     * @method addStep
     */
    addStep: {
        value: function(index, type) {
            if (index == 1) {
                this.clickFirstAddStepButton();
            }
            else {
                this.clickAddStepButton(index - 1);
            }

            switch (type) {
                case Constants.STEP_TYPES.EMAIL:
                    var stepElem = element(by.xpath('//i[@class=".icon icon-email"]/..'));
                    Util.waitUntilElementIsVisible(stepElem);
                    stepElem.click();
                    break;
                case Constants.STEP_TYPES.CHOICE:
                    var choiceElem = element(by.xpath('//i[@class=".icon icon-choice"]/..'));
                    Util.waitUntilElementIsVisible(choiceElem);
                    choiceElem.click();
                    break;
                case Constants.STEP_TYPES.SUBPROCESS:
                    var subprocessElem = element(by.xpath('//i[@class=".glyphicon-inline glyphicon glyphicon-new-window"]/..'));
                    Util.waitUntilElementIsVisible(subprocessElem);
                    subprocessElem.click();
                    break;
                case Constants.STEP_TYPES.PUBLISH_TO_ALFRESCO:
                    var publishElem = element(by.xpath('//i[@class=".icon icon-content"]/..'));
                    Util.waitUntilElementIsVisible(publishElem);
                    publishElem.click();
                    break;
                default:
                    var defaultElem = element(by.cssContainingText(".step-types li span", type));
                    Util.waitUntilElementIsVisible(defaultElem);
                    defaultElem.click();
                    break;
            }
        }
    },

    /**
     * Show step error specified by step index
     *
     * @method errorsStep
     * @param index {int}
     */
    errorsStep: {
        value: function(index) {
            Util.waitUntilElementIsVisible(element(by.xpath('(//div[@ng-repeat="step in steps"])['+ index +']/div/a[@ng-click="showValidationErrors(step)"]')));
            element(by.xpath('(//div[@ng-repeat="step in steps"])['+ index +']/div/a[@ng-click="showValidationErrors(step)"]')).click();
        }
    }
});