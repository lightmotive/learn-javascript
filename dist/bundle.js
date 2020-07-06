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
    let project = "";
    if (params.has("project")) {
        project = params.get("project");
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
class Document {
    constructor() {
        this.waitElementId = "wait-indicator";
        this.buttonElementId = "wait-button";
        this.onButtonClicked = new Event_1.Event();
    }
    initialize() {
        this.initializeDOM();
    }
    initializeDOM() {
        document.documentElement.style.height = "100%";
        document.documentElement.style.zoom = "500%";
        document.body.style.height = "100%";
        document.body.style.display = "flex";
        document.body.style.justifyContent = "center";
        document.body.style.alignItems = "center";
        this.initializeIndicator();
        this.initializeButton();
    }
    initializeIndicator() {
        let div = document.createElement("div");
        div.id = this.waitElementId;
        div.style.display = "none";
        document.body.appendChild(div);
    }
    initializeButton() {
        let button = document.createElement("button");
        button.id = this.buttonElementId;
        button.innerHTML = "Try me!";
        button.onclick = () => {
            this.onButtonClicked.trigger();
        };
        document.body.appendChild(button);
    }
    get ButtonClicked() {
        return this.onButtonClicked.expose();
    }
    getIndicatorElement() {
        return document.getElementById(this.waitElementId);
    }
    getButtonElement() {
        return document.getElementById(this.buttonElementId);
    }
    startWait() {
        this.getIndicatorElement().style.display = "block";
        this.getButtonElement().style.display = "none";
    }
    updateIndicator(character) {
        this.getIndicatorElement().innerHTML = `<div>Simulated processing...<div style="width: 100%; text-align: center;">${character}</div></div>`;
    }
    endWait() {
        this.getIndicatorElement().style.display = "none";
        this.getButtonElement().style.display = "";
    }
}
class WaitLogic {
    constructor(document) {
        this.document = document;
        this.simulatedWaitMs = 3000;
        this.indicatorUpdateIntervalMs = 100;
        this.indicatorPosition = 0;
    }
    initialize() {
        this.document.initialize();
        this.document.ButtonClicked.on(() => {
            this.buttonClicked();
        });
    }
    start(date) {
        this.document.startWait();
        return this.startTimer(date);
    }
    buttonClicked() {
        let clickStartTime = new Date();
        this.start(clickStartTime)
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
            this.end();
        });
    }
    startTimer(date) {
        return new Promise((resolve, reject) => {
            this.waitTimeout = setTimeout(() => {
                resolve(date);
            }, this.simulatedWaitMs);
            this.indicatorPosition = -1;
            this.waitInterval = setInterval(() => {
                this.moveIndicator();
            }, this.indicatorUpdateIntervalMs);
        });
    }
    getIndicatorCharacterByPosition(position) {
        switch (position) {
            case 0:
                return "/";
            case 1:
                return "--";
            case 2:
                return "\\";
            case 3:
                return "|";
            default:
                return "?";
        }
    }
    moveIndicator() {
        this.indicatorPosition += 1;
        if (this.indicatorPosition > 3) {
            this.indicatorPosition = 0;
        }
        this.document.updateIndicator(this.getIndicatorCharacterByPosition(this.indicatorPosition));
    }
    end() {
        window.clearInterval(this.waitInterval);
        this.document.endWait();
    }
}
function LoadProject() {
    new WaitLogic(new Document()).initialize();
}
exports.promise_waitIndicator_load = LoadProject;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0V2ZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvbWlzZS93YWl0LWluZGljYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDOUVBLE1BQWEsS0FBSztJQUFsQjtRQUNVLGFBQVEsR0FBMkIsRUFBRSxDQUFDO0lBaUJoRCxDQUFDO0lBZlEsRUFBRSxDQUFDLE9BQTZCO1FBQ3JDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFTSxHQUFHLENBQUMsT0FBNkI7UUFDdEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLE9BQU8sQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFTSxPQUFPLENBQUMsSUFBUTtRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFTSxNQUFNO1FBQ1gsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQ0Y7QUFsQkQsc0JBa0JDOzs7Ozs7Ozs7Ozs7Ozs7QUNyQkQsZ0hBQXNFO0FBRXRFLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLEVBQUU7SUFDakQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ2hDLE1BQU0sTUFBTSxHQUFHLElBQUksZUFBZSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFM0QsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUN6QixPQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQVcsQ0FBQztRQUUxQyxRQUFRLE9BQU8sRUFBRTtZQUNmLEtBQUssd0JBQXdCO2dCQUMzQiwyQ0FBMEIsRUFBRSxDQUFDO2dCQUM3QixNQUFNO1lBQ1I7Z0JBQ0UsTUFBTTtTQUNUO0tBQ0Y7QUFDSCxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ25CSCxzRUFBaUM7QUFFakMsTUFBTSxRQUFRO0lBQWQ7UUFDVSxrQkFBYSxHQUFHLGdCQUFnQixDQUFDO1FBQ2pDLG9CQUFlLEdBQUcsYUFBYSxDQUFDO1FBaUN2QixvQkFBZSxHQUFHLElBQUksYUFBSyxFQUFRLENBQUM7SUEwQnZELENBQUM7SUF6REMsVUFBVTtRQUNSLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRU8sYUFBYTtRQUNuQixRQUFRLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQy9DLFFBQVEsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7UUFDN0MsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNwQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3JDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUM7UUFDOUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztRQUMxQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRU8sbUJBQW1CO1FBQ3pCLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEMsR0FBRyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzVCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUMzQixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBQ08sZ0JBQWdCO1FBQ3RCLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQ2pDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsR0FBRyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDakMsQ0FBQyxDQUFDO1FBQ0YsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUdELElBQVcsYUFBYTtRQUN0QixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUVPLG1CQUFtQjtRQUN6QixPQUFPLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBZ0IsQ0FBQztJQUNwRSxDQUFDO0lBRU8sZ0JBQWdCO1FBQ3RCLE9BQU8sUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFnQixDQUFDO0lBQ3RFLENBQUM7SUFFRCxTQUFTO1FBQ1AsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDbkQsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDakQsQ0FBQztJQUVELGVBQWUsQ0FBQyxTQUFpQjtRQUMvQixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxTQUFTLEdBQUcsNkVBQTZFLFNBQVMsY0FBYyxDQUFDO0lBQzlJLENBQUM7SUFFRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDbEQsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDN0MsQ0FBQztDQUNGO0FBRUQsTUFBTSxTQUFTO0lBT2IsWUFBb0IsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQU45QixvQkFBZSxHQUFHLElBQUksQ0FBQztRQUN2Qiw4QkFBeUIsR0FBRyxHQUFHLENBQUM7UUFDaEMsc0JBQWlCLEdBQUcsQ0FBQyxDQUFDO0lBSVcsQ0FBQztJQUUxQyxVQUFVO1FBQ1IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFO1lBQ2xDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxLQUFLLENBQUMsSUFBVTtRQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzFCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRU8sYUFBYTtRQUNuQixJQUFJLGNBQWMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDO2FBQ3ZCLElBQUksQ0FBQyxDQUFDLElBQVUsRUFBRSxFQUFFO1lBQ25CLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQzdCLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQy9DLENBQUM7WUFDRixVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNkLEtBQUssQ0FBQywwQkFBMEIsY0FBYyxlQUFlLENBQUMsQ0FBQztZQUNqRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNYLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFDO2FBQ0QsT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNiLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLFVBQVUsQ0FBQyxJQUFVO1FBQzNCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNqQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEIsQ0FBQyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUV6QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFO2dCQUNuQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDdkIsQ0FBQyxFQUFFLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLCtCQUErQixDQUFDLFFBQWdCO1FBQ3RELFFBQVEsUUFBUSxFQUFFO1lBQ2hCLEtBQUssQ0FBQztnQkFDSixPQUFPLEdBQUcsQ0FBQztZQUNiLEtBQUssQ0FBQztnQkFDSixPQUFPLElBQUksQ0FBQztZQUNkLEtBQUssQ0FBQztnQkFDSixPQUFPLElBQUksQ0FBQztZQUNkLEtBQUssQ0FBQztnQkFDSixPQUFPLEdBQUcsQ0FBQztZQUNiO2dCQUNFLE9BQU8sR0FBRyxDQUFDO1NBQ2Q7SUFDSCxDQUFDO0lBRU8sYUFBYTtRQUNuQixJQUFJLENBQUMsaUJBQWlCLElBQUksQ0FBQyxDQUFDO1FBRTVCLElBQUksSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsRUFBRTtZQUM5QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDO1NBQzVCO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQzNCLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FDN0QsQ0FBQztJQUNKLENBQUM7SUFFTyxHQUFHO1FBQ1QsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUMxQixDQUFDO0NBQ0Y7QUFFRCxTQUFTLFdBQVc7SUFDbEIsSUFBSSxTQUFTLENBQUMsSUFBSSxRQUFRLEVBQUUsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQzdDLENBQUM7QUFFdUIsaURBQTBCIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiZXhwb3J0IGludGVyZmFjZSBJRXZlbnQ8VD4ge1xyXG4gIG9uKGhhbmRsZXI6IHsgKGRhdGE/OiBUKTogdm9pZCB9KTogdm9pZDtcclxuICBvZmYoaGFuZGxlcjogeyAoZGF0YT86IFQpOiB2b2lkIH0pOiB2b2lkO1xyXG59XHJcbmV4cG9ydCBjbGFzcyBFdmVudDxUPiBpbXBsZW1lbnRzIElFdmVudDxUPiB7XHJcbiAgcHJpdmF0ZSBoYW5kbGVyczogeyAoZGF0YT86IFQpOiB2b2lkIH1bXSA9IFtdO1xyXG5cclxuICBwdWJsaWMgb24oaGFuZGxlcjogeyAoZGF0YT86IFQpOiB2b2lkIH0pOiB2b2lkIHtcclxuICAgIHRoaXMuaGFuZGxlcnMucHVzaChoYW5kbGVyKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvZmYoaGFuZGxlcjogeyAoZGF0YT86IFQpOiB2b2lkIH0pOiB2b2lkIHtcclxuICAgIHRoaXMuaGFuZGxlcnMgPSB0aGlzLmhhbmRsZXJzLmZpbHRlcigoaCkgPT4gaCAhPT0gaGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdHJpZ2dlcihkYXRhPzogVCkge1xyXG4gICAgdGhpcy5oYW5kbGVycy5zbGljZSgwKS5mb3JFYWNoKChoKSA9PiBoKGRhdGEpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBleHBvc2UoKTogSUV2ZW50PFQ+IHtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgbG9hZGpzIGZyb20gXCJsb2FkanNcIjtcclxuaW1wb3J0IHsgcHJvbWlzZV93YWl0SW5kaWNhdG9yX2xvYWQgfSBmcm9tIFwiLi9wcm9taXNlL3dhaXQtaW5kaWNhdG9yXCI7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XHJcbiAgY29uc29sZS5sb2coXCJET01Db250ZW50TG9hZGVkXCIpO1xyXG4gIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XHJcblxyXG4gIGxldCBwcm9qZWN0ID0gXCJcIjtcclxuICBpZiAocGFyYW1zLmhhcyhcInByb2plY3RcIikpIHtcclxuICAgIHByb2plY3QgPSBwYXJhbXMuZ2V0KFwicHJvamVjdFwiKSBhcyBzdHJpbmc7XHJcblxyXG4gICAgc3dpdGNoIChwcm9qZWN0KSB7XHJcbiAgICAgIGNhc2UgXCJwcm9taXNlX3dhaXQtaW5kaWNhdG9yXCI6XHJcbiAgICAgICAgcHJvbWlzZV93YWl0SW5kaWNhdG9yX2xvYWQoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcbn0pO1xyXG4iLCJpbXBvcnQgeyBFdmVudCB9IGZyb20gXCIuLi9FdmVudFwiO1xyXG5cclxuY2xhc3MgRG9jdW1lbnQgaW1wbGVtZW50cyBJRG9jdW1lbnQge1xyXG4gIHByaXZhdGUgd2FpdEVsZW1lbnRJZCA9IFwid2FpdC1pbmRpY2F0b3JcIjtcclxuICBwcml2YXRlIGJ1dHRvbkVsZW1lbnRJZCA9IFwid2FpdC1idXR0b25cIjtcclxuXHJcbiAgaW5pdGlhbGl6ZSgpIHtcclxuICAgIHRoaXMuaW5pdGlhbGl6ZURPTSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0aWFsaXplRE9NKCkge1xyXG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLmhlaWdodCA9IFwiMTAwJVwiO1xyXG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnpvb20gPSBcIjUwMCVcIjtcclxuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuaGVpZ2h0ID0gXCIxMDAlXCI7XHJcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSBcImNlbnRlclwiO1xyXG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5hbGlnbkl0ZW1zID0gXCJjZW50ZXJcIjtcclxuICAgIHRoaXMuaW5pdGlhbGl6ZUluZGljYXRvcigpO1xyXG4gICAgdGhpcy5pbml0aWFsaXplQnV0dG9uKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRpYWxpemVJbmRpY2F0b3IoKSB7XHJcbiAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRpdi5pZCA9IHRoaXMud2FpdEVsZW1lbnRJZDtcclxuICAgIGRpdi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdik7XHJcbiAgfVxyXG4gIHByaXZhdGUgaW5pdGlhbGl6ZUJ1dHRvbigpIHtcclxuICAgIGxldCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgYnV0dG9uLmlkID0gdGhpcy5idXR0b25FbGVtZW50SWQ7XHJcbiAgICBidXR0b24uaW5uZXJIVE1MID0gXCJUcnkgbWUhXCI7XHJcbiAgICBidXR0b24ub25jbGljayA9ICgpID0+IHtcclxuICAgICAgdGhpcy5vbkJ1dHRvbkNsaWNrZWQudHJpZ2dlcigpO1xyXG4gICAgfTtcclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgb25CdXR0b25DbGlja2VkID0gbmV3IEV2ZW50PHZvaWQ+KCk7XHJcbiAgcHVibGljIGdldCBCdXR0b25DbGlja2VkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMub25CdXR0b25DbGlja2VkLmV4cG9zZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRJbmRpY2F0b3JFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcclxuICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLndhaXRFbGVtZW50SWQpIGFzIEhUTUxFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRCdXR0b25FbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcclxuICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmJ1dHRvbkVsZW1lbnRJZCkgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBzdGFydFdhaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmdldEluZGljYXRvckVsZW1lbnQoKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgdGhpcy5nZXRCdXR0b25FbGVtZW50KCkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlSW5kaWNhdG9yKGNoYXJhY3Rlcjogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmdldEluZGljYXRvckVsZW1lbnQoKS5pbm5lckhUTUwgPSBgPGRpdj5TaW11bGF0ZWQgcHJvY2Vzc2luZy4uLjxkaXYgc3R5bGU9XCJ3aWR0aDogMTAwJTsgdGV4dC1hbGlnbjogY2VudGVyO1wiPiR7Y2hhcmFjdGVyfTwvZGl2PjwvZGl2PmA7XHJcbiAgfVxyXG5cclxuICBlbmRXYWl0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5nZXRJbmRpY2F0b3JFbGVtZW50KCkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgdGhpcy5nZXRCdXR0b25FbGVtZW50KCkuc3R5bGUuZGlzcGxheSA9IFwiXCI7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBXYWl0TG9naWMge1xyXG4gIHByaXZhdGUgc2ltdWxhdGVkV2FpdE1zID0gMzAwMDtcclxuICBwcml2YXRlIGluZGljYXRvclVwZGF0ZUludGVydmFsTXMgPSAxMDA7XHJcbiAgcHJpdmF0ZSBpbmRpY2F0b3JQb3NpdGlvbiA9IDA7XHJcbiAgcHJpdmF0ZSB3YWl0SW50ZXJ2YWw/OiBudW1iZXI7XHJcbiAgcHJpdmF0ZSB3YWl0VGltZW91dD86IG51bWJlcjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQpIHt9XHJcblxyXG4gIGluaXRpYWxpemUoKSB7XHJcbiAgICB0aGlzLmRvY3VtZW50LmluaXRpYWxpemUoKTtcclxuICAgIHRoaXMuZG9jdW1lbnQuQnV0dG9uQ2xpY2tlZC5vbigoKSA9PiB7XHJcbiAgICAgIHRoaXMuYnV0dG9uQ2xpY2tlZCgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0YXJ0KGRhdGU6IERhdGUpIHtcclxuICAgIHRoaXMuZG9jdW1lbnQuc3RhcnRXYWl0KCk7XHJcbiAgICByZXR1cm4gdGhpcy5zdGFydFRpbWVyKGRhdGUpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBidXR0b25DbGlja2VkKCkge1xyXG4gICAgbGV0IGNsaWNrU3RhcnRUaW1lID0gbmV3IERhdGUoKTtcclxuICAgIHRoaXMuc3RhcnQoY2xpY2tTdGFydFRpbWUpXHJcbiAgICAgIC50aGVuKChkYXRhOiBEYXRlKSA9PiB7XHJcbiAgICAgICAgbGV0IGVsYXBzZWRTZWNvbmRzID0gTWF0aC5yb3VuZChcclxuICAgICAgICAgIChuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIGRhdGEuZ2V0VGltZSgpKSAvIDEwMDBcclxuICAgICAgICApO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgYWxlcnQoYFlvdSBjbGlja2VkIHRoZSBidXR0b24gJHtlbGFwc2VkU2Vjb25kc30gc2Vjb25kcyBhZ28uYCk7XHJcbiAgICAgICAgfSwgMCk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaCgoZSkgPT4ge1xyXG4gICAgICAgIGFsZXJ0KGUubWVzc2FnZSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5maW5hbGx5KCgpID0+IHtcclxuICAgICAgICB0aGlzLmVuZCgpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RhcnRUaW1lcihkYXRlOiBEYXRlKTogUHJvbWlzZTxEYXRlPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0aGlzLndhaXRUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgcmVzb2x2ZShkYXRlKTtcclxuICAgICAgfSwgdGhpcy5zaW11bGF0ZWRXYWl0TXMpO1xyXG5cclxuICAgICAgdGhpcy5pbmRpY2F0b3JQb3NpdGlvbiA9IC0xO1xyXG4gICAgICB0aGlzLndhaXRJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICB0aGlzLm1vdmVJbmRpY2F0b3IoKTtcclxuICAgICAgfSwgdGhpcy5pbmRpY2F0b3JVcGRhdGVJbnRlcnZhbE1zKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRJbmRpY2F0b3JDaGFyYWN0ZXJCeVBvc2l0aW9uKHBvc2l0aW9uOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgc3dpdGNoIChwb3NpdGlvbikge1xyXG4gICAgICBjYXNlIDA6XHJcbiAgICAgICAgcmV0dXJuIFwiL1wiO1xyXG4gICAgICBjYXNlIDE6XHJcbiAgICAgICAgcmV0dXJuIFwiLS1cIjtcclxuICAgICAgY2FzZSAyOlxyXG4gICAgICAgIHJldHVybiBcIlxcXFxcIjtcclxuICAgICAgY2FzZSAzOlxyXG4gICAgICAgIHJldHVybiBcInxcIjtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gXCI/XCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG1vdmVJbmRpY2F0b3IoKSB7XHJcbiAgICB0aGlzLmluZGljYXRvclBvc2l0aW9uICs9IDE7XHJcblxyXG4gICAgaWYgKHRoaXMuaW5kaWNhdG9yUG9zaXRpb24gPiAzKSB7XHJcbiAgICAgIHRoaXMuaW5kaWNhdG9yUG9zaXRpb24gPSAwO1xyXG4gICAgfVxyXG4gICAgdGhpcy5kb2N1bWVudC51cGRhdGVJbmRpY2F0b3IoXHJcbiAgICAgIHRoaXMuZ2V0SW5kaWNhdG9yQ2hhcmFjdGVyQnlQb3NpdGlvbih0aGlzLmluZGljYXRvclBvc2l0aW9uKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZW5kKCkge1xyXG4gICAgd2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy53YWl0SW50ZXJ2YWwpO1xyXG4gICAgdGhpcy5kb2N1bWVudC5lbmRXYWl0KCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBMb2FkUHJvamVjdCgpOiB2b2lkIHtcclxuICBuZXcgV2FpdExvZ2ljKG5ldyBEb2N1bWVudCgpKS5pbml0aWFsaXplKCk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IExvYWRQcm9qZWN0IGFzIHByb21pc2Vfd2FpdEluZGljYXRvcl9sb2FkIH07XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=