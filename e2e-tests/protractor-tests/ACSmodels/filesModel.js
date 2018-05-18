/**
 * Created by Cristina Jalba on 25/04/2018.
 */

var FileModel = require('./fileModel.js');

var FilesModel = function () {

    var files = null;

    this.setFiles = function (arr) {
        files = arr.map(function(item) {
            return new FileModel(item.entry);
        });
    };

    this.getFiles = function () {
        return files;
    };
};
module.exports = FilesModel;