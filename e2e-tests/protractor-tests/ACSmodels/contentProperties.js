/**
 * Created by Cristina Jalba on 15/03/2018.
 */

var ContentPropertiesModel = function (details) {
    this['cm:author'] = "";
    this['cm:description'] = "";
    this['cm:title'] = "";

    this.getAuthor = function () {
        return this['cm:author'];
    };

    this.getDescription = function () {
        return this['cm:description'];
    };

    this.getTitle = function () {
        return this['cm:title'];
    };

    Object.assign(this, details);

};
module.exports = ContentPropertiesModel;


