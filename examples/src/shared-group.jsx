import React from 'react';
import Sortable from '../../src';

const sortableOptions = {
    ref: 'list',
    group: {
        name: 'shared',
        pull: true, // 'clone',
        put: true
    }
};

@Sortable(sortableOptions)
class SharedGroup extends React.Component {
    static propTypes = {
        items: React.PropTypes.array
    };

    render() {
        const items = this.props.items.map((text, index) => (
            <li key={index}>{text}</li>
        ));

        return (
            <ul ref="list" className="block-list">{items}</ul>
        );
    }
}

export default SharedGroup;
