import extend from 'lodash/extend';
import random from 'lodash/random';
import React from 'react';
import ReactDOM from 'react-dom';
import Sortable from '../../src';
import store from './store';

class App extends React.Component {
    state = {
        simpleList: [1, 2, 3, 4, 5, 6],
        groupLeft: ['Apple', 'Banana', 'Cherry', 'Grape'],
        groupRight: ['Lemon', 'Orange', 'Pear', 'Peach']
    };

    addMoreItems() {
        const items = [
            'Apple',
            'Banana',
            'Cherry',
            'Guava',
            'Grape',
            'Kiwi',
            'Lemon',
            'Melon',
            'Orange',
            'Pear',
            'Peach',
            'Strawberry'
        ];
        const i = random(0, items.length - 1);
        this.setState({ groupLeft: this.state.groupLeft.concat(items[i]) });
    }
    render() {
        const simpleList = this.state.simpleList.map((val, key) => (
            <div key={key} data-id={val}>List Item {val}</div>
        ));
        const groupLeft = this.state.groupLeft.map((val, key) => (
            <div key={key} data-id={val}>{val}</div>
        ));
        const groupRight = this.state.groupRight.map((val, key) => (
            <div key={key} data-id={val}>{val}</div>
        ));

        return (
            <div>
                <div className="container-fluid">
                    <div className="title">Simple List</div>
                    <div className="row">
                        <div className="col-sm-12">
                            <Sortable
                                className="block-list"
                            >
                                {simpleList}
                            </Sortable>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="title" style={{marginTop: 100}}>Shared Group</div>
                    <div className="form-group">
                        <button
                            type="button"
                            className="btn btn-default"
                            onClick={::this.addMoreItems}
                        >
                            Add more items
                        </button>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <Sortable
                                ref="group-left"
                                className="block-list"
                                sort={false}
                                group={{
                                    name: 'shared',
                                    pull: 'clone',
                                    put: false
                                }}
                                onChange={(items) => {
                                    this.setState({ groupLeft: items });
                                }}
                            >
                                {groupLeft}
                            </Sortable>
                        </div>
                        <div className="col-sm-6">
                            <Sortable
                                ref="group-right"
                                className="block-list"
                                group={{
                                    name: 'shared',
                                    pull: true,
                                    put: true
                                }}
                                onChange={(items) => {
                                    this.setState({ groupRight: items });
                                }}
                            >
                                {groupRight}
                            </Sortable>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('container')
);
