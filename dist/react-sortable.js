/*! react-sortablejs v1.2.0 | (c) 2016 Cheton Wu <cheton@gmail.com> | MIT | https://github.com/cheton/react-sortable */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"), require("sortablejs"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom", "sortablejs"], factory);
	else if(typeof exports === 'object')
		exports["ReactSortable"] = factory(require("react"), require("react-dom"), require("sortablejs"));
	else
		root["ReactSortable"] = factory(root["React"], root["ReactDOM"], root["Sortable"]);
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

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _class, _temp2;

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

	var store = {
	    nextSibling: null,
	    activeComponent: null
	};

	module.exports = (_temp2 = _class = function (_React$Component) {
	    _inherits(_class, _React$Component);

	    function _class() {
	        var _ref;

	        var _temp, _this, _ret;

	        _classCallCheck(this, _class);

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args))), _this), _this.sortable = null, _temp), _possibleConstructorReturn(_this, _ret);
	    }

	    _createClass(_class, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _this2 = this;

	            var options = _extends({}, this.props.options);

	            ['onStart', 'onEnd', 'onAdd', 'onSort', 'onUpdate', 'onRemove', 'onFilter', 'onMove'].forEach(function (name) {
	                var eventHandler = options[name];

	                options[name] = function (evt) {
	                    if (name === 'onStart') {
	                        store.nextSibling = evt.item.nextElementSibling;
	                        store.activeComponent = _this2;
	                    } else if ((name === 'onAdd' || name === 'onUpdate') && _this2.props.onChange) {
	                        var items = _this2.sortable.toArray();
	                        var remote = store.activeComponent;
	                        var remoteItems = remote.sortable.toArray();

	                        evt.from.insertBefore(evt.item, store.nextSibling);

	                        if (remote !== _this2) {
	                            var remoteOptions = remote.props.options || {};

	                            if (_typeof(remoteOptions.group) === 'object' && remoteOptions.group.pull === 'clone') {
	                                // Remove the node with the same data-reactid
	                                evt.item.parentNode.removeChild(evt.item);
	                            }

	                            remote.props.onChange && remote.props.onChange(remoteItems, remote.sortable, evt);
	                        }

	                        _this2.props.onChange && _this2.props.onChange(items, _this2.sortable, evt);
	                    }

	                    if (evt.type === 'move') {
	                        var canMove = eventHandler ? eventHandler(evt) : true;
	                        return canMove;
	                    }

	                    setTimeout(function () {
	                        eventHandler && eventHandler(evt);
	                    }, 0);
	                };
	            });

	            this.sortable = _sortablejs2.default.create(_reactDom2.default.findDOMNode(this), options);
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            if (this.sortable) {
	                this.sortable.destroy();
	                this.sortable = null;
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _props = this.props,
	                children = _props.children,
	                className = _props.className,
	                tag = _props.tag,
	                style = _props.style;

	            return _react2.default.DOM[tag]({ className: className, style: style }, children);
	        }
	    }]);

	    return _class;
	}(_react2.default.Component), _class.propTypes = {
	    options: _react2.default.PropTypes.object,
	    onChange: _react2.default.PropTypes.func,
	    tag: _react2.default.PropTypes.string,
	    style: _react2.default.PropTypes.object
	}, _class.defaultProps = {
	    options: {},
	    tag: 'div',
	    style: {}
	}, _temp2);

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