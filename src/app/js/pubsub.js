/**
 * Publish Subscribe pattern
 * Copied from https://gist.github.com/learncodeacademy/777349747d8382bfb722
 * The publish subscribe pattern is clearly explained in modular javascript tutorial
 * https://www.youtube.com/watch?v=nQRXi1SVOow&list=PLoYCgNOIyGABs-wDaaxChu82q_xQgUb4f&index=4
 */


var events = (function() {
    var events = {}; // to store events

    // Subscribe to an event, if does not exist create and subscribe
    function on(eventName, fn) {
        events[eventName] = events[eventName] || [];
        events[eventName].push(fn);
    }

    // Unsubscribe an event
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

    // Publish an event (trigger corresponding events)
    function emit(eventName, data) {
        if(events[eventName]){
            events[eventName].forEach(function (fn) {
                fn(data);
            });
        }
    }

    return{
        on: on,
        off: off,
        emit: emit
    };
})();