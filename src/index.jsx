import React from 'react';
import ReactDOM from 'react-dom';
import Sortable from 'sortablejs';

const defaultOptions = {
    ref: 'list',
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

const extend = (target, ...sources) => {
    if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }

    const output = Object(target);
    for (let index = 0; index < sources.length; index++) {
        const source = sources[index];
        if (source !== undefined && source !== null) {
            for (let key in source) {
                if (source.hasOwnProperty(key)) {
                    output[key] = source[key];
                }
            }
        }
    }
    return output;
};

const SortableMixin = (options = defaultOptions) => (Component) => class extends React.Component {
    state = {
        sortableInstance: null
    };

    sortableOptions = extend({}, defaultOptions, options);
    populatedOptions = {};

    componentDidMount() {
        const sortableComponent = this.refs[refName];
        const emitEvent = (type, evt) => {
            const methodName = this.sortableOptions[type];
            const method = sortableComponent[methodName];
            method && method.call(sortableComponent, evt, this.state.sortableInstance);
        };

        let copyOptions = extend({}, this.sortableOptions);

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
                    _activeWrapperComponent = this;
                } else if (name === 'onAdd' || name === 'onUpdate') {
                    evt.from.insertBefore(evt.item, _nextSibling);

                    const oldIndex = evt.oldIndex;
                    const newIndex = evt.newIndex;
                    let items = this.props.items;
                    let remoteItems = [];

                    if (name === 'onAdd') {
                        remoteItems = _activeWrapperComponent.props.items;
                        let item = remoteItems.splice(oldIndex, 1)[0];
                        items.splice(newIndex, 0, item);
                    } else {
                        items.splice(newIndex, 0, items.splice(oldIndex, 1)[0]);
                    }

                    this.props.onChange(items);

                    if (_activeWrapperComponent !== this) {
                        _activeWrapperComponent.props.onChange(remoteItems);
                    }
                }

                setTimeout(() => {
                    emitEvent(name, evt);
                }, 0);
            };
        });
        this.populatedOptions = copyOptions
        this.initSortable(sortableComponent);
    }
    componentDidUpdate(prevProps, prevState) {
        const model = this.sortableOptions.model;
        const prevItems = prevProps[model];
        const currItems = this.props[model];
        if (prevItems !== currItems) {
            this.initSortable(this.refs[refName]);
        }
    }
    componentWillUnmount() {
        this.destroySortable();
    }
    initSortable(sortableComponent) {
        this.destroySortable();
        const domNode = ReactDOM.findDOMNode(sortableComponent.refs[this.sortableOptions.ref] || sortableComponent);
        const sortableInstance = Sortable.create(domNode, this.populatedOptions);
        this.setState({ sortableInstance });
    }
    destroySortable() {
        if (this.state.sortableInstance) {
            this.state.sortableInstance.destroy();
            this.setState({ sortableInstance: null });
        }
    }

    render() {
        return (
            <Component ref={refName} {...this.props} {...this.state} />
        );
    }
};

export default SortableMixin;
