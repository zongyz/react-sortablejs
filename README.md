# react-sortablejs
A higher order React component for [Sortable](https://github.com/RubaXa/Sortable).

## Installation
```bash
npm install --save react-sortablejs
```

## Options

See more options at https://github.com/RubaXa/Sortable#options

#### `ref` option
Specify which items inside the `ref` attribute should be sortable.

#### `model` option
The state attribute for creating a sortable list.

## Usage

```js
import React from 'react';
import SortableMixin from 'react-sortablejs';

const sortableOptions = {
    ref: 'list',
    model: 'items'
};

class MySortableComponent extends React.Component {
    state = {
        items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    };
    
    render() {
        const items = this.state.items.map((text, index) => (
            <li key={index}>{text}</li>
        ));
        
        return (
            <div>
                <ul ref="list">{items}</ul>
            </div>
        );
    }
}

export default SortableMixin(MySortableComponent, sortableOptions);
```

## Examples

Using the `group` option to drag elements from one list into another.

File: index.jsx
```js
import React from 'react';
import ReactDOM from 'react-dom';
import Sortable1 from './sortable1';
import Sortable2 from './sortable2';

const SortableList = (props) => {
    return (
        <div>
            <Sortable1 />
            <hr />
            <Sortable2 />
        </div>
    );
};

ReactDOM.render(<SortableList />, document.body);
```

File: sortable1.jsx

```js
import React from 'react';
import SortableMixin from 'react-sortablejs';

class Sortable1 extends React.Component {
    state = {
        items: [0, 1, 2, 3, 4]
    };

    render() {
        let items = this.state.items.map((text, index) => {
            return <li key={index}>{text}</li>;
        });

        return (
            <div>
                <ul ref="list">{items}</ul>
            </div>
        );
    }
}

export default SortableMixin(Sortable1, { group: 'shared' });
```

File: sortable2.jsx

```js
import React from 'react';
import SortableMixin from 'react-sortablejs';

class Sortable2 extends React.Component {
    state = {
        items: [5, 6, 7, 8, 9]
    };

    render() {
        let items = this.state.items.map((text, index) => {
            return <li key={index}>{text}</li>;
        });

        return (
            <div>
                <ul ref="list">{items}</ul>
            </div>
        );
    }
}

export default SortableMixin(Sortable2, { group: 'shared' });
```
