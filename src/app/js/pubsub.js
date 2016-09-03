/**
 * Publish Subscribe pattern
 * Copied from https://gist.github.com/learncodeacademy/777349747d8382bfb722
 * The publish subscribe pattern is clearly explained in modular javascript tutorial
 * https://www.youtube.com/watch?v=nQRXi1SVOow&list=PLoYCgNOIyGABs-wDaaxChu82q_xQgUb4f&index=4
 */
define(function() {
    var events = {}; // to store events

    /**
     * Subscribe to an event, if does not exist create and subscribe.
     * @param {string} eventName - event name
     * @param {callback} fn - callback function
     */
    function on(eventName, fn) {
        events[eventName] = events[eventName] || [];
        events[eventName].push(fn);
    }

    /**
     * Unsubscribe an event.
     * @param {string} eventName - event name
     * @param {callback} fn - callback function
     */
    function off(eventName, fn) {
        if(events[eventName]){
            for (var i = 0; i< events[eventName].length; i++){
                if(events[eventName][i] === fn){
                    events[eventName].splice(i, 1);
                    break;
                }
            }
        }
    }

    /**
     * Publish an event (trigger corresponding events).
     * @param {string} eventName - event name
     * @param {string|number|object}data - data to be handled by the event
     */
    function emit(eventName, data) {
        if(events[eventName]){
            events[eventName].forEach(function (fn) {
                fn(data);
            });
        }
    }

    /**
     * on, off, and emit functions are exposed to the outside world.
     */
    return{
        on: on,
        off: off,
        emit: emit
    };
});