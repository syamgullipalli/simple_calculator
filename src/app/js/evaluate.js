/**
 * Evalaute the query string.
 */
define(['calc/pubsub'], function (events) {

    // Max number of characters allowed
    var MAX_CHARS = 22; //FIXME avoid hard-code

    // Bind events
    events.on('BTN_CLICKED', evaluate);

    /**
     * Evaluate the given key.
     * @param {object} data - {key:{char}, query:{string}}
     * @returns {string} - evaluated query string
     */
    function evaluate(data) {
        var key = data['key'] || '';       // if key is not passed set it to empty
        var query = data['query'] || '' ;  // if query is not passed set it to empty

        // Trim the leading and trailing spaces
        query = query.trim();
        key = key.trim();

        switch (key){
            case 'C': // Clear
                events.emit('CLR_SCR', null);
                query = ''; // set empty query on emitting CLR_SCR
                break;

            case '=': // Result
                query = validateIncompleteQuery(query);
                events.emit('EVAL_RESULT', query);
                break;

            case '': // Key not passed
                //console.log("Key not passed");
                break;

            // Operators
            case ')': // break the switch if ')' is not valid
                if(!isClosingBraceValid(query)) // else continue the following cases
                    break;
            case '.':
                if(!isDecimalValid(query))
                    break;
            case '+':
            case '-':
            case '*':
            case '/':
            case '%':
            case '(':
                if(!isConsecutiveOperatorValid(query, key) || !isQueryLengthValid(query) ||
                    !isFirstOperatorValid(query, key))
                    break;

            // Numbers are default also continue the above cases if not broken
            default:
                if(isQueryLengthValid(query)) {
                    query = query.concat(key);
                    events.emit('EVAL_QUERY', query);
                }
        }

        return query;
    }

    /**
     * Add missing braces to an incomplete valid query.
     * @param {string} query - math query string
     * @returns {string} - evaluated query string
     */
    function fillTheOpenedBraces(query){
        var opened_brace_count = 0;
        var closed_brace_count = 0;
        try {
            opened_brace_count = query.match(/\(/g).length; // regex to count opened braces
            closed_brace_count = query.match(/\)/g).length; // regex to count closed braces
        } catch (e){
            if (e instanceof TypeError) {
                // Do nothing
                //console.log(e.message);
            }
            // else {
            //     console.log('Unexpected behavior :-X :-( :-[');
            //     console.log(e.message)
            // }
        }
        var required_closings = opened_brace_count - closed_brace_count;

        // Add remaining closing braces
        for (var i = 0; i < required_closings; i++) {
            query += ')';
        }

        return query;
    }

    /**
     * Predicate: Check is the geven key is a valid operator.
     * @param {char} key - calculator button value
     * @returns {boolean} - true on valid, false otherwise
     */
    function isAnOperator(key) {
        if([' ', '+', '-', '*', '/', '%', '(', ')', '.'].indexOf(key) !=-1)
            return true;
        return false;
    }

    /**
     * Predicate: Closing braces count should not be larger than the opened braces.
     * @param {string} query - math query string
     * @returns {boolean} - true on valid, false otherwise
     */
    function isClosingBraceValid(query){
        var opened_brace_count = 0;
        var closed_brace_count = 0;
        try {
            opened_brace_count = query.match(/\(/g).length; // regex to count opened braces
            closed_brace_count = query.match(/\)/g).length; // regex to count closed braces
        } catch (e){
            if (e instanceof TypeError) {
                // Do nothing
            }
            // else {
            //     console.log('Unexpected behavior :-X :-( :-[');
            //     console.log(e.message)
            // }
        }

        if (opened_brace_count > closed_brace_count)
            return true;
        return false;
    }

    /**
     * Predicate: Check the validity of the consecutive operators.
     * @param {string} query - math query string
     * @param {char} key - calculator button value
     * @returns {boolean} - true on valid, false otherwise
     */
    function isConsecutiveOperatorValid(query, key) {
        var last_char = query.slice(-1); // Extract last character

        if(last_char == '.' || key.trim() == '') // if no key or query ends with .
            return false;

        if(!isAnOperator(last_char) && last_char != '')
            return true;

        switch (key){
            case '+':   // only after ')' or '.' accepted
            case '*':
            case '/':
            case '%':
            case ')':
                if(last_char == ')')
                    return true;
                return false;

            case '-':   // after any operator except '+' are allowed
                if(last_char == '-')
                    return false;
                break;

            case '.':   // after any operator except '.' are allowed
                break;

            case '(':   // accepted after any operator
                break;
        }

        return true;
    }

    /**
     * Predicate: Is '.' valid to be appended to query string.
     * @param {string} query - math query string
     * @returns {boolean} - true on valid, false otherwise
     */
    function isDecimalValid(query) {
        if(query.match(/[\+|\-|\*|\/|\%|\(]?\d*\.\d*$/) === null) // Check validity using regex
            return true;
        return false;
    }

    /**
     * Predicate: Only '-' or '(' or '.' operator is allowed at the beginning of the query
     * @param {string} query - math query string
     * @param {char} key - calculator button value
     * @returns {boolean} - true on valid, false otherwise
     */
    function isFirstOperatorValid(query, key) {
        if(query.trim() != '' || key == '-' || key == '(' || key == '.')  // If query is not empty just return true
            return true;
        return false
    }

    /**
     * Predicate: Check if the line length is valid.
     * @param {string} query - math string
     * @returns {boolean} - true on valid, false otherwise
     */
    function isQueryLengthValid(query) {
        if(query.length >= MAX_CHARS)
            return false;
        return true;
    }

    /**
     * Remove operators at the end of the query recursively.
     * @param {string} query - math query string
     * @returns {string} - evaluated query string
     */
    function removeIfOperatorsAtEnd(query) {
        var last_char = query.slice(-1); // Extract last character
        if(isAnOperator(last_char)) { // if last character in query is operator or '.'
            query = query.slice(0, -1); // remove the last character
            return removeIfOperatorsAtEnd(query); // remove recursively as long as the query ends with an operator
        }

        return query;
    }

    /**
     * Add missing braces to an incomplete valid query or remove operator at the end of the query. Validate credible
     * query with missing '*'s.
     *      e.g. 5(2)+8(6) is a valid query, will be evaluated as (5*2)+(8*6).
     * Validate ').' case
     *      e.g. (8).2+(.5).4 is a valid query, will be evaluated as (8*0.2)+(0.5*0.4)
     * Note: Query should be validated only on result '='
     * @param {string} query - math query string
     * @returns {string} - evaluated query string
     */
    function validateIncompleteQuery(query) {
        // The following function call will take care even if a valid ')' is removed
        query = removeIfOperatorsAtEnd(query);

        // Close all opened braces
        query = fillTheOpenedBraces(query);

        // Emit 'EVAL_QUERY' event to update the query screen
        events.emit('EVAL_QUERY', query);

        // TODO Validate missing '*' (as given in doc examples)

        return query;
    }

    /* BEGIN TEST-HOOK*/
    expose = {
        _fillTheOpenedBraces: fillTheOpenedBraces,
        _isAnOperator: isAnOperator,
        _isClosingBraceValid: isClosingBraceValid,
        _isConsecutiveOperatorValid: isConsecutiveOperatorValid,
        _isDecimalValid: isDecimalValid,
        _isFirstOperatorValid: isFirstOperatorValid,
        _isQueryLengthValid: isQueryLengthValid,
        _removeIfOperatorsAtEnd: removeIfOperatorsAtEnd,
        _validateIncompleteQuery: validateIncompleteQuery
    }
    /* END TEST-HOOK*/

    return{
        /* BEGIN TEST-HOOK*/
        expose: expose,
        /* BEGIN TEST-HOOK*/
        evaluate:evaluate
    }

});