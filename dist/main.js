/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/node-fetch/browser.js":
/*!********************************************!*\
  !*** ./node_modules/node-fetch/browser.js ***!
  \********************************************/
/***/ ((module, exports) => {

"use strict";
eval(" // ref: https://github.com/tc39/proposal-global\n\nvar getGlobal = function () {\n  // the only reliable means to get the global object is\n  // `Function('return this')()`\n  // However, this causes CSP violations in Chrome apps.\n  if (typeof self !== 'undefined') {\n    return self;\n  }\n\n  if (typeof window !== 'undefined') {\n    return window;\n  }\n\n  if (typeof global !== 'undefined') {\n    return global;\n  }\n\n  throw new Error('unable to locate global object');\n};\n\nvar global = getGlobal();\nmodule.exports = exports = global.fetch; // Needed for TypeScript and Webpack.\n\nif (global.fetch) {\n  exports[\"default\"] = global.fetch.bind(global);\n}\n\nexports.Headers = global.Headers;\nexports.Request = global.Request;\nexports.Response = global.Response;\n\n//# sourceURL=webpack://my-webpack-project/./node_modules/node-fetch/browser.js?");

/***/ }),

/***/ "./src/index/index.js":
/*!****************************!*\
  !*** ./src/index/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n/* import 'bootstrap';\nimport 'bootstrap/dist/css/bootstrap.min.css'; */\nvar fetch = __webpack_require__(/*! node-fetch */ \"./node_modules/node-fetch/browser.js\"); //traer los elementos necesarios para la autentucación\n\n\nvar username = document.getElementById('username');\nvar pass = document.getElementById('password');\nvar signButton = document.getElementById('submit');\n\nfunction loginFetch() {\n  return _loginFetch.apply(this, arguments);\n}\n\nfunction _loginFetch() {\n  _loginFetch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n    var response, data;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.prev = 0;\n            _context.next = 3;\n            return fetch('https://dwec-tres-en-raya.herokuapp.com/login', {\n              method: 'POST',\n              headers: {\n                'Content-Type': 'application/json'\n              },\n              body: JSON.stringify({\n                'username': username,\n                'password': pass\n              })\n            });\n\n          case 3:\n            response = _context.sent;\n\n            if (!(response.status === 404)) {\n              _context.next = 6;\n              break;\n            }\n\n            return _context.abrupt(\"return\", Promise.reject(\"no encontrado\"));\n\n          case 6:\n            if (!(response.status !== 200)) {\n              _context.next = 8;\n              break;\n            }\n\n            return _context.abrupt(\"return\", Promise.reject(\"Error: \".concat(response.status)));\n\n          case 8:\n            _context.next = 10;\n            return response.json();\n\n          case 10:\n            data = _context.sent;\n            return _context.abrupt(\"return\", data);\n\n          case 14:\n            _context.prev = 14;\n            _context.t0 = _context[\"catch\"](0);\n            return _context.abrupt(\"return\", Promise.reject(_context.t0.message));\n\n          case 17:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[0, 14]]);\n  }));\n  return _loginFetch.apply(this, arguments);\n}\n\nfunction getUserFetch(_x, _x2) {\n  return _getUserFetch.apply(this, arguments);\n}\n\nfunction _getUserFetch() {\n  _getUserFetch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(token, playerId) {\n    var response, data;\n    return regeneratorRuntime.wrap(function _callee2$(_context2) {\n      while (1) {\n        switch (_context2.prev = _context2.next) {\n          case 0:\n            _context2.prev = 0;\n            _context2.next = 3;\n            return fetch(\"https://dwec-tres-en-raya.herokuapp.com/player/\".concat(playerId), {\n              method: 'GET',\n              headers: {\n                \"authorization\": \"Bearer \".concat(token)\n              }\n            });\n\n          case 3:\n            response = _context2.sent;\n\n            if (!(response.status === 404)) {\n              _context2.next = 6;\n              break;\n            }\n\n            return _context2.abrupt(\"return\", Promise.reject(\"no encontrado\"));\n\n          case 6:\n            if (!(response.status !== 200)) {\n              _context2.next = 8;\n              break;\n            }\n\n            return _context2.abrupt(\"return\", Promise.reject(\"Error: \".concat(response.status)));\n\n          case 8:\n            _context2.next = 10;\n            return response.json();\n\n          case 10:\n            data = _context2.sent;\n            return _context2.abrupt(\"return\", data);\n\n          case 14:\n            _context2.prev = 14;\n            _context2.t0 = _context2[\"catch\"](0);\n            return _context2.abrupt(\"return\", Promise.reject(_context2.t0.message));\n\n          case 17:\n          case \"end\":\n            return _context2.stop();\n        }\n      }\n    }, _callee2, null, [[0, 14]]);\n  }));\n  return _getUserFetch.apply(this, arguments);\n}\n\nfunction signIn() {\n  return _signIn.apply(this, arguments);\n}\n\nfunction _signIn() {\n  _signIn = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {\n    var loginResult, user;\n    return regeneratorRuntime.wrap(function _callee3$(_context3) {\n      while (1) {\n        switch (_context3.prev = _context3.next) {\n          case 0:\n            _context3.prev = 0;\n            _context3.next = 3;\n            return loginFetch();\n\n          case 3:\n            loginResult = _context3.sent;\n            console.log(loginResult);\n            user = getUserFetch(loginResult.access_token, loginResult.player_id);\n            console.log(user);\n            _context3.next = 12;\n            break;\n\n          case 9:\n            _context3.prev = 9;\n            _context3.t0 = _context3[\"catch\"](0);\n            console.log(_context3.t0);\n\n          case 12:\n          case \"end\":\n            return _context3.stop();\n        }\n      }\n    }, _callee3, null, [[0, 9]]);\n  }));\n  return _signIn.apply(this, arguments);\n}\n\nsignButton.addEventListener('click', signIn);\nsignIn();\n\n//# sourceURL=webpack://my-webpack-project/./src/index/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index/index.js");
/******/ 	
/******/ })()
;