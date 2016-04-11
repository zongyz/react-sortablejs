# react-sortable [![build status](https://travis-ci.org/cheton/react-sortable.svg?branch=master)](https://travis-ci.org/cheton/react-sortable) [![Coverage Status](https://coveralls.io/repos/cheton/react-sortable/badge.svg)](https://coveralls.io/r/cheton/react-sortable)
[![NPM](https://nodei.co/npm/react-sortablejs.png?downloads=true&stars=true)](https://nodei.co/npm/react-sortablejs/)

A higher order React component for [Sortable](https://github.com/RubaXa/Sortable).

- Demo: http://cheton.github.io/react-sortable
- Live Coding at WebpackBin: http://www.webpackbin.com/VJe8dfMpe

The sample code can be found in the [examples](https://github.com/cheton/react-sortable/tree/master/examples) directory.


## Notice
There is a major breaking change since v1.0. Checkout [Migration Guide](https://github.com/i18next/i18next-scanner/wiki/Migration-Guide) while upgrading from earlier versions.

## Installation

### Webpack or Browserify
The easiest way to use react-sortablejs is to install it from npm and include it in your React build process using webpack or browserify.
```bash
npm install --save react react-dom sortablejs  # Install peerDependencies
npm install --save react-sortablejs
```

Checkout the [examples](https://github.com/cheton/react-sortable/tree/dev/examples) directory for a complete setup.

### Standalone ES5 module
You can create a standalone ES5 module as shown below:
```bash
$ git clone https://github.com/cheton/react-sortable.git
$ cd react-sortable
$ npm install
$ npm run build && npm run dist
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

## Usage
File: sortable-list.jsx
```jsx
import React from 'react';
import Sortable from 'react-sortable';

// Functional Component
const SortableList = ({ items }) => {
    let sortable = null; // the sortable instance
    
    items = items.map((val, key) => (<li key={key} data-id={val}>List Item: {val}</li>));

    return (
        <Sortable
            // Sortable options (https://github.com/RubaXa/Sortable#options)
            options={{
            }}

            // Use ref to get the sortable instance
            // https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute
            ref={(c) => {
                if (c) {
                    sortable = c.sortable;
                }
            }}

            // An optional tag to specify the wrapping element. Defaults to "div".
            tag="ul"

            // The optional onChange method allows you to keep DOM nodes untouched
            // and render the sorted items via state change.
            // See an example at https://github.com/cheton/react-sortable/#controlled-component
            // onChange={(order) => {
            //     this.setState({ items: order });
            // }}
        >
            {items}
        </Sortable>
    );
};

SortableList.propTypes = {
    items: React.PropTypes.array
};

export default SortableList;
```

File: index.jsx
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import SortableList from './sortable-list';

ReactDOM.render(
    <SortableList items={[1, 2, 3, 4, 5, 6]} />,
    document.getElementById('container')
);
```

## Examples

### Uncontrolled Component
```js
import React from 'react';
import Sortable from 'react-sortablejs';

class App extends React.Component {
    state = {
        items: ['Apple', 'Banana', 'Cherry', 'Guava', 'Peach', 'Strawberry']
    };
    
    sortable = null;
    
    handleReverseOrder() {
        const order = this.sortable.toArray();
        this.sortable.sort(order.reverse());
    }
    render() {
        const items = this.state.items.map((val, key) => (<li key={key} data-id={val}>{val}</li>));
        
        retrun (
            <div>
                <button type="button" onClick={::this.handleReverseOrder}>Reverse Order</button>
                <Sortable
                    // See all Sortable options at https://github.com/RubaXa/Sortable#options
                    options={{
                        handle: ".my-handle", // Drag handle selector within list items
                        draggable: ".item" // Specifies which items inside the element should be sortable
                    }}
                    ref={(c) => {
                        if (c) {
                            this.sortable = sortable;
                        }
                    }}
                    tag="ul" // Defaults to "div"
                >
                    {items}
                </Sortable>
            </div>
        );
    }
}
```

### Controlled Component

```js
import React from 'react';
import Sortable from 'react-sortablejs';

class App extends React.Component {
    state = {
        items: ['Apple', 'Banana', 'Cherry', 'Guava', 'Peach', 'Strawberry']
    };
    
    sortable = null;
    
    handleReverseOrder() {
        const order = this.sortable.toArray();
        this.sortable.sort(order.reverse());
    }
    render() {
        const items = this.state.items.map((val, key) => (<li key={key} data-id={val}>{val}</li>));
        
        retrun (
            <div>
                <button type="button" onClick={::this.handleReverseOrder}>Reverse Order</button>
                <Sortable
                    // See all Sortable options at https://github.com/RubaXa/Sortable#options
                    options={{
                        handle: ".my-handle", // Drag handle selector within list items
                        draggable: ".item" // Specifies which items inside the element should be sortable
                    }}
                    ref={(c) => {
                        if (c) {
                            this.sortable = sortable;
                        }
                    }}
                    tag="ul" // Defaults to "div"
                    onChange={(order, sortable) { // [Optional] Controlled Component
                        this.setState({ items: order });
                    }}
                >
                    {items}
                </Sortable>
            </div>
        );
    }
}
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

const SharedGroup = ({ items }) => {
    item = items.map(item => <li>{item}</li>);

    return (
        <Sortable
            // See all Sortable options at https://github.com/RubaXa/Sortable#options
            options={{
                group: 'shared'
            }}
            tag="ul"
        >
            {items}
        </Sortable>
    );
};

export default SharedGroup;
```
