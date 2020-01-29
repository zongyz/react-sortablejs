'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Sortable = require('sortablejs');
var Sortable__default = _interopDefault(Sortable);
var classNames = _interopDefault(require('classnames'));
var react = require('react');
var invariant = _interopDefault(require('tiny-invariant'));

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/**
 * Removes the `node` from the DOM
 * @param node
 */
function removeNode(node) {
    if (node.parentElement !== null)
        node.parentElement.removeChild(node);
}
/**
 * Inserts the `newChild` node at the given index in a parent
 * @param parent The parent HTML Element.
 * @param newChild A HTML eement to add as a child of the parent.
 * @param index index of the parent to place the new child in.
 */
function insertNodeAt(parent, newChild, index) {
    var refChild = parent.children[index] || null;
    parent.insertBefore(newChild, refChild);
}
function removeNodes(customs) {
    customs.forEach(function (curr) { return removeNode(curr.element); });
}
function insertNodes(customs) {
    customs.forEach(function (curr) {
        insertNodeAt(curr.parentElement, curr.element, curr.oldIndex);
    });
}
function createCustoms(evt, list) {
    var mode = getMode(evt);
    var parentElement = { parentElement: evt.from };
    var custom = [];
    switch (mode) {
        case "normal":
            var item = {
                element: evt.item,
                newIndex: evt.newIndex,
                oldIndex: evt.oldIndex,
                parentElement: evt.from
            };
            custom = [item];
            break;
        case "swap":
            var drag = __assign({ element: evt.item, oldIndex: evt.oldIndex, newIndex: evt.newIndex }, parentElement);
            var swap = __assign({ element: evt.swapItem, oldIndex: evt.newIndex, newIndex: evt.oldIndex }, parentElement);
            custom = [drag, swap];
            break;
        case "multidrag":
            custom = evt.oldIndicies.map(function (curr, index) { return (__assign({ element: curr.multiDragElement, oldIndex: curr.index, newIndex: evt.newIndicies[index].index }, parentElement)); });
            break;
    }
    var customs = createNormalized(custom, list);
    return customs;
}
/** moves items form old index to new index without breaking anything ideally. */
function handleStateChanges(normalized, list) {
    var a = handleStateRemove(normalized, list);
    var b = handleStateAdd(normalized, a);
    return b;
}
function handleStateRemove(normalized, list) {
    var newList = __spread(list);
    normalized
        .concat()
        .reverse()
        .forEach(function (curr) { return newList.splice(curr.oldIndex, 1); });
    return newList;
}
function handleStateAdd(normalized, list) {
    var newList = __spread(list);
    normalized.forEach(function (curr) { return newList.splice(curr.newIndex, 0, curr.item); });
    return newList;
}
function getMode(evt) {
    if (evt.oldIndicies && evt.oldIndicies.length > 0)
        return "multidrag";
    if (evt.swapItem)
        return "swap";
    return "normal";
}
function createNormalized(inputs, list) {
    var normalized = inputs
        .map(function (curr) { return (__assign(__assign({}, curr), { item: list[curr.oldIndex] })); })
        .sort(function (a, b) { return a.oldIndex - b.oldIndex; });
    return normalized;
}
/**
 * Removes the following group of properties from `props`,
 * leaving only `Sortable.Options` without any `on` methods.
 * @param props `ReactSortable.Props`
 */
function destructurePropsForOptions(props) {
    var 
    // react sortable props
    list = props.list, setList = props.setList, children = props.children, tag = props.tag, style = props.style, className = props.className, clone = props.clone, 
    // sortable options that have methods we want to overwrite
    onAdd = props.onAdd, onChange = props.onChange, onChoose = props.onChoose, onClone = props.onClone, onEnd = props.onEnd, onFilter = props.onFilter, onRemove = props.onRemove, onSort = props.onSort, onStart = props.onStart, onUnchoose = props.onUnchoose, onUpdate = props.onUpdate, onMove = props.onMove, onSpill = props.onSpill, onSelect = props.onSelect, onDeselect = props.onDeselect, options = __rest(props, ["list", "setList", "children", "tag", "style", "className", "clone", "onAdd", "onChange", "onChoose", "onClone", "onEnd", "onFilter", "onRemove", "onSort", "onStart", "onUnchoose", "onUpdate", "onMove", "onSpill", "onSelect", "onDeselect"]);
    return options;
}

