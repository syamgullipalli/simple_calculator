var display = (function () {
    // Cache DOM
    var $query = $('#query');
    var $result = $('#result');

    // Bind events
    events.on('VALID_QUERY', displayQuery);
    events.on('CLR_SCR', clearScreen);

    /**
     * Clear query screen and reset result
     */
    function clearScreen() {
        $query.text('');
        $result.text('0');
    }

    /**
     * Display query on screen
     * @param query
     */
    function displayQuery(query) {
        $query.text(query);
    }
})();