/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "(pages-dir-node)/./components/theme-provider.js":
/*!**************************************!*\
  !*** ./components/theme-provider.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ThemeProvider: () => (/* binding */ ThemeProvider),\n/* harmony export */   useTheme: () => (/* binding */ useTheme)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* __next_internal_client_entry_do_not_use__ ThemeProvider,useTheme auto */ \n\nconst initialState = {\n    theme: \"system\",\n    setTheme: ()=>null\n};\nconst ThemeProviderContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(initialState);\nfunction ThemeProvider({ children, defaultTheme = \"system\", storageKey = \"theme\", ...props }) {\n    const [theme, setTheme] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(defaultTheme);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"ThemeProvider.useEffect\": ()=>{\n            const root = window.document.documentElement;\n            root.classList.remove(\"light\", \"dark\");\n            if (theme === \"system\") {\n                const systemTheme = window.matchMedia(\"(prefers-color-scheme: dark)\").matches ? \"dark\" : \"light\";\n                root.classList.add(systemTheme);\n                return;\n            }\n            root.classList.add(theme);\n        }\n    }[\"ThemeProvider.useEffect\"], [\n        theme\n    ]);\n    const value = {\n        theme,\n        setTheme: (theme)=>{\n            setTheme(theme);\n            window.localStorage.setItem(storageKey, theme);\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ThemeProviderContext.Provider, {\n        ...props,\n        value: value,\n        children: children\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\JBrea\\\\pro-cycling-analysis\\\\apps\\\\web\\\\components\\\\theme-provider.js\",\n        lineNumber: 37,\n        columnNumber: 5\n    }, this);\n}\nconst useTheme = ()=>{\n    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(ThemeProviderContext);\n    if (context === undefined) throw new Error(\"useTheme must be used within a ThemeProvider\");\n    return context;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2NvbXBvbmVudHMvdGhlbWUtcHJvdmlkZXIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVzRTtBQUV0RSxNQUFNSSxlQUFlO0lBQ25CQyxPQUFPO0lBQ1BDLFVBQVUsSUFBTTtBQUNsQjtBQUVBLE1BQU1DLHFDQUF1QlAsb0RBQWFBLENBQUNJO0FBRXBDLFNBQVNJLGNBQWMsRUFBRUMsUUFBUSxFQUFFQyxlQUFlLFFBQVEsRUFBRUMsYUFBYSxPQUFPLEVBQUUsR0FBR0MsT0FBTztJQUNqRyxNQUFNLENBQUNQLE9BQU9DLFNBQVMsR0FBR0gsK0NBQVFBLENBQUNPO0lBRW5DUixnREFBU0E7bUNBQUM7WUFDUixNQUFNVyxPQUFPQyxPQUFPQyxRQUFRLENBQUNDLGVBQWU7WUFDNUNILEtBQUtJLFNBQVMsQ0FBQ0MsTUFBTSxDQUFDLFNBQVM7WUFFL0IsSUFBSWIsVUFBVSxVQUFVO2dCQUN0QixNQUFNYyxjQUFjTCxPQUFPTSxVQUFVLENBQUMsZ0NBQWdDQyxPQUFPLEdBQUcsU0FBUztnQkFDekZSLEtBQUtJLFNBQVMsQ0FBQ0ssR0FBRyxDQUFDSDtnQkFDbkI7WUFDRjtZQUVBTixLQUFLSSxTQUFTLENBQUNLLEdBQUcsQ0FBQ2pCO1FBQ3JCO2tDQUFHO1FBQUNBO0tBQU07SUFFVixNQUFNa0IsUUFBUTtRQUNabEI7UUFDQUMsVUFBVSxDQUFDRDtZQUNUQyxTQUFTRDtZQUNUUyxPQUFPVSxZQUFZLENBQUNDLE9BQU8sQ0FBQ2QsWUFBWU47UUFDMUM7SUFDRjtJQUVBLHFCQUNFLDhEQUFDRSxxQkFBcUJtQixRQUFRO1FBQUUsR0FBR2QsS0FBSztRQUFFVyxPQUFPQTtrQkFDOUNkOzs7Ozs7QUFHUDtBQUVPLE1BQU1rQixXQUFXO0lBQ3RCLE1BQU1DLFVBQVUzQixpREFBVUEsQ0FBQ007SUFFM0IsSUFBSXFCLFlBQVlDLFdBQVcsTUFBTSxJQUFJQyxNQUFNO0lBRTNDLE9BQU9GO0FBQ1QsRUFBQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxKQnJlYVxccHJvLWN5Y2xpbmctYW5hbHlzaXNcXGFwcHNcXHdlYlxcY29tcG9uZW50c1xcdGhlbWUtcHJvdmlkZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCJcclxuXHJcbmltcG9ydCB7IGNyZWF0ZUNvbnRleHQsIHVzZUNvbnRleHQsIHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIlxyXG5cclxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xyXG4gIHRoZW1lOiBcInN5c3RlbVwiLFxyXG4gIHNldFRoZW1lOiAoKSA9PiBudWxsLFxyXG59XHJcblxyXG5jb25zdCBUaGVtZVByb3ZpZGVyQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQoaW5pdGlhbFN0YXRlKVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFRoZW1lUHJvdmlkZXIoeyBjaGlsZHJlbiwgZGVmYXVsdFRoZW1lID0gXCJzeXN0ZW1cIiwgc3RvcmFnZUtleSA9IFwidGhlbWVcIiwgLi4ucHJvcHMgfSkge1xyXG4gIGNvbnN0IFt0aGVtZSwgc2V0VGhlbWVdID0gdXNlU3RhdGUoZGVmYXVsdFRoZW1lKVxyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3Qgcm9vdCA9IHdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnRcclxuICAgIHJvb3QuY2xhc3NMaXN0LnJlbW92ZShcImxpZ2h0XCIsIFwiZGFya1wiKVxyXG5cclxuICAgIGlmICh0aGVtZSA9PT0gXCJzeXN0ZW1cIikge1xyXG4gICAgICBjb25zdCBzeXN0ZW1UaGVtZSA9IHdpbmRvdy5tYXRjaE1lZGlhKFwiKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKVwiKS5tYXRjaGVzID8gXCJkYXJrXCIgOiBcImxpZ2h0XCJcclxuICAgICAgcm9vdC5jbGFzc0xpc3QuYWRkKHN5c3RlbVRoZW1lKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICByb290LmNsYXNzTGlzdC5hZGQodGhlbWUpXHJcbiAgfSwgW3RoZW1lXSlcclxuXHJcbiAgY29uc3QgdmFsdWUgPSB7XHJcbiAgICB0aGVtZSxcclxuICAgIHNldFRoZW1lOiAodGhlbWUpID0+IHtcclxuICAgICAgc2V0VGhlbWUodGhlbWUpXHJcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShzdG9yYWdlS2V5LCB0aGVtZSlcclxuICAgIH0sXHJcbiAgfVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPFRoZW1lUHJvdmlkZXJDb250ZXh0LlByb3ZpZGVyIHsuLi5wcm9wc30gdmFsdWU9e3ZhbHVlfT5cclxuICAgICAge2NoaWxkcmVufVxyXG4gICAgPC9UaGVtZVByb3ZpZGVyQ29udGV4dC5Qcm92aWRlcj5cclxuICApXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB1c2VUaGVtZSA9ICgpID0+IHtcclxuICBjb25zdCBjb250ZXh0ID0gdXNlQ29udGV4dChUaGVtZVByb3ZpZGVyQ29udGV4dClcclxuXHJcbiAgaWYgKGNvbnRleHQgPT09IHVuZGVmaW5lZCkgdGhyb3cgbmV3IEVycm9yKFwidXNlVGhlbWUgbXVzdCBiZSB1c2VkIHdpdGhpbiBhIFRoZW1lUHJvdmlkZXJcIilcclxuXHJcbiAgcmV0dXJuIGNvbnRleHRcclxufVxyXG4iXSwibmFtZXMiOlsiY3JlYXRlQ29udGV4dCIsInVzZUNvbnRleHQiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsImluaXRpYWxTdGF0ZSIsInRoZW1lIiwic2V0VGhlbWUiLCJUaGVtZVByb3ZpZGVyQ29udGV4dCIsIlRoZW1lUHJvdmlkZXIiLCJjaGlsZHJlbiIsImRlZmF1bHRUaGVtZSIsInN0b3JhZ2VLZXkiLCJwcm9wcyIsInJvb3QiLCJ3aW5kb3ciLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsImNsYXNzTGlzdCIsInJlbW92ZSIsInN5c3RlbVRoZW1lIiwibWF0Y2hNZWRpYSIsIm1hdGNoZXMiLCJhZGQiLCJ2YWx1ZSIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJQcm92aWRlciIsInVzZVRoZW1lIiwiY29udGV4dCIsInVuZGVmaW5lZCIsIkVycm9yIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/./components/theme-provider.js\n");

/***/ }),

/***/ "(pages-dir-node)/./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"(pages-dir-node)/./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_theme_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/theme-provider */ \"(pages-dir-node)/./components/theme-provider.js\");\n\n\n\nfunction MyApp({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_theme_provider__WEBPACK_IMPORTED_MODULE_2__.ThemeProvider, {\n        attribute: \"class\",\n        defaultTheme: \"system\",\n        enableSystem: true,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\JBrea\\\\pro-cycling-analysis\\\\apps\\\\web\\\\pages\\\\_app.js\",\n            lineNumber: 7,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\JBrea\\\\pro-cycling-analysis\\\\apps\\\\web\\\\pages\\\\_app.js\",\n        lineNumber: 6,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3BhZ2VzL19hcHAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUE4QjtBQUM4QjtBQUU1RCxTQUFTQyxNQUFNLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFFO0lBQ3JDLHFCQUNFLDhEQUFDSCxxRUFBYUE7UUFBQ0ksV0FBVTtRQUFRQyxjQUFhO1FBQVNDLFlBQVk7a0JBQ2pFLDRFQUFDSjtZQUFXLEdBQUdDLFNBQVM7Ozs7Ozs7Ozs7O0FBRzlCO0FBRUEsaUVBQWVGLEtBQUtBLEVBQUEiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcSkJyZWFcXHByby1jeWNsaW5nLWFuYWx5c2lzXFxhcHBzXFx3ZWJcXHBhZ2VzXFxfYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIi4uL3N0eWxlcy9nbG9iYWxzLmNzc1wiXHJcbmltcG9ydCB7IFRoZW1lUHJvdmlkZXIgfSBmcm9tIFwiLi4vY29tcG9uZW50cy90aGVtZS1wcm92aWRlclwiXHJcblxyXG5mdW5jdGlvbiBNeUFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH0pIHtcclxuICByZXR1cm4gKFxyXG4gICAgPFRoZW1lUHJvdmlkZXIgYXR0cmlidXRlPVwiY2xhc3NcIiBkZWZhdWx0VGhlbWU9XCJzeXN0ZW1cIiBlbmFibGVTeXN0ZW0+XHJcbiAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cclxuICAgIDwvVGhlbWVQcm92aWRlcj5cclxuICApXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE15QXBwXHJcbiJdLCJuYW1lcyI6WyJUaGVtZVByb3ZpZGVyIiwiTXlBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJhdHRyaWJ1dGUiLCJkZWZhdWx0VGhlbWUiLCJlbmFibGVTeXN0ZW0iXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-node)/./pages/_app.js\n");

/***/ }),

/***/ "(pages-dir-node)/./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(pages-dir-node)/./pages/_app.js"));
module.exports = __webpack_exports__;

})();