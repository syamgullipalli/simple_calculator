/**
 * The intern test runner configuration
 * Copied from node_modules/intern/tests/example.intern.js and configured according to the current project
 */

// Learn more about configuring this file at <https://theintern.github.io/intern/#configuration>.
// These default settings work OK for most people. The options that *must* be changed below are the packages, suites,
// excludeInstrumentation, and (if you want functional tests) functionalSuites
define({
    // Default desired capabilities for all environments. Individual capabilities can be overridden by any of the
    // specified browser environments in the `environments` array below as well. See
    // <https://theintern.github.io/intern/#option-capabilities> for links to the different capabilities options for
    // different services.
    //
    // Note that the `build` capability will be filled in with the current commit ID or build tag from the CI
    // environment automatically
    capabilities: {
        'browserstack.selenium_version': '2.45.0'
    },

    // Browsers to run integration testing against. Options that will be permutated are browserName, version, platform,
    // and platformVersion; any other capabilities options specified for an environment will be copied as-is. Note that
    // browser and platform names, and version number formats, may differ between cloud testing systems.
    environments: [
        { browserName: 'internet explorer', version: '11', platform: 'WIN8' },
        { browserName: 'internet explorer', version: '10', platform: 'WIN8' },
        { browserName: 'internet explorer', version: '9', platform: 'WINDOWS' },
        { browserName: 'firefox', version: '37', platform: [ 'WINDOWS', 'MAC' ] },
        { browserName: 'chrome', version: '39', platform: [ 'WINDOWS', 'MAC' ] },
        { browserName: 'safari', version: '8', platform: 'MAC' }
    ],

    // Maximum number of simultaneous integration tests that should be executed on the remote WebDriver service
    maxConcurrency: 2,

    // Name of the tunnel class to use for WebDriver tests.
    // See <https://theintern.github.io/intern/#option-tunnel> for built-in options
    tunnel: 'BrowserStackTunnel',
    /*tunnelOptions:{
      username: 'syamgullipalli1',
        accessKey: 'Fw6p3fYpTqFCeyWFx18x'
    },*/

    // Configuration options for the module loader; any AMD configuration options supported by the AMD loader in use
    // can be used here.
    // If you want to use a different loader than the default loader, see
    // <https://theintern.github.io/intern/#option-useLoader> for more information.
    loaderOptions: {
        // Packages that should be registered with the loader in each testing environment
        packages: [
            {
                name: 'unittest',
                location: 'tests/unit'
            },
            {
                name: 'jquery',     // jquery module
                location: 'node_modules/jquery/dist',
                main: 'jquery'
            },
            {
                name: 'calc',       // application module to test
                location: 'src/app/js/'
            }
        ]
    },

    // Unit test suite(s) to run in each browser
    suites: [
        'tests/unit/hello',
        'tests/unit/pubsub',
        'tests/unit/evaluate',
        'tests/unit/result'
        /* 'myPackage/tests/foo', 'myPackage/tests/bar' */ ],

    // Functional test suite(s) to execute against each browser once unit tests are completed
    functionalSuites: [ /* 'myPackage/tests/functional' */ ],

    //***************************************************************
    //* Comment grep option to test the private (TEST-HOOK) members *
    //***************************************************************
    // Skip tests matching the pattern
    grep: [
        /^(?!private).+/    // skips tests with suit name starting with 'private' (used for testing private members
                            // exposed using test-hook )
    ],

    // A regular expression matching URLs to files that should not be included in code coverage analysis. Set to `true`
    // to completely disable code coverage.
    excludeInstrumentation: /^(?:tests|node_modules)\//,

    // Test reporters 'Pretty' to show the results on console and 'LcovHtml' to generate the html reports and redirect
    // results to tests/reports
    reporters: [{id:'Pretty'},{id:'LcovHtml', directory:'tests/reports'}]
});
