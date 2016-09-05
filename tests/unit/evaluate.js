/**
 * Unit test the methods in src/app/evaluate.js
 * Since many methods inside are private, the expose object will be tested.
 * Security alert: The exposed object should be removed on production.
 */
define(function (require) {
    var registerSuite = require('intern!object');
    var assert = require('intern/chai!assert');
    var evaluate = require('calc/evaluate');

    registerSuite({
        name: 'public members of src/app/js/evaluate',

        evaluate: function () {
            // Valid cases
            assert.equal(evaluate.evaluate({query:'5-3+2*5'}), '5-3+2*5', 'same query on key not passed');
            assert.equal(evaluate.evaluate({query:'5-3+2*5', key:' '}), '5-3+2*5', 'same query on key value empty');
            assert.equal(evaluate.evaluate({query:'5-3+2*5', key:'C'}), '', 'empty query on key value C');
            assert.equal(evaluate.evaluate({query:'5-3+2*5', key:'+'}), '5-3+2*5+', 'empty query on key value C');
            assert.equal(evaluate.evaluate({query:'impossible query', key:'+'}), 'impossible query+', 'same query even if invalid query passed');
            assert.equal(evaluate.evaluate({query:'(5-3+(2*5-9.', key:'='}), '(5-3+(2*5-9))', 'validate query on =');
            assert.equal(evaluate.evaluate({query:'', key:'.'}), '.', '. is allowed at the beginning of the query');
            assert.equal(evaluate.evaluate({query:'', key:'-'}), '-', '- is allowed at the beginning of the query');
            assert.equal(evaluate.evaluate({query:'', key:'('}), '(', '( is allowed at the beginning of the query');
            assert.equal(evaluate.evaluate({query:'((8+5)*9', key:')'}), '((8+5)*9)', 'valid closing brace');
            assert.equal(evaluate.evaluate({query:'((2.3-4+7*(8.5678-2+4)/(3.14*2.48*2.46)+', key:'8'}),
                '((2.3-4+7*(8.5678-2+4)/(3.14*2.48*2.46)+',
                'if query length is more return the query without adding the key');
            assert.equal(evaluate.evaluate({query:'(8.9+5%2+-%', key:'='}), '(8.9+5%2)', 'validate query on =');
            assert.equal(evaluate.evaluate({query:'((8)', key:')'}), '((8))', 'close opening brace');
            assert.equal(evaluate.evaluate({query:'', key:''}), '', '');
            assert.equal(evaluate.evaluate({query:'8.5+', key:'-'}), '8.5+-', '- after + is valid');
            assert.equal(evaluate.evaluate({query:'.-.-', key:'.'}), '.-.-.', '. is valif after -');

            // Invalid cases
            assert.notEqual(evaluate.evaluate({query:'', key:'+'}), '+', '+ is not allowed at the beginning of the query');
            assert.notEqual(evaluate.evaluate({query:'', key:'*'}), '*', '* is not allowed at the beginning of the query');
            assert.notEqual(evaluate.evaluate({query:'', key:'/'}), '/', '/ is not allowed at the beginning of the query');
            assert.notEqual(evaluate.evaluate({query:'', key:'%'}), '%', '% is not allowed at the beginning of the query');
            assert.notEqual(evaluate.evaluate({query:'', key:')'}), ')', ') is not allowed at the beginning of the query');
            assert.notEqual(evaluate.evaluate({query:'.', key:'.'}), '..', '. is not allowed after .');
            assert.notEqual(evaluate.evaluate({query:'((8+5)*9)))', key:')'}), '((8+5)*9)', 'invalid closing braces');
            assert.notEqual(evaluate.evaluate({query:'((8))', key:')'}), '((8)))', 'no extra braces should be added');
            assert.notEqual(evaluate.evaluate({query:'8.5-', key:'-'}), '8.5--', '- after - is not valid');
            assert.notEqual(evaluate.evaluate({query:'(5+8.', key:')'}), '(5+8.)', ') after . is not valid');
        }
    });

    // Test the private members exposed (just for max code coverage)
    // These tests are configured to be skipped (remove the grep option in the config file ../intern.js)
    var exposed = evaluate.expose;
    registerSuite({
        name: 'private members of src/app/js/evaluate',

        _fillTheOpenedBraces: function () {
            // Equal cases
            assert.equal(exposed._fillTheOpenedBraces('('), '()', '( open brace must be closed, expected ()');
            assert.equal(exposed._fillTheOpenedBraces('(('), '(())', '(( all open braces must be closed, expected ()');
            assert.equal(exposed._fillTheOpenedBraces('(())'), '(())', '(()) open brace already closed, expected (())');
            assert.equal(exposed._fillTheOpenedBraces('(8+(5'), '(8+(5))', '(8+(5 all open brace must be closed, expected (8+(5))');
            assert.equal(exposed._fillTheOpenedBraces('(5-6*(8-7)+(1.2-7'), '(5-6*(8-7)+(1.2-7))', '(5-6*(8-7)+(1.2 -7 all open brace must be closed, expected (5-6*(8-7)+(1.2-7))');
            assert.equal(exposed._fillTheOpenedBraces('5.876+2.34'), '5.876+2.34', '5.876+2.34 no braces, nothing to close, expected 5.876+2.34');
            assert.equal(exposed._fillTheOpenedBraces('(5-6*(8-7)+(1.2-7))'), '(5-6*(8-7)+(1.2-7))', '(5-6*(8-7)+(1.2-7)) all braces are already closed, expected (5-6*(8-7)+(1.2-7))');
            assert.equal(exposed._fillTheOpenedBraces(''), '', 'empty should return empty');

            // Not equal cases
            assert.notEqual(exposed._fillTheOpenedBraces('(', '(', '( open brace must be closed, expected ()'));
            assert.notEqual(exposed._fillTheOpenedBraces('(8+(5'), '(8+(5', '(8+(5 all open brace must be closed, expected (8+(5))');
            assert.notEqual(exposed._fillTheOpenedBraces('(5-6*(8-7)+(1.2-7'), '(5-6*(8-7)+(1.2-7', '(5-6*(8-7)+(1.2-7 all open brace must be closed, expected (5-6*(8-7)+(1.2-7))');


            // Type check
            assert.isNotNull(exposed._fillTheOpenedBraces(''), 'empty should not return null');
            assert.isString(exposed._fillTheOpenedBraces(''), 'should always return string when called with a string parameter');
            assert.isString(exposed._fillTheOpenedBraces('8+5-2(4)'), 'should always return string when called with a string parameter');
            assert.isUndefined(exposed._fillTheOpenedBraces(), 'should be undefined when called with no parameter');
            assert.isNull(exposed._fillTheOpenedBraces(null), 'should be null when called with null parameter');
        },

        _isAnOperator: function () {
            // True cases
            assert.isTrue(exposed._isAnOperator('+'), '+ should be an operator');
            assert.isTrue(exposed._isAnOperator('-'), '- should be an operator');
            assert.isTrue(exposed._isAnOperator('*'), '* should be an operator');
            assert.isTrue(exposed._isAnOperator('/'), '/ should be an operator');
            assert.isTrue(exposed._isAnOperator('%'), '% should be an operator');
            assert.isTrue(exposed._isAnOperator('('), '( should be an operator');
            assert.isTrue(exposed._isAnOperator(')'), ') should be an operator');
            assert.isTrue(exposed._isAnOperator('.'), '. should be an operator');

            // False cases
            assert.isFalse(exposed._isAnOperator('0'), '0 should not be an operator');
            assert.isFalse(exposed._isAnOperator('1'), '1 should not be an operator');
            assert.isFalse(exposed._isAnOperator('2'), '2 should not be an operator');
            assert.isFalse(exposed._isAnOperator('3'), '3 should not be an operator');
            assert.isFalse(exposed._isAnOperator('4'), '4 should not be an operator');
            assert.isFalse(exposed._isAnOperator('5'), '5 should not be an operator');
            assert.isFalse(exposed._isAnOperator('6'), '6 should not be an operator');
            assert.isFalse(exposed._isAnOperator('7'), '7 should not be an operator');
            assert.isFalse(exposed._isAnOperator('8'), '8 should not be an operator');
            assert.isFalse(exposed._isAnOperator('9'), '9 should not be an operator');
            assert.isFalse(exposed._isAnOperator('A'), 'A should not be an operator');
            assert.isFalse(exposed._isAnOperator('a'), 'a should not be an operator');
            assert.isFalse(exposed._isAnOperator('hello'), 'a string should not be an operator');

            // Type check
            assert.isBoolean(exposed._isAnOperator('hello'), 'return type must be boolean - expected false');
            assert.isBoolean(exposed._isAnOperator('.'), 'return type must be boolean - expected true');
        },

        _isClosingBraceValid: function () {
            // True cases
            assert.isTrue(exposed._isClosingBraceValid('('), 'The number of closing braces should be less than opening braces');
            assert.isTrue(exposed._isClosingBraceValid('(()'), 'The number of closing braces should be less than opening braces');
            assert.isTrue(exposed._isClosingBraceValid('(8+7'), 'The number of closing braces should be less than opening braces');
            assert.isTrue(exposed._isClosingBraceValid('(2.7+5(8*(2-74))'), 'The number of closing braces should be less than opening braces');

            // False cases
            assert.isFalse(exposed._isClosingBraceValid('()'), 'The number of closing braces should be less than opening braces');
            assert.isFalse(exposed._isClosingBraceValid('(()))'), 'The number of closing braces should be less than opening braces');
            assert.isFalse(exposed._isClosingBraceValid('(8+7)'), 'The number of closing braces should be less than opening braces');
            assert.isFalse(exposed._isClosingBraceValid('(2.7+5)(8*(2-74))'), 'The number of closing braces should be less than opening braces');
            assert.isFalse(exposed._isClosingBraceValid('(2.7+5)(8*(2-74))'), 'The number of closing braces should be less than opening braces');
            assert.isFalse(exposed._isClosingBraceValid('2.7+5)8*(2-74))'), 'The number of closing braces should be less than opening braces');

            // Type check
            assert.isBoolean(exposed._isClosingBraceValid('('), 'should return boolean');
            assert.isBoolean(exposed._isClosingBraceValid(')'), 'should return boolean');
            assert.isBoolean(exposed._isClosingBraceValid(''), 'should return boolean');
            assert.isBoolean(exposed._isClosingBraceValid(), 'should return boolean');
        },

        _isConsecutiveOperatorValid: function () {
            // True cases
            ['+', '*', '/', '%', ')', '-', '('].forEach(function (key) {
                    assert.isTrue(exposed._isConsecutiveOperatorValid(')', key), ')'+key+' is valid');
            });

            ['+', '*', '/', '%', '(', ''].forEach(function (query) {
                ['-', '(', '.'].forEach(function (key) {
                    assert.isTrue(exposed._isConsecutiveOperatorValid(query, key), query+key+' is  valid');
                });
            });

            ['+', '-'].forEach(function (query) {
                ['(', '.'].forEach(function (key) {
                    assert.isTrue(exposed._isConsecutiveOperatorValid(query, key), query+key+' is  valid');
                });
            });

            assert.isTrue(exposed._isConsecutiveOperatorValid(')', '.'), '). is valid');


            // False cases
            ['.', '+', '-', '*', '/', '%', '(', ''].forEach(function (query) {
                ['+', '*', '/', '%', ')'].forEach(function (key) {
                    assert.isFalse(exposed._isConsecutiveOperatorValid(query, key), query+key+' is not valid');
                });
            });

            ['', '+', '-', '*', '/', '%', '(', ')', '.'].forEach(function (query) {
                assert.isFalse(exposed._isConsecutiveOperatorValid(query, ''), 'empty key is not valid');
            });

            assert.isFalse(exposed._isConsecutiveOperatorValid('-', '-'), '-- is not valid');
            assert.isFalse(exposed._isConsecutiveOperatorValid('.', '.'), '.. is not valid');

            // Type check
            assert.isBoolean(exposed._isConsecutiveOperatorValid('2.3+5-4', '+'), 'should return boolean value');
            assert.isBoolean(exposed._isConsecutiveOperatorValid('abcd', 'efgh'), 'should return boolean value');

        },

        _isDecimalValid: function () {
            // True cases
            assert.isTrue(exposed._isDecimalValid('123'), 'decimal valid');
            ['+', '-', '*', '/', '%', ')', '('].forEach(function (i) {
                assert.isTrue(exposed._isDecimalValid('0.456-0.345+0.123'+i), 'decimal valid');
            });

            // False cases
            ['+', '-', '*', '/', '%', ')', '('].forEach(function (i) {
                assert.isFalse(exposed._isDecimalValid('0.456-0.345'+i+'0.123'), 'decimal not valid');
            });

            assert.isFalse(exposed._isDecimalValid('.123'), 'decimal not valid');
            assert.isFalse(exposed._isDecimalValid('0.123'), 'decimal not valid');
            assert.isFalse(exposed._isDecimalValid('+0.123'), 'decimal not valid');
            assert.isFalse(exposed._isDecimalValid('0+0.123'), 'decimal not valid');
            assert.isFalse(exposed._isDecimalValid('0.345+0.123'), 'decimal not valid');

            // Type check
            assert.isBoolean(exposed._isDecimalValid('0+0.123'), 'should return boolean value');
        },

        _isFirstOperatorValid: function () {
            // True cases
            assert.isTrue(exposed._isFirstOperatorValid('', '('),'( at the beginning is valid');
            assert.isTrue(exposed._isFirstOperatorValid('', '-'),'- at the beginning is valid');
            assert.isTrue(exposed._isFirstOperatorValid('', '.'),'. at the beginning is valid');
            assert.isTrue(exposed._isFirstOperatorValid('not empty', '-'),'valid if query is not empty');

            // False cases
            assert.isFalse(exposed._isFirstOperatorValid('', ')'),') at the beginning is not valid');
            assert.isFalse(exposed._isFirstOperatorValid('', '+'),'+ at the beginning is not valid');
            assert.isFalse(exposed._isFirstOperatorValid('', '/'),'/ at the beginning is not valid');
            assert.isFalse(exposed._isFirstOperatorValid('', '*'),'* at the beginning is not valid');
            assert.isFalse(exposed._isFirstOperatorValid('', '%'),'% at the beginning is not valid');

            // Type check
            assert.isBoolean(exposed._isFirstOperatorValid('(2.3+4-7', '-'),'should always return boolean type');
            assert.isBoolean(exposed._isFirstOperatorValid('', '('),'should always return boolean type');

        },

        _isQueryLengthValid: function () {
            // True cases
            assert.isTrue(exposed._isQueryLengthValid(''), 'empty qurey length is valid');
            assert.isTrue(exposed._isQueryLengthValid('abcedf'), 'query length less than 22 chars is valid');
            assert.isTrue(exposed._isQueryLengthValid('(1+2+3-4-6*7*8/9%10)'), 'query length less than 22 chars is valid');

            // False cases
            assert.isFalse(exposed._isQueryLengthValid('(1+2+3-4-6*7*8/9%10)*(1+2+3-4-6*7*8/9%10)'), 'query length greater than 22 chars is not valid');

            // Type check
            assert.isBoolean(exposed._isQueryLengthValid('(1+2+3-4-6*7*8/9%10)*(1+2+3-4-6*7*8/9%10)'), 'should always return boolean type');
            assert.isBoolean(exposed._isQueryLengthValid(''), 'should always return boolean type');

            // Type check
        },

        _removeIfOperatorsAtEnd: function () {
            // Valid cases
            assert.equal(exposed._removeIfOperatorsAtEnd('()'), '', 'only operators, then remove all operators');
            assert.equal(exposed._removeIfOperatorsAtEnd('(2+3)-8+)'), '(2+3)-8', 'remove operators at the end of the query');
            assert.equal(exposed._removeIfOperatorsAtEnd('(2+3)-8+)-%/. '), '(2+3)-8', 'remove operators at the end of the query');
            assert.equal(exposed._removeIfOperatorsAtEnd('(7.5-8*(3-'), '(7.5-8*(3', 'remove operators at the end of the query');

            // Failing cases
            assert.notEqual(exposed._removeIfOperatorsAtEnd('(2+3)-8+)-%/. '), '(2+3)-8+)-%/.', 'remove operators at the end of the query');
            assert.notEqual(exposed._removeIfOperatorsAtEnd('+)-%/. '), '+)-%/.', 'remove operators at the end of the query');
        },

        _validateIncompleteQuery: function () {
            // Valid cases
            assert.equal(exposed._validateIncompleteQuery('(7.5-8*(3-'),'(7.5-8*(3))', 'shold remove invalid operator and close the opened braces');
            assert.equal(exposed._validateIncompleteQuery('((((+-'),'', 'should remove all the operators');
            assert.equal(exposed._validateIncompleteQuery('   '),'', 'spaces should be removed');

            // Fails cases
            assert.notEqual(exposed._validateIncompleteQuery('-))'),'-', 'should remove all the operators');
            assert.notEqual(exposed._validateIncompleteQuery(' '),' ', 'should not return space');

            // Type check
            assert.isString(exposed._validateIncompleteQuery('abcd efg hij'), 'should return string');
            assert.isString(exposed._validateIncompleteQuery(''), 'should return string')
        }

    });
});