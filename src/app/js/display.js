/**
 * Display query and result on respective screens.
 */
var display = (function () {
    // Cache DOM
    var $query = $('#query');
    var $result = $('#result');

    // Bind events
    events.on('EVAL_QUERY', displayQuery);
    events.on('CLR_SCR', clearScreen);
    events.on('SHOW_RESULT', displayResult);

    /**
     * Clear query screen and reset result.
     */
    function clearScreen() {
        $query.text('');    // clear query screen
        $result.text('0');  // reset result screen
    }

    /**
     * Display query on the query screen.
     * @param {string} query - math query as string
     */
    function displayQuery(query) {
        $query.text(query);
    }

    /**
     * Display result on the result screen.
     * @param {string} result - evaluated result as string
     */
    function displayResult(result) {
        $result.text(result);
    }
})();