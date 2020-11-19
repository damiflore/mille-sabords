System.register(["./index.js"],(function(e,t){"use strict";var n,r,o,u,i,c,a,f,l;return{setters:[function(e){n=e.r,r=e._,o=e.a,u=e.b,i=e.c,c=e.d,a=e.e,f=e.f,l=e.s}],execute:function(){var s=e("d",System.resolve("./assets/card_default.png",t.meta.url)),d=window.requestIdleCallback?function(e){var t=window.requestIdleCallback(e,{timeout:400});return function(){window.cancelIdleCallback(t)}}:function(e){var t=window.requestAnimationFrame(e);return function(){window.cancelAnimationFrame(t)}},h=e("e",(function(e,t,n,r){return e.addEventListener(t,n,r),function(){e.removeEventListener(t,n,r)}})),m=function(e){return e.window===e},v=function(e){return 9===e.nodeType},p=(e("i",(function(e){if(1!==e.nodeType)return!1;var t=e.nodeName.toLowerCase();return"input"===t?"hidden"!==e.type&&p(e):["button","select","datalist","iframe","textarea"].indexOf(t)>-1||e.hasAttribute("tabindex")||e.hasAttribute("tabIndex")||e.hasAttribute("draggable")?p(e):["a","area"].indexOf(t)>-1?!1!==e.hasAttribute("href")&&p(e):["audio","video"].indexOf(t)>-1&&(!1!==e.hasAttribute("controls")&&p(e))})),function(e){if(g(e))return!0;if("hidden"===y(e,"visibility"))return!1;for(var t=e;t&&!g(t);){if("none"===y(t,"display"))return!1;t=t.parentNode}return!0}),g=e("a",(function(e){return e===e.ownerDocument.documentElement})),y=e("g",(function(e,t){return function(e){return b(e).getComputedStyle(e)}(e).getPropertyValue(t)})),b=function(e){return m(e)?e:v(e)?e.defaultView:E(e).defaultView},E=function(e){return m(e)?e.document:v(e)?e:e.ownerDocument},w=(e("c",(function(e){var t=b(e),n=E(e);return{x:t.pageXOffset||n.documentElement.scrollLeft,y:t.pageYOffset||n.documentElement.scrollTop}})),n.createContext()),A=function(e,t){return t(e)},O={},S=function(e){var t=e.children;return n.createElement(w.Provider,{value:n.useReducer(A,O)},t)},P=function(e){var t=n.useContext(w);if(!t)return function(){};var u=t[1];return n.useEffect((function(){u((function(t){return e in t?t:r(r({},t),{},o({},e,{status:"loading"}))}))}),[]),function(){u((function(t){return e in t&&"loaded"===t[e].status?t:r(r({},t),{},o({},e,{status:"loaded"}))}))}},j=function(){var e=n.useContext(w);return e?e[0]:null},k=function(e,t){var n=h(e,"load",(function(){r(),t()})),r=h(e,"error",(function(){n(),t()}));return function(){n(),r()}},R=e("S",(function(e){var t,r=e.href,o=(t=P(r),function(e){e&&k(e,t)});return u.createPortal(n.createElement("link",{href:r,ref:o,rel:"stylesheet",type:"text/css"}),document.head)}));function x(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var _=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},C=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)};var I=function(e,t){return!t||"object"!==i(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t};function L(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=C(e);if(t){var o=C(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return I(this,n)}}var F=System.resolve("./assets/wood.jpg",t.meta.url),T=System.resolve("./assets/pirate-hook.png",t.meta.url),W=System.resolve("./assets/pirate-hook-02.png",t.meta.url),D=System.resolve("./assets/wood-box.jpg",t.meta.url),M=System.resolve("./assets/treasure-map.png",t.meta.url),N=e("w",System.resolve("./assets/witch-label.png",t.meta.url)),V=System.resolve("./assets/skull-bottle.png",t.meta.url),B=function(e,t){var n=new Image;return t&&(n.crossOrigin=t),new Promise((function(t,r){var o=function(e){J(n),r(e)};n.onload=function(e){J(n),t(e.target||e.srcElement)},n.onerror=o,n.onabort=o,n.src=e}))},J=function(e){e.onload=null,e.onerror=null,e.onabort=null;try{delete e.src}catch(e){}};function U(e,t,n){return n?t?t(e):e:(e&&e.then||(e=Promise.resolve(e)),t?e.then(t):e)}function q(e){return function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];try{return Promise.resolve(e.apply(this,t))}catch(e){return Promise.reject(e)}}}function z(){}function H(e,t){if(!t)return e&&e.then?e.then(z):Promise.resolve()}function Y(e){var t=e();if(t&&t.then)return t.then(z)}function G(e,t){try{var n=e()}catch(e){return t(e)}return n&&n.then?n.then(void 0,t):n}function K(e){if(e&&e.then)return e.then(z)}var Q=q((function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.chunkSize,r=void 0===n?7:n,o=t.msDelayBetweenChunks,u=void 0===o?2e3:o,i=0,c={},a={},f=q((function(e){return U(Promise.all(e.map(q((function(e){return K(G((function(){return U(B(e),(function(t){c[e]=t}))}),(function(){a[e]=!0})))})))),(function(){return U(new Promise((function(e){setTimeout(e,u)})),(function(){var e=l();return Y((function(){if(e.length>0)return H(f(e))}))}))}))})),l=function(){for(var t=[],n=0;n<r&&i<e.length;)t.push(e[i]),n++,i++;return t};return U(f(l()),(function(){return{loaded:c,failed:a}}))})),X=function(){var e=[F,T,W,D,M,N,V,s].concat(c(Object.keys(a).map((function(e){return a[e]}))));return n.useEffect((function(){var t=setTimeout((function(){return Q(e)}),2e3);return function(){clearTimeout(t)}}),[]),null};var Z=e("b",Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}),$=e("_",(function(e,t){if(null===e)return{};var n,r,o=function(e,t){if(null===e)return{};var n,r,o={},u=Object.keys(e);for(r=0;r<u.length;r++)n=u[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(e);for(r=0;r<u.length;r++)n=u[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}));var ee=new Map;var te="loading",ne="loaded",re="failed",oe=function(e){var t=ee.get(e),r=t?ne:te,o=n.useState(r),u=f(o,2),i=u[0],c=u[1],a=n.useRef(!1);return n.useEffect((function(){return e&&i!==ne?(a.current=!0,(t=function(){return function(e,t){try{var n=e()}catch(e){return t(e)}return n&&n.then?n.then(void 0,t):n}((function(){return t=B(e),n=function(t){a.current&&(ee.set(e,t),c(ne))},r?n?n(t):t:(t&&t.then||(t=Promise.resolve(t)),n?t.then(n):t);var t,n,r}),(function(){a.current&&(ee.delete(e),c(re))}))},function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(e){return Promise.reject(e)}})(),function(){a.current=!1}):function(){};var t}),[e,i]),[i,t]},ue=function(e){var t=e.fallback,r=e.root,o=e.rootMargin,u=e.threshold,i=void 0===u?0:u,c=e.children,a=n.useState(!1),l=f(a,2),s=l[0],d=l[1],h=n.useState(null),m=f(h,2),v=m[0],p=m[1];return n.useEffect((function(){if(!v)return function(){};if(s)return function(){};var e=new window.IntersectionObserver((function(t){f(t,1)[0].isIntersecting?(e.unobserve(v),d(!0)):d(!1)}),{root:r,rootMargin:o,threshold:i});return e.observe(v),function(){e.disconnect()}}),[v,s]),s?n.createElement(n.Fragment,null,c):t({ref:p})},ie=e("I",(function(e){var t=e.loadWhenIntersecting,r=void 0===t||t,o=e.usePlaceholderWhileLoading,u=void 0===o||o,i=e.animateLoaded,c=void 0===i||i,a=e.intersectionRoot,l=e.intersectionRootMargin,s=e.intersectionThreshold,d=e.FallbackWhileNotIntersecting,h=void 0===d?le:d,m=e.FallbackWhileLoading,v=void 0===m?fe:m,p=e.src,g=$(e,["loadWhenIntersecting","usePlaceholderWhileLoading","animateLoaded","intersectionRoot","intersectionRootMargin","intersectionThreshold","FallbackWhileNotIntersecting","FallbackWhileLoading","src"]),y=oe(p),b=f(y,1)[0],E=P(p);n.useEffect((function(){"loaded"===b&&E()}),[b]);var w=n.createElement("img",Z({},g,{src:p}));if(c&&(w=n.createElement(ce,Z({},g,{src:p}))),u){var A=w;w=n.createElement(ae,{src:p,fallback:n.createElement(v,g)},A)}if(r){var O=w;w=n.createElement(ue,{fallback:function(e){var t=e.ref;return n.createElement(h,Z({ref:t},g))},root:a,rootMargin:l,threshold:s},O)}return w})),ce=function(e){var t=n.useRef(),r=n.useRef(),o=oe(e.src),u=f(o,1)[0];return n.useEffect((function(){r.current!==u&&"loaded"===u&&t.current.animate([{opacity:0},{opacity:1}],{duration:300,fill:"forwards"}),r.current=u}),[r,u,t]),n.createElement("img",Z({},e,{ref:t}))},ae=function(e){var t=e.fallback,n=e.src,r=e.children,o=oe(n);return"loaded"!==f(o,1)[0]?t:r},fe=n.forwardRef((function(e,t){return n.createElement("img",Z({src:se},e,{ref:t}))})),le=n.forwardRef((function(e,t){return n.createElement("img",Z({src:se},e,{ref:t}))})),se="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==",de=System.resolve("./assets/loadscreen.css",t.meta.url);var he=function(e){var r,o=n.useRef(),u=n.useState(!1),i=f(u,2),c=i[0],a=i[1],s=n.useState(!1),h=f(s,2),m=h[0],v=h[1],p=n.useState(!1),g=f(p,2),y=g[0],b=g[1],E=n.useState(null),w=f(E,2),A=w[0],O=w[1],S=n.useState(!1),P=f(S,2),k=P[0],x=P[1],_=n.useState(!1),C=f(_,2),I=C[0],L=C[1],F=n.useState(),T=f(F,2)[1],W=(r=j(),Object.keys(r).length),D=function(){var e=j();return Object.keys(e).filter((function(t){return"loaded"===e[t].status})).length}();return n.useEffect((function(){return d((function(){a(!0)}))}),[]),n.useEffect((function(){c&&D===W&&v(!0)}),[c,D,W]),n.useEffect((function(){var e;m&&(window.splashscreen.remove(),b(!0),(e=function(){return function(e){if(e&&e.then)return e.then(me)}(function(e,t){try{var n=e()}catch(e){return t(e)}return n&&n.then?n.then(void 0,t):n}((function(){return e=t.import("./App.js"),n=function(e){b(!1),O(e),d((function(){x(!0)}))},r?n?n(e):e:(e&&e.then||(e=Promise.resolve(e)),n?e.then(n):e);var e,n,r}),(function(e){T((function(){throw e}))})))},function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];try{return Promise.resolve(e.apply(this,t))}catch(e){return Promise.reject(e)}})())}),[m]),n.useEffect((function(){k&&D===W&&L(!0)}),[k,D,W]),n.useEffect((function(){I&&o&&(o.current.animate([{opacity:1},{opacity:0}],{duration:300,fill:"forwards"}).onfinish=function(){o.current.style.display="none"})}),[o,I]),n.createElement(n.Fragment,null,A?n.createElement(A.App,e):null,n.createElement("div",{id:"loadscreen",ref:o},n.createElement(R,{href:de}),n.createElement(ie,{src:l,animateLoaded:!1}),y?n.createElement("p",null,"Chargement du jeu"):n.createElement("p",null,"Chargement de fichiers (",D,"/",W,")")),I?n.createElement(X,null):null)};function me(){}var ve,pe,ge=(ve=function(e){return n.createElement(S,null,n.createElement(he,e))},pe=function(e){var t=e.error;return window.splashscreen.remove(),n.createElement("div",null,"An error occured",n.createElement("pre",null,"object"===i(t)?t.stack:t))},function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_(e,t)}(i,e);var t,r,o,u=L(i);function i(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),(t=u.call(this,e)).state={hasError:!1,error:null},t}return t=i,o=[{key:"getDerivedStateFromError",value:function(e){return{hasError:!0,error:e}}}],(r=[{key:"render",value:function(){return this.state.hasError?n.createElement(pe,{error:this.state.error}):n.createElement(ve,this.props)}}])&&x(t.prototype,r),o&&x(t,o),i}(n.Component));e("m",Object.freeze({__proto__:null,Main:ge}))}}}));

//# sourceMappingURL=main.component-07aca83a.js.map