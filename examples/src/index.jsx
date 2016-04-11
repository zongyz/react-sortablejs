import extend from 'lodash/extend';
import random from 'lodash/random';
import uniq from 'lodash/uniq';
import React from 'react';
import ReactDOM from 'react-dom';
import Sortable from '../../src';
import store from './store';

class App extends React.Component {
    state = {
        simpleList: [1, 2, 3, 4, 5, 6],
        groupLeft: ['Apple', 'Banana', 'Cherry', 'Grape'],
        groupRight: ['Lemon', 'Orange', 'Pear', 'Peach'],
        cloneUncontrolled: ['Apple', 'Banana', 'Cherry', 'Guava', 'Grape', 'Kiwi', 'Lemon', 'Melon', 'Orange', 'Pear', 'Peach', 'Strawberry'],
        cloneControlledSource: ['Apple', 'Banana', 'Cherry', 'Guava', 'Grape', 'Kiwi', 'Lemon', 'Melon', 'Orange', 'Pear', 'Peach', 'Strawberry'],
        cloneControlledTarget: []
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
            <li key={key} data-id={val}>List Item {val}</li>
        ));
        const groupLeft = this.state.groupLeft.map((val, key) => (
            <div key={key} data-id={val}>{val}</div>
        ));
        const groupRight = this.state.groupRight.map((val, key) => (
            <div key={key} data-id={val}>{val}</div>
        ));
        const cloneUncontrolled = this.state.cloneUncontrolled.map((val, key) => (
            <li key={key} data-id={val}>{val}</li>
        ));
        const cloneControlledSource = this.state.cloneControlledSource.map((val, key) => (
            <li key={key} data-id={val}>{val}</li>
        ));
        const cloneControlledTarget = this.state.cloneControlledTarget.map((val, key) => (
            <li key={key} data-id={val}>{val}</li>
        ));

        return (
            <div>
                <div className="container-fluid" style={{marginTop: 50}}>
                    <div className="title">Simple List</div>
                    <div className="row">
                        <div className="col-sm-12">
                            <Sortable
                                tag="ul"
                                className="block-list"
                            >
                                {simpleList}
                            </Sortable>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="title" style={{marginTop: 50}}>Shared Group</div>
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
                                group={{
                                    name: 'shared',
                                    pull: true,
                                    put: true
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
                <div className="container-fluid">
                    <div className="title" style={{marginTop: 50}}>Uncontrolled Component</div>
                    <h4>Clone items from left to right with duplicate DOM elements.</h4>
                    <div className="row">
                        <div className="col-sm-6">
                            <Sortable
                                ref="group-left"
                                tag="ul"
                                className="block-list"
                                sort={false}
                                group={{
                                    name: 'shared',
                                    pull: 'clone',
                                    put: false
                                }}
                            >
                                {cloneUncontrolled}
                            </Sortable>
                        </div>
                        <div className="col-sm-6">
                            <Sortable
                                ref="group-right"
                                tag="ul"
                                className="block-list"
                                group={{
                                    name: 'shared',
                                    pull: false,
                                    put: true
                                }}
                            >
                            </Sortable>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="title" style={{marginTop: 50}}>Controlled Component</div>
                    <h4>Clone items from left to right without duplication.</h4>
                    <div className="row">
                        <div className="col-sm-6">
                            <Sortable
                                ref="group-left"
                                tag="ul"
                                className="block-list"
                                sort={false}
                                group={{
                                    name: 'shared',
                                    pull: 'clone',
                                    put: false
                                }}
                                onChange={(items) => {
                                    this.setState({ cloneControlledSource: items });
                                }}
                            >
                                {cloneControlledSource}
                            </Sortable>
                        </div>
                        <div className="col-sm-6">
                            <Sortable
                                ref="group-right"
                                tag="ul"
                                className="block-list"
                                group={{
                                    name: 'shared',
                                    pull: false,
                                    put: true
                                }}
                                onChange={(items) => {
                                    items = uniq(items); // Remove duplicate items
                                    this.setState({ cloneControlledTarget: items });
                                }}
                            >
                                {cloneControlledTarget}
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
