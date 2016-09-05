/**
 * Unit test the methods in src/app/result.js
 */

define(function (require) {
    var registerSuite = require('intern!object');
    var assert = require('intern/chai!assert');
    var result = require('calc/result');

    registerSuite({
        name: 'public members of src/app/js/result',

        calculate: function () {
            // Valid cases
            assert.equal(result.calculate('(8+5-3)*7'), '70', 'not a valid query');
            assert.equal(result.calculate('((('), 'INVALID_QUERY', 'not a valid query');
            assert.notEqual(result.calculate('0.1+0.2'), '0.3', 'dealing javascript floating point precision problem');
        }
    });
});