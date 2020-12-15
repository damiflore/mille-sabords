System.register(["./main.js"],(function(e,t){"use strict";var n,r,o,u,i,a,c,l,s;return{setters:[function(e){n=e.r,r=e._,o=e.a,u=e.b,i=e.c,a=e.d,c=e.e,l=e.f,s=e.s}],execute:function(){var f,d,v,m=window.requestIdleCallback?function(e){var t=window.requestIdleCallback(e,{timeout:400});return function(){window.cancelIdleCallback(t)}}:function(e){var t=window.requestAnimationFrame(e);return function(){window.cancelAnimationFrame(t)}},h=e("_",(function(e,t){if(null===e)return{};var n,r,o=function(e,t){if(null===e)return{};var n,r,o={},u=Object.keys(e);for(r=0;r<u.length;r++)n=u[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(e);for(r=0;r<u.length;r++)n=u[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o})),g=e("d",(function(e,t,n,r){return e.addEventListener(t,n,r),function(){e.removeEventListener(t,n,r)}})),p=function(e){return e.window===e},w=function(e){return 9===e.nodeType},y=(e("i",(function(e){if(1!==e.nodeType)return!1;var t=e.nodeName.toLowerCase();return"input"===t?"hidden"!==e.type&&y(e):["button","select","datalist","iframe","textarea"].indexOf(t)>-1||e.hasAttribute("tabindex")||e.hasAttribute("tabIndex")||e.hasAttribute("draggable")?y(e):["a","area"].indexOf(t)>-1?!1!==e.hasAttribute("href")&&y(e):["audio","video"].indexOf(t)>-1&&(!1!==e.hasAttribute("controls")&&y(e))})),function(e){if(b(e))return!0;if("hidden"===E(e,"visibility"))return!1;for(var t=e;t&&!b(t);){if("none"===E(t,"display"))return!1;t=t.parentNode}return!0}),b=e("a",(function(e){return e===e.ownerDocument.documentElement})),E=e("g",(function(e,t){return function(e){return k(e).getComputedStyle(e)}(e).getPropertyValue(t)})),k=function(e){return p(e)?e:w(e)?e.defaultView:A(e).defaultView},A=function(e){return p(e)?e.document:w(e)?e:e.ownerDocument},P=(e("c",(function(e){var t=k(e),n=A(e);return{x:t.pageXOffset||n.documentElement.scrollLeft,y:t.pageYOffset||n.documentElement.scrollTop}})),n.createContext()),O=function(e,t){return t(e)},C={},j=function(e){var t=e.children;return n.createElement(P.Provider,{value:n.useReducer(O,C)},t)},S=function(e){var t=n.useContext(P);if(!t)return[function(){},function(){}];var u=t[1],i=function(){u((function(t){if(!t.hasOwnProperty(e))return t;if("loading"!==t[e].status)return t;var n={};return Object.keys(t).forEach((function(r){r!==e&&(n[r]=t[r])})),n}))};return n.useEffect((function(){return u((function(t){return e in t?t:r(r({},t),{},o({},e,{status:"loading"}))})),function(){i()}}),[]),[function(){u((function(t){return e in t&&"loaded"===t[e].status?t:r(r({},t),{},o({},e,{status:"loaded"}))}))},i]},R=function(){var e=n.useContext(P);return e?e[0]:null},x=function(e,t){var n=g(e,"load",(function(){r(),t()})),r=g(e,"error",(function(){n(),t()}));return function(){n(),r()}},L=e("S",(function(e){var t=e.href,r=S(t),o=u(r,1)[0];return n.useEffect((function(){return I(t,{onload:o})}),[t]),null})),I=(f=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.onload,r=void 0===n?function(){}:n,o=document.createElement("link");o.rel="stylesheet",o.type="text/css";var u=x(o,r);return o.href=e,document.head.appendChild(o),function(){u(),document.head.removeChild(o)}},d=new Map,v=function(e){if(d.has(e)){var t=d.get(e),n=t.useCount,o=h(t,["useCount"]);n>1?d.set(e,r({useCount:n-1},o)):(d.delete(e),o.linkCleanup())}},function(e){if(d.has(e)){var t=d.get(e),n=t.useCount,o=h(t,["useCount"]);return d.set(e,r({useCount:n+1},o)),v}for(var u=arguments.length,i=new Array(u>1?u-1:0),a=1;a<u;a++)i[a-1]=arguments[a];var c=f.apply(void 0,[e].concat(i));return d.set(e,{useCount:1,linkCleanup:c}),v});function W(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var _=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},U=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)};var N=function(e,t){return!t||"object"!==i(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t};function F(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=U(e);if(t){var o=U(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return N(this,n)}}var M=function(){var e=n.useState(!1),t=u(e,2),r=t[0],o=t[1];return n.useEffect((function(){return m((function(){o(!0)}))}),[]),r},T=e("l",(function(e,t,n){return e.addEventListener(t,n),function(){e.removeEventListener(t,n)}}));function B(e,t,n){return n?t?t(e):e:(e&&e.then||(e=Promise.resolve(e)),t?e.then(t):e)}var V=window.navigator.serviceWorker;function D(e){return function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];try{return Promise.resolve(e.apply(this,t))}catch(e){return Promise.reject(e)}}}function Y(e,t,n){if(n)return t?t(e()):e();try{var r=Promise.resolve(e());return t?r.then(t):r}catch(e){return Promise.reject(e)}}function q(e,t){var n=e();return n&&n.then?n.then(t):t(n)}var H,z=Boolean(V),K=null,Q=null,G=(H=[],{listen:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.once,r=void 0!==n&&n;if(r){var o=e;e=function(){i(),o.apply(void 0,arguments)}}H=[].concat(a(H),[e]);var u=!1,i=function(){if(!u){u=!0;for(var t=[],n=H.length,r=!0;n--;){var o=H[n];r&&o===e?r=!1:t.push(o)}H=t}};return i},emit:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];H.forEach((function(e){e.apply(void 0,t)}))}}),X=function(e){Q&&Q===e?console.log("we already know this worker is updating"):(e?console.log("found a worker updating (worker state is: ".concat(e.state,")")):console.log("worker update is done"),Q=e,G.emit())},J=(e("s",(function(){return Boolean(K)})),e("e",(function(){return Q?{shouldBecomeNavigatorController:Boolean(V.controller),navigatorWillReload:$}:null})),e("f",(function(e){return G.listen(e)})),e("h",D((function(){return K?B(K,(function(e){return B(e.update(),(function(e){var t=e.installing;if(t)return console.log("installing worker found after calling update()"),X(t),!0;var n=e.waiting;return n?(console.log("waiting worker found after calling update()"),X(n),!0):(console.log("no worker found after calling update()"),!1)}))})):(console.warn("registerServiceWorker must be called before checkServiceWorkerUpdate can be used"),!1)}))),function(e){if(Q)return function(e,t){var n=new MessageChannel,r=n.port1,o=n.port2;return new Promise((function(n,u){r.onmessage=function(e){"rejected"===e.data.status?u(e.data.value):n(e.data.value)},e.postMessage(t,[o])}))}(Q,e);console.warn("no service worker updating to send message to")}),Z=(e("j",D((function(e){if(!Q)throw new Error("no service worker update to activate");return Z(Q,e)}))),D((function(e){var t=!1,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=n.onActivating,o=void 0===r?function(){}:r,u=n.onActivated,i=void 0===u?function(){}:u,a=n.onBecomesNavigatorController,c=void 0===a?function(){}:a,l=e.state,s=function(){return new Promise((function(t){var n=T(e,"statechange",(function(){"activating"===e.state&&o(),"activated"===e.state&&(i(),n(),t())}))}))};return q((function(){if("installed"===l||"activating"===l)return"installed"===l&&J({action:"skipWaiting"}),Y(s,(function(){if(V.controller)var e=T(V,"controllerchange",(function(){e(),c(),X(null),te()}));else X(null),te();t=!0}))}),(function(e){if(t)return e;c(),X(null),te()}))}))),$=!0,ee=!1,te=function(){ee||(ee=!0,window.location.reload())};if(z)T(V,"controllerchange",te);var ne=function(e,t){var n=new Image;return t&&(n.crossOrigin=t),new Promise((function(t,r){var o=function(e){re(n),r(e)};n.onload=function(e){re(n),t(e.target||e.srcElement)},n.onerror=o,n.onabort=o,n.src=e}))},re=function(e){e.onload=null,e.onerror=null,e.onabort=null;try{delete e.src}catch(e){}};function oe(e,t,n){return n?t?t(e):e:(e&&e.then||(e=Promise.resolve(e)),t?e.then(t):e)}function ue(e){return function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];try{return Promise.resolve(e.apply(this,t))}catch(e){return Promise.reject(e)}}}function ie(){}function ae(e,t){if(!t)return e&&e.then?e.then(ie):Promise.resolve()}function ce(e){var t=e();if(t&&t.then)return t.then(ie)}function le(e,t){try{var n=e()}catch(e){return t(e)}return n&&n.then?n.then(void 0,t):n}function se(e){if(e&&e.then)return e.then(ie)}var fe=ue((function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.chunkSize,r=void 0===n?7:n,o=t.msDelayBetweenChunks,u=void 0===o?2e3:o,i=0,a={},c={},l=ue((function(e){return oe(Promise.all(e.map(ue((function(e){return se(le((function(){return oe(ne(e),(function(t){a[e]=t}))}),(function(){c[e]=!0})))})))),(function(){return oe(new Promise((function(e){setTimeout(e,u)})),(function(){var e=s();return ce((function(){if(e.length>0)return ae(l(e))}))}))}))})),s=function(){for(var t=[],n=0;n<r&&i<e.length;)t.push(e[i]),n++,i++;return t};return oe(l(s()),(function(){return{loaded:a,failed:c}}))})),de=new URL(System.resolve("./assets/wood.jpg",t.meta.url),t.meta.url),ve=new URL(System.resolve("./assets/pirate-hook.png",t.meta.url),t.meta.url),me=new URL(System.resolve("./assets/pirate-hook-02.png",t.meta.url),t.meta.url),he=new URL(System.resolve("./assets/wood-box.jpg",t.meta.url),t.meta.url),ge=new URL(System.resolve("./assets/treasure-map.png",t.meta.url),t.meta.url),pe=new URL(System.resolve("./assets/witch-label.png",t.meta.url),t.meta.url),we=new URL(System.resolve("./assets/skull-bottle.png",t.meta.url),t.meta.url),ye=function(){var e=M();return n.useEffect((function(){e&&function(e){var t=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).scope;if(!z)return function(){};var n=!1,r=function(){},o=function(){};B(K=V.register(e,{scope:t}),(function(e){if(r=function(){e.unregister()},n)r();else{var t=e.installing;e.waiting,e.active,o=T(e,"updatefound",(function(){console.log("browser notifies use an worker is installing"),e.installing!==t?X(e.installing):console.log("it's not an worker update, it's first time worker registers")}))}}))}("/service-worker.js")}),[e]),e?n.createElement(be,null):null},be=function(){var e=[de,ve,me,he,ge,pe,we,c].concat(a(Object.keys(l).map((function(e){return l[e]}))));return n.useEffect((function(){var t=setTimeout((function(){return fe(e)}),2e3);return function(){clearTimeout(t)}}),[]),null};var Ee=e("b",Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e});var ke=new Map;var Ae="loading",Pe="loaded",Oe="failed",Ce=function(e){var t=ke.get(e),r=t?Pe:Ae,o=n.useState(r),i=u(o,2),a=i[0],c=i[1],l=n.useRef(!1);return n.useEffect((function(){return e&&a!==Pe?(l.current=!0,(t=function(){return function(e,t){try{var n=e()}catch(e){return t(e)}return n&&n.then?n.then(void 0,t):n}((function(){return t=ne(e),n=function(t){l.current&&(ke.set(e,t),c(Pe))},r?n?n(t):t:(t&&t.then||(t=Promise.resolve(t)),n?t.then(n):t);var t,n,r}),(function(){l.current&&(ke.delete(e),c(Oe))}))},function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(e){return Promise.reject(e)}})(),function(){l.current=!1}):function(){};var t}),[e,a]),[a,t]},je=function(e){var t=e.fallback,r=e.root,o=e.rootMargin,i=e.threshold,a=void 0===i?0:i,c=e.children,l=n.useState(!1),s=u(l,2),f=s[0],d=s[1],v=n.useState(null),m=u(v,2),h=m[0],g=m[1];return n.useEffect((function(){if(!h)return function(){};if(f)return function(){};var e=new window.IntersectionObserver((function(t){u(t,1)[0].isIntersecting?(e.unobserve(h),d(!0)):d(!1)}),{root:r,rootMargin:o,threshold:a});return e.observe(h),function(){e.disconnect()}}),[h,f]),f?n.createElement(n.Fragment,null,c):t({ref:g})},Se=e("I",(function(e){var t=e.loadWhenIntersecting,r=void 0===t||t,o=e.usePlaceholderWhileLoading,i=void 0===o||o,a=e.animateLoaded,c=void 0===a||a,l=e.intersectionRoot,s=e.intersectionRootMargin,f=e.intersectionThreshold,d=e.FallbackWhileNotIntersecting,v=void 0===d?Ie:d,m=e.FallbackWhileLoading,g=void 0===m?Le:m,p=e.useImageStatusHook,w=void 0===p?Ce:p,y=e.src,b=h(e,["loadWhenIntersecting","usePlaceholderWhileLoading","animateLoaded","intersectionRoot","intersectionRootMargin","intersectionThreshold","FallbackWhileNotIntersecting","FallbackWhileLoading","useImageStatusHook","src"]),E=w(y),k=u(E,1)[0],A=S(y),P=u(A,1)[0];n.useEffect((function(){"loaded"===k&&P()}),[k]);var O=n.createElement("img",Ee({src:y},b));if(c&&(O=n.createElement(Re,{status:k,src:y,imageProps:b})),i&&"loaded"!==k){var C=O;O=n.createElement(xe,{status:k,fallback:n.createElement(g,b)},C)}if(r&&"loaded"!==k){var j=O;O=n.createElement(je,{fallback:function(e){var t=e.ref;return n.createElement(v,Ee({ref:t},b))},root:l,rootMargin:s,threshold:f},j)}return O})),Re=function(e){var t=e.status,r=e.src,o=e.imageProps,u=n.useRef(!1),i=n.useRef(),a=n.useRef(t);return n.useLayoutEffect((function(){var e=u.current,n=i.current,r=a.current;if(u.current=!0,a.current=t,e&&r!==t&&"loaded"===t){var o=window.getComputedStyle(n).getPropertyValue("opacity");n.animate([{opacity:0},{opacity:o}],{duration:300})}}),[t,i]),n.createElement("img",Ee({ref:i,src:r},o))},xe=function(e){var t=e.fallback,n=e.status,r=e.children;return"loaded"!==n?t:r},Le=n.forwardRef((function(e,t){return n.createElement("img",Ee({src:We,ref:t},e))})),Ie=n.forwardRef((function(e,t){return n.createElement("img",Ee({src:We,ref:t},e))})),We="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";var _e=new URL(System.resolve("./assets/loadscreen.css",t.meta.url),t.meta.url);function Ue(){}var Ne=function(e){var r,o=n.useRef(),i=M(),a=n.useState(!1),c=u(a,2),l=c[0],f=c[1],d=n.useState(!1),v=u(d,2),h=v[0],g=v[1],p=n.useState(null),w=u(p,2),y=w[0],b=w[1],E=n.useState(!1),k=u(E,2),A=k[0],P=k[1],O=n.useState(!1),C=u(O,2),j=C[0],S=C[1],x=n.useState(),I=u(x,2)[1],W=(r=R(),Object.keys(r).length),_=function(){var e=R();return Object.keys(e).filter((function(t){return"loaded"===e[t].status})).length}();return n.useEffect((function(){i&&_===W&&f(!0)}),[i,_,W]),n.useEffect((function(){var e;l&&(window.splashscreen.remove(),g(!0),(e=function(){return function(e){if(e&&e.then)return e.then(Ue)}(function(e,t){try{var n=e()}catch(e){return t(e)}return n&&n.then?n.then(void 0,t):n}((function(){return e=t.import("./App.js"),n=function(e){g(!1),b(e),m((function(){P(!0)}))},r?n?n(e):e:(e&&e.then||(e=Promise.resolve(e)),n?e.then(n):e);var e,n,r}),(function(e){I((function(){throw e}))})))},function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];try{return Promise.resolve(e.apply(this,t))}catch(e){return Promise.reject(e)}})())}),[l]),n.useEffect((function(){A&&_===W&&S(!0)}),[A,_,W]),n.useEffect((function(){j&&o&&(o.current.animate([{opacity:1},{opacity:0}],{duration:300,fill:"forwards"}).onfinish=function(){o.current.style.display="none"})}),[o,j]),n.createElement(n.Fragment,null,y?n.createElement(y.App,e):null,n.createElement("div",{id:"loadscreen",ref:o},n.createElement(L,{href:_e}),n.createElement(Se,{src:s,animateLoaded:!1}),h?n.createElement("p",{className:"text"},"Chargement du jeu..."):n.createElement(n.Fragment,null,n.createElement("p",{className:"text"},"Chargement du jeu..."),n.createElement("div",{className:"progress"},_,"/",W))),j?n.createElement(ye,null):null)};var Fe,Me,Te=(Fe=function(e){return n.createElement(j,null,n.createElement(Ne,e))},Me=function(e){var t=e.error;return window.splashscreen.remove(),n.createElement("div",{style:{maxWidth:"100vw"}},n.createElement("div",{style:{margin:"10px 15px"}},"An error occured"),n.createElement("pre",{style:{overflow:"auto",margin:"10px 15px"}},"object"===i(t)?t.stack:t))},function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_(e,t)}(i,e);var t,r,o,u=F(i);function i(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),(t=u.call(this,e)).state={hasError:!1,error:null},t}return t=i,o=[{key:"getDerivedStateFromError",value:function(e){return{hasError:!0,error:e}}}],(r=[{key:"render",value:function(){return this.state.hasError?n.createElement(Me,{error:this.state.error}):n.createElement(Fe,this.props)}}])&&W(t.prototype,r),o&&W(t,o),i}(n.Component));e("m",Object.freeze({__proto__:null,Main:Te}))}}}));

//# sourceMappingURL=main.component-f1013a50.js.map