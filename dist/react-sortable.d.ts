import { Component, ReactElement } from "react";
import Sortable, { Options, SortableEvent } from "sortablejs";
import { AllMethodsExceptMove, HandledMethodNames, ItemInterface, ReactSortableProps } from "./types";
/**
 * React is built for synchornizing data with the browser.
 *
 * Data should be an object.
 */
export declare class ReactSortable<T extends ItemInterface> extends Component<ReactSortableProps<T>> {
    private ref;
    static defaultProps: Partial<ReactSortableProps<any>>;
    constructor(props: ReactSortableProps<T>);
    componentDidMount(): void;
    render(): ReactElement<import("react").RefAttributes<any>, string | ((props: any) => ReactElement<any, string | any | (new (props: any) => Component<any, any, any>)> | null) | (new (props: any) => Component<any, any, any>)>;
    private getChildren;
    /** Appends the `sortable` property to this component */
    private get sortable();
    /** Converts all the props from `ReactSortable` into the `options` object that `Sortable.create(el, [options])` can use. */
    makeOptions(): Options;
    /** Prepares a method that will be used in the sortable options to call an `on[Handler]` prop & an `on[Handler]` ReactSortable method.  */
    prepareOnHandlerPropAndDOM(evtName: HandledMethodNames): (evt: Sortable.SortableEvent) => void;
    /** Prepares a method that will be used in the sortable options to call an `on[Handler]` prop */
    prepareOnHandlerProp(evtName: Exclude<AllMethodsExceptMove, HandledMethodNames>): (evt: Sortable.SortableEvent) => void;
    /** Calls the `props.on[Handler]` function */
    callOnHandlerProp(evt: SortableEvent, evtName: AllMethodsExceptMove): void;
    /** Called when an element is dropped into the list from another list */
    onAdd(evt: SortableEvent): void;
    /** Called when an element is removed from the list into another list */
    onRemove(evt: SortableEvent): void;
    /** Called when sorting is changed within the same list */
    onUpdate(evt: MultiDragEvent): void;
    /** Called when the dragging starts */
    onStart(evt: SortableEvent): void;
    /** Called when the dragging ends */
    onEnd(evt: SortableEvent): void;
    /** Called when the `onSpill` plugin is activated */
    onSpill(evt: SortableEvent): void;
    /** Called when a clone is made. It replaces an element in with a function */
    onClone(evt: SortableEvent): void;
    /** @todo */
    onSelect(evt: SortableEvent): void;
    /** @todo */
    onDeselect(evt: SortableEvent): void;
}
interface MultiIndices {
    multiDragElement: HTMLElement;
    index: number;
}
interface MultiDragEvent extends SortableEvent {
    oldIndicies: MultiIndices[];
    newIndicies: MultiIndices[];
    swapItem: HTMLElement | null;
}
export {};
//# sourceMappingURL=react-sortable.d.ts.map