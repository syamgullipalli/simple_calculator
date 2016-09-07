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
        },

    query_test: function () {
        return this.remote
            .get(require.toUrl('../../src/index.html'))
            .setFindTimeout(5000)
            .findById('lbrace').click().end()
            .findById('two').click().end()
            .findById('plus').click().end()
            .findById('three').click().end()
            .findById('rbrace').click().end()
            .findById('multiply').click().end()
            .findById('eight').click().end()
            .findById('equals').click().end()
            .findById('query').getVisibleText().then(function (query) {
                assert.equal(query, '(2+3)*8', 'Entered query should match');
            }).end()
            .findById('result').getVisibleText().then(function (result) {
                assert.equal(result, eval('(2+3)*8'), 'The result of the evaluated query should match');
            });
    }
    });
});

