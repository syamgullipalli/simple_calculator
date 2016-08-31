/**
 * Unit test tutorial
 * Copied from: https://github.com/theintern/intern-tutorial
 */

define(function (require) {
    var registerSuite = require('intern!object');
    var assert = require('intern/chai!assert');
    var hello = require('src/app/js/hello');

    registerSuite({
        name: 'hello',

        greet: function () {
            assert.strictEqual(hello.greet('Murray'), 'Hello, Murray!',
                'hello.greet should return a greeting for the person named in the first argument');
            assert.strictEqual(hello.greet(), 'Hello, world!',
                'hello.greet with no arguments should return a greeting to "world!"');
        }
    });
});