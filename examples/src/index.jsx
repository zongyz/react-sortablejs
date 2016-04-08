import extend from 'lodash/extend';
import random from 'lodash/random';
import React from 'react';
import ReactDOM from 'react-dom';
import Sortable from '../../src';
import SimpleList from './simple-list';
import SharedGroup from './shared-group';
import store from './store';

class App extends React.Component {
    state = {
        simpleList: store.get('simpleList'),
        sharedGroup: store.get('sharedGroup')
    };

    componentDidMount() {
        store.on('change', () => {
            this.setState({
                simpleList: store.get('simpleList'),
                sharedGroup: store.get('sharedGroup')
            });
        });
    }
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
        const sharedGroup = extend({}, this.state.sharedGroup);
        sharedGroup.left = sharedGroup.left.concat(items[i]);
        this.setState({ sharedGroup: sharedGroup });
    }
    render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="title">Simple List</div>
                    <div className="row">
                        <div className="col-sm-12">
                            <SimpleList
                                items={this.state.simpleList}
                                onChange={(items, sortable) => {
                                    store.set('simpleList', items);
                                }}
                            />
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
                            <SharedGroup
                                items={this.state.sharedGroup.left}
                                onChange={(items, sortable) => {
                                    store.replace('sharedGroup.left', items);
                                }}
                            />
                        </div>
                        <div className="col-sm-6">
                            <SharedGroup
                                items={this.state.sharedGroup.right}
                                onChange={(items, sortable) => {
                                    store.replace('sharedGroup.right', items);
                                }}
                            />
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
