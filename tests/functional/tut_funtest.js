/**
 * Functional test tutorial
 * Copied from: https://github.com/theintern/intern-tutorial
 */

define(function (require) {
    var registerSuite = require('intern!object');
    var assert = require('intern/chai!assert');

    registerSuite({
        name: 'index',

        'greeting form': function () {
            return this.remote
                .get(require.toUrl('src/app/html/tut_funtest.html'))
                .setFindTimeout(5000)
                .findByCssSelector('body.loaded')
                .findById('nameField')
                .click()
                .type('Elaine')
                .end()
                .findByCssSelector('#loginForm input[type=submit]')
                .click()
                .end()
                .findById('greeting')
                .getVisibleText()
                .then(function (text) {
                    assert.strictEqual(text, 'Hello, Elaine!',
                        'Greeting should be displayed when the form is submitted');
                });
        }
    });
});