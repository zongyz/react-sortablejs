import classNames from "classnames";
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
import {
  createNormalized,
  destructurePropsForOptions,
  getMode,
  handleDOMChanges,
  handleStateChanges,
  Input,
  insertNodeAt,
  removeNode
} from "./util";

/** Holds a global reference for which react element is being dragged */
// @todo - use context to manage this. How does one use 2 different providers?
const store: Store = { dragging: null };

export class ReactSortable<T extends ItemInterface> extends Component<
  ReactSortableProps<T>
> {
  static defaultProps: Partial<ReactSortableProps<any>> = {
    clone: item => item
  };

  private ref: RefObject<HTMLElement>;
  constructor(props: ReactSortableProps<T>) {
    super(props);
    // @todo forward ref this component
    this.ref = createRef<HTMLElement>();

    // make all state false because we can't change sortable unless a mouse gesture is made.
    const newList = [...props.list].map(item => ({
      ...item,
      chosen: false,
      selected: false
    }));

    props.setList(newList, this.sortable, store);

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
        // @todo - find a way (perhaps with the callback) to allow AntD components to work
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
      "onChoose",
      "onDeselect",
      "onEnd",
      "onRemove",
      "onSelect",
      "onSpill",
      "onStart",
      "onUnchoose",
      "onUpdate"
    ];
    const NonDOMHandlers: UnHandledMethodNames[] = [
      "onChange",
      "onClone",
      "onFilter",
      "onSort"
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
    const mode = getMode(evt);
    const parentElement = { parentElement: evt.from };
    let custom: Input[] = [];
    switch (mode) {
      case "normal":
        const item = {
          element: evt.item,
          newIndex: evt.newIndex!,
          oldIndex: evt.oldIndex!,
          parentElement: evt.from
        };
        custom = [item];
        break;
      case "swap":
        const drag: Input = {
          element: evt.item,
          oldIndex: evt.oldIndex!,
          newIndex: evt.newIndex!,
          ...parentElement
        };
        const swap: Input = {
          element: evt.swapItem!,
          oldIndex: evt.newIndex!,
          newIndex: evt.oldIndex!,
          ...parentElement
        };
        custom = [drag, swap];
        break;
      case "multidrag":
        custom = evt.oldIndicies.map<Input>((curr, index) => ({
          element: curr.multiDragElement,
          oldIndex: curr.index,
          newIndex: evt.newIndicies[index].index,
          ...parentElement
        }));
        break;
    }
    const { list, setList } = this.props;
    const customs = createNormalized(custom, list);
    handleDOMChanges(customs);
    const newList = handleStateChanges(customs, list);
    return setList(newList, this.sortable, store);
  }

  /** Called when the dragging starts */
  onStart(evt: SortableEvent) {
    store.dragging = this;
  }

  /** Called when the dragging ends */
  onEnd(evt: SortableEvent) {
    store.dragging = null;
  }

  onChoose(evt: SortableEvent) {
    const { list, setList } = this.props;
    const newList = [...list];
    newList[evt.oldIndex!].chosen = true;
    setList(newList, this.sortable, store);
  }

  onUnchoose(evt: SortableEvent) {
    const { list, setList } = this.props;
    const newList = [...list];
    newList[evt.oldIndex!].chosen = false;
    setList(newList, this.sortable, store);
  }

  /** Called when the `onSpill` plugin is activated */
  onSpill(evt: SortableEvent) {
    const { removeOnSpill, revertOnSpill } = this.props;
    if (removeOnSpill && !revertOnSpill) removeNode(evt.item);
  }

  onSelect(evt: SortableEvent) {
    const { list, setList } = this.props;
    const newList = [...list];
    newList[evt.oldIndex!].selected = true;
    setList(newList, this.sortable, store);
  }

  onDeselect(evt: SortableEvent) {
    const { list, setList } = this.props;
    const newList = [...list];
    newList[evt.oldIndex!].selected = false;
    setList(newList, this.sortable, store);
  }
}

// everything below this point can be removes
// once @types has been merged. PR submited
interface MultiIndices {
  multiDragElement: HTMLElement;
  index: number;
}

export interface MultiDragEvent extends SortableEvent {
  oldIndicies: MultiIndices[];
  newIndicies: MultiIndices[];
  swapItem: HTMLElement | null;
}
