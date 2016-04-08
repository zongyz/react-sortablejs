import React from 'react';
import Sortable from '../../src';
import store from './store';

const sortableOptions = {
    ref: 'list'
};

@Sortable(sortableOptions)
export default class SimpleList extends React.Component {
    static propTypes = {
        items: React.PropTypes.array,
        onChange: React.PropTypes.func
    };

    render() {
        const items = this.props.items.map((text, index) => (
            <li key={index}>List Item {text}</li>
        ));
        
        return (
            <ul ref="list" className="block-list">{items}</ul>
        );
    }
}
