//TODO Suppress the result to 22 characters if longer than 22 characters
//TODO Only one dot allowed per on result screen
//TODO Divided by zero: exception
//TODO If result screen is not cleared (not 0) and clicked on operator: precede the query screen with result


var evaluate = (function () {
    // Cache DOM
    var $query = $('#query');
    var MAX_CHARS = 22; //FIXME avoid hard-code

    // Bind events
    events.on('BTN_CLICKED', evaluate);

    /**
     * Evaluate the given key
     * @param key
     */
    function evaluate(key) {
        var query = $query.text()   // get query text

        switch (key){
            case 'C': // Clear
                events.emit('CLR_SCR', null);
                break;

            case '=': // Result
                validateIncompleteQuery(query);
                break;

            // Operators
            case ')': // break the switch if ')' is not valid
                if(!isClosingBraceValid(query))
                    break;
            case '+':
            case '-':
            case '*':
            case '/':
            case '%':
            case '(':
                if(isQueryLengthValid(query) && isFirstOperatorValid(query, key)
                    && isConsecutiveOperatorValid(query, key))
                    events.emit('VALID_QUERY', query.concat(key));
                break;

            // Decimal
            case '.':
                if(isQueryLengthValid(query) && isConsecutiveOperatorValid(query, key) && isDecimalValid(query))
                    events.emit('VALID_QUERY', query.concat(key));
                break;

            // Numbers are default
            default:
                if(isQueryLengthValid(query))
                    events.emit('VALID_QUERY', query.concat(key));
        }
    }

    /**
     * Closing braces count should not be larger than the opened braces
     * @param query
     * @returns {boolean}
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
            else {
                console.log('Unexpected behavior :-X :-( :-[');
                console.log(e.message)
            }
        }

        if (opened_brace_count > closed_brace_count)
            return true;
        return false;
    }

    /**
     * Check the validity of the consecutive operators.
     * @param query
     * @param key
     * @returns {boolean}
     */
    function isConsecutiveOperatorValid(query, key) {
        var last_char = query.slice(-1) // Extract last character

        if(!isAnOperator(last_char))
            return true;

        switch (key){
            case '+':   // only after ')' or '.' accepted
            case '*':
            case '/':
            case '%':
            case ')':
                if(last_char == ')' || last_char == '.')
                    return true;
                return false;

            case '-':   // after any operator except '+' and '-' are allowed
                if(last_char == '-' || last_char == '+')
                    return false;
                break;

            case '.':   // after any operator except '.' are allowed
                if(last_char == '.')
                    return false;
                break;

            case '(':   // accepted after any operator
                break;
        }

        return true;
    }

    /**
     * Is '.' valid to be appended to query string.
     * @param query
     * @returns {boolean}
     */
    function isDecimalValid(query) {
        if(query.match(/[\+|\-|\*|\/|\%|\(]?\d*\.\d*$/) === null) // Check validity using regex
            return true;
        return false;
    }

    /**
     * Only '-' operator is allowed on the beginning of the query
     * @param query
     * @param key
     * @returns {boolean}
     */
    function isFirstOperatorValid(query, key) {
        if(query.length != 0 || key == '-' || key == '(')
            return true
        return false
    }

    /**
     * Check if the line length is valid
     * @param line
     * @returns {boolean}
     */
    function isQueryLengthValid(line) {
        if(line.length >= MAX_CHARS)
            return false;
        return true;
    }

    function suppressResult(result){
        // TODO
        return null;
    }

    /**
     * Check is the geven key is a valid operator.
     * @param key
     * @returns {boolean}
     */
    function isAnOperator(key) {
        if(['+', '-', '*', '/', '%', '(', ')', '.'].indexOf(key) !=-1)
            return true;
        return false;
    }

    /**
     * Add missing braces to an incomplete valid query
     * @param query
     * @returns {*}
     */
    function fillTheLeadingBraces(query){
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
            else {
                console.log('Unexpected behavior :-X :-( :-[');
                console.log(e.message)
            }
        }
        var required_closings = opened_brace_count - closed_brace_count;

        // Add remaining closing braces
        for (var i = 0; i < required_closings; i++) {
            query += ')';
        }

        return query;
    }

    /**
     * Add missing braces to an incomplete valid query or remove operator at the end of the query. Validate credible
     * query with missing '*'s. e.g. 5(2)+8(6) is a valid query, will be evaluated as (5*2)+(8*6). Validate ').' case
     * e.g. (8).2+(.5).4 is a valid query, will be evaluated as (8*0.2)+(0.5*0.4)
     * Note: Query should be validated only on result '='
     * @param query
     * @returns {*}
     */
    function validateIncompleteQuery(query) {
        // The following function call will take care even if a valid ')' is removed
        query = removeIfOperatorsAtEnd(query);

        // Close all opened braces
        query = fillTheLeadingBraces(query);

        // Emit 'VALID_QUERY' event to update the query screen
        events.emit('VALID_QUERY', query);

        // TODO Validate missing '*'

        return query;
    }

    /**
     * Remove operators at the end of the query recursively.
     * @param query
     * @returns {*}
     */
    function removeIfOperatorsAtEnd(query) {
        var last_char = query.slice(-1); // Extract last character
        if(isAnOperator(last_char)) { // if last character in query is operator or '.'
            query = query.slice(0, -1); // remove the last character
            return removeIfOperatorsAtEnd(query); // remove recursively as long as the query ends with an operator
        } else {
            return query;
        }
    }
})();