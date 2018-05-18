## QA Repository for E2E testing of APS and ADF

This repository contains protractor tests for end to end application testing for Alfresco Process Services (powered by Activiti) and Application Development Framework (ADF).

### Setup 

The /protractor-tests/ directory contains a README that explains how to run tests. By default these will run against a hosted environment, as per the test.config.js file. If you wish to run against your local environment then change that file locally but don’t commit that change (e.g. to use a local APS change the host and user credentials under module.exports).

If you have issues with any of the grunt or npm commands on Mac then try putting ‘sudo ‘ in front of the command to run as your user with increased permissions. If you hit issues with versions then you can try updating node and installing packages again:

```sh
$ npm cache clean -f
$ npm install -g n
$ n stable
$ node --version
$ npm install
```

If you don’t have grunt-cli you can install it using sudo npm install -g grunt-cli.

There is also a .md file that specifies how to set up a docker container to run selenium from within the container so that your desktop isn’t overtaken by browser instances. If you hit connection timeout issues and need to run locally then it is recommended to try without the docker container.


### Running

The tests are run as a part of jobs on a build server. This Jenkins job runs all the APS tests:

https://jenkins.alfresco.me/view/Activiti_Test_Suites/job/Activiti_Protractor_Full_Suite/

And this can be used to run an individual test:

https://jenkins.alfresco.me/view/Activiti_Test_Suites/job/activiti_run_SINGLE_protractor_tests/

Note that to run a single test you have to give the job build parameters specifying the name of the JS file to run and which path it is under.

If you run on your local machine using the grunt task then after a successful run a report named aggregateReport.html will be written to the /protractor-tests/ directory.

Some tests rely on specific environment conditions (e.g. being able to connect to an alfresco instance, having permission to run scripts) so they can only be expected to all pass on a properly-configured environment.


## Code analysis with ESLint
ESLint is a JavaScript linting and style checking tool.
It helps identifying and reporting on patterns found in JavaScript code, with the goal of making code more consistent and avoiding bugs.

```sh
// Install eslint globally
$ npm install -g eslint

// Trigger code analysis
cd protractor-tests
$ grunt lint
```

The rules used during the analysis are defined in **.eslintrc.json** configuration file.
At the end of the execution, the results are reported in **eslintReport.html** file, under **protractor-tests** directory.

## Branching Strategy 

``` 
                                                                    Release  o-----------------
                                                                             /
Master   o------------o-------------------o-------------------o-------------o-------------------
                       \                                                   /
                        \                                                 / 
                         \                                               /      
     Development          o--------------------o--------------o----o----o-----------------------
                                                \                 /
                                                 \               /
                      New-test                    o-------------o
```

New feature branch is created from Development. The name convention followed for feature branch is:

```
git branch dev-{developerName}-{JiraIssueId}
```
