# react-sortablejs
A higher order React component for [Sortable](https://github.com/RubaXa/Sortable).

## Installation
```bash
npm install --save react-sortablejs
```

## Usage

```js
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
