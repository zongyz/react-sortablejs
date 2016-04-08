/*! react-sortablejs v0.7.0 | (c) 2016 Cheton Wu <cheton@gmail.com> | MIT | https://github.com/cheton/react-sortable */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"), require("sortablejs"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom", "sortablejs"], factory);
	else if(typeof exports === 'object')
		exports["SortableMixin"] = factory(require("react"), require("react-dom"), require("sortablejs"));
	else
		root["SortableMixin"] = factory(root["React"], root["ReactDOM"], root["Sortable"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _sortablejs = __webpack_require__(3);

	var _sortablejs2 = _interopRequireDefault(_sortablejs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var defaultOptions = {
	    ref: 'list'
	};

	var store = {
	    nextSibling: null,
	    activeComponent: null
	};

	var refName = 'sortableComponent';

	var extend = function extend(target) {
	    for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        sources[_key - 1] = arguments[_key];
	    }

	    if (target === undefined || target === null) {
	        throw new TypeError('Cannot convert undefined or null to object');
	    }

	    var output = Object(target);
	    for (var index = 0; index < sources.length; index++) {
	        var source = sources[index];
	        if (source !== undefined && source !== null) {
	            for (var key in source) {
	                if (source.hasOwnProperty(key)) {
	                    output[key] = source[key];
	                }
	            }
	        }
	    }
	    return output;
	};

	var SortableMixin = function SortableMixin() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? defaultOptions : arguments[0];
	    return function (Component) {
	        var _class, _temp2;

	        return _temp2 = _class = function (_React$Component) {
	            _inherits(_class, _React$Component);

	            function _class() {
	                var _Object$getPrototypeO;

	                var _temp, _this, _ret;

	                _classCallCheck(this, _class);

	                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	                    args[_key2] = arguments[_key2];
	                }

	                return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(_class)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
	                    sortableInstance: null
	                }, _this.sortableOptions = extend({}, defaultOptions, options), _temp), _possibleConstructorReturn(_this, _ret);
	            }

	            _createClass(_class, [{
	                key: 'componentDidMount',
	                value: function componentDidMount() {
	                    var _this2 = this;

	                    [// Bind callbacks
	                    'onStart', 'onEnd', 'onAdd', 'onSort', 'onUpdate', 'onRemove', 'onFilter', 'onMove'].forEach(function (name) {
	                        _this2.sortableOptions[name] = function (evt) {
	                            if (name === 'onStart') {
	                                store.nextSibling = evt.item.nextElementSibling;
	                                store.activeComponent = _this2;
	                            } else if (name === 'onAdd' || name === 'onUpdate') {
	                                evt.from.insertBefore(evt.item, store.nextSibling);

	                                var oldIndex = evt.oldIndex;
	                                var newIndex = evt.newIndex;
	                                var items = _this2.props.items;
	                                var remoteItems = [];

	                                if (name === 'onAdd') {
	                                    remoteItems = store.activeComponent.props.items;
	                                    var item = remoteItems.splice(oldIndex, 1)[0];
	                                    items.splice(newIndex, 0, item);
	                                } else {
	                                    items.splice(newIndex, 0, items.splice(oldIndex, 1)[0]);
	                                }

	                                // Called by any change to the list (add / update / remove)
	                                _this2.props.onSort(items);

	                                if (store.activeComponent !== _this2) {
	                                    store.activeComponent.props.onSort(remoteItems);
	                                }
	                            }

	                            setTimeout(function () {
	                                _this2.props[name] && _this2.props[name](evt, _this2.state.sortableInstance);
	                            }, 0);
	                        };
	                    });

	                    var sortableComponent = this.refs[refName];
	                    this.initSortable(sortableComponent);
	                }
	            }, {
	                key: 'componentDidUpdate',
	                value: function componentDidUpdate(prevProps, prevState) {
	                    var model = this.sortableOptions.model;
	                    var prevItems = prevProps[model];
	                    var currItems = this.props[model];
	                    if (prevItems !== currItems) {
	                        this.initSortable(this.refs[refName]);
	                    }
	                }
	            }, {
	                key: 'componentWillUnmount',
	                value: function componentWillUnmount() {
	                    this.destroySortable();
	                }
	            }, {
	                key: 'initSortable',
	                value: function initSortable(sortableComponent) {
	                    this.destroySortable();
	                    var domNode = _reactDom2.default.findDOMNode(sortableComponent.refs[this.sortableOptions.ref] || sortableComponent);
	                    var sortableInstance = _sortablejs2.default.create(domNode, this.sortableOptions);
	                    this.setState({ sortableInstance: sortableInstance });
	                }
	            }, {
	                key: 'destroySortable',
	                value: function destroySortable() {
	                    if (this.state.sortableInstance) {
	                        this.state.sortableInstance.destroy();
	                        this.setState({ sortableInstance: null });
	                    }
	                }
	            }, {
	                key: 'render',
	                value: function render() {
	                    return _react2.default.createElement(Component, _extends({ ref: refName }, this.props, this.state));
	                }
	            }]);

	            return _class;
	        }(_react2.default.Component), _class.propTypes = {
	            items: _react2.default.PropTypes.array.isRequired,
	            onSort: _react2.default.PropTypes.func.isRequired
	        }, _temp2;
	    };
	};

	exports.default = SortableMixin;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }
/******/ ])
});
;