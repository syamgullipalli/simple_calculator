/**
 * Button click functionality.
 * Publish the button click event "BTN_CLICKED" with the key value.
 * Publish Subscribe pattern will take care of calling the binding functions.
 */
define(['jquery', 'calc/pubsub'], function ($, events) {
    // Cache DOM
    var $btn = $('.btn');

    // Bind events
    $btn.on('click', emitBtnClick);

    /**
     * Publish button click event
     */
    function emitBtnClick() {
        // On click pass key value to the event with spaces trimmed
        events.emit('BTN_CLICKED', $(this).text().trim());
    }

    /* START TEST-HOOK */
    expose = {
        _emitBtnClick: emitBtnClick
    };

    return expose;
    /* END TEST-HOOK */
});
