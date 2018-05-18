/**
 * Created by Jenny Dosti on 08/09/2017.
 */
var Util = require("../../../util/util.js");
var AppNavigationBarPage = require("./appNavigationBarPage.js");

var ProcessServicesPage = function(){

    var apsAppsContainer = element(by.css("div[class='adf-app-listgrid ng-star-inserted']"));
    var processServices = element(by.css("a[data-automation-id='Process Services']"));
    var taskApp = element(by.css("mat-card[title='Task App']"));

    /**
     * Check Process Page Container is displayed
     * @method checkApsContainer
     */
    this.checkApsContainer = function(){
        Util.waitUntilElementIsVisible(apsAppsContainer);
    };

    /**
     * Go to Process Services Page
     * @method goToProcessServices
     * */
    this.goToProcessServices = function() {
        Util.waitUntilElementIsVisible(processServices);
        processServices.click();
        this.checkApsContainer();
        return this;
    };

    /**
     * Go to App
     * @method goToApp
     * */
    this.goToApp = function(applicationName) {
        var app = element(by.css("mat-card[title='" + applicationName +"']"));
        Util.waitUntilElementIsVisible(app);
        app.click();
        return new AppNavigationBarPage();
    };

    /**
     * Go to Task App
     * @method goToTaskApp
     * */
    this.goToTaskApp = function() {
        Util.waitUntilElementIsVisible(taskApp);
        taskApp.click();
        return new AppNavigationBarPage();
    };

};

module.exports = ProcessServicesPage;
