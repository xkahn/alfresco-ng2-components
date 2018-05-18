/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Hussain Ashraf on 25/10/2016.
 */

var Page = require("astrolabe").Page;
var TestConfig = require("../../test.config.js");
var Util = require("../../util/util.js");

/**
 * common
 */
module.exports = Page.create({
    /**
     * Indicates this page's url.
     *
     * @property url
     * @type {String}
     * @default TestConfig.main.webContextRoot + '/#/login'
     */
    url: {value: TestConfig.adf_catalog.url},

    checkGithubLink: {
        value: function (link) {
            Util.waitUntilElementIsVisible(element(by.css("a[class='style-scope github-fork-ribbon'][href='" + link + "']")));
        }
    },

    alfrescoLogo: {
        get: function () {
            return element(by.css("img[alt='Alfresco Logo']"));
        }
    },

    checkAlfrescoLogo: {
        value: function () {
            Util.waitUntilElementIsVisible(this.alfrescoLogo);
        }
    },

    clickAlfrescoLogo: {
        value: function () {
            this.checkAlfrescoLogo();
            this.alfrescoLogo.click();
            this.checkAlfrescoLogo();
        }
    },

    checkAlfrescoHeader: {
        value: function () {
            Util.waitUntilElementIsVisible(element(by.cssContainingText("a[href*='devproducts.alfresco.com'] > h1", 'Alfresco Catalog')));
        }
    },

    checkAlfrescoFlowerIsDisplayed: {
        value: function () {
            Util.waitUntilElementIsVisible(element(by.css("div[id='central-flower']")));
            Util.waitUntilElementIsVisible(element(by.css("div[id='petal1'")));
            Util.waitUntilElementIsVisible(element(by.css("div[id='petal2'")));
            Util.waitUntilElementIsVisible(element(by.css("div[id='petal3'")));
            Util.waitUntilElementIsVisible(element(by.css("div[id='petal4'")));
            Util.waitUntilElementIsVisible(element(by.css("div[id='petal5'")));
            Util.waitUntilElementIsVisible(element(by.css("div[id='petal6'")));
            Util.waitUntilElementIsVisible(element(by.css("div[id='petal7'")));
            Util.waitUntilElementIsVisible(element(by.css("div[id='petal8'")));
        }
    },

    checkAllComponentsLinkIsDisplayed: {
        value: function () {
            Util.waitUntilElementIsVisible(element(by.cssContainingText("span[class='title flex style-scope page-browse']", 'All Components')));
        }
    },

    search: {
        get: function () {
            return element(by.css("input[id='query']"));
        }
    },


    checkSearchIsDisplayed: {
        value: function () {
            Util.waitUntilElementIsVisible(this.search);
        }
    },

    performSearch: {
        value: function (searchText) {
            this.checkSearchIsDisplayed();
            this.search.clear();
            this.search.sendKeys(searchText);
        }
    },

    clickSearchResult: {
        value: function (searchText) {
            Util.waitUntilElementIsVisible(element(by.cssContainingText("span[class='descriptiveName flex style-scope page-browse']", searchText)));
            element(by.cssContainingText("span[class='descriptiveName flex style-scope page-browse']", searchText)).click();
            Util.waitUntilElementIsVisible(element(by.cssContainingText("div[id*='paper-toolbar-label']", searchText)));
        }
    },

    checkBadgesForJavascriptApi: {
        value: function () {
            Util.waitUntilElementIsVisible(element(by.css("a[title='Gitter chat']")));
            Util.waitUntilElementIsVisible(element(by.css("a[title='Build Status']")));
            Util.waitUntilElementIsVisible(element(by.css("img[alt='Coverage Status']")));
            Util.waitUntilElementIsVisible(element(by.css("img[alt='license']")));
        }
    },

    checkBadgesForAppGenerator: {
        value: function () {
            Util.waitUntilElementIsVisible(element(by.css("img[alt='npm version']")));
            Util.waitUntilElementIsVisible(element(by.css("a[title='Build Status']")));
            Util.waitUntilElementIsVisible(element(by.css("img[alt='Coverage Status']")));
            Util.waitUntilElementIsVisible(element(by.css("a[alt='downloads stats']")));
        }
    },

    checkBadgesForComponentGenerator: {
        value: function () {
            Util.waitUntilElementIsVisible(element(by.css("a[title='Build Status']")));
            Util.waitUntilElementIsVisible(element(by.css("img[alt='Coverage Status']")));
            Util.waitUntilElementIsVisible(element(by.css("img[alt='license']")));
            Util.waitUntilElementIsVisible(element(by.css("a[alt='downloads stats']")));
            Util.waitUntilElementIsVisible(element(by.css("img[alt='npm version']")));
            Util.waitUntilElementIsVisible(element(by.css("img[alt='yeoman logo']")));

        }
    },

    checkBadgesForAlfrescoCore: {
        value: function () {
            Util.waitUntilElementIsVisible(element(by.css("a[title='Build Status Travis']")));
            Util.waitUntilElementIsVisible(element(by.css("a[title='Build Status AppVeyor']")));
            Util.waitUntilElementIsVisible(element(by.css("img[alt='Coverage Status']")));
            Util.waitUntilElementIsVisible(element(by.css("img[alt='npm downloads']")));
        }
    },

    checkBadgesForComponent: {
    value: function () {
        Util.waitUntilElementIsVisible(element(by.css("a[title='Build Status Travis']")));
        Util.waitUntilElementIsVisible(element(by.css("a[title='Build Status AppVeyor']")));
        Util.waitUntilElementIsVisible(element(by.css("img[alt='Coverage Status']")));
        Util.waitUntilElementIsVisible(element(by.css("img[alt='npm downloads']")));
        Util.waitUntilElementIsVisible(element(by.css("img[alt='license']")));
        Util.waitUntilElementIsVisible(element(by.css("img[alt='alfresco component']")));
        Util.waitUntilElementIsVisible(element(by.css("img[alt='angular 2']")));
        Util.waitUntilElementIsVisible(element(by.css("img[alt='typescript']")));
        Util.waitUntilElementIsVisible(element(by.css("img[alt='node version']")));
        }
    },

    checkDocumentationLink: {
        value: function (component) {
            Util.waitUntilElementIsVisible(element(by.css("a[id='app-link-1']")));
            Util.waitUntilElementIsVisible(element(by.css("a[id='app-link-1'][href*='/components/" + component + "']")));
        }
    },

    checkSourceCodeLink: {
        value: function (component) {
            Util.waitUntilElementIsVisible(element(by.css("a[id='app-link-3']")));
            Util.waitUntilElementIsVisible(element(by.css("a[id='app-link-3'][href='" + component + "'")));
        }
    },

    checkNpmCommand: {
        value: function () {
            Util.waitUntilElementIsVisible(element(by.css("input[title='Npm Command']")));
        }
    },

    clickBackArrow: {
        value: function () {
            Util.waitUntilElementIsVisible(element(by.css("paper-icon-button[icon='arrow-back']")));
            element(by.css("paper-icon-button[icon='arrow-back']")).click();
            this.checkAllComponentsLinkIsDisplayed();
        }
    },
});