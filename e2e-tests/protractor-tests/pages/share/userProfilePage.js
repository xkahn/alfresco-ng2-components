/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Hussain Ashraf on 05/1/2017.
 */

var Page = require("astrolabe").Page;
var TestConfig = require("../../test.config.js");
var Util = require("../../util/util.js");
var shareUtil = require("../../util/shareUtil.js");

/**
 * Provides the user profile page.
 * @module pages
 * @submodule share
 * @class pages.share.userProfilePage
 */
module.exports = Page.create({
    /**
     * Indicates this page's url.
     *
     * @property url
     * @type {String}
     * @default TestConfig.main.webContextRoot + '/#/login'
     */
    url: {value: TestConfig.share.webContextRoot + '/page/user/admin/profile'},

    /**
     * Waits untill the page is fully rendered
     * @method render
     */
    render: {
        value: function () {
            shareUtil.waitForPage();
        }
    },

    /**
     * profile button
     * @property editProfileButton
     * @type protractor.Element
     */
    editProfileButton: {
        get: function () {
            return element(by.css("button[id*='edit-button']"))
        }
    },

    /**
     * Clicks the edit profile button
     * @method clickEditProfile
     */
    clickEditProfile: {
        value: function () {
            //var editProfile = element(this.editProfileButton);
            Util.waitUntilElementIsVisible(this.editProfileButton);
            this.editProfileButton.click();
        }
    },

    /**
     * uploads profile image
     * @method uploadProfileImage
     */
    uploadProfileImage: {
        value: function (fileLocation) {
            this.clickUploadProfileImage();
            this.uploadFile(fileLocation);
        }
    },

    /**
     * Clicks the upload profile button
     * @method clickUploadProfileImage
     */
    clickUploadProfileImage: {
        value: function () {
            var upload = element(by.cssContainingText("div[class='photobtn'] > span > span", "Upload"));
            Util.waitUntilElementIsVisible(upload);
            upload.click();
        }
    },

    /**
     * uploads profile image
     * @method uploadFile
     */
    uploadFile: {
        value: function (fileLocation) {
            var dialogUpload = element(by.css("input[class='dnd-file-selection-button']"));
            var uploadMask = element(by.css("div[id*='default-dialog_mask']"));
            var imageUpload = element(by.css("img[class='photoimg'][src*='content/thumbnails/avatar']"));
            Util.waitUntilElementIsVisible(dialogUpload);
            dialogUpload.click();
            Util.uploadFile(dialogUpload, dialogUpload, fileLocation);
            Util.waitUntilElementIsNotDisplayed(uploadMask);
            Util.waitUntilElementIsVisible(imageUpload);
        }
    },

    /**
     * clicks save
     * @method clickSave
     */
    clickSave: {
        value: function () {
            var save = element(by.css("button[id*='save-button']"));
            Util.waitUntilElementIsVisible(save);
            save.click();
            Util.waitUntilElementIsVisible(this.editProfileButton);
        }
    },

});