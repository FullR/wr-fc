/*
    Mixin for providing basic subscriber model
*/
const emitter = {
    // Alert subscribers to an event
    fire(eventId, event) {
        const listeners = this._listeners || (this._listeners = {});
        const listenerGroup = listeners[eventId];
        
        if(listenerGroup) {
            listenerGroup.forEach(function(listener) {
                listener(event);
            });
        }
    },
    
    // Subscribe to a events of a certain type
    on(eventId, callback) {
        this._listeners = this._listeners || {};
        this._listeners[eventId] = this._listeners[eventId] || [];
        this._listeners[eventId].push(callback);
    },
    
    // Stop subscribing to events of a specific type
    off(eventId, callback) {
        const listenerGroup = this._listeners ? this._listeners[eventId] : null;
        if(listenerGroup) {
            listenerGroup.splice(listenerGroup.indexOf(callback), 1);
        }
    }
};

module.exports = emitter;
