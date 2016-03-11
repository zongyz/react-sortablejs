import React from 'react';
import ReactDOM from 'react-dom';
import Sortable from 'react-sortablejs';
import SimpleList from './simple-list';
import SharedGroup from './shared-group';

ReactDOM.render(
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
            <div className="row">
                <div className="col-sm-6">
                    <SharedGroup
                        items={['Apple', 'Banaba', 'Cherry', 'Grape']}
                    />
                </div>
                <div className="col-sm-6">
                    <SharedGroup
                        items={['Lemon', 'Orange', 'Pear', 'Peach']}
                    />
                </div>
            </div>
        </div>
    </div>,
    document.getElementById('container')
);
