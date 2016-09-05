// Features planned to implement
//Not required: Suppress the result to 22 characters if longer than 22 characters (no external handle required)
//Not required: Only one dot allowed per on result screen (no external handle required)
//Not required: Divided by zero: handle exception (no external handle required)
//TODO If result screen is not cleared (not 0) and clicked on operator: precede the query screen with result
/**
 * The result screen is evaluated.
 */
define(['calc/pubsub'], function (events) {
    var MAX_CHARS = 22; //FIXME avoid hard-code

    // Bind events
    events.on('EVAL_RESULT', calculate);


    /**
     *  Evaluate the query and emit 'SHOW_RESULT' event on success.
     * @param {string} query - Query string of math to be evaluated.
     * @returns {number} - Evaluated result, 'INVALID QUERY' on fail.
     */
    function calculate(query) {
        var result =0;
        try {
            result = eval(query);
        } catch(e){
            //TODO Postpone emit and evaluate query to advanced level
            //console.log(e.message);
            result = 'INVALID_QUERY';
        }

        events.emit('SHOW_RESULT', result);

        return result;
    }

    return{
        calculate: calculate
    }
});