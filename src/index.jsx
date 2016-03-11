import React from 'react';
import ReactDOM from 'react-dom';
import Sortable from 'sortablejs';

const defaultOptions = {
    ref: 'list',
    model: 'items',
    onStart: 'handleStart',
    onEnd: 'handleEnd',
    onAdd: 'handleAdd',
    onUpdate: 'handleUpdate',
    onRemove: 'handleRemove',
    onSort: 'handleSort',
    onFilter: 'handleFilter',
    onMove: 'handleMove'
};

let _nextSibling = null;
let _activeWrapperComponent = null;

const refName = 'sortableComponent';

const getModelItems = (wrapperComponent) => {
    const model = wrapperComponent.sortableOptions.model;
    const sortableComponent = wrapperComponent.refs[refName];
    const { state = {}, props = {} } = sortableComponent;
    const items = state[model] || props[model] || [];
    return items.slice(); // returns a shallow copy of the items array
};

const extend = (target, ...sources) => {
    sources.forEach((source) => {
        for (let key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key];
            }
        }
    });

    return target;
};

const SortableMixin = (sortableOptions = defaultOptions) => (Component) => class extends React.Component {
    sortableInstance = null;
    sortableOptions = sortableOptions;

    componentDidMount() {
        const wrapperComponent = this;
        const sortableComponent = wrapperComponent.refs[refName];
        const options = extend({}, defaultOptions, wrapperComponent.sortableOptions);
        const emitEvent = (type, evt) => {
            const methodName = options[type];
            const method = sortableComponent[methodName];
            method && method.call(sortableComponent, evt, wrapperComponent.sortableInstance);
        };

        let copyOptions = extend({}, options);
        [ // Bind callbacks
            'onStart',
            'onEnd',
            'onAdd',
            'onSort',
            'onUpdate',
            'onRemove',
            'onFilter',
            'onMove'
        ].forEach((name) => {
            copyOptions[name] = (evt) => {
                if (name === 'onStart') {
                    _nextSibling = evt.item.nextElementSibling;
                    _activeWrapperComponent = wrapperComponent;
                } else if (name === 'onAdd' || name === 'onUpdate') {
                    evt.from.insertBefore(evt.item, _nextSibling);

                    const oldIndex = evt.oldIndex;
                    const newIndex = evt.newIndex;
                    let newState = {};
                    let remoteState = {};
                    let items = getModelItems(wrapperComponent);

                    if (name === 'onAdd') {
                        let remoteItems = getModelItems(_activeWrapperComponent);
                        let item = remoteItems.splice(oldIndex, 1)[0];
                        items.splice(newIndex, 0, item);

                        remoteState[_activeWrapperComponent.sortableOptions.model] = remoteItems;
                    } else {
                        items.splice(newIndex, 0, items.splice(oldIndex, 1)[0]);
                    }

                    newState[wrapperComponent.sortableOptions.model] = items;

                    if (copyOptions.stateHandler) {
                        sortableComponent[copyOptions.stateHandler](newState);
                    } else {
                        sortableComponent.setState(newState);
                    }

                    if (_activeWrapperComponent !== wrapperComponent) {
                        _activeWrapperComponent.refs[refName].setState(remoteState);
                    }
                }

                setTimeout(() => {
                    emitEvent(name, evt);
                }, 0);
            };
        });

        const domNode = ReactDOM.findDOMNode(sortableComponent.refs[options.ref] || sortableComponent);
        this.sortableInstance = Sortable.create(domNode, copyOptions);
    }
    componentWillReceiveProps(nextProps) {
        const wrapperComponent = this;
        const sortableComponent = wrapperComponent.refs[refName];
        const model = wrapperComponent.sortableOptions.model;
        const items = nextProps[model];

        if (items) {
            let newState = {};
            newState[model] = items;
            sortableComponent.setState(newState);
        }
    }
    componentWillUnmount() {
        if (this.sortableInstance) {
            this.sortableInstance.destroy();
            this.sortableInstance = null;
        }
    }

    render() {
        return (
            <Component ref={refName} {...this.props} />
        );
    }
};

export default SortableMixin;
