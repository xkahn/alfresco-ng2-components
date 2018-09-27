var Authentication = require('./login');
var AlfrescoUserCreation = require('./userCreation');
var nconf = require('nconf');
var colors = require('colors/safe');
var program = require('commander');

nconf.add('config', {type: 'file', file: './config.json'});

var users = process.env.USERS || nconf.get('users');

async function main() {

    program
        .version('0.1.0')
        .option('-p, --password [type]', 'password')
        .option('-u, --username  [type]', 'username')
        .option('-host, --host [type]', 'URL of the CS')
        .parse(process.argv);

    this.authentication = new Authentication(program.host, 'ALL');

    this.authentication.login(program.username, program.password).then(() => {

        this.alfrescoUserCreation = new AlfrescoUserCreation(users, this.authentication.getJSapiInstance());
        this.alfrescoUserCreation.createUserContentService();
        this.alfrescoUserCreation.createUserProcessService();

    }, (error) => {
        console.log(colors.red('CS-LOG: Error into: ' + JSON.stringify(error)));
        reject(error);
    });

}

main();
