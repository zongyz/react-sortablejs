import { PropsWithChildren } from "react";
import { Options } from "sortablejs";
import { AllMethodNames, ReactSortableProps } from "./types";
/**
 * Removes the `node` from the DOM
 * @param node
 */
export declare function removeNode(node: HTMLElement): void;
/**
 * @summary Inserts a `newChild` inside the `parent` at index number `position`
 * @param parent
 * @param newChild
 * @param position a number that is not negative
 */
export declare function insertNodeAt(parent: HTMLElement, newChild: HTMLElement, position: number): void;
/**
 * Removes the following group of properties from `props`,
 * leaving only `Sortable.Options` without any `on` methods.
 * @param props `ReactSortable.Props`
 */
export declare function destructurePropsForOptions<T>(props: PropsWithChildren<ReactSortableProps<T>>): Exclude<Options, AllMethodNames>;
//# sourceMappingURL=util.d.ts.map