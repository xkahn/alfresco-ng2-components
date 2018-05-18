/*
 * Copyright 2005-2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Roxana Diacenco on: Tue Sep 26 2017
 */

var TenantMenu = function () {
    var menus = element.all(by.css("[ng-click*='model.currentTab']"));

    this.openMenu = function (menuItemName) {
        menus.filter(function (menu) {
            return menu.getText().then(function (text) {
                return text === menuItemName;
            });
        }).first().click();
    };
};

module.exports = TenantMenu;