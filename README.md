# react-sortable [![build status](https://travis-ci.org/cheton/react-sortable.svg?branch=master)](https://travis-ci.org/cheton/react-sortable) [![Coverage Status](https://coveralls.io/repos/cheton/react-sortable/badge.svg)](https://coveralls.io/r/cheton/react-sortable)
[![NPM](https://nodei.co/npm/react-sortablejs.png?downloads=true&stars=true)](https://nodei.co/npm/react-sortablejs/)

A higher order React component for [Sortable](https://github.com/RubaXa/Sortable).

- Demo: http://cheton.github.io/react-sortable
- Live coding at webpackbin: http://www.webpackbin.com/VJe8dfMpe

The sample code can be found in the [examples](https://github.com/cheton/react-sortable/tree/master/examples) directory.

## Installation

### Webpack or Browserify
The easiest way to use react-sortablejs is to install it from npm and include it in your React build process using webpack or browserify.
```bash
npm install --save react-sortablejs
```

Checkout the [examples](https://github.com/cheton/react-sortable/tree/dev/examples) directory for a complete setup.

### Standalone ES5 module
You can create a standalone ES5 module as shown below:
```bash
$ git clone https://github.com/cheton/react-sortable.git
$ cd react-sortable
$ npm install
$ npm run dist
```

Then, include these scripts into your html file:
```html
<body>
  <div id="container"></div>
  <script src="http://fb.me/react-0.14.7.js"></script>
  <script src="http://fb.me/react-dom-0.14.7.js"></script>
  <script src="http://cdnjs.cloudflare.com/ajax/libs/Sortable/1.4.2/Sortable.min.js"></script>
  <script src="dist/react-sortable.min.js"></script>
</body>
```

A simple example without using JSX syntax:
```js
var MySortable = React.createClass({
    displayName: 'MySortable',
    getInitialState: function() {
        return { items: ['Apple', 'Banana', 'Cherry'] };
    },
    render: function() {
        return (
            React.createElement('ul', { ref: "list" },
                this.state.items.map(function(item, key) {
                    return React.createElement('li', { key: key }, item);
                })
            )
        );
    }
});

ReactDOM.render(
    React.createElement(SortableMixin.default({ ref: 'list', model: 'items' })(MySortable), null),
    document.getElementById('container')
);
```

## Options

#### `ref` option
Specify which items inside the `ref` attribute should be sortable.

#### `model` option
The state attribute for creating a sortable list.


See more options at https://github.com/RubaXa/Sortable#options
```js
{
    ref: 'list',
    model: 'items',
    onStart: 'handleStart',
    onEnd: 'handleEnd',
    onAdd: 'handleAdd',
    onUpdate: 'handleUpdate',
    onRemove: 'handleRemove',
    onSort: 'handleSort',
    onFilter: 'handleFilter',
    onMove: 'handleMove',
    // Sortable options
    group: "name",  // or { name: "...", pull: [true, false, clone], put: [true, false, array] }
    sort: true,  // sorting inside list
    delay: 0, // time in milliseconds to define when the sorting should start
    disabled: false, // Disables the sortable if set to true.
    store: null,  // @see Store
    animation: 150,  // ms, animation speed moving items when sorting, `0` — without animation
    handle: ".my-handle",  // Drag handle selector within list items
    filter: ".ignore-elements",  // Selectors that do not lead to dragging (String or Function)
    draggable: ".item",  // Specifies which items inside the element should be sortable
    ghostClass: "sortable-ghost",  // Class name for the drop placeholder
    chosenClass: "sortable-chosen",  // Class name for the chosen item
    dataIdAttr: 'data-id',
    forceFallback: false,  // ignore the HTML5 DnD behaviour and force the fallback to kick in
    fallbackClass: "sortable-fallback"  // Class name for the cloned DOM Element when using forceFallback
    fallbackOnBody: false  // Appends the cloned DOM Element into the Document's Body
    scroll: true, // or HTMLElement
    scrollSensitivity: 30, // px, how near the mouse must be to an edge to start scrolling.
    scrollSpeed: 10, // px
    setData: function (dataTransfer, dragEl) {
        dataTransfer.setData('Text', dragEl.textContent);
    }
}
```

## Usage

```js
import React from 'react';
import Sortable from 'react-sortablejs';

class MySortableList extends React.Component {
    static propTypes = {
        items: React.PropTypes.array
    };
    static defaultProps = {
        items: []
    };
    state = {
        items: this.props.items
    };
    
    handleStart(evt) { // Dragging started
    }
    handleEnd(evt) { // Dragging ended
    }
    handleAdd(evt) { // Element is dropped into the list from another list
    }
    handleUpdate(evt) { // Changed sorting within list
    }
    handleRemove(evt) { // Element is removed from the list into another list
    }
    handleSort(evt) { // Called by any change to the list (add / update / remove)
    }
    handleFilter(evt) { // Attempt to drag a filtered element
    }
    handleMove(evt) { // Event when you move an item in the list or between lists
    }
    render() {
        const items = this.state.items.map((val, index) => (
            <li key={index}>{val}</li>
        ));

        return (
            <div>
                <ul ref="list">{items}</ul>
            </div>
        );
    }
}

const sortableOptions = {
    ref: 'list',
    model: 'items'
};
export default Sortable(sortableOptions)(MySortableList);
```

You can also use HOCs as ES7 decorators:
```js
import React from 'react';
import Sortable from 'react-sortablejs';

@Sortable({ ref: 'list', model: 'items' })
export default class SortableList extends React.Component {
    ...
}
```

## Examples

### Simple List

File: index.jsx
```js
import React from 'react';
import ReactDOM from 'react-dom';
import SimpleList from './simple-list';

ReactDOM.render(
    <SimpleList items={[1, 2, 3, 4, 5, 6]} />,
    document.getElementById('container')
);
```

File: simple-list.jsx
```js
import React from 'react';
import Sortable from 'react-sortablejs';

const sortableOptions = {
    ref: 'list',
    model: 'items'
};

class SimpleList extends React.Component {
    static propTypes = {
        items: React.PropTypes.array
    };
    static defaultProps = {
        items: []
    };
    state = {
        items: this.props.items
    };
    
    render() {
        const items = this.state.items.map((val, index) => (
            <li key={index}>{val}</li>
        ));
        
        return (
            <div>
                <ul ref="list">{items}</ul>
            </div>
        );
    }
}

export default Sortable(sortableOptions)(SimpleList);
```

### Shared Group
Using the `group` option to drag elements from one list into another.

File: index.jsx
```js
import React from 'react';
import ReactDOM from 'react-dom';
import SharedGroup from './shared-group';

const SortableList = (props) => {
    return (
        <div>
            <SharedGroup
                items={['Apple', 'Banaba', 'Cherry', 'Grape']}
            />
            <SharedGroup
                items={['Lemon', 'Orange', 'Pear', 'Peach']}
            />
        </div>
    );
};

ReactDOM.render(<SortableList />, document.getElementById('container'));
```

File: shared-group.jsx
```js
import React from 'react';
import Sortable from 'react-sortablejs';

const sortableOptions = {
    ref: 'list',
    model: 'items',
    group: 'shared'
};

class SharedGroup extends React.Component {
    static propTypes = {
        items: React.PropTypes.array
    };
    static defaultProps = {
        items: []
    };
    state = {
        items: this.props.items
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

export default Sortable(sortableOptions)(SharedGroup);
```
