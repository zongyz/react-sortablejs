import _ from 'lodash';
import events from 'events';

class ImmutableStore extends events.EventEmitter {
    state = {};

    constructor(state = {}) {
        super();

        this.state = state;
    }
    get(key, defaultValue) {
        return _.get(this.state, key, defaultValue);
    }
    set(key, value) {
        this.state = _.merge({}, this.state, _.set({}, key, value));
        this.emit('change', this.state);
        return this.state;
    }
    unset(key, options) {
        let state = _.extend({}, this.state);
        _.unset(state, key);
        this.state = state;
        this.emit('change', this.state);
        return this.state;
    }
    replace(key, value) {
        let state = _.extend({}, this.state);
        _.unset(state, key);
        this.state = _.merge({}, state, _.set({}, key, value));
        this.emit('change', this.state);
        return this.state;
    }
    clear() {
        this.state = {};
        this.emit('change', this.state);
        return this.state;
    }
}

export default ImmutableStore;