/** Holds a global reference for which react element is being dragged */
// @todo - use context to manage this. How does one use 2 different providers?
var store = { dragging: null };
var ReactSortable = /** @class */ (function (_super) {
    __extends(ReactSortable, _super);
    function ReactSortable(props) {
        var _this = _super.call(this, props) || this;
        // @todo forward ref this component
        _this.ref = react.createRef();
        // make all state false because we can't change sortable unless a mouse gesture is made.
        var newList = __spread(props.list).map(function (item) { return (__assign(__assign({}, item), { chosen: false, selected: false })); });
        props.setList(newList, _this.sortable, store);
        invariant(
        //@ts-ignore
        !props.plugins, "\nPlugins prop is no longer supported.\nInstead, mount it with \"Sortable.mount(new MultiDrag())\"\nPlease read the updated README.md at https://github.com/SortableJS/react-sortablejs.\n      ");
        return _this;
    }
    ReactSortable.prototype.componentDidMount = function () {
        if (this.ref.current === null)
            return;
        var newOptions = this.makeOptions();
        Sortable__default.create(this.ref.current, newOptions);
    };
    ReactSortable.prototype.render = function () {
        var _a = this.props, tag = _a.tag, style = _a.style, className = _a.className, id = _a.id;
        var classicProps = { style: style, className: className, id: id };
        // if no tag, default to a `div` element.
        var newTag = !tag || tag === null ? "div" : tag;
        return react.createElement(newTag, __assign({ 
            // @todo - find a way (perhaps with the callback) to allow AntD components to work
            ref: this.ref }, classicProps), this.getChildren());
    };
    ReactSortable.prototype.getChildren = function () {
        var _a = this.props, children = _a.children, dataIdAttr = _a.dataIdAttr, _b = _a.selectedClass, selectedClass = _b === void 0 ? "sortable-selected" : _b, _c = _a.chosenClass, chosenClass = _c === void 0 ? "sortable-chosen" : _c, _d = _a.dragClass, _e = _a.fallbackClass, _f = _a.ghostClass, _g = _a.swapClass, _h = _a.filter, filter = _h === void 0 ? "sortable-filter" : _h, list = _a.list;
        // if no children, don't do anything.
        if (!children || children == null)
            return null;
        var dataid = dataIdAttr || "data-id";
        return react.Children.map(children, function (child, index) {
            var _a, _b, _c;
            var item = list[index];
            var prevClassName = child.props.className;
            // @todo - handle the function if avalable. I don't think anyone will be doing this soon.
            var filtered = typeof filter === "string" && (_a = {},
                _a[filter.replace(".", "")] = !!item.filtered,
                _a);
            var className = classNames(prevClassName, __assign((_b = {}, _b[selectedClass] = item.selected, _b[chosenClass] = item.chosen, _b), filtered
            // [dragClass]: true,
            // [fallbackClass]: true,
            // [ghostClass]: true,
            // [swapClass]: true
            ));
            return react.cloneElement(child, (_c = {},
                _c[dataid] = child.key,
                _c.className = className,
                _c));
        });
    };
    Object.defineProperty(ReactSortable.prototype, "sortable", {
        /** Appends the `sortable` property to this component */
        get: function () {
            var el = this.ref.current;
            if (el === null)
                return null;
            var key = Object.keys(el).find(function (k) { return k.includes("Sortable"); });
            if (!key)
                return null;
            //@ts-ignore - I know what I'm doing.
            return el[key];
        },
        enumerable: true,
        configurable: true
    });
    /** Converts all the props from `ReactSortable` into the `options` object that `Sortable.create(el, [options])` can use. */
    ReactSortable.prototype.makeOptions = function () {
        var _this = this;
        var DOMHandlers = [
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
        var NonDOMHandlers = [
            "onChange",
            "onClone",
            "onFilter",
            "onSort"
        ];
        var newOptions = destructurePropsForOptions(this.props);
        DOMHandlers.forEach(function (name) { return (newOptions[name] = _this.prepareOnHandlerPropAndDOM(name)); });
        NonDOMHandlers.forEach(function (name) { return (newOptions[name] = _this.prepareOnHandlerProp(name)); });
        /** onMove has 2 arguments and needs to be handled seperately. */
        var onMove = function (evt, originalEvt) {
            var onMove = _this.props.onMove;
            var defaultValue = evt.willInsertAfter || -1;
            if (!onMove)
                return defaultValue;
            var result = onMove(evt, originalEvt, _this.sortable, store);
            if (typeof result === 'undefined')
                return false;
            return result;
        };
        return __assign(__assign({}, newOptions), { onMove: onMove });
    };
    /** Prepares a method that will be used in the sortable options to call an `on[Handler]` prop & an `on[Handler]` ReactSortable method.  */
    ReactSortable.prototype.prepareOnHandlerPropAndDOM = function (evtName) {
        var _this = this;
        return function (evt) {
            // call the component prop
            _this.callOnHandlerProp(evt, evtName);
            // calls state change
            //@ts-ignore - until @types multidrag item is in
            _this[evtName](evt);
        };
    };
    /** Prepares a method that will be used in the sortable options to call an `on[Handler]` prop */
    ReactSortable.prototype.prepareOnHandlerProp = function (evtName) {
        var _this = this;
        return function (evt) {
            // call the component prop
            _this.callOnHandlerProp(evt, evtName);
        };
    };
    /** Calls the `props.on[Handler]` function */
    ReactSortable.prototype.callOnHandlerProp = function (evt, evtName) {
        var propEvent = this.props[evtName];
        if (propEvent)
            propEvent(evt, this.sortable, store);
    };
    // SORTABLE DOM HANDLING
    ReactSortable.prototype.onAdd = function (evt) {
        var _a = this.props, list = _a.list, setList = _a.setList;
        var otherList = __spread(store.dragging.props.list);
        var customs = createCustoms(evt, otherList);
        removeNodes(customs);
        var newList = handleStateAdd(customs, list);
        setList(newList, this.sortable, store);
    };
    ReactSortable.prototype.onRemove = function (evt) {
        var _this = this;
        var _a = this.props, list = _a.list, setList = _a.setList;
        var mode = getMode(evt);
        var customs = createCustoms(evt, list);
        insertNodes(customs);
        var newList = __spread(list);
        // remove state if not in clone mode. otherwise, keep.
        if (evt.pullMode !== "clone")
            newList = handleStateRemove(customs, newList);
        // if clone, it doesn't really remove. instead it clones in place.
        // @todo -
        else {
            // switch used to get the clone
            var customClones = customs;
            switch (mode) {
                case "multidrag":
                    customClones = customs.map(function (item, index) { return (__assign(__assign({}, item), { element: evt.clones[index] })); });
                    break;
                case "normal":
                    customClones = customs.map(function (item, index) { return (__assign(__assign({}, item), { element: evt.clone })); });
                    break;
                case "swap":
                default: {
                    invariant(true, "mode \"" + mode + "\" cannot clone. Please remove \"props.clone\" from <ReactSortable/> when using the \"" + mode + "\" plugin");
                }
            }
            removeNodes(customClones);
            // replace selected items with cloned items
            customs.forEach(function (curr) {
                var index = curr.oldIndex;
                var newItem = _this.props.clone(curr.item, evt);
                newList.splice(index, 1, newItem);
            });
        }
        // remove item.selected from list
        newList = newList.map(function (item) { return (__assign(__assign({}, item), { selected: false })); });
        setList(newList, this.sortable, store);
    };
    ReactSortable.prototype.onUpdate = function (evt) {
        var _a = this.props, list = _a.list, setList = _a.setList;
        var customs = createCustoms(evt, list);
        removeNodes(customs);
        insertNodes(customs);
        var newList = handleStateChanges(customs, list);
        return setList(newList, this.sortable, store);
    };
    ReactSortable.prototype.onStart = function (evt) {
        store.dragging = this;
    };
    ReactSortable.prototype.onEnd = function (evt) {
        store.dragging = null;
    };
    ReactSortable.prototype.onChoose = function (evt) {
        var _a = this.props, list = _a.list, setList = _a.setList;
        var newList = __spread(list);
        newList[evt.oldIndex].chosen = true;
        setList(newList, this.sortable, store);
    };
    ReactSortable.prototype.onUnchoose = function (evt) {
        var _a = this.props, list = _a.list, setList = _a.setList;
        var newList = __spread(list);
        newList[evt.oldIndex].chosen = false;
        setList(newList, this.sortable, store);
    };
    ReactSortable.prototype.onSpill = function (evt) {
        var _a = this.props, removeOnSpill = _a.removeOnSpill, revertOnSpill = _a.revertOnSpill;
        if (removeOnSpill && !revertOnSpill)
            removeNode(evt.item);
    };
    ReactSortable.prototype.onSelect = function (evt) {
        var _a = this.props, list = _a.list, setList = _a.setList;
        var newList = __spread(list).map(function (item) { return (__assign(__assign({}, item), { selected: false })); });
        evt.newIndicies.forEach(function (curr) {
            var index = curr.index;
            if (index === -1) {
                console.log("\"" + evt.type + "\" had indice of \"" + curr.index + "\", which is probably -1 and doesn't usually happen here.");
                console.log(evt);
                return;
            }
            newList[index].selected = true;
        });
        setList(newList, this.sortable, store);
    };
    ReactSortable.prototype.onDeselect = function (evt) {
        var _a = this.props, list = _a.list, setList = _a.setList;
        var newList = __spread(list).map(function (item) { return (__assign(__assign({}, item), { selected: false })); });
        evt.newIndicies.forEach(function (curr) {
            var index = curr.index;
            if (index === -1)
                return;
            newList[index].selected = true;
        });
        setList(newList, this.sortable, store);
    };
    ReactSortable.defaultProps = {
        clone: function (item) { return item; }
    };
    return ReactSortable;
}(react.Component));

Object.defineProperty(exports, 'MultiDrag', {
    enumerable: true,
    get: function () {
        return Sortable.MultiDrag;
    }
});
exports.Sortable = Sortable__default;
Object.defineProperty(exports, 'Swap', {
    enumerable: true,
    get: function () {
        return Sortable.Swap;
    }
});
exports.ReactSortable = ReactSortable;
