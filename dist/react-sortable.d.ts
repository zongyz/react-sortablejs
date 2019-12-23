import { Component, ReactElement } from "react";
import Sortable, { Options, SortableEvent } from "sortablejs";
import { AllMethodsExceptMove, HandledMethodNames, ItemInterface, ReactSortableProps } from "./types";
export declare class ReactSortable<T extends ItemInterface> extends Component<ReactSortableProps<T>> {
    static defaultProps: Partial<ReactSortableProps<any>>;
    private ref;
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
    onAdd(evt: MultiDragEvent): void;
    onRemove(evt: MultiDragEvent): void;
    onUpdate(evt: MultiDragEvent): void;
    onStart(evt: SortableEvent): void;
    onEnd(evt: SortableEvent): void;
    onChoose(evt: SortableEvent): void;
    onUnchoose(evt: SortableEvent): void;
    onSpill(evt: SortableEvent): void;
    onSelect(evt: MultiDragEvent): void;
    onDeselect(evt: MultiDragEvent): void;
}
interface MultiIndices {
    multiDragElement: HTMLElement;
    index: number;
}
export interface MultiDragEvent extends SortableEvent {
    clones: HTMLElement[];
    oldIndicies: MultiIndices[];
    newIndicies: MultiIndices[];
    swapItem: HTMLElement | null;
}
export {};
//# sourceMappingURL=react-sortable.d.ts.map