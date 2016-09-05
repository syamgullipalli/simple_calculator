/**
 * Button click functionality.
 * Publish the button click event "BTN_CLICKED" with the key value.
 * Publish Subscribe pattern will take care of calling the binding functions.
 */
define(['jquery', 'calc/pubsub'], function ($, events) {
    // Cache DOM
    var $btn = $('.btn');
    var $query = $('#query');

    // Bind events
    $btn.on('click', emitBtnClick);

    /**
     * Publish button click event.
     * Pass object of {key:{char}, query:{string}} to the event.
     */
    function emitBtnClick() {
        // On click pass key value to the event with spaces trimmed
        events.emit('BTN_CLICKED', {key: $(this).text().trim(), query: $query.text().trim()});
    }

    /* START TEST-HOOK */
    expose = {
        _emitBtnClick: emitBtnClick
    };

    return expose;
    /* END TEST-HOOK */
});
