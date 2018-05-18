<html>
    <body>
        <h3>Install and run the tests</h3>
        <p>There are 2 posibilities to run the tests.</p>
        <p>1. Running from <i>protractor-tests</i> folder root: </p>
        <ol>
            <li>npm install</li>
            <li>grunt deploy</li>
            <li>grunt test:activiti <i>(default browser is Chrome. Add --browserName="BROWSER_NAME" to run on specific browser)</i>
            <li>grunt test:share <i>(default browser is Chrome. Add --browserName="BROWSER_NAME" to run on specific browser)</i>
        </ol>
        <p>2. Running with <i>run-protractor-tests.sh</i>:</p>
        <ol>
            <li>First argument: suite which can be (<i>activiti, share</i>)</li>
            <li>Second argument: browser which can be (<i>chrome, firefox</i>)</li>
        </ol>
        <h3>Build the doc</h3>
            <ul>
                <li>grunt build_doc</li>
            </ul>
        <h3>Important notes:</h3>
        <ol>
            <li>Make sure you have protractor installed. <i>(npm install -g protractor)</i></li>
        </ol>
    </body>
</html>
