import React from 'react';
import Sortable from '../../src';

const sortableOptions = {
    ref: 'list'
};

@Sortable(sortableOptions)
class SimpleList extends React.Component {
    static propTypes = {
        items: React.PropTypes.array
    };

    render() {
        const items = this.props.items.map((text, index) => (
            <li key={index}>List Item {text}</li>
        ));

        return (
            <ul ref="list" className="block-list">{items}</ul>
        );
    }
};

export default SimpleList;
