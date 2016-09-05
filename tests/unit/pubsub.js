/**
 * Unit test the methods in src/app/pubsub.js
 */

define(function (require) {
    var registerSuite = require('intern!object');
    var assert = require('intern/chai!assert');
    var events = require('calc/pubsub');

    registerSuite({
        name: 'public members of src/app/js/pubsub',

        allEvents: function () {
            var myData = null;    // store test data from event

            /**
             * Function to be executed on event
             * @param {object} data
             */
            function myCallbackFunction(data) {
                myData = data;
            }


            // Bind to event
            events.on('MY_EVENT', myCallbackFunction);

            // Detach from non existing function (more code coverage)
            events.off('MY_EVENT', function () {});

            // myData should not be object (not updated yet)
            assert.isNull(myData, 'myData is null');
            assert.isNotObject(myData, 'myData is not updated, so not an object');

            // Emit event (should update the data)
            events.emit('MY_EVENT', {key:'1', query:'4+5'});

            // Check the data
            assert.isNotNull(myData, 'myData updated, should not be null');
            assert.isObject(myData, 'myData should be an object now');
            assert.deepEqual(myData, {key:'1', query:'4+5'}, 'objects should match');

            // detach from the event
            events.off('MY_EVENT', myCallbackFunction);

            // emit the event with different data
            events.emit('MY_EVENT', {key:')', query:'(3.45-7.465'});

            // after detach (no more callback)
            assert.deepEqual(myData, {key:'1', query:'4+5'}, 'objects should not be updated since the callback is detached');
            assert.notDeepEqual(myData, {key:')', query:'(3.45-7.465'}, 'myData is different from the latest event emitted');

            // cover else case non existing event off
            events.off('NON_EXISTING_EVENT', myCallbackFunction);
        }
    });
});