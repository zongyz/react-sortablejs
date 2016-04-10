import React from 'react';
import ReactDOM from 'react-dom';
import Sortable from 'sortablejs';

const store ={
    nextSibling: null,
    activeComponent: null
};

export default class extends React.Component {
    sortable = null;

    componentDidMount() {
        const { children, className, ...options } = this.props;

        [
            'onStart',
            'onEnd',
            'onAdd',
            'onSort',
            'onUpdate',
            'onRemove',
            'onFilter',
            'onMove'
        ].forEach((name) => {
            const eventHandler = options[name];

            options[name] = (evt) => {
                if (name === 'onStart') {
                    store.nextSibling = evt.item.nextElementSibling;
                    store.activeComponent = this;
                } else if ((name === 'onAdd' || name === 'onUpdate') && this.props.onChange) {
                    const items = this.sortable.toArray();
                    const remote = store.activeComponent;
                    const remoteItems = remote.sortable.toArray();

                    evt.from.insertBefore(evt.item, store.nextSibling);
                    
                    if (remote !== this) {
                        if ((typeof remote.props.group === 'object') && (remote.props.group.pull === 'clone')) {
                            // Remove the node with the same data-reactid
                            evt.item.parentNode.removeChild(evt.item);
                        }

                        remote.props.onChange && remote.props.onChange(remoteItems, remote.sortable);
                    }

                    this.props.onChange && this.props.onChange(items, this.sortable);
                }

                setTimeout(() => {
                    eventHandler && eventHandler(evt);
                }, 0);
            }
        });

        this.sortable = Sortable.create(ReactDOM.findDOMNode(this), options);
    }
    render() {
        return (
            <div className={this.props.className}>{this.props.children}</div>
        );
    }
}
