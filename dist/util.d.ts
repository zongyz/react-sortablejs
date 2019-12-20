import { PropsWithChildren } from "react";
import { Options } from "sortablejs";
import { AllMethodNames, ReactSortableProps } from "./types";
/**
 * Removes the `node` from the DOM
 * @param node
 */
export declare function removeNode(node: HTMLElement): void;
/**
 * Inserts the `newChild` node at the given index in a parent
 * @param parent The parent HTML Element.
 * @param newChild A HTML eement to add as a child of the parent.
 * @param index index of the parent to place the new child in.
 */
export declare function insertNodeAt(parent: HTMLElement, newChild: HTMLElement, index: number): void;
/**
 * Removes the following group of properties from `props`,
 * leaving only `Sortable.Options` without any `on` methods.
 * @param props `ReactSortable.Props`
 */
export declare function destructurePropsForOptions<T>(props: PropsWithChildren<ReactSortableProps<T>>): Exclude<Options, AllMethodNames>;
//# sourceMappingURL=util.d.ts.map