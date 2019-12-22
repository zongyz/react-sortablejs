import {
  Children,
  cloneElement,
  Component,
  createElement,
  createRef,
  ReactElement,
  RefObject
} from "react";
import Sortable, { MoveEvent, Options, SortableEvent } from "sortablejs";
import {
  AllMethodsExceptMove,
  HandledMethodNames,
  ItemInterface,
  ReactSortableProps,
  Store,
  UnHandledMethodNames
} from "./types";
import { destructurePropsForOptions, insertNodeAt, removeNode } from "./util";
import classNames from "classnames";

/** Holds a global reference for which react element is being dragged */
const store: Store = { dragging: null };
/**
 * React is built for synchornizing data with the browser.
 *
 * Data should be an object.
 */
export class ReactSortable<T extends ItemInterface> extends Component<
  ReactSortableProps<T>
> {
  private ref: RefObject<HTMLElement>;

  static defaultProps: Partial<ReactSortableProps<any>> = {
    clone: item => item
  };

  constructor(props: ReactSortableProps<T>) {
    super(props);
    /** @todo forward ref this component */
    this.ref = createRef<HTMLElement>();
    //@ts-ignore
    if (props.plugins)
      throw new Error(`
DO NOT USE THE PLUGINS PROP TO MOUNT PLUGINS!

Instead, mount it with "Sortable.mount(new MultiDrag())"

Please read the updated README.md at https://github.com/SortableJS/react-sortablejs.
`);
    }

  componentDidMount() {
    if (this.ref.current === null) return;
    const newOptions = this.makeOptions();
    Sortable.create(this.ref.current, newOptions);
  }

  render() {
    const { tag, style, className, id } = this.props;
    const classicProps = { style, className, id };

    /** if no tag, default to a `div` element */
    const newTag = !tag || tag === null ? "div" : tag;
    return createElement(
      newTag,
      {
        /** @todo find a way (perhaps with the callback) to allow AntD components to work */
        ref: this.ref,
        ...classicProps
      },
      this.getChildren()
    );
  }

  private getChildren() {
    const {
      children,
      dataIdAttr,
      className: prevClassName,
      selectedClass = "sortable-selected",
      chosenClass = "sortable-chosen",
      dragClass = "sortable-drag",
      fallbackClass = "sortable-falback",
      ghostClass = "sortable-ghost",
      swapClass = "sortable-swap-highlight",
      filter = "sortable-filter",
      list
    } = this.props;

    // if no children, don't do anything.
    if (!children || children == null) return null;
    const dataid = dataIdAttr || "data-id";

    return Children.map(children as ReactElement<any>[], (child, index) => {
      const item = list[index];
    );
  }
      // @todo - handle the function if avalable. I don't think anyone will be doing this soon.
      const filtered = typeof filter === "string" && {
        [filter]: !!item.filtered
      };

      const className = classNames(prevClassName, {
        [selectedClass]: item.selected,
        [chosenClass]: item.chosen,
        ...filtered
        // [dragClass]: true,
        // [fallbackClass]: true,
        // [ghostClass]: true,
        // [swapClass]: true
      });

      return cloneElement(child, {
        [dataid]: child.key,
        className
      });
    });
  }

  /** Appends the `sortable` property to this component */
  private get sortable(): Sortable | null {
    const el = this.ref.current;
    if (el === null) return null;
    const key = Object.keys(el).find(k => k.includes("Sortable"));
    if (!key) return null;
    //@ts-ignore - I know what I'm doing.
    return el[key] as Sortable;
  }

  /** Converts all the props from `ReactSortable` into the `options` object that `Sortable.create(el, [options])` can use. */
  makeOptions(): Options {
    const DOMHandlers: HandledMethodNames[] = [
      "onAdd",
      "onUpdate",
      "onRemove",
      "onStart",
      "onEnd",
      "onSpill",
      "onClone"
    ];
    const NonDOMHandlers: UnHandledMethodNames[] = [
      "onUnchoose",
      "onChoose",
      "onFilter",
      "onSort",
      "onChange"
    ];
    const newOptions: Options = destructurePropsForOptions(this.props);
    DOMHandlers.forEach(
      name => (newOptions[name] = this.prepareOnHandlerPropAndDOM(name))
    );
    NonDOMHandlers.forEach(
      name => (newOptions[name] = this.prepareOnHandlerProp(name))
    );

    /** onMove has 2 arguments and needs to be handled seperately. */
    const onMove = (evt: MoveEvent, originalEvt: Event) => {
      const { onMove } = this.props;
      const defaultValue = evt.willInsertAfter || -1;
      if (!onMove) return defaultValue;
      return onMove(evt, originalEvt, this.sortable, store) || defaultValue;
    };

    return {
      ...newOptions,
      onMove
    };
  }

  /** Prepares a method that will be used in the sortable options to call an `on[Handler]` prop & an `on[Handler]` ReactSortable method.  */
  prepareOnHandlerPropAndDOM(evtName: HandledMethodNames) {
    return (evt: SortableEvent) => {
      // call the component prop
      this.callOnHandlerProp(evt, evtName);
      // calls state change
      //@ts-ignore - until @types multidrag item is in
      this[evtName](evt);
    };
  }

  /** Prepares a method that will be used in the sortable options to call an `on[Handler]` prop */
  prepareOnHandlerProp(
    evtName: Exclude<AllMethodsExceptMove, HandledMethodNames>
  ) {
    return (evt: SortableEvent) => {
      // call the component prop
      this.callOnHandlerProp(evt, evtName);
    };
  }

  /** Calls the `props.on[Handler]` function */
  callOnHandlerProp(evt: SortableEvent, evtName: AllMethodsExceptMove) {
    const propEvent = this.props[evtName];
    if (propEvent) propEvent(evt, this.sortable, store);
  }

  // SORTABLE DOM HANDLING

  /** Called when an element is dropped into the list from another list */
  onAdd(evt: SortableEvent) {
    const { list, setList } = this.props;
    removeNode(evt.item);

    const newState: T[] = [...list];
    const newItem = store.dragging!.props.list[evt.oldIndex!];
    newState.splice(evt.newIndex!, 0, newItem);
    setList(newState, this.sortable, store);
  }

  /** Called when an element is removed from the list into another list */
  onRemove(evt: SortableEvent) {
    const { item, from, oldIndex, clone, pullMode } = evt;
    insertNodeAt(from, item, oldIndex!);
    const { list, setList } = this.props;
    const newState: T[] = [...list];
    if (pullMode === "clone") {
      removeNode(clone);

      const [oldItem] = newState.splice(oldIndex!, 1);
      const newItem = this.props.clone!(oldItem, evt);

      newState.splice(oldIndex!, 0, newItem);
      setList(newState, this.sortable, store);
      return;
    }
    newState.splice(oldIndex!, 1);
    setList(newState, this.sortable, store);
  }

  /** Called when sorting is changed within the same list */
  onUpdate(evt: MultiDragEvent) {
    const mode = (() => {
      if (evt.oldIndicies.length > 0) return "multidrag";
      if (evt.swapItem) return "swap";
      return "normal";
    })();

    switch (mode) {
      case "normal": {
        removeNode(evt.item);
        insertNodeAt(evt.from, evt.item, evt.oldIndex!);

        const { list, setList } = this.props;
        const newState: T[] = [...list];
        const [oldItem] = newState.splice(evt.oldIndex!, 1);
        newState.splice(evt.newIndex!, 0, oldItem);
        return setList(newState, this.sortable, store);
      }
      case "swap": {
        // item that was dragged
        removeNode(evt.item);
        insertNodeAt(evt.from, evt.item, evt.oldIndex!);

        // item that was landed on for the swap
        removeNode(evt.swapItem!);
        insertNodeAt(evt.from, evt.swapItem!, evt.newIndex!);

        const { list, setList } = this.props;
        const newState: T[] = [...list];

        const customs = [
          {
            element: evt.item,
            oldIndex: evt.oldIndex!,
            newIndex: evt.newIndex!
          },
          {
            element: evt.swapItem!,
            oldIndex: evt.newIndex!,
            newIndex: evt.oldIndex!
          }
        ]
          .map(curr => ({ ...curr, item: newState[curr.oldIndex] }))
          .sort((a, b) => a.oldIndex - b.oldIndex);

        // DOM element management
        customs.forEach(curr => removeNode(curr.element));
        customs.forEach(curr =>
          insertNodeAt(evt.from, curr.element, curr.oldIndex)
        );

        customs.reverse().forEach(curr => newState.splice(curr.oldIndex, 1));
        customs.forEach(curr => newState.splice(curr.newIndex, 0, curr.item));

        return setList(newState, this.sortable, store);
      }
      case "multidrag": {
        const newOldIndices = evt.oldIndicies.map((curr, index) => ({
          element: curr.multiDragElement,
          oldIndex: curr.index,
          newIndex: evt.newIndicies[index].index
        }));

        // DOM element management
        newOldIndices.forEach(curr => removeNode(curr.element));
        newOldIndices.forEach(curr =>
          insertNodeAt(evt.from, curr.element, curr.oldIndex)
        );

        const { list, setList } = this.props;
        const newState: T[] = [...list];

        newOldIndices
          // remove old items in state, starting from the end.
          .reverse()
          .map(curr => ({
            ...curr,
            item: newState.splice(curr.oldIndex, 1).pop()
          }))
          // insert new items, starting from the front.
          .reverse()
          .forEach(curr => {
            newState.splice(curr.newIndex, 0, curr.item!);
          });
        return setList(newState, this.sortable, store);
      }
    }
  }

  /** Called when the dragging starts */
  onStart(evt: SortableEvent) {
    store.dragging = this;
  }

  /** Called when the dragging ends */
  onEnd(evt: SortableEvent) {
    store.dragging = null;
  }

  /** Called when the `onSpill` plugin is activated */
  onSpill(evt: SortableEvent) {
    const { removeOnSpill, revertOnSpill } = this.props;
    if (removeOnSpill && !revertOnSpill) removeNode(evt.item);
  }

  /** Called when a clone is made. It replaces an element in with a function */
  onClone(evt: SortableEvent) {
    // are we in the same list? if so, do nothing
  }

  /** @todo */
  onSelect(evt: SortableEvent) {
    const { oldIndex, newIndex } = evt;
    // append the class name the classes of the item
    // do it on the item?
    // a seperate state?
  }

  /** @todo */
  onDeselect(evt: SortableEvent) {
    // remove the clast name of the child
  }
}


// everything below this point can be removes 
// once @types has been merged. PR submited
interface MultiIndices {
  multiDragElement: HTMLElement;
  index: number;
}

interface MultiDragEvent extends SortableEvent {
  oldIndicies: MultiIndices[];
  newIndicies: MultiIndices[];
  swapItem: HTMLElement | null;
}
