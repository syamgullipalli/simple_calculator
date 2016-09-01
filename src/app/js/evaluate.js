//TODO Suppress the result to 22 characters if longer than 22 characters
//TODO Only one dot allowed per on result screen
//TODO Only one dot allowed per number (One dot allowed in between two operators)
//TODO Two operators can't fit consecutively
//TODO Check for matching pairs of braces ( )
//TODO Parse the query string and modify if required
//TODO Divided by zero: exception
//TODO If result screen is not cleared (not 0) and clicked on operator: precede the query screen with result


var evaluate = (function () {
    // Cache DOM
    var $query = $('#query');
    var $result = $('#result');
    var MAX_CHARS = 22;

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
                console.log('Clear');
                break;

            case '=': // Result
                console.log('Result');
                break;

            // Operators
            case '+':
            case '-':
            case '*':
            case '/':
            case '%':
            case '(':
            case ')':
                if(isQueryLengthValid(query)
                    &&
                    isFirstOperatorValid(query, key))
                    events.emit('VALID_QUERY', query.concat(key));
                console.log('Operator')
                break;

            // Decimal
            case '.':
                if(isQueryLengthValid(query))
                    events.emit('VALID_QUERY', query.concat(key));
                console.log('Decimal');
                break;

            // Numbers are default
            default:
                if(isQueryLengthValid(query))
                    events.emit('VALID_QUERY', query.concat(key));
                console.log('Number');
        }
    }

    function isConsecutiveOperator(query) {
        // TODO
    }

    function idDecimalValid(query) {
        // TODO
    }

    /**
     * Only '-' operator is allowed on the beginning of the query
     * @param query
     * @param key
     * @returns {boolean}
     */
    function isFirstOperatorValid(query, key) {
        console.log(query.length);
        if(query.length != 0 || key == '-')
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
})();