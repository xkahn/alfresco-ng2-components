const fs = require('fs');
const common = 'node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/common.js';

fs.readFile(common, 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    var result = data.replace(/compress: {/g, 'compress: { collapse_vars: false,');

    fs.writeFile(common, result, 'utf8', function (err) {
        if (err) return console.log(err);
    });
});
