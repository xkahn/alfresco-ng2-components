/**
 * Created by Cristina Jalba on 20/03/2018.
 */

var FormDefinitionFieldModel = require('./FormDefinitionFieldModel.js');

var FormDefinitionModel = function (fields) {

    var fields = null;
    var widgets = null;

    this.setFields = function (arr) {
        fields = arr.map(function(item) {
            return new FormDefinitionFieldModel(item);
        })
    };

    this.setAllWidgets = function (arr) {
        widgets = arr.reduce(function(acc, item) {
            if(item.type === 'container') {
                var children = Object.keys(item.fields).map(function(key) {
                    return item.fields[key][0];
                });

                return acc.concat(children);
            }
            return acc.concat(item);
        }, []);
    };

    this.getWidgets = function () {
        return widgets;
    };

    this.getWidgetBy = function (key, value) {
        return widgets.find(function(widget) {
            return widget[key]===value;
        })
    };

    this.findFieldBy = function(key, value) {
        return fields.find(function(field) {
            return field[key]===value;
        })
    };
}

module.exports = FormDefinitionModel;