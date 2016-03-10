# react-sortablejs
A higher order React component for [Sortable](https://github.com/RubaXa/Sortable).

## Installation
```bash
npm install --save react-sortablejs
```

## Options

See more options at https://github.com/RubaXa/Sortable#options
```js
{
    ref: 'list',
    model: 'items',
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
    
    handleStart(evt) { // Dragging started
    }
    handleEnd(evt) { // Dragging ended
    }
    handleAdd(evt) { // Element is dropped into the list from another list
    }
    handleRemove(evt) { // Element is removed from the list into another list
    }
    handleUpdate(evt) { // Changed sorting within list
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
