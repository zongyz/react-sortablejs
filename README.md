# `react-sortablejs`

React component wrapping [SortableJS](https://github.com/SortableJS/Sortable)!

We're now on version 2.0! A major API overhaul with typescript types.

Consider trying it out if you had any troubles earlier.

## Things still to do.

We've released version 2.0,

- [x] Create examples from [SortableJS Examples](https://sortablejs.github.io/Sortable/)
- [ ] Create all tests for examples (for 'ron)
  - Currently weve got a few.
- [ ] Test the following UI component libraries:
  - [x] Styled Components
  - [ ] AntD
  - [ ] MaterialUI
  - [ ] React Bootstrap
  - [ ] React Grommet
  - [ ] React Toolbox
  - [ ] Your suggestion? :)

## Features

### SortableJS

Everything you love about SortableJS, including to but not limited to:

- [x] Drag and Drop between lists
- [x] Multidrag and Swap plugin support.

### Component Specific

- [x] Calculates items in list automatically
- [x] Updated API via `props`. Feels more like react than ever before.
- [x] Compatible with third part UI libraries
- [x] SortableJS Plugin Support

If you find any features lacking, create an issue and/or pull request.

## Installation

```shell
npm install --save react-sortablejs-typescript
# OR
yarn add react-sortablejs-typescript
```

## What you should endeavour to know.

- Explore the [Sortable Options API](https://github.com/SortableJS/Sortable#options)
- Array.map
- React.forwardRef

## Usage/Examples

### Function Component

```tsx
import React, { FC, useState } from "react";
import { ReactSortable } from "react-sortablejs-typescript";

interface ItemType {
  id: number;
  name: string;
}

export const BasicFunction: FC = props => {
  const [state, setState] = useState<ItemType[]>([
    { id: 1, name: "shrek" },
    { id: 2, name: "fiona" }
  ]);

  return (
    <ReactSortable list={state} setList={setState}>
      {state.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </ReactSortable>
  );
};
```

### Class Component

```tsx
import React, { Component } from "react";
import { ReactSortable } from "react-sortablejs-typescript";

interface BasicClassState {
  list: { id: string; name: string }[];
}

export class BasicClass extends Component<{}, BasicClassState> {
  state: BasicClassState = {
    list: [{ id: "1", name: "shrek" }]
  };
  render() {
    return (
      <ReactSortable
        list={this.state.list}
        setList={newState => this.setState({ list: newState })}
      >
        {this.state.list.map(item => (
          <div key={item.id}>{item.name}</div>
        ))}
      </ReactSortable>
    );
  }
}
```

### ReactSortable renders a `div` as the parent by default.

ReactSortable is a `div` element by default. This can be changed to be any HTML element (for example `ul`, `ol`)
or can be a React component.

This value, be the component or the HTML element should be passed down under `props.tag`.

Let's explore both here.

#### HTML Element

Here we will use a `ul`. You can use any HTML.
Just add the string and ReactSortable will use a `li` instead of a `div`.

```tsx
import React, { FC, useState, forwardRef } from "react";
import { ReactSortable } from "react-sortablejs-typescript";

interface ItemType {
  id: string;
  name: string;
}

export const BasicFunction: FC = props => {
  const [state, setState] = useState<ItemType[]>([{ id: "1", name: "shrek" }]);

  return (
    <ReactSortable tag="ul" list={state} setList={setState}>
      {state.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </ReactSortable>
  );
};
```

#### Custom Component

When using a custom component in the `tag` prop, the only component it allows is a `forwardRef` component.

#### Solution

If it doesn't have one, you can add one using `React.forwardRef()`.
This fantastic API allows the ref to be visible when creating components.

Use this when third party UI libraries.

**NOTE:** You may experience inconsistencies with this until we launch the proper version.

> todo: Some third party UI components may have nested elements to create the look they're after.
> This could be an issue and not sure how to fix.

```tsx
import React, { FC, useState, forwardRef } from "react";
import { ReactSortable } from "react-sortablejs-typescript";

interface ItemType {
  id: string;
  name: string;
}

// This is just like a normal component, but the
const CustomComponent = forwardRef<HTMLDivElement, any>((props, ref) => {
  return <div ref={ref}>{props.children}</div>;
});

export const BasicFunction: FC = props => {
  const [state, setState] = useState<ItemType[]>([
    { id: 1, name: "shrek" },
    { id: 2, name: "fiona" }
  ]);

  return (
    <ReactSortable tag={CustomComponent} list={state} setList={setState}>
      {state.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </ReactSortable>
  );
};
```

## How does it work?

Sortable affects the DOM, adding, and removing nodes/css when it needs to in order to achieve the smooth transitions we all know an love.
This component reverses many of it's actions of the DOM so React can handle this when the state changes.

## Caveats / Gotchas

### `key !== index`

DO NOT use the index as a key for your list items. Sorting will not work.

In all the examples above, I used an object with an ID. You should do the same!

I may even enforce this into the design to eliminate errors.

### `setState()`

#### Problem

`setState` takes one argument only. If we look in the type defs, it does say that it has a second argument, but it is already deprecated. ReactSortable passes three arguments to `setState`.

If you pass the `setState` straight from a `useState` hook, it will work as expected. However, there will be a warning in the console:

> Warning: State updates from the useState() and useReducer() Hooks don't support the second callback argument.
> To execute a side effect after rendering, declare it in the component body with useEffect().

It's just a warning and there's nothing to worry about. Nothing will break if you leave the messages there.

```tsx
import React, { FC, useState } from "react";
import { ReactSortable } from "react-sortablejs-typescript";

interface ItemType {
  id: string;
  name: string;
}

export const BasicFunction: FC = props => {
  const [state, setState] = useState<ItemType[]>([{ id: "1", name: "shrek" }]);

  return (
    <ReactSortable
      list={state}
      // will cause warnings in dev mode only.
      setList={setState}
    >
      {state.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </ReactSortable>
  );
};
```

This is just a warning, but can be annoying when developing.

Instead of passing `setState` in directly, be explicit in your callback:

```tsx
import React, { FC, useState } from "react";
import { ReactSortable } from "react-sortablejs-typescript";

interface ItemType {
  id: string;
  name: string;
}

export const BasicFunction: FC = props => {
  const [state, setState] = useState<ItemType[]>([{ id: "1", name: "shrek" }]);

  return (
    // `sortable` and `store` arguments are here just to show what arguments have been passed.
    // They are not required to be used and you shouldn't really need them.
    <ReactSortable
      list={state}
      // will not cause warnings in dev mode only.
      setList={(newState, sortable, store) => setState(newState)}
    >
      {state.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </ReactSortable>
  );
};
```

### Nesting

#### Problem

Basically the child updates the state twice. I'm working on this.

#### What does work?

Our usage indicates that as long as we only move items between lists that don't use the same `setState` function.

I hope to provide an example soon.

#### Solutions

We don't have anything that works 100%, but here I'd like to spit ball some potential avenues to look down.

- Use `onMove` to handle state changes instead of `onAdd`,`onRemove`, etc.
- Create a Sortable plugin specifically for react-sortbalejs
