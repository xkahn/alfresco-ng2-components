/*
 * Copyright 2005-2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Roxana Diacenco
 *
 * Created on: Mon Aug 14 2017
 */

var Util = require('../../../../util/util.js');

/**
 * Form Javascript page
 *
 */
var FormEditorJavascriptPage = function () {
    var addJSEventButton = element(by.css('[ng-click="addNewJavascriptEvent()"]'));
    var eventField = element(by.id('eventField'));
    var textField = element(by.xpath(".//textarea[@class = 'ace_text-input']"));

    /**
     * Add a new javascript event
     */
    this.addJSEvent = function () {
        Util.waitUntilElementIsVisible(addJSEventButton);
        addJSEventButton.click();
    };

    /**
     * Select javascript event type
     */
    this.selectEventType = function (eventType) {
        Util.waitUntilElementIsVisible(eventField);
        eventField.element(by.cssContainingText('option', eventType)).click();
    };


    /**
     * Set Javascript function
     */
    this.setJSFunction = function(sourceCode) {
        Util.waitUntilElementIsVisible(textField);
        textField.sendKeys(sourceCode);

    };
};

module.exports = FormEditorJavascriptPage;