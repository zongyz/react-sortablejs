import { Children, cloneElement, PropsWithChildren, ReactElement } from "react";
import { Options } from "sortablejs";
import { AllMethodNames, ReactSortableProps } from "./types";

/**
 * @summary uses the key the attribute `data-id` to children, which is used internally by SortableJS.
 * @param children ReactSortable children
 */
export function modifyChildren<T>(
  props: PropsWithChildren<ReactSortableProps<T>>
) {
  const { children, dataIdAttr } = props;
  // if no children, don't do anything.
  if (!children || children == null) return null;

  const keyProperty = dataIdAttr || "data-id";
  const newChildren = Children.map(
    children as ReactElement<any>[],
    (child: ReactElement) => cloneElement(child, { [keyProperty]: child.key })
  );
  return newChildren;
}

/**
 * Removes the `node` from the DOM
 * @param node
 */
export function removeNode(node: HTMLElement) {
  if (node.parentElement !== null) node.parentElement.removeChild(node);
}

/**
 * @summary Inserts a `newChild` inside the `parent` at index number `position`
 * @param parent
 * @param newChild
 * @param position a number that is not negative
 */
export function insertNodeAt(
  parent: HTMLElement,
  newChild: HTMLElement,
  position: number
) {
  const refChild =
    position === 0 ? parent.children[0] : parent.children[position - 1];
  parent.insertBefore(newChild, refChild);
}

// todo:
// add `onSpilled` and other functions, if any, to this exclusion list
// they must also be handled by `ReactSortable.makeOptions`
/**
 * Removes the following group of properties from `props`,
 * leaving only `Sortable.Options` without any `on` methods.
 * @param props `ReactSortable.Props`
 */
export function destructurePropsForOptions<T>(
  props: PropsWithChildren<ReactSortableProps<T>>
): Exclude<Options, AllMethodNames> {
  const {
    // react sortable props
    list,
    setList,
    children,
    tag,
    style,
    className,
    clone,
    // sortable options that have methods we want to overwrite
    onAdd,
    onChange,
    onChoose,
    onClone,
    onEnd,
    onFilter,
    onRemove,
    onSort,
    onStart,
    onUnchoose,
    onUpdate,
    onMove,
    onSpill,
    onSelect,
    onDeselect,
    ...options
  } = props;
  return options;
}
