/*
 * A very simple AMD module with no dependencies
 * Tutorial for unit test
 * Copied from: https://github.com/theintern/intern-tutorial
 */

define([], function () {
    return {
        greet: function (name) {
            name = name || 'world';

            return 'Hello, ' + name + '!';
        }
    };
});