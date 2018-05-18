/**
 * Created by Cristina Jalba on 15/03/2018.
 */

var ContentModel = function (details) {

    this.mimeType = "";
    this.mimeTypeName = "";
    this.sizeInBytes = "";
    this.encoding = "";

    this.getMimeType = function () {
        return this.mimeType;
    };

    this.getMimeTypeName = function () {
        return this.mimeTypeName;
    };

    this.getSizeInBytes = function () {
        if (this.sizeInBytes>=1024)
        {
            var bytes=(this.sizeInBytes/1024).toFixed(2)+' KB';
            return bytes;
        }
        else {
            return this.sizeInBytes;
        }
    };

    this.getEncoding = function () {
        return this.encoding;
    };

    Object.assign(this, details);

};
module.exports = ContentModel;

