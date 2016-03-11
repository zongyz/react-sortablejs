# react-sortable [![build status](https://travis-ci.org/cheton/react-sortable.svg?branch=master)](https://travis-ci.org/cheton/react-sortable) [![Coverage Status](https://coveralls.io/repos/cheton/react-sortable/badge.svg)](https://coveralls.io/r/cheton/react-sortable)
[![NPM](https://nodei.co/npm/react-sortablejs.png?downloads=true&stars=true)](https://nodei.co/npm/react-sortablejs/)

A higher order React component for [Sortable](https://github.com/RubaXa/Sortable).

Demo: http://cheton.github.io/react-sortable

The sample code can be found in the [examples](https://github.com/cheton/react-sortable/examples) directory.

## Installation
The easiest way to use react-sortablejs is to install it from npm and include it in your React build process using webpack or browserify.
```bash
npm install --save react-sortablejs
```

You can create a standalone module using webpack:
```bash
$ npm install
$ webpack
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
import SortableMixin from 'react-sortablejs';

const sortableOptions = {
    ref: 'list',
    model: 'items'
};

class MySortableComponent extends React.Component {
    state = {
        items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
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
