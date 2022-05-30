System.register([],(function(e,t){"use strict";var n,r,o,c,i,a,u,s;function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=new Array(t),r=0;r<t;r++)n[r]=e[r];return n}function d(e,t){if(e){if("string"==typeof e)return f(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}return e("_",(function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e})),{setters:[],execute:function(){!function(){if("undefined"!=typeof document&&!("adoptedStyleSheets"in document)){var e,t="ShadyCSS"in window&&!ShadyCSS.nativeShadow,n=document.implementation.createHTMLDocument(""),r=new WeakMap,o="object"==typeof DOMException?Error:DOMException,c=Object.defineProperty,i=Array.prototype.forEach,a=((e=n.createElement("style")).textContent='.x{content:"y"}',n.body.appendChild(e),'"y"'!==e.sheet.cssRules[0].style.content),u=[/content:\s*["']/gm],s=[/(content:\s*["'])%%%/gm],l=a?function(e){return s.reduce((function(e,t){return e.replace(t,"$1")}),e.cssText)}:function(e){return e.cssText},f=/@import.+?;?$/gm,d=CSSStyleSheet.prototype;d.replace=function(){return Promise.reject(new o("Can't call replace on non-constructed CSSStyleSheets."))},d.replaceSync=function(){throw new o("Failed to execute 'replaceSync' on 'CSSStyleSheet': Can't call replaceSync on non-constructed CSSStyleSheets.")};var y=new WeakMap,p=new WeakMap,h=new WeakMap,m=I.prototype;m.replace=function(e){try{return this.replaceSync(e),Promise.resolve(this)}catch(e){return Promise.reject(e)}},m.replaceSync=function(e){if(D(this),"string"==typeof e){var t=this,n=y.get(t).ownerNode;n.textContent=a?j(R(e)):R(e),y.set(t,n.sheet),p.get(t).forEach((function(e){e.isConnected()&&A(t,T(t,e))}))}},c(m,"cssRules",{configurable:!0,enumerable:!0,get:function(){return D(this),y.get(this).cssRules}}),["addRule","deleteRule","insertRule","removeRule"].forEach((function(e){m[e]=function(){var t=this;D(t);var n=arguments;p.get(t).forEach((function(r){if(r.isConnected()){var o=T(t,r).sheet;o[e].apply(o,n)}})),a&&("insertRule"===e&&(n[0]=j(n[0])),"addRule"===e&&(n[1]=j(n[1])));var r=y.get(t);return r[e].apply(r,n)}})),c(I,Symbol.hasInstance,{configurable:!0,value:M});var S={childList:!0,subtree:!0},b=new WeakMap,g=new WeakMap,v=new WeakMap,w=new WeakMap;if($.prototype={isConnected:function(){var e=g.get(this);return e instanceof Document?"loading"!==e.readyState:function(e){return"isConnected"in e?e.isConnected:document.contains(e)}(e.host)},connect:function(){var e=N(this);w.get(this).observe(e,S),v.get(this).length>0&&L(this),W(e,(function(e){F(e).connect()}))},disconnect:function(){w.get(this).disconnect()},update:function(e){var t=this,n=g.get(t)===document?"Document":"ShadowRoot";if(!Array.isArray(e))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+n+": Iterator getter is not callable.");if(!e.every(M))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+n+": Failed to convert value to 'CSSStyleSheet'");if(e.some(x))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+n+": Can't adopt non-constructed stylesheets");t.sheets=e;var r,o,c=v.get(t),i=(r=e).filter((function(e,t){return r.indexOf(e)===t}));(o=i,c.filter((function(e){return-1===o.indexOf(e)}))).forEach((function(e){var n;(n=T(e,t)).parentNode.removeChild(n),function(e,t){h.get(e).delete(t),p.set(e,p.get(e).filter((function(e){return e!==t})))}(e,t)})),v.set(t,i),t.isConnected()&&i.length>0&&L(t)}},window.CSSStyleSheet=I,k(Document),"ShadowRoot"in window){k(ShadowRoot);var O=Element.prototype,E=O.attachShadow;O.attachShadow=function(e){var t=E.call(this,e);return"closed"===e.mode&&r.set(this,t),t}}var C=F(document);C.isConnected()?C.connect():document.addEventListener("DOMContentLoaded",C.connect.bind(C))}function j(e){return u.reduce((function(e,t){return e.replace(t,"$&%%%")}),e)}function R(e){var t=e.replace(f,"");return t!==e&&console.warn("@import rules are not allowed here. See https://github.com/WICG/construct-stylesheets/issues/119#issuecomment-588352418"),t.trim()}function P(e){return e.shadowRoot||r.get(e)}function M(e){return"object"==typeof e&&(m.isPrototypeOf(e)||d.isPrototypeOf(e))}function x(e){return"object"==typeof e&&d.isPrototypeOf(e)}function T(e,t){return h.get(e).get(t)}function A(e,t){requestAnimationFrame((function(){var n,r;!function(e){for(var t=0;t<e.cssRules.length;t++)e.deleteRule(0)}(t.sheet),n=y.get(e),r=t.sheet,i.call(n.cssRules,(function(e,t){r.insertRule(l(e),t)}))}))}function D(e){if(!y.has(e))throw new TypeError("Illegal invocation")}function I(){var e=this,t=document.createElement("style");n.body.appendChild(t),y.set(e,t.sheet),p.set(e,[]),h.set(e,new WeakMap)}function F(e){var t=b.get(e);return t||(t=new $(e),b.set(e,t)),t}function k(e){c(e.prototype,"adoptedStyleSheets",{configurable:!0,enumerable:!0,get:function(){return F(this).sheets},set:function(e){F(this).update(e)}})}function W(e,t){for(var n=document.createNodeIterator(e,NodeFilter.SHOW_ELEMENT,(function(e){return P(e)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}),null,!1),r=void 0;r=n.nextNode();)t(P(r))}function N(e){var t=g.get(e);return t instanceof Document?t.body:t}function L(e){var t=document.createDocumentFragment(),n=v.get(e),r=w.get(e),o=N(e);r.disconnect(),n.forEach((function(n){t.appendChild(T(n,e)||function(e,t){var n=document.createElement("style");return h.get(e).set(t,n),p.get(e).push(t),n}(n,e))})),o.insertBefore(t,null),r.observe(o,S),n.forEach((function(t){A(t,T(t,e))}))}function $(e){var n=this;n.sheets=[],g.set(n,e),v.set(n,[]),w.set(n,new MutationObserver((function(e,r){document?e.forEach((function(e){t||i.call(e.addedNodes,(function(e){e instanceof Element&&W(e,(function(e){F(e).connect()}))})),i.call(e.removedNodes,(function(e){e instanceof Element&&(function(e,t){return t instanceof HTMLStyleElement&&v.get(e).some((function(t){return T(t,e)}))}(n,e)&&L(n),t||W(e,(function(e){F(e).disconnect()})))}))})):r.disconnect()})))}}(),n=(e,t,n)=>(t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e),r=(e,t)=>{if(null===e)return{};var n,r,o={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(o[n]=e[n]);return o},e("a",((e,t)=>{if(null===e)return{};var n,o,c=r(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(c[n]=e[n])}return c})),o=e=>{if(Array.isArray(e))return f(e)},c=()=>{throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e("d",(e=>o(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||d(e)||c())),i=e=>{if(Array.isArray(e))return e},a=()=>{throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e("c",((e,t)=>i(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c=[],i=!0,a=!1;try{for(n=n.call(e);!(i=(r=n.next()).done)&&(c.push(r.value),!t||c.length!==t);i=!0);}catch(e){a=!0,o=e}finally{try{i||null==n.return||n.return()}finally{if(a)throw o}}return c}}(e,t)||d(e,t)||a())),u=e=>typeof e,s=e=>e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e,e("b","function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?u:s)}}}));