/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 236);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = normalizeComponent;
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  scriptExports = scriptExports || {}

  // ES6 modules interop
  var type = typeof scriptExports.default
  if (type === 'object' || type === 'function') {
    scriptExports = scriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(29);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  typeof document.createElement -> undefined
 */
function isStandardBrowserEnv() {
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined' &&
    typeof document.createElement === 'function'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object' && !isArray(obj)) {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.VuejsPaginate=t():e.VuejsPaginate=t()}(this,function(){return function(e){function t(s){if(n[s])return n[s].exports;var a=n[s]={exports:{},id:s,loaded:!1};return e[s].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}var a=n(1),i=s(a);e.exports=i.default},function(e,t,n){n(2);var s=n(6)(n(7),n(8),"data-v-82963a40",null);e.exports=s.exports},function(e,t,n){var s=n(3);"string"==typeof s&&(s=[[e.id,s,""]]);n(5)(s,{});s.locals&&(e.exports=s.locals)},function(e,t,n){t=e.exports=n(4)(),t.push([e.id,"a[data-v-82963a40]{cursor:pointer}",""])},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var s={},a=0;a<this.length;a++){var i=this[a][0];"number"==typeof i&&(s[i]=!0)}for(a=0;a<t.length;a++){var r=t[a];"number"==typeof r[0]&&s[r[0]]||(n&&!r[2]?r[2]=n:n&&(r[2]="("+r[2]+") and ("+n+")"),e.push(r))}},e}},function(e,t,n){function s(e,t){for(var n=0;n<e.length;n++){var s=e[n],a=c[s.id];if(a){a.refs++;for(var i=0;i<a.parts.length;i++)a.parts[i](s.parts[i]);for(;i<s.parts.length;i++)a.parts.push(l(s.parts[i],t))}else{for(var r=[],i=0;i<s.parts.length;i++)r.push(l(s.parts[i],t));c[s.id]={id:s.id,refs:1,parts:r}}}}function a(e){for(var t=[],n={},s=0;s<e.length;s++){var a=e[s],i=a[0],r=a[1],o=a[2],l=a[3],u={css:r,media:o,sourceMap:l};n[i]?n[i].parts.push(u):t.push(n[i]={id:i,parts:[u]})}return t}function i(e,t){var n=g(),s=C[C.length-1];if("top"===e.insertAt)s?s.nextSibling?n.insertBefore(t,s.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),C.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(t)}}function r(e){e.parentNode.removeChild(e);var t=C.indexOf(e);t>=0&&C.splice(t,1)}function o(e){var t=document.createElement("style");return t.type="text/css",i(e,t),t}function l(e,t){var n,s,a;if(t.singleton){var i=v++;n=h||(h=o(t)),s=u.bind(null,n,i,!1),a=u.bind(null,n,i,!0)}else n=o(t),s=d.bind(null,n),a=function(){r(n)};return s(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;s(e=t)}else a()}}function u(e,t,n,s){var a=n?"":s.css;if(e.styleSheet)e.styleSheet.cssText=b(t,a);else{var i=document.createTextNode(a),r=e.childNodes;r[t]&&e.removeChild(r[t]),r.length?e.insertBefore(i,r[t]):e.appendChild(i)}}function d(e,t){var n=t.css,s=t.media,a=t.sourceMap;if(s&&e.setAttribute("media",s),a&&(n+="\n/*# sourceURL="+a.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}var c={},p=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},f=p(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),g=p(function(){return document.head||document.getElementsByTagName("head")[0]}),h=null,v=0,C=[];e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=f()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var n=a(e);return s(n,t),function(e){for(var i=[],r=0;r<n.length;r++){var o=n[r],l=c[o.id];l.refs--,i.push(l)}if(e){var u=a(e);s(u,t)}for(var r=0;r<i.length;r++){var l=i[r];if(0===l.refs){for(var d=0;d<l.parts.length;d++)l.parts[d]();delete c[l.id]}}}};var b=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},function(e,t){e.exports=function(e,t,n,s){var a,i=e=e||{},r=typeof e.default;"object"!==r&&"function"!==r||(a=e,i=e.default);var o="function"==typeof i?i.options:i;if(t&&(o.render=t.render,o.staticRenderFns=t.staticRenderFns),n&&(o._scopeId=n),s){var l=o.computed||(o.computed={});Object.keys(s).forEach(function(e){var t=s[e];l[e]=function(){return t}})}return{esModule:a,exports:i,options:o}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:{value:{type:Number},pageCount:{type:Number,required:!0},forcePage:{type:Number},clickHandler:{type:Function,default:function(){}},pageRange:{type:Number,default:3},marginPages:{type:Number,default:1},prevText:{type:String,default:"Prev"},nextText:{type:String,default:"Next"},breakViewText:{type:String,default:"…"},containerClass:{type:String},pageClass:{type:String},pageLinkClass:{type:String},prevClass:{type:String},prevLinkClass:{type:String},nextClass:{type:String},nextLinkClass:{type:String},breakViewClass:{type:String},breakViewLinkClass:{type:String},activeClass:{type:String,default:"active"},disabledClass:{type:String,default:"disabled"},noLiSurround:{type:Boolean,default:!1},firstLastButton:{type:Boolean,default:!1},firstButtonText:{type:String,default:"First"},lastButtonText:{type:String,default:"Last"},hidePrevNext:{type:Boolean,default:!1}},beforeUpdate:function(){void 0!==this.forcePage&&this.forcePage!==this.selected&&(this.selected=this.forcePage)},computed:{selected:{get:function(){return this.value||this.innerValue},set:function(e){this.innerValue=e}},pages:function(){var e=this,t={};if(this.pageCount<=this.pageRange)for(var n=0;n<this.pageCount;n++){var s={index:n,content:n+1,selected:n===this.selected-1};t[n]=s}else{for(var a=Math.floor(this.pageRange/2),i=function(n){var s={index:n,content:n+1,selected:n===e.selected-1};t[n]=s},r=function(e){var n={disabled:!0,breakView:!0};t[e]=n},o=0;o<this.marginPages;o++)i(o);var l=0;this.selected-a>0&&(l=this.selected-1-a);var u=l+this.pageRange-1;u>=this.pageCount&&(u=this.pageCount-1,l=u-this.pageRange+1);for(var d=l;d<=u&&d<=this.pageCount-1;d++)i(d);l>this.marginPages&&r(l-1),u+1<this.pageCount-this.marginPages&&r(u+1);for(var c=this.pageCount-1;c>=this.pageCount-this.marginPages;c--)i(c)}return t}},data:function(){return{innerValue:1}},methods:{handlePageSelected:function(e){this.selected!==e&&(this.innerValue=e,this.$emit("input",e),this.clickHandler(e))},prevPage:function(){this.selected<=1||this.handlePageSelected(this.selected-1)},nextPage:function(){this.selected>=this.pageCount||this.handlePageSelected(this.selected+1)},firstPageSelected:function(){return 1===this.selected},lastPageSelected:function(){return this.selected===this.pageCount||0===this.pageCount},selectFirstPage:function(){this.selected<=1||this.handlePageSelected(1)},selectLastPage:function(){this.selected>=this.pageCount||this.handlePageSelected(this.pageCount)}}}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.noLiSurround?n("div",{class:e.containerClass},[e.firstLastButton?n("a",{class:[e.pageLinkClass,e.firstPageSelected()?e.disabledClass:""],attrs:{tabindex:"0"},domProps:{innerHTML:e._s(e.firstButtonText)},on:{click:function(t){e.selectFirstPage()},keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13)?void e.selectFirstPage():null}}}):e._e(),e._v(" "),e.firstPageSelected()&&e.hidePrevNext?e._e():n("a",{class:[e.prevLinkClass,e.firstPageSelected()?e.disabledClass:""],attrs:{tabindex:"0"},domProps:{innerHTML:e._s(e.prevText)},on:{click:function(t){e.prevPage()},keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13)?void e.prevPage():null}}}),e._v(" "),e._l(e.pages,function(t){return[t.breakView?n("a",{class:[e.pageLinkClass,e.breakViewLinkClass,t.disabled?e.disabledClass:""],attrs:{tabindex:"0"}},[e._t("breakViewContent",[e._v(e._s(e.breakViewText))])],2):t.disabled?n("a",{class:[e.pageLinkClass,t.selected?e.activeClass:"",e.disabledClass],attrs:{tabindex:"0"}},[e._v(e._s(t.content))]):n("a",{class:[e.pageLinkClass,t.selected?e.activeClass:""],attrs:{tabindex:"0"},on:{click:function(n){e.handlePageSelected(t.index+1)},keyup:function(n){return"button"in n||!e._k(n.keyCode,"enter",13)?void e.handlePageSelected(t.index+1):null}}},[e._v(e._s(t.content))])]}),e._v(" "),e.lastPageSelected()&&e.hidePrevNext?e._e():n("a",{class:[e.nextLinkClass,e.lastPageSelected()?e.disabledClass:""],attrs:{tabindex:"0"},domProps:{innerHTML:e._s(e.nextText)},on:{click:function(t){e.nextPage()},keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13)?void e.nextPage():null}}}),e._v(" "),e.firstLastButton?n("a",{class:[e.pageLinkClass,e.lastPageSelected()?e.disabledClass:""],attrs:{tabindex:"0"},domProps:{innerHTML:e._s(e.lastButtonText)},on:{click:function(t){e.selectLastPage()},keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13)?void e.selectLastPage():null}}}):e._e()],2):n("ul",{class:e.containerClass},[e.firstLastButton?n("li",{class:[e.pageClass,e.firstPageSelected()?e.disabledClass:""]},[n("a",{class:e.pageLinkClass,attrs:{tabindex:e.firstPageSelected()?-1:0},domProps:{innerHTML:e._s(e.firstButtonText)},on:{click:function(t){e.selectFirstPage()},keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13)?void e.selectFirstPage():null}}})]):e._e(),e._v(" "),e.firstPageSelected()&&e.hidePrevNext?e._e():n("li",{class:[e.prevClass,e.firstPageSelected()?e.disabledClass:""]},[n("a",{class:e.prevLinkClass,attrs:{tabindex:e.firstPageSelected()?-1:0},domProps:{innerHTML:e._s(e.prevText)},on:{click:function(t){e.prevPage()},keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13)?void e.prevPage():null}}})]),e._v(" "),e._l(e.pages,function(t){return n("li",{class:[e.pageClass,t.selected?e.activeClass:"",t.disabled?e.disabledClass:"",t.breakView?e.breakViewClass:""]},[t.breakView?n("a",{class:[e.pageLinkClass,e.breakViewLinkClass],attrs:{tabindex:"0"}},[e._t("breakViewContent",[e._v(e._s(e.breakViewText))])],2):t.disabled?n("a",{class:e.pageLinkClass,attrs:{tabindex:"0"}},[e._v(e._s(t.content))]):n("a",{class:e.pageLinkClass,attrs:{tabindex:"0"},on:{click:function(n){e.handlePageSelected(t.index+1)},keyup:function(n){return"button"in n||!e._k(n.keyCode,"enter",13)?void e.handlePageSelected(t.index+1):null}}},[e._v(e._s(t.content))])])}),e._v(" "),e.lastPageSelected()&&e.hidePrevNext?e._e():n("li",{class:[e.nextClass,e.lastPageSelected()?e.disabledClass:""]},[n("a",{class:e.nextLinkClass,attrs:{tabindex:e.lastPageSelected()?-1:0},domProps:{innerHTML:e._s(e.nextText)},on:{click:function(t){e.nextPage()},keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13)?void e.nextPage():null}}})]),e._v(" "),e.firstLastButton?n("li",{class:[e.pageClass,e.lastPageSelected()?e.disabledClass:""]},[n("a",{class:e.pageLinkClass,attrs:{tabindex:e.lastPageSelected()?-1:0},domProps:{innerHTML:e._s(e.lastButtonText)},on:{click:function(t){e.selectLastPage()},keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13)?void e.selectLastPage():null}}})]):e._e()],2)},staticRenderFns:[]}}])});

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = addStylesClient;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__listToStyles__ = __webpack_require__(66);
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = Object(__WEBPACK_IMPORTED_MODULE_0__listToStyles__["a" /* default */])(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = Object(__WEBPACK_IMPORTED_MODULE_0__listToStyles__["a" /* default */])(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */
!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.CKEditor=e():t.CKEditor=e()}(window,function(){return function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);var i={name:"ckeditor",render(t){return t(this.tagName)},props:{editor:{type:Function,default:null},value:{type:String,default:""},config:{type:Object,default:()=>({})},tagName:{type:String,default:"div"},disabled:{type:Boolean,default:!1}},data:()=>({instance:null}),mounted(){this.editor.create(this.$el,this.config).then(t=>{this.instance=t,t.setData(this.value),t.isReadOnly=this.disabled,this.$_setUpEditorEvents(),this.$emit("ready",t)}).catch(t=>{console.error(t)})},beforeDestroy(){this.instance&&(this.instance.destroy(),this.instance=null),this.$emit("destroy",this.instance)},watch:{value(t){this.instance.getData()!==t&&this.instance.setData(t)},disabled(t){this.instance.isReadOnly=t}},methods:{$_setUpEditorEvents(){const t=this.instance;t.model.document.on("change:data",e=>{const n=t.getData();this.$emit("input",n,e,t)}),t.editing.view.document.on("focus",e=>{this.$emit("focus",e,t)}),t.editing.view.document.on("blur",e=>{this.$emit("blur",e,t)})}}};const o={install(t){t.component("ckeditor",i)},component:i};e.default=o}]).default});
//# sourceMappingURL=ckeditor.js.map

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */
!function(t){t.en=Object.assign(t.en||{},{a:"Cannot upload file:",b:"Italic",c:"Bold",d:"Block quote",e:"Full size image",f:"Side image",g:"Left aligned image",h:"Centered image",i:"Right aligned image",j:"image widget",k:"Insert image or file",l:"Insert image",m:"Choose heading",n:"Heading",o:"Numbered List",p:"Bulleted List",q:"Enter image caption",r:"Upload failed",s:"Link",t:"Insert table",u:"Header column",v:"Insert column left",w:"Insert column right",x:"Delete column",y:"Column",z:"Header row",aa:"Insert row below",ab:"Insert row above",ac:"Delete row",ad:"Row",ae:"Merge cell up",af:"Merge cell right",ag:"Merge cell down",ah:"Merge cell left",ai:"Split cell vertically",aj:"Split cell horizontally",ak:"Merge cells",al:"media widget",am:"Insert media",an:"The URL must not be empty.",ao:"This media URL is not supported.",ap:"Upload in progress",aq:"Could not obtain resized image URL.",ar:"Selecting resized image failed",as:"Could not insert image at the current position.",at:"Inserting image failed",au:"Change image text alternative",av:"Paragraph",aw:"Heading 1",ax:"Heading 2",ay:"Heading 3",az:"Rich Text Editor",ba:"Save",bb:"Cancel",bc:"Text alternative",bd:"Undo",be:"Redo",bf:"Media URL",bg:"Paste the URL into the content to embed faster.",bh:"Link URL",bi:"Unlink",bj:"Edit link",bk:"Open link in new tab",bl:"This link has no URL",bm:"Rich Text Editor, %0"})}(window.CKEDITOR_TRANSLATIONS||(window.CKEDITOR_TRANSLATIONS={})),function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.ClassicEditor=e():t.ClassicEditor=e()}(window,function(){return function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=117)}([function(t,e,n){"use strict";n.d(e,"b",function(){return o}),n.d(e,"a",function(){return r});const i="https://ckeditor.com/docs/ckeditor5/latest/framework/guides/support/error-codes.html";class o extends Error{constructor(t,e){t=r(t),e&&(t+=" "+JSON.stringify(e)),super(t),this.name="CKEditorError",this.data=e}static isCKEditorError(t){return t instanceof o}}function r(t){const e=t.match(/^([^:]+):/);return e?t+` Read more: ${i}#error-${e[1]}\n`:t}},function(t,e,n){"use strict";var i=n(0);const o={error(t,e){console.error(Object(i.a)(t),e)},warn(t,e){console.warn(Object(i.a)(t),e)}};e.a=o},function(t,e,n){var i={},o=function(t){var e;return function(){return void 0===e&&(e=t.apply(this,arguments)),e}}(function(){return window&&document&&document.all&&!window.atob}),r=function(t){var e={};return function(t,n){if("function"==typeof t)return t();if(void 0===e[t]){var i=function(t,e){return e?e.querySelector(t):document.querySelector(t)}.call(this,t,n);if(window.HTMLIFrameElement&&i instanceof window.HTMLIFrameElement)try{i=i.contentDocument.head}catch(t){i=null}e[t]=i}return e[t]}}(),s=null,a=0,c=[],l=n(45);function d(t,e){for(var n=0;n<t.length;n++){var o=t[n],r=i[o.id];if(r){r.refs++;for(var s=0;s<r.parts.length;s++)r.parts[s](o.parts[s]);for(;s<o.parts.length;s++)r.parts.push(g(o.parts[s],e))}else{var a=[];for(s=0;s<o.parts.length;s++)a.push(g(o.parts[s],e));i[o.id]={id:o.id,refs:1,parts:a}}}}function u(t,e){for(var n=[],i={},o=0;o<t.length;o++){var r=t[o],s=e.base?r[0]+e.base:r[0],a={css:r[1],media:r[2],sourceMap:r[3]};i[s]?i[s].parts.push(a):n.push(i[s]={id:s,parts:[a]})}return n}function h(t,e){var n=r(t.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var i=c[c.length-1];if("top"===t.insertAt)i?i.nextSibling?n.insertBefore(e,i.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),c.push(e);else if("bottom"===t.insertAt)n.appendChild(e);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=r(t.insertAt.before,n);n.insertBefore(e,o)}}function f(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=c.indexOf(t);e>=0&&c.splice(e,1)}function m(t){var e=document.createElement("style");if(void 0===t.attrs.type&&(t.attrs.type="text/css"),void 0===t.attrs.nonce){var i=function(){0;return n.nc}();i&&(t.attrs.nonce=i)}return p(e,t.attrs),h(t,e),e}function p(t,e){Object.keys(e).forEach(function(n){t.setAttribute(n,e[n])})}function g(t,e){var n,i,o,r;if(e.transform&&t.css){if(!(r="function"==typeof e.transform?e.transform(t.css):e.transform.default(t.css)))return function(){};t.css=r}if(e.singleton){var c=a++;n=s||(s=m(e)),i=w.bind(null,n,c,!1),o=w.bind(null,n,c,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(t){var e=document.createElement("link");return void 0===t.attrs.type&&(t.attrs.type="text/css"),t.attrs.rel="stylesheet",p(e,t.attrs),h(t,e),e}(e),i=function(t,e,n){var i=n.css,o=n.sourceMap,r=void 0===e.convertToAbsoluteUrls&&o;(e.convertToAbsoluteUrls||r)&&(i=l(i));o&&(i+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var s=new Blob([i],{type:"text/css"}),a=t.href;t.href=URL.createObjectURL(s),a&&URL.revokeObjectURL(a)}.bind(null,n,e),o=function(){f(n),n.href&&URL.revokeObjectURL(n.href)}):(n=m(e),i=function(t,e){var n=e.css,i=e.media;i&&t.setAttribute("media",i);if(t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}.bind(null,n),o=function(){f(n)});return i(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;i(t=e)}else o()}}t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(e=e||{}).attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=o()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var n=u(t,e);return d(n,e),function(t){for(var o=[],r=0;r<n.length;r++){var s=n[r];(a=i[s.id]).refs--,o.push(a)}t&&d(u(t,e),e);for(r=0;r<o.length;r++){var a;if(0===(a=o[r]).refs){for(var c=0;c<a.parts.length;c++)a.parts[c]();delete i[a.id]}}}};var b=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}();function w(t,e,n,i){var o=n?"":i.css;if(t.styleSheet)t.styleSheet.cssText=b(e,o);else{var r=document.createTextNode(o),s=t.childNodes;s[e]&&t.removeChild(s[e]),s.length?t.insertBefore(r,s[e]):t.appendChild(r)}}},,function(t,e,n){"use strict";var i=n(9),o="object"==typeof self&&self&&self.Object===Object&&self,r=i.a||o||Function("return this")();e.a=r},function(t,e,n){"use strict";(function(t){var i=n(9),o="object"==typeof exports&&exports&&!exports.nodeType&&exports,r=o&&"object"==typeof t&&t&&!t.nodeType&&t,s=r&&r.exports===o&&i.a.process,a=function(){try{var t=r&&r.require&&r.require("util").types;return t||s&&s.binding&&s.binding("util")}catch(t){}}();e.a=a}).call(this,n(11)(t))},function(t,e,n){"use strict";(function(t){var i=n(4),o=n(18),r="object"==typeof exports&&exports&&!exports.nodeType&&exports,s=r&&"object"==typeof t&&t&&!t.nodeType&&t,a=s&&s.exports===r?i.a.Buffer:void 0,c=(a?a.isBuffer:void 0)||o.a;e.a=c}).call(this,n(11)(t))},function(t,e){t.exports='<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6.972 16.615a.997.997 0 0 1-.744-.292l-4.596-4.596a1 1 0 1 1 1.414-1.414l3.926 3.926 9.937-9.937a1 1 0 0 1 1.414 1.415L7.717 16.323a.997.997 0 0 1-.745.292z"/></svg>'},function(t,e){t.exports='<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11.591 10.177l4.243 4.242a1 1 0 0 1-1.415 1.415l-4.242-4.243-4.243 4.243a1 1 0 0 1-1.414-1.415l4.243-4.242L4.52 5.934A1 1 0 0 1 5.934 4.52l4.243 4.243 4.242-4.243a1 1 0 1 1 1.415 1.414l-4.243 4.243z"/></svg>'},function(t,e,n){"use strict";(function(t){var n="object"==typeof t&&t&&t.Object===Object&&t;e.a=n}).call(this,n(16))},function(t,e){t.exports='<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 4.5V3h16v1.5zm0 3V6h5.674v1.5zm0 3V9h5.674v1.5zm0 3V12h5.674v1.5zm8.5-6V12h6V7.5h-6zM9.682 6h7.636c.377 0 .682.407.682.91v5.68c0 .503-.305.91-.682.91H9.682c-.377 0-.682-.407-.682-.91V6.91c0-.503.305-.91.682-.91zM2 16.5V15h16v1.5z"/></svg>'},function(t,e){t.exports=function(t){if(!t.webpackPolyfill){var e=Object.create(t);e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),Object.defineProperty(e,"exports",{enumerable:!0}),e.webpackPolyfill=1}return e}},function(t){t.exports={a:"11.2.0"}},function(t,e){t.exports='<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 4.5V3h16v1.5zm2.5 3V12h11V7.5h-11zM4.061 6H15.94c.586 0 1.061.407 1.061.91v5.68c0 .503-.475.91-1.061.91H4.06c-.585 0-1.06-.407-1.06-.91V6.91C3 6.406 3.475 6 4.061 6zM2 16.5V15h16v1.5z"/></svg>'},function(t,e){t.exports='<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414"><path d="M18 4.5V3H2v1.5h16zm0 3V6h-5.674v1.5H18zm0 3V9h-5.674v1.5H18zm0 3V12h-5.674v1.5H18zm-8.5-6V12h-6V7.5h6zm.818-1.5H2.682C2.305 6 2 6.407 2 6.91v5.68c0 .503.305.91.682.91h7.636c.377 0 .682-.407.682-.91V6.91c0-.503-.305-.91-.682-.91zM18 16.5V15H2v1.5h16z"/></svg>'},function(t,e){t.exports='<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 4.5V3h16v1.5zm4.5 3V12h7V7.5h-7zM5.758 6h8.484c.419 0 .758.407.758.91v5.681c0 .502-.34.909-.758.909H5.758c-.419 0-.758-.407-.758-.91V6.91c0-.503.34-.91.758-.91zM2 16.5V15h16v1.5z"/></svg>'},function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){var i=n(92);"string"==typeof i&&(i=[[t.i,i,""]]);var o={singleton:!0,hmr:!0,transform:void 0,insertInto:void 0};n(2)(i,o);i.locals&&(t.exports=i.locals)},function(t,e,n){"use strict";e.a=function(){return!1}},function(t,e,n){"use strict";(function(t){var i=n(4),o="object"==typeof exports&&exports&&!exports.nodeType&&exports,r=o&&"object"==typeof t&&t&&!t.nodeType&&t,s=r&&r.exports===o?i.a.Buffer:void 0,a=s?s.allocUnsafe:void 0;e.a=function(t,e){if(e)return t.slice();var n=t.length,i=a?a(n):new t.constructor(n);return t.copy(i),i}}).call(this,n(11)(t))},function(t,e){t.exports='<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5.042 9.367l2.189 1.837a.75.75 0 0 1-.965 1.149l-3.788-3.18a.747.747 0 0 1-.21-.284.75.75 0 0 1 .17-.945L6.23 4.762a.75.75 0 1 1 .964 1.15L4.863 7.866h8.917A.75.75 0 0 1 14 7.9a4 4 0 1 1-1.477 7.718l.344-1.489a2.5 2.5 0 1 0 1.094-4.73l.008-.032H5.042z"/></svg>'},function(t,e){t.exports='<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M14.958 9.367l-2.189 1.837a.75.75 0 0 0 .965 1.149l3.788-3.18a.747.747 0 0 0 .21-.284.75.75 0 0 0-.17-.945L13.77 4.762a.75.75 0 1 0-.964 1.15l2.331 1.955H6.22A.75.75 0 0 0 6 7.9a4 4 0 1 0 1.477 7.718l-.344-1.489A2.5 2.5 0 1 1 6.039 9.4l-.008-.032h8.927z"/></svg>'},function(t,e){t.exports='<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.187 17H5.773c-.637 0-1.092-.138-1.364-.415-.273-.277-.409-.718-.409-1.323V4.738c0-.617.14-1.062.419-1.332.279-.27.73-.406 1.354-.406h4.68c.69 0 1.288.041 1.793.124.506.083.96.242 1.36.478.341.197.644.447.906.75a3.262 3.262 0 0 1 .808 2.162c0 1.401-.722 2.426-2.167 3.075C15.05 10.175 16 11.315 16 13.01a3.756 3.756 0 0 1-2.296 3.504 6.1 6.1 0 0 1-1.517.377c-.571.073-1.238.11-2 .11zm-.217-6.217H7v4.087h3.069c1.977 0 2.965-.69 2.965-2.072 0-.707-.256-1.22-.768-1.537-.512-.319-1.277-.478-2.296-.478zM7 5.13v3.619h2.606c.729 0 1.292-.067 1.69-.2a1.6 1.6 0 0 0 .91-.765c.165-.267.247-.566.247-.897 0-.707-.26-1.176-.778-1.409-.519-.232-1.31-.348-2.375-.348H7z"/></svg>'},function(t,e){t.exports='<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.586 14.633l.021.004c-.036.335.095.655.393.962.082.083.173.15.274.201h1.474a.6.6 0 1 1 0 1.2H5.304a.6.6 0 0 1 0-1.2h1.15c.474-.07.809-.182 1.005-.334.157-.122.291-.32.404-.597l2.416-9.55a1.053 1.053 0 0 0-.281-.823 1.12 1.12 0 0 0-.442-.296H8.15a.6.6 0 0 1 0-1.2h6.443a.6.6 0 1 1 0 1.2h-1.195c-.376.056-.65.155-.823.296-.215.175-.423.439-.623.79l-2.366 9.347z"/></svg>'},function(t,e){t.exports='<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 10.423a6.5 6.5 0 0 1 6.056-6.408l.038.67C6.448 5.423 5.354 7.663 5.22 10H9c.552 0 .5.432.5.986v4.511c0 .554-.448.503-1 .503h-5c-.552 0-.5-.449-.5-1.003v-4.574zm8 0a6.5 6.5 0 0 1 6.056-6.408l.038.67c-2.646.739-3.74 2.979-3.873 5.315H17c.552 0 .5.432.5.986v4.511c0 .554-.448.503-1 .503h-5c-.552 0-.5-.449-.5-1.003v-4.574z"/></svg>'},function(t,e){t.exports='<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11.627 16.5a3.496 3.496 0 0 1 0 0zm5.873-.196a3.484 3.484 0 0 1 0 0zm0-7.001V8h-13v8.5h4.341c.191.54.457 1.044.785 1.5H2a1.5 1.5 0 0 1-1.5-1.5v-13A1.5 1.5 0 0 1 2 2h4.5a1.5 1.5 0 0 1 1.06.44L9.122 4H16a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 19 8v2.531a6.027 6.027 0 0 0-1.5-1.228zM16 6.5v-1H8.5l-2-2H2v13h1V8a1.5 1.5 0 0 1 1.5-1.5H16z"/><path d="M14.5 19.5a5 5 0 1 1 0-10 5 5 0 0 1 0 10zM15 14v-2h-1v2h-2v1h2v2h1v-2h2v-1h-2z"/></svg>\n'},function(t,e){t.exports='<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M4 0v1H1v3H0V.5A.5.5 0 0 1 .5 0H4zm8 0h3.5a.5.5 0 0 1 .5.5V4h-1V1h-3V0zM4 16H.5a.5.5 0 0 1-.5-.5V12h1v3h3v1zm8 0v-1h3v-3h1v3.5a.5.5 0 0 1-.5.5H12z"/><path fill-opacity=".256" d="M1 1h14v14H1z"/><g class="ck-icon__selected-indicator"><path d="M7 0h2v1H7V0zM0 7h1v2H0V7zm15 0h1v2h-1V7zm-8 8h2v1H7v-1z"/><path fill-opacity=".254" d="M1 1h14v14H1z"/></g></svg>'},function(t,e){t.exports='<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5.085 6.22L2.943 4.078a.75.75 0 1 1 1.06-1.06l2.592 2.59A11.094 11.094 0 0 1 10 5.068c4.738 0 8.578 3.101 8.578 5.083 0 1.197-1.401 2.803-3.555 3.887l1.714 1.713a.75.75 0 0 1-.09 1.138.488.488 0 0 1-.15.084.75.75 0 0 1-.821-.16L6.17 7.304c-.258.11-.51.233-.757.365l6.239 6.24-.006.005.78.78c-.388.094-.78.166-1.174.215l-1.11-1.11h.011L4.55 8.197a7.2 7.2 0 0 0-.665.514l-.112.098 4.897 4.897-.005.006 1.276 1.276a10.164 10.164 0 0 1-1.477-.117l-.479-.479-.009.009-4.863-4.863-.022.031a2.563 2.563 0 0 0-.124.2c-.043.077-.08.158-.108.241a.534.534 0 0 0-.028.133.29.29 0 0 0 .008.072.927.927 0 0 0 .082.226c.067.133.145.26.234.379l3.242 3.365.025.01.59.623c-3.265-.918-5.59-3.155-5.59-4.668 0-1.194 1.448-2.838 3.663-3.93zm7.07.531a4.632 4.632 0 0 1 1.108 5.992l.345.344.046-.018a9.313 9.313 0 0 0 2-1.112c.256-.187.5-.392.727-.613.137-.134.27-.277.392-.431.072-.091.141-.185.203-.286.057-.093.107-.19.148-.292a.72.72 0 0 0 .036-.12.29.29 0 0 0 .008-.072.492.492 0 0 0-.028-.133.999.999 0 0 0-.036-.096 2.165 2.165 0 0 0-.071-.145 2.917 2.917 0 0 0-.125-.2 3.592 3.592 0 0 0-.263-.335 5.444 5.444 0 0 0-.53-.523 7.955 7.955 0 0 0-1.054-.768 9.766 9.766 0 0 0-1.879-.891c-.337-.118-.68-.219-1.027-.301zm-2.85.21l-.069.002a.508.508 0 0 0-.254.097.496.496 0 0 0-.104.679.498.498 0 0 0 .326.199l.045.005c.091.003.181.003.272.012a2.45 2.45 0 0 1 2.017 1.513c.024.061.043.125.069.185a.494.494 0 0 0 .45.287h.008a.496.496 0 0 0 .35-.158.482.482 0 0 0 .13-.335.638.638 0 0 0-.048-.219 3.379 3.379 0 0 0-.36-.723 3.438 3.438 0 0 0-2.791-1.543l-.028-.001h-.013z"/></svg>'},function(t,e){t.exports='<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6.91 10.54c.26-.23.64-.21.88.03l3.36 3.14 2.23-2.06a.64.64 0 0 1 .87 0l2.52 2.97V4.5H3.2v10.12l3.71-4.08zm10.27-7.51c.6 0 1.09.47 1.09 1.05v11.84c0 .59-.49 1.06-1.09 1.06H2.79c-.6 0-1.09-.47-1.09-1.06V4.08c0-.58.49-1.05 1.1-1.05h14.38zm-5.22 5.56a1.96 1.96 0 1 1 3.4-1.96 1.96 1.96 0 0 1-3.4 1.96z"/></svg>'},function(t,e){t.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 250"><rect rx="4"/></svg>'},function(t,e){t.exports='<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"><path d="M.941 4.523a.75.75 0 1 1 1.06-1.06l3.006 3.005 3.005-3.005a.75.75 0 1 1 1.06 1.06l-3.549 3.55a.75.75 0 0 1-1.168-.136L.941 4.523z"/></svg>'},function(t,e){t.exports='<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11.077 15l.991-1.416a.75.75 0 1 1 1.229.86l-1.148 1.64a.748.748 0 0 1-.217.206 5.251 5.251 0 0 1-8.503-5.955.741.741 0 0 1 .12-.274l1.147-1.639a.75.75 0 1 1 1.228.86L4.933 10.7l.006.003a3.75 3.75 0 0 0 6.132 4.294l.006.004zm5.494-5.335a.748.748 0 0 1-.12.274l-1.147 1.639a.75.75 0 1 1-1.228-.86l.86-1.23a3.75 3.75 0 0 0-6.144-4.301l-.86 1.229a.75.75 0 0 1-1.229-.86l1.148-1.64a.748.748 0 0 1 .217-.206 5.251 5.251 0 0 1 8.503 5.955zm-4.563-2.532a.75.75 0 0 1 .184 1.045l-3.155 4.505a.75.75 0 1 1-1.229-.86l3.155-4.506a.75.75 0 0 1 1.045-.184zm4.919 10.562l-1.414 1.414a.75.75 0 1 1-1.06-1.06l1.414-1.415-1.415-1.414a.75.75 0 0 1 1.061-1.06l1.414 1.414 1.414-1.415a.75.75 0 0 1 1.061 1.061l-1.414 1.414 1.414 1.415a.75.75 0 0 1-1.06 1.06l-1.415-1.414z"/></svg>'},function(t,e){t.exports='<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7.3 17.37l-.061.088a1.518 1.518 0 0 1-.934.535l-4.178.663-.806-4.153a1.495 1.495 0 0 1 .187-1.058l.056-.086L8.77 2.639c.958-1.351 2.803-1.076 4.296-.03 1.497 1.047 2.387 2.693 1.433 4.055L7.3 17.37zM9.14 4.728l-5.545 8.346 3.277 2.294 5.544-8.346L9.14 4.728zM6.07 16.512l-3.276-2.295.53 2.73 2.746-.435zM9.994 3.506L13.271 5.8c.316-.452-.16-1.333-1.065-1.966-.905-.634-1.895-.78-2.212-.328zM8 18.5L9.375 17H19v1.5H8z"/></svg>'},function(t,e){t.exports='<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11.077 15l.991-1.416a.75.75 0 1 1 1.229.86l-1.148 1.64a.748.748 0 0 1-.217.206 5.251 5.251 0 0 1-8.503-5.955.741.741 0 0 1 .12-.274l1.147-1.639a.75.75 0 1 1 1.228.86L4.933 10.7l.006.003a3.75 3.75 0 0 0 6.132 4.294l.006.004zm5.494-5.335a.748.748 0 0 1-.12.274l-1.147 1.639a.75.75 0 1 1-1.228-.86l.86-1.23a3.75 3.75 0 0 0-6.144-4.301l-.86 1.229a.75.75 0 0 1-1.229-.86l1.148-1.64a.748.748 0 0 1 .217-.206 5.251 5.251 0 0 1 8.503 5.955zm-4.563-2.532a.75.75 0 0 1 .184 1.045l-3.155 4.505a.75.75 0 1 1-1.229-.86l3.155-4.506a.75.75 0 0 1 1.045-.184z"/></svg>'},function(t,e){t.exports='<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 5.75c0 .414.336.75.75.75h9.5a.75.75 0 1 0 0-1.5h-9.5a.75.75 0 0 0-.75.75zM3.5 3v5H2V3.7H1v-1h2.5V3zM.343 17.857l2.59-3.257H2.92a.6.6 0 1 0-1.04 0H.302a2 2 0 1 1 3.995 0h-.001c-.048.405-.16.734-.333.988-.175.254-.59.692-1.244 1.312H4.3v1h-4l.043-.043zM7 14.75a.75.75 0 0 1 .75-.75h9.5a.75.75 0 1 1 0 1.5h-9.5a.75.75 0 0 1-.75-.75z"/></svg>'},function(t,e){t.exports='<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 5.75c0 .414.336.75.75.75h9.5a.75.75 0 1 0 0-1.5h-9.5a.75.75 0 0 0-.75.75zm-6 0C1 4.784 1.777 4 2.75 4c.966 0 1.75.777 1.75 1.75 0 .966-.777 1.75-1.75 1.75C1.784 7.5 1 6.723 1 5.75zm6 9c0 .414.336.75.75.75h9.5a.75.75 0 1 0 0-1.5h-9.5a.75.75 0 0 0-.75.75zm-6 0c0-.966.777-1.75 1.75-1.75.966 0 1.75.777 1.75 1.75 0 .966-.777 1.75-1.75 1.75-.966 0-1.75-.777-1.75-1.75z"/></svg>'},function(t,e){t.exports='<svg viewBox="0 0 64 42" xmlns="http://www.w3.org/2000/svg"><path d="M47.426 17V3.713L63.102 0v19.389h-.001l.001.272c0 1.595-2.032 3.43-4.538 4.098-2.506.668-4.538-.083-4.538-1.678 0-1.594 2.032-3.43 4.538-4.098.914-.244 2.032-.565 2.888-.603V4.516L49.076 7.447v9.556A1.014 1.014 0 0 0 49 17h-1.574zM29.5 17h-8.343a7.073 7.073 0 1 0-4.657 4.06v3.781H3.3a2.803 2.803 0 0 1-2.8-2.804V8.63a2.803 2.803 0 0 1 2.8-2.805h4.082L8.58 2.768A1.994 1.994 0 0 1 10.435 1.5h8.985c.773 0 1.477.448 1.805 1.149l1.488 3.177H26.7c1.546 0 2.8 1.256 2.8 2.805V17zm-11.637 0H17.5a1 1 0 0 0-1 1v.05A4.244 4.244 0 1 1 17.863 17zm29.684 2c.97 0 .953-.048.953.889v20.743c0 .953.016.905-.953.905H19.453c-.97 0-.953.048-.953-.905V19.89c0-.937-.016-.889.97-.889h28.077zm-4.701 19.338V22.183H24.154v16.155h18.692zM20.6 21.375v1.616h1.616v-1.616H20.6zm0 3.231v1.616h1.616v-1.616H20.6zm0 3.231v1.616h1.616v-1.616H20.6zm0 3.231v1.616h1.616v-1.616H20.6zm0 3.231v1.616h1.616v-1.616H20.6zm0 3.231v1.616h1.616V37.53H20.6zm24.233-16.155v1.616h1.615v-1.616h-1.615zm0 3.231v1.616h1.615v-1.616h-1.615zm0 3.231v1.616h1.615v-1.616h-1.615zm0 3.231v1.616h1.615v-1.616h-1.615zm0 3.231v1.616h1.615v-1.616h-1.615zm0 3.231v1.616h1.615V37.53h-1.615zM29.485 25.283a.4.4 0 0 1 .593-.35l9.05 4.977a.4.4 0 0 1 0 .701l-9.05 4.978a.4.4 0 0 1-.593-.35v-9.956z"/></svg>\n'},function(t,e){t.exports='<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M18.68 2.53c.6 0 .59-.03.59.55v12.84c0 .59.01.56-.59.56H1.29c-.6 0-.59.03-.59-.56V3.08c0-.58-.01-.55.6-.55h17.38zM15.77 14.5v-10H4.2v10h11.57zM2 4v1h1V4H2zm0 2v1h1V6H2zm0 2v1h1V8H2zm0 2v1h1v-1H2zm0 2v1h1v-1H2zm0 2v1h1v-1H2zM17 4v1h1V4h-1zm0 2v1h1V6h-1zm0 2v1h1V8h-1zm0 2v1h1v-1h-1zm0 2v1h1v-1h-1zm0 2v1h1v-1h-1zM7.5 6.677a.4.4 0 0 1 .593-.351l5.133 2.824a.4.4 0 0 1 0 .7l-5.133 2.824a.4.4 0 0 1-.593-.35V6.676z"/></svg>'},function(t,e){t.exports='<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 6v3h4V6H3zm0 4v3h4v-3H3zm0 4v3h4v-3H3zm5 3h4v-3H8v3zm5 0h4v-3h-4v3zm4-4v-3h-4v3h4zm0-4V6h-4v3h4zm1.5 8a1.5 1.5 0 0 1-1.5 1.5H3A1.5 1.5 0 0 1 1.5 17V4c.222-.863 1.068-1.5 2-1.5h13c.932 0 1.778.637 2 1.5v13zM12 13v-3H8v3h4zm0-4V6H8v3h4z"/></svg>'},function(t,e){t.exports='<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g><path d="M2.5 1h15A1.5 1.5 0 0 1 19 2.5v15a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 1 17.5v-15A1.5 1.5 0 0 1 2.5 1zM2 2v16h16V2H2z" opacity=".6"/><path d="M18 7v1H2V7h16zm0 5v1H2v-1h16z" opacity=".6"/><path d="M14 1v18a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1zm-2 1H8v4h4V2zm0 6H8v4h4V8zm0 6H8v4h4v-4z"/></g></svg>'},function(t,e){t.exports='<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g><path d="M2.5 1h15A1.5 1.5 0 0 1 19 2.5v15a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 1 17.5v-15A1.5 1.5 0 0 1 2.5 1zM2 2v16h16V2H2z" opacity=".6"/><path d="M7 2h1v16H7V2zm5 0h1v16h-1V2z" opacity=".6"/><path d="M1 6h18a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zm1 2v4h4V8H2zm6 0v4h4V8H8zm6 0v4h4V8h-4z"/></g></svg>'},function(t,e){t.exports='<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g><path d="M2.5 1h15A1.5 1.5 0 0 1 19 2.5v15a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 1 17.5v-15A1.5 1.5 0 0 1 2.5 1zM2 2v16h16V2H2z" opacity=".6"/><path d="M7 2h1v16H7V2zm5 0h1v7h-1V2zm6 5v1H2V7h16zM8 12v1H2v-1h6z" opacity=".6"/><path d="M7 7h12a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1zm1 2v9h10V9H8z"/></g></svg>'},function(t,e,n){"use strict";(function(t){var e=n(1),i=n(12);const o="object"==typeof window?window:t;o.CKEDITOR_VERSION?e.a.error("ckeditor-version-collision: The global CKEDITOR_VERSION constant has already been set.",{collidingVersion:o.CKEDITOR_VERSION,version:i.a}):o.CKEDITOR_VERSION=i.a}).call(this,n(16))},function(t,e,n){var i=n(44);"string"==typeof i&&(i=[[t.i,i,""]]);var o={singleton:!0,hmr:!0,transform:void 0,insertInto:void 0};n(2)(i,o);i.locals&&(t.exports=i.locals)},function(t,e){t.exports=".ck-hidden{display:none!important}.ck.ck-reset,.ck.ck-reset_all,.ck.ck-reset_all *{box-sizing:border-box;width:auto;height:auto;position:static}:root{--ck-z-default:1;--ck-z-modal:calc(var(--ck-z-default) + 999);--ck-color-base-foreground:#fafafa;--ck-color-base-background:#fff;--ck-color-base-border:#c4c4c4;--ck-color-base-action:#61b045;--ck-color-base-focus:#6cb5f9;--ck-color-base-text:#333;--ck-color-base-active:#198cf0;--ck-color-base-active-focus:#0e7fe1;--ck-color-base-error:#db3700;--ck-color-focus-border:#47a4f5;--ck-color-focus-shadow:rgba(119,186,248,0.5);--ck-color-focus-disabled-shadow:rgba(119,186,248,0.3);--ck-color-focus-error-shadow:rgba(255,64,31,0.3);--ck-color-text:var(--ck-color-base-text);--ck-color-shadow-drop:rgba(0,0,0,0.15);--ck-color-shadow-inner:rgba(0,0,0,0.1);--ck-color-button-default-background:transparent;--ck-color-button-default-hover-background:#e6e6e6;--ck-color-button-default-active-background:#d9d9d9;--ck-color-button-default-active-shadow:#bfbfbf;--ck-color-button-default-disabled-background:transparent;--ck-color-button-on-background:#dedede;--ck-color-button-on-hover-background:#c4c4c4;--ck-color-button-on-active-background:#bababa;--ck-color-button-on-active-shadow:#a1a1a1;--ck-color-button-on-disabled-background:#dedede;--ck-color-button-action-background:var(--ck-color-base-action);--ck-color-button-action-hover-background:#579e3d;--ck-color-button-action-active-background:#53973b;--ck-color-button-action-active-shadow:#498433;--ck-color-button-action-disabled-background:#7ec365;--ck-color-button-action-text:var(--ck-color-base-background);--ck-color-button-save:#008a00;--ck-color-button-cancel:#db3700;--ck-color-switch-button-off-background:#b0b0b0;--ck-color-switch-button-on-background:var(--ck-color-button-action-background);--ck-color-switch-button-inner-background:var(--ck-color-base-background);--ck-color-dropdown-panel-background:var(--ck-color-base-background);--ck-color-dropdown-panel-border:var(--ck-color-base-border);--ck-color-input-background:var(--ck-color-base-background);--ck-color-input-border:#c7c7c7;--ck-color-input-error-border:var(--ck-color-base-error);--ck-color-input-text:var(--ck-color-base-text);--ck-color-input-disabled-background:#f2f2f2;--ck-color-input-disabled-border:#c7c7c7;--ck-color-input-disabled-text:#5c5c5c;--ck-color-list-background:var(--ck-color-base-background);--ck-color-list-button-hover-background:var(--ck-color-base-foreground);--ck-color-list-button-on-background:var(--ck-color-base-active);--ck-color-list-button-on-background-focus:var(--ck-color-base-active-focus);--ck-color-list-button-on-text:var(--ck-color-base-background);--ck-color-panel-background:var(--ck-color-base-background);--ck-color-panel-border:var(--ck-color-base-border);--ck-color-toolbar-background:var(--ck-color-base-foreground);--ck-color-toolbar-border:var(--ck-color-base-border);--ck-color-tooltip-background:var(--ck-color-base-text);--ck-color-tooltip-text:var(--ck-color-base-background);--ck-color-engine-placeholder-text:#c2c2c2;--ck-color-upload-bar-background:#6cb5f9;--ck-color-upload-infinite-background:rgba(0,0,0,0.1);--ck-color-link-default:#0000f0;--ck-color-link-selected-background:rgba(31,177,255,0.1);--ck-disabled-opacity:.5;--ck-focus-outer-shadow-geometry:0 0 0 3px;--ck-focus-outer-shadow:var(--ck-focus-outer-shadow-geometry) var(--ck-color-focus-shadow);--ck-focus-disabled-outer-shadow:var(--ck-focus-outer-shadow-geometry) var(--ck-color-focus-disabled-shadow);--ck-focus-error-outer-shadow:var(--ck-focus-outer-shadow-geometry) var(--ck-color-focus-error-shadow);--ck-focus-ring:1px solid var(--ck-color-focus-border);--ck-font-size-base:13px;--ck-line-height-base:1.84615;--ck-font-face:Helvetica,Arial,Tahoma,Verdana,Sans-Serif;--ck-font-size-tiny:0.7em;--ck-font-size-small:0.75em;--ck-font-size-normal:1em;--ck-font-size-big:1.4em;--ck-font-size-large:1.8em;--ck-ui-component-min-height:2.3em}.ck.ck-reset,.ck.ck-reset_all,.ck.ck-reset_all *{margin:0;padding:0;border:0;background:transparent;text-decoration:none;vertical-align:middle;transition:none;word-wrap:break-word}.ck.ck-reset_all,.ck.ck-reset_all *{border-collapse:collapse;font:normal normal normal var(--ck-font-size-base)/var(--ck-line-height-base) var(--ck-font-face);color:var(--ck-color-text);text-align:left;white-space:nowrap;cursor:auto;float:none}.ck.ck-reset_all .ck-rtl *{text-align:right}.ck.ck-reset_all iframe{vertical-align:inherit}.ck.ck-reset_all textarea{white-space:pre-wrap}.ck.ck-reset_all input[type=password],.ck.ck-reset_all input[type=text],.ck.ck-reset_all textarea{cursor:text}.ck.ck-reset_all input[type=password][disabled],.ck.ck-reset_all input[type=text][disabled],.ck.ck-reset_all textarea[disabled]{cursor:default}.ck.ck-reset_all fieldset{padding:10px;border:2px groove #dfdee3}.ck.ck-reset_all button::-moz-focus-inner{padding:0;border:0}:root{--ck-border-radius:2px;--ck-inner-shadow:2px 2px 3px var(--ck-color-shadow-inner) inset;--ck-drop-shadow:0 1px 2px 1px var(--ck-color-shadow-drop);--ck-spacing-unit:0.6em;--ck-spacing-large:calc(var(--ck-spacing-unit)*1.5);--ck-spacing-standard:var(--ck-spacing-unit);--ck-spacing-medium:calc(var(--ck-spacing-unit)*0.8);--ck-spacing-small:calc(var(--ck-spacing-unit)*0.5);--ck-spacing-tiny:calc(var(--ck-spacing-unit)*0.3);--ck-spacing-extra-tiny:calc(var(--ck-spacing-unit)*0.16)}"},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var n=e.protocol+"//"+e.host,i=n+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var o,r=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(r)?t:(o=0===r.indexOf("//")?r:0===r.indexOf("/")?n+r:i+r.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")})}},function(t,e,n){var i=n(47);"string"==typeof i&&(i=[[t.i,i,""]]);var o={singleton:!0,hmr:!0,transform:void 0,insertInto:void 0};n(2)(i,o);i.locals&&(t.exports=i.locals)},function(t,e){t.exports=".ck.ck-editor__editable:not(.ck-editor__nested-editable){border-radius:0}.ck-rounded-corners .ck.ck-editor__editable:not(.ck-editor__nested-editable),.ck.ck-editor__editable:not(.ck-editor__nested-editable).ck-rounded-corners{border-radius:var(--ck-border-radius)}.ck.ck-editor__editable:not(.ck-editor__nested-editable).ck-focused{outline:none;border:var(--ck-focus-ring);box-shadow:var(--ck-inner-shadow),0 0}.ck.ck-editor__editable_inline{overflow:auto;padding:0 var(--ck-spacing-standard);border:1px solid transparent}.ck.ck-editor__editable_inline>:first-child{margin-top:var(--ck-spacing-large)}.ck.ck-editor__editable_inline>:last-child{margin-bottom:var(--ck-spacing-large)}.ck.ck-balloon-panel.ck-toolbar-container[class*=arrow_n]:after{border-bottom-color:var(--ck-color-base-foreground)}.ck.ck-balloon-panel.ck-toolbar-container[class*=arrow_s]:after{border-top-color:var(--ck-color-base-foreground)}"},function(t,e,n){var i=n(49);"string"==typeof i&&(i=[[t.i,i,""]]);var o={singleton:!0,hmr:!0,transform:void 0,insertInto:void 0};n(2)(i,o);i.locals&&(t.exports=i.locals)},function(t,e){t.exports=".ck.ck-label{display:block}.ck.ck-voice-label{display:none}.ck.ck-label{font-weight:700}"},function(t,e,n){var i=n(51);"string"==typeof i&&(i=[[t.i,i,""]]);var o={singleton:!0,hmr:!0,transform:void 0,insertInto:void 0};n(2)(i,o);i.locals&&(t.exports=i.locals)},function(t,e){t.exports=".ck.ck-sticky-panel .ck-sticky-panel__content_sticky{z-index:var(--ck-z-modal);position:fixed;top:0}.ck.ck-sticky-panel .ck-sticky-panel__content_sticky_bottom-limit{top:auto;position:absolute}.ck.ck-sticky-panel .ck-sticky-panel__content_sticky{box-shadow:var(--ck-drop-shadow),0 0;border-width:0 1px 1px;border-top-left-radius:0;border-top-right-radius:0}"},function(t,e,n){var i=n(53);"string"==typeof i&&(i=[[t.i,i,""]]);var o={singleton:!0,hmr:!0,transform:void 0,insertInto:void 0};n(2)(i,o);i.locals&&(t.exports=i.locals)},function(t,e){t.exports=".ck.ck-toolbar{-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none;display:flex;flex-flow:row wrap;align-items:center}.ck.ck-toolbar.ck-toolbar_vertical{flex-direction:column}.ck.ck-toolbar.ck-toolbar_floating{flex-wrap:nowrap}.ck.ck-toolbar__separator{display:inline-block}.ck.ck-toolbar__newline{display:block;width:100%}.ck.ck-toolbar{border-radius:0}.ck-rounded-corners .ck.ck-toolbar,.ck.ck-toolbar.ck-rounded-corners{border-radius:var(--ck-border-radius)}.ck.ck-toolbar{background:var(--ck-color-toolbar-background);padding:0 var(--ck-spacing-small);border:1px solid var(--ck-color-toolbar-border)}.ck.ck-toolbar>*{margin-right:var(--ck-spacing-small);margin-top:var(--ck-spacing-small);margin-bottom:var(--ck-spacing-small)}.ck.ck-toolbar.ck-toolbar_vertical{padding:0}.ck.ck-toolbar.ck-toolbar_vertical>*{width:100%;margin:0;border-radius:0;border:0}.ck.ck-toolbar>:last-child{margin-right:0}.ck-toolbar-container .ck.ck-toolbar{border:0}.ck.ck-toolbar__separator{align-self:stretch;width:1px;margin-top:0;margin-bottom:0;background:var(--ck-color-toolbar-border)}.ck.ck-toolbar__newline{margin:0}"},function(t,e,n){var i=n(55);"string"==typeof i&&(i=[[t.i,i,""]]);var o={singleton:!0,hmr:!0,transform:void 0,insertInto:void 0};n(2)(i,o);i.locals&&(t.exports=i.locals)},function(t,e){t.exports=".ck.ck-editor{position:relative}.ck.ck-editor .ck-editor__top .ck-sticky-panel .ck-toolbar{z-index:var(--ck-z-modal)}.ck.ck-editor__top .ck-sticky-panel .ck-toolbar{border-radius:0}.ck-rounded-corners .ck.ck-editor__top .ck-sticky-panel .ck-toolbar,.ck.ck-editor__top .ck-sticky-panel .ck-toolbar.ck-rounded-corners{border-radius:var(--ck-border-radius);border-bottom-left-radius:0;border-bottom-right-radius:0}.ck.ck-editor__top .ck-sticky-panel .ck-toolbar{border-bottom-width:0}.ck.ck-editor__top .ck-sticky-panel .ck-sticky-panel__content_sticky .ck-toolbar{border-bottom-width:1px;border-radius:0}.ck-rounded-corners .ck.ck-editor__top .ck-sticky-panel .ck-sticky-panel__content_sticky .ck-toolbar,.ck.ck-editor__top .ck-sticky-panel .ck-sticky-panel__content_sticky .ck-toolbar.ck-rounded-corners{border-radius:var(--ck-border-radius);border-radius:0}.ck.ck-editor__main>.ck-editor__editable{background:var(--ck-color-base-background);border-radius:0}.ck-rounded-corners .ck.ck-editor__main>.ck-editor__editable,.ck.ck-editor__main>.ck-editor__editable.ck-rounded-corners{border-radius:var(--ck-border-radius);border-top-left-radius:0;border-top-right-radius:0}.ck.ck-editor__main>.ck-editor__editable:not(.ck-focused){border-color:var(--ck-color-base-border)}"},function(t,e,n){var i=n(57);"string"==typeof i&&(i=[[t.i,i,""]]);var o={singleton:!0,hmr:!0,transform:void 0,insertInto:void 0};n(2)(i,o);i.locals&&(t.exports=i.locals)},function(t,e){t.exports=".ck.ck-icon{vertical-align:middle}:root{--ck-icon-size:calc(var(--ck-line-height-base)*var(--ck-font-size-normal))}.ck.ck-icon{width:var(--ck-icon-size);height:var(--ck-icon-size);font-size:.8333350694em;will-change:transform}.ck.ck-icon,.ck.ck-icon *{color:inherit;cursor:inherit}.ck.ck-icon :not([fill]){fill:currentColor}"},function(t,e,n){var i=n(59);"string"==typeof i&&(i=[[t.i,i,""]]);var o={singleton:!0,hmr:!0,transform:void 0,insertInto:void 0};n(2)(i,o);i.locals&&(t.exports=i.locals)},function(t,e){t.exports='.ck.ck-tooltip,.ck.ck-tooltip .ck-tooltip__text:after{position:absolute;pointer-events:none;-webkit-backface-visibility:hidden}.ck-tooltip{visibility:hidden;opacity:0;display:none;z-index:var(--ck-z-modal)}.ck-tooltip .ck-tooltip__text{display:inline-block}.ck-tooltip .ck-tooltip__text:after{content:"";width:0;height:0}:root{--ck-tooltip-arrow-size:5px}.ck.ck-tooltip{left:50%}.ck.ck-tooltip.ck-tooltip_s{bottom:calc(-1*var(--ck-tooltip-arrow-size));transform:translateY(100%)}.ck.ck-tooltip.ck-tooltip_s .ck-tooltip__text:after{top:calc(-1*var(--ck-tooltip-arrow-size));transform:translateX(-50%);border-left-color:transparent;border-bottom-color:var(--ck-color-tooltip-background);border-right-color:transparent;border-top-color:transparent;border-left-width:var(--ck-tooltip-arrow-size);border-bottom-width:var(--ck-tooltip-arrow-size);border-right-width:var(--ck-tooltip-arrow-size);border-top-width:0}.ck.ck-tooltip.ck-tooltip_n{top:calc(-1*var(--ck-tooltip-arrow-size));transform:translateY(-100%)}.ck.ck-tooltip.ck-tooltip_n .ck-tooltip__text:after{bottom:calc(-1*var(--ck-tooltip-arrow-size));transform:translateX(-50%);border-left-color:transparent;border-bottom-color:transparent;border-right-color:transparent;border-top-color:var(--ck-color-tooltip-background);border-left-width:var(--ck-tooltip-arrow-size);border-bottom-width:0;border-right-width:var(--ck-tooltip-arrow-size);border-top-width:var(--ck-tooltip-arrow-size)}.ck.ck-tooltip .ck-tooltip__text{border-radius:0}.ck-rounded-corners .ck.ck-tooltip .ck-tooltip__text,.ck.ck-tooltip .ck-tooltip__text.ck-rounded-corners{border-radius:var(--ck-border-radius)}.ck.ck-tooltip .ck-tooltip__text{font-size:.9em;line-height:1.5;color:var(--ck-color-tooltip-text);padding:var(--ck-spacing-small) var(--ck-spacing-medium);background:var(--ck-color-tooltip-background);position:relative;left:-50%}.ck.ck-tooltip .ck-tooltip__text:after{border-style:solid;left:50%}.ck.ck-tooltip,.ck.ck-tooltip .ck-tooltip__text:after{transition:opacity .2s ease-in-out .2s}'},function(t,e,n){var i=n(61);"string"==typeof i&&(i=[[t.i,i,""]]);var o={singleton:!0,hmr:!0,transform:void 0,insertInto:void 0};n(2)(i,o);i.locals&&(t.exports=i.locals)},function(t,e){t.exports=".ck.ck-button,a.ck.ck-button{-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none}.ck.ck-button .ck-tooltip,a.ck.ck-button .ck-tooltip{display:block}@media (hover:none){.ck.ck-button .ck-tooltip,a.ck.ck-button .ck-tooltip{display:none}}.ck.ck-button,a.ck.ck-button{position:relative;display:inline-flex;align-items:center;justify-content:left}.ck.ck-button.ck-button_with-text .ck-button__label,a.ck.ck-button.ck-button_with-text .ck-button__label{display:inline-block}.ck.ck-button:not(.ck-button_with-text),a.ck.ck-button:not(.ck-button_with-text){justify-content:center}.ck.ck-button:hover .ck-tooltip,a.ck.ck-button:hover .ck-tooltip{visibility:visible;opacity:1}.ck.ck-button .ck-button__label,.ck.ck-button:focus:not(:hover) .ck-tooltip,a.ck.ck-button .ck-button__label,a.ck.ck-button:focus:not(:hover) .ck-tooltip{display:none}.ck.ck-button,a.ck.ck-button{background:var(--ck-color-button-default-background)}.ck.ck-button:not(.ck-disabled):hover,a.ck.ck-button:not(.ck-disabled):hover{background:var(--ck-color-button-default-hover-background)}.ck.ck-button:not(.ck-disabled):active,a.ck.ck-button:not(.ck-disabled):active{background:var(--ck-color-button-default-active-background);box-shadow:inset 0 2px 2px var(--ck-color-button-default-active-shadow)}.ck.ck-button.ck-disabled,a.ck.ck-button.ck-disabled{background:var(--ck-color-button-default-disabled-background)}.ck.ck-button,a.ck.ck-button{border-radius:0}.ck-rounded-corners .ck.ck-button,.ck-rounded-corners a.ck.ck-button,.ck.ck-button.ck-rounded-corners,a.ck.ck-button.ck-rounded-corners{border-radius:var(--ck-border-radius)}.ck.ck-button,a.ck.ck-button{white-space:nowrap;cursor:default;vertical-align:middle;padding:var(--ck-spacing-tiny);text-align:center;min-width:var(--ck-ui-component-min-height);min-height:var(--ck-ui-component-min-height);line-height:1;font-size:inherit;border:1px solid transparent;transition:box-shadow .2s ease-in-out;-webkit-appearance:none}.ck.ck-button:active,.ck.ck-button:focus,a.ck.ck-button:active,a.ck.ck-button:focus{outline:none;border:var(--ck-focus-ring);box-shadow:var(--ck-focus-outer-shadow),0 0;border-color:transparent}.ck.ck-button.ck-disabled:active,.ck.ck-button.ck-disabled:focus,a.ck.ck-button.ck-disabled:active,a.ck.ck-button.ck-disabled:focus{box-shadow:var(--ck-focus-disabled-outer-shadow),0 0}.ck.ck-button.ck-disabled .ck-button__icon,a.ck.ck-button.ck-disabled .ck-button__icon{opacity:var(--ck-disabled-opacity)}.ck.ck-button.ck-disabled .ck-button__label,a.ck.ck-button.ck-disabled .ck-button__label{opacity:var(--ck-disabled-opacity)}.ck.ck-button.ck-button_with-text,a.ck.ck-button.ck-button_with-text{padding:var(--ck-spacing-tiny) var(--ck-spacing-standard)}.ck.ck-button.ck-button_with-text .ck-button__icon,a.ck.ck-button.ck-button_with-text .ck-button__icon{margin-left:calc(-1*var(--ck-spacing-small));margin-right:var(--ck-spacing-small)}.ck.ck-button.ck-on,a.ck.ck-button.ck-on{background:var(--ck-color-button-on-background)}.ck.ck-button.ck-on:not(.ck-disabled):hover,a.ck.ck-button.ck-on:not(.ck-disabled):hover{background:var(--ck-color-button-on-hover-background)}.ck.ck-button.ck-on:not(.ck-disabled):active,a.ck.ck-button.ck-on:not(.ck-disabled):active{background:var(--ck-color-button-on-active-background);box-shadow:inset 0 2px 2px var(--ck-color-button-on-active-shadow)}.ck.ck-button.ck-on.ck-disabled,a.ck.ck-button.ck-on.ck-disabled{background:var(--ck-color-button-on-disabled-background)}.ck.ck-button.ck-button-save,a.ck.ck-button.ck-button-save{color:var(--ck-color-button-save)}.ck.ck-button.ck-button-cancel,a.ck.ck-button.ck-button-cancel{color:var(--ck-color-button-cancel)}.ck.ck-button .ck-button__icon use,.ck.ck-button .ck-button__icon use *,a.ck.ck-button .ck-button__icon use,a.ck.ck-button .ck-button__icon use *{color:inherit}.ck.ck-button .ck-button__label,a.ck.ck-button .ck-button__label{font-size:inherit;font-weight:inherit;color:inherit;cursor:inherit;vertical-align:middle}.ck.ck-button-action,a.ck.ck-button-action{background:var(--ck-color-button-action-background)}.ck.ck-button-action:not(.ck-disabled):hover,a.ck.ck-button-action:not(.ck-disabled):hover{background:var(--ck-color-button-action-hover-background)}.ck.ck-button-action:not(.ck-disabled):active,a.ck.ck-button-action:not(.ck-disabled):active{background:var(--ck-color-button-action-active-background);box-shadow:inset 0 2px 2px var(--ck-color-button-action-active-shadow)}.ck.ck-button-action.ck-disabled,a.ck.ck-button-action.ck-disabled{background:var(--ck-color-button-action-disabled-background)}.ck.ck-button-action,a.ck.ck-button-action{color:var(--ck-color-button-action-text)}.ck.ck-button-bold,a.ck.ck-button-bold{font-weight:700}"},function(t,e,n){var i=n(63);"string"==typeof i&&(i=[[t.i,i,""]]);var o={singleton:!0,hmr:!0,transform:void 0,insertInto:void 0};n(2)(i,o);i.locals&&(t.exports=i.locals)},function(t,e){t.exports=".ck-content blockquote{overflow:hidden;padding-right:1.5em;padding-left:1.5em;margin-left:0;font-style:italic;border-left:5px solid #ccc}"},function(t,e,n){var i=n(65);"string"==typeof i&&(i=[[t.i,i,""]]);var o={singleton:!0,hmr:!0,transform:void 0,insertInto:void 0};n(2)(i,o);i.locals&&(t.exports=i.locals)},function(t,e){t.exports=".ck .ck-widget.ck-widget_selectable{position:relative}.ck .ck-widget.ck-widget_selectable .ck-widget__selection-handler{visibility:hidden;position:absolute}.ck .ck-widget.ck-widget_selectable .ck-widget__selection-handler .ck-icon{display:block}.ck .ck-widget.ck-widget_selectable.ck-widget_selected .ck-widget__selection-handler,.ck .ck-widget.ck-widget_selectable:hover .ck-widget__selection-handler{visibility:visible}:root{--ck-widget-outline-thickness:3px;--ck-widget-handler-icon-size:16px;--ck-widget-handler-animation-duration:200ms;--ck-widget-handler-animation-curve:ease;--ck-color-widget-blurred-border:#dedede;--ck-color-widget-hover-border:#ffc83d;--ck-color-widget-editable-focus-background:var(--ck-color-base-background);--ck-color-widget-drag-handler-icon-color:var(--ck-color-base-background)}.ck .ck-widget{outline-width:var(--ck-widget-outline-thickness);outline-style:solid;outline-color:transparent;transition:outline-color var(--ck-widget-handler-animation-duration) var(--ck-widget-handler-animation-curve)}.ck .ck-widget.ck-widget_selected,.ck .ck-widget.ck-widget_selected:hover{outline:var(--ck-widget-outline-thickness) solid var(--ck-color-focus-border)}.ck .ck-widget:hover{outline-color:var(--ck-color-widget-hover-border)}.ck .ck-editor__nested-editable{border:1px solid transparent}.ck .ck-editor__nested-editable.ck-editor__nested-editable_focused,.ck .ck-editor__nested-editable:focus{outline:none;border:var(--ck-focus-ring);box-shadow:var(--ck-inner-shadow),0 0;background-color:var(--ck-color-widget-editable-focus-background)}.ck .ck-widget.ck-widget_selectable .ck-widget__selection-handler{padding:4px;box-sizing:border-box;background-color:transparent;opacity:0;transition:background-color var(--ck-widget-handler-animation-duration) var(--ck-widget-handler-animation-curve),visibility var(--ck-widget-handler-animation-duration) var(--ck-widget-handler-animation-curve),opacity var(--ck-widget-handler-animation-duration) var(--ck-widget-handler-animation-curve);border-radius:var(--ck-border-radius) var(--ck-border-radius) 0 0;transform:translateY(-100%);left:calc(0px - var(--ck-widget-outline-thickness))}.ck .ck-widget.ck-widget_selectable .ck-widget__selection-handler:hover .ck-icon .ck-icon__selected-indicator{opacity:1}.ck .ck-widget.ck-widget_selectable .ck-widget__selection-handler .ck-icon{width:var(--ck-widget-handler-icon-size);height:var(--ck-widget-handler-icon-size);color:var(--ck-color-widget-drag-handler-icon-color)}.ck .ck-widget.ck-widget_selectable .ck-widget__selection-handler .ck-icon .ck-icon__selected-indicator{opacity:0;transition:opacity .3s var(--ck-widget-handler-animation-curve)}.ck .ck-widget.ck-widget_selectable.ck-widget_selected .ck-widget__selection-handler,.ck .ck-widget.ck-widget_selectable.ck-widget_selected:hover .ck-widget__selection-handler{opacity:1;background-color:var(--ck-color-focus-border)}.ck .ck-widget.ck-widget_selectable.ck-widget_selected .ck-widget__selection-handler .ck-icon .ck-icon__selected-indicator,.ck .ck-widget.ck-widget_selectable.ck-widget_selected:hover .ck-widget__selection-handler .ck-icon .ck-icon__selected-indicator{opacity:1}.ck .ck-widget.ck-widget_selectable:hover .ck-widget__selection-handler{opacity:1;background-color:var(--ck-color-widget-hover-border)}.ck-editor__editable.ck-blurred .ck-widget.ck-widget_selected,.ck-editor__editable.ck-blurred .ck-widget.ck-widget_selected:hover{outline-color:var(--ck-color-widget-blurred-border)}.ck-editor__editable.ck-blurred .ck-widget.ck-widget_selected .ck-widget__selection-handler,.ck-editor__editable.ck-blurred .ck-widget.ck-widget_selected .ck-widget__selection-handler:hover,.ck-editor__editable.ck-blurred .ck-widget.ck-widget_selected:hover .ck-widget__selection-handler,.ck-editor__editable.ck-blurred .ck-widget.ck-widget_selected:hover .ck-widget__selection-handler:hover{background:var(--ck-color-widget-blurred-border)}.ck-editor__editable.ck-read-only .ck-widget{--ck-widget-outline-thickness:0}"},function(t,e,n){var i=n(67);"string"==typeof i&&(i=[[t.i,i,""]]);var o={singleton:!0,hmr:!0,transform:void 0,insertInto:void 0};n(2)(i,o);i.locals&&(t.exports=i.locals)},function(t,e){t.exports=".ck.ck-labeled-input .ck-labeled-input__status{font-size:var(--ck-font-size-small);margin-top:var(--ck-spacing-small);white-space:normal}.ck.ck-labeled-input .ck-labeled-input__status_error{color:var(--ck-color-base-error)}"},function(t,e,n){var i=n(69);"string"==typeof i&&(i=[[t.i,i,""]]);var o={singleton:!0,hmr:!0,transform:void 0,insertInto:void 0};n(2)(i,o);i.locals&&(t.exports=i.locals)},function(t,e){t.exports=":root{--ck-input-text-width:18em}.ck.ck-input-text{border-radius:0}.ck-rounded-corners .ck.ck-input-text,.ck.ck-input-text.ck-rounded-corners{border-radius:var(--ck-border-radius)}.ck.ck-input-text{box-shadow:var(--ck-inner-shadow),0 0;background:var(--ck-color-input-background);border:1px solid var(--ck-color-input-border);padding:var(--ck-spacing-extra-tiny) var(--ck-spacing-medium);min-width:var(--ck-input-text-width);min-height:var(--ck-ui-component-min-height);transition-property:box-shadow,border;transition:.2s ease-in-out}.ck.ck-input-text:focus{outline:none;border:var(--ck-focus-ring);box-shadow:var(--ck-focus-outer-shadow),var(--ck-inner-shadow)}.ck.ck-input-text[readonly]{border:1px solid var(--ck-color-input-disabled-border);background:var(--ck-color-input-disabled-background);color:var(--ck-color-input-disabled-text)}.ck.ck-input-text[readonly]:focus{box-shadow:var(--ck-focus-disabled-outer-shadow),var(--ck-inner-shadow)}.ck.ck-input-text.ck-error{border-color:var(--ck-color-input-error-border);animation:ck-text-input-shake .3s ease both}.ck.ck-input-text.ck-error:focus{box-shadow:var(--ck-focus-error-outer-shadow),var(--ck-inner-shadow)}@keyframes ck-text-input-shake{20%{transform:translateX(-2px)}40%{transform:translateX(2px)}60%{transform:translateX(-1px)}80%{transform:translateX(1px)}}"},function(t,e,n){var i=n(71);"string"==typeof i&&(i=[[t.i,i,""]]);var o={singleton:!0,hmr:!0,transform:void 0,insertInto:void 0};n(2)(i,o);i.locals&&(t.exports=i.locals)},function(t,e){t.exports=".ck.ck-text-alternative-form{display:flex;flex-direction:row;flex-wrap:nowrap}.ck.ck-text-alternative-form .ck-labeled-input{display:inline-block}.ck.ck-text-alternative-form .ck-label{display:none}@media screen and (max-width:600px){.ck.ck-text-alternative-form{flex-wrap:wrap}.ck.ck-text-alternative-form .ck-labeled-input{flex-basis:100%}.ck.ck-text-alternative-form .ck-button{flex-basis:50%}}.ck.ck-text-alternative-form{padding:var(--ck-spacing-standard)}.ck.ck-text-alternative-form:focus{outline:none}.ck.ck-text-alternative-form>:not(:first-child){margin-left:var(--ck-spacing-standard)}@media screen and (max-width:600px){.ck.ck-text-alternative-form{padding:0;width:calc(0.8*var(--ck-input-text-width))}.ck.ck-text-alternative-form .ck-labeled-input{margin:var(--ck-spacing-standard) var(--ck-spacing-standard) 0}.ck.ck-text-alternative-form .ck-labeled-input .ck-input-text{min-width:0;width:100%}.ck.ck-text-alternative-form .ck-button{padding:var(--ck-spacing-standard);margin-top:var(--ck-spacing-standard);margin-left:0;border-radius:0;border:0;border-top:1px solid var(--ck-color-base-border)}.ck.ck-text-alternative-form .ck-button:first-of-type{border-right:1px solid var(--ck-color-base-border)}}"},function(t,e,n){var i=n(73);"string"==typeof i&&(i=[[t.i,i,""]]);var o={singleton:!0,hmr:!0,transform:void 0,insertInto:void 0};n(2)(i,o);i.locals&&(t.exports=i.locals)},function(t,e){t.exports=':root{--ck-balloon-panel-arrow-z-index:calc(var(--ck-z-default) - 3)}.ck.ck-balloon-panel{display:none;position:absolute;z-index:var(--ck-z-modal)}.ck.ck-balloon-panel.ck-balloon-panel_with-arrow:after,.ck.ck-balloon-panel.ck-balloon-panel_with-arrow:before{content:"";position:absolute}.ck.ck-balloon-panel.ck-balloon-panel_with-arrow:before{z-index:var(--ck-balloon-panel-arrow-z-index)}.ck.ck-balloon-panel.ck-balloon-panel_with-arrow:after{z-index:calc(var(--ck-balloon-panel-arrow-z-index) + 1)}.ck.ck-balloon-panel[class*=arrow_n]:before{z-index:var(--ck-balloon-panel-arrow-z-index)}.ck.ck-balloon-panel[class*=arrow_n]:after{z-index:calc(var(--ck-balloon-panel-arrow-z-index) + 1)}.ck.ck-balloon-panel[class*=arrow_s]:before{z-index:var(--ck-balloon-panel-arrow-z-index)}.ck.ck-balloon-panel[class*=arrow_s]:after{z-index:calc(var(--ck-balloon-panel-arrow-z-index) + 1)}.ck.ck-balloon-panel.ck-balloon-panel_visible{display:block}:root{--ck-balloon-arrow-offset:2px;--ck-balloon-arrow-height:10px;--ck-balloon-arrow-half-width:8px}.ck.ck-balloon-panel{border-radius:0}.ck-rounded-corners .ck.ck-balloon-panel,.ck.ck-balloon-panel.ck-rounded-corners{border-radius:var(--ck-border-radius)}.ck.ck-balloon-panel{box-shadow:var(--ck-drop-shadow),0 0;min-height:15px;background:var(--ck-color-panel-background);border:1px solid var(--ck-color-panel-border)}.ck.ck-balloon-panel.ck-balloon-panel_with-arrow:after,.ck.ck-balloon-panel.ck-balloon-panel_with-arrow:before{width:0;height:0;border-style:solid}.ck.ck-balloon-panel[class*=arrow_n]:after,.ck.ck-balloon-panel[class*=arrow_n]:before{border-left-width:var(--ck-balloon-arrow-half-width);border-bottom-width:var(--ck-balloon-arrow-height);border-right-width:var(--ck-balloon-arrow-half-width);border-top-width:0}.ck.ck-balloon-panel[class*=arrow_n]:before{border-bottom-color:var(--ck-color-panel-border)}.ck.ck-balloon-panel[class*=arrow_n]:after,.ck.ck-balloon-panel[class*=arrow_n]:before{border-left-color:transparent;border-right-color:transparent;border-top-color:transparent}.ck.ck-balloon-panel[class*=arrow_n]:after{border-bottom-color:var(--ck-color-panel-background);margin-top:var(--ck-balloon-arrow-offset)}.ck.ck-balloon-panel[class*=arrow_s]:after,.ck.ck-balloon-panel[class*=arrow_s]:before{border-left-width:var(--ck-balloon-arrow-half-width);border-bottom-width:0;border-right-width:var(--ck-balloon-arrow-half-width);border-top-width:var(--ck-balloon-arrow-height)}.ck.ck-balloon-panel[class*=arrow_s]:before{border-top-color:var(--ck-color-panel-border)}.ck.ck-balloon-panel[class*=arrow_s]:after,.ck.ck-balloon-panel[class*=arrow_s]:before{border-left-color:transparent;border-bottom-color:transparent;border-right-color:transparent}.ck.ck-balloon-panel[class*=arrow_s]:after{border-top-color:var(--ck-color-panel-background);margin-bottom:var(--ck-balloon-arrow-offset)}.ck.ck-balloon-panel.ck-balloon-panel_arrow_n:after,.ck.ck-balloon-panel.ck-balloon-panel_arrow_n:before{left:50%;margin-left:calc(-1*var(--ck-balloon-arrow-half-width));top:calc(-1*var(--ck-balloon-arrow-height))}.ck.ck-balloon-panel.ck-balloon-panel_arrow_nw:after,.ck.ck-balloon-panel.ck-balloon-panel_arrow_nw:before{left:calc(2*var(--ck-balloon-arrow-half-width));top:calc(-1*var(--ck-balloon-arrow-height))}.ck.ck-balloon-panel.ck-balloon-panel_arrow_ne:after,.ck.ck-balloon-panel.ck-balloon-panel_arrow_ne:before{right:calc(2*var(--ck-balloon-arrow-half-width));top:calc(-1*var(--ck-balloon-arrow-height))}.ck.ck-balloon-panel.ck-balloon-panel_arrow_s:after,.ck.ck-balloon-panel.ck-balloon-panel_arrow_s:before{left:50%;margin-left:calc(-1*var(--ck-balloon-arrow-half-width));bottom:calc(-1*var(--ck-balloon-arrow-height))}.ck.ck-balloon-panel.ck-balloon-panel_arrow_sw:after,.ck.ck-balloon-panel.ck-balloon-panel_arrow_sw:before{left:calc(2*var(--ck-balloon-arrow-half-width));bottom:calc(-1*var(--ck-balloon-arrow-height))}.ck.ck-balloon-panel.ck-balloon-panel_arrow_se:after,.ck.ck-balloon-panel.ck-balloon-panel_arrow_se:before{right:calc(2*var(--ck-balloon-arrow-half-width));bottom:calc(-1*var(--ck-balloon-arrow-height))}'},function(t,e,n){var i=n(75);"string"==typeof i&&(i=[[t.i,i,""]]);var o={singleton:!0,hmr:!0,transform:void 0,insertInto:void 0};n(2)(i,o);i.locals&&(t.exports=i.locals)},function(t,e){t.exports=".ck-content .image{clear:both;text-align:center;margin:1em 0}.ck-content .image>img{display:block;margin:0 auto;max-width:100%}"},function(t,e,n){var i=n(77);"string"==typeof i&&(i=[[t.i,i,""]]);var o={singleton:!0,hmr:!0,transform:void 0,insertInto:void 0};n(2)(i,o);i.locals&&(t.exports=i.locals)},function(t,e){t.exports=".ck-content .image{position:relative;overflow:hidden}.ck-content .image .ck-progress-bar{position:absolute;top:0;left:0}:root{--ck-image-upload-progress-line-width:30px}.ck-content .image.ck-appear{animation:fadeIn .7s}.ck-content .image .ck-progress-bar{height:2px;width:0;background:var(--ck-color-upload-bar-background);transition:width .1s}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}"},function(t,e,n){var i=n(79);"string"==typeof i&&(i=[[t.i,i,""]]);var o={singleton:!0,hmr:!0,transform:void 0,insertInto:void 0};n(2)(i,o);i.locals&&(t.exports=i.locals)},function(t,e){t.exports='.ck-image-upload-complete-icon{display:block;position:absolute;top:10px;right:10px;border-radius:50%}.ck-image-upload-complete-icon:after{content:"";position:absolute}:root{--ck-color-image-upload-icon:#fff;--ck-color-image-upload-icon-background:#008a00;--ck-image-upload-icon-size:20px;--ck-image-upload-icon-width:2px}.ck-image-upload-complete-icon{width:var(--ck-image-upload-icon-size);height:var(--ck-image-upload-icon-size);opacity:0;background:var(--ck-color-image-upload-icon-background);animation-name:ck-upload-complete-icon-show,ck-upload-complete-icon-hide;animation-fill-mode:forwards,forwards;animation-duration:.5s,.5s;font-size:var(--ck-image-upload-icon-size);animation-delay:0ms,3s}.ck-image-upload-complete-icon:after{left:25%;top:50%;opacity:0;height:0;width:0;transform:scaleX(-1) rotate(135deg);transform-origin:left top;border-top:var(--ck-image-upload-icon-width) solid var(--ck-color-image-upload-icon);border-right:var(--ck-image-upload-icon-width) solid var(--ck-color-image-upload-icon);animation-name:ck-upload-complete-icon-check;animation-duration:.5s;animation-delay:.5s;animation-fill-mode:forwards;box-sizing:border-box}@keyframes ck-upload-complete-icon-show{0%{opacity:0}to{opacity:1}}@keyframes ck-upload-complete-icon-hide{0%{opacity:1}to{opacity:0}}@keyframes ck-upload-complete-icon-check{0%{opacity:1;width:0;height:0}33%{width:.3em;height:0}to{opacity:1;width:.3em;height:.45em}}'},function(t,e,n){var i=n(81);"string"==typeof i&&(i=[[t.i,i,""]]);var o={singleton:!0,hmr:!0,transform:void 0,insertInto:void 0};n(2)(i,o);i.locals&&(t.exports=i.locals)},function(t,e){t.exports='.ck .ck-upload-placeholder-loader{position:absolute;display:flex;align-items:center;justify-content:center;top:0;left:0}.ck .ck-upload-placeholder-loader:before{content:"";position:relative}:root{--ck-color-upload-placeholder-loader:#b3b3b3;--ck-upload-placeholder-loader-size:32px}.ck .ck-image-upload-placeholder{width:100%;margin:0}.ck .ck-upload-placeholder-loader{width:100%;height:100%}.ck .ck-upload-placeholder-loader:before{width:var(--ck-upload-placeholder-loader-size);height:var(--ck-upload-placeholder-loader-size);border-radius:50%;border-top:3px solid var(--ck-color-upload-placeholder-loader);border-right:2px solid transparent;animation:ck-upload-placeholder-loader 1s linear infinite}@keyframes ck-upload-placeholder-loader{to{transform:rotate(1turn)}}'},function(t,e,n){var i=n(83);"string"==typeof i&&(i=[[t.i,i,""]]);var o={singleton:!0,hmr:!0,transform:void 0,insertInto:void 0};n(2)(i,o);i.locals&&(t.exports=i.locals)},function(t,e){t.exports=".ck.ck-dropdown{display:inline-block;position:relative}.ck.ck-dropdown .ck-dropdown__arrow{pointer-events:none;z-index:var(--ck-z-default)}.ck.ck-dropdown .ck-button.ck-dropdown__button{width:100%}.ck.ck-dropdown .ck-button.ck-dropdown__button.ck-on .ck-tooltip{display:none}.ck.ck-dropdown .ck-dropdown__panel{-webkit-backface-visibility:hidden;display:none;z-index:var(--ck-z-modal);position:absolute}.ck.ck-dropdown .ck-dropdown__panel.ck-dropdown__panel-visible{display:inline-block;will-change:transform}.ck.ck-dropdown .ck-dropdown__panel.ck-dropdown__panel_ne,.ck.ck-dropdown .ck-dropdown__panel.ck-dropdown__panel_nw{bottom:100%}.ck.ck-dropdown .ck-dropdown__panel.ck-dropdown__panel_se,.ck.ck-dropdown .ck-dropdown__panel.ck-dropdown__panel_sw{transform:translate3d(0,100%,0)}.ck.ck-dropdown .ck-dropdown__panel.ck-dropdown__panel_ne,.ck.ck-dropdown .ck-dropdown__panel.ck-dropdown__panel_se{left:0}.ck.ck-dropdown .ck-dropdown__panel.ck-dropdown__panel_nw,.ck.ck-dropdown .ck-dropdown__panel.ck-dropdown__panel_sw{right:0}:root{--ck-dropdown-arrow-size:calc(0.5*var(--ck-icon-size))}.ck.ck-dropdown{font-size:inherit}.ck.ck-dropdown .ck-dropdown__arrow{right:var(--ck-spacing-standard);width:var(--ck-dropdown-arrow-size);margin-left:var(--ck-spacing-small)}.ck.ck-dropdown.ck-disabled .ck-dropdown__arrow{opacity:var(--ck-disabled-opacity)}.ck.ck-dropdown .ck-button.ck-dropdown__button:not(.ck-button_with-text){padding-left:var(--ck-spacing-small)}.ck.ck-dropdown .ck-button.ck-dropdown__button.ck-disabled .ck-button__label{opacity:var(--ck-disabled-opacity)}.ck.ck-dropdown .ck-button.ck-dropdown__button.ck-on{border-bottom-left-radius:0;border-bottom-right-radius:0}.ck.ck-dropdown .ck-button.ck-dropdown__button .ck-button__label{width:7em;overflow:hidden;text-overflow:ellipsis}.ck.ck-dropdown__panel{box-shadow:var(--ck-drop-shadow),0 0;border-radius:0}.ck-rounded-corners .ck.ck-dropdown__panel,.ck.ck-dropdown__panel.ck-rounded-corners{border-radius:var(--ck-border-radius);border-top-left-radius:0}.ck.ck-dropdown__panel{background:var(--ck-color-dropdown-panel-background);border:1px solid var(--ck-color-dropdown-panel-border);bottom:0;min-width:100%}"},function(t,e,n){var i=n(85);"string"==typeof i&&(i=[[t.i,i,""]]);var o={singleton:!0,hmr:!0,transform:void 0,insertInto:void 0};n(2)(i,o);i.locals&&(t.exports=i.locals)},function(t,e){t.exports=".ck.ck-list{-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none;display:flex;flex-direction:column}.ck.ck-list .ck-list__item,.ck.ck-list .ck-list__separator{display:block}.ck.ck-list .ck-list__item>:focus{position:relative;z-index:var(--ck-z-default)}.ck.ck-list{border-radius:0}.ck-rounded-corners .ck.ck-list,.ck.ck-list.ck-rounded-corners{border-radius:var(--ck-border-radius)}.ck.ck-list{list-style-type:none;background:var(--ck-color-list-background)}.ck.ck-list__item{cursor:default;min-width:12em}.ck.ck-list__item .ck-button{min-height:unset;width:100%;text-align:left;border-radius:0;border:0;padding:calc(0.2*var(--ck-line-height-base)*var(--ck-font-size-base)) calc(0.4*var(--ck-line-height-base)*var(--ck-font-size-base))}.ck.ck-list__item .ck-button .ck-button__label{line-height:calc(1.2*var(--ck-line-height-base)*var(--ck-font-size-base))}.ck.ck-list__item .ck-button:active{box-shadow:none}.ck.ck-list__item .ck-button.ck-on{background:var(--ck-color-list-button-on-background);color:var(--ck-color-list-button-on-text)}.ck.ck-list__item .ck-button.ck-on:hover:not(ck-disabled){background:var(--ck-color-list-button-on-background-focus)}.ck.ck-list__item .ck-button.ck-on:active{box-shadow:none}.ck.ck-list__item .ck-button:hover:not(.ck-disabled){background:var(--ck-color-list-button-hover-background)}.ck.ck-list__item .ck-switchbutton.ck-on{background:var(--ck-color-list-background);color:inherit}.ck.ck-list__item .ck-switchbutton.ck-on:hover:not(ck-disabled){background:var(--ck-color-list-button-hover-background);color:inherit}.ck.ck-list__separator{height:1px;width:100%;background:var(--ck-color-base-border)}"},function(t,e,n){var i=n(87);"string"==typeof i&&(i=[[t.i,i,""]]);var o={singleton:!0,hmr:!0,transform:void 0,insertInto:void 0};n(2)(i,o);i.locals&&(t.exports=i.locals)},function(t,e){t.exports=".ck.ck-button.ck-switchbutton .ck-button__toggle,.ck.ck-button.ck-switchbutton .ck-button__toggle .ck-button__toggle__inner{display:block}:root{--ck-switch-button-toggle-width:2.6153846154em;--ck-switch-button-toggle-inner-size:1.0769230769em;--ck-switch-button-toggle-spacing:1px}.ck.ck-button.ck-switchbutton .ck-button__label{margin-right:calc(2*var(--ck-spacing-large))}.ck.ck-button.ck-switchbutton.ck-disabled .ck-button__toggle{opacity:var(--ck-disabled-opacity)}.ck.ck-button.ck-switchbutton .ck-button__toggle{border-radius:0}.ck-rounded-corners .ck.ck-button.ck-switchbutton .ck-button__toggle,.ck.ck-button.ck-switchbutton .ck-button__toggle.ck-rounded-corners{border-radius:var(--ck-border-radius)}.ck.ck-button.ck-switchbutton .ck-button__toggle{margin-left:auto;transition:background .4s ease;width:var(--ck-switch-button-toggle-width);background:var(--ck-color-switch-button-off-background)}.ck.ck-button.ck-switchbutton .ck-button__toggle .ck-button__toggle__inner{border-radius:0}.ck-rounded-corners .ck.ck-button.ck-switchbutton .ck-button__toggle .ck-button__toggle__inner,.ck.ck-button.ck-switchbutton .ck-button__toggle .ck-button__toggle__inner.ck-rounded-corners{border-radius:var(--ck-border-radius);border-radius:calc(0.5*var(--ck-border-radius))}.ck.ck-button.ck-switchbutton .ck-button__toggle .ck-button__toggle__inner{margin:var(--ck-switch-button-toggle-spacing);width:var(--ck-switch-button-toggle-inner-size);height:var(--ck-switch-button-toggle-inner-size);background:var(--ck-color-switch-button-inner-background);transition:transform .3s ease}.ck.ck-button.ck-switchbutton.ck-on .ck-button__toggle{background:var(--ck-color-switch-button-on-background)}.ck.ck-button.ck-switchbutton.ck-on .ck-button__toggle .ck-button__toggle__inner{transform:translateX(1.3846153847em)}"},function(t,e,n){var i=n(89);"string"==typeof i&&(i=[[t.i,i,""]]);var o={singleton:!0,hmr:!0,transform:void 0,insertInto:void 0};n(2)(i,o);i.locals&&(t.exports=i.locals)},function(t,e){t.exports=".ck.ck-toolbar-dropdown .ck-toolbar{flex-wrap:nowrap}.ck.ck-toolbar-dropdown .ck-dropdown__panel .ck-button:focus{z-index:calc(var(--ck-z-default) + 1)}.ck.ck-toolbar-dropdown .ck-toolbar{border:0}"},function(t,e,n){var i=n(91);"string"==typeof i&&(i=[[t.i,i,""]]);var o={singleton:!0,hmr:!0,transform:void 0,insertInto:void 0};n(2)(i,o);i.locals&&(t.exports=i.locals)},function(t,e){t.exports=".ck.ck-dropdown .ck-dropdown__panel .ck-list{border-radius:0}.ck-rounded-corners .ck.ck-dropdown .ck-dropdown__panel .ck-list,.ck.ck-dropdown .ck-dropdown__panel .ck-list.ck-rounded-corners{border-radius:var(--ck-border-radius);border-top-left-radius:0}.ck.ck-dropdown .ck-dropdown__panel .ck-list .ck-list__item:first-child .ck-button{border-radius:0}.ck-rounded-corners .ck.ck-dropdown .ck-dropdown__panel .ck-list .ck-list__item:first-child .ck-button,.ck.ck-dropdown .ck-dropdown__panel .ck-list .ck-list__item:first-child .ck-button.ck-rounded-corners{border-radius:var(--ck-border-radius);border-top-left-radius:0;border-bottom-left-radius:0;border-bottom-right-radius:0}.ck.ck-dropdown .ck-dropdown__panel .ck-list .ck-list__item:last-child .ck-button{border-radius:0}.ck-rounded-corners .ck.ck-dropdown .ck-dropdown__panel .ck-list .ck-list__item:last-child .ck-button,.ck.ck-dropdown .ck-dropdown__panel .ck-list .ck-list__item:last-child .ck-button.ck-rounded-corners{border-radius:var(--ck-border-radius);border-top-left-radius:0;border-top-right-radius:0}"},function(t,e){t.exports=".ck.ck-heading_heading1{font-size:20px}.ck.ck-heading_heading2{font-size:17px}.ck.ck-heading_heading3{font-size:14px}.ck[class*=ck-heading_heading]{font-weight:700}.ck.ck-dropdown.ck-heading-dropdown .ck-dropdown__button .ck-button__label{width:8em}.ck.ck-dropdown.ck-heading-dropdown .ck-dropdown__panel .ck-list__item{min-width:18em}"},function(t,e,n){var i=n(94);"string"==typeof i&&(i=[[t.i,i,""]]);var o={singleton:!0,hmr:!0,transform:void 0,insertInto:void 0};n(2)(i,o);i.locals&&(t.exports=i.locals)},function(t,e){t.exports=".ck.ck-placeholder:before,.ck .ck-placeholder:before{content:attr(data-placeholder);pointer-events:none;cursor:text;color:var(--ck-color-engine-placeholder-text)}"},function(t,e,n){var i=n(96);"string"==typeof i&&(i=[[t.i,i,""]]);var o={singleton:!0,hmr:!0,transform:void 0,insertInto:void 0};n(2)(i,o);i.locals&&(t.exports=i.locals)},function(t,e){t.exports=".ck-content .image>figcaption{color:#333;background-color:#f7f7f7;padding:.6em;font-size:.75em;outline-offset:-1px}"},function(t,e,n){var i=n(98);"string"==typeof i&&(i=[[t.i,i,""]]);var o={singleton:!0,hmr:!0,transform:void 0,insertInto:void 0};n(2)(i,o);i.locals&&(t.exports=i.locals)},function(t,e){t.exports=":root{--ck-image-style-spacing:1.5em}.ck-content .image-style-align-center,.ck-content .image-style-align-left,.ck-content .image-style-align-right,.ck-content .image-style-side{max-width:50%}.ck-content .image-style-side{float:right;margin-left:var(--ck-image-style-spacing)}.ck-content .image-style-align-left{float:left;margin-right:var(--ck-image-style-spacing)}.ck-content .image-style-align-center{margin-left:auto;margin-right:auto}.ck-content .image-style-align-right{float:right;margin-left:var(--ck-image-style-spacing)}"},function(t,e,n){var i=n(100);"string"==typeof i&&(i=[[t.i,i,""]]);var o={singleton:!0,hmr:!0,transform:void 0,insertInto:void 0};n(2)(i,o);i.locals&&(t.exports=i.locals)},function(t,e){t.exports=".ck .ck-link_selected{background:var(--ck-color-link-selected-background)}"},function(t,e,n){var i=n(102);"string"==typeof i&&(i=[[t.i,i,""]]);var o={singleton:!0,hmr:!0,transform:void 0,insertInto:void 0};n(2)(i,o);i.locals&&(t.exports=i.locals)},function(t,e){t.exports=".ck.ck-link-form{display:flex;flex-direction:row;flex-wrap:nowrap}.ck.ck-link-form .ck-label{display:none}@media screen and (max-width:600px){.ck.ck-link-form{flex-wrap:wrap}.ck.ck-link-form .ck-labeled-input{flex-basis:100%}.ck.ck-link-form .ck-button{flex-basis:50%}}.ck.ck-link-form{padding:var(--ck-spacing-standard)}.ck.ck-link-form:focus{outline:none}.ck.ck-link-form>:not(:first-child){margin-left:var(--ck-spacing-standard)}@media screen and (max-width:600px){.ck.ck-link-form{padding:0;width:calc(0.8*var(--ck-input-text-width))}.ck.ck-link-form .ck-labeled-input{margin:var(--ck-spacing-standard) var(--ck-spacing-standard) 0}.ck.ck-link-form .ck-labeled-input .ck-input-text{min-width:0;width:100%}.ck.ck-link-form .ck-button{padding:var(--ck-spacing-standard);margin-top:var(--ck-spacing-standard);margin-left:0;border-radius:0;border:0;border-top:1px solid var(--ck-color-base-border)}.ck.ck-link-form .ck-button:first-of-type{border-right:1px solid var(--ck-color-base-border)}}"},function(t,e,n){var i=n(104);"string"==typeof i&&(i=[[t.i,i,""]]);var o={singleton:!0,hmr:!0,transform:void 0,insertInto:void 0};n(2)(i,o);i.locals&&(t.exports=i.locals)},function(t,e){t.exports=".ck.ck-link-actions{display:flex;flex-direction:row;flex-wrap:nowrap}.ck.ck-link-actions .ck-link-actions__preview{display:inline-block}.ck.ck-link-actions .ck-link-actions__preview .ck-button__label{overflow:hidden}@media screen and (max-width:600px){.ck.ck-link-actions{flex-wrap:wrap}.ck.ck-link-actions .ck-link-actions__preview{flex-basis:100%}.ck.ck-link-actions .ck-button:not(.ck-link-actions__preview){flex-basis:50%}}.ck.ck-link-actions{padding:var(--ck-spacing-standard)}.ck.ck-link-actions .ck-button.ck-link-actions__preview{padding-left:0;padding-right:0}.ck.ck-link-actions .ck-button.ck-link-actions__preview,.ck.ck-link-actions .ck-button.ck-link-actions__preview:active,.ck.ck-link-actions .ck-button.ck-link-actions__preview:focus,.ck.ck-link-actions .ck-button.ck-link-actions__preview:hover{background:none}.ck.ck-link-actions .ck-button.ck-link-actions__preview:active{box-shadow:none}.ck.ck-link-actions .ck-button.ck-link-actions__preview:focus .ck-button__label{text-decoration:underline}.ck.ck-link-actions .ck-button.ck-link-actions__preview .ck-button__label{padding:0 var(--ck-spacing-medium);color:var(--ck-color-link-default);text-overflow:ellipsis;cursor:pointer;max-width:var(--ck-input-text-width);min-width:3em;text-align:center}.ck.ck-link-actions .ck-button.ck-link-actions__preview .ck-button__label:hover{text-decoration:underline}.ck.ck-link-actions:focus{outline:none}.ck.ck-link-actions .ck-button:not(.ck-link-actions__preview){margin-left:var(--ck-spacing-standard)}@media screen and (max-width:600px){.ck.ck-link-actions{padding:0;width:calc(0.8*var(--ck-input-text-width))}.ck.ck-link-actions .ck-button.ck-link-actions__preview{margin:var(--ck-spacing-standard) var(--ck-spacing-standard) 0}.ck.ck-link-actions .ck-button.ck-link-actions__preview .ck-button__label{min-width:0;max-width:100%}.ck.ck-link-actions .ck-button:not(.ck-link-actions__preview){padding:var(--ck-spacing-standard);margin-top:var(--ck-spacing-standard);margin-left:0;border-radius:0;border:0;border-top:1px solid var(--ck-color-base-border)}.ck.ck-link-actions .ck-button:not(.ck-link-actions__preview):first-of-type{border-right:1px solid var(--ck-color-base-border)}}"},function(t,e,n){var i=n(106);"string"==typeof i&&(i=[[t.i,i,""]]);var o={singleton:!0,hmr:!0,transform:void 0,insertInto:void 0};n(2)(i,o);i.locals&&(t.exports=i.locals)},function(t,e){t.exports='.ck-media__wrapper .ck-media__placeholder{display:flex;flex-direction:column;align-items:center}.ck-media__wrapper .ck-media__placeholder .ck-media__placeholder__url .ck-tooltip{display:block}@media (hover:none){.ck-media__wrapper .ck-media__placeholder .ck-media__placeholder__url .ck-tooltip{display:none}}.ck-media__wrapper .ck-media__placeholder .ck-media__placeholder__url{max-width:100%;position:relative}.ck-media__wrapper .ck-media__placeholder .ck-media__placeholder__url:hover .ck-tooltip{visibility:visible;opacity:1}.ck-media__wrapper .ck-media__placeholder .ck-media__placeholder__url .ck-media__placeholder__url__text{overflow:hidden;display:block}.ck-media__wrapper[data-oembed-url*="facebook.com"] .ck-media__placeholder__icon *,.ck-media__wrapper[data-oembed-url*="google.com/maps"] .ck-media__placeholder__icon *,.ck-media__wrapper[data-oembed-url*="instagram.com"] .ck-media__placeholder__icon *,.ck-media__wrapper[data-oembed-url*="twitter.com"] .ck-media__placeholder__icon *{display:none}[contenteditable=true] .ck-media__wrapper>:not(.ck-media__placeholder){pointer-events:none}:root{--ck-media-embed-placeholder-icon-size:3em;--ck-color-media-embed-placeholder-url-text:#757575;--ck-color-media-embed-placeholder-url-text-hover:var(--ck-color-base-text)}.ck-media__wrapper{margin:0 auto}.ck-media__wrapper .ck-media__placeholder{padding:calc(3*var(--ck-spacing-standard));background:var(--ck-color-base-foreground)}.ck-media__wrapper .ck-media__placeholder .ck-media__placeholder__icon{min-width:var(--ck-media-embed-placeholder-icon-size);height:var(--ck-media-embed-placeholder-icon-size);margin-bottom:var(--ck-spacing-large);background-position:50%;background-size:cover}.ck-media__wrapper .ck-media__placeholder .ck-media__placeholder__icon .ck-icon{width:100%;height:100%}.ck-media__wrapper .ck-media__placeholder .ck-media__placeholder__url .ck-media__placeholder__url__text{color:var(--ck-color-media-embed-placeholder-url-text);white-space:nowrap;text-align:center;font-style:italic;text-overflow:ellipsis}.ck-media__wrapper .ck-media__placeholder .ck-media__placeholder__url .ck-media__placeholder__url__text:hover{color:var(--ck-color-media-embed-placeholder-url-text-hover);cursor:pointer;text-decoration:underline}.ck-media__wrapper[data-oembed-url*="open.spotify.com"]{max-width:300px;max-height:380px}.ck-media__wrapper[data-oembed-url*="twitter.com"] .ck.ck-media__placeholder{background:linear-gradient(90deg,#71c6f4,#0d70a5)}.ck-media__wrapper[data-oembed-url*="twitter.com"] .ck.ck-media__placeholder .ck-media__placeholder__icon{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgNDAwIj48cGF0aCBkPSJNNDAwIDIwMGMwIDExMC41LTg5LjUgMjAwLTIwMCAyMDBTMCAzMTAuNSAwIDIwMCA4OS41IDAgMjAwIDBzMjAwIDg5LjUgMjAwIDIwMHpNMTYzLjQgMzA1LjVjODguNyAwIDEzNy4yLTczLjUgMTM3LjItMTM3LjIgMC0yLjEgMC00LjItLjEtNi4yIDkuNC02LjggMTcuNi0xNS4zIDI0LjEtMjUtOC42IDMuOC0xNy45IDYuNC0yNy43IDcuNiAxMC02IDE3LjYtMTUuNCAyMS4yLTI2LjctOS4zIDUuNS0xOS42IDkuNS0zMC42IDExLjctOC44LTkuNC0yMS4zLTE1LjItMzUuMi0xNS4yLTI2LjYgMC00OC4yIDIxLjYtNDguMiA0OC4yIDAgMy44LjQgNy41IDEuMyAxMS00MC4xLTItNzUuNi0yMS4yLTk5LjQtNTAuNC00LjEgNy4xLTYuNSAxNS40LTYuNSAyNC4yIDAgMTYuNyA4LjUgMzEuNSAyMS41IDQwLjEtNy45LS4yLTE1LjMtMi40LTIxLjgtNnYuNmMwIDIzLjQgMTYuNiA0Mi44IDM4LjcgNDcuMy00IDEuMS04LjMgMS43LTEyLjcgMS43LTMuMSAwLTYuMS0uMy05LjEtLjkgNi4xIDE5LjIgMjMuOSAzMy4xIDQ1IDMzLjUtMTYuNSAxMi45LTM3LjMgMjAuNi01OS45IDIwLjYtMy45IDAtNy43LS4yLTExLjUtLjcgMjEuMSAxMy44IDQ2LjUgMjEuOCA3My43IDIxLjgiIGZpbGw9IiNmZmYiLz48L3N2Zz4=)}.ck-media__wrapper[data-oembed-url*="twitter.com"] .ck.ck-media__placeholder .ck-media__placeholder__url__text{color:#b8e6ff}.ck-media__wrapper[data-oembed-url*="twitter.com"] .ck.ck-media__placeholder .ck-media__placeholder__url__text:hover{color:#fff}.ck-media__wrapper[data-oembed-url*="google.com/maps"] .ck-media__placeholder__icon{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTAuMzc4IiBoZWlnaHQ9IjI1NC4xNjciIHZpZXdCb3g9IjAgMCA2Ni4yNDYgNjcuMjQ4Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTcyLjUzMSAtMjE4LjQ1NSkgc2NhbGUoLjk4MDEyKSI+PHJlY3Qgcnk9IjUuMjM4IiByeD0iNS4yMzgiIHk9IjIzMS4zOTkiIHg9IjE3Ni4wMzEiIGhlaWdodD0iNjAuMDk5IiB3aWR0aD0iNjAuMDk5IiBmaWxsPSIjMzRhNjY4IiBwYWludC1vcmRlcj0ibWFya2VycyBzdHJva2UgZmlsbCIvPjxwYXRoIGQ9Ik0yMDYuNDc3IDI2MC45bC0yOC45ODcgMjguOTg3YTUuMjE4IDUuMjE4IDAgMCAwIDMuNzggMS42MWg0OS42MjFjMS42OTQgMCAzLjE5LS43OTggNC4xNDYtMi4wMzd6IiBmaWxsPSIjNWM4OGM1Ii8+PHBhdGggZD0iTTIyNi43NDIgMjIyLjk4OGMtOS4yNjYgMC0xNi43NzcgNy4xNy0xNi43NzcgMTYuMDE0LjAwNyAyLjc2Mi42NjMgNS40NzQgMi4wOTMgNy44NzUuNDMuNzAzLjgzIDEuNDA4IDEuMTkgMi4xMDcuMzMzLjUwMi42NSAxLjAwNS45NSAxLjUwOC4zNDMuNDc3LjY3My45NTcuOTg4IDEuNDQgMS4zMSAxLjc2OSAyLjUgMy41MDIgMy42MzcgNS4xNjguNzkzIDEuMjc1IDEuNjgzIDIuNjQgMi40NjYgMy45OSAyLjM2MyA0LjA5NCA0LjAwNyA4LjA5MiA0LjYgMTMuOTE0di4wMTJjLjE4Mi40MTIuNTE2LjY2Ni44NzkuNjY3LjQwMy0uMDAxLjc2OC0uMzE0LjkzLS43OTkuNjAzLTUuNzU2IDIuMjM4LTkuNzI5IDQuNTg1LTEzLjc5NC43ODItMS4zNSAxLjY3My0yLjcxNSAyLjQ2NS0zLjk5IDEuMTM3LTEuNjY2IDIuMzI4LTMuNCAzLjYzOC01LjE2OS4zMTUtLjQ4Mi42NDUtLjk2Mi45ODgtMS40MzkuMy0uNTAzLjYxNy0xLjAwNi45NS0xLjUwOC4zNTktLjcuNzYtMS40MDQgMS4xOS0yLjEwNyAxLjQyNi0yLjQwMiAyLTUuMTE0IDIuMDA0LTcuODc1IDAtOC44NDQtNy41MTEtMTYuMDE0LTE2Ljc3Ni0xNi4wMTR6IiBmaWxsPSIjZGQ0YjNlIiBwYWludC1vcmRlcj0ibWFya2VycyBzdHJva2UgZmlsbCIvPjxlbGxpcHNlIHJ5PSI1LjU2NCIgcng9IjUuODI4IiBjeT0iMjM5LjAwMiIgY3g9IjIyNi43NDIiIGZpbGw9IiM4MDJkMjciIHBhaW50LW9yZGVyPSJtYXJrZXJzIHN0cm9rZSBmaWxsIi8+PHBhdGggZD0iTTE5MC4zMDEgMjM3LjI4M2MtNC42NyAwLTguNDU3IDMuODUzLTguNDU3IDguNjA2czMuNzg2IDguNjA3IDguNDU3IDguNjA3YzMuMDQzIDAgNC44MDYtLjk1OCA2LjMzNy0yLjUxNiAxLjUzLTEuNTU3IDIuMDg3LTMuOTEzIDIuMDg3LTYuMjkgMC0uMzYyLS4wMjMtLjcyMi0uMDY0LTEuMDc5aC04LjI1N3YzLjA0M2g0Ljg1Yy0uMTk3Ljc1OS0uNTMxIDEuNDUtMS4wNTggMS45ODYtLjk0Mi45NTgtMi4wMjggMS41NDgtMy45MDEgMS41NDgtMi44NzYgMC01LjIwOC0yLjM3Mi01LjIwOC01LjI5OSAwLTIuOTI2IDIuMzMyLTUuMjk5IDUuMjA4LTUuMjk5IDEuMzk5IDAgMi42MTguNDA3IDMuNTg0IDEuMjkzbDIuMzgxLTIuMzhjMC0uMDAyLS4wMDMtLjAwNC0uMDA0LS4wMDUtMS41ODgtMS41MjQtMy42Mi0yLjIxNS01Ljk1NS0yLjIxNXptNC40MyA1LjY2bC4wMDMuMDA2di0uMDAzeiIgZmlsbD0iI2ZmZiIgcGFpbnQtb3JkZXI9Im1hcmtlcnMgc3Ryb2tlIGZpbGwiLz48cGF0aCBkPSJNMjE1LjE4NCAyNTEuOTI5bC03Ljk4IDcuOTc5IDI4LjQ3NyAyOC40NzVhNS4yMzMgNS4yMzMgMCAwIDAgLjQ0OS0yLjEyM3YtMzEuMTY1Yy0uNDY5LjY3NS0uOTM0IDEuMzQ5LTEuMzgyIDIuMDA1LS43OTIgMS4yNzUtMS42ODIgMi42NC0yLjQ2NSAzLjk5LTIuMzQ3IDQuMDY1LTMuOTgyIDguMDM4LTQuNTg1IDEzLjc5NC0uMTYyLjQ4NS0uNTI3Ljc5OC0uOTMuNzk5LS4zNjMtLjAwMS0uNjk3LS4yNTUtLjg3OS0uNjY3di0uMDEyYy0uNTkzLTUuODIyLTIuMjM3LTkuODItNC42LTEzLjkxNC0uNzgzLTEuMzUtMS42NzMtMi43MTUtMi40NjYtMy45OS0xLjEzNy0xLjY2Ni0yLjMyNy0zLjQtMy42MzctNS4xNjlsLS4wMDItLjAwM3oiIGZpbGw9IiNjM2MzYzMiLz48cGF0aCBkPSJNMjEyLjk4MyAyNDguNDk1bC0zNi45NTIgMzYuOTUzdi44MTJhNS4yMjcgNS4yMjcgMCAwIDAgNS4yMzggNS4yMzhoMS4wMTVsMzUuNjY2LTM1LjY2NmExMzYuMjc1IDEzNi4yNzUgMCAwIDAtMi43NjQtMy45IDM3LjU3NSAzNy41NzUgMCAwIDAtLjk4OS0xLjQ0IDM1LjEyNyAzNS4xMjcgMCAwIDAtLjk1LTEuNTA4Yy0uMDgzLS4xNjItLjE3Ni0uMzI2LS4yNjQtLjQ4OXoiIGZpbGw9IiNmZGRjNGYiIHBhaW50LW9yZGVyPSJtYXJrZXJzIHN0cm9rZSBmaWxsIi8+PHBhdGggZD0iTTIxMS45OTggMjYxLjA4M2wtNi4xNTIgNi4xNTEgMjQuMjY0IDI0LjI2NGguNzgxYTUuMjI3IDUuMjI3IDAgMCAwIDUuMjM5LTUuMjM4di0xLjA0NXoiIGZpbGw9IiNmZmYiIHBhaW50LW9yZGVyPSJtYXJrZXJzIHN0cm9rZSBmaWxsIi8+PC9nPjwvc3ZnPg==)}.ck-media__wrapper[data-oembed-url*="facebook.com"] .ck-media__placeholder{background:#4268b3}.ck-media__wrapper[data-oembed-url*="facebook.com"] .ck-media__placeholder .ck-media__placeholder__icon{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAyNCIgaGVpZ2h0PSIxMDI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik05NjcuNDg0IDBINTYuNTE3QzI1LjMwNCAwIDAgMjUuMzA0IDAgNTYuNTE3djkxMC45NjZDMCA5OTguNjk0IDI1LjI5NyAxMDI0IDU2LjUyMiAxMDI0SDU0N1Y2MjhINDE0VjQ3M2gxMzNWMzU5LjAyOWMwLTEzMi4yNjIgODAuNzczLTIwNC4yODIgMTk4Ljc1Ni0yMDQuMjgyIDU2LjUxMyAwIDEwNS4wODYgNC4yMDggMTE5LjI0NCA2LjA4OVYyOTlsLTgxLjYxNi4wMzdjLTYzLjk5MyAwLTc2LjM4NCAzMC40OTItNzYuMzg0IDc1LjIzNlY0NzNoMTUzLjQ4N2wtMTkuOTg2IDE1NUg3MDd2Mzk2aDI2MC40ODRjMzEuMjEzIDAgNTYuNTE2LTI1LjMwMyA1Ni41MTYtNTYuNTE2VjU2LjUxNUMxMDI0IDI1LjMwMyA5OTguNjk3IDAgOTY3LjQ4NCAwIiBmaWxsPSIjRkZGRkZFIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=)}.ck-media__wrapper[data-oembed-url*="facebook.com"] .ck-media__placeholder .ck-media__placeholder__url__text{color:#cdf}.ck-media__wrapper[data-oembed-url*="facebook.com"] .ck-media__placeholder .ck-media__placeholder__url__text:hover{color:#fff}.ck-media__wrapper[data-oembed-url*="instagram.com"] .ck-media__placeholder{background:linear-gradient(-135deg,#1400c8,#b900b4,#f50000)}.ck-media__wrapper[data-oembed-url*="instagram.com"] .ck-media__placeholder .ck-media__placeholder__icon{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTA0IiBoZWlnaHQ9IjUwNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHBhdGggaWQ9ImEiIGQ9Ik0wIC4xNTloNTAzLjg0MVY1MDMuOTRIMHoiLz48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48bWFzayBpZD0iYiIgZmlsbD0iI2ZmZiI+PHVzZSB4bGluazpocmVmPSIjYSIvPjwvbWFzaz48cGF0aCBkPSJNMjUxLjkyMS4xNTljLTY4LjQxOCAwLTc2Ljk5Ny4yOS0xMDMuODY3IDEuNTE2LTI2LjgxNCAxLjIyMy00NS4xMjcgNS40ODItNjEuMTUxIDExLjcxLTE2LjU2NiA2LjQzNy0zMC42MTUgMTUuMDUxLTQ0LjYyMSAyOS4wNTYtMTQuMDA1IDE0LjAwNi0yMi42MTkgMjguMDU1LTI5LjA1NiA0NC42MjEtNi4yMjggMTYuMDI0LTEwLjQ4NyAzNC4zMzctMTEuNzEgNjEuMTUxQy4yOSAxNzUuMDgzIDAgMTgzLjY2MiAwIDI1Mi4wOGMwIDY4LjQxNy4yOSA3Ni45OTYgMS41MTYgMTAzLjg2NiAxLjIyMyAyNi44MTQgNS40ODIgNDUuMTI3IDExLjcxIDYxLjE1MSA2LjQzNyAxNi41NjYgMTUuMDUxIDMwLjYxNSAyOS4wNTYgNDQuNjIxIDE0LjAwNiAxNC4wMDUgMjguMDU1IDIyLjYxOSA0NC42MjEgMjkuMDU3IDE2LjAyNCA2LjIyNyAzNC4zMzcgMTAuNDg2IDYxLjE1MSAxMS43MDkgMjYuODcgMS4yMjYgMzUuNDQ5IDEuNTE2IDEwMy44NjcgMS41MTYgNjguNDE3IDAgNzYuOTk2LS4yOSAxMDMuODY2LTEuNTE2IDI2LjgxNC0xLjIyMyA0NS4xMjctNS40ODIgNjEuMTUxLTExLjcwOSAxNi41NjYtNi40MzggMzAuNjE1LTE1LjA1MiA0NC42MjEtMjkuMDU3IDE0LjAwNS0xNC4wMDYgMjIuNjE5LTI4LjA1NSAyOS4wNTctNDQuNjIxIDYuMjI3LTE2LjAyNCAxMC40ODYtMzQuMzM3IDExLjcwOS02MS4xNTEgMS4yMjYtMjYuODcgMS41MTYtMzUuNDQ5IDEuNTE2LTEwMy44NjYgMC02OC40MTgtLjI5LTc2Ljk5Ny0xLjUxNi0xMDMuODY3LTEuMjIzLTI2LjgxNC01LjQ4Mi00NS4xMjctMTEuNzA5LTYxLjE1MS02LjQzOC0xNi41NjYtMTUuMDUyLTMwLjYxNS0yOS4wNTctNDQuNjIxLTE0LjAwNi0xNC4wMDUtMjguMDU1LTIyLjYxOS00NC42MjEtMjkuMDU2LTE2LjAyNC02LjIyOC0zNC4zMzctMTAuNDg3LTYxLjE1MS0xMS43MUMzMjguOTE3LjQ0OSAzMjAuMzM4LjE1OSAyNTEuOTIxLjE1OXptMCA0NS4zOTFjNjcuMjY1IDAgNzUuMjMzLjI1NyAxMDEuNzk3IDEuNDY5IDI0LjU2MiAxLjEyIDM3LjkwMSA1LjIyNCA0Ni43NzggOC42NzQgMTEuNzU5IDQuNTcgMjAuMTUxIDEwLjAyOSAyOC45NjYgMTguODQ1IDguODE2IDguODE1IDE0LjI3NSAxNy4yMDcgMTguODQ1IDI4Ljk2NiAzLjQ1IDguODc3IDcuNTU0IDIyLjIxNiA4LjY3NCA0Ni43NzggMS4yMTIgMjYuNTY0IDEuNDY5IDM0LjUzMiAxLjQ2OSAxMDEuNzk4IDAgNjcuMjY1LS4yNTcgNzUuMjMzLTEuNDY5IDEwMS43OTctMS4xMiAyNC41NjItNS4yMjQgMzcuOTAxLTguNjc0IDQ2Ljc3OC00LjU3IDExLjc1OS0xMC4wMjkgMjAuMTUxLTE4Ljg0NSAyOC45NjYtOC44MTUgOC44MTYtMTcuMjA3IDE0LjI3NS0yOC45NjYgMTguODQ1LTguODc3IDMuNDUtMjIuMjE2IDcuNTU0LTQ2Ljc3OCA4LjY3NC0yNi41NiAxLjIxMi0zNC41MjcgMS40NjktMTAxLjc5NyAxLjQ2OS02Ny4yNzEgMC03NS4yMzctLjI1Ny0xMDEuNzk4LTEuNDY5LTI0LjU2Mi0xLjEyLTM3LjkwMS01LjIyNC00Ni43NzgtOC42NzQtMTEuNzU5LTQuNTctMjAuMTUxLTEwLjAyOS0yOC45NjYtMTguODQ1LTguODE1LTguODE1LTE0LjI3NS0xNy4yMDctMTguODQ1LTI4Ljk2Ni0zLjQ1LTguODc3LTcuNTU0LTIyLjIxNi04LjY3NC00Ni43NzgtMS4yMTItMjYuNTY0LTEuNDY5LTM0LjUzMi0xLjQ2OS0xMDEuNzk3IDAtNjcuMjY2LjI1Ny03NS4yMzQgMS40NjktMTAxLjc5OCAxLjEyLTI0LjU2MiA1LjIyNC0zNy45MDEgOC42NzQtNDYuNzc4IDQuNTctMTEuNzU5IDEwLjAyOS0yMC4xNTEgMTguODQ1LTI4Ljk2NiA4LjgxNS04LjgxNiAxNy4yMDctMTQuMjc1IDI4Ljk2Ni0xOC44NDUgOC44NzctMy40NSAyMi4yMTYtNy41NTQgNDYuNzc4LTguNjc0IDI2LjU2NC0xLjIxMiAzNC41MzItMS40NjkgMTAxLjc5OC0xLjQ2OXoiIGZpbGw9IiNGRkYiIG1hc2s9InVybCgjYikiLz48cGF0aCBkPSJNMjUxLjkyMSAzMzYuMDUzYy00Ni4zNzggMC04My45NzQtMzcuNTk2LTgzLjk3NC04My45NzMgMC00Ni4zNzggMzcuNTk2LTgzLjk3NCA4My45NzQtODMuOTc0IDQ2LjM3NyAwIDgzLjk3MyAzNy41OTYgODMuOTczIDgzLjk3NCAwIDQ2LjM3Ny0zNy41OTYgODMuOTczLTgzLjk3MyA4My45NzN6bTAtMjEzLjMzOGMtNzEuNDQ3IDAtMTI5LjM2NSA1Ny45MTgtMTI5LjM2NSAxMjkuMzY1IDAgNzEuNDQ2IDU3LjkxOCAxMjkuMzY0IDEyOS4zNjUgMTI5LjM2NCA3MS40NDYgMCAxMjkuMzY0LTU3LjkxOCAxMjkuMzY0LTEyOS4zNjQgMC03MS40NDctNTcuOTE4LTEyOS4zNjUtMTI5LjM2NC0xMjkuMzY1ek00MTYuNjI3IDExNy42MDRjMCAxNi42OTYtMTMuNTM1IDMwLjIzLTMwLjIzMSAzMC4yMy0xNi42OTUgMC0zMC4yMy0xMy41MzQtMzAuMjMtMzAuMjMgMC0xNi42OTYgMTMuNTM1LTMwLjIzMSAzMC4yMy0zMC4yMzEgMTYuNjk2IDAgMzAuMjMxIDEzLjUzNSAzMC4yMzEgMzAuMjMxIiBmaWxsPSIjRkZGIi8+PC9nPjwvc3ZnPg==)}.ck-media__wrapper[data-oembed-url*="instagram.com"] .ck-media__placeholder .ck-media__placeholder__url__text{color:#ffe0fe}.ck-media__wrapper[data-oembed-url*="instagram.com"] .ck-media__placeholder .ck-media__placeholder__url__text:hover{color:#fff}'},function(t,e,n){var i=n(108);"string"==typeof i&&(i=[[t.i,i,""]]);var o={singleton:!0,hmr:!0,transform:void 0,insertInto:void 0};n(2)(i,o);i.locals&&(t.exports=i.locals)},function(t,e){t.exports=".ck.ck-media-form{display:flex;align-items:flex-start;flex-direction:row;flex-wrap:nowrap}.ck.ck-media-form .ck-labeled-input{display:inline-block}.ck.ck-media-form .ck-label{display:none}@media screen and (max-width:600px){.ck.ck-media-form{flex-wrap:wrap}.ck.ck-media-form .ck-labeled-input{flex-basis:100%}.ck.ck-media-form .ck-button{flex-basis:50%}}.ck.ck-media-form{padding:var(--ck-spacing-standard)}.ck.ck-media-form:focus{outline:none}.ck.ck-media-form>:not(:first-child){margin-left:var(--ck-spacing-standard)}@media screen and (max-width:600px){.ck.ck-media-form{padding:0;width:calc(0.8*var(--ck-input-text-width))}.ck.ck-media-form .ck-labeled-input{margin:var(--ck-spacing-standard) var(--ck-spacing-standard) 0}.ck.ck-media-form .ck-labeled-input .ck-input-text{min-width:0;width:100%}.ck.ck-media-form .ck-labeled-input .ck-labeled-input__error{white-space:normal}.ck.ck-media-form .ck-button{padding:var(--ck-spacing-standard);margin-top:var(--ck-spacing-standard);margin-left:0;border-radius:0;border:0;border-top:1px solid var(--ck-color-base-border)}.ck.ck-media-form .ck-button:first-of-type{border-right:1px solid var(--ck-color-base-border)}}"},function(t,e,n){var i=n(110);"string"==typeof i&&(i=[[t.i,i,""]]);var o={singleton:!0,hmr:!0,transform:void 0,insertInto:void 0};n(2)(i,o);i.locals&&(t.exports=i.locals)},function(t,e){t.exports=".ck-content .media{clear:both;margin:1em 0}"},function(t,e,n){var i=n(112);"string"==typeof i&&(i=[[t.i,i,""]]);var o={singleton:!0,hmr:!0,transform:void 0,insertInto:void 0};n(2)(i,o);i.locals&&(t.exports=i.locals)},function(t,e){t.exports=":root{--ck-color-table-focused-cell-background:#f5fafe}.ck-widget.table td.ck-editor__nested-editable.ck-editor__nested-editable_focused,.ck-widget.table th.ck-editor__nested-editable.ck-editor__nested-editable_focused{background:var(--ck-color-table-focused-cell-background);border-style:none;outline:1px solid var(--ck-color-focus-border);outline-offset:-1px}"},function(t,e,n){var i=n(114);"string"==typeof i&&(i=[[t.i,i,""]]);var o={singleton:!0,hmr:!0,transform:void 0,insertInto:void 0};n(2)(i,o);i.locals&&(t.exports=i.locals)},function(t,e){t.exports=":root{--ck-insert-table-dropdown-padding:10px;--ck-insert-table-dropdown-box-height:11px;--ck-insert-table-dropdown-box-width:12px;--ck-insert-table-dropdown-box-margin:1px;--ck-insert-table-dropdown-box-border-color:#bfbfbf;--ck-insert-table-dropdown-box-border-active-color:#53a0e4;--ck-insert-table-dropdown-box-active-background:#c7e5ff}.ck .ck-insert-table-dropdown__grid{display:flex;flex-direction:row;flex-wrap:wrap;width:calc(var(--ck-insert-table-dropdown-box-width)*10 + var(--ck-insert-table-dropdown-box-margin)*20 + var(--ck-insert-table-dropdown-padding)*2);padding:var(--ck-insert-table-dropdown-padding) var(--ck-insert-table-dropdown-padding) 0}.ck .ck-insert-table-dropdown__label{text-align:center}.ck .ck-insert-table-dropdown-grid-box{width:var(--ck-insert-table-dropdown-box-width);height:var(--ck-insert-table-dropdown-box-height);margin:var(--ck-insert-table-dropdown-box-margin);border:1px solid var(--ck-insert-table-dropdown-box-border-color);border-radius:1px}.ck .ck-insert-table-dropdown-grid-box.ck-on{border-color:var(--ck-insert-table-dropdown-box-border-active-color);background:var(--ck-insert-table-dropdown-box-active-background)}"},function(t,e,n){var i=n(116);"string"==typeof i&&(i=[[t.i,i,""]]);var o={singleton:!0,hmr:!0,transform:void 0,insertInto:void 0};n(2)(i,o);i.locals&&(t.exports=i.locals)},function(t,e){t.exports=".ck-content .table{margin:1em auto;display:table}.ck-content .table table{border-collapse:collapse;border-spacing:0;border:1px double #b3b3b3}.ck-content .table table td,.ck-content .table table th{min-width:2em;padding:.4em;border-color:#d9d9d9}.ck-content .table table th{font-weight:700;background:#fafafa}"},function(t,e,n){"use strict";n.r(e);var i=n(4),o=i.a.Symbol,r=Object.prototype,s=r.hasOwnProperty,a=r.toString,c=o?o.toStringTag:void 0;var l=function(t){var e=s.call(t,c),n=t[c];try{t[c]=void 0;var i=!0}catch(t){}var o=a.call(t);return i&&(e?t[c]=n:delete t[c]),o},d=Object.prototype.toString;var u=function(t){return d.call(t)},h="[object Null]",f="[object Undefined]",m=o?o.toStringTag:void 0;var p=function(t){return null==t?void 0===t?f:h:m&&m in Object(t)?l(t):u(t)};var g=function(t,e){return function(n){return t(e(n))}},b=g(Object.getPrototypeOf,Object);var w=function(t){return null!=t&&"object"==typeof t},_="[object Object]",k=Function.prototype,v=Object.prototype,y=k.toString,x=v.hasOwnProperty,A=y.call(Object);var C=function(t){if(!w(t)||p(t)!=_)return!1;var e=b(t);if(null===e)return!0;var n=x.call(e,"constructor")&&e.constructor;return"function"==typeof n&&n instanceof n&&y.call(n)==A};class T{constructor(t,e){this._config={},e&&this.define(e),t&&this._setObjectToTarget(this._config,t)}set(t,e){this._setToTarget(this._config,t,e)}define(t,e){this._setToTarget(this._config,t,e,!0)}get(t){return this._getFromSource(this._config,t)}_setToTarget(t,e,n,i=!1){if(C(e))return void this._setObjectToTarget(t,e,i);const o=e.split(".");e=o.pop();for(const e of o)C(t[e])||(t[e]={}),t=t[e];if(C(n))return C(t[e])||(t[e]={}),t=t[e],void this._setObjectToTarget(t,n,i);i&&void 0!==t[e]||(t[e]=n)}_getFromSource(t,e){const n=e.split(".");e=n.pop();for(const e of n){if(!C(t[e])){t=null;break}t=t[e]}return t?t[e]:void 0}_setObjectToTarget(t,e,n){Object.keys(e).forEach(i=>{this._setToTarget(t,i,e[i],n)})}}var P=n(0);var M=function(){return function t(){t.called=!0}};class S{constructor(t,e){this.source=t,this.name=e,this.path=[],this.stop=M(),this.off=M()}}function I(){let t="e";for(let e=0;e<8;e++)t+=Math.floor(65536*(1+Math.random())).toString(16).substring(1);return t}var E={get(t){return"number"!=typeof t?this[t]||this.normal:t},highest:1e5,high:1e3,normal:0,low:-1e3,lowest:-1e5};const N=Symbol("listeningTo"),O=Symbol("emitterId");var R={on(t,e,n={}){this.listenTo(this,t,e,n)},once(t,e,n){this.listenTo(this,t,function(t,...n){t.off(),e.call(this,t,...n)},n)},off(t,e){this.stopListening(this,t,e)},listenTo(t,e,n,i={}){let o,r;this[N]||(this[N]={});const s=this[N];L(t)||D(t);const a=L(t);(o=s[a])||(o=s[a]={emitter:t,callbacks:{}}),(r=o.callbacks[e])||(r=o.callbacks[e]=[]),r.push(n),function(t,e){const n=j(t);if(n[e])return;let i=e,o=null;const r=[];for(;""!==i&&!n[i];)n[i]={callbacks:[],childEvents:[]},r.push(n[i]),o&&n[i].childEvents.push(o),o=i,i=i.substr(0,i.lastIndexOf(":"));if(""!==i){for(const t of r)t.callbacks=n[i].callbacks.slice();n[i].childEvents.push(o)}}(t,e);const c=V(t,e),l=E.get(i.priority),d={callback:n,priority:l};for(const t of c){let e=!1;for(let n=0;n<t.length;n++)if(t[n].priority<l){t.splice(n,0,d),e=!0;break}e||t.push(d)}},stopListening(t,e,n){const i=this[N];let o=t&&L(t);const r=i&&o&&i[o],s=r&&e&&r.callbacks[e];if(!(!i||t&&!r||e&&!s))if(n)B(t,e,n);else if(s){for(;n=s.pop();)B(t,e,n);delete r.callbacks[e]}else if(r){for(e in r.callbacks)this.stopListening(t,e);delete i[o]}else{for(o in i)this.stopListening(i[o].emitter);delete this[N]}},fire(t,...e){const n=t instanceof S?t:new S(this,t),i=n.name;let o=function t(e,n){let i;if(!e._events||!(i=e._events[n])||!i.callbacks.length)return n.indexOf(":")>-1?t(e,n.substr(0,n.lastIndexOf(":"))):null;return i.callbacks}(this,i);if(n.path.push(this),o){const t=[n,...e];o=Array.from(o);for(let e=0;e<o.length&&(o[e].callback.apply(this,t),n.off.called&&(delete n.off.called,B(this,i,o[e].callback)),!n.stop.called);e++);}if(this._delegations){const t=this._delegations.get(i),o=this._delegations.get("*");t&&z(t,n,e),o&&z(o,n,e)}return n.return},delegate(...t){return{to:(e,n)=>{this._delegations||(this._delegations=new Map);for(const i of t){const t=this._delegations.get(i);t?t.set(e,n):this._delegations.set(i,new Map([[e,n]]))}}}},stopDelegating(t,e){if(this._delegations)if(t)if(e){const n=this._delegations.get(t);n&&n.delete(e)}else this._delegations.delete(t);else this._delegations.clear()}};function D(t,e){t[O]||(t[O]=e||I())}function L(t){return t[O]}function j(t){return t._events||Object.defineProperty(t,"_events",{value:{}}),t._events}function V(t,e){const n=j(t)[e];if(!n)return[];let i=[n.callbacks];for(let e=0;e<n.childEvents.length;e++){const o=V(t,n.childEvents[e]);i=i.concat(o)}return i}function z(t,e,n){for(let[i,o]of t){o?"function"==typeof o&&(o=o(e.name)):o=e.name;const t=new S(e.source,o);t.path=[...e.path],i.fire(t,...n)}}function B(t,e,n){const i=V(t,e);for(const t of i)for(let e=0;e<t.length;e++)t[e].callback==n&&(t.splice(e,1),e--)}function F(t,...e){e.forEach(e=>{Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e)).forEach(n=>{if(n in t.prototype)return;const i=Object.getOwnPropertyDescriptor(e,n);i.enumerable=!1,Object.defineProperty(t.prototype,n,i)})})}function U(t,e){const n=Math.min(t.length,e.length);for(let i=0;i<n;i++)if(t[i]!=e[i])return i;return t.length==e.length?"same":t.length<e.length?"prefix":"extension"}var H=function(){this.__data__=[],this.size=0};var q=function(t,e){return t===e||t!=t&&e!=e};var W=function(t,e){for(var n=t.length;n--;)if(q(t[n][0],e))return n;return-1},Y=Array.prototype.splice;var $=function(t){var e=this.__data__,n=W(e,t);return!(n<0||(n==e.length-1?e.pop():Y.call(e,n,1),--this.size,0))};var G=function(t){var e=this.__data__,n=W(e,t);return n<0?void 0:e[n][1]};var Q=function(t){return W(this.__data__,t)>-1};var J=function(t,e){var n=this.__data__,i=W(n,t);return i<0?(++this.size,n.push([t,e])):n[i][1]=e,this};function K(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var i=t[e];this.set(i[0],i[1])}}K.prototype.clear=H,K.prototype.delete=$,K.prototype.get=G,K.prototype.has=Q,K.prototype.set=J;var Z=K;var X=function(){this.__data__=new Z,this.size=0};var tt=function(t){var e=this.__data__,n=e.delete(t);return this.size=e.size,n};var et=function(t){return this.__data__.get(t)};var nt=function(t){return this.__data__.has(t)};var it=function(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)},ot="[object AsyncFunction]",rt="[object Function]",st="[object GeneratorFunction]",at="[object Proxy]";var ct=function(t){if(!it(t))return!1;var e=p(t);return e==rt||e==st||e==ot||e==at},lt=i.a["__core-js_shared__"],dt=function(){var t=/[^.]+$/.exec(lt&&lt.keys&&lt.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();var ut=function(t){return!!dt&&dt in t},ht=Function.prototype.toString;var ft=function(t){if(null!=t){try{return ht.call(t)}catch(t){}try{return t+""}catch(t){}}return""},mt=/^\[object .+?Constructor\]$/,pt=Function.prototype,gt=Object.prototype,bt=pt.toString,wt=gt.hasOwnProperty,_t=RegExp("^"+bt.call(wt).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");var kt=function(t){return!(!it(t)||ut(t))&&(ct(t)?_t:mt).test(ft(t))};var vt=function(t,e){return null==t?void 0:t[e]};var yt=function(t,e){var n=vt(t,e);return kt(n)?n:void 0},xt=yt(i.a,"Map"),At=yt(Object,"create");var Ct=function(){this.__data__=At?At(null):{},this.size=0};var Tt=function(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e},Pt="__lodash_hash_undefined__",Mt=Object.prototype.hasOwnProperty;var St=function(t){var e=this.__data__;if(At){var n=e[t];return n===Pt?void 0:n}return Mt.call(e,t)?e[t]:void 0},It=Object.prototype.hasOwnProperty;var Et=function(t){var e=this.__data__;return At?void 0!==e[t]:It.call(e,t)},Nt="__lodash_hash_undefined__";var Ot=function(t,e){var n=this.__data__;return this.size+=this.has(t)?0:1,n[t]=At&&void 0===e?Nt:e,this};function Rt(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var i=t[e];this.set(i[0],i[1])}}Rt.prototype.clear=Ct,Rt.prototype.delete=Tt,Rt.prototype.get=St,Rt.prototype.has=Et,Rt.prototype.set=Ot;var Dt=Rt;var Lt=function(){this.size=0,this.__data__={hash:new Dt,map:new(xt||Z),string:new Dt}};var jt=function(t){var e=typeof t;return"string"==e||"number"==e||"symbol"==e||"boolean"==e?"__proto__"!==t:null===t};var Vt=function(t,e){var n=t.__data__;return jt(e)?n["string"==typeof e?"string":"hash"]:n.map};var zt=function(t){var e=Vt(this,t).delete(t);return this.size-=e?1:0,e};var Bt=function(t){return Vt(this,t).get(t)};var Ft=function(t){return Vt(this,t).has(t)};var Ut=function(t,e){var n=Vt(this,t),i=n.size;return n.set(t,e),this.size+=n.size==i?0:1,this};function Ht(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var i=t[e];this.set(i[0],i[1])}}Ht.prototype.clear=Lt,Ht.prototype.delete=zt,Ht.prototype.get=Bt,Ht.prototype.has=Ft,Ht.prototype.set=Ut;var qt=Ht,Wt=200;var Yt=function(t,e){var n=this.__data__;if(n instanceof Z){var i=n.__data__;if(!xt||i.length<Wt-1)return i.push([t,e]),this.size=++n.size,this;n=this.__data__=new qt(i)}return n.set(t,e),this.size=n.size,this};function $t(t){var e=this.__data__=new Z(t);this.size=e.size}$t.prototype.clear=X,$t.prototype.delete=tt,$t.prototype.get=et,$t.prototype.has=nt,$t.prototype.set=Yt;var Gt=$t;var Qt=function(t,e){for(var n=-1,i=null==t?0:t.length;++n<i&&!1!==e(t[n],n,t););return t},Jt=function(){try{var t=yt(Object,"defineProperty");return t({},"",{}),t}catch(t){}}();var Kt=function(t,e,n){"__proto__"==e&&Jt?Jt(t,e,{configurable:!0,enumerable:!0,value:n,writable:!0}):t[e]=n},Zt=Object.prototype.hasOwnProperty;var Xt=function(t,e,n){var i=t[e];Zt.call(t,e)&&q(i,n)&&(void 0!==n||e in t)||Kt(t,e,n)};var te=function(t,e,n,i){var o=!n;n||(n={});for(var r=-1,s=e.length;++r<s;){var a=e[r],c=i?i(n[a],t[a],a,n,t):void 0;void 0===c&&(c=t[a]),o?Kt(n,a,c):Xt(n,a,c)}return n};var ee=function(t,e){for(var n=-1,i=Array(t);++n<t;)i[n]=e(n);return i},ne="[object Arguments]";var ie=function(t){return w(t)&&p(t)==ne},oe=Object.prototype,re=oe.hasOwnProperty,se=oe.propertyIsEnumerable,ae=ie(function(){return arguments}())?ie:function(t){return w(t)&&re.call(t,"callee")&&!se.call(t,"callee")},ce=Array.isArray,le=n(6),de=9007199254740991,ue=/^(?:0|[1-9]\d*)$/;var he=function(t,e){var n=typeof t;return!!(e=null==e?de:e)&&("number"==n||"symbol"!=n&&ue.test(t))&&t>-1&&t%1==0&&t<e},fe=9007199254740991;var me=function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=fe},pe={};pe["[object Float32Array]"]=pe["[object Float64Array]"]=pe["[object Int8Array]"]=pe["[object Int16Array]"]=pe["[object Int32Array]"]=pe["[object Uint8Array]"]=pe["[object Uint8ClampedArray]"]=pe["[object Uint16Array]"]=pe["[object Uint32Array]"]=!0,pe["[object Arguments]"]=pe["[object Array]"]=pe["[object ArrayBuffer]"]=pe["[object Boolean]"]=pe["[object DataView]"]=pe["[object Date]"]=pe["[object Error]"]=pe["[object Function]"]=pe["[object Map]"]=pe["[object Number]"]=pe["[object Object]"]=pe["[object RegExp]"]=pe["[object Set]"]=pe["[object String]"]=pe["[object WeakMap]"]=!1;var ge=function(t){return w(t)&&me(t.length)&&!!pe[p(t)]};var be=function(t){return function(e){return t(e)}},we=n(5),_e=we.a&&we.a.isTypedArray,ke=_e?be(_e):ge,ve=Object.prototype.hasOwnProperty;var ye=function(t,e){var n=ce(t),i=!n&&ae(t),o=!n&&!i&&Object(le.a)(t),r=!n&&!i&&!o&&ke(t),s=n||i||o||r,a=s?ee(t.length,String):[],c=a.length;for(var l in t)!e&&!ve.call(t,l)||s&&("length"==l||o&&("offset"==l||"parent"==l)||r&&("buffer"==l||"byteLength"==l||"byteOffset"==l)||he(l,c))||a.push(l);return a},xe=Object.prototype;var Ae=function(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||xe)},Ce=g(Object.keys,Object),Te=Object.prototype.hasOwnProperty;var Pe=function(t){if(!Ae(t))return Ce(t);var e=[];for(var n in Object(t))Te.call(t,n)&&"constructor"!=n&&e.push(n);return e};var Me=function(t){return null!=t&&me(t.length)&&!ct(t)};var Se=function(t){return Me(t)?ye(t):Pe(t)};var Ie=function(t,e){return t&&te(e,Se(e),t)};var Ee=function(t){var e=[];if(null!=t)for(var n in Object(t))e.push(n);return e},Ne=Object.prototype.hasOwnProperty;var Oe=function(t){if(!it(t))return Ee(t);var e=Ae(t),n=[];for(var i in t)("constructor"!=i||!e&&Ne.call(t,i))&&n.push(i);return n};var Re=function(t){return Me(t)?ye(t,!0):Oe(t)};var De=function(t,e){return t&&te(e,Re(e),t)},Le=n(19);var je=function(t,e){var n=-1,i=t.length;for(e||(e=Array(i));++n<i;)e[n]=t[n];return e};var Ve=function(t,e){for(var n=-1,i=null==t?0:t.length,o=0,r=[];++n<i;){var s=t[n];e(s,n,t)&&(r[o++]=s)}return r};var ze=function(){return[]},Be=Object.prototype.propertyIsEnumerable,Fe=Object.getOwnPropertySymbols,Ue=Fe?function(t){return null==t?[]:(t=Object(t),Ve(Fe(t),function(e){return Be.call(t,e)}))}:ze;var He=function(t,e){return te(t,Ue(t),e)};var qe=function(t,e){for(var n=-1,i=e.length,o=t.length;++n<i;)t[o+n]=e[n];return t},We=Object.getOwnPropertySymbols?function(t){for(var e=[];t;)qe(e,Ue(t)),t=b(t);return e}:ze;var Ye=function(t,e){return te(t,We(t),e)};var $e=function(t,e,n){var i=e(t);return ce(t)?i:qe(i,n(t))};var Ge=function(t){return $e(t,Se,Ue)};var Qe=function(t){return $e(t,Re,We)},Je=yt(i.a,"DataView"),Ke=yt(i.a,"Promise"),Ze=yt(i.a,"Set"),Xe=yt(i.a,"WeakMap"),tn=ft(Je),en=ft(xt),nn=ft(Ke),on=ft(Ze),rn=ft(Xe),sn=p;(Je&&"[object DataView]"!=sn(new Je(new ArrayBuffer(1)))||xt&&"[object Map]"!=sn(new xt)||Ke&&"[object Promise]"!=sn(Ke.resolve())||Ze&&"[object Set]"!=sn(new Ze)||Xe&&"[object WeakMap]"!=sn(new Xe))&&(sn=function(t){var e=p(t),n="[object Object]"==e?t.constructor:void 0,i=n?ft(n):"";if(i)switch(i){case tn:return"[object DataView]";case en:return"[object Map]";case nn:return"[object Promise]";case on:return"[object Set]";case rn:return"[object WeakMap]"}return e});var an=sn,cn=Object.prototype.hasOwnProperty;var ln=function(t){var e=t.length,n=new t.constructor(e);return e&&"string"==typeof t[0]&&cn.call(t,"index")&&(n.index=t.index,n.input=t.input),n},dn=i.a.Uint8Array;var un=function(t){var e=new t.constructor(t.byteLength);return new dn(e).set(new dn(t)),e};var hn=function(t,e){var n=e?un(t.buffer):t.buffer;return new t.constructor(n,t.byteOffset,t.byteLength)},fn=/\w*$/;var mn=function(t){var e=new t.constructor(t.source,fn.exec(t));return e.lastIndex=t.lastIndex,e},pn=o?o.prototype:void 0,gn=pn?pn.valueOf:void 0;var bn=function(t){return gn?Object(gn.call(t)):{}};var wn=function(t,e){var n=e?un(t.buffer):t.buffer;return new t.constructor(n,t.byteOffset,t.length)},_n="[object Boolean]",kn="[object Date]",vn="[object Map]",yn="[object Number]",xn="[object RegExp]",An="[object Set]",Cn="[object String]",Tn="[object Symbol]",Pn="[object ArrayBuffer]",Mn="[object DataView]",Sn="[object Float32Array]",In="[object Float64Array]",En="[object Int8Array]",Nn="[object Int16Array]",On="[object Int32Array]",Rn="[object Uint8Array]",Dn="[object Uint8ClampedArray]",Ln="[object Uint16Array]",jn="[object Uint32Array]";var Vn=function(t,e,n){var i=t.constructor;switch(e){case Pn:return un(t);case _n:case kn:return new i(+t);case Mn:return hn(t,n);case Sn:case In:case En:case Nn:case On:case Rn:case Dn:case Ln:case jn:return wn(t,n);case vn:return new i;case yn:case Cn:return new i(t);case xn:return mn(t);case An:return new i;case Tn:return bn(t)}},zn=Object.create,Bn=function(){function t(){}return function(e){if(!it(e))return{};if(zn)return zn(e);t.prototype=e;var n=new t;return t.prototype=void 0,n}}();var Fn=function(t){return"function"!=typeof t.constructor||Ae(t)?{}:Bn(b(t))},Un="[object Map]";var Hn=function(t){return w(t)&&an(t)==Un},qn=we.a&&we.a.isMap,Wn=qn?be(qn):Hn,Yn="[object Set]";var $n=function(t){return w(t)&&an(t)==Yn},Gn=we.a&&we.a.isSet,Qn=Gn?be(Gn):$n,Jn=1,Kn=2,Zn=4,Xn="[object Arguments]",ti="[object Function]",ei="[object GeneratorFunction]",ni="[object Object]",ii={};ii[Xn]=ii["[object Array]"]=ii["[object ArrayBuffer]"]=ii["[object DataView]"]=ii["[object Boolean]"]=ii["[object Date]"]=ii["[object Float32Array]"]=ii["[object Float64Array]"]=ii["[object Int8Array]"]=ii["[object Int16Array]"]=ii["[object Int32Array]"]=ii["[object Map]"]=ii["[object Number]"]=ii[ni]=ii["[object RegExp]"]=ii["[object Set]"]=ii["[object String]"]=ii["[object Symbol]"]=ii["[object Uint8Array]"]=ii["[object Uint8ClampedArray]"]=ii["[object Uint16Array]"]=ii["[object Uint32Array]"]=!0,ii["[object Error]"]=ii[ti]=ii["[object WeakMap]"]=!1;var oi=function t(e,n,i,o,r,s){var a,c=n&Jn,l=n&Kn,d=n&Zn;if(i&&(a=r?i(e,o,r,s):i(e)),void 0!==a)return a;if(!it(e))return e;var u=ce(e);if(u){if(a=ln(e),!c)return je(e,a)}else{var h=an(e),f=h==ti||h==ei;if(Object(le.a)(e))return Object(Le.a)(e,c);if(h==ni||h==Xn||f&&!r){if(a=l||f?{}:Fn(e),!c)return l?Ye(e,De(a,e)):He(e,Ie(a,e))}else{if(!ii[h])return r?e:{};a=Vn(e,h,c)}}s||(s=new Gt);var m=s.get(e);if(m)return m;if(s.set(e,a),Qn(e))return e.forEach(function(o){a.add(t(o,n,i,o,e,s))}),a;if(Wn(e))return e.forEach(function(o,r){a.set(r,t(o,n,i,r,e,s))}),a;var p=d?l?Qe:Ge:l?keysIn:Se,g=u?void 0:p(e);return Qt(g||e,function(o,r){g&&(o=e[r=o]),Xt(a,r,t(o,n,i,r,e,s))}),a},ri=4;var si=function(t){return oi(t,ri)};class ai{constructor(){this.parent=null}get index(){let t;if(!this.parent)return null;if(-1==(t=this.parent.getChildIndex(this)))throw new P.b("view-node-not-found-in-parent: The node's parent does not contain this node.");return t}get nextSibling(){const t=this.index;return null!==t&&this.parent.getChild(t+1)||null}get previousSibling(){const t=this.index;return null!==t&&this.parent.getChild(t-1)||null}get root(){let t=this;for(;t.parent;)t=t.parent;return t}get document(){return this.parent instanceof ai?this.parent.document:null}getPath(){const t=[];let e=this;for(;e.parent;)t.unshift(e.index),e=e.parent;return t}getAncestors(t={includeSelf:!1,parentFirst:!1}){const e=[];let n=t.includeSelf?this:this.parent;for(;n;)e[t.parentFirst?"push":"unshift"](n),n=n.parent;return e}getCommonAncestor(t,e={}){const n=this.getAncestors(e),i=t.getAncestors(e);let o=0;for(;n[o]==i[o]&&n[o];)o++;return 0===o?null:n[o-1]}isBefore(t){if(this==t)return!1;if(this.root!==t.root)return!1;const e=this.getPath(),n=t.getPath(),i=U(e,n);switch(i){case"prefix":return!0;case"extension":return!1;default:return e[i]<n[i]}}isAfter(t){return this!=t&&(this.root===t.root&&!this.isBefore(t))}_remove(){this.parent._removeChildren(this.index)}_fireChange(t,e){this.fire("change:"+t,e),this.parent&&this.parent._fireChange(t,e)}toJSON(){const t=si(this);return delete t.parent,t}is(t){return"node"==t}}F(ai,R);class ci extends ai{constructor(t){super(),this._textData=t}is(t){return"text"==t||super.is(t)}get data(){return this._textData}get _data(){return this.data}set _data(t){this._fireChange("text",this),this._textData=t}isSimilar(t){return t instanceof ci&&(this===t||this.data===t.data)}_clone(){return new ci(this.data)}}class li{constructor(t,e,n){if(this.textNode=t,e<0||e>t.data.length)throw new P.b("view-textproxy-wrong-offsetintext: Given offsetInText value is incorrect.");if(n<0||e+n>t.data.length)throw new P.b("view-textproxy-wrong-length: Given length value is incorrect.");this.data=t.data.substring(e,e+n),this.offsetInText=e}get offsetSize(){return this.data.length}get isPartial(){return this.data.length!==this.textNode.data.length}get parent(){return this.textNode.parent}get root(){return this.textNode.root}get document(){return this.textNode.document}is(t){return"textProxy"==t}getAncestors(t={includeSelf:!1,parentFirst:!1}){const e=[];let n=t.includeSelf?this.textNode:this.parent;for(;null!==n;)e[t.parentFirst?"push":"unshift"](n),n=n.parent;return e}}function di(t){const e=new Map;for(const n in t)e.set(n,t[n]);return e}function ui(t){return!(!t||!t[Symbol.iterator])}class hi{constructor(...t){this._patterns=[],this.add(...t)}add(...t){for(let e of t)("string"==typeof e||e instanceof RegExp)&&(e={name:e}),e.classes&&("string"==typeof e.classes||e.classes instanceof RegExp)&&(e.classes=[e.classes]),this._patterns.push(e)}match(...t){for(const e of t)for(const t of this._patterns){const n=fi(e,t);if(n)return{element:e,pattern:t,match:n}}return null}matchAll(...t){const e=[];for(const n of t)for(const t of this._patterns){const i=fi(n,t);i&&e.push({element:n,pattern:t,match:i})}return e.length>0?e:null}getElementName(){if(1!==this._patterns.length)return null;const t=this._patterns[0],e=t.name;return"function"==typeof t||!e||e instanceof RegExp?null:e}}function fi(t,e){if("function"==typeof e)return e(t);const n={};return e.name&&(n.name=function(t,e){if(t instanceof RegExp)return t.test(e);return t===e}(e.name,t.name),!n.name)?null:e.attributes&&(n.attributes=function(t,e){const n=[];for(const i in t){const o=t[i];if(!e.hasAttribute(i))return null;{const t=e.getAttribute(i);if(!0===o)n.push(i);else if(o instanceof RegExp){if(!o.test(t))return null;n.push(i)}else{if(t!==o)return null;n.push(i)}}}return n}(e.attributes,t),!n.attributes)?null:!(e.classes&&(n.classes=function(t,e){const n=[];for(const i of t)if(i instanceof RegExp){const t=e.getClassNames();for(const e of t)i.test(e)&&n.push(e);if(0===n.length)return null}else{if(!e.hasClass(i))return null;n.push(i)}return n}(e.classes,t),!n.classes))&&(!(e.styles&&(n.styles=function(t,e){const n=[];for(const i in t){const o=t[i];if(!e.hasStyle(i))return null;{const t=e.getStyle(i);if(o instanceof RegExp){if(!o.test(t))return null;n.push(i)}else{if(t!==o)return null;n.push(i)}}}return n}(e.styles,t),!n.styles))&&n)}class mi extends ai{constructor(t,e,n){if(super(),this.name=t,this._attrs=function(t){t=C(t)?di(t):new Map(t);for(const[e,n]of t)null===n?t.delete(e):"string"!=typeof n&&t.set(e,String(n));return t}(e),this._children=[],n&&this._insertChild(0,n),this._classes=new Set,this._attrs.has("class")){const t=this._attrs.get("class");gi(this._classes,t),this._attrs.delete("class")}this._styles=new Map,this._attrs.has("style")&&(pi(this._styles,this._attrs.get("style")),this._attrs.delete("style")),this._customProperties=new Map}get childCount(){return this._children.length}get isEmpty(){return 0===this._children.length}is(t,e=null){return e?"element"==t&&e==this.name:"element"==t||t==this.name||super.is(t)}getChild(t){return this._children[t]}getChildIndex(t){return this._children.indexOf(t)}getChildren(){return this._children[Symbol.iterator]()}*getAttributeKeys(){this._classes.size>0&&(yield"class"),this._styles.size>0&&(yield"style");for(const t of this._attrs.keys())yield t}*getAttributes(){yield*this._attrs.entries(),this._classes.size>0&&(yield["class",this.getAttribute("class")]),this._styles.size>0&&(yield["style",this.getAttribute("style")])}getAttribute(t){if("class"==t)return this._classes.size>0?[...this._classes].join(" "):void 0;if("style"!=t)return this._attrs.get(t);if(this._styles.size>0){let t="";for(const[e,n]of this._styles)t+=`${e}:${n};`;return t}}hasAttribute(t){return"class"==t?this._classes.size>0:"style"==t?this._styles.size>0:this._attrs.has(t)}isSimilar(t){if(!(t instanceof mi))return!1;if(this===t)return!0;if(this.name!=t.name)return!1;if(this._attrs.size!==t._attrs.size||this._classes.size!==t._classes.size||this._styles.size!==t._styles.size)return!1;for(const[e,n]of this._attrs)if(!t._attrs.has(e)||t._attrs.get(e)!==n)return!1;for(const e of this._classes)if(!t._classes.has(e))return!1;for(const[e,n]of this._styles)if(!t._styles.has(e)||t._styles.get(e)!==n)return!1;return!0}hasClass(...t){for(const e of t)if(!this._classes.has(e))return!1;return!0}getClassNames(){return this._classes.keys()}getStyle(t){return this._styles.get(t)}getStyleNames(){return this._styles.keys()}hasStyle(...t){for(const e of t)if(!this._styles.has(e))return!1;return!0}findAncestor(...t){const e=new hi(...t);let n=this.parent;for(;n;){if(e.match(n))return n;n=n.parent}return null}getCustomProperty(t){return this._customProperties.get(t)}*getCustomProperties(){yield*this._customProperties.entries()}getIdentity(){const t=Array.from(this._classes).sort().join(","),e=Array.from(this._styles).map(t=>`${t[0]}:${t[1]}`).sort().join(";"),n=Array.from(this._attrs).map(t=>`${t[0]}="${t[1]}"`).sort().join(" ");return this.name+(""==t?"":` class="${t}"`)+(""==e?"":` style="${e}"`)+(""==n?"":` ${n}`)}_clone(t=!1){const e=[];if(t)for(const n of this.getChildren())e.push(n._clone(t));const n=new this.constructor(this.name,this._attrs,e);return n._classes=new Set(this._classes),n._styles=new Map(this._styles),n._customProperties=new Map(this._customProperties),n.getFillerOffset=this.getFillerOffset,n}_appendChild(t){return this._insertChild(this.childCount,t)}_insertChild(t,e){this._fireChange("children",this);let n=0;const i=function(t){if("string"==typeof t)return[new ci(t)];ui(t)||(t=[t]);return Array.from(t).map(t=>"string"==typeof t?new ci(t):t instanceof li?new ci(t.data):t)}(e);for(const e of i)null!==e.parent&&e._remove(),e.parent=this,this._children.splice(t,0,e),t++,n++;return n}_removeChildren(t,e=1){this._fireChange("children",this);for(let n=t;n<t+e;n++)this._children[n].parent=null;return this._children.splice(t,e)}_setAttribute(t,e){e=String(e),this._fireChange("attributes",this),"class"==t?gi(this._classes,e):"style"==t?pi(this._styles,e):this._attrs.set(t,e)}_removeAttribute(t){return this._fireChange("attributes",this),"class"==t?this._classes.size>0&&(this._classes.clear(),!0):"style"==t?this._styles.size>0&&(this._styles.clear(),!0):this._attrs.delete(t)}_addClass(t){this._fireChange("attributes",this),(t=Array.isArray(t)?t:[t]).forEach(t=>this._classes.add(t))}_removeClass(t){this._fireChange("attributes",this),(t=Array.isArray(t)?t:[t]).forEach(t=>this._classes.delete(t))}_setStyle(t,e){if(this._fireChange("attributes",this),C(t)){const e=Object.keys(t);for(const n of e)this._styles.set(n,t[n])}else this._styles.set(t,e)}_removeStyle(t){this._fireChange("attributes",this),(t=Array.isArray(t)?t:[t]).forEach(t=>this._styles.delete(t))}_setCustomProperty(t,e){this._customProperties.set(t,e)}_removeCustomProperty(t){return this._customProperties.delete(t)}}function pi(t,e){let n=null,i=0,o=0,r=null;if(t.clear(),""!==e){";"!=e.charAt(e.length-1)&&(e+=";");for(let s=0;s<e.length;s++){const a=e.charAt(s);if(null===n)switch(a){case":":r||(r=e.substr(i,s-i),o=s+1);break;case'"':case"'":n=a;break;case";":{const n=e.substr(o,s-o);r&&t.set(r.trim(),n.trim()),r=null,i=s+1;break}}else a===n&&(n=null)}}}function gi(t,e){const n=e.split(/\s+/);t.clear(),n.forEach(e=>t.add(e))}class bi extends mi{constructor(t,e,n){super(t,e,n),this.getFillerOffset=wi}is(t,e=null){return e?"containerElement"==t&&e==this.name||super.is(t,e):"containerElement"==t||super.is(t)}}function wi(){const t=[...this.getChildren()],e=t[this.childCount-1];if(e&&e.is("element","br"))return this.childCount;for(const e of t)if(!e.is("uiElement"))return null;return this.childCount}var _i=function(t){return t};var ki=function(t,e,n){switch(n.length){case 0:return t.call(e);case 1:return t.call(e,n[0]);case 2:return t.call(e,n[0],n[1]);case 3:return t.call(e,n[0],n[1],n[2])}return t.apply(e,n)},vi=Math.max;var yi=function(t,e,n){return e=vi(void 0===e?t.length-1:e,0),function(){for(var i=arguments,o=-1,r=vi(i.length-e,0),s=Array(r);++o<r;)s[o]=i[e+o];o=-1;for(var a=Array(e+1);++o<e;)a[o]=i[o];return a[e]=n(s),ki(t,this,a)}};var xi=function(t){return function(){return t}},Ai=Jt?function(t,e){return Jt(t,"toString",{configurable:!0,enumerable:!1,value:xi(e),writable:!0})}:_i,Ci=800,Ti=16,Pi=Date.now;var Mi=function(t){var e=0,n=0;return function(){var i=Pi(),o=Ti-(i-n);if(n=i,o>0){if(++e>=Ci)return arguments[0]}else e=0;return t.apply(void 0,arguments)}}(Ai);var Si=function(t,e){return Mi(yi(t,e,_i),t+"")};var Ii=function(t,e,n){if(!it(n))return!1;var i=typeof e;return!!("number"==i?Me(n)&&he(e,n.length):"string"==i&&e in n)&&q(n[e],t)};var Ei=function(t){return Si(function(e,n){var i=-1,o=n.length,r=o>1?n[o-1]:void 0,s=o>2?n[2]:void 0;for(r=t.length>3&&"function"==typeof r?(o--,r):void 0,s&&Ii(n[0],n[1],s)&&(r=o<3?void 0:r,o=1),e=Object(e);++i<o;){var a=n[i];a&&t(e,a,i,r)}return e})}(function(t,e){te(e,Re(e),t)});const Ni=Symbol("observableProperties"),Oi=Symbol("boundObservables"),Ri=Symbol("boundProperties"),Di={set(t,e){if(it(t))return void Object.keys(t).forEach(e=>{this.set(e,t[e])},this);ji(this);const n=this[Ni];if(t in this&&!n.has(t))throw new P.b("observable-set-cannot-override: Cannot override an existing property.");Object.defineProperty(this,t,{enumerable:!0,configurable:!0,get:()=>n.get(t),set(e){const i=n.get(t);let o=this.fire("set:"+t,t,e,i);void 0===o&&(o=e),i===o&&n.has(t)||(n.set(t,o),this.fire("change:"+t,t,o,i))}}),this[t]=e},bind(...t){if(!t.length||!Bi(t))throw new P.b("observable-bind-wrong-properties: All properties must be strings.");if(new Set(t).size!==t.length)throw new P.b("observable-bind-duplicate-properties: Properties must be unique.");ji(this);const e=this[Ri];t.forEach(t=>{if(e.has(t))throw new P.b("observable-bind-rebind: Cannot bind the same property more that once.")});const n=new Map;return t.forEach(t=>{const i={property:t,to:[]};e.set(t,i),n.set(t,i)}),{to:Vi,toMany:zi,_observable:this,_bindProperties:t,_to:[],_bindings:n}},unbind(...t){if(!(Ni in this))return;const e=this[Ri],n=this[Oi];if(t.length){if(!Bi(t))throw new P.b("observable-unbind-wrong-properties: Properties must be strings.");t.forEach(t=>{const i=e.get(t);if(!i)return;let o,r,s,a;i.to.forEach(t=>{o=t[0],r=t[1],s=n.get(o),(a=s[r]).delete(i),a.size||delete s[r],Object.keys(s).length||(n.delete(o),this.stopListening(o,"change"))}),e.delete(t)})}else n.forEach((t,e)=>{this.stopListening(e,"change")}),n.clear(),e.clear()},decorate(t){const e=this[t];if(!e)throw new P.b("observablemixin-cannot-decorate-undefined: Cannot decorate an undefined method.",{object:this,methodName:t});this.on(t,(t,n)=>{t.return=e.apply(this,n)}),this[t]=function(...e){return this.fire(t,e)}}};Ei(Di,R);var Li=Di;function ji(t){Ni in t||(Object.defineProperty(t,Ni,{value:new Map}),Object.defineProperty(t,Oi,{value:new Map}),Object.defineProperty(t,Ri,{value:new Map}))}function Vi(...t){const e=function(...t){if(!t.length)throw new P.b("observable-bind-to-parse-error: Invalid argument syntax in `to()`.");const e={to:[]};let n;"function"==typeof t[t.length-1]&&(e.callback=t.pop());return t.forEach(t=>{if("string"==typeof t)n.properties.push(t);else{if("object"!=typeof t)throw new P.b("observable-bind-to-parse-error: Invalid argument syntax in `to()`.");n={observable:t,properties:[]},e.to.push(n)}}),e}(...t),n=Array.from(this._bindings.keys()),i=n.length;if(!e.callback&&e.to.length>1)throw new P.b("observable-bind-to-no-callback: Binding multiple observables only possible with callback.");if(i>1&&e.callback)throw new P.b("observable-bind-to-extra-callback: Cannot bind multiple properties and use a callback in one binding.");e.to.forEach(t=>{if(t.properties.length&&t.properties.length!==i)throw new P.b("observable-bind-to-properties-length: The number of properties must match.");t.properties.length||(t.properties=this._bindProperties)}),this._to=e.to,e.callback&&(this._bindings.get(n[0]).callback=e.callback),function(t,e){e.forEach(e=>{const n=t[Oi];let i;n.get(e.observable)||t.listenTo(e.observable,"change",(o,r)=>{(i=n.get(e.observable)[r])&&i.forEach(e=>{Fi(t,e.property)})})})}(this._observable,this._to),function(t){let e;t._bindings.forEach((n,i)=>{t._to.forEach(o=>{e=o.properties[n.callback?0:t._bindProperties.indexOf(i)],n.to.push([o.observable,e]),function(t,e,n,i){const o=t[Oi],r=o.get(n),s=r||{};s[i]||(s[i]=new Set);s[i].add(e),r||o.set(n,s)}(t._observable,n,o.observable,e)})})}(this),this._bindProperties.forEach(t=>{Fi(this._observable,t)})}function zi(t,e,n){if(this._bindings.size>1)throw new P.b("observable-bind-to-many-not-one-binding: Cannot bind multiple properties with toMany().");this.to(...function(t,e){const n=t.map(t=>[t,e]);return Array.prototype.concat.apply([],n)}(t,e),n)}function Bi(t){return t.every(t=>"string"==typeof t)}function Fi(t,e){const n=t[Ri].get(e);let i;i=n.callback?n.callback.apply(t,n.to.map(t=>t[0][t[1]])):(i=n.to[0])[0][i[1]],t.hasOwnProperty(e)?t[e]=i:t.set(e,i)}const Ui=Symbol("document");class Hi extends bi{constructor(t,e,n){super(t,e,n),this.set("isReadOnly",!1),this.set("isFocused",!1)}is(t,e=null){return e?"editableElement"==t&&e==this.name||super.is(t,e):"editableElement"==t||super.is(t)}get document(){return this.getCustomProperty(Ui)}set _document(t){if(this.getCustomProperty(Ui))throw new P.b("view-editableelement-document-already-set: View document is already set.");this._setCustomProperty(Ui,t),this.bind("isReadOnly").to(t),this.bind("isFocused").to(t,"isFocused",e=>e&&t.selection.editableElement==this),this.listenTo(t.selection,"change",()=>{this.isFocused=t.isFocused&&t.selection.editableElement==this})}}F(Hi,Li);const qi=Symbol("rootName");class Wi extends Hi{constructor(t){super(t),this.rootName="main"}is(t,e=null){return e?"rootElement"==t&&e==this.name||super.is(t,e):"rootElement"==t||super.is(t)}get rootName(){return this.getCustomProperty(qi)}set rootName(t){this._setCustomProperty(qi,t)}set _name(t){this.name=t}}class Yi{constructor(t={}){if(!t.boundaries&&!t.startPosition)throw new P.b("view-tree-walker-no-start-position: Neither boundaries nor starting position have been defined.");if(t.direction&&"forward"!=t.direction&&"backward"!=t.direction)throw new P.b("view-tree-walker-unknown-direction: Only `backward` and `forward` direction allowed.",{direction:t.direction});this.boundaries=t.boundaries||null,t.startPosition?this.position=$i._createAt(t.startPosition):this.position=$i._createAt(t.boundaries["backward"==t.direction?"end":"start"]),this.direction=t.direction||"forward",this.singleCharacters=!!t.singleCharacters,this.shallow=!!t.shallow,this.ignoreElementEnd=!!t.ignoreElementEnd,this._boundaryStartParent=this.boundaries?this.boundaries.start.parent:null,this._boundaryEndParent=this.boundaries?this.boundaries.end.parent:null}[Symbol.iterator](){return this}skip(t){let e,n,i;do{i=this.position,({done:e,value:n}=this.next())}while(!e&&t(n));e||(this.position=i)}next(){return"forward"==this.direction?this._next():this._previous()}_next(){let t=this.position.clone();const e=this.position,n=t.parent;if(null===n.parent&&t.offset===n.childCount)return{done:!0};if(n===this._boundaryEndParent&&t.offset==this.boundaries.end.offset)return{done:!0};let i;if(n instanceof ci){if(t.isAtEnd)return this.position=$i._createAfter(n),this._next();i=n.data[t.offset]}else i=n.getChild(t.offset);if(i instanceof mi)return this.shallow?t.offset++:t=new $i(i,0),this.position=t,this._formatReturnValue("elementStart",i,e,t,1);if(i instanceof ci){if(this.singleCharacters)return t=new $i(i,0),this.position=t,this._next();{let n,o=i.data.length;return i==this._boundaryEndParent?(o=this.boundaries.end.offset,n=new li(i,0,o),t=$i._createAfter(n)):(n=new li(i,0,i.data.length),t.offset++),this.position=t,this._formatReturnValue("text",n,e,t,o)}}if("string"==typeof i){let i;if(this.singleCharacters)i=1;else{i=(n===this._boundaryEndParent?this.boundaries.end.offset:n.data.length)-t.offset}const o=new li(n,t.offset,i);return t.offset+=i,this.position=t,this._formatReturnValue("text",o,e,t,i)}return t=$i._createAfter(n),this.position=t,this.ignoreElementEnd?this._next():this._formatReturnValue("elementEnd",n,e,t)}_previous(){let t=this.position.clone();const e=this.position,n=t.parent;if(null===n.parent&&0===t.offset)return{done:!0};if(n==this._boundaryStartParent&&t.offset==this.boundaries.start.offset)return{done:!0};let i;if(n instanceof ci){if(t.isAtStart)return this.position=$i._createBefore(n),this._previous();i=n.data[t.offset-1]}else i=n.getChild(t.offset-1);if(i instanceof mi)return this.shallow?(t.offset--,this.position=t,this._formatReturnValue("elementStart",i,e,t,1)):(t=new $i(i,i.childCount),this.position=t,this.ignoreElementEnd?this._previous():this._formatReturnValue("elementEnd",i,e,t));if(i instanceof ci){if(this.singleCharacters)return t=new $i(i,i.data.length),this.position=t,this._previous();{let n,o=i.data.length;if(i==this._boundaryStartParent){const e=this.boundaries.start.offset;o=(n=new li(i,e,i.data.length-e)).data.length,t=$i._createBefore(n)}else n=new li(i,0,i.data.length),t.offset--;return this.position=t,this._formatReturnValue("text",n,e,t,o)}}if("string"==typeof i){let i;if(this.singleCharacters)i=1;else{const e=n===this._boundaryStartParent?this.boundaries.start.offset:0;i=t.offset-e}t.offset-=i;const o=new li(n,t.offset,i);return this.position=t,this._formatReturnValue("text",o,e,t,i)}return t=$i._createBefore(n),this.position=t,this._formatReturnValue("elementStart",n,e,t,1)}_formatReturnValue(t,e,n,i,o){return e instanceof li&&(e.offsetInText+e.data.length==e.textNode.data.length&&("forward"!=this.direction||this.boundaries&&this.boundaries.end.isEqual(this.position)?n=$i._createAfter(e.textNode):(i=$i._createAfter(e.textNode),this.position=i)),0===e.offsetInText&&("backward"!=this.direction||this.boundaries&&this.boundaries.start.isEqual(this.position)?n=$i._createBefore(e.textNode):(i=$i._createBefore(e.textNode),this.position=i))),{done:!1,value:{type:t,item:e,previousPosition:n,nextPosition:i,length:o}}}}class $i{constructor(t,e){this.parent=t,this.offset=e}get nodeAfter(){return this.parent.is("text")?null:this.parent.getChild(this.offset)||null}get nodeBefore(){return this.parent.is("text")?null:this.parent.getChild(this.offset-1)||null}get isAtStart(){return 0===this.offset}get isAtEnd(){const t=this.parent.is("text")?this.parent.data.length:this.parent.childCount;return this.offset===t}get root(){return this.parent.root}get editableElement(){let t=this.parent;for(;!(t instanceof Hi);){if(!t.parent)return null;t=t.parent}return t}getShiftedBy(t){const e=$i._createAt(this),n=e.offset+t;return e.offset=n<0?0:n,e}getLastMatchingPosition(t,e={}){e.startPosition=this;const n=new Yi(e);return n.skip(t),n.position}getAncestors(){return this.parent.is("documentFragment")?[this.parent]:this.parent.getAncestors({includeSelf:!0})}getCommonAncestor(t){const e=this.getAncestors(),n=t.getAncestors();let i=0;for(;e[i]==n[i]&&e[i];)i++;return 0===i?null:e[i-1]}isEqual(t){return this.parent==t.parent&&this.offset==t.offset}isBefore(t){return"before"==this.compareWith(t)}isAfter(t){return"after"==this.compareWith(t)}compareWith(t){if(this.root!==t.root)return"different";if(this.isEqual(t))return"same";const e=this.parent.is("node")?this.parent.getPath():[],n=t.parent.is("node")?t.parent.getPath():[];e.push(this.offset),n.push(t.offset);const i=U(e,n);switch(i){case"prefix":return"before";case"extension":return"after";default:return e[i]<n[i]?"before":"after"}}getWalker(t={}){return t.startPosition=this,new Yi(t)}clone(){return new $i(this.parent,this.offset)}static _createAt(t,e){if(t instanceof $i)return new this(t.parent,t.offset);{const n=t;if("end"==e)e=n.is("text")?n.data.length:n.childCount;else{if("before"==e)return this._createBefore(n);if("after"==e)return this._createAfter(n);if(0!==e&&!e)throw new P.b("view-createPositionAt-offset-required: View#createPositionAt() requires the offset when the first parameter is a view item.")}return new $i(n,e)}}static _createAfter(t){if(t.is("textProxy"))return new $i(t.textNode,t.offsetInText+t.data.length);if(!t.parent)throw new P.b("view-position-after-root: You can not make position after root.",{root:t});return new $i(t.parent,t.index+1)}static _createBefore(t){if(t.is("textProxy"))return new $i(t.textNode,t.offsetInText);if(!t.parent)throw new P.b("view-position-before-root: You can not make position before root.",{root:t});return new $i(t.parent,t.index)}}class Gi{constructor(t,e=null){this.start=t.clone(),this.end=e?e.clone():t.clone()}*[Symbol.iterator](){yield*new Yi({boundaries:this,ignoreElementEnd:!0})}get isCollapsed(){return this.start.isEqual(this.end)}get isFlat(){return this.start.parent===this.end.parent}get root(){return this.start.root}getEnlarged(){let t=this.start.getLastMatchingPosition(Qi,{direction:"backward"}),e=this.end.getLastMatchingPosition(Qi);return t.parent.is("text")&&t.isAtStart&&(t=$i._createBefore(t.parent)),e.parent.is("text")&&e.isAtEnd&&(e=$i._createAfter(e.parent)),new Gi(t,e)}getTrimmed(){let t=this.start.getLastMatchingPosition(Qi);if(t.isAfter(this.end)||t.isEqual(this.end))return new Gi(t,t);let e=this.end.getLastMatchingPosition(Qi,{direction:"backward"});const n=t.nodeAfter,i=e.nodeBefore;return n&&n.is("text")&&(t=new $i(n,0)),i&&i.is("text")&&(e=new $i(i,i.data.length)),new Gi(t,e)}isEqual(t){return this==t||this.start.isEqual(t.start)&&this.end.isEqual(t.end)}containsPosition(t){return t.isAfter(this.start)&&t.isBefore(this.end)}containsRange(t,e=!1){t.isCollapsed&&(e=!1);const n=this.containsPosition(t.start)||e&&this.start.isEqual(t.start),i=this.containsPosition(t.end)||e&&this.end.isEqual(t.end);return n&&i}getDifference(t){const e=[];return this.isIntersecting(t)?(this.containsPosition(t.start)&&e.push(new Gi(this.start,t.start)),this.containsPosition(t.end)&&e.push(new Gi(t.end,this.end))):e.push(this.clone()),e}getIntersection(t){if(this.isIntersecting(t)){let e=this.start,n=this.end;return this.containsPosition(t.start)&&(e=t.start),this.containsPosition(t.end)&&(n=t.end),new Gi(e,n)}return null}getWalker(t={}){return t.boundaries=this,new Yi(t)}getCommonAncestor(){return this.start.getCommonAncestor(this.end)}clone(){return new Gi(this.start,this.end)}*getItems(t={}){t.boundaries=this,t.ignoreElementEnd=!0;const e=new Yi(t);for(const t of e)yield t.item}*getPositions(t={}){t.boundaries=this;const e=new Yi(t);yield e.position;for(const t of e)yield t.nextPosition}isIntersecting(t){return this.start.isBefore(t.end)&&this.end.isAfter(t.start)}static _createFromParentsAndOffsets(t,e,n,i){return new this(new $i(t,e),new $i(n,i))}static _createFromPositionAndShift(t,e){const n=t,i=t.getShiftedBy(e);return e>0?new this(n,i):new this(i,n)}static _createIn(t){return this._createFromParentsAndOffsets(t,0,t,t.childCount)}static _createOn(t){const e=t.is("textProxy")?t.offsetSize:1;return this._createFromPositionAndShift($i._createBefore(t),e)}}function Qi(t){return!(!t.item.is("attributeElement")&&!t.item.is("uiElement"))}function Ji(t){let e=0;for(const n of t)e++;return e}class Ki{constructor(t=null,e,n){this._ranges=[],this._lastRangeBackward=!1,this._isFake=!1,this._fakeSelectionLabel="",this.setTo(t,e,n)}get isFake(){return this._isFake}get fakeSelectionLabel(){return this._fakeSelectionLabel}get anchor(){if(!this._ranges.length)return null;const t=this._ranges[this._ranges.length-1];return(this._lastRangeBackward?t.end:t.start).clone()}get focus(){if(!this._ranges.length)return null;const t=this._ranges[this._ranges.length-1];return(this._lastRangeBackward?t.start:t.end).clone()}get isCollapsed(){return 1===this.rangeCount&&this._ranges[0].isCollapsed}get rangeCount(){return this._ranges.length}get isBackward(){return!this.isCollapsed&&this._lastRangeBackward}get editableElement(){return this.anchor?this.anchor.editableElement:null}*getRanges(){for(const t of this._ranges)yield t.clone()}getFirstRange(){let t=null;for(const e of this._ranges)t&&!e.start.isBefore(t.start)||(t=e);return t?t.clone():null}getLastRange(){let t=null;for(const e of this._ranges)t&&!e.end.isAfter(t.end)||(t=e);return t?t.clone():null}getFirstPosition(){const t=this.getFirstRange();return t?t.start.clone():null}getLastPosition(){const t=this.getLastRange();return t?t.end.clone():null}isEqual(t){if(this.isFake!=t.isFake)return!1;if(this.isFake&&this.fakeSelectionLabel!=t.fakeSelectionLabel)return!1;if(this.rangeCount!=t.rangeCount)return!1;if(0===this.rangeCount)return!0;if(!this.anchor.isEqual(t.anchor)||!this.focus.isEqual(t.focus))return!1;for(const e of this._ranges){let n=!1;for(const i of t._ranges)if(e.isEqual(i)){n=!0;break}if(!n)return!1}return!0}isSimilar(t){if(this.isBackward!=t.isBackward)return!1;const e=Ji(this.getRanges());if(e!=Ji(t.getRanges()))return!1;if(0==e)return!0;for(let e of this.getRanges()){e=e.getTrimmed();let n=!1;for(let i of t.getRanges())if(i=i.getTrimmed(),e.start.isEqual(i.start)&&e.end.isEqual(i.end)){n=!0;break}if(!n)return!1}return!0}getSelectedElement(){if(1!==this.rangeCount)return null;const t=this.getFirstRange(),e=t.start.nodeAfter,n=t.end.nodeBefore;return e instanceof mi&&e==n?e:null}setTo(t,e,n){if(null===t)this._setRanges([]),this._setFakeOptions(e);else if(t instanceof Ki||t instanceof Zi)this._setRanges(t.getRanges(),t.isBackward),this._setFakeOptions({fake:t.isFake,label:t.fakeSelectionLabel});else if(t instanceof Gi)this._setRanges([t],e&&e.backward),this._setFakeOptions(e);else if(t instanceof $i)this._setRanges([new Gi(t)]),this._setFakeOptions(e);else if(t instanceof ai){const i=!!n&&!!n.backward;let o;if(void 0===e)throw new P.b("view-selection-setTo-required-second-parameter: selection.setTo requires the second parameter when the first parameter is a node.");o="in"==e?Gi._createIn(t):"on"==e?Gi._createOn(t):new Gi($i._createAt(t,e)),this._setRanges([o],i),this._setFakeOptions(n)}else{if(!ui(t))throw new P.b("view-selection-setTo-not-selectable: Cannot set selection to given place.");this._setRanges(t,e&&e.backward),this._setFakeOptions(e)}this.fire("change")}setFocus(t,e){if(null===this.anchor)throw new P.b("view-selection-setFocus-no-ranges: Cannot set selection focus if there are no ranges in selection.");const n=$i._createAt(t,e);if("same"==n.compareWith(this.focus))return;const i=this.anchor;this._ranges.pop(),"before"==n.compareWith(i)?this._addRange(new Gi(n,i),!0):this._addRange(new Gi(i,n)),this.fire("change")}_setRanges(t,e=!1){t=Array.from(t),this._ranges=[];for(const e of t)this._addRange(e);this._lastRangeBackward=!!e}_setFakeOptions(t={}){this._isFake=!!t.fake,this._fakeSelectionLabel=t.fake&&t.label||""}_addRange(t,e=!1){if(!(t instanceof Gi))throw new P.b("view-selection-add-range-not-range: Selection range set to an object that is not an instance of view.Range");this._pushRange(t),this._lastRangeBackward=!!e}_pushRange(t){for(const e of this._ranges)if(t.isIntersecting(e))throw new P.b("view-selection-range-intersects: Trying to add a range that intersects with another range from selection.",{addedRange:t,intersectingRange:e});this._ranges.push(new Gi(t.start,t.end))}}F(Ki,R);class Zi{constructor(t=null,e,n){this._selection=new Ki,this._selection.delegate("change").to(this),this._selection.setTo(t,e,n)}get isFake(){return this._selection.isFake}get fakeSelectionLabel(){return this._selection.fakeSelectionLabel}get anchor(){return this._selection.anchor}get focus(){return this._selection.focus}get isCollapsed(){return this._selection.isCollapsed}get rangeCount(){return this._selection.rangeCount}get isBackward(){return this._selection.isBackward}get editableElement(){return this._selection.editableElement}get _ranges(){return this._selection._ranges}*getRanges(){yield*this._selection.getRanges()}getFirstRange(){return this._selection.getFirstRange()}getLastRange(){return this._selection.getLastRange()}getFirstPosition(){return this._selection.getFirstPosition()}getLastPosition(){return this._selection.getLastPosition()}getSelectedElement(){return this._selection.getSelectedElement()}isEqual(t){return this._selection.isEqual(t)}isSimilar(t){return this._selection.isSimilar(t)}_setTo(t,e,n){this._selection.setTo(t,e,n)}_setFocus(t,e){this._selection.setFocus(t,e)}}F(Zi,R);class Xi{constructor(t={}){this._items=[],this._itemMap=new Map,this._idProperty=t.idProperty||"id",this._bindToExternalToInternalMap=new WeakMap,this._bindToInternalToExternalMap=new WeakMap,this._skippedIndexesFromExternal=[]}get length(){return this._items.length}get first(){return this._items[0]||null}get last(){return this._items[this.length-1]||null}add(t,e){let n;const i=this._idProperty;if(i in t){if("string"!=typeof(n=t[i]))throw new P.b("collection-add-invalid-id");if(this.get(n))throw new P.b("collection-add-item-already-exists")}else t[i]=n=I();if(void 0===e)e=this._items.length;else if(e>this._items.length||e<0)throw new P.b("collection-add-item-invalid-index");return this._items.splice(e,0,t),this._itemMap.set(n,t),this.fire("add",t,e),this}get(t){let e;if("string"==typeof t)e=this._itemMap.get(t);else{if("number"!=typeof t)throw new P.b("collection-get-invalid-arg: Index or id must be given.");e=this._items[t]}return e||null}getIndex(t){let e;return e="string"==typeof t?this._itemMap.get(t):t,this._items.indexOf(e)}remove(t){let e,n,i,o=!1;const r=this._idProperty;if("string"==typeof t?(n=t,o=!(i=this._itemMap.get(n)),i&&(e=this._items.indexOf(i))):"number"==typeof t?(e=t,o=!(i=this._items[e]),i&&(n=i[r])):(n=(i=t)[r],o=-1==(e=this._items.indexOf(i))||!this._itemMap.get(n)),o)throw new P.b("collection-remove-404: Item not found.");this._items.splice(e,1),this._itemMap.delete(n);const s=this._bindToInternalToExternalMap.get(i);return this._bindToInternalToExternalMap.delete(i),this._bindToExternalToInternalMap.delete(s),this.fire("remove",i,e),i}map(t,e){return this._items.map(t,e)}find(t,e){return this._items.find(t,e)}filter(t,e){return this._items.filter(t,e)}clear(){for(this._bindToCollection&&(this.stopListening(this._bindToCollection),this._bindToCollection=null);this.length;)this.remove(0)}bindTo(t){if(this._bindToCollection)throw new P.b("collection-bind-to-rebind: The collection cannot be bound more than once.");return this._bindToCollection=t,{as:t=>{this._setUpBindToBinding(e=>new t(e))},using:t=>{"function"==typeof t?this._setUpBindToBinding(e=>t(e)):this._setUpBindToBinding(e=>e[t])}}}_setUpBindToBinding(t){const e=this._bindToCollection,n=(n,i,o)=>{const r=e._bindToCollection==this,s=e._bindToInternalToExternalMap.get(i);if(r&&s)this._bindToExternalToInternalMap.set(i,s),this._bindToInternalToExternalMap.set(s,i);else{const n=t(i);if(!n)return void this._skippedIndexesFromExternal.push(o);let r=o;for(const t of this._skippedIndexesFromExternal)o>t&&r--;for(const t of e._skippedIndexesFromExternal)r>=t&&r++;this._bindToExternalToInternalMap.set(i,n),this._bindToInternalToExternalMap.set(n,i),this.add(n,r);for(let t=0;t<e._skippedIndexesFromExternal.length;t++)r<=e._skippedIndexesFromExternal[t]&&e._skippedIndexesFromExternal[t]++}};for(const t of e)n(0,t,e.getIndex(t));this.listenTo(e,"add",n),this.listenTo(e,"remove",(t,e,n)=>{const i=this._bindToExternalToInternalMap.get(e);i&&this.remove(i),this._skippedIndexesFromExternal=this._skippedIndexesFromExternal.reduce((t,e)=>(n<e&&t.push(e-1),n>e&&t.push(e),t),[])})}[Symbol.iterator](){return this._items[Symbol.iterator]()}}F(Xi,R);class to{constructor(){this.selection=new Zi,this.roots=new Xi({idProperty:"rootName"}),this.set("isReadOnly",!1),this.set("isFocused",!1),this.set("isComposing",!1),this._postFixers=new Set}getRoot(t="main"){return this.roots.get(t)}registerPostFixer(t){this._postFixers.add(t)}_callPostFixers(t){let e=!1;do{for(const n of this._postFixers)if(e=n(t))break}while(e)}}F(to,Li);const eo=10;class no extends mi{constructor(t,e,n){super(t,e,n),this.getFillerOffset=io,this._priority=eo,this._id=null,this._clonesGroup=null}get priority(){return this._priority}get id(){return this._id}getElementsWithSameId(){if(null===this.id)throw new P.b("attribute-element-get-elements-with-same-id-no-id: Cannot get elements with the same id for an attribute element without id.");return new Set(this._clonesGroup)}is(t,e=null){return e?"attributeElement"==t&&e==this.name||super.is(t,e):"attributeElement"==t||super.is(t)}isSimilar(t){return null!==this.id||null!==t.id?this.id===t.id:super.isSimilar(t)&&this.priority==t.priority}_clone(t){const e=super._clone(t);return e._priority=this._priority,e._id=this._id,e}}function io(){if(oo(this))return null;let t=this.parent;for(;t&&t.is("attributeElement");){if(oo(t)>1)return null;t=t.parent}return!t||oo(t)>1?null:this.childCount}function oo(t){return Array.from(t.getChildren()).filter(t=>!t.is("uiElement")).length}no.DEFAULT_PRIORITY=eo;class ro extends mi{constructor(t,e,n){super(t,e,n),this.getFillerOffset=so}is(t,e=null){return e?"emptyElement"==t&&e==this.name||super.is(t,e):"emptyElement"==t||super.is(t)}_insertChild(t,e){if(e&&(e instanceof ai||Array.from(e).length>0))throw new P.b("view-emptyelement-cannot-add: Cannot add child nodes to EmptyElement instance.")}}function so(){return null}const ao=navigator.userAgent.toLowerCase();var co={isMac:function(t){return t.indexOf("macintosh")>-1}(ao),isEdge:function(t){return!!t.match(/edge\/(\d+.?\d*)/)}(ao),isGecko:function(t){return!!t.match(/gecko\/\d+/)}(ao)};const lo={"⌘":"ctrl","⇧":"shift","⌥":"alt"},uo={ctrl:"⌘",shift:"⇧",alt:"⌥"},ho=function(){const t={arrowleft:37,arrowup:38,arrowright:39,arrowdown:40,backspace:8,delete:46,enter:13,space:32,esc:27,tab:9,ctrl:1114112,cmd:1114112,shift:2228224,alt:4456448};for(let e=65;e<=90;e++){const n=String.fromCharCode(e);t[n.toLowerCase()]=e}for(let e=48;e<=57;e++)t[e-48]=e;for(let e=112;e<=123;e++)t["f"+(e-111)]=e;return t}();function fo(t){let e;if("string"==typeof t){if(!(e=ho[t.toLowerCase()]))throw new P.b("keyboard-unknown-key: Unknown key name.",{key:t})}else e=t.keyCode+(t.altKey?ho.alt:0)+(t.ctrlKey?ho.ctrl:0)+(t.shiftKey?ho.shift:0);return e}function mo(t){return"string"==typeof t&&(t=po(t)),t.map(t=>"string"==typeof t?fo(t):t).reduce((t,e)=>e+t,0)}function po(t){return t.split(/\s*\+\s*/)}class go extends mi{constructor(t,e,n){super(t,e,n),this.getFillerOffset=wo}is(t,e=null){return e?"uiElement"==t&&e==this.name||super.is(t,e):"uiElement"==t||super.is(t)}_insertChild(t,e){if(e&&(e instanceof ai||Array.from(e).length>0))throw new P.b("view-uielement-cannot-add: Cannot add child nodes to UIElement instance.")}render(t){return this.toDomElement(t)}toDomElement(t){const e=t.createElement(this.name);for(const t of this.getAttributeKeys())e.setAttribute(t,this.getAttribute(t));return e}}function bo(t){t.document.on("keydown",(e,n)=>(function(t,e,n){if(e.keyCode==ho.arrowright){const t=e.domTarget.ownerDocument.defaultView.getSelection(),i=1==t.rangeCount&&t.getRangeAt(0).collapsed;if(i||e.shiftKey){const e=t.focusNode,o=t.focusOffset,r=n.domPositionToView(e,o);if(null===r)return;let s=!1;const a=r.getLastMatchingPosition(t=>(t.item.is("uiElement")&&(s=!0),!(!t.item.is("uiElement")&&!t.item.is("attributeElement"))));if(s){const e=n.viewPositionToDom(a);i?t.collapse(e.parent,e.offset):t.extend(e.parent,e.offset)}}}})(0,n,t.domConverter))}function wo(){return null}class _o{constructor(t){this._children=[],t&&this._insertChild(0,t)}[Symbol.iterator](){return this._children[Symbol.iterator]()}get childCount(){return this._children.length}get isEmpty(){return 0===this.childCount}get root(){return this}get parent(){return null}is(t){return"documentFragment"==t}_appendChild(t){return this._insertChild(this.childCount,t)}getChild(t){return this._children[t]}getChildIndex(t){return this._children.indexOf(t)}getChildren(){return this._children[Symbol.iterator]()}_insertChild(t,e){this._fireChange("children",this);let n=0;const i=function(t){if("string"==typeof t)return[new ci(t)];ui(t)||(t=[t]);return Array.from(t).map(t=>"string"==typeof t?new ci(t):t instanceof li?new ci(t.data):t)}(e);for(const e of i)null!==e.parent&&e._remove(),e.parent=this,this._children.splice(t,0,e),t++,n++;return n}_removeChildren(t,e=1){this._fireChange("children",this);for(let n=t;n<t+e;n++)this._children[n].parent=null;return this._children.splice(t,e)}_fireChange(t,e){this.fire("change:"+t,e)}}F(_o,R);class ko{constructor(t){this.document=t,this._cloneGroups=new Map}setSelection(t,e,n){this.document.selection._setTo(t,e,n)}setSelectionFocus(t,e){this.document.selection._setFocus(t,e)}createText(t){return new ci(t)}createAttributeElement(t,e,n={}){const i=new no(t,e);return n.priority&&(i._priority=n.priority),n.id&&(i._id=n.id),i}createContainerElement(t,e){return new bi(t,e)}createEditableElement(t,e){const n=new Hi(t,e);return n._document=this.document,n}createEmptyElement(t,e){return new ro(t,e)}createUIElement(t,e,n){const i=new go(t,e);return n&&(i.render=n),i}setAttribute(t,e,n){n._setAttribute(t,e)}removeAttribute(t,e){e._removeAttribute(t)}addClass(t,e){e._addClass(t)}removeClass(t,e){e._removeClass(t)}setStyle(t,e,n){C(t)&&void 0===n&&(n=e),n._setStyle(t,e)}removeStyle(t,e){e._removeStyle(t)}setCustomProperty(t,e,n){n._setCustomProperty(t,e)}removeCustomProperty(t,e){return e._removeCustomProperty(t)}breakAttributes(t){return t instanceof $i?this._breakAttributes(t):this._breakAttributesRange(t)}breakContainer(t){const e=t.parent;if(!e.is("containerElement"))throw new P.b("view-writer-break-non-container-element: Trying to break an element which is not a container element.");if(!e.parent)throw new P.b("view-writer-break-root: Trying to break root element.");if(t.isAtStart)return $i._createBefore(e);if(!t.isAtEnd){const n=e._clone(!1);this.insert($i._createAfter(e),n);const i=new Gi(t,$i._createAt(e,"end")),o=new $i(n,0);this.move(i,o)}return $i._createAfter(e)}mergeAttributes(t){const e=t.offset,n=t.parent;if(n.is("text"))return t;if(n.is("attributeElement")&&0===n.childCount){const t=n.parent,e=n.index;return n._remove(),this._removeFromClonedElementsGroup(n),this.mergeAttributes(new $i(t,e))}const i=n.getChild(e-1),o=n.getChild(e);if(!i||!o)return t;if(i.is("text")&&o.is("text"))return Co(i,o);if(i.is("attributeElement")&&o.is("attributeElement")&&i.isSimilar(o)){const t=i.childCount;return i._appendChild(o.getChildren()),o._remove(),this._removeFromClonedElementsGroup(o),this.mergeAttributes(new $i(i,t))}return t}mergeContainers(t){const e=t.nodeBefore,n=t.nodeAfter;if(!(e&&n&&e.is("containerElement")&&n.is("containerElement")))throw new P.b("view-writer-merge-containers-invalid-position: Element before and after given position cannot be merged.");const i=e.getChild(e.childCount-1),o=i instanceof ci?$i._createAt(i,"end"):$i._createAt(e,"end");return this.move(Gi._createIn(n),$i._createAt(e,"end")),this.remove(Gi._createOn(n)),o}insert(t,e){(function t(e){for(const n of e){if(!To.some(t=>n instanceof t))throw new P.b("view-writer-insert-invalid-node");n.is("text")||t(n.getChildren())}})(e=ui(e)?[...e]:[e]);const n=vo(t);if(!n)throw new P.b("view-writer-invalid-position-container");const i=this._breakAttributes(t,!0),o=n._insertChild(i.offset,e);for(const t of e)this._addToClonedElementsGroup(t);const r=i.getShiftedBy(o),s=this.mergeAttributes(i);if(0===o)return new Gi(s,s);{s.isEqual(i)||r.offset--;const t=this.mergeAttributes(r);return new Gi(s,t)}}remove(t){const e=t instanceof Gi?t:Gi._createOn(t);if(Mo(e),e.isCollapsed)return new _o;const{start:n,end:i}=this._breakAttributesRange(e,!0),o=n.parent,r=i.offset-n.offset,s=o._removeChildren(n.offset,r);for(const t of s)this._removeFromClonedElementsGroup(t);const a=this.mergeAttributes(n);return e.start=a,e.end=a.clone(),new _o(s)}clear(t,e){Mo(t);const n=t.getWalker({direction:"backward",ignoreElementEnd:!0});for(const i of n){const n=i.item;let o;if(n.is("element")&&e.isSimilar(n))o=Gi._createOn(n);else if(!i.nextPosition.isAfter(t.start)&&n.is("textProxy")){const t=n.getAncestors().find(t=>t.is("element")&&e.isSimilar(t));t&&(o=Gi._createIn(t))}o&&(o.end.isAfter(t.end)&&(o.end=t.end),o.start.isBefore(t.start)&&(o.start=t.start),this.remove(o))}}move(t,e){let n;if(e.isAfter(t.end)){const i=(e=this._breakAttributes(e,!0)).parent,o=i.childCount;t=this._breakAttributesRange(t,!0),n=this.remove(t),e.offset+=i.childCount-o}else n=this.remove(t);return this.insert(e,n)}wrap(t,e){if(!(e instanceof no))throw new P.b("view-writer-wrap-invalid-attribute");if(Mo(t),t.isCollapsed){let n=t.start;n.parent.is("element")&&!function(t){return Array.from(t.getChildren()).some(t=>!t.is("uiElement"))}(n.parent)&&(n=n.getLastMatchingPosition(t=>t.item.is("uiElement"))),n=this._wrapPosition(n,e);const i=this.document.selection;return i.isCollapsed&&i.getFirstPosition().isEqual(t.start)&&this.setSelection(n),new Gi(n)}return this._wrapRange(t,e)}unwrap(t,e){if(!(e instanceof no))throw new P.b("view-writer-unwrap-invalid-attribute");if(Mo(t),t.isCollapsed)return t;const{start:n,end:i}=this._breakAttributesRange(t,!0);if(i.isEqual(n.getShiftedBy(1))){const t=n.nodeAfter;if(!e.isSimilar(t)&&t instanceof no&&this._unwrapAttributeElement(e,t)){const t=this.mergeAttributes(n);t.isEqual(n)||i.offset--;const e=this.mergeAttributes(i);return new Gi(t,e)}}const o=n.parent,r=this._unwrapChildren(o,n.offset,i.offset,e),s=this.mergeAttributes(r.start);s.isEqual(r.start)||r.end.offset--;const a=this.mergeAttributes(r.end);return new Gi(s,a)}rename(t,e){const n=new bi(t,e.getAttributes());return this.insert($i._createAfter(e),n),this.move(Gi._createIn(e),$i._createAt(n,0)),this.remove(Gi._createOn(e)),n}clearClonedElementsGroup(t){this._cloneGroups.delete(t)}createPositionAt(t,e){return $i._createAt(t,e)}createPositionAfter(t){return $i._createAfter(t)}createPositionBefore(t){return $i._createBefore(t)}createRange(t,e){return new Gi(t,e)}createRangeOn(t){return Gi._createOn(t)}createRangeIn(t){return Gi._createIn(t)}createSelection(t,e,n){return new Ki(t,e,n)}_wrapChildren(t,e,n,i){let o=e;const r=[];for(;o<n;){const e=t.getChild(o),n=e.is("text"),s=e.is("attributeElement"),a=e.is("emptyElement"),c=e.is("uiElement");if(n||a||c||s&&yo(i,e)){const n=i._clone();e._remove(),n._appendChild(e),t._insertChild(o,n),this._addToClonedElementsGroup(n),r.push(new $i(t,o))}else s&&this._wrapChildren(e,0,e.childCount,i);o++}let s=0;for(const t of r){if(t.offset-=s,t.offset==e)continue;this.mergeAttributes(t).isEqual(t)||(s++,n--)}return Gi._createFromParentsAndOffsets(t,e,t,n)}_unwrapChildren(t,e,n,i){let o=e;const r=[];for(;o<n;){const e=t.getChild(o);if(e.isSimilar(i)){const i=e.getChildren(),s=e.childCount;e._remove(),t._insertChild(o,i),this._removeFromClonedElementsGroup(e),r.push(new $i(t,o),new $i(t,o+s)),o+=s,n+=s-1}else e.is("attributeElement")&&this._unwrapChildren(e,0,e.childCount,i),o++}let s=0;for(const t of r){if(t.offset-=s,t.offset==e||t.offset==n)continue;this.mergeAttributes(t).isEqual(t)||(s++,n--)}return Gi._createFromParentsAndOffsets(t,e,t,n)}_wrapRange(t,e){if(function(t){return t.start.parent==t.end.parent&&t.start.parent.is("attributeElement")&&0===t.start.offset&&t.end.offset===t.start.parent.childCount}(t)&&this._wrapAttributeElement(e,t.start.parent)){const e=t.start.parent,n=this.mergeAttributes($i._createAfter(e)),i=this.mergeAttributes($i._createBefore(e));return new Gi(i,n)}const{start:n,end:i}=this._breakAttributesRange(t,!0);if(i.isEqual(n.getShiftedBy(1))){const t=n.nodeAfter;if(t instanceof no&&this._wrapAttributeElement(e,t)){const t=this.mergeAttributes(n);t.isEqual(n)||i.offset--;const e=this.mergeAttributes(i);return new Gi(t,e)}}const o=n.parent,r=this._unwrapChildren(o,n.offset,i.offset,e),s=this._wrapChildren(o,r.start.offset,r.end.offset,e),a=this.mergeAttributes(s.start);a.isEqual(s.start)||s.end.offset--;const c=this.mergeAttributes(s.end);return new Gi(a,c)}_wrapPosition(t,e){if(e.isSimilar(t.parent))return xo(t.clone());t.parent.is("text")&&(t=Ao(t));const n=this.createAttributeElement();n._priority=Number.POSITIVE_INFINITY,n.isSimilar=(()=>!1),t.parent._insertChild(t.offset,n);const i=new Gi(t,t.getShiftedBy(1));this.wrap(i,e);const o=new $i(n.parent,n.index);n._remove();const r=o.nodeBefore,s=o.nodeAfter;return r instanceof ci&&s instanceof ci?Co(r,s):xo(o)}_wrapAttributeElement(t,e){if(!So(t,e))return!1;if(t.name!==e.name||t.priority!==e.priority)return!1;for(const n of t.getAttributeKeys())if("class"!==n&&"style"!==n&&e.hasAttribute(n)&&e.getAttribute(n)!==t.getAttribute(n))return!1;for(const n of t.getStyleNames())if(e.hasStyle(n)&&e.getStyle(n)!==t.getStyle(n))return!1;for(const n of t.getAttributeKeys())"class"!==n&&"style"!==n&&(e.hasAttribute(n)||this.setAttribute(n,t.getAttribute(n),e));for(const n of t.getStyleNames())e.hasStyle(n)||this.setStyle(n,t.getStyle(n),e);for(const n of t.getClassNames())e.hasClass(n)||this.addClass(n,e);return!0}_unwrapAttributeElement(t,e){if(!So(t,e))return!1;if(t.name!==e.name||t.priority!==e.priority)return!1;for(const n of t.getAttributeKeys())if("class"!==n&&"style"!==n&&(!e.hasAttribute(n)||e.getAttribute(n)!==t.getAttribute(n)))return!1;if(!e.hasClass(...t.getClassNames()))return!1;for(const n of t.getStyleNames())if(!e.hasStyle(n)||e.getStyle(n)!==t.getStyle(n))return!1;for(const n of t.getAttributeKeys())"class"!==n&&"style"!==n&&this.removeAttribute(n,e);return this.removeClass(Array.from(t.getClassNames()),e),this.removeStyle(Array.from(t.getStyleNames()),e),!0}_breakAttributesRange(t,e=!1){const n=t.start,i=t.end;if(Mo(t),t.isCollapsed){const n=this._breakAttributes(t.start,e);return new Gi(n,n)}const o=this._breakAttributes(i,e),r=o.parent.childCount,s=this._breakAttributes(n,e);return o.offset+=o.parent.childCount-r,new Gi(s,o)}_breakAttributes(t,e=!1){const n=t.offset,i=t.parent;if(t.parent.is("emptyElement"))throw new P.b("view-writer-cannot-break-empty-element");if(t.parent.is("uiElement"))throw new P.b("view-writer-cannot-break-ui-element");if(!e&&i.is("text")&&Po(i.parent))return t.clone();if(Po(i))return t.clone();if(i.is("text"))return this._breakAttributes(Ao(t),e);if(n==i.childCount){const t=new $i(i.parent,i.index+1);return this._breakAttributes(t,e)}if(0===n){const t=new $i(i.parent,i.index);return this._breakAttributes(t,e)}{const t=i.index+1,o=i._clone();i.parent._insertChild(t,o),this._addToClonedElementsGroup(o);const r=i.childCount-n,s=i._removeChildren(n,r);o._appendChild(s);const a=new $i(i.parent,t);return this._breakAttributes(a,e)}}_addToClonedElementsGroup(t){if(!t.root.is("rootElement"))return;if(t.is("element"))for(const e of t.getChildren())this._addToClonedElementsGroup(e);const e=t.id;if(!e)return;let n=this._cloneGroups.get(e);n||(n=new Set,this._cloneGroups.set(e,n)),n.add(t),t._clonesGroup=n}_removeFromClonedElementsGroup(t){if(t.is("element"))for(const e of t.getChildren())this._removeFromClonedElementsGroup(e);const e=t.id;if(!e)return;const n=this._cloneGroups.get(e);n&&n.delete(t)}}function vo(t){let e=t.parent;for(;!Po(e);){if(!e)return;e=e.parent}return e}function yo(t,e){return t.priority<e.priority||!(t.priority>e.priority)&&t.getIdentity()<e.getIdentity()}function xo(t){const e=t.nodeBefore;if(e&&e.is("text"))return new $i(e,e.data.length);const n=t.nodeAfter;return n&&n.is("text")?new $i(n,0):t}function Ao(t){if(t.offset==t.parent.data.length)return new $i(t.parent.parent,t.parent.index+1);if(0===t.offset)return new $i(t.parent.parent,t.parent.index);const e=t.parent.data.slice(t.offset);return t.parent._data=t.parent.data.slice(0,t.offset),t.parent.parent._insertChild(t.parent.index+1,new ci(e)),new $i(t.parent.parent,t.parent.index+1)}function Co(t,e){const n=t.data.length;return t._data+=e.data,e._remove(),new $i(t,n)}const To=[ci,no,bi,ro,go];function Po(t){return t&&(t.is("containerElement")||t.is("documentFragment"))}function Mo(t){const e=vo(t.start),n=vo(t.end);if(!e||!n||e!==n)throw new P.b("view-writer-invalid-range-container")}function So(t,e){return null===t.id&&null===e.id}function Io(t){return"[object Text]"==Object.prototype.toString.call(t)}const Eo=t=>{const e=t.createElement("br");return e.dataset.ckeFiller=!0,e},No=t=>t.createTextNode(" "),Oo=7;let Ro="";for(let t=0;t<Oo;t++)Ro+="​";function Do(t){return Io(t)&&t.data.substr(0,Oo)===Ro}function Lo(t){return t.data.length==Oo&&Do(t)}function jo(t){return Do(t)?t.data.slice(Oo):t.data}const Vo=new WeakMap;function zo(t,e){let n=Vo.get(e);return n||(n=e(window.document),Vo.set(e,n)),t.isEqualNode(n)}function Bo(t,e){if(e.keyCode==ho.arrowleft){const t=e.domTarget.ownerDocument.defaultView.getSelection();if(1==t.rangeCount&&t.getRangeAt(0).collapsed){const e=t.getRangeAt(0).startContainer,n=t.getRangeAt(0).startOffset;Do(e)&&n<=Oo&&t.collapse(e,0)}}}function Fo(t,e,n){let i,o;if(n=n||function(t,e){return t===e},e.length<t.length){const n=t;t=e,e=n,i="delete",o="insert"}else i="insert",o="delete";const r=t.length,s=e.length,a=s-r,c={},l={};function d(a){const d=(void 0!==l[a-1]?l[a-1]:-1)+1,u=void 0!==l[a+1]?l[a+1]:-1,h=d>u?-1:1;c[a+h]&&(c[a]=c[a+h].slice(0)),c[a]||(c[a]=[]),c[a].push(d>u?i:o);let f=Math.max(d,u),m=f-a;for(;m<r&&f<s&&n(t[m],e[f]);)m++,f++,c[a].push("equal");return f}let u,h=0;do{for(u=-h;u<a;u++)l[u]=d(u);for(u=a+h;u>a;u--)l[u]=d(u);l[a]=d(a),h++}while(l[a]!==s);return c[a].slice(1)}function Uo(t,e,n){t.insertBefore(n,t.childNodes[e]||null)}function Ho(t){const e=t.parentNode;e&&e.removeChild(t)}function qo(t){if(t){if(t.defaultView)return t instanceof t.defaultView.Document;if(t.ownerDocument&&t.ownerDocument.defaultView)return t instanceof t.ownerDocument.defaultView.Node}return!1}function Wo(t,e){if(t===e)return[];return function(t,e){const n=[],{firstIndex:i,lastIndexOld:o,lastIndexNew:r}=e;r-i>0&&n.push({index:i,type:"insert",values:t.substring(i,r).split("")});o-i>0&&n.push({index:i+(r-i),type:"delete",howMany:o-i});return n}(e,function(t,e){const n=Yo(t,e),i=$o(t,n),o=$o(e,n),r=Yo(i,o),s=t.length-r,a=e.length-r;return{firstIndex:n,lastIndexOld:s,lastIndexNew:a}}(t,e))}function Yo(t,e){for(let n=0;n<Math.max(t.length,e.length);n++)if(t[n]!==e[n])return n}function $o(t,e){return t.substring(e).split("").reverse().join("")}class Go{constructor(t,e){this.domDocuments=new Set,this.domConverter=t,this.markedAttributes=new Set,this.markedChildren=new Set,this.markedTexts=new Set,this.selection=e,this.isFocused=!1,this._inlineFiller=null,this._fakeSelectionContainer=null}markToSync(t,e){if("text"===t)this.domConverter.mapViewToDom(e.parent)&&this.markedTexts.add(e);else{if(!this.domConverter.mapViewToDom(e))return;if("attributes"===t)this.markedAttributes.add(e);else{if("children"!==t)throw new P.b("view-renderer-unknown-type: Unknown type passed to Renderer.markToSync.");this.markedChildren.add(e)}}}render(){let t;for(const t of this.markedChildren)this._updateChildrenMappings(t);this._inlineFiller&&!this._isSelectionInInlineFiller()&&this._removeInlineFiller(),this._inlineFiller?t=this._getInlineFillerPosition():this._needsInlineFillerAtSelection()&&(t=this.selection.getFirstPosition(),this.markedChildren.add(t.parent));for(const t of this.markedAttributes)this._updateAttrs(t);for(const e of this.markedChildren)this._updateChildren(e,{inlineFillerPosition:t});for(const e of this.markedTexts)!this.markedChildren.has(e.parent)&&this.domConverter.mapViewToDom(e.parent)&&this._updateText(e,{inlineFillerPosition:t});if(t){const e=this.domConverter.viewPositionToDom(t),n=e.parent.ownerDocument;Do(e.parent)?this._inlineFiller=e.parent:this._inlineFiller=Qo(n,e.parent,e.offset)}else this._inlineFiller=null;this._updateSelection(),this._updateFocus(),this.markedTexts.clear(),this.markedAttributes.clear(),this.markedChildren.clear()}_updateChildrenMappings(t){const e=this.domConverter.mapViewToDom(t);if(!e)return;const n=this.domConverter.mapViewToDom(t).childNodes,i=Array.from(this.domConverter.viewChildrenToDom(t,e.ownerDocument,{withChildren:!1})),o=this._diffNodeLists(n,i),r=this._findReplaceActions(o,n,i);if(-1!==r.indexOf("replace")){const e={equal:0,insert:0,delete:0};for(const o of r)if("replace"===o){const o=e.equal+e.insert,r=e.equal+e.delete,s=t.getChild(o);s&&!s.is("uiElement")&&this._updateElementMappings(s,n[r]),Ho(i[o]),e.equal++}else e[o]++}}_updateElementMappings(t,e){this.domConverter.unbindDomElement(e),this.domConverter.bindElements(e,t),this.markedChildren.add(t),this.markedAttributes.add(t)}_getInlineFillerPosition(){const t=this.selection.getFirstPosition();return t.parent.is("text")?$i._createBefore(this.selection.getFirstPosition().parent):t}_isSelectionInInlineFiller(){if(1!=this.selection.rangeCount||!this.selection.isCollapsed)return!1;const t=this.selection.getFirstPosition(),e=this.domConverter.viewPositionToDom(t);return!!(e&&Io(e.parent)&&Do(e.parent))}_removeInlineFiller(){const t=this._inlineFiller;if(!Do(t))throw new P.b("view-renderer-filler-was-lost: The inline filler node was lost.");Lo(t)?t.parentNode.removeChild(t):t.data=t.data.substr(Oo),this._inlineFiller=null}_needsInlineFillerAtSelection(){if(1!=this.selection.rangeCount||!this.selection.isCollapsed)return!1;const t=this.selection.getFirstPosition(),e=t.parent,n=t.offset;if(!this.domConverter.mapViewToDom(e.root))return!1;if(!e.is("element"))return!1;if(!function(t){if("false"==t.getAttribute("contenteditable"))return!1;const e=t.findAncestor(t=>t.hasAttribute("contenteditable"));return!e||"true"==e.getAttribute("contenteditable")}(e))return!1;if(n===e.getFillerOffset())return!1;const i=t.nodeBefore,o=t.nodeAfter;return!(i instanceof ci||o instanceof ci)}_updateText(t,e){const n=this.domConverter.findCorrespondingDomText(t),i=this.domConverter.viewToDom(t,n.ownerDocument),o=n.data;let r=i.data;const s=e.inlineFillerPosition;if(s&&s.parent==t.parent&&s.offset==t.index&&(r=Ro+r),o!=r){const t=Wo(o,r);for(const e of t)"insert"===e.type?n.insertData(e.index,e.values.join("")):n.deleteData(e.index,e.howMany)}}_updateAttrs(t){const e=this.domConverter.mapViewToDom(t);if(!e)return;const n=Array.from(e.attributes).map(t=>t.name),i=t.getAttributeKeys();for(const n of i)e.setAttribute(n,t.getAttribute(n));for(const i of n)t.hasAttribute(i)||e.removeAttribute(i)}_updateChildren(t,e){const n=this.domConverter.mapViewToDom(t);if(!n)return;const i=e.inlineFillerPosition,o=this.domConverter.mapViewToDom(t).childNodes,r=Array.from(this.domConverter.viewChildrenToDom(t,n.ownerDocument,{bind:!0,inlineFillerPosition:i}));i&&i.parent===t&&Qo(n.ownerDocument,r,i.offset);const s=this._diffNodeLists(o,r);let a=0;const c=new Set;for(const t of s)"insert"===t?(Uo(n,a,r[a]),a++):"delete"===t?(c.add(o[a]),Ho(o[a])):(this._markDescendantTextToSync(this.domConverter.domToView(r[a])),a++);for(const t of c)t.parentNode||this.domConverter.unbindDomElement(t)}_diffNodeLists(t,e){return Fo(t,e,function(t,e,n){if(e===n)return!0;if(Io(e)&&Io(n))return e.data===n.data;if(zo(e,t)&&zo(n,t))return!0;return!1}.bind(null,this.domConverter.blockFiller))}_findReplaceActions(t,e,n){if(-1===t.indexOf("insert")||-1===t.indexOf("delete"))return t;let i=[],o=[],r=[];const s={equal:0,insert:0,delete:0};for(const a of t)"insert"===a?r.push(n[s.equal+s.insert]):"delete"===a?o.push(e[s.equal+s.delete]):((i=i.concat(Fo(o,r,Jo).map(t=>"equal"===t?"replace":t))).push("equal"),o=[],r=[]),s[a]++;return i.concat(Fo(o,r,Jo).map(t=>"equal"===t?"replace":t))}_markDescendantTextToSync(t){if(t)if(t.is("text"))this.markedTexts.add(t);else if(t.is("element"))for(const e of t.getChildren())this._markDescendantTextToSync(e)}_updateSelection(){if(0===this.selection.rangeCount)return this._removeDomSelection(),void this._removeFakeSelection();const t=this.domConverter.mapViewToDom(this.selection.editableElement);this.isFocused&&t&&(this.selection.isFake?this._updateFakeSelection(t):(this._removeFakeSelection(),this._updateDomSelection(t)))}_updateFakeSelection(t){const e=t.ownerDocument;let n=this._fakeSelectionContainer;n||(this._fakeSelectionContainer=n=e.createElement("div"),Object.assign(n.style,{position:"fixed",top:0,left:"-9999px",width:"42px"}),n.appendChild(e.createTextNode(" "))),n.parentElement||t.appendChild(n),n.firstChild.data=this.selection.fakeSelectionLabel||" ";const i=e.getSelection(),o=e.createRange();i.removeAllRanges(),o.selectNodeContents(n),i.addRange(o),this.domConverter.bindFakeSelection(n,this.selection)}_updateDomSelection(t){const e=t.ownerDocument.defaultView.getSelection();if(!this._domSelectionNeedsUpdate(e))return;const n=this.domConverter.viewPositionToDom(this.selection.anchor),i=this.domConverter.viewPositionToDom(this.selection.focus);t.focus(),e.collapse(n.parent,n.offset),e.extend(i.parent,i.offset),co.isGecko&&function(t,e){const n=t.parent;if(n.nodeType!=Node.ELEMENT_NODE||t.offset!=n.childNodes.length-1)return;const i=n.childNodes[t.offset];i&&"BR"==i.tagName&&e.addRange(e.getRangeAt(0))}(i,e)}_domSelectionNeedsUpdate(t){if(!this.domConverter.isDomSelectionCorrect(t))return!0;const e=t&&this.domConverter.domSelectionToView(t);return(!e||!this.selection.isEqual(e))&&!(!this.selection.isCollapsed&&this.selection.isSimilar(e))}_removeDomSelection(){for(const t of this.domDocuments){if(t.getSelection().rangeCount){const e=t.activeElement,n=this.domConverter.mapDomToView(e);e&&n&&t.getSelection().removeAllRanges()}}}_removeFakeSelection(){const t=this._fakeSelectionContainer;t&&t.remove()}_updateFocus(){if(this.isFocused){const t=this.selection.editableElement;t&&this.domConverter.focus(t)}}}function Qo(t,e,n){const i=e instanceof Array?e:e.childNodes,o=i[n];if(Io(o))return o.data=Ro+o.data,o;{const o=t.createTextNode(Ro);return Array.isArray(e)?i.splice(n,0,o):Uo(e,n,o),o}}function Jo(t,e){return qo(t)&&qo(e)&&!Io(t)&&!Io(e)&&t.tagName.toLowerCase()===e.tagName.toLowerCase()}F(Go,Li);var Ko={window:window,document:document};function Zo(t){let e=0;for(;t.previousSibling;)t=t.previousSibling,e++;return e}function Xo(t){const e=[];for(;t&&t.nodeType!=Node.DOCUMENT_NODE;)e.unshift(t),t=t.parentNode;return e}var tr=function(t){return w(t)&&1===t.nodeType&&!C(t)};class er{constructor(t={}){this.blockFiller=t.blockFiller||Eo,this.preElements=["pre"],this.blockElements=["p","div","h1","h2","h3","h4","h5","h6"],this._domToViewMapping=new WeakMap,this._viewToDomMapping=new WeakMap,this._fakeSelectionMapping=new WeakMap}bindFakeSelection(t,e){this._fakeSelectionMapping.set(t,new Ki(e))}fakeSelectionToView(t){return this._fakeSelectionMapping.get(t)}bindElements(t,e){this._domToViewMapping.set(t,e),this._viewToDomMapping.set(e,t)}unbindDomElement(t){const e=this._domToViewMapping.get(t);if(e){this._domToViewMapping.delete(t),this._viewToDomMapping.delete(e);for(const e of Array.from(t.childNodes))this.unbindDomElement(e)}}bindDocumentFragments(t,e){this._domToViewMapping.set(t,e),this._viewToDomMapping.set(e,t)}viewToDom(t,e,n={}){if(t.is("text")){const n=this._processDataFromViewText(t);return e.createTextNode(n)}{if(this.mapViewToDom(t))return this.mapViewToDom(t);let i;if(t.is("documentFragment"))i=e.createDocumentFragment(),n.bind&&this.bindDocumentFragments(i,t);else{if(t.is("uiElement"))return i=t.render(e),n.bind&&this.bindElements(i,t),i;i=e.createElement(t.name),n.bind&&this.bindElements(i,t);for(const e of t.getAttributeKeys())i.setAttribute(e,t.getAttribute(e))}if(n.withChildren||void 0===n.withChildren)for(const o of this.viewChildrenToDom(t,e,n))i.appendChild(o);return i}}*viewChildrenToDom(t,e,n={}){const i=t.getFillerOffset&&t.getFillerOffset();let o=0;for(const r of t.getChildren())i===o&&(yield this.blockFiller(e)),yield this.viewToDom(r,e,n),o++;i===o&&(yield this.blockFiller(e))}viewRangeToDom(t){const e=this.viewPositionToDom(t.start),n=this.viewPositionToDom(t.end),i=document.createRange();return i.setStart(e.parent,e.offset),i.setEnd(n.parent,n.offset),i}viewPositionToDom(t){const e=t.parent;if(e.is("text")){const n=this.findCorrespondingDomText(e);if(!n)return null;let i=t.offset;return Do(n)&&(i+=Oo),{parent:n,offset:i}}{let n,i,o;if(0===t.offset){if(!(n=this.mapViewToDom(e)))return null;o=n.childNodes[0]}else{const e=t.nodeBefore;if(!(i=e.is("text")?this.findCorrespondingDomText(e):this.mapViewToDom(t.nodeBefore)))return null;n=i.parentNode,o=i.nextSibling}if(Io(o)&&Do(o))return{parent:o,offset:Oo};return{parent:n,offset:i?Zo(i)+1:0}}}domToView(t,e={}){if(zo(t,this.blockFiller))return null;const n=this.getParentUIElement(t,this._domToViewMapping);if(n)return n;if(Io(t)){if(Lo(t))return null;{const e=this._processDataFromDomText(t);return""===e?null:new ci(e)}}if(this.isComment(t))return null;{if(this.mapDomToView(t))return this.mapDomToView(t);let n;if(this.isDocumentFragment(t))n=new _o,e.bind&&this.bindDocumentFragments(t,n);else{const i=e.keepOriginalCase?t.tagName:t.tagName.toLowerCase();n=new mi(i),e.bind&&this.bindElements(t,n);const o=t.attributes;for(let t=o.length-1;t>=0;t--)n._setAttribute(o[t].name,o[t].value)}if(e.withChildren||void 0===e.withChildren)for(const i of this.domChildrenToView(t,e))n._appendChild(i);return n}}*domChildrenToView(t,e={}){for(let n=0;n<t.childNodes.length;n++){const i=t.childNodes[n],o=this.domToView(i,e);null!==o&&(yield o)}}domSelectionToView(t){if(1===t.rangeCount){let e=t.getRangeAt(0).startContainer;Io(e)&&(e=e.parentNode);const n=this.fakeSelectionToView(e);if(n)return n}const e=this.isDomSelectionBackward(t),n=[];for(let e=0;e<t.rangeCount;e++){const i=t.getRangeAt(e),o=this.domRangeToView(i);o&&n.push(o)}return new Ki(n,{backward:e})}domRangeToView(t){const e=this.domPositionToView(t.startContainer,t.startOffset),n=this.domPositionToView(t.endContainer,t.endOffset);return e&&n?new Gi(e,n):null}domPositionToView(t,e){if(zo(t,this.blockFiller))return this.domPositionToView(t.parentNode,Zo(t));const n=this.mapDomToView(t);if(n&&n.is("uiElement"))return $i._createBefore(n);if(Io(t)){if(Lo(t))return this.domPositionToView(t.parentNode,Zo(t));const n=this.findCorrespondingViewText(t);let i=e;return n?(Do(t)&&(i=(i-=Oo)<0?0:i),new $i(n,i)):null}if(0===e){const e=this.mapDomToView(t);if(e)return new $i(e,0)}else{const n=t.childNodes[e-1],i=Io(n)?this.findCorrespondingViewText(n):this.mapDomToView(n);if(i&&i.parent)return new $i(i.parent,i.index+1)}return null}mapDomToView(t){return this.getParentUIElement(t)||this._domToViewMapping.get(t)}findCorrespondingViewText(t){if(Lo(t))return null;const e=this.getParentUIElement(t);if(e)return e;const n=t.previousSibling;if(n){if(!this.isElement(n))return null;const t=this.mapDomToView(n);if(t){return t.nextSibling instanceof ci?t.nextSibling:null}}else{const e=this.mapDomToView(t.parentNode);if(e){const t=e.getChild(0);return t instanceof ci?t:null}}return null}mapViewToDom(t){return this._viewToDomMapping.get(t)}findCorrespondingDomText(t){const e=t.previousSibling;return e&&this.mapViewToDom(e)?this.mapViewToDom(e).nextSibling:!e&&t.parent&&this.mapViewToDom(t.parent)?this.mapViewToDom(t.parent).childNodes[0]:null}focus(t){const e=this.mapViewToDom(t);if(e&&e.ownerDocument.activeElement!==e){const{scrollX:t,scrollY:n}=Ko.window,i=[];ir(e,t=>{const{scrollLeft:e,scrollTop:n}=t;i.push([e,n])}),e.focus(),ir(e,t=>{const[e,n]=i.shift();t.scrollLeft=e,t.scrollTop=n}),Ko.window.scrollTo(t,n)}}isElement(t){return t&&t.nodeType==Node.ELEMENT_NODE}isDocumentFragment(t){return t&&t.nodeType==Node.DOCUMENT_FRAGMENT_NODE}isComment(t){return t&&t.nodeType==Node.COMMENT_NODE}isDomSelectionBackward(t){if(t.isCollapsed)return!1;const e=document.createRange();e.setStart(t.anchorNode,t.anchorOffset),e.setEnd(t.focusNode,t.focusOffset);const n=e.collapsed;return e.detach(),n}getParentUIElement(t){const e=Xo(t);for(e.pop();e.length;){const t=e.pop(),n=this._domToViewMapping.get(t);if(n&&n.is("uiElement"))return n}return null}isDomSelectionCorrect(t){return this._isDomSelectionPositionCorrect(t.anchorNode,t.anchorOffset)&&this._isDomSelectionPositionCorrect(t.focusNode,t.focusOffset)}_isDomSelectionPositionCorrect(t,e){if(Io(t)&&Do(t)&&e<Oo)return!1;if(this.isElement(t)&&Do(t.childNodes[e]))return!1;const n=this.mapDomToView(t);return!n||!n.is("uiElement")}_processDataFromViewText(t){let e=t.data;if(t.getAncestors().some(t=>this.preElements.includes(t.name)))return e;if(" "==e.charAt(0)){const n=this._getTouchingViewTextNode(t,!1);!(n&&this._nodeEndsWithSpace(n))&&n||(e=" "+e.substr(1))}if(" "==e.charAt(e.length-1)){this._getTouchingViewTextNode(t,!0)||(e=e.substr(0,e.length-1)+" ")}return e.replace(/ {2}/g,"  ")}_nodeEndsWithSpace(t){if(t.getAncestors().some(t=>this.preElements.includes(t.name)))return!1;const e=this._processDataFromViewText(t);return" "==e.charAt(e.length-1)}_processDataFromDomText(t){let e=t.data;if(nr(t,this.preElements))return jo(t);e=e.replace(/[ \n\t\r]{1,}/g," ");const n=this._getTouchingInlineDomNode(t,!1),i=this._getTouchingInlineDomNode(t,!0),o=this._checkShouldLeftTrimDomText(n),r=this._checkShouldRightTrimDomText(t,i);return o&&(e=e.replace(/^ /,"")),r&&(e=e.replace(/ $/,"")),e=(e=jo(new Text(e))).replace(/ \u00A0/g,"  "),o&&(e=e.replace(/^\u00A0/," ")),Io(i)&&" "!=i.data.charAt(0)||(e=e.replace(/\u00A0( *)$/," $1")),e}_checkShouldLeftTrimDomText(t){return!t||(!!tr(t)||/[^\S\u00A0]/.test(t.data.charAt(t.data.length-1)))}_checkShouldRightTrimDomText(t,e){return!e&&!Do(t)}_getTouchingViewTextNode(t,e){const n=new Yi({startPosition:e?$i._createAfter(t):$i._createBefore(t),direction:e?"forward":"backward"});for(const t of n){if(t.item.is("containerElement"))return null;if(t.item.is("br"))return null;if(t.item.is("textProxy"))return t.item}return null}_getTouchingInlineDomNode(t,e){if(!t.parentNode)return null;const n=e?"nextNode":"previousNode",i=t.ownerDocument,o=Xo(t)[0],r=i.createTreeWalker(o,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT,{acceptNode:t=>Io(t)?NodeFilter.FILTER_ACCEPT:"BR"==t.tagName?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP});r.currentNode=t;const s=r[n]();if(null!==s){const e=function(t,e){const n=Xo(t),i=Xo(e);let o=0;for(;n[o]==i[o]&&n[o];)o++;return 0===o?null:n[o-1]}(t,s);if(e&&!nr(t,this.blockElements,e)&&!nr(s,this.blockElements,e))return s}return null}}function nr(t,e,n){let i=Xo(t);return n&&(i=i.slice(i.indexOf(n)+1)),i.some(t=>t.tagName&&e.includes(t.tagName.toLowerCase()))}function ir(t,e){for(;t&&t!=Ko.document;)e(t),t=t.parentNode}function or(t){const e=Object.prototype.toString.apply(t);return"[object Window]"==e||"[object global]"==e}var rr=Ei({},R,{listenTo(t,...e){if(qo(t)||or(t)){const n=this._getProxyEmitter(t)||new sr(t);n.attach(...e),t=n}R.listenTo.call(this,t,...e)},stopListening(t,e,n){if(qo(t)||or(t)){const e=this._getProxyEmitter(t);if(!e)return;t=e}R.stopListening.call(this,t,e,n),t instanceof sr&&t.detach(e)},_getProxyEmitter(t){return function(t,e){return t[N]&&t[N][e]?t[N][e].emitter:null}(this,ar(t))}});class sr{constructor(t){D(this,ar(t)),this._domNode=t}}function ar(t){return t["data-ck-expando"]||(t["data-ck-expando"]=I())}Ei(sr.prototype,R,{attach(t,e,n={}){if(this._domListeners&&this._domListeners[t])return;const i=this._createDomListener(t,!!n.useCapture);this._domNode.addEventListener(t,i,!!n.useCapture),this._domListeners||(this._domListeners={}),this._domListeners[t]=i},detach(t){let e;!this._domListeners[t]||(e=this._events[t])&&e.callbacks.length||this._domListeners[t].removeListener()},_createDomListener(t,e){const n=e=>{this.fire(t,e)};return n.removeListener=(()=>{this._domNode.removeEventListener(t,n,e),delete this._domListeners[t]}),n}});class cr{constructor(t){this.view=t,this.document=t.document,this.isEnabled=!1}enable(){this.isEnabled=!0}disable(){this.isEnabled=!1}destroy(){this.disable(),this.stopListening()}}F(cr,rr);var lr="__lodash_hash_undefined__";var dr=function(t){return this.__data__.set(t,lr),this};var ur=function(t){return this.__data__.has(t)};function hr(t){var e=-1,n=null==t?0:t.length;for(this.__data__=new qt;++e<n;)this.add(t[e])}hr.prototype.add=hr.prototype.push=dr,hr.prototype.has=ur;var fr=hr;var mr=function(t,e){for(var n=-1,i=null==t?0:t.length;++n<i;)if(e(t[n],n,t))return!0;return!1};var pr=function(t,e){return t.has(e)},gr=1,br=2;var wr=function(t,e,n,i,o,r){var s=n&gr,a=t.length,c=e.length;if(a!=c&&!(s&&c>a))return!1;var l=r.get(t);if(l&&r.get(e))return l==e;var d=-1,u=!0,h=n&br?new fr:void 0;for(r.set(t,e),r.set(e,t);++d<a;){var f=t[d],m=e[d];if(i)var p=s?i(m,f,d,e,t,r):i(f,m,d,t,e,r);if(void 0!==p){if(p)continue;u=!1;break}if(h){if(!mr(e,function(t,e){if(!pr(h,e)&&(f===t||o(f,t,n,i,r)))return h.push(e)})){u=!1;break}}else if(f!==m&&!o(f,m,n,i,r)){u=!1;break}}return r.delete(t),r.delete(e),u};var _r=function(t){var e=-1,n=Array(t.size);return t.forEach(function(t,i){n[++e]=[i,t]}),n};var kr=function(t){var e=-1,n=Array(t.size);return t.forEach(function(t){n[++e]=t}),n},vr=1,yr=2,xr="[object Boolean]",Ar="[object Date]",Cr="[object Error]",Tr="[object Map]",Pr="[object Number]",Mr="[object RegExp]",Sr="[object Set]",Ir="[object String]",Er="[object Symbol]",Nr="[object ArrayBuffer]",Or="[object DataView]",Rr=o?o.prototype:void 0,Dr=Rr?Rr.valueOf:void 0;var Lr=function(t,e,n,i,o,r,s){switch(n){case Or:if(t.byteLength!=e.byteLength||t.byteOffset!=e.byteOffset)return!1;t=t.buffer,e=e.buffer;case Nr:return!(t.byteLength!=e.byteLength||!r(new dn(t),new dn(e)));case xr:case Ar:case Pr:return q(+t,+e);case Cr:return t.name==e.name&&t.message==e.message;case Mr:case Ir:return t==e+"";case Tr:var a=_r;case Sr:var c=i&vr;if(a||(a=kr),t.size!=e.size&&!c)return!1;var l=s.get(t);if(l)return l==e;i|=yr,s.set(t,e);var d=wr(a(t),a(e),i,o,r,s);return s.delete(t),d;case Er:if(Dr)return Dr.call(t)==Dr.call(e)}return!1},jr=1,Vr=Object.prototype.hasOwnProperty;var zr=function(t,e,n,i,o,r){var s=n&jr,a=Ge(t),c=a.length;if(c!=Ge(e).length&&!s)return!1;for(var l=c;l--;){var d=a[l];if(!(s?d in e:Vr.call(e,d)))return!1}var u=r.get(t);if(u&&r.get(e))return u==e;var h=!0;r.set(t,e),r.set(e,t);for(var f=s;++l<c;){var m=t[d=a[l]],p=e[d];if(i)var g=s?i(p,m,d,e,t,r):i(m,p,d,t,e,r);if(!(void 0===g?m===p||o(m,p,n,i,r):g)){h=!1;break}f||(f="constructor"==d)}if(h&&!f){var b=t.constructor,w=e.constructor;b!=w&&"constructor"in t&&"constructor"in e&&!("function"==typeof b&&b instanceof b&&"function"==typeof w&&w instanceof w)&&(h=!1)}return r.delete(t),r.delete(e),h},Br=1,Fr="[object Arguments]",Ur="[object Array]",Hr="[object Object]",qr=Object.prototype.hasOwnProperty;var Wr=function(t,e,n,i,o,r){var s=ce(t),a=ce(e),c=s?Ur:an(t),l=a?Ur:an(e),d=(c=c==Fr?Hr:c)==Hr,u=(l=l==Fr?Hr:l)==Hr,h=c==l;if(h&&Object(le.a)(t)){if(!Object(le.a)(e))return!1;s=!0,d=!1}if(h&&!d)return r||(r=new Gt),s||ke(t)?wr(t,e,n,i,o,r):Lr(t,e,c,n,i,o,r);if(!(n&Br)){var f=d&&qr.call(t,"__wrapped__"),m=u&&qr.call(e,"__wrapped__");if(f||m){var p=f?t.value():t,g=m?e.value():e;return r||(r=new Gt),o(p,g,n,i,r)}}return!!h&&(r||(r=new Gt),zr(t,e,n,i,o,r))};var Yr=function t(e,n,i,o,r){return e===n||(null==e||null==n||!w(e)&&!w(n)?e!=e&&n!=n:Wr(e,n,i,o,t,r))};var $r=function(t,e,n){var i=(n="function"==typeof n?n:void 0)?n(t,e):void 0;return void 0===i?Yr(t,e,void 0,n):!!i};class Gr extends cr{constructor(t){super(t),this._config={childList:!0,characterData:!0,characterDataOldValue:!0,subtree:!0},this.domConverter=t.domConverter,this.renderer=t._renderer,this._domElements=[],this._mutationObserver=new window.MutationObserver(this._onMutations.bind(this))}flush(){this._onMutations(this._mutationObserver.takeRecords())}observe(t){this._domElements.push(t),this.isEnabled&&this._mutationObserver.observe(t,this._config)}enable(){super.enable();for(const t of this._domElements)this._mutationObserver.observe(t,this._config)}disable(){super.disable(),this._mutationObserver.disconnect()}destroy(){super.destroy(),this._mutationObserver.disconnect()}_onMutations(t){if(0===t.length)return;const e=this.domConverter,n=new Map,i=new Set;for(const n of t)if("childList"===n.type){const t=e.mapDomToView(n.target);if(t&&t.is("uiElement"))continue;t&&!this._isBogusBrMutation(n)&&i.add(t)}for(const o of t){const t=e.mapDomToView(o.target);if((!t||!t.is("uiElement"))&&"characterData"===o.type){const t=e.findCorrespondingViewText(o.target);t&&!i.has(t.parent)?n.set(t,{type:"text",oldText:t.data,newText:jo(o.target),node:t}):!t&&Do(o.target)&&i.add(e.mapDomToView(o.target.parentNode))}}const o=[];for(const t of n.values())this.renderer.markToSync("text",t.node),o.push(t);for(const t of i){const n=e.mapViewToDom(t),i=Array.from(t.getChildren()),r=Array.from(e.domChildrenToView(n,{withChildren:!1}));$r(i,r,a)||(this.renderer.markToSync("children",t),o.push({type:"children",oldChildren:i,newChildren:r,node:t}))}const r=t[0].target.ownerDocument.getSelection();let s=null;if(r&&r.anchorNode){const t=e.domPositionToView(r.anchorNode,r.anchorOffset),n=e.domPositionToView(r.focusNode,r.focusOffset);t&&n&&(s=new Ki(t)).setFocus(n)}function a(t,e){if(!Array.isArray(t))return t===e||!(!t.is("text")||!e.is("text"))&&t.data===e.data}this.document.fire("mutations",o,s),this.view.render()}_isBogusBrMutation(t){let e=null;return null===t.nextSibling&&0===t.removedNodes.length&&1==t.addedNodes.length&&(e=this.domConverter.domToView(t.addedNodes[0],{withChildren:!1})),e&&e.is("element","br")}}class Qr{constructor(t,e,n){this.view=t,this.document=t.document,this.domEvent=e,this.domTarget=e.target,Ei(this,n)}get target(){return this.view.domConverter.mapDomToView(this.domTarget)}preventDefault(){this.domEvent.preventDefault()}stopPropagation(){this.domEvent.stopPropagation()}}class Jr extends cr{constructor(t){super(t),this.useCapture=!1}observe(t){("string"==typeof this.domEventType?[this.domEventType]:this.domEventType).forEach(e=>{this.listenTo(t,e,(t,e)=>{this.isEnabled&&this.onDomEvent(e)},{useCapture:this.useCapture})})}fire(t,e,n){this.isEnabled&&this.document.fire(t,new Qr(this.view,e,n))}}class Kr extends Jr{constructor(t){super(t),this.domEventType=["keydown","keyup"]}onDomEvent(t){this.fire(t.type,t,{keyCode:t.keyCode,altKey:t.altKey,ctrlKey:t.ctrlKey||t.metaKey,shiftKey:t.shiftKey,get keystroke(){return fo(this)}})}}var Zr=function(){return i.a.Date.now()},Xr="[object Symbol]";var ts=function(t){return"symbol"==typeof t||w(t)&&p(t)==Xr},es=NaN,ns=/^\s+|\s+$/g,is=/^[-+]0x[0-9a-f]+$/i,os=/^0b[01]+$/i,rs=/^0o[0-7]+$/i,ss=parseInt;var as=function(t){if("number"==typeof t)return t;if(ts(t))return es;if(it(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=it(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(ns,"");var n=os.test(t);return n||rs.test(t)?ss(t.slice(2),n?2:8):is.test(t)?es:+t},cs="Expected a function",ls=Math.max,ds=Math.min;var us=function(t,e,n){var i,o,r,s,a,c,l=0,d=!1,u=!1,h=!0;if("function"!=typeof t)throw new TypeError(cs);function f(e){var n=i,r=o;return i=o=void 0,l=e,s=t.apply(r,n)}function m(t){var n=t-c;return void 0===c||n>=e||n<0||u&&t-l>=r}function p(){var t=Zr();if(m(t))return g(t);a=setTimeout(p,function(t){var n=e-(t-c);return u?ds(n,r-(t-l)):n}(t))}function g(t){return a=void 0,h&&i?f(t):(i=o=void 0,s)}function b(){var t=Zr(),n=m(t);if(i=arguments,o=this,c=t,n){if(void 0===a)return function(t){return l=t,a=setTimeout(p,e),d?f(t):s}(c);if(u)return a=setTimeout(p,e),f(c)}return void 0===a&&(a=setTimeout(p,e)),s}return e=as(e)||0,it(n)&&(d=!!n.leading,r=(u="maxWait"in n)?ls(as(n.maxWait)||0,e):r,h="trailing"in n?!!n.trailing:h),b.cancel=function(){void 0!==a&&clearTimeout(a),l=0,i=c=o=a=void 0},b.flush=function(){return void 0===a?s:g(Zr())},b};class hs extends cr{constructor(t){super(t),this._fireSelectionChangeDoneDebounced=us(t=>this.document.fire("selectionChangeDone",t),200)}observe(){const t=this.document;t.on("keydown",(e,n)=>{t.selection.isFake&&function(t){return t==ho.arrowright||t==ho.arrowleft||t==ho.arrowup||t==ho.arrowdown}(n.keyCode)&&this.isEnabled&&(n.preventDefault(),this._handleSelectionMove(n.keyCode))},{priority:"lowest"})}destroy(){super.destroy(),this._fireSelectionChangeDoneDebounced.cancel()}_handleSelectionMove(t){const e=this.document.selection,n=new Ki(e.getRanges(),{backward:e.isBackward,fake:!1});t!=ho.arrowleft&&t!=ho.arrowup||n.setTo(n.getFirstPosition()),t!=ho.arrowright&&t!=ho.arrowdown||n.setTo(n.getLastPosition());const i={oldSelection:e,newSelection:n,domSelection:null};this.document.fire("selectionChange",i),this._fireSelectionChangeDoneDebounced(i)}}var fs=n(1);class ms extends cr{constructor(t){super(t),this.mutationObserver=t.getObserver(Gr),this.selection=this.document.selection,this.domConverter=t.domConverter,this._documents=new WeakSet,this._fireSelectionChangeDoneDebounced=us(t=>this.document.fire("selectionChangeDone",t),200),this._clearInfiniteLoopInterval=setInterval(()=>this._clearInfiniteLoop(),1e3),this._loopbackCounter=0}observe(t){const e=t.ownerDocument;this._documents.has(e)||(this.listenTo(e,"selectionchange",()=>{this._handleSelectionChange(e)}),this._documents.add(e))}destroy(){super.destroy(),clearInterval(this._clearInfiniteLoopInterval),this._fireSelectionChangeDoneDebounced.cancel()}_handleSelectionChange(t){if(!this.isEnabled||!this.document.isFocused&&!this.document.isReadOnly)return;this.mutationObserver.flush();const e=t.defaultView.getSelection(),n=this.domConverter.domSelectionToView(e);if(!this.selection.isEqual(n)||!this.domConverter.isDomSelectionCorrect(e))if(++this._loopbackCounter>60)fs.a.warn("selectionchange-infinite-loop: Selection change observer detected an infinite rendering loop.");else if(this.selection.isSimilar(n))this.view.render();else{const t={oldSelection:this.selection,newSelection:n,domSelection:e};this.document.fire("selectionChange",t),this._fireSelectionChangeDoneDebounced(t)}}_clearInfiniteLoop(){this._loopbackCounter=0}}class ps extends Jr{constructor(t){super(t),this.domEventType=["focus","blur"],this.useCapture=!0;const e=this.document;e.on("focus",()=>{e.isFocused=!0,this._renderTimeoutId=setTimeout(()=>t.render(),50)}),e.on("blur",(n,i)=>{const o=e.selection.editableElement;null!==o&&o!==i.target||(e.isFocused=!1,t.render())})}onDomEvent(t){this.fire(t.type,t)}destroy(){this._renderTimeoutId&&clearTimeout(this._renderTimeoutId),super.destroy()}}class gs extends Jr{constructor(t){super(t),this.domEventType=["compositionstart","compositionupdate","compositionend"];const e=this.document;e.on("compositionstart",()=>{e.isComposing=!0}),e.on("compositionend",()=>{e.isComposing=!1})}onDomEvent(t){this.fire(t.type,t)}}function bs(t){return"[object Range]"==Object.prototype.toString.apply(t)}function ws(t){const e=t.ownerDocument.defaultView.getComputedStyle(t);return{top:parseInt(e.borderTopWidth,10),right:parseInt(e.borderRightWidth,10),bottom:parseInt(e.borderBottomWidth,10),left:parseInt(e.borderLeftWidth,10)}}const _s=["top","right","bottom","left","width","height"];class ks{constructor(t){const e=bs(t);if(Object.defineProperty(this,"_source",{value:t._source||t,writable:!0,enumerable:!1}),tr(t)||e){const n=e?t.startContainer:t;n.ownerDocument&&n.ownerDocument.body.contains(n)||fs.a.warn("rect-source-not-in-dom: The source of this rect does not belong to any rendered DOM tree.",{source:t}),vs(this,e?ks.getDomRangeRects(t)[0]:t.getBoundingClientRect())}else if(or(t)){const{innerWidth:e,innerHeight:n}=t;vs(this,{top:0,right:e,bottom:n,left:0,width:e,height:n})}else vs(this,t)}clone(){return new ks(this)}moveTo(t,e){return this.top=e,this.right=t+this.width,this.bottom=e+this.height,this.left=t,this}moveBy(t,e){return this.top+=e,this.right+=t,this.left+=t,this.bottom+=e,this}getIntersection(t){const e={top:Math.max(this.top,t.top),right:Math.min(this.right,t.right),bottom:Math.min(this.bottom,t.bottom),left:Math.max(this.left,t.left)};return e.width=e.right-e.left,e.height=e.bottom-e.top,e.width<0||e.height<0?null:new ks(e)}getIntersectionArea(t){const e=this.getIntersection(t);return e?e.getArea():0}getArea(){return this.width*this.height}getVisible(){const t=this._source;let e=this.clone();if(!ys(t)){let n=t.parentNode||t.commonAncestorContainer;for(;n&&!ys(n);){const t=new ks(n),i=e.getIntersection(t);if(!i)return null;i.getArea()<e.getArea()&&(e=i),n=n.parentNode}}return e}isEqual(t){for(const e of _s)if(this[e]!==t[e])return!1;return!0}contains(t){const e=this.getIntersection(t);return!(!e||!e.isEqual(t))}excludeScrollbarsAndBorders(){const t=this._source;let e,n;if(or(t))e=t.innerWidth-t.document.documentElement.clientWidth,n=t.innerHeight-t.document.documentElement.clientHeight;else{const i=ws(this._source);e=t.offsetWidth-t.clientWidth,n=t.offsetHeight-t.clientHeight,this.moveBy(i.left,i.top)}return this.width-=e,this.right-=e,this.height-=n,this.bottom-=n,this}static getDomRangeRects(t){const e=[],n=Array.from(t.getClientRects());if(n.length)for(const t of n)e.push(new ks(t));else{let n=t.startContainer;Io(n)&&(n=n.parentNode);const i=new ks(n.getBoundingClientRect());i.right=i.left,i.width=0,e.push(i)}return e}}function vs(t,e){for(const n of _s)t[n]=e[n]}function ys(t){return!!tr(t)&&t===t.ownerDocument.body}function xs({target:t,viewportOffset:e=0}){const n=Is(t);let i=n,o=null;for(;i;){let r;Cs(r=Es(i==n?t:o),()=>Ns(t,i));const s=Ns(t,i);if(As(i,s,e),i.parent!=i){if(o=i.frameElement,i=i.parent,!o)return}else i=null}}function As(t,e,n){const i=e.clone().moveBy(0,n),o=e.clone().moveBy(0,-n),r=new ks(t).excludeScrollbarsAndBorders();if(![o,i].every(t=>r.contains(t))){let{scrollX:s,scrollY:a}=t;Ps(o,r)?a-=r.top-e.top+n:Ts(i,r)&&(a+=e.bottom-r.bottom+n),Ms(e,r)?s-=r.left-e.left+n:Ss(e,r)&&(s+=e.right-r.right+n),t.scrollTo(s,a)}}function Cs(t,e){const n=Is(t);let i,o;for(;t!=n.document.body;)o=e(),(i=new ks(t).excludeScrollbarsAndBorders()).contains(o)||(Ps(o,i)?t.scrollTop-=i.top-o.top:Ts(o,i)&&(t.scrollTop+=o.bottom-i.bottom),Ms(o,i)?t.scrollLeft-=i.left-o.left:Ss(o,i)&&(t.scrollLeft+=o.right-i.right)),t=t.parentNode}function Ts(t,e){return t.bottom>e.bottom}function Ps(t,e){return t.top<e.top}function Ms(t,e){return t.left<e.left}function Ss(t,e){return t.right>e.right}function Is(t){return bs(t)?t.startContainer.ownerDocument.defaultView:t.ownerDocument.defaultView}function Es(t){if(bs(t)){let e=t.commonAncestorContainer;return Io(e)&&(e=e.parentNode),e}return t.parentNode}function Ns(t,e){const n=Is(t),i=new ks(t);if(n===e)return i;{let t=n;for(;t!=e;){const e=t.frameElement,n=new ks(e).excludeScrollbarsAndBorders();i.moveBy(n.left,n.top),t=t.parent}}return i}Object.assign({},{scrollViewportToShowTarget:xs,scrollAncestorsToShowTarget:function(t){Cs(Es(t),()=>new ks(t))}});class Os{constructor(){this.document=new to,this.domConverter=new er,this._renderer=new Go(this.domConverter,this.document.selection),this._renderer.bind("isFocused").to(this.document),this.domRoots=new Map,this._observers=new Map,this._ongoingChange=!1,this._renderingInProgress=!1,this._postFixersInProgress=!1,this._renderingDisabled=!1,this._writer=new ko(this.document),this.addObserver(Gr),this.addObserver(ms),this.addObserver(ps),this.addObserver(Kr),this.addObserver(hs),this.addObserver(gs),function(t){t.document.on("keydown",Bo)}(this),bo(this),this.on("render",()=>{this._render(),this.document.fire("layoutChanged")})}attachDomRoot(t,e="main"){const n=this.document.getRoot(e);n._name=t.tagName.toLowerCase(),this.domRoots.set(e,t),this.domConverter.bindElements(t,n),this._renderer.markToSync("children",n),this._renderer.domDocuments.add(t.ownerDocument),n.on("change:children",(t,e)=>this._renderer.markToSync("children",e)),n.on("change:attributes",(t,e)=>this._renderer.markToSync("attributes",e)),n.on("change:text",(t,e)=>this._renderer.markToSync("text",e));for(const n of this._observers.values())n.observe(t,e)}getDomRoot(t="main"){return this.domRoots.get(t)}addObserver(t){let e=this._observers.get(t);if(e)return e;e=new t(this),this._observers.set(t,e);for(const[t,n]of this.domRoots)e.observe(n,t);return e.enable(),e}getObserver(t){return this._observers.get(t)}disableObservers(){for(const t of this._observers.values())t.disable()}enableObservers(){for(const t of this._observers.values())t.enable()}scrollToTheSelection(){const t=this.document.selection.getFirstRange();t&&xs({target:this.domConverter.viewRangeToDom(t),viewportOffset:20})}focus(){if(!this.document.isFocused){const t=this.document.selection.editableElement;t?(this.domConverter.focus(t),this.render()):fs.a.warn("view-focus-no-selection: There is no selection in any editable to focus.")}}change(t){if(this._renderingInProgress||this._postFixersInProgress)throw new P.b("cannot-change-view-tree: Attempting to make changes to the view when it is in an incorrect state: rendering or post-fixers are in progress. This may cause some unexpected behavior and inconsistency between the DOM and the view.");if(this._ongoingChange)return t(this._writer);this._ongoingChange=!0;const e=t(this._writer);return this._ongoingChange=!1,this._renderingDisabled||(this._postFixersInProgress=!0,this.document._callPostFixers(this._writer),this._postFixersInProgress=!1,this.fire("render")),e}render(){this.change(()=>{})}destroy(){for(const t of this._observers.values())t.destroy();this.stopListening()}createPositionAt(t,e){return $i._createAt(t,e)}createPositionAfter(t){return $i._createAfter(t)}createPositionBefore(t){return $i._createBefore(t)}createRange(t,e){return new Gi(t,e)}createRangeOn(t){return Gi._createOn(t)}createRangeIn(t){return Gi._createIn(t)}createSelection(t,e,n){return new Ki(t,e,n)}_render(){this._renderingInProgress=!0,this.disableObservers(),this._renderer.render(),this.enableObservers(),this._renderingInProgress=!1}}function Rs(t){return C(t)?di(t):new Map(t)}F(Os,Li);class Ds{constructor(t){this.parent=null,this._attrs=Rs(t)}get index(){let t;if(!this.parent)return null;if(null===(t=this.parent.getChildIndex(this)))throw new P.b("model-node-not-found-in-parent: The node's parent does not contain this node.");return t}get startOffset(){let t;if(!this.parent)return null;if(null===(t=this.parent.getChildStartOffset(this)))throw new P.b("model-node-not-found-in-parent: The node's parent does not contain this node.");return t}get offsetSize(){return 1}get endOffset(){return this.parent?this.startOffset+this.offsetSize:null}get nextSibling(){const t=this.index;return null!==t&&this.parent.getChild(t+1)||null}get previousSibling(){const t=this.index;return null!==t&&this.parent.getChild(t-1)||null}get root(){let t=this;for(;t.parent;)t=t.parent;return t}get document(){return this.root==this?null:this.root.document||null}getPath(){const t=[];let e=this;for(;e.parent;)t.unshift(e.startOffset),e=e.parent;return t}getAncestors(t={includeSelf:!1,parentFirst:!1}){const e=[];let n=t.includeSelf?this:this.parent;for(;n;)e[t.parentFirst?"push":"unshift"](n),n=n.parent;return e}getCommonAncestor(t,e={}){const n=this.getAncestors(e),i=t.getAncestors(e);let o=0;for(;n[o]==i[o]&&n[o];)o++;return 0===o?null:n[o-1]}isBefore(t){if(this==t)return!1;if(this.root!==t.root)return!1;const e=this.getPath(),n=t.getPath(),i=U(e,n);switch(i){case"prefix":return!0;case"extension":return!1;default:return e[i]<n[i]}}isAfter(t){return this!=t&&(this.root===t.root&&!this.isBefore(t))}hasAttribute(t){return this._attrs.has(t)}getAttribute(t){return this._attrs.get(t)}getAttributes(){return this._attrs.entries()}getAttributeKeys(){return this._attrs.keys()}toJSON(){const t={};return this._attrs.size&&(t.attributes=Array.from(this._attrs).reduce((t,e)=>(t[e[0]]=e[1],t),{})),t}_clone(){return new Ds(this._attrs)}_remove(){this.parent._removeChildren(this.index)}_setAttribute(t,e){this._attrs.set(t,e)}_setAttributesTo(t){this._attrs=Rs(t)}_removeAttribute(t){return this._attrs.delete(t)}_clearAttributes(){this._attrs.clear()}is(t){return"node"==t}}class Ls extends Ds{constructor(t,e){super(e),this._data=t||""}get offsetSize(){return this.data.length}get data(){return this._data}is(t){return"text"==t||super.is(t)}toJSON(){const t=super.toJSON();return t.data=this.data,t}_clone(){return new Ls(this.data,this.getAttributes())}static fromJSON(t){return new Ls(t.data,t.attributes)}}class js{constructor(t,e,n){if(this.textNode=t,e<0||e>t.offsetSize)throw new P.b("model-textproxy-wrong-offsetintext: Given offsetInText value is incorrect.");if(n<0||e+n>t.offsetSize)throw new P.b("model-textproxy-wrong-length: Given length value is incorrect.");this.data=t.data.substring(e,e+n),this.offsetInText=e}get startOffset(){return null!==this.textNode.startOffset?this.textNode.startOffset+this.offsetInText:null}get offsetSize(){return this.data.length}get endOffset(){return null!==this.startOffset?this.startOffset+this.offsetSize:null}get isPartial(){return this.offsetSize!==this.textNode.offsetSize}get parent(){return this.textNode.parent}get root(){return this.textNode.root}get document(){return this.textNode.document}is(t){return"textProxy"==t}getPath(){const t=this.textNode.getPath();return t.length>0&&(t[t.length-1]+=this.offsetInText),t}getAncestors(t={includeSelf:!1,parentFirst:!1}){const e=[];let n=t.includeSelf?this:this.parent;for(;n;)e[t.parentFirst?"push":"unshift"](n),n=n.parent;return e}hasAttribute(t){return this.textNode.hasAttribute(t)}getAttribute(t){return this.textNode.getAttribute(t)}getAttributes(){return this.textNode.getAttributes()}getAttributeKeys(){return this.textNode.getAttributeKeys()}}class Vs{constructor(t){this._nodes=[],t&&this._insertNodes(0,t)}[Symbol.iterator](){return this._nodes[Symbol.iterator]()}get length(){return this._nodes.length}get maxOffset(){return this._nodes.reduce((t,e)=>t+e.offsetSize,0)}getNode(t){return this._nodes[t]||null}getNodeIndex(t){const e=this._nodes.indexOf(t);return-1==e?null:e}getNodeStartOffset(t){const e=this.getNodeIndex(t);return null===e?null:this._nodes.slice(0,e).reduce((t,e)=>t+e.offsetSize,0)}indexToOffset(t){if(t==this._nodes.length)return this.maxOffset;const e=this._nodes[t];if(!e)throw new P.b("model-nodelist-index-out-of-bounds: Given index cannot be found in the node list.");return this.getNodeStartOffset(e)}offsetToIndex(t){let e=0;for(const n of this._nodes){if(t>=e&&t<e+n.offsetSize)return this.getNodeIndex(n);e+=n.offsetSize}if(e!=t)throw new P.b("model-nodelist-offset-out-of-bounds: Given offset cannot be found in the node list.",{offset:t,nodeList:this});return this.length}_insertNodes(t,e){for(const t of e)if(!(t instanceof Ds))throw new P.b("model-nodelist-insertNodes-not-node: Trying to insert an object which is not a Node instance.");this._nodes.splice(t,0,...e)}_removeNodes(t,e=1){return this._nodes.splice(t,e)}toJSON(){return this._nodes.map(t=>t.toJSON())}}class zs extends Ds{constructor(t,e,n){super(e),this.name=t,this._children=new Vs,n&&this._insertChild(0,n)}get childCount(){return this._children.length}get maxOffset(){return this._children.maxOffset}get isEmpty(){return 0===this.childCount}is(t,e=null){return e?"element"==t&&e==this.name:"element"==t||t==this.name||super.is(t)}getChild(t){return this._children.getNode(t)}getChildren(){return this._children[Symbol.iterator]()}getChildIndex(t){return this._children.getNodeIndex(t)}getChildStartOffset(t){return this._children.getNodeStartOffset(t)}offsetToIndex(t){return this._children.offsetToIndex(t)}getNodeByPath(t){let e=this;for(const n of t)e=e.getChild(e.offsetToIndex(n));return e}toJSON(){const t=super.toJSON();if(t.name=this.name,this._children.length>0){t.children=[];for(const e of this._children)t.children.push(e.toJSON())}return t}_clone(t=!1){const e=t?Array.from(this._children).map(t=>t._clone(!0)):null;return new zs(this.name,this.getAttributes(),e)}_appendChild(t){this._insertChild(this.childCount,t)}_insertChild(t,e){const n=function(t){if("string"==typeof t)return[new Ls(t)];ui(t)||(t=[t]);return Array.from(t).map(t=>"string"==typeof t?new Ls(t):t instanceof js?new Ls(t.data,t.getAttributes()):t)}(e);for(const t of n)null!==t.parent&&t._remove(),t.parent=this;this._children._insertNodes(t,n)}_removeChildren(t,e=1){const n=this._children._removeNodes(t,e);for(const t of n)t.parent=null;return n}static fromJSON(t){let e=null;if(t.children){e=[];for(const n of t.children)n.name?e.push(zs.fromJSON(n)):e.push(Ls.fromJSON(n))}return new zs(t.name,t.attributes,e)}}class Bs{constructor(t={}){if(!t.boundaries&&!t.startPosition)throw new P.b("model-tree-walker-no-start-position: Neither boundaries nor starting position have been defined.");const e=t.direction||"forward";if("forward"!=e&&"backward"!=e)throw new P.b("model-tree-walker-unknown-direction: Only `backward` and `forward` direction allowed.",{direction:e});this.direction=e,this.boundaries=t.boundaries||null,t.startPosition?this.position=t.startPosition.clone():this.position=Hs._createAt(this.boundaries["backward"==this.direction?"end":"start"]),this.position.stickiness="toNone",this.singleCharacters=!!t.singleCharacters,this.shallow=!!t.shallow,this.ignoreElementEnd=!!t.ignoreElementEnd,this._boundaryStartParent=this.boundaries?this.boundaries.start.parent:null,this._boundaryEndParent=this.boundaries?this.boundaries.end.parent:null,this._visitedParent=this.position.parent}[Symbol.iterator](){return this}skip(t){let e,n,i,o;do{i=this.position,o=this._visitedParent,({done:e,value:n}=this.next())}while(!e&&t(n));e||(this.position=i,this._visitedParent=o)}next(){return"forward"==this.direction?this._next():this._previous()}_next(){const t=this.position,e=this.position.clone(),n=this._visitedParent;if(null===n.parent&&e.offset===n.maxOffset)return{done:!0};if(n===this._boundaryEndParent&&e.offset==this.boundaries.end.offset)return{done:!0};const i=e.textNode?e.textNode:e.nodeAfter;if(i instanceof zs)return this.shallow?e.offset++:(e.path.push(0),this._visitedParent=i),this.position=e,Fs("elementStart",i,t,e,1);if(i instanceof Ls){let o;if(this.singleCharacters)o=1;else{let t=i.endOffset;this._boundaryEndParent==n&&this.boundaries.end.offset<t&&(t=this.boundaries.end.offset),o=t-e.offset}const r=e.offset-i.startOffset,s=new js(i,r,o);return e.offset+=o,this.position=e,Fs("text",s,t,e,o)}return e.path.pop(),e.offset++,this.position=e,this._visitedParent=n.parent,this.ignoreElementEnd?this._next():Fs("elementEnd",n,t,e)}_previous(){const t=this.position,e=this.position.clone(),n=this._visitedParent;if(null===n.parent&&0===e.offset)return{done:!0};if(n==this._boundaryStartParent&&e.offset==this.boundaries.start.offset)return{done:!0};const i=e.textNode?e.textNode:e.nodeBefore;if(i instanceof zs)return e.offset--,this.shallow?(this.position=e,Fs("elementStart",i,t,e,1)):(e.path.push(i.maxOffset),this.position=e,this._visitedParent=i,this.ignoreElementEnd?this._previous():Fs("elementEnd",i,t,e));if(i instanceof Ls){let o;if(this.singleCharacters)o=1;else{let t=i.startOffset;this._boundaryStartParent==n&&this.boundaries.start.offset>t&&(t=this.boundaries.start.offset),o=e.offset-t}const r=e.offset-i.startOffset,s=new js(i,r-o,o);return e.offset-=o,this.position=e,Fs("text",s,t,e,o)}return e.path.pop(),this.position=e,this._visitedParent=n.parent,Fs("elementStart",n,t,e,1)}}function Fs(t,e,n,i,o){return{done:!1,value:{type:t,item:e,previousPosition:n,nextPosition:i,length:o}}}var Us=function(t){var e=null==t?0:t.length;return e?t[e-1]:void 0};class Hs{constructor(t,e,n="toNone"){if(!t.is("element")&&!t.is("documentFragment"))throw new P.b("model-position-root-invalid: Position root invalid.");if(!(e instanceof Array)||0===e.length)throw new P.b("model-position-path-incorrect: Position path must be an array with at least one item.",{path:e});e=t.getPath().concat(e),t=t.root,this.root=t,this.path=e,this.stickiness=n}get offset(){return Us(this.path)}set offset(t){this.path[this.path.length-1]=t}get parent(){let t=this.root;for(let e=0;e<this.path.length-1;e++)t=t.getChild(t.offsetToIndex(this.path[e]));return t}get index(){return this.parent.offsetToIndex(this.offset)}get textNode(){const t=this.parent.getChild(this.index);return t instanceof Ls&&t.startOffset<this.offset?t:null}get nodeAfter(){return null===this.textNode?this.parent.getChild(this.index):null}get nodeBefore(){return null===this.textNode?this.parent.getChild(this.index-1):null}get isAtStart(){return 0===this.offset}get isAtEnd(){return this.offset==this.parent.maxOffset}compareWith(t){if(this.root!=t.root)return"different";const e=U(this.path,t.path);switch(e){case"same":return"same";case"prefix":return"before";case"extension":return"after";default:return this.path[e]<t.path[e]?"before":"after"}}getLastMatchingPosition(t,e={}){e.startPosition=this;const n=new Bs(e);return n.skip(t),n.position}getParentPath(){return this.path.slice(0,-1)}getAncestors(){return this.parent.is("documentFragment")?[this.parent]:this.parent.getAncestors({includeSelf:!0})}getCommonPath(t){if(this.root!=t.root)return[];const e=U(this.path,t.path),n="string"==typeof e?Math.min(this.path.length,t.path.length):e;return this.path.slice(0,n)}getCommonAncestor(t){const e=this.getAncestors(),n=t.getAncestors();let i=0;for(;e[i]==n[i]&&e[i];)i++;return 0===i?null:e[i-1]}getShiftedBy(t){const e=this.clone(),n=e.offset+t;return e.offset=n<0?0:n,e}isAfter(t){return"after"==this.compareWith(t)}isBefore(t){return"before"==this.compareWith(t)}isEqual(t){return"same"==this.compareWith(t)}isTouching(t){let e=null,n=null;switch(this.compareWith(t)){case"same":return!0;case"before":e=Hs._createAt(this),n=Hs._createAt(t);break;case"after":e=Hs._createAt(t),n=Hs._createAt(this);break;default:return!1}let i=e.parent;for(;e.path.length+n.path.length;){if(e.isEqual(n))return!0;if(e.path.length>n.path.length){if(e.offset!==i.maxOffset)return!1;e.path=e.path.slice(0,-1),i=i.parent,e.offset++}else{if(0!==n.offset)return!1;n.path=n.path.slice(0,-1)}}}hasSameParentAs(t){if(this.root!==t.root)return!1;return"same"==U(this.getParentPath(),t.getParentPath())}getTransformedByOperation(t){let e;switch(t.type){case"insert":e=this._getTransformedByInsertOperation(t);break;case"move":case"remove":case"reinsert":e=this._getTransformedByMoveOperation(t);break;case"split":e=this._getTransformedBySplitOperation(t);break;case"merge":e=this._getTransformedByMergeOperation(t);break;default:e=Hs._createAt(this)}return e}_getTransformedByInsertOperation(t){return this._getTransformedByInsertion(t.position,t.howMany)}_getTransformedByMoveOperation(t){return this._getTransformedByMove(t.sourcePosition,t.targetPosition,t.howMany)}_getTransformedBySplitOperation(t){const e=t.movedRange;return e.containsPosition(this)||e.start.isEqual(this)&&"toNext"==this.stickiness?this._getCombined(t.splitPosition,t.moveTargetPosition):t.graveyardPosition?this._getTransformedByMove(t.graveyardPosition,t.insertionPosition,1):this._getTransformedByInsertion(t.insertionPosition,1)}_getTransformedByMergeOperation(t){const e=t.movedRange;let n;return e.containsPosition(this)||e.start.isEqual(this)?(n=this._getCombined(t.sourcePosition,t.targetPosition),t.sourcePosition.isBefore(t.targetPosition)&&(n=n._getTransformedByDeletion(t.deletionPosition,1))):n=this.isEqual(t.deletionPosition)?Hs._createAt(t.deletionPosition):this._getTransformedByMove(t.deletionPosition,t.graveyardPosition,1),n}_getTransformedByDeletion(t,e){const n=Hs._createAt(this);if(this.root!=t.root)return n;if("same"==U(t.getParentPath(),this.getParentPath())){if(t.offset<this.offset){if(t.offset+e>this.offset)return null;n.offset-=e}}else if("prefix"==U(t.getParentPath(),this.getParentPath())){const i=t.path.length-1;if(t.offset<=this.path[i]){if(t.offset+e>this.path[i])return null;n.path[i]-=e}}return n}_getTransformedByInsertion(t,e){const n=Hs._createAt(this);if(this.root!=t.root)return n;if("same"==U(t.getParentPath(),this.getParentPath()))(t.offset<this.offset||t.offset==this.offset&&"toPrevious"!=this.stickiness)&&(n.offset+=e);else if("prefix"==U(t.getParentPath(),this.getParentPath())){const i=t.path.length-1;t.offset<=this.path[i]&&(n.path[i]+=e)}return n}_getTransformedByMove(t,e,n){if(e=e._getTransformedByDeletion(t,n),t.isEqual(e))return Hs._createAt(this);const i=this._getTransformedByDeletion(t,n);return null===i||t.isEqual(this)&&"toNext"==this.stickiness||t.getShiftedBy(n).isEqual(this)&&"toPrevious"==this.stickiness?this._getCombined(t,e):i._getTransformedByInsertion(e,n)}_getCombined(t,e){const n=t.path.length-1,i=Hs._createAt(e);return i.stickiness=this.stickiness,i.offset=i.offset+this.path[n]-t.offset,i.path=i.path.concat(this.path.slice(n+1)),i}toJSON(){return{root:this.root.toJSON(),path:Array.from(this.path),stickiness:this.stickiness}}clone(){return new this.constructor(this.root,this.path,this.stickiness)}static _createAt(t,e){if(t instanceof Hs)return new Hs(t.root,t.path,t.stickiness);{const n=t;if("end"==e)e=n.maxOffset;else{if("before"==e)return this._createBefore(n);if("after"==e)return this._createAfter(n);if(0!==e&&!e)throw new P.b("model-createPositionAt-offset-required: Model#createPositionAt() requires the offset when the first parameter is a model item.")}if(!n.is("element")&&!n.is("documentFragment"))throw new P.b("model-position-parent-incorrect: Position parent have to be a element or document fragment.");const i=n.getPath();return i.push(e),new this(n.root,i)}}static _createAfter(t){if(!t.parent)throw new P.b("model-position-after-root: You cannot make a position after root.",{root:t});return this._createAt(t.parent,t.endOffset)}static _createBefore(t){if(!t.parent)throw new P.b("model-position-before-root: You cannot make a position before root.",{root:t});return this._createAt(t.parent,t.startOffset)}static fromJSON(t,e){if("$graveyard"===t.root){const n=new Hs(e.graveyard,t.path);return n.stickiness=t.stickiness,n}if(!e.getRoot(t.root))throw new P.b("model-position-fromjson-no-root: Cannot create position for document. Root with specified name does not exist.",{rootName:t.root});const n=new Hs(e.getRoot(t.root),t.path);return n.stickiness=t.stickiness,n}}class qs{constructor(t,e=null){this.start=Hs._createAt(t),this.end=e?Hs._createAt(e):Hs._createAt(t),this.start.stickiness=this.isCollapsed?"toNone":"toNext",this.end.stickiness=this.isCollapsed?"toNone":"toPrevious"}*[Symbol.iterator](){yield*new Bs({boundaries:this,ignoreElementEnd:!0})}get isCollapsed(){return this.start.isEqual(this.end)}get isFlat(){return"same"==U(this.start.getParentPath(),this.end.getParentPath())}get root(){return this.start.root}containsPosition(t){return t.isAfter(this.start)&&t.isBefore(this.end)}containsRange(t,e=!1){t.isCollapsed&&(e=!1);const n=this.containsPosition(t.start)||e&&this.start.isEqual(t.start),i=this.containsPosition(t.end)||e&&this.end.isEqual(t.end);return n&&i}containsItem(t){const e=Hs._createBefore(t);return this.containsPosition(e)||this.start.isEqual(e)}isEqual(t){return this.start.isEqual(t.start)&&this.end.isEqual(t.end)}isIntersecting(t){return this.start.isBefore(t.end)&&this.end.isAfter(t.start)}getDifference(t){const e=[];return this.isIntersecting(t)?(this.containsPosition(t.start)&&e.push(new qs(this.start,t.start)),this.containsPosition(t.end)&&e.push(new qs(t.end,this.end))):e.push(new qs(this.start,this.end)),e}getIntersection(t){if(this.isIntersecting(t)){let e=this.start,n=this.end;return this.containsPosition(t.start)&&(e=t.start),this.containsPosition(t.end)&&(n=t.end),new qs(e,n)}return null}getMinimalFlatRanges(){const t=[],e=this.start.getCommonPath(this.end).length,n=Hs._createAt(this.start);let i=n.parent;for(;n.path.length>e+1;){const e=i.maxOffset-n.offset;0!==e&&t.push(new qs(n,n.getShiftedBy(e))),n.path=n.path.slice(0,-1),n.offset++,i=i.parent}for(;n.path.length<=this.end.path.length;){const e=this.end.path[n.path.length-1],i=e-n.offset;0!==i&&t.push(new qs(n,n.getShiftedBy(i))),n.offset=e,n.path.push(0)}return t}getWalker(t={}){return t.boundaries=this,new Bs(t)}*getItems(t={}){t.boundaries=this,t.ignoreElementEnd=!0;const e=new Bs(t);for(const t of e)yield t.item}*getPositions(t={}){t.boundaries=this;const e=new Bs(t);yield e.position;for(const t of e)yield t.nextPosition}getTransformedByOperation(t){switch(t.type){case"insert":return this._getTransformedByInsertOperation(t);case"move":case"remove":case"reinsert":return this._getTransformedByMoveOperation(t);case"split":return[this._getTransformedBySplitOperation(t)];case"merge":return[this._getTransformedByMergeOperation(t)]}return[new qs(this.start,this.end)]}getTransformedByOperations(t){const e=[new qs(this.start,this.end)];for(const n of t)for(let t=0;t<e.length;t++){const i=e[t].getTransformedByOperation(n);e.splice(t,1,...i),t+=i.length-1}for(let t=0;t<e.length;t++){const n=e[t];for(let i=t+1;i<e.length;i++){const t=e[i];(n.containsRange(t)||t.containsRange(n)||n.isEqual(t))&&e.splice(i,1)}}return e}getCommonAncestor(){return this.start.getCommonAncestor(this.end)}toJSON(){return{start:this.start.toJSON(),end:this.end.toJSON()}}clone(){return new this.constructor(this.start,this.end)}_getTransformedByInsertOperation(t,e=!1){return this._getTransformedByInsertion(t.position,t.howMany,e)}_getTransformedByMoveOperation(t,e=!1){const n=t.sourcePosition,i=t.howMany,o=t.targetPosition;return this._getTransformedByMove(n,o,i,e)}_getTransformedBySplitOperation(t){const e=this.start._getTransformedBySplitOperation(t);let n=this.end._getTransformedBySplitOperation(t);return this.end.isEqual(t.insertionPosition)&&(n=this.end.getShiftedBy(1)),e.root!=n.root&&(n=this.end.getShiftedBy(-1)),new qs(e,n)}_getTransformedByMergeOperation(t){let e=this.start._getTransformedByMergeOperation(t),n=this.end._getTransformedByMergeOperation(t);return e.root!=n.root&&(n=this.end.getShiftedBy(-1)),e.isAfter(n)?(t.sourcePosition.isBefore(t.targetPosition)?(e=Hs._createAt(n)).offset=0:(t.deletionPosition.isEqual(e)||(n=t.deletionPosition),e=t.targetPosition),new qs(e,n)):new qs(e,n)}_getTransformedByInsertion(t,e,n=!1){if(n&&this.containsPosition(t))return[new qs(this.start,t),new qs(t.getShiftedBy(e),this.end._getTransformedByInsertion(t,e))];{const n=new qs(this.start,this.end);return n.start=n.start._getTransformedByInsertion(t,e),n.end=n.end._getTransformedByInsertion(t,e),[n]}}_getTransformedByMove(t,e,n,i=!1){if(this.isCollapsed){const i=this.start._getTransformedByMove(t,e,n);return[new qs(i)]}const o=qs._createFromPositionAndShift(t,n),r=e._getTransformedByDeletion(t,n);if(this.containsPosition(e)&&!i&&(o.containsPosition(this.start)||o.containsPosition(this.end))){const i=this.start._getTransformedByMove(t,e,n),o=this.end._getTransformedByMove(t,e,n);return[new qs(i,o)]}let s;const a=this.getDifference(o);let c=null;const l=this.getIntersection(o);if(1==a.length?c=new qs(a[0].start._getTransformedByDeletion(t,n),a[0].end._getTransformedByDeletion(t,n)):2==a.length&&(c=new qs(this.start,this.end._getTransformedByDeletion(t,n))),s=c?c._getTransformedByInsertion(r,n,null!==l||i):[],l){const t=new qs(l.start._getCombined(o.start,r),l.end._getCombined(o.start,r));2==s.length?s.splice(1,0,t):s.push(t)}return s}_getTransformedByDeletion(t,e){let n=this.start._getTransformedByDeletion(t,e),i=this.end._getTransformedByDeletion(t,e);return null==n&&null==i?null:(null==n&&(n=t),null==i&&(i=t),new qs(n,i))}static _createFromPositionAndShift(t,e){const n=t,i=t.getShiftedBy(e);return e>0?new this(n,i):new this(i,n)}static _createIn(t){return new this(Hs._createAt(t,0),Hs._createAt(t,t.maxOffset))}static _createOn(t){return this._createFromPositionAndShift(Hs._createBefore(t),t.offsetSize)}static _createFromRanges(t){if(0===t.length)throw new P.b("range-create-from-ranges-empty-array: At least one range has to be passed.");if(1==t.length)return t[0].clone();const e=t[0];t.sort((t,e)=>t.start.isAfter(e.start)?1:-1);const n=t.indexOf(e),i=new this(e.start,e.end);if(n>0)for(let e=n-1;t[e].end.isEqual(i.start);e++)i.start=Hs._createAt(t[e].start);for(let e=n+1;e<t.length&&t[e].start.isEqual(i.end);e++)i.end=Hs._createAt(t[e].end);return i}static fromJSON(t,e){return new this(Hs.fromJSON(t.start,e),Hs.fromJSON(t.end,e))}}class Ws{constructor(){this._modelToViewMapping=new WeakMap,this._viewToModelMapping=new WeakMap,this._viewToModelLengthCallbacks=new Map,this._markerNameToElements=new Map,this.on("modelToViewPosition",(t,e)=>{if(e.viewPosition)return;const n=this._modelToViewMapping.get(e.modelPosition.parent);e.viewPosition=this._findPositionIn(n,e.modelPosition.offset)},{priority:"low"}),this.on("viewToModelPosition",(t,e)=>{if(e.modelPosition)return;let n=e.viewPosition.parent,i=this._viewToModelMapping.get(n);for(;!i;)n=n.parent,i=this._viewToModelMapping.get(n);const o=this._toModelOffset(e.viewPosition.parent,e.viewPosition.offset,n);e.modelPosition=Hs._createAt(i,o)},{priority:"low"})}bindElements(t,e){this._modelToViewMapping.set(t,e),this._viewToModelMapping.set(e,t)}unbindViewElement(t){const e=this.toModelElement(t);this._viewToModelMapping.delete(t),this._modelToViewMapping.get(e)==t&&this._modelToViewMapping.delete(e)}unbindModelElement(t){const e=this.toViewElement(t);this._modelToViewMapping.delete(t),this._viewToModelMapping.get(e)==t&&this._viewToModelMapping.delete(e)}bindElementToMarker(t,e){const n=this._markerNameToElements.get(e)||new Set;n.add(t),this._markerNameToElements.set(e,n)}unbindElementsFromMarkerName(t){this._markerNameToElements.delete(t)}clearBindings(){this._modelToViewMapping=new WeakMap,this._viewToModelMapping=new WeakMap,this._markerNameToElements=new Map}toModelElement(t){return this._viewToModelMapping.get(t)}toViewElement(t){return this._modelToViewMapping.get(t)}toModelRange(t){return new qs(this.toModelPosition(t.start),this.toModelPosition(t.end))}toViewRange(t){return new Gi(this.toViewPosition(t.start),this.toViewPosition(t.end))}toModelPosition(t){const e={viewPosition:t,mapper:this};return this.fire("viewToModelPosition",e),e.modelPosition}toViewPosition(t,e={isPhantom:!1}){const n={modelPosition:t,mapper:this,isPhantom:e.isPhantom};return this.fire("modelToViewPosition",n),n.viewPosition}markerNameToElements(t){const e=this._markerNameToElements.get(t);if(!e)return null;const n=new Set;for(const t of e)if(t.is("attributeElement"))for(const e of t.getElementsWithSameId())n.add(e);else n.add(t);return n}registerViewToModelLength(t,e){this._viewToModelLengthCallbacks.set(t,e)}_toModelOffset(t,e,n){if(n!=t){return this._toModelOffset(t.parent,t.index,n)+this._toModelOffset(t,e,t)}if(t.is("text"))return e;let i=0;for(let n=0;n<e;n++)i+=this.getModelLength(t.getChild(n));return i}getModelLength(t){if(this._viewToModelLengthCallbacks.get(t.name)){return this._viewToModelLengthCallbacks.get(t.name)(t)}if(this._viewToModelMapping.has(t))return 1;if(t.is("text"))return t.data.length;if(t.is("uiElement"))return 0;{let e=0;for(const n of t.getChildren())e+=this.getModelLength(n);return e}}_findPositionIn(t,e){let n,i=0,o=0,r=0;if(t.is("text"))return new $i(t,e);for(;o<e;)n=t.getChild(r),o+=i=this.getModelLength(n),r++;return o==e?this._moveViewPositionToTextNode(new $i(t,r)):this._findPositionIn(n,e-(o-i))}_moveViewPositionToTextNode(t){const e=t.nodeBefore,n=t.nodeAfter;return e instanceof ci?new $i(e,e.data.length):n instanceof ci?new $i(n,0):t}}F(Ws,R);class Ys{constructor(){this._consumable=new Map,this._textProxyRegistry=new Map}add(t,e){e=$s(e),t instanceof js&&(t=this._getSymbolForTextProxy(t)),this._consumable.has(t)||this._consumable.set(t,new Map),this._consumable.get(t).set(e,!0)}consume(t,e){return e=$s(e),t instanceof js&&(t=this._getSymbolForTextProxy(t)),!!this.test(t,e)&&(this._consumable.get(t).set(e,!1),!0)}test(t,e){e=$s(e),t instanceof js&&(t=this._getSymbolForTextProxy(t));const n=this._consumable.get(t);if(void 0===n)return null;const i=n.get(e);return void 0===i?null:i}revert(t,e){e=$s(e),t instanceof js&&(t=this._getSymbolForTextProxy(t));const n=this.test(t,e);return!1===n?(this._consumable.get(t).set(e,!0),!0):!0!==n&&null}_getSymbolForTextProxy(t){let e=null;const n=this._textProxyRegistry.get(t.startOffset);if(n){const i=n.get(t.endOffset);i&&(e=i.get(t.parent))}return e||(e=this._addSymbolForTextProxy(t.startOffset,t.endOffset,t.parent)),e}_addSymbolForTextProxy(t,e,n){const i=Symbol("textProxySymbol");let o,r;return(o=this._textProxyRegistry.get(t))||(o=new Map,this._textProxyRegistry.set(t,o)),(r=o.get(e))||(r=new Map,o.set(e,r)),r.set(n,i),i}}function $s(t){const e=t.split(":");return e.length>1?e[0]+":"+e[1]:e[0]}class Gs{constructor(t={}){this.conversionApi=Ei({dispatcher:this},t)}convertChanges(t,e){for(const n of t.getMarkersToRemove())this.convertMarkerRemove(n.name,n.range,e);for(const n of t.getChanges())"insert"==n.type?this.convertInsert(qs._createFromPositionAndShift(n.position,n.length),e):"remove"==n.type?this.convertRemove(n.position,n.length,n.name,e):this.convertAttribute(n.range,n.attributeKey,n.attributeOldValue,n.attributeNewValue,e);for(const n of t.getMarkersToAdd())this.convertMarkerAdd(n.name,n.range,e)}convertInsert(t,e){this.conversionApi.writer=e,this.conversionApi.consumable=this._createInsertConsumable(t);for(const e of t){const t=e.item,n={item:t,range:qs._createFromPositionAndShift(e.previousPosition,e.length)};this._testAndFire("insert",n);for(const e of t.getAttributeKeys())n.attributeKey=e,n.attributeOldValue=null,n.attributeNewValue=t.getAttribute(e),this._testAndFire(`attribute:${e}`,n)}this._clearConversionApi()}convertRemove(t,e,n,i){this.conversionApi.writer=i,this.fire("remove:"+n,{position:t,length:e},this.conversionApi),this._clearConversionApi()}convertAttribute(t,e,n,i,o){this.conversionApi.writer=o,this.conversionApi.consumable=this._createConsumableForRange(t,`attribute:${e}`);for(const o of t){const t={item:o.item,range:qs._createFromPositionAndShift(o.previousPosition,o.length),attributeKey:e,attributeOldValue:n,attributeNewValue:i};this._testAndFire(`attribute:${e}`,t)}this._clearConversionApi()}convertSelection(t,e,n){const i=Array.from(e.getMarkersAtPosition(t.getFirstPosition()));if(this.conversionApi.writer=n,this.conversionApi.consumable=this._createSelectionConsumable(t,i),this.fire("selection",{selection:t},this.conversionApi),t.isCollapsed){for(const e of i){const n=e.getRange();if(!Qs(t.getFirstPosition(),e,this.conversionApi.mapper))continue;const i={item:t,markerName:e.name,markerRange:n};this.conversionApi.consumable.test(t,"addMarker:"+e.name)&&this.fire("addMarker:"+e.name,i,this.conversionApi)}for(const e of t.getAttributeKeys()){const n={item:t,range:t.getFirstRange(),attributeKey:e,attributeOldValue:null,attributeNewValue:t.getAttribute(e)};this.conversionApi.consumable.test(t,"attribute:"+n.attributeKey)&&this.fire("attribute:"+n.attributeKey,n,this.conversionApi)}this._clearConversionApi()}}convertMarkerAdd(t,e,n){if(!e.root.document||"$graveyard"==e.root.rootName)return;this.conversionApi.writer=n;const i="addMarker:"+t;if(e.isCollapsed){const n=new Ys;return n.add(e,i),this.conversionApi.consumable=n,void this.fire(i,{markerName:t,markerRange:e},this.conversionApi)}this.conversionApi.consumable=this._createConsumableForRange(e,i);for(const n of e.getItems()){if(!this.conversionApi.consumable.test(n,i))continue;const o={item:n,range:qs._createOn(n),markerName:t,markerRange:e};this.fire(i,o,this.conversionApi)}this._clearConversionApi()}convertMarkerRemove(t,e,n){e.root.document&&"$graveyard"!=e.root.rootName&&(this.conversionApi.writer=n,this.fire("removeMarker:"+t,{markerName:t,markerRange:e},this.conversionApi),this._clearConversionApi())}_createInsertConsumable(t){const e=new Ys;for(const n of t){const t=n.item;e.add(t,"insert");for(const n of t.getAttributeKeys())e.add(t,"attribute:"+n)}return e}_createConsumableForRange(t,e){const n=new Ys;for(const i of t.getItems())n.add(i,e);return n}_createSelectionConsumable(t,e){const n=new Ys;n.add(t,"selection");for(const i of e)n.add(t,"addMarker:"+i.name);for(const e of t.getAttributeKeys())n.add(t,"attribute:"+e);return n}_testAndFire(t,e){if(!this.conversionApi.consumable.test(e.item,t))return;const n=e.item.name||"$text";this.fire(t+":"+n,e,this.conversionApi)}_clearConversionApi(){delete this.conversionApi.writer,delete this.conversionApi.consumable}}function Qs(t,e,n){const i=e.getRange(),o=Array.from(t.getAncestors());return o.shift(),o.reverse(),!o.some(t=>{if(i.containsItem(t)){return!!n.toViewElement(t).getCustomProperty("addHighlight")}})}F(Gs,R);class Js{constructor(t,e,n){this._lastRangeBackward=!1,this._ranges=[],this._attrs=new Map,t&&this.setTo(t,e,n)}get anchor(){if(this._ranges.length>0){const t=this._ranges[this._ranges.length-1];return this._lastRangeBackward?t.end:t.start}return null}get focus(){if(this._ranges.length>0){const t=this._ranges[this._ranges.length-1];return this._lastRangeBackward?t.start:t.end}return null}get isCollapsed(){return 1===this._ranges.length&&this._ranges[0].isCollapsed}get rangeCount(){return this._ranges.length}get isBackward(){return!this.isCollapsed&&this._lastRangeBackward}isEqual(t){if(this.rangeCount!=t.rangeCount)return!1;if(0===this.rangeCount)return!0;if(!this.anchor.isEqual(t.anchor)||!this.focus.isEqual(t.focus))return!1;for(const e of this._ranges){let n=!1;for(const i of t._ranges)if(e.isEqual(i)){n=!0;break}if(!n)return!1}return!0}*getRanges(){for(const t of this._ranges)yield new qs(t.start,t.end)}getFirstRange(){let t=null;for(const e of this._ranges)t&&!e.start.isBefore(t.start)||(t=e);return t?new qs(t.start,t.end):null}getLastRange(){let t=null;for(const e of this._ranges)t&&!e.end.isAfter(t.end)||(t=e);return t?new qs(t.start,t.end):null}getFirstPosition(){const t=this.getFirstRange();return t?t.start.clone():null}getLastPosition(){const t=this.getLastRange();return t?t.end.clone():null}setTo(t,e,n){if(null===t)this._setRanges([]);else if(t instanceof Js)this._setRanges(t.getRanges(),t.isBackward);else if(t&&"function"==typeof t.getRanges)this._setRanges(t.getRanges(),t.isBackward);else if(t instanceof qs)this._setRanges([t],!!e&&!!e.backward);else if(t instanceof Hs)this._setRanges([new qs(t)]);else if(t instanceof Ds){const i=!!n&&!!n.backward;let o;if("in"==e)o=qs._createIn(t);else if("on"==e)o=qs._createOn(t);else{if(void 0===e)throw new P.b("model-selection-setTo-required-second-parameter: selection.setTo requires the second parameter when the first parameter is a node.");o=new qs(Hs._createAt(t,e))}this._setRanges([o],i)}else{if(!ui(t))throw new P.b("model-selection-setTo-not-selectable: Cannot set selection to given place.");this._setRanges(t,e&&!!e.backward)}}_setRanges(t,e=!1){const n=(t=Array.from(t)).some(t=>{if(!(t instanceof qs))throw new P.b("model-selection-set-ranges-not-range: Selection range set to an object that is not an instance of model.Range.");return this._ranges.every(e=>!e.isEqual(t))});if(t.length!==this._ranges.length||n){this._removeAllRanges();for(const e of t)this._pushRange(e);this._lastRangeBackward=!!e,this.fire("change:range",{directChange:!0})}}setFocus(t,e){if(null===this.anchor)throw new P.b("model-selection-setFocus-no-ranges: Cannot set selection focus if there are no ranges in selection.");const n=Hs._createAt(t,e);if("same"==n.compareWith(this.focus))return;const i=this.anchor;this._ranges.length&&this._popRange(),"before"==n.compareWith(i)?(this._pushRange(new qs(n,i)),this._lastRangeBackward=!0):(this._pushRange(new qs(i,n)),this._lastRangeBackward=!1),this.fire("change:range",{directChange:!0})}getAttribute(t){return this._attrs.get(t)}getAttributes(){return this._attrs.entries()}getAttributeKeys(){return this._attrs.keys()}hasAttribute(t){return this._attrs.has(t)}removeAttribute(t){this.hasAttribute(t)&&(this._attrs.delete(t),this.fire("change:attribute",{attributeKeys:[t],directChange:!0}))}setAttribute(t,e){this.getAttribute(t)!==e&&(this._attrs.set(t,e),this.fire("change:attribute",{attributeKeys:[t],directChange:!0}))}getSelectedElement(){if(1!==this.rangeCount)return null;const t=this.getFirstRange(),e=t.start.nodeAfter,n=t.end.nodeBefore;return e instanceof zs&&e==n?e:null}*getSelectedBlocks(){const t=new WeakSet;for(const e of this.getRanges()){const n=Zs(e.start,t);n&&(yield n);for(const n of e.getWalker())"elementEnd"==n.type&&Ks(n.item,t)&&(yield n.item);const i=Zs(e.end,t);i&&!e.end.isTouching(Hs._createAt(i,0))&&(yield i)}}containsEntireContent(t=this.anchor.root){const e=Hs._createAt(t,0),n=Hs._createAt(t,"end");return e.isTouching(this.getFirstPosition())&&n.isTouching(this.getLastPosition())}_pushRange(t){this._checkRange(t),this._ranges.push(new qs(t.start,t.end))}_checkRange(t){for(let e=0;e<this._ranges.length;e++)if(t.isIntersecting(this._ranges[e]))throw new P.b("model-selection-range-intersects: Trying to add a range that intersects with another range in the selection.",{addedRange:t,intersectingRange:this._ranges[e]})}_removeAllRanges(){for(;this._ranges.length>0;)this._popRange()}_popRange(){this._ranges.pop()}}function Ks(t,e){return!e.has(t)&&(e.add(t),t.document.model.schema.isBlock(t)&&t.parent)}function Zs(t,e){const n=t.parent.getAncestors({parentFirst:!0,includeSelf:!0}),i=n.find(t=>Ks(t,e));return n.forEach(t=>e.add(t)),i}F(Js,R);class Xs extends qs{constructor(t,e){super(t,e),function(){this.listenTo(this.root.document.model,"applyOperation",(t,e)=>{const n=e[0];n.isDocumentOperation&&function(t){const e=this.getTransformedByOperation(t),n=qs._createFromRanges(e),i=!n.isEqual(this),o=function(t,e){switch(e.type){case"insert":return t.containsPosition(e.position);case"move":case"remove":case"reinsert":case"merge":return t.containsPosition(e.sourcePosition)||t.start.isEqual(e.sourcePosition)||t.containsPosition(e.targetPosition);case"split":return t.containsPosition(e.splitPosition)||t.containsPosition(e.insertionPosition)}return!1}(this,t);let r=null;if(i){"$graveyard"==n.root.rootName&&(r="remove"==t.type?t.sourcePosition:t.deletionPosition);const e=this.toRange();this.start=n.start,this.end=n.end,this.fire("change:range",e,{deletionPosition:r})}else o&&this.fire("change:content",this.toRange(),{deletionPosition:r})}.call(this,n)},{priority:"low"})}.call(this)}detach(){this.stopListening()}toRange(){return new qs(this.start,this.end)}static fromRange(t){return new Xs(t.start,t.end)}}F(Xs,R);const ta="selection:";class ea{constructor(t){this._selection=new na(t),this._selection.delegate("change:range").to(this),this._selection.delegate("change:attribute").to(this)}get isCollapsed(){return this._selection.isCollapsed}get anchor(){return this._selection.anchor}get focus(){return this._selection.focus}get rangeCount(){return this._selection.rangeCount}get hasOwnRange(){return this._selection.hasOwnRange}get isBackward(){return this._selection.isBackward}get isGravityOverridden(){return this._selection.isGravityOverridden}get _ranges(){return this._selection._ranges}getRanges(){return this._selection.getRanges()}getFirstPosition(){return this._selection.getFirstPosition()}getLastPosition(){return this._selection.getLastPosition()}getFirstRange(){return this._selection.getFirstRange()}getLastRange(){return this._selection.getLastRange()}getSelectedBlocks(){return this._selection.getSelectedBlocks()}getSelectedElement(){return this._selection.getSelectedElement()}containsEntireContent(t){return this._selection.containsEntireContent(t)}destroy(){this._selection.destroy()}getAttributeKeys(){return this._selection.getAttributeKeys()}getAttributes(){return this._selection.getAttributes()}getAttribute(t){return this._selection.getAttribute(t)}hasAttribute(t){return this._selection.hasAttribute(t)}_setFocus(t,e){this._selection.setFocus(t,e)}_setTo(t,e,n){this._selection.setTo(t,e,n)}_setAttribute(t,e){this._selection.setAttribute(t,e)}_removeAttribute(t){this._selection.removeAttribute(t)}_getStoredAttributes(){return this._selection._getStoredAttributes()}_overrideGravity(){return this._selection.overrideGravity()}_restoreGravity(t){this._selection.restoreGravity(t)}static _getStoreAttributeKey(t){return ta+t}static _isStoreAttributeKey(t){return t.startsWith(ta)}}F(ea,R);class na extends Js{constructor(t){super(),this._model=t.model,this._document=t,this._attributePriority=new Map,this._fixGraveyardRangesData=[],this._hasChangedRange=!1,this._overriddenGravityRegister=new Set,this.on("change:range",()=>{for(const t of this.getRanges())if(!this._document._validateSelectionRange(t))throw new P.b("document-selection-wrong-position: Range from document selection starts or ends at incorrect position.",{range:t})}),this.listenTo(this._document,"change",(t,e)=>{this._updateAttributes(!1),function(t,e){const n=t.document.differ;for(const i of n.getChanges()){if("insert"!=i.type)continue;const n=i.position.parent,o=i.length===n.maxOffset;o&&t.enqueueChange(e,t=>{const e=Array.from(n.getAttributeKeys()).filter(t=>t.startsWith(ta));for(const i of e)t.removeAttribute(i,n)})}}(this._model,e)}),this.listenTo(this._model,"applyOperation",()=>{for(;this._fixGraveyardRangesData.length;){const{liveRange:t,sourcePosition:e}=this._fixGraveyardRangesData.shift();this._fixGraveyardSelection(t,e)}this._hasChangedRange&&(this._hasChangedRange=!1,this.fire("change:range",{directChange:!1}))},{priority:"lowest"})}get isCollapsed(){return 0===this._ranges.length?this._document._getDefaultRange().isCollapsed:super.isCollapsed}get anchor(){return super.anchor||this._document._getDefaultRange().start}get focus(){return super.focus||this._document._getDefaultRange().end}get rangeCount(){return this._ranges.length?this._ranges.length:1}get hasOwnRange(){return this._ranges.length>0}get isGravityOverridden(){return!!this._overriddenGravityRegister.size}destroy(){for(let t=0;t<this._ranges.length;t++)this._ranges[t].detach();this.stopListening()}*getRanges(){this._ranges.length?yield*super.getRanges():yield this._document._getDefaultRange()}getFirstRange(){return super.getFirstRange()||this._document._getDefaultRange()}getLastRange(){return super.getLastRange()||this._document._getDefaultRange()}setTo(t,e,n){super.setTo(t,e,n),this._refreshAttributes()}setFocus(t,e){super.setFocus(t,e),this._refreshAttributes()}setAttribute(t,e){if(this._setAttribute(t,e)){const e=[t];this.fire("change:attribute",{attributeKeys:e,directChange:!0})}}removeAttribute(t){if(this._removeAttribute(t)){const e=[t];this.fire("change:attribute",{attributeKeys:e,directChange:!0})}}overrideGravity(){const t=I();return this._overriddenGravityRegister.add(t),1===this._overriddenGravityRegister.size&&this._refreshAttributes(),t}restoreGravity(t){if(!this._overriddenGravityRegister.has(t))throw new P.b("document-selection-gravity-wrong-restore: Attempting to restore the selection gravity for an unknown UID.",{uid:t});this._overriddenGravityRegister.delete(t),this.isGravityOverridden||this._refreshAttributes()}_refreshAttributes(){this._updateAttributes(!0)}_popRange(){this._ranges.pop().detach()}_pushRange(t){const e=this._prepareRange(t);e&&this._ranges.push(e)}_prepareRange(t){if(this._checkRange(t),t.root==this._document.graveyard)return void fs.a.warn("model-selection-range-in-graveyard: Trying to add a Range that is in the graveyard root. Range rejected.");const e=Xs.fromRange(t);return e.on("change:range",(t,n,i)=>{this._hasChangedRange=!0,e.root==this._document.graveyard&&this._fixGraveyardRangesData.push({liveRange:e,sourcePosition:i.deletionPosition})}),e}_updateAttributes(t){const e=Rs(this._getSurroundingAttributes()),n=Rs(this.getAttributes());if(t)this._attributePriority=new Map,this._attrs=new Map;else for(const[t,e]of this._attributePriority)"low"==e&&(this._attrs.delete(t),this._attributePriority.delete(t));this._setAttributesTo(e);const i=[];for(const[t,e]of this.getAttributes())n.has(t)&&n.get(t)===e||i.push(t);for(const[t]of n)this.hasAttribute(t)||i.push(t);i.length>0&&this.fire("change:attribute",{attributeKeys:i,directChange:!1})}_setAttribute(t,e,n=!0){const i=n?"normal":"low";return("low"!=i||"normal"!=this._attributePriority.get(t))&&(super.getAttribute(t)!==e&&(this._attrs.set(t,e),this._attributePriority.set(t,i),!0))}_removeAttribute(t,e=!0){const n=e?"normal":"low";return("low"!=n||"normal"!=this._attributePriority.get(t))&&(this._attributePriority.set(t,n),!!super.hasAttribute(t)&&(this._attrs.delete(t),!0))}_setAttributesTo(t){const e=new Set;for(const[e,n]of this.getAttributes())t.get(e)!==n&&this._removeAttribute(e,!1);for(const[n,i]of t){this._setAttribute(n,i,!1)&&e.add(n)}return e}*_getStoredAttributes(){const t=this.getFirstPosition().parent;if(this.isCollapsed&&t.isEmpty)for(const e of t.getAttributeKeys())if(e.startsWith(ta)){yield[e.substr(ta.length),t.getAttribute(e)]}}_getSurroundingAttributes(){const t=this.getFirstPosition(),e=this._model.schema;let n=null;if(this.isCollapsed){const e=t.textNode?t.textNode:t.nodeBefore,i=t.textNode?t.textNode:t.nodeAfter;if(this.isGravityOverridden||(n=ia(e)),n||(n=ia(i)),!this.isGravityOverridden&&!n){let t=e;for(;t&&!n;)n=ia(t=t.previousSibling)}if(!n){let t=i;for(;t&&!n;)n=ia(t=t.nextSibling)}n||(n=this._getStoredAttributes())}else{const t=this.getFirstRange();for(const i of t){if(i.item.is("element")&&e.isObject(i.item))break;"text"==i.type&&null===n&&(n=i.item.getAttributes())}}return n}_fixGraveyardSelection(t,e){const n=e.clone(),i=this._model.schema.getNearestSelectionRange(n),o=this._ranges.indexOf(t);if(this._ranges.splice(o,1),t.detach(),i){const t=this._prepareRange(i);this._ranges.splice(o,0,t)}}}function ia(t){return t instanceof js||t instanceof Ls?t.getAttributes():null}var oa=1,ra=4;var sa=function(t){return oi(t,oa|ra)};function aa(t){return(t=sa(t)).view=da(t.view,"container"),e=>{e.on("insert:"+t.model,function(t){return(e,n,i)=>{const o=t(n.item,i.writer);if(!o)return;if(!i.consumable.consume(n.item,"insert"))return;const r=i.mapper.toViewPosition(n.range.start);i.mapper.bindElements(n.item,o),i.writer.insert(r,o)}}(t.view),{priority:t.converterPriority||"normal"})}}function ca(t){let e="attribute:"+((t=sa(t)).model.key?t.model.key:t.model);if(t.model.name&&(e+=":"+t.model.name),t.model.values)for(const e of t.model.values)t.view[e]=da(t.view[e],"attribute");else t.view=da(t.view,"attribute");const n=ua(t);return i=>{i.on(e,function(t){return(e,n,i)=>{const o=t(n.attributeOldValue,i.writer),r=t(n.attributeNewValue,i.writer);if(!o&&!r)return;if(!i.consumable.consume(n.item,e.name))return;const s=i.writer,a=s.document.selection;if(n.item instanceof Js||n.item instanceof ea)s.wrap(a.getFirstRange(),r);else{let t=i.mapper.toViewRange(n.range);null!==n.attributeOldValue&&o&&(t=s.unwrap(t,o)),null!==n.attributeNewValue&&r&&s.wrap(t,r)}}}(n),{priority:t.converterPriority||"normal"})}}function la(t){let e="attribute:"+((t=sa(t)).model.key?t.model.key:t.model);if(t.model.name&&(e+=":"+t.model.name),t.model.values)for(const e of t.model.values)t.view[e]=ha(t.view[e]);else t.view=ha(t.view);const n=ua(t);return i=>{i.on(e,function(t){return t=t||((t,e)=>({value:t,key:e.attributeKey})),(e,n,i)=>{const o=t(n.attributeOldValue,n),r=t(n.attributeNewValue,n);if(!o&&!r)return;if(!i.consumable.consume(n.item,e.name))return;const s=i.mapper.toViewElement(n.item),a=i.writer;if(s){if(null!==n.attributeOldValue&&o)if("class"==o.key){const t=Array.isArray(o.value)?o.value:[o.value];for(const e of t)a.removeClass(e,s)}else if("style"==o.key){const t=Object.keys(o.value);for(const e of t)a.removeStyle(e,s)}else a.removeAttribute(o.key,s);if(null!==n.attributeNewValue&&r)if("class"==r.key){const t=Array.isArray(r.value)?r.value:[r.value];for(const e of t)a.addClass(e,s)}else if("style"==r.key){const t=Object.keys(r.value);for(const e of t)a.setStyle(e,r.value[e],s)}else a.setAttribute(r.key,r.value,s)}else fs.a.warn("conversion-attribute-to-attribute-on-text: Trying to convert text node's attribute with attribute-to-attribute converter.")}}(n),{priority:t.converterPriority||"normal"})}}function da(t,e){return"function"==typeof t?t:(n,i)=>(function(t,e,n){"string"==typeof t&&(t={name:t});let i;const o=Object.assign({},t.attributes);if("container"==n)i=e.createContainerElement(t.name,o);else if("attribute"==n){const n={priority:t.priority||no.DEFAULT_PRIORITY};i=e.createAttributeElement(t.name,o,n)}else i=e.createUIElement(t.name,o);if(t.styles){const n=Object.keys(t.styles);for(const o of n)e.setStyle(o,t.styles[o],i)}if(t.classes){const n=t.classes;if("string"==typeof n)e.addClass(n,i);else for(const t of n)e.addClass(t,i)}return i})(t,i,e)}function ua(t){return t.model.values?(e,n)=>{const i=t.view[e];return i?i(e,n):null}:t.view}function ha(t){return"string"==typeof t?e=>({key:t,value:e}):"object"==typeof t?t.value?()=>t:e=>({key:t.key,value:e}):t}class fa{constructor(t){this.model=t,this.view=new Os,this.mapper=new Ws,this.downcastDispatcher=new Gs({mapper:this.mapper});const e=this.model.document,n=e.selection,i=this.model.markers;this.listenTo(this.model,"_beforeChanges",()=>{this.view._renderingDisabled=!0},{priority:"highest"}),this.listenTo(this.model,"_afterChanges",()=>{this.view._renderingDisabled=!1,this.view.render()},{priority:"lowest"}),this.listenTo(e,"change",()=>{this.view.change(t=>{this.downcastDispatcher.convertChanges(e.differ,t),this.downcastDispatcher.convertSelection(n,i,t)})},{priority:"low"}),this.listenTo(this.view.document,"selectionChange",function(t,e){return(n,i)=>{const o=i.newSelection,r=new Js,s=[];for(const t of o.getRanges())s.push(e.toModelRange(t));r.setTo(s,{backward:o.isBackward}),r.isEqual(t.document.selection)||t.change(t=>{t.setSelection(r)})}}(this.model,this.mapper)),this.downcastDispatcher.on("insert:$text",(t,e,n)=>{if(!n.consumable.consume(e.item,"insert"))return;const i=n.writer,o=n.mapper.toViewPosition(e.range.start),r=i.createText(e.item.data);i.insert(o,r)},{priority:"lowest"}),this.downcastDispatcher.on("remove",(t,e,n)=>{const i=n.mapper.toViewPosition(e.position),o=e.position.getShiftedBy(e.length),r=n.mapper.toViewPosition(o,{isPhantom:!0}),s=n.writer.createRange(i,r),a=n.writer.remove(s.getTrimmed());for(const t of n.writer.createRangeIn(a).getItems())n.mapper.unbindViewElement(t)},{priority:"low"}),this.downcastDispatcher.on("selection",(t,e,n)=>{const i=n.writer,o=i.document.selection;for(const t of o.getRanges())t.isCollapsed&&t.end.parent.document&&n.writer.mergeAttributes(t.start);i.setSelection(null)},{priority:"low"}),this.downcastDispatcher.on("selection",(t,e,n)=>{const i=e.selection;if(i.isCollapsed)return;if(!n.consumable.consume(i,"selection"))return;const o=[];for(const t of i.getRanges()){const e=n.mapper.toViewRange(t);o.push(e)}n.writer.setSelection(o,{backward:i.isBackward})},{priority:"low"}),this.downcastDispatcher.on("selection",(t,e,n)=>{const i=e.selection;if(!i.isCollapsed)return;if(!n.consumable.consume(i,"selection"))return;const o=n.writer,r=i.getFirstPosition(),s=n.mapper.toViewPosition(r),a=o.breakAttributes(s);o.setSelection(a)},{priority:"low"}),this.view.document.roots.bindTo(this.model.document.roots).using(t=>{if("$graveyard"==t.rootName)return null;const e=new Wi(t.name);return e.rootName=t.rootName,e._document=this.view.document,this.mapper.bindElements(t,e),e})}destroy(){this.view.destroy(),this.stopListening()}}F(fa,Li);class ma{constructor(t,e=[]){this._editor=t,this._availablePlugins=new Map,this._plugins=new Map;for(const t of e)this._availablePlugins.set(t,t),t.pluginName&&this._availablePlugins.set(t.pluginName,t)}*[Symbol.iterator](){for(const t of this._plugins)"function"==typeof t[0]&&(yield t)}get(t){return this._plugins.get(t)}load(t,e=[]){const n=this,i=this._editor,o=new Set,r=[],s=u(t),a=u(e),c=function(t){const e=[];for(const n of t)d(n)||e.push(n);return e.length?e:null}(t);if(c){const t="plugincollection-plugin-not-found: Some plugins are not available and could not be loaded.";return fs.a.error(t,{plugins:c}),Promise.reject(new P.b(t,{plugins:c}))}return Promise.all(s.map(l)).then(()=>r);function l(t){if(!a.includes(t)&&!n.get(t)&&!o.has(t))return function(t){return new Promise(s=>{o.add(t),t.requires&&t.requires.forEach(n=>{const i=d(n);if(e.includes(i))throw new P.b("plugincollection-required: Cannot load a plugin because one of its dependencies is listed inthe `removePlugins` option.",{plugin:i,requiredBy:t});l(i)});const a=new t(i);n._add(t,a),r.push(a),s()})}(t).catch(e=>{throw fs.a.error("plugincollection-load: It was not possible to load the plugin.",{plugin:t}),e})}function d(t){return"function"==typeof t?t:n._availablePlugins.get(t)}function u(t){return t.map(t=>d(t)).filter(t=>!!t)}}destroy(){const t=Array.from(this).map(([,t])=>t).filter(t=>"function"==typeof t.destroy).map(t=>t.destroy());return Promise.all(t)}_add(t,e){this._plugins.set(t,e);const n=t.pluginName;n&&(this._plugins.has(n)?fs.a.warn("plugincollection-plugin-name-conflict: Two plugins with the same name were loaded.",{pluginName:n,plugin1:this._plugins.get(n).constructor,plugin2:t}):this._plugins.set(n,e))}}class pa{constructor(){this._commands=new Map}add(t,e){this._commands.set(t,e)}get(t){return this._commands.get(t)}execute(t,...e){const n=this.get(t);if(!n)throw new P.b("commandcollection-command-not-found: Command does not exist.",{commandName:t});n.execute(...e)}*names(){yield*this._commands.keys()}*commands(){yield*this._commands.values()}[Symbol.iterator](){return this._commands[Symbol.iterator]()}destroy(){for(const t of this.commands())t.destroy()}}function ga(t,e){const n=Object.keys(window.CKEDITOR_TRANSLATIONS).length;return 1===n&&(t=Object.keys(window.CKEDITOR_TRANSLATIONS)[0]),0!==n&&function(t,e){return t in window.CKEDITOR_TRANSLATIONS&&e in window.CKEDITOR_TRANSLATIONS[t]}(t,e)?window.CKEDITOR_TRANSLATIONS[t][e].replace(/ \[context: [^\]]+\]$/,""):e.replace(/ \[context: [^\]]+\]$/,"")}window.CKEDITOR_TRANSLATIONS||(window.CKEDITOR_TRANSLATIONS={});class ba{constructor(t){this.language=t||"en",this.t=((...t)=>this._t(...t))}_t(t,e){let n=ga(this.language,t);return e&&(n=n.replace(/%(\d+)/g,(t,n)=>n<e.length?e[n]:t)),n}}class wa{constructor(){this._consumables=new Map}add(t,e){let n;t.is("text")||t.is("documentFragment")?this._consumables.set(t,!0):(this._consumables.has(t)?n=this._consumables.get(t):(n=new _a,this._consumables.set(t,n)),n.add(e))}test(t,e){const n=this._consumables.get(t);return void 0===n?null:t.is("text")||t.is("documentFragment")?n:n.test(e)}consume(t,e){return!!this.test(t,e)&&(t.is("text")||t.is("documentFragment")?this._consumables.set(t,!1):this._consumables.get(t).consume(e),!0)}revert(t,e){const n=this._consumables.get(t);void 0!==n&&(t.is("text")||t.is("documentFragment")?this._consumables.set(t,!0):n.revert(e))}static consumablesFromElement(t){const e={name:!0,attributes:[],classes:[],styles:[]},n=t.getAttributeKeys();for(const t of n)"style"!=t&&"class"!=t&&e.attributes.push(t);const i=t.getClassNames();for(const t of i)e.classes.push(t);const o=t.getStyleNames();for(const t of o)e.styles.push(t);return e}static createFrom(t,e){if(e||(e=new wa),t.is("text"))return e.add(t),e;t.is("element")&&e.add(t,wa.consumablesFromElement(t)),t.is("documentFragment")&&e.add(t);for(const n of t.getChildren())e=wa.createFrom(n,e);return e}}class _a{constructor(){this._canConsumeName=null,this._consumables={attributes:new Map,styles:new Map,classes:new Map}}add(t){t.name&&(this._canConsumeName=!0);for(const e in this._consumables)e in t&&this._add(e,t[e])}test(t){if(t.name&&!this._canConsumeName)return this._canConsumeName;for(const e in this._consumables)if(e in t){const n=this._test(e,t[e]);if(!0!==n)return n}return!0}consume(t){t.name&&(this._canConsumeName=!1);for(const e in this._consumables)e in t&&this._consume(e,t[e])}revert(t){t.name&&(this._canConsumeName=!0);for(const e in this._consumables)e in t&&this._revert(e,t[e])}_add(t,e){const n=ce(e)?e:[e],i=this._consumables[t];for(const e of n){if("attributes"===t&&("class"===e||"style"===e))throw new P.b("viewconsumable-invalid-attribute: Classes and styles should be handled separately.");i.set(e,!0)}}_test(t,e){const n=ce(e)?e:[e],i=this._consumables[t];for(const e of n)if("attributes"!==t||"class"!==e&&"style"!==e){const t=i.get(e);if(void 0===t)return null;if(!t)return!1}else{const t="class"==e?"classes":"styles",n=this._test(t,[...this._consumables[t].keys()]);if(!0!==n)return n}return!0}_consume(t,e){const n=ce(e)?e:[e],i=this._consumables[t];for(const e of n)if("attributes"!==t||"class"!==e&&"style"!==e)i.set(e,!1);else{const t="class"==e?"classes":"styles";this._consume(t,[...this._consumables[t].keys()])}}_revert(t,e){const n=ce(e)?e:[e],i=this._consumables[t];for(const e of n)if("attributes"!==t||"class"!==e&&"style"!==e){!1===i.get(e)&&i.set(e,!0)}else{const t="class"==e?"classes":"styles";this._revert(t,[...this._consumables[t].keys()])}}}class ka{constructor(){this._sourceDefinitions={},this.decorate("checkChild"),this.decorate("checkAttribute"),this.on("checkAttribute",(t,e)=>{e[0]=new va(e[0])},{priority:"highest"}),this.on("checkChild",(t,e)=>{e[0]=new va(e[0]),e[1]=this.getDefinition(e[1])},{priority:"highest"})}register(t,e){if(this._sourceDefinitions[t])throw new P.b("schema-cannot-register-item-twice: A single item cannot be registered twice in the schema.",{itemName:t});this._sourceDefinitions[t]=[Object.assign({},e)],this._clearCache()}extend(t,e){if(!this._sourceDefinitions[t])throw new P.b("schema-cannot-extend-missing-item: Cannot extend an item which was not registered yet.",{itemName:t});this._sourceDefinitions[t].push(Object.assign({},e)),this._clearCache()}getDefinitions(){return this._compiledDefinitions||this._compile(),this._compiledDefinitions}getDefinition(t){let e;return e="string"==typeof t?t:t.is&&(t.is("text")||t.is("textProxy"))?"$text":t.name,this.getDefinitions()[e]}isRegistered(t){return!!this.getDefinition(t)}isBlock(t){const e=this.getDefinition(t);return!(!e||!e.isBlock)}isLimit(t){const e=this.getDefinition(t);return!!e&&!(!e.isLimit&&!e.isObject)}isObject(t){const e=this.getDefinition(t);return!(!e||!e.isObject)}checkChild(t,e){return!!e&&this._checkContextMatch(e,t)}checkAttribute(t,e){const n=this.getDefinition(t.last);return!!n&&n.allowAttributes.includes(e)}checkMerge(t,e=null){if(t instanceof Hs){const e=t.nodeBefore,n=t.nodeAfter;if(!(e instanceof zs))throw new P.b("schema-check-merge-no-element-before: The node before the merge position must be an element.");if(!(n instanceof zs))throw new P.b("schema-check-merge-no-element-after: The node after the merge position must be an element.");return this.checkMerge(e,n)}for(const n of e.getChildren())if(!this.checkChild(t,n))return!1;return!0}addChildCheck(t){this.on("checkChild",(e,[n,i])=>{if(!i)return;const o=t(n,i);"boolean"==typeof o&&(e.stop(),e.return=o)},{priority:"high"})}addAttributeCheck(t){this.on("checkAttribute",(e,[n,i])=>{const o=t(n,i);"boolean"==typeof o&&(e.stop(),e.return=o)},{priority:"high"})}getLimitElement(t){let e;if(t instanceof Hs)e=t.parent;else{e=(t instanceof qs?[t]:Array.from(t.getRanges())).reduce((t,e)=>{const n=e.getCommonAncestor();return t?t.getCommonAncestor(n,{includeSelf:!0}):n},null)}for(;!this.isLimit(e)&&e.parent;)e=e.parent;return e}checkAttributeInSelection(t,e){if(t.isCollapsed){const n=[...t.getFirstPosition().getAncestors(),new Ls("",t.getAttributes())];return this.checkAttribute(n,e)}{const n=t.getRanges();for(const t of n)for(const n of t)if(this.checkAttribute(n.item,e))return!0}return!1}*getValidRanges(t,e){t=function*(t){for(const e of t)yield*e.getMinimalFlatRanges()}(t);for(const n of t)yield*this._getValidRangesForRange(n,e)}*_getValidRangesForRange(t,e){let n=t.start,i=t.start;for(const o of t.getItems({shallow:!0}))o.is("element")&&(yield*this._getValidRangesForRange(qs._createIn(o),e)),this.checkAttribute(o,e)||(n.isEqual(i)||(yield new qs(n,i)),n=Hs._createAfter(o)),i=Hs._createAfter(o);n.isEqual(i)||(yield new qs(n,i))}getNearestSelectionRange(t,e="both"){if(this.checkChild(t,"$text"))return new qs(t);let n,i;"both"!=e&&"backward"!=e||(n=new Bs({startPosition:t,direction:"backward"})),"both"!=e&&"forward"!=e||(i=new Bs({startPosition:t}));for(const t of function*(t,e){let n=!1;for(;!n;){if(n=!0,t){const e=t.next();e.done||(n=!1,yield{walker:t,value:e.value})}if(e){const t=e.next();t.done||(n=!1,yield{walker:e,value:t.value})}}}(n,i)){const e=t.walker==n?"elementEnd":"elementStart",i=t.value;if(i.type==e&&this.isObject(i.item))return qs._createOn(i.item);if(this.checkChild(i.nextPosition,"$text"))return new qs(i.nextPosition)}return null}findAllowedParent(t,e){let n=e.parent;for(;n;){if(this.checkChild(n,t))return n;if(this.isLimit(n))return null;n=n.parent}return null}removeDisallowedAttributes(t,e){for(const n of t){for(const t of n.getAttributeKeys())this.checkAttribute(n,t)||e.removeAttribute(t,n);n.is("element")&&this.removeDisallowedAttributes(n.getChildren(),e)}}createContext(t){return new va(t)}_clearCache(){this._compiledDefinitions=null}_compile(){const t={},e=this._sourceDefinitions,n=Object.keys(e);for(const i of n)t[i]=ya(e[i],i);for(const e of n)xa(t,e);for(const e of n)Aa(t,e);for(const e of n)Ca(t,e),Ta(t,e);for(const e of n)Pa(t,e),Ma(t,e);this._compiledDefinitions=t}_checkContextMatch(t,e,n=e.length-1){const i=e.getItem(n);if(t.allowIn.includes(i.name)){if(0==n)return!0;{const t=this.getDefinition(i);return this._checkContextMatch(t,e,n-1)}}return!1}}F(ka,Li);class va{constructor(t){if(t instanceof va)return t;"string"==typeof t?t=[t]:Array.isArray(t)||(t=t.getAncestors({includeSelf:!0})),t[0]&&"string"!=typeof t[0]&&t[0].is("documentFragment")&&t.shift(),this._items=t.map(Ea)}get length(){return this._items.length}get last(){return this._items[this._items.length-1]}[Symbol.iterator](){return this._items[Symbol.iterator]()}push(t){const e=new va([t]);return e._items=[...this._items,...e._items],e}getItem(t){return this._items[t]}*getNames(){yield*this._items.map(t=>t.name)}endsWith(t){return Array.from(this.getNames()).join(" ").endsWith(t)}}function ya(t,e){const n={name:e,allowIn:[],allowContentOf:[],allowWhere:[],allowAttributes:[],allowAttributesOf:[],inheritTypesFrom:[]};return function(t,e){for(const n of t){const t=Object.keys(n).filter(t=>t.startsWith("is"));for(const i of t)e[i]=n[i]}}(t,n),Sa(t,n,"allowIn"),Sa(t,n,"allowContentOf"),Sa(t,n,"allowWhere"),Sa(t,n,"allowAttributes"),Sa(t,n,"allowAttributesOf"),Sa(t,n,"inheritTypesFrom"),function(t,e){for(const n of t){const t=n.inheritAllFrom;t&&(e.allowContentOf.push(t),e.allowWhere.push(t),e.allowAttributesOf.push(t),e.inheritTypesFrom.push(t))}}(t,n),n}function xa(t,e){for(const n of t[e].allowContentOf)if(t[n]){Ia(t,n).forEach(t=>{t.allowIn.push(e)})}delete t[e].allowContentOf}function Aa(t,e){for(const n of t[e].allowWhere){const i=t[n];if(i){const n=i.allowIn;t[e].allowIn.push(...n)}}delete t[e].allowWhere}function Ca(t,e){for(const n of t[e].allowAttributesOf){const i=t[n];if(i){const n=i.allowAttributes;t[e].allowAttributes.push(...n)}}delete t[e].allowAttributesOf}function Ta(t,e){const n=t[e];for(const e of n.inheritTypesFrom){const i=t[e];if(i){const t=Object.keys(i).filter(t=>t.startsWith("is"));for(const e of t)e in n||(n[e]=i[e])}}delete n.inheritTypesFrom}function Pa(t,e){const n=t[e],i=n.allowIn.filter(e=>t[e]);n.allowIn=Array.from(new Set(i))}function Ma(t,e){const n=t[e];n.allowAttributes=Array.from(new Set(n.allowAttributes))}function Sa(t,e,n){for(const i of t)"string"==typeof i[n]?e[n].push(i[n]):Array.isArray(i[n])&&e[n].push(...i[n])}function Ia(t,e){const n=t[e];return function(t){return Object.keys(t).map(e=>t[e])}(t).filter(t=>t.allowIn.includes(n.name))}function Ea(t){return"string"==typeof t?{name:t,*getAttributeKeys(){},getAttribute(){}}:{name:t.is("element")?t.name:"$text",*getAttributeKeys(){yield*t.getAttributeKeys()},getAttribute:e=>t.getAttribute(e)}}class Na{constructor(t={}){this._removeIfEmpty=new Set,this._modelCursor=null,this.conversionApi=Object.assign({},t),this.conversionApi.convertItem=this._convertItem.bind(this),this.conversionApi.convertChildren=this._convertChildren.bind(this),this.conversionApi.splitToAllowedParent=this._splitToAllowedParent.bind(this)}convert(t,e,n=["$root"]){this.fire("viewCleanup",t),this._modelCursor=function(t,e){let n;for(const i of new va(t)){const t={};for(const e of i.getAttributeKeys())t[e]=i.getAttribute(e);const o=e.createElement(i.name,t);n&&e.append(o,n),n=Hs._createAt(o,0)}return n}(n,e),this.conversionApi.writer=e,this.conversionApi.consumable=wa.createFrom(t),this.conversionApi.store={};const{modelRange:i}=this._convertItem(t,this._modelCursor),o=e.createDocumentFragment();if(i){this._removeEmptyElements();for(const t of Array.from(this._modelCursor.parent.getChildren()))e.append(t,o);o.markers=function(t,e){const n=new Set,i=new Map,o=qs._createIn(t).getItems();for(const t of o)"$marker"==t.name&&n.add(t);for(const t of n){const n=t.getAttribute("data-name"),o=e.createPositionBefore(t);i.has(n)?i.get(n).end=o.clone():i.set(n,new qs(o.clone())),e.remove(t)}return i}(o,e)}return this._modelCursor=null,this._removeIfEmpty.clear(),this.conversionApi.writer=null,this.conversionApi.store=null,o}_convertItem(t,e){const n=Object.assign({viewItem:t,modelCursor:e,modelRange:null});if(t.is("element")?this.fire("element:"+t.name,n,this.conversionApi):t.is("text")?this.fire("text",n,this.conversionApi):this.fire("documentFragment",n,this.conversionApi),n.modelRange&&!(n.modelRange instanceof qs))throw new P.b("view-conversion-dispatcher-incorrect-result: Incorrect conversion result was dropped.");return{modelRange:n.modelRange,modelCursor:n.modelCursor}}_convertChildren(t,e){const n=new qs(e);let i=e;for(const e of Array.from(t.getChildren())){const t=this._convertItem(e,i);t.modelRange instanceof qs&&(n.end=t.modelRange.end,i=t.modelCursor)}return{modelRange:n,modelCursor:i}}_splitToAllowedParent(t,e){const n=this.conversionApi.schema.findAllowedParent(t,e);if(!n)return null;if(n===e.parent)return{position:e};if(this._modelCursor.parent.getAncestors().includes(n))return null;const i=this.conversionApi.writer.split(e,n);for(const t of i.range.getPositions())t.isEqual(i.position)||this._removeIfEmpty.add(t.parent);return{position:i.position,cursorParent:i.range.end.parent}}_removeEmptyElements(){let t=!1;for(const e of this._removeIfEmpty)e.isEmpty&&(this.conversionApi.writer.remove(e),this._removeIfEmpty.delete(e),t=!0);t&&this._removeEmptyElements()}}function Oa(t){const e=function(t){const e=new hi(t.view);return(n,i,o)=>{const r=e.match(i.viewItem);if(!r)return;r.match.name=!0;const s=function(t,e,n){return t instanceof Function?t(e,n):n.createElement(t)}(t.model,i.viewItem,o.writer);if(!s)return;if(!o.consumable.test(i.viewItem,r.match))return;const a=o.splitToAllowedParent(s,i.modelCursor);if(!a)return;o.writer.insert(s,a.position);const c=o.convertChildren(i.viewItem,o.writer.createPositionAt(s,0));o.consumable.consume(i.viewItem,r.match),i.modelRange=new qs(o.writer.createPositionBefore(s),o.writer.createPositionAfter(c.modelCursor.parent)),a.cursorParent?i.modelCursor=o.writer.createPositionAt(a.cursorParent,0):i.modelCursor=i.modelRange.end}}(t=sa(t)),n=La(t),i=n?"element:"+n:"element";return n=>{n.on(i,e,{priority:t.converterPriority||"normal"})}}function Ra(t){ja(t=sa(t));const e=Va(t,!1),n=La(t),i=n?"element:"+n:"element";return n=>{n.on(i,e,{priority:t.converterPriority||"normal"})}}function Da(t){let e=null;("string"==typeof(t=sa(t)).view||t.view.key)&&(e=function(t){"string"==typeof t.view&&(t.view={key:t.view});const e=t.view.key;let n;if("class"==e||"style"==e){const i="class"==e?"classes":"styles";n={[i]:t.view.value}}else{const i=void 0===t.view.value?/[\s\S]*/:t.view.value;n={attributes:{[e]:i}}}t.view.name&&(n.name=t.view.name);return t.view=n,e}(t)),ja(t,e);const n=Va(t,!0);return e=>{e.on("element",n,{priority:t.converterPriority||"low"})}}function La(t){return"string"==typeof t.view?t.view:"object"==typeof t.view&&"string"==typeof t.view.name?t.view.name:null}function ja(t,e=null){const n=null===e||(t=>t.getAttribute(e)),i="object"!=typeof t.model?t.model:t.model.key,o="object"!=typeof t.model||void 0===t.model.value?n:t.model.value;t.model={key:i,value:o}}function Va(t,e){const n=new hi(t.view);return(i,o,r)=>{const s=n.match(o.viewItem);if(!s)return;const a=t.model.key,c="function"==typeof t.model.value?t.model.value(o.viewItem):t.model.value;null!==c&&(!function(t){if("object"==typeof t.view&&!La(t))return!1;return!t.view.classes&&!t.view.attributes&&!t.view.styles}(t)?delete s.match.name:s.match.name=!0,r.consumable.test(o.viewItem,s.match)&&(o.modelRange||(o=Object.assign(o,r.convertChildren(o.viewItem,o.modelCursor))),function(t,e,n,i){let o=!1;for(const r of Array.from(t.getItems({shallow:n})))i.schema.checkAttribute(r,e.key)&&(i.writer.setAttribute(e.key,e.value,r),o=!0);return o}(o.modelRange,{key:a,value:c},e,r)&&r.consumable.consume(o.viewItem,s.match)))}}F(Na,R);class za{constructor(t,e){this.model=t,this.processor=e,this.mapper=new Ws,this.downcastDispatcher=new Gs({mapper:this.mapper}),this.downcastDispatcher.on("insert:$text",(t,e,n)=>{if(!n.consumable.consume(e.item,"insert"))return;const i=n.writer,o=n.mapper.toViewPosition(e.range.start),r=i.createText(e.item.data);i.insert(o,r)},{priority:"lowest"}),this.upcastDispatcher=new Na({schema:t.schema}),this.upcastDispatcher.on("text",(t,e,n)=>{if(n.schema.checkChild(e.modelCursor,"$text")&&n.consumable.consume(e.viewItem)){const t=n.writer.createText(e.viewItem.data);n.writer.insert(t,e.modelCursor),e.modelRange=qs._createFromPositionAndShift(e.modelCursor,t.offsetSize),e.modelCursor=e.modelRange.end}},{priority:"lowest"}),this.upcastDispatcher.on("element",(t,e,n)=>{if(!e.modelRange&&n.consumable.consume(e.viewItem,{name:!0})){const{modelRange:t,modelCursor:i}=n.convertChildren(e.viewItem,e.modelCursor);e.modelRange=t,e.modelCursor=i}},{priority:"lowest"}),this.upcastDispatcher.on("documentFragment",(t,e,n)=>{if(!e.modelRange&&n.consumable.consume(e.viewItem,{name:!0})){const{modelRange:t,modelCursor:i}=n.convertChildren(e.viewItem,e.modelCursor);e.modelRange=t,e.modelCursor=i}},{priority:"lowest"}),this.decorate("init")}get(t="main"){return this.stringify(this.model.document.getRoot(t))}stringify(t){const e=this.toView(t);return this.processor.toData(e)}toView(t){this.mapper.clearBindings();const e=qs._createIn(t),n=new _o,i=new ko(new to);if(this.mapper.bindElements(t,n),this.downcastDispatcher.convertInsert(e,i),!t.is("documentFragment")){const e=function(t){const e=[],n=t.root.document;if(!n)return[];const i=qs._createIn(t);for(const t of n.model.markers){const n=i.getIntersection(t.getRange());n&&e.push([t.name,n])}return e}(t);for(const[t,n]of e)this.downcastDispatcher.convertMarkerAdd(t,n,i)}return n}init(t,e="main"){if(this.model.document.version)throw new P.b("datacontroller-init-document-not-empty: Trying to set initial data to not empty document.");const n=this.model.document.getRoot(e);return this.model.enqueueChange("transparent",e=>{e.insert(this.parse(t,n),n,0)}),Promise.resolve()}set(t,e="main"){const n=this.model.document.getRoot(e);this.model.enqueueChange("transparent",e=>{e.setSelection(null),e.removeSelectionAttribute(this.model.document.selection.getAttributeKeys()),e.remove(e.createRangeIn(n)),e.insert(this.parse(t,n),n,0)})}parse(t,e="$root"){const n=this.processor.toView(t);return this.toModel(n,e)}toModel(t,e="$root"){return this.model.change(n=>this.upcastDispatcher.convert(t,n,e))}destroy(){}}F(za,Li);class Ba{constructor(){this._dispatchersGroups=new Map}register(t,e){if(this._dispatchersGroups.has(t))throw new P.b("conversion-register-group-exists: Trying to register a group name that was already registered.");this._dispatchersGroups.set(t,e)}for(t){const e=this._getDispatchers(t);return{add(t){return function(t,e){for(const n of t)e(n)}(e,t),this}}}elementToElement(t){this.for("downcast").add(aa(t));for(const{model:e,view:n}of Fa(t))this.for("upcast").add(Oa({model:e,view:n,converterPriority:t.converterPriority}))}attributeToElement(t){this.for("downcast").add(ca(t));for(const{model:e,view:n}of Fa(t))this.for("upcast").add(Ra({view:n,model:e,priority:t.priority}))}attributeToAttribute(t){this.for("downcast").add(la(t));for(const{model:e,view:n}of Fa(t))this.for("upcast").add(Da({view:n,model:e}))}_getDispatchers(t){const e=this._dispatchersGroups.get(t);if(!e)throw new P.b("conversion-for-unknown-group: Trying to add a converter to an unknown dispatchers group.");return e}}function*Fa(t){if(t.model.values)for(const e of t.model.values){yield*Ua({key:t.model.key,value:e},t.view[e],t.upcastAlso?t.upcastAlso[e]:void 0)}else yield*Ua(t.model,t.view,t.upcastAlso)}function*Ua(t,e,n){if(yield{model:t,view:e},n){n=Array.isArray(n)?n:[n];for(const e of n)yield{model:t,view:e}}}class Ha{constructor(t="default"){this.operations=[],this.type=t}get baseVersion(){for(const t of this.operations)if(null!==t.baseVersion)return t.baseVersion;return null}addOperation(t){return t.batch=this,this.operations.push(t),t}}class qa{constructor(t){this.baseVersion=t,this.isDocumentOperation=null!==this.baseVersion,this.batch=null}_validate(){}toJSON(){const t=Object.assign({},this);return t.__className=this.constructor.className,delete t.batch,delete t.isDocumentOperation,t}static get className(){return"Operation"}static fromJSON(t){return new this(t.baseVersion)}}class Wa{constructor(t){this.markers=new Map,this._children=new Vs,t&&this._insertChild(0,t)}[Symbol.iterator](){return this.getChildren()}get childCount(){return this._children.length}get maxOffset(){return this._children.maxOffset}get isEmpty(){return 0===this.childCount}get root(){return this}get parent(){return null}is(t){return"documentFragment"==t}getChild(t){return this._children.getNode(t)}getChildren(){return this._children[Symbol.iterator]()}getChildIndex(t){return this._children.getNodeIndex(t)}getChildStartOffset(t){return this._children.getNodeStartOffset(t)}getPath(){return[]}getNodeByPath(t){let e=this;for(const n of t)e=e.getChild(e.offsetToIndex(n));return e}offsetToIndex(t){return this._children.offsetToIndex(t)}toJSON(){const t=[];for(const e of this._children)t.push(e.toJSON());return t}static fromJSON(t){const e=[];for(const n of t)n.name?e.push(zs.fromJSON(n)):e.push(Ls.fromJSON(n));return new Wa(e)}_appendChild(t){this._insertChild(this.childCount,t)}_insertChild(t,e){const n=function(t){if("string"==typeof t)return[new Ls(t)];ui(t)||(t=[t]);return Array.from(t).map(t=>"string"==typeof t?new Ls(t):t instanceof js?new Ls(t.data,t.getAttributes()):t)}(e);for(const t of n)null!==t.parent&&t._remove(),t.parent=this;this._children._insertNodes(t,n)}_removeChildren(t,e=1){const n=this._children._removeNodes(t,e);for(const t of n)t.parent=null;return n}}function Ya(t,e){const n=(e=Qa(e)).reduce((t,e)=>t+e.offsetSize,0),i=t.parent;Ka(t);const o=t.index;return i._insertChild(o,e),Ja(i,o+e.length),Ja(i,o),new qs(t,t.getShiftedBy(n))}function $a(t){if(!t.isFlat)throw new P.b("operation-utils-remove-range-not-flat: Trying to remove a range which starts and ends in different element.");const e=t.start.parent;Ka(t.start),Ka(t.end);const n=e._removeChildren(t.start.index,t.end.index-t.start.index);return Ja(e,t.start.index),n}function Ga(t,e){if(!t.isFlat)throw new P.b("operation-utils-move-range-not-flat: Trying to move a range which starts and ends in different element.");const n=$a(t);return Ya(e=e._getTransformedByDeletion(t.start,t.end.offset-t.start.offset),n)}function Qa(t){const e=[];t instanceof Array||(t=[t]);for(let n=0;n<t.length;n++)if("string"==typeof t[n])e.push(new Ls(t[n]));else if(t[n]instanceof js)e.push(new Ls(t[n].data,t[n].getAttributes()));else if(t[n]instanceof Wa||t[n]instanceof Vs)for(const i of t[n])e.push(i);else t[n]instanceof Ds&&e.push(t[n]);for(let t=1;t<e.length;t++){const n=e[t],i=e[t-1];n instanceof Ls&&i instanceof Ls&&Za(n,i)&&(e.splice(t-1,2,new Ls(i.data+n.data,i.getAttributes())),t--)}return e}function Ja(t,e){const n=t.getChild(e-1),i=t.getChild(e);if(n&&i&&n.is("text")&&i.is("text")&&Za(n,i)){const o=new Ls(n.data+i.data,n.getAttributes());t._removeChildren(e-1,2),t._insertChild(e-1,o)}}function Ka(t){const e=t.textNode,n=t.parent;if(e){const i=t.offset-e.startOffset,o=e.index;n._removeChildren(o,1);const r=new Ls(e.data.substr(0,i),e.getAttributes()),s=new Ls(e.data.substr(i),e.getAttributes());n._insertChild(o,[r,s])}}function Za(t,e){const n=t.getAttributes(),i=e.getAttributes();for(const t of n){if(t[1]!==e.getAttribute(t[0]))return!1;i.next()}return i.next().done}var Xa=function(t,e){return Yr(t,e)};class tc extends qa{constructor(t,e,n,i,o){super(o),this.range=t.clone(),this.key=e,this.oldValue=void 0===n?null:n,this.newValue=void 0===i?null:i}get type(){return null===this.oldValue?"addAttribute":null===this.newValue?"removeAttribute":"changeAttribute"}clone(){return new tc(this.range,this.key,this.oldValue,this.newValue,this.baseVersion)}getReversed(){return new tc(this.range,this.key,this.newValue,this.oldValue,this.baseVersion+1)}toJSON(){const t=super.toJSON();return t.range=this.range.toJSON(),t}_validate(){if(!this.range.isFlat)throw new P.b("attribute-operation-range-not-flat: The range to change is not flat.");for(const t of this.range.getItems({shallow:!0})){if(null!==this.oldValue&&!Xa(t.getAttribute(this.key),this.oldValue))throw new P.b("attribute-operation-wrong-old-value: Changed node has different attribute value than operation's old attribute value.",{item:t,key:this.key,value:this.oldValue});if(null===this.oldValue&&null!==this.newValue&&t.hasAttribute(this.key))throw new P.b("attribute-operation-attribute-exists: The attribute with given key already exists.",{node:t,key:this.key})}}_execute(){Xa(this.oldValue,this.newValue)||function(t,e,n){Ka(t.start),Ka(t.end);for(const i of t.getItems({shallow:!0})){const t=i.is("textProxy")?i.textNode:i;null!==n?t._setAttribute(e,n):t._removeAttribute(e),Ja(t.parent,t.index)}Ja(t.end.parent,t.end.index)}(this.range,this.key,this.newValue)}static get className(){return"AttributeOperation"}static fromJSON(t,e){return new tc(qs.fromJSON(t.range,e),t.key,t.oldValue,t.newValue,t.baseVersion)}}class ec extends qa{constructor(t,e){super(null),this.sourcePosition=t.clone(),this.howMany=e}get type(){return"detach"}toJSON(){const t=super.toJSON();return t.sourcePosition=this.sourcePosition.toJSON(),t}_validate(){if(this.sourcePosition.root.document)throw new P.b("detach-operation-on-document-node: Cannot detach document node.")}_execute(){$a(qs._createFromPositionAndShift(this.sourcePosition,this.howMany))}static get className(){return"DetachOperation"}}class nc extends qa{constructor(t,e,n,i){super(i),this.sourcePosition=t.clone(),this.sourcePosition.stickiness="toNext",this.howMany=e,this.targetPosition=n.clone(),this.targetPosition.stickiness="toNone"}get type(){return"$graveyard"==this.targetPosition.root.rootName?"remove":"$graveyard"==this.sourcePosition.root.rootName?"reinsert":"move"}clone(){return new this.constructor(this.sourcePosition,this.howMany,this.targetPosition,this.baseVersion)}getMovedRangeStart(){return this.targetPosition._getTransformedByDeletion(this.sourcePosition,this.howMany)}getReversed(){const t=this.sourcePosition._getTransformedByInsertion(this.targetPosition,this.howMany);return new this.constructor(this.getMovedRangeStart(),this.howMany,t,this.baseVersion+1)}_validate(){const t=this.sourcePosition.parent,e=this.targetPosition.parent,n=this.sourcePosition.offset,i=this.targetPosition.offset;if(!t||!e)throw new P.b("move-operation-position-invalid: Source position or target position is invalid.");if(n+this.howMany>t.maxOffset)throw new P.b("move-operation-nodes-do-not-exist: The nodes which should be moved do not exist.");if(t===e&&n<i&&i<n+this.howMany)throw new P.b("move-operation-range-into-itself: Trying to move a range of nodes to the inside of that range.");if(this.sourcePosition.root==this.targetPosition.root&&"prefix"==U(this.sourcePosition.getParentPath(),this.targetPosition.getParentPath())){const t=this.sourcePosition.path.length-1;if(this.targetPosition.path[t]>=n&&this.targetPosition.path[t]<n+this.howMany)throw new P.b("move-operation-node-into-itself: Trying to move a range of nodes into one of nodes from that range.")}}_execute(){Ga(qs._createFromPositionAndShift(this.sourcePosition,this.howMany),this.targetPosition)}toJSON(){const t=super.toJSON();return t.sourcePosition=this.sourcePosition.toJSON(),t.targetPosition=this.targetPosition.toJSON(),t}static get className(){return"MoveOperation"}static fromJSON(t,e){const n=Hs.fromJSON(t.sourcePosition,e),i=Hs.fromJSON(t.targetPosition,e);return new this(n,t.howMany,i,t.baseVersion)}}class ic extends qa{constructor(t,e,n){super(n),this.position=t.clone(),this.position.stickiness="toNone",this.nodes=new Vs(Qa(e)),this.shouldReceiveAttributes=!1}get type(){return"insert"}get howMany(){return this.nodes.maxOffset}clone(){const t=new Vs([...this.nodes].map(t=>t._clone(!0))),e=new ic(this.position,t,this.baseVersion);return e.shouldReceiveAttributes=this.shouldReceiveAttributes,e}getReversed(){const t=this.position.root.document.graveyard,e=new Hs(t,[0]);return new nc(this.position,this.nodes.maxOffset,e,this.baseVersion+1)}_validate(){const t=this.position.parent;if(!t||t.maxOffset<this.position.offset)throw new P.b("insert-operation-position-invalid: Insertion position is invalid.")}_execute(){const t=this.nodes;this.nodes=new Vs([...t].map(t=>t._clone(!0))),Ya(this.position,t)}toJSON(){const t=super.toJSON();return t.position=this.position.toJSON(),t.nodes=this.nodes.toJSON(),t}static get className(){return"InsertOperation"}static fromJSON(t,e){const n=[];for(const e of t.nodes)e.name?n.push(zs.fromJSON(e)):n.push(Ls.fromJSON(e));const i=new ic(Hs.fromJSON(t.position,e),n,t.baseVersion);return i.shouldReceiveAttributes=t.shouldReceiveAttributes,i}}class oc extends qa{constructor(t,e,n,i,o,r){super(r),this.name=t,this.oldRange=e?e.clone():null,this.newRange=n?n.clone():null,this.affectsData=o,this._markers=i}get type(){return"marker"}clone(){return new oc(this.name,this.oldRange,this.newRange,this._markers,this.affectsData,this.baseVersion)}getReversed(){return new oc(this.name,this.newRange,this.oldRange,this._markers,this.affectsData,this.baseVersion+1)}_execute(){const t=this.newRange?"_set":"_remove";this._markers[t](this.name,this.newRange,!0,this.affectsData)}toJSON(){const t=super.toJSON();return this.oldRange&&(t.oldRange=this.oldRange.toJSON()),this.newRange&&(t.newRange=this.newRange.toJSON()),delete t._markers,t}static get className(){return"MarkerOperation"}static fromJSON(t,e){return new oc(t.name,t.oldRange?qs.fromJSON(t.oldRange,e):null,t.newRange?qs.fromJSON(t.newRange,e):null,e.model.markers,t.affectsData,t.baseVersion)}}class rc extends qa{constructor(t,e,n,i){super(i),this.position=t,this.position.stickiness="toNext",this.oldName=e,this.newName=n}get type(){return"rename"}clone(){return new rc(this.position.clone(),this.oldName,this.newName,this.baseVersion)}getReversed(){return new rc(this.position.clone(),this.newName,this.oldName,this.baseVersion+1)}_validate(){const t=this.position.nodeAfter;if(!(t instanceof zs))throw new P.b("rename-operation-wrong-position: Given position is invalid or node after it is not an instance of Element.");if(t.name!==this.oldName)throw new P.b("rename-operation-wrong-name: Element to change has different name than operation's old name.")}_execute(){this.position.nodeAfter.name=this.newName}toJSON(){const t=super.toJSON();return t.position=this.position.toJSON(),t}static get className(){return"RenameOperation"}static fromJSON(t,e){return new rc(Hs.fromJSON(t.position,e),t.oldName,t.newName,t.baseVersion)}}class sc extends qa{constructor(t,e,n,i,o){super(o),this.root=t,this.key=e,this.oldValue=n,this.newValue=i}get type(){return null===this.oldValue?"addRootAttribute":null===this.newValue?"removeRootAttribute":"changeRootAttribute"}clone(){return new sc(this.root,this.key,this.oldValue,this.newValue,this.baseVersion)}getReversed(){return new sc(this.root,this.key,this.newValue,this.oldValue,this.baseVersion+1)}_validate(){if(this.root!=this.root.root||this.root.is("documentFragment"))throw new P.b("rootattribute-operation-not-a-root: The element to change is not a root element.",{root:this.root,key:this.key});if(null!==this.oldValue&&this.root.getAttribute(this.key)!==this.oldValue)throw new P.b("rootattribute-operation-wrong-old-value: Changed node has different attribute value than operation's old attribute value.",{root:this.root,key:this.key});if(null===this.oldValue&&null!==this.newValue&&this.root.hasAttribute(this.key))throw new P.b("rootattribute-operation-attribute-exists: The attribute with given key already exists.",{root:this.root,key:this.key})}_execute(){null!==this.newValue?this.root._setAttribute(this.key,this.newValue):this.root._removeAttribute(this.key)}toJSON(){const t=super.toJSON();return t.root=this.root.toJSON(),t}static get className(){return"RootAttributeOperation"}static fromJSON(t,e){if(!e.getRoot(t.root))throw new P.b("rootattribute-operation-fromjson-no-root: Cannot create RootAttributeOperation. Root with specified name does not exist.",{rootName:t.root});return new sc(e.getRoot(t.root),t.key,t.oldValue,t.newValue,t.baseVersion)}}class ac extends qa{constructor(t,e,n,i,o){super(o),this.sourcePosition=t.clone(),this.sourcePosition.stickiness="toPrevious",this.howMany=e,this.targetPosition=n.clone(),this.targetPosition.stickiness="toNext",this.graveyardPosition=i.clone()}get type(){return"merge"}get deletionPosition(){return new Hs(this.sourcePosition.root,this.sourcePosition.path.slice(0,-1))}get movedRange(){const t=this.sourcePosition.getShiftedBy(Number.POSITIVE_INFINITY);return new qs(this.sourcePosition,t)}clone(){return new this.constructor(this.sourcePosition,this.howMany,this.targetPosition,this.graveyardPosition,this.baseVersion)}getReversed(){const t=this.targetPosition._getTransformedByMergeOperation(this),e=this.sourcePosition.path.slice(0,-1),n=new Hs(this.sourcePosition.root,e)._getTransformedByMergeOperation(this),i=new cc(t,this.howMany,this.graveyardPosition,this.baseVersion+1);return i.insertionPosition=n,i}_validate(){const t=this.sourcePosition.parent,e=this.targetPosition.parent;if(!(t&&t.is("element")&&t.parent))throw new P.b("merge-operation-source-position-invalid: Merge source position is invalid.");if(!(e&&e.is("element")&&e.parent))throw new P.b("merge-operation-target-position-invalid: Merge target position is invalid.");if(this.howMany!=t.maxOffset)throw new P.b("merge-operation-how-many-invalid: Merge operation specifies wrong number of nodes to move.")}_execute(){const t=this.sourcePosition.parent;Ga(qs._createIn(t),this.targetPosition),Ga(qs._createOn(t),this.graveyardPosition)}toJSON(){const t=super.toJSON();return t.sourcePosition=t.sourcePosition.toJSON(),t.targetPosition=t.targetPosition.toJSON(),t.graveyardPosition=t.graveyardPosition.toJSON(),t}static get className(){return"MergeOperation"}static fromJSON(t,e){const n=Hs.fromJSON(t.sourcePosition,e),i=Hs.fromJSON(t.targetPosition,e),o=Hs.fromJSON(t.graveyardPosition,e);return new this(n,t.howMany,i,o,t.baseVersion)}}class cc extends qa{constructor(t,e,n,i){super(i),this.splitPosition=t.clone(),this.splitPosition.stickiness="toNext",this.howMany=e,this.insertionPosition=cc.getInsertionPosition(t),this.insertionPosition.stickiness="toNone",this.graveyardPosition=n?n.clone():null,this.graveyardPosition&&(this.graveyardPosition.stickiness="toNext")}get type(){return"split"}get moveTargetPosition(){const t=this.insertionPosition.path.slice();return t.push(0),new Hs(this.insertionPosition.root,t)}get movedRange(){const t=this.splitPosition.getShiftedBy(Number.POSITIVE_INFINITY);return new qs(this.splitPosition,t)}clone(){const t=new this.constructor(this.splitPosition,this.howMany,this.graveyardPosition,this.baseVersion);return t.insertionPosition=this.insertionPosition,t}getReversed(){const t=this.splitPosition.root.document.graveyard,e=new Hs(t,[0]);return new ac(this.moveTargetPosition,this.howMany,this.splitPosition,e,this.baseVersion+1)}_validate(){const t=this.splitPosition.parent,e=this.splitPosition.offset;if(!t||t.maxOffset<e)throw new P.b("split-operation-position-invalid: Split position is invalid.");if(!t.parent)throw new P.b("split-operation-split-in-root: Cannot split root element.");if(this.howMany!=t.maxOffset-this.splitPosition.offset)throw new P.b("split-operation-how-many-invalid: Split operation specifies wrong number of nodes to move.");if(this.graveyardPosition&&!this.graveyardPosition.nodeAfter)throw new P.b("split-operation-graveyard-position-invalid: Graveyard position invalid.")}_execute(){const t=this.splitPosition.parent;if(this.graveyardPosition)Ga(qs._createFromPositionAndShift(this.graveyardPosition,1),this.insertionPosition);else{const e=t._clone();Ya(this.insertionPosition,e)}Ga(new qs(Hs._createAt(t,this.splitPosition.offset),Hs._createAt(t,t.maxOffset)),this.moveTargetPosition)}toJSON(){const t=super.toJSON();return t.splitPosition=this.splitPosition.toJSON(),t.insertionPosition=this.insertionPosition.toJSON(),this.graveyardPosition&&(t.graveyardPosition=this.graveyardPosition.toJSON()),t}static get className(){return"SplitOperation"}static getInsertionPosition(t){const e=t.path.slice(0,-1);return e[e.length-1]++,new Hs(t.root,e)}static fromJSON(t,e){const n=Hs.fromJSON(t.splitPosition,e),i=Hs.fromJSON(t.insertionPosition,e),o=t.graveyardPosition?Hs.fromJSON(t.graveyardPosition,e):null,r=new this(n,t.howMany,o,t.baseVersion);return r.insertionPosition=i,r}}class lc extends zs{constructor(t,e,n="main"){super(e),this._doc=t,this.rootName=n}get document(){return this._doc}is(t,e){return e?"rootElement"==t&&e==this.name||super.is(t,e):"rootElement"==t||super.is(t)}toJSON(){return this.rootName}}class dc{constructor(t,e){this.model=t,this.batch=e}createText(t,e){return new Ls(t,e)}createElement(t,e){return new zs(t,e)}createDocumentFragment(){return new Wa}insert(t,e,n=0){this._assertWriterUsedCorrectly();const i=Hs._createAt(e,n);if(t.parent){if(pc(t.root,i.root))return void this.move(qs._createOn(t),i);if(t.root.document)throw new Error("model-writer-insert-forbidden-move: Cannot move a node from a document to a different tree.");this.remove(t)}const o=i.root.document?i.root.document.version:null,r=new ic(i,t,o);if(t instanceof Ls&&(r.shouldReceiveAttributes=!0),this.batch.addOperation(r),this.model.applyOperation(r),t instanceof Wa)for(const[e,n]of t.markers){const t=Hs._createAt(n.root,0),o=new qs(n.start._getCombined(t,i),n.end._getCombined(t,i));this.addMarker(e,{range:o,usingOperation:!0,affectsData:!0})}}insertText(t,e,n,i){e instanceof Wa||e instanceof zs||e instanceof Hs?this.insert(this.createText(t),e,n):this.insert(this.createText(t,e),n,i)}insertElement(t,e,n,i){e instanceof Wa||e instanceof zs||e instanceof Hs?this.insert(this.createElement(t),e,n):this.insert(this.createElement(t,e),n,i)}append(t,e){this.insert(t,e,"end")}appendText(t,e,n){e instanceof Wa||e instanceof zs?this.insert(this.createText(t),e,"end"):this.insert(this.createText(t,e),n,"end")}appendElement(t,e,n){e instanceof Wa||e instanceof zs?this.insert(this.createElement(t),e,"end"):this.insert(this.createElement(t,e),n,"end")}setAttribute(t,e,n){if(this._assertWriterUsedCorrectly(),n instanceof qs){const i=n.getMinimalFlatRanges();for(const n of i)uc(this,t,e,n)}else hc(this,t,e,n)}setAttributes(t,e){for(const[n,i]of Rs(t))this.setAttribute(n,i,e)}removeAttribute(t,e){if(this._assertWriterUsedCorrectly(),e instanceof qs){const n=e.getMinimalFlatRanges();for(const e of n)uc(this,t,null,e)}else hc(this,t,null,e)}clearAttributes(t){this._assertWriterUsedCorrectly();const e=t=>{for(const e of t.getAttributeKeys())this.removeAttribute(e,t)};if(t instanceof qs)for(const n of t.getItems())e(n);else e(t)}move(t,e,n){if(this._assertWriterUsedCorrectly(),!(t instanceof qs))throw new P.b("writer-move-invalid-range: Invalid range to move.");if(!t.isFlat)throw new P.b("writer-move-range-not-flat: Range to move is not flat.");const i=Hs._createAt(e,n);if(!pc(t.root,i.root))throw new P.b("writer-move-different-document: Range is going to be moved between different documents.");const o=t.root.document?t.root.document.version:null,r=new nc(t.start,t.end.offset-t.start.offset,i,o);this.batch.addOperation(r),this.model.applyOperation(r)}remove(t){if(this._assertWriterUsedCorrectly(),t instanceof qs){const e=t.getMinimalFlatRanges().reverse();for(const t of e)mc(t.start,t.end.offset-t.start.offset,this.batch,this.model)}else{const e=t.is("text")?t.offsetSize:1;mc(Hs._createBefore(t),e,this.batch,this.model)}}merge(t){this._assertWriterUsedCorrectly();const e=t.nodeBefore,n=t.nodeAfter;if(!(e instanceof zs))throw new P.b("writer-merge-no-element-before: Node before merge position must be an element.");if(!(n instanceof zs))throw new P.b("writer-merge-no-element-after: Node after merge position must be an element.");t.root.document?this._merge(t):this._mergeDetached(t)}createPositionFromPath(t,e,n){return this.model.createPositionFromPath(t,e,n)}createPositionAt(t,e){return this.model.createPositionAt(t,e)}createPositionAfter(t){return this.model.createPositionAfter(t)}createPositionBefore(t){return this.model.createPositionBefore(t)}createRange(t,e){return this.model.createRange(t,e)}createRangeIn(t){return this.model.createRangeIn(t)}createRangeOn(t){return this.model.createRangeOn(t)}createSelection(t,e,n){return this.model.createSelection(t,e,n)}_mergeDetached(t){const e=t.nodeBefore,n=t.nodeAfter;this.move(qs._createIn(n),Hs._createAt(e,"end")),this.remove(n)}_merge(t){const e=Hs._createAt(t.nodeBefore,"end"),n=Hs._createAt(t.nodeAfter,0),i=t.root.document.graveyard,o=new Hs(i,[0]),r=t.root.document.version,s=new ac(n,t.nodeAfter.maxOffset,e,o,r);this.batch.addOperation(s),this.model.applyOperation(s)}rename(t,e){if(this._assertWriterUsedCorrectly(),!(t instanceof zs))throw new P.b("writer-rename-not-element-instance: Trying to rename an object which is not an instance of Element.");const n=t.root.document?t.root.document.version:null,i=new rc(Hs._createBefore(t),t.name,e,n);this.batch.addOperation(i),this.model.applyOperation(i)}split(t,e){this._assertWriterUsedCorrectly();let n,i,o=t.parent;if(!o.parent)throw new P.b("writer-split-element-no-parent: Element with no parent can not be split.");if(e||(e=o.parent),!t.parent.getAncestors({includeSelf:!0}).includes(e))throw new P.b("writer-split-invalid-limit-element: Limit element is not a position ancestor.");do{const e=o.root.document?o.root.document.version:null,r=o.maxOffset-t.offset,s=new cc(t,r,null,e);this.batch.addOperation(s),this.model.applyOperation(s),n||i||(n=o,i=t.parent.nextSibling),o=(t=this.createPositionAfter(t.parent)).parent}while(o!==e);return{position:t,range:new qs(Hs._createAt(n,"end"),Hs._createAt(i,0))}}wrap(t,e){if(this._assertWriterUsedCorrectly(),!t.isFlat)throw new P.b("writer-wrap-range-not-flat: Range to wrap is not flat.");const n=e instanceof zs?e:new zs(e);if(n.childCount>0)throw new P.b("writer-wrap-element-not-empty: Element to wrap with is not empty.");if(null!==n.parent)throw new P.b("writer-wrap-element-attached: Element to wrap with is already attached to tree model.");const i=t.root.document?t.root.document.version:null,o=new ic(t.start,n,i);this.batch.addOperation(o),this.model.applyOperation(o);const r=new nc(t.start.getShiftedBy(1),t.end.offset-t.start.offset,Hs._createAt(n,0),null===i?null:i+1);this.batch.addOperation(r),this.model.applyOperation(r)}unwrap(t){if(this._assertWriterUsedCorrectly(),null===t.parent)throw new P.b("writer-unwrap-element-no-parent: Trying to unwrap an element which has no parent.");this.move(qs._createIn(t),this.createPositionAfter(t)),this.remove(t)}addMarker(t,e){if(this._assertWriterUsedCorrectly(),!e||"boolean"!=typeof e.usingOperation)throw new P.b("writer-addMarker-no-usingOperations: The options.usingOperations parameter is required when adding a new marker.");const n=e.usingOperation,i=e.range,o=void 0!==e.affectsData&&e.affectsData;if(this.model.markers.has(t))throw new P.b("writer-addMarker-marker-exists: Marker with provided name already exists.");if(!i)throw new P.b("writer-addMarker-no-range: Range parameter is required when adding a new marker.");return n?(fc(this,t,null,i,o),this.model.markers.get(t)):this.model.markers._set(t,i,n,o)}updateMarker(t,e={}){this._assertWriterUsedCorrectly();const n="string"==typeof t?t:t.name,i=this.model.markers.get(n);if(!i)throw new P.b("writer-updateMarker-marker-not-exists: Marker with provided name does not exists.");const o="boolean"==typeof e.usingOperation,r="boolean"==typeof e.affectsData,s=r?e.affectsData:i.affectsData;if(!o&&!e.range&&!r)throw new P.b("writer-updateMarker-wrong-options: One of the options is required - provide range, usingOperations or affectsData.");const a=i.getRange(),c=e.range?e.range:a;o&&e.usingOperation!==i.managedUsingOperations?e.usingOperation?fc(this,n,null,c,s):(fc(this,n,a,null,s),this.model.markers._set(n,c,void 0,s)):i.managedUsingOperations?fc(this,n,a,c,s):this.model.markers._set(n,c,void 0,s)}removeMarker(t){this._assertWriterUsedCorrectly();const e="string"==typeof t?t:t.name;if(!this.model.markers.has(e))throw new P.b("writer-removeMarker-no-marker: Trying to remove marker which does not exist.");const n=this.model.markers.get(e);n.managedUsingOperations?fc(this,e,n.getRange(),null,n.affectsData):this.model.markers._remove(e)}setSelection(t,e,n){this._assertWriterUsedCorrectly(),this.model.document.selection._setTo(t,e,n)}setSelectionFocus(t,e){this._assertWriterUsedCorrectly(),this.model.document.selection._setFocus(t,e)}setSelectionAttribute(t,e){if(this._assertWriterUsedCorrectly(),"string"==typeof t)this._setSelectionAttribute(t,e);else for(const[e,n]of Rs(t))this._setSelectionAttribute(e,n)}removeSelectionAttribute(t){if(this._assertWriterUsedCorrectly(),"string"==typeof t)this._removeSelectionAttribute(t);else for(const e of t)this._removeSelectionAttribute(e)}overrideSelectionGravity(){return this.model.document.selection._overrideGravity()}restoreSelectionGravity(t){this.model.document.selection._restoreGravity(t)}_setSelectionAttribute(t,e){const n=this.model.document.selection;if(n.isCollapsed&&n.anchor.parent.isEmpty){const i=ea._getStoreAttributeKey(t);this.setAttribute(i,e,n.anchor.parent)}n._setAttribute(t,e)}_removeSelectionAttribute(t){const e=this.model.document.selection;if(e.isCollapsed&&e.anchor.parent.isEmpty){const n=ea._getStoreAttributeKey(t);this.removeAttribute(n,e.anchor.parent)}e._removeAttribute(t)}_assertWriterUsedCorrectly(){if(this.model._currentWriter!==this)throw new P.b("writer-incorrect-use: Trying to use a writer outside the change() block.")}}function uc(t,e,n,i){const o=t.model,r=o.document;let s,a,c,l=i.start;for(const t of i.getWalker({shallow:!0}))c=t.item.getAttribute(e),s&&a!=c&&(a!=n&&d(),l=s),s=t.nextPosition,a=c;function d(){const i=new qs(l,s),c=i.root.document?r.version:null,d=new tc(i,e,a,n,c);t.batch.addOperation(d),o.applyOperation(d)}s instanceof Hs&&s!=l&&a!=n&&d()}function hc(t,e,n,i){const o=t.model,r=o.document,s=i.getAttribute(e);let a,c;if(s!=n){if(i.root===i){const t=i.document?r.version:null;c=new sc(i,e,s,n,t)}else{const o=(a=new qs(Hs._createBefore(i),t.createPositionAfter(i))).root.document?r.version:null;c=new tc(a,e,s,n,o)}t.batch.addOperation(c),o.applyOperation(c)}}function fc(t,e,n,i,o){const r=t.model,s=r.document,a=new oc(e,n,i,r.markers,o,s.version);t.batch.addOperation(a),r.applyOperation(a)}function mc(t,e,n,i){let o;if(t.root.document){const n=i.document,r=new Hs(n.graveyard,[0]);o=new nc(t,e,r,n.version)}else o=new ec(t,e);n.addOperation(o),i.applyOperation(o)}function pc(t,e){return t===e||t instanceof lc&&e instanceof lc}class gc{constructor(t){this._markerCollection=t,this._changesInElement=new Map,this._elementSnapshots=new Map,this._changedMarkers=new Map,this._changeCount=0,this._cachedChanges=null,this._cachedChangesWithGraveyard=null}get isEmpty(){return 0==this._changesInElement.size&&0==this._changedMarkers.size}bufferOperation(t){switch(t.type){case"insert":if(this._isInInsertedElement(t.position.parent))return;this._markInsert(t.position.parent,t.position.offset,t.nodes.maxOffset);break;case"addAttribute":case"removeAttribute":case"changeAttribute":for(const e of t.range.getItems())this._isInInsertedElement(e.parent)||this._markAttribute(e);break;case"remove":case"move":case"reinsert":{const e=this._isInInsertedElement(t.sourcePosition.parent),n=this._isInInsertedElement(t.targetPosition.parent);e||this._markRemove(t.sourcePosition.parent,t.sourcePosition.offset,t.howMany),n||this._markInsert(t.targetPosition.parent,t.getMovedRangeStart().offset,t.howMany);break}case"rename":{if(this._isInInsertedElement(t.position.parent))return;this._markRemove(t.position.parent,t.position.offset,1),this._markInsert(t.position.parent,t.position.offset,1);const e=qs._createFromPositionAndShift(t.position,1);for(const t of this._markerCollection.getMarkersIntersectingRange(e)){const e=t.getRange();this.bufferMarkerChange(t.name,e,e,t.affectsData)}break}case"split":{const e=t.splitPosition.parent;this._isInInsertedElement(e)||this._markRemove(e,t.splitPosition.offset,t.howMany),this._isInInsertedElement(t.insertionPosition.parent)||this._markInsert(t.insertionPosition.parent,t.insertionPosition.offset,1),t.graveyardPosition&&this._markRemove(t.graveyardPosition.parent,t.graveyardPosition.offset,1);break}case"merge":{const e=t.sourcePosition.parent;this._isInInsertedElement(e.parent)||this._markRemove(e.parent,e.startOffset,1);const n=t.graveyardPosition.parent;this._markInsert(n,t.graveyardPosition.offset,1);const i=t.targetPosition.parent;this._isInInsertedElement(i)||this._markInsert(i,t.targetPosition.offset,e.maxOffset);break}}this._cachedChanges=null}bufferMarkerChange(t,e,n,i){const o=this._changedMarkers.get(t);o?(o.newRange=n,o.affectsData=i,null==o.oldRange&&null==o.newRange&&this._changedMarkers.delete(t)):this._changedMarkers.set(t,{oldRange:e,newRange:n,affectsData:i})}getMarkersToRemove(){const t=[];for(const[e,n]of this._changedMarkers)null!=n.oldRange&&t.push({name:e,range:n.oldRange});return t}getMarkersToAdd(){const t=[];for(const[e,n]of this._changedMarkers)null!=n.newRange&&t.push({name:e,range:n.newRange});return t}hasDataChanges(){for(const[,t]of this._changedMarkers)if(t.affectsData)return!0;return this._changesInElement.size>0}getChanges(t={includeChangesInGraveyard:!1}){if(this._cachedChanges)return t.includeChangesInGraveyard?this._cachedChangesWithGraveyard.slice():this._cachedChanges.slice();const e=[];for(const t of this._changesInElement.keys()){const n=this._changesInElement.get(t).sort((t,e)=>t.offset===e.offset?t.type!=e.type?"remove"==t.type?-1:1:0:t.offset<e.offset?-1:1),i=this._elementSnapshots.get(t),o=bc(t.getChildren()),r=wc(i.length,n);let s=0,a=0;for(const n of r)if("i"===n)e.push(this._getInsertDiff(t,s,o[s].name)),s++;else if("r"===n)e.push(this._getRemoveDiff(t,s,i[a].name)),a++;else if("a"===n){const n=o[s].attributes,r=i[a].attributes;let c;if("$text"==o[s].name)c=new qs(Hs._createAt(t,s),Hs._createAt(t,s+1));else{const e=t.offsetToIndex(s);c=new qs(Hs._createAt(t,s),Hs._createAt(t.getChild(e),0))}e.push(...this._getAttributesDiff(c,r,n)),s++,a++}else s++,a++}e.sort((t,e)=>t.position.root!=e.position.root?t.position.root.rootName<e.position.root.rootName?-1:1:t.position.isEqual(e.position)?t.changeCount-e.changeCount:t.position.isBefore(e.position)?-1:1);for(let t=1;t<e.length;t++){const n=e[t-1],i=e[t],o="remove"==n.type&&"remove"==i.type&&"$text"==n.name&&"$text"==i.name&&n.position.isEqual(i.position),r="insert"==n.type&&"insert"==i.type&&"$text"==n.name&&"$text"==i.name&&n.position.parent==i.position.parent&&n.position.offset+n.length==i.position.offset,s="attribute"==n.type&&"attribute"==i.type&&n.position.parent==i.position.parent&&n.range.isFlat&&i.range.isFlat&&n.position.offset+n.length==i.position.offset&&n.attributeKey==i.attributeKey&&n.attributeOldValue==i.attributeOldValue&&n.attributeNewValue==i.attributeNewValue;(o||r||s)&&(e[t-1].length++,s&&(e[t-1].range.end=e[t-1].range.end.getShiftedBy(1)),e.splice(t,1),t--)}for(const t of e)delete t.changeCount,"attribute"==t.type&&(delete t.position,delete t.length);return this._changeCount=0,this._cachedChangesWithGraveyard=e.slice(),this._cachedChanges=e.slice().filter(_c),t.includeChangesInGraveyard?this._cachedChangesWithGraveyard:this._cachedChanges}reset(){this._changesInElement.clear(),this._elementSnapshots.clear(),this._changedMarkers.clear(),this._cachedChanges=null}_markInsert(t,e,n){const i={type:"insert",offset:e,howMany:n,count:this._changeCount++};this._markChange(t,i)}_markRemove(t,e,n){const i={type:"remove",offset:e,howMany:n,count:this._changeCount++};this._markChange(t,i),this._removeAllNestedChanges(t,e,n)}_markAttribute(t){const e={type:"attribute",offset:t.startOffset,howMany:t.offsetSize,count:this._changeCount++};this._markChange(t.parent,e)}_markChange(t,e){this._makeSnapshot(t);const n=this._getChangesForElement(t);this._handleChange(e,n),n.push(e);for(let t=0;t<n.length;t++)n[t].howMany<1&&(n.splice(t,1),t--)}_getChangesForElement(t){let e;return this._changesInElement.has(t)?e=this._changesInElement.get(t):(e=[],this._changesInElement.set(t,e)),e}_makeSnapshot(t){this._elementSnapshots.has(t)||this._elementSnapshots.set(t,bc(t.getChildren()))}_handleChange(t,e){t.nodesToHandle=t.howMany;for(const n of e){const i=t.offset+t.howMany,o=n.offset+n.howMany;if("insert"==t.type&&("insert"==n.type&&(t.offset<=n.offset?n.offset+=t.howMany:t.offset<o&&(n.howMany+=t.nodesToHandle,t.nodesToHandle=0)),"remove"==n.type&&t.offset<n.offset&&(n.offset+=t.howMany),"attribute"==n.type))if(t.offset<=n.offset)n.offset+=t.howMany;else if(t.offset<o){const o=n.howMany;n.howMany=t.offset-n.offset,e.unshift({type:"attribute",offset:i,howMany:o-n.howMany,count:this._changeCount++})}if("remove"==t.type){if("insert"==n.type)if(i<=n.offset)n.offset-=t.howMany;else if(i<=o)if(t.offset<n.offset){const e=i-n.offset;n.offset=t.offset,n.howMany-=e,t.nodesToHandle-=e}else n.howMany-=t.nodesToHandle,t.nodesToHandle=0;else if(t.offset<=n.offset)t.nodesToHandle-=n.howMany,n.howMany=0;else if(t.offset<o){const e=o-t.offset;n.howMany-=e,t.nodesToHandle-=e}if("remove"==n.type&&(i<=n.offset?n.offset-=t.howMany:t.offset<n.offset&&(t.nodesToHandle+=n.howMany,n.howMany=0)),"attribute"==n.type)if(i<=n.offset)n.offset-=t.howMany;else if(t.offset<n.offset){const e=i-n.offset;n.offset=t.offset,n.howMany-=e}else if(t.offset<o)if(i<=o){const i=n.howMany;n.howMany=t.offset-n.offset;const o=i-n.howMany-t.nodesToHandle;e.unshift({type:"attribute",offset:t.offset,howMany:o,count:this._changeCount++})}else n.howMany-=o-t.offset}if("attribute"==t.type){if("insert"==n.type)if(t.offset<n.offset&&i>n.offset){if(i>o){const t={type:"attribute",offset:o,howMany:i-o,count:this._changeCount++};this._handleChange(t,e),e.push(t)}t.nodesToHandle=n.offset-t.offset,t.howMany=t.nodesToHandle}else t.offset>=n.offset&&t.offset<o&&(i>o?(t.nodesToHandle=i-o,t.offset=o):t.nodesToHandle=0);"attribute"==n.type&&(t.offset>=n.offset&&i<=o?(t.nodesToHandle=0,t.howMany=0,t.offset=0):t.offset<=n.offset&&i>=o&&(n.howMany=0))}}t.howMany=t.nodesToHandle,delete t.nodesToHandle}_getInsertDiff(t,e,n){return{type:"insert",position:Hs._createAt(t,e),name:n,length:1,changeCount:this._changeCount++}}_getRemoveDiff(t,e,n){return{type:"remove",position:Hs._createAt(t,e),name:n,length:1,changeCount:this._changeCount++}}_getAttributesDiff(t,e,n){const i=[];n=new Map(n);for(const[o,r]of e){const e=n.has(o)?n.get(o):null;e!==r&&i.push({type:"attribute",position:t.start,range:t.clone(),length:1,attributeKey:o,attributeOldValue:r,attributeNewValue:e,changeCount:this._changeCount++}),n.delete(o)}for(const[e,o]of n)i.push({type:"attribute",position:t.start,range:t.clone(),length:1,attributeKey:e,attributeOldValue:null,attributeNewValue:o,changeCount:this._changeCount++});return i}_isInInsertedElement(t){const e=t.parent;if(!e)return!1;const n=this._changesInElement.get(e),i=t.startOffset;if(n)for(const t of n)if("insert"==t.type&&i>=t.offset&&i<t.offset+t.howMany)return!0;return this._isInInsertedElement(e)}_removeAllNestedChanges(t,e,n){const i=new qs(Hs._createAt(t,e),Hs._createAt(t,e+n));for(const t of i.getItems({shallow:!0}))t.is("element")&&(this._elementSnapshots.delete(t),this._changesInElement.delete(t),this._removeAllNestedChanges(t,0,t.maxOffset))}}function bc(t){const e=[];for(const n of t)if(n.is("text"))for(let t=0;t<n.data.length;t++)e.push({name:"$text",attributes:new Map(n.getAttributes())});else e.push({name:n.name,attributes:new Map(n.getAttributes())});return e}function wc(t,e){const n=[];let i=0,o=0;for(const t of e)t.offset>i&&(n.push(..."e".repeat(t.offset-i).split("")),o+=t.offset-i),"insert"==t.type?(n.push(..."i".repeat(t.howMany).split("")),i=t.offset+t.howMany):"remove"==t.type?(n.push(..."r".repeat(t.howMany).split("")),i=t.offset,o+=t.howMany):(n.push(..."a".repeat(t.howMany).split("")),i=t.offset+t.howMany,o+=t.howMany);return o<t&&n.push(..."e".repeat(t-o).split("")),n}function _c(t){const e=t.position&&"$graveyard"==t.position.root.rootName,n=t.range&&"$graveyard"==t.range.root.rootName;return!e&&!n}class kc{constructor(){this._operations=[],this._undoPairs=new Map,this._undoneOperations=new Set}addOperation(t){this._operations.includes(t)||this._operations.push(t)}getOperations(t=0,e=Number.POSITIVE_INFINITY){return t<0?[]:this._operations.slice(t,e)}getOperation(t){return this._operations[t]}setOperationAsUndone(t,e){this._undoPairs.set(e,t),this._undoneOperations.add(t)}isUndoingOperation(t){return this._undoPairs.has(t)}isUndoneOperation(t){return this._undoneOperations.has(t)}getUndoneOperation(t){return this._undoPairs.get(t)}}function vc(t,e){return function(t){return!!t&&1==t.length&&/[\ud800-\udbff]/.test(t)}(t.charAt(e-1))&&function(t){return!!t&&1==t.length&&/[\udc00-\udfff]/.test(t)}(t.charAt(e))}function yc(t,e){return function(t){return!!t&&1==t.length&&/[\u0300-\u036f\u1ab0-\u1aff\u1dc0-\u1dff\u20d0-\u20ff\ufe20-\ufe2f]/.test(t)}(t.charAt(e))}const xc="$graveyard";class Ac{constructor(t){this.model=t,this.version=0,this.history=new kc(this),this.selection=new ea(this),this.roots=new Xi({idProperty:"rootName"}),this.differ=new gc(t.markers),this._postFixers=new Set,this.createRoot("$root",xc),this.listenTo(t,"applyOperation",(t,e)=>{const n=e[0];if(n.isDocumentOperation&&n.baseVersion!==this.version)throw new P.b("model-document-applyOperation-wrong-version: Only operations with matching versions can be applied.",{operation:n})},{priority:"highest"}),this.listenTo(t,"applyOperation",(t,e)=>{const n=e[0];n.isDocumentOperation&&this.differ.bufferOperation(n)},{priority:"high"}),this.listenTo(t,"applyOperation",(t,e)=>{const n=e[0];n.isDocumentOperation&&(this.version++,this.history.addOperation(n))},{priority:"low"});let e=!1;this.listenTo(this.selection,"change",()=>{e=!0}),this.listenTo(t,"_change",(t,n)=>{this.differ.isEmpty&&!e||(this._callPostFixers(n),this.differ.hasDataChanges()?this.fire("change:data",n.batch):this.fire("change",n.batch),this.differ.reset(),e=!1)}),this.listenTo(t.markers,"update",(t,e,n,i)=>{this.differ.bufferMarkerChange(e.name,n,i,e.affectsData),null===n&&e.on("change",(t,n)=>{this.differ.bufferMarkerChange(e.name,n,e.getRange(),e.affectsData)})})}get graveyard(){return this.getRoot(xc)}createRoot(t="$root",e="main"){if(this.roots.get(e))throw new P.b("model-document-createRoot-name-exists: Root with specified name already exists.",{name:e});const n=new lc(this,t,e);return this.roots.add(n),n}destroy(){this.selection.destroy(),this.stopListening()}getRoot(t="main"){return this.roots.get(t)}getRootNames(){return Array.from(this.roots,t=>t.rootName).filter(t=>t!=xc)}registerPostFixer(t){this._postFixers.add(t)}toJSON(){const t=si(this);return t.selection="[engine.model.DocumentSelection]",t.model="[engine.model.Model]",t}_getDefaultRoot(){for(const t of this.roots)if(t!==this.graveyard)return t;return this.graveyard}_getDefaultRange(){const t=this._getDefaultRoot(),e=this.model,n=e.schema,i=e.createPositionFromPath(t,[0]);return n.getNearestSelectionRange(i)||e.createRange(i)}_validateSelectionRange(t){return Cc(t.start)&&Cc(t.end)}_callPostFixers(t){let e=!1;do{for(const n of this._postFixers)if(e=n(t))break}while(e)}}function Cc(t){const e=t.textNode;if(e){const n=e.data,i=t.offset-e.startOffset;return!vc(n,i)&&!yc(n,i)}return!0}F(Ac,R);class Tc{constructor(){this._markers=new Map}[Symbol.iterator](){return this._markers.values()}has(t){return this._markers.has(t)}get(t){return this._markers.get(t)||null}_set(t,e,n=!1,i=!1){const o=t instanceof Pc?t.name:t,r=this._markers.get(o);if(r){const t=r.getRange();let s=!1;return t.isEqual(e)||(r._attachLiveRange(Xs.fromRange(e)),s=!0),n!=r.managedUsingOperations&&(r._managedUsingOperations=n,s=!0),"boolean"==typeof i&&i!=r.affectsData&&(r._affectsData=i,s=!0),s&&this.fire("update:"+o,r,t,e),r}const s=Xs.fromRange(e),a=new Pc(o,s,n,i);return this._markers.set(o,a),this.fire("update:"+o,a,null,e),a}_remove(t){const e=t instanceof Pc?t.name:t,n=this._markers.get(e);return!!n&&(this._markers.delete(e),this.fire("update:"+e,n,n.getRange(),null),this._destroyMarker(n),!0)}*getMarkersAtPosition(t){for(const e of this)e.getRange().containsPosition(t)&&(yield e)}*getMarkersIntersectingRange(t){for(const e of this)null!==e.getRange().getIntersection(t)&&(yield e)}destroy(){for(const t of this._markers.values())this._destroyMarker(t);this._markers=null,this.stopListening()}*getMarkersGroup(t){for(const e of this._markers.values())e.name.startsWith(t+":")&&(yield e)}_destroyMarker(t){t.stopListening(),t._detachLiveRange()}}F(Tc,R);class Pc{constructor(t,e,n,i){this.name=t,this._liveRange=this._attachLiveRange(e),this._managedUsingOperations=n,this._affectsData=i}get managedUsingOperations(){if(!this._liveRange)throw new P.b("marker-destroyed: Cannot use a destroyed marker instance.");return this._managedUsingOperations}get affectsData(){if(!this._liveRange)throw new P.b("marker-destroyed: Cannot use a destroyed marker instance.");return this._affectsData}getStart(){if(!this._liveRange)throw new P.b("marker-destroyed: Cannot use a destroyed marker instance.");return this._liveRange.start.clone()}getEnd(){if(!this._liveRange)throw new P.b("marker-destroyed: Cannot use a destroyed marker instance.");return this._liveRange.end.clone()}getRange(){if(!this._liveRange)throw new P.b("marker-destroyed: Cannot use a destroyed marker instance.");return this._liveRange.toRange()}_attachLiveRange(t){return this._liveRange&&this._detachLiveRange(),t.delegate("change:range").to(this),t.delegate("change:content").to(this),this._liveRange=t,t}_detachLiveRange(){this._liveRange.stopDelegating("change:range",this),this._liveRange.stopDelegating("change:content",this),this._liveRange.detach(),this._liveRange=null}}F(Pc,R);class Mc extends Hs{constructor(t,e,n="toNone"){if(super(t,e,n),!this.root.is("rootElement"))throw new P.b("model-liveposition-root-not-rootelement: LivePosition's root has to be an instance of RootElement.");(function(){this.listenTo(this.root.document.model,"applyOperation",(t,e)=>{const n=e[0];n.isDocumentOperation&&function(t){const e=this.getTransformedByOperation(t);if(!this.isEqual(e)){const t=this.toPosition();this.path=e.path,this.root=e.root,this.fire("change",t)}}.call(this,n)},{priority:"low"})}).call(this)}detach(){this.stopListening()}toPosition(){return new Hs(this.root,this.path.slice(),this.stickiness)}static fromPosition(t,e){return new this(t.root,t.path.slice(),e||t.stickiness)}}F(Mc,R);class Sc{constructor(t,e,n){this.model=t,this.writer=e,this.position=n,this.canMergeWith=new Set([this.position.parent]),this.schema=t.schema,this._filterAttributesOf=[]}handleNodes(t,e){t=Array.from(t);for(let n=0;n<t.length;n++){const i=t[n];this._handleNode(i,{isFirst:0===n&&e.isFirst,isLast:n===t.length-1&&e.isLast})}this.schema.removeDisallowedAttributes(this._filterAttributesOf,this.writer),this._filterAttributesOf=[]}getSelectionRange(){return this.nodeToSelect?qs._createOn(this.nodeToSelect):this.model.schema.getNearestSelectionRange(this.position)}_handleNode(t,e){if(this.schema.isObject(t))return void this._handleObject(t,e);this._checkAndSplitToAllowedPosition(t,e)?(this._insert(t),this._mergeSiblingsOf(t,e)):this._handleDisallowedNode(t,e)}_handleObject(t,e){this._checkAndSplitToAllowedPosition(t)?this._insert(t):this._tryAutoparagraphing(t,e)}_handleDisallowedNode(t,e){t.is("element")?this.handleNodes(t.getChildren(),e):this._tryAutoparagraphing(t,e)}_insert(t){if(!this.schema.checkChild(this.position,t))return void fs.a.error("insertcontent-wrong-position: The node cannot be inserted on the given position.",{node:t,position:this.position});const e=Mc.fromPosition(this.position,"toNext");this.writer.insert(t,this.position),this.position=e.toPosition(),e.detach(),this.schema.isObject(t)&&!this.schema.checkChild(this.position,"$text")?this.nodeToSelect=t:this.nodeToSelect=null,this._filterAttributesOf.push(t)}_mergeSiblingsOf(t,e){if(!(t instanceof zs))return;const n=this._canMergeLeft(t,e),i=this._canMergeRight(t,e),o=Mc._createBefore(t);o.stickiness="toNext";const r=Mc._createAfter(t);if(r.stickiness="toNext",n){const t=Mc.fromPosition(this.position);t.stickiness="toNext",this.writer.merge(o),this.position=t.toPosition(),t.detach()}if(i){this.position.isEqual(r)||fs.a.error("insertcontent-wrong-position-on-merge: The insertion position should equal the merge position"),this.position=Hs._createAt(r.nodeBefore,"end");const t=new Mc(this.position.root,this.position.path,"toPrevious");this.writer.merge(r),this.position=t.toPosition(),t.detach()}(n||i)&&this._filterAttributesOf.push(this.position.parent),o.detach(),r.detach()}_canMergeLeft(t,e){const n=t.previousSibling;return e.isFirst&&n instanceof zs&&this.canMergeWith.has(n)&&this.model.schema.checkMerge(n,t)}_canMergeRight(t,e){const n=t.nextSibling;return e.isLast&&n instanceof zs&&this.canMergeWith.has(n)&&this.model.schema.checkMerge(t,n)}_tryAutoparagraphing(t,e){const n=this.writer.createElement("paragraph");this._getAllowedIn(n,this.position.parent)&&this.schema.checkChild(n,t)&&(n._appendChild(t),this._handleNode(n,e))}_checkAndSplitToAllowedPosition(t){const e=this._getAllowedIn(t,this.position.parent);if(!e)return!1;for(;e!=this.position.parent;){if(this.schema.isLimit(this.position.parent))return!1;if(this.position.isAtStart){const t=this.position.parent;this.position=this.writer.createPositionBefore(t),t.isEmpty&&this.writer.remove(t)}else if(this.position.isAtEnd)this.position=this.writer.createPositionAfter(this.position.parent);else{const t=this.writer.createPositionAfter(this.position.parent);this.writer.split(this.position),this.position=t,this.canMergeWith.add(this.position.nodeAfter)}}return!0}_getAllowedIn(t,e){return this.schema.checkChild(e,t)?e:e.parent?this._getAllowedIn(t,e.parent):null}}function Ic(t,e,n={}){if(e.isCollapsed)return;const i=t.schema;t.change(t=>{if(!n.doNotResetEntireContent&&function(t,e){const n=t.getLimitElement(e);if(!e.containsEntireContent(n))return!1;const i=e.getFirstRange();if(i.start.parent==i.end.parent)return!1;return t.checkChild(n,"paragraph")}(i,e))return void function(t,e){const n=t.model.schema.getLimitElement(e);t.remove(t.createRangeIn(n)),Ec(t,t.createPositionAt(n,0),e)}(t,e);const o=e.getFirstRange(),r=o.start,s=Mc.fromPosition(o.end,"toNext");o.start.isTouching(o.end)||t.remove(o),n.leaveUnmerged||(!function t(e,n,i){const o=n.parent;const r=i.parent;if(o==r)return;if(e.model.schema.isLimit(o)||e.model.schema.isLimit(r))return;if(!function(t,e,n){const i=new qs(t,e);for(const t of i.getWalker())if(n.isLimit(t.item))return!1;return!0}(n,i,e.model.schema))return;n=e.createPositionAfter(o);i=e.createPositionBefore(r);i.isEqual(n)||e.insert(r,n);e.merge(n);for(;i.parent.isEmpty;){const t=i.parent;i=e.createPositionBefore(t),e.remove(t)}t(e,n,i)}(t,r,s),i.removeDisallowedAttributes(r.parent.getChildren(),t)),e instanceof ea?t.setSelection(r):e.setTo(r),function(t,e){const n=t.checkChild(e,"$text"),i=t.checkChild(e,"paragraph");return!n&&i}(i,r)&&Ec(t,r,e),s.detach()})}function Ec(t,e,n){const i=t.createElement("paragraph");t.insert(i,e),n instanceof ea?t.setSelection(i,0):n.setTo(i,0)}const Nc=' ,.?!:;"-()';function Oc(t,e,n={}){const i=t.schema,o="backward"!=n.direction,r=n.unit?n.unit:"character",s=e.focus,a=new Bs({boundaries:function(t,e){const n=t.root,i=Hs._createAt(n,e?"end":0);return e?new qs(t,i):new qs(i,t)}(s,o),singleCharacters:!0,direction:o?"forward":"backward"}),c={walker:a,schema:i,isForward:o,unit:r};let l;for(;l=a.next();){if(l.done)return;const n=Rc(c,l.value);if(n)return void(e instanceof ea?t.change(t=>{t.setSelectionFocus(n)}):e.setFocus(n))}}function Rc(t,e){if("text"==e.type)return"word"===t.unit?function(t,e){let n=t.position.textNode;if(n){let i=t.position.offset-n.startOffset;for(;!Dc(n.data,i,e)&&!Lc(n,i,e);){t.next();const o=e?t.position.nodeAfter:t.position.nodeBefore;if(o&&o.is("text")){const i=o.data.charAt(e?0:o.data.length-1);Nc.includes(i)||(t.next(),n=t.position.textNode)}i=t.position.offset-n.startOffset}}return t.position}(t.walker,t.isForward):function(t,e){const n=t.position.textNode;if(n){const i=n.data;let o=t.position.offset-n.startOffset;for(;vc(i,o)||"character"==e&&yc(i,o);)t.next(),o=t.position.offset-n.startOffset}return t.position}(t.walker,t.unit,t.isForward);if(e.type==(t.isForward?"elementStart":"elementEnd")){if(t.schema.isObject(e.item))return Hs._createAt(e.item,t.isForward?"after":"before");if(t.schema.checkChild(e.nextPosition,"$text"))return e.nextPosition}else{if(t.schema.isLimit(e.item))return void t.walker.skip(()=>!0);if(t.schema.checkChild(e.nextPosition,"$text"))return e.nextPosition}}function Dc(t,e,n){const i=e+(n?0:-1);return Nc.includes(t.charAt(i))}function Lc(t,e,n){return e===(n?t.endOffset:0)}function jc(t,e){const n=[];Array.from(t.getItems({direction:"backward"})).map(t=>e.createRangeOn(t)).filter(e=>{return(e.start.isAfter(t.start)||e.start.isEqual(t.start))&&(e.end.isBefore(t.end)||e.end.isEqual(t.end))}).forEach(t=>{n.push(t.start.parent),e.remove(t)}),n.forEach(t=>{let n=t;for(;n.parent&&n.isEmpty;){const t=e.createRangeOn(n);n=n.parent,e.remove(t)}})}function Vc(t){t.document.registerPostFixer(e=>(function(t,e){const n=e.document.selection,i=e.schema,o=[];let r=!1;for(const t of n.getRanges()){const e=zc(t,i);e?(o.push(e),r=!0):o.push(t)}if(r){let e=o;if(o.length>1){const t=o[0].start,n=o[o.length-1].end;e=[new qs(t,n)]}t.setSelection(e,{backward:n.isBackward})}})(e,t))}function zc(t,e){return t.isCollapsed?function(t,e){const n=t.start,i=e.getNearestSelectionRange(n);if(!i)return null;const o=i.start;if(n.isEqual(o))return null;if(o.nodeAfter&&e.isLimit(o.nodeAfter))return new qs(o,Hs._createAfter(o.nodeAfter));return new qs(o)}(t,e):function(t,e){const n=t.start,i=t.end,o=e.checkChild(n,"$text"),r=e.checkChild(i,"$text"),s=e.getLimitElement(n),a=e.getLimitElement(i);if(s===a){if(o&&r)return null;if(function(t,e,n){const i=t.nodeAfter&&!n.isLimit(t.nodeAfter)||n.checkChild(t,"$text"),o=e.nodeBefore&&!n.isLimit(e.nodeBefore)||n.checkChild(e,"$text");return i&&o}(n,i,e)){const t=e.getNearestSelectionRange(n,"forward"),o=e.getNearestSelectionRange(i,"backward");return new qs(t?t.start:n,o?o.start:i)}}const c=s&&!s.is("rootElement"),l=a&&!a.is("rootElement");if(c||l){const t=Hs._createAt(s,0),o=Hs._createAt(a,0),r=c?Bc(t,e,"start"):n,d=l?Bc(o,e,"end"):i;return new qs(r,d)}return null}(t,e)}function Bc(t,e,n){let i=t.parent,o=i;for(;e.isLimit(o)&&o.parent;)i=o,o=o.parent;return"start"===n?Hs._createBefore(i):Hs._createAfter(i)}class Fc{constructor(){this.markers=new Tc,this.document=new Ac(this),this.schema=new ka,this._pendingChanges=[],this._currentWriter=null,["insertContent","deleteContent","modifySelection","getSelectedContent","applyOperation"].forEach(t=>this.decorate(t)),this.on("applyOperation",(t,e)=>{e[0]._validate()},{priority:"highest"}),this.schema.register("$root",{isLimit:!0}),this.schema.register("$block",{allowIn:"$root",isBlock:!0}),this.schema.register("$text",{allowIn:"$block"}),this.schema.register("$clipboardHolder",{allowContentOf:"$root",isLimit:!0}),this.schema.extend("$text",{allowIn:"$clipboardHolder"}),this.schema.register("$marker",{allowIn:["$root","$block"]}),Vc(this)}change(t){return 0===this._pendingChanges.length?(this._pendingChanges.push({batch:new Ha,callback:t}),this._runPendingChanges()[0]):t(this._currentWriter)}enqueueChange(t,e){"string"==typeof t?t=new Ha(t):"function"==typeof t&&(e=t,t=new Ha),this._pendingChanges.push({batch:t,callback:e}),1==this._pendingChanges.length&&this._runPendingChanges()}applyOperation(t){t._execute()}insertContent(t,e,n){!function(t,e,n,i){t.change(o=>{let r;(r=n?n instanceof Js||n instanceof ea?n:o.createSelection(n,i):t.document.selection).isCollapsed||t.deleteContent(r);const s=new Sc(t,o,r.anchor);let a;a=e.is("documentFragment")?e.getChildren():[e],s.handleNodes(a,{isFirst:!0,isLast:!0});const c=s.getSelectionRange();c?r instanceof ea?o.setSelection(c):r.setTo(c):fs.a.warn("insertcontent-no-range: Cannot determine a proper selection range after insertion.")})}(this,t,e,n)}deleteContent(t,e){Ic(this,t,e)}modifySelection(t,e){Oc(this,t,e)}getSelectedContent(t){return function(t,e){return t.change(t=>{const n=t.createDocumentFragment(),i=e.getFirstRange();if(!i||i.isCollapsed)return n;const o=i.start.root,r=i.start.getCommonPath(i.end),s=o.getNodeByPath(r);let a;const c=(a=i.start.parent==i.end.parent?i:t.createRange(t.createPositionAt(s,i.start.path[r.length]),t.createPositionAt(s,i.end.path[r.length]+1))).end.offset-a.start.offset;for(const e of a.getItems({shallow:!0}))e.is("textProxy")?t.appendText(e.data,e.getAttributes(),n):t.append(e._clone(!0),n);if(a!=i){const e=i._getTransformedByMove(a.start,t.createPositionAt(n,0),c)[0],o=t.createRange(t.createPositionAt(n,0),e.start);jc(t.createRange(e.end,t.createPositionAt(n,"end")),t),jc(o,t)}return n})}(this,t)}hasContent(t){if(t instanceof zs&&(t=qs._createIn(t)),t.isCollapsed)return!1;for(const e of t.getItems())if(e.is("textProxy")||this.schema.isObject(e))return!0;return!1}createPositionFromPath(t,e,n){return new Hs(t,e,n)}createPositionAt(t,e){return Hs._createAt(t,e)}createPositionAfter(t){return Hs._createAfter(t)}createPositionBefore(t){return Hs._createBefore(t)}createRange(t,e){return new qs(t,e)}createRangeIn(t){return qs._createIn(t)}createRangeOn(t){return qs._createOn(t)}createSelection(t,e,n){return new Js(t,e,n)}createBatch(){return new Ha}destroy(){this.document.destroy(),this.stopListening()}_runPendingChanges(){const t=[];for(this.fire("_beforeChanges");this._pendingChanges.length;){const e=this._pendingChanges[0].batch;this._currentWriter=new dc(this,e);const n=this._pendingChanges[0].callback(this._currentWriter);t.push(n),this.fire("_change",this._currentWriter),this._pendingChanges.shift(),this._currentWriter=null}return this.fire("_afterChanges"),t}}F(Fc,Li);class Uc{constructor(){this._listener=Object.create(rr)}listenTo(t){this._listener.listenTo(t,"keydown",(t,e)=>{this._listener.fire("_keydown:"+fo(e),e)})}set(t,e,n={}){const i=mo(t),o=n.priority;this._listener.listenTo(this._listener,"_keydown:"+i,(t,n)=>{e(n,()=>{n.preventDefault(),n.stopPropagation(),t.stop()}),t.return=!0},{priority:o})}press(t){return!!this._listener.fire("_keydown:"+fo(t),t)}destroy(){this._listener.stopListening()}}class Hc extends Uc{constructor(t){super(),this.editor=t}set(t,e,n={}){if("string"==typeof e){const t=e;e=((e,n)=>{this.editor.execute(t),n()})}super.set(t,e,n)}}n(42);class qc{constructor(t){const e=this.constructor.builtinPlugins;this.config=new T(t,this.constructor.defaultConfig),this.config.define("plugins",e),this.plugins=new ma(this,e),this.commands=new pa,this.locale=new ba(this.config.get("language")),this.t=this.locale.t,this.set("state","initializing"),this.once("ready",()=>this.state="ready",{priority:"high"}),this.once("destroy",()=>this.state="destroyed",{priority:"high"}),this.set("isReadOnly",!1),this.model=new Fc,this.data=new za(this.model),this.editing=new fa(this.model),this.editing.view.document.bind("isReadOnly").to(this),this.conversion=new Ba,this.conversion.register("downcast",[this.editing.downcastDispatcher,this.data.downcastDispatcher]),this.conversion.register("editingDowncast",[this.editing.downcastDispatcher]),this.conversion.register("dataDowncast",[this.data.downcastDispatcher]),this.conversion.register("upcast",[this.data.upcastDispatcher]),this.keystrokes=new Hc(this),this.keystrokes.listenTo(this.editing.view.document)}initPlugins(){const t=this,e=this.config;return function(){const n=e.get("plugins")||[],i=e.get("removePlugins")||[],o=e.get("extraPlugins")||[];return t.plugins.load(n.concat(o),i)}().then(t=>n(t,"init").then(()=>n(t,"afterInit"))).then(()=>this.fire("pluginsReady"));function n(t,e){return t.reduce((t,n)=>n[e]?t.then(n[e].bind(n)):t,Promise.resolve())}}destroy(){let t=Promise.resolve();return"initializing"==this.state&&(t=new Promise(t=>this.once("ready",t))),t.then(()=>{this.fire("destroy"),this.stopListening(),this.commands.destroy()}).then(()=>this.plugins.destroy()).then(()=>{this.model.destroy(),this.data.destroy(),this.editing.destroy(),this.keystrokes.destroy()})}execute(...t){this.commands.execute(...t)}static create(t){return new Promise(e=>{const n=new this(t);e(n.initPlugins().then(()=>{n.fire("dataReady"),n.fire("ready")}).then(()=>n))})}}F(qc,Li);var Wc={setData(t){this.data.set(t)},getData(){return this.data.get()}};var Yc={updateSourceElement(){if(!this.sourceElement)throw new P.b("editor-missing-sourceelement: Cannot update the source element of a detached editor.");!function(t,e){t instanceof HTMLTextAreaElement&&(t.value=e),t.innerHTML=e}(this.sourceElement,this.data.get())}};class $c{getHtml(t){const e=document.implementation.createHTMLDocument("").createElement("div");return e.appendChild(t),e.innerHTML}}class Gc{constructor(){this._domParser=new DOMParser,this._domConverter=new er({blockFiller:No}),this._htmlWriter=new $c}toData(t){const e=this._domConverter.viewToDom(t,document);return this._htmlWriter.getHtml(e)}toView(t){const e=this._toDom(t);return this._domConverter.domToView(e)}_toDom(t){const e=this._domParser.parseFromString(t,"text/html"),n=e.createDocumentFragment(),i=e.body.childNodes;for(;i.length>0;)n.appendChild(i[0]);return n}}class Qc{constructor(t){this.editor=t,this._components=new Map}*names(){for(const t of this._components.values())yield t.originalName}add(t,e){if(this.has(t))throw new P.b("componentfactory-item-exists: The item already exists in the component factory.",{name:t});this._components.set(Jc(t),{callback:e,originalName:t})}create(t){if(!this.has(t))throw new P.b("componentfactory-item-missing: The required component is not registered in the factory.",{name:t});return this._components.get(Jc(t)).callback(this.editor.locale)}has(t){return this._components.has(Jc(t))}}function Jc(t){return String(t).toLowerCase()}class Kc{constructor(){this.set("isFocused",!1),this.focusedElement=null,this._elements=new Set,this._nextEventLoopTimeout=null}add(t){if(this._elements.has(t))throw new P.b("focusTracker-add-element-already-exist");this.listenTo(t,"focus",()=>this._focus(t),{useCapture:!0}),this.listenTo(t,"blur",()=>this._blur(),{useCapture:!0}),this._elements.add(t)}remove(t){t===this.focusedElement&&this._blur(t),this._elements.has(t)&&(this.stopListening(t),this._elements.delete(t))}_focus(t){clearTimeout(this._nextEventLoopTimeout),this.focusedElement=t,this.isFocused=!0}_blur(){clearTimeout(this._nextEventLoopTimeout),this._nextEventLoopTimeout=setTimeout(()=>{this.focusedElement=null,this.isFocused=!1},0)}}F(Kc,rr),F(Kc,Li);class Zc{constructor(t,e){this.editor=t,this.view=e,this.componentFactory=new Qc(t),this.focusTracker=new Kc,this.listenTo(t.editing.view.document,"layoutChanged",()=>this.update())}update(){this.fire("update")}destroy(){this.stopListening(),this.view.destroy()}}F(Zc,R);class Xc extends Zc{constructor(t,e){super(t,e),this._toolbarConfig=function(t){return Array.isArray(t)?{items:t}:t?Object.assign({items:[]},t):{items:[]}}(t.config.get("toolbar"))}init(){const t=this.editor,e=this.view;e.render(),e.stickyPanel.bind("isActive").to(this.focusTracker,"isFocused"),e.stickyPanel.limiterElement=e.element,this._toolbarConfig.viewportTopOffset&&(e.stickyPanel.viewportTopOffset=this._toolbarConfig.viewportTopOffset);const n=t.editing.view.document.getRoot();e.editable.bind("isReadOnly").to(n),e.editable.bind("isFocused").to(t.editing.view.document),e.editable.name=n.rootName,this.focusTracker.add(this.view.editableElement),this.view.toolbar.fillFromConfig(this._toolbarConfig.items,this.componentFactory),function({origin:t,originKeystrokeHandler:e,originFocusTracker:n,toolbar:i,beforeFocus:o,afterBlur:r}){n.add(i.element),e.set("Alt+F10",(t,e)=>{n.isFocused&&!i.focusTracker.isFocused&&(o&&o(),i.focus(),e())}),i.keystrokes.set("Esc",(e,n)=>{i.focusTracker.isFocused&&(t.focus(),r&&r(),n())})}({origin:t.editing.view,originFocusTracker:this.focusTracker,originKeystrokeHandler:t.keystrokes,toolbar:this.view.toolbar})}}class tl extends Xi{constructor(t){super({idProperty:"viewUid"}),this.on("add",(t,e,n)=>{e.isRendered||e.render(),e.element&&this._parentElement&&this._parentElement.insertBefore(e.element,this._parentElement.children[n])}),this.on("remove",(t,e)=>{e.element&&this._parentElement&&e.element.remove()}),this.locale=t,this._parentElement=null}destroy(){this.map(t=>t.destroy())}setParent(t){this._parentElement=t}delegate(...t){if(!t.length||!function(t){return t.every(t=>"string"==typeof t)}(t))throw new P.b("ui-viewcollection-delegate-wrong-events: All event names must be strings.");return{to:e=>{for(const n of this)for(const i of t)n.delegate(i).to(e);this.on("add",(n,i)=>{for(const n of t)i.delegate(n).to(e)}),this.on("remove",(n,i)=>{for(const n of t)i.stopDelegating(n,e)})}}}}F(Xi,Li);var el=1,nl=4;var il=function(t,e){return oi(t,el|nl,e="function"==typeof e?e:void 0)};const ol="http://www.w3.org/1999/xhtml";class rl{constructor(t){Object.assign(this,ml(fl(t))),this._isRendered=!1,this._revertData=null}render(){const t=this._renderNode({intoFragment:!0});return this._isRendered=!0,t}apply(t){return this._revertData={children:[],bindings:[],attributes:{}},this._renderNode({node:t,isApplying:!0,revertData:this._revertData}),t}revert(t){if(!this._revertData)throw new P.b("ui-template-revert-not-applied: Attempting to revert a template which has not been applied yet.");this._revertTemplateFromNode(t,this._revertData)}*getViews(){yield*function*t(e){if(e.children)for(const n of e.children)_l(n)?yield n:kl(n)&&(yield*t(n))}(this)}static bind(t,e){return{to:(n,i)=>new al({eventNameOrFunction:n,attribute:n,observable:t,emitter:e,callback:i}),if:(n,i,o)=>new cl({observable:t,emitter:e,attribute:n,valueIfTrue:i,callback:o})}}static extend(t,e){t._isRendered&&fs.a.warn("template-extend-render: Attempting to extend a template which has already been rendered."),function t(e,n){n.attributes&&(e.attributes||(e.attributes={}),bl(e.attributes,n.attributes));n.eventListeners&&(e.eventListeners||(e.eventListeners={}),bl(e.eventListeners,n.eventListeners));n.text&&e.text.push(...n.text);if(n.children&&n.children.length){if(e.children.length!=n.children.length)throw new P.b("ui-template-extend-children-mismatch: The number of children in extended definition does not match.");let i=0;for(const o of n.children)t(e.children[i++],o)}}(t,ml(fl(e)))}_renderNode(t){let e;if(e=t.node?this.tag&&this.text:this.tag?this.text:!this.text)throw new P.b('ui-template-wrong-syntax: Node definition must have either "tag" or "text" when rendering a new Node.');return this.text?this._renderText(t):this._renderElement(t)}_renderElement(t){let e=t.node;return e||(e=t.node=document.createElementNS(this.ns||ol,this.tag)),this._renderAttributes(t),this._renderElementChildren(t),this._setUpListeners(t),e}_renderText(t){let e=t.node;return e?t.revertData.text=e.textContent:e=t.node=document.createTextNode(""),ll(this.text)?this._bindToObservable({schema:this.text,updater:function(t){return{set(e){t.textContent=e},remove(){t.textContent=""}}}(e),data:t}):e.textContent=this.text.join(""),e}_renderAttributes(t){let e,n,i,o;if(!this.attributes)return;const r=t.node,s=t.revertData;for(e in this.attributes)if(i=r.getAttribute(e),n=this.attributes[e],s&&(s.attributes[e]=i),o=it(n[0])&&n[0].ns?n[0].ns:null,ll(n)){const a=o?n[0].value:n;s&&yl(e)&&a.unshift(i),this._bindToObservable({schema:a,updater:ul(r,e,o),data:t})}else"style"==e&&"string"!=typeof n[0]?this._renderStyleAttribute(n[0],t):(s&&i&&yl(e)&&n.unshift(i),wl(n=n.map(t=>t&&t.value||t).reduce((t,e)=>t.concat(e),[]).reduce(gl,""))||r.setAttributeNS(o,e,n))}_renderStyleAttribute(t,e){const n=e.node;for(const i in t){const o=t[i];ll(o)?this._bindToObservable({schema:[o],updater:hl(n,i),data:e}):n.style[i]=o}}_renderElementChildren(t){const e=t.node,n=t.intoFragment?document.createDocumentFragment():e,i=t.isApplying;let o=0;for(const r of this.children)if(vl(r)){if(!i){r.setParent(e);for(const t of r)n.appendChild(t.element)}}else if(_l(r))i||(r.isRendered||r.render(),n.appendChild(r.element));else if(qo(r))n.appendChild(r);else if(i){const e={children:[],bindings:[],attributes:{}};t.revertData.children.push(e),r._renderNode({node:n.childNodes[o++],isApplying:!0,revertData:e})}else n.appendChild(r.render());t.intoFragment&&e.appendChild(n)}_setUpListeners(t){if(this.eventListeners)for(const e in this.eventListeners){const n=this.eventListeners[e].map(n=>{const[i,o]=e.split("@");return n.activateDomEventListener(i,o,t)});t.revertData&&t.revertData.bindings.push(n)}}_bindToObservable({schema:t,updater:e,data:n}){const i=n.revertData;dl(t,e,n);const o=t.filter(t=>!wl(t)).filter(t=>t.observable).map(i=>i.activateAttributeListener(t,e,n));i&&i.bindings.push(o)}_revertTemplateFromNode(t,e){for(const t of e.bindings)for(const e of t)e();if(e.text)t.textContent=e.text;else{for(const n in e.attributes){const i=e.attributes[n];null===i?t.removeAttribute(n):t.setAttribute(n,i)}for(let n=0;n<e.children.length;++n)this._revertTemplateFromNode(t.childNodes[n],e.children[n])}}}F(rl,R);class sl{constructor(t){Object.assign(this,t)}getValue(t){const e=this.observable[this.attribute];return this.callback?this.callback(e,t):e}activateAttributeListener(t,e,n){const i=()=>dl(t,e,n);return this.emitter.listenTo(this.observable,"change:"+this.attribute,i),()=>{this.emitter.stopListening(this.observable,"change:"+this.attribute,i)}}}class al extends sl{activateDomEventListener(t,e,n){const i=(t,n)=>{e&&!n.target.matches(e)||("function"==typeof this.eventNameOrFunction?this.eventNameOrFunction(n):this.observable.fire(this.eventNameOrFunction,n))};return this.emitter.listenTo(n.node,t,i),()=>{this.emitter.stopListening(n.node,t,i)}}}class cl extends sl{getValue(t){return!wl(super.getValue(t))&&(this.valueIfTrue||!0)}}function ll(t){return!!t&&(t.value&&(t=t.value),Array.isArray(t)?t.some(ll):t instanceof sl)}function dl(t,e,{node:n}){let i=function(t,e){return t.map(t=>t instanceof sl?t.getValue(e):t)}(t,n);wl(i=1==t.length&&t[0]instanceof cl?i[0]:i.reduce(gl,""))?e.remove():e.set(i)}function ul(t,e,n){return{set(i){t.setAttributeNS(n,e,i)},remove(){t.removeAttributeNS(n,e)}}}function hl(t,e){return{set(n){t.style[e]=n},remove(){t.style[e]=null}}}function fl(t){return il(t,t=>{if(t&&(t instanceof sl||kl(t)||_l(t)||vl(t)))return t})}function ml(t){if("string"==typeof t?t=function(t){return{text:[t]}}(t):t.text&&function(t){Array.isArray(t.text)||(t.text=[t.text])}(t),t.on&&(t.eventListeners=function(t){for(const e in t)pl(t,e);return t}(t.on),delete t.on),!t.text){t.attributes&&function(t){for(const e in t)t[e].value&&(t[e].value=[].concat(t[e].value)),pl(t,e)}(t.attributes);const e=[];if(t.children)if(vl(t.children))e.push(t.children);else for(const n of t.children)kl(n)||_l(n)||qo(n)?e.push(n):e.push(new rl(n));t.children=e}return t}function pl(t,e){Array.isArray(t[e])||(t[e]=[t[e]])}function gl(t,e){return wl(e)?t:wl(t)?e:`${t} ${e}`}function bl(t,e){for(const n in e)t[n]?t[n].push(...e[n]):t[n]=e[n]}function wl(t){return!t&&0!==t}function _l(t){return t instanceof xl}function kl(t){return t instanceof rl}function vl(t){return t instanceof tl}function yl(t){return"class"==t||"style"==t}n(43);class xl{constructor(t){this.element=null,this.isRendered=!1,this.locale=t,this.t=t&&t.t,this._viewCollections=new Xi,this._unboundChildren=this.createCollection(),this._viewCollections.on("add",(e,n)=>{n.locale=t}),this.decorate("render")}get bindTemplate(){return this._bindTemplate?this._bindTemplate:this._bindTemplate=rl.bind(this,this)}createCollection(){const t=new tl;return this._viewCollections.add(t),t}registerChild(t){ui(t)||(t=[t]);for(const e of t)this._unboundChildren.add(e)}deregisterChild(t){ui(t)||(t=[t]);for(const e of t)this._unboundChildren.remove(e)}setTemplate(t){this.template=new rl(t)}extendTemplate(t){rl.extend(this.template,t)}render(){if(this.isRendered)throw new P.b("ui-view-render-already-rendered: This View has already been rendered.");this.template&&(this.element=this.template.render(),this.registerChild(this.template.getViews())),this.isRendered=!0}destroy(){this.stopListening(),this._viewCollections.map(t=>t.destroy())}}F(xl,rr),F(xl,Li);n(46);class Al extends xl{constructor(t){super(t),this.body=this.createCollection()}render(){super.render(),this._renderBodyCollection()}destroy(){return this._bodyCollectionContainer.remove(),super.destroy()}_renderBodyCollection(){const t=this._bodyCollectionContainer=new rl({tag:"div",attributes:{class:["ck","ck-reset_all","ck-body","ck-rounded-corners"]},children:this.body}).render();document.body.appendChild(t)}}n(48);class Cl extends xl{constructor(t){super(t),this.set("text"),this.set("for");const e=this.bindTemplate;this.setTemplate({tag:"label",attributes:{class:["ck","ck-label"],for:e.to("for")},children:[{text:e.to("text")}]})}}class Tl extends Al{constructor(t){super(t);const e=I();this.top=this.createCollection(),this.main=this.createCollection(),this._voiceLabelView=this._createVoiceLabel(e),this.setTemplate({tag:"div",attributes:{class:["ck","ck-reset","ck-editor","ck-rounded-corners"],role:"application",dir:"ltr",lang:t.language,"aria-labelledby":`ck-editor__aria-label_${e}`},children:[this._voiceLabelView,{tag:"div",attributes:{class:["ck","ck-editor__top","ck-reset_all"],role:"presentation"},children:this.top},{tag:"div",attributes:{class:["ck","ck-editor__main"],role:"presentation"},children:this.main}]})}_createVoiceLabel(t){const e=this.t,n=new Cl;return n.text=e("az"),n.extendTemplate({attributes:{id:`ck-editor__aria-label_${t}`,class:"ck-voice-label"}}),n}}class Pl extends xl{constructor(t,e){super(t);const n=this.bindTemplate;e&&(this.element=this.editableElement=e),this.setTemplate({tag:"div",attributes:{class:["ck","ck-content","ck-editor__editable","ck-rounded-corners",n.to("isFocused",t=>t?"ck-focused":"ck-blurred"),n.if("isReadOnly","ck-read-only")],contenteditable:n.to("isReadOnly",t=>!t)}}),this.set("isReadOnly",!1),this.set("isFocused",!1),this.externalElement=e}render(){super.render(),this.externalElement?this.template.apply(this.element=this.externalElement):this.editableElement=this.element}destroy(){this.externalElement&&this.template.revert(this.externalElement),super.destroy()}}class Ml extends Pl{constructor(t,e){super(t,e);const n=this.bindTemplate,i=this.t;this.set("name",null);this.extendTemplate({attributes:{role:"textbox","aria-label":n.to("name",t=>i("bm",[t])),class:"ck-editor__editable_inline"}})}}function Sl(t){return e=>e+t}n(50);const Il=Sl("px");class El extends xl{constructor(t){super(t);const e=this.bindTemplate;this.set("isActive",!1),this.set("isSticky",!1),this.set("limiterElement",null),this.set("limiterBottomOffset",50),this.set("viewportTopOffset",0),this.set("_marginLeft",null),this.set("_isStickyToTheLimiter",!1),this.set("_hasViewportTopOffset",!1),this.content=this.createCollection(),this._contentPanelPlaceholder=new rl({tag:"div",attributes:{class:["ck","ck-sticky-panel__placeholder"],style:{display:e.to("isSticky",t=>t?"block":"none"),height:e.to("isSticky",t=>t?Il(this._panelRect.height):null)}}}).render(),this._contentPanel=new rl({tag:"div",attributes:{class:["ck","ck-sticky-panel__content",e.if("isSticky","ck-sticky-panel__content_sticky"),e.if("_isStickyToTheLimiter","ck-sticky-panel__content_sticky_bottom-limit")],style:{width:e.to("isSticky",t=>t?Il(this._contentPanelPlaceholder.getBoundingClientRect().width):null),top:e.to("_hasViewportTopOffset",t=>t?Il(this.viewportTopOffset):null),bottom:e.to("_isStickyToTheLimiter",t=>t?Il(this.limiterBottomOffset):null),marginLeft:e.to("_marginLeft")}},children:this.content}).render(),this.setTemplate({tag:"div",attributes:{class:["ck","ck-sticky-panel"]},children:[this._contentPanelPlaceholder,this._contentPanel]})}render(){super.render(),this._checkIfShouldBeSticky(),this.listenTo(Ko.window,"scroll",()=>{this._checkIfShouldBeSticky()}),this.listenTo(this,"change:isActive",()=>{this._checkIfShouldBeSticky()})}_checkIfShouldBeSticky(){const t=this._panelRect=this._contentPanel.getBoundingClientRect();let e;this.limiterElement?(e=this._limiterRect=this.limiterElement.getBoundingClientRect(),this.isSticky=this.isActive&&e.top<this.viewportTopOffset&&this._panelRect.height+this.limiterBottomOffset<e.height):this.isSticky=!1,this.isSticky?(this._isStickyToTheLimiter=e.bottom<t.height+this.limiterBottomOffset+this.viewportTopOffset,this._hasViewportTopOffset=!this._isStickyToTheLimiter&&!!this.viewportTopOffset,this._marginLeft=this._isStickyToTheLimiter?null:Il(-Ko.window.scrollX)):(this._isStickyToTheLimiter=!1,this._hasViewportTopOffset=!1,this._marginLeft=null)}}class Nl{constructor(t){if(Object.assign(this,t),t.actions&&t.keystrokeHandler)for(const e in t.actions){let n=t.actions[e];"string"==typeof n&&(n=[n]);for(const i of n)t.keystrokeHandler.set(i,(t,n)=>{this[e](),n()})}}get first(){return this.focusables.find(Ol)||null}get last(){return this.focusables.filter(Ol).slice(-1)[0]||null}get next(){return this._getFocusableItem(1)}get previous(){return this._getFocusableItem(-1)}get current(){let t=null;return null===this.focusTracker.focusedElement?null:(this.focusables.find((e,n)=>{const i=e.element===this.focusTracker.focusedElement;return i&&(t=n),i}),t)}focusFirst(){this._focus(this.first)}focusLast(){this._focus(this.last)}focusNext(){this._focus(this.next)}focusPrevious(){this._focus(this.previous)}_focus(t){t&&t.focus()}_getFocusableItem(t){const e=this.current,n=this.focusables.length;if(!n)return null;if(null===e)return this[1===t?"first":"last"];let i=(e+n+t)%n;do{const e=this.focusables.get(i);if(Ol(e))return e;i=(i+n+t)%n}while(i!==e);return null}}function Ol(t){return!(!t.focus||"none"==Ko.window.getComputedStyle(t.element).display)}class Rl extends xl{constructor(t){super(t),this.setTemplate({tag:"span",attributes:{class:["ck","ck-toolbar__separator"]}})}}n(52);class Dl extends xl{constructor(t){super(t);const e=this.bindTemplate;this.items=this.createCollection(),this.focusTracker=new Kc,this.keystrokes=new Uc,this.set("isVertical",!1),this.set("className"),this._focusCycler=new Nl({focusables:this.items,focusTracker:this.focusTracker,keystrokeHandler:this.keystrokes,actions:{focusPrevious:["arrowleft","arrowup"],focusNext:["arrowright","arrowdown"]}}),this.setTemplate({tag:"div",attributes:{class:["ck","ck-toolbar",e.if("isVertical","ck-toolbar_vertical"),e.to("className")]},children:this.items,on:{mousedown:function(t){return t.bindTemplate.to(e=>{e.target===t.element&&e.preventDefault()})}(this)}})}render(){super.render();for(const t of this.items)this.focusTracker.add(t.element);this.items.on("add",(t,e)=>{this.focusTracker.add(e.element)}),this.items.on("remove",(t,e)=>{this.focusTracker.remove(e.element)}),this.keystrokes.listenTo(this.element)}focus(){this._focusCycler.focusFirst()}focusLast(){this._focusCycler.focusLast()}fillFromConfig(t,e){t.map(t=>{"|"==t?this.items.add(new Rl):e.has(t)?this.items.add(e.create(t)):fs.a.warn("toolbarview-item-unavailable: The requested toolbar item is unavailable.",{name:t})})}}n(54);class Ll extends Tl{constructor(t){super(t),this.stickyPanel=new El(t),this.toolbar=new Dl(t),this.editable=new Ml(t)}render(){super.render(),this.stickyPanel.content.add(this.toolbar),this.top.add(this.stickyPanel),this.main.add(this.editable)}get editableElement(){return this.editable.element}}class jl{constructor(){this._replacedElements=[]}replace(t,e){this._replacedElements.push({element:t,newElement:e}),t.style.display="none",e&&t.parentNode.insertBefore(e,t.nextSibling)}restore(){this._replacedElements.forEach(({element:t,newElement:e})=>{t.style.display="",e&&e.remove()}),this._replacedElements=[]}}class Vl extends qc{constructor(t,e){super(e),tr(t)&&(this.sourceElement=t),this._elementReplacer=new jl,this.data.processor=new Gc,this.model.document.createRoot(),this.ui=new Xc(this,new Ll(this.locale)),function(t){if(!ct(t.updateSourceElement))throw new P.b("attachtoform-missing-elementapi-interface: Editor passed to attachToForm() must implement ElementApi.");const e=t.sourceElement;if(e&&"textarea"===e.tagName.toLowerCase()&&e.form){let n;const i=e.form,o=()=>t.updateSourceElement();ct(i.submit)&&(n=i.submit,i.submit=(()=>{o(),n.apply(i)})),i.addEventListener("submit",o),t.on("destroy",()=>{i.removeEventListener("submit",o),n&&(i.submit=n)})}}(this)}get element(){return this.ui.view.element}destroy(){return this.sourceElement&&this.updateSourceElement(),this._elementReplacer.restore(),this.ui.destroy(),super.destroy()}static create(t,e){return new Promise(n=>{const i=new this(t,e);n(i.initPlugins().then(()=>i.ui.init()).then(()=>{tr(t)&&i._elementReplacer.replace(t,i.element),i.fire("uiReady")}).then(()=>i.editing.view.attachDomRoot(i.ui.view.editableElement)).then(()=>{const e=tr(t)?function(t){return t instanceof HTMLTextAreaElement?t.value:t.innerHTML}(t):t;return i.data.init(e)}).then(()=>{i.fire("dataReady"),i.fire("ready")}).then(()=>i))})}}F(Vl,Wc),F(Vl,Yc);class zl{constructor(t){this.editor=t}destroy(){this.stopListening()}}F(zl,Li);class Bl{constructor(t){this.files=function(t){const e=t.files?Array.from(t.files):[],n=t.items?Array.from(t.items):[];if(e.length)return e;return n.filter(t=>"file"===t.kind).map(t=>t.getAsFile())}(t),this._native=t}get types(){return this._native.types}getData(t){return this._native.getData(t)}setData(t,e){this._native.setData(t,e)}}class Fl extends Jr{constructor(t){super(t);const e=this.document;function n(t,n){n.preventDefault();const i=n.dropRange?[n.dropRange]:Array.from(e.selection.getRanges());e.fire("clipboardInput",{dataTransfer:n.dataTransfer,targetRanges:i})}this.domEventType=["paste","copy","cut","drop","dragover"],this.listenTo(e,"paste",n,{priority:"low"}),this.listenTo(e,"drop",n,{priority:"low"})}onDomEvent(t){const e={dataTransfer:new Bl(t.clipboardData?t.clipboardData:t.dataTransfer)};"drop"==t.type&&(e.dropRange=function(t,e){const n=e.target.ownerDocument,i=e.clientX,o=e.clientY;let r;n.caretRangeFromPoint&&n.caretRangeFromPoint(i,o)?r=n.caretRangeFromPoint(i,o):e.rangeParent&&((r=n.createRange()).setStart(e.rangeParent,e.rangeOffset),r.collapse(!0));return r?t.domConverter.domRangeToView(r):t.document.selection.getFirstRange()}(this.view,t)),this.fire(t.type,t,e)}}const Ul=["figcaption","li"];class Hl extends zl{static get pluginName(){return"Clipboard"}init(){const t=this.editor,e=t.model.document,n=t.editing.view,i=n.document;function o(n,o){const r=o.dataTransfer;o.preventDefault();const s=t.data.toView(t.model.getSelectedContent(e.selection));i.fire("clipboardOutput",{dataTransfer:r,content:s,method:n.name})}this._htmlDataProcessor=new Gc,n.addObserver(Fl),this.listenTo(i,"clipboardInput",e=>{t.isReadOnly&&e.stop()},{priority:"highest"}),this.listenTo(i,"clipboardInput",(t,e)=>{const i=e.dataTransfer;let o="";i.getData("text/html")?o=function(t){return t.replace(/<span(?: class="Apple-converted-space"|)>(\s+)<\/span>/g,(t,e)=>1==e.length?" ":e)}(i.getData("text/html")):i.getData("text/plain")&&(o=function(t){return(t=t.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n\n/g,"</p><p>").replace(/\n/g,"<br>").replace(/^\s/,"&nbsp;").replace(/\s$/,"&nbsp;").replace(/\s\s/g," &nbsp;")).indexOf("</p><p>")>-1&&(t=`<p>${t}</p>`),t}(i.getData("text/plain"))),o=this._htmlDataProcessor.toView(o),this.fire("inputTransformation",{content:o,dataTransfer:i}),n.scrollToTheSelection()},{priority:"low"}),this.listenTo(this,"inputTransformation",(t,e)=>{if(!e.content.isEmpty){const t=this.editor.data,n=this.editor.model,i=t.toModel(e.content,"$clipboardHolder");if(0==i.childCount)return;n.insertContent(i)}},{priority:"low"}),this.listenTo(i,"copy",o,{priority:"low"}),this.listenTo(i,"cut",(e,n)=>{t.isReadOnly?n.preventDefault():o(e,n)},{priority:"low"}),this.listenTo(i,"clipboardOutput",(n,i)=>{i.content.isEmpty||(i.dataTransfer.setData("text/html",this._htmlDataProcessor.toData(i.content)),i.dataTransfer.setData("text/plain",function t(e){let n="";if(e.is("text")||e.is("textProxy"))n=e.data;else if(e.is("img")&&e.hasAttribute("alt"))n=e.getAttribute("alt");else{let i=null;for(const o of e.getChildren()){const e=t(o);i&&(i.is("containerElement")||o.is("containerElement"))&&(Ul.includes(i.name)||Ul.includes(o.name)?n+="\n":n+="\n\n"),n+=e,i=o}}return n}(i.content))),"cut"==i.method&&t.model.deleteContent(e.selection)},{priority:"low"})}}class ql{constructor(t){this.editor=t,this.set("value",void 0),this.set("isEnabled",!1),this.decorate("execute"),this.listenTo(this.editor.model.document,"change",()=>{this.refresh()}),this.on("execute",t=>{this.isEnabled||t.stop()},{priority:"high"}),this.listenTo(t,"change:isReadOnly",(t,e,n)=>{n?(this.on("set:isEnabled",Wl,{priority:"highest"}),this.isEnabled=!1):(this.off("set:isEnabled",Wl),this.refresh())})}refresh(){this.isEnabled=!0}execute(){}destroy(){this.stopListening()}}function Wl(t){t.return=!1,t.stop()}F(ql,Li);class Yl extends ql{execute(){const t=this.editor.model,e=t.document;t.change(n=>{!function(t,e,n,i){const o=n.isCollapsed,r=n.getFirstRange(),s=r.start.parent,a=r.end.parent;if(i.isLimit(s)||i.isLimit(a))return void(o||s!=a||t.deleteContent(n));if(o)$l(e,r.start);else{const i=!(r.start.isAtStart&&r.end.isAtEnd),o=s==a;t.deleteContent(n,{leaveUnmerged:i}),i&&(o?$l(e,n.focus):e.setSelection(a,0))}}(this.editor.model,n,e.selection,t.schema),this.fire("afterExecute",{writer:n})})}}function $l(t,e){t.split(e),t.setSelection(e.parent.nextSibling,0)}class Gl extends cr{constructor(t){super(t);const e=this.document;e.on("keydown",(t,n)=>{if(this.isEnabled&&n.keyCode==ho.enter){let i;e.once("enter",t=>i=t,{priority:"highest"}),e.fire("enter",new Qr(e,n.domEvent,{isSoft:n.shiftKey})),i&&i.stop.called&&t.stop()}})}observe(){}}class Ql extends zl{static get pluginName(){return"Enter"}init(){const t=this.editor,e=t.editing.view,n=e.document;e.addObserver(Gl),t.commands.add("enter",new Yl(t)),this.listenTo(n,"enter",(n,i)=>{i.preventDefault(),i.isSoft||(t.execute("enter"),e.scrollToTheSelection())},{priority:"low"})}}class Jl extends ql{execute(){const t=this.editor.model,e=t.document;t.change(n=>{!function(t,e,n){const i=n.isCollapsed,o=n.getFirstRange(),r=o.start.parent,s=o.end.parent,a=r==s;if(i)Kl(e,o.end);else{const i=!(o.start.isAtStart&&o.end.isAtEnd);t.deleteContent(n,{leaveUnmerged:i}),a?Kl(e,n.focus):i&&e.setSelection(s,0)}}(t,n,e.selection),this.fire("afterExecute",{writer:n})})}refresh(){const t=this.editor.model,e=t.document;this.isEnabled=function(t,e){if(e.rangeCount>1)return!1;const n=e.anchor;if(!n||!t.checkChild(n,"softBreak"))return!1;const i=e.getFirstRange(),o=i.start.parent,r=i.end.parent;if((Zl(o,t)||Zl(r,t))&&o!==r)return!1;return!0}(t.schema,e.selection)}}function Kl(t,e){const n=t.createElement("softBreak");t.insert(n,e),t.setSelection(n,"after")}function Zl(t,e){return!t.is("rootElement")&&(e.isLimit(t)||Zl(t.parent,e))}class Xl extends zl{static get pluginName(){return"ShiftEnter"}init(){const t=this.editor,e=t.model.schema,n=t.conversion,i=t.editing.view,o=i.document;e.register("softBreak",{allowWhere:"$text"}),n.for("upcast").add(Oa({model:"softBreak",view:"br"})),n.for("downcast").add(aa({model:"softBreak",view:(t,e)=>e.createEmptyElement("br")})),i.addObserver(Gl),t.commands.add("shiftEnter",new Jl(t)),this.listenTo(o,"enter",(e,n)=>{n.preventDefault(),n.isSoft&&(t.execute("shiftEnter"),i.scrollToTheSelection())},{priority:"low"})}}class td{constructor(t,e=20){this.model=t,this.size=0,this.limit=e,this.isLocked=!1,this._changeCallback=((t,e)=>{"transparent"!=e.type&&e!==this._batch&&this._reset(!0)}),this._selectionChangeCallback=(()=>{this._reset()}),this.model.document.on("change",this._changeCallback),this.model.document.selection.on("change:range",this._selectionChangeCallback),this.model.document.selection.on("change:attribute",this._selectionChangeCallback)}get batch(){return this._batch||(this._batch=this.model.createBatch()),this._batch}input(t){this.size+=t,this.size>=this.limit&&this._reset(!0)}lock(){this.isLocked=!0}unlock(){this.isLocked=!1}destroy(){this.model.document.off("change",this._changeCallback),this.model.document.selection.off("change:range",this._selectionChangeCallback),this.model.document.selection.off("change:attribute",this._selectionChangeCallback)}_reset(t){this.isLocked&&!t||(this._batch=null,this.size=0)}}class ed extends ql{constructor(t,e){super(t),this._buffer=new td(t.model,e)}get buffer(){return this._buffer}destroy(){super.destroy(),this._buffer.destroy()}execute(t={}){const e=this.editor.model,n=e.document,i=t.text||"",o=i.length,r=t.range||n.selection.getFirstRange(),s=t.resultRange;e.enqueueChange(this._buffer.batch,t=>{const e=r.isCollapsed;this._buffer.lock(),e||t.remove(r),i&&t.insertText(i,n.selection.getAttributes(),r.start),s?t.setSelection(s):e&&t.setSelection(r.start.getShiftedBy(o)),this._buffer.unlock(),this._buffer.input(o)})}}function nd(t){let e=null;const n=t.model,i=t.editing.view,o=t.commands.get("input");function r(){const t=o.buffer;t.lock(),n.enqueueChange(t.batch,()=>{n.deleteContent(n.document.selection)}),t.unlock()}i.document.on("keydown",(t,s)=>(function(t){const s=n.document,a=i.document.isComposing,c=e&&e.isEqual(s.selection);if(e=null,!o.isEnabled)return;if(function(t){if(t.ctrlKey)return!0;return id.includes(t.keyCode)}(t)||s.selection.isCollapsed)return;if(a&&229===t.keyCode)return;if(!a&&229===t.keyCode&&c)return;r()})(s),{priority:"lowest"}),i.document.on("compositionstart",function(){const t=n.document,e=1!==t.selection.rangeCount||t.selection.getFirstRange().isFlat;if(t.selection.isCollapsed||e)return;r()},{priority:"lowest"}),i.document.on("compositionend",()=>{e=n.createSelection(n.document.selection)},{priority:"lowest"})}const id=[fo("arrowUp"),fo("arrowRight"),fo("arrowDown"),fo("arrowLeft"),9,16,17,18,19,20,27,33,34,35,36,45,91,93,144,145,173,174,175,176,177,178,179,255];for(let t=112;t<=135;t++)id.push(t);function od(t){if(0==t.length)return!1;for(const e of t)if("children"===e.type&&!rd(e))return!0;return!1}function rd(t){if(t.newChildren.length-t.oldChildren.length!=1)return;const e=function(t,e){const n=[];let i,o=0;return t.forEach(t=>{"equal"==t?(r(),o++):"insert"==t?(s("insert")?i.values.push(e[o]):(r(),i={type:"insert",index:o,values:[e[o]]}),o++):s("delete")?i.howMany++:(r(),i={type:"delete",index:o,howMany:1})}),r(),n;function r(){i&&(n.push(i),i=null)}function s(t){return i&&i.type==t}}(Fo(t.oldChildren,t.newChildren,sd),t.newChildren);if(e.length>1)return;const n=e[0];return n.values[0]&&n.values[0].is("text")?n:void 0}function sd(t,e){return t&&t.is("text")&&e&&e.is("text")?t.data===e.data:t===e}class ad{constructor(t){this.editor=t,this.editing=this.editor.editing}handle(t,e){if(od(t))this._handleContainerChildrenMutations(t,e);else for(const n of t)this._handleTextMutation(n,e),this._handleTextNodeInsertion(n)}_handleContainerChildrenMutations(t,e){const n=function(t){const e=t.map(t=>t.node).reduce((t,e)=>t.getCommonAncestor(e,{includeSelf:!0}));if(!e)return;return e.getAncestors({includeSelf:!0,parentFirst:!0}).find(t=>t.is("containerElement")||t.is("rootElement"))}(t);if(!n)return;const i=this.editor.editing.view.domConverter.mapViewToDom(n),o=new er,r=this.editor.data.toModel(o.domToView(i)).getChild(0),s=this.editor.editing.mapper.toModelElement(n);if(!s)return;const a=Array.from(r.getChildren()),c=Array.from(s.getChildren()),l=a[a.length-1],d=c[c.length-1];if(l&&l.is("softBreak")&&d&&!d.is("softBreak")&&a.pop(),!cd(a)||!cd(c))return;const u=a.map(t=>t.is("text")?t.data:"@").join("").replace(/\u00A0/g," "),h=c.map(t=>t.is("text")?t.data:"@").join("").replace(/\u00A0/g," ");if(h===u)return;const f=Fo(h,u),{firstChangeAt:m,insertions:p,deletions:g}=ld(f);let b=null;e&&(b=this.editing.mapper.toModelRange(e.getFirstRange()));const w=u.substr(m,p),_=this.editor.model.createRange(this.editor.model.createPositionAt(s,m),this.editor.model.createPositionAt(s,m+g));this.editor.execute("input",{text:w,range:_,resultRange:b})}_handleTextMutation(t,e){if("text"!=t.type)return;const n=t.newText.replace(/\u00A0/g," "),i=Fo(t.oldText.replace(/\u00A0/g," "),n),{firstChangeAt:o,insertions:r,deletions:s}=ld(i);let a=null;e&&(a=this.editing.mapper.toModelRange(e.getFirstRange()));const c=this.editing.view.createPositionAt(t.node,o),l=this.editing.mapper.toModelPosition(c),d=this.editor.model.createRange(l,l.getShiftedBy(s)),u=n.substr(o,r);this.editor.execute("input",{text:u,range:d,resultRange:a})}_handleTextNodeInsertion(t){if("children"!=t.type)return;const e=rd(t),n=this.editing.view.createPositionAt(t.node,e.index),i=this.editing.mapper.toModelPosition(n),o=e.values[0].data;this.editor.execute("input",{text:o.replace(/\u00A0/g," "),range:this.editor.model.createRange(i)})}}function cd(t){return t.every(t=>t.is("text")||t.is("softBreak"))}function ld(t){let e=null,n=null;for(let i=0;i<t.length;i++){"equal"!=t[i]&&(e=null===e?i:e,n=i)}let i=0,o=0;for(let r=e;r<=n;r++)"insert"!=t[r]&&i++,"delete"!=t[r]&&o++;return{insertions:o,deletions:i,firstChangeAt:e}}class dd extends zl{static get pluginName(){return"Input"}init(){const t=this.editor,e=new ed(t,t.config.get("typing.undoStep")||20);t.commands.add("input",e),nd(t),function(t){t.editing.view.document.on("mutations",(e,n,i)=>{new ad(t).handle(n,i)})}(t)}}class ud extends ql{constructor(t,e){super(t),this.direction=e,this._buffer=new td(t.model,t.config.get("typing.undoStep"))}execute(t={}){const e=this.editor.model,n=e.document;e.enqueueChange(this._buffer.batch,i=>{this._buffer.lock();const o=i.createSelection(n.selection),r=o.isCollapsed;if(o.isCollapsed&&e.modifySelection(o,{direction:this.direction,unit:t.unit}),this._shouldEntireContentBeReplacedWithParagraph(t.sequence||1))return void this._replaceEntireContentWithParagraph(i);if(o.isCollapsed)return;let s=0;o.getFirstRange().getMinimalFlatRanges().forEach(t=>{s+=Ji(t.getWalker({singleCharacters:!0,ignoreElementEnd:!0,shallow:!0}))}),e.deleteContent(o,{doNotResetEntireContent:r}),this._buffer.input(s),i.setSelection(o),this._buffer.unlock()})}_shouldEntireContentBeReplacedWithParagraph(t){if(t>1)return!1;const e=this.editor.model,n=e.document.selection,i=e.schema.getLimitElement(n);if(!(n.isCollapsed&&n.containsEntireContent(i)))return!1;if(!e.schema.checkChild(i,"paragraph"))return!1;const o=i.getChild(0);return!o||"paragraph"!==o.name}_replaceEntireContentWithParagraph(t){const e=this.editor.model,n=e.document.selection,i=e.schema.getLimitElement(n),o=t.createElement("paragraph");t.remove(t.createRangeIn(i)),t.insert(o,i),t.setSelection(o,0)}}class hd extends cr{constructor(t){super(t);const e=t.document;let n=0;e.on("keyup",(t,e)=>{e.keyCode!=ho.delete&&e.keyCode!=ho.backspace||(n=0)}),e.on("keydown",(t,i)=>{const o={};if(i.keyCode==ho.delete)o.direction="forward",o.unit="character";else{if(i.keyCode!=ho.backspace)return;o.direction="backward",o.unit="codePoint"}const r=co.isMac?i.altKey:i.ctrlKey;let s;o.unit=r?"word":o.unit,o.sequence=++n,e.once("delete",t=>s=t,{priority:"highest"}),e.fire("delete",new Qr(e,i.domEvent,o)),s&&s.stop.called&&t.stop()})}observe(){}}function fd(t){const e=t.model,n=t.editing.view,i=200;let o=null,r=e.createSelection(e.document.selection),s=Date.now();e.document.selection.on("change",function(t){const n=e.createSelection(t.source);r.isEqual(n)||(o=r,r=n,s=Date.now())}),n.document.on("mutations",function(n,a){od(a)&&function(t){for(const e of t){if("children"!==e.type)continue;const t=e.oldChildren,n=e.newChildren;if(!md(t))continue;const i=Fo(t,n),o=i.some(t=>"delete"===t),r=i.some(t=>"insert"===t);if(o&&!r)return!0}return!1}(a)&&(!function(){Date.now()-s<i&&o&&!o.isCollapsed&&r.isCollapsed&&r.getLastPosition().isEqual(o.getLastPosition())&&e.enqueueChange(t=>{t.setSelection(o)});t.execute("delete")}(),n.stop())},{priority:"highest"})}function md(t){return t.every(t=>t.is("containerElement"))}class pd extends zl{static get pluginName(){return"Delete"}init(){const t=this.editor,e=t.editing.view,n=e.document;e.addObserver(hd),t.commands.add("forwardDelete",new ud(t,"forward")),t.commands.add("delete",new ud(t,"backward")),this.listenTo(n,"delete",(n,i)=>{t.execute("forward"==i.direction?"forwardDelete":"delete",{unit:i.unit,sequence:i.sequence}),i.preventDefault(),e.scrollToTheSelection()}),fd(t)}}class gd extends zl{static get requires(){return[dd,pd]}static get pluginName(){return"Typing"}}class bd extends qa{get type(){return"noop"}clone(){return new bd(this.baseVersion)}getReversed(){return new bd(this.baseVersion+1)}_execute(){}static get className(){return"NoOperation"}}const wd=new Map;function _d(t,e,n){let i=wd.get(t);i||(i=new Map,wd.set(t,i)),i.set(e,n)}function kd(t){return[t]}function vd(t,e,n={}){const i=function(t,e){const n=wd.get(t);return n&&n.has(e)?n.get(e):kd}(t.constructor,e.constructor);try{return i(t=t.clone(),e,n)}catch(i){throw fs.a.error("Error during operation transformation!",i.message),fs.a.error("Transformed operation",t),fs.a.error("Operation transformed by",e),fs.a.error("context.aIsStrong",n.aIsStrong),fs.a.error("context.aWasUndone",n.aWasUndone),fs.a.error("context.bWasUndone",n.bWasUndone),fs.a.error("context.abRelation",n.abRelation),fs.a.error("context.baRelation",n.baRelation),i}}function yd(t,e,n){if(t=t.slice(),e=e.slice(),0==t.length||0==e.length)return{operationsA:t,operationsB:e};const i=new WeakMap;for(const e of t)i.set(e,0);const o={nextBaseVersionA:t[t.length-1].baseVersion+1,nextBaseVersionB:e[e.length-1].baseVersion+1,originalOperationsACount:t.length,originalOperationsBCount:e.length},r=new xd(n.document,n.useRelations);r.setOriginalOperations(t),r.setOriginalOperations(e);let s=0;for(;s<t.length;){const n=t[s],o=i.get(n);if(o==e.length){s++;continue}const a=e[o],c=vd(n,a,r.getContext(n,a,!0)),l=vd(a,n,r.getContext(a,n,!1));r.updateRelation(n,a),r.setOriginalOperations(c,n),r.setOriginalOperations(l,a);for(const t of c)i.set(t,o+l.length);t.splice(s,1,...c),e.splice(o,1,...l)}if(n.padWithNoOps){const n=t.length-o.originalOperationsACount,i=e.length-o.originalOperationsBCount;Cd(t,i-n),Cd(e,n-i)}return Ad(t,o.nextBaseVersionB),Ad(e,o.nextBaseVersionA),{operationsA:t,operationsB:e}}class xd{constructor(t,e){this._history=t.history,this._useRelations=e,this._originalOperations=new Map,this._relations=new Map}setOriginalOperations(t,e=null){const n=e?this._originalOperations.get(e):null;for(const e of t)this._originalOperations.set(e,n||e)}updateRelation(t,e){switch(t.constructor){case nc:switch(e.constructor){case ac:t.targetPosition.isEqual(e.sourcePosition)||e.movedRange.containsPosition(t.targetPosition)?this._setRelation(t,e,"insertAtSource"):t.targetPosition.isEqual(e.deletionPosition)?this._setRelation(t,e,"insertBetween"):t.targetPosition.isAfter(e.sourcePosition)&&this._setRelation(t,e,"moveTargetAfter");break;case nc:t.targetPosition.isEqual(e.sourcePosition)||t.targetPosition.isBefore(e.sourcePosition)?this._setRelation(t,e,"insertBefore"):this._setRelation(t,e,"insertAfter")}break;case cc:switch(e.constructor){case ac:t.splitPosition.isBefore(e.sourcePosition)&&this._setRelation(t,e,"splitBefore");break;case nc:(t.splitPosition.isEqual(e.sourcePosition)||t.splitPosition.isBefore(e.sourcePosition))&&this._setRelation(t,e,"splitBefore")}break;case ac:switch(e.constructor){case ac:t.targetPosition.isEqual(e.sourcePosition)||this._setRelation(t,e,"mergeTargetNotMoved"),t.sourcePosition.isEqual(e.sourcePosition)&&this._setRelation(t,e,"mergeSameElement");break;case cc:t.sourcePosition.isEqual(e.splitPosition)&&this._setRelation(t,e,"splitAtSource")}}}getContext(t,e,n){return{aIsStrong:n,aWasUndone:this._wasUndone(t),bWasUndone:this._wasUndone(e),abRelation:this._useRelations?this._getRelation(t,e):null,baRelation:this._useRelations?this._getRelation(e,t):null}}_wasUndone(t){const e=this._originalOperations.get(t);return e.wasUndone||this._history.isUndoneOperation(e)}_getRelation(t,e){const n=this._originalOperations.get(e),i=this._history.getUndoneOperation(n);if(!i)return null;const o=this._originalOperations.get(t),r=this._relations.get(o);return r&&r.get(i)||null}_setRelation(t,e,n){const i=this._originalOperations.get(t),o=this._originalOperations.get(e);let r=this._relations.get(i);r||(r=new Map,this._relations.set(i,r)),r.set(o,n)}}function Ad(t,e){for(const n of t)n.baseVersion=e++}function Cd(t,e){for(let n=0;n<e;n++)t.push(new bd(0))}function Td(t,e,n){const i=t.nodes.getNode(0).getAttribute(e);if(i==n)return null;const o=new qs(t.position,t.position.getShiftedBy(t.howMany));return new tc(o,e,i,n,0)}function Pd(t,e){return null===t.targetPosition._getTransformedByDeletion(e.sourcePosition,e.howMany)}function Md(t,e){const n=[];for(let i=0;i<t.length;i++){const o=t[i],r=new nc(o.start,o.end.offset-o.start.offset,e.isEqual(o.end)?o.start:e,0);n.push(r);for(let e=i+1;e<t.length;e++)t[e]=t[e]._getTransformedByMove(r.sourcePosition,r.targetPosition,r.howMany)[0];e=e._getTransformedByMove(r.sourcePosition,r.targetPosition,r.howMany)}return n}_d(tc,tc,(t,e,n)=>{if(t.key===e.key){const i=t.range.getDifference(e.range).map(e=>new tc(e,t.key,t.oldValue,t.newValue,0)),o=t.range.getIntersection(e.range);return o&&n.aIsStrong&&i.push(new tc(o,e.key,e.newValue,t.newValue,0)),0==i.length?[new bd(0)]:i}return[t]}),_d(tc,ic,(t,e)=>{if(t.range.start.hasSameParentAs(e.position)&&t.range.containsPosition(e.position)){const n=t.range._getTransformedByInsertion(e.position,e.howMany,!e.shouldReceiveAttributes).map(e=>new tc(e,t.key,t.oldValue,t.newValue,t.baseVersion));if(e.shouldReceiveAttributes){const i=Td(e,t.key,t.oldValue);i&&n.unshift(i)}return n}return t.range=t.range._getTransformedByInsertion(e.position,e.howMany,!1)[0],[t]}),_d(tc,ac,(t,e)=>{const n=[];t.range.start.hasSameParentAs(e.deletionPosition)&&(t.range.containsPosition(e.deletionPosition)||t.range.start.isEqual(e.deletionPosition))&&n.push(qs._createFromPositionAndShift(e.graveyardPosition,1));const i=t.range._getTransformedByMergeOperation(e);return i.isCollapsed||n.push(i),n.map(e=>new tc(e,t.key,t.oldValue,t.newValue,t.baseVersion))}),_d(tc,nc,(t,e)=>{return function(t,e){const n=qs._createFromPositionAndShift(e.sourcePosition,e.howMany);let i=null,o=[];n.containsRange(t,!0)?i=t:t.start.hasSameParentAs(n.start)?(o=t.getDifference(n),i=t.getIntersection(n)):o=[t];const r=[];for(let t of o){t=t._getTransformedByDeletion(e.sourcePosition,e.howMany);const n=e.getMovedRangeStart(),i=t.start.hasSameParentAs(n);t=t._getTransformedByInsertion(n,e.howMany,i),r.push(...t)}i&&r.push(i._getTransformedByMove(e.sourcePosition,e.targetPosition,e.howMany,!1)[0]);return r}(t.range,e).map(e=>new tc(e,t.key,t.oldValue,t.newValue,t.baseVersion))}),_d(tc,cc,(t,e)=>{if(t.range.end.isEqual(e.insertionPosition))return e.graveyardPosition||t.range.end.offset++,[t];if(t.range.start.hasSameParentAs(e.splitPosition)&&t.range.containsPosition(e.splitPosition)){const n=t.clone();return n.range=new qs(e.moveTargetPosition.clone(),t.range.end._getCombined(e.splitPosition,e.moveTargetPosition)),t.range.end=e.splitPosition.clone(),t.range.end.stickiness="toPrevious",[t,n]}return t.range=t.range._getTransformedBySplitOperation(e),[t]}),_d(ic,tc,(t,e)=>{const n=[t];if(t.shouldReceiveAttributes&&t.position.hasSameParentAs(e.range.start)&&e.range.containsPosition(t.position)){const i=Td(t,e.key,e.newValue);i&&n.push(i)}return n}),_d(ic,ic,(t,e,n)=>t.position.isEqual(e.position)&&n.aIsStrong?[t]:(t.position=t.position._getTransformedByInsertOperation(e),[t])),_d(ic,nc,(t,e)=>(t.position=t.position._getTransformedByMoveOperation(e),[t])),_d(ic,cc,(t,e)=>(t.position=t.position._getTransformedBySplitOperation(e),[t])),_d(ic,ac,(t,e)=>(t.position=t.position._getTransformedByMergeOperation(e),[t])),_d(oc,ic,(t,e)=>(t.oldRange&&(t.oldRange=t.oldRange._getTransformedByInsertOperation(e)[0]),t.newRange&&(t.newRange=t.newRange._getTransformedByInsertOperation(e)[0]),[t])),_d(oc,oc,(t,e,n)=>{if(t.name==e.name){if(!n.aIsStrong)return[new bd(0)];t.oldRange=e.newRange?e.newRange.clone():null}return[t]}),_d(oc,ac,(t,e)=>(t.oldRange&&(t.oldRange=t.oldRange._getTransformedByMergeOperation(e)),t.newRange&&(t.newRange=t.newRange._getTransformedByMergeOperation(e)),[t])),_d(oc,nc,(t,e)=>(t.oldRange&&(t.oldRange=qs._createFromRanges(t.oldRange._getTransformedByMoveOperation(e))),t.newRange&&(t.newRange=qs._createFromRanges(t.newRange._getTransformedByMoveOperation(e))),[t])),_d(oc,cc,(t,e)=>(t.oldRange&&(t.oldRange=t.oldRange._getTransformedBySplitOperation(e)),t.newRange&&(t.newRange=t.newRange._getTransformedBySplitOperation(e)),[t])),_d(ac,ic,(t,e)=>(t.sourcePosition.hasSameParentAs(e.position)&&(t.howMany+=e.howMany),t.sourcePosition=t.sourcePosition._getTransformedByInsertOperation(e),t.targetPosition=t.targetPosition._getTransformedByInsertOperation(e),[t])),_d(ac,ac,(t,e,n)=>{if(t.sourcePosition.isEqual(e.sourcePosition)&&t.targetPosition.isEqual(e.targetPosition)){if(n.bWasUndone){const n=e.graveyardPosition.path.slice();return n.push(0),t.sourcePosition=new Hs(e.graveyardPosition.root,n),t.howMany=0,[t]}return[new bd(0)]}if(t.sourcePosition.isEqual(e.sourcePosition)&&!t.targetPosition.isEqual(e.targetPosition)&&!n.bWasUndone&&"splitAtSource"!=n.abRelation){const i="$graveyard"==t.targetPosition.root.rootName,o="$graveyard"==e.targetPosition.root.rootName;if(o&&!i||!(i&&!o)&&n.aIsStrong){const n=e.targetPosition._getTransformedByMergeOperation(e),i=t.targetPosition._getTransformedByMergeOperation(e);return[new nc(n,t.howMany,i,0)]}return[new bd(0)]}return t.sourcePosition.hasSameParentAs(e.targetPosition)&&(t.howMany+=e.howMany),t.sourcePosition=t.sourcePosition._getTransformedByMergeOperation(e),t.targetPosition=t.targetPosition._getTransformedByMergeOperation(e),t.graveyardPosition.isEqual(e.graveyardPosition)&&n.aIsStrong||(t.graveyardPosition=t.graveyardPosition._getTransformedByMergeOperation(e)),[t]}),_d(ac,nc,(t,e,n)=>{const i=qs._createFromPositionAndShift(e.sourcePosition,e.howMany);return"remove"==e.type&&!n.bWasUndone&&t.deletionPosition.hasSameParentAs(e.sourcePosition)&&i.containsPosition(t.sourcePosition)?[new bd(0)]:(t.sourcePosition.hasSameParentAs(e.targetPosition)&&(t.howMany+=e.howMany),t.sourcePosition.hasSameParentAs(e.sourcePosition)&&(t.howMany-=e.howMany),t.sourcePosition=t.sourcePosition._getTransformedByMoveOperation(e),t.targetPosition=t.targetPosition._getTransformedByMoveOperation(e),t.graveyardPosition.isEqual(e.targetPosition)||(t.graveyardPosition=t.graveyardPosition._getTransformedByMoveOperation(e)),[t])}),_d(ac,cc,(t,e,n)=>{if(e.graveyardPosition&&(t.graveyardPosition=t.graveyardPosition._getTransformedByDeletion(e.graveyardPosition,1),t.deletionPosition.isEqual(e.graveyardPosition)&&(t.howMany=e.howMany)),t.targetPosition.isEqual(e.splitPosition)){const i=0!=e.howMany,o=e.graveyardPosition&&t.deletionPosition.isEqual(e.graveyardPosition);if(i||o||"mergeTargetNotMoved"==n.abRelation)return t.sourcePosition=t.sourcePosition._getTransformedBySplitOperation(e),[t]}return t.sourcePosition.isEqual(e.splitPosition)&&("mergeSameElement"==n.abRelation||t.sourcePosition.offset>0)?(t.sourcePosition=e.moveTargetPosition.clone(),t.targetPosition=t.targetPosition._getTransformedBySplitOperation(e),[t]):(t.sourcePosition.hasSameParentAs(e.splitPosition)&&(t.howMany=e.splitPosition.offset),t.sourcePosition=t.sourcePosition._getTransformedBySplitOperation(e),t.targetPosition=t.targetPosition._getTransformedBySplitOperation(e),[t])}),_d(nc,ic,(t,e)=>{const n=qs._createFromPositionAndShift(t.sourcePosition,t.howMany)._getTransformedByInsertOperation(e,!1)[0];return t.sourcePosition=n.start,t.howMany=n.end.offset-n.start.offset,t.targetPosition.isEqual(e.position)||(t.targetPosition=t.targetPosition._getTransformedByInsertOperation(e)),[t]}),_d(nc,nc,(t,e,n)=>{const i=qs._createFromPositionAndShift(t.sourcePosition,t.howMany),o=qs._createFromPositionAndShift(e.sourcePosition,e.howMany);let r,s=n.aIsStrong,a=!n.aIsStrong;if("insertBefore"==n.abRelation||"insertAfter"==n.baRelation?a=!0:"insertAfter"!=n.abRelation&&"insertBefore"!=n.baRelation||(a=!1),r=t.targetPosition.isEqual(e.targetPosition)&&a?t.targetPosition._getTransformedByDeletion(e.sourcePosition,e.howMany):t.targetPosition._getTransformedByMove(e.sourcePosition,e.targetPosition,e.howMany),Pd(t,e)&&Pd(e,t))return[e.getReversed()];if(i.containsPosition(e.targetPosition)&&i.containsRange(o,!0))return i.start=i.start._getTransformedByMove(e.sourcePosition,e.targetPosition,e.howMany),i.end=i.end._getTransformedByMove(e.sourcePosition,e.targetPosition,e.howMany),Md([i],r);if(o.containsPosition(t.targetPosition)&&o.containsRange(i,!0))return i.start=i.start._getCombined(e.sourcePosition,e.getMovedRangeStart()),i.end=i.end._getCombined(e.sourcePosition,e.getMovedRangeStart()),Md([i],r);const c=U(t.sourcePosition.getParentPath(),e.sourcePosition.getParentPath());if("prefix"==c||"extension"==c)return i.start=i.start._getTransformedByMove(e.sourcePosition,e.targetPosition,e.howMany),i.end=i.end._getTransformedByMove(e.sourcePosition,e.targetPosition,e.howMany),Md([i],r);"remove"!=t.type||"remove"==e.type||n.aWasUndone?"remove"==t.type||"remove"!=e.type||n.bWasUndone||(s=!1):s=!0;const l=[],d=i.getDifference(o);for(const t of d){t.start=t.start._getTransformedByDeletion(e.sourcePosition,e.howMany),t.end=t.end._getTransformedByDeletion(e.sourcePosition,e.howMany);const n="same"==U(t.start.getParentPath(),e.getMovedRangeStart().getParentPath()),i=t._getTransformedByInsertion(e.getMovedRangeStart(),e.howMany,n);l.push(...i)}const u=i.getIntersection(o);return null!==u&&s&&(u.start=u.start._getCombined(e.sourcePosition,e.getMovedRangeStart()),u.end=u.end._getCombined(e.sourcePosition,e.getMovedRangeStart()),0===l.length?l.push(u):1==l.length?o.start.isBefore(i.start)||o.start.isEqual(i.start)?l.unshift(u):l.push(u):l.splice(1,0,u)),0===l.length?[new bd(t.baseVersion)]:Md(l,r)}),_d(nc,cc,(t,e,n)=>{let i=t.targetPosition.clone();t.targetPosition.isEqual(e.insertionPosition)&&e.graveyardPosition&&"moveTargetAfter"!=n.abRelation||(i=t.targetPosition._getTransformedBySplitOperation(e));const o=qs._createFromPositionAndShift(t.sourcePosition,t.howMany);if(o.end.isEqual(e.insertionPosition))return e.graveyardPosition||t.howMany++,t.targetPosition=i,[t];if(o.start.hasSameParentAs(e.splitPosition)&&o.containsPosition(e.splitPosition)){let t=new qs(e.splitPosition,o.end);return t=t._getTransformedBySplitOperation(e),Md([new qs(o.start,e.splitPosition),t],i)}t.targetPosition.isEqual(e.splitPosition)&&"insertAtSource"==n.abRelation&&(i=e.moveTargetPosition),t.targetPosition.isEqual(e.insertionPosition)&&"insertBetween"==n.abRelation&&(i=t.targetPosition);const r=[o._getTransformedBySplitOperation(e)];if(e.graveyardPosition){const n=o.start.isEqual(e.graveyardPosition)||o.containsPosition(e.graveyardPosition);t.howMany>1&&n&&r.push(qs._createFromPositionAndShift(e.insertionPosition,1))}return Md(r,i)}),_d(nc,ac,(t,e,n)=>{const i=qs._createFromPositionAndShift(t.sourcePosition,t.howMany);if(e.deletionPosition.hasSameParentAs(t.sourcePosition)&&i.containsPosition(e.sourcePosition))if("remove"==t.type){if(!n.aWasUndone){const n=[];let i=e.graveyardPosition.clone(),o=e.targetPosition.clone();t.howMany>1&&(n.push(new nc(t.sourcePosition,t.howMany-1,t.targetPosition,0)),i=i._getTransformedByInsertion(t.targetPosition,t.howMany-1),o=o._getTransformedByMove(t.sourcePosition,t.targetPosition,t.howMany-1));const r=e.deletionPosition._getCombined(t.sourcePosition,t.targetPosition),s=new nc(i,1,r,0),a=s.getMovedRangeStart().path.slice();a.push(0);const c=new Hs(s.targetPosition.root,a),l=new nc(o,e.howMany,c,0);return n.push(s),n.push(l),n}}else if(1==t.howMany)return n.bWasUndone?(t.sourcePosition=e.graveyardPosition.clone(),t.targetPosition=t.targetPosition._getTransformedByMergeOperation(e),[t]):[new bd(0)];const o=qs._createFromPositionAndShift(t.sourcePosition,t.howMany)._getTransformedByMergeOperation(e);return t.sourcePosition=o.start,t.howMany=o.end.offset-o.start.offset,t.targetPosition=t.targetPosition._getTransformedByMergeOperation(e),[t]}),_d(rc,ic,(t,e)=>(t.position=t.position._getTransformedByInsertOperation(e),[t])),_d(rc,ac,(t,e)=>t.position.isEqual(e.deletionPosition)?(t.position=e.graveyardPosition.clone(),t.position.stickiness="toNext",[t]):(t.position=t.position._getTransformedByMergeOperation(e),[t])),_d(rc,nc,(t,e)=>(t.position=t.position._getTransformedByMoveOperation(e),[t])),_d(rc,rc,(t,e,n)=>{if(t.position.isEqual(e.position)){if(!n.aIsStrong)return[new bd(0)];t.oldName=e.newName}return[t]}),_d(rc,cc,(t,e)=>{if("same"==U(t.position.path,e.splitPosition.getParentPath())&&!e.graveyardPosition){return[t,new rc(t.position.getShiftedBy(1),t.oldName,t.newName,0)]}return t.position=t.position._getTransformedBySplitOperation(e),[t]}),_d(sc,sc,(t,e,n)=>{if(t.root===e.root&&t.key===e.key){if(!n.aIsStrong||t.newValue===e.newValue)return[new bd(0)];t.oldValue=e.newValue}return[t]}),_d(cc,ic,(t,e)=>(t.splitPosition.hasSameParentAs(e.position)&&t.splitPosition.offset<e.position.offset&&(t.howMany+=e.howMany),t.splitPosition=t.splitPosition._getTransformedByInsertOperation(e),t.insertionPosition=cc.getInsertionPosition(t.splitPosition),[t])),_d(cc,ac,(t,e,n)=>{if(!t.graveyardPosition&&!n.bWasUndone&&t.splitPosition.hasSameParentAs(e.sourcePosition)){const n=e.graveyardPosition.path.slice();n.push(0);const i=new Hs(e.graveyardPosition.root,n),o=cc.getInsertionPosition(new Hs(e.graveyardPosition.root,n)),r=new cc(i,0,null,0);return r.insertionPosition=o,t.splitPosition=t.splitPosition._getTransformedByMergeOperation(e),t.insertionPosition=cc.getInsertionPosition(t.splitPosition),t.graveyardPosition=r.insertionPosition.clone(),t.graveyardPosition.stickiness="toNext",[r,t]}return t.splitPosition.hasSameParentAs(e.deletionPosition)&&!t.splitPosition.isAfter(e.deletionPosition)&&t.howMany--,t.splitPosition.hasSameParentAs(e.targetPosition)&&(t.howMany+=e.howMany),t.splitPosition=t.splitPosition._getTransformedByMergeOperation(e),t.insertionPosition=cc.getInsertionPosition(t.splitPosition),t.graveyardPosition&&(t.graveyardPosition=t.graveyardPosition._getTransformedByMergeOperation(e)),[t]}),_d(cc,nc,(t,e,n)=>{const i=qs._createFromPositionAndShift(e.sourcePosition,e.howMany);if(t.graveyardPosition){if(i.start.isEqual(t.graveyardPosition)||i.containsPosition(t.graveyardPosition)){const n=t.splitPosition._getTransformedByMoveOperation(e),i=t.graveyardPosition._getTransformedByMoveOperation(e),o=i.path.slice();o.push(0);const r=new Hs(i.root,o);return[new nc(n,t.howMany,r,0)]}t.graveyardPosition=t.graveyardPosition._getTransformedByMoveOperation(e)}if(t.splitPosition.hasSameParentAs(e.sourcePosition)&&i.containsPosition(t.splitPosition)){const n=e.howMany-(t.splitPosition.offset-e.sourcePosition.offset);return t.howMany-=n,t.splitPosition.hasSameParentAs(e.targetPosition)&&t.splitPosition.offset<e.targetPosition.offset&&(t.howMany+=e.howMany),t.splitPosition=e.sourcePosition.clone(),t.insertionPosition=cc.getInsertionPosition(t.splitPosition),[t]}return!t.splitPosition.isEqual(e.targetPosition)||"insertAtSource"!=n.baRelation&&"splitBefore"!=n.abRelation?(e.sourcePosition.isEqual(e.targetPosition)||(t.splitPosition.hasSameParentAs(e.sourcePosition)&&t.splitPosition.offset<=e.sourcePosition.offset&&(t.howMany-=e.howMany),t.splitPosition.hasSameParentAs(e.targetPosition)&&t.splitPosition.offset<e.targetPosition.offset&&(t.howMany+=e.howMany)),t.splitPosition.stickiness="toNone",t.splitPosition=t.splitPosition._getTransformedByMoveOperation(e),t.splitPosition.stickiness="toNext",t.graveyardPosition?t.insertionPosition=t.insertionPosition._getTransformedByMoveOperation(e):t.insertionPosition=cc.getInsertionPosition(t.splitPosition),[t]):(t.howMany+=e.howMany,t.splitPosition=t.splitPosition._getTransformedByDeletion(e.sourcePosition,e.howMany),t.insertionPosition=cc.getInsertionPosition(t.splitPosition),[t])}),_d(cc,cc,(t,e,n)=>{if(t.splitPosition.isEqual(e.splitPosition)){if(!t.graveyardPosition&&!e.graveyardPosition)return[new bd(0)];if(t.graveyardPosition&&e.graveyardPosition&&t.graveyardPosition.isEqual(e.graveyardPosition))return[new bd(0)]}if(t.graveyardPosition&&e.graveyardPosition&&t.graveyardPosition.isEqual(e.graveyardPosition)){const i="$graveyard"==t.splitPosition.root.rootName,o="$graveyard"==e.splitPosition.root.rootName;if(o&&!i||!(i&&!o)&&n.aIsStrong){const n=[];return e.howMany&&n.push(new nc(e.moveTargetPosition,e.howMany,e.splitPosition,0)),t.howMany&&n.push(new nc(t.splitPosition,t.howMany,t.moveTargetPosition,0)),n}return[new bd(0)]}if(t.graveyardPosition&&(t.graveyardPosition=t.graveyardPosition._getTransformedBySplitOperation(e)),t.splitPosition.isEqual(e.insertionPosition)&&"splitBefore"==n.abRelation)return t.howMany++,[t];if(e.splitPosition.isEqual(t.insertionPosition)&&"splitBefore"==n.baRelation){const n=e.insertionPosition.path.slice();n.push(0);const i=new Hs(e.insertionPosition.root,n);return[t,new nc(t.insertionPosition,1,i,0)]}return t.splitPosition.hasSameParentAs(e.splitPosition)&&t.splitPosition.offset<e.splitPosition.offset&&(t.howMany-=e.howMany),t.splitPosition=t.splitPosition._getTransformedBySplitOperation(e),t.insertionPosition=cc.getInsertionPosition(t.splitPosition),[t]});class Sd extends ql{constructor(t){super(t),this._stack=[],this._createdBatches=new WeakSet,this.refresh()}refresh(){this.isEnabled=this._stack.length>0}addBatch(t){const e=this.editor.model.document.selection,n={ranges:e.hasOwnRange?Array.from(e.getRanges()):[],isBackward:e.isBackward};this._stack.push({batch:t,selection:n}),this.refresh()}clearStack(){this._stack=[],this.refresh()}_restoreSelection(t,e,n){const i=this.editor.model,o=i.document,r=[];for(const e of t){const t=Id(e,n).find(t=>t.start.root!=o.graveyard);t&&r.push(t)}r.length&&i.change(t=>{t.setSelection(r,{backward:e})})}_undo(t,e){const n=this.editor.model,i=n.document;this._createdBatches.add(e);const o=t.operations.slice().filter(t=>t.isDocumentOperation);o.reverse();for(const t of o){const o=t.baseVersion+1,r=Array.from(i.history.getOperations(o)),s=yd([t.getReversed()],r,{useRelations:!0,document:this.editor.model.document,padWithNoOps:!1}).operationsA;for(const o of s)e.addOperation(o),n.applyOperation(o),i.history.setOperationAsUndone(t,o)}}}function Id(t,e){const n=t.getTransformedByOperations(e);n.sort((t,e)=>t.start.isBefore(e.start)?-1:1);for(let t=1;t<n.length;t++){const e=n[t-1],i=n[t];e.end.isTouching(i.start)&&(e.end=i.end,n.splice(t,1),t--)}return n}class Ed extends Sd{execute(t=null){const e=t?this._stack.findIndex(e=>e.batch==t):this._stack.length-1,n=this._stack.splice(e,1)[0],i=this.editor.model.createBatch();this.editor.model.enqueueChange(i,()=>{this._undo(n.batch,i);const t=this.editor.model.document.history.getOperations(n.batch.baseVersion);this._restoreSelection(n.selection.ranges,n.selection.isBackward,t),this.fire("revert",n.batch,i)}),this.refresh()}}class Nd extends Sd{execute(){const t=this._stack.pop(),e=this.editor.model.createBatch();this.editor.model.enqueueChange(e,()=>{const n=t.batch.operations[t.batch.operations.length-1].baseVersion+1,i=this.editor.model.document.history.getOperations(n);this._restoreSelection(t.selection.ranges,t.selection.isBackward,i),this._undo(t.batch,e)}),this.refresh()}}class Od extends zl{constructor(t){super(t),this._batchRegistry=new WeakSet}init(){const t=this.editor;this._undoCommand=new Ed(t),this._redoCommand=new Nd(t),t.commands.add("undo",this._undoCommand),t.commands.add("redo",this._redoCommand),this.listenTo(t.model,"applyOperation",(t,e)=>{const n=e[0];if(!n.isDocumentOperation)return;const i=n.batch;this._batchRegistry.has(i)||"transparent"==i.type||(this._redoCommand._createdBatches.has(i)?this._undoCommand.addBatch(i):this._undoCommand._createdBatches.has(i)||(this._undoCommand.addBatch(i),this._redoCommand.clearStack()),this._batchRegistry.add(i))},{priority:"highest"}),this.listenTo(this._undoCommand,"revert",(t,e,n)=>{this._redoCommand.addBatch(n)}),t.keystrokes.set("CTRL+Z","undo"),t.keystrokes.set("CTRL+Y","redo"),t.keystrokes.set("CTRL+SHIFT+Z","redo")}}n(56);class Rd extends xl{constructor(){super();const t=this.bindTemplate;this.set("content",""),this.set("viewBox","0 0 20 20"),this.set("fillColor",""),this.setTemplate({tag:"svg",ns:"http://www.w3.org/2000/svg",attributes:{class:["ck","ck-icon"],viewBox:t.to("viewBox")}})}render(){super.render(),this._updateXMLContent(),this._colorFillPaths(),this.on("change:content",()=>{this._updateXMLContent(),this._colorFillPaths()}),this.on("change:fillColor",()=>{this._colorFillPaths()})}_updateXMLContent(){if(this.content){const t=(new DOMParser).parseFromString(this.content.trim(),"image/svg+xml").querySelector("svg"),e=t.getAttribute("viewBox");for(e&&(this.viewBox=e),this.element.innerHTML="";t.childNodes.length>0;)this.element.appendChild(t.childNodes[0])}}_colorFillPaths(){this.fillColor&&this.element.querySelectorAll(".ck-icon__fill").forEach(t=>{t.style.fill=this.fillColor})}}n(58);class Dd extends xl{constructor(t){super(t),this.set("text",""),this.set("position","s");const e=this.bindTemplate;this.setTemplate({tag:"span",attributes:{class:["ck","ck-tooltip",e.to("position",t=>"ck-tooltip_"+t),e.if("text","ck-hidden",t=>!t.trim())]},children:[{tag:"span",attributes:{class:["ck","ck-tooltip__text"]},children:[{text:e.to("text")}]}]})}}n(60);class Ld extends xl{constructor(t){super(t);const e=this.bindTemplate,n=I();this.set("class"),this.set("labelStyle"),this.set("icon"),this.set("isEnabled",!0),this.set("isOn",!1),this.set("isVisible",!0),this.set("keystroke"),this.set("label"),this.set("tabindex",-1),this.set("tooltip"),this.set("tooltipPosition","s"),this.set("type","button"),this.set("withText",!1),this.children=this.createCollection(),this.tooltipView=this._createTooltipView(),this.labelView=this._createLabelView(n),this.iconView=new Rd,this.iconView.extendTemplate({attributes:{class:"ck-button__icon"}}),this.bind("_tooltipString").to(this,"tooltip",this,"label",this,"keystroke",this._getTooltipString.bind(this)),this.setTemplate({tag:"button",attributes:{class:["ck","ck-button",e.to("class"),e.if("isEnabled","ck-disabled",t=>!t),e.if("isVisible","ck-hidden",t=>!t),e.to("isOn",t=>t?"ck-on":"ck-off"),e.if("withText","ck-button_with-text")],type:e.to("type",t=>t||"button"),tabindex:e.to("tabindex"),"aria-labelledby":`ck-editor__aria-label_${n}`,"aria-disabled":e.if("isEnabled",!0,t=>!t),"aria-pressed":e.if("isOn",!0)},children:this.children,on:{mousedown:e.to(t=>{t.preventDefault()}),click:e.to(t=>{this.isEnabled?this.fire("execute"):t.preventDefault()})}})}render(){super.render(),this.icon&&(this.iconView.bind("content").to(this,"icon"),this.children.add(this.iconView)),this.children.add(this.tooltipView),this.children.add(this.labelView)}focus(){this.element.focus()}_createTooltipView(){const t=new Dd;return t.bind("text").to(this,"_tooltipString"),t.bind("position").to(this,"tooltipPosition"),t}_createLabelView(t){const e=new xl,n=this.bindTemplate;return e.setTemplate({tag:"span",attributes:{class:["ck","ck-button__label"],style:n.to("labelStyle"),id:`ck-editor__aria-label_${t}`},children:[{text:this.bindTemplate.to("label")}]}),e}_getTooltipString(t,e,n){return t?"string"==typeof t?t:(n&&(n=function(t){return co.isMac?po(t).map(t=>uo[t.toLowerCase()]||t).reduce((t,e)=>t.slice(-1)in lo?t+e:t+"+"+e):t}(n)),t instanceof Function?t(e,n):`${e}${n?` (${n})`:""}`):""}}var jd=n(20),Vd=n.n(jd),zd=n(21),Bd=n.n(zd);class Fd extends zl{init(){const t=this.editor.t;this._addButton("undo",t("bd"),"CTRL+Z",Vd.a),this._addButton("redo",t("be"),"CTRL+Y",Bd.a)}_addButton(t,e,n,i){const o=this.editor;o.ui.componentFactory.add(t,r=>{const s=o.commands.get(t),a=new Ld(r);return a.set({label:e,icon:i,keystroke:n,tooltip:!0}),a.bind("isEnabled").to(s,"isEnabled"),this.listenTo(a,"execute",()=>o.execute(t)),a})}}class Ud extends zl{static get requires(){return[Od,Fd]}static get pluginName(){return"Undo"}}class Hd extends zl{static get pluginName(){return"PendingActions"}init(){this.set("hasAny",!1),this._actions=new Xi({idProperty:"_id"}),this._actions.delegate("add","remove").to(this)}add(t){if("string"!=typeof t)throw new P.b("pendingactions-add-invalid-message: The message must be a string.");const e=Object.create(Li);return e.set("message",t),this._actions.add(e),this.hasAny=!0,e}remove(t){this._actions.remove(t),this.hasAny=!!this._actions.length}get first(){return this._actions.get(0)}[Symbol.iterator](){return this._actions[Symbol.iterator]()}}class qd{constructor(){const t=new window.FileReader;this._reader=t,this.set("loaded",0),t.onprogress=(t=>{this.loaded=t.loaded})}get error(){return this._reader.error}read(t){const e=this._reader;return this.total=t.size,new Promise((n,i)=>{e.onload=(()=>{n(e.result)}),e.onerror=(()=>{i("error")}),e.onabort=(()=>{i("aborted")}),this._reader.readAsDataURL(t)})}abort(){this._reader.abort()}}F(qd,Li);class Wd extends zl{static get pluginName(){return"FileRepository"}static get requires(){return[Hd]}init(){this.loaders=new Xi,this.loaders.on("add",()=>this._updatePendingAction()),this.loaders.on("remove",()=>this._updatePendingAction()),this._pendingAction=null,this.set("uploaded",0),this.set("uploadTotal",null),this.bind("uploadedPercent").to(this,"uploaded",this,"uploadTotal",(t,e)=>e?t/e*100:0)}getLoader(t){for(const e of this.loaders)if(e.file==t)return e;return null}createLoader(t){if(!this.createUploadAdapter)return fs.a.error("filerepository-no-upload-adapter: Upload adapter is not defined."),null;const e=new Yd(t);return e._adapter=this.createUploadAdapter(e),this.loaders.add(e),e.on("change:uploaded",()=>{let t=0;for(const e of this.loaders)t+=e.uploaded;this.uploaded=t}),e.on("change:uploadTotal",()=>{let t=0;for(const e of this.loaders)e.uploadTotal&&(t+=e.uploadTotal);this.uploadTotal=t}),e}destroyLoader(t){const e=t instanceof Yd?t:this.getLoader(t);e._destroy(),this.loaders.remove(e)}_updatePendingAction(){const t=this.editor.plugins.get(Hd);if(this.loaders.length){if(!this._pendingAction){const e=this.editor.t,n=t=>`${e("ap")} ${parseInt(t)}%.`;this._pendingAction=t.add(n(this.uploadedPercent)),this._pendingAction.bind("message").to(this,"uploadedPercent",n)}}else t.remove(this._pendingAction),this._pendingAction=null}}F(Wd,Li);class Yd{constructor(t,e){this.id=I(),this.file=t,this._adapter=e,this._reader=new qd,this.set("status","idle"),this.set("uploaded",0),this.set("uploadTotal",null),this.bind("uploadedPercent").to(this,"uploaded",this,"uploadTotal",(t,e)=>e?t/e*100:0),this.set("uploadResponse",null)}read(){if("idle"!=this.status)throw new P.b("filerepository-read-wrong-status: You cannot call read if the status is different than idle.");return this.status="reading",this._reader.read(this.file).then(t=>(this.status="idle",t)).catch(t=>{if("aborted"===t)throw this.status="aborted","aborted";throw this.status="error",this._reader.error})}upload(){if("idle"!=this.status)throw new P.b("filerepository-upload-wrong-status: You cannot call upload if the status is different than idle.");return this.status="uploading",this._adapter.upload().then(t=>(this.uploadResponse=t,this.status="idle",t)).catch(t=>{if("aborted"===this.status)throw"aborted";throw this.status="error",t})}abort(){const t=this.status;this.status="aborted","reading"==t&&this._reader.abort(),"uploading"==t&&this._adapter.abort&&this._adapter.abort(),this._destroy()}_destroy(){this._reader=void 0,this._adapter=void 0,this.data=void 0,this.uploadResponse=void 0,this.file=void 0}}F(Yd,Li);const $d="ckCsrfToken",Gd=40,Qd="abcdefghijklmnopqrstuvwxyz0123456789";function Jd(){let t=function(t){t=t.toLowerCase();const e=document.cookie.split(";");for(const n of e){const e=n.split("="),i=decodeURIComponent(e[0].trim().toLowerCase());if(i===t)return decodeURIComponent(e[1])}return null}($d);return t&&t.length==Gd||(t=function(t){let e="";const n=new Uint8Array(t);window.crypto.getRandomValues(n);for(let t=0;t<n.length;t++){const i=Qd.charAt(n[t]%Qd.length);e+=Math.random()>.5?i.toUpperCase():i}return e}(Gd),function(t,e){document.cookie=encodeURIComponent(t)+"="+encodeURIComponent(e)+";path=/"}($d,t)),t}class Kd extends zl{static get requires(){return[Wd]}static get pluginName(){return"CKFinderUploadAdapter"}init(){const t=this.editor.config.get("ckfinder.uploadUrl");t&&(this.editor.plugins.get(Wd).createUploadAdapter=(e=>new Zd(e,t,this.editor.t)))}}class Zd{constructor(t,e,n){this.loader=t,this.url=e,this.t=n}upload(){return new Promise((t,e)=>{this._initRequest(),this._initListeners(t,e),this._sendRequest()})}abort(){this.xhr&&this.xhr.abort()}_initRequest(){const t=this.xhr=new XMLHttpRequest;t.open("POST",this.url,!0),t.responseType="json"}_initListeners(t,e){const n=this.xhr,i=this.loader,o=(0,this.t)("a")+` ${i.file.name}.`;n.addEventListener("error",()=>e(o)),n.addEventListener("abort",()=>e()),n.addEventListener("load",()=>{const i=n.response;if(!i||!i.uploaded)return e(i&&i.error&&i.error.message?i.error.message:o);t({default:i.url})}),n.upload&&n.upload.addEventListener("progress",t=>{t.lengthComputable&&(i.uploadTotal=t.total,i.uploaded=t.loaded)})}_sendRequest(){const t=new FormData;t.append("upload",this.loader.file),t.append("ckCsrfToken",Jd()),this.xhr.send(t)}}class Xd{constructor(t,e,n){let i;if("function"==typeof n)i=n;else{const e=n;i=(()=>{t.execute(e)})}t.model.document.on("change",(n,o)=>{if("transparent"==o.type)return;const r=Array.from(t.model.document.differ.getChanges()),s=r[0];if(1!=r.length||"insert"!==s.type||"$text"!=s.name||1!=s.length)return;const a=s.position.textNode||s.position.nodeAfter;if(!a.parent.is("paragraph"))return;const c=e.exec(a.data);c&&t.model.enqueueChange(t=>{const e=t.createPositionAt(a.parent,0),n=t.createPositionAt(a.parent,c[0].length),o=t.createRange(e,n);t.remove(o),i({match:c})})})}}class tu{constructor(t,e,n){let i,o,r,s;e instanceof RegExp?i=e:r=e,"string"==typeof n?o=n:s=n,r=r||(t=>{let e;const n=[],o=[];for(;null!==(e=i.exec(t))&&!(e&&e.length<4);){let{index:t,1:i,2:r,3:s}=e;const a=i+r+s,c=[t+=e[0].length-a.length,t+i.length],l=[t+i.length+r.length,t+i.length+r.length+s.length];n.push(c),n.push(l),o.push([t+i.length,t+i.length+r.length])}return{remove:n,format:o}}),s=s||((t,e)=>{for(const n of e)t.setAttribute(o,!0,n);t.removeSelectionAttribute(o)}),t.model.document.on("change",(e,n)=>{if("transparent"==n.type)return;const i=t.model.document.selection;if(!i.isCollapsed)return;const a=Array.from(t.model.document.differ.getChanges()),c=a[0];if(1!=a.length||"insert"!==c.type||"$text"!=c.name||1!=c.length)return;const l=i.focus.parent,d=function(t){return Array.from(t.getChildren()).reduce((t,e)=>t+e.data,"")}(l).slice(0,i.focus.offset),u=r(d),h=eu(l,u.format,t.model),f=eu(l,u.remove,t.model);h.length&&f.length&&t.model.enqueueChange(e=>{const n=t.model.schema.getValidRanges(h,o);s(e,n);for(const t of f.reverse())e.remove(t)})})}}function eu(t,e,n){return e.filter(t=>void 0!==t[0]&&void 0!==t[1]).map(e=>n.createRange(n.createPositionAt(t,e[0]),n.createPositionAt(t,e[1])))}class nu extends ql{constructor(t,e){super(t),this.attributeKey=e}refresh(){const t=this.editor.model,e=t.document;this.value=this._getValueFromFirstAllowedNode(),this.isEnabled=t.schema.checkAttributeInSelection(e.selection,this.attributeKey)}execute(t={}){const e=this.editor.model,n=e.document.selection,i=void 0===t.forceValue?!this.value:t.forceValue;e.change(t=>{if(n.isCollapsed)i?t.setSelectionAttribute(this.attributeKey,!0):t.removeSelectionAttribute(this.attributeKey);else{const o=e.schema.getValidRanges(n.getRanges(),this.attributeKey);for(const e of o)i?t.setAttribute(this.attributeKey,i,e):t.removeAttribute(this.attributeKey,e)}})}_getValueFromFirstAllowedNode(){const t=this.editor.model,e=t.schema,n=t.document.selection;if(n.isCollapsed)return n.hasAttribute(this.attributeKey);for(const t of n.getRanges())for(const n of t.getItems())if(e.checkAttribute(n,this.attributeKey))return n.hasAttribute(this.attributeKey);return!1}}const iu="bold";class ou extends zl{init(){const t=this.editor;t.model.schema.extend("$text",{allowAttributes:iu}),t.conversion.attributeToElement({model:iu,view:"strong",upcastAlso:["b",{styles:{"font-weight":"bold"}}]}),t.commands.add(iu,new nu(t,iu)),t.keystrokes.set("CTRL+B",iu)}}var ru=n(22),su=n.n(ru);const au="bold";class cu extends zl{init(){const t=this.editor,e=t.t;t.ui.componentFactory.add(au,n=>{const i=t.commands.get(au),o=new Ld(n);return o.set({label:e("c"),icon:su.a,keystroke:"CTRL+B",tooltip:!0}),o.bind("isOn","isEnabled").to(i,"value","isEnabled"),this.listenTo(o,"execute",()=>t.execute(au)),o})}}const lu="italic";class du extends zl{init(){const t=this.editor;t.model.schema.extend("$text",{allowAttributes:lu}),t.conversion.attributeToElement({model:lu,view:"i",upcastAlso:["em",{styles:{"font-style":"italic"}}]}),t.commands.add(lu,new nu(t,lu)),t.keystrokes.set("CTRL+I",lu)}}var uu=n(23),hu=n.n(uu);const fu="italic";class mu extends zl{init(){const t=this.editor,e=t.t;t.ui.componentFactory.add(fu,n=>{const i=t.commands.get(fu),o=new Ld(n);return o.set({label:e("b"),icon:hu.a,keystroke:"CTRL+I",tooltip:!0}),o.bind("isOn","isEnabled").to(i,"value","isEnabled"),this.listenTo(o,"execute",()=>t.execute(fu)),o})}}function pu(t){const e=t.next();return e.done?null:e.value}class gu extends ql{refresh(){this.value=this._getValue(),this.isEnabled=this._checkEnabled()}execute(){const t=this.editor.model,e=t.document,n=t.schema,i=Array.from(e.selection.getSelectedBlocks());t.change(t=>{if(this.value)this._removeQuote(t,i.filter(bu));else{const e=i.filter(t=>bu(t)||_u(n,t));this._applyQuote(t,e)}})}_getValue(){const t=pu(this.editor.model.document.selection.getSelectedBlocks());return!(!t||!bu(t))}_checkEnabled(){if(this.value)return!0;const t=this.editor.model.document.selection,e=this.editor.model.schema,n=pu(t.getSelectedBlocks());return!!n&&_u(e,n)}_removeQuote(t,e){wu(t,e).reverse().forEach(e=>{if(e.start.isAtStart&&e.end.isAtEnd)return void t.unwrap(e.start.parent);if(e.start.isAtStart){const n=t.createPositionBefore(e.start.parent);return void t.move(e,n)}e.end.isAtEnd||t.split(e.end);const n=t.createPositionAfter(e.end.parent);t.move(e,n)})}_applyQuote(t,e){const n=[];wu(t,e).reverse().forEach(e=>{let i=bu(e.start);i||(i=t.createElement("blockQuote"),t.wrap(e,i)),n.push(i)}),n.reverse().reduce((e,n)=>e.nextSibling==n?(t.merge(t.createPositionAfter(e)),e):n)}}function bu(t){return"blockQuote"==t.parent.name?t.parent:null}function wu(t,e){let n,i=0;const o=[];for(;i<e.length;){const r=e[i],s=e[i+1];n||(n=t.createPositionBefore(r)),s&&r.nextSibling==s||(o.push(t.createRange(n,t.createPositionAfter(r))),n=null),i++}return o}function _u(t,e){const n=t.checkChild(e.parent,"blockQuote"),i=t.checkChild(["$root","blockQuote"],e);return n&&i}class ku extends zl{init(){const t=this.editor,e=t.model.schema;t.commands.add("blockQuote",new gu(t)),e.register("blockQuote",{allowWhere:"$block",allowContentOf:"$root"}),e.addChildCheck((t,e)=>{if(t.endsWith("blockQuote")&&"blockQuote"==e.name)return!1}),t.conversion.elementToElement({model:"blockQuote",view:"blockquote"}),t.model.document.registerPostFixer(n=>{const i=t.model.document.differ.getChanges();for(const t of i)if("insert"==t.type){const i=t.position.nodeAfter;if(!i)continue;if(i.is("blockQuote")&&i.isEmpty)return n.remove(i),!0;if(i.is("blockQuote")&&!e.checkChild(t.position,i))return n.unwrap(i),!0;if(i.is("element")){const t=n.createRangeIn(i);for(const i of t.getItems())if(i.is("blockQuote")&&!e.checkChild(n.createPositionBefore(i),i))return n.unwrap(i),!0}}else if("remove"==t.type){const e=t.position.parent;if(e.is("blockQuote")&&e.isEmpty)return n.remove(e),!0}return!1})}afterInit(){const t=this.editor.commands.get("blockQuote");this.listenTo(this.editor.editing.view.document,"enter",(e,n)=>{const i=this.editor.model.document,o=i.selection.getLastPosition().parent;i.selection.isCollapsed&&o.isEmpty&&t.value&&(this.editor.execute("blockQuote"),this.editor.editing.view.scrollToTheSelection(),n.preventDefault(),e.stop())})}}var vu=n(24),yu=n.n(vu);n(62);class xu extends zl{init(){const t=this.editor,e=t.t;t.ui.componentFactory.add("blockQuote",n=>{const i=t.commands.get("blockQuote"),o=new Ld(n);return o.set({label:e("d"),icon:yu.a,tooltip:!0}),o.bind("isOn","isEnabled").to(i,"value","isEnabled"),this.listenTo(o,"execute",()=>t.execute("blockQuote")),o})}}var Au=n(25),Cu=n.n(Au);class Tu extends zl{static get pluginName(){return"CKFinderUI"}init(){const t=this.editor,e=t.ui.componentFactory,n=t.t;e.add("ckfinder",e=>{const i=t.commands.get("ckfinder"),o=new Ld(e);return o.set({label:n("k"),icon:Cu.a,tooltip:!0}),o.bind("isEnabled").to(i),o.on("execute",()=>{t.execute("ckfinder"),t.editing.view.focus()}),o})}}class Pu extends zl{static get pluginName(){return"Notification"}init(){this.on("show:warning",(t,e)=>{window.alert(e.message)},{priority:"lowest"})}showSuccess(t,e={}){this._showNotification({message:t,type:"success",namespace:e.namespace,title:e.title})}showInfo(t,e={}){this._showNotification({message:t,type:"info",namespace:e.namespace,title:e.title})}showWarning(t,e={}){this._showNotification({message:t,type:"warning",namespace:e.namespace,title:e.title})}_showNotification(t){const e=`show:${t.type}`+(t.namespace?`:${t.namespace}`:"");this.fire(e,{message:t.message,type:t.type,title:t.title||""})}}class Mu extends ql{constructor(t){super(t),this.stopListening(this.editor.model.document,"change"),this.listenTo(this.editor.model.document,"change",()=>this.refresh(),{priority:"low"})}refresh(){const t=this.editor.commands.get("imageUpload"),e=this.editor.commands.get("link");this.isEnabled=t&&e&&(t.isEnabled||e.isEnabled)}execute(){const t=this.editor,e=this.editor.config.get("ckfinder.openerMethod")||"modal";if("popup"!=e&&"modal"!=e)throw new P.b('ckfinder-unknown-openerMethod: The openerMethod config option must by "popup" or "modal".');const n=Object.assign({},this.editor.config.get("ckfinder.options"));n.chooseFiles=!0;const i=n.onInit;n.language||(n.language=t.locale.language),n.onInit=(e=>{i&&i(),e.on("files:choose",n=>{const i=n.data.files.toArray(),o=i.filter(t=>!t.isImage()),r=i.filter(t=>t.isImage());for(const e of o)t.execute("link",e.getUrl());const s=[];for(const t of r){const n=t.getUrl();s.push(n||e.request("file:getProxyUrl",{file:t}))}s.length&&Su(t,s)}),e.on("file:choose:resizedImage",e=>{const n=e.data.resizedUrl;if(n)Su(t,[n]);else{const e=t.plugins.get(Pu),n=t.locale.t;e.showWarning(n("aq"),{title:n("ar"),namespace:"ckfinder"})}})}),window.CKFinder[e](n)}}function Su(t,e){if(t.commands.get("imageUpload").isEnabled)t.execute("imageInsert",{source:e});else{const e=t.plugins.get(Pu),n=t.locale.t;e.showWarning(n("as"),{title:n("at"),namespace:"ckfinder"})}}class Iu extends zl{static get pluginName(){return"CKFinderEditing"}static get requires(){return[Pu]}init(){const t=this.editor;t.commands.add("ckfinder",new Mu(t))}}const Eu=/^data:(\S*?);base64,/;class Nu{constructor(t,e,n){if(!t)throw new Error("File must be provided");if(!e)throw new Error("Token must be provided");if(!n)throw new Error("Api address must be provided");this.file=function(t){if("string"!=typeof t)return!1;const e=t.match(Eu);return!(!e||!e.length)}(t)?function(t,e=512){try{const n=t.match(Eu)[1],i=atob(t.replace(Eu,"")),o=[];for(let t=0;t<i.length;t+=e){const n=i.slice(t,t+e),r=new Array(n.length);for(let t=0;t<n.length;t++)r[t]=n.charCodeAt(t);o.push(new Uint8Array(r))}return new Blob(o,{type:n})}catch(t){throw new Error("Problem with decoding Base64 image data.")}}(t):t,this._token=e,this._apiAddress=n}onProgress(t){return this.on("progress",(e,n)=>t(n)),this}onError(t){return this.once("error",(e,n)=>t(n)),this}abort(){this.xhr.abort()}send(){return this._prepareRequest(),this._attachXHRListeners(),this._sendRequest()}_prepareRequest(){const t=new XMLHttpRequest;t.open("POST",this._apiAddress),t.setRequestHeader("Authorization",this._token.value),t.responseType="json",this.xhr=t}_attachXHRListeners(){const t=this,e=this.xhr;function n(e){return()=>t.fire("error",e)}e.addEventListener("error",n("Network Error")),e.addEventListener("abort",n("Abort")),e.upload&&e.upload.addEventListener("progress",t=>{t.lengthComputable&&this.fire("progress",{total:t.total,uploaded:t.loaded})}),e.addEventListener("load",()=>{const t=e.status,n=e.response;if(t<200||t>299)return this.fire("error",n.message||n.error)})}_sendRequest(){const t=new FormData,e=this.xhr;return t.append("file",this.file),new Promise((n,i)=>{e.addEventListener("load",()=>{const t=e.status,o=e.response;return t<200||t>299?o.message?i(new Error(o.message)):i(o.error):n(o)}),e.addEventListener("error",()=>i(new Error("Network Error"))),e.addEventListener("abort",()=>i(new Error("Abort"))),e.send(t)})}}F(Nu,R);var Ou=Nu;const Ru={refreshInterval:36e5,autoRefresh:!0};class Du{constructor(t,e=Ru){if(!t)throw new Error("A `tokenUrl` must be provided as the first constructor argument.");this.set("value",e.initValue),this._refresh="function"==typeof t?t:()=>(function(t){return new Promise((e,n)=>{const i=new XMLHttpRequest;i.open("GET",t),i.addEventListener("load",()=>{const t=i.status,o=i.response;return t<200||t>299?n(new Error("Cannot download new token!")):e(o)}),i.addEventListener("error",()=>n(new Error("Network Error"))),i.addEventListener("abort",()=>n(new Error("Abort"))),i.send()})})(t),this._options=Object.assign({},Ru,e)}init(){return new Promise((t,e)=>{this._options.autoRefresh&&this._startRefreshing(),this.value?t(this):this._refreshToken().then(t).catch(e)})}_refreshToken(){return this._refresh().then(t=>this.set("value",t)).then(()=>this)}destroy(){this._stopRefreshing()}_startRefreshing(){this._refreshInterval=setInterval(()=>this._refreshToken(),this._options.refreshInterval)}_stopRefreshing(){clearInterval(this._refreshInterval)}static create(t,e=Ru){return new Du(t,e).init()}}F(Du,Li);var Lu=Du;class ju extends zl{static get pluginName(){return"CloudServices"}init(){const t=this.editor.config.get("cloudServices")||{};for(const e in t)this[e]=t[e];if(this.tokenUrl)return this.token=new ju.Token(this.tokenUrl),this.token.init();this.token=null}}ju.Token=Lu;class Vu extends zl{static get requires(){return[Wd,ju]}init(){const t=this.editor,e=t.plugins.get(ju),n=e.token,i=e.uploadUrl;n&&(this._uploadGateway=new Vu._UploadGateway(n,i),t.plugins.get(Wd).createUploadAdapter=(t=>new zu(this._uploadGateway,t)))}}class zu{constructor(t,e){this.uploadGateway=t,this.loader=e}upload(){return this.fileUploader=this.uploadGateway.upload(this.loader.file),this.fileUploader.on("progress",(t,e)=>{this.loader.uploadTotal=e.total,this.loader.uploaded=e.uploaded}),this.fileUploader.send()}abort(){this.fileUploader.abort()}}Vu._UploadGateway=class{constructor(t,e){if(!t)throw new Error("Token must be provided");if(!e)throw new Error("Api address must be provided");this._token=t,this._apiAddress=e}upload(t){return new Ou(t,this._token,this._apiAddress)}};class Bu extends cr{constructor(t){super(t),this._observedElements=new Set}observe(t,e){this.document.getRoot(e).on("change:children",(e,n)=>{this.view.once("render",()=>this._updateObservedElements(t,n))})}_updateObservedElements(t,e){if(!e.is("element")||e.is("attributeElement"))return;const n=this.view.domConverter.mapViewToDom(e);if(n){for(const t of n.querySelectorAll("img"))this._observedElements.has(t)||(this.listenTo(t,"load",(t,e)=>this._fireEvents(e)),this._observedElements.add(t));for(const e of this._observedElements)t.contains(e)||(this.stopListening(e),this._observedElements.delete(e))}}_fireEvents(t){this.isEnabled&&(this.document.fire("layoutChanged"),this.document.fire("imageLoaded",t))}destroy(){this._observedElements.clear(),super.destroy()}}function Fu(t){return n=>{n.on(`attribute:${t}:image`,e)};function e(t,e,n){if(!n.consumable.consume(e.item,t.name))return;const i=n.writer,o=n.mapper.toViewElement(e.item).getChild(0);null!==e.attributeNewValue?i.setAttribute(e.attributeKey,e.attributeNewValue,o):i.removeAttribute(e.attributeKey,o)}}class Uu{constructor(){this._stack=[]}add(t,e){const n=this._stack,i=n[0];this._insertDescriptor(t);const o=n[0];i===o||Hu(i,o)||this.fire("change:top",{oldDescriptor:i,newDescriptor:o,writer:e})}remove(t,e){const n=this._stack,i=n[0];this._removeDescriptor(t);const o=n[0];i===o||Hu(i,o)||this.fire("change:top",{oldDescriptor:i,newDescriptor:o,writer:e})}_insertDescriptor(t){const e=this._stack,n=e.findIndex(e=>e.id===t.id);if(Hu(t,e[n]))return;n>-1&&e.splice(n,1);let i=0;for(;e[i]&&qu(e[i],t);)i++;e.splice(i,0,t)}_removeDescriptor(t){const e=this._stack,n=e.findIndex(e=>e.id===t);n>-1&&e.splice(n,1)}}function Hu(t,e){return t&&e&&t.priority==e.priority&&Wu(t.classes)==Wu(e.classes)}function qu(t,e){return t.priority>e.priority||!(t.priority<e.priority)&&Wu(t.classes)>Wu(e.classes)}function Wu(t){return Array.isArray(t)?t.sort().join(","):t}F(Uu,R);var Yu=n(26),$u=n.n(Yu);const Gu=Symbol("isWidget"),Qu=Symbol("label"),Ju="ck-widget",Ku="ck-widget_selected";function Zu(t){return!!t.is("element")&&!!t.getCustomProperty(Gu)}function Xu(t,e,n={}){return co.isEdge||e.setAttribute("contenteditable","false",t),e.addClass(Ju,t),e.setCustomProperty(Gu,!0,t),t.getFillerOffset=ih,n.label&&function(t,e,n){n.setCustomProperty(Qu,e,t)}(t,n.label,e),n.hasSelectionHandler&&function(t,e){const n=e.createUIElement("div",{class:"ck ck-widget__selection-handler"},function(t){const e=this.toDomElement(t),n=new Rd;return n.set("content",$u.a),n.render(),e.appendChild(n.element),e});e.insert(e.createPositionAt(t,0),n),e.addClass(["ck-widget_selectable"],t)}(t,e),function(t,e,n,i){const o=new Uu;o.on("change:top",(e,o)=>{o.oldDescriptor&&i(t,o.oldDescriptor,o.writer),o.newDescriptor&&n(t,o.newDescriptor,o.writer)}),e.setCustomProperty("addHighlight",(t,e,n)=>o.add(e,n),t),e.setCustomProperty("removeHighlight",(t,e,n)=>o.remove(e,n),t)}(t,e,(t,e,n)=>n.addClass(i(e.classes),t),(t,e,n)=>n.removeClass(i(e.classes),t)),t;function i(t){return Array.isArray(t)?t:[t]}}function th(t){const e=t.getCustomProperty(Qu);return e?"function"==typeof e?e():e:""}function eh(t,e){return e.addClass(["ck-editor__editable","ck-editor__nested-editable"],t),co.isEdge||(e.setAttribute("contenteditable",t.isReadOnly?"false":"true",t),t.on("change:isReadOnly",(n,i,o)=>{e.setAttribute("contenteditable",o?"false":"true",t)})),t.on("change:isFocused",(n,i,o)=>{o?e.addClass("ck-editor__nested-editable_focused",t):e.removeClass("ck-editor__nested-editable_focused",t)}),t}function nh(t,e){const n=t.getSelectedElement();if(n)return e.createPositionAfter(n);const i=t.getSelectedBlocks().next().value;if(i){if(i.isEmpty)return e.createPositionAt(i,0);const n=e.createPositionAfter(i);return t.focus.isTouching(n)?n:e.createPositionBefore(i)}return t.focus}function ih(){return null}const oh=Symbol("isImage");function rh(t){const e=t.getSelectedElement();return!(!e||!function(t){return!!t.getCustomProperty(oh)&&Zu(t)}(e))}function sh(t){return!!t&&t.is("image")}function ah(t,e,n={}){const i=t.createElement("image",n),o=nh(e.document.selection,e);e.insertContent(i,o),i.parent&&t.setSelection(i,"on")}function ch(t){const e=t.schema,n=t.document.selection;return function(t,e,n){const i=function(t,e){let n=nh(t,e).parent;n.is("$root")||(n=n.parent);return n}(t,n);return e.checkChild(i,"image")}(n,e,t)&&function(t,e){const n=t.getSelectedElement(),i=!!n&&e.isObject(n),o=!![...t.focus.getAncestors()].find(t=>e.isObject(t));return!i&&!o}(n,e)}class lh extends ql{refresh(){this.isEnabled=ch(this.editor.model)}execute(t){const e=this.editor.model;e.change(n=>{const i=Array.isArray(t.source)?t.source:[t.source];for(const t of i)ah(n,e,{src:t})})}}class dh extends zl{init(){const t=this.editor,e=t.model.schema,n=t.t,i=t.conversion;t.editing.view.addObserver(Bu),e.register("image",{isObject:!0,isBlock:!0,allowWhere:"$block",allowAttributes:["alt","src","srcset"]}),i.for("dataDowncast").add(aa({model:"image",view:(t,e)=>uh(e)})),i.for("editingDowncast").add(aa({model:"image",view:(t,e)=>(function(t,e,n){return e.setCustomProperty(oh,!0,t),Xu(t,e,{label:function(){const e=t.getChild(0).getAttribute("alt");return e?`${e} ${n}`:n}})})(uh(e),e,n("j"))})),i.for("downcast").add(Fu("src")).add(Fu("alt")).add(function(){return e=>{e.on("attribute:srcset:image",t)};function t(t,e,n){if(!n.consumable.consume(e.item,t.name))return;const i=n.writer,o=n.mapper.toViewElement(e.item).getChild(0);if(null===e.attributeNewValue){const t=e.attributeOldValue;t.data&&(i.removeAttribute("srcset",o),i.removeAttribute("sizes",o),t.width&&i.removeAttribute("width",o))}else{const t=e.attributeNewValue;t.data&&(i.setAttribute("srcset",t.data,o),i.setAttribute("sizes","100vw",o),t.width&&i.setAttribute("width",t.width,o))}}}()),i.for("upcast").add(Oa({view:{name:"img",attributes:{src:!0}},model:(t,e)=>e.createElement("image",{src:t.getAttribute("src")})})).add(Da({view:{name:"img",key:"alt"},model:"alt"})).add(Da({view:{name:"img",key:"srcset"},model:{key:"srcset",value:t=>{const e={data:t.getAttribute("srcset")};return t.hasAttribute("width")&&(e.width=t.getAttribute("width")),e}}})).add(function(){return e=>{e.on("element:figure",t)};function t(t,e,n){if(!n.consumable.test(e.viewItem,{name:!0,classes:"image"}))return;const i=Array.from(e.viewItem.getChildren()).find(t=>t.is("img"));if(!i||!i.hasAttribute("src")||!n.consumable.test(i,{name:!0}))return;const o=n.convertItem(i,e.modelCursor),r=pu(o.modelRange.getItems());r&&(n.convertChildren(e.viewItem,n.writer.createPositionAt(r,0)),e.modelRange=o.modelRange,e.modelCursor=o.modelCursor)}}()),t.commands.add("imageInsert",new lh(t))}}function uh(t){const e=t.createEmptyElement("img"),n=t.createContainerElement("figure",{class:"image"});return t.insert(t.createPositionAt(n,0),e),n}class hh extends Jr{constructor(t){super(t),this.domEventType="mousedown"}onDomEvent(t){this.fire(t.type,t)}}n(64);const fh=mo("Ctrl+A");class mh extends zl{static get pluginName(){return"Widget"}init(){const t=this.editor.editing.view,e=t.document;this._previouslySelected=new Set,this.editor.editing.downcastDispatcher.on("selection",(t,e,n)=>{this._clearPreviouslySelectedWidgets(n.writer);const i=n.writer,o=i.document.selection,r=o.getSelectedElement();let s=null;for(const t of o.getRanges())for(const e of t){const t=e.item;Zu(t)&&!ph(t,s)&&(i.addClass(Ku,t),this._previouslySelected.add(t),s=t,t==r&&i.setSelection(o.getRanges(),{fake:!0,label:th(r)}))}},{priority:"low"}),t.addObserver(hh),this.listenTo(e,"mousedown",(...t)=>this._onMousedown(...t)),this.listenTo(e,"keydown",(...t)=>this._onKeydown(...t),{priority:"high"}),this.listenTo(e,"delete",(t,e)=>{this._handleDelete("forward"==e.direction)&&(e.preventDefault(),t.stop())},{priority:"high"})}_onMousedown(t,e){const n=this.editor,i=n.editing.view,o=i.document;let r=e.target;if(function(t){for(;t;){if(t&&t.is("editableElement")&&!t.is("rootElement"))return!0;t=t.parent}return!1}(r))return;if(!Zu(r)&&!(r=r.findAncestor(Zu)))return;e.preventDefault(),o.isFocused||i.focus();const s=n.editing.mapper.toModelElement(r);this._setSelectionOverElement(s)}_onKeydown(t,e){const n=e.keyCode,i=n==ho.delete||n==ho.arrowdown||n==ho.arrowright;let o=!1;!function(t){return t==ho.arrowright||t==ho.arrowleft||t==ho.arrowup||t==ho.arrowdown}(n)?!function(t){return fo(t)==fh}(e)?n===ho.enter&&(o=this._handleEnterKey(e.shiftKey)):o=this._selectAllNestedEditableContent()||this._selectAllContent():o=this._handleArrowKeys(i),o&&(e.preventDefault(),t.stop())}_handleDelete(t){if(this.editor.isReadOnly)return;const e=this.editor.model.document.selection;if(!e.isCollapsed)return;const n=this._getObjectElementNextToSelection(t);return n?(this.editor.model.change(t=>{let i=e.anchor.parent;for(;i.isEmpty;){const e=i;i=e.parent,t.remove(e)}this._setSelectionOverElement(n)}),!0):void 0}_handleArrowKeys(t){const e=this.editor.model,n=e.schema,i=e.document.selection,o=i.getSelectedElement();if(o&&n.isObject(o)){const o=t?i.getLastPosition():i.getFirstPosition(),r=n.getNearestSelectionRange(o,t?"forward":"backward");return r&&e.change(t=>{t.setSelection(r)}),!0}if(!i.isCollapsed)return;const r=this._getObjectElementNextToSelection(t);return r&&n.isObject(r)?(this._setSelectionOverElement(r),!0):void 0}_handleEnterKey(t){const e=this.editor.model,n=e.document.selection.getSelectedElement();if(n&&e.schema.isObject(n))return e.change(e=>{const i=e.createElement("paragraph");e.insert(i,n,t?"before":"after"),e.setSelection(i,"in")}),!0}_selectAllNestedEditableContent(){const t=this.editor.model,e=t.document.selection,n=t.schema.getLimitElement(e);return e.getFirstRange().root!=n&&(t.change(t=>{t.setSelection(t.createRangeIn(n))}),!0)}_selectAllContent(){const t=this.editor.model,e=this.editor.editing,n=e.view.document.selection.getSelectedElement();if(n&&Zu(n)){const i=e.mapper.toModelElement(n.parent);return t.change(t=>{t.setSelection(t.createRangeIn(i))}),!0}return!1}_setSelectionOverElement(t){this.editor.model.change(e=>{e.setSelection(e.createRangeOn(t))})}_getObjectElementNextToSelection(t){const e=this.editor.model,n=e.schema,i=e.document.selection,o=e.createSelection(i);e.modifySelection(o,{direction:t?"forward":"backward"});const r=t?o.focus.nodeBefore:o.focus.nodeAfter;return r&&n.isObject(r)?r:null}_clearPreviouslySelectedWidgets(t){for(const e of this._previouslySelected)t.removeClass(Ku,e);this._previouslySelected.clear()}}function ph(t,e){return!!e&&Array.from(t.getAncestors()).includes(e)}class gh extends ql{refresh(){const t=this.editor.model.document.selection.getSelectedElement();this.isEnabled=sh(t),sh(t)&&t.hasAttribute("alt")?this.value=t.getAttribute("alt"):this.value=!1}execute(t){const e=this.editor.model,n=e.document.selection.getSelectedElement();e.change(e=>{e.setAttribute("alt",t.newValue,n)})}}class bh extends zl{init(){this.editor.commands.add("imageTextAlternative",new gh(this.editor))}}function wh({emitter:t,activator:e,callback:n,contextElements:i}){t.listenTo(document,"mousedown",(t,{target:o})=>{if(e()){for(const t of i)if(t.contains(o))return;n()}})}n(66);class _h extends xl{constructor(t,e){super(t);const n=`ck-input-${I()}`,i=`ck-status-${I()}`;this.set("label"),this.set("value"),this.set("isReadOnly",!1),this.set("errorText",null),this.set("infoText",null),this.labelView=this._createLabelView(n),this.inputView=this._createInputView(e,n,i),this.statusView=this._createStatusView(i),this.bind("_statusText").to(this,"errorText",this,"infoText",(t,e)=>t||e);const o=this.bindTemplate;this.setTemplate({tag:"div",attributes:{class:["ck","ck-labeled-input",o.if("isReadOnly","ck-disabled")]},children:[this.labelView,this.inputView,this.statusView]})}_createLabelView(t){const e=new Cl(this.locale);return e.for=t,e.bind("text").to(this,"label"),e}_createInputView(t,e,n){const i=new t(this.locale,n);return i.id=e,i.ariaDesribedById=n,i.bind("value").to(this),i.bind("isReadOnly").to(this),i.bind("hasError").to(this,"errorText",t=>!!t),i.on("input",()=>{this.errorText=null}),i}_createStatusView(t){const e=new xl(this.locale),n=this.bindTemplate;return e.setTemplate({tag:"div",attributes:{class:["ck","ck-labeled-input__status",n.if("errorText","ck-labeled-input__status_error"),n.if("_statusText","ck-hidden",t=>!t)],id:t},children:[{text:n.to("_statusText")}]}),e}select(){this.inputView.select()}focus(){this.inputView.focus()}}n(68);class kh extends xl{constructor(t){super(t),this.set("value"),this.set("id"),this.set("placeholder"),this.set("isReadOnly",!1),this.set("hasError",!1),this.set("ariaDesribedById");const e=this.bindTemplate;this.setTemplate({tag:"input",attributes:{type:"text",class:["ck","ck-input","ck-input-text",e.if("hasError","ck-error")],id:e.to("id"),placeholder:e.to("placeholder"),readonly:e.to("isReadOnly"),"aria-invalid":e.if("hasError",!0),"aria-describedby":e.to("ariaDesribedById")},on:{input:e.to("input")}})}render(){super.render();const t=t=>{this.element.value=t||0===t?t:""};t(this.value),this.on("change:value",(e,n,i)=>{t(i)})}select(){this.element.select()}focus(){this.element.focus()}}function vh({view:t}){t.listenTo(t.element,"submit",(e,n)=>{n.preventDefault(),t.fire("submit")},{useCapture:!0})}var yh=n(7),xh=n.n(yh),Ah=n(8),Ch=n.n(Ah);n(70);class Th extends xl{constructor(t){super(t);const e=this.locale.t;this.focusTracker=new Kc,this.keystrokes=new Uc,this.labeledInput=this._createLabeledInputView(),this.saveButtonView=this._createButton(e("ba"),xh.a,"ck-button-save"),this.saveButtonView.type="submit",this.cancelButtonView=this._createButton(e("bb"),Ch.a,"ck-button-cancel","cancel"),this._focusables=new tl,this._focusCycler=new Nl({focusables:this._focusables,focusTracker:this.focusTracker,keystrokeHandler:this.keystrokes,actions:{focusPrevious:"shift + tab",focusNext:"tab"}}),this.setTemplate({tag:"form",attributes:{class:["ck","ck-text-alternative-form"],tabindex:"-1"},children:[this.labeledInput,this.saveButtonView,this.cancelButtonView]})}render(){super.render(),this.keystrokes.listenTo(this.element),vh({view:this}),[this.labeledInput,this.saveButtonView,this.cancelButtonView].forEach(t=>{this._focusables.add(t),this.focusTracker.add(t.element)})}_createButton(t,e,n,i){const o=new Ld(this.locale);return o.set({label:t,icon:e,tooltip:!0}),o.extendTemplate({attributes:{class:n}}),i&&o.delegate("execute").to(this,i),o}_createLabeledInputView(){const t=this.locale.t,e=new _h(this.locale,kh);return e.label=t("bc"),e.inputView.placeholder=t("bc"),e}}function Ph({element:t,target:e,positions:n,limiter:i,fitInViewport:o}){ct(e)&&(e=e()),ct(i)&&(i=i());const r=function(t){for(;t&&"html"!=t.tagName.toLowerCase();){if("static"!=Ko.window.getComputedStyle(t).position)return t;t=t.parentElement}return null}(t.parentElement),s=new ks(t),a=new ks(e);let c,l;if(i||o){const t=i&&new ks(i).getVisible(),e=o&&new ks(Ko.window);[l,c]=function(t,e,n,i,o){let r,s,a=0,c=0;const l=n.getArea();return t.some(t=>{const[d,u]=Mh(t,e,n);let h,f;if(i)if(o){const t=i.getIntersection(o);h=t?t.getIntersectionArea(u):0}else h=i.getIntersectionArea(u);function m(){c=f,a=h,r=u,s=d}return o&&(f=o.getIntersectionArea(u)),o&&!i?f>c&&m():!o&&i?h>a&&m():f>c&&h>=a?m():f>=c&&h>a&&m(),h===l}),r?[s,r]:null}(n,a,s,t,e)||Mh(n[0],a,s)}else[l,c]=Mh(n[0],a,s);let{left:d,top:u}=Sh(c);if(r){const t=Sh(new ks(r)),e=ws(r);d-=t.left,u-=t.top,d+=r.scrollLeft,u+=r.scrollTop,d-=e.left,u-=e.top}return{left:d,top:u,name:l}}function Mh(t,e,n){const{left:i,top:o,name:r}=t(e,n);return[r,n.clone().moveTo(i,o)]}function Sh({left:t,top:e}){const{scrollX:n,scrollY:i}=Ko.window;return{left:t+n,top:e+i}}n(72);const Ih=Sl("px"),Eh=Ko.document.body;class Nh extends xl{constructor(t){super(t);const e=this.bindTemplate;this.set("top",0),this.set("left",0),this.set("position","arrow_nw"),this.set("isVisible",!1),this.set("withArrow",!0),this.set("className"),this.content=this.createCollection(),this.setTemplate({tag:"div",attributes:{class:["ck","ck-balloon-panel",e.to("position",t=>`ck-balloon-panel_${t}`),e.if("isVisible","ck-balloon-panel_visible"),e.if("withArrow","ck-balloon-panel_with-arrow"),e.to("className")],style:{top:e.to("top",Ih),left:e.to("left",Ih)}},children:this.content})}show(){this.isVisible=!0}hide(){this.isVisible=!1}attachTo(t){this.show();const e=Nh.defaultPositions,n=Object.assign({},{element:this.element,positions:[e.southArrowNorth,e.southArrowNorthWest,e.southArrowNorthEast,e.northArrowSouth,e.northArrowSouthWest,e.northArrowSouthEast],limiter:Eh,fitInViewport:!0},t),{top:i,left:o,name:r}=Nh._getOptimalPosition(n);Object.assign(this,{top:i,left:o,position:r})}pin(t){this.unpin(),this._pinWhenIsVisibleCallback=(()=>{this.isVisible?this._startPinning(t):this._stopPinning()}),this._startPinning(t),this.listenTo(this,"change:isVisible",this._pinWhenIsVisibleCallback)}unpin(){this._pinWhenIsVisibleCallback&&(this._stopPinning(),this.stopListening(this,"change:isVisible",this._pinWhenIsVisibleCallback),this._pinWhenIsVisibleCallback=null,this.hide())}_startPinning(t){this.attachTo(t);const e=Oh(t.target),n=t.limiter?Oh(t.limiter):Eh;this.listenTo(Ko.document,"scroll",(i,o)=>{const r=o.target,s=e&&r.contains(e),a=n&&r.contains(n);!s&&!a&&e&&n||this.attachTo(t)},{useCapture:!0}),this.listenTo(Ko.window,"resize",()=>{this.attachTo(t)})}_stopPinning(){this.stopListening(Ko.document,"scroll"),this.stopListening(Ko.window,"resize")}}function Oh(t){return tr(t)?t:bs(t)?t.commonAncestorContainer:"function"==typeof t?Oh(t()):null}function Rh(t,e){return t.top-e.height-Nh.arrowVerticalOffset}function Dh(t){return t.bottom+Nh.arrowVerticalOffset}Nh.arrowHorizontalOffset=25,Nh.arrowVerticalOffset=10,Nh._getOptimalPosition=Ph,Nh.defaultPositions={northArrowSouth:(t,e)=>({top:Rh(t,e),left:t.left+t.width/2-e.width/2,name:"arrow_s"}),northArrowSouthEast:(t,e)=>({top:Rh(t,e),left:t.left+t.width/2-e.width+Nh.arrowHorizontalOffset,name:"arrow_se"}),northArrowSouthWest:(t,e)=>({top:Rh(t,e),left:t.left+t.width/2-Nh.arrowHorizontalOffset,name:"arrow_sw"}),northWestArrowSouth:(t,e)=>({top:Rh(t,e),left:t.left-e.width/2,name:"arrow_s"}),northWestArrowSouthWest:(t,e)=>({top:Rh(t,e),left:t.left-Nh.arrowHorizontalOffset,name:"arrow_sw"}),northWestArrowSouthEast:(t,e)=>({top:Rh(t,e),left:t.left-e.width+Nh.arrowHorizontalOffset,name:"arrow_se"}),northEastArrowSouth:(t,e)=>({top:Rh(t,e),left:t.right-e.width/2,name:"arrow_s"}),northEastArrowSouthEast:(t,e)=>({top:Rh(t,e),left:t.right-e.width+Nh.arrowHorizontalOffset,name:"arrow_se"}),northEastArrowSouthWest:(t,e)=>({top:Rh(t,e),left:t.right-Nh.arrowHorizontalOffset,name:"arrow_sw"}),southArrowNorth:(t,e)=>({top:Dh(t),left:t.left+t.width/2-e.width/2,name:"arrow_n"}),southArrowNorthEast:(t,e)=>({top:Dh(t),left:t.left+t.width/2-e.width+Nh.arrowHorizontalOffset,name:"arrow_ne"}),southArrowNorthWest:(t,e)=>({top:Dh(t),left:t.left+t.width/2-Nh.arrowHorizontalOffset,name:"arrow_nw"}),southWestArrowNorth:(t,e)=>({top:Dh(t),left:t.left-e.width/2,name:"arrow_n"}),southWestArrowNorthWest:(t,e)=>({top:Dh(t),left:t.left-Nh.arrowHorizontalOffset,name:"arrow_nw"}),southWestArrowNorthEast:(t,e)=>({top:Dh(t),left:t.left-e.width+Nh.arrowHorizontalOffset,name:"arrow_ne"}),southEastArrowNorth:(t,e)=>({top:Dh(t),left:t.right-e.width/2,name:"arrow_n"}),southEastArrowNorthEast:(t,e)=>({top:Dh(t),left:t.right-e.width+Nh.arrowHorizontalOffset,name:"arrow_ne"}),southEastArrowNorthWest:(t,e)=>({top:Dh(t),left:t.right-Nh.arrowHorizontalOffset,name:"arrow_nw"})};class Lh extends zl{static get pluginName(){return"ContextualBalloon"}init(){this.view=new Nh,this.positionLimiter=(()=>{const t=this.editor.editing.view,e=t.document.selection.editableElement;return e?t.domConverter.mapViewToDom(e.root):null}),this._stack=new Map,this.editor.ui.view.body.add(this.view),this.editor.ui.focusTracker.add(this.view.element)}get visibleView(){const t=this._stack.get(this.view.content.get(0));return t?t.view:null}hasView(t){return this._stack.has(t)}add(t){if(this.hasView(t.view))throw new P.b("contextualballoon-add-view-exist: Cannot add configuration of the same view twice.");this.visibleView&&this.view.content.remove(this.visibleView),this._stack.set(t.view,t),this._show(t)}remove(t){if(!this.hasView(t))throw new P.b("contextualballoon-remove-view-not-exist: Cannot remove configuration of not existing view.");if(this.visibleView===t){this.view.content.remove(t),this._stack.delete(t);const e=Array.from(this._stack.values()).pop();e?this._show(e):this.view.hide()}else this._stack.delete(t)}updatePosition(t){t&&(this._stack.get(this.visibleView).position=t),this.view.pin(this._getBalloonPosition())}_show({view:t,balloonClassName:e=""}){this.view.className=e,this.view.content.add(t),this.view.pin(this._getBalloonPosition())}_getBalloonPosition(){let t=Array.from(this._stack.values()).pop().position;return t&&!t.limiter&&(t=Object.assign({},t,{limiter:this.positionLimiter})),t}}var jh=n(27),Vh=n.n(jh);function zh(t){const e=t.editing.view,n=Nh.defaultPositions;return{target:e.domConverter.viewToDom(e.document.selection.getSelectedElement()),positions:[n.northArrowSouth,n.northArrowSouthWest,n.northArrowSouthEast,n.southArrowNorth,n.southArrowNorthWest,n.southArrowNorthEast]}}class Bh extends zl{static get requires(){return[Lh]}init(){this._createButton(),this._createForm()}_createButton(){const t=this.editor,e=t.t;t.ui.componentFactory.add("imageTextAlternative",n=>{const i=t.commands.get("imageTextAlternative"),o=new Ld(n);return o.set({label:e("au"),icon:Vh.a,tooltip:!0}),o.bind("isEnabled").to(i,"isEnabled"),this.listenTo(o,"execute",()=>this._showForm()),o})}_createForm(){const t=this.editor,e=t.editing.view.document;this._balloon=this.editor.plugins.get("ContextualBalloon"),this._form=new Th(t.locale),this._form.render(),this.listenTo(this._form,"submit",()=>{t.execute("imageTextAlternative",{newValue:this._form.labeledInput.inputView.element.value}),this._hideForm(!0)}),this.listenTo(this._form,"cancel",()=>{this._hideForm(!0)}),this._form.keystrokes.set("Esc",(t,e)=>{this._hideForm(!0),e()}),this.listenTo(t.ui,"update",()=>{rh(e.selection)?this._isVisible&&function(t){const e=t.plugins.get("ContextualBalloon");if(rh(t.editing.view.document.selection)){const n=zh(t);e.updatePosition(n)}}(t):this._hideForm(!0)}),wh({emitter:this._form,activator:()=>this._isVisible,contextElements:[this._form.element],callback:()=>this._hideForm()})}_showForm(){if(this._isVisible)return;const t=this.editor,e=t.commands.get("imageTextAlternative"),n=this._form.labeledInput;this._balloon.hasView(this._form)||this._balloon.add({view:this._form,position:zh(t)}),n.value=n.inputView.element.value=e.value||"",this._form.labeledInput.select()}_hideForm(t){this._isVisible&&(this._balloon.remove(this._form),t&&this.editor.editing.view.focus())}get _isVisible(){return this._balloon.visibleView==this._form}}class Fh extends zl{static get requires(){return[bh,Bh]}static get pluginName(){return"ImageTextAlternative"}}n(74);class Uh extends zl{static get requires(){return[dh,mh,Fh]}static get pluginName(){return"Image"}}class Hh extends xl{constructor(t){super(t),this.buttonView=new Ld(t),this._fileInputView=new qh(t),this._fileInputView.bind("acceptedType").to(this),this._fileInputView.bind("allowMultipleFiles").to(this),this._fileInputView.delegate("done").to(this),this.setTemplate({tag:"span",attributes:{class:"ck-file-dialog-button"},children:[this.buttonView,this._fileInputView]}),this.buttonView.on("execute",()=>{this._fileInputView.open()})}focus(){this.buttonView.focus()}}class qh extends xl{constructor(t){super(t),this.set("acceptedType"),this.set("allowMultipleFiles",!1);const e=this.bindTemplate;this.setTemplate({tag:"input",attributes:{class:["ck-hidden"],type:"file",tabindex:"-1",accept:e.to("acceptedType"),multiple:e.to("allowMultipleFiles")},on:{change:e.to(()=>{this.element&&this.element.files&&this.element.files.length&&this.fire("done",this.element.files),this.element.value=""})}})}open(){this.element.click()}}var Wh=n(28),Yh=n.n(Wh);function $h(t){return/^image\/(jpeg|png|gif|bmp)$/.test(t.type)}function Gh(t){return new Promise(e=>{fetch(t.getAttribute("src")).then(t=>t.blob()).then(n=>{const i=function(t,e){return t.type?t.type:e.match(/data:(image\/\w+);base64/)?e.match(/data:(image\/\w+);base64/)[1].toLowerCase():"image/jpeg"}(n,t.getAttribute("src")),o=function(t,e,n){try{return new File([t],e,{type:n})}catch(t){return null}}(n,`image.${i.replace("image/","")}`,i);e({image:t,file:o})}).catch(()=>{e({image:t,file:null})})})}class Qh extends zl{init(){const t=this.editor,e=t.t;t.ui.componentFactory.add("imageUpload",n=>{const i=new Hh(n),o=t.commands.get("imageUpload");return i.set({acceptedType:"image/*",allowMultipleFiles:!0}),i.buttonView.set({label:e("l"),icon:Yh.a,tooltip:!0}),i.buttonView.bind("isEnabled").to(o),i.on("done",(e,n)=>{const i=Array.from(n).filter($h);i.length&&t.execute("imageUpload",{file:i})}),i})}}var Jh=n(29),Kh=n.n(Jh);n(76),n(78),n(80);class Zh extends zl{constructor(t){super(t),this.placeholder="data:image/svg+xml;utf8,"+encodeURIComponent(Kh.a)}init(){this.editor.editing.downcastDispatcher.on("attribute:uploadStatus:image",(...t)=>this.uploadStatusChange(...t))}uploadStatusChange(t,e,n){const i=this.editor,o=e.item,r=o.getAttribute("uploadId");if(!n.consumable.consume(e.item,t.name))return;const s=i.plugins.get(Wd),a=r?e.attributeNewValue:null,c=this.placeholder,l=i.editing.mapper.toViewElement(o),d=n.writer;if("reading"==a)return ef(l,d),void nf(c,l,d);if("uploading"==a){const t=s.loaders.get(r);return ef(l,d),void(t?(of(l,d),function(t,e,n,i){const o=function(t){const e=t.createUIElement("div",{class:"ck-progress-bar"});return t.setCustomProperty(Xh,!0,e),e}(e);e.insert(e.createPositionAt(t,"end"),o),n.on("change:uploadedPercent",(t,e,n)=>{i.change(t=>{t.setStyle("width",n+"%",o)})})}(l,d,t,i.editing.view)):nf(c,l,d))}"complete"==a&&s.loaders.get(r)&&!co.isEdge&&function(t,e,n){const i=e.createUIElement("div",{class:"ck-image-upload-complete-icon"});e.insert(e.createPositionAt(t,"end"),i),setTimeout(()=>{n.change(t=>t.remove(t.createRangeOn(i)))},3e3)}(l,d,i.editing.view),function(t,e){sf(t,e,Xh)}(l,d),of(l,d),function(t,e){e.removeClass("ck-appear",t)}(l,d)}}const Xh=Symbol("progress-bar"),tf=Symbol("placeholder");function ef(t,e){t.hasClass("ck-appear")||e.addClass("ck-appear",t)}function nf(t,e,n){e.hasClass("ck-image-upload-placeholder")||n.addClass("ck-image-upload-placeholder",e);const i=e.getChild(0);i.getAttribute("src")!==t&&n.setAttribute("src",t,i),rf(e,tf)||n.insert(n.createPositionAfter(i),function(t){const e=t.createUIElement("div",{class:"ck-upload-placeholder-loader"});return t.setCustomProperty(tf,!0,e),e}(n))}function of(t,e){t.hasClass("ck-image-upload-placeholder")&&e.removeClass("ck-image-upload-placeholder",t),sf(t,e,tf)}function rf(t,e){for(const n of t.getChildren())if(n.getCustomProperty(e))return n}function sf(t,e,n){const i=rf(t,n);i&&e.remove(e.createRangeOn(i))}class af{createDocumentFragment(t){return new _o(t)}createElement(t,e,n){return new mi(t,e,n)}createText(t){return new ci(t)}clone(t,e=!1){return t._clone(e)}appendChild(t,e){return e._appendChild(t)}insertChild(t,e,n){return n._insertChild(t,e)}removeChildren(t,e,n){return n._removeChildren(t,e)}remove(t){const e=t.parent;return e?this.removeChildren(e.getChildIndex(t),1,e):[]}replace(t,e){const n=t.parent;if(n){const i=n.getChildIndex(t);return this.removeChildren(i,1,n),this.insertChild(i,e,n),!0}return!1}rename(t,e){const n=new mi(t,e.getAttributes(),e.getChildren());return this.replace(e,n)?n:null}setAttribute(t,e,n){n._setAttribute(t,e)}removeAttribute(t,e){e._removeAttribute(t)}addClass(t,e){e._addClass(t)}removeClass(t,e){e._removeClass(t)}setStyle(t,e,n){C(t)&&void 0===n&&(n=e),n._setStyle(t,e)}removeStyle(t,e){e._removeStyle(t)}setCustomProperty(t,e,n){n._setCustomProperty(t,e)}removeCustomProperty(t,e){return e._removeCustomProperty(t)}createPositionAt(t,e){return $i._createAt(t,e)}createPositionAfter(t){return $i._createAfter(t)}createPositionBefore(t){return $i._createBefore(t)}createRange(t,e){return new Gi(t,e)}createRangeOn(t){return Gi._createOn(t)}createRangeIn(t){return Gi._createIn(t)}createSelection(t,e,n){return new Ki(t,e,n)}}class cf extends ql{refresh(){this.isEnabled=ch(this.editor.model)}execute(t){const e=this.editor,n=e.model,i=e.plugins.get(Wd);n.change(e=>{const o=Array.isArray(t.file)?t.file:[t.file];for(const t of o)lf(e,n,i,t)})}}function lf(t,e,n,i){const o=n.createLoader(i);o&&ah(t,e,{uploadId:o.id})}class df extends zl{static get requires(){return[Wd,Pu]}init(){const t=this.editor,e=t.model.document,n=t.model.schema,i=t.conversion,o=t.plugins.get(Wd);n.extend("image",{allowAttributes:["uploadId","uploadStatus"]}),t.commands.add("imageUpload",new cf(t)),i.for("upcast").add(Da({view:{name:"img",key:"uploadId"},model:"uploadId"})),this.listenTo(t.editing.view.document,"clipboardInput",(e,n)=>{if(function(t){return Array.from(t.types).includes("text/html")&&""!==t.getData("text/html")}(n.dataTransfer))return;const i=Array.from(n.dataTransfer.files).filter(t=>!!t&&$h(t)),o=n.targetRanges.map(e=>t.editing.mapper.toModelRange(e));t.model.change(n=>{n.setSelection(o),i.length&&(e.stop(),t.model.enqueueChange("default",()=>{t.execute("imageUpload",{file:i})}))})}),this.listenTo(t.plugins.get("Clipboard"),"inputTransformation",(e,n)=>{const i=Array.from(t.editing.view.createRangeIn(n.content)).filter(t=>(function(t){return!(!t.is("element","img")||!t.getAttribute("src"))&&(t.getAttribute("src").match(/^data:image\/\w+;base64,/g)||t.getAttribute("src").match(/^blob:/g))})(t.item)&&!t.item.getAttribute("uploadProcessed")).map(t=>Gh(t.item));i.length&&(e.stop(),Promise.all(i).then(e=>{const i=new af;for(const t of e)if(t.file){i.setAttribute("uploadProcessed",!0,t.image);const e=o.createLoader(t.file);e&&(i.setAttribute("src","",t.image),i.setAttribute("uploadId",e.id,t.image))}else i.remove(t.image);t.plugins.get("Clipboard").fire("inputTransformation",n)}))}),t.editing.view.document.on("dragover",(t,e)=>{e.preventDefault()}),e.on("change",()=>{const t=e.differ.getChanges({includeChangesInGraveyard:!0});for(const e of t)if("insert"==e.type&&"image"==e.name){const t=e.position.nodeAfter,n="$graveyard"==e.position.root.rootName,i=t.getAttribute("uploadId");if(!i)continue;const r=o.loaders.get(i);if(!r)continue;n?r.abort():"idle"==r.status&&this._readAndUpload(r,t)}})}_readAndUpload(t,e){const n=this.editor,i=n.model,o=n.locale.t,r=n.plugins.get(Wd),s=n.plugins.get(Pu);return i.enqueueChange("transparent",t=>{t.setAttribute("uploadStatus","reading",e)}),t.read().then(o=>{const r=n.editing.mapper.toViewElement(e).getChild(0),s=t.upload();return n.editing.view.change(t=>{t.setAttribute("src",o,r)}),i.enqueueChange("transparent",t=>{t.setAttribute("uploadStatus","uploading",e)}),s}).then(t=>{i.enqueueChange("transparent",n=>{n.setAttributes({uploadStatus:"complete",src:t.default},e),this._parseAndSetSrcsetAttributeOnImage(t,e,n)}),a()}).catch(n=>{if("error"!==t.status&&"aborted"!==t.status)throw n;"error"==t.status&&s.showWarning(n,{title:o("r"),namespace:"upload"}),a(),i.enqueueChange("transparent",t=>{t.remove(e)})});function a(){i.enqueueChange("transparent",t=>{t.removeAttribute("uploadId",e),t.removeAttribute("uploadStatus",e)}),r.destroyLoader(t)}}_parseAndSetSrcsetAttributeOnImage(t,e,n){let i=0;const o=Object.keys(t).filter(t=>{const e=parseInt(t,10);if(!isNaN(e))return i=Math.max(i,e),!0}).map(e=>`${t[e]} ${e}w`).join(", ");""!=o&&n.setAttribute("srcset",{data:o,width:i},e)}}class uf extends zl{static get pluginName(){return"ImageUpload"}static get requires(){return[df,Qh,Zh]}}class hf extends ql{refresh(){const t=this.editor.model,e=pu(t.document.selection.getSelectedBlocks());this.value=!!e&&e.is("paragraph"),this.isEnabled=!!e&&ff(e,t.schema)}execute(t={}){const e=this.editor.model,n=e.document;e.change(i=>{const o=(t.selection||n.selection).getSelectedBlocks();for(const t of o)!t.is("paragraph")&&ff(t,e.schema)&&i.rename(t,"paragraph")})}}function ff(t,e){return e.checkChild(t.parent,"paragraph")&&!e.isObject(t)}class mf extends zl{static get pluginName(){return"Paragraph"}init(){const t=this.editor,e=t.model,n=t.data;t.commands.add("paragraph",new hf(t)),e.schema.register("paragraph",{inheritAllFrom:"$block"}),t.conversion.elementToElement({model:"paragraph",view:"p"}),n.upcastDispatcher.on("element",(t,e,n)=>{const i=n.writer;if(n.consumable.test(e.viewItem,{name:e.viewItem.name}))if(mf.paragraphLikeElements.has(e.viewItem.name)){if(e.viewItem.isEmpty)return;const t=i.createElement("paragraph"),o=n.splitToAllowedParent(t,e.modelCursor);if(!o)return;i.insert(t,o.position);const{modelRange:r}=n.convertChildren(e.viewItem,i.createPositionAt(t,0));e.modelRange=i.createRange(i.createPositionBefore(t),r.end),e.modelCursor=e.modelRange.end}else gf(e.viewItem,e.modelCursor,n.schema)&&(e=Object.assign(e,pf(e.viewItem,e.modelCursor,n)))},{priority:"low"}),n.upcastDispatcher.on("text",(t,e,n)=>{e.modelRange||gf(e.viewItem,e.modelCursor,n.schema)&&(e=Object.assign(e,pf(e.viewItem,e.modelCursor,n)))},{priority:"lowest"}),e.document.registerPostFixer(t=>this._autoparagraphEmptyRoots(t)),t.on("dataReady",()=>{e.enqueueChange("transparent",t=>this._autoparagraphEmptyRoots(t))},{priority:"lowest"})}_autoparagraphEmptyRoots(t){const e=this.editor.model;for(const n of e.document.getRootNames()){const i=e.document.getRoot(n);if(i.isEmpty&&"$graveyard"!=i.rootName&&e.schema.checkChild(i,"paragraph"))return t.insertElement("paragraph",i),!0}}}function pf(t,e,n){const i=n.writer.createElement("paragraph");return n.writer.insert(i,e),n.convertItem(t,n.writer.createPositionAt(i,0))}function gf(t,e,n){const i=n.createContext(e);return!!n.checkChild(i,"paragraph")&&!!n.checkChild(i.push("paragraph"),t)}mf.paragraphLikeElements=new Set(["blockquote","dd","div","dt","h1","h2","h3","h4","h5","h6","li","p","td"]);class bf extends ql{constructor(t,e){super(t),this.modelElements=e}refresh(){const t=pu(this.editor.model.document.selection.getSelectedBlocks());this.value=!!t&&this.modelElements.includes(t.name)&&t.name,this.isEnabled=!!t&&this.modelElements.some(e=>wf(t,e,this.editor.model.schema))}execute(t){const e=this.editor.model,n=e.document,i=t.value;e.change(t=>{const o=Array.from(n.selection.getSelectedBlocks()).filter(t=>wf(t,i,e.schema));for(const e of o)e.is(i)||t.rename(e,i)})}}function wf(t,e,n){return n.checkChild(t.parent,e)&&!n.isObject(t)}const _f="paragraph";class kf extends zl{constructor(t){super(t),t.config.define("heading",{options:[{model:"paragraph",title:"Paragraph",class:"ck-heading_paragraph"},{model:"heading1",view:"h2",title:"Heading 1",class:"ck-heading_heading1"},{model:"heading2",view:"h3",title:"Heading 2",class:"ck-heading_heading2"},{model:"heading3",view:"h4",title:"Heading 3",class:"ck-heading_heading3"}]})}static get requires(){return[mf]}init(){const t=this.editor,e=t.config.get("heading.options"),n=[];for(const i of e)i.model!==_f&&(t.model.schema.register(i.model,{inheritAllFrom:"$block"}),t.conversion.elementToElement(i),n.push(i.model));this._addDefaultH1Conversion(t),t.commands.add("heading",new bf(t,n))}afterInit(){const t=this.editor,e=t.commands.get("enter"),n=t.config.get("heading.options");e&&this.listenTo(e,"afterExecute",(e,i)=>{const o=t.model.document.selection.getFirstPosition().parent;n.some(t=>o.is(t.model))&&!o.is(_f)&&0===o.childCount&&i.writer.rename(o,_f)})}_addDefaultH1Conversion(t){t.conversion.for("upcast").add(Oa({model:"heading1",view:"h1",converterPriority:E.get("low")+1}))}}class vf{constructor(t,e){e&&Ei(this,e),t&&this.set(t)}}F(vf,Li);class yf extends xl{constructor(t){super(t);const e=this.bindTemplate;this.set("isVisible",!1),this.set("position","se"),this.children=this.createCollection(),this.setTemplate({tag:"div",attributes:{class:["ck","ck-reset","ck-dropdown__panel",e.to("position",t=>`ck-dropdown__panel_${t}`),e.if("isVisible","ck-dropdown__panel-visible")]},children:this.children,on:{selectstart:e.to(t=>t.preventDefault())}})}focus(){this.children.length&&this.children.first.focus()}focusLast(){if(this.children.length){const t=this.children.last;"function"==typeof t.focusLast?t.focusLast():t.focus()}}}n(82);class xf extends xl{constructor(t,e,n){super(t);const i=this.bindTemplate;this.buttonView=e,this.panelView=n,this.set("isOpen",!1),this.set("isEnabled",!0),this.set("class"),this.set("panelPosition","auto"),this.focusTracker=new Kc,this.keystrokes=new Uc,this.setTemplate({tag:"div",attributes:{class:["ck","ck-dropdown",i.to("class"),i.if("isEnabled","ck-disabled",t=>!t)]},children:[e,n]}),e.extendTemplate({attributes:{class:["ck-dropdown__button"]}})}render(){super.render(),this.listenTo(this.buttonView,"open",()=>{this.isOpen=!this.isOpen}),this.panelView.bind("isVisible").to(this,"isOpen"),this.on("change:isOpen",()=>{if(this.isOpen)if("auto"===this.panelPosition){const t=xf.defaultPanelPositions;this.panelView.position=Ph({element:this.panelView.element,target:this.buttonView.element,fitInViewport:!0,positions:[t.southEast,t.southWest,t.northEast,t.northWest]}).name}else this.panelView.position=this.panelPosition}),this.keystrokes.listenTo(this.element),this.focusTracker.add(this.element);const t=(t,e)=>{this.isOpen&&(this.buttonView.focus(),this.isOpen=!1,e())};this.keystrokes.set("arrowdown",(t,e)=>{this.buttonView.isEnabled&&!this.isOpen&&(this.isOpen=!0,e())}),this.keystrokes.set("arrowright",(t,e)=>{this.isOpen&&e()}),this.keystrokes.set("arrowleft",t),this.keystrokes.set("esc",t)}focus(){this.buttonView.focus()}}xf.defaultPanelPositions={southEast:t=>({top:t.bottom,left:t.left,name:"se"}),southWest:(t,e)=>({top:t.bottom,left:t.left-e.width+t.width,name:"sw"}),northEast:(t,e)=>({top:t.top-e.height,left:t.left,name:"ne"}),northWest:(t,e)=>({top:t.bottom-e.height,left:t.left-e.width+t.width,name:"nw"})};var Af=n(30),Cf=n.n(Af);class Tf extends Ld{constructor(t){super(t),this.arrowView=this._createArrowView(),this.extendTemplate({attributes:{"aria-haspopup":!0}}),this.delegate("execute").to(this,"open")}render(){super.render(),this.children.add(this.arrowView)}_createArrowView(){const t=new Rd;return t.content=Cf.a,t.extendTemplate({attributes:{class:"ck-dropdown__arrow"}}),t}}n(84);class Pf extends xl{constructor(){super(),this.items=this.createCollection(),this.focusTracker=new Kc,this.keystrokes=new Uc,this._focusCycler=new Nl({focusables:this.items,focusTracker:this.focusTracker,keystrokeHandler:this.keystrokes,actions:{focusPrevious:"arrowup",focusNext:"arrowdown"}}),this.setTemplate({tag:"ul",attributes:{class:["ck","ck-reset","ck-list"]},children:this.items})}render(){super.render();for(const t of this.items)this.focusTracker.add(t.element);this.items.on("add",(t,e)=>{this.focusTracker.add(e.element)}),this.items.on("remove",(t,e)=>{this.focusTracker.remove(e.element)}),this.keystrokes.listenTo(this.element)}focus(){this._focusCycler.focusFirst()}focusLast(){this._focusCycler.focusLast()}}class Mf extends xl{constructor(t){super(t),this.children=this.createCollection(),this.setTemplate({tag:"li",attributes:{class:["ck","ck-list__item"]},children:this.children})}focus(){this.children.first.focus()}}class Sf extends xl{constructor(t){super(t),this.setTemplate({tag:"li",attributes:{class:["ck","ck-list__separator"]}})}}n(86);class If extends Ld{constructor(t){super(t),this.toggleSwitchView=this._createToggleView(),this.extendTemplate({attributes:{class:"ck-switchbutton"}})}render(){super.render(),this.children.add(this.toggleSwitchView)}_createToggleView(){const t=new xl;return t.setTemplate({tag:"span",attributes:{class:["ck","ck-button__toggle"]},children:[{tag:"span",attributes:{class:["ck","ck-button__toggle__inner"]}}]}),t}}n(88),n(90);function Ef(t,e=Tf){const n=new e(t),i=new yf(t),o=new xf(t,n,i);return n.bind("isEnabled").to(o),n instanceof Tf?n.bind("isOn").to(o,"isOpen"):n.arrowView.bind("isOn").to(o,"isOpen"),function(t){(function(t){t.on("render",()=>{wh({emitter:t,activator:()=>t.isOpen,callback:()=>{t.isOpen=!1},contextElements:[t.element]})})})(t),function(t){t.on("execute",e=>{e.source instanceof If||(t.isOpen=!1)})}(t),function(t){t.keystrokes.set("arrowdown",(e,n)=>{t.isOpen&&(t.panelView.focus(),n())}),t.keystrokes.set("arrowup",(e,n)=>{t.isOpen&&(t.panelView.focusLast(),n())})}(t)}(o),o}function Nf(t,e){const n=t.locale,i=t.listView=new Pf(n);i.items.bindTo(e).using(({type:t,model:e})=>{if("separator"===t)return new Sf(n);if("button"===t||"switchbutton"===t){const i=new Mf(n);let o;return(o="button"===t?new Ld(n):new If(n)).bind(...Object.keys(e)).to(e),o.delegate("execute").to(i),i.children.add(o),i}}),t.panelView.children.add(i),i.items.delegate("execute").to(t)}n(17);class Of extends zl{init(){const t=this.editor,e=t.t,n=function(t){const e=t.t,n={Paragraph:e("av"),"Heading 1":e("aw"),"Heading 2":e("ax"),"Heading 3":e("ay")};return t.config.get("heading.options").map(t=>{const e=n[t.title];return e&&e!=t.title&&(t=Object.assign({},t,{title:e})),t})}(t),i=e("m"),o=e("n");t.ui.componentFactory.add("heading",e=>{const r={},s=new Xi,a=t.commands.get("heading"),c=t.commands.get("paragraph"),l=[a];for(const t of n){const e={type:"button",model:new vf({label:t.title,class:t.class,withText:!0})};"paragraph"===t.model?(e.model.bind("isOn").to(c,"value"),e.model.set("commandName","paragraph"),l.push(c)):(e.model.bind("isOn").to(a,"value",e=>e===t.model),e.model.set({commandName:"heading",commandValue:t.model})),s.add(e),r[t.model]=t.title}const d=Ef(e);return Nf(d,s),d.buttonView.set({isOn:!1,withText:!0,tooltip:o}),d.extendTemplate({attributes:{class:["ck-heading-dropdown"]}}),d.bind("isEnabled").toMany(l,"isEnabled",(...t)=>t.some(t=>t)),d.buttonView.bind("label").to(a,"value",c,"value",(t,e)=>{const n=t||e&&"paragraph";return r[n]?r[n]:i}),this.listenTo(d,"execute",e=>{t.execute(e.source.commandName,e.source.commandValue?{value:e.source.commandValue}:void 0),t.editing.view.focus()}),d})}}n(93);const Rf=new WeakMap;function Df(t,e,n,i){const o=t.document;Rf.has(o)||(Rf.set(o,new Map),o.registerPostFixer(t=>(function(t,e){const n=Rf.get(t);let i=!1;for(const[t,o]of n)Lf(e,t,o)&&(i=!0);return i})(o,t))),Rf.get(o).set(e,{placeholderText:n,checkFunction:i}),t.render()}function Lf(t,e,n){const i=e.document,o=n.placeholderText;let r=!1;if(!i)return!1;e.getAttribute("data-placeholder")!==o&&(t.setAttribute("data-placeholder",o,e),r=!0);const s=i.selection.anchor,a=n.checkFunction;if(a&&!a())return e.hasClass("ck-placeholder")&&(t.removeClass("ck-placeholder",e),r=!0),r;const c=!Array.from(e.getChildren()).some(t=>!t.is("uiElement"));return!i.isFocused&&c?(e.hasClass("ck-placeholder")||(t.addClass("ck-placeholder",e),r=!0),r):(c&&s&&s.parent!==e?e.hasClass("ck-placeholder")||(t.addClass("ck-placeholder",e),r=!0):e.hasClass("ck-placeholder")&&(t.removeClass("ck-placeholder",e),r=!0),r)}const jf=Symbol("imageCaption");function Vf(t){for(const e of t.getChildren())if(e&&e.is("caption"))return e;return null}function zf(t){const e=t.parent;return"figcaption"==t.name&&e&&"figure"==e.name&&e.hasClass("image")?{name:!0}:null}class Bf extends zl{init(){const t=this.editor,e=t.editing.view,n=t.model.schema,i=t.data,o=t.editing,r=t.t;n.register("caption",{allowIn:"image",allowContentOf:"$block",isLimit:!0}),t.model.document.registerPostFixer(t=>this._insertMissingModelCaptionElement(t)),t.conversion.for("upcast").add(Oa({view:zf,model:"caption"}));i.downcastDispatcher.on("insert:caption",Ff(t=>t.createContainerElement("figcaption"),!1));const s=function(t,e){return n=>{const i=n.createEditableElement("figcaption");return n.setCustomProperty(jf,!0,i),Df(t,i,e),eh(i,n)}}(e,r("q"));o.downcastDispatcher.on("insert:caption",Ff(s)),o.downcastDispatcher.on("insert",this._fixCaptionVisibility(t=>t.item),{priority:"high"}),o.downcastDispatcher.on("remove",this._fixCaptionVisibility(t=>t.position.parent),{priority:"high"}),e.document.registerPostFixer(t=>this._updateCaptionVisibility(t))}_updateCaptionVisibility(t){const e=this.editor.editing.mapper,n=this._lastSelectedCaption;let i;const o=this.editor.model.document.selection,r=o.getSelectedElement();if(r&&r.is("image")){const t=Vf(r);i=e.toViewElement(t)}const s=Uf(o.getFirstPosition().parent);if(s&&(i=e.toViewElement(s)),i)return n?n===i?qf(i,t):(Hf(n,t),this._lastSelectedCaption=i,qf(i,t)):(this._lastSelectedCaption=i,qf(i,t));if(n){const e=Hf(n,t);return this._lastSelectedCaption=null,e}return!1}_fixCaptionVisibility(t){return(e,n,i)=>{const o=Uf(t(n)),r=this.editor.editing.mapper,s=i.writer;if(o){const t=r.toViewElement(o);t&&(o.childCount?s.removeClass("ck-hidden",t):s.addClass("ck-hidden",t))}}}_insertMissingModelCaptionElement(t){const e=this.editor.model.document.differ.getChanges();for(const n of e)if("insert"==n.type&&"image"==n.name){const e=n.position.nodeAfter;if(!Vf(e))return t.appendElement("caption",e),!0}}}function Ff(t,e=!0){return(n,i,o)=>{const r=i.item;if((r.childCount||e)&&sh(r.parent)){if(!o.consumable.consume(i.item,"insert"))return;const e=o.mapper.toViewElement(i.range.start.parent),n=t(o.writer),s=o.writer;r.childCount||s.addClass("ck-hidden",n),function(t,e,n,i){const o=i.writer.createPositionAt(n,"end");i.writer.insert(o,t),i.mapper.bindElements(e,t)}(n,i.item,e,o)}}}function Uf(t){const e=t.getAncestors({includeSelf:!0}).find(t=>"caption"==t.name);return e&&e.parent&&"image"==e.parent.name?e:null}function Hf(t,e){return!t.childCount&&!t.hasClass("ck-hidden")&&(e.addClass("ck-hidden",t),!0)}function qf(t,e){return!!t.hasClass("ck-hidden")&&(e.removeClass("ck-hidden",t),!0)}n(95);class Wf extends ql{constructor(t,e){super(t),this._defaultStyle=!1,this.styles=e.reduce((t,e)=>(t[e.name]=e,e.isDefault&&(this._defaultStyle=e.name),t),{})}refresh(){const t=this.editor.model.document.selection.getSelectedElement();if(this.isEnabled=sh(t),t)if(t.hasAttribute("imageStyle")){const e=t.getAttribute("imageStyle");this.value=!!this.styles[e]&&e}else this.value=this._defaultStyle;else this.value=!1}execute(t){const e=t.value,n=this.editor.model,i=n.document.selection.getSelectedElement();n.change(t=>{this.styles[e].isDefault?t.removeAttribute("imageStyle",i):t.setAttribute("imageStyle",e,i)})}}function Yf(t,e){for(const n of e)if(n.name===t)return n}var $f=n(13),Gf=n.n($f),Qf=n(14),Jf=n.n(Qf),Kf=n(15),Zf=n.n(Kf),Xf=n(10),tm=n.n(Xf);const em={full:{name:"full",title:"Full size image",icon:Gf.a,isDefault:!0},side:{name:"side",title:"Side image",icon:tm.a,className:"image-style-side"},alignLeft:{name:"alignLeft",title:"Left aligned image",icon:Jf.a,className:"image-style-align-left"},alignCenter:{name:"alignCenter",title:"Centered image",icon:Zf.a,className:"image-style-align-center"},alignRight:{name:"alignRight",title:"Right aligned image",icon:tm.a,className:"image-style-align-right"}},nm={full:Gf.a,left:Jf.a,right:tm.a,center:Zf.a};function im(t=[]){return t.map(om).map(t=>Object.assign({},t))}function om(t){if("string"==typeof t){const e=t;em[e]?t=Object.assign({},em[e]):(fs.a.warn("image-style-not-found: There is no such image style of given name.",{name:e}),t={name:e})}else if(em[t.name]){const e=em[t.name],n=Object.assign({},t);for(const i in e)t.hasOwnProperty(i)||(n[i]=e[i]);t=n}return"string"==typeof t.icon&&nm[t.icon]&&(t.icon=nm[t.icon]),t}class rm extends zl{static get requires(){return[dh]}static get pluginName(){return"ImageStyleEditing"}init(){const t=this.editor,e=t.model.schema,n=t.data,i=t.editing;t.config.define("image.styles",["full","side"]);const o=im(t.config.get("image.styles"));e.extend("image",{allowAttributes:"imageStyle"});const r=function(t){return(e,n,i)=>{if(!i.consumable.consume(n.item,e.name))return;const o=Yf(n.attributeNewValue,t),r=Yf(n.attributeOldValue,t),s=i.mapper.toViewElement(n.item),a=i.writer;r&&a.removeClass(r.className,s),o&&a.addClass(o.className,s)}}(o);i.downcastDispatcher.on("attribute:imageStyle:image",r),n.downcastDispatcher.on("attribute:imageStyle:image",r),n.upcastDispatcher.on("element:figure",function(t){const e=t.filter(t=>!t.isDefault);return(t,n,i)=>{if(!n.modelRange)return;const o=n.viewItem,r=pu(n.modelRange.getItems());if(i.schema.checkAttribute(r,"imageStyle"))for(const t of e)i.consumable.consume(o,{classes:t.className})&&i.writer.setAttribute("imageStyle",t.name,r)}}(o),{priority:"low"}),t.commands.add("imageStyle",new Wf(t,o))}}n(97);class sm extends zl{get localizedDefaultStylesTitles(){const t=this.editor.t;return{"Full size image":t("e"),"Side image":t("f"),"Left aligned image":t("g"),"Centered image":t("h"),"Right aligned image":t("i")}}init(){const t=function(t,e){for(const n of t)e[n.title]&&(n.title=e[n.title]);return t}(im(this.editor.config.get("image.styles")),this.localizedDefaultStylesTitles);for(const e of t)this._createButton(e)}_createButton(t){const e=this.editor,n=`imageStyle:${t.name}`;e.ui.componentFactory.add(n,n=>{const i=e.commands.get("imageStyle"),o=new Ld(n);return o.set({label:t.title,icon:t.icon,tooltip:!0}),o.bind("isEnabled").to(i,"isEnabled"),o.bind("isOn").to(i,"value",e=>e===t.name),this.listenTo(o,"execute",()=>e.execute("imageStyle",{value:t.name})),o})}}class am extends zl{static get requires(){return[Lh]}static get pluginName(){return"WidgetToolbarRepository"}init(){const t=this.editor,e=t.plugins.get("BalloonToolbar");e&&this.listenTo(e,"show",e=>{(function(t){const e=t.getSelectedElement();return!(!e||!Zu(e))})(t.editing.view.document.selection)&&e.stop()},{priority:"high"}),this._toolbars=new Map,this._balloon=this.editor.plugins.get("ContextualBalloon"),this.listenTo(t.ui,"update",()=>{this._updateToolbarsVisibility()}),this.listenTo(t.ui.focusTracker,"change:isFocused",()=>{this._updateToolbarsVisibility()},{priority:"low"})}register(t,{items:e,visibleWhen:n,balloonClassName:i="ck-toolbar-container"}){const o=this.editor,r=new Dl;if(this._toolbars.has(t))throw new P.b("widget-toolbar-duplicated: Toolbar with the given id was already added.",{toolbarId:t});r.fillFromConfig(e,o.ui.componentFactory),this._toolbars.set(t,{view:r,visibleWhen:n,balloonClassName:i})}_updateToolbarsVisibility(){for(const t of this._toolbars.values())this.editor.ui.focusTracker.isFocused&&t.visibleWhen(this.editor.editing.view.document.selection)?this._showToolbar(t):this._hideToolbar(t)}_hideToolbar(t){this._isToolbarVisible(t)&&this._balloon.remove(t.view)}_showToolbar(t){this._isToolbarVisible(t)?function(t){const e=t.plugins.get("ContextualBalloon"),n=cm(t);e.updatePosition(n)}(this.editor):this._balloon.hasView(t.view)||this._balloon.add({view:t.view,position:cm(this.editor),balloonClassName:t.balloonClassName})}_isToolbarVisible(t){return this._balloon.visibleView==t.view}}function cm(t){const e=t.editing.view,n=Nh.defaultPositions,i=function(t){const e=t.getSelectedElement();if(e&&Zu(e))return e;let n=t.getFirstPosition().parent;for(;n;){if(n.is("element")&&Zu(n))return n;n=n.parent}}(e.document.selection);return{target:e.domConverter.viewToDom(i),positions:[n.northArrowSouth,n.northArrowSouthWest,n.northArrowSouthEast,n.southArrowNorth,n.southArrowNorthWest,n.southArrowNorthEast]}}function lm(t,e,n){return n.createRange(dm(t,e,!0,n),dm(t,e,!1,n))}function dm(t,e,n,i){let o=t.textNode||(n?t.nodeBefore:t.nodeAfter),r=null;for(;o&&o.getAttribute("linkHref")==e;)r=o,o=n?o.previousSibling:o.nextSibling;return r?i.createPositionAt(r,n?"before":"after"):t}class um extends ql{refresh(){const t=this.editor.model,e=t.document;this.value=e.selection.getAttribute("linkHref"),this.isEnabled=t.schema.checkAttributeInSelection(e.selection,"linkHref")}execute(t){const e=this.editor.model,n=e.document.selection;e.change(i=>{if(n.isCollapsed){const o=n.getFirstPosition();if(n.hasAttribute("linkHref")){const o=lm(n.getFirstPosition(),n.getAttribute("linkHref"),e);i.setAttribute("linkHref",t,o),i.setSelection(o)}else if(""!==t){const e=Rs(n.getAttributes());e.set("linkHref",t);const r=i.createText(t,e);i.insert(r,o),i.setSelection(i.createRangeOn(r))}}else{const o=e.schema.getValidRanges(n.getRanges(),"linkHref");for(const e of o)i.setAttribute("linkHref",t,e)}})}}class hm extends ql{refresh(){this.isEnabled=this.editor.model.document.selection.hasAttribute("linkHref")}execute(){const t=this.editor.model,e=t.document.selection;t.change(n=>{const i=e.isCollapsed?[lm(e.getFirstPosition(),e.getAttribute("linkHref"),t)]:e.getRanges();for(const t of i)n.removeAttribute("linkHref",t)})}}const fm=Symbol("linkElement"),mm=/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205f\u3000]/g,pm=/^(?:(?:https?|ftps?|mailto):|[^a-z]|[a-z+.-]+(?:[^a-z+.:-]|$))/i;function gm(t,e){const n=e.createAttributeElement("a",{href:t},{priority:5});return e.setCustomProperty(fm,!0,n),n}function bm(t){return function(t){return t.replace(mm,"").match(pm)}(t=String(t))?t:"#"}class wm{constructor(t,e,n){this.model=t,this.attribute=n,this._modelSelection=t.document.selection,this._overrideUid=null,this._isNextGravityRestorationSkipped=!1,e.listenTo(this._modelSelection,"change:range",(t,e)=>{this._isNextGravityRestorationSkipped?this._isNextGravityRestorationSkipped=!1:this._isGravityOverridden&&(!e.directChange&&_m(this._modelSelection.getFirstPosition(),n)||this._restoreGravity())})}handleForwardMovement(t,e){const n=this.attribute;if(!(this._isGravityOverridden||t.isAtStart&&this._hasSelectionAttribute))return ym(t,n)&&this._hasSelectionAttribute?(this._preventCaretMovement(e),this._removeSelectionAttribute(),!0):km(t,n)?(this._preventCaretMovement(e),this._overrideGravity(),!0):vm(t,n)&&this._hasSelectionAttribute?(this._preventCaretMovement(e),this._overrideGravity(),!0):void 0}handleBackwardMovement(t,e){const n=this.attribute;return this._isGravityOverridden?ym(t,n)&&this._hasSelectionAttribute?(this._preventCaretMovement(e),this._restoreGravity(),this._removeSelectionAttribute(),!0):(this._preventCaretMovement(e),this._restoreGravity(),t.isAtStart&&this._removeSelectionAttribute(),!0):ym(t,n)&&!this._hasSelectionAttribute?(this._preventCaretMovement(e),this._setSelectionAttributeFromTheNodeBefore(t),!0):t.isAtEnd&&vm(t,n)?this._hasSelectionAttribute?void(xm(t,n)&&(this._skipNextAutomaticGravityRestoration(),this._overrideGravity())):(this._preventCaretMovement(e),this._setSelectionAttributeFromTheNodeBefore(t),!0):t.isAtStart?this._hasSelectionAttribute?(this._removeSelectionAttribute(),this._preventCaretMovement(e),!0):void 0:void(xm(t,n)&&(this._skipNextAutomaticGravityRestoration(),this._overrideGravity()))}get _isGravityOverridden(){return!!this._overrideUid}get _hasSelectionAttribute(){return this._modelSelection.hasAttribute(this.attribute)}_overrideGravity(){this._overrideUid=this.model.change(t=>t.overrideSelectionGravity())}_restoreGravity(){this.model.change(t=>{t.restoreSelectionGravity(this._overrideUid),this._overrideUid=null})}_preventCaretMovement(t){t.preventDefault()}_removeSelectionAttribute(){this.model.change(t=>{t.removeSelectionAttribute(this.attribute)})}_setSelectionAttributeFromTheNodeBefore(t){const e=this.attribute;this.model.change(n=>{n.setSelectionAttribute(this.attribute,t.nodeBefore.getAttribute(e))})}_skipNextAutomaticGravityRestoration(){this._isNextGravityRestorationSkipped=!0}}function _m(t,e){return km(t,e)||vm(t,e)}function km(t,e){const{nodeBefore:n,nodeAfter:i}=t,o=!!n&&n.hasAttribute(e);return!!i&&i.hasAttribute(e)&&(!o||n.getAttribute(e)!==i.getAttribute(e))}function vm(t,e){const{nodeBefore:n,nodeAfter:i}=t,o=!!n&&n.hasAttribute(e),r=!!i&&i.hasAttribute(e);return o&&(!r||n.getAttribute(e)!==i.getAttribute(e))}function ym(t,e){const{nodeBefore:n,nodeAfter:i}=t,o=!!n&&n.hasAttribute(e);if(!!i&&i.hasAttribute(e)&&o)return i.getAttribute(e)!==n.getAttribute(e)}function xm(t,e){return _m(t.getShiftedBy(-1),e)}n(99);const Am="ck-link_selected";class Cm extends zl{init(){const t=this.editor;t.model.schema.extend("$text",{allowAttributes:"linkHref"}),t.conversion.for("dataDowncast").add(ca({model:"linkHref",view:gm})),t.conversion.for("editingDowncast").add(ca({model:"linkHref",view:(t,e)=>gm(bm(t),e)})),t.conversion.for("upcast").add(Ra({view:{name:"a",attributes:{href:!0}},model:{key:"linkHref",value:t=>t.getAttribute("href")}})),t.commands.add("link",new um(t)),t.commands.add("unlink",new hm(t)),function(t,e,n,i){const o=new wm(e,n,i),r=e.document.selection;n.listenTo(t.document,"keydown",(t,e)=>{if(!r.isCollapsed)return;if(e.shiftKey||e.altKey||e.ctrlKey)return;const n=e.keyCode==ho.arrowright,i=e.keyCode==ho.arrowleft;if(!n&&!i)return;const s=r.getFirstPosition();let a;(a=n?o.handleForwardMovement(s,e):o.handleBackwardMovement(s,e))&&t.stop()},{priority:E.get("high")+1})}(t.editing.view,t.model,this,"linkHref"),this._setupLinkHighlight()}_setupLinkHighlight(){const t=this.editor,e=t.editing.view,n=new Set;e.document.registerPostFixer(e=>{const i=t.model.document.selection;if(i.hasAttribute("linkHref")){const o=lm(i.getFirstPosition(),i.getAttribute("linkHref"),t.model),r=t.editing.mapper.toViewRange(o);for(const t of r.getItems())t.is("a")&&(e.addClass(Am,t),n.add(t))}}),t.conversion.for("editingDowncast").add(t=>{function i(){e.change(t=>{for(const e of n.values())t.removeClass(Am,e),n.delete(e)})}t.on("insert",i,{priority:"highest"}),t.on("remove",i,{priority:"highest"}),t.on("attribute",i,{priority:"highest"}),t.on("selection",i,{priority:"highest"})})}}class Tm extends Jr{constructor(t){super(t),this.domEventType="click"}onDomEvent(t){this.fire(t.type,t)}}n(101);class Pm extends xl{constructor(t){super(t);const e=t.t;this.focusTracker=new Kc,this.keystrokes=new Uc,this.urlInputView=this._createUrlInput(),this.saveButtonView=this._createButton(e("ba"),xh.a,"ck-button-save"),this.saveButtonView.type="submit",this.cancelButtonView=this._createButton(e("bb"),Ch.a,"ck-button-cancel","cancel"),this._focusables=new tl,this._focusCycler=new Nl({focusables:this._focusables,focusTracker:this.focusTracker,keystrokeHandler:this.keystrokes,actions:{focusPrevious:"shift + tab",focusNext:"tab"}}),this.setTemplate({tag:"form",attributes:{class:["ck","ck-link-form"],tabindex:"-1"},children:[this.urlInputView,this.saveButtonView,this.cancelButtonView]})}render(){super.render(),vh({view:this}),[this.urlInputView,this.saveButtonView,this.cancelButtonView].forEach(t=>{this._focusables.add(t),this.focusTracker.add(t.element)}),this.keystrokes.listenTo(this.element)}focus(){this._focusCycler.focusFirst()}_createUrlInput(){const t=this.locale.t,e=new _h(this.locale,kh);return e.label=t("bh"),e.inputView.placeholder="https://example.com",e}_createButton(t,e,n,i){const o=new Ld(this.locale);return o.set({label:t,icon:e,tooltip:!0}),o.extendTemplate({attributes:{class:n}}),i&&o.delegate("execute").to(this,i),o}}var Mm=n(31),Sm=n.n(Mm),Im=n(32),Em=n.n(Im);n(103);class Nm extends xl{constructor(t){super(t);const e=t.t;this.focusTracker=new Kc,this.keystrokes=new Uc,this.previewButtonView=this._createPreviewButton(),this.unlinkButtonView=this._createButton(e("bi"),Sm.a,"unlink"),this.editButtonView=this._createButton(e("bj"),Em.a,"edit"),this.set("href"),this._focusables=new tl,this._focusCycler=new Nl({focusables:this._focusables,focusTracker:this.focusTracker,keystrokeHandler:this.keystrokes,actions:{focusPrevious:"shift + tab",focusNext:"tab"}}),this.setTemplate({tag:"div",attributes:{class:["ck","ck-link-actions"],tabindex:"-1"},children:[this.previewButtonView,this.editButtonView,this.unlinkButtonView]})}render(){super.render(),[this.previewButtonView,this.editButtonView,this.unlinkButtonView].forEach(t=>{this._focusables.add(t),this.focusTracker.add(t.element)}),this.keystrokes.listenTo(this.element)}focus(){this._focusCycler.focusFirst()}_createButton(t,e,n){const i=new Ld(this.locale);return i.set({label:t,icon:e,tooltip:!0}),i.delegate("execute").to(this,n),i}_createPreviewButton(){const t=new Ld(this.locale),e=this.bindTemplate,n=this.t;return t.set({withText:!0,tooltip:n("bk")}),t.extendTemplate({attributes:{class:["ck","ck-link-actions__preview"],href:e.to("href",t=>t&&bm(t)),target:"_blank"}}),t.bind("label").to(this,"href",t=>t||n("bl")),t.bind("isEnabled").to(this,"href",t=>!!t),t.template.tag="a",t.template.eventListeners={},t}}var Om=n(33),Rm=n.n(Om);const Dm="Ctrl+K";class Lm extends zl{static get requires(){return[Lh]}init(){const t=this.editor;t.editing.view.addObserver(Tm),this.actionsView=this._createActionsView(),this.formView=this._createFormView(),this._balloon=t.plugins.get(Lh),this._createToolbarLinkButton(),this._enableUserBalloonInteractions()}_createActionsView(){const t=this.editor,e=new Nm(t.locale),n=t.commands.get("link"),i=t.commands.get("unlink");return e.bind("href").to(n,"value"),e.editButtonView.bind("isEnabled").to(n),e.unlinkButtonView.bind("isEnabled").to(i),this.listenTo(e,"edit",()=>{this._addFormView()}),this.listenTo(e,"unlink",()=>{t.execute("unlink"),this._hideUI()}),e.keystrokes.set("Esc",(t,e)=>{this._hideUI(),e()}),e.keystrokes.set(Dm,(t,e)=>{this._addFormView(),e()}),e}_createFormView(){const t=this.editor,e=new Pm(t.locale),n=t.commands.get("link");return e.urlInputView.bind("value").to(n,"value"),e.urlInputView.bind("isReadOnly").to(n,"isEnabled",t=>!t),e.saveButtonView.bind("isEnabled").to(n),this.listenTo(e,"submit",()=>{t.execute("link",e.urlInputView.inputView.element.value),this._removeFormView()}),this.listenTo(e,"cancel",()=>{this._removeFormView()}),e.keystrokes.set("Esc",(t,e)=>{this._removeFormView(),e()}),e}_createToolbarLinkButton(){const t=this.editor,e=t.commands.get("link"),n=t.t;t.keystrokes.set(Dm,(t,n)=>{n(),e.isEnabled&&this._showUI()}),t.ui.componentFactory.add("link",t=>{const i=new Ld(t);return i.isEnabled=!0,i.label=n("s"),i.icon=Rm.a,i.keystroke=Dm,i.tooltip=!0,i.bind("isOn","isEnabled").to(e,"value","isEnabled"),this.listenTo(i,"execute",()=>this._showUI()),i})}_enableUserBalloonInteractions(){const t=this.editor.editing.view.document;this.listenTo(t,"click",()=>{this._getSelectedLinkElement()&&this._showUI()}),this.editor.keystrokes.set("Tab",(t,e)=>{this._areActionsVisible&&!this.actionsView.focusTracker.isFocused&&(this.actionsView.focus(),e())},{priority:"high"}),this.editor.keystrokes.set("Esc",(t,e)=>{this._isUIVisible&&(this._hideUI(),e())}),wh({emitter:this.formView,activator:()=>this._isUIVisible,contextElements:[this._balloon.view.element],callback:()=>this._hideUI()})}_addActionsView(){this._areActionsInPanel||this._balloon.add({view:this.actionsView,position:this._getBalloonPositionData()})}_addFormView(){if(this._isFormInPanel)return;const t=this.editor.commands.get("link");this._balloon.add({view:this.formView,position:this._getBalloonPositionData()}),this.formView.urlInputView.select(),this.formView.urlInputView.inputView.element.value=t.value||""}_removeFormView(){this._isFormInPanel&&(this._balloon.remove(this.formView),this.editor.editing.view.focus())}_showUI(){this.editor.commands.get("link").isEnabled&&(this._getSelectedLinkElement()?this._areActionsVisible?this._addFormView():this._addActionsView():(this._addActionsView(),this._addFormView()),this._startUpdatingUI())}_hideUI(){if(!this._isUIInPanel)return;const t=this.editor;this.stopListening(t.ui,"update"),this._removeFormView(),this._balloon.remove(this.actionsView),t.editing.view.focus()}_startUpdatingUI(){const t=this.editor,e=t.editing.view.document;let n=this._getSelectedLinkElement(),i=o();function o(){return e.selection.focus.getAncestors().reverse().find(t=>t.is("element"))}this.listenTo(t.ui,"update",()=>{const t=this._getSelectedLinkElement(),e=o();n&&!t||!n&&e!==i?this._hideUI():this._balloon.updatePosition(this._getBalloonPositionData()),n=t,i=e})}get _isFormInPanel(){return this._balloon.hasView(this.formView)}get _areActionsInPanel(){return this._balloon.hasView(this.actionsView)}get _areActionsVisible(){return this._balloon.visibleView===this.actionsView}get _isUIInPanel(){return this._isFormInPanel||this._areActionsInPanel}get _isUIVisible(){return this._balloon.visibleView==this.formView||this._areActionsVisible}_getBalloonPositionData(){const t=this.editor.editing.view,e=t.document,n=this._getSelectedLinkElement();return{target:n?t.domConverter.mapViewToDom(n):t.domConverter.viewRangeToDom(e.selection.getFirstRange())}}_getSelectedLinkElement(){const t=this.editor.editing.view,e=t.document.selection;if(e.isCollapsed)return jm(e.getFirstPosition());{const n=e.getFirstRange().getTrimmed(),i=jm(n.start),o=jm(n.end);return i&&i==o&&t.createRangeIn(i).getTrimmed().isEqual(n)?i:null}}}function jm(t){return t.getAncestors().find(t=>(function(t){return t.is("attributeElement")&&!!t.getCustomProperty(fm)})(t))}class Vm extends ql{constructor(t,e){super(t),this.type="bulleted"==e?"bulleted":"numbered"}refresh(){this.value=this._getValue(),this.isEnabled=this._checkEnabled()}execute(){const t=this.editor.model,e=t.document,n=Array.from(e.selection.getSelectedBlocks()).filter(e=>Bm(e,t.schema)),i=!0===this.value;t.change(t=>{if(i){let e=n[n.length-1].nextSibling,i=Number.POSITIVE_INFINITY,o=[];for(;e&&"listItem"==e.name&&0!==e.getAttribute("listIndent");){const t=e.getAttribute("listIndent");t<i&&(i=t);const n=t-i;o.push({element:e,listIndent:n}),e=e.nextSibling}o=o.reverse();for(const e of o)t.setAttribute("listIndent",e.listIndent,e.element)}if(!i){let t=Number.POSITIVE_INFINITY;for(const e of n)e.is("listItem")&&e.getAttribute("listIndent")<t&&(t=e.getAttribute("listIndent"));zm(n,!0,t=0===t?1:t),zm(n,!1,t)}for(const e of n.reverse())i&&"listItem"==e.name?t.rename(e,"paragraph"):i||"listItem"==e.name?i||"listItem"!=e.name||e.getAttribute("listType")==this.type||t.setAttribute("listType",this.type,e):(t.setAttributes({listType:this.type,listIndent:0},e),t.rename(e,"listItem"))})}_getValue(){const t=pu(this.editor.model.document.selection.getSelectedBlocks());return!!t&&t.is("listItem")&&t.getAttribute("listType")==this.type}_checkEnabled(){if(this.value)return!0;const t=this.editor.model.document.selection,e=this.editor.model.schema,n=pu(t.getSelectedBlocks());return!!n&&Bm(n,e)}}function zm(t,e,n){const i=e?t[0]:t[t.length-1];if(i.is("listItem")){let o=i[e?"previousSibling":"nextSibling"],r=i.getAttribute("listIndent");for(;o&&o.is("listItem")&&o.getAttribute("listIndent")>=n;)r>o.getAttribute("listIndent")&&(r=o.getAttribute("listIndent")),o.getAttribute("listIndent")==r&&t[e?"unshift":"push"](o),o=o[e?"previousSibling":"nextSibling"]}}function Bm(t,e){return e.checkChild(t.parent,"listItem")&&!e.isObject(t)}class Fm extends ql{constructor(t,e){super(t),this._indentBy="forward"==e?1:-1}refresh(){this.isEnabled=this._checkEnabled()}execute(){const t=this.editor.model,e=t.document;let n=Array.from(e.selection.getSelectedBlocks());t.change(t=>{const e=n[n.length-1];let i=e.nextSibling;for(;i&&"listItem"==i.name&&i.getAttribute("listIndent")>e.getAttribute("listIndent");)n.push(i),i=i.nextSibling;this._indentBy<0&&(n=n.reverse());for(const e of n){const n=e.getAttribute("listIndent")+this._indentBy;n<0?t.rename(e,"paragraph"):t.setAttribute("listIndent",n,e)}})}_checkEnabled(){const t=pu(this.editor.model.document.selection.getSelectedBlocks());if(!t||!t.is("listItem"))return!1;if(this._indentBy>0){const e=t.getAttribute("listIndent"),n=t.getAttribute("listType");let i=t.previousSibling;for(;i&&i.is("listItem")&&i.getAttribute("listIndent")>=e;){if(i.getAttribute("listIndent")==e)return i.getAttribute("listType")==n;i=i.previousSibling}return!1}return!0}}function Um(){const t=!this.isEmpty&&("ul"==this.getChild(0).name||"ol"==this.getChild(0).name);return this.isEmpty||t?0:wi.call(this)}function Hm(t){return(e,n,i)=>{const o=i.consumable;if(!o.test(n.item,"insert")||!o.test(n.item,"attribute:listType")||!o.test(n.item,"attribute:listIndent"))return;o.consume(n.item,"insert"),o.consume(n.item,"attribute:listType"),o.consume(n.item,"attribute:listIndent");const r=n.item;np(r,function(t,e){const n=e.mapper,i=e.writer,o="numbered"==t.getAttribute("listType")?"ol":"ul",r=function(t){const e=t.createContainerElement("li");return e.getFillerOffset=Um,e}(i),s=i.createContainerElement(o,null);return i.insert(i.createPositionAt(s,0),r),n.bindElements(t,r),r}(r,i),i,t)}}function qm(t){return(e,n,i)=>{const o=i.mapper.toViewPosition(n.position).getLastMatchingPosition(t=>!t.item.is("li")).nodeAfter,r=i.writer;r.breakContainer(r.createPositionBefore(o)),r.breakContainer(r.createPositionAfter(o));const s=o.parent,a=s.previousSibling,c=r.createRangeOn(s),l=r.remove(c);a&&a.nextSibling&&ep(r,a,a.nextSibling),ip(i.mapper.toModelElement(o).getAttribute("listIndent")+1,n.position,c.start,o,i,t);for(const t of r.createRangeIn(l).getItems())i.mapper.unbindViewElement(t);e.stop()}}function Wm(t,e,n){if(!n.consumable.consume(e.item,"attribute:listType"))return;const i=n.mapper.toViewElement(e.item),o=n.writer;o.breakContainer(o.createPositionBefore(i)),o.breakContainer(o.createPositionAfter(i));let r=i.parent;const s="numbered"==e.attributeNewValue?"ol":"ul";ep(o,r=o.rename(s,r),r.nextSibling),ep(o,r.previousSibling,r);for(const t of e.item.getChildren())n.consumable.consume(t,"insert")}function Ym(t){return(e,n,i)=>{if(!i.consumable.consume(n.item,"attribute:listIndent"))return;const o=i.mapper.toViewElement(n.item),r=i.writer;r.breakContainer(r.createPositionBefore(o)),r.breakContainer(r.createPositionAfter(o));const s=o.parent,a=s.previousSibling,c=r.createRangeOn(s);r.remove(c),a&&a.nextSibling&&ep(r,a,a.nextSibling),ip(n.attributeOldValue+1,n.range.start,c.start,o,i,t),np(n.item,o,i,t);for(const t of n.item.getChildren())i.consumable.consume(t,"insert")}}function $m(t,e,n){if("listItem"!=e.item.name){let t=n.mapper.toViewPosition(e.range.start);const i=n.writer,o=[];for(;("ul"==t.parent.name||"ol"==t.parent.name)&&"li"==(t=i.breakContainer(t)).parent.name;){const e=t,n=i.createPositionAt(t.parent,"end");if(!e.isEqual(n)){const t=i.remove(i.createRange(e,n));o.push(t)}t=i.createPositionAfter(t.parent)}if(o.length>0){for(let e=0;e<o.length;e++){const n=t.nodeBefore;if(t=i.insert(t,o[e]).end,e>0){const e=ep(i,n,n.nextSibling);e&&e.parent==n&&t.offset--}}ep(i,t.nodeBefore,t.nodeAfter)}}}function Gm(t,e,n){const i=n.mapper.toViewPosition(e.position),o=i.nodeBefore,r=i.nodeAfter;ep(n.writer,o,r)}function Qm(t,e,n){if(n.consumable.consume(e.viewItem,{name:!0})){const t=n.writer,i=this.conversionApi.store,o=t.createElement("listItem");i.indent=i.indent||0,t.setAttribute("listIndent",i.indent,o);const r=e.viewItem.parent&&"ol"==e.viewItem.parent.name?"numbered":"bulleted";t.setAttribute("listType",r,o),i.indent++;const s=n.splitToAllowedParent(o,e.modelCursor);if(!s)return;t.insert(o,s.position);const a=function(t,e,n){const i=n.writer;let o=t,r=i.createPositionAfter(t);for(const t of e)if("ul"==t.name||"ol"==t.name)r=n.convertItem(t,r).modelCursor;else{const e=n.convertItem(t,i.createPositionAt(o,"end")),s=e.modelRange.start.nodeAfter;r=e.modelCursor,s&&s.is("element")&&!n.schema.checkChild(o,s.name)&&!(o=r.parent).is("listItem")&&o.nextSibling&&o.nextSibling.is("listItem")&&(o=o.nextSibling,r=i.createPositionAt(o,"end"))}return r}(o,e.viewItem.getChildren(),n);i.indent--,e.modelRange=t.createRange(e.modelCursor,a),s.cursorParent?e.modelCursor=t.createPositionAt(s.cursorParent,0):e.modelCursor=e.modelRange.end}}function Jm(t,e,n){if(n.consumable.test(e.viewItem,{name:!0})){const t=Array.from(e.viewItem.getChildren());for(const e of t)e.is("li")||e._remove()}}function Km(t,e,n){if(n.consumable.test(e.viewItem,{name:!0})){if(0===e.viewItem.childCount)return;const t=[...e.viewItem.getChildren()];let n=!1,i=!0;for(const e of t)!n||e.is("ul")||e.is("ol")||e._remove(),e.is("text")?(i&&(e._data=e.data.replace(/^\s+/,"")),(!e.nextSibling||e.nextSibling.is("ul")||e.nextSibling.is("ol"))&&(e._data=e.data.replace(/\s+$/,""))):(e.is("ul")||e.is("ol"))&&(n=!0),i=!1}}function Zm(t){return(e,n)=>{if(n.isPhantom)return;const i=n.modelPosition.nodeBefore;if(i&&i.is("listItem")){const e=n.mapper.toViewElement(i),o=e.getAncestors().find(t=>t.is("ul")||t.is("ol")),r=t.createPositionAt(e,0).getWalker();for(const t of r){if("elementStart"==t.type&&t.item.is("li")){n.viewPosition=t.previousPosition;break}if("elementEnd"==t.type&&t.item==o){n.viewPosition=t.nextPosition;break}}}}}function Xm(t,[e,n]){let i,o=e.is("documentFragment")?e.getChild(0):e;if(i=n?this.createSelection(n):this.document.selection,o&&o.is("listItem")){const t=i.getFirstPosition();let e=null;if(t.parent.is("listItem")?e=t.parent:t.nodeBefore&&t.nodeBefore.is("listItem")&&(e=t.nodeBefore),e){const t=e.getAttribute("listIndent");if(t>0)for(;o&&o.is("listItem");)o._setAttribute("listIndent",o.getAttribute("listIndent")+t),o=o.nextSibling}}}function tp(t,e){const n=!!e.sameIndent,i=!!e.smallerIndent,o=e.listIndent;let r=t;for(;r&&"listItem"==r.name;){const t=r.getAttribute("listIndent");if(n&&o==t||i&&o>t)return r;r=r.previousSibling}return null}function ep(t,e,n){return e&&n&&("ul"==e.name||"ol"==e.name)&&e.name==n.name?t.mergeContainers(t.createPositionAfter(e)):null}function np(t,e,n,i){const o=e.parent,r=n.mapper,s=n.writer;let a=r.toViewPosition(i.createPositionBefore(t));const c=tp(t.previousSibling,{sameIndent:!0,smallerIndent:!0,listIndent:t.getAttribute("listIndent")}),l=t.previousSibling;if(c&&c.getAttribute("listIndent")==t.getAttribute("listIndent")){const t=r.toViewElement(c);a=s.breakContainer(s.createPositionAfter(t))}else a=l&&"listItem"==l.name?r.toViewPosition(i.createPositionAt(l,"end")):r.toViewPosition(i.createPositionBefore(t));if(a=op(a),s.insert(a,o),l&&"listItem"==l.name){const t=r.toViewElement(l),n=s.createRange(s.createPositionAt(t,0),a).getWalker({ignoreElementEnd:!0});for(const t of n)if(t.item.is("li")){const i=s.breakContainer(s.createPositionBefore(t.item)),o=t.item.parent,r=s.createPositionAt(e,"end");ep(s,r.nodeBefore,r.nodeAfter),s.move(s.createRangeOn(o),r),n.position=i}}else{const n=o.nextSibling;if(n&&(n.is("ul")||n.is("ol"))){let i=null;for(const e of n.getChildren()){const n=r.toModelElement(e);if(!(n&&n.getAttribute("listIndent")>t.getAttribute("listIndent")))break;i=e}i&&(s.breakContainer(s.createPositionAfter(i)),s.move(s.createRangeOn(i.parent),s.createPositionAt(e,"end")))}}ep(s,o,o.nextSibling),ep(s,o.previousSibling,o)}function ip(t,e,n,i,o,r){const s=tp(e.nodeBefore,{sameIndent:!0,smallerIndent:!0,listIndent:t,foo:"b"}),a=o.mapper,c=o.writer,l=s?s.getAttribute("listIndent"):null;let d;if(s)if(l==t){const t=a.toViewElement(s).parent;d=c.createPositionAfter(t)}else{const t=r.createPositionAt(s,"end");d=a.toViewPosition(t)}else d=n;d=op(d);for(const t of[...i.getChildren()])(t.is("ul")||t.is("ol"))&&(d=c.move(c.createRangeOn(t),d).end,ep(c,t,t.nextSibling),ep(c,t.previousSibling,t))}function op(t){return t.getLastMatchingPosition(t=>t.item.is("uiElement"))}class rp extends zl{static get requires(){return[mf]}init(){const t=this.editor;t.model.schema.register("listItem",{inheritAllFrom:"$block",allowAttributes:["listType","listIndent"]});const e=t.data,n=t.editing;t.model.document.registerPostFixer(e=>(function(t,e){const n=t.document.differ.getChanges(),i=new Map;let o=!1;for(const t of n)if("insert"==t.type&&"listItem"==t.name)r(t.position);else if("insert"==t.type&&"listItem"!=t.name){if("$text"!=t.name){const n=t.position.nodeAfter;n.hasAttribute("listIndent")&&(e.removeAttribute("listIndent",n),o=!0),n.hasAttribute("listType")&&(e.removeAttribute("listType",n),o=!0)}r(t.position.getShiftedBy(t.length))}else"remove"==t.type&&"listItem"==t.name?r(t.position):"attribute"==t.type&&"listIndent"==t.attributeKey?r(t.range.start):"attribute"==t.type&&"listType"==t.attributeKey&&r(t.range.start);for(const t of i.values())s(t),a(t);return o;function r(t){const e=t.nodeBefore;if(e&&e.is("listItem")){let n=e;if(i.has(n))return;for(;n.previousSibling&&n.previousSibling.is("listItem");)if(n=n.previousSibling,i.has(n))return;i.set(t.nodeBefore,n)}else{const e=t.nodeAfter;e&&e.is("listItem")&&i.set(e,e)}}function s(t){let n=0,i=null;for(;t&&t.is("listItem");){const r=t.getAttribute("listIndent");if(r>n){let s;null===i?(i=r-n,s=n):(i>r&&(i=r),s=r-i),e.setAttribute("listIndent",s,t),o=!0}else i=null,n=t.getAttribute("listIndent")+1;t=t.nextSibling}}function a(t){let n=[],i=null;for(;t&&t.is("listItem");){const r=t.getAttribute("listIndent");if(i&&i.getAttribute("listIndent")>r&&(n=n.slice(0,r+1)),0!=r)if(n[r]){const i=n[r];t.getAttribute("listType")!=i&&(e.setAttribute("listType",i,t),o=!0)}else n[r]=t.getAttribute("listType");i=t,t=t.nextSibling}}})(t.model,e)),n.mapper.registerViewToModelLength("li",sp),e.mapper.registerViewToModelLength("li",sp),n.mapper.on("modelToViewPosition",Zm(n.view)),n.mapper.on("viewToModelPosition",function(t){return(e,n)=>{const i=n.viewPosition,o=i.parent,r=n.mapper;if("ul"==o.name||"ol"==o.name){if(i.isAtEnd){const e=r.toModelElement(i.nodeBefore),o=r.getModelLength(i.nodeBefore);n.modelPosition=t.createPositionBefore(e).getShiftedBy(o)}else{const e=r.toModelElement(i.nodeAfter);n.modelPosition=t.createPositionBefore(e)}e.stop()}else if("li"==o.name&&i.nodeBefore&&("ul"==i.nodeBefore.name||"ol"==i.nodeBefore.name)){const s=r.toModelElement(o);let a=1,c=i.nodeBefore;for(;c&&(c.is("ul")||c.is("ol"));)a+=r.getModelLength(c),c=c.previousSibling;n.modelPosition=t.createPositionBefore(s).getShiftedBy(a),e.stop()}}}(t.model)),e.mapper.on("modelToViewPosition",Zm(n.view)),n.downcastDispatcher.on("insert",$m,{priority:"high"}),n.downcastDispatcher.on("insert:listItem",Hm(t.model)),e.downcastDispatcher.on("insert",$m,{priority:"high"}),e.downcastDispatcher.on("insert:listItem",Hm(t.model)),n.downcastDispatcher.on("attribute:listType:listItem",Wm),e.downcastDispatcher.on("attribute:listType:listItem",Wm),n.downcastDispatcher.on("attribute:listIndent:listItem",Ym(t.model)),e.downcastDispatcher.on("attribute:listIndent:listItem",Ym(t.model)),n.downcastDispatcher.on("remove:listItem",qm(t.model)),n.downcastDispatcher.on("remove",Gm,{priority:"low"}),e.downcastDispatcher.on("remove:listItem",qm(t.model)),e.downcastDispatcher.on("remove",Gm,{priority:"low"}),e.upcastDispatcher.on("element:ul",Jm,{priority:"high"}),e.upcastDispatcher.on("element:ol",Jm,{priority:"high"}),e.upcastDispatcher.on("element:li",Km,{priority:"high"}),e.upcastDispatcher.on("element:li",Qm),t.model.on("insertContent",Xm,{priority:"high"}),t.commands.add("numberedList",new Vm(t,"numbered")),t.commands.add("bulletedList",new Vm(t,"bulleted")),t.commands.add("indentList",new Fm(t,"forward")),t.commands.add("outdentList",new Fm(t,"backward"));const i=this.editor.editing.view.document;this.listenTo(i,"enter",(t,e)=>{const n=this.editor.model.document,i=n.selection.getLastPosition().parent;n.selection.isCollapsed&&"listItem"==i.name&&i.isEmpty&&(this.editor.execute("outdentList"),e.preventDefault(),t.stop())}),this.listenTo(i,"delete",(t,e)=>{if("backward"!==e.direction)return;const n=this.editor.model.document.selection;if(!n.isCollapsed)return;const i=n.getFirstPosition();if(!i.isAtStart)return;const o=i.parent;"listItem"===o.name&&(o.previousSibling&&"listItem"===o.previousSibling.name||(this.editor.execute("outdentList"),e.preventDefault(),t.stop()))},{priority:"high"});const o=t=>(e,n)=>{this.editor.commands.get(t).isEnabled&&(this.editor.execute(t),n())};this.editor.keystrokes.set("Tab",o("indentList")),this.editor.keystrokes.set("Shift+Tab",o("outdentList"))}}function sp(t){let e=1;for(const n of t.getChildren())if("ul"==n.name||"ol"==n.name)for(const t of n.getChildren())e+=sp(t);return e}var ap=n(34),cp=n.n(ap),lp=n(35),dp=n.n(lp);class up extends zl{init(){const t=this.editor.t;this._addButton("numberedList",t("o"),cp.a),this._addButton("bulletedList",t("p"),dp.a)}_addButton(t,e,n){const i=this.editor;i.ui.componentFactory.add(t,o=>{const r=i.commands.get(t),s=new Ld(o);return s.set({label:e,icon:n,tooltip:!0}),s.bind("isOn","isEnabled").to(r,"value","isEnabled"),this.listenTo(s,"execute",()=>i.execute(t)),s})}}function hp(t,e){return t=>{t.on("attribute:url:media",n)};function n(n,i,o){if(!o.consumable.consume(i.item,n.name))return;const r=i.attributeNewValue,s=o.writer,a=o.mapper.toViewElement(i.item);s.remove(s.createRangeIn(a));const c=t.getMediaViewElement(s,r,e);s.insert(s.createPositionAt(a,0),c)}}const fp=Symbol("isMedia");function mp(t,e,n,i){const o=t.createContainerElement("figure",{class:"media"});return o.getFillerOffset=gp,t.insert(t.createPositionAt(o,0),e.getMediaViewElement(t,n,i)),o}function pp(t){const e=t.getSelectedElement();return e&&e.is("media")?e:null}function gp(){return null}class bp extends ql{refresh(){const t=this.editor.model,e=t.document.selection,n=t.schema,i=e.getFirstPosition(),o=pp(e);let r=i.parent;r!=r.root&&(r=r.parent),this.value=o?o.getAttribute("url"):null,this.isEnabled=n.checkChild(r,"media")}execute(t){const e=this.editor.model,n=e.document.selection,i=pp(n);if(i)e.change(e=>{e.setAttribute("url",t,i)});else{const i=nh(n,e);e.change(n=>{const o=n.createElement("media",{url:t});e.insertContent(o,i),n.setSelection(o,"on")})}}}var wp=n(36),_p=n.n(wp);const kp="0 0 64 42";class vp{constructor(t,e){const n=e.providers,i=e.extraProviders||[],o=new Set(e.removeProviders),r=n.concat(i).filter(t=>{const e=t.name;return e?!o.has(e):(fs.a.warn("media-embed-no-provider-name: The configured media provider has no name and cannot be used.",{provider:t}),!1)});this.locale=t,this.providerDefinitions=r}hasMedia(t){return!!this._getMedia(t)}getMediaViewElement(t,e,n){return this._getMedia(e).getViewElement(t,n)}_getMedia(t){if(!t)return new yp(this.locale);t=t.trim();for(const e of this.providerDefinitions){const n=e.html;let i=e.url;Array.isArray(i)||(i=[i]);for(const e of i){const i=this._getUrlMatches(t,e);if(i)return new yp(this.locale,t,i,n)}}return null}_getUrlMatches(t,e){let n=t.match(e);if(n)return n;let i=t.replace(/^https?:\/\//,"");return(n=i.match(e))?n:(n=(i=i.replace(/^www\./,"")).match(e))||null}}class yp{constructor(t,e,n,i){this.url=this._getValidUrl(e),this._t=t.t,this._match=n,this._previewRenderer=i}getViewElement(t,e){const n={};if(e.renderForEditingView||e.renderMediaPreview&&this.url&&this._previewRenderer){this.url&&(n["data-oembed-url"]=this.url),e.renderForEditingView&&(n.class="ck-media__wrapper");const i=this._getPreviewHtml(e);return t.createUIElement("div",n,function(t){const e=this.toDomElement(t);return e.innerHTML=i,e})}return this.url&&(n.url=this.url),t.createEmptyElement("oembed",n)}_getPreviewHtml(t){return this._previewRenderer?this._previewRenderer(this._match):this.url&&t.renderForEditingView?this._getPlaceholderHtml():""}_getPlaceholderHtml(){const t=new Dd,e=new Rd;return t.text=this._t("Open media in new tab"),e.content=_p.a,e.viewBox=kp,new rl({tag:"div",attributes:{class:"ck ck-reset_all ck-media__placeholder"},children:[{tag:"div",attributes:{class:"ck-media__placeholder__icon"},children:[e]},{tag:"a",attributes:{class:"ck-media__placeholder__url",target:"new",href:this.url},children:[{tag:"span",attributes:{class:"ck-media__placeholder__url__text"},children:[this.url]},t]}]}).render().outerHTML}_getValidUrl(t){return t?t.match(/^https?/)?t:"https://"+t:null}}n(105);class xp extends zl{constructor(t){super(t),t.config.define("mediaEmbed",{providers:[{name:"dailymotion",url:/^dailymotion\.com\/video\/(\w+)/,html:t=>{return'<div style="position: relative; padding-bottom: 100%; height: 0; ">'+`<iframe src="https://www.dailymotion.com/embed/video/${t[1]}" `+'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" frameborder="0" width="480" height="270" allowfullscreen allow="autoplay"></iframe></div>'}},{name:"spotify",url:[/^open\.spotify\.com\/(artist\/\w+)/,/^open\.spotify\.com\/(album\/\w+)/,/^open\.spotify\.com\/(track\/\w+)/],html:t=>{return'<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 126%;">'+`<iframe src="https://open.spotify.com/embed/${t[1]}" `+'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></div>'}},{name:"youtube",url:[/^youtube\.com\/watch\?v=([\w-]+)/,/^youtube\.com\/v\/([\w-]+)/,/^youtube\.com\/embed\/([\w-]+)/,/^youtu\.be\/([\w-]+)/],html:t=>{return'<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">'+`<iframe src="https://www.youtube.com/embed/${t[1]}" `+'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>'}},{name:"vimeo",url:[/^vimeo\.com\/(\d+)/,/^vimeo\.com\/[^/]+\/[^/]+\/video\/(\d+)/,/^vimeo\.com\/album\/[^/]+\/video\/(\d+)/,/^vimeo\.com\/channels\/[^/]+\/(\d+)/,/^vimeo\.com\/groups\/[^/]+\/videos\/(\d+)/,/^vimeo\.com\/ondemand\/[^/]+\/(\d+)/,/^player\.vimeo\.com\/video\/(\d+)/],html:t=>{return'<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">'+`<iframe src="https://player.vimeo.com/video/${t[1]}" `+'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>'}},{name:"instagram",url:/^instagram\.com\/p\/(\w+)/},{name:"twitter",url:/^twitter\.com/},{name:"googleMaps",url:/^google\.com\/maps/},{name:"flickr",url:/^flickr\.com/},{name:"facebook",url:/^facebook\.com/}]}),this.registry=new vp(t.locale,t.config.get("mediaEmbed"))}init(){const t=this.editor,e=t.model.schema,n=t.t,i=t.conversion,o=t.config.get("mediaEmbed.previewsInData"),r=this.registry;t.commands.add("mediaEmbed",new bp(t)),e.register("media",{isObject:!0,isBlock:!0,allowWhere:"$block",allowAttributes:["url"]}),i.for("dataDowncast").add(aa({model:"media",view:(t,e)=>{const n=t.getAttribute("url");return mp(e,r,n,{renderMediaPreview:n&&o})}})),i.for("dataDowncast").add(hp(r,{renderMediaPreview:o})),i.for("editingDowncast").add(aa({model:"media",view:(t,e)=>{const i=t.getAttribute("url");return function(t,e,n){return e.setCustomProperty(fp,!0,t),Xu(t,e,{label:n})}(mp(e,r,i,{renderForEditingView:!0}),e,n("al"))}})),i.for("editingDowncast").add(hp(r,{renderForEditingView:!0})),i.for("upcast").add(Oa({view:{name:"oembed",attributes:{url:!0}},model:(t,e)=>{const n=t.getAttribute("url");if(r.hasMedia(n))return e.createElement("media",{url:n})}})).add(Oa({view:{name:"div",attributes:{"data-oembed-url":!0}},model:(t,e)=>{const n=t.getAttribute("data-oembed-url");if(r.hasMedia(n))return e.createElement("media",{url:n})}}))}}const Ap=/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=]+$/;class Cp extends zl{static get requires(){return[Hl,Ud]}static get pluginName(){return"AutoMediaEmbed"}constructor(t){super(t),this._timeoutId=null,this._positionToInsert=null}init(){const t=this.editor,e=t.model.document;this.listenTo(t.plugins.get(Hl),"inputTransformation",()=>{const t=e.selection.getFirstRange(),n=Mc.fromPosition(t.start);n.stickiness="toPrevious";const i=Mc.fromPosition(t.end);i.stickiness="toNext",e.once("change:data",()=>{this._embedMediaBetweenPositions(n,i),n.detach(),i.detach()},{priority:"high"})}),t.commands.get("undo").on("execute",()=>{this._timeoutId&&(Ko.window.clearTimeout(this._timeoutId),this._positionToInsert.detach(),this._timeoutId=null,this._positionToInsert=null)},{priority:"high"})}_embedMediaBetweenPositions(t,e){const n=this.editor,i=n.plugins.get(xp).registry,o=new Xs(t,e),r=o.getWalker({ignoreElementEnd:!0});let s="";for(const t of r)t.item.is("textProxy")&&(s+=t.item.data);if(!(s=s.trim()).match(Ap))return;if(!i.hasMedia(s))return;const a=n.commands.get("mediaEmbed");a.isEnabled&&(this._positionToInsert=Mc.fromPosition(t),this._timeoutId=Ko.window.setTimeout(()=>{n.model.change(t=>{this._timeoutId=null,t.remove(o),"$graveyard"!==this._positionToInsert.root.rootName&&t.setSelection(this._positionToInsert),a.execute(s),this._positionToInsert.detach(),this._positionToInsert=null})},100))}}n(107);class Tp extends xl{constructor(t,e){super(e);const n=e.t;this.focusTracker=new Kc,this.keystrokes=new Uc,this.urlInputView=this._createUrlInput(),this.saveButtonView=this._createButton(n("ba"),xh.a,"ck-button-save"),this.saveButtonView.type="submit",this.cancelButtonView=this._createButton(n("bb"),Ch.a,"ck-button-cancel","cancel"),this._focusables=new tl,this._focusCycler=new Nl({focusables:this._focusables,focusTracker:this.focusTracker,keystrokeHandler:this.keystrokes,actions:{focusPrevious:"shift + tab",focusNext:"tab"}}),this._validators=t,this.setTemplate({tag:"form",attributes:{class:["ck","ck-media-form"],tabindex:"-1"},children:[this.urlInputView,this.saveButtonView,this.cancelButtonView]})}render(){super.render(),vh({view:this}),[this.urlInputView,this.saveButtonView,this.cancelButtonView].forEach(t=>{this._focusables.add(t),this.focusTracker.add(t.element)}),this.keystrokes.listenTo(this.element);const t=t=>t.stopPropagation();this.keystrokes.set("arrowright",t),this.keystrokes.set("arrowleft",t),this.keystrokes.set("arrowup",t),this.keystrokes.set("arrowdown",t),this.listenTo(this.urlInputView.element,"selectstart",(t,e)=>{e.stopPropagation()},{priority:"high"})}focus(){this._focusCycler.focusFirst()}get url(){return this.urlInputView.inputView.element.value.trim()}set url(t){this.urlInputView.inputView.element.value=t.trim()}isValid(){this.resetFormStatus();for(const t of this._validators){const e=t(this);if(e)return this.urlInputView.errorText=e,!1}return!0}resetFormStatus(){this.urlInputView.errorText=null,this.urlInputView.infoText=null}_createUrlInput(){const t=this.locale.t,e=new _h(this.locale,kh),n=e.inputView;return e.label=t("bf"),n.placeholder="https://example.com",n.on("input",()=>{e.infoText=n.element.value?t("bg"):null}),e}_createButton(t,e,n,i){const o=new Ld(this.locale);return o.set({label:t,icon:e,tooltip:!0}),o.extendTemplate({attributes:{class:n}}),i&&o.delegate("execute").to(this,i),o}}var Pp=n(37),Mp=n.n(Pp);class Sp extends zl{static get requires(){return[xp]}init(){const t=this.editor,e=t.commands.get("mediaEmbed"),n=t.plugins.get(xp).registry;t.ui.componentFactory.add("mediaEmbed",i=>{const o=new Tp(function(t,e){return[e=>{if(!e.url.length)return t("an")},n=>{if(!e.hasMedia(n.url))return t("ao")}]}(t.t,n),i),r=Ef(i);return this._setUpDropdown(r,o,e,t),this._setUpForm(o,r,e),r})}_setUpDropdown(t,e,n){const i=this.editor,o=i.t,r=t.buttonView;function s(){i.editing.view.focus(),t.isOpen=!1}t.bind("isEnabled").to(n),t.panelView.children.add(e),r.set({label:o("am"),icon:Mp.a,tooltip:!0}),r.on("open",()=>{e.url=n.value||"",e.urlInputView.select(),e.focus()},{priority:"low"}),t.on("submit",()=>{e.isValid()&&(i.execute("mediaEmbed",e.url),s())}),t.on("change:isOpen",()=>e.resetFormStatus()),t.on("cancel",()=>s())}_setUpForm(t,e,n){t.delegate("submit","cancel").to(e),t.urlInputView.bind("value").to(n,"value"),t.urlInputView.bind("isReadOnly").to(n,"isEnabled",t=>!t),t.saveButtonView.bind("isEnabled").to(n)}}n(109);function Ip(t){return t.replace(/<span(?: class="Apple-converted-space"|)>(\s+)<\/span>/g,(t,e)=>1===e.length?" ":Array(e.length+1).join("  ").substr(0,e.length))}function Ep(t){const e=new DOMParser,n=function(t){return Ip(Ip(t)).replace(/ <\//g," </").replace(/ <o:p><\/o:p>/g," <o:p></o:p>").replace(/>(\s*(\r\n?|\n)\s*)+</g,"><")}(function(t){const e=t.match(/<\/body>(.*?)(<\/html>|$)/);e&&e[1]&&(t=t.slice(0,e.index)+t.slice(e.index).replace(e[1],""));return t}(t=t.replace(/<!--\[if gte vml 1]>/g,""))),i=e.parseFromString(n,"text/html");!function(t){t.querySelectorAll("span[style*=spacerun]").forEach(t=>{const e=t.childNodes[0].data.length;t.innerHTML=Array(e+1).join("  ").substr(0,e)})}(i);const o=i.body.innerHTML,r=function(t){const e=new er({blockFiller:No}),n=t.createDocumentFragment(),i=t.body.childNodes;for(;i.length>0;)n.appendChild(i[0]);return e.domToView(n)}(i),s=function(t){const e=[],n=[],i=Array.from(t.getElementsByTagName("style"));for(const t of i)t.sheet&&t.sheet.cssRules&&t.sheet.cssRules.length&&(e.push(t.sheet),n.push(t.innerHTML));return{styles:e,stylesString:n.join(" ")}}(i);return{body:r,bodyString:o,styles:s.styles,stylesString:s.stylesString}}function Np(t,e){if(!t.childCount)return;const n=new af,i=function(t,e){const n=e.createRangeIn(t),i=new hi({name:/^p|h\d+$/,styles:{"mso-list":/.*/}}),o=[];for(const t of n)if("elementStart"===t.type&&i.match(t.item)){const e=Op(t.item);o.push({element:t.item,id:e.id,order:e.order,indent:e.indent})}return o}(t,n);if(!i.length)return;let o=null;i.forEach((t,r)=>{if(!o||function(t,e){return t.id!==e.id}(i[r-1],t)){const i=function(t,e){const n=/mso-level-number-format:([^;]*);/gi,i=new RegExp(`@list l${t.id}:level${t.indent}\\s*({[^}]*)`,"gi").exec(e);let o="decimal";if(i&&i[1]){const t=n.exec(i[1]);t&&t[1]&&(o=t[1].trim())}return{type:"bullet"!==o&&"image"!==o?"ol":"ul",style:o}}(t,e);o=function(t,e,n){const i=new mi(t.type),o=e.parent.getChildIndex(e);return n.insertChild(o,i,e.parent),i}(i,t.element,n)}const s=function(t,e){return function(t,e){const n=new hi({name:"span",styles:{"mso-list":"Ignore"}}),i=e.createRangeIn(t);for(const t of i)"elementStart"===t.type&&n.match(t.item)&&e.remove(t.item)}(t,e),e.rename("li",t)}(t.element,n);n.appendChild(s,o)})}function Op(t){const e={},n=t.getStyle("mso-list");return n&&(e.id=parseInt(n.match(/(^|\s+)l(\d+)/i)[2]),e.order=parseInt(n.match(/\s*lfo(\d+)/i)[1]),e.indent=parseInt(n.match(/\s*level(\d+)/i)[1])),e}function Rp(t,e){if(!t.childCount)return;const n=new af;!function(t,e,n){const i=n.createRangeIn(e),o=new hi({name:"img"}),r=[];for(const e of i)if(o.match(e.item)){const n=e.item,i=n.getAttribute("v:shapes")?n.getAttribute("v:shapes").split(" "):[];i.length&&i.every(e=>t.indexOf(e)>-1)?r.push(n):n.getAttribute("src")||r.push(n)}for(const t of r)n.remove(t)}(function(t,e){const n=e.createRangeIn(t),i=new hi({name:/v:(.+)/}),o=[];for(const t of n){const e=t.item,n=e.previousSibling&&e.previousSibling.name||null;i.match(e)&&e.getAttribute("o:gfxdata")&&"v:shapetype"!==n&&o.push(t.item.getAttribute("id"))}return o}(t,n),t,n),function(t,e){const n=e.createRangeIn(t),i=new hi({name:/v:(.+)/}),o=[];for(const t of n)i.match(t.item)&&o.push(t.item);for(const t of o)e.remove(t)}(t,n);const i=function(t,e){const n=e.createRangeIn(t),i=new hi({name:"img"}),o=[];for(const t of n)i.match(t.item)&&t.item.getAttribute("src").startsWith("file://")&&o.push(t.item);return o}(t,n);i.length&&function(t,e,n){if(t.length===e.length)for(let i=0;i<t.length;i++){const o=`data:${e[i].type};base64,${Dp(e[i].hex)}`;n.setAttribute("src",o,t[i])}}(i,function(t){if(!t)return[];const e=/{\\pict[\s\S]+?\\bliptag-?\d+(\\blipupi-?\d+)?({\\\*\\blipuid\s?[\da-fA-F]+)?[\s}]*?/,n=new RegExp("(?:("+e.source+"))([\\da-fA-F\\s]+)\\}","g"),i=t.match(n),o=[];if(i)for(const t of i){let n=!1;t.includes("\\pngblip")?n="image/png":t.includes("\\jpegblip")&&(n="image/jpeg"),n&&o.push({hex:t.replace(e,"").replace(/[^\da-fA-F]/g,""),type:n})}return o}(e),n)}function Dp(t){return btoa(t.match(/\w{2}/g).map(t=>String.fromCharCode(parseInt(t,16))).join(""))}function Lp(t,e){let n=e.parent;for(;n;){if(n.name===t)return n;n=n.parent}}function jp(t,e,n,i,o=1){e>o?i.setAttribute(t,e,n):i.removeAttribute(t,n)}function Vp(t,e,n={}){const i=t.createElement("tableCell",n);t.insertElement("paragraph",i),t.insert(i,e)}function zp(){return t=>{t.on("element:table",(t,e,n)=>{const i=e.viewItem;if(!n.consumable.test(i,{name:!0}))return;const{rows:o,headingRows:r,headingColumns:s}=function(t){const e={headingRows:0,headingColumns:0},n=[],i=[];let o;for(const r of Array.from(t.getChildren()))if("tbody"===r.name||"thead"===r.name||"tfoot"===r.name){"thead"!==r.name||o||(o=r);const t=Array.from(r.getChildren()).filter(t=>t.is("element","tr"));for(const r of t)if("thead"===r.parent.name&&r.parent===o)e.headingRows++,n.push(r);else{i.push(r);const t=Fp(r);t>e.headingColumns&&(e.headingColumns=t)}}return e.rows=[...n,...i],e}(i),a={};s&&(a.headingColumns=s),r&&(a.headingRows=r);const c=n.writer.createElement("table",a),l=n.splitToAllowedParent(c,e.modelCursor);if(l){if(n.writer.insert(c,l.position),n.consumable.consume(i,{name:!0}),o.length)o.forEach(t=>n.convertItem(t,n.writer.createPositionAt(c,"end")));else{const t=n.writer.createElement("tableRow");n.writer.insert(t,n.writer.createPositionAt(c,"end")),Vp(n.writer,n.writer.createPositionAt(t,"end"))}e.modelRange=n.writer.createRange(n.writer.createPositionBefore(c),n.writer.createPositionAfter(c)),l.cursorParent?e.modelCursor=n.writer.createPositionAt(l.cursorParent,0):e.modelCursor=e.modelRange.end}})}}function Bp(t){return e=>{e.on(`element:${t}`,(t,e,n)=>{const i=e.viewItem;if(!n.consumable.test(i,{name:!0}))return;const o=n.writer.createElement("tableCell"),r=n.splitToAllowedParent(o,e.modelCursor);if(!r)return;n.writer.insert(o,r.position),n.consumable.consume(i,{name:!0});const s=n.writer.createPositionAt(o,0);n.convertChildren(i,s),o.childCount||n.writer.insertElement("paragraph",s),e.modelRange=n.writer.createRange(n.writer.createPositionBefore(o),n.writer.createPositionAfter(o)),e.modelCursor=e.modelRange.end})}}function Fp(t){let e=0,n=0;const i=Array.from(t.getChildren()).filter(t=>"th"===t.name||"td"===t.name);for(;n<i.length&&"th"===i[n].name;){const t=i[n];e+=parseInt(t.getAttribute("colspan")||1),n++}return e}class Up{constructor(t,e={}){this.table=t,this.startRow=e.startRow||0,this.endRow="number"==typeof e.endRow?e.endRow:void 0,this.includeSpanned=!!e.includeSpanned,this.column="number"==typeof e.column?e.column:void 0,this._skipRows=new Set,this._row=0,this._column=0,this._cell=0,this._spannedCells=new Map}[Symbol.iterator](){return this}next(){const t=this.table.getChild(this._row);if(!t||this._isOverEndRow())return{done:!0};if(this._isSpanned(this._row,this._column)){const t=this._column,e=this._formatOutValue(void 0,t);return this._column++,!this.includeSpanned||this._shouldSkipRow()||this._shouldSkipColumn(t,1)?this.next():e}const e=t.getChild(this._cell);if(!e)return this._row++,this._column=0,this._cell=0,this.next();const n=parseInt(e.getAttribute("colspan")||1),i=parseInt(e.getAttribute("rowspan")||1);(n>1||i>1)&&this._recordSpans(this._row,this._column,i,n);const o=this._column,r=this._formatOutValue(e,o,i,n);return this._column++,this._cell++,this._shouldSkipRow()||this._shouldSkipColumn(o,n)?this.next():r}skipRow(t){this._skipRows.add(t)}_isOverEndRow(){return void 0!==this.endRow&&this._row>this.endRow}_formatOutValue(t,e,n=1,i=1){return{done:!1,value:{cell:t,row:this._row,column:e,rowspan:n,colspan:i,cellIndex:this._cell}}}_shouldSkipRow(){const t=this._row<this.startRow,e=this._skipRows.has(this._row);return t||e}_shouldSkipColumn(t,e){if(void 0===this.column)return!1;const n=t===this.column,i=t<this.column&&t+e>this.column;return!n&&!i}_isSpanned(t,e){if(!this._spannedCells.has(t))return!1;return this._spannedCells.get(t).has(e)}_recordSpans(t,e,n,i){for(let n=e+1;n<=e+i-1;n++)this._markSpannedCell(t,n);for(let o=t+1;o<t+n;o++)for(let t=e;t<=e+i-1;t++)this._markSpannedCell(o,t)}_markSpannedCell(t,e){this._spannedCells.has(t)||this._spannedCells.set(t,new Map),this._spannedCells.get(t).set(e,!0)}}const Hp=Symbol("isTable");function qp(t){return!!t.getCustomProperty(Hp)&&Zu(t)}function Wp(t){const e=t.getSelectedElement();return!(!e||!qp(e))}function Yp(t){const e=Lp("table",t.getFirstPosition());return!(!e||!qp(e.parent))}function $p(t={}){return e=>e.on("insert:table",(e,n,i)=>{const o=n.item;if(!i.consumable.consume(o,"insert"))return;i.consumable.consume(o,"attribute:headingRows:table"),i.consumable.consume(o,"attribute:headingColumns:table");const r=t&&t.asWidget,s=i.writer.createContainerElement("figure",{class:"table"}),a=i.writer.createContainerElement("table");let c;i.writer.insert(i.writer.createPositionAt(s,0),a),r&&(c=function(t,e){return e.setCustomProperty(Hp,!0,t),Xu(t,e,{hasSelectionHandler:!0})}(s,i.writer));const l=new Up(o),d={headingRows:o.getAttribute("headingRows")||0,headingColumns:o.getAttribute("headingColumns")||0};for(const e of l){const{row:n,cell:r}=e,s=og(ig(n,d),a,i),c=eg(o.getChild(n),n,s,i);i.consumable.consume(r,"insert"),tg(e,d,i.writer.createPositionAt(c,"end"),i,t)}const u=i.mapper.toViewPosition(n.range.start);i.mapper.bindElements(o,r?c:s),i.writer.insert(u,r?c:s)})}function Gp(t={}){return e=>e.on("insert:tableRow",(e,n,i)=>{const o=n.item;if(!i.consumable.consume(o,"insert"))return;const r=o.parent,s=cg(i.mapper.toViewElement(r)),a=r.getChildIndex(o),c=new Up(r,{startRow:a,endRow:a}),l={headingRows:r.getAttribute("headingRows")||0,headingColumns:r.getAttribute("headingColumns")||0};for(const e of c){const n=eg(o,a,og(ig(a,l),s,i),i);i.consumable.consume(e.cell,"insert"),tg(e,l,i.writer.createPositionAt(n,"end"),i,t)}})}function Qp(t={}){return e=>e.on("insert:tableCell",(e,n,i)=>{const o=n.item;if(!i.consumable.consume(o,"insert"))return;const r=o.parent,s=r.parent,a=s.getChildIndex(r),c=new Up(s,{startRow:a,endRow:a}),l={headingRows:s.getAttribute("headingRows")||0,headingColumns:s.getAttribute("headingColumns")||0};for(const e of c)if(e.cell===o){const n=i.mapper.toViewElement(r);return void tg(e,l,i.writer.createPositionAt(n,r.getChildIndex(o)),i,t)}})}function Jp(t={}){const e=!!t.asWidget;return t=>t.on("attribute:headingRows:table",(t,n,i)=>{const o=n.item;if(!i.consumable.consume(n.item,t.name))return;const r=cg(i.mapper.toViewElement(o)),s=n.attributeOldValue,a=n.attributeNewValue;if(a>s){const t=Array.from(o.getChildren()).filter(({index:t})=>c(t,s-1,a));ag(t,og("thead",r,i),i,"end");for(const n of t)for(const t of n.getChildren())Zp(t,"th",i,e);sg("tbody",r,i)}else{ag(Array.from(o.getChildren()).filter(({index:t})=>c(t,a-1,s)).reverse(),og("tbody",r,i),i,0);const t=new Up(o,{startRow:a?a-1:a,endRow:s-1}),n={headingRows:o.getAttribute("headingRows")||0,headingColumns:o.getAttribute("headingColumns")||0};for(const o of t)Xp(o,n,i,e);sg("thead",r,i)}function c(t,e,n){return t>e&&t<n}})}function Kp(t={}){const e=!!t.asWidget;return t=>t.on("attribute:headingColumns:table",(t,n,i)=>{const o=n.item;if(!i.consumable.consume(n.item,t.name))return;const r={headingRows:o.getAttribute("headingRows")||0,headingColumns:o.getAttribute("headingColumns")||0},s=n.attributeOldValue,a=n.attributeNewValue,c=(s>a?s:a)-1;for(const t of new Up(o))t.column>c||Xp(t,r,i,e)})}function Zp(t,e,n,i){const o=n.writer,r=n.mapper.toViewElement(t);if(!r)return;let s;if(i){s=eh(o.createEditableElement(e,r.getAttributes()),o),o.insert(o.createPositionAfter(r),s),o.move(o.createRangeIn(r),o.createPositionAt(s,0)),o.remove(o.createRangeOn(r))}else s=o.rename(e,r);n.mapper.bindElements(t,s)}function Xp(t,e,n,i){const{cell:o}=t,r=ng(t,e),s=n.mapper.toViewElement(o);s&&s.name!==r&&Zp(o,r,n,i)}function tg(t,e,n,i,o){const r=o&&o.asWidget,s=ng(t,e),a=r?eh(i.writer.createEditableElement(s),i.writer):i.writer.createContainerElement(s),c=t.cell,l=1===c.childCount&&"paragraph"===c.getChild(0).name;if(i.writer.insert(n,a),l){const t=c.getChild(0),e=i.writer.createPositionAt(a,"end");if(i.consumable.consume(t,"insert"),o.asWidget){const n=[...t.getAttributeKeys()].length?"p":"span",o=i.writer.createContainerElement(n);i.mapper.bindElements(t,o),i.writer.insert(e,o),i.mapper.bindElements(c,a)}else i.mapper.bindElements(c,a),i.mapper.bindElements(t,a)}else i.mapper.bindElements(c,a)}function eg(t,e,n,i){let o=i.mapper.toViewElement(t);if(!o){i.consumable.consume(t,"insert"),o=i.writer.createContainerElement("tr"),i.mapper.bindElements(t,o);const r=t.parent.getAttribute("headingRows")||0,s=r>0&&e>=r?e-r:e,a=i.writer.createPositionAt(n,s);i.writer.insert(a,o)}return o}function ng(t,e){const{row:n,column:i}=t,{headingColumns:o,headingRows:r}=e;return r&&r>n?"th":o&&o>i?"th":"td"}function ig(t,e){return t<e.headingRows?"thead":"tbody"}function og(t,e,n){const i=rg(t,e);return i||function(t,e,n){const i=n.writer.createContainerElement(t),o=n.writer.createPositionAt(e,"tbody"==t?"end":0);return n.writer.insert(o,i),i}(t,e,n)}function rg(t,e){for(const n of e.getChildren())if(n.name==t)return n}function sg(t,e,n){const i=rg(t,e);i&&0===i.childCount&&n.writer.remove(n.writer.createRangeOn(i))}function ag(t,e,n,i){for(const o of t){const t=n.mapper.toViewElement(o);t&&n.writer.move(n.writer.createRangeOn(t),n.writer.createPositionAt(e,i))}}function cg(t){for(const e of t.getChildren())if("table"===e.name)return e}class lg extends zl{static get pluginName(){return"TableUtils"}getCellLocation(t){const e=t.parent,n=e.parent,i=n.getChildIndex(e),o=new Up(n,{startRow:i,endRow:i});for(const{cell:e,row:n,column:i}of o)if(e===t)return{row:n,column:i}}createTable(t,e,n){const i=t.createElement("table");return dg(t,i,0,e,n),i}insertRows(t,e={}){const n=this.editor.model,i=e.at||0,o=e.rows||1;n.change(e=>{const n=t.getAttribute("headingRows")||0;if(n>i&&e.setAttribute("headingRows",n+o,t),0===i||i===t.childCount)return void dg(e,t,i,o,this.getColumns(t));const r=new Up(t,{endRow:i});let s=0;for(const{row:t,rowspan:n,colspan:a,cell:c}of r){t<i&&t+n>i&&e.setAttribute("rowspan",n+o,c),t===i&&(s+=a)}dg(e,t,i,o,s)})}insertColumns(t,e={}){const n=this.editor.model,i=e.at||0,o=e.columns||1;n.change(e=>{const n=t.getAttribute("headingColumns");i<n&&e.setAttribute("headingColumns",n+o,t);const r=this.getColumns(t);if(0===i||r===i){for(const n of t.getChildren())ug(o,e,e.createPositionAt(n,i?"end":0));return}const s=new Up(t,{column:i,includeSpanned:!0});for(const{row:n,column:r,cell:a,colspan:c,rowspan:l,cellIndex:d}of s)if(r!==i){if(e.setAttribute("colspan",c+o,a),s.skipRow(n),l>1)for(let t=n+1;t<n+l;t++)s.skipRow(t)}else{const i=e.createPositionAt(t.getChild(n),d);ug(o,e,i)}})}splitCellVertically(t,e=2){const n=this.editor.model,i=t.parent.parent,o=parseInt(t.getAttribute("rowspan")||1),r=parseInt(t.getAttribute("colspan")||1);n.change(n=>{if(r>1){const{newCellsSpan:i,updatedSpan:s}=hg(r,e);jp("colspan",s,t,n);const a={};i>1&&(a.colspan=i),o>1&&(a.rowspan=o),ug(r>e?e-1:r-1,n,n.createPositionAfter(t),a)}if(r<e){const s=e-r,a=[...new Up(i)],{column:c}=a.find(({cell:e})=>e===t),l=a.filter(({cell:e,colspan:n,column:i})=>{return e!==t&&i===c||i<c&&i+n>c});for(const{cell:t,colspan:e}of l)n.setAttribute("colspan",e+s,t);const d={};o>1&&(d.rowspan=o),ug(s,n,n.createPositionAfter(t),d);const u=i.getAttribute("headingColumns")||0;u>c&&jp("headingColumns",u+s,i,n)}})}splitCellHorizontally(t,e=2){const n=this.editor.model,i=t.parent,o=i.parent,r=o.getChildIndex(i),s=parseInt(t.getAttribute("rowspan")||1),a=parseInt(t.getAttribute("colspan")||1);n.change(n=>{if(s>1){const i=[...new Up(o,{startRow:r,endRow:r+s-1,includeSpanned:!0})],{newCellsSpan:c,updatedSpan:l}=hg(s,e);jp("rowspan",l,t,n);const{column:d}=i.find(({cell:e})=>e===t),u={};c>1&&(u.rowspan=c),a>1&&(u.colspan=a);for(const{column:t,row:e,cellIndex:s}of i){if(e>=r+l&&t===d&&(e+r+l)%c==0){ug(1,n,n.createPositionAt(o.getChild(e),s),u)}}}if(s<e){const i=e-s,c=[...new Up(o,{startRow:0,endRow:r})];for(const{cell:e,rowspan:o,row:s}of c)if(e!==t&&s+o>r){const t=o+i;n.setAttribute("rowspan",t,e)}const l={};a>1&&(l.colspan=a),dg(n,o,r+1,i,1,l);const d=o.getAttribute("headingRows")||0;d>r&&jp("headingRows",d+i,o,n)}})}getColumns(t){return[...t.getChild(0).getChildren()].reduce((t,e)=>{return t+parseInt(e.getAttribute("colspan")||1)},0)}}function dg(t,e,n,i,o,r={}){for(let s=0;s<i;s++){const i=t.createElement("tableRow");t.insert(i,e,n),ug(o,t,t.createPositionAt(i,"end"),r)}}function ug(t,e,n,i={}){for(let o=0;o<t;o++)Vp(e,n,i)}function hg(t,e){if(t<e)return{newCellsSpan:1,updatedSpan:1};const n=Math.floor(t/e);return{newCellsSpan:n,updatedSpan:t-n*e+n}}class fg extends ql{refresh(){const t=this.editor.model,e=t.document.selection,n=t.schema,i=function(t){const e=t.parent;return e===e.root?e:e.parent}(e.getFirstPosition());this.isEnabled=n.checkChild(i,"table")}execute(t={}){const e=this.editor.model,n=e.document.selection,i=this.editor.plugins.get(lg),o=parseInt(t.rows)||2,r=parseInt(t.columns)||2,s=nh(n,e);e.change(t=>{const n=i.createTable(t,o,r);e.insertContent(n,s),t.setSelection(t.createPositionAt(n.getNodeByPath([0,0,0]),0))})}}class mg extends ql{constructor(t,e={}){super(t),this.order=e.order||"below"}refresh(){const t=Lp("table",this.editor.model.document.selection.getFirstPosition());this.isEnabled=!!t}execute(){const t=this.editor,e=t.model.document.selection,n=t.plugins.get(lg),i=Lp("tableCell",e.getFirstPosition()).parent,o=i.parent,r=o.getChildIndex(i),s="below"===this.order?r+1:r;n.insertRows(o,{rows:1,at:s})}}class pg extends ql{constructor(t,e={}){super(t),this.order=e.order||"right"}refresh(){const t=Lp("table",this.editor.model.document.selection.getFirstPosition());this.isEnabled=!!t}execute(){const t=this.editor,e=t.model.document.selection,n=t.plugins.get(lg),i=Lp("tableCell",e.getFirstPosition()),o=i.parent.parent,{column:r}=n.getCellLocation(i),s="right"===this.order?r+1:r;n.insertColumns(o,{columns:1,at:s})}}class gg extends ql{constructor(t,e={}){super(t),this.direction=e.direction||"horizontally"}refresh(){const t=Lp("tableCell",this.editor.model.document.selection.getFirstPosition());this.isEnabled=!!t}execute(){const t=Lp("tableCell",this.editor.model.document.selection.getFirstPosition()),e="horizontally"===this.direction,n=this.editor.plugins.get(lg);e?n.splitCellHorizontally(t,2):n.splitCellVertically(t,2)}}class bg extends ql{constructor(t,e){super(t),this.direction=e.direction,this.isHorizontal="right"==this.direction||"left"==this.direction}refresh(){const t=this._getMergeableCell();this.isEnabled=!!t,this.value=t}execute(){const t=this.editor.model,e=Lp("tableCell",t.document.selection.getFirstPosition()),n=this.value,i=this.direction;t.change(t=>{const o="right"==i||"down"==i,r=o?e:n,s=o?n:e,a=s.parent;!function(t,e,n){wg(t)||(wg(e)&&n.remove(n.createRangeIn(e)),n.move(n.createRangeIn(t),n.createPositionAt(e,"end")));n.remove(t)}(s,r,t);const c=this.isHorizontal?"colspan":"rowspan",l=parseInt(e.getAttribute(c)||1),d=parseInt(n.getAttribute(c)||1);t.setAttribute(c,l+d,r),t.setSelection(t.createRangeIn(r)),a.childCount||function(t,e){const n=t.parent,i=n.getChildIndex(t);for(const{cell:t,row:o,rowspan:r}of new Up(n,{endRow:i})){const n=o+r-1>=i;n&&jp("rowspan",r-1,t,e)}e.remove(t)}(a,t)})}_getMergeableCell(){const t=Lp("tableCell",this.editor.model.document.selection.getFirstPosition());if(!t)return;const e=this.editor.plugins.get(lg),n=this.isHorizontal?function(t,e,n){const i="right"==e?t.nextSibling:t.previousSibling;if(!i)return;const o="right"==e?t:i,r="right"==e?i:t,{column:s}=n.getCellLocation(o),{column:a}=n.getCellLocation(r),c=parseInt(o.getAttribute("colspan")||1);return s+c===a?i:void 0}(t,this.direction,e):function(t,e){const n=t.parent,i=n.parent,o=i.getChildIndex(n);if("down"==e&&o===i.childCount-1||"up"==e&&0===o)return;const r=parseInt(t.getAttribute("rowspan")||1),s=i.getAttribute("headingRows")||0;if(s&&("down"==e&&o+r===s||"up"==e&&o===s))return;const a=parseInt(t.getAttribute("rowspan")||1),c="down"==e?o+a:o,l=[...new Up(i,{endRow:c})],d=l.find(e=>e.cell===t).column,u=l.find(({row:t,rowspan:n,column:i})=>i===d&&("down"==e?t===c:c===t+n));return u&&u.cell}(t,this.direction);if(!n)return;const i=this.isHorizontal?"rowspan":"colspan",o=parseInt(t.getAttribute(i)||1);return parseInt(n.getAttribute(i)||1)===o?n:void 0}}function wg(t){return 1==t.childCount&&t.getChild(0).is("paragraph")&&t.getChild(0).isEmpty}class _g extends ql{refresh(){const t=Lp("tableCell",this.editor.model.document.selection.getFirstPosition());this.isEnabled=!!t&&t.parent.parent.childCount>1}execute(){const t=this.editor.model,e=Lp("tableCell",t.document.selection.getFirstPosition()).parent,n=e.parent,i=n.getChildIndex(e),o=n.getAttribute("headingRows")||0;t.change(t=>{o&&i<=o&&jp("headingRows",o-1,n,t,0);const r=[...new Up(n,{endRow:i})],s=new Map;r.filter(({row:t,rowspan:e})=>t===i&&e>1).forEach(({column:t,cell:e,rowspan:n})=>s.set(t,{cell:e,rowspanToSet:n-1})),r.filter(({row:t,rowspan:e})=>t<=i-1&&t+e>i).forEach(({cell:e,rowspan:n})=>jp("rowspan",n-1,e,t));const a=i+1,c=new Up(n,{includeSpanned:!0,startRow:a,endRow:a});let l;for(const{row:e,column:i,cell:o}of[...c])if(s.has(i)){const{cell:o,rowspanToSet:r}=s.get(i),a=l?t.createPositionAfter(l):t.createPositionAt(n.getChild(e),0);t.move(t.createRangeOn(o),a),jp("rowspan",r,o,t),l=o}else l=o;t.remove(e)})}}class kg extends ql{refresh(){const t=this.editor,e=t.model.document.selection,n=t.plugins.get(lg),i=Lp("tableCell",e.getFirstPosition());this.isEnabled=!!i&&n.getColumns(i.parent.parent)>1}execute(){const t=this.editor.model,e=Lp("tableCell",t.document.selection.getFirstPosition()),n=e.parent,i=n.parent,o=i.getAttribute("headingColumns")||0,r=i.getChildIndex(n),s=[...new Up(i)],a=s.find(t=>t.cell===e).column;t.change(t=>{o&&r<=o&&t.setAttribute("headingColumns",o-1,i);for(const{cell:e,column:n,colspan:i}of s)n<=a&&i>1&&n+i>a?jp("colspan",i-1,e,t):n===a&&t.remove(e)})}}class vg extends ql{refresh(){const t=Lp("tableCell",this.editor.model.document.selection.getFirstPosition()),e=!!t;this.isEnabled=e,this.value=e&&this._isInHeading(t,t.parent.parent)}execute(){const t=this.editor.model,e=Lp("tableCell",t.document.selection.getFirstPosition()).parent,n=e.parent,i=n.getAttribute("headingRows")||0,o=e.index,r=i>o?o:o+1;t.change(t=>{if(r){const e=function(t,e,n){const i=[],o=new Up(t,{startRow:e>n?n:0,endRow:e-1});for(const{row:t,rowspan:n,cell:r}of o)n>1&&t+n>e&&i.push(r);return i}(n,r,i);for(const n of e)yg(n,r,t)}jp("headingRows",r,n,t,0)})}_isInHeading(t,e){const n=parseInt(e.getAttribute("headingRows")||0);return!!n&&t.parent.index<n}}function yg(t,e,n){const i=t.parent,o=i.parent,r=e-i.index,s={},a=parseInt(t.getAttribute("rowspan"))-r;a>1&&(s.rowspan=a);const c=o.getChildIndex(i),l=c+r,d=[...new Up(o,{startRow:c,endRow:l,includeSpanned:!0})];let u;for(const{row:e,column:i,cell:r,colspan:a,cellIndex:c}of d)if(r===t&&(u=i,a>1&&(s.colspan=a)),void 0!==u&&u===i&&e===l){const t=o.getChild(e);Vp(n,n.createPositionAt(t,c),s)}jp("rowspan",r,t,n)}class xg extends ql{refresh(){const t=Lp("tableCell",this.editor.model.document.selection.getFirstPosition()),e=!!t;this.isEnabled=e,this.value=e&&this._isInHeading(t,t.parent.parent)}execute(){const t=this.editor.model,e=t.document.selection,n=this.editor.plugins.get("TableUtils"),i=Lp("tableCell",e.getFirstPosition().parent),o=i.parent.parent,r=parseInt(o.getAttribute("headingColumns")||0),{column:s}=n.getCellLocation(i),a=r>s?s:s+1;t.change(t=>{jp("headingColumns",a,o,t,0)})}_isInHeading(t,e){const n=parseInt(e.getAttribute("headingColumns")||0),i=this.editor.plugins.get("TableUtils"),{column:o}=i.getCellLocation(t);return!!n&&o<n}}function Ag(t){t.document.registerPostFixer(e=>(function(t,e){const n=e.document.differ.getChanges();let i=!1;const o=new Set;for(const e of n){let n;"table"==e.name&&"insert"==e.type&&(n=e.position.nodeAfter),"tableRow"!=e.name&&"tableCell"!=e.name||(n=Lp("table",e.position)),Pg(e)&&(n=Lp("table",e.range.start)),n&&!o.has(n)&&(i=Cg(n,t)||i,i=Tg(n,t)||i,o.add(n))}return i})(e,t))}function Cg(t,e){let n=!1;const i=function(t){const e=parseInt(t.getAttribute("headingRows")||0),n=t.childCount,i=[];for(const{row:o,rowspan:r,cell:s}of new Up(t)){if(r<2)continue;const t=o<e,a=t?e:n;if(o+r>a){const t=a-o;i.push({cell:s,rowspan:t})}}return i}(t);if(i.length){n=!0;for(const t of i)jp("rowspan",t.rowspan,t.cell,e,1)}return n}function Tg(t,e){let n=!1;const i=function(t){const e={};for(const{row:n}of new Up(t,{includeSpanned:!0}))e[n]||(e[n]=0),e[n]+=1;return e}(t),o=i[0];if(!Object.values(i).every(t=>t===o)){const o=Object.values(i).reduce((t,e)=>e>t?e:t,0);for(const[r,s]of Object.entries(i)){const i=o-s;if(i){for(let n=0;n<i;n++)Vp(e,e.createPositionAt(t.getChild(r),"end"));n=!0}}}return n}function Pg(t){const e="attribute"===t.type,n=t.attributeKey;return e&&("headingRows"===n||"colspan"===n||"rowspan"===n)}function Mg(t){t.document.registerPostFixer(e=>(function(t,e){const n=e.document.differ.getChanges();let i=!1;for(const e of n)"remove"==e.type&&e.position.parent.is("tableCell")&&(i=Eg(e.position.parent,t)||i),"insert"==e.type&&("table"==e.name&&(i=Sg(e.position.nodeAfter,t)||i),"tableRow"==e.name&&(i=Ig(e.position.nodeAfter,t)||i),"tableCell"==e.name&&(i=Eg(e.position.nodeAfter,t)||i));return i})(e,t))}function Sg(t,e){let n=!1;for(const i of t.getChildren())n=Ig(i,e)||n;return n}function Ig(t,e){let n=!1;for(const i of t.getChildren())n=Eg(i,e)||n;return n}function Eg(t,e){return 0==t.childCount&&(e.insertElement("paragraph",t),!0)}function Ng(t,e){e.view.document.registerPostFixer(n=>(function(t,e,n,i){let o=!1;const r=function(t){const e=Array.from(t._renderer.markedAttributes).filter(t=>!!t.parent).filter(Rg).filter(t=>Dg(t.parent)),n=Array.from(t._renderer.markedChildren).filter(t=>!!t.parent).filter(Dg).reduce((t,e)=>{const n=Array.from(e.getChildren()).filter(Rg);return[...t,...n]},[]);return[...e,...n]}(i);for(const e of r)o=Og(e,n,t)||o;o&&function(t,e,n){const i=Array.from(t.getRanges()).map(t=>e.toViewRange(t));n.setSelection(i,{backward:t.isBackward})}(e.document.selection,n,t);return o})(n,t,e.mapper,e.view))}function Og(t,e,n){const i=e.toModelElement(t),o=function(t,e){const n=t.childCount>1,i=!![...e.getAttributes()].length;return n||i?"p":"span"}(i.parent,i);if(t.name!==o){e.unbindViewElement(t);const r=n.rename(o,t);return e.bindElements(i,r),!0}return!1}function Rg(t){return t.is("p")||t.is("span")}function Dg(t){return t.is("td")||t.is("th")}n(111);class Lg extends zl{init(){const t=this.editor,e=t.model,n=e.schema,i=t.conversion;n.register("table",{allowWhere:"$block",allowAttributes:["headingRows","headingColumns"],isLimit:!0,isObject:!0}),n.register("tableRow",{allowIn:"table",isLimit:!0}),n.register("tableCell",{allowIn:"tableRow",allowAttributes:["colspan","rowspan"],isLimit:!0}),n.extend("$block",{allowIn:"tableCell"}),n.addChildCheck((t,e)=>{if("table"==e.name&&Array.from(t.getNames()).includes("table"))return!1}),n.addChildCheck((t,e)=>{if(Array.from(t.getNames()).includes("table"))return"image"!=e.name&&"media"!=e.name&&void 0}),i.for("upcast").add(zp()),i.for("editingDowncast").add($p({asWidget:!0})),i.for("dataDowncast").add($p()),i.for("upcast").add(Oa({model:"tableRow",view:"tr"})),i.for("editingDowncast").add(Gp({asWidget:!0})),i.for("dataDowncast").add(Gp()),i.for("downcast").add(t=>t.on("remove:tableRow",(t,e,n)=>{t.stop();const i=n.writer,o=n.mapper,r=o.toViewPosition(e.position).getLastMatchingPosition(t=>!t.item.is("tr")).nodeAfter,s=r.parent,a=i.createRangeOn(r),c=i.remove(a);for(const t of i.createRangeIn(c).getItems())o.unbindViewElement(t);s.childCount||i.remove(i.createRangeOn(s))},{priority:"higher"})),i.for("upcast").add(Bp("td")),i.for("upcast").add(Bp("th")),i.for("editingDowncast").add(Qp({asWidget:!0})),i.for("dataDowncast").add(Qp()),i.attributeToAttribute({model:"colspan",view:"colspan"}),i.attributeToAttribute({model:"rowspan",view:"rowspan"}),i.for("editingDowncast").add(Kp({asWidget:!0})),i.for("dataDowncast").add(Kp()),i.for("editingDowncast").add(Jp({asWidget:!0})),i.for("dataDowncast").add(Jp()),Ng(t.model,t.editing),t.commands.add("insertTable",new fg(t)),t.commands.add("insertTableRowAbove",new mg(t,{order:"above"})),t.commands.add("insertTableRowBelow",new mg(t,{order:"below"})),t.commands.add("insertTableColumnLeft",new pg(t,{order:"left"})),t.commands.add("insertTableColumnRight",new pg(t,{order:"right"})),t.commands.add("removeTableRow",new _g(t)),t.commands.add("removeTableColumn",new kg(t)),t.commands.add("splitTableCellVertically",new gg(t,{direction:"vertically"})),t.commands.add("splitTableCellHorizontally",new gg(t,{direction:"horizontally"})),t.commands.add("mergeTableCellRight",new bg(t,{direction:"right"})),t.commands.add("mergeTableCellLeft",new bg(t,{direction:"left"})),t.commands.add("mergeTableCellDown",new bg(t,{direction:"down"})),t.commands.add("mergeTableCellUp",new bg(t,{direction:"up"})),t.commands.add("setTableColumnHeader",new xg(t)),t.commands.add("setTableRowHeader",new vg(t)),Ag(e),Mg(e),this.editor.keystrokes.set("Tab",(...t)=>this._handleTabOnSelectedTable(...t),{priority:"low"}),this.editor.keystrokes.set("Tab",this._getTabHandler(!0),{priority:"low"}),this.editor.keystrokes.set("Shift+Tab",this._getTabHandler(!1),{priority:"low"})}static get requires(){return[lg]}_handleTabOnSelectedTable(t,e){const n=this.editor,i=n.model.document.selection;if(!i.isCollapsed&&1===i.rangeCount&&i.getFirstRange().isFlat){const t=i.getSelectedElement();if(!t||!t.is("table"))return;e(),n.model.change(e=>{e.setSelection(e.createRangeIn(t.getChild(0).getChild(0)))})}}_getTabHandler(t){const e=this.editor;return(n,i)=>{const o=Lp("tableCell",e.model.document.selection.getFirstPosition());if(!o)return;i();const r=o.parent,s=r.parent,a=s.getChildIndex(r),c=r.getChildIndex(o),l=0===c;if(!t&&l&&0===a)return;const d=c===r.childCount-1,u=a===s.childCount-1;let h;if(t&&u&&d&&e.plugins.get(lg).insertRows(s,{at:s.childCount}),t&&d){const t=s.getChild(a+1);h=t.getChild(0)}else if(!t&&l){const t=s.getChild(a-1);h=t.getChild(t.childCount-1)}else h=r.getChild(c+(t?1:-1));e.model.change(t=>{t.setSelection(t.createRangeIn(h))})}}}n(113);class jg extends xl{constructor(t){super(t);const e=this.bindTemplate;this.items=this.createCollection(),this.set("rows",0),this.set("columns",0),this.bind("label").to(this,"columns",this,"rows",(t,e)=>`${e} x ${t}`),this.setTemplate({tag:"div",attributes:{class:["ck"]},children:[{tag:"div",attributes:{class:["ck-insert-table-dropdown__grid"]},children:this.items},{tag:"div",attributes:{class:["ck-insert-table-dropdown__label"]},children:[{text:e.to("label")}]}],on:{mousedown:e.to(t=>{t.preventDefault()}),click:e.to(()=>{this.fire("execute")})}});for(let t=0;t<100;t++){const e=new Vg;e.on("over",()=>{const e=Math.floor(t/10),n=t%10;this.set("rows",e+1),this.set("columns",n+1)}),this.items.add(e)}this.on("change:columns",()=>{this._highlightGridBoxes()}),this.on("change:rows",()=>{this._highlightGridBoxes()})}focus(){}focusLast(){}_highlightGridBoxes(){const t=this.rows,e=this.columns;this.items.map((n,i)=>{const o=Math.floor(i/10)<t&&i%10<e;n.set("isOn",o)})}}class Vg extends xl{constructor(t){super(t);const e=this.bindTemplate;this.set("isOn",!1),this.setTemplate({tag:"div",attributes:{class:["ck-insert-table-dropdown-grid-box",e.if("isOn","ck-on")]},on:{mouseover:e.to("over")}})}}var zg=n(38),Bg=n.n(zg),Fg=n(39),Ug=n.n(Fg),Hg=n(40),qg=n.n(Hg),Wg=n(41),Yg=n.n(Wg);class $g extends zl{init(){const t=this.editor,e=this.editor.t;t.ui.componentFactory.add("insertTable",n=>{const i=t.commands.get("insertTable"),o=Ef(n);o.bind("isEnabled").to(i),o.buttonView.set({icon:Bg.a,label:e("t"),tooltip:!0});const r=new jg(n);return o.panelView.children.add(r),r.delegate("execute").to(o),o.buttonView.on("open",()=>{r.rows=0,r.columns=0}),o.on("execute",()=>{t.execute("insertTable",{rows:r.rows,columns:r.columns}),t.editing.view.focus()}),o}),t.ui.componentFactory.add("tableColumn",t=>{const n=[{type:"switchbutton",model:{commandName:"setTableColumnHeader",label:e("u"),bindIsOn:!0}},{type:"separator"},{type:"button",model:{commandName:"insertTableColumnLeft",label:e("v")}},{type:"button",model:{commandName:"insertTableColumnRight",label:e("w")}},{type:"button",model:{commandName:"removeTableColumn",label:e("x")}}];return this._prepareDropdown(e("y"),Ug.a,n,t)}),t.ui.componentFactory.add("tableRow",t=>{const n=[{type:"switchbutton",model:{commandName:"setTableRowHeader",label:e("z"),bindIsOn:!0}},{type:"separator"},{type:"button",model:{commandName:"insertTableRowBelow",label:e("aa")}},{type:"button",model:{commandName:"insertTableRowAbove",label:e("ab")}},{type:"button",model:{commandName:"removeTableRow",label:e("ac")}}];return this._prepareDropdown(e("ad"),qg.a,n,t)}),t.ui.componentFactory.add("mergeTableCells",t=>{const n=[{type:"button",model:{commandName:"mergeTableCellUp",label:e("ae")}},{type:"button",model:{commandName:"mergeTableCellRight",label:e("af")}},{type:"button",model:{commandName:"mergeTableCellDown",label:e("ag")}},{type:"button",model:{commandName:"mergeTableCellLeft",label:e("ah")}},{type:"separator"},{type:"button",model:{commandName:"splitTableCellVertically",label:e("ai")}},{type:"button",model:{commandName:"splitTableCellHorizontally",label:e("aj")}}];return this._prepareDropdown(e("ak"),Yg.a,n,t)})}_prepareDropdown(t,e,n,i){const o=this.editor,r=Ef(i),s=[],a=new Xi;for(const t of n)Gg(t,o,s,a);return Nf(r,a),r.buttonView.set({label:t,icon:e,tooltip:!0}),r.bind("isEnabled").toMany(s,"isEnabled",(...t)=>t.some(t=>t)),this.listenTo(r,"execute",t=>{o.execute(t.source.commandName),o.editing.view.focus()}),r}}function Gg(t,e,n,i){const o=t.model=new vf(t.model),{commandName:r,bindIsOn:s}=t.model;if("separator"!==t.type){const t=e.commands.get(r);n.push(t),o.set({commandName:r}),o.bind("isEnabled").to(t),s&&o.bind("isOn").to(t,"value")}o.set({withText:!0}),i.add(t)}n(115);n.d(e,"default",function(){return Qg});class Qg extends Vl{}Qg.builtinPlugins=[class extends zl{static get requires(){return[Hl,Ql,Xl,gd,Ud]}static get pluginName(){return"Essentials"}},Kd,class extends zl{static get pluginName(){return"Autoformat"}afterInit(){this._addListAutoformats(),this._addBasicStylesAutoformats(),this._addHeadingAutoformats(),this._addBlockQuoteAutoformats()}_addListAutoformats(){const t=this.editor.commands;t.get("bulletedList")&&new Xd(this.editor,/^[*-]\s$/,"bulletedList"),t.get("numberedList")&&new Xd(this.editor,/^\d+[.|)]\s$/,"numberedList")}_addBasicStylesAutoformats(){const t=this.editor.commands;t.get("bold")&&(new tu(this.editor,/(\*\*)([^*]+)(\*\*)$/g,"bold"),new tu(this.editor,/(__)([^_]+)(__)$/g,"bold")),t.get("italic")&&(new tu(this.editor,/(?:^|[^*])(\*)([^*_]+)(\*)$/g,"italic"),new tu(this.editor,/(?:^|[^_])(_)([^_]+)(_)$/g,"italic")),t.get("code")&&new tu(this.editor,/(`)([^`]+)(`)$/g,"code")}_addHeadingAutoformats(){const t=this.editor.commands.get("heading");t&&t.modelElements.filter(t=>t.match(/^heading[1-6]$/)).forEach(t=>{const e=t[7],n=new RegExp(`^(#{${e}})\\s$`);new Xd(this.editor,n,()=>{this.editor.execute("heading",{value:t})})})}_addBlockQuoteAutoformats(){this.editor.commands.get("blockQuote")&&new Xd(this.editor,/^>\s$/,"blockQuote")}},class extends zl{static get requires(){return[ou,cu]}static get pluginName(){return"Bold"}},class extends zl{static get requires(){return[du,mu]}static get pluginName(){return"Italic"}},class extends zl{static get requires(){return[ku,xu]}static get pluginName(){return"BlockQuote"}},class extends zl{static get pluginName(){return"CKFinder"}static get requires(){return[Iu,Tu,Kd]}},class extends zl{static get requires(){return[Vu,Uh,uf]}static get pluginName(){return"EasyImage"}},class extends zl{static get requires(){return[kf,Of]}static get pluginName(){return"Heading"}},Uh,class extends zl{static get requires(){return[Bf]}static get pluginName(){return"ImageCaption"}},class extends zl{static get requires(){return[rm,sm]}static get pluginName(){return"ImageStyle"}},class extends zl{static get requires(){return[am]}static get pluginName(){return"ImageToolbar"}afterInit(){const t=this.editor;t.plugins.get(am).register("image",{items:t.config.get("image.toolbar")||[],visibleWhen:rh})}},uf,class extends zl{static get requires(){return[Cm,Lm]}static get pluginName(){return"Link"}},class extends zl{static get requires(){return[rp,up]}static get pluginName(){return"List"}},class extends zl{static get requires(){return[xp,Sp,Cp,mh]}static get pluginName(){return"MediaEmbed"}},mf,class extends zl{static get pluginName(){return"PasteFromOffice"}init(){const t=this.editor;this.listenTo(t.plugins.get(Hl),"inputTransformation",(t,e)=>{const n=e.dataTransfer.getData("text/html");!0!==e.pasteFromOfficeProcessed&&function(t){return!(!t||!t.match(/<meta\s*name="?generator"?\s*content="?microsoft\s*word\s*\d+"?\/?>/gi)&&!t.match(/xmlns:o="urn:schemas-microsoft-com/gi))}(n)&&(e.content=this._normalizeWordInput(n,e.dataTransfer),e.pasteFromOfficeProcessed=!0)},{priority:"high"})}_normalizeWordInput(t,e){const{body:n,stylesString:i}=Ep(t);return Np(n,i),Rp(n,e.getData("text/rtf")),n}},class extends zl{static get requires(){return[Lg,$g,mh]}static get pluginName(){return"Table"}},class extends zl{static get requires(){return[am]}static get pluginName(){return"TableToolbar"}afterInit(){const t=this.editor,e=t.plugins.get(am),n=t.config.get("table.contentToolbar"),i=t.config.get("table.toolbar"),o=t.config.get("table.tableToolbar");i&&console.warn("`config.table.toolbar` is deprecated and will be removed in the next major release. Use `config.table.contentToolbar` instead."),(n||i)&&e.register("tableContent",{items:n||i,visibleWhen:Yp}),o&&e.register("table",{items:o,visibleWhen:Wp})}}],Qg.defaultConfig={toolbar:{items:["heading","|","bold","italic","link","bulletedList","numberedList","imageUpload","blockQuote","insertTable","mediaEmbed","undo","redo"]},image:{toolbar:["imageStyle:full","imageStyle:side","|","imageTextAlternative"]},table:{contentToolbar:["tableColumn","tableRow","mergeTableCells"]},language:"en"}}]).default});
//# sourceMappingURL=ckeditor.js.map

/***/ }),
/* 19 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 20 */,
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(44);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19)))

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(4);
var normalizeHeaderName = __webpack_require__(48);

var PROTECTION_PREFIX = /^\)\]\}',?\n/;
var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(30);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(30);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      data = data.replace(PROTECTION_PREFIX, '');
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMehtodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(27)))

/***/ }),
/* 23 */,
/* 24 */,
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_cacheDirectory_node_modules_vue_loader_lib_selector_type_script_index_0_CoursesComponent_vue__ = __webpack_require__(67);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7b3b066a_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_CoursesComponent_vue__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
function injectStyle (context) {
  __webpack_require__(100)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_cacheDirectory_node_modules_vue_loader_lib_selector_type_script_index_0_CoursesComponent_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7b3b066a_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_CoursesComponent_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7b3b066a_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_CoursesComponent_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 26 */,
/* 27 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(46);

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);
var settle = __webpack_require__(49);
var buildURL = __webpack_require__(51);
var parseHeaders = __webpack_require__(52);
var isURLSameOrigin = __webpack_require__(53);
var createError = __webpack_require__(31);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(54);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ("production" !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED'));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(55);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        if (request.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(50);

/**
 * Create an Error with the specified message, config, error code, and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 @ @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, response);
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.swal=e():t.swal=e()}(this,function(){return function(t){function e(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=8)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o="swal-button";e.CLASS_NAMES={MODAL:"swal-modal",OVERLAY:"swal-overlay",SHOW_MODAL:"swal-overlay--show-modal",MODAL_TITLE:"swal-title",MODAL_TEXT:"swal-text",ICON:"swal-icon",ICON_CUSTOM:"swal-icon--custom",CONTENT:"swal-content",FOOTER:"swal-footer",BUTTON_CONTAINER:"swal-button-container",BUTTON:o,CONFIRM_BUTTON:o+"--confirm",CANCEL_BUTTON:o+"--cancel",DANGER_BUTTON:o+"--danger",BUTTON_LOADING:o+"--loading",BUTTON_LOADER:o+"__loader"},e.default=e.CLASS_NAMES},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getNode=function(t){var e="."+t;return document.querySelector(e)},e.stringToNode=function(t){var e=document.createElement("div");return e.innerHTML=t.trim(),e.firstChild},e.insertAfter=function(t,e){var n=e.nextSibling;e.parentNode.insertBefore(t,n)},e.removeNode=function(t){t.parentElement.removeChild(t)},e.throwErr=function(t){throw t=t.replace(/ +(?= )/g,""),"SweetAlert: "+(t=t.trim())},e.isPlainObject=function(t){if("[object Object]"!==Object.prototype.toString.call(t))return!1;var e=Object.getPrototypeOf(t);return null===e||e===Object.prototype},e.ordinalSuffixOf=function(t){var e=t%10,n=t%100;return 1===e&&11!==n?t+"st":2===e&&12!==n?t+"nd":3===e&&13!==n?t+"rd":t+"th"}},function(t,e,n){"use strict";function o(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}Object.defineProperty(e,"__esModule",{value:!0}),o(n(25));var r=n(26);e.overlayMarkup=r.default,o(n(27)),o(n(28)),o(n(29));var i=n(0),a=i.default.MODAL_TITLE,s=i.default.MODAL_TEXT,c=i.default.ICON,l=i.default.FOOTER;e.iconMarkup='\n  <div class="'+c+'"></div>',e.titleMarkup='\n  <div class="'+a+'"></div>\n',e.textMarkup='\n  <div class="'+s+'"></div>',e.footerMarkup='\n  <div class="'+l+'"></div>\n'},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1);e.CONFIRM_KEY="confirm",e.CANCEL_KEY="cancel";var r={visible:!0,text:null,value:null,className:"",closeModal:!0},i=Object.assign({},r,{visible:!1,text:"Cancel",value:null}),a=Object.assign({},r,{text:"OK",value:!0});e.defaultButtonList={cancel:i,confirm:a};var s=function(t){switch(t){case e.CONFIRM_KEY:return a;case e.CANCEL_KEY:return i;default:var n=t.charAt(0).toUpperCase()+t.slice(1);return Object.assign({},r,{text:n,value:t})}},c=function(t,e){var n=s(t);return!0===e?Object.assign({},n,{visible:!0}):"string"==typeof e?Object.assign({},n,{visible:!0,text:e}):o.isPlainObject(e)?Object.assign({visible:!0},n,e):Object.assign({},n,{visible:!1})},l=function(t){for(var e={},n=0,o=Object.keys(t);n<o.length;n++){var r=o[n],a=t[r],s=c(r,a);e[r]=s}return e.cancel||(e.cancel=i),e},u=function(t){var n={};switch(t.length){case 1:n[e.CANCEL_KEY]=Object.assign({},i,{visible:!1});break;case 2:n[e.CANCEL_KEY]=c(e.CANCEL_KEY,t[0]),n[e.CONFIRM_KEY]=c(e.CONFIRM_KEY,t[1]);break;default:o.throwErr("Invalid number of 'buttons' in array ("+t.length+").\n      If you want more than 2 buttons, you need to use an object!")}return n};e.getButtonListOpts=function(t){var n=e.defaultButtonList;return"string"==typeof t?n[e.CONFIRM_KEY]=c(e.CONFIRM_KEY,t):Array.isArray(t)?n=u(t):o.isPlainObject(t)?n=l(t):!0===t?n=u([!0,!0]):!1===t?n=u([!1,!1]):void 0===t&&(n=e.defaultButtonList),n}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(2),i=n(0),a=i.default.MODAL,s=i.default.OVERLAY,c=n(30),l=n(31),u=n(32),f=n(33);e.injectElIntoModal=function(t){var e=o.getNode(a),n=o.stringToNode(t);return e.appendChild(n),n};var d=function(t){t.className=a,t.textContent=""},p=function(t,e){d(t);var n=e.className;n&&t.classList.add(n)};e.initModalContent=function(t){var e=o.getNode(a);p(e,t),c.default(t.icon),l.initTitle(t.title),l.initText(t.text),f.default(t.content),u.default(t.buttons,t.dangerMode)};var m=function(){var t=o.getNode(s),e=o.stringToNode(r.modalMarkup);t.appendChild(e)};e.default=m},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(3),r={isOpen:!1,promise:null,actions:{},timer:null},i=Object.assign({},r);e.resetState=function(){i=Object.assign({},r)},e.setActionValue=function(t){if("string"==typeof t)return a(o.CONFIRM_KEY,t);for(var e in t)a(e,t[e])};var a=function(t,e){i.actions[t]||(i.actions[t]={}),Object.assign(i.actions[t],{value:e})};e.setActionOptionsFor=function(t,e){var n=(void 0===e?{}:e).closeModal,o=void 0===n||n;Object.assign(i.actions[t],{closeModal:o})},e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(3),i=n(0),a=i.default.OVERLAY,s=i.default.SHOW_MODAL,c=i.default.BUTTON,l=i.default.BUTTON_LOADING,u=n(5);e.openModal=function(){o.getNode(a).classList.add(s),u.default.isOpen=!0};var f=function(){o.getNode(a).classList.remove(s),u.default.isOpen=!1};e.onAction=function(t){void 0===t&&(t=r.CANCEL_KEY);var e=u.default.actions[t],n=e.value;if(!1===e.closeModal){var i=c+"--"+t;o.getNode(i).classList.add(l)}else f();u.default.promise.resolve(n)},e.getState=function(){var t=Object.assign({},u.default);return delete t.promise,delete t.timer,t},e.stopLoading=function(){for(var t=document.querySelectorAll("."+c),e=0;e<t.length;e++){t[e].classList.remove(l)}}},function(t,e){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){(function(e){t.exports=e.sweetAlert=n(9)}).call(e,n(7))},function(t,e,n){(function(e){t.exports=e.swal=n(10)}).call(e,n(7))},function(t,e,n){"undefined"!=typeof window&&n(11),n(16);var o=n(23).default;t.exports=o},function(t,e,n){var o=n(12);"string"==typeof o&&(o=[[t.i,o,""]]);var r={insertAt:"top"};r.transform=void 0;n(14)(o,r);o.locals&&(t.exports=o.locals)},function(t,e,n){e=t.exports=n(13)(void 0),e.push([t.i,'.swal-icon--error{border-color:#f27474;-webkit-animation:animateErrorIcon .5s;animation:animateErrorIcon .5s}.swal-icon--error__x-mark{position:relative;display:block;-webkit-animation:animateXMark .5s;animation:animateXMark .5s}.swal-icon--error__line{position:absolute;height:5px;width:47px;background-color:#f27474;display:block;top:37px;border-radius:2px}.swal-icon--error__line--left{-webkit-transform:rotate(45deg);transform:rotate(45deg);left:17px}.swal-icon--error__line--right{-webkit-transform:rotate(-45deg);transform:rotate(-45deg);right:16px}@-webkit-keyframes animateErrorIcon{0%{-webkit-transform:rotateX(100deg);transform:rotateX(100deg);opacity:0}to{-webkit-transform:rotateX(0deg);transform:rotateX(0deg);opacity:1}}@keyframes animateErrorIcon{0%{-webkit-transform:rotateX(100deg);transform:rotateX(100deg);opacity:0}to{-webkit-transform:rotateX(0deg);transform:rotateX(0deg);opacity:1}}@-webkit-keyframes animateXMark{0%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}50%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}80%{-webkit-transform:scale(1.15);transform:scale(1.15);margin-top:-6px}to{-webkit-transform:scale(1);transform:scale(1);margin-top:0;opacity:1}}@keyframes animateXMark{0%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}50%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}80%{-webkit-transform:scale(1.15);transform:scale(1.15);margin-top:-6px}to{-webkit-transform:scale(1);transform:scale(1);margin-top:0;opacity:1}}.swal-icon--warning{border-color:#f8bb86;-webkit-animation:pulseWarning .75s infinite alternate;animation:pulseWarning .75s infinite alternate}.swal-icon--warning__body{width:5px;height:47px;top:10px;border-radius:2px;margin-left:-2px}.swal-icon--warning__body,.swal-icon--warning__dot{position:absolute;left:50%;background-color:#f8bb86}.swal-icon--warning__dot{width:7px;height:7px;border-radius:50%;margin-left:-4px;bottom:-11px}@-webkit-keyframes pulseWarning{0%{border-color:#f8d486}to{border-color:#f8bb86}}@keyframes pulseWarning{0%{border-color:#f8d486}to{border-color:#f8bb86}}.swal-icon--success{border-color:#a5dc86}.swal-icon--success:after,.swal-icon--success:before{content:"";border-radius:50%;position:absolute;width:60px;height:120px;background:#fff;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.swal-icon--success:before{border-radius:120px 0 0 120px;top:-7px;left:-33px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:60px 60px;transform-origin:60px 60px}.swal-icon--success:after{border-radius:0 120px 120px 0;top:-11px;left:30px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:0 60px;transform-origin:0 60px;-webkit-animation:rotatePlaceholder 4.25s ease-in;animation:rotatePlaceholder 4.25s ease-in}.swal-icon--success__ring{width:80px;height:80px;border:4px solid hsla(98,55%,69%,.2);border-radius:50%;box-sizing:content-box;position:absolute;left:-4px;top:-4px;z-index:2}.swal-icon--success__hide-corners{width:5px;height:90px;background-color:#fff;padding:1px;position:absolute;left:28px;top:8px;z-index:1;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.swal-icon--success__line{height:5px;background-color:#a5dc86;display:block;border-radius:2px;position:absolute;z-index:2}.swal-icon--success__line--tip{width:25px;left:14px;top:46px;-webkit-transform:rotate(45deg);transform:rotate(45deg);-webkit-animation:animateSuccessTip .75s;animation:animateSuccessTip .75s}.swal-icon--success__line--long{width:47px;right:8px;top:38px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-animation:animateSuccessLong .75s;animation:animateSuccessLong .75s}@-webkit-keyframes rotatePlaceholder{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}5%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}12%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}to{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}}@keyframes rotatePlaceholder{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}5%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}12%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}to{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}}@-webkit-keyframes animateSuccessTip{0%{width:0;left:1px;top:19px}54%{width:0;left:1px;top:19px}70%{width:50px;left:-8px;top:37px}84%{width:17px;left:21px;top:48px}to{width:25px;left:14px;top:45px}}@keyframes animateSuccessTip{0%{width:0;left:1px;top:19px}54%{width:0;left:1px;top:19px}70%{width:50px;left:-8px;top:37px}84%{width:17px;left:21px;top:48px}to{width:25px;left:14px;top:45px}}@-webkit-keyframes animateSuccessLong{0%{width:0;right:46px;top:54px}65%{width:0;right:46px;top:54px}84%{width:55px;right:0;top:35px}to{width:47px;right:8px;top:38px}}@keyframes animateSuccessLong{0%{width:0;right:46px;top:54px}65%{width:0;right:46px;top:54px}84%{width:55px;right:0;top:35px}to{width:47px;right:8px;top:38px}}.swal-icon--info{border-color:#c9dae1}.swal-icon--info:before{width:5px;height:29px;bottom:17px;border-radius:2px;margin-left:-2px}.swal-icon--info:after,.swal-icon--info:before{content:"";position:absolute;left:50%;background-color:#c9dae1}.swal-icon--info:after{width:7px;height:7px;border-radius:50%;margin-left:-3px;top:19px}.swal-icon{width:80px;height:80px;border-width:4px;border-style:solid;border-radius:50%;padding:0;position:relative;box-sizing:content-box;margin:20px auto}.swal-icon:first-child{margin-top:32px}.swal-icon--custom{width:auto;height:auto;max-width:100%;border:none;border-radius:0}.swal-icon img{max-width:100%;max-height:100%}.swal-title{color:rgba(0,0,0,.65);font-weight:600;text-transform:none;position:relative;display:block;padding:13px 16px;font-size:27px;line-height:normal;text-align:center;margin-bottom:0}.swal-title:first-child{margin-top:26px}.swal-title:not(:first-child){padding-bottom:0}.swal-title:not(:last-child){margin-bottom:13px}.swal-text{font-size:16px;position:relative;float:none;line-height:normal;vertical-align:top;text-align:left;display:inline-block;margin:0;padding:0 10px;font-weight:400;color:rgba(0,0,0,.64);max-width:calc(100% - 20px);overflow-wrap:break-word;box-sizing:border-box}.swal-text:first-child{margin-top:45px}.swal-text:last-child{margin-bottom:45px}.swal-footer{text-align:right;padding-top:13px;margin-top:13px;padding:13px 16px;border-radius:inherit;border-top-left-radius:0;border-top-right-radius:0}.swal-button-container{margin:5px;display:inline-block;position:relative}.swal-button{background-color:#7cd1f9;color:#fff;border:none;box-shadow:none;border-radius:5px;font-weight:600;font-size:14px;padding:10px 24px;margin:0;cursor:pointer}.swal-button:not([disabled]):hover{background-color:#78cbf2}.swal-button:active{background-color:#70bce0}.swal-button:focus{outline:none;box-shadow:0 0 0 1px #fff,0 0 0 3px rgba(43,114,165,.29)}.swal-button[disabled]{opacity:.5;cursor:default}.swal-button::-moz-focus-inner{border:0}.swal-button--cancel{color:#555;background-color:#efefef}.swal-button--cancel:not([disabled]):hover{background-color:#e8e8e8}.swal-button--cancel:active{background-color:#d7d7d7}.swal-button--cancel:focus{box-shadow:0 0 0 1px #fff,0 0 0 3px rgba(116,136,150,.29)}.swal-button--danger{background-color:#e64942}.swal-button--danger:not([disabled]):hover{background-color:#df4740}.swal-button--danger:active{background-color:#cf423b}.swal-button--danger:focus{box-shadow:0 0 0 1px #fff,0 0 0 3px rgba(165,43,43,.29)}.swal-content{padding:0 20px;margin-top:20px;font-size:medium}.swal-content:last-child{margin-bottom:20px}.swal-content__input,.swal-content__textarea{-webkit-appearance:none;background-color:#fff;border:none;font-size:14px;display:block;box-sizing:border-box;width:100%;border:1px solid rgba(0,0,0,.14);padding:10px 13px;border-radius:2px;transition:border-color .2s}.swal-content__input:focus,.swal-content__textarea:focus{outline:none;border-color:#6db8ff}.swal-content__textarea{resize:vertical}.swal-button--loading{color:transparent}.swal-button--loading~.swal-button__loader{opacity:1}.swal-button__loader{position:absolute;height:auto;width:43px;z-index:2;left:50%;top:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);text-align:center;pointer-events:none;opacity:0}.swal-button__loader div{display:inline-block;float:none;vertical-align:baseline;width:9px;height:9px;padding:0;border:none;margin:2px;opacity:.4;border-radius:7px;background-color:hsla(0,0%,100%,.9);transition:background .2s;-webkit-animation:swal-loading-anim 1s infinite;animation:swal-loading-anim 1s infinite}.swal-button__loader div:nth-child(3n+2){-webkit-animation-delay:.15s;animation-delay:.15s}.swal-button__loader div:nth-child(3n+3){-webkit-animation-delay:.3s;animation-delay:.3s}@-webkit-keyframes swal-loading-anim{0%{opacity:.4}20%{opacity:.4}50%{opacity:1}to{opacity:.4}}@keyframes swal-loading-anim{0%{opacity:.4}20%{opacity:.4}50%{opacity:1}to{opacity:.4}}.swal-overlay{position:fixed;top:0;bottom:0;left:0;right:0;text-align:center;font-size:0;overflow-y:auto;background-color:rgba(0,0,0,.4);z-index:10000;pointer-events:none;opacity:0;transition:opacity .3s}.swal-overlay:before{content:" ";display:inline-block;vertical-align:middle;height:100%}.swal-overlay--show-modal{opacity:1;pointer-events:auto}.swal-overlay--show-modal .swal-modal{opacity:1;pointer-events:auto;box-sizing:border-box;-webkit-animation:showSweetAlert .3s;animation:showSweetAlert .3s;will-change:transform}.swal-modal{width:478px;opacity:0;pointer-events:none;background-color:#fff;text-align:center;border-radius:5px;position:static;margin:20px auto;display:inline-block;vertical-align:middle;-webkit-transform:scale(1);transform:scale(1);-webkit-transform-origin:50% 50%;transform-origin:50% 50%;z-index:10001;transition:opacity .2s,-webkit-transform .3s;transition:transform .3s,opacity .2s;transition:transform .3s,opacity .2s,-webkit-transform .3s}@media (max-width:500px){.swal-modal{width:calc(100% - 20px)}}@-webkit-keyframes showSweetAlert{0%{-webkit-transform:scale(1);transform:scale(1)}1%{-webkit-transform:scale(.5);transform:scale(.5)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}to{-webkit-transform:scale(1);transform:scale(1)}}@keyframes showSweetAlert{0%{-webkit-transform:scale(1);transform:scale(1)}1%{-webkit-transform:scale(.5);transform:scale(.5)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}to{-webkit-transform:scale(1);transform:scale(1)}}',""])},function(t,e){function n(t,e){var n=t[1]||"",r=t[3];if(!r)return n;if(e&&"function"==typeof btoa){var i=o(r);return[n].concat(r.sources.map(function(t){return"/*# sourceURL="+r.sourceRoot+t+" */"})).concat([i]).join("\n")}return[n].join("\n")}function o(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var o=n(e,t);return e[2]?"@media "+e[2]+"{"+o+"}":o}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},r=0;r<this.length;r++){var i=this[r][0];"number"==typeof i&&(o[i]=!0)}for(r=0;r<t.length;r++){var a=t[r];"number"==typeof a[0]&&o[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a))}},e}},function(t,e,n){function o(t,e){for(var n=0;n<t.length;n++){var o=t[n],r=m[o.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](o.parts[i]);for(;i<o.parts.length;i++)r.parts.push(u(o.parts[i],e))}else{for(var a=[],i=0;i<o.parts.length;i++)a.push(u(o.parts[i],e));m[o.id]={id:o.id,refs:1,parts:a}}}}function r(t,e){for(var n=[],o={},r=0;r<t.length;r++){var i=t[r],a=e.base?i[0]+e.base:i[0],s=i[1],c=i[2],l=i[3],u={css:s,media:c,sourceMap:l};o[a]?o[a].parts.push(u):n.push(o[a]={id:a,parts:[u]})}return n}function i(t,e){var n=v(t.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var o=w[w.length-1];if("top"===t.insertAt)o?o.nextSibling?n.insertBefore(e,o.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),w.push(e);else{if("bottom"!==t.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(e)}}function a(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=w.indexOf(t);e>=0&&w.splice(e,1)}function s(t){var e=document.createElement("style");return t.attrs.type="text/css",l(e,t.attrs),i(t,e),e}function c(t){var e=document.createElement("link");return t.attrs.type="text/css",t.attrs.rel="stylesheet",l(e,t.attrs),i(t,e),e}function l(t,e){Object.keys(e).forEach(function(n){t.setAttribute(n,e[n])})}function u(t,e){var n,o,r,i;if(e.transform&&t.css){if(!(i=e.transform(t.css)))return function(){};t.css=i}if(e.singleton){var l=h++;n=g||(g=s(e)),o=f.bind(null,n,l,!1),r=f.bind(null,n,l,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=c(e),o=p.bind(null,n,e),r=function(){a(n),n.href&&URL.revokeObjectURL(n.href)}):(n=s(e),o=d.bind(null,n),r=function(){a(n)});return o(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;o(t=e)}else r()}}function f(t,e,n,o){var r=n?"":o.css;if(t.styleSheet)t.styleSheet.cssText=x(e,r);else{var i=document.createTextNode(r),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(i,a[e]):t.appendChild(i)}}function d(t,e){var n=e.css,o=e.media;if(o&&t.setAttribute("media",o),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}function p(t,e,n){var o=n.css,r=n.sourceMap,i=void 0===e.convertToAbsoluteUrls&&r;(e.convertToAbsoluteUrls||i)&&(o=y(o)),r&&(o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var a=new Blob([o],{type:"text/css"}),s=t.href;t.href=URL.createObjectURL(a),s&&URL.revokeObjectURL(s)}var m={},b=function(t){var e;return function(){return void 0===e&&(e=t.apply(this,arguments)),e}}(function(){return window&&document&&document.all&&!window.atob}),v=function(t){var e={};return function(n){return void 0===e[n]&&(e[n]=t.call(this,n)),e[n]}}(function(t){return document.querySelector(t)}),g=null,h=0,w=[],y=n(15);t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");e=e||{},e.attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||(e.singleton=b()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var n=r(t,e);return o(n,e),function(t){for(var i=[],a=0;a<n.length;a++){var s=n[a],c=m[s.id];c.refs--,i.push(c)}if(t){o(r(t,e),e)}for(var a=0;a<i.length;a++){var c=i[a];if(0===c.refs){for(var l=0;l<c.parts.length;l++)c.parts[l]();delete m[c.id]}}}};var x=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var n=e.protocol+"//"+e.host,o=n+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var r=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});if(/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(r))return t;var i;return i=0===r.indexOf("//")?r:0===r.indexOf("/")?n+r:o+r.replace(/^\.\//,""),"url("+JSON.stringify(i)+")"})}},function(t,e,n){var o=n(17);"undefined"==typeof window||window.Promise||(window.Promise=o),n(21),String.prototype.includes||(String.prototype.includes=function(t,e){"use strict";return"number"!=typeof e&&(e=0),!(e+t.length>this.length)&&-1!==this.indexOf(t,e)}),Array.prototype.includes||Object.defineProperty(Array.prototype,"includes",{value:function(t,e){if(null==this)throw new TypeError('"this" is null or not defined');var n=Object(this),o=n.length>>>0;if(0===o)return!1;for(var r=0|e,i=Math.max(r>=0?r:o-Math.abs(r),0);i<o;){if(function(t,e){return t===e||"number"==typeof t&&"number"==typeof e&&isNaN(t)&&isNaN(e)}(n[i],t))return!0;i++}return!1}}),"undefined"!=typeof window&&function(t){t.forEach(function(t){t.hasOwnProperty("remove")||Object.defineProperty(t,"remove",{configurable:!0,enumerable:!0,writable:!0,value:function(){this.parentNode.removeChild(this)}})})}([Element.prototype,CharacterData.prototype,DocumentType.prototype])},function(t,e,n){(function(e){!function(n){function o(){}function r(t,e){return function(){t.apply(e,arguments)}}function i(t){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof t)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],f(t,this)}function a(t,e){for(;3===t._state;)t=t._value;if(0===t._state)return void t._deferreds.push(e);t._handled=!0,i._immediateFn(function(){var n=1===t._state?e.onFulfilled:e.onRejected;if(null===n)return void(1===t._state?s:c)(e.promise,t._value);var o;try{o=n(t._value)}catch(t){return void c(e.promise,t)}s(e.promise,o)})}function s(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if(e instanceof i)return t._state=3,t._value=e,void l(t);if("function"==typeof n)return void f(r(n,e),t)}t._state=1,t._value=e,l(t)}catch(e){c(t,e)}}function c(t,e){t._state=2,t._value=e,l(t)}function l(t){2===t._state&&0===t._deferreds.length&&i._immediateFn(function(){t._handled||i._unhandledRejectionFn(t._value)});for(var e=0,n=t._deferreds.length;e<n;e++)a(t,t._deferreds[e]);t._deferreds=null}function u(t,e,n){this.onFulfilled="function"==typeof t?t:null,this.onRejected="function"==typeof e?e:null,this.promise=n}function f(t,e){var n=!1;try{t(function(t){n||(n=!0,s(e,t))},function(t){n||(n=!0,c(e,t))})}catch(t){if(n)return;n=!0,c(e,t)}}var d=setTimeout;i.prototype.catch=function(t){return this.then(null,t)},i.prototype.then=function(t,e){var n=new this.constructor(o);return a(this,new u(t,e,n)),n},i.all=function(t){var e=Array.prototype.slice.call(t);return new i(function(t,n){function o(i,a){try{if(a&&("object"==typeof a||"function"==typeof a)){var s=a.then;if("function"==typeof s)return void s.call(a,function(t){o(i,t)},n)}e[i]=a,0==--r&&t(e)}catch(t){n(t)}}if(0===e.length)return t([]);for(var r=e.length,i=0;i<e.length;i++)o(i,e[i])})},i.resolve=function(t){return t&&"object"==typeof t&&t.constructor===i?t:new i(function(e){e(t)})},i.reject=function(t){return new i(function(e,n){n(t)})},i.race=function(t){return new i(function(e,n){for(var o=0,r=t.length;o<r;o++)t[o].then(e,n)})},i._immediateFn="function"==typeof e&&function(t){e(t)}||function(t){d(t,0)},i._unhandledRejectionFn=function(t){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",t)},i._setImmediateFn=function(t){i._immediateFn=t},i._setUnhandledRejectionFn=function(t){i._unhandledRejectionFn=t},void 0!==t&&t.exports?t.exports=i:n.Promise||(n.Promise=i)}(this)}).call(e,n(18).setImmediate)},function(t,e,n){function o(t,e){this._id=t,this._clearFn=e}var r=Function.prototype.apply;e.setTimeout=function(){return new o(r.call(setTimeout,window,arguments),clearTimeout)},e.setInterval=function(){return new o(r.call(setInterval,window,arguments),clearInterval)},e.clearTimeout=e.clearInterval=function(t){t&&t.close()},o.prototype.unref=o.prototype.ref=function(){},o.prototype.close=function(){this._clearFn.call(window,this._id)},e.enroll=function(t,e){clearTimeout(t._idleTimeoutId),t._idleTimeout=e},e.unenroll=function(t){clearTimeout(t._idleTimeoutId),t._idleTimeout=-1},e._unrefActive=e.active=function(t){clearTimeout(t._idleTimeoutId);var e=t._idleTimeout;e>=0&&(t._idleTimeoutId=setTimeout(function(){t._onTimeout&&t._onTimeout()},e))},n(19),e.setImmediate=setImmediate,e.clearImmediate=clearImmediate},function(t,e,n){(function(t,e){!function(t,n){"use strict";function o(t){"function"!=typeof t&&(t=new Function(""+t));for(var e=new Array(arguments.length-1),n=0;n<e.length;n++)e[n]=arguments[n+1];var o={callback:t,args:e};return l[c]=o,s(c),c++}function r(t){delete l[t]}function i(t){var e=t.callback,o=t.args;switch(o.length){case 0:e();break;case 1:e(o[0]);break;case 2:e(o[0],o[1]);break;case 3:e(o[0],o[1],o[2]);break;default:e.apply(n,o)}}function a(t){if(u)setTimeout(a,0,t);else{var e=l[t];if(e){u=!0;try{i(e)}finally{r(t),u=!1}}}}if(!t.setImmediate){var s,c=1,l={},u=!1,f=t.document,d=Object.getPrototypeOf&&Object.getPrototypeOf(t);d=d&&d.setTimeout?d:t,"[object process]"==={}.toString.call(t.process)?function(){s=function(t){e.nextTick(function(){a(t)})}}():function(){if(t.postMessage&&!t.importScripts){var e=!0,n=t.onmessage;return t.onmessage=function(){e=!1},t.postMessage("","*"),t.onmessage=n,e}}()?function(){var e="setImmediate$"+Math.random()+"$",n=function(n){n.source===t&&"string"==typeof n.data&&0===n.data.indexOf(e)&&a(+n.data.slice(e.length))};t.addEventListener?t.addEventListener("message",n,!1):t.attachEvent("onmessage",n),s=function(n){t.postMessage(e+n,"*")}}():t.MessageChannel?function(){var t=new MessageChannel;t.port1.onmessage=function(t){a(t.data)},s=function(e){t.port2.postMessage(e)}}():f&&"onreadystatechange"in f.createElement("script")?function(){var t=f.documentElement;s=function(e){var n=f.createElement("script");n.onreadystatechange=function(){a(e),n.onreadystatechange=null,t.removeChild(n),n=null},t.appendChild(n)}}():function(){s=function(t){setTimeout(a,0,t)}}(),d.setImmediate=o,d.clearImmediate=r}}("undefined"==typeof self?void 0===t?this:t:self)}).call(e,n(7),n(20))},function(t,e){function n(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function r(t){if(u===setTimeout)return setTimeout(t,0);if((u===n||!u)&&setTimeout)return u=setTimeout,setTimeout(t,0);try{return u(t,0)}catch(e){try{return u.call(null,t,0)}catch(e){return u.call(this,t,0)}}}function i(t){if(f===clearTimeout)return clearTimeout(t);if((f===o||!f)&&clearTimeout)return f=clearTimeout,clearTimeout(t);try{return f(t)}catch(e){try{return f.call(null,t)}catch(e){return f.call(this,t)}}}function a(){b&&p&&(b=!1,p.length?m=p.concat(m):v=-1,m.length&&s())}function s(){if(!b){var t=r(a);b=!0;for(var e=m.length;e;){for(p=m,m=[];++v<e;)p&&p[v].run();v=-1,e=m.length}p=null,b=!1,i(t)}}function c(t,e){this.fun=t,this.array=e}function l(){}var u,f,d=t.exports={};!function(){try{u="function"==typeof setTimeout?setTimeout:n}catch(t){u=n}try{f="function"==typeof clearTimeout?clearTimeout:o}catch(t){f=o}}();var p,m=[],b=!1,v=-1;d.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];m.push(new c(t,e)),1!==m.length||b||r(s)},c.prototype.run=function(){this.fun.apply(null,this.array)},d.title="browser",d.browser=!0,d.env={},d.argv=[],d.version="",d.versions={},d.on=l,d.addListener=l,d.once=l,d.off=l,d.removeListener=l,d.removeAllListeners=l,d.emit=l,d.prependListener=l,d.prependOnceListener=l,d.listeners=function(t){return[]},d.binding=function(t){throw new Error("process.binding is not supported")},d.cwd=function(){return"/"},d.chdir=function(t){throw new Error("process.chdir is not supported")},d.umask=function(){return 0}},function(t,e,n){"use strict";n(22).polyfill()},function(t,e,n){"use strict";function o(t,e){if(void 0===t||null===t)throw new TypeError("Cannot convert first argument to object");for(var n=Object(t),o=1;o<arguments.length;o++){var r=arguments[o];if(void 0!==r&&null!==r)for(var i=Object.keys(Object(r)),a=0,s=i.length;a<s;a++){var c=i[a],l=Object.getOwnPropertyDescriptor(r,c);void 0!==l&&l.enumerable&&(n[c]=r[c])}}return n}function r(){Object.assign||Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:o})}t.exports={assign:o,polyfill:r}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(24),r=n(6),i=n(5),a=n(36),s=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];if("undefined"!=typeof window){var n=a.getOpts.apply(void 0,t);return new Promise(function(t,e){i.default.promise={resolve:t,reject:e},o.default(n),setTimeout(function(){r.openModal()})})}};s.close=r.onAction,s.getState=r.getState,s.setActionValue=i.setActionValue,s.stopLoading=r.stopLoading,s.setDefaults=a.setDefaults,e.default=s},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(0),i=r.default.MODAL,a=n(4),s=n(34),c=n(35),l=n(1);e.init=function(t){o.getNode(i)||(document.body||l.throwErr("You can only use SweetAlert AFTER the DOM has loaded!"),s.default(),a.default()),a.initModalContent(t),c.default(t)},e.default=e.init},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),r=o.default.MODAL;e.modalMarkup='\n  <div class="'+r+'" role="dialog" aria-modal="true"></div>',e.default=e.modalMarkup},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),r=o.default.OVERLAY,i='<div \n    class="'+r+'"\n    tabIndex="-1">\n  </div>';e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),r=o.default.ICON;e.errorIconMarkup=function(){var t=r+"--error",e=t+"__line";return'\n    <div class="'+t+'__x-mark">\n      <span class="'+e+" "+e+'--left"></span>\n      <span class="'+e+" "+e+'--right"></span>\n    </div>\n  '},e.warningIconMarkup=function(){var t=r+"--warning";return'\n    <span class="'+t+'__body">\n      <span class="'+t+'__dot"></span>\n    </span>\n  '},e.successIconMarkup=function(){var t=r+"--success";return'\n    <span class="'+t+"__line "+t+'__line--long"></span>\n    <span class="'+t+"__line "+t+'__line--tip"></span>\n\n    <div class="'+t+'__ring"></div>\n    <div class="'+t+'__hide-corners"></div>\n  '}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),r=o.default.CONTENT;e.contentMarkup='\n  <div class="'+r+'">\n\n  </div>\n'},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),r=o.default.BUTTON_CONTAINER,i=o.default.BUTTON,a=o.default.BUTTON_LOADER;e.buttonMarkup='\n  <div class="'+r+'">\n\n    <button\n      class="'+i+'"\n    ></button>\n\n    <div class="'+a+'">\n      <div></div>\n      <div></div>\n      <div></div>\n    </div>\n\n  </div>\n'},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(4),r=n(2),i=n(0),a=i.default.ICON,s=i.default.ICON_CUSTOM,c=["error","warning","success","info"],l={error:r.errorIconMarkup(),warning:r.warningIconMarkup(),success:r.successIconMarkup()},u=function(t,e){var n=a+"--"+t;e.classList.add(n);var o=l[t];o&&(e.innerHTML=o)},f=function(t,e){e.classList.add(s);var n=document.createElement("img");n.src=t,e.appendChild(n)},d=function(t){if(t){var e=o.injectElIntoModal(r.iconMarkup);c.includes(t)?u(t,e):f(t,e)}};e.default=d},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(2),r=n(4),i=function(t){navigator.userAgent.includes("AppleWebKit")&&(t.style.display="none",t.offsetHeight,t.style.display="")};e.initTitle=function(t){if(t){var e=r.injectElIntoModal(o.titleMarkup);e.textContent=t,i(e)}},e.initText=function(t){if(t){var e=document.createDocumentFragment();t.split("\n").forEach(function(t,n,o){e.appendChild(document.createTextNode(t)),n<o.length-1&&e.appendChild(document.createElement("br"))});var n=r.injectElIntoModal(o.textMarkup);n.appendChild(e),i(n)}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(4),i=n(0),a=i.default.BUTTON,s=i.default.DANGER_BUTTON,c=n(3),l=n(2),u=n(6),f=n(5),d=function(t,e,n){var r=e.text,i=e.value,d=e.className,p=e.closeModal,m=o.stringToNode(l.buttonMarkup),b=m.querySelector("."+a),v=a+"--"+t;if(b.classList.add(v),d){(Array.isArray(d)?d:d.split(" ")).filter(function(t){return t.length>0}).forEach(function(t){b.classList.add(t)})}n&&t===c.CONFIRM_KEY&&b.classList.add(s),b.textContent=r;var g={};return g[t]=i,f.setActionValue(g),f.setActionOptionsFor(t,{closeModal:p}),b.addEventListener("click",function(){return u.onAction(t)}),m},p=function(t,e){var n=r.injectElIntoModal(l.footerMarkup);for(var o in t){var i=t[o],a=d(o,i,e);i.visible&&n.appendChild(a)}0===n.children.length&&n.remove()};e.default=p},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(3),r=n(4),i=n(2),a=n(5),s=n(6),c=n(0),l=c.default.CONTENT,u=function(t){t.addEventListener("input",function(t){var e=t.target,n=e.value;a.setActionValue(n)}),t.addEventListener("keyup",function(t){if("Enter"===t.key)return s.onAction(o.CONFIRM_KEY)}),setTimeout(function(){t.focus(),a.setActionValue("")},0)},f=function(t,e,n){var o=document.createElement(e),r=l+"__"+e;o.classList.add(r);for(var i in n){var a=n[i];o[i]=a}"input"===e&&u(o),t.appendChild(o)},d=function(t){if(t){var e=r.injectElIntoModal(i.contentMarkup),n=t.element,o=t.attributes;"string"==typeof n?f(e,n,o):e.appendChild(n)}};e.default=d},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(2),i=function(){var t=o.stringToNode(r.overlayMarkup);document.body.appendChild(t)};e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(5),r=n(6),i=n(1),a=n(3),s=n(0),c=s.default.MODAL,l=s.default.BUTTON,u=s.default.OVERLAY,f=function(t){t.preventDefault(),v()},d=function(t){t.preventDefault(),g()},p=function(t){if(o.default.isOpen)switch(t.key){case"Escape":return r.onAction(a.CANCEL_KEY)}},m=function(t){if(o.default.isOpen)switch(t.key){case"Tab":return f(t)}},b=function(t){if(o.default.isOpen)return"Tab"===t.key&&t.shiftKey?d(t):void 0},v=function(){var t=i.getNode(l);t&&(t.tabIndex=0,t.focus())},g=function(){var t=i.getNode(c),e=t.querySelectorAll("."+l),n=e.length-1,o=e[n];o&&o.focus()},h=function(t){t[t.length-1].addEventListener("keydown",m)},w=function(t){t[0].addEventListener("keydown",b)},y=function(){var t=i.getNode(c),e=t.querySelectorAll("."+l);e.length&&(h(e),w(e))},x=function(t){if(i.getNode(u)===t.target)return r.onAction(a.CANCEL_KEY)},_=function(t){var e=i.getNode(u);e.removeEventListener("click",x),t&&e.addEventListener("click",x)},k=function(t){o.default.timer&&clearTimeout(o.default.timer),t&&(o.default.timer=window.setTimeout(function(){return r.onAction(a.CANCEL_KEY)},t))},O=function(t){t.closeOnEsc?document.addEventListener("keyup",p):document.removeEventListener("keyup",p),t.dangerMode?v():g(),y(),_(t.closeOnClickOutside),k(t.timer)};e.default=O},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(3),i=n(37),a=n(38),s={title:null,text:null,icon:null,buttons:r.defaultButtonList,content:null,className:null,closeOnClickOutside:!0,closeOnEsc:!0,dangerMode:!1,timer:null},c=Object.assign({},s);e.setDefaults=function(t){c=Object.assign({},s,t)};var l=function(t){var e=t&&t.button,n=t&&t.buttons;return void 0!==e&&void 0!==n&&o.throwErr("Cannot set both 'button' and 'buttons' options!"),void 0!==e?{confirm:e}:n},u=function(t){return o.ordinalSuffixOf(t+1)},f=function(t,e){o.throwErr(u(e)+" argument ('"+t+"') is invalid")},d=function(t,e){var n=t+1,r=e[n];o.isPlainObject(r)||void 0===r||o.throwErr("Expected "+u(n)+" argument ('"+r+"') to be a plain object")},p=function(t,e){var n=t+1,r=e[n];void 0!==r&&o.throwErr("Unexpected "+u(n)+" argument ("+r+")")},m=function(t,e,n,r){var i=typeof e,a="string"===i,s=e instanceof Element;if(a){if(0===n)return{text:e};if(1===n)return{text:e,title:r[0]};if(2===n)return d(n,r),{icon:e};f(e,n)}else{if(s&&0===n)return d(n,r),{content:e};if(o.isPlainObject(e))return p(n,r),e;f(e,n)}};e.getOpts=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var n={};t.forEach(function(e,o){var r=m(0,e,o,t);Object.assign(n,r)});var o=l(n);n.buttons=r.getButtonListOpts(o),delete n.button,n.content=i.getContentOpts(n.content);var u=Object.assign({},s,c,n);return Object.keys(u).forEach(function(t){a.DEPRECATED_OPTS[t]&&a.logDeprecation(t)}),u}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r={element:"input",attributes:{placeholder:""}};e.getContentOpts=function(t){var e={};return o.isPlainObject(t)?Object.assign(e,t):t instanceof Element?{element:t}:"input"===t?r:null}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.logDeprecation=function(t){var n=e.DEPRECATED_OPTS[t],o=n.onlyRename,r=n.replacement,i=n.subOption,a=n.link,s=o?"renamed":"deprecated",c='SweetAlert warning: "'+t+'" option has been '+s+".";if(r){c+=" Please use"+(i?' "'+i+'" in ':" ")+'"'+r+'" instead.'}var l="https://sweetalert.js.org";c+=a?" More details: "+l+a:" More details: "+l+"/guides/#upgrading-from-1x",console.warn(c)},e.DEPRECATED_OPTS={type:{replacement:"icon",link:"/docs/#icon"},imageUrl:{replacement:"icon",link:"/docs/#icon"},customClass:{replacement:"className",onlyRename:!0,link:"/docs/#classname"},imageSize:{},showCancelButton:{replacement:"buttons",link:"/docs/#buttons"},showConfirmButton:{replacement:"button",link:"/docs/#button"},confirmButtonText:{replacement:"button",link:"/docs/#button"},confirmButtonColor:{},cancelButtonText:{replacement:"buttons",link:"/docs/#buttons"},closeOnConfirm:{replacement:"button",subOption:"closeModal",link:"/docs/#button"},closeOnCancel:{replacement:"buttons",subOption:"closeModal",link:"/docs/#buttons"},showLoaderOnConfirm:{replacement:"buttons"},animation:{},inputType:{replacement:"content",link:"/docs/#content"},inputValue:{replacement:"content",link:"/docs/#content"},inputPlaceholder:{replacement:"content",link:"/docs/#content"},html:{replacement:"content",link:"/docs/#content"},allowEscapeKey:{replacement:"closeOnEsc",onlyRename:!0,link:"/docs/#closeonesc"},allowClickOutside:{replacement:"closeOnClickOutside",onlyRename:!0,link:"/docs/#closeonclickoutside"}}}])});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(21).setImmediate, __webpack_require__(21).clearImmediate))

/***/ }),
/* 35 */,
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*!
  * vue-router v3.0.2
  * (c) 2018 Evan You
  * @license MIT
  */
/*  */

function assert (condition, message) {
  if (!condition) {
    throw new Error(("[vue-router] " + message))
  }
}

function warn (condition, message) {
  if (false) {
    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
  }
}

function isError (err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1
}

function extend (a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a
}

var View = {
  name: 'RouterView',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render (_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    // used by devtools to display a router-view badge
    data.routerView = true;

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent && parent._routerRoot !== parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      if (parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      return h(cache[name], data, children)
    }

    var matched = route.matched[depth];
    // render empty node if no matched route
    if (!matched) {
      cache[name] = null;
      return h()
    }

    var component = cache[name] = matched.components[name];

    // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks
    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];
      if (
        (val && current !== vm) ||
        (!val && current === vm)
      ) {
        matched.instances[name] = val;
      }
    }

    // also register instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    };

    // resolve props
    var propsToPass = data.props = resolveProps(route, matched.props && matched.props[name]);
    if (propsToPass) {
      // clone to prevent mutation
      propsToPass = data.props = extend({}, propsToPass);
      // pass non-declared props as attrs
      var attrs = data.attrs = data.attrs || {};
      for (var key in propsToPass) {
        if (!component.props || !(key in component.props)) {
          attrs[key] = propsToPass[key];
          delete propsToPass[key];
        }
      }
    }

    return h(component, data, children)
  }
}

function resolveProps (route, config) {
  switch (typeof config) {
    case 'undefined':
      return
    case 'object':
      return config
    case 'function':
      return config(route)
    case 'boolean':
      return config ? route.params : undefined
    default:
      if (false) {
        warn(
          false,
          "props in \"" + (route.path) + "\" is a " + (typeof config) + ", " +
          "expecting an object, function or boolean."
        );
      }
  }
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function (str) { return encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ','); };

var decode = decodeURIComponent;

function resolveQuery (
  query,
  extraQuery,
  _parseQuery
) {
  if ( extraQuery === void 0 ) extraQuery = {};

  var parse = _parseQuery || parseQuery;
  var parsedQuery;
  try {
    parsedQuery = parse(query || '');
  } catch (e) {
    "production" !== 'production' && warn(false, e.message);
    parsedQuery = {};
  }
  for (var key in extraQuery) {
    parsedQuery[key] = extraQuery[key];
  }
  return parsedQuery
}

function parseQuery (query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0
      ? decode(parts.join('='))
      : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res
}

function stringifyQuery (obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return encode(key)
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&')
    }

    return encode(key) + '=' + encode(val)
  }).filter(function (x) { return x.length > 0; }).join('&') : null;
  return res ? ("?" + res) : ''
}

/*  */

var trailingSlashRE = /\/?$/;

function createRoute (
  record,
  location,
  redirectedFrom,
  router
) {
  var stringifyQuery$$1 = router && router.options.stringifyQuery;

  var query = location.query || {};
  try {
    query = clone(query);
  } catch (e) {}

  var route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery$$1),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery$$1);
  }
  return Object.freeze(route)
}

function clone (value) {
  if (Array.isArray(value)) {
    return value.map(clone)
  } else if (value && typeof value === 'object') {
    var res = {};
    for (var key in value) {
      res[key] = clone(value[key]);
    }
    return res
  } else {
    return value
  }
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch (record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res
}

function getFullPath (
  ref,
  _stringifyQuery
) {
  var path = ref.path;
  var query = ref.query; if ( query === void 0 ) query = {};
  var hash = ref.hash; if ( hash === void 0 ) hash = '';

  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash
}

function isSameRoute (a, b) {
  if (b === START) {
    return a === b
  } else if (!b) {
    return false
  } else if (a.path && b.path) {
    return (
      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query)
    )
  } else if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query) &&
      isObjectEqual(a.params, b.params)
    )
  } else {
    return false
  }
}

function isObjectEqual (a, b) {
  if ( a === void 0 ) a = {};
  if ( b === void 0 ) b = {};

  // handle null value #1566
  if (!a || !b) { return a === b }
  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key];
    // check nested equality
    if (typeof aVal === 'object' && typeof bVal === 'object') {
      return isObjectEqual(aVal, bVal)
    }
    return String(aVal) === String(bVal)
  })
}

function isIncludedRoute (current, target) {
  return (
    current.path.replace(trailingSlashRE, '/').indexOf(
      target.path.replace(trailingSlashRE, '/')
    ) === 0 &&
    (!target.hash || current.hash === target.hash) &&
    queryIncludes(current.query, target.query)
  )
}

function queryIncludes (current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false
    }
  }
  return true
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var Link = {
  name: 'RouterLink',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render (h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(this.to, current, this.append);
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;

    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass;
    // Support global empty active class
    var activeClassFallback = globalActiveClass == null
      ? 'router-link-active'
      : globalActiveClass;
    var exactActiveClassFallback = globalExactActiveClass == null
      ? 'router-link-exact-active'
      : globalExactActiveClass;
    var activeClass = this.activeClass == null
      ? activeClassFallback
      : this.activeClass;
    var exactActiveClass = this.exactActiveClass == null
      ? exactActiveClassFallback
      : this.exactActiveClass;
    var compareTarget = location.path
      ? createRoute(null, location, null, router)
      : route;

    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact
      ? classes[exactActiveClass]
      : isIncludedRoute(current, compareTarget);

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location);
        } else {
          router.push(location);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) { on[e] = handler; });
    } else {
      on[this.event] = handler;
    }

    var data = {
      class: classes
    };

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var aData = a.data = extend({}, a.data);
        aData.on = on;
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default)
  }
}

function guardEvent (e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) { return }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) { return }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) { return }
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');
    if (/\b_blank\b/i.test(target)) { return }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true
}

function findAnchor (children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}

var _Vue;

function install (Vue) {
  if (install.installed && _Vue === Vue) { return }
  install.installed = true;

  _Vue = Vue;

  var isDef = function (v) { return v !== undefined; };

  var registerInstance = function (vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed () {
      registerInstance(this);
    }
  });

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return this._routerRoot._router }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get () { return this._routerRoot._route }
  });

  Vue.component('RouterView', View);
  Vue.component('RouterLink', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function resolvePath (
  relative,
  base,
  append
) {
  var firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/')
}

function parsePath (path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  }
}

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}
pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

/*  */

// $flow-disable-line
var regexpCompileCache = Object.create(null);

function fillParams (
  path,
  params,
  routeMsg
) {
  try {
    var filler =
      regexpCompileCache[path] ||
      (regexpCompileCache[path] = pathToRegexp_1.compile(path));
    return filler(params || {}, { pretty: true })
  } catch (e) {
    if (false) {
      warn(false, ("missing param for " + routeMsg + ": " + (e.message)));
    }
    return ''
  }
}

/*  */

function createRouteMap (
  routes,
  oldPathList,
  oldPathMap,
  oldNameMap
) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || [];
  // $flow-disable-line
  var pathMap = oldPathMap || Object.create(null);
  // $flow-disable-line
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  });

  // ensure wildcard routes are always at the end
  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  }
}

function addRouteRecord (
  pathList,
  pathMap,
  nameMap,
  route,
  parent,
  matchAs
) {
  var path = route.path;
  var name = route.name;
  if (false) {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(
      typeof route.component !== 'string',
      "route config \"component\" for path: " + (String(path || name)) + " cannot be a " +
      "string id. Use an actual component instead."
    );
  }

  var pathToRegexpOptions = route.pathToRegexpOptions || {};
  var normalizedPath = normalizePath(
    path,
    parent,
    pathToRegexpOptions.strict
  );

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null
      ? {}
      : route.components
        ? route.props
        : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (false) {
      if (route.name && !route.redirect && route.children.some(function (child) { return /^\/?$/.test(child.path); })) {
        warn(
          false,
          "Named Route '" + (route.name) + "' has a default child route. " +
          "When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), " +
          "the default child route will not be rendered. Remove the name from " +
          "this route and use the name of the default child route for named " +
          "links instead."
        );
      }
    }
    route.children.forEach(function (child) {
      var childMatchAs = matchAs
        ? cleanPath((matchAs + "/" + (child.path)))
        : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias)
      ? route.alias
      : [route.alias];

    aliases.forEach(function (alias) {
      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(
        pathList,
        pathMap,
        nameMap,
        aliasRoute,
        parent,
        record.path || '/' // matchAs
      );
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if (false) {
      warn(
        false,
        "Duplicate named routes definition: " +
        "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
      );
    }
  }
}

function compileRouteRegex (path, pathToRegexpOptions) {
  var regex = pathToRegexp_1(path, [], pathToRegexpOptions);
  if (false) {
    var keys = Object.create(null);
    regex.keys.forEach(function (key) {
      warn(!keys[key.name], ("Duplicate param keys in route with path: \"" + path + "\""));
      keys[key.name] = true;
    });
  }
  return regex
}

function normalizePath (path, parent, strict) {
  if (!strict) { path = path.replace(/\/$/, ''); }
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath(((parent.path) + "/" + path))
}

/*  */

function normalizeLocation (
  raw,
  current,
  append,
  router
) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next.name || next._normalized) {
    return next
  }

  // relative params
  if (!next.path && next.params && current) {
    next = extend({}, next);
    next._normalized = true;
    var params = extend(extend({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, ("path " + (current.path)));
    } else if (false) {
      warn(false, "relative params navigation requires a current route.");
    }
    return next
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = (current && current.path) || '/';
  var path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : basePath;

  var query = resolveQuery(
    parsedPath.query,
    next.query,
    router && router.options.parseQuery
  );

  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  }
}

/*  */



function createMatcher (
  routes,
  router
) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes (routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match (
    raw,
    currentRoute,
    redirectedFrom
  ) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (false) {
        warn(record, ("Route with name '" + name + "' does not exist"));
      }
      if (!record) { return _createRoute(null, location) }
      var paramNames = record.regex.keys
        .filter(function (key) { return !key.optional; })
        .map(function (key) { return key.name; });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      if (record) {
        location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
        return _createRoute(record, location, redirectedFrom)
      }
    } else if (location.path) {
      location.params = {};
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

  function redirect (
    record,
    location
  ) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function'
      ? originalRedirect(createRoute(record, location, null, router))
      : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || typeof redirect !== 'object') {
      if (false) {
        warn(
          false, ("invalid redirect option: " + (JSON.stringify(redirect)))
        );
      }
      return _createRoute(null, location)
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (false) {
        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."));
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location)
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location)
    } else {
      if (false) {
        warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
      }
      return _createRoute(null, location)
    }
  }

  function alias (
    record,
    location,
    matchAs
  ) {
    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }

  function _createRoute (
    record,
    location,
    redirectedFrom
  ) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom, router)
  }

  return {
    match: match,
    addRoutes: addRoutes
  }
}

function matchRoute (
  regex,
  path,
  params
) {
  var m = path.match(regex);

  if (!m) {
    return false
  } else if (!params) {
    return true
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) {
      // Fix #1994: using * with props: true generates a param named 0
      params[key.name || 'pathMatch'] = val;
    }
  }

  return true
}

function resolveRecordPath (path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true)
}

/*  */

var positionStore = Object.create(null);

function setupScroll () {
  // Fix for #1585 for Firefox
  // Fix for #2195 Add optional third attribute to workaround a bug in safari https://bugs.webkit.org/show_bug.cgi?id=182678
  window.history.replaceState({ key: getStateKey() }, '', window.location.href.replace(window.location.origin, ''));
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll (
  router,
  to,
  from,
  isPop
) {
  if (!router.app) {
    return
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return
  }

  if (false) {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior.call(router, to, from, isPop ? position : null);

    if (!shouldScroll) {
      return
    }

    if (typeof shouldScroll.then === 'function') {
      shouldScroll.then(function (shouldScroll) {
        scrollToPosition((shouldScroll), position);
      }).catch(function (err) {
        if (false) {
          assert(false, err.toString());
        }
      });
    } else {
      scrollToPosition(shouldScroll, position);
    }
  });
}

function saveScrollPosition () {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition () {
  var key = getStateKey();
  if (key) {
    return positionStore[key]
  }
}

function getElementPosition (el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  }
}

function isValidPosition (obj) {
  return isNumber(obj.x) || isNumber(obj.y)
}

function normalizePosition (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  }
}

function normalizeOffset (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  }
}

function isNumber (v) {
  return typeof v === 'number'
}

function scrollToPosition (shouldScroll, position) {
  var isObject = typeof shouldScroll === 'object';
  if (isObject && typeof shouldScroll.selector === 'string') {
    var el = document.querySelector(shouldScroll.selector);
    if (el) {
      var offset = shouldScroll.offset && typeof shouldScroll.offset === 'object' ? shouldScroll.offset : {};
      offset = normalizeOffset(offset);
      position = getElementPosition(el, offset);
    } else if (isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }
  } else if (isObject && isValidPosition(shouldScroll)) {
    position = normalizePosition(shouldScroll);
  }

  if (position) {
    window.scrollTo(position.x, position.y);
  }
}

/*  */

var supportsPushState = inBrowser && (function () {
  var ua = window.navigator.userAgent;

  if (
    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
    ua.indexOf('Mobile Safari') !== -1 &&
    ua.indexOf('Chrome') === -1 &&
    ua.indexOf('Windows Phone') === -1
  ) {
    return false
  }

  return window.history && 'pushState' in window.history
})();

// use User Timing api (if present) for more accurate key precision
var Time = inBrowser && window.performance && window.performance.now
  ? window.performance
  : Date;

var _key = genKey();

function genKey () {
  return Time.now().toFixed(3)
}

function getStateKey () {
  return _key
}

function setStateKey (key) {
  _key = key;
}

function pushState (url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url);
    } else {
      _key = genKey();
      history.pushState({ key: _key }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState (url) {
  pushState(url, true);
}

/*  */

function runQueue (queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */

function resolveAsyncComponents (matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;

    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;

        var resolve = once(function (resolvedDef) {
          if (isESModule(resolvedDef)) {
            resolvedDef = resolvedDef.default;
          }
          // save resolved on async factory in case it's used elsewhere
          def.resolved = typeof resolvedDef === 'function'
            ? resolvedDef
            : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;
          if (pending <= 0) {
            next();
          }
        });

        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
          "production" !== 'production' && warn(false, msg);
          if (!error) {
            error = isError(reason)
              ? reason
              : new Error(msg);
            next(error);
          }
        });

        var res;
        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }
        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;
            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) { next(); }
  }
}

function flatMapComponents (
  matched,
  fn
) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) { return fn(
      m.components[key],
      m.instances[key],
      m, key
    ); })
  }))
}

function flatten (arr) {
  return Array.prototype.concat.apply([], arr)
}

var hasSymbol =
  typeof Symbol === 'function' &&
  typeof Symbol.toStringTag === 'symbol';

function isESModule (obj) {
  return obj.__esModule || (hasSymbol && obj[Symbol.toStringTag] === 'Module')
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once (fn) {
  var called = false;
  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    if (called) { return }
    called = true;
    return fn.apply(this, args)
  }
}

/*  */

var History = function History (router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
};

History.prototype.listen = function listen (cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady (cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError (errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo (location, onComplete, onAbort) {
    var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(route, function () {
    this$1.updateRoute(route);
    onComplete && onComplete(route);
    this$1.ensureURL();

    // fire ready cbs once
    if (!this$1.ready) {
      this$1.ready = true;
      this$1.readyCbs.forEach(function (cb) { cb(route); });
    }
  }, function (err) {
    if (onAbort) {
      onAbort(err);
    }
    if (err && !this$1.ready) {
      this$1.ready = true;
      this$1.readyErrorCbs.forEach(function (cb) { cb(err); });
    }
  });
};

History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
    var this$1 = this;

  var current = this.current;
  var abort = function (err) {
    if (isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) { cb(err); });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }
    onAbort && onAbort(err);
  };
  if (
    isSameRoute(route, current) &&
    // in the case the route map has been dynamically appended to
    route.matched.length === current.matched.length
  ) {
    this.ensureURL();
    return abort()
  }

  var ref = resolveQueue(this.current.matched, route.matched);
    var updated = ref.updated;
    var deactivated = ref.deactivated;
    var activated = ref.activated;

  var queue = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // in-component update hooks
    extractUpdateHooks(updated),
    // in-config enter guards
    activated.map(function (m) { return m.beforeEnter; }),
    // async components
    resolveAsyncComponents(activated)
  );

  this.pending = route;
  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort()
    }
    try {
      hook(route, current, function (to) {
        if (to === false || isError(to)) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(to);
        } else if (
          typeof to === 'string' ||
          (typeof to === 'object' && (
            typeof to.path === 'string' ||
            typeof to.name === 'string'
          ))
        ) {
          // next('/') or next({ path: '/' }) -> redirect
          abort();
          if (typeof to === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function () { return this$1.current === route; };
    // wait until async components are resolved before
    // extracting in-component enter guards
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort()
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) { cb(); });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute (route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase (base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = (baseEl && baseEl.getAttribute('href')) || '/';
      // strip full URL origin
      base = base.replace(/^https?:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}

function resolveQueue (
  current,
  next
) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}

function extractGuards (
  records,
  name,
  bind,
  reverse
) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(function (guard) { return bind(guard, instance, match, key); })
        : bind(guard, instance, match, key)
    }
  });
  return flatten(reverse ? guards.reverse() : guards)
}

function extractGuard (
  def,
  key
) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key]
}

function extractLeaveGuards (deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
}

function extractUpdateHooks (updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
}

function bindGuard (guard, instance) {
  if (instance) {
    return function boundRouteGuard () {
      return guard.apply(instance, arguments)
    }
  }
}

function extractEnterGuards (
  activated,
  cbs,
  isValid
) {
  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
    return bindEnterGuard(guard, match, key, cbs, isValid)
  })
}

function bindEnterGuard (
  guard,
  match,
  key,
  cbs,
  isValid
) {
  return function routeEnterGuard (to, from, next) {
    return guard(to, from, function (cb) {
      next(cb);
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
    })
  }
}

function poll (
  cb, // somehow flow cannot infer this is a function
  instances,
  key,
  isValid
) {
  if (
    instances[key] &&
    !instances[key]._isBeingDestroyed // do not reuse being destroyed instance
  ) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

/*  */

var HTML5History = (function (History$$1) {
  function HTML5History (router, base) {
    var this$1 = this;

    History$$1.call(this, router, base);

    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    var initLocation = getLocation(this.base);
    window.addEventListener('popstate', function (e) {
      var current = this$1.current;

      // Avoiding first `popstate` event dispatched in some browsers but first
      // history route not updated since async guard at the same time.
      var location = getLocation(this$1.base);
      if (this$1.current === START && location === initLocation) {
        return
      }

      this$1.transitionTo(location, function (route) {
        if (supportsScroll) {
          handleScroll(router, route, current, true);
        }
      });
    });
  }

  if ( History$$1 ) HTML5History.__proto__ = History$$1;
  HTML5History.prototype = Object.create( History$$1 && History$$1.prototype );
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go (n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL (push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
    return getLocation(this.base)
  };

  return HTML5History;
}(History));

function getLocation (base) {
  var path = decodeURI(window.location.pathname);
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash
}

/*  */

var HashHistory = (function (History$$1) {
  function HashHistory (router, base, fallback) {
    History$$1.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return
    }
    ensureSlash();
  }

  if ( History$$1 ) HashHistory.__proto__ = History$$1;
  HashHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners () {
    var this$1 = this;

    var router = this.router;
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    window.addEventListener(supportsPushState ? 'popstate' : 'hashchange', function () {
      var current = this$1.current;
      if (!ensureSlash()) {
        return
      }
      this$1.transitionTo(getHash(), function (route) {
        if (supportsScroll) {
          handleScroll(this$1.router, route, current, true);
        }
        if (!supportsPushState) {
          replaceHash(route.fullPath);
        }
      });
    });
  };

  HashHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.go = function go (n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL (push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    return getHash()
  };

  return HashHistory;
}(History));

function checkFallback (base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(
      cleanPath(base + '/#' + location)
    );
    return true
  }
}

function ensureSlash () {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true
  }
  replaceHash('/' + path);
  return false
}

function getHash () {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  return index === -1 ? '' : decodeURI(href.slice(index + 1))
}

function getUrl (path) {
  var href = window.location.href;
  var i = href.indexOf('#');
  var base = i >= 0 ? href.slice(0, i) : href;
  return (base + "#" + path)
}

function pushHash (path) {
  if (supportsPushState) {
    pushState(getUrl(path));
  } else {
    window.location.hash = path;
  }
}

function replaceHash (path) {
  if (supportsPushState) {
    replaceState(getUrl(path));
  } else {
    window.location.replace(getUrl(path));
  }
}

/*  */

var AbstractHistory = (function (History$$1) {
  function AbstractHistory (router, base) {
    History$$1.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if ( History$$1 ) AbstractHistory.__proto__ = History$$1;
  AbstractHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
      this$1.index++;
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.go = function go (n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(route, function () {
      this$1.index = targetIndex;
      this$1.updateRoute(route);
    });
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/'
  };

  AbstractHistory.prototype.ensureURL = function ensureURL () {
    // noop
  };

  return AbstractHistory;
}(History));

/*  */



var VueRouter = function VueRouter (options) {
  if ( options === void 0 ) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break
    default:
      if (false) {
        assert(false, ("invalid mode: " + mode));
      }
  }
};

var prototypeAccessors = { currentRoute: { configurable: true } };

VueRouter.prototype.match = function match (
  raw,
  current,
  redirectedFrom
) {
  return this.matcher.match(raw, current, redirectedFrom)
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current
};

VueRouter.prototype.init = function init (app /* Vue component instance */) {
    var this$1 = this;

  "production" !== 'production' && assert(
    install.installed,
    "not installed. Make sure to call `Vue.use(VueRouter)` " +
    "before creating root instance."
  );

  this.apps.push(app);

  // main app already initialized.
  if (this.app) {
    return
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function () {
      history.setupListeners();
    };
    history.transitionTo(
      history.getCurrentLocation(),
      setupHashListener,
      setupHashListener
    );
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach (fn) {
  return registerHook(this.beforeHooks, fn)
};

VueRouter.prototype.beforeResolve = function beforeResolve (fn) {
  return registerHook(this.resolveHooks, fn)
};

VueRouter.prototype.afterEach = function afterEach (fn) {
  return registerHook(this.afterHooks, fn)
};

VueRouter.prototype.onReady = function onReady (cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError (errorCb) {
  this.history.onError(errorCb);
};

VueRouter.prototype.push = function push (location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort);
};

VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
  this.history.replace(location, onComplete, onAbort);
};

VueRouter.prototype.go = function go (n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back () {
  this.go(-1);
};

VueRouter.prototype.forward = function forward () {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
  var route = to
    ? to.matched
      ? to
      : this.resolve(to).route
    : this.currentRoute;
  if (!route) {
    return []
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key]
    })
  }))
};

VueRouter.prototype.resolve = function resolve (
  to,
  current,
  append
) {
  var location = normalizeLocation(
    to,
    current || this.history.current,
    append,
    this
  );
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  }
};

VueRouter.prototype.addRoutes = function addRoutes (routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties( VueRouter.prototype, prototypeAccessors );

function registerHook (list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) { list.splice(i, 1); }
  }
}

function createHref (base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path
}

VueRouter.install = install;
VueRouter.version = '3.0.2';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

/* harmony default export */ __webpack_exports__["a"] = (VueRouter);


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_cacheDirectory_node_modules_vue_loader_lib_selector_type_script_index_0_LessonsListComponent_vue__ = __webpack_require__(64);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_782b7436_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_LessonsListComponent_vue__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_cacheDirectory_node_modules_vue_loader_lib_selector_type_script_index_0_LessonsListComponent_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_782b7436_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_LessonsListComponent_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_782b7436_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_LessonsListComponent_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

if (true) {
  module.exports = __webpack_require__(43)
} else {
  module.exports = require('./vue.common.dev.js')
}


/***/ }),
/* 42 */,
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*!
 * Vue.js v2.6.6
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
var e=Object.freeze({});function t(e){return null==e}function n(e){return null!=e}function r(e){return!0===e}function i(e){return"string"==typeof e||"number"==typeof e||"symbol"==typeof e||"boolean"==typeof e}function o(e){return null!==e&&"object"==typeof e}var a=Object.prototype.toString;function s(e){return"[object Object]"===a.call(e)}function c(e){var t=parseFloat(String(e));return t>=0&&Math.floor(t)===t&&isFinite(e)}function u(e){return n(e)&&"function"==typeof e.then&&"function"==typeof e.catch}function l(e){return null==e?"":Array.isArray(e)||s(e)&&e.toString===a?JSON.stringify(e,null,2):String(e)}function f(e){var t=parseFloat(e);return isNaN(t)?e:t}function p(e,t){for(var n=Object.create(null),r=e.split(","),i=0;i<r.length;i++)n[r[i]]=!0;return t?function(e){return n[e.toLowerCase()]}:function(e){return n[e]}}var d=p("slot,component",!0),v=p("key,ref,slot,slot-scope,is");function h(e,t){if(e.length){var n=e.indexOf(t);if(n>-1)return e.splice(n,1)}}var m=Object.prototype.hasOwnProperty;function y(e,t){return m.call(e,t)}function g(e){var t=Object.create(null);return function(n){return t[n]||(t[n]=e(n))}}var _=/-(\w)/g,b=g(function(e){return e.replace(_,function(e,t){return t?t.toUpperCase():""})}),$=g(function(e){return e.charAt(0).toUpperCase()+e.slice(1)}),w=/\B([A-Z])/g,x=g(function(e){return e.replace(w,"-$1").toLowerCase()});var C=Function.prototype.bind?function(e,t){return e.bind(t)}:function(e,t){function n(n){var r=arguments.length;return r?r>1?e.apply(t,arguments):e.call(t,n):e.call(t)}return n._length=e.length,n};function A(e,t){t=t||0;for(var n=e.length-t,r=new Array(n);n--;)r[n]=e[n+t];return r}function k(e,t){for(var n in t)e[n]=t[n];return e}function O(e){for(var t={},n=0;n<e.length;n++)e[n]&&k(t,e[n]);return t}function S(e,t,n){}var T=function(e,t,n){return!1},E=function(e){return e};function N(e,t){if(e===t)return!0;var n=o(e),r=o(t);if(!n||!r)return!n&&!r&&String(e)===String(t);try{var i=Array.isArray(e),a=Array.isArray(t);if(i&&a)return e.length===t.length&&e.every(function(e,n){return N(e,t[n])});if(e instanceof Date&&t instanceof Date)return e.getTime()===t.getTime();if(i||a)return!1;var s=Object.keys(e),c=Object.keys(t);return s.length===c.length&&s.every(function(n){return N(e[n],t[n])})}catch(e){return!1}}function j(e,t){for(var n=0;n<e.length;n++)if(N(e[n],t))return n;return-1}function L(e){var t=!1;return function(){t||(t=!0,e.apply(this,arguments))}}var M="data-server-rendered",I=["component","directive","filter"],D=["beforeCreate","created","beforeMount","mounted","beforeUpdate","updated","beforeDestroy","destroyed","activated","deactivated","errorCaptured","serverPrefetch"],P={optionMergeStrategies:Object.create(null),silent:!1,productionTip:!1,devtools:!1,performance:!1,errorHandler:null,warnHandler:null,ignoredElements:[],keyCodes:Object.create(null),isReservedTag:T,isReservedAttr:T,isUnknownElement:T,getTagNamespace:S,parsePlatformTagName:E,mustUseProp:T,async:!0,_lifecycleHooks:D};function R(e,t,n,r){Object.defineProperty(e,t,{value:n,enumerable:!!r,writable:!0,configurable:!0})}var F=new RegExp("[^a-zA-Z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c-\u200d\u203f-\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd.$_\\d]");var H,B="__proto__"in{},U="undefined"!=typeof window,z="undefined"!=typeof WXEnvironment&&!!WXEnvironment.platform,V=z&&WXEnvironment.platform.toLowerCase(),K=U&&window.navigator.userAgent.toLowerCase(),J=K&&/msie|trident/.test(K),q=K&&K.indexOf("msie 9.0")>0,W=K&&K.indexOf("edge/")>0,Z=(K&&K.indexOf("android"),K&&/iphone|ipad|ipod|ios/.test(K)||"ios"===V),G=(K&&/chrome\/\d+/.test(K),K&&/phantomjs/.test(K),K&&K.match(/firefox\/(\d+)/)),X={}.watch,Y=!1;if(U)try{var Q={};Object.defineProperty(Q,"passive",{get:function(){Y=!0}}),window.addEventListener("test-passive",null,Q)}catch(e){}var ee=function(){return void 0===H&&(H=!U&&!z&&"undefined"!=typeof global&&(global.process&&"server"===global.process.env.VUE_ENV)),H},te=U&&window.__VUE_DEVTOOLS_GLOBAL_HOOK__;function ne(e){return"function"==typeof e&&/native code/.test(e.toString())}var re,ie="undefined"!=typeof Symbol&&ne(Symbol)&&"undefined"!=typeof Reflect&&ne(Reflect.ownKeys);re="undefined"!=typeof Set&&ne(Set)?Set:function(){function e(){this.set=Object.create(null)}return e.prototype.has=function(e){return!0===this.set[e]},e.prototype.add=function(e){this.set[e]=!0},e.prototype.clear=function(){this.set=Object.create(null)},e}();var oe=S,ae=0,se=function(){this.id=ae++,this.subs=[]};se.prototype.addSub=function(e){this.subs.push(e)},se.prototype.removeSub=function(e){h(this.subs,e)},se.prototype.depend=function(){se.target&&se.target.addDep(this)},se.prototype.notify=function(){for(var e=this.subs.slice(),t=0,n=e.length;t<n;t++)e[t].update()},se.target=null;var ce=[];function ue(e){ce.push(e),se.target=e}function le(){ce.pop(),se.target=ce[ce.length-1]}var fe=function(e,t,n,r,i,o,a,s){this.tag=e,this.data=t,this.children=n,this.text=r,this.elm=i,this.ns=void 0,this.context=o,this.fnContext=void 0,this.fnOptions=void 0,this.fnScopeId=void 0,this.key=t&&t.key,this.componentOptions=a,this.componentInstance=void 0,this.parent=void 0,this.raw=!1,this.isStatic=!1,this.isRootInsert=!0,this.isComment=!1,this.isCloned=!1,this.isOnce=!1,this.asyncFactory=s,this.asyncMeta=void 0,this.isAsyncPlaceholder=!1},pe={child:{configurable:!0}};pe.child.get=function(){return this.componentInstance},Object.defineProperties(fe.prototype,pe);var de=function(e){void 0===e&&(e="");var t=new fe;return t.text=e,t.isComment=!0,t};function ve(e){return new fe(void 0,void 0,void 0,String(e))}function he(e){var t=new fe(e.tag,e.data,e.children&&e.children.slice(),e.text,e.elm,e.context,e.componentOptions,e.asyncFactory);return t.ns=e.ns,t.isStatic=e.isStatic,t.key=e.key,t.isComment=e.isComment,t.fnContext=e.fnContext,t.fnOptions=e.fnOptions,t.fnScopeId=e.fnScopeId,t.asyncMeta=e.asyncMeta,t.isCloned=!0,t}var me=Array.prototype,ye=Object.create(me);["push","pop","shift","unshift","splice","sort","reverse"].forEach(function(e){var t=me[e];R(ye,e,function(){for(var n=[],r=arguments.length;r--;)n[r]=arguments[r];var i,o=t.apply(this,n),a=this.__ob__;switch(e){case"push":case"unshift":i=n;break;case"splice":i=n.slice(2)}return i&&a.observeArray(i),a.dep.notify(),o})});var ge=Object.getOwnPropertyNames(ye),_e=!0;function be(e){_e=e}var $e=function(e){var t;this.value=e,this.dep=new se,this.vmCount=0,R(e,"__ob__",this),Array.isArray(e)?(B?(t=ye,e.__proto__=t):function(e,t,n){for(var r=0,i=n.length;r<i;r++){var o=n[r];R(e,o,t[o])}}(e,ye,ge),this.observeArray(e)):this.walk(e)};function we(e,t){var n;if(o(e)&&!(e instanceof fe))return y(e,"__ob__")&&e.__ob__ instanceof $e?n=e.__ob__:_e&&!ee()&&(Array.isArray(e)||s(e))&&Object.isExtensible(e)&&!e._isVue&&(n=new $e(e)),t&&n&&n.vmCount++,n}function xe(e,t,n,r,i){var o=new se,a=Object.getOwnPropertyDescriptor(e,t);if(!a||!1!==a.configurable){var s=a&&a.get,c=a&&a.set;s&&!c||2!==arguments.length||(n=e[t]);var u=!i&&we(n);Object.defineProperty(e,t,{enumerable:!0,configurable:!0,get:function(){var t=s?s.call(e):n;return se.target&&(o.depend(),u&&(u.dep.depend(),Array.isArray(t)&&function e(t){for(var n=void 0,r=0,i=t.length;r<i;r++)(n=t[r])&&n.__ob__&&n.__ob__.dep.depend(),Array.isArray(n)&&e(n)}(t))),t},set:function(t){var r=s?s.call(e):n;t===r||t!=t&&r!=r||s&&!c||(c?c.call(e,t):n=t,u=!i&&we(t),o.notify())}})}}function Ce(e,t,n){if(Array.isArray(e)&&c(t))return e.length=Math.max(e.length,t),e.splice(t,1,n),n;if(t in e&&!(t in Object.prototype))return e[t]=n,n;var r=e.__ob__;return e._isVue||r&&r.vmCount?n:r?(xe(r.value,t,n),r.dep.notify(),n):(e[t]=n,n)}function Ae(e,t){if(Array.isArray(e)&&c(t))e.splice(t,1);else{var n=e.__ob__;e._isVue||n&&n.vmCount||y(e,t)&&(delete e[t],n&&n.dep.notify())}}$e.prototype.walk=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)xe(e,t[n])},$e.prototype.observeArray=function(e){for(var t=0,n=e.length;t<n;t++)we(e[t])};var ke=P.optionMergeStrategies;function Oe(e,t){if(!t)return e;for(var n,r,i,o=ie?Reflect.ownKeys(t):Object.keys(t),a=0;a<o.length;a++)"__ob__"!==(n=o[a])&&(r=e[n],i=t[n],y(e,n)?r!==i&&s(r)&&s(i)&&Oe(r,i):Ce(e,n,i));return e}function Se(e,t,n){return n?function(){var r="function"==typeof t?t.call(n,n):t,i="function"==typeof e?e.call(n,n):e;return r?Oe(r,i):i}:t?e?function(){return Oe("function"==typeof t?t.call(this,this):t,"function"==typeof e?e.call(this,this):e)}:t:e}function Te(e,t){var n=t?e?e.concat(t):Array.isArray(t)?t:[t]:e;return n?function(e){for(var t=[],n=0;n<e.length;n++)-1===t.indexOf(e[n])&&t.push(e[n]);return t}(n):n}function Ee(e,t,n,r){var i=Object.create(e||null);return t?k(i,t):i}ke.data=function(e,t,n){return n?Se(e,t,n):t&&"function"!=typeof t?e:Se(e,t)},D.forEach(function(e){ke[e]=Te}),I.forEach(function(e){ke[e+"s"]=Ee}),ke.watch=function(e,t,n,r){if(e===X&&(e=void 0),t===X&&(t=void 0),!t)return Object.create(e||null);if(!e)return t;var i={};for(var o in k(i,e),t){var a=i[o],s=t[o];a&&!Array.isArray(a)&&(a=[a]),i[o]=a?a.concat(s):Array.isArray(s)?s:[s]}return i},ke.props=ke.methods=ke.inject=ke.computed=function(e,t,n,r){if(!e)return t;var i=Object.create(null);return k(i,e),t&&k(i,t),i},ke.provide=Se;var Ne=function(e,t){return void 0===t?e:t};function je(e,t,n){if("function"==typeof t&&(t=t.options),function(e,t){var n=e.props;if(n){var r,i,o={};if(Array.isArray(n))for(r=n.length;r--;)"string"==typeof(i=n[r])&&(o[b(i)]={type:null});else if(s(n))for(var a in n)i=n[a],o[b(a)]=s(i)?i:{type:i};e.props=o}}(t),function(e,t){var n=e.inject;if(n){var r=e.inject={};if(Array.isArray(n))for(var i=0;i<n.length;i++)r[n[i]]={from:n[i]};else if(s(n))for(var o in n){var a=n[o];r[o]=s(a)?k({from:o},a):{from:a}}}}(t),function(e){var t=e.directives;if(t)for(var n in t){var r=t[n];"function"==typeof r&&(t[n]={bind:r,update:r})}}(t),!t._base&&(t.extends&&(e=je(e,t.extends,n)),t.mixins))for(var r=0,i=t.mixins.length;r<i;r++)e=je(e,t.mixins[r],n);var o,a={};for(o in e)c(o);for(o in t)y(e,o)||c(o);function c(r){var i=ke[r]||Ne;a[r]=i(e[r],t[r],n,r)}return a}function Le(e,t,n,r){if("string"==typeof n){var i=e[t];if(y(i,n))return i[n];var o=b(n);if(y(i,o))return i[o];var a=$(o);return y(i,a)?i[a]:i[n]||i[o]||i[a]}}function Me(e,t,n,r){var i=t[e],o=!y(n,e),a=n[e],s=Pe(Boolean,i.type);if(s>-1)if(o&&!y(i,"default"))a=!1;else if(""===a||a===x(e)){var c=Pe(String,i.type);(c<0||s<c)&&(a=!0)}if(void 0===a){a=function(e,t,n){if(!y(t,"default"))return;var r=t.default;if(e&&e.$options.propsData&&void 0===e.$options.propsData[n]&&void 0!==e._props[n])return e._props[n];return"function"==typeof r&&"Function"!==Ie(t.type)?r.call(e):r}(r,i,e);var u=_e;be(!0),we(a),be(u)}return a}function Ie(e){var t=e&&e.toString().match(/^\s*function (\w+)/);return t?t[1]:""}function De(e,t){return Ie(e)===Ie(t)}function Pe(e,t){if(!Array.isArray(t))return De(t,e)?0:-1;for(var n=0,r=t.length;n<r;n++)if(De(t[n],e))return n;return-1}function Re(e,t,n){if(t)for(var r=t;r=r.$parent;){var i=r.$options.errorCaptured;if(i)for(var o=0;o<i.length;o++)try{if(!1===i[o].call(r,e,t,n))return}catch(e){He(e,r,"errorCaptured hook")}}He(e,t,n)}function Fe(e,t,n,r,i){var o;try{(o=n?e.apply(t,n):e.call(t))&&!o._isVue&&u(o)&&o.catch(function(e){return Re(e,r,i+" (Promise/async)")})}catch(e){Re(e,r,i)}return o}function He(e,t,n){if(P.errorHandler)try{return P.errorHandler.call(null,e,t,n)}catch(t){t!==e&&Be(t,null,"config.errorHandler")}Be(e,t,n)}function Be(e,t,n){if(!U&&!z||"undefined"==typeof console)throw e;console.error(e)}var Ue,ze=!1,Ve=[],Ke=!1;function Je(){Ke=!1;var e=Ve.slice(0);Ve.length=0;for(var t=0;t<e.length;t++)e[t]()}if("undefined"!=typeof Promise&&ne(Promise)){var qe=Promise.resolve();Ue=function(){qe.then(Je),Z&&setTimeout(S)},ze=!0}else if(J||"undefined"==typeof MutationObserver||!ne(MutationObserver)&&"[object MutationObserverConstructor]"!==MutationObserver.toString())Ue="undefined"!=typeof setImmediate&&ne(setImmediate)?function(){setImmediate(Je)}:function(){setTimeout(Je,0)};else{var We=1,Ze=new MutationObserver(Je),Ge=document.createTextNode(String(We));Ze.observe(Ge,{characterData:!0}),Ue=function(){We=(We+1)%2,Ge.data=String(We)},ze=!0}function Xe(e,t){var n;if(Ve.push(function(){if(e)try{e.call(t)}catch(e){Re(e,t,"nextTick")}else n&&n(t)}),Ke||(Ke=!0,Ue()),!e&&"undefined"!=typeof Promise)return new Promise(function(e){n=e})}var Ye=new re;function Qe(e){!function e(t,n){var r,i;var a=Array.isArray(t);if(!a&&!o(t)||Object.isFrozen(t)||t instanceof fe)return;if(t.__ob__){var s=t.__ob__.dep.id;if(n.has(s))return;n.add(s)}if(a)for(r=t.length;r--;)e(t[r],n);else for(i=Object.keys(t),r=i.length;r--;)e(t[i[r]],n)}(e,Ye),Ye.clear()}var et=g(function(e){var t="&"===e.charAt(0),n="~"===(e=t?e.slice(1):e).charAt(0),r="!"===(e=n?e.slice(1):e).charAt(0);return{name:e=r?e.slice(1):e,once:n,capture:r,passive:t}});function tt(e,t){function n(){var e=arguments,r=n.fns;if(!Array.isArray(r))return Fe(r,null,arguments,t,"v-on handler");for(var i=r.slice(),o=0;o<i.length;o++)Fe(i[o],null,e,t,"v-on handler")}return n.fns=e,n}function nt(e,n,i,o,a,s){var c,u,l,f;for(c in e)u=e[c],l=n[c],f=et(c),t(u)||(t(l)?(t(u.fns)&&(u=e[c]=tt(u,s)),r(f.once)&&(u=e[c]=a(f.name,u,f.capture)),i(f.name,u,f.capture,f.passive,f.params)):u!==l&&(l.fns=u,e[c]=l));for(c in n)t(e[c])&&o((f=et(c)).name,n[c],f.capture)}function rt(e,i,o){var a;e instanceof fe&&(e=e.data.hook||(e.data.hook={}));var s=e[i];function c(){o.apply(this,arguments),h(a.fns,c)}t(s)?a=tt([c]):n(s.fns)&&r(s.merged)?(a=s).fns.push(c):a=tt([s,c]),a.merged=!0,e[i]=a}function it(e,t,r,i,o){if(n(t)){if(y(t,r))return e[r]=t[r],o||delete t[r],!0;if(y(t,i))return e[r]=t[i],o||delete t[i],!0}return!1}function ot(e){return i(e)?[ve(e)]:Array.isArray(e)?function e(o,a){var s=[];var c,u,l,f;for(c=0;c<o.length;c++)t(u=o[c])||"boolean"==typeof u||(l=s.length-1,f=s[l],Array.isArray(u)?u.length>0&&(at((u=e(u,(a||"")+"_"+c))[0])&&at(f)&&(s[l]=ve(f.text+u[0].text),u.shift()),s.push.apply(s,u)):i(u)?at(f)?s[l]=ve(f.text+u):""!==u&&s.push(ve(u)):at(u)&&at(f)?s[l]=ve(f.text+u.text):(r(o._isVList)&&n(u.tag)&&t(u.key)&&n(a)&&(u.key="__vlist"+a+"_"+c+"__"),s.push(u)));return s}(e):void 0}function at(e){return n(e)&&n(e.text)&&!1===e.isComment}function st(e,t){if(e){for(var n=Object.create(null),r=ie?Reflect.ownKeys(e):Object.keys(e),i=0;i<r.length;i++){var o=r[i];if("__ob__"!==o){for(var a=e[o].from,s=t;s;){if(s._provided&&y(s._provided,a)){n[o]=s._provided[a];break}s=s.$parent}if(!s&&"default"in e[o]){var c=e[o].default;n[o]="function"==typeof c?c.call(t):c}}}return n}}function ct(e,t){if(!e||!e.length)return{};for(var n={},r=0,i=e.length;r<i;r++){var o=e[r],a=o.data;if(a&&a.attrs&&a.attrs.slot&&delete a.attrs.slot,o.context!==t&&o.fnContext!==t||!a||null==a.slot)(n.default||(n.default=[])).push(o);else{var s=a.slot,c=n[s]||(n[s]=[]);"template"===o.tag?c.push.apply(c,o.children||[]):c.push(o)}}for(var u in n)n[u].every(ut)&&delete n[u];return n}function ut(e){return e.isComment&&!e.asyncFactory||" "===e.text}function lt(t,n,r){var i;if(t){if(t._normalized)return t._normalized;if(t.$stable&&r&&r!==e&&0===Object.keys(n).length)return r;for(var o in i={},t)t[o]&&"$"!==o[0]&&(i[o]=ft(n,o,t[o]))}else i={};for(var a in n)a in i||(i[a]=pt(n,a));return t&&Object.isExtensible(t)&&(t._normalized=i),R(i,"$stable",!t||!!t.$stable),i}function ft(e,t,n){var r=function(){var e=arguments.length?n.apply(null,arguments):n({});return(e=e&&"object"==typeof e&&!Array.isArray(e)?[e]:ot(e))&&0===e.length?void 0:e};return n.proxy&&Object.defineProperty(e,t,{get:r,enumerable:!0,configurable:!0}),r}function pt(e,t){return function(){return e[t]}}function dt(e,t){var r,i,a,s,c;if(Array.isArray(e)||"string"==typeof e)for(r=new Array(e.length),i=0,a=e.length;i<a;i++)r[i]=t(e[i],i);else if("number"==typeof e)for(r=new Array(e),i=0;i<e;i++)r[i]=t(i+1,i);else if(o(e))if(ie&&e[Symbol.iterator]){r=[];for(var u=e[Symbol.iterator](),l=u.next();!l.done;)r.push(t(l.value,r.length)),l=u.next()}else for(s=Object.keys(e),r=new Array(s.length),i=0,a=s.length;i<a;i++)c=s[i],r[i]=t(e[c],c,i);return n(r)||(r=[]),r._isVList=!0,r}function vt(e,t,n,r){var i,o=this.$scopedSlots[e];o?(n=n||{},r&&(n=k(k({},r),n)),i=o(n)||t):i=this.$slots[e]||t;var a=n&&n.slot;return a?this.$createElement("template",{slot:a},i):i}function ht(e){return Le(this.$options,"filters",e)||E}function mt(e,t){return Array.isArray(e)?-1===e.indexOf(t):e!==t}function yt(e,t,n,r,i){var o=P.keyCodes[t]||n;return i&&r&&!P.keyCodes[t]?mt(i,r):o?mt(o,e):r?x(r)!==t:void 0}function gt(e,t,n,r,i){if(n)if(o(n)){var a;Array.isArray(n)&&(n=O(n));var s=function(o){if("class"===o||"style"===o||v(o))a=e;else{var s=e.attrs&&e.attrs.type;a=r||P.mustUseProp(t,s,o)?e.domProps||(e.domProps={}):e.attrs||(e.attrs={})}var c=b(o);o in a||c in a||(a[o]=n[o],i&&((e.on||(e.on={}))["update:"+c]=function(e){n[o]=e}))};for(var c in n)s(c)}else;return e}function _t(e,t){var n=this._staticTrees||(this._staticTrees=[]),r=n[e];return r&&!t?r:($t(r=n[e]=this.$options.staticRenderFns[e].call(this._renderProxy,null,this),"__static__"+e,!1),r)}function bt(e,t,n){return $t(e,"__once__"+t+(n?"_"+n:""),!0),e}function $t(e,t,n){if(Array.isArray(e))for(var r=0;r<e.length;r++)e[r]&&"string"!=typeof e[r]&&wt(e[r],t+"_"+r,n);else wt(e,t,n)}function wt(e,t,n){e.isStatic=!0,e.key=t,e.isOnce=n}function xt(e,t){if(t)if(s(t)){var n=e.on=e.on?k({},e.on):{};for(var r in t){var i=n[r],o=t[r];n[r]=i?[].concat(i,o):o}}else;return e}function Ct(e,t,n){n=n||{$stable:!t};for(var r=0;r<e.length;r++){var i=e[r];Array.isArray(i)?Ct(i,t,n):i&&(i.proxy&&(i.fn.proxy=!0),n[i.key]=i.fn)}return n}function At(e,t){for(var n=0;n<t.length;n+=2){var r=t[n];"string"==typeof r&&r&&(e[t[n]]=t[n+1])}return e}function kt(e,t){return"string"==typeof e?t+e:e}function Ot(e){e._o=bt,e._n=f,e._s=l,e._l=dt,e._t=vt,e._q=N,e._i=j,e._m=_t,e._f=ht,e._k=yt,e._b=gt,e._v=ve,e._e=de,e._u=Ct,e._g=xt,e._d=At,e._p=kt}function St(t,n,i,o,a){var s,c=this,u=a.options;y(o,"_uid")?(s=Object.create(o))._original=o:(s=o,o=o._original);var l=r(u._compiled),f=!l;this.data=t,this.props=n,this.children=i,this.parent=o,this.listeners=t.on||e,this.injections=st(u.inject,o),this.slots=function(){return c.$slots||lt(t.scopedSlots,c.$slots=ct(i,o)),c.$slots},Object.defineProperty(this,"scopedSlots",{enumerable:!0,get:function(){return lt(t.scopedSlots,this.slots())}}),l&&(this.$options=u,this.$slots=this.slots(),this.$scopedSlots=lt(t.scopedSlots,this.$slots)),u._scopeId?this._c=function(e,t,n,r){var i=Pt(s,e,t,n,r,f);return i&&!Array.isArray(i)&&(i.fnScopeId=u._scopeId,i.fnContext=o),i}:this._c=function(e,t,n,r){return Pt(s,e,t,n,r,f)}}function Tt(e,t,n,r,i){var o=he(e);return o.fnContext=n,o.fnOptions=r,t.slot&&((o.data||(o.data={})).slot=t.slot),o}function Et(e,t){for(var n in t)e[b(n)]=t[n]}Ot(St.prototype);var Nt={init:function(e,t){if(e.componentInstance&&!e.componentInstance._isDestroyed&&e.data.keepAlive){var r=e;Nt.prepatch(r,r)}else{(e.componentInstance=function(e,t){var r={_isComponent:!0,_parentVnode:e,parent:t},i=e.data.inlineTemplate;n(i)&&(r.render=i.render,r.staticRenderFns=i.staticRenderFns);return new e.componentOptions.Ctor(r)}(e,qt)).$mount(t?e.elm:void 0,t)}},prepatch:function(t,n){var r=n.componentOptions;!function(t,n,r,i,o){var a=!!(i.data.scopedSlots&&!i.data.scopedSlots.$stable||t.$scopedSlots!==e&&!t.$scopedSlots.$stable),s=!!(o||t.$options._renderChildren||a);t.$options._parentVnode=i,t.$vnode=i,t._vnode&&(t._vnode.parent=i);if(t.$options._renderChildren=o,t.$attrs=i.data.attrs||e,t.$listeners=r||e,n&&t.$options.props){be(!1);for(var c=t._props,u=t.$options._propKeys||[],l=0;l<u.length;l++){var f=u[l],p=t.$options.props;c[f]=Me(f,p,n,t)}be(!0),t.$options.propsData=n}r=r||e;var d=t.$options._parentListeners;t.$options._parentListeners=r,Jt(t,r,d),s&&(t.$slots=ct(o,i.context),t.$forceUpdate())}(n.componentInstance=t.componentInstance,r.propsData,r.listeners,n,r.children)},insert:function(e){var t,n=e.context,r=e.componentInstance;r._isMounted||(r._isMounted=!0,Xt(r,"mounted")),e.data.keepAlive&&(n._isMounted?((t=r)._inactive=!1,Qt.push(t)):Gt(r,!0))},destroy:function(e){var t=e.componentInstance;t._isDestroyed||(e.data.keepAlive?function e(t,n){if(n&&(t._directInactive=!0,Zt(t)))return;if(!t._inactive){t._inactive=!0;for(var r=0;r<t.$children.length;r++)e(t.$children[r]);Xt(t,"deactivated")}}(t,!0):t.$destroy())}},jt=Object.keys(Nt);function Lt(i,a,s,c,l){if(!t(i)){var f=s.$options._base;if(o(i)&&(i=f.extend(i)),"function"==typeof i){var p;if(t(i.cid)&&void 0===(i=function(e,i){if(r(e.error)&&n(e.errorComp))return e.errorComp;if(n(e.resolved))return e.resolved;if(r(e.loading)&&n(e.loadingComp))return e.loadingComp;var a=Ft;if(!n(e.owners)){var s=e.owners=[a],c=!0,l=function(e){for(var t=0,n=s.length;t<n;t++)s[t].$forceUpdate();e&&(s.length=0)},f=L(function(t){e.resolved=Ht(t,i),c?s.length=0:l(!0)}),p=L(function(t){n(e.errorComp)&&(e.error=!0,l(!0))}),d=e(f,p);return o(d)&&(u(d)?t(e.resolved)&&d.then(f,p):u(d.component)&&(d.component.then(f,p),n(d.error)&&(e.errorComp=Ht(d.error,i)),n(d.loading)&&(e.loadingComp=Ht(d.loading,i),0===d.delay?e.loading=!0:setTimeout(function(){t(e.resolved)&&t(e.error)&&(e.loading=!0,l(!1))},d.delay||200)),n(d.timeout)&&setTimeout(function(){t(e.resolved)&&p(null)},d.timeout))),c=!1,e.loading?e.loadingComp:e.resolved}e.owners.push(a)}(p=i,f)))return function(e,t,n,r,i){var o=de();return o.asyncFactory=e,o.asyncMeta={data:t,context:n,children:r,tag:i},o}(p,a,s,c,l);a=a||{},_n(i),n(a.model)&&function(e,t){var r=e.model&&e.model.prop||"value",i=e.model&&e.model.event||"input";(t.attrs||(t.attrs={}))[r]=t.model.value;var o=t.on||(t.on={}),a=o[i],s=t.model.callback;n(a)?(Array.isArray(a)?-1===a.indexOf(s):a!==s)&&(o[i]=[s].concat(a)):o[i]=s}(i.options,a);var d=function(e,r,i){var o=r.options.props;if(!t(o)){var a={},s=e.attrs,c=e.props;if(n(s)||n(c))for(var u in o){var l=x(u);it(a,c,u,l,!0)||it(a,s,u,l,!1)}return a}}(a,i);if(r(i.options.functional))return function(t,r,i,o,a){var s=t.options,c={},u=s.props;if(n(u))for(var l in u)c[l]=Me(l,u,r||e);else n(i.attrs)&&Et(c,i.attrs),n(i.props)&&Et(c,i.props);var f=new St(i,c,a,o,t),p=s.render.call(null,f._c,f);if(p instanceof fe)return Tt(p,i,f.parent,s);if(Array.isArray(p)){for(var d=ot(p)||[],v=new Array(d.length),h=0;h<d.length;h++)v[h]=Tt(d[h],i,f.parent,s);return v}}(i,d,a,s,c);var v=a.on;if(a.on=a.nativeOn,r(i.options.abstract)){var h=a.slot;a={},h&&(a.slot=h)}!function(e){for(var t=e.hook||(e.hook={}),n=0;n<jt.length;n++){var r=jt[n],i=t[r],o=Nt[r];i===o||i&&i._merged||(t[r]=i?Mt(o,i):o)}}(a);var m=i.options.name||l;return new fe("vue-component-"+i.cid+(m?"-"+m:""),a,void 0,void 0,void 0,s,{Ctor:i,propsData:d,listeners:v,tag:l,children:c},p)}}}function Mt(e,t){var n=function(n,r){e(n,r),t(n,r)};return n._merged=!0,n}var It=1,Dt=2;function Pt(e,a,s,c,u,l){return(Array.isArray(s)||i(s))&&(u=c,c=s,s=void 0),r(l)&&(u=Dt),function(e,i,a,s,c){if(n(a)&&n(a.__ob__))return de();n(a)&&n(a.is)&&(i=a.is);if(!i)return de();Array.isArray(s)&&"function"==typeof s[0]&&((a=a||{}).scopedSlots={default:s[0]},s.length=0);c===Dt?s=ot(s):c===It&&(s=function(e){for(var t=0;t<e.length;t++)if(Array.isArray(e[t]))return Array.prototype.concat.apply([],e);return e}(s));var u,l;if("string"==typeof i){var f;l=e.$vnode&&e.$vnode.ns||P.getTagNamespace(i),u=P.isReservedTag(i)?new fe(P.parsePlatformTagName(i),a,s,void 0,void 0,e):a&&a.pre||!n(f=Le(e.$options,"components",i))?new fe(i,a,s,void 0,void 0,e):Lt(f,a,e,s,i)}else u=Lt(i,a,e,s);return Array.isArray(u)?u:n(u)?(n(l)&&function e(i,o,a){i.ns=o;"foreignObject"===i.tag&&(o=void 0,a=!0);if(n(i.children))for(var s=0,c=i.children.length;s<c;s++){var u=i.children[s];n(u.tag)&&(t(u.ns)||r(a)&&"svg"!==u.tag)&&e(u,o,a)}}(u,l),n(a)&&function(e){o(e.style)&&Qe(e.style);o(e.class)&&Qe(e.class)}(a),u):de()}(e,a,s,c,u)}var Rt,Ft=null;function Ht(e,t){return(e.__esModule||ie&&"Module"===e[Symbol.toStringTag])&&(e=e.default),o(e)?t.extend(e):e}function Bt(e){return e.isComment&&e.asyncFactory}function Ut(e){if(Array.isArray(e))for(var t=0;t<e.length;t++){var r=e[t];if(n(r)&&(n(r.componentOptions)||Bt(r)))return r}}function zt(e,t){Rt.$on(e,t)}function Vt(e,t){Rt.$off(e,t)}function Kt(e,t){var n=Rt;return function r(){null!==t.apply(null,arguments)&&n.$off(e,r)}}function Jt(e,t,n){Rt=e,nt(t,n||{},zt,Vt,Kt,e),Rt=void 0}var qt=null;function Wt(e){var t=qt;return qt=e,function(){qt=t}}function Zt(e){for(;e&&(e=e.$parent);)if(e._inactive)return!0;return!1}function Gt(e,t){if(t){if(e._directInactive=!1,Zt(e))return}else if(e._directInactive)return;if(e._inactive||null===e._inactive){e._inactive=!1;for(var n=0;n<e.$children.length;n++)Gt(e.$children[n]);Xt(e,"activated")}}function Xt(e,t){ue();var n=e.$options[t],r=t+" hook";if(n)for(var i=0,o=n.length;i<o;i++)Fe(n[i],e,null,e,r);e._hasHookEvent&&e.$emit("hook:"+t),le()}var Yt=[],Qt=[],en={},tn=!1,nn=!1,rn=0;var on=0,an=Date.now;function sn(){var e,t;for(on=an(),nn=!0,Yt.sort(function(e,t){return e.id-t.id}),rn=0;rn<Yt.length;rn++)(e=Yt[rn]).before&&e.before(),t=e.id,en[t]=null,e.run();var n=Qt.slice(),r=Yt.slice();rn=Yt.length=Qt.length=0,en={},tn=nn=!1,function(e){for(var t=0;t<e.length;t++)e[t]._inactive=!0,Gt(e[t],!0)}(n),function(e){var t=e.length;for(;t--;){var n=e[t],r=n.vm;r._watcher===n&&r._isMounted&&!r._isDestroyed&&Xt(r,"updated")}}(r),te&&P.devtools&&te.emit("flush")}U&&an()>document.createEvent("Event").timeStamp&&(an=function(){return performance.now()});var cn=0,un=function(e,t,n,r,i){this.vm=e,i&&(e._watcher=this),e._watchers.push(this),r?(this.deep=!!r.deep,this.user=!!r.user,this.lazy=!!r.lazy,this.sync=!!r.sync,this.before=r.before):this.deep=this.user=this.lazy=this.sync=!1,this.cb=n,this.id=++cn,this.active=!0,this.dirty=this.lazy,this.deps=[],this.newDeps=[],this.depIds=new re,this.newDepIds=new re,this.expression="","function"==typeof t?this.getter=t:(this.getter=function(e){if(!F.test(e)){var t=e.split(".");return function(e){for(var n=0;n<t.length;n++){if(!e)return;e=e[t[n]]}return e}}}(t),this.getter||(this.getter=S)),this.value=this.lazy?void 0:this.get()};un.prototype.get=function(){var e;ue(this);var t=this.vm;try{e=this.getter.call(t,t)}catch(e){if(!this.user)throw e;Re(e,t,'getter for watcher "'+this.expression+'"')}finally{this.deep&&Qe(e),le(),this.cleanupDeps()}return e},un.prototype.addDep=function(e){var t=e.id;this.newDepIds.has(t)||(this.newDepIds.add(t),this.newDeps.push(e),this.depIds.has(t)||e.addSub(this))},un.prototype.cleanupDeps=function(){for(var e=this.deps.length;e--;){var t=this.deps[e];this.newDepIds.has(t.id)||t.removeSub(this)}var n=this.depIds;this.depIds=this.newDepIds,this.newDepIds=n,this.newDepIds.clear(),n=this.deps,this.deps=this.newDeps,this.newDeps=n,this.newDeps.length=0},un.prototype.update=function(){this.lazy?this.dirty=!0:this.sync?this.run():function(e){var t=e.id;if(null==en[t]){if(en[t]=!0,nn){for(var n=Yt.length-1;n>rn&&Yt[n].id>e.id;)n--;Yt.splice(n+1,0,e)}else Yt.push(e);tn||(tn=!0,Xe(sn))}}(this)},un.prototype.run=function(){if(this.active){var e=this.get();if(e!==this.value||o(e)||this.deep){var t=this.value;if(this.value=e,this.user)try{this.cb.call(this.vm,e,t)}catch(e){Re(e,this.vm,'callback for watcher "'+this.expression+'"')}else this.cb.call(this.vm,e,t)}}},un.prototype.evaluate=function(){this.value=this.get(),this.dirty=!1},un.prototype.depend=function(){for(var e=this.deps.length;e--;)this.deps[e].depend()},un.prototype.teardown=function(){if(this.active){this.vm._isBeingDestroyed||h(this.vm._watchers,this);for(var e=this.deps.length;e--;)this.deps[e].removeSub(this);this.active=!1}};var ln={enumerable:!0,configurable:!0,get:S,set:S};function fn(e,t,n){ln.get=function(){return this[t][n]},ln.set=function(e){this[t][n]=e},Object.defineProperty(e,n,ln)}function pn(e){e._watchers=[];var t=e.$options;t.props&&function(e,t){var n=e.$options.propsData||{},r=e._props={},i=e.$options._propKeys=[];e.$parent&&be(!1);var o=function(o){i.push(o);var a=Me(o,t,n,e);xe(r,o,a),o in e||fn(e,"_props",o)};for(var a in t)o(a);be(!0)}(e,t.props),t.methods&&function(e,t){e.$options.props;for(var n in t)e[n]="function"!=typeof t[n]?S:C(t[n],e)}(e,t.methods),t.data?function(e){var t=e.$options.data;s(t=e._data="function"==typeof t?function(e,t){ue();try{return e.call(t,t)}catch(e){return Re(e,t,"data()"),{}}finally{le()}}(t,e):t||{})||(t={});var n=Object.keys(t),r=e.$options.props,i=(e.$options.methods,n.length);for(;i--;){var o=n[i];r&&y(r,o)||(a=void 0,36!==(a=(o+"").charCodeAt(0))&&95!==a&&fn(e,"_data",o))}var a;we(t,!0)}(e):we(e._data={},!0),t.computed&&function(e,t){var n=e._computedWatchers=Object.create(null),r=ee();for(var i in t){var o=t[i],a="function"==typeof o?o:o.get;r||(n[i]=new un(e,a||S,S,dn)),i in e||vn(e,i,o)}}(e,t.computed),t.watch&&t.watch!==X&&function(e,t){for(var n in t){var r=t[n];if(Array.isArray(r))for(var i=0;i<r.length;i++)yn(e,n,r[i]);else yn(e,n,r)}}(e,t.watch)}var dn={lazy:!0};function vn(e,t,n){var r=!ee();"function"==typeof n?(ln.get=r?hn(t):mn(n),ln.set=S):(ln.get=n.get?r&&!1!==n.cache?hn(t):mn(n.get):S,ln.set=n.set||S),Object.defineProperty(e,t,ln)}function hn(e){return function(){var t=this._computedWatchers&&this._computedWatchers[e];if(t)return t.dirty&&t.evaluate(),se.target&&t.depend(),t.value}}function mn(e){return function(){return e.call(this,this)}}function yn(e,t,n,r){return s(n)&&(r=n,n=n.handler),"string"==typeof n&&(n=e[n]),e.$watch(t,n,r)}var gn=0;function _n(e){var t=e.options;if(e.super){var n=_n(e.super);if(n!==e.superOptions){e.superOptions=n;var r=function(e){var t,n=e.options,r=e.sealedOptions;for(var i in n)n[i]!==r[i]&&(t||(t={}),t[i]=n[i]);return t}(e);r&&k(e.extendOptions,r),(t=e.options=je(n,e.extendOptions)).name&&(t.components[t.name]=e)}}return t}function bn(e){this._init(e)}function $n(e){e.cid=0;var t=1;e.extend=function(e){e=e||{};var n=this,r=n.cid,i=e._Ctor||(e._Ctor={});if(i[r])return i[r];var o=e.name||n.options.name,a=function(e){this._init(e)};return(a.prototype=Object.create(n.prototype)).constructor=a,a.cid=t++,a.options=je(n.options,e),a.super=n,a.options.props&&function(e){var t=e.options.props;for(var n in t)fn(e.prototype,"_props",n)}(a),a.options.computed&&function(e){var t=e.options.computed;for(var n in t)vn(e.prototype,n,t[n])}(a),a.extend=n.extend,a.mixin=n.mixin,a.use=n.use,I.forEach(function(e){a[e]=n[e]}),o&&(a.options.components[o]=a),a.superOptions=n.options,a.extendOptions=e,a.sealedOptions=k({},a.options),i[r]=a,a}}function wn(e){return e&&(e.Ctor.options.name||e.tag)}function xn(e,t){return Array.isArray(e)?e.indexOf(t)>-1:"string"==typeof e?e.split(",").indexOf(t)>-1:(n=e,"[object RegExp]"===a.call(n)&&e.test(t));var n}function Cn(e,t){var n=e.cache,r=e.keys,i=e._vnode;for(var o in n){var a=n[o];if(a){var s=wn(a.componentOptions);s&&!t(s)&&An(n,o,r,i)}}}function An(e,t,n,r){var i=e[t];!i||r&&i.tag===r.tag||i.componentInstance.$destroy(),e[t]=null,h(n,t)}!function(t){t.prototype._init=function(t){var n=this;n._uid=gn++,n._isVue=!0,t&&t._isComponent?function(e,t){var n=e.$options=Object.create(e.constructor.options),r=t._parentVnode;n.parent=t.parent,n._parentVnode=r;var i=r.componentOptions;n.propsData=i.propsData,n._parentListeners=i.listeners,n._renderChildren=i.children,n._componentTag=i.tag,t.render&&(n.render=t.render,n.staticRenderFns=t.staticRenderFns)}(n,t):n.$options=je(_n(n.constructor),t||{},n),n._renderProxy=n,n._self=n,function(e){var t=e.$options,n=t.parent;if(n&&!t.abstract){for(;n.$options.abstract&&n.$parent;)n=n.$parent;n.$children.push(e)}e.$parent=n,e.$root=n?n.$root:e,e.$children=[],e.$refs={},e._watcher=null,e._inactive=null,e._directInactive=!1,e._isMounted=!1,e._isDestroyed=!1,e._isBeingDestroyed=!1}(n),function(e){e._events=Object.create(null),e._hasHookEvent=!1;var t=e.$options._parentListeners;t&&Jt(e,t)}(n),function(t){t._vnode=null,t._staticTrees=null;var n=t.$options,r=t.$vnode=n._parentVnode,i=r&&r.context;t.$slots=ct(n._renderChildren,i),t.$scopedSlots=e,t._c=function(e,n,r,i){return Pt(t,e,n,r,i,!1)},t.$createElement=function(e,n,r,i){return Pt(t,e,n,r,i,!0)};var o=r&&r.data;xe(t,"$attrs",o&&o.attrs||e,null,!0),xe(t,"$listeners",n._parentListeners||e,null,!0)}(n),Xt(n,"beforeCreate"),function(e){var t=st(e.$options.inject,e);t&&(be(!1),Object.keys(t).forEach(function(n){xe(e,n,t[n])}),be(!0))}(n),pn(n),function(e){var t=e.$options.provide;t&&(e._provided="function"==typeof t?t.call(e):t)}(n),Xt(n,"created"),n.$options.el&&n.$mount(n.$options.el)}}(bn),function(e){var t={get:function(){return this._data}},n={get:function(){return this._props}};Object.defineProperty(e.prototype,"$data",t),Object.defineProperty(e.prototype,"$props",n),e.prototype.$set=Ce,e.prototype.$delete=Ae,e.prototype.$watch=function(e,t,n){if(s(t))return yn(this,e,t,n);(n=n||{}).user=!0;var r=new un(this,e,t,n);if(n.immediate)try{t.call(this,r.value)}catch(e){Re(e,this,'callback for immediate watcher "'+r.expression+'"')}return function(){r.teardown()}}}(bn),function(e){var t=/^hook:/;e.prototype.$on=function(e,n){var r=this;if(Array.isArray(e))for(var i=0,o=e.length;i<o;i++)r.$on(e[i],n);else(r._events[e]||(r._events[e]=[])).push(n),t.test(e)&&(r._hasHookEvent=!0);return r},e.prototype.$once=function(e,t){var n=this;function r(){n.$off(e,r),t.apply(n,arguments)}return r.fn=t,n.$on(e,r),n},e.prototype.$off=function(e,t){var n=this;if(!arguments.length)return n._events=Object.create(null),n;if(Array.isArray(e)){for(var r=0,i=e.length;r<i;r++)n.$off(e[r],t);return n}var o,a=n._events[e];if(!a)return n;if(!t)return n._events[e]=null,n;for(var s=a.length;s--;)if((o=a[s])===t||o.fn===t){a.splice(s,1);break}return n},e.prototype.$emit=function(e){var t=this._events[e];if(t){t=t.length>1?A(t):t;for(var n=A(arguments,1),r='event handler for "'+e+'"',i=0,o=t.length;i<o;i++)Fe(t[i],this,n,this,r)}return this}}(bn),function(e){e.prototype._update=function(e,t){var n=this,r=n.$el,i=n._vnode,o=Wt(n);n._vnode=e,n.$el=i?n.__patch__(i,e):n.__patch__(n.$el,e,t,!1),o(),r&&(r.__vue__=null),n.$el&&(n.$el.__vue__=n),n.$vnode&&n.$parent&&n.$vnode===n.$parent._vnode&&(n.$parent.$el=n.$el)},e.prototype.$forceUpdate=function(){this._watcher&&this._watcher.update()},e.prototype.$destroy=function(){var e=this;if(!e._isBeingDestroyed){Xt(e,"beforeDestroy"),e._isBeingDestroyed=!0;var t=e.$parent;!t||t._isBeingDestroyed||e.$options.abstract||h(t.$children,e),e._watcher&&e._watcher.teardown();for(var n=e._watchers.length;n--;)e._watchers[n].teardown();e._data.__ob__&&e._data.__ob__.vmCount--,e._isDestroyed=!0,e.__patch__(e._vnode,null),Xt(e,"destroyed"),e.$off(),e.$el&&(e.$el.__vue__=null),e.$vnode&&(e.$vnode.parent=null)}}}(bn),function(e){Ot(e.prototype),e.prototype.$nextTick=function(e){return Xe(e,this)},e.prototype._render=function(){var e,t=this,n=t.$options,r=n.render,i=n._parentVnode;i&&(t.$scopedSlots=lt(i.data.scopedSlots,t.$slots,t.$scopedSlots)),t.$vnode=i;try{Ft=t,e=r.call(t._renderProxy,t.$createElement)}catch(n){Re(n,t,"render"),e=t._vnode}finally{Ft=null}return Array.isArray(e)&&1===e.length&&(e=e[0]),e instanceof fe||(e=de()),e.parent=i,e}}(bn);var kn=[String,RegExp,Array],On={KeepAlive:{name:"keep-alive",abstract:!0,props:{include:kn,exclude:kn,max:[String,Number]},created:function(){this.cache=Object.create(null),this.keys=[]},destroyed:function(){for(var e in this.cache)An(this.cache,e,this.keys)},mounted:function(){var e=this;this.$watch("include",function(t){Cn(e,function(e){return xn(t,e)})}),this.$watch("exclude",function(t){Cn(e,function(e){return!xn(t,e)})})},render:function(){var e=this.$slots.default,t=Ut(e),n=t&&t.componentOptions;if(n){var r=wn(n),i=this.include,o=this.exclude;if(i&&(!r||!xn(i,r))||o&&r&&xn(o,r))return t;var a=this.cache,s=this.keys,c=null==t.key?n.Ctor.cid+(n.tag?"::"+n.tag:""):t.key;a[c]?(t.componentInstance=a[c].componentInstance,h(s,c),s.push(c)):(a[c]=t,s.push(c),this.max&&s.length>parseInt(this.max)&&An(a,s[0],s,this._vnode)),t.data.keepAlive=!0}return t||e&&e[0]}}};!function(e){var t={get:function(){return P}};Object.defineProperty(e,"config",t),e.util={warn:oe,extend:k,mergeOptions:je,defineReactive:xe},e.set=Ce,e.delete=Ae,e.nextTick=Xe,e.observable=function(e){return we(e),e},e.options=Object.create(null),I.forEach(function(t){e.options[t+"s"]=Object.create(null)}),e.options._base=e,k(e.options.components,On),function(e){e.use=function(e){var t=this._installedPlugins||(this._installedPlugins=[]);if(t.indexOf(e)>-1)return this;var n=A(arguments,1);return n.unshift(this),"function"==typeof e.install?e.install.apply(e,n):"function"==typeof e&&e.apply(null,n),t.push(e),this}}(e),function(e){e.mixin=function(e){return this.options=je(this.options,e),this}}(e),$n(e),function(e){I.forEach(function(t){e[t]=function(e,n){return n?("component"===t&&s(n)&&(n.name=n.name||e,n=this.options._base.extend(n)),"directive"===t&&"function"==typeof n&&(n={bind:n,update:n}),this.options[t+"s"][e]=n,n):this.options[t+"s"][e]}})}(e)}(bn),Object.defineProperty(bn.prototype,"$isServer",{get:ee}),Object.defineProperty(bn.prototype,"$ssrContext",{get:function(){return this.$vnode&&this.$vnode.ssrContext}}),Object.defineProperty(bn,"FunctionalRenderContext",{value:St}),bn.version="2.6.6";var Sn=p("style,class"),Tn=p("input,textarea,option,select,progress"),En=function(e,t,n){return"value"===n&&Tn(e)&&"button"!==t||"selected"===n&&"option"===e||"checked"===n&&"input"===e||"muted"===n&&"video"===e},Nn=p("contenteditable,draggable,spellcheck"),jn=p("events,caret,typing,plaintext-only"),Ln=function(e,t){return Rn(t)||"false"===t?"false":"contenteditable"===e&&jn(t)?t:"true"},Mn=p("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,translate,truespeed,typemustmatch,visible"),In="http://www.w3.org/1999/xlink",Dn=function(e){return":"===e.charAt(5)&&"xlink"===e.slice(0,5)},Pn=function(e){return Dn(e)?e.slice(6,e.length):""},Rn=function(e){return null==e||!1===e};function Fn(e){for(var t=e.data,r=e,i=e;n(i.componentInstance);)(i=i.componentInstance._vnode)&&i.data&&(t=Hn(i.data,t));for(;n(r=r.parent);)r&&r.data&&(t=Hn(t,r.data));return function(e,t){if(n(e)||n(t))return Bn(e,Un(t));return""}(t.staticClass,t.class)}function Hn(e,t){return{staticClass:Bn(e.staticClass,t.staticClass),class:n(e.class)?[e.class,t.class]:t.class}}function Bn(e,t){return e?t?e+" "+t:e:t||""}function Un(e){return Array.isArray(e)?function(e){for(var t,r="",i=0,o=e.length;i<o;i++)n(t=Un(e[i]))&&""!==t&&(r&&(r+=" "),r+=t);return r}(e):o(e)?function(e){var t="";for(var n in e)e[n]&&(t&&(t+=" "),t+=n);return t}(e):"string"==typeof e?e:""}var zn={svg:"http://www.w3.org/2000/svg",math:"http://www.w3.org/1998/Math/MathML"},Vn=p("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot"),Kn=p("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view",!0),Jn=function(e){return Vn(e)||Kn(e)};function qn(e){return Kn(e)?"svg":"math"===e?"math":void 0}var Wn=Object.create(null);var Zn=p("text,number,password,search,email,tel,url");function Gn(e){if("string"==typeof e){var t=document.querySelector(e);return t||document.createElement("div")}return e}var Xn=Object.freeze({createElement:function(e,t){var n=document.createElement(e);return"select"!==e?n:(t.data&&t.data.attrs&&void 0!==t.data.attrs.multiple&&n.setAttribute("multiple","multiple"),n)},createElementNS:function(e,t){return document.createElementNS(zn[e],t)},createTextNode:function(e){return document.createTextNode(e)},createComment:function(e){return document.createComment(e)},insertBefore:function(e,t,n){e.insertBefore(t,n)},removeChild:function(e,t){e.removeChild(t)},appendChild:function(e,t){e.appendChild(t)},parentNode:function(e){return e.parentNode},nextSibling:function(e){return e.nextSibling},tagName:function(e){return e.tagName},setTextContent:function(e,t){e.textContent=t},setStyleScope:function(e,t){e.setAttribute(t,"")}}),Yn={create:function(e,t){Qn(t)},update:function(e,t){e.data.ref!==t.data.ref&&(Qn(e,!0),Qn(t))},destroy:function(e){Qn(e,!0)}};function Qn(e,t){var r=e.data.ref;if(n(r)){var i=e.context,o=e.componentInstance||e.elm,a=i.$refs;t?Array.isArray(a[r])?h(a[r],o):a[r]===o&&(a[r]=void 0):e.data.refInFor?Array.isArray(a[r])?a[r].indexOf(o)<0&&a[r].push(o):a[r]=[o]:a[r]=o}}var er=new fe("",{},[]),tr=["create","activate","update","remove","destroy"];function nr(e,i){return e.key===i.key&&(e.tag===i.tag&&e.isComment===i.isComment&&n(e.data)===n(i.data)&&function(e,t){if("input"!==e.tag)return!0;var r,i=n(r=e.data)&&n(r=r.attrs)&&r.type,o=n(r=t.data)&&n(r=r.attrs)&&r.type;return i===o||Zn(i)&&Zn(o)}(e,i)||r(e.isAsyncPlaceholder)&&e.asyncFactory===i.asyncFactory&&t(i.asyncFactory.error))}function rr(e,t,r){var i,o,a={};for(i=t;i<=r;++i)n(o=e[i].key)&&(a[o]=i);return a}var ir={create:or,update:or,destroy:function(e){or(e,er)}};function or(e,t){(e.data.directives||t.data.directives)&&function(e,t){var n,r,i,o=e===er,a=t===er,s=sr(e.data.directives,e.context),c=sr(t.data.directives,t.context),u=[],l=[];for(n in c)r=s[n],i=c[n],r?(i.oldValue=r.value,i.oldArg=r.arg,ur(i,"update",t,e),i.def&&i.def.componentUpdated&&l.push(i)):(ur(i,"bind",t,e),i.def&&i.def.inserted&&u.push(i));if(u.length){var f=function(){for(var n=0;n<u.length;n++)ur(u[n],"inserted",t,e)};o?rt(t,"insert",f):f()}l.length&&rt(t,"postpatch",function(){for(var n=0;n<l.length;n++)ur(l[n],"componentUpdated",t,e)});if(!o)for(n in s)c[n]||ur(s[n],"unbind",e,e,a)}(e,t)}var ar=Object.create(null);function sr(e,t){var n,r,i=Object.create(null);if(!e)return i;for(n=0;n<e.length;n++)(r=e[n]).modifiers||(r.modifiers=ar),i[cr(r)]=r,r.def=Le(t.$options,"directives",r.name);return i}function cr(e){return e.rawName||e.name+"."+Object.keys(e.modifiers||{}).join(".")}function ur(e,t,n,r,i){var o=e.def&&e.def[t];if(o)try{o(n.elm,e,n,r,i)}catch(r){Re(r,n.context,"directive "+e.name+" "+t+" hook")}}var lr=[Yn,ir];function fr(e,r){var i=r.componentOptions;if(!(n(i)&&!1===i.Ctor.options.inheritAttrs||t(e.data.attrs)&&t(r.data.attrs))){var o,a,s=r.elm,c=e.data.attrs||{},u=r.data.attrs||{};for(o in n(u.__ob__)&&(u=r.data.attrs=k({},u)),u)a=u[o],c[o]!==a&&pr(s,o,a);for(o in(J||W)&&u.value!==c.value&&pr(s,"value",u.value),c)t(u[o])&&(Dn(o)?s.removeAttributeNS(In,Pn(o)):Nn(o)||s.removeAttribute(o))}}function pr(e,t,n){e.tagName.indexOf("-")>-1?dr(e,t,n):Mn(t)?Rn(n)?e.removeAttribute(t):(n="allowfullscreen"===t&&"EMBED"===e.tagName?"true":t,e.setAttribute(t,n)):Nn(t)?e.setAttribute(t,Ln(t,n)):Dn(t)?Rn(n)?e.removeAttributeNS(In,Pn(t)):e.setAttributeNS(In,t,n):dr(e,t,n)}function dr(e,t,n){if(Rn(n))e.removeAttribute(t);else{if(J&&!q&&"TEXTAREA"===e.tagName&&"placeholder"===t&&""!==n&&!e.__ieph){var r=function(t){t.stopImmediatePropagation(),e.removeEventListener("input",r)};e.addEventListener("input",r),e.__ieph=!0}e.setAttribute(t,n)}}var vr={create:fr,update:fr};function hr(e,r){var i=r.elm,o=r.data,a=e.data;if(!(t(o.staticClass)&&t(o.class)&&(t(a)||t(a.staticClass)&&t(a.class)))){var s=Fn(r),c=i._transitionClasses;n(c)&&(s=Bn(s,Un(c))),s!==i._prevClass&&(i.setAttribute("class",s),i._prevClass=s)}}var mr,yr,gr,_r,br,$r,wr={create:hr,update:hr},xr=/[\w).+\-_$\]]/;function Cr(e){var t,n,r,i,o,a=!1,s=!1,c=!1,u=!1,l=0,f=0,p=0,d=0;for(r=0;r<e.length;r++)if(n=t,t=e.charCodeAt(r),a)39===t&&92!==n&&(a=!1);else if(s)34===t&&92!==n&&(s=!1);else if(c)96===t&&92!==n&&(c=!1);else if(u)47===t&&92!==n&&(u=!1);else if(124!==t||124===e.charCodeAt(r+1)||124===e.charCodeAt(r-1)||l||f||p){switch(t){case 34:s=!0;break;case 39:a=!0;break;case 96:c=!0;break;case 40:p++;break;case 41:p--;break;case 91:f++;break;case 93:f--;break;case 123:l++;break;case 125:l--}if(47===t){for(var v=r-1,h=void 0;v>=0&&" "===(h=e.charAt(v));v--);h&&xr.test(h)||(u=!0)}}else void 0===i?(d=r+1,i=e.slice(0,r).trim()):m();function m(){(o||(o=[])).push(e.slice(d,r).trim()),d=r+1}if(void 0===i?i=e.slice(0,r).trim():0!==d&&m(),o)for(r=0;r<o.length;r++)i=Ar(i,o[r]);return i}function Ar(e,t){var n=t.indexOf("(");if(n<0)return'_f("'+t+'")('+e+")";var r=t.slice(0,n),i=t.slice(n+1);return'_f("'+r+'")('+e+(")"!==i?","+i:i)}function kr(e,t){console.error("[Vue compiler]: "+e)}function Or(e,t){return e?e.map(function(e){return e[t]}).filter(function(e){return e}):[]}function Sr(e,t,n,r,i){(e.props||(e.props=[])).push(Pr({name:t,value:n,dynamic:i},r)),e.plain=!1}function Tr(e,t,n,r,i){(i?e.dynamicAttrs||(e.dynamicAttrs=[]):e.attrs||(e.attrs=[])).push(Pr({name:t,value:n,dynamic:i},r)),e.plain=!1}function Er(e,t,n,r){e.attrsMap[t]=n,e.attrsList.push(Pr({name:t,value:n},r))}function Nr(e,t,n,r,i,o,a,s){(e.directives||(e.directives=[])).push(Pr({name:t,rawName:n,value:r,arg:i,isDynamicArg:o,modifiers:a},s)),e.plain=!1}function jr(e,t,n){return n?"_p("+t+',"'+e+'")':e+t}function Lr(t,n,r,i,o,a,s,c){var u;(i=i||e).right?c?n="("+n+")==='click'?'contextmenu':("+n+")":"click"===n&&(n="contextmenu",delete i.right):i.middle&&(c?n="("+n+")==='click'?'mouseup':("+n+")":"click"===n&&(n="mouseup")),i.capture&&(delete i.capture,n=jr("!",n,c)),i.once&&(delete i.once,n=jr("~",n,c)),i.passive&&(delete i.passive,n=jr("&",n,c)),i.native?(delete i.native,u=t.nativeEvents||(t.nativeEvents={})):u=t.events||(t.events={});var l=Pr({value:r.trim(),dynamic:c},s);i!==e&&(l.modifiers=i);var f=u[n];Array.isArray(f)?o?f.unshift(l):f.push(l):u[n]=f?o?[l,f]:[f,l]:l,t.plain=!1}function Mr(e,t,n){var r=Ir(e,":"+t)||Ir(e,"v-bind:"+t);if(null!=r)return Cr(r);if(!1!==n){var i=Ir(e,t);if(null!=i)return JSON.stringify(i)}}function Ir(e,t,n){var r;if(null!=(r=e.attrsMap[t]))for(var i=e.attrsList,o=0,a=i.length;o<a;o++)if(i[o].name===t){i.splice(o,1);break}return n&&delete e.attrsMap[t],r}function Dr(e,t){for(var n=e.attrsList,r=0,i=n.length;r<i;r++){var o=n[r];if(t.test(o.name))return n.splice(r,1),o}}function Pr(e,t){return t&&(null!=t.start&&(e.start=t.start),null!=t.end&&(e.end=t.end)),e}function Rr(e,t,n){var r=n||{},i=r.number,o="$$v";r.trim&&(o="(typeof $$v === 'string'? $$v.trim(): $$v)"),i&&(o="_n("+o+")");var a=Fr(t,o);e.model={value:"("+t+")",expression:JSON.stringify(t),callback:"function ($$v) {"+a+"}"}}function Fr(e,t){var n=function(e){if(e=e.trim(),mr=e.length,e.indexOf("[")<0||e.lastIndexOf("]")<mr-1)return(_r=e.lastIndexOf("."))>-1?{exp:e.slice(0,_r),key:'"'+e.slice(_r+1)+'"'}:{exp:e,key:null};yr=e,_r=br=$r=0;for(;!Br();)Ur(gr=Hr())?Vr(gr):91===gr&&zr(gr);return{exp:e.slice(0,br),key:e.slice(br+1,$r)}}(e);return null===n.key?e+"="+t:"$set("+n.exp+", "+n.key+", "+t+")"}function Hr(){return yr.charCodeAt(++_r)}function Br(){return _r>=mr}function Ur(e){return 34===e||39===e}function zr(e){var t=1;for(br=_r;!Br();)if(Ur(e=Hr()))Vr(e);else if(91===e&&t++,93===e&&t--,0===t){$r=_r;break}}function Vr(e){for(var t=e;!Br()&&(e=Hr())!==t;);}var Kr,Jr="__r",qr="__c";function Wr(e,t,n){var r=Kr;return function i(){null!==t.apply(null,arguments)&&Xr(e,i,n,r)}}var Zr=ze&&!(G&&Number(G[1])<=53);function Gr(e,t,n,r){if(Zr){var i=on,o=t;t=o._wrapper=function(e){if(e.target===e.currentTarget||e.timeStamp>=i||0===e.timeStamp||e.target.ownerDocument!==document)return o.apply(this,arguments)}}Kr.addEventListener(e,t,Y?{capture:n,passive:r}:n)}function Xr(e,t,n,r){(r||Kr).removeEventListener(e,t._wrapper||t,n)}function Yr(e,r){if(!t(e.data.on)||!t(r.data.on)){var i=r.data.on||{},o=e.data.on||{};Kr=r.elm,function(e){if(n(e[Jr])){var t=J?"change":"input";e[t]=[].concat(e[Jr],e[t]||[]),delete e[Jr]}n(e[qr])&&(e.change=[].concat(e[qr],e.change||[]),delete e[qr])}(i),nt(i,o,Gr,Xr,Wr,r.context),Kr=void 0}}var Qr,ei={create:Yr,update:Yr};function ti(e,r){if(!t(e.data.domProps)||!t(r.data.domProps)){var i,o,a=r.elm,s=e.data.domProps||{},c=r.data.domProps||{};for(i in n(c.__ob__)&&(c=r.data.domProps=k({},c)),s)t(c[i])&&(a[i]="");for(i in c){if(o=c[i],"textContent"===i||"innerHTML"===i){if(r.children&&(r.children.length=0),o===s[i])continue;1===a.childNodes.length&&a.removeChild(a.childNodes[0])}if("value"===i||o!==s[i])if("value"===i){a._value=o;var u=t(o)?"":String(o);ni(a,u)&&(a.value=u)}else if("innerHTML"===i&&Kn(a.tagName)&&t(a.innerHTML)){(Qr=Qr||document.createElement("div")).innerHTML="<svg>"+o+"</svg>";for(var l=Qr.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;l.firstChild;)a.appendChild(l.firstChild)}else a[i]=o}}}function ni(e,t){return!e.composing&&("OPTION"===e.tagName||function(e,t){var n=!0;try{n=document.activeElement!==e}catch(e){}return n&&e.value!==t}(e,t)||function(e,t){var r=e.value,i=e._vModifiers;if(n(i)){if(i.number)return f(r)!==f(t);if(i.trim)return r.trim()!==t.trim()}return r!==t}(e,t))}var ri={create:ti,update:ti},ii=g(function(e){var t={},n=/:(.+)/;return e.split(/;(?![^(]*\))/g).forEach(function(e){if(e){var r=e.split(n);r.length>1&&(t[r[0].trim()]=r[1].trim())}}),t});function oi(e){var t=ai(e.style);return e.staticStyle?k(e.staticStyle,t):t}function ai(e){return Array.isArray(e)?O(e):"string"==typeof e?ii(e):e}var si,ci=/^--/,ui=/\s*!important$/,li=function(e,t,n){if(ci.test(t))e.style.setProperty(t,n);else if(ui.test(n))e.style.setProperty(x(t),n.replace(ui,""),"important");else{var r=pi(t);if(Array.isArray(n))for(var i=0,o=n.length;i<o;i++)e.style[r]=n[i];else e.style[r]=n}},fi=["Webkit","Moz","ms"],pi=g(function(e){if(si=si||document.createElement("div").style,"filter"!==(e=b(e))&&e in si)return e;for(var t=e.charAt(0).toUpperCase()+e.slice(1),n=0;n<fi.length;n++){var r=fi[n]+t;if(r in si)return r}});function di(e,r){var i=r.data,o=e.data;if(!(t(i.staticStyle)&&t(i.style)&&t(o.staticStyle)&&t(o.style))){var a,s,c=r.elm,u=o.staticStyle,l=o.normalizedStyle||o.style||{},f=u||l,p=ai(r.data.style)||{};r.data.normalizedStyle=n(p.__ob__)?k({},p):p;var d=function(e,t){var n,r={};if(t)for(var i=e;i.componentInstance;)(i=i.componentInstance._vnode)&&i.data&&(n=oi(i.data))&&k(r,n);(n=oi(e.data))&&k(r,n);for(var o=e;o=o.parent;)o.data&&(n=oi(o.data))&&k(r,n);return r}(r,!0);for(s in f)t(d[s])&&li(c,s,"");for(s in d)(a=d[s])!==f[s]&&li(c,s,null==a?"":a)}}var vi={create:di,update:di},hi=/\s+/;function mi(e,t){if(t&&(t=t.trim()))if(e.classList)t.indexOf(" ")>-1?t.split(hi).forEach(function(t){return e.classList.add(t)}):e.classList.add(t);else{var n=" "+(e.getAttribute("class")||"")+" ";n.indexOf(" "+t+" ")<0&&e.setAttribute("class",(n+t).trim())}}function yi(e,t){if(t&&(t=t.trim()))if(e.classList)t.indexOf(" ")>-1?t.split(hi).forEach(function(t){return e.classList.remove(t)}):e.classList.remove(t),e.classList.length||e.removeAttribute("class");else{for(var n=" "+(e.getAttribute("class")||"")+" ",r=" "+t+" ";n.indexOf(r)>=0;)n=n.replace(r," ");(n=n.trim())?e.setAttribute("class",n):e.removeAttribute("class")}}function gi(e){if(e){if("object"==typeof e){var t={};return!1!==e.css&&k(t,_i(e.name||"v")),k(t,e),t}return"string"==typeof e?_i(e):void 0}}var _i=g(function(e){return{enterClass:e+"-enter",enterToClass:e+"-enter-to",enterActiveClass:e+"-enter-active",leaveClass:e+"-leave",leaveToClass:e+"-leave-to",leaveActiveClass:e+"-leave-active"}}),bi=U&&!q,$i="transition",wi="animation",xi="transition",Ci="transitionend",Ai="animation",ki="animationend";bi&&(void 0===window.ontransitionend&&void 0!==window.onwebkittransitionend&&(xi="WebkitTransition",Ci="webkitTransitionEnd"),void 0===window.onanimationend&&void 0!==window.onwebkitanimationend&&(Ai="WebkitAnimation",ki="webkitAnimationEnd"));var Oi=U?window.requestAnimationFrame?window.requestAnimationFrame.bind(window):setTimeout:function(e){return e()};function Si(e){Oi(function(){Oi(e)})}function Ti(e,t){var n=e._transitionClasses||(e._transitionClasses=[]);n.indexOf(t)<0&&(n.push(t),mi(e,t))}function Ei(e,t){e._transitionClasses&&h(e._transitionClasses,t),yi(e,t)}function Ni(e,t,n){var r=Li(e,t),i=r.type,o=r.timeout,a=r.propCount;if(!i)return n();var s=i===$i?Ci:ki,c=0,u=function(){e.removeEventListener(s,l),n()},l=function(t){t.target===e&&++c>=a&&u()};setTimeout(function(){c<a&&u()},o+1),e.addEventListener(s,l)}var ji=/\b(transform|all)(,|$)/;function Li(e,t){var n,r=window.getComputedStyle(e),i=(r[xi+"Delay"]||"").split(", "),o=(r[xi+"Duration"]||"").split(", "),a=Mi(i,o),s=(r[Ai+"Delay"]||"").split(", "),c=(r[Ai+"Duration"]||"").split(", "),u=Mi(s,c),l=0,f=0;return t===$i?a>0&&(n=$i,l=a,f=o.length):t===wi?u>0&&(n=wi,l=u,f=c.length):f=(n=(l=Math.max(a,u))>0?a>u?$i:wi:null)?n===$i?o.length:c.length:0,{type:n,timeout:l,propCount:f,hasTransform:n===$i&&ji.test(r[xi+"Property"])}}function Mi(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max.apply(null,t.map(function(t,n){return Ii(t)+Ii(e[n])}))}function Ii(e){return 1e3*Number(e.slice(0,-1).replace(",","."))}function Di(e,r){var i=e.elm;n(i._leaveCb)&&(i._leaveCb.cancelled=!0,i._leaveCb());var a=gi(e.data.transition);if(!t(a)&&!n(i._enterCb)&&1===i.nodeType){for(var s=a.css,c=a.type,u=a.enterClass,l=a.enterToClass,p=a.enterActiveClass,d=a.appearClass,v=a.appearToClass,h=a.appearActiveClass,m=a.beforeEnter,y=a.enter,g=a.afterEnter,_=a.enterCancelled,b=a.beforeAppear,$=a.appear,w=a.afterAppear,x=a.appearCancelled,C=a.duration,A=qt,k=qt.$vnode;k&&k.parent;)A=(k=k.parent).context;var O=!A._isMounted||!e.isRootInsert;if(!O||$||""===$){var S=O&&d?d:u,T=O&&h?h:p,E=O&&v?v:l,N=O&&b||m,j=O&&"function"==typeof $?$:y,M=O&&w||g,I=O&&x||_,D=f(o(C)?C.enter:C),P=!1!==s&&!q,R=Fi(j),F=i._enterCb=L(function(){P&&(Ei(i,E),Ei(i,T)),F.cancelled?(P&&Ei(i,S),I&&I(i)):M&&M(i),i._enterCb=null});e.data.show||rt(e,"insert",function(){var t=i.parentNode,n=t&&t._pending&&t._pending[e.key];n&&n.tag===e.tag&&n.elm._leaveCb&&n.elm._leaveCb(),j&&j(i,F)}),N&&N(i),P&&(Ti(i,S),Ti(i,T),Si(function(){Ei(i,S),F.cancelled||(Ti(i,E),R||(Ri(D)?setTimeout(F,D):Ni(i,c,F)))})),e.data.show&&(r&&r(),j&&j(i,F)),P||R||F()}}}function Pi(e,r){var i=e.elm;n(i._enterCb)&&(i._enterCb.cancelled=!0,i._enterCb());var a=gi(e.data.transition);if(t(a)||1!==i.nodeType)return r();if(!n(i._leaveCb)){var s=a.css,c=a.type,u=a.leaveClass,l=a.leaveToClass,p=a.leaveActiveClass,d=a.beforeLeave,v=a.leave,h=a.afterLeave,m=a.leaveCancelled,y=a.delayLeave,g=a.duration,_=!1!==s&&!q,b=Fi(v),$=f(o(g)?g.leave:g),w=i._leaveCb=L(function(){i.parentNode&&i.parentNode._pending&&(i.parentNode._pending[e.key]=null),_&&(Ei(i,l),Ei(i,p)),w.cancelled?(_&&Ei(i,u),m&&m(i)):(r(),h&&h(i)),i._leaveCb=null});y?y(x):x()}function x(){w.cancelled||(!e.data.show&&i.parentNode&&((i.parentNode._pending||(i.parentNode._pending={}))[e.key]=e),d&&d(i),_&&(Ti(i,u),Ti(i,p),Si(function(){Ei(i,u),w.cancelled||(Ti(i,l),b||(Ri($)?setTimeout(w,$):Ni(i,c,w)))})),v&&v(i,w),_||b||w())}}function Ri(e){return"number"==typeof e&&!isNaN(e)}function Fi(e){if(t(e))return!1;var r=e.fns;return n(r)?Fi(Array.isArray(r)?r[0]:r):(e._length||e.length)>1}function Hi(e,t){!0!==t.data.show&&Di(t)}var Bi=function(e){var o,a,s={},c=e.modules,u=e.nodeOps;for(o=0;o<tr.length;++o)for(s[tr[o]]=[],a=0;a<c.length;++a)n(c[a][tr[o]])&&s[tr[o]].push(c[a][tr[o]]);function l(e){var t=u.parentNode(e);n(t)&&u.removeChild(t,e)}function f(e,t,i,o,a,c,l){if(n(e.elm)&&n(c)&&(e=c[l]=he(e)),e.isRootInsert=!a,!function(e,t,i,o){var a=e.data;if(n(a)){var c=n(e.componentInstance)&&a.keepAlive;if(n(a=a.hook)&&n(a=a.init)&&a(e,!1),n(e.componentInstance))return d(e,t),v(i,e.elm,o),r(c)&&function(e,t,r,i){for(var o,a=e;a.componentInstance;)if(a=a.componentInstance._vnode,n(o=a.data)&&n(o=o.transition)){for(o=0;o<s.activate.length;++o)s.activate[o](er,a);t.push(a);break}v(r,e.elm,i)}(e,t,i,o),!0}}(e,t,i,o)){var f=e.data,p=e.children,m=e.tag;n(m)?(e.elm=e.ns?u.createElementNS(e.ns,m):u.createElement(m,e),g(e),h(e,p,t),n(f)&&y(e,t),v(i,e.elm,o)):r(e.isComment)?(e.elm=u.createComment(e.text),v(i,e.elm,o)):(e.elm=u.createTextNode(e.text),v(i,e.elm,o))}}function d(e,t){n(e.data.pendingInsert)&&(t.push.apply(t,e.data.pendingInsert),e.data.pendingInsert=null),e.elm=e.componentInstance.$el,m(e)?(y(e,t),g(e)):(Qn(e),t.push(e))}function v(e,t,r){n(e)&&(n(r)?u.parentNode(r)===e&&u.insertBefore(e,t,r):u.appendChild(e,t))}function h(e,t,n){if(Array.isArray(t))for(var r=0;r<t.length;++r)f(t[r],n,e.elm,null,!0,t,r);else i(e.text)&&u.appendChild(e.elm,u.createTextNode(String(e.text)))}function m(e){for(;e.componentInstance;)e=e.componentInstance._vnode;return n(e.tag)}function y(e,t){for(var r=0;r<s.create.length;++r)s.create[r](er,e);n(o=e.data.hook)&&(n(o.create)&&o.create(er,e),n(o.insert)&&t.push(e))}function g(e){var t;if(n(t=e.fnScopeId))u.setStyleScope(e.elm,t);else for(var r=e;r;)n(t=r.context)&&n(t=t.$options._scopeId)&&u.setStyleScope(e.elm,t),r=r.parent;n(t=qt)&&t!==e.context&&t!==e.fnContext&&n(t=t.$options._scopeId)&&u.setStyleScope(e.elm,t)}function _(e,t,n,r,i,o){for(;r<=i;++r)f(n[r],o,e,t,!1,n,r)}function b(e){var t,r,i=e.data;if(n(i))for(n(t=i.hook)&&n(t=t.destroy)&&t(e),t=0;t<s.destroy.length;++t)s.destroy[t](e);if(n(t=e.children))for(r=0;r<e.children.length;++r)b(e.children[r])}function $(e,t,r,i){for(;r<=i;++r){var o=t[r];n(o)&&(n(o.tag)?(w(o),b(o)):l(o.elm))}}function w(e,t){if(n(t)||n(e.data)){var r,i=s.remove.length+1;for(n(t)?t.listeners+=i:t=function(e,t){function n(){0==--n.listeners&&l(e)}return n.listeners=t,n}(e.elm,i),n(r=e.componentInstance)&&n(r=r._vnode)&&n(r.data)&&w(r,t),r=0;r<s.remove.length;++r)s.remove[r](e,t);n(r=e.data.hook)&&n(r=r.remove)?r(e,t):t()}else l(e.elm)}function x(e,t,r,i){for(var o=r;o<i;o++){var a=t[o];if(n(a)&&nr(e,a))return o}}function C(e,i,o,a,c,l){if(e!==i){n(i.elm)&&n(a)&&(i=a[c]=he(i));var p=i.elm=e.elm;if(r(e.isAsyncPlaceholder))n(i.asyncFactory.resolved)?O(e.elm,i,o):i.isAsyncPlaceholder=!0;else if(r(i.isStatic)&&r(e.isStatic)&&i.key===e.key&&(r(i.isCloned)||r(i.isOnce)))i.componentInstance=e.componentInstance;else{var d,v=i.data;n(v)&&n(d=v.hook)&&n(d=d.prepatch)&&d(e,i);var h=e.children,y=i.children;if(n(v)&&m(i)){for(d=0;d<s.update.length;++d)s.update[d](e,i);n(d=v.hook)&&n(d=d.update)&&d(e,i)}t(i.text)?n(h)&&n(y)?h!==y&&function(e,r,i,o,a){for(var s,c,l,p=0,d=0,v=r.length-1,h=r[0],m=r[v],y=i.length-1,g=i[0],b=i[y],w=!a;p<=v&&d<=y;)t(h)?h=r[++p]:t(m)?m=r[--v]:nr(h,g)?(C(h,g,o,i,d),h=r[++p],g=i[++d]):nr(m,b)?(C(m,b,o,i,y),m=r[--v],b=i[--y]):nr(h,b)?(C(h,b,o,i,y),w&&u.insertBefore(e,h.elm,u.nextSibling(m.elm)),h=r[++p],b=i[--y]):nr(m,g)?(C(m,g,o,i,d),w&&u.insertBefore(e,m.elm,h.elm),m=r[--v],g=i[++d]):(t(s)&&(s=rr(r,p,v)),t(c=n(g.key)?s[g.key]:x(g,r,p,v))?f(g,o,e,h.elm,!1,i,d):nr(l=r[c],g)?(C(l,g,o,i,d),r[c]=void 0,w&&u.insertBefore(e,l.elm,h.elm)):f(g,o,e,h.elm,!1,i,d),g=i[++d]);p>v?_(e,t(i[y+1])?null:i[y+1].elm,i,d,y,o):d>y&&$(0,r,p,v)}(p,h,y,o,l):n(y)?(n(e.text)&&u.setTextContent(p,""),_(p,null,y,0,y.length-1,o)):n(h)?$(0,h,0,h.length-1):n(e.text)&&u.setTextContent(p,""):e.text!==i.text&&u.setTextContent(p,i.text),n(v)&&n(d=v.hook)&&n(d=d.postpatch)&&d(e,i)}}}function A(e,t,i){if(r(i)&&n(e.parent))e.parent.data.pendingInsert=t;else for(var o=0;o<t.length;++o)t[o].data.hook.insert(t[o])}var k=p("attrs,class,staticClass,staticStyle,key");function O(e,t,i,o){var a,s=t.tag,c=t.data,u=t.children;if(o=o||c&&c.pre,t.elm=e,r(t.isComment)&&n(t.asyncFactory))return t.isAsyncPlaceholder=!0,!0;if(n(c)&&(n(a=c.hook)&&n(a=a.init)&&a(t,!0),n(a=t.componentInstance)))return d(t,i),!0;if(n(s)){if(n(u))if(e.hasChildNodes())if(n(a=c)&&n(a=a.domProps)&&n(a=a.innerHTML)){if(a!==e.innerHTML)return!1}else{for(var l=!0,f=e.firstChild,p=0;p<u.length;p++){if(!f||!O(f,u[p],i,o)){l=!1;break}f=f.nextSibling}if(!l||f)return!1}else h(t,u,i);if(n(c)){var v=!1;for(var m in c)if(!k(m)){v=!0,y(t,i);break}!v&&c.class&&Qe(c.class)}}else e.data!==t.text&&(e.data=t.text);return!0}return function(e,i,o,a){if(!t(i)){var c,l=!1,p=[];if(t(e))l=!0,f(i,p);else{var d=n(e.nodeType);if(!d&&nr(e,i))C(e,i,p,null,null,a);else{if(d){if(1===e.nodeType&&e.hasAttribute(M)&&(e.removeAttribute(M),o=!0),r(o)&&O(e,i,p))return A(i,p,!0),e;c=e,e=new fe(u.tagName(c).toLowerCase(),{},[],void 0,c)}var v=e.elm,h=u.parentNode(v);if(f(i,p,v._leaveCb?null:h,u.nextSibling(v)),n(i.parent))for(var y=i.parent,g=m(i);y;){for(var _=0;_<s.destroy.length;++_)s.destroy[_](y);if(y.elm=i.elm,g){for(var w=0;w<s.create.length;++w)s.create[w](er,y);var x=y.data.hook.insert;if(x.merged)for(var k=1;k<x.fns.length;k++)x.fns[k]()}else Qn(y);y=y.parent}n(h)?$(0,[e],0,0):n(e.tag)&&b(e)}}return A(i,p,l),i.elm}n(e)&&b(e)}}({nodeOps:Xn,modules:[vr,wr,ei,ri,vi,U?{create:Hi,activate:Hi,remove:function(e,t){!0!==e.data.show?Pi(e,t):t()}}:{}].concat(lr)});q&&document.addEventListener("selectionchange",function(){var e=document.activeElement;e&&e.vmodel&&Zi(e,"input")});var Ui={inserted:function(e,t,n,r){"select"===n.tag?(r.elm&&!r.elm._vOptions?rt(n,"postpatch",function(){Ui.componentUpdated(e,t,n)}):zi(e,t,n.context),e._vOptions=[].map.call(e.options,Ji)):("textarea"===n.tag||Zn(e.type))&&(e._vModifiers=t.modifiers,t.modifiers.lazy||(e.addEventListener("compositionstart",qi),e.addEventListener("compositionend",Wi),e.addEventListener("change",Wi),q&&(e.vmodel=!0)))},componentUpdated:function(e,t,n){if("select"===n.tag){zi(e,t,n.context);var r=e._vOptions,i=e._vOptions=[].map.call(e.options,Ji);if(i.some(function(e,t){return!N(e,r[t])}))(e.multiple?t.value.some(function(e){return Ki(e,i)}):t.value!==t.oldValue&&Ki(t.value,i))&&Zi(e,"change")}}};function zi(e,t,n){Vi(e,t,n),(J||W)&&setTimeout(function(){Vi(e,t,n)},0)}function Vi(e,t,n){var r=t.value,i=e.multiple;if(!i||Array.isArray(r)){for(var o,a,s=0,c=e.options.length;s<c;s++)if(a=e.options[s],i)o=j(r,Ji(a))>-1,a.selected!==o&&(a.selected=o);else if(N(Ji(a),r))return void(e.selectedIndex!==s&&(e.selectedIndex=s));i||(e.selectedIndex=-1)}}function Ki(e,t){return t.every(function(t){return!N(t,e)})}function Ji(e){return"_value"in e?e._value:e.value}function qi(e){e.target.composing=!0}function Wi(e){e.target.composing&&(e.target.composing=!1,Zi(e.target,"input"))}function Zi(e,t){var n=document.createEvent("HTMLEvents");n.initEvent(t,!0,!0),e.dispatchEvent(n)}function Gi(e){return!e.componentInstance||e.data&&e.data.transition?e:Gi(e.componentInstance._vnode)}var Xi={model:Ui,show:{bind:function(e,t,n){var r=t.value,i=(n=Gi(n)).data&&n.data.transition,o=e.__vOriginalDisplay="none"===e.style.display?"":e.style.display;r&&i?(n.data.show=!0,Di(n,function(){e.style.display=o})):e.style.display=r?o:"none"},update:function(e,t,n){var r=t.value;!r!=!t.oldValue&&((n=Gi(n)).data&&n.data.transition?(n.data.show=!0,r?Di(n,function(){e.style.display=e.__vOriginalDisplay}):Pi(n,function(){e.style.display="none"})):e.style.display=r?e.__vOriginalDisplay:"none")},unbind:function(e,t,n,r,i){i||(e.style.display=e.__vOriginalDisplay)}}},Yi={name:String,appear:Boolean,css:Boolean,mode:String,type:String,enterClass:String,leaveClass:String,enterToClass:String,leaveToClass:String,enterActiveClass:String,leaveActiveClass:String,appearClass:String,appearActiveClass:String,appearToClass:String,duration:[Number,String,Object]};function Qi(e){var t=e&&e.componentOptions;return t&&t.Ctor.options.abstract?Qi(Ut(t.children)):e}function eo(e){var t={},n=e.$options;for(var r in n.propsData)t[r]=e[r];var i=n._parentListeners;for(var o in i)t[b(o)]=i[o];return t}function to(e,t){if(/\d-keep-alive$/.test(t.tag))return e("keep-alive",{props:t.componentOptions.propsData})}var no=function(e){return e.tag||Bt(e)},ro=function(e){return"show"===e.name},io={name:"transition",props:Yi,abstract:!0,render:function(e){var t=this,n=this.$slots.default;if(n&&(n=n.filter(no)).length){var r=this.mode,o=n[0];if(function(e){for(;e=e.parent;)if(e.data.transition)return!0}(this.$vnode))return o;var a=Qi(o);if(!a)return o;if(this._leaving)return to(e,o);var s="__transition-"+this._uid+"-";a.key=null==a.key?a.isComment?s+"comment":s+a.tag:i(a.key)?0===String(a.key).indexOf(s)?a.key:s+a.key:a.key;var c=(a.data||(a.data={})).transition=eo(this),u=this._vnode,l=Qi(u);if(a.data.directives&&a.data.directives.some(ro)&&(a.data.show=!0),l&&l.data&&!function(e,t){return t.key===e.key&&t.tag===e.tag}(a,l)&&!Bt(l)&&(!l.componentInstance||!l.componentInstance._vnode.isComment)){var f=l.data.transition=k({},c);if("out-in"===r)return this._leaving=!0,rt(f,"afterLeave",function(){t._leaving=!1,t.$forceUpdate()}),to(e,o);if("in-out"===r){if(Bt(a))return u;var p,d=function(){p()};rt(c,"afterEnter",d),rt(c,"enterCancelled",d),rt(f,"delayLeave",function(e){p=e})}}return o}}},oo=k({tag:String,moveClass:String},Yi);function ao(e){e.elm._moveCb&&e.elm._moveCb(),e.elm._enterCb&&e.elm._enterCb()}function so(e){e.data.newPos=e.elm.getBoundingClientRect()}function co(e){var t=e.data.pos,n=e.data.newPos,r=t.left-n.left,i=t.top-n.top;if(r||i){e.data.moved=!0;var o=e.elm.style;o.transform=o.WebkitTransform="translate("+r+"px,"+i+"px)",o.transitionDuration="0s"}}delete oo.mode;var uo={Transition:io,TransitionGroup:{props:oo,beforeMount:function(){var e=this,t=this._update;this._update=function(n,r){var i=Wt(e);e.__patch__(e._vnode,e.kept,!1,!0),e._vnode=e.kept,i(),t.call(e,n,r)}},render:function(e){for(var t=this.tag||this.$vnode.data.tag||"span",n=Object.create(null),r=this.prevChildren=this.children,i=this.$slots.default||[],o=this.children=[],a=eo(this),s=0;s<i.length;s++){var c=i[s];c.tag&&null!=c.key&&0!==String(c.key).indexOf("__vlist")&&(o.push(c),n[c.key]=c,(c.data||(c.data={})).transition=a)}if(r){for(var u=[],l=[],f=0;f<r.length;f++){var p=r[f];p.data.transition=a,p.data.pos=p.elm.getBoundingClientRect(),n[p.key]?u.push(p):l.push(p)}this.kept=e(t,null,u),this.removed=l}return e(t,null,o)},updated:function(){var e=this.prevChildren,t=this.moveClass||(this.name||"v")+"-move";e.length&&this.hasMove(e[0].elm,t)&&(e.forEach(ao),e.forEach(so),e.forEach(co),this._reflow=document.body.offsetHeight,e.forEach(function(e){if(e.data.moved){var n=e.elm,r=n.style;Ti(n,t),r.transform=r.WebkitTransform=r.transitionDuration="",n.addEventListener(Ci,n._moveCb=function e(r){r&&r.target!==n||r&&!/transform$/.test(r.propertyName)||(n.removeEventListener(Ci,e),n._moveCb=null,Ei(n,t))})}}))},methods:{hasMove:function(e,t){if(!bi)return!1;if(this._hasMove)return this._hasMove;var n=e.cloneNode();e._transitionClasses&&e._transitionClasses.forEach(function(e){yi(n,e)}),mi(n,t),n.style.display="none",this.$el.appendChild(n);var r=Li(n);return this.$el.removeChild(n),this._hasMove=r.hasTransform}}}};bn.config.mustUseProp=En,bn.config.isReservedTag=Jn,bn.config.isReservedAttr=Sn,bn.config.getTagNamespace=qn,bn.config.isUnknownElement=function(e){if(!U)return!0;if(Jn(e))return!1;if(e=e.toLowerCase(),null!=Wn[e])return Wn[e];var t=document.createElement(e);return e.indexOf("-")>-1?Wn[e]=t.constructor===window.HTMLUnknownElement||t.constructor===window.HTMLElement:Wn[e]=/HTMLUnknownElement/.test(t.toString())},k(bn.options.directives,Xi),k(bn.options.components,uo),bn.prototype.__patch__=U?Bi:S,bn.prototype.$mount=function(e,t){return function(e,t,n){var r;return e.$el=t,e.$options.render||(e.$options.render=de),Xt(e,"beforeMount"),r=function(){e._update(e._render(),n)},new un(e,r,S,{before:function(){e._isMounted&&!e._isDestroyed&&Xt(e,"beforeUpdate")}},!0),n=!1,null==e.$vnode&&(e._isMounted=!0,Xt(e,"mounted")),e}(this,e=e&&U?Gn(e):void 0,t)},U&&setTimeout(function(){P.devtools&&te&&te.emit("init",bn)},0);var lo=/\{\{((?:.|\r?\n)+?)\}\}/g,fo=/[-.*+?^${}()|[\]\/\\]/g,po=g(function(e){var t=e[0].replace(fo,"\\$&"),n=e[1].replace(fo,"\\$&");return new RegExp(t+"((?:.|\\n)+?)"+n,"g")});var vo={staticKeys:["staticClass"],transformNode:function(e,t){t.warn;var n=Ir(e,"class");n&&(e.staticClass=JSON.stringify(n));var r=Mr(e,"class",!1);r&&(e.classBinding=r)},genData:function(e){var t="";return e.staticClass&&(t+="staticClass:"+e.staticClass+","),e.classBinding&&(t+="class:"+e.classBinding+","),t}};var ho,mo={staticKeys:["staticStyle"],transformNode:function(e,t){t.warn;var n=Ir(e,"style");n&&(e.staticStyle=JSON.stringify(ii(n)));var r=Mr(e,"style",!1);r&&(e.styleBinding=r)},genData:function(e){var t="";return e.staticStyle&&(t+="staticStyle:"+e.staticStyle+","),e.styleBinding&&(t+="style:("+e.styleBinding+"),"),t}},yo=function(e){return(ho=ho||document.createElement("div")).innerHTML=e,ho.textContent},go=p("area,base,br,col,embed,frame,hr,img,input,isindex,keygen,link,meta,param,source,track,wbr"),_o=p("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source"),bo=p("address,article,aside,base,blockquote,body,caption,col,colgroup,dd,details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,title,tr,track"),$o=/^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/,wo=/^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/,xo="[a-zA-Z_][\\-\\.0-9_a-zA-Za-zA-Z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c-\u200d\u203f-\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]*",Co="((?:"+xo+"\\:)?"+xo+")",Ao=new RegExp("^<"+Co),ko=/^\s*(\/?)>/,Oo=new RegExp("^<\\/"+Co+"[^>]*>"),So=/^<!DOCTYPE [^>]+>/i,To=/^<!\--/,Eo=/^<!\[/,No=p("script,style,textarea",!0),jo={},Lo={"&lt;":"<","&gt;":">","&quot;":'"',"&amp;":"&","&#10;":"\n","&#9;":"\t","&#39;":"'"},Mo=/&(?:lt|gt|quot|amp|#39);/g,Io=/&(?:lt|gt|quot|amp|#39|#10|#9);/g,Do=p("pre,textarea",!0),Po=function(e,t){return e&&Do(e)&&"\n"===t[0]};function Ro(e,t){var n=t?Io:Mo;return e.replace(n,function(e){return Lo[e]})}var Fo,Ho,Bo,Uo,zo,Vo,Ko,Jo,qo=/^@|^v-on:/,Wo=/^v-|^@|^:/,Zo=/([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,Go=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,Xo=/^\(|\)$/g,Yo=/^\[.*\]$/,Qo=/:(.*)$/,ea=/^:|^\.|^v-bind:/,ta=/\.[^.]+/g,na=/^v-slot(:|$)|^#/,ra=/[\r\n]/,ia=/\s+/g,oa=g(yo),aa="_empty_";function sa(e,t,n){return{type:1,tag:e,attrsList:t,attrsMap:va(t),rawAttrsMap:{},parent:n,children:[]}}function ca(e,t){Fo=t.warn||kr,Vo=t.isPreTag||T,Ko=t.mustUseProp||T,Jo=t.getTagNamespace||T;t.isReservedTag;Bo=Or(t.modules,"transformNode"),Uo=Or(t.modules,"preTransformNode"),zo=Or(t.modules,"postTransformNode"),Ho=t.delimiters;var n,r,i=[],o=!1!==t.preserveWhitespace,a=t.whitespace,s=!1,c=!1;function u(e){if(l(e),s||e.processed||(e=ua(e,t)),i.length||e===n||n.if&&(e.elseif||e.else)&&fa(n,{exp:e.elseif,block:e}),r&&!e.forbidden)if(e.elseif||e.else)a=e,(u=function(e){var t=e.length;for(;t--;){if(1===e[t].type)return e[t];e.pop()}}(r.children))&&u.if&&fa(u,{exp:a.elseif,block:a});else{if(e.slotScope){var o=e.slotTarget||'"default"';(r.scopedSlots||(r.scopedSlots={}))[o]=e}r.children.push(e),e.parent=r}var a,u;e.children=e.children.filter(function(e){return!e.slotScope}),l(e),e.pre&&(s=!1),Vo(e.tag)&&(c=!1);for(var f=0;f<zo.length;f++)zo[f](e,t)}function l(e){if(!c)for(var t;(t=e.children[e.children.length-1])&&3===t.type&&" "===t.text;)e.children.pop()}return function(e,t){for(var n,r,i=[],o=t.expectHTML,a=t.isUnaryTag||T,s=t.canBeLeftOpenTag||T,c=0;e;){if(n=e,r&&No(r)){var u=0,l=r.toLowerCase(),f=jo[l]||(jo[l]=new RegExp("([\\s\\S]*?)(</"+l+"[^>]*>)","i")),p=e.replace(f,function(e,n,r){return u=r.length,No(l)||"noscript"===l||(n=n.replace(/<!\--([\s\S]*?)-->/g,"$1").replace(/<!\[CDATA\[([\s\S]*?)]]>/g,"$1")),Po(l,n)&&(n=n.slice(1)),t.chars&&t.chars(n),""});c+=e.length-p.length,e=p,k(l,c-u,c)}else{var d=e.indexOf("<");if(0===d){if(To.test(e)){var v=e.indexOf("--\x3e");if(v>=0){t.shouldKeepComment&&t.comment(e.substring(4,v),c,c+v+3),x(v+3);continue}}if(Eo.test(e)){var h=e.indexOf("]>");if(h>=0){x(h+2);continue}}var m=e.match(So);if(m){x(m[0].length);continue}var y=e.match(Oo);if(y){var g=c;x(y[0].length),k(y[1],g,c);continue}var _=C();if(_){A(_),Po(_.tagName,e)&&x(1);continue}}var b=void 0,$=void 0,w=void 0;if(d>=0){for($=e.slice(d);!(Oo.test($)||Ao.test($)||To.test($)||Eo.test($)||(w=$.indexOf("<",1))<0);)d+=w,$=e.slice(d);b=e.substring(0,d)}d<0&&(b=e),b&&x(b.length),t.chars&&b&&t.chars(b,c-b.length,c)}if(e===n){t.chars&&t.chars(e);break}}function x(t){c+=t,e=e.substring(t)}function C(){var t=e.match(Ao);if(t){var n,r,i={tagName:t[1],attrs:[],start:c};for(x(t[0].length);!(n=e.match(ko))&&(r=e.match(wo)||e.match($o));)r.start=c,x(r[0].length),r.end=c,i.attrs.push(r);if(n)return i.unarySlash=n[1],x(n[0].length),i.end=c,i}}function A(e){var n=e.tagName,c=e.unarySlash;o&&("p"===r&&bo(n)&&k(r),s(n)&&r===n&&k(n));for(var u=a(n)||!!c,l=e.attrs.length,f=new Array(l),p=0;p<l;p++){var d=e.attrs[p],v=d[3]||d[4]||d[5]||"",h="a"===n&&"href"===d[1]?t.shouldDecodeNewlinesForHref:t.shouldDecodeNewlines;f[p]={name:d[1],value:Ro(v,h)}}u||(i.push({tag:n,lowerCasedTag:n.toLowerCase(),attrs:f,start:e.start,end:e.end}),r=n),t.start&&t.start(n,f,u,e.start,e.end)}function k(e,n,o){var a,s;if(null==n&&(n=c),null==o&&(o=c),e)for(s=e.toLowerCase(),a=i.length-1;a>=0&&i[a].lowerCasedTag!==s;a--);else a=0;if(a>=0){for(var u=i.length-1;u>=a;u--)t.end&&t.end(i[u].tag,n,o);i.length=a,r=a&&i[a-1].tag}else"br"===s?t.start&&t.start(e,[],!0,n,o):"p"===s&&(t.start&&t.start(e,[],!1,n,o),t.end&&t.end(e,n,o))}k()}(e,{warn:Fo,expectHTML:t.expectHTML,isUnaryTag:t.isUnaryTag,canBeLeftOpenTag:t.canBeLeftOpenTag,shouldDecodeNewlines:t.shouldDecodeNewlines,shouldDecodeNewlinesForHref:t.shouldDecodeNewlinesForHref,shouldKeepComment:t.comments,outputSourceRange:t.outputSourceRange,start:function(e,o,a,l){var f=r&&r.ns||Jo(e);J&&"svg"===f&&(o=function(e){for(var t=[],n=0;n<e.length;n++){var r=e[n];ha.test(r.name)||(r.name=r.name.replace(ma,""),t.push(r))}return t}(o));var p,d=sa(e,o,r);f&&(d.ns=f),"style"!==(p=d).tag&&("script"!==p.tag||p.attrsMap.type&&"text/javascript"!==p.attrsMap.type)||ee()||(d.forbidden=!0);for(var v=0;v<Uo.length;v++)d=Uo[v](d,t)||d;s||(!function(e){null!=Ir(e,"v-pre")&&(e.pre=!0)}(d),d.pre&&(s=!0)),Vo(d.tag)&&(c=!0),s?function(e){var t=e.attrsList,n=t.length;if(n)for(var r=e.attrs=new Array(n),i=0;i<n;i++)r[i]={name:t[i].name,value:JSON.stringify(t[i].value)},null!=t[i].start&&(r[i].start=t[i].start,r[i].end=t[i].end);else e.pre||(e.plain=!0)}(d):d.processed||(la(d),function(e){var t=Ir(e,"v-if");if(t)e.if=t,fa(e,{exp:t,block:e});else{null!=Ir(e,"v-else")&&(e.else=!0);var n=Ir(e,"v-else-if");n&&(e.elseif=n)}}(d),function(e){null!=Ir(e,"v-once")&&(e.once=!0)}(d)),n||(n=d),a?u(d):(r=d,i.push(d))},end:function(e,t,n){var o=i[i.length-1];i.length-=1,r=i[i.length-1],u(o)},chars:function(e,t,n){if(r&&(!J||"textarea"!==r.tag||r.attrsMap.placeholder!==e)){var i,u,l,f=r.children;if(e=c||e.trim()?"script"===(i=r).tag||"style"===i.tag?e:oa(e):f.length?a?"condense"===a&&ra.test(e)?"":" ":o?" ":"":"")"condense"===a&&(e=e.replace(ia," ")),!s&&" "!==e&&(u=function(e,t){var n=t?po(t):lo;if(n.test(e)){for(var r,i,o,a=[],s=[],c=n.lastIndex=0;r=n.exec(e);){(i=r.index)>c&&(s.push(o=e.slice(c,i)),a.push(JSON.stringify(o)));var u=Cr(r[1].trim());a.push("_s("+u+")"),s.push({"@binding":u}),c=i+r[0].length}return c<e.length&&(s.push(o=e.slice(c)),a.push(JSON.stringify(o))),{expression:a.join("+"),tokens:s}}}(e,Ho))?l={type:2,expression:u.expression,tokens:u.tokens,text:e}:" "===e&&f.length&&" "===f[f.length-1].text||(l={type:3,text:e}),l&&f.push(l)}},comment:function(e,t,n){if(r){var i={type:3,text:e,isComment:!0};r.children.push(i)}}}),n}function ua(e,t){var n,r;(r=Mr(n=e,"key"))&&(n.key=r),e.plain=!e.key&&!e.scopedSlots&&!e.attrsList.length,function(e){var t=Mr(e,"ref");t&&(e.ref=t,e.refInFor=function(e){var t=e;for(;t;){if(void 0!==t.for)return!0;t=t.parent}return!1}(e))}(e),function(e){var t;"template"===e.tag?(t=Ir(e,"scope"),e.slotScope=t||Ir(e,"slot-scope")):(t=Ir(e,"slot-scope"))&&(e.slotScope=t);var n=Mr(e,"slot");n&&(e.slotTarget='""'===n?'"default"':n,e.slotTargetDynamic=!(!e.attrsMap[":slot"]&&!e.attrsMap["v-bind:slot"]),"template"===e.tag||e.slotScope||Tr(e,"slot",n,function(e,t){return e.rawAttrsMap[":"+t]||e.rawAttrsMap["v-bind:"+t]||e.rawAttrsMap[t]}(e,"slot")));if("template"===e.tag){var r=Dr(e,na);if(r){var i=pa(r),o=i.name,a=i.dynamic;e.slotTarget=o,e.slotTargetDynamic=a,e.slotScope=r.value||aa}}else{var s=Dr(e,na);if(s){var c=e.scopedSlots||(e.scopedSlots={}),u=pa(s),l=u.name,f=u.dynamic,p=c[l]=sa("template",[],e);p.slotTarget=l,p.slotTargetDynamic=f,p.children=e.children.filter(function(e){if(!e.slotScope)return e.parent=p,!0}),p.slotScope=s.value||aa,e.children=[],e.plain=!1}}}(e),function(e){"slot"===e.tag&&(e.slotName=Mr(e,"name"))}(e),function(e){var t;(t=Mr(e,"is"))&&(e.component=t);null!=Ir(e,"inline-template")&&(e.inlineTemplate=!0)}(e);for(var i=0;i<Bo.length;i++)e=Bo[i](e,t)||e;return function(e){var t,n,r,i,o,a,s,c,u=e.attrsList;for(t=0,n=u.length;t<n;t++)if(r=i=u[t].name,o=u[t].value,Wo.test(r))if(e.hasBindings=!0,(a=da(r.replace(Wo,"")))&&(r=r.replace(ta,"")),ea.test(r))r=r.replace(ea,""),o=Cr(o),(c=Yo.test(r))&&(r=r.slice(1,-1)),a&&(a.prop&&!c&&"innerHtml"===(r=b(r))&&(r="innerHTML"),a.camel&&!c&&(r=b(r)),a.sync&&(s=Fr(o,"$event"),c?Lr(e,'"update:"+('+r+")",s,null,!1,0,u[t],!0):(Lr(e,"update:"+b(r),s,null,!1,0,u[t]),x(r)!==b(r)&&Lr(e,"update:"+x(r),s,null,!1,0,u[t])))),a&&a.prop||!e.component&&Ko(e.tag,e.attrsMap.type,r)?Sr(e,r,o,u[t],c):Tr(e,r,o,u[t],c);else if(qo.test(r))r=r.replace(qo,""),(c=Yo.test(r))&&(r=r.slice(1,-1)),Lr(e,r,o,a,!1,0,u[t],c);else{var l=(r=r.replace(Wo,"")).match(Qo),f=l&&l[1];c=!1,f&&(r=r.slice(0,-(f.length+1)),Yo.test(f)&&(f=f.slice(1,-1),c=!0)),Nr(e,r,i,o,f,c,a,u[t])}else Tr(e,r,JSON.stringify(o),u[t]),!e.component&&"muted"===r&&Ko(e.tag,e.attrsMap.type,r)&&Sr(e,r,"true",u[t])}(e),e}function la(e){var t;if(t=Ir(e,"v-for")){var n=function(e){var t=e.match(Zo);if(!t)return;var n={};n.for=t[2].trim();var r=t[1].trim().replace(Xo,""),i=r.match(Go);i?(n.alias=r.replace(Go,"").trim(),n.iterator1=i[1].trim(),i[2]&&(n.iterator2=i[2].trim())):n.alias=r;return n}(t);n&&k(e,n)}}function fa(e,t){e.ifConditions||(e.ifConditions=[]),e.ifConditions.push(t)}function pa(e){var t=e.name.replace(na,"");return t||"#"!==e.name[0]&&(t="default"),Yo.test(t)?{name:t.slice(1,-1),dynamic:!0}:{name:'"'+t+'"',dynamic:!1}}function da(e){var t=e.match(ta);if(t){var n={};return t.forEach(function(e){n[e.slice(1)]=!0}),n}}function va(e){for(var t={},n=0,r=e.length;n<r;n++)t[e[n].name]=e[n].value;return t}var ha=/^xmlns:NS\d+/,ma=/^NS\d+:/;function ya(e){return sa(e.tag,e.attrsList.slice(),e.parent)}var ga=[vo,mo,{preTransformNode:function(e,t){if("input"===e.tag){var n,r=e.attrsMap;if(!r["v-model"])return;if((r[":type"]||r["v-bind:type"])&&(n=Mr(e,"type")),r.type||n||!r["v-bind"]||(n="("+r["v-bind"]+").type"),n){var i=Ir(e,"v-if",!0),o=i?"&&("+i+")":"",a=null!=Ir(e,"v-else",!0),s=Ir(e,"v-else-if",!0),c=ya(e);la(c),Er(c,"type","checkbox"),ua(c,t),c.processed=!0,c.if="("+n+")==='checkbox'"+o,fa(c,{exp:c.if,block:c});var u=ya(e);Ir(u,"v-for",!0),Er(u,"type","radio"),ua(u,t),fa(c,{exp:"("+n+")==='radio'"+o,block:u});var l=ya(e);return Ir(l,"v-for",!0),Er(l,":type",n),ua(l,t),fa(c,{exp:i,block:l}),a?c.else=!0:s&&(c.elseif=s),c}}}}];var _a,ba,$a={expectHTML:!0,modules:ga,directives:{model:function(e,t,n){var r=t.value,i=t.modifiers,o=e.tag,a=e.attrsMap.type;if(e.component)return Rr(e,r,i),!1;if("select"===o)!function(e,t,n){var r='var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return '+(n&&n.number?"_n(val)":"val")+"});";r=r+" "+Fr(t,"$event.target.multiple ? $$selectedVal : $$selectedVal[0]"),Lr(e,"change",r,null,!0)}(e,r,i);else if("input"===o&&"checkbox"===a)!function(e,t,n){var r=n&&n.number,i=Mr(e,"value")||"null",o=Mr(e,"true-value")||"true",a=Mr(e,"false-value")||"false";Sr(e,"checked","Array.isArray("+t+")?_i("+t+","+i+")>-1"+("true"===o?":("+t+")":":_q("+t+","+o+")")),Lr(e,"change","var $$a="+t+",$$el=$event.target,$$c=$$el.checked?("+o+"):("+a+");if(Array.isArray($$a)){var $$v="+(r?"_n("+i+")":i)+",$$i=_i($$a,$$v);if($$el.checked){$$i<0&&("+Fr(t,"$$a.concat([$$v])")+")}else{$$i>-1&&("+Fr(t,"$$a.slice(0,$$i).concat($$a.slice($$i+1))")+")}}else{"+Fr(t,"$$c")+"}",null,!0)}(e,r,i);else if("input"===o&&"radio"===a)!function(e,t,n){var r=n&&n.number,i=Mr(e,"value")||"null";Sr(e,"checked","_q("+t+","+(i=r?"_n("+i+")":i)+")"),Lr(e,"change",Fr(t,i),null,!0)}(e,r,i);else if("input"===o||"textarea"===o)!function(e,t,n){var r=e.attrsMap.type,i=n||{},o=i.lazy,a=i.number,s=i.trim,c=!o&&"range"!==r,u=o?"change":"range"===r?Jr:"input",l="$event.target.value";s&&(l="$event.target.value.trim()"),a&&(l="_n("+l+")");var f=Fr(t,l);c&&(f="if($event.target.composing)return;"+f),Sr(e,"value","("+t+")"),Lr(e,u,f,null,!0),(s||a)&&Lr(e,"blur","$forceUpdate()")}(e,r,i);else if(!P.isReservedTag(o))return Rr(e,r,i),!1;return!0},text:function(e,t){t.value&&Sr(e,"textContent","_s("+t.value+")",t)},html:function(e,t){t.value&&Sr(e,"innerHTML","_s("+t.value+")",t)}},isPreTag:function(e){return"pre"===e},isUnaryTag:go,mustUseProp:En,canBeLeftOpenTag:_o,isReservedTag:Jn,getTagNamespace:qn,staticKeys:function(e){return e.reduce(function(e,t){return e.concat(t.staticKeys||[])},[]).join(",")}(ga)},wa=g(function(e){return p("type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap"+(e?","+e:""))});function xa(e,t){e&&(_a=wa(t.staticKeys||""),ba=t.isReservedTag||T,function e(t){t.static=function(e){if(2===e.type)return!1;if(3===e.type)return!0;return!(!e.pre&&(e.hasBindings||e.if||e.for||d(e.tag)||!ba(e.tag)||function(e){for(;e.parent;){if("template"!==(e=e.parent).tag)return!1;if(e.for)return!0}return!1}(e)||!Object.keys(e).every(_a)))}(t);if(1===t.type){if(!ba(t.tag)&&"slot"!==t.tag&&null==t.attrsMap["inline-template"])return;for(var n=0,r=t.children.length;n<r;n++){var i=t.children[n];e(i),i.static||(t.static=!1)}if(t.ifConditions)for(var o=1,a=t.ifConditions.length;o<a;o++){var s=t.ifConditions[o].block;e(s),s.static||(t.static=!1)}}}(e),function e(t,n){if(1===t.type){if((t.static||t.once)&&(t.staticInFor=n),t.static&&t.children.length&&(1!==t.children.length||3!==t.children[0].type))return void(t.staticRoot=!0);if(t.staticRoot=!1,t.children)for(var r=0,i=t.children.length;r<i;r++)e(t.children[r],n||!!t.for);if(t.ifConditions)for(var o=1,a=t.ifConditions.length;o<a;o++)e(t.ifConditions[o].block,n)}}(e,!1))}var Ca=/^([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/,Aa=/\([^)]*?\);*$/,ka=/^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/,Oa={esc:27,tab:9,enter:13,space:32,up:38,left:37,right:39,down:40,delete:[8,46]},Sa={esc:["Esc","Escape"],tab:"Tab",enter:"Enter",space:[" ","Spacebar"],up:["Up","ArrowUp"],left:["Left","ArrowLeft"],right:["Right","ArrowRight"],down:["Down","ArrowDown"],delete:["Backspace","Delete","Del"]},Ta=function(e){return"if("+e+")return null;"},Ea={stop:"$event.stopPropagation();",prevent:"$event.preventDefault();",self:Ta("$event.target !== $event.currentTarget"),ctrl:Ta("!$event.ctrlKey"),shift:Ta("!$event.shiftKey"),alt:Ta("!$event.altKey"),meta:Ta("!$event.metaKey"),left:Ta("'button' in $event && $event.button !== 0"),middle:Ta("'button' in $event && $event.button !== 1"),right:Ta("'button' in $event && $event.button !== 2")};function Na(e,t){var n=t?"nativeOn:":"on:",r="",i="";for(var o in e){var a=ja(e[o]);e[o]&&e[o].dynamic?i+=o+","+a+",":r+='"'+o+'":'+a+","}return r="{"+r.slice(0,-1)+"}",i?n+"_d("+r+",["+i.slice(0,-1)+"])":n+r}function ja(e){if(!e)return"function(){}";if(Array.isArray(e))return"["+e.map(function(e){return ja(e)}).join(",")+"]";var t=ka.test(e.value),n=Ca.test(e.value),r=ka.test(e.value.replace(Aa,""));if(e.modifiers){var i="",o="",a=[];for(var s in e.modifiers)if(Ea[s])o+=Ea[s],Oa[s]&&a.push(s);else if("exact"===s){var c=e.modifiers;o+=Ta(["ctrl","shift","alt","meta"].filter(function(e){return!c[e]}).map(function(e){return"$event."+e+"Key"}).join("||"))}else a.push(s);return a.length&&(i+=function(e){return"if(!$event.type.indexOf('key')&&"+e.map(La).join("&&")+")return null;"}(a)),o&&(i+=o),"function($event){"+i+(t?"return "+e.value+"($event)":n?"return ("+e.value+")($event)":r?"return "+e.value:e.value)+"}"}return t||n?e.value:"function($event){"+(r?"return "+e.value:e.value)+"}"}function La(e){var t=parseInt(e,10);if(t)return"$event.keyCode!=="+t;var n=Oa[e],r=Sa[e];return"_k($event.keyCode,"+JSON.stringify(e)+","+JSON.stringify(n)+",$event.key,"+JSON.stringify(r)+")"}var Ma={on:function(e,t){e.wrapListeners=function(e){return"_g("+e+","+t.value+")"}},bind:function(e,t){e.wrapData=function(n){return"_b("+n+",'"+e.tag+"',"+t.value+","+(t.modifiers&&t.modifiers.prop?"true":"false")+(t.modifiers&&t.modifiers.sync?",true":"")+")"}},cloak:S},Ia=function(e){this.options=e,this.warn=e.warn||kr,this.transforms=Or(e.modules,"transformCode"),this.dataGenFns=Or(e.modules,"genData"),this.directives=k(k({},Ma),e.directives);var t=e.isReservedTag||T;this.maybeComponent=function(e){return!!e.component||!t(e.tag)},this.onceId=0,this.staticRenderFns=[],this.pre=!1};function Da(e,t){var n=new Ia(t);return{render:"with(this){return "+(e?Pa(e,n):'_c("div")')+"}",staticRenderFns:n.staticRenderFns}}function Pa(e,t){if(e.parent&&(e.pre=e.pre||e.parent.pre),e.staticRoot&&!e.staticProcessed)return Ra(e,t);if(e.once&&!e.onceProcessed)return Fa(e,t);if(e.for&&!e.forProcessed)return Ba(e,t);if(e.if&&!e.ifProcessed)return Ha(e,t);if("template"!==e.tag||e.slotTarget||t.pre){if("slot"===e.tag)return function(e,t){var n=e.slotName||'"default"',r=Ka(e,t),i="_t("+n+(r?","+r:""),o=e.attrs||e.dynamicAttrs?Wa((e.attrs||[]).concat(e.dynamicAttrs||[]).map(function(e){return{name:b(e.name),value:e.value,dynamic:e.dynamic}})):null,a=e.attrsMap["v-bind"];!o&&!a||r||(i+=",null");o&&(i+=","+o);a&&(i+=(o?"":",null")+","+a);return i+")"}(e,t);var n;if(e.component)n=function(e,t,n){var r=t.inlineTemplate?null:Ka(t,n,!0);return"_c("+e+","+Ua(t,n)+(r?","+r:"")+")"}(e.component,e,t);else{var r;(!e.plain||e.pre&&t.maybeComponent(e))&&(r=Ua(e,t));var i=e.inlineTemplate?null:Ka(e,t,!0);n="_c('"+e.tag+"'"+(r?","+r:"")+(i?","+i:"")+")"}for(var o=0;o<t.transforms.length;o++)n=t.transforms[o](e,n);return n}return Ka(e,t)||"void 0"}function Ra(e,t){e.staticProcessed=!0;var n=t.pre;return e.pre&&(t.pre=e.pre),t.staticRenderFns.push("with(this){return "+Pa(e,t)+"}"),t.pre=n,"_m("+(t.staticRenderFns.length-1)+(e.staticInFor?",true":"")+")"}function Fa(e,t){if(e.onceProcessed=!0,e.if&&!e.ifProcessed)return Ha(e,t);if(e.staticInFor){for(var n="",r=e.parent;r;){if(r.for){n=r.key;break}r=r.parent}return n?"_o("+Pa(e,t)+","+t.onceId+++","+n+")":Pa(e,t)}return Ra(e,t)}function Ha(e,t,n,r){return e.ifProcessed=!0,function e(t,n,r,i){if(!t.length)return i||"_e()";var o=t.shift();return o.exp?"("+o.exp+")?"+a(o.block)+":"+e(t,n,r,i):""+a(o.block);function a(e){return r?r(e,n):e.once?Fa(e,n):Pa(e,n)}}(e.ifConditions.slice(),t,n,r)}function Ba(e,t,n,r){var i=e.for,o=e.alias,a=e.iterator1?","+e.iterator1:"",s=e.iterator2?","+e.iterator2:"";return e.forProcessed=!0,(r||"_l")+"(("+i+"),function("+o+a+s+"){return "+(n||Pa)(e,t)+"})"}function Ua(e,t){var n="{",r=function(e,t){var n=e.directives;if(!n)return;var r,i,o,a,s="directives:[",c=!1;for(r=0,i=n.length;r<i;r++){o=n[r],a=!0;var u=t.directives[o.name];u&&(a=!!u(e,o,t.warn)),a&&(c=!0,s+='{name:"'+o.name+'",rawName:"'+o.rawName+'"'+(o.value?",value:("+o.value+"),expression:"+JSON.stringify(o.value):"")+(o.arg?",arg:"+(o.isDynamicArg?o.arg:'"'+o.arg+'"'):"")+(o.modifiers?",modifiers:"+JSON.stringify(o.modifiers):"")+"},")}if(c)return s.slice(0,-1)+"]"}(e,t);r&&(n+=r+","),e.key&&(n+="key:"+e.key+","),e.ref&&(n+="ref:"+e.ref+","),e.refInFor&&(n+="refInFor:true,"),e.pre&&(n+="pre:true,"),e.component&&(n+='tag:"'+e.tag+'",');for(var i=0;i<t.dataGenFns.length;i++)n+=t.dataGenFns[i](e);if(e.attrs&&(n+="attrs:"+Wa(e.attrs)+","),e.props&&(n+="domProps:"+Wa(e.props)+","),e.events&&(n+=Na(e.events,!1)+","),e.nativeEvents&&(n+=Na(e.nativeEvents,!0)+","),e.slotTarget&&!e.slotScope&&(n+="slot:"+e.slotTarget+","),e.scopedSlots&&(n+=function(e,t,n){var r=Object.keys(t).some(function(e){var n=t[e];return n.slotTargetDynamic||n.if||n.for||za(n)});if(!r)for(var i=e.parent;i;){if(i.slotScope&&i.slotScope!==aa){r=!0;break}i=i.parent}return"scopedSlots:_u(["+Object.keys(t).map(function(e){return Va(t[e],n)}).join(",")+"]"+(r?",true":"")+")"}(e,e.scopedSlots,t)+","),e.model&&(n+="model:{value:"+e.model.value+",callback:"+e.model.callback+",expression:"+e.model.expression+"},"),e.inlineTemplate){var o=function(e,t){var n=e.children[0];if(n&&1===n.type){var r=Da(n,t.options);return"inlineTemplate:{render:function(){"+r.render+"},staticRenderFns:["+r.staticRenderFns.map(function(e){return"function(){"+e+"}"}).join(",")+"]}"}}(e,t);o&&(n+=o+",")}return n=n.replace(/,$/,"")+"}",e.dynamicAttrs&&(n="_b("+n+',"'+e.tag+'",'+Wa(e.dynamicAttrs)+")"),e.wrapData&&(n=e.wrapData(n)),e.wrapListeners&&(n=e.wrapListeners(n)),n}function za(e){return 1===e.type&&("slot"===e.tag||e.children.some(za))}function Va(e,t){var n=e.attrsMap["slot-scope"];if(e.if&&!e.ifProcessed&&!n)return Ha(e,t,Va,"null");if(e.for&&!e.forProcessed)return Ba(e,t,Va);var r=e.slotScope===aa?"":String(e.slotScope),i="function("+r+"){return "+("template"===e.tag?e.if&&n?"("+e.if+")?"+(Ka(e,t)||"undefined")+":undefined":Ka(e,t)||"undefined":Pa(e,t))+"}",o=r?"":",proxy:true";return"{key:"+(e.slotTarget||'"default"')+",fn:"+i+o+"}"}function Ka(e,t,n,r,i){var o=e.children;if(o.length){var a=o[0];if(1===o.length&&a.for&&"template"!==a.tag&&"slot"!==a.tag){var s=n?t.maybeComponent(a)?",1":",0":"";return""+(r||Pa)(a,t)+s}var c=n?function(e,t){for(var n=0,r=0;r<e.length;r++){var i=e[r];if(1===i.type){if(Ja(i)||i.ifConditions&&i.ifConditions.some(function(e){return Ja(e.block)})){n=2;break}(t(i)||i.ifConditions&&i.ifConditions.some(function(e){return t(e.block)}))&&(n=1)}}return n}(o,t.maybeComponent):0,u=i||qa;return"["+o.map(function(e){return u(e,t)}).join(",")+"]"+(c?","+c:"")}}function Ja(e){return void 0!==e.for||"template"===e.tag||"slot"===e.tag}function qa(e,t){return 1===e.type?Pa(e,t):3===e.type&&e.isComment?(r=e,"_e("+JSON.stringify(r.text)+")"):"_v("+(2===(n=e).type?n.expression:Za(JSON.stringify(n.text)))+")";var n,r}function Wa(e){for(var t="",n="",r=0;r<e.length;r++){var i=e[r],o=Za(i.value);i.dynamic?n+=i.name+","+o+",":t+='"'+i.name+'":'+o+","}return t="{"+t.slice(0,-1)+"}",n?"_d("+t+",["+n.slice(0,-1)+"])":t}function Za(e){return e.replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029")}new RegExp("\\b"+"do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,super,throw,while,yield,delete,export,import,return,switch,default,extends,finally,continue,debugger,function,arguments".split(",").join("\\b|\\b")+"\\b");function Ga(e,t){try{return new Function(e)}catch(n){return t.push({err:n,code:e}),S}}function Xa(e){var t=Object.create(null);return function(n,r,i){(r=k({},r)).warn;delete r.warn;var o=r.delimiters?String(r.delimiters)+n:n;if(t[o])return t[o];var a=e(n,r),s={},c=[];return s.render=Ga(a.render,c),s.staticRenderFns=a.staticRenderFns.map(function(e){return Ga(e,c)}),t[o]=s}}var Ya,Qa,es=(Ya=function(e,t){var n=ca(e.trim(),t);!1!==t.optimize&&xa(n,t);var r=Da(n,t);return{ast:n,render:r.render,staticRenderFns:r.staticRenderFns}},function(e){function t(t,n){var r=Object.create(e),i=[],o=[];if(n)for(var a in n.modules&&(r.modules=(e.modules||[]).concat(n.modules)),n.directives&&(r.directives=k(Object.create(e.directives||null),n.directives)),n)"modules"!==a&&"directives"!==a&&(r[a]=n[a]);r.warn=function(e,t,n){(n?o:i).push(e)};var s=Ya(t.trim(),r);return s.errors=i,s.tips=o,s}return{compile:t,compileToFunctions:Xa(t)}})($a),ts=(es.compile,es.compileToFunctions);function ns(e){return(Qa=Qa||document.createElement("div")).innerHTML=e?'<a href="\n"/>':'<div a="\n"/>',Qa.innerHTML.indexOf("&#10;")>0}var rs=!!U&&ns(!1),is=!!U&&ns(!0),os=g(function(e){var t=Gn(e);return t&&t.innerHTML}),as=bn.prototype.$mount;bn.prototype.$mount=function(e,t){if((e=e&&Gn(e))===document.body||e===document.documentElement)return this;var n=this.$options;if(!n.render){var r=n.template;if(r)if("string"==typeof r)"#"===r.charAt(0)&&(r=os(r));else{if(!r.nodeType)return this;r=r.innerHTML}else e&&(r=function(e){if(e.outerHTML)return e.outerHTML;var t=document.createElement("div");return t.appendChild(e.cloneNode(!0)),t.innerHTML}(e));if(r){var i=ts(r,{outputSourceRange:!1,shouldDecodeNewlines:rs,shouldDecodeNewlinesForHref:is,delimiters:n.delimiters,comments:n.comments},this),o=i.render,a=i.staticRenderFns;n.render=o,n.staticRenderFns=a}}return as.call(this,e,t)},bn.compile=ts,module.exports=bn;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19), __webpack_require__(21).setImmediate))

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19), __webpack_require__(27)))

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define("VueStarRating",[],e):"object"==typeof exports?exports.VueStarRating=e():t.VueStarRating=e()}(this,function(){return function(t){function e(n){if(r[n])return r[n].exports;var i=r[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var r={};return e.m=t,e.c=r,e.i=function(t){return t},e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/dist/",e(e.s=4)}([function(t,e){function r(t,e){var r=t[1]||"",i=t[3];if(!i)return r;if(e&&"function"==typeof btoa){var o=n(i);return[r].concat(i.sources.map(function(t){return"/*# sourceURL="+i.sourceRoot+t+" */"})).concat([o]).join("\n")}return[r].join("\n")}function n(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var n=r(e,t);return e[2]?"@media "+e[2]+"{"+n+"}":n}).join("")},e.i=function(t,r){"string"==typeof t&&(t=[[null,t,""]]);for(var n={},i=0;i<this.length;i++){var o=this[i][0];"number"==typeof o&&(n[o]=!0)}for(i=0;i<t.length;i++){var a=t[i];"number"==typeof a[0]&&n[a[0]]||(r&&!a[2]?a[2]=r:r&&(a[2]="("+a[2]+") and ("+r+")"),e.push(a))}},e}},function(t,e){t.exports=function(t,e,r,n,i){var o,a=t=t||{},s=typeof t.default;"object"!==s&&"function"!==s||(o=t,a=t.default);var u="function"==typeof a?a.options:a;e&&(u.render=e.render,u.staticRenderFns=e.staticRenderFns),n&&(u._scopeId=n);var d;if(i?(d=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),r&&r.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(i)},u._ssrRegister=d):r&&(d=r),d){var l=u.functional,c=l?u.render:u.beforeCreate;l?u.render=function(t,e){return d.call(e),c(t,e)}:u.beforeCreate=c?[].concat(c,d):[d]}return{esModule:o,exports:a,options:u}}},function(t,e,r){function n(t){for(var e=0;e<t.length;e++){var r=t[e],n=l[r.id];if(n){n.refs++;for(var i=0;i<n.parts.length;i++)n.parts[i](r.parts[i]);for(;i<r.parts.length;i++)n.parts.push(o(r.parts[i]));n.parts.length>r.parts.length&&(n.parts.length=r.parts.length)}else{for(var a=[],i=0;i<r.parts.length;i++)a.push(o(r.parts[i]));l[r.id]={id:r.id,refs:1,parts:a}}}}function i(){var t=document.createElement("style");return t.type="text/css",c.appendChild(t),t}function o(t){var e,r,n=document.querySelector('style[data-vue-ssr-id~="'+t.id+'"]');if(n){if(h)return g;n.parentNode.removeChild(n)}if(v){var o=p++;n=f||(f=i()),e=a.bind(null,n,o,!1),r=a.bind(null,n,o,!0)}else n=i(),e=s.bind(null,n),r=function(){n.parentNode.removeChild(n)};return e(t),function(n){if(n){if(n.css===t.css&&n.media===t.media&&n.sourceMap===t.sourceMap)return;e(t=n)}else r()}}function a(t,e,r,n){var i=r?"":n.css;if(t.styleSheet)t.styleSheet.cssText=m(e,i);else{var o=document.createTextNode(i),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(o,a[e]):t.appendChild(o)}}function s(t,e){var r=e.css,n=e.media,i=e.sourceMap;if(n&&t.setAttribute("media",n),i&&(r+="\n/*# sourceURL="+i.sources[0]+" */",r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),t.styleSheet)t.styleSheet.cssText=r;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(r))}}var u="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!u)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var d=r(14),l={},c=u&&(document.head||document.getElementsByTagName("head")[0]),f=null,p=0,h=!1,g=function(){},v="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());t.exports=function(t,e,r){h=r;var i=d(t,e);return n(i),function(e){for(var r=[],o=0;o<i.length;o++){var a=i[o],s=l[a.id];s.refs--,r.push(s)}e?(i=d(t,e),n(i)):i=[];for(var o=0;o<r.length;o++){var s=r[o];if(0===s.refs){for(var u=0;u<s.parts.length;u++)s.parts[u]();delete l[s.id]}}}};var m=function(){var t=[];return function(e,r){return t[e]=r,t.filter(Boolean).join("\n")}}()},function(t,e,r){function n(t){r(13)}var i=r(1)(r(5),r(11),n,"data-v-34cbeed1",null);t.exports=i.exports},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(3),i=function(t){return t&&t.__esModule?t:{default:t}}(n);e.default=i.default},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(9),i=function(t){return t&&t.__esModule?t:{default:t}}(n);e.default={components:{star:i.default},model:{prop:"rating",event:"rating-selected"},props:{increment:{type:Number,default:1},rating:{type:Number,default:0},roundStartRating:{type:Boolean,default:!0},activeColor:{type:String,default:"#ffd055"},inactiveColor:{type:String,default:"#d8d8d8"},maxRating:{type:Number,default:5},starPoints:{type:Array,default:function(){return[]}},starSize:{type:Number,default:50},showRating:{type:Boolean,default:!0},readOnly:{type:Boolean,default:!1},textClass:{type:String,default:""},inline:{type:Boolean,default:!1},borderColor:{type:String,default:"#999"},borderWidth:{type:Number,default:0},roundedCorners:{type:Boolean,default:!1},padding:{type:Number,default:0},rtl:{type:Boolean,default:!1},fixedPoints:{type:Number,default:null},glow:{type:Number,default:0},glowColor:{type:String,default:"#fff"}},created:function(){this.step=100*this.increment,this.currentRating=this.rating,this.selectedRating=this.currentRating,this.createStars(this.roundStartRating)},methods:{setRating:function(t,e){if(!this.readOnly){var r=this.rtl?(100-t.position)/100:t.position/100;this.currentRating=(t.id+r-1).toFixed(2),this.currentRating=this.currentRating>this.maxRating?this.maxRating:this.currentRating,this.createStars(),e?(this.selectedRating=this.currentRating,this.$emit("rating-selected",this.selectedRating),this.ratingSelected=!0):this.$emit("current-rating",this.currentRating)}},resetRating:function(){this.readOnly||(this.currentRating=this.selectedRating,this.createStars(this.shouldRound))},createStars:function(){(!(arguments.length>0&&void 0!==arguments[0])||arguments[0])&&this.round();for(var t=0;t<this.maxRating;t++){var e=0;t<this.currentRating&&(e=this.currentRating-t>1?100:100*(this.currentRating-t)),this.$set(this.fillLevel,t,Math.round(e))}},round:function(){var t=1/this.increment;this.currentRating=Math.min(this.maxRating,Math.ceil(this.currentRating*t)/t)}},computed:{formattedRating:function(){return null===this.fixedPoints?this.currentRating:this.currentRating.toFixed(this.fixedPoints)},shouldRound:function(){return this.ratingSelected||this.roundStartRating},margin:function(){return this.padding+this.borderWidth}},watch:{rating:function(t){this.currentRating=t,this.selectedRating=t,this.createStars(this.shouldRound)}},data:function(){return{step:0,fillLevel:[],currentRating:0,selectedRating:0,ratingSelected:!1}}}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{fill:{type:Number,default:0},points:{type:Array,default:function(){return[]}},size:{type:Number,default:50},starId:{type:Number,required:!0},activeColor:{type:String,required:!0},inactiveColor:{type:String,required:!0},borderColor:{type:String,default:"#000"},borderWidth:{type:Number,default:0},roundedCorners:{type:Boolean,default:!1},rtl:{type:Boolean,default:!1},glow:{type:Number,default:0},glowColor:{type:String,required:!1}},created:function(){this.starPoints=this.points.length?this.points:this.starPoints,this.calculatePoints(),this.grad=this.getRandomId(),this.glowId=this.getRandomId()},computed:{starPointsToString:function(){return this.starPoints.join(",")},getGradId:function(){return"url(#"+this.grad+")"},getSize:function(){var t=this.roundedCorners&&this.borderWidth<=0?parseInt(this.size)-parseInt(this.border):this.size;return parseInt(t)+parseInt(this.border)},getFill:function(){return this.rtl?100-this.fill+"%":this.fill+"%"},border:function(){return this.roundedCorners&&this.borderWidth<=0?6:this.borderWidth},getBorderColor:function(){return this.roundedCorners&&this.borderWidth<=0?this.fill<=0?this.inactiveColor:this.activeColor:this.borderColor},maxSize:function(){return this.starPoints.reduce(function(t,e){return Math.max(t,e)})},viewBox:function(){return"0 0 "+this.maxSize+" "+this.maxSize}},methods:{mouseMoving:function(t){this.$emit("star-mouse-move",{event:t,position:this.getPosition(t),id:this.starId})},getPosition:function(t){var e=.92*this.size,r=this.rtl?Math.min(t.offsetX,45):Math.max(t.offsetX,1),n=Math.round(100/e*r);return Math.min(n,100)},selected:function(t){this.$emit("star-selected",{id:this.starId,position:this.getPosition(t)})},getRandomId:function(){return Math.random().toString(36).substring(7)},calculatePoints:function(){var t=this;this.starPoints=this.starPoints.map(function(e){return t.size/t.maxSize*e+1.5*t.border})}},data:function(){return{starPoints:[19.8,2.2,6.6,43.56,39.6,17.16,0,17.16,33,43.56],grad:"",glowId:""}}}},function(t,e,r){e=t.exports=r(0)(void 0),e.push([t.i,".vue-star-rating-star[data-v-21f5376e]{overflow:visible!important}",""])},function(t,e,r){e=t.exports=r(0)(void 0),e.push([t.i,".vue-star-rating-star[data-v-34cbeed1]{display:inline-block}.vue-star-rating-pointer[data-v-34cbeed1]{cursor:pointer}.vue-star-rating[data-v-34cbeed1]{display:flex;align-items:center}.vue-star-rating-inline[data-v-34cbeed1]{display:inline-flex}.vue-star-rating-rating-text[data-v-34cbeed1]{margin-top:7px;margin-left:7px}.vue-star-rating-rtl[data-v-34cbeed1]{direction:rtl}.vue-star-rating-rtl .vue-star-rating-rating-text[data-v-34cbeed1]{margin-right:10px;direction:rtl}",""])},function(t,e,r){function n(t){r(12)}var i=r(1)(r(6),r(10),n,"data-v-21f5376e",null);t.exports=i.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("svg",{staticClass:"vue-star-rating-star",attrs:{height:t.getSize,width:t.getSize,viewBox:t.viewBox},on:{mousemove:t.mouseMoving,click:t.selected}},[r("linearGradient",{attrs:{id:t.grad,x1:"0",x2:"100%",y1:"0",y2:"0"}},[r("stop",{attrs:{offset:t.getFill,"stop-color":t.rtl?t.inactiveColor:t.activeColor}}),t._v(" "),r("stop",{attrs:{offset:t.getFill,"stop-color":t.rtl?t.activeColor:t.inactiveColor}})],1),t._v(" "),r("filter",{attrs:{id:t.glowId,height:"130%",width:"130%",filterUnits:"userSpaceOnUse"}},[r("feGaussianBlur",{attrs:{stdDeviation:t.glow,result:"coloredBlur"}}),t._v(" "),r("feMerge",[r("feMergeNode",{attrs:{in:"coloredBlur"}}),t._v(" "),r("feMergeNode",{attrs:{in:"SourceGraphic"}})],1)],1),t._v(" "),r("polygon",{directives:[{name:"show",rawName:"v-show",value:t.fill>1,expression:"fill > 1"}],attrs:{points:t.starPointsToString,fill:t.getGradId,stroke:t.glowColor,filter:"url(#"+this.glowId+")"}}),t._v(" "),r("polygon",{attrs:{points:t.starPointsToString,fill:t.getGradId,stroke:t.getBorderColor,"stroke-width":t.border,"stroke-linejoin":t.roundedCorners?"round":"miter"}}),t._v(" "),r("polygon",{attrs:{points:t.starPointsToString,fill:t.getGradId}})],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{class:["vue-star-rating",{"vue-star-rating-rtl":t.rtl},{"vue-star-rating-inline":t.inline}]},[r("div",{staticClass:"vue-star-rating",on:{mouseleave:t.resetRating}},[t._l(t.maxRating,function(e){return r("span",{key:e,class:[{"vue-star-rating-pointer":!t.readOnly},"vue-star-rating-star"],style:{"margin-right":t.margin+"px"}},[r("star",{attrs:{fill:t.fillLevel[e-1],size:t.starSize,points:t.starPoints,"star-id":e,step:t.step,"active-color":t.activeColor,"inactive-color":t.inactiveColor,"border-color":t.borderColor,"border-width":t.borderWidth,"rounded-corners":t.roundedCorners,rtl:t.rtl,glow:t.glow,"glow-color":t.glowColor},on:{"star-selected":function(e){t.setRating(e,!0)},"star-mouse-move":t.setRating}})],1)}),t._v(" "),t.showRating?r("span",{class:["vue-star-rating-rating-text",t.textClass]},[t._v(" "+t._s(t.formattedRating))]):t._e()],2)])},staticRenderFns:[]}},function(t,e,r){var n=r(7);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);r(2)("0ab8a16d",n,!0)},function(t,e,r){var n=r(8);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);r(2)("2e648ff1",n,!0)},function(t,e){t.exports=function(t,e){for(var r=[],n={},i=0;i<e.length;i++){var o=e[i],a=o[0],s=o[1],u=o[2],d=o[3],l={id:t+":"+i,css:s,media:u,sourceMap:d};n[a]?n[a].parts.push(l):r.push(n[a]={id:a,parts:[l]})}return r}}])});
//# sourceMappingURL=star-rating.min.js.map

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);
var bind = __webpack_require__(29);
var Axios = __webpack_require__(47);
var defaults = __webpack_require__(22);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(33);
axios.CancelToken = __webpack_require__(61);
axios.isCancel = __webpack_require__(32);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(62);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(22);
var utils = __webpack_require__(4);
var InterceptorManager = __webpack_require__(56);
var dispatchRequest = __webpack_require__(57);
var isAbsoluteURL = __webpack_require__(59);
var combineURLs = __webpack_require__(60);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(31);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response
    ));
  }
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 @ @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.response = response;
  return error;
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);
var transformData = __webpack_require__(58);
var isCancel = __webpack_require__(32);
var defaults = __webpack_require__(22);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(33);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_LessonsListComponent_vue__ = __webpack_require__(37);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  data() {
    return {
      course: [],
      courseListWidth: "col-lg-3 col-md-4, col-sm-6",
      breadcrumbs: [{
        title: "Dashboard",
        link: 'dashboard'
      }, {
        title: "Courses",
        link: 'all-courses'
      }, {
        title: ""
      }],
      pageTitle: "Courses",
      purchased: ""
    };
  },

  created() {
    this.getCourse();
  },

  mounted() {},

  components: {
    'lessons-list-component': __WEBPACK_IMPORTED_MODULE_0__components_LessonsListComponent_vue__["a" /* default */]
  },
  methods: {
    getCourse() {
      axios.get("/api/course/" + this.$route.params.slug).then(({
        data
      }) => {
        this.course = data.course;
        this.pageTitle = data.course.title;
        this.purchased = data.purchased;
        this.breadcrumbs[2].title = data.course.title;
      });
    }

  },
  props: ['slug'],
  computed: {}
});

/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    lessons: Array,
    purchased: Boolean,
    id: Number
  }
});

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_CoursesComponent_vue__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuejs_paginate__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuejs_paginate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vuejs_paginate__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  data() {
    return {
      allCourses: [],
      courseListWidth: "col-lg-3 col-md-4, col-sm-6",
      pageTitle: "Courses",
      pageCount: 1,
      breadcrumbs: [{
        title: "Dashboard",
        link: 'dashboard'
      }, {
        title: "Courses"
      }]
    };
  },

  created() {
    this.getAllCourses();
  },

  mounted() {},

  components: {
    'courses-component': __WEBPACK_IMPORTED_MODULE_0__components_CoursesComponent_vue__["a" /* default */],
    'paginate': __WEBPACK_IMPORTED_MODULE_1_vuejs_paginate___default.a
  },
  computed: {
    getTags(tags) {
      return str.split(';', tags);
    }

  },
  methods: {
    getAllCourses(page = 1) {
      axios.get("/api/courses/all?count=12&page=" + page).then(({
        data
      }) => {
        this.allCourses = data.data;
        this.pageCount = data.last_page;
      });
    }

  }
});

/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = listToStyles;
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    course: Object,
    courseWidth: String,
    tags: Array
  }
});

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_LessonsListComponent_vue__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_ProgressComponent_vue__ = __webpack_require__(69);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  data() {
    return {
      lesson: [],
      course: [],
      breadcrumbs: [{
        title: "Dashboard",
        link: 'dashboard'
      }, {
        title: "Courses",
        link: 'all-courses'
      }, {
        title: "",
        link: 'course',
        params: {}
      }, {
        title: ""
      }],
      pageTitle: "Courses",
      purchased: ""
    };
  },

  created() {
    this.getLesson();
  },

  mounted() {},

  components: {
    'lessons-list-component': __WEBPACK_IMPORTED_MODULE_0__components_LessonsListComponent_vue__["a" /* default */],
    'progress-component': __WEBPACK_IMPORTED_MODULE_1__components_ProgressComponent_vue__["a" /* default */]
  },
  methods: {
    getLesson() {
      axios.get("/api/lesson/" + this.$route.params.id + "/" + this.$route.params.slug).then(({
        data
      }) => {
        this.lesson = data.lesson;
        this.course = data.course;
        this.pageTitle = data.lesson.title;
        this.purchased = data.purchased_course;
        this.breadcrumbs[2].title = data.course.title;
        this.breadcrumbs[2].params = {
          slug: data.course.slug
        };
        this.breadcrumbs[3].title = data.lesson.title;
      });
    }

  },
  computed: {
    quizDuration: function () {
      let duration = this.lesson.test.duration;
      let HH = Math.floor(duration / 3600);
      let mm = Math.floor(duration % 3600 / 60);
      let ss = Math.floor(duration % 60);
      return `${HH} hr ${mm} min ${ss} sec`;
    }
  },
  props: ['slug'],
  watch: {
    '$route'(to, from) {
      // react to route changes...
      this.getLesson();
    }

  }
});

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_cacheDirectory_node_modules_vue_loader_lib_selector_type_script_index_0_ProgressComponent_vue__ = __webpack_require__(70);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_16bbe1ab_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_ProgressComponent_vue__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_cacheDirectory_node_modules_vue_loader_lib_selector_type_script_index_0_ProgressComponent_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_16bbe1ab_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_ProgressComponent_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_16bbe1ab_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_ProgressComponent_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    course: Object
  },
  methods: {
    getLessonsProgress(course) {
      let completed = course.completed_lessons;
      let total = course.total_lessons;
      let progress = completed / total * 100;
      let color = "warning";

      if (progress >= 100) {
        progress = 100;
        color = "success";
      } else if (progress >= 70 && progress < 100) {
        color = "primary";
      } else if (progress >= 50 && progress < 70) {
        color = "info";
      } else if (progress >= 30 && progress < 50) {
        color = "secondary";
      }

      return {
        score: progress,
        color: color
      };
    }

  }
});

/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_CoursesComponent_vue__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuejs_paginate__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuejs_paginate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vuejs_paginate__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  data() {
    return {
      allCourses: [],
      courseListWidth: "col-lg-3 col-md-4, col-sm-6",
      pageTitle: "",
      pageCount: 1,
      breadcrumbs: [{
        title: "Dashboard",
        link: "dashboard"
      }, {
        title: "Courses",
        link: "all-courses"
      }, {
        title: ""
      }]
    };
  },

  created() {
    this.getCategoryCourses();
  },

  mounted() {},

  components: {
    'courses-component': __WEBPACK_IMPORTED_MODULE_0__components_CoursesComponent_vue__["a" /* default */],
    'paginate': __WEBPACK_IMPORTED_MODULE_1_vuejs_paginate___default.a
  },
  methods: {
    getCategoryCourses(page = 1) {
      axios.get("/api/courses/categories/" + this.$route.params.slug + "?count=12&page=" + page).then(({
        data
      }) => {
        this.allCourses = data.courses.data;
        this.pageTitle = data.category + " Courses";
        this.pageCount = data.courses.last_page;
        this.breadcrumbs[2].title = data.category;
      });
    }

  },
  props: ['slug'],
  watch: {
    '$route'(to, from) {
      // react to route changes...
      this.getCategoryCourses();
    }

  }
});

/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_CoursesComponent_vue__ = __webpack_require__(25);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  data() {
    return {
      purchasedCourses: [],
      allCourses: [],
      breadcrumbs: [{
        title: "Dashboard"
      }],
      pageTitle: "Dashboard",
      quizes: []
    };
  },

  components: {
    'courses-component': __WEBPACK_IMPORTED_MODULE_0__components_CoursesComponent_vue__["a" /* default */]
  },
  computed: {},

  created() {
    this.getPurchasedCourses();
    this.getAllCourses();
    this.getQuizResults();
  },

  methods: {
    // drg >> fetch purchased courses
    getPurchasedCourses(page = 1) {
      axios.get("/api/courses/purchased?count=4&dashboard=1").then(({
        data
      }) => {
        this.purchasedCourses = data.courses;
      });
    },

    getAllCourses(page = 1) {
      axios.get("/api/courses/all?count=8&dashboard=1").then(({
        data
      }) => {
        this.allCourses = data;
      });
    },

    getQuizResults(page = 1) {
      axios.get("/api/quizes/results?count=4&dashboard=1").then(({
        data
      }) => {
        this.quizes = data;
      });
    },

    // drg >> compute lesson progress
    getLessonsProgress(course) {
      let completed = course.completed_lessons;
      let total = course.total_lessons;
      let progress = completed / total * 100;
      let color = "warning";

      if (progress >= 100) {
        progress = 100;
        color = "success";
      } else if (progress >= 70 && progress < 100) {
        color = "primary";
      } else if (progress >= 50 && progress < 70) {
        color = "info";
      } else if (progress >= 30 && progress < 50) {
        color = "secondary";
      }

      return {
        score: Math.floor(progress),
        color: color
      };
    },

    getScore(quiz) {
      let score = Math.round(quiz.test_result / quiz.total_score * 100);
      let remark = "";
      let color = "text-muted";

      switch (true) {
        case score >= 80 && score <= 100:
          remark = "Great";
          color = "text-success";
          break;

        case score >= 60 && score < 80:
          remark = "Good";
          color = "text-warning";
          break;

        case score >= 40 && score < 60:
          remark = "Average";
          color = "text-secondary";
          break;

        case score < 40:
          remark = "Failed";
          color = "text-danger";
          break;

        default:
          break;
      }

      return {
        percentage: `${score}%`,
        remark: remark,
        color: color
      };
    }

  },

  mounted() {}

});

/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_PurchasedCoursesComponent_vue__ = __webpack_require__(112);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  data() {
    return {
      purchasedCourses: [],
      breadcrumbs: [{
        title: "Dashboard",
        link: "dashboard"
      }, {
        title: "My Courses"
      }],
      pageTitle: "My Courses"
    };
  },

  created() {
    this.getPurchasedCourses();
  },

  mounted() {
    console.log('Purchased Courses Component mounted now.');
  },

  components: {
    'purchased-courses-component': __WEBPACK_IMPORTED_MODULE_0__components_PurchasedCoursesComponent_vue__["a" /* default */]
  },
  methods: {
    getPurchasedCourses(page = 1) {
      axios.get("/api/courses/purchased?count=8").then(({
        data
      }) => {
        this.purchasedCourses = data.courses;
      });
    }

  }
});

/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ProgressComponent_vue__ = __webpack_require__(69);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  data() {
    return {};
  },

  components: {
    'progress-component': __WEBPACK_IMPORTED_MODULE_0__ProgressComponent_vue__["a" /* default */]
  },
  props: {
    course: Object
  },
  methods: {}
});

/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_CoursesComponent_vue__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuejs_paginate__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuejs_paginate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vuejs_paginate__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  data() {
    return {
      allCourses: [],
      courseListWidth: "col-lg-3 col-md-4, col-sm-6",
      pageTitle: 'Courses <span class="badge badge-primary badge-lg">' + this.tag + '</span>',
      pageCount: 1,
      breadcrumbs: [{
        title: "Dashboard",
        link: "dashboard"
      }, {
        title: "Courses",
        link: "all-courses"
      }, {
        title: this.tag
      }]
    };
  },

  created() {
    this.getTagCourses();
  },

  mounted() {},

  components: {
    'courses-component': __WEBPACK_IMPORTED_MODULE_0__components_CoursesComponent_vue__["a" /* default */],
    'paginate': __WEBPACK_IMPORTED_MODULE_1_vuejs_paginate___default.a
  },
  methods: {
    getTagCourses(page = 1) {
      axios.get("/api/courses/tags/" + this.$route.params.tag + "?count=12&page=" + page).then(({
        data
      }) => {
        this.allCourses = data.data;
        this.pageCount = data.last_page;
      });
    }

  },
  props: ['tag'],
  watch: {
    '$route'(to, from) {
      // react to route changes...
      this.getTagCourses();
    }

  }
});

/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_QuizQuestionsComponent_vue__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_QuizReviewComponent_vue__ = __webpack_require__(122);
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  data() {
    return {
      breadcrumbs: [{
        title: "Dashboard",
        link: 'dashboard'
      }, {
        title: "Quizes",
        link: 'quizes'
      }, {
        title: ""
      }],
      description: "",
      pageTitle: "",
      status: ""
    };
  },

  created() {},

  mounted() {
    this.checkQuiz();
  },

  components: {
    'quiz-questions-component': __WEBPACK_IMPORTED_MODULE_0__components_QuizQuestionsComponent_vue__["a" /* default */],
    'quiz-review-component': __WEBPACK_IMPORTED_MODULE_1__components_QuizReviewComponent_vue__["a" /* default */]
  },
  computed: {},
  methods: {
    checkQuiz() {
      axios.get(`/api/quizes/${this.$route.params.id}/check`).then(({
        data
      }) => {
        this.status = data.status;
        this.pageTitle = data.test;
        this.breadcrumbs[2].title = data.test;
        this.description = data.description;
      });
    }

  },
  props: ['slug'],
  watch: {
    '$route'(to, from) {
      // react to route changes...
      this.checkQuiz();
    }

  }
});

/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ckeditor_ckeditor5_vue__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ckeditor_ckeditor5_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ckeditor_ckeditor5_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ckeditor_ckeditor5_build_classic__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ckeditor_ckeditor5_build_classic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ckeditor_ckeditor5_build_classic__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_sweetalert__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_sweetalert___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_sweetalert__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  data() {
    return {
      editor: __WEBPACK_IMPORTED_MODULE_1__ckeditor_ckeditor5_build_classic___default.a,
      result: [],
      answers: [],
      questions: [],
      quiz: [],
      started_at: new Date().getTime() + 30000
    };
  },

  created() {},

  mounted() {
    this.getQuiz();
  },

  components: {
    'ckeditor': __WEBPACK_IMPORTED_MODULE_0__ckeditor_ckeditor5_vue___default.a.component
  },
  computed: {
    start_at() {
      return this.started_at;
    },

    end_at() {
      return this.started_at + parseInt(this.quiz.duration);
    },

    pendingQuestions() {
      let count = 0;

      for (let i = 0; i < this.totalQuestions; i++) {
        this.questions[i].answer === null ? count++ : count;
      }

      return count;
    },

    totalQuestions() {
      return this.questions.length;
    }

  },
  methods: {
    completeQuiz() {
      let message = this.pendingQuestions > 0 ? `You have ${this.pendingQuestions} pending question(s) to answer. ` : "";
      __WEBPACK_IMPORTED_MODULE_2_sweetalert___default()({
        title: "Are you sure?",
        text: `${message}Do you want to submit now?`,
        icon: "warning",
        dangerMode: true,
        buttons: ["No!", "Submit!"]
      }).then(willSubmit => {
        if (willSubmit) {
          this.endQuiz();
        } else {
          this.submitQuiz();
        }
      });
    },

    endQuiz() {
      let questions = this.questions;
      let form_data = [];

      for (let i = 0; i < questions.length; i++) {
        form_data.push({
          question: questions[i].id,
          answer: questions[i].answer
        });
      }

      axios.post(`/api/quizes/submit/${this.$route.params.id}/1`, form_data).then(({
        data
      }) => {
        __WEBPACK_IMPORTED_MODULE_2_sweetalert___default()({
          text: "Your quiz has been submitted successfully",
          icon: "success"
        });
      });
      this.$emit('completed');
    },

    getQuiz() {
      axios.get(`/api/quizes/${this.$route.params.id}`).then(({
        data
      }) => {
        this.quiz = data.quiz;
        this.questions = data.questions;
        this.result = data.result;
      });
      axios.get(`/api/quizes/start/${this.$route.params.id}`).then(({
        data
      }) => {
        this.started_at = parseInt(data);
      });
    },

    showQuestion(index) {
      if (index >= 0 && index < this.questions.length) {
        jQuery(".tab-pane").removeClass('active show');
        jQuery(`#question_${index}`).addClass('active show');
        jQuery(".nav-link").attr("aria-selected", "false").removeClass('active show');
        jQuery(`#question_${index}-tab`).addClass('active show').attr("aria-selected", "true");
      }

      this.submitQuiz();
    },

    submitQuiz() {
      let questions = this.questions;
      let form_data = [];

      for (let i = 0; i < questions.length; i++) {
        form_data.push({
          question: questions[i].id,
          answer: questions[i].answer
        });
      }

      axios.post(`/api/quizes/submit/${this.$route.params.id}`, form_data).then(({
        data
      }) => {});
    },

    startCallBack: function (x) {},
    endCallBack: function (x) {
      this.endQuiz();
    }
  }
});

/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["a"] = ({
  data() {
    return {
      result: [],
      answers: [],
      quiz: []
    };
  },

  created() {},

  mounted() {
    this.getQuiz();
  },

  components: {},
  computed: {
    correctAnswers() {
      let answers = this.answers;
      let count = 0;

      for (let i = 0; i < answers.length; i++) {
        answers[i].correct ? count++ : count;
      }

      return count;
    },

    score() {
      let result = this.result;
      let score = Math.round(result.test_result / result.total_score * 100);
      let remark = "";
      let color = "text-muted";

      switch (true) {
        case score >= 80 && score <= 100:
          remark = "Great";
          color = "text-success";
          break;

        case score >= 60 && score < 80:
          remark = "Good";
          color = "text-warning";
          break;

        case score >= 40 && score < 60:
          remark = "Average";
          color = "text-secondary";
          break;

        case score < 40:
          remark = "Failed";
          color = "text-danger";
          break;

        default:
          break;
      }

      return {
        percentage: `${score}%`,
        remark: remark,
        color: color
      };
    },

    totalQuestions() {
      return this.answers.length;
    }

  },
  methods: {
    getQuiz() {
      axios.get(`/api/quizes/${this.$route.params.id}/review`).then(({
        data
      }) => {
        this.quiz = data.quiz;
        this.result = data.result;
        this.answers = data.result.answers;
      });
    },

    showQuestion(index) {
      if (index >= 0 && index < this.answers.length) {
        jQuery(".tab-pane").removeClass('active show');
        jQuery(`#question_${index}`).addClass('active show');
        jQuery(".nav-link").attr("aria-selected", "false").removeClass('active show');
        jQuery(`#question_${index}-tab`).addClass('active show').attr("aria-selected", "true");
      }
    }

  }
});

/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuejs_paginate__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuejs_paginate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vuejs_paginate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_sweetalert__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_sweetalert___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_sweetalert__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  data() {
    return {
      breadcrumbs: [{
        title: "Dashboard",
        link: 'dashboard'
      }, {
        title: "Courses",
        link: 'all-courses'
      }, {
        title: ""
      }],
      pageTitle: "",
      pageCount: 0,
      currentPage: 1,
      results: []
    };
  },

  created() {},

  mounted() {
    this.getQuizResults();
  },

  components: {
    paginate: __WEBPACK_IMPORTED_MODULE_0_vuejs_paginate___default.a
  },
  computed: {},
  methods: {
    getQuizResults(page = 1) {
      axios.get(`/api/quizes/results?count=12&page=${page}`).then(({
        data
      }) => {
        this.results = data.data;
        this.pageCount = data.last_page;
        this.currentPage = data.current_page;
      });
    },

    deleteResult(id) {
      __WEBPACK_IMPORTED_MODULE_1_sweetalert___default()({
        title: "Are you sure?",
        text: "Are you sure that you want to delete this quiz?",
        icon: "warning",
        dangerMode: true,
        buttons: ["Not sure!", "Yes I'm sure!"]
      }).then(willDelete => {
        if (willDelete) {
          axios.delete(`/api/quizes/${id}`).then(({
            data
          }) => {
            __WEBPACK_IMPORTED_MODULE_1_sweetalert___default()("Deleted!", "Your quiz result has been deleted ", "success");
          });
          this.getQuizResults();
        }
      });
    },

    score(quiz) {
      let score = Math.round(quiz.test_result / quiz.total_score * 100);
      let remark = "";
      let color = "text-muted";

      switch (true) {
        case score >= 80 && score <= 100:
          remark = "Great";
          color = "text-success";
          break;

        case score >= 60 && score < 80:
          remark = "Good";
          color = "text-warning";
          break;

        case score >= 40 && score < 60:
          remark = "Average";
          color = "text-secondary";
          break;

        case score < 40:
          remark = "Failed";
          color = "text-danger";
          break;

        default:
          break;
      }

      return {
        percentage: `${score}%`,
        remark: remark,
        color: color
      };
    }

  },
  props: ['slug']
});

/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_LessonsListComponent_vue__ = __webpack_require__(37);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  data() {
    return {
      instructions: "",
      quiz: [],
      quizID: 0,
      breadcrumbs: [{
        title: "Dashboard",
        link: 'dashboard'
      }, {
        title: "Courses",
        link: 'all-courses'
      }, {
        title: ""
      }],
      pageTitle: ""
    };
  },

  created() {
    this.getQuiz();
  },

  mounted() {},

  components: {},
  methods: {
    getQuiz() {
      axios.get(`/api/quizes/${this.$route.params.id}/${this.$route.params.slug}`).then(({
        data
      }) => {
        this.quiz = data.quiz;
        this.quizID = data.quiz_id;
        this.pageTitle = data.quiz.title;
        this.breadcrumbs[2].title = data.quiz.title;
        this.instructions = data.instructions;
      });
    }

  },
  props: ['slug'],
  computed: {}
});

/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ckeditor_ckeditor5_vue__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ckeditor_ckeditor5_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ckeditor_ckeditor5_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ckeditor_ckeditor5_build_classic__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ckeditor_ckeditor5_build_classic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ckeditor_ckeditor5_build_classic__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  data() {
    return {
      breadcrumbs: [{
        title: "Dashboard",
        link: 'dashboard'
      }, {
        title: "Courses",
        link: 'all-courses'
      }, {
        title: ""
      }],
      editor: __WEBPACK_IMPORTED_MODULE_1__ckeditor_ckeditor5_build_classic___default.a,
      pageTitle: "",
      result: [],
      questions: [],
      quiz: [],
      started_at: new Date().getTime() + 5000
    };
  },

  created() {},

  mounted() {
    this.getQuiz();
  },

  components: {
    'ckeditor': __WEBPACK_IMPORTED_MODULE_0__ckeditor_ckeditor5_vue___default.a.component
  },
  computed: {
    start_at() {
      return this.started_at;
    },

    end_at() {
      return this.started_at + parseInt(this.quiz.duration);
    },

    pendingQuestions() {
      let pending = 0;

      for (let i = 0; i < this.totalQuestions; i++) {
        this.questions[i].answer == null ? pending++ : pending;
      }

      return pending;
    },

    totalQuestions() {
      return this.questions.length;
    }

  },
  methods: {
    completeQuiz() {
      let questions = this.questions;
      let form_data = [];

      for (let i = 0; i < questions.length; i++) {
        form_data.push({
          question: questions[i].id,
          answer: questions[i].answer
        });
      }

      axios.post(`/api/quizes/submit/${this.$route.params.id}/1`, form_data).then(({
        data
      }) => {
        alert('your quiz has been submitted');
      });
    },

    getQuiz() {
      axios.get(`/api/quizes/${this.$route.params.id}`).then(({
        data
      }) => {
        this.quiz = data.quiz;
        this.pageTitle = data.quiz.title;
        this.breadcrumbs[2].title = data.quiz.title;
        this.questions = data.questions;
        this.result = data.result;
      });
      axios.get(`/api/quizes/start/${this.$route.params.id}`).then(({
        data
      }) => {
        this.started_at = parseInt(data);
      });
    },

    showQuestion(index) {
      if (index >= 0 && index < this.questions.length) {
        jQuery(".tab-pane").removeClass('active show');
        jQuery(`#question_${index}`).addClass('active show');
        jQuery(".nav-link").attr("aria-selected", "false").removeClass('active show');
        jQuery(`#question_${index}-tab`).addClass('active show').attr("aria-selected", "true");
      }

      this.submitQuiz();
    },

    submitQuiz() {
      let questions = this.questions;
      let form_data = [];

      for (let i = 0; i < questions.length; i++) {
        form_data.push({
          question: questions[i].id,
          answer: questions[i].answer
        });
      }

      axios.post(`/api/quizes/submit/${this.$route.params.id}`, form_data).then(({
        data
      }) => {});
    },

    startCallBack: function (x) {},
    endCallBack: function (x) {
      this.completeQuiz();
    }
  },
  props: ['slug']
});

/***/ }),
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */
;

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.NProgress = factory();
  }
})(this, function () {
  var NProgress = {};
  NProgress.version = '0.2.0';
  var Settings = NProgress.settings = {
    minimum: 0.08,
    easing: 'ease',
    positionUsing: '',
    speed: 200,
    trickle: true,
    trickleRate: 0.02,
    trickleSpeed: 800,
    showSpinner: true,
    barSelector: '[role="bar"]',
    spinnerSelector: '[role="spinner"]',
    parent: 'body',
    template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
  };
  /**
   * Updates configuration.
   *
   *     NProgress.configure({
  *       minimum: 0.1
  *     });
   */

  NProgress.configure = function (options) {
    var key, value;

    for (key in options) {
      value = options[key];
      if (value !== undefined && options.hasOwnProperty(key)) Settings[key] = value;
    }

    return this;
  };
  /**
   * Last number.
   */


  NProgress.status = null;
  /**
   * Sets the progress bar status, where `n` is a number from `0.0` to `1.0`.
   *
   *     NProgress.set(0.4);
   *     NProgress.set(1.0);
   */

  NProgress.set = function (n) {
    var started = NProgress.isStarted();
    n = clamp(n, Settings.minimum, 1);
    NProgress.status = n === 1 ? null : n;
    var progress = NProgress.render(!started),
        bar = progress.querySelector(Settings.barSelector),
        speed = Settings.speed,
        ease = Settings.easing;
    progress.offsetWidth;
    /* Repaint */

    queue(function (next) {
      // Set positionUsing if it hasn't already been set
      if (Settings.positionUsing === '') Settings.positionUsing = NProgress.getPositioningCSS(); // Add transition

      css(bar, barPositionCSS(n, speed, ease));

      if (n === 1) {
        // Fade out
        css(progress, {
          transition: 'none',
          opacity: 1
        });
        progress.offsetWidth;
        /* Repaint */

        setTimeout(function () {
          css(progress, {
            transition: 'all ' + speed + 'ms linear',
            opacity: 0
          });
          setTimeout(function () {
            NProgress.remove();
            next();
          }, speed);
        }, speed);
      } else {
        setTimeout(next, speed);
      }
    });
    return this;
  };

  NProgress.isStarted = function () {
    return typeof NProgress.status === 'number';
  };
  /**
   * Shows the progress bar.
   * This is the same as setting the status to 0%, except that it doesn't go backwards.
   *
   *     NProgress.start();
   *
   */


  NProgress.start = function () {
    if (!NProgress.status) NProgress.set(0);

    var work = function () {
      setTimeout(function () {
        if (!NProgress.status) return;
        NProgress.trickle();
        work();
      }, Settings.trickleSpeed);
    };

    if (Settings.trickle) work();
    return this;
  };
  /**
   * Hides the progress bar.
   * This is the *sort of* the same as setting the status to 100%, with the
   * difference being `done()` makes some placebo effect of some realistic motion.
   *
   *     NProgress.done();
   *
   * If `true` is passed, it will show the progress bar even if its hidden.
   *
   *     NProgress.done(true);
   */


  NProgress.done = function (force) {
    if (!force && !NProgress.status) return this;
    return NProgress.inc(0.3 + 0.5 * Math.random()).set(1);
  };

  NProgress.failed = function (force) {
    document.getElementById('nprogress').style.color = "#fdbdbd";
    return NProgress.done;
  };
  /**
   * Increments by a random amount.
   */


  NProgress.inc = function (amount) {
    var n = NProgress.status;

    if (!n) {
      return NProgress.start();
    } else {
      if (typeof amount !== 'number') {
        amount = (1 - n) * clamp(Math.random() * n, 0.1, 0.95);
      }

      n = clamp(n + amount, 0, 0.994);
      return NProgress.set(n);
    }
  };

  NProgress.trickle = function () {
    return NProgress.inc(Math.random() * Settings.trickleRate);
  };
  /**
   * Waits for all supplied jQuery promises and
   * increases the progress as the promises resolve.
   *
   * @param $promise jQUery Promise
   */


  (function () {
    var initial = 0,
        current = 0;

    NProgress.promise = function ($promise) {
      if (!$promise || $promise.state() === "resolved") {
        return this;
      }

      if (current === 0) {
        NProgress.start();
      }

      initial++;
      current++;
      $promise.always(function () {
        current--;

        if (current === 0) {
          initial = 0;
          NProgress.done();
        } else {
          NProgress.set((initial - current) / initial);
        }
      });
      return this;
    };
  })();
  /**
   * (Internal) renders the progress bar markup based on the `template`
   * setting.
   */


  NProgress.render = function (fromStart) {
    if (NProgress.isRendered()) return document.getElementById('nprogress');
    addClass(document.documentElement, 'nprogress-busy');
    var progress = document.createElement('div');
    progress.id = 'nprogress';
    progress.innerHTML = Settings.template;
    var bar = progress.querySelector(Settings.barSelector),
        perc = fromStart ? '-100' : toBarPerc(NProgress.status || 0),
        parent = document.querySelector(Settings.parent),
        spinner;
    css(bar, {
      transition: 'all 0 linear',
      transform: 'translate3d(' + perc + '%,0,0)'
    });

    if (!Settings.showSpinner) {
      spinner = progress.querySelector(Settings.spinnerSelector);
      spinner && removeElement(spinner);
    }

    if (parent != document.body) {
      addClass(parent, 'nprogress-custom-parent');
    }

    parent.appendChild(progress);
    return progress;
  };
  /**
   * Removes the element. Opposite of render().
   */


  NProgress.remove = function () {
    removeClass(document.documentElement, 'nprogress-busy');
    removeClass(document.querySelector(Settings.parent), 'nprogress-custom-parent');
    var progress = document.getElementById('nprogress');
    progress && removeElement(progress);
  };
  /**
   * Checks if the progress bar is rendered.
   */


  NProgress.isRendered = function () {
    return !!document.getElementById('nprogress');
  };
  /**
   * Determine which positioning CSS rule to use.
   */


  NProgress.getPositioningCSS = function () {
    // Sniff on document.body.style
    var bodyStyle = document.body.style; // Sniff prefixes

    var vendorPrefix = 'WebkitTransform' in bodyStyle ? 'Webkit' : 'MozTransform' in bodyStyle ? 'Moz' : 'msTransform' in bodyStyle ? 'ms' : 'OTransform' in bodyStyle ? 'O' : '';

    if (vendorPrefix + 'Perspective' in bodyStyle) {
      // Modern browsers with 3D support, e.g. Webkit, IE10
      return 'translate3d';
    } else if (vendorPrefix + 'Transform' in bodyStyle) {
      // Browsers without 3D support, e.g. IE9
      return 'translate';
    } else {
      // Browsers without translate() support, e.g. IE7-8
      return 'margin';
    }
  };
  /**
   * Helpers
   */


  function clamp(n, min, max) {
    if (n < min) return min;
    if (n > max) return max;
    return n;
  }
  /**
   * (Internal) converts a percentage (`0..1`) to a bar translateX
   * percentage (`-100%..0%`).
   */


  function toBarPerc(n) {
    return (-1 + n) * 100;
  }
  /**
   * (Internal) returns the correct CSS for changing the bar's
   * position given an n percentage, and speed and ease from Settings
   */


  function barPositionCSS(n, speed, ease) {
    var barCSS;

    if (Settings.positionUsing === 'translate3d') {
      barCSS = {
        transform: 'translate3d(' + toBarPerc(n) + '%,0,0)'
      };
    } else if (Settings.positionUsing === 'translate') {
      barCSS = {
        transform: 'translate(' + toBarPerc(n) + '%,0)'
      };
    } else {
      barCSS = {
        'margin-left': toBarPerc(n) + '%'
      };
    }

    barCSS.transition = 'all ' + speed + 'ms ' + ease;
    return barCSS;
  }
  /**
   * (Internal) Queues a function to be executed.
   */


  var queue = function () {
    var pending = [];

    function next() {
      var fn = pending.shift();

      if (fn) {
        fn(next);
      }
    }

    return function (fn) {
      pending.push(fn);
      if (pending.length == 1) next();
    };
  }();
  /**
   * (Internal) Applies css properties to an element, similar to the jQuery
   * css method.
   *
   * While this helper does assist with vendor prefixed property names, it
   * does not perform any manipulation of values prior to setting styles.
   */


  var css = function () {
    var cssPrefixes = ['Webkit', 'O', 'Moz', 'ms'],
        cssProps = {};

    function camelCase(string) {
      return string.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function (match, letter) {
        return letter.toUpperCase();
      });
    }

    function getVendorProp(name) {
      var style = document.body.style;
      if (name in style) return name;
      var i = cssPrefixes.length,
          capName = name.charAt(0).toUpperCase() + name.slice(1),
          vendorName;

      while (i--) {
        vendorName = cssPrefixes[i] + capName;
        if (vendorName in style) return vendorName;
      }

      return name;
    }

    function getStyleProp(name) {
      name = camelCase(name);
      return cssProps[name] || (cssProps[name] = getVendorProp(name));
    }

    function applyCss(element, prop, value) {
      prop = getStyleProp(prop);
      element.style[prop] = value;
    }

    return function (element, properties) {
      var args = arguments,
          prop,
          value;

      if (args.length == 2) {
        for (prop in properties) {
          value = properties[prop];
          if (value !== undefined && properties.hasOwnProperty(prop)) applyCss(element, prop, value);
        }
      } else {
        applyCss(element, args[1], args[2]);
      }
    };
  }();
  /**
   * (Internal) Determines if an element or space separated list of class names contains a class name.
   */


  function hasClass(element, name) {
    var list = typeof element == 'string' ? element : classList(element);
    return list.indexOf(' ' + name + ' ') >= 0;
  }
  /**
   * (Internal) Adds a class to an element.
   */


  function addClass(element, name) {
    var oldList = classList(element),
        newList = oldList + name;
    if (hasClass(oldList, name)) return; // Trim the opening space.

    element.className = newList.substring(1);
  }
  /**
   * (Internal) Removes a class from an element.
   */


  function removeClass(element, name) {
    var oldList = classList(element),
        newList;
    if (!hasClass(element, name)) return; // Replace the class name.

    newList = oldList.replace(' ' + name + ' ', ' '); // Trim the opening and closing spaces.

    element.className = newList.substring(1, newList.length - 1);
  }
  /**
   * (Internal) Gets a space separated list of the class names on the element.
   * The list is wrapped with a single space on each end to facilitate finding
   * matches within the list.
   */


  function classList(element) {
    return (' ' + (element.className || '') + ' ').replace(/\s+/gi, ' ');
  }
  /**
   * (Internal) Removes an element from the DOM.
   */


  function removeElement(element) {
    element && element.parentNode && element.parentNode.removeChild(element);
  }

  return NProgress;
});

/***/ }),
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__uiux_js_nprogress_js__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__uiux_js_nprogress_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__uiux_js_nprogress_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_Course_vue__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_Courses_vue__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__views_Lesson_vue__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__views_CategoryCourses_vue__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__views_Index_vue__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__views_PurchasedCourses_vue__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__views_TagCourses_vue__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__views_Quiz_vue__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__views_Quizes_vue__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__views_QuizInstructions_vue__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__views_QuizResult_vue__ = __webpack_require__(131);













const Error404 = {
  template: "",

  beforeRouteEnter(to, from, next) {
    window.location('/user/error/404');
  }

};
const routes = [{
  path: '/home',
  name: 'home',
  component: {
    beforeRouteEnter(to, from, next) {
      window.location = '/home';
    }

  }
}, {
  path: '/user/',
  name: 'dashboard',
  component: __WEBPACK_IMPORTED_MODULE_6__views_Index_vue__["a" /* default */]
}, {
  path: '/user/course/:slug',
  name: 'course',
  component: __WEBPACK_IMPORTED_MODULE_2__views_Course_vue__["a" /* default */]
}, {
  path: '/user/courses/all',
  name: 'all-courses',
  component: __WEBPACK_IMPORTED_MODULE_3__views_Courses_vue__["a" /* default */]
}, {
  path: '/user/courses/categories/:slug',
  name: 'category-courses',
  component: __WEBPACK_IMPORTED_MODULE_5__views_CategoryCourses_vue__["a" /* default */],
  props: true
}, {
  path: '/user/lesson/:id/:slug',
  name: 'lesson',
  component: __WEBPACK_IMPORTED_MODULE_4__views_Lesson_vue__["a" /* default */]
}, {
  path: '/user/courses/purchased',
  name: 'purchased-courses',
  component: __WEBPACK_IMPORTED_MODULE_7__views_PurchasedCourses_vue__["a" /* default */]
}, {
  path: '/user/courses/tags/:tag',
  name: 'tag-courses',
  component: __WEBPACK_IMPORTED_MODULE_8__views_TagCourses_vue__["a" /* default */],
  props: true
}, {
  path: '/user/quiz/:id',
  name: 'quiz',
  component: __WEBPACK_IMPORTED_MODULE_9__views_Quiz_vue__["a" /* default */]
}, {
  path: '/user/quizes',
  name: 'quizes',
  component: __WEBPACK_IMPORTED_MODULE_10__views_Quizes_vue__["a" /* default */]
}, {
  path: '/user/quiz/result/:id',
  name: 'quiz-result',
  component: __WEBPACK_IMPORTED_MODULE_12__views_QuizResult_vue__["a" /* default */]
}, {
  path: '/user/quiz/:id/:slug',
  name: 'quiz-instructions',
  component: __WEBPACK_IMPORTED_MODULE_11__views_QuizInstructions_vue__["a" /* default */]
}, {
  path: '/user/dashboard',
  component: __WEBPACK_IMPORTED_MODULE_6__views_Index_vue__["a" /* default */]
}, {
  path: '/user/404',
  name: 'error',
  component: Error404
}, {
  path: '*',
  redirect: '/user/error404'
}];
const router = new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
  mode: 'history',
  routes
}); // drg >> start progress bar before route request

router.beforeResolve((to, from, next) => {
  if (to.name) {
    __WEBPACK_IMPORTED_MODULE_0__uiux_js_nprogress_js___default.a.start();
  }

  next();
}); // drg >> end progress bar after route response

router.afterEach((to, from) => {
  __WEBPACK_IMPORTED_MODULE_0__uiux_js_nprogress_js___default.a.done();
});
/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_cacheDirectory_node_modules_vue_loader_lib_selector_type_script_index_0_Course_vue__ = __webpack_require__(63);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3cac9561_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Course_vue__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_cacheDirectory_node_modules_vue_loader_lib_selector_type_script_index_0_Course_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3cac9561_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Course_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3cac9561_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Course_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card"},[_vm._m(0),_vm._v(" "),_c('ul',{staticClass:"card-body list-group list-group-fit"},_vm._l((_vm.lessons),function(lesson,index){return _c('li',{staticClass:"list-group-item"},[_c('div',{staticClass:"media"},[_c('div',{staticClass:"media-left"},[_c('div',{staticClass:"text-muted"},[_vm._v(_vm._s(index + 1)+".")])]),_vm._v(" "),_c('div',{staticClass:"media-body"},[(_vm.purchased || lesson.free_lesson)?_c('router-link',{attrs:{"to":{name:'lesson',params:{'slug':lesson.slug,'id':_vm.id}}}},[_vm._v(_vm._s(lesson.title))]):_vm._e(),_vm._v(" "),(!_vm.purchased && !lesson.free_lesson)?_c('div',{staticClass:"text-muted-light"},[_vm._v(_vm._s(lesson.title))]):_vm._e()],1),_vm._v(" "),_c('div',{staticClass:"media-right"},[(_vm.purchased || lesson.free_lesson)?_c('small',{staticClass:"text-muted-light"},[_vm._v(_vm._s(Math.floor(lesson.duration / 60))+":"+_vm._s(Math.floor(lesson.duration % 60)))]):_vm._e(),_vm._v(" "),(_vm.purchased || lesson.free_lesson)?_c('router-link',{attrs:{"to":{name:'lesson',params:{'slug':lesson.slug,'id':_vm.id}}}},[(!lesson.is_completed)?_c('i',{staticClass:"fa fa-play-circle text-primary"}):_vm._e(),_vm._v(" "),(lesson.is_completed)?_c('i',{staticClass:"fa fa-check-circle text-success"}):_vm._e()]):_vm._e(),_vm._v(" "),(!_vm.purchased && !lesson.free_lesson)?_c('small',{staticClass:"badge badge-primary"},[_vm._v("PRO")]):_vm._e()],1)])])}),0)])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-header"},[_c('h4',{staticClass:"card-title"},[_vm._v("Lessons")])])}]


/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('vue-headful',{attrs:{"title":_vm.pageTitle + ' | OpenAcademi',"description":_vm.course.summary}}),_vm._v(" "),_c('breadcrumb-component',{attrs:{"breadcrumbs":_vm.breadcrumbs,"title":_vm.pageTitle}}),_vm._v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-md-8"},[_c('div',{staticClass:"card"},[(_vm.course.course_image_type == 'image')?_c('div',[_c('img',{attrs:{"src":_vm.course.course_image,"alt":_vm.course.slug,"width":"100%"}})]):_vm._e(),_vm._v(" "),(_vm.course.course_image_type == 'video')?_c('div',{staticClass:"embed-responsive embed-responsive-16by9"},[_c('iframe',{staticClass:"embed-responsive-item",attrs:{"src":_vm.course.course_image,"allowfullscreen":""}})]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"card-body",domProps:{"innerHTML":_vm._s(_vm.course.description)}})]),_vm._v(" "),_c('lessons-list-component',{attrs:{"lessons":_vm.course.published_lessons,"purchased":_vm.purchased,"id":_vm.course.id}})],1),_vm._v(" "),_c('div',{staticClass:"col-md-4"},[(!_vm.purchased)?_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body text-center"},[_c('p',[_c('a',{staticClass:"btn btn-success btn-block flex-column",attrs:{"href":'/course/payment/initialize/'+_vm.course.slug}},[_vm._v("\n                            Purchase this course\n                            "),_c('strong',[_vm._v("₦ "+_vm._s(_vm.course.price.toLocaleString('en', {maximumSignificantDigits: 2})))])])])])]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"card"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"card-body"},[_c('div',[_c('star-rating',{attrs:{"rating":Number(_vm.course.rating.split(';')[0]),"increment":0.01,"read-only":true,"star-size":24}})],1),_vm._v(" "),_c('small',{staticClass:"text-muted"},[_vm._v(_vm._s(_vm.course.rating.split(';')[1])+" ratings")])])]),_vm._v(" "),_c('div',{staticClass:"card"},[_c('ul',{staticClass:"list-group list-group-fit"},[_c('li',{staticClass:"list-group-item"},[_c('div',{staticClass:"media align-items-center"},[_vm._m(1),_vm._v(" "),_c('div',{staticClass:"media-body"},[_vm._v("\n                                "+_vm._s(_vm.course.course_cat)+"\n                            ")])])]),_vm._v(" "),_c('li',{staticClass:"list-group-item"},[_c('div',{staticClass:"media align-items-center"},[_vm._m(2),_vm._v(" "),_c('div',{staticClass:"media-body"},[_vm._v("\n\n                                "+_vm._s(Math.floor(_vm.course.duration / 3600))+"\n                                "),_c('small',{staticClass:"text-muted"},[_vm._v("hrs")]),_vm._v("   "+_vm._s(_vm.course.duration % 60)+"\n                                "),_c('small',{staticClass:"text-muted"},[_vm._v("min")])])])])])]),_vm._v(" "),_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-header"},[_c('div',{staticClass:"media align-items-center"},[_c('div',{staticClass:"media-left"},[_c('img',{staticClass:"rounded-circle",attrs:{"src":_vm.public_+'/assets/images/people/110/guy-6.jpg',"alt":"About Adrian","width":"50"}})]),_vm._v(" "),_vm._m(3)])]),_vm._v(" "),_vm._m(4)])])])],1)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-header"},[_c('h4',{staticClass:"card-title"},[_vm._v("Ratings")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"media-left"},[_c('i',{staticClass:"material-icons text-muted-light"},[_vm._v("assessment")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"media-left"},[_c('i',{staticClass:"material-icons text-muted-light"},[_vm._v("schedule")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"media-body"},[_c('h4',{staticClass:"card-title"},[_c('a',{attrs:{"href":"fixed-student-profile.html"}},[_vm._v("Adrian Demian")])]),_vm._v(" "),_c('p',{staticClass:"card-subtitle"},[_vm._v("Instructor")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-body"},[_c('p',[_vm._v("Having over 12 years exp. Adrian is one of the lead UI designers in the industry Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, aut.")]),_vm._v(" "),_c('a',{staticClass:"btn btn-default",attrs:{"href":""}},[_c('i',{staticClass:"fab fa-facebook"})]),_vm._v(" "),_c('a',{staticClass:"btn btn-default",attrs:{"href":""}},[_c('i',{staticClass:"fab fa-twitter"})]),_vm._v(" "),_c('a',{staticClass:"btn btn-default",attrs:{"href":""}},[_c('i',{staticClass:"fab fa-github"})])])}]


/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_cacheDirectory_node_modules_vue_loader_lib_selector_type_script_index_0_Courses_vue__ = __webpack_require__(65);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_151f2ef6_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Courses_vue__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_cacheDirectory_node_modules_vue_loader_lib_selector_type_script_index_0_Courses_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_151f2ef6_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Courses_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_151f2ef6_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Courses_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(101);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(12).default
var update = add("1283b01e", content, true, {});

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)();
exports.push([module.i, ".vue-star-rating{margin:auto}", ""]);

/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.courseWidth},[_c('div',{staticClass:"card "},[_c('div',{staticClass:"card-header text-center"},[_c('h5',{staticClass:"card-title mb-0"},[_c('router-link',{attrs:{"to":{name:'course',params:{'slug':_vm.course.slug}}}},[_vm._v(_vm._s(_vm.course.title))])],1),_vm._v(" "),_c('div',{staticClass:"text-center"},[_c('star-rating',{attrs:{"rating":Number(_vm.course.rating.split(';')[0]),"increment":0.01,"read-only":true,"star-size":18}})],1)]),_vm._v(" "),_c('span',{staticClass:"course-price"},[_vm._v("₦"+_vm._s(_vm.course.price.toLocaleString('en', {maximumSignificantDigits: 2})))]),_vm._v(" "),_c('router-link',{attrs:{"to":{name:'course',params:{'slug':_vm.course.slug}}}},[_c('img',{staticStyle:{"width":"100%"},attrs:{"src":_vm.course.course_image_preview,"alt":_vm.course.title}})]),_vm._v(" "),_c('div',{staticClass:"card-body"},[_c('small',{staticClass:"text-muted"},[_vm._v(_vm._s(_vm.course.course_cat))]),_vm._v(" "),_c('br'),_vm._v("\n            "+_vm._s(_vm.course.summary)),_c('br'),_vm._v(" "),_vm._l((_vm.course.tags),function(tag){return _c('router-link',{key:tag,attrs:{"to":{name:'tag-courses',params:{'tag':tag}}}},[_c('span',{staticClass:"badge badge-primary mr-1"},[_vm._v("\n                "+_vm._s(tag))])])})],2)],1)])}
var staticRenderFns = []


/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('vue-headful',{attrs:{"title":_vm.pageTitle + ' | OpenAcademi',"description":"Our featured courses"}}),_vm._v(" "),_c('breadcrumb-component',{attrs:{"breadcrumbs":_vm.breadcrumbs,"title":_vm.pageTitle}}),_vm._v(" "),_c('div',{staticClass:"row"},_vm._l((_vm.allCourses),function(course){return _c('courses-component',{key:course.id,attrs:{"course":course,"courseWidth":_vm.courseListWidth}})}),1),_vm._v(" "),_c('paginate',{attrs:{"page-count":_vm.pageCount,"click-handler":_vm.getAllCourses,"prev-text":'Prev',"next-text":'Next',"container-class":"pagination justify-content-center pagination-sm","active-class":"page-item active","disabled-class":"page-item disabled","page-class":"page-item","next-class":"page-item","prev-class":"page-item","page-link-class":"page-link","next-link-class":"page-link","prev-link-class":"page-link"}})],1)}
var staticRenderFns = []


/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_cacheDirectory_node_modules_vue_loader_lib_selector_type_script_index_0_Lesson_vue__ = __webpack_require__(68);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_269bfaa7_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Lesson_vue__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_cacheDirectory_node_modules_vue_loader_lib_selector_type_script_index_0_Lesson_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_269bfaa7_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Lesson_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_269bfaa7_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Lesson_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"progress rounded-0"},[_c('div',{class:'progress-bar bg-'+_vm.getLessonsProgress(_vm.course).color,style:('width:'+_vm.getLessonsProgress(_vm.course).score+'%'),attrs:{"role":"progressbar","aria-valuenow":_vm.course.completed_lessons,"aria-valuemin":"0","aria-valuemax":_vm.course.total_lessons}})])}
var staticRenderFns = []


/***/ }),
/* 106 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('vue-headful',{attrs:{"title":_vm.pageTitle + ' | OpenAcademi',"description":_vm.course.summary}}),_vm._v(" "),_c('breadcrumb-component',{attrs:{"breadcrumbs":_vm.breadcrumbs,"title":_vm.pageTitle}}),_vm._v(" "),_c('div',{staticClass:"row"},[(_vm.purchased && _vm.lesson.test)?_c('div',{staticClass:"alert alert-light alert-dismissible border-1 border-left-3 border-left-success col-lg-12",attrs:{"role":"alert"}},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"text-black-70"},[_vm._v("This course has a quiz. Locate it at the right sidebar.")])]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"col-md-8"},[_c('div',{staticClass:"card"},[_c('div',[(_vm.lesson.lesson_image_type == 'image')?_c('img',{attrs:{"src":_vm.lesson.lesson_image,"alt":_vm.lesson.slug,"width":"100%"}}):_vm._e()]),_vm._v(" "),(_vm.lesson.lesson_image_type == 'video')?_c('div',{staticClass:"embed-responsive embed-responsive-16by9"},[_c('iframe',{staticClass:"embed-responsive-item",attrs:{"src":_vm.lesson.lesson_image,"allowfullscreen":""}})]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"card-body",domProps:{"innerHTML":_vm._s(_vm.lesson.full_text)}})]),_vm._v(" "),(_vm.lesson.media.length>0)?_c('div',{staticClass:"card"},[_vm._m(1),_vm._v(" "),_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"table-responsive"},[_c('table',{staticClass:"table"},[_vm._m(2),_vm._v(" "),_c('tbody',_vm._l((_vm.lesson.media),function(file,index){return _c('tr',[_c('td',{staticClass:"text-muted"},[_vm._v(_vm._s(index + 1))]),_vm._v(" "),_c('td',[_c('a',{attrs:{"href":'/uploads/'+file.id+'/'+file.file_name}},[_vm._v(_vm._s(file.file_name))])]),_vm._v(" "),_c('td',{staticClass:"text-muted"},[_vm._v(_vm._s(file.size)+" KB")]),_vm._v(" "),_c('td',{staticClass:"text-center"},[_c('a',{staticClass:"btn btn-sm btn-outline-primary",attrs:{"href":'/uploads/'+file.id+'/'+file.file_name,"title":("Download " + (file.file_name))}},[_c('i',{staticClass:"material-icons"},[_vm._v("file_download")])])])])}),0)])])])]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"col-md-4"},[(!_vm.purchased)?_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body text-center"},[_c('p',[_c('a',{staticClass:"btn btn-success btn-block flex-column",attrs:{"href":'/course/payment/initialize/'+_vm.course.slug}},[_vm._v("\n                            Purchase this course\n                            "),_c('strong',[_vm._v("₦ "+_vm._s(_vm.course.price.toLocaleString('en', {maximumSignificantDigits: 2})))])])])])]):_vm._e(),_vm._v(" "),(_vm.purchased)?_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body"},[_c('progress-component',{attrs:{"course":_vm.course}}),_vm._v(" "),_c('small',{staticClass:"text-muted"},[_vm._v("Lessons: "+_vm._s(_vm.course.completed_lessons)+" of "+_vm._s(_vm.course.total_lessons))])],1)]):_vm._e(),_vm._v(" "),_c('lessons-list-component',{attrs:{"lessons":_vm.course.published_lessons,"purchased":_vm.purchased,"id":_vm.course.id}}),_vm._v(" "),(_vm.purchased && _vm.lesson.test)?_c('div',{staticClass:"card"},[_vm._m(3),_vm._v(" "),_c('div',{staticClass:"card-body"},[_c('h3',[_vm._v(_vm._s(_vm.lesson.test.title))]),_vm._v(" "),_c('p',[_vm._v(_vm._s(_vm.lesson.test.about_quiz))]),_vm._v(" "),_c('p',{staticClass:"text-muted"},[_vm._v(" "+_vm._s(_vm.quizDuration))]),_vm._v(" "),_c('div',{staticClass:"text-center"},[_c('router-link',{staticClass:"btn btn-success",attrs:{"to":{name:'quiz-instructions',params:{id:_vm.lesson.test.id,slug:_vm.lesson.slug}}}},[_vm._v("Take Quiz")])],1)])]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"card"},[_vm._m(4),_vm._v(" "),_c('div',{staticClass:"card-body"},[_c('div',[_c('star-rating',{attrs:{"rating":Number(_vm.course.rating.split(';')[0]),"increment":0.01,"read-only":true,"star-size":24}})],1),_vm._v(" "),_c('small',{staticClass:"text-muted"},[_vm._v(_vm._s(_vm.course.rating.split(';')[1])+" ratings")])])]),_vm._v(" "),_c('div',{staticClass:"card"},[_c('ul',{staticClass:"list-group list-group-fit"},[_c('li',{staticClass:"list-group-item"},[_c('div',{staticClass:"media align-items-center"},[_vm._m(5),_vm._v(" "),_c('div',{staticClass:"media-body"},[_vm._v("\n                                "+_vm._s(_vm.course.course_cat)+"\n                            ")])])]),_vm._v(" "),_c('li',{staticClass:"list-group-item"},[_c('div',{staticClass:"media align-items-center"},[_vm._m(6),_vm._v(" "),_c('div',{staticClass:"media-body"},[_vm._v("\n\n                                "+_vm._s(Math.floor(_vm.course.duration / 3600))+"\n                                "),_c('small',{staticClass:"text-muted"},[_vm._v("hrs")]),_vm._v("   "+_vm._s(_vm.course.duration % 60)+"\n                                "),_c('small',{staticClass:"text-muted"},[_vm._v("min")])])])])])]),_vm._v(" "),_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-header"},[_c('div',{staticClass:"media align-items-center"},[_c('div',{staticClass:"media-left"},[_c('img',{staticClass:"rounded-circle",attrs:{"src":_vm.public_+'/assets/images/people/110/guy-6.jpg',"alt":"About Adrian","width":"50"}})]),_vm._v(" "),_vm._m(7)])]),_vm._v(" "),_vm._m(8)])],1)])],1)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"alert","aria-label":"Close"}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-header"},[_c('h4',{staticClass:"card-title"},[_vm._v("Lesson Materials")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',[_c('tr',[_c('th',[_vm._v("#")]),_vm._v(" "),_c('th',[_vm._v("Name")]),_vm._v(" "),_c('th',[_vm._v("Size")]),_vm._v(" "),_c('th',{staticClass:"text-center"},[_vm._v("?")])])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-header"},[_c('h4',{staticClass:"card-title"},[_vm._v("Quiz")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-header"},[_c('h4',{staticClass:"card-title"},[_vm._v("Ratings")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"media-left"},[_c('i',{staticClass:"material-icons text-muted-light"},[_vm._v("assessment")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"media-left"},[_c('i',{staticClass:"material-icons text-muted-light"},[_vm._v("schedule")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"media-body"},[_c('h4',{staticClass:"card-title"},[_c('a',{attrs:{"href":"fixed-student-profile.html"}},[_vm._v("Adrian Demian")])]),_vm._v(" "),_c('p',{staticClass:"card-subtitle"},[_vm._v("Instructor")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-body"},[_c('p',[_vm._v("Having over 12 years exp. Adrian is one of the lead UI designers in the industry Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, aut.")]),_vm._v(" "),_c('a',{staticClass:"btn btn-default",attrs:{"href":""}},[_c('i',{staticClass:"fab fa-facebook"})]),_vm._v(" "),_c('a',{staticClass:"btn btn-default",attrs:{"href":""}},[_c('i',{staticClass:"fab fa-twitter"})]),_vm._v(" "),_c('a',{staticClass:"btn btn-default",attrs:{"href":""}},[_c('i',{staticClass:"fab fa-github"})])])}]


/***/ }),
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_cacheDirectory_node_modules_vue_loader_lib_selector_type_script_index_0_CategoryCourses_vue__ = __webpack_require__(71);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_153ea675_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_CategoryCourses_vue__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_cacheDirectory_node_modules_vue_loader_lib_selector_type_script_index_0_CategoryCourses_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_153ea675_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_CategoryCourses_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_153ea675_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_CategoryCourses_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('vue-headful',{attrs:{"title":_vm.pageTitle + ' | OpenAcademi',"description":_vm.pageTitle+ ' Category Courses'}}),_vm._v(" "),_c('breadcrumb-component',{attrs:{"breadcrumbs":_vm.breadcrumbs,"title":_vm.pageTitle}}),_vm._v(" "),_c('div',{staticClass:"row"},_vm._l((_vm.allCourses),function(course){return _c('courses-component',{key:course.id,attrs:{"course":course,"courseWidth":_vm.courseListWidth}})}),1),_vm._v(" "),_c('paginate',{attrs:{"page-count":_vm.pageCount,"click-handler":_vm.getCategoryCourses,"prev-text":"Prev","next-text":"Next","container-class":"pagination justify-content-center pagination-sm","active-class":"page-item active","disabled-class":"page-item disabled","page-class":"page-item","next-class":"page-item","prev-class":"page-item","page-link-class":"page-link","next-link-class":"page-link","prev-link-class":"page-link"}})],1)}
var staticRenderFns = []


/***/ }),
/* 109 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_cacheDirectory_node_modules_vue_loader_lib_selector_type_script_index_0_Index_vue__ = __webpack_require__(72);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_fc8115ac_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Index_vue__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_cacheDirectory_node_modules_vue_loader_lib_selector_type_script_index_0_Index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_fc8115ac_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Index_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_fc8115ac_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Index_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('vue-headful',{attrs:{"title":_vm.pageTitle + ' | OpenAcademi',"description":_vm.pageTitle}}),_vm._v(" "),_c('breadcrumb-component',{attrs:{"breadcrumbs":_vm.breadcrumbs,"title":_vm.pageTitle}}),_vm._v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-md-6"},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-header"},[_c('div',{staticClass:"media align-items-center"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"media-right"},[_c('router-link',{staticClass:"btn btn-sm btn-primary",attrs:{"to":{name:'purchased-courses'}}},[_vm._v("View more")])],1)])]),_vm._v(" "),_c('ul',{staticClass:"list-group list-group-fit mb-0",staticStyle:{"z-index":"initial"}},_vm._l((_vm.purchasedCourses),function(course){return _c('li',{staticClass:"list-group-item",staticStyle:{"z-index":"initial"}},[_c('div',{staticClass:"d-flex align-items-center"},[_c('router-link',{staticClass:"avatar avatar-4by3 avatar-sm mr-3",attrs:{"to":{name:'course',params:{'slug':course.slug}}}},[_c('img',{staticClass:"avatar-img rounded",attrs:{"src":course.course_image_preview,"width":"64","height":"40","alt":course.title}})]),_vm._v(" "),_c('div',{staticClass:"flex"},[_c('router-link',{staticClass:"text-body",attrs:{"to":{name:'course',params:{'slug':course.slug}}}},[_c('strong',[_vm._v(_vm._s(course.title))])]),_vm._v(" "),_c('div',{staticClass:"d-flex align-items-center"},[_c('div',{staticClass:"progress",staticStyle:{"width":"100px"}},[_c('div',{class:'progress-bar bg-'+_vm.getLessonsProgress(course).color,style:('width:'+_vm.getLessonsProgress(course).score+'%'),attrs:{"role":"progressbar","aria-valuenow":course.completed_lessons,"aria-valuemin":"0","aria-valuemax":course.total_lessons}})]),_vm._v(" "),_c('small',{staticClass:"text-muted ml-2"},[_vm._v(_vm._s(_vm.getLessonsProgress(course).score)+"%")])])],1),_vm._v(" "),_c('div',{staticClass:"dropdown ml-3"},[_vm._m(1,true),_vm._v(" "),_c('div',{staticClass:"dropdown-menu dropdown-menu-right"},[_c('router-link',{staticClass:"dropdown-item",attrs:{"to":{name:'course',params:{'slug':course.slug}}}},[_vm._v("Continue")])],1)])],1)])}),0)])]),_vm._v(" "),_c('div',{staticClass:"col-md-6"},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-header"},[_c('div',{staticClass:"media align-items-center"},[_vm._m(2),_vm._v(" "),_c('div',{staticClass:"media-right"},[_c('router-link',{staticClass:"btn btn-sm btn-primary",attrs:{"to":{name:'quizes'}}},[_vm._v("Quiz results")])],1)])]),_vm._v(" "),_c('ul',{staticClass:"list-group list-group-fit mb-0"},_vm._l((_vm.quizes),function(quiz){return _c('li',{staticClass:"list-group-item"},[_c('div',{staticClass:"media align-items-center"},[_c('div',{staticClass:"media-body"},[_c('router-link',{staticClass:"text-body",attrs:{"to":{name:'quiz',params:{id:quiz.id}}}},[_c('strong',[_vm._v(_vm._s(quiz.test.title))])]),_c('br'),_vm._v(" "),_c('div',{staticClass:"d-flex align-items-center"},[_c('small',{staticClass:"text-black-50 text-uppercase mr-2"},[_vm._v("Course")]),_vm._v(" "),_c('router-link',{attrs:{"to":{name:'course',params:{'slug':quiz.test.course.slug}}}},[_vm._v(_vm._s(quiz.test.course_title))])],1)],1),_vm._v(" "),_c('div',{staticClass:"media-right text-center d-flex align-items-center"},[_c('span',{staticClass:"text-black-50 mr-3"},[_vm._v(_vm._s(_vm.getScore(quiz).remark))]),_vm._v(" "),_c('h4',{class:((_vm.getScore(quiz).color) + " mb-0")},[_vm._v(_vm._s(_vm.getScore(quiz).percentage))])])])])}),0)])])]),_vm._v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-md-12"},[_c('div',{staticClass:"card-header mb-3",staticStyle:{"padding":".75rem 1.25rem"}},[_c('div',{staticClass:"media align-items-center"},[_vm._m(3),_vm._v(" "),_c('div',{staticClass:"media-right"},[_c('router-link',{staticClass:"btn btn-sm btn-primary",attrs:{"to":{ name:'all-courses'}}},[_vm._v("View more")])],1)])]),_vm._v(" "),_c('div',{staticClass:"row"},_vm._l((_vm.allCourses),function(course){return _c('courses-component',{key:course.id,attrs:{"course":course,"courseWidth":"col-md-3"}})}),1)])])],1)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"media-body"},[_c('h4',{staticClass:"card-title"},[_vm._v("My Courses")]),_vm._v(" "),_c('p',{staticClass:"card-subtitle"},[_vm._v("Your recent courses")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('a',{staticClass:"dropdown-toggle text-muted",attrs:{"href":"#","data-caret":"false","data-toggle":"dropdown"}},[_c('i',{staticClass:"material-icons"},[_vm._v("more_vert")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"media-body"},[_c('h4',{staticClass:"card-title"},[_vm._v("Quizzes")]),_vm._v(" "),_c('p',{staticClass:"card-subtitle"},[_vm._v("Your Performance")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"media-body"},[_c('h4',{staticClass:"card-title"},[_vm._v("Featured Courses")]),_vm._v(" "),_c('p',{staticClass:"card-subtitle"},[_vm._v("Learn a new course today")])])}]


/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_cacheDirectory_node_modules_vue_loader_lib_selector_type_script_index_0_PurchasedCourses_vue__ = __webpack_require__(73);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5347105b_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_PurchasedCourses_vue__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_cacheDirectory_node_modules_vue_loader_lib_selector_type_script_index_0_PurchasedCourses_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5347105b_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_PurchasedCourses_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5347105b_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_PurchasedCourses_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_cacheDirectory_node_modules_vue_loader_lib_selector_type_script_index_0_PurchasedCoursesComponent_vue__ = __webpack_require__(74);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_9ff20466_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_PurchasedCoursesComponent_vue__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_cacheDirectory_node_modules_vue_loader_lib_selector_type_script_index_0_PurchasedCoursesComponent_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_9ff20466_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_PurchasedCoursesComponent_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_9ff20466_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_PurchasedCoursesComponent_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"col-md-6"},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-header"},[_c('div',{staticClass:"media"},[_c('div',{staticClass:"media-left"},[_c('router-link',{attrs:{"to":{name:'course',params:{'slug':_vm.course.slug}}}},[_c('img',{staticClass:"rounded",staticStyle:{"width":"80px","max-height":"60px"},attrs:{"src":_vm.course.course_image_preview,"alt":_vm.course.title}})])],1),_vm._v(" "),_c('div',{staticClass:"media-body"},[_c('h4',{staticClass:"card-title m-0"},[_c('router-link',{attrs:{"to":{name:'course',params:{'slug':_vm.course.slug}}}},[_vm._v(_vm._s(_vm.course.title))])],1),_vm._v(" "),_c('small',{staticClass:"text-muted"},[_vm._v("Lessons: "+_vm._s(_vm.course.completed_lessons)+" of "+_vm._s(_vm.course.total_lessons))])])])]),_vm._v(" "),_c('progress-component',{attrs:{"course":_vm.course}}),_vm._v(" "),_c('div',{staticClass:"card-footer bg-white"},[_c('router-link',{staticClass:"btn btn-primary btn-sm",attrs:{"to":{name:'course',params:{'slug':_vm.course.slug}}}},[_vm._v("Continue "),_c('i',{staticClass:"material-icons btn__icon--right"},[_vm._v("play_circle_outline")])])],1)],1)])}
var staticRenderFns = []


/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('vue-headful',{attrs:{"title":_vm.pageTitle + ' | OpenAcademi',"description":"Your purchased courses"}}),_vm._v(" "),_c('breadcrumb-component',{attrs:{"breadcrumbs":_vm.breadcrumbs,"title":_vm.pageTitle}}),_vm._v(" "),_c('div',{staticClass:"row"},_vm._l((_vm.purchasedCourses),function(course){return _c('purchased-courses-component',{key:course.id,attrs:{"course":course}})}),1)],1)}
var staticRenderFns = []


/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_cacheDirectory_node_modules_vue_loader_lib_selector_type_script_index_0_TagCourses_vue__ = __webpack_require__(75);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_17758944_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_TagCourses_vue__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_cacheDirectory_node_modules_vue_loader_lib_selector_type_script_index_0_TagCourses_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_17758944_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_TagCourses_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_17758944_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_TagCourses_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('vue-headful',{attrs:{"title":_vm.tag + ' Courses | OpenAcademi',"description":_vm.pageTitle}}),_vm._v(" "),_c('breadcrumb-component',{attrs:{"breadcrumbs":_vm.breadcrumbs,"title":_vm.pageTitle}}),_vm._v(" "),_c('div',{staticClass:"row"},_vm._l((_vm.allCourses),function(course){return _c('courses-component',{key:course.id,attrs:{"course":course,"courseWidth":_vm.courseListWidth,"tags":course.tags}})}),1),_vm._v(" "),_c('paginate',{attrs:{"page-count":_vm.pageCount,"click-handler":_vm.getTagCourses,"prev-text":"Prev","next-text":"Next","container-class":"pagination justify-content-center pagination-sm","active-class":"page-item active","disabled-class":"page-item disabled","page-class":"page-item","next-class":"page-item","prev-class":"page-item","page-link-class":"page-link","next-link-class":"page-link","prev-link-class":"page-link"}})],1)}
var staticRenderFns = []


/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_cacheDirectory_node_modules_vue_loader_lib_selector_type_script_index_0_Quiz_vue__ = __webpack_require__(76);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_275d481d_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Quiz_vue__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
function injectStyle (context) {
  __webpack_require__(118)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_cacheDirectory_node_modules_vue_loader_lib_selector_type_script_index_0_Quiz_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_275d481d_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Quiz_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_275d481d_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Quiz_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(119);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(12).default
var update = add("1ff432a3", content, true, {});

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)();
exports.push([module.i, "[dir=ltr] .nav-pills .nav-link.active:hover,[dir=ltr] .nav-pills .show>.nav-link:hover{color:#fff;background-color:#2196f3}", ""]);

/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_cacheDirectory_node_modules_vue_loader_lib_selector_type_script_index_0_QuizQuestionsComponent_vue__ = __webpack_require__(77);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3752c06d_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_QuizQuestionsComponent_vue__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_cacheDirectory_node_modules_vue_loader_lib_selector_type_script_index_0_QuizQuestionsComponent_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3752c06d_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_QuizQuestionsComponent_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3752c06d_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_QuizQuestionsComponent_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"row"},[_c('div',{staticClass:"col-md-10 col-sm-9"},[_c('div',{staticClass:"card-group"},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body text-center"},[_c('h4',{staticClass:"text-primary mb-0"},[_c('strong',[_vm._v(_vm._s(_vm.totalQuestions))])]),_vm._v(" "),_c('small',{staticClass:"text-muted-light"},[_vm._v("TOTAL")])])]),_vm._v(" "),_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body text-center"},[_c('h4',{staticClass:"text-warning mb-0"},[_c('strong',[_vm._v(_vm._s(_vm.pendingQuestions))])]),_vm._v(" "),_c('small',{staticClass:"text-muted-light"},[_vm._v("PENDING")])])]),_vm._v(" "),_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body text-center"},[_c('vue-countdown-timer',{attrs:{"start-time":_vm.start_at,"end-time":_vm.end_at?_vm.end_at:_vm.started_at,"interval":1000,"start-label":'STARTS IN',"end-label":'TIME LEFT',"label-position":"end","end-text":'TIME UP!',"day-txt":'day',"hour-txt":'hrs',"minutes-txt":'min',"seconds-txt":'sec'},on:{"start_callback":function($event){return _vm.startCallBack('event started')},"end_callback":function($event){return _vm.endCallBack()}},scopedSlots:_vm._u([{key:"countdown",fn:function(scope){return [_c('div',[_c('p',{staticClass:"pl-1 pr-1"},[(scope.props.days>0)?_c('span',[_c('span',{staticClass:"h5 text-primary"},[_vm._v(_vm._s(scope.props.days))]),_vm._v(" "+_vm._s(scope.props.dayTxt)+" ")]):_vm._e(),_c('span',{staticClass:"h5 text-primary"},[_vm._v(_vm._s(scope.props.hours))]),_vm._v(" "+_vm._s(scope.props.hourTxt)+" "),_c('span',{staticClass:"h5 text-primary"},[_vm._v(_vm._s(scope.props.minutes))]),_vm._v(" "+_vm._s(scope.props.minutesTxt)+" "),_c('span',{staticClass:"h5 text-primary"},[_vm._v(_vm._s(scope.props.seconds))]),_vm._v(" "+_vm._s(scope.props.secondsTxt)+"\n                                ")])])]}},{key:"end-text",fn:function(scope){return [_c('strong',{staticClass:"text-danger"},[_vm._v(_vm._s(scope.props.endText))])]}},{key:"end-label",fn:function(scope){return [(scope.props.startLabel !== '' && scope.props.tips && scope.props.labelPosition === 'end')?_c('span',{staticClass:"text-muted"},[_vm._v(_vm._s(scope.props.startLabel)+":")]):_vm._e(),_vm._v(" "),(scope.props.endLabel !== '' && !scope.props.tips && scope.props.labelPosition === 'end')?_c('span',{staticClass:"text-muted"},[_vm._v(_vm._s(scope.props.endLabel)+":")]):_vm._e()]}}])})],1)])]),_vm._v(" "),_c('div',{staticClass:"tab-content",attrs:{"id":"v-pills-tabContent"}},_vm._l((_vm.questions),function(question,index){return _c('div',{class:{'tab-pane fade show active':index==0,'tab-pane fade':index!==0},attrs:{"id":("question_" + index),"role":"tabpanel","aria-labelledby":("question_" + index + "-tab")}},[_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"media align-items-center"},[_c('div',{staticClass:"media-left"},[_c('h4',{staticClass:"mb-0 mr-3"},[_c('strong',[_vm._v("#"+_vm._s(index + 1))])])]),_vm._v(" "),_c('div',{staticClass:"media-body"},[(question.question_image.length>0)?_c('div',{directives:[{name:"viewer",rawName:"v-viewer",value:({movable: false}),expression:"{movable: false}"}],staticClass:"text-center mb-4"},[_c('img',{staticClass:"img-thumbnail",staticStyle:{"cursor":"pointer","max-width":"60%"},attrs:{"src":question.question_image}})]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"card",domProps:{"innerHTML":_vm._s(question.question)}})])])]),_vm._v(" "),_c('div',{staticClass:"card"},[(question.type=='radio')?_c('div',{staticClass:"card-body"},_vm._l((question.options),function(option,index1){return _c('div',{staticClass:"form-group"},[_c('div',{staticClass:"custom-control custom-checkbox"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.questions[index].answer),expression:"questions[index].answer"}],staticClass:"custom-control-input",attrs:{"id":("answer-" + index + index1),"name":("answer-" + index),"type":"radio"},domProps:{"value":option.id,"checked":_vm._q(_vm.questions[index].answer,option.id)},on:{"change":function($event){return _vm.$set(_vm.questions[index], "answer", option.id)}}}),_vm._v(" "),_c('label',{staticClass:"custom-control-label",attrs:{"for":("answer-" + index + index1)}},[_vm._v(_vm._s(option.option_text)),(option.correct)?_c('i',{staticClass:"fa fa-check"}):_vm._e()])])])}),0):(question.type=='input')?_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"form-label",attrs:{"for":("answer-" + index)}},[_vm._v("Your Answer:")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.questions[index].answer),expression:"questions[index].answer"}],staticClass:"form-control",attrs:{"type":"text","name":("answer-" + index),"id":("answer-" + index),"placeholder":"Enter your answer"},domProps:{"value":(_vm.questions[index].answer)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.questions[index], "answer", $event.target.value)}}})])]):(question.type=='textarea')?_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"form-label",attrs:{"for":("answer-" + index)}},[_vm._v("Your Answer:")]),_vm._v(" "),_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.questions[index].answer),expression:"questions[index].answer"}],staticClass:"form-control",attrs:{"name":("answer-" + index),"id":("answer-" + index),"placeholder":"Enter your answer"},domProps:{"value":(_vm.questions[index].answer)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.questions[index], "answer", $event.target.value)}}})])]):(question.type=='richtext')?_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"form-label",attrs:{"for":("answer-" + index)}},[_vm._v("Your Answer:")]),_vm._v(" "),_c('ckeditor',{attrs:{"id":("answer-" + index),"editor":_vm.editor},model:{value:(_vm.questions[index].answer),callback:function ($$v) {_vm.$set(_vm.questions[index], "answer", $$v)},expression:"questions[index].answer"}})],1)]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"card-footer"},[_c('div',{staticClass:"nav d-block ",attrs:{"role":"tablist"}},[_c('button',{class:{'btn btn-white disabled':index===0,'btn btn-white':index>0},on:{"click":function($event){return _vm.showQuestion(index-1)}}},[_vm._v("Previous")]),_vm._v(" "),_c('button',{class:{'btn btn-primary float-right':index<_vm.questions.length-1,'btn btn-primary float-right disabled':index==_vm.questions.length-1},on:{"click":function($event){return _vm.showQuestion(index+1)}}},[_vm._v("Next")])])])])}),0)]),_vm._v(" "),_c('div',{staticClass:"col-md-2 col-sm-3"},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body text-center"},[_c('button',{staticClass:"btn btn-lg btn-success",on:{"click":_vm.completeQuiz}},[_vm._v("Submit")])])]),_vm._v(" "),_c('div',{staticClass:"card"},[_c('div',{staticClass:"nav flex-column nav-pills",attrs:{"id":"v-pills-tab","role":"tablist","aria-orientation":"vertical"}},_vm._l((_vm.questions),function(question,index){return _c('a',{class:{'nav-link active':index==0,'nav-link':index!==0},attrs:{"id":("question_" + index + "-tab"),"data-toggle":"pill","href":("#question_" + index),"role":"tab","aria-controls":("question_" + index),"aria-selected":index==0},on:{"click":_vm.submitQuiz}},[_c('span',{staticClass:"media align-items-center"},[_c('span',{staticClass:"media-left"},[_c('span',{staticClass:"btn btn-white btn-circle"},[_vm._v("#"+_vm._s(index + 1))])])])])}),0)])])])}
var staticRenderFns = []


/***/ }),
/* 122 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_cacheDirectory_node_modules_vue_loader_lib_selector_type_script_index_0_QuizReviewComponent_vue__ = __webpack_require__(78);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b41ff2f4_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_QuizReviewComponent_vue__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_cacheDirectory_node_modules_vue_loader_lib_selector_type_script_index_0_QuizReviewComponent_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b41ff2f4_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_QuizReviewComponent_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b41ff2f4_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_QuizReviewComponent_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 123 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"row"},[_c('div',{staticClass:"col-md-10 col-sm-9"},[_c('div',{staticClass:"card-group"},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body text-center"},[_c('h4',{staticClass:"text-primary mb-0"},[_c('strong',[_vm._v(_vm._s(_vm.totalQuestions))])]),_vm._v(" "),_c('small',{staticClass:"text-muted-light"},[_vm._v("TOTAL")])])]),_vm._v(" "),_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body text-center"},[_c('h4',{staticClass:"text-warning mb-0"},[_c('strong',[_vm._v(_vm._s(_vm.correctAnswers))])]),_vm._v(" "),_c('small',{staticClass:"text-muted-light"},[_vm._v("CORRECT")])])]),_vm._v(" "),_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body text-center"},[_c('h4',{class:((_vm.score.color) + " mb-0")},[_c('strong',[_vm._v(_vm._s(_vm.score.percentage))])]),_vm._v(" "),_c('small',{staticClass:"text-muted-light"},[_vm._v(_vm._s(_vm.score.remark))])])])]),_vm._v(" "),_c('div',{staticClass:"tab-content",attrs:{"id":"v-pills-tabContent"}},_vm._l((_vm.answers),function(answer,index){return _c('div',{class:{'tab-pane fade show active':index==0,'tab-pane fade':index!==0},attrs:{"id":("question_" + index),"role":"tabpanel","aria-labelledby":("question_" + index + "-tab")}},[_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"media align-items-center"},[_c('div',{staticClass:"media-left"},[_c('h4',{staticClass:"mb-0 mr-3"},[_c('strong',[_vm._v("#"+_vm._s(index + 1))])])]),_vm._v(" "),_c('div',{staticClass:"media-body"},[(answer.question.question_image.length>0)?_c('div',{directives:[{name:"viewer",rawName:"v-viewer",value:({movable: false}),expression:"{movable: false}"}],staticClass:"text-center mb-4"},[_c('img',{staticClass:"img-thumbnail",staticStyle:{"cursor":"pointer","max-width":"60%"},attrs:{"src":answer.question.question_image}})]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"card",domProps:{"innerHTML":_vm._s(answer.question.question)}})])])]),_vm._v(" "),(answer.answer_type=='radio')?_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body"},[_c('ul',{staticClass:"list-group"},_vm._l((answer.question.options),function(option,index1){return _c('li',{class:{'list-group-item':option.id!==answer.option_id,'list-group-item list-group-item-success':option.id==answer.option_id && answer.correct,'list-group-item list-group-item-danger':option.id==answer.option_id && !answer.correct}},[_vm._v("\n                                "+_vm._s(option.option_text)+"\n                            ")])}),0)])]):(answer.answer_type=='input')?_c('div',{staticClass:"card"},[_vm._m(0,true),_vm._v(" "),_c('div',{staticClass:"card-body"},[(answer.answer_text)?_c('p',[_vm._v(_vm._s(answer.answer_text))]):_c('div',{staticClass:"alert alert-light border-1 border-left-3 border-left-warning",attrs:{"role":"alert"}},[_c('div',{staticClass:"text-black-70"},[_vm._v("You didn't give any input.")])])]),_vm._v(" "),_vm._m(1,true),_vm._v(" "),_c('div',{staticClass:"card-body"},[(answer.answer_review)?_c('p',[_vm._v(_vm._s(answer.answer_review))]):_c('div',{staticClass:"alert alert-light border-1 border-left-3 border-left-warning",attrs:{"role":"alert"}},[_c('div',{staticClass:"text-black-70"},[_vm._v("Pending review by instructor.")])])])]):(answer.answer_type=='textarea')?_c('div',{staticClass:"card"},[_vm._m(2,true),_vm._v(" "),_c('div',{staticClass:"card-body"},[(answer.answer_text)?_c('p',[_vm._v(_vm._s(answer.answer_text))]):_c('div',{staticClass:"alert alert-light border-1 border-left-3 border-left-warning",attrs:{"role":"alert"}},[_c('div',{staticClass:"text-black-70"},[_vm._v("You didn't give any input.")])])]),_vm._v(" "),_vm._m(3,true),_vm._v(" "),_c('div',{staticClass:"card-body"},[(answer.answer_review)?_c('p',[_vm._v(_vm._s(answer.answer_review))]):_c('div',{staticClass:"alert alert-light border-1 border-left-3 border-left-warning",attrs:{"role":"alert"}},[_c('div',{staticClass:"text-black-70"},[_vm._v("Pending review by instructor.")])])])]):(answer.answer_type=='richtext')?_c('div',{staticClass:"card"},[_vm._m(4,true),_vm._v(" "),_c('div',{staticClass:"card-body"},[(answer.answer_text)?_c('div',{domProps:{"innerHTML":_vm._s(answer.answer_text)}}):_c('div',{staticClass:"alert alert-light border-1 border-left-3 border-left-warning",attrs:{"role":"alert"}},[_c('div',{staticClass:"text-black-70"},[_vm._v("You didn't give any input.")])])]),_vm._v(" "),_vm._m(5,true),_vm._v(" "),_c('div',{staticClass:"card-body"},[(answer.answer_review)?_c('p',[_vm._v(_vm._s(answer.answer_review))]):_c('div',{staticClass:"alert alert-light border-1 border-left-3 border-left-warning",attrs:{"role":"alert"}},[_c('div',{staticClass:"text-black-70"},[_vm._v("Pending review by instructor.")])])])]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"card-footer"},[_c('div',{staticClass:"nav d-block ",attrs:{"role":"tablist"}},[_c('button',{class:{'btn btn-white disabled':index===0,'btn btn-white':index>0},on:{"click":function($event){return _vm.showQuestion(index-1)}}},[_vm._v("Previous")]),_vm._v(" "),_c('button',{class:{'btn btn-primary float-right':index<_vm.totalQuestions-1,'btn btn-primary float-right disabled':index==_vm.totalQuestions-1},on:{"click":function($event){return _vm.showQuestion(index+1)}}},[_vm._v("Next")])])])])}),0)]),_vm._v(" "),_c('div',{staticClass:"col-md-2 col-sm-3"},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body text-center"},[_c('router-link',{staticClass:"btn btn-primary",attrs:{"to":{name:'quiz-instructions',params:{id:_vm.quiz.id,slug:_vm.quiz.lesson.slug}}}},[_vm._v("Retake "),_c('i',{staticClass:"material-icons btn__icon--right"},[_vm._v("replay")])])],1)]),_vm._v(" "),_c('div',{staticClass:"card"},[_c('div',{staticClass:"nav flex-column nav-pills",attrs:{"id":"v-pills-tab","role":"tablist","aria-orientation":"vertical"}},_vm._l((_vm.answers),function(answer,index){return _c('a',{class:{'nav-link active':index==0,'nav-link':index!==0},attrs:{"id":("question_" + index + "-tab"),"data-toggle":"pill","href":("#question_" + index),"role":"tab","aria-controls":("question_" + index),"aria-selected":index==0}},[_c('span',{staticClass:"media align-items-center"},[_c('span',{staticClass:"media-left"},[_c('span',{staticClass:"btn btn-white btn-circle"},[_vm._v("#"+_vm._s(index + 1))])])])])}),0)])])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-header"},[_c('h4',{staticClass:"card-title"},[_vm._v("Answer")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-header"},[_c('h4',{staticClass:"card-title"},[_vm._v("Review")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-header"},[_c('h4',{staticClass:"card-title"},[_vm._v("Answer")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-header"},[_c('h4',{staticClass:"card-title"},[_vm._v("review")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-header"},[_c('h4',{staticClass:"card-title"},[_vm._v("Answer")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-header"},[_c('h4',{staticClass:"card-title"},[_vm._v("review")])])}]


/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('vue-headful',{attrs:{"title":_vm.pageTitle + ' | OpenAcademi',"description":_vm.description}}),_vm._v(" "),_c('breadcrumb-component',{attrs:{"breadcrumbs":_vm.breadcrumbs,"title":_vm.pageTitle}}),_vm._v(" "),(_vm.status==='completed')?_c('quiz-review-component'):_c('quiz-questions-component',{on:{"completed":_vm.checkQuiz}})],1)}
var staticRenderFns = []


/***/ }),
/* 125 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_cacheDirectory_node_modules_vue_loader_lib_selector_type_script_index_0_Quizes_vue__ = __webpack_require__(79);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_99f21ee0_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Quizes_vue__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_cacheDirectory_node_modules_vue_loader_lib_selector_type_script_index_0_Quizes_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_99f21ee0_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Quizes_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_99f21ee0_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Quizes_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('vue-headful',{attrs:{"title":_vm.pageTitle + ' | OpenAcademi',"description":''}}),_vm._v(" "),_c('breadcrumb-component',{attrs:{"breadcrumbs":_vm.breadcrumbs,"title":_vm.pageTitle}}),_vm._v(" "),_c('div',{staticClass:"row"},_vm._l((_vm.results),function(quiz){return _c('div',{staticClass:"col-md-6"},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-header"},[_c('div',{staticClass:"media"},[_c('div',{staticClass:"media-body"},[_c('h4',{staticClass:"card-title m-0"},[_c('router-link',{attrs:{"to":{name:'quiz',params:{id:quiz.id}}}},[_vm._v(_vm._s(quiz.test.title))])],1),_vm._v(" "),_c('small',[_vm._v("\n                                "+_vm._s(quiz.test.about_quiz)+"\n                            ")]),_vm._v(" "),_c('ul',{staticClass:"list-inline"},[_c('li',{staticClass:"text-muted list-inline-item small"},[_vm._v("Course\n                                    "),_c('router-link',{attrs:{"to":{name:'course',params:{slug:quiz.test.course.slug}}}},[_vm._v(_vm._s(quiz.test.course_title))])],1),_vm._v(" "),_c('li',{staticClass:"text-muted list-inline-item small"},[_vm._v("Lesson\n                                    "),_c('router-link',{attrs:{"to":{name:'lesson',params:{slug:quiz.test.lesson.slug,'id':quiz.test.course_id}}}},[_vm._v(_vm._s(quiz.test.lesson_title))])],1)])]),_vm._v(" "),(quiz.status==='completed')?_c('div',{staticClass:"media-right text-center"},[_c('h2',{class:_vm.score(quiz).color},[_vm._v(_vm._s(_vm.score(quiz).percentage))]),_vm._v(" "),_c('small',{staticClass:"text-black-50"},[_vm._v(_vm._s(_vm.score(quiz).remark))])]):_c('div',{staticClass:"media-right text-center"},[_vm._m(0,true),_vm._v(" "),_c('small',{staticClass:"text-black-50"},[_vm._v("Pending")])])])]),_vm._v(" "),_c('div',{staticClass:"card-footer bg-white"},[_c('router-link',{staticClass:"btn btn-default btn-sm",attrs:{"to":{name:'quiz',params:{id:quiz.id}},"title":"Review Quiz Result"}},[_vm._v("View "),_c('i',{staticClass:"material-icons btn__icon--right"},[_vm._v("visibility")])]),_vm._v(" "),_c('button',{staticClass:"btn btn-sm btn-outline-danger",attrs:{"title":"Delete result"},on:{"click":function($event){return _vm.deleteResult(quiz.id)}}},[_c('i',{staticClass:"material-icons"},[_vm._v("delete_outline")])]),_vm._v(" "),_c('router-link',{staticClass:"btn btn-primary btn-sm float-right",attrs:{"to":{name:'quiz-instructions',params:{id:quiz.test.id,slug:quiz.test.lesson.slug}},"title":"Retake Quiz"}},[_vm._v("Retake "),_c('i',{staticClass:"material-icons btn__icon--right"},[_vm._v("replay")])])],1)])])}),0),_vm._v(" "),_c('paginate',{attrs:{"page-count":_vm.pageCount,"click-handler":_vm.getQuizResults,"prev-text":'Prev',"next-text":'Next',"container-class":"pagination justify-content-center pagination-sm","active-class":"page-item active","disabled-class":"page-item disabled","page-class":"page-item","next-class":"page-item","prev-class":"page-item","page-link-class":"page-link","next-link-class":"page-link","prev-link-class":"page-link"}})],1)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('h2',{staticClass:"text-primary"},[_c('i',{staticClass:"fa fa-circle-notch fa-spin"})])}]


/***/ }),
/* 127 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_cacheDirectory_node_modules_vue_loader_lib_selector_type_script_index_0_QuizInstructions_vue__ = __webpack_require__(80);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_060ff166_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_QuizInstructions_vue__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
function injectStyle (context) {
  __webpack_require__(128)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_cacheDirectory_node_modules_vue_loader_lib_selector_type_script_index_0_QuizInstructions_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_060ff166_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_QuizInstructions_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_060ff166_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_QuizInstructions_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(129);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(12).default
var update = add("eebf1726", content, true, {});

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)();
exports.push([module.i, "[dir=ltr] .nav-pills .nav-link.active:hover,[dir=ltr] .nav-pills .show>.nav-link:hover{color:#fff;background-color:#2196f3}", ""]);

/***/ }),
/* 130 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('vue-headful',{attrs:{"title":_vm.pageTitle + ' | OpenAcademi',"description":_vm.quiz.description}}),_vm._v(" "),_c('breadcrumb-component',{attrs:{"breadcrumbs":_vm.breadcrumbs,"title":_vm.pageTitle}}),_vm._v(" "),_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body",domProps:{"innerHTML":_vm._s(_vm.quiz.description)}})]),_vm._v(" "),_c('div',{staticClass:"card"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"card-body",domProps:{"innerHTML":_vm._s(_vm.instructions)}}),_vm._v(" "),_c('div',{staticClass:"card-footer text-center"},[_c('router-link',{staticClass:"btn btn-lg btn-success",attrs:{"to":{name:'quiz',params:{id:_vm.quizID}}}},[_vm._v("Take Quiz")])],1)])],1)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-header"},[_c('h4',{staticClass:"card-title mb-0"},[_vm._v("\n                Quiz Instructions\n            ")])])}]


/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_cacheDirectory_node_modules_vue_loader_lib_selector_type_script_index_0_QuizResult_vue__ = __webpack_require__(81);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_31cbaf21_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_QuizResult_vue__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
function injectStyle (context) {
  __webpack_require__(132)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_cacheDirectory_node_modules_vue_loader_lib_selector_type_script_index_0_QuizResult_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_31cbaf21_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_QuizResult_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_31cbaf21_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_QuizResult_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(133);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(12).default
var update = add("2f0b749d", content, true, {});

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)();
exports.push([module.i, "[dir=ltr] .nav-pills .nav-link.active:hover,[dir=ltr] .nav-pills .show>.nav-link:hover{color:#fff;background-color:#2196f3}", ""]);

/***/ }),
/* 134 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('vue-headful',{attrs:{"title":_vm.pageTitle + ' | OpenAcademi',"description":_vm.quiz.description}}),_vm._v(" "),_c('breadcrumb-component',{attrs:{"breadcrumbs":_vm.breadcrumbs,"title":_vm.pageTitle}}),_vm._v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-md-10 col-sm-9"},[_c('div',{staticClass:"card-group"},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body text-center"},[_c('h4',{staticClass:"text-primary mb-0"},[_c('strong',[_vm._v(_vm._s(_vm.totalQuestions))])]),_vm._v(" "),_c('small',{staticClass:"text-muted-light"},[_vm._v("TOTAL")])])]),_vm._v(" "),_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body text-center"},[_c('h4',{staticClass:"text-warning mb-0"},[_c('strong',[_vm._v(_vm._s(_vm.pendingQuestions))])]),_vm._v(" "),_c('small',{staticClass:"text-muted-light"},[_vm._v("PENDING")])])]),_vm._v(" "),_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body text-center"},[_c('vue-countdown-timer',{attrs:{"status":5,"start-time":_vm.start_at,"end-time":_vm.end_at?_vm.end_at:_vm.started_at,"interval":1000,"start-label":'STARTS IN',"end-label":'TIME LEFT',"label-position":"end","end-text":'TIME UP!',"day-txt":'day',"hour-txt":'hrs',"minutes-txt":'min',"seconds-txt":'sec'},on:{"start_callback":function($event){return _vm.startCallBack('event started')},"end_callback":function($event){return _vm.endCallBack()}},scopedSlots:_vm._u([{key:"countdown",fn:function(scope){return [_c('div',[_c('p',{staticClass:"pl-1 pr-1"},[(scope.props.days>0)?_c('span',[_c('span',{staticClass:"h5 text-primary"},[_vm._v(_vm._s(scope.props.days))]),_vm._v(" "+_vm._s(scope.props.dayTxt)+" ")]):_vm._e(),_c('span',{staticClass:"h5 text-primary"},[_vm._v(_vm._s(scope.props.hours))]),_vm._v(" "+_vm._s(scope.props.hourTxt)+" "),_c('span',{staticClass:"h5 text-primary"},[_vm._v(_vm._s(scope.props.minutes))]),_vm._v(" "+_vm._s(scope.props.minutesTxt)+" "),_c('span',{staticClass:"h5 text-primary"},[_vm._v(_vm._s(scope.props.seconds))]),_vm._v(" "+_vm._s(scope.props.secondsTxt)+"\n                                    ")])])]}},{key:"end-text",fn:function(scope){return [_c('strong',{staticClass:"text-danger"},[_vm._v(_vm._s(scope.props.endText))])]}},{key:"end-label",fn:function(scope){return [(scope.props.startLabel !== '' && scope.props.tips && scope.props.labelPosition === 'end')?_c('span',{staticClass:"text-muted"},[_vm._v(_vm._s(scope.props.startLabel)+":")]):_vm._e(),_vm._v(" "),(scope.props.endLabel !== '' && !scope.props.tips && scope.props.labelPosition === 'end')?_c('span',{staticClass:"text-muted"},[_vm._v(_vm._s(scope.props.endLabel)+":")]):_vm._e()]}}])})],1)])]),_vm._v(" "),_c('div',{staticClass:"tab-content",attrs:{"id":"v-pills-tabContent"}},_vm._l((_vm.questions),function(question,index){return _c('div',{class:{'tab-pane fade show active':index==0,'tab-pane fade':index!==0},attrs:{"id":("question_" + index),"role":"tabpanel","aria-labelledby":("question_" + index + "-tab")}},[_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"media align-items-center"},[_c('div',{staticClass:"media-left"},[_c('h4',{staticClass:"mb-0 mr-3"},[_c('strong',[_vm._v("#"+_vm._s(index + 1))])])]),_vm._v(" "),_c('div',{staticClass:"media-body"},[(question.question_image.length>0)?_c('div',{directives:[{name:"viewer",rawName:"v-viewer",value:({movable: false}),expression:"{movable: false}"}],staticClass:"text-center mb-4"},[_c('img',{staticClass:"img-thumbnail",staticStyle:{"cursor":"pointer","max-width":"60%"},attrs:{"src":question.question_image}})]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"card",domProps:{"innerHTML":_vm._s(question.question)}})])])]),_vm._v(" "),_c('div',{staticClass:"card"},[(question.type=='radio')?_c('div',{staticClass:"card-body"},_vm._l((question.options),function(option,index1){return _c('div',{staticClass:"form-group"},[_c('div',{staticClass:"custom-control custom-checkbox"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.questions[index].answer),expression:"questions[index].answer"}],staticClass:"custom-control-input",attrs:{"id":("answer-" + index + index1),"name":("answer-" + index),"type":"radio"},domProps:{"value":option.id,"checked":_vm._q(_vm.questions[index].answer,option.id)},on:{"change":function($event){return _vm.$set(_vm.questions[index], "answer", option.id)}}}),_vm._v(" "),_c('label',{staticClass:"custom-control-label",attrs:{"for":("answer-" + index + index1)}},[_vm._v(_vm._s(option.option_text)),(option.correct)?_c('i',{staticClass:"fa fa-check"}):_vm._e()])])])}),0):(question.type=='input')?_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"form-label",attrs:{"for":("answer-" + index)}},[_vm._v("Your Answer:")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.questions[index].answer),expression:"questions[index].answer"}],staticClass:"form-control",attrs:{"type":"text","name":("answer-" + index),"id":("answer-" + index),"placeholder":"Enter your answer"},domProps:{"value":(_vm.questions[index].answer)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.questions[index], "answer", $event.target.value)}}})])]):(question.type=='textarea')?_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"form-label",attrs:{"for":("answer-" + index)}},[_vm._v("Your Answer:")]),_vm._v(" "),_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.questions[index].answer),expression:"questions[index].answer"}],staticClass:"form-control",attrs:{"name":("answer-" + index),"id":("answer-" + index),"placeholder":"Enter your answer"},domProps:{"value":(_vm.questions[index].answer)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.questions[index], "answer", $event.target.value)}}})])]):(question.type=='richtext')?_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"form-label",attrs:{"for":("answer-" + index)}},[_vm._v("Your Answer:")]),_vm._v(" "),_c('ckeditor',{attrs:{"id":("answer-" + index),"editor":_vm.editor},model:{value:(_vm.questions[index].answer),callback:function ($$v) {_vm.$set(_vm.questions[index], "answer", $$v)},expression:"questions[index].answer"}})],1)]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"card-footer"},[_c('div',{staticClass:"nav d-block ",attrs:{"role":"tablist"}},[_c('button',{class:{'btn btn-white disabled':index===0,'btn btn-white':index>0},on:{"click":function($event){return _vm.showQuestion(index-1)}}},[_vm._v("Previous")]),_vm._v(" "),_c('button',{class:{'btn btn-primary float-right':index<_vm.questions.length-1,'btn btn-primary float-right disabled':index==_vm.questions.length-1},on:{"click":function($event){return _vm.showQuestion(index+1)}}},[_vm._v("Next")])])])])}),0)]),_vm._v(" "),_c('div',{staticClass:"col-md-2 col-sm-3"},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body text-center"},[_c('button',{staticClass:"btn btn-lg btn-success",on:{"click":_vm.completeQuiz}},[_vm._v("Submit")])])]),_vm._v(" "),_c('div',{staticClass:"card"},[_c('div',{staticClass:"nav flex-column nav-pills",attrs:{"id":"v-pills-tab","role":"tablist","aria-orientation":"vertical"}},_vm._l((_vm.questions),function(question,index){return _c('a',{class:{'nav-link active':index==0,'nav-link':index!==0},attrs:{"id":("question_" + index + "-tab"),"data-toggle":"pill","href":("#question_" + index),"role":"tab","aria-controls":("question_" + index),"aria-selected":index==0},on:{"click":_vm.submitQuiz}},[_c('span',{staticClass:"media align-items-center"},[_c('span',{staticClass:"media-left"},[_c('span',{staticClass:"btn btn-white btn-circle"},[_vm._v("#"+_vm._s(index + 1))])])])])}),0)])])])],1)}
var staticRenderFns = []


/***/ }),
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuejs_paginate__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuejs_paginate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vuejs_paginate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_axios__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  data() {
    return {
      pageCount: 1,
      courses: []
    };
  },

  components: {
    'paginate': __WEBPACK_IMPORTED_MODULE_0_vuejs_paginate___default.a
  },
  computed: {},

  created() {
    this.getAllCourses();
  },

  methods: {
    color(colors) {
      return this.colors[Math.floor(Math.random() * colors.length)];
    },

    getAllCourses(page = 1) {
      __WEBPACK_IMPORTED_MODULE_1_axios___default.a.get(`/api/home/courses/${this.category}?count=8&page=${page}`).then(({
        data
      }) => {
        this.courses = data.data;
        this.pageCount = data.last_page;
      });
    }

  },
  props: {
    colors: Array,
    category: String
  }
});

/***/ }),
/* 158 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuejs_paginate__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuejs_paginate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vuejs_paginate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_axios__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  data() {
    return {
      category: 0,
      categories: [],
      courses: [],
      pageCount: 1,
      searchText: null,
      totalCourses: 0
    };
  },

  components: {
    'paginate': __WEBPACK_IMPORTED_MODULE_0_vuejs_paginate___default.a
  },
  computed: {},

  created() {
    this.getCategories();
    this.searchCourses();
  },

  methods: {
    color(colors) {
      return this.colors[Math.floor(Math.random() * colors.length)];
    },

    getCategories() {
      let count = 0;
      let query = this.searchText ? this.searchText : this.searching;
      __WEBPACK_IMPORTED_MODULE_1_axios___default.a.get(`/api/home/courses/search/categories?q=${query}`).then(({
        data
      }) => {
        this.categories = data;
      });
    },

    searchCourses(page = 1) {
      let query = this.searchText ? this.searchText : this.searching;
      let courses = [];
      __WEBPACK_IMPORTED_MODULE_1_axios___default.a.get(`/api/home/courses/search?q=${query}&count=8&page=${page}&category=${this.category}`).then(({
        data
      }) => {
        courses = data.courses.data;
        this.courses = data.courses.data;
        this.pageCount = data.courses.last_page;
        this.searchText = data.search;
        this.totalCourses = data.courses.total;
      });
    },

    setCategory(id) {
      this.category = id;
      this.searchCourses();
    }

  },
  props: {
    colors: Array,
    searching: String
  }
});

/***/ }),
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(237);
__webpack_require__(242);
module.exports = __webpack_require__(243);


/***/ }),
/* 237 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_star_rating__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_star_rating___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_star_rating__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Courses_vue__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_SearchCourses_vue__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__student_routes__ = __webpack_require__(95);





__WEBPACK_IMPORTED_MODULE_0_vue___default.a.component('star-rating', __WEBPACK_IMPORTED_MODULE_1_vue_star_rating___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.component('courses', __WEBPACK_IMPORTED_MODULE_2__components_Courses_vue__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.component('search-courses', __WEBPACK_IMPORTED_MODULE_3__components_SearchCourses_vue__["a" /* default */]);
let app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
  el: '#app'
});

/***/ }),
/* 238 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_cacheDirectory_node_modules_vue_loader_lib_selector_type_script_index_0_Courses_vue__ = __webpack_require__(157);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_54ac5476_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Courses_vue__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_cacheDirectory_node_modules_vue_loader_lib_selector_type_script_index_0_Courses_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_54ac5476_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Courses_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_54ac5476_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Courses_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 239 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"content-wrap  courses-grid-v1-page"},[_c('div',{staticClass:"container-fluid"},[_c('div',{staticClass:"content-page-wrap"},[_c('div',{staticClass:"flat-courses clearfix isotope-courses row"},_vm._l((_vm.courses),function(course){return _c('div',{class:'course col-lg-3 col-md-4 col-sm-6 text-'+_vm.color(_vm.colors)},[_c('div',{staticClass:"course-border border-f-e6f3ff border-ra4 transition-vline"},[_c('div',{staticClass:"course-img img-vline"},[_c('a',{attrs:{"href":("/course/" + (course.slug))}},[_c('img',{attrs:{"src":course.course_image_preview,"alt":"openacademi"}})]),_vm._v(" "),_vm._m(0,true)]),_vm._v(" "),_c('div',{staticClass:"course-content"},[_c('div',{staticClass:"text-wrap border-bt-e6f3ff"},[_c('h6',{staticClass:"title"},[_c('a',{attrs:{"href":("/course/" + (course.slug))}},[_vm._v(_vm._s(course.title))])]),_vm._v(" "),_c('p',{staticClass:"teacher"},[_c('a',{attrs:{"href":"#"}},[_vm._v(_vm._s(course.instructor.full_name))])]),_vm._v(" "),_c('p',{staticClass:"description"},[_vm._v(_vm._s(course.summary))])]),_vm._v(" "),_c('div',{staticClass:"wrap-rating-price"},[_c('div',{staticClass:"wrap-rating"},[_c('star-rating',{attrs:{"rating":Number(course.rating.split(';')[0]),"increment":0.01,"read-only":true,"star-size":13,"show-rating":false}}),_vm._v(" "),_c('span',[_vm._v(_vm._s(Number(course.rating.split(';')[0]))+"\n                                            ("+_vm._s(Number(course.rating.split(';')[1]))+")")])],1),_vm._v(" "),_c('span',{staticClass:"price"},[_vm._v("₦"+_vm._s(course.price.toLocaleString('en', {maximumSignificantDigits: 2})))])])])])])}),0)])]),_vm._v(" "),_c('div',{staticClass:"flat-paginations style2"},[_c('paginate',{attrs:{"page-count":_vm.pageCount,"click-handler":_vm.getAllCourses,"prev-text":'Prev',"next-text":'Next',"container-class":"list flat-text-center pagination-wrap","active-class":" active","disabled-class":"disabled"}})],1)])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"overlay"},[_c('span',{staticClass:"vline"}),_vm._v(" "),_c('span',{staticClass:"vline vline-bottom"})])}]


/***/ }),
/* 240 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_cacheDirectory_node_modules_vue_loader_lib_selector_type_script_index_0_SearchCourses_vue__ = __webpack_require__(158);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3abe1350_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_SearchCourses_vue__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_cacheDirectory_node_modules_vue_loader_lib_selector_type_script_index_0_SearchCourses_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3abe1350_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_SearchCourses_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3abe1350_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_SearchCourses_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 241 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"content-wrap  courses-grid-v3-page"},[_c('section',{staticClass:"flat-title-page parallax parallax8 style4"},[_c('div',{staticClass:"overlay style2"}),_vm._v(" "),_c('div',{staticClass:"container wrap-title-page bg-img "},[_c('div',{staticClass:"title-page"},[_c('h3',{staticClass:"title font-weight-700"},[_vm._v(_vm._s(_vm.searchText))])])])]),_vm._v(" "),_c('div',{staticClass:"content-page-fullwidth-wrap clearfix pd-top-45"},[_c('div',{staticClass:"container-fluid "},[_c('div',{staticClass:"sidebar-left"},[_c('div',{staticClass:"widget-categories border-f-e6f3ff"},[_c('h6',{staticClass:"title-widget"},[_vm._v("Categories")]),_vm._v(" "),_c('div',{staticClass:"content"},[_c('ul',_vm._l((_vm.categories),function(category){return _c('li',[_c('a',{attrs:{"href":"javascript:void(0)"},on:{"click":function($event){return _vm.setCategory(category.id)}}},[_vm._v(_vm._s(category.title)+" "),_c('span',[_vm._v("("+_vm._s(category.count)+")")])])])}),0)])])]),_vm._v(" "),_c('div',{staticClass:"content-page"},[_c('div',{staticClass:"heading clearfix border-f-e6f3ff border-ra4"},[_c('div',{staticClass:"taskbar"},[_c('ul',{staticClass:"list"},[_c('li',[_c('span',{staticClass:"color-f3728b font-Poppins font-weight-700"},[_vm._v(" "+_vm._s(_vm.totalCourses))]),_vm._v(" Courses")])])]),_vm._v(" "),_vm._m(0)]),_vm._v(" "),_c('div',{staticClass:"flat-courses style4"},_vm._l((_vm.courses),function(course){return _c('div',{class:'course style4 text-'+_vm.color(_vm.colors)},[_c('div',{staticClass:"course-border border-f-e6f3ff border-ra4 clear-sub-columns transition-vline"},[_c('div',{staticClass:"course-img-box"},[_c('div',{staticClass:"course-img img-vline"},[_c('a',{attrs:{"href":"#"}},[_c('img',{staticStyle:{"max-height":"213px"},attrs:{"src":course.course_image_preview,"alt":"openacademi"}})]),_vm._v(" "),_vm._m(1,true)])]),_vm._v(" "),_c('div',{staticClass:"course-content"},[_c('div',{staticClass:"text-wrap border-bt-e6f3ff"},[_c('h6',{staticClass:"title"},[_c('a',{attrs:{"href":"#"}},[_vm._v(_vm._s(course.title))])]),_vm._v(" "),_c('p',{staticClass:"teacher"},[_c('a',{attrs:{"href":"#"}},[_vm._v(_vm._s(course.instructor.full_name))])]),_vm._v(" "),_c('p',{staticClass:"description"},[_vm._v(_vm._s(course.summary))])]),_vm._v(" "),_c('div',{staticClass:"wrap-rating-price"},[_c('ul',{staticClass:"list meta-rate"},[_c('li',[_c('star-rating',{attrs:{"rating":Number(course.rating.split(';')[0]),"increment":0.01,"read-only":true,"star-size":13,"show-rating":false}}),_vm._v(" "),_c('span',[_vm._v(_vm._s(Number(course.rating.split(';')[0]))+"\n                                            ("+_vm._s(Number(course.rating.split(';')[1]))+")")])],1),_vm._v(" "),_c('li',[_c('span',[_vm._v(" "+_vm._s(course.course_cat))])]),_vm._v(" "),_c('li',[_c('span',[_vm._v(" Updated "+_vm._s(course.last_updated))])])]),_vm._v(" "),_c('span',{staticClass:"price"},[_vm._v("₦"+_vm._s(course.price.toLocaleString('en', {maximumSignificantDigits: 2})))])])])])])}),0),_vm._v(" "),_c('div',{staticClass:"flat-paginations style2"},[_c('paginate',{attrs:{"page-count":_vm.pageCount,"click-handler":_vm.searchCourses,"prev-text":'Prev',"next-text":'Next',"container-class":"list flat-text-center pagination-wrap","active-class":" active","disabled-class":"disabled"}})],1)])])])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"select-order flat-text-right"},[_c('div',{staticClass:"wrap-select"},[_c('select',{staticClass:"order-by"},[_c('option',[_vm._v("Sort By: release date")])])])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"overlay"},[_c('span',{staticClass:"vline"}),_vm._v(" "),_c('span',{staticClass:"vline vline-bottom"})])}]


/***/ }),
/* 242 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 243 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);