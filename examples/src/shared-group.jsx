import React from 'react';
import Sortable from '../../src';
import store from './store';

const sortableOptions = {
    ref: 'list',
    group: {
        name: 'shared',
        pull: true, //'clone',
        put: true
    }
};

@Sortable(sortableOptions)
export default class SharedGroup extends React.Component {
    render() {
        const items = this.props.items.map((text, index) => (
            <li key={index}>{text}</li>
        ));

        return (
            <ul ref="list" className="block-list">{items}</ul>
        );
    }
}
