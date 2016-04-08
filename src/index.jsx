import React from 'react';
import ReactDOM from 'react-dom';
import Sortable from 'sortablejs';

const defaultOptions = {
    ref: 'list'
};

const store = {
    nextSibling: null,
    activeComponent: null
};

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
    static propTypes = {
        items: React.PropTypes.array.isRequired,
        onChange: React.PropTypes.func.isRequired
    };
    state = {
        sortableInstance: null
    };
    sortableOptions = extend({}, defaultOptions, options);

    componentDidMount() {
        [ // Bind callbacks
            'onStart',
            'onEnd',
            'onAdd',
            'onSort',
            'onUpdate',
            'onRemove',
            'onFilter',
            'onMove'
        ].forEach(name => {
            const eventHandler = this.sortableOptions[name];

            this.sortableOptions[name] = (evt) => {
                if (name === 'onStart') {
                    store.nextSibling = evt.item.nextElementSibling;
                    store.activeComponent = this;
                } else if (name === 'onAdd' || name === 'onUpdate') {
                    evt.from.insertBefore(evt.item, store.nextSibling);

                    const oldIndex = evt.oldIndex;
                    const newIndex = evt.newIndex;
                    let items = this.props.items;
                    let remoteItems = [];

                    if (name === 'onAdd') {
                        remoteItems = store.activeComponent.props.items;
                        items.splice(newIndex, 0, remoteItems.splice(oldIndex, 1)[0]);
                    } else {
                        items.splice(newIndex, 0, items.splice(oldIndex, 1)[0]);
                    }

                    // Called by any change to the list (add / update / remove)
                    this.props.onChange(items, this.state.sortableInstance);

                    if (store.activeComponent !== this) {
                        const sortableInstance = store.activeComponent.state.sortableInstance;
                        store.activeComponent.props.onChange(remoteItems, sortableInstance);
                    }
                }

                setTimeout(() => {
                    // Event handler props
                    this.props[name] && this.props[name](evt, this.state.sortableInstance);

                    // Event handler options
                    eventHandler && eventHandler(evt, this.state.sortableInstance);
                }, 0);
            };
        });

        const sortableComponent = this.refs[refName];
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
        const sortableInstance = Sortable.create(domNode, this.sortableOptions);
        this.setState({ sortableInstance: sortableInstance });
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
