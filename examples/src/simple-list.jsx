import React from 'react';
import Sortable from 'react-sortablejs';

const sortableOptions = {
    ref: 'list'
};

@Sortable(sortableOptions)
export default class SimpleList extends React.Component {
    state = {
        items: [1, 2, 3, 4, 5, 6]
    };
    
    render() {
        const items = this.state.items.map((text, index) => (
            <li key={index}>List Item {text}</li>
        ));
        
        return (
            <ul ref="list" className="block-list">{items}</ul>
        );
    }
}
