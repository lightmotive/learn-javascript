!function(t){var e={};function i(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,i),o.l=!0,o.exports}i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)i.d(n,o,function(e){return t[e]}.bind(null,o));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=1)}([function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.promise_waitIndicator_load=void 0;const n=i(3),o=i(4),r=i(5);class a{constructor(t){this.waitLogic=t,this.onButtonClicked=new n.Event}initialize(){this.initializeBody(),this.initializeButton()}initializeBody(){document.documentElement.style.height="100%",document.documentElement.style.zoom="500%",document.body.style.height="100%",document.body.style.display="flex",document.body.style.justifyContent="center",document.body.style.alignItems="center"}initializeButton(){let t=document.createElement("button");t.innerHTML="Try me!",t.onclick=()=>{this.onButtonClicked.trigger()},document.body.appendChild(t),this.buttonElement=t,this.ButtonClicked.on(()=>{this.buttonClicked()})}get ButtonClicked(){return this.onButtonClicked.expose()}buttonClicked(){this.buttonElement&&this.waitLogic.start(this.buttonElement).then(t=>{let e=Math.round(((new Date).getTime()-t.getTime())/1e3);setTimeout(()=>{alert(`Thanks for waiting. You clicked the "Try me!" button ${e} seconds ago.`)},0)}).catch(t=>{setTimeout(()=>{alert(t.message)},1)}).finally(()=>{this.waitLogic.end()})}}e.promise_waitIndicator_load=function(){new a(new r.WaitLogicSimulated(o.WaitIndicatorText)).initialize()}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const n=i(2),o=i(0);document.addEventListener("DOMContentLoaded",()=>{console.log("DOMContentLoaded");switch(new URLSearchParams(window.location.search).get("project")){case"promise/wait-indicator":o.promise_waitIndicator_load();break;default:n.projectSelector_load()}})},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.ProjectList=e.LoadProjectByKey=e.projectSelector_load=void 0;const n=i(0);var o=[{key:"promise/wait-indicator",topic:"Promise",name:"Wait Indicator",path:"?project=promise%2Fwait-indicator",load:()=>{n.promise_waitIndicator_load()}}];e.ProjectList=o;class r{constructor(t){this.projectList=t}initialize(){this.initializeBody(),this.initializeProjects()}initializeBody(){let t=document.createElement("h1");t.innerText="Project Selector",document.body.appendChild(t)}initializeProjects(){let t,e="";this.projectList.forEach(i=>{({currentTopicContent:e,currentListElement:t}=this.getListElement(i,e,t));let n=document.createElement("li");n.appendChild(this.getProjectLinkElement("",i)),t.appendChild(n)})}getProjectLinkElement(t,e){let i=document.createElement("a");return i.href=a(e),i.target="_top",i.innerHTML=e.name,i}getListElement(t,e,i){if(t.topic!==e){e=t.topic;let n=document.createElement("h2");n.innerHTML=t.topic,document.body.appendChild(n),i=document.createElement("ul"),document.body.appendChild(i)}return{currentTopicContent:e,currentListElement:i}}}function a(t){return""+t.path}function c(){new r(o).initialize()}e.projectSelector_load=c,e.LoadProjectByKey=function(t){let e=o.find(e=>e.key.toLowerCase()===t.toLowerCase());e?window.location.href=a(e):c()}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Event=void 0;e.Event=class{constructor(){this.handlers=[]}on(t){this.handlers.push(t)}off(t){this.handlers=this.handlers.filter(e=>e!==t)}trigger(t){this.handlers.slice(0).forEach(e=>e(t))}expose(){return this}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.WaitIndicatorText=void 0;e.WaitIndicatorText=class{constructor(t,e){this.inPlaceOfElement=t,this.cancelCallback=e,this.inPlaceOfElementDisplayBeforeHide="block",this.indicatorPosition=0}createWaitElement(){let t=document.createElement("div");return t.innerText="Simulated wait...",this.cancelCallback&&t.appendChild(this.createWaitCancelElement()),t.appendChild(this.createWaitIndicatorElement()),this.waitElement=t,t}createWaitIndicatorElement(){let t=document.createElement("div");return t.style.width="100%",t.style.textAlign="center",t.innerHTML=this.getIndicatorHtml(),this.waitIndicatorElement=t,t}createWaitCancelElement(){let t=document.createElement("button");return t.innerText="Cancel",t.style.marginLeft="10px",t.onclick=t=>!!this.cancelCallback&&(this.cancelCallback(t),!0),t}show(){this.inPlaceOfElementDisplayBeforeHide=this.inPlaceOfElement.style.display,this.inPlaceOfElement.style.display="none";let t=this.inPlaceOfElement.parentNode;t&&t.insertBefore(this.createWaitElement(),this.inPlaceOfElement)}getIndicatorHtml(){switch(this.indicatorPosition){case 0:return"/";case 1:return"&mdash;";case 2:return"\\";case 3:return"|";default:return"?"}}progress(){this.waitIndicatorElement&&(this.indicatorPosition+=1,this.indicatorPosition>3&&(this.indicatorPosition=0),this.waitIndicatorElement.innerHTML=this.getIndicatorHtml())}hide(){this.inPlaceOfElement&&(this.inPlaceOfElement.style.display=this.inPlaceOfElementDisplayBeforeHide),this.waitElement&&this.waitElement.remove()}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.WaitLogicSimulated=void 0;e.WaitLogicSimulated=class{constructor(t){this.waitIndicatorConstructor=t,this.simulatedWaitMs=2e3,this.indicatorUpdateIntervalMs=100}start(t){this.waitIndicator=new this.waitIndicatorConstructor(t,t=>{this.cancel(t)}),this.waitIndicator.show();let e=new Promise((t,e)=>{this.startResolve=t,this.startReject=e});return this.startWait(),this.startWaitProgressUpdater(),e}startWait(){let t=new Date;this.waitTimeout=setTimeout(()=>{this.startResolve&&this.startResolve(t)},this.simulatedWaitMs)}startWaitProgressUpdater(){this.waitInterval=setInterval(()=>{var t;null===(t=this.waitIndicator)||void 0===t||t.progress()},this.indicatorUpdateIntervalMs)}cancel(t){window.clearTimeout(this.waitTimeout),this.end(),this.startReject&&this.startReject(new Error(`Wait canceled due to ${t.currentTarget.innerText} ${t.type}`))}end(){var t;window.clearInterval(this.waitInterval),null===(t=this.waitIndicator)||void 0===t||t.hide()}}}]);