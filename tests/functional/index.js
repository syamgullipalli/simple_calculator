/**
 * Functional test to test src/app/index.html
 */
define(function (require) {
    var registerSuite = require('intern!object');
    var assert = require('intern/chai!assert');

    registerSuite({
        name: 'src/app/index.html landing page test',
        title_match: function () {
            return this.remote
                .get(require.toUrl('../../src/index.html'))
                .getPageTitle()
                .then(function (title) {
                    console.log('Page loaded: ' + title);
                    assert.equal(title, 'Calculator', 'Title should be Calculator');
                });
        }
    });
});

