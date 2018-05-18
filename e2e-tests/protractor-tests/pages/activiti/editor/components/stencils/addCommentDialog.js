/*
 * Copyright 2005-2016 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Brindusa Gamaniata on 07/01/2016.
 */

var Page = require("astrolabe").Page;
var commentDialog = "//div[@ng-controller='StencilSetAddCommentPopupCrtl']";

/**
 * Provides the add comment dialog
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.components.addCommentDialog
 */
module.exports = Page.create({
    /**
     * Fills in the comment
     *
     * @param description
     * @method fillDescription
     */
    fillComment: {
        value: function(comment) {
            var commStencil = element(by.xpath(commentDialog + '//textarea[@ng-model="popup.message"]'));

            Util.waitUntilElementIsVisible(commStencil);
            commStencil.sendKeys(comment);
            Util.waitUntilElementHasValue(commStencil, comment);
        }
    },

    /**
     * Clicks the Add Comment button
     *
     * @method addComment
     */
    addComment: {
        value: function() {
            var addBtn = element(by.xpath(commentDialog + '//button[@ng-click="ok()"]'));

            Util.waitUntilElementIsVisible(addBtn);
            addBtn.click();
        }
    },

    /**
     * Clicks the Add Comment button
     *
     * @method addComment
     */
    checkComment: {
        value: function(comment) {
            return element(by.cssContainingText("p[class='ng-binding']", comment));
        }
    }
});