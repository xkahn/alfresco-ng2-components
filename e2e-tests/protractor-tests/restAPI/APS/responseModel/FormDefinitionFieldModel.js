/**
 * Created by Cristina Jalba on 20/03/2018.
 */

var FormDefinitionFieldModel = function (details) {

    this.fieldType;
    this.id;
    this.name;
    this.value;
    this.type;
    this.required;
    this.readOnly;
    this.overrideId;
    this.colspan;
    this.placeholder;
    this.minLength;
    this.maxLength;
    this.minValue;
    this.maxValue;
    this.regexPattern;
    this.optionType;
    this.hasEmptyValue;
    this.options;
    this.restUrl;
    this.restResponsePath;
    this.restIdProperty;
    this.setRestLabelProperty;
    this.tab;
    this.className;
    this.dateDisplayFormat;
    this.layout = {};
    this.sizeX;
    this.sizeY;
    this.row;
    this.col;
    this.columnDefinitions;
    this.visibilityCondition;
    this.numberOfColumns;
    this.fields = {};

    Object.assign(this, details);
};
module.exports = FormDefinitionFieldModel;

