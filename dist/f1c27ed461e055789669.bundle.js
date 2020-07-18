!function(t){var e={};function n(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(i,r,function(e){return t[e]}.bind(null,r));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=7)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.DocumentWithButtonCentered=void 0;e.DocumentWithButtonCentered=class{constructor(t="Try me!"){this._buttonElement=document.createElement("button"),this.initializeBody(),this.initializeButton(t)}get button(){return this._buttonElement}initializeBody(){document.documentElement.style.height="100%",document.documentElement.style.zoom="500%",document.body.style.height="100%",document.body.style.display="flex",document.body.style.flexDirection="column",document.body.style.justifyContent="center",document.body.style.alignItems="center"}initializeButton(t){this._buttonElement.innerHTML=t,document.body.appendChild(this._buttonElement)}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.projectDemoData=void 0;const i=n(8),r=n(3),a=n(9),o=n(10);e.projectDemoData={"demo-selector":{topic:"Associative array (map, dictionary)",name:"Project Demo Selector",load:()=>{i.projectDemoSelector_load()}},"iterator/character-range":{topic:"Iterator",name:"Print character range",load:()=>{o.iterator_basicIterator_load()}},"promise/wait-indicator":{topic:"Promise",name:"Wait indicator (single promise)",load:()=>{r.promise_waitIndicator_load()}},"promise/wait-indicator-async-await":{topic:"Promise",name:"Wait indicator (async/await)",load:()=>{a.promise_waitIndicatorAsyncAwait_load()}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.ProjectManagerDefault=void 0;e.ProjectManagerDefault=class{constructor(t,e="",n="https://github.com/lightmotive/learn-javascript/blob/master/src",i="ts"){this.data=t,this.defaultProjectKey=e,this.defaultCodeURLRoot=n,this.defaultCodeFileExtension=i,""===e&&(this.defaultProjectKey=Object.keys(this.data)[0])}getProjectItemPathOrDefault(t,e){return e||"?project="+encodeURIComponent(t)}getProjectKeyURIComponent(t){const e=t.match(/(\/)?([^/]*)$/);if(!e)throw new Error("The project key may contain invalid characters, or this is a bug!");const n=e[1],i=e[2];return t.replace(e[0],`${n?"/":""}project-${encodeURIComponent(i)}`)}getCodeURLPathOrDefault(t,e,n,i){return i&&i.length>0?i:`${t}/${this.getProjectKeyURIComponent(e)}.${n}`}getProjects(){const t=Object.entries(this.data).map(([t,e])=>{const n=e;return n.path=this.getProjectItemPathOrDefault(t,e.path),n.codeURL=this.getCodeURLPathOrDefault(this.defaultCodeURLRoot,t,this.defaultCodeFileExtension,e.codeURL),[t,n]});return Object.fromEntries(t)}findProjectByKey(t){if(!t)return this.findProjectByKey(this.defaultProjectKey);const e=this.getProjects()[t.toLowerCase()];return e||this.findProjectByKey(this.defaultProjectKey)}launchProjectByKey(t){const e=this.findProjectByKey(t);if(!e)return this.launchProjectByKey(this.defaultProjectKey);window.location.href=e.path}loadProjectByKey(t){this.findProjectByKey(t).load()}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.promise_waitIndicator_load=e.WaitIndicator=void 0;const i=n(4),r=n(5),a=n(0);class o{constructor(t,e,n="Are you more relaxed?"){this.document=t,this.waitLogic=e,this.waitCompleteMessage=n}render(){this.document.button.onclick=()=>{this.wait(this.document.button)}}wait(t){this.waitLogic.start(t,"There's always a little time to breathe...").then(e=>{this.waitResolved(t.innerText,e)}).catch(t=>{this.waitRejected(t)}).finally(()=>{this.waitLogic.end()})}waitResolved(t,e){console.log(t+" clicked.");const n=Math.round(((new Date).getTime()-e.getTime())/1e3);setTimeout(()=>{alert(`You've been breathing deeply for ${n} seconds. ${this.waitCompleteMessage}`)},0)}waitRejected(t){t instanceof Error?alert("Error: "+t.message):t instanceof r.UserCanceledEvent?setTimeout(()=>{alert(t.message+" Perhaps you can relax another time.")},1):alert(t)}}e.WaitIndicator=o,e.promise_waitIndicator_load=function(){new o(new a.DocumentWithButtonCentered("Click and breathe deeply..."),new r.WaitCancelableSimulated(i.WaitIndicatorText)).render()}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.WaitIndicatorText=void 0;e.WaitIndicatorText=class{constructor(t,e,n){this.inPlaceOfElement=t,this.waitMessageHTML=e,this.cancelCallback=n,this.inPlaceOfElementDisplayBeforeHide="block",this.indicatorPosition=0}createWaitElement(){const t=document.createElement("div");return t.appendChild(this.createWaitMessageElement()),this.cancelCallback&&t.appendChild(this.createWaitCancelElement()),t.appendChild(this.createWaitIndicatorElement()),this.waitElement=t,t}createWaitMessageElement(){const t=document.createElement("span");return t.innerHTML=this.waitMessageHTML,this.waitMessageElement=t,t}createWaitIndicatorElement(){const t=document.createElement("div");return t.style.width="100%",t.style.textAlign="center",t.innerHTML=this.getIndicatorHtml(),this.waitIndicatorElement=t,t}createWaitCancelElement(){const t=document.createElement("button");return t.innerText="Cancel",t.style.marginLeft="10px",t.onclick=t=>!!this.cancelCallback&&(this.cancelCallback(t),!0),t}show(){this.inPlaceOfElementDisplayBeforeHide=this.inPlaceOfElement.style.display,this.inPlaceOfElement.style.display="none";const t=this.inPlaceOfElement.parentNode;t&&t.insertBefore(this.createWaitElement(),this.inPlaceOfElement)}getIndicatorHtml(){switch(this.indicatorPosition){case 0:return"/";case 1:return"&mdash;";case 2:return"\\";case 3:return"|";default:return"?"}}progress(){this.waitIndicatorElement&&(this.indicatorPosition+=1,this.indicatorPosition>3&&(this.indicatorPosition=0),this.waitIndicatorElement.innerHTML=this.getIndicatorHtml())}hide(){this.inPlaceOfElement&&(this.inPlaceOfElement.style.display=this.inPlaceOfElementDisplayBeforeHide),this.waitElement&&this.waitElement.remove()}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.WaitCancelableSimulated=e.UserCanceledEvent=void 0;class i{constructor(t){this.message=t}}e.UserCanceledEvent=i;e.WaitCancelableSimulated=class{constructor(t,e=5e3,n=100){this.waitIndicatorConstructor=t,this.waitMilliseconds=e,this.indicatorUpdateIntervalMilliseconds=n}start(t,e){this.waitIndicator=new this.waitIndicatorConstructor(t,e,t=>{this.cancel(t)}),this.waitIndicator.show();const n=new Promise((t,e)=>{this.startResolve=t,this.startReject=e});return this.startWait(),this.startWaitProgressUpdater(),n}startWait(){const t=new Date;this.waitTimeout=setTimeout(()=>{this.startResolve&&this.startResolve(t)},this.waitMilliseconds)}startWaitProgressUpdater(){this.waitInterval=setInterval(()=>{var t;null===(t=this.waitIndicator)||void 0===t||t.progress()},this.indicatorUpdateIntervalMilliseconds)}cancel(t){window.clearTimeout(this.waitTimeout),this.end(),this.startReject&&this.startReject(new i(`You canceled it with a ${t.type}.`))}end(){var t;window.clearInterval(this.waitInterval),null===(t=this.waitIndicator)||void 0===t||t.hide()}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.CharacterIterator=void 0;e.CharacterIterator=class{constructor(t="",e=1){this.start=t,this.step=e,this.currentCharCode=0,t&&""!==t||(this.start=String.fromCharCode(0)),this.initializePointers()}initializePointers(){this.currentCharCode=this.getCharCode(this.start)}getCharCode(t){return t.charCodeAt(0)}next(){if(this.currentCharCode<=65535){const t={done:!1,value:{char:String.fromCharCode(this.currentCharCode),charCode:this.currentCharCode,step:this.step}};return this.currentCharCode+=this.step,t}return{done:!0,value:null}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=n(1),r=n(2);document.addEventListener("DOMContentLoaded",()=>{console.log("DOMContentLoaded");const t=new URLSearchParams(window.location.search);new r.ProjectManagerDefault(i.projectDemoData).loadProjectByKey(t.get("project"))})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.projectDemoSelector_load=e.ProjectDemoSelector=void 0;const i=n(1),r=n(2);class a{constructor(t){this.projectManager=t}render(){this.initializeBody(),this.initializeProjects()}initializeBody(){const t=document.createElement("h1");t.innerText="Project Demos",document.body.appendChild(t)}initializeProjects(){let t,e="";Object.values(this.projectManager.getProjects()).forEach(n=>{({currentTopicContent:e,currentListElement:t}=this.getListElement(n,e,t));const i=document.createElement("li");i.appendChild(this.getProjectDemoLinkElement(n));const r=document.createElement("span");r.innerText=" - ",i.appendChild(r),i.appendChild(this.getProjectCodeLinkElement(n)),t.appendChild(i)})}getProjectDemoLinkElement(t){const e=document.createElement("a");return e.href=t.path,e.target="_top",e.innerHTML=t.name,e}getProjectCodeLinkElement(t){const e=document.createElement("a");return e.href=t.codeURL,e.target="_blank",e.innerHTML="Code",e}getListElement(t,e,n){if(t.topic!==e){e=t.topic;const i=document.createElement("h2");i.innerHTML=t.topic,document.body.appendChild(i),n=document.createElement("ul"),document.body.appendChild(n)}return{currentTopicContent:e,currentListElement:n}}}e.ProjectDemoSelector=a,e.projectDemoSelector_load=function(){new a(new r.ProjectManagerDefault(i.projectDemoData)).render()}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.promise_waitIndicatorAsyncAwait_load=e.WaitIndicatorAsyncAwait=void 0;const i=n(4),r=n(5),a=n(0),o=n(3);class s extends o.WaitIndicator{constructor(t,e,n="Are you more relaxed and inspired?"){super(t,e,n)}async wait(t){try{const e=await this.waitLogic.start(t,"Await inspiration...");this.waitResolved(t.innerText,e)}catch(t){this.waitRejected(t)}finally{this.waitLogic.end()}}}e.WaitIndicatorAsyncAwait=s,e.promise_waitIndicatorAsyncAwait_load=function(){new s(new a.DocumentWithButtonCentered("Click, breathe deeply, and await relaxation..."),new r.WaitCancelableSimulated(i.WaitIndicatorText)).render()}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.iterator_basicIterator_load=e.PrintCharacterRange=void 0;const i=n(0),r=n(11),a=n(6),o=n(12);class s{constructor(t,e){this.document=t,this.charRange=e,this.charContainer=this.createCharacterContainer(),this.charPrinter=new o.CharacterPrinterWithNext(this.charContainer)}render(){document.body.style.flexDirection="row",this.document.button.onclick=()=>{this.printCharRange()}}printCharRange(){this.document.button.style.display="none";const t=this.charPrinter.printRange(this.charRange);this.charContainer.style.display="grid",this.initializeNextButton(t)}createCharacterContainer(){const t=document.createElement("div");return t.style.display="none",t.style.gridGap=".1em",t.style.width="50%",t.style.maxHeight="60%",t.style.overflowY="auto",t.style.overflowX="hidden",t.style.textAlign="center",t.style.marginTop="1em",t.style.gridTemplateColumns="repeat(auto-fit, minmax(2em, 1fr))",t.style.fontSize=".5em",document.body.appendChild(t),t}initializeNextButton(t){const e=this.createNextButton(t);e&&this.charContainer.insertAdjacentElement("beforebegin",e)}createNextButton(t){if(!t)return;const e=document.createElement("button");e.innerText="Print another 10";const n=new a.CharacterIterator(t.char,t.step);return n.next(),e.onclick=()=>{window.setTimeout(()=>{for(let t=0;t<10;t++){if(n.next().done){e.style.display="none";break}this.charPrinter.printNext(n.next())}},0)},e}}e.PrintCharacterRange=s,e.iterator_basicIterator_load=function(){new s(new i.DocumentWithButtonCentered("Print first 95 printable characters"),new r.CharacterRangeIterableIterator(" ","~",1)).render()}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.CharacterRangeIterableIterator=void 0;const i=n(6);class r{constructor(t,e,n=1){this.start=t,this.end=e,this.step=n,this.endCharCode=0,this.checkSwapStartAndEnd(),this.initializePointers(),this.characterIterator=new i.CharacterIterator(this.start,this.step)}initializePointers(){this.endCharCode=this.getCharCode(this.end)}getCharCode(t){return t.charCodeAt(0)}checkSwapStartAndEnd(){if(""===this.start&&(this.start=String.fromCharCode(0)),this.getCharCode(this.start)<=this.getCharCode(this.end))return;const t=this.start;this.start=this.end,this.end=t}next(){const t=this.characterIterator.next();return t.done||t.value.charCode<=this.endCharCode?t:{done:!0,value:null}}[Symbol.iterator](){return this}}e.CharacterRangeIterableIterator=r},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.CharacterPrinterWithNext=void 0;e.CharacterPrinterWithNext=class{constructor(t){this.container=t,this.printCount=0}print(t){if(!t)return null;const e=document.createElement("span");return e.innerHTML=`&#${t.charCode};`,this.container.appendChild(e),this.container.scrollTop=this.container.scrollHeight,this.printCount++,t}printRange(t){let e=null;for(const n of t)this.print(n),e=n;return e}printNext(t){return t.done?null:this.print(t.value)}}}]);