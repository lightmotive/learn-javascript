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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Event.ts":
/*!**********************!*\
  !*** ./src/Event.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
class Event {
    constructor() {
        this.handlers = [];
    }
    on(handler) {
        this.handlers.push(handler);
    }
    off(handler) {
        this.handlers = this.handlers.filter((h) => h !== handler);
    }
    trigger(data) {
        this.handlers.slice(0).forEach((h) => h(data));
    }
    expose() {
        return this;
    }
}
exports.Event = Event;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const wait_indicator_1 = __webpack_require__(/*! ./promise/wait-indicator */ "./src/promise/wait-indicator.ts");
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded");
    const params = new URLSearchParams(window.location.search);
    if (params.has("project")) {
        let project = params.get("project");
        switch (project) {
            case "promise_wait-indicator":
                wait_indicator_1.promise_waitIndicator_load();
                break;
            default:
                break;
        }
    }
});


/***/ }),

/***/ "./src/promise/wait-indicator.ts":
/*!***************************************!*\
  !*** ./src/promise/wait-indicator.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.promise_waitIndicator_load = void 0;
const Event_1 = __webpack_require__(/*! ../Event */ "./src/Event.ts");
class WaitIndicatorText {
    constructor() {
        this.inPlaceOfElementDisplayBeforeHide = "block";
        this.indicatorPosition = 0;
    }
    createWaitElement() {
        let waitElement = document.createElement("div");
        waitElement.innerText = "Simulated processing...";
        waitElement.appendChild(this.createWaitIndicatorElement());
        this.waitElement = waitElement;
        return waitElement;
    }
    createWaitIndicatorElement() {
        let waitIndicatorElement = document.createElement("div");
        waitIndicatorElement.style.width = "100%";
        waitIndicatorElement.style.textAlign = "center";
        waitIndicatorElement.innerHTML = this.getIndicatorHtml();
        this.waitIndicatorElement = waitIndicatorElement;
        return waitIndicatorElement;
    }
    show(inPlaceOfElement) {
        this.inPlaceOfElement = inPlaceOfElement;
        this.inPlaceOfElementDisplayBeforeHide = inPlaceOfElement.style.display;
        inPlaceOfElement.style.display = "none";
        let parentNode = inPlaceOfElement.parentNode;
        if (!parentNode) {
            return;
        }
        parentNode.insertBefore(this.createWaitElement(), inPlaceOfElement);
    }
    getIndicatorHtml() {
        switch (this.indicatorPosition) {
            case 0:
                return "/";
            case 1:
                return "&mdash;";
            case 2:
                return "\\";
            case 3:
                return "|";
            default:
                return "?";
        }
    }
    progress() {
        if (!this.waitIndicatorElement) {
            return;
        }
        this.indicatorPosition += 1;
        if (this.indicatorPosition > 3) {
            this.indicatorPosition = 0;
        }
        this.waitIndicatorElement.innerHTML = this.getIndicatorHtml();
    }
    hide() {
        if (this.inPlaceOfElement) {
            this.inPlaceOfElement.style.display = this.inPlaceOfElementDisplayBeforeHide;
        }
        if (this.waitElement) {
            this.waitElement.remove();
        }
    }
}
class WaitLogicSimulated {
    constructor(waitIndicator) {
        this.waitIndicator = waitIndicator;
        this.simulatedWaitMs = 3000;
        this.indicatorUpdateIntervalMs = 100;
    }
    start(forElement) {
        let clickStartTime = new Date();
        this.waitIndicator.show(forElement);
        return new Promise((resolve, reject) => {
            this.waitTimeout = setTimeout(() => {
                resolve(clickStartTime);
            }, this.simulatedWaitMs);
            this.waitInterval = setInterval(() => {
                this.waitIndicator.progress();
            }, this.indicatorUpdateIntervalMs);
        });
    }
    cancel() {
        window.clearTimeout(this.waitTimeout);
    }
    end() {
        window.clearInterval(this.waitInterval);
        this.waitIndicator.hide();
    }
}
class ProjectDocument {
    constructor(waitLogic) {
        this.waitLogic = waitLogic;
        this.onButtonClicked = new Event_1.Event();
    }
    initialize() {
        this.initializeBody();
        this.initializeButton();
    }
    initializeBody() {
        document.documentElement.style.height = "100%";
        document.documentElement.style.zoom = "500%";
        document.body.style.height = "100%";
        document.body.style.display = "flex";
        document.body.style.justifyContent = "center";
        document.body.style.alignItems = "center";
    }
    initializeButton() {
        let button = document.createElement("button");
        button.innerHTML = "Try me!";
        button.onclick = () => {
            this.onButtonClicked.trigger();
        };
        document.body.appendChild(button);
        this.buttonElement = button;
        this.ButtonClicked.on(() => {
            this.buttonClicked();
        });
    }
    get ButtonClicked() {
        return this.onButtonClicked.expose();
    }
    buttonClicked() {
        if (!this.buttonElement) {
            return;
        }
        this.waitLogic
            .start(this.buttonElement)
            .then((data) => {
            let elapsedSeconds = Math.round((new Date().getTime() - data.getTime()) / 1000);
            setTimeout(() => {
                alert(`You clicked the button ${elapsedSeconds} seconds ago.`);
            }, 0);
        })
            .catch((e) => {
            alert(e.message);
        })
            .finally(() => {
            this.waitLogic.end();
        });
    }
}
function LoadProject() {
    new ProjectDocument(new WaitLogicSimulated(new WaitIndicatorText())).initialize();
}
exports.promise_waitIndicator_load = LoadProject;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0V2ZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvbWlzZS93YWl0LWluZGljYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDOUVBLE1BQWEsS0FBSztJQUFsQjtRQUNVLGFBQVEsR0FBMkIsRUFBRSxDQUFDO0lBaUJoRCxDQUFDO0lBZlEsRUFBRSxDQUFDLE9BQTZCO1FBQ3JDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFTSxHQUFHLENBQUMsT0FBNkI7UUFDdEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENB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QUFDLENBQUMsQ0FBQztRQUNSLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ1gsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUM7YUFDRCxPQUFPLENBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDRjtBQUVELFNBQVMsV0FBVztJQUNsQixJQUFJLGVBQWUsQ0FDakIsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLGlCQUFpQixFQUFFLENBQUMsQ0FDaEQsQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUNqQixDQUFDO0FBRXVCLGlEQUEwQiIsImZpbGUiOiI2MjdkMjEzY2ZjMDNkYzUzM2VjYy5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImV4cG9ydCBpbnRlcmZhY2UgSUV2ZW50PFQ+IHtcclxuICBvbihoYW5kbGVyOiB7IChkYXRhPzogVCk6IHZvaWQgfSk6IHZvaWQ7XHJcbiAgb2ZmKGhhbmRsZXI6IHsgKGRhdGE/OiBUKTogdm9pZCB9KTogdm9pZDtcclxufVxyXG5leHBvcnQgY2xhc3MgRXZlbnQ8VD4gaW1wbGVtZW50cyBJRXZlbnQ8VD4ge1xyXG4gIHByaXZhdGUgaGFuZGxlcnM6IHsgKGRhdGE/OiBUKTogdm9pZCB9W10gPSBbXTtcclxuXHJcbiAgcHVibGljIG9uKGhhbmRsZXI6IHsgKGRhdGE/OiBUKTogdm9pZCB9KTogdm9pZCB7XHJcbiAgICB0aGlzLmhhbmRsZXJzLnB1c2goaGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb2ZmKGhhbmRsZXI6IHsgKGRhdGE/OiBUKTogdm9pZCB9KTogdm9pZCB7XHJcbiAgICB0aGlzLmhhbmRsZXJzID0gdGhpcy5oYW5kbGVycy5maWx0ZXIoKGgpID0+IGggIT09IGhhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHRyaWdnZXIoZGF0YT86IFQpIHtcclxuICAgIHRoaXMuaGFuZGxlcnMuc2xpY2UoMCkuZm9yRWFjaCgoaCkgPT4gaChkYXRhKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZXhwb3NlKCk6IElFdmVudDxUPiB7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IGxvYWRqcyBmcm9tIFwibG9hZGpzXCI7XHJcbmltcG9ydCB7IHByb21pc2Vfd2FpdEluZGljYXRvcl9sb2FkIH0gZnJvbSBcIi4vcHJvbWlzZS93YWl0LWluZGljYXRvclwiO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xyXG4gIGNvbnNvbGUubG9nKFwiRE9NQ29udGVudExvYWRlZFwiKTtcclxuICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xyXG5cclxuICBpZiAocGFyYW1zLmhhcyhcInByb2plY3RcIikpIHtcclxuICAgIGxldCBwcm9qZWN0ID0gcGFyYW1zLmdldChcInByb2plY3RcIikgYXMgc3RyaW5nO1xyXG5cclxuICAgIHN3aXRjaCAocHJvamVjdCkge1xyXG4gICAgICBjYXNlIFwicHJvbWlzZV93YWl0LWluZGljYXRvclwiOlxyXG4gICAgICAgIHByb21pc2Vfd2FpdEluZGljYXRvcl9sb2FkKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG59KTtcclxuIiwiaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vRXZlbnRcIjtcclxuXHJcbmludGVyZmFjZSBXYWl0SW5kaWNhdG9yIHtcclxuICBzaG93KGluUGxhY2VPZkVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZDtcclxuICBwcm9ncmVzcygpOiB2b2lkO1xyXG4gIGhpZGUoKTogdm9pZDtcclxufVxyXG5cclxuaW50ZXJmYWNlIFdhaXRMb2dpYzxUPiB7XHJcbiAgc3RhcnQoZm9yRWxlbWVudDogSFRNTEVsZW1lbnQpOiBQcm9taXNlPFQ+O1xyXG4gIGNhbmNlbCgpOiB2b2lkO1xyXG4gIGVuZCgpOiB2b2lkO1xyXG59XHJcblxyXG5jbGFzcyBXYWl0SW5kaWNhdG9yVGV4dCBpbXBsZW1lbnRzIFdhaXRJbmRpY2F0b3Ige1xyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgcHJpdmF0ZSBpblBsYWNlT2ZFbGVtZW50PzogSFRNTEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBpblBsYWNlT2ZFbGVtZW50RGlzcGxheUJlZm9yZUhpZGU6IHN0cmluZyA9IFwiYmxvY2tcIjtcclxuICBwcml2YXRlIHdhaXRFbGVtZW50PzogSFRNTERpdkVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSB3YWl0SW5kaWNhdG9yRWxlbWVudD86IEhUTUxEaXZFbGVtZW50O1xyXG4gIHByaXZhdGUgaW5kaWNhdG9yUG9zaXRpb24gPSAwO1xyXG5cclxuICBwcml2YXRlIGNyZWF0ZVdhaXRFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcclxuICAgIGxldCB3YWl0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICB3YWl0RWxlbWVudC5pbm5lclRleHQgPSBcIlNpbXVsYXRlZCBwcm9jZXNzaW5nLi4uXCI7XHJcbiAgICB3YWl0RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmNyZWF0ZVdhaXRJbmRpY2F0b3JFbGVtZW50KCkpO1xyXG4gICAgdGhpcy53YWl0RWxlbWVudCA9IHdhaXRFbGVtZW50O1xyXG4gICAgcmV0dXJuIHdhaXRFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVXYWl0SW5kaWNhdG9yRWxlbWVudCgpOiBIVE1MRGl2RWxlbWVudCB7XHJcbiAgICBsZXQgd2FpdEluZGljYXRvckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgd2FpdEluZGljYXRvckVsZW1lbnQuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcclxuICAgIHdhaXRJbmRpY2F0b3JFbGVtZW50LnN0eWxlLnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XHJcbiAgICB3YWl0SW5kaWNhdG9yRWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLmdldEluZGljYXRvckh0bWwoKTtcclxuXHJcbiAgICB0aGlzLndhaXRJbmRpY2F0b3JFbGVtZW50ID0gd2FpdEluZGljYXRvckVsZW1lbnQ7XHJcbiAgICByZXR1cm4gd2FpdEluZGljYXRvckVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBzaG93KGluUGxhY2VPZkVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XHJcbiAgICB0aGlzLmluUGxhY2VPZkVsZW1lbnQgPSBpblBsYWNlT2ZFbGVtZW50O1xyXG4gICAgdGhpcy5pblBsYWNlT2ZFbGVtZW50RGlzcGxheUJlZm9yZUhpZGUgPSBpblBsYWNlT2ZFbGVtZW50LnN0eWxlLmRpc3BsYXk7XHJcbiAgICBpblBsYWNlT2ZFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuXHJcbiAgICBsZXQgcGFyZW50Tm9kZSA9IGluUGxhY2VPZkVsZW1lbnQucGFyZW50Tm9kZTtcclxuICAgIGlmICghcGFyZW50Tm9kZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBwYXJlbnROb2RlLmluc2VydEJlZm9yZSh0aGlzLmNyZWF0ZVdhaXRFbGVtZW50KCksIGluUGxhY2VPZkVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRJbmRpY2F0b3JIdG1sKCk6IHN0cmluZyB7XHJcbiAgICBzd2l0Y2ggKHRoaXMuaW5kaWNhdG9yUG9zaXRpb24pIHtcclxuICAgICAgY2FzZSAwOlxyXG4gICAgICAgIHJldHVybiBcIi9cIjtcclxuICAgICAgY2FzZSAxOlxyXG4gICAgICAgIHJldHVybiBcIiZtZGFzaDtcIjtcclxuICAgICAgY2FzZSAyOlxyXG4gICAgICAgIHJldHVybiBcIlxcXFxcIjtcclxuICAgICAgY2FzZSAzOlxyXG4gICAgICAgIHJldHVybiBcInxcIjtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gXCI/XCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcm9ncmVzcygpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy53YWl0SW5kaWNhdG9yRWxlbWVudCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5pbmRpY2F0b3JQb3NpdGlvbiArPSAxO1xyXG4gICAgaWYgKHRoaXMuaW5kaWNhdG9yUG9zaXRpb24gPiAzKSB7XHJcbiAgICAgIHRoaXMuaW5kaWNhdG9yUG9zaXRpb24gPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMud2FpdEluZGljYXRvckVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5nZXRJbmRpY2F0b3JIdG1sKCk7XHJcbiAgfVxyXG5cclxuICBoaWRlKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuaW5QbGFjZU9mRWxlbWVudCkge1xyXG4gICAgICB0aGlzLmluUGxhY2VPZkVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IHRoaXMuaW5QbGFjZU9mRWxlbWVudERpc3BsYXlCZWZvcmVIaWRlO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMud2FpdEVsZW1lbnQpIHtcclxuICAgICAgdGhpcy53YWl0RWxlbWVudC5yZW1vdmUoKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIFdhaXRMb2dpY1NpbXVsYXRlZCBpbXBsZW1lbnRzIFdhaXRMb2dpYzxEYXRlPiB7XHJcbiAgcHJpdmF0ZSBzaW11bGF0ZWRXYWl0TXMgPSAzMDAwO1xyXG4gIHByaXZhdGUgaW5kaWNhdG9yVXBkYXRlSW50ZXJ2YWxNcyA9IDEwMDtcclxuXHJcbiAgcHJpdmF0ZSB3YWl0SW50ZXJ2YWw/OiBudW1iZXI7XHJcbiAgcHJpdmF0ZSB3YWl0VGltZW91dD86IG51bWJlcjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB3YWl0SW5kaWNhdG9yOiBXYWl0SW5kaWNhdG9yKSB7fVxyXG5cclxuICBzdGFydChmb3JFbGVtZW50OiBIVE1MRWxlbWVudCk6IFByb21pc2U8RGF0ZT4ge1xyXG4gICAgbGV0IGNsaWNrU3RhcnRUaW1lID0gbmV3IERhdGUoKTtcclxuICAgIHRoaXMud2FpdEluZGljYXRvci5zaG93KGZvckVsZW1lbnQpO1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRoaXMud2FpdFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICByZXNvbHZlKGNsaWNrU3RhcnRUaW1lKTtcclxuICAgICAgfSwgdGhpcy5zaW11bGF0ZWRXYWl0TXMpO1xyXG5cclxuICAgICAgdGhpcy53YWl0SW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy53YWl0SW5kaWNhdG9yLnByb2dyZXNzKCk7XHJcbiAgICAgIH0sIHRoaXMuaW5kaWNhdG9yVXBkYXRlSW50ZXJ2YWxNcyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNhbmNlbCgpIHtcclxuICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy53YWl0VGltZW91dCk7XHJcbiAgfVxyXG5cclxuICBlbmQoKSB7XHJcbiAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aGlzLndhaXRJbnRlcnZhbCk7XHJcbiAgICB0aGlzLndhaXRJbmRpY2F0b3IuaGlkZSgpO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgUHJvamVjdERvY3VtZW50IGltcGxlbWVudHMgUHJvamVjdCB7XHJcbiAgcHJpdmF0ZSBidXR0b25FbGVtZW50PzogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgd2FpdExvZ2ljOiBXYWl0TG9naWM8RGF0ZT4pIHt9XHJcblxyXG4gIGluaXRpYWxpemUoKSB7XHJcbiAgICB0aGlzLmluaXRpYWxpemVCb2R5KCk7XHJcbiAgICB0aGlzLmluaXRpYWxpemVCdXR0b24oKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdGlhbGl6ZUJvZHkoKSB7XHJcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gXCIxMDAlXCI7XHJcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuem9vbSA9IFwiNTAwJVwiO1xyXG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5oZWlnaHQgPSBcIjEwMCVcIjtcclxuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5qdXN0aWZ5Q29udGVudCA9IFwiY2VudGVyXCI7XHJcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmFsaWduSXRlbXMgPSBcImNlbnRlclwiO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0aWFsaXplQnV0dG9uKCkge1xyXG4gICAgbGV0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBidXR0b24uaW5uZXJIVE1MID0gXCJUcnkgbWUhXCI7XHJcbiAgICBidXR0b24ub25jbGljayA9ICgpID0+IHtcclxuICAgICAgdGhpcy5vbkJ1dHRvbkNsaWNrZWQudHJpZ2dlcigpO1xyXG4gICAgfTtcclxuXHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGJ1dHRvbik7XHJcbiAgICB0aGlzLmJ1dHRvbkVsZW1lbnQgPSBidXR0b247XHJcblxyXG4gICAgdGhpcy5CdXR0b25DbGlja2VkLm9uKCgpID0+IHtcclxuICAgICAgdGhpcy5idXR0b25DbGlja2VkKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgb25CdXR0b25DbGlja2VkID0gbmV3IEV2ZW50PHZvaWQ+KCk7XHJcbiAgcHVibGljIGdldCBCdXR0b25DbGlja2VkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMub25CdXR0b25DbGlja2VkLmV4cG9zZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBidXR0b25DbGlja2VkKCkge1xyXG4gICAgaWYgKCF0aGlzLmJ1dHRvbkVsZW1lbnQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMud2FpdExvZ2ljXHJcbiAgICAgIC5zdGFydCh0aGlzLmJ1dHRvbkVsZW1lbnQpXHJcbiAgICAgIC50aGVuKChkYXRhOiBEYXRlKSA9PiB7XHJcbiAgICAgICAgbGV0IGVsYXBzZWRTZWNvbmRzID0gTWF0aC5yb3VuZChcclxuICAgICAgICAgIChuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIGRhdGEuZ2V0VGltZSgpKSAvIDEwMDBcclxuICAgICAgICApO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgYWxlcnQoYFlvdSBjbGlja2VkIHRoZSBidXR0b24gJHtlbGFwc2VkU2Vjb25kc30gc2Vjb25kcyBhZ28uYCk7XHJcbiAgICAgICAgfSwgMCk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaCgoZSkgPT4ge1xyXG4gICAgICAgIGFsZXJ0KGUubWVzc2FnZSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5maW5hbGx5KCgpID0+IHtcclxuICAgICAgICB0aGlzLndhaXRMb2dpYy5lbmQoKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBMb2FkUHJvamVjdCgpOiB2b2lkIHtcclxuICBuZXcgUHJvamVjdERvY3VtZW50KFxyXG4gICAgbmV3IFdhaXRMb2dpY1NpbXVsYXRlZChuZXcgV2FpdEluZGljYXRvclRleHQoKSlcclxuICApLmluaXRpYWxpemUoKTtcclxufVxyXG5cclxuZXhwb3J0IHsgTG9hZFByb2plY3QgYXMgcHJvbWlzZV93YWl0SW5kaWNhdG9yX2xvYWQgfTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==