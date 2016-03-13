import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import Sortable from 'react-sortablejs';
import SimpleList from './simple-list';
import SharedGroup from './shared-group';

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

class App extends React.Component {
    state = {
        left: ['Apple', 'Banaba', 'Cherry', 'Grape'],
        right: ['Lemon', 'Orange', 'Pear', 'Peach']
    };

    handleClick() {
        const i = _.random(0, items.length - 1);
        const state = this.state.left.concat(items[i]);
        this.setState({ left: state });
    }
    render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="title">Simple List</div>
                    <div className="row">
                        <div className="col-sm-12">
                            <SimpleList />
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="title" style={{marginTop: 100}}>Shared Group</div>
                    <div className="form-group">
                        <button
                            type="button"
                            className="btn btn-default"
                            onClick={::this.handleClick}
                        >
                            Add more items
                        </button>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <SharedGroup
                                items={this.state.left}
                            />
                        </div>
                        <div className="col-sm-6">
                            <SharedGroup
                                items={this.state.right}
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
