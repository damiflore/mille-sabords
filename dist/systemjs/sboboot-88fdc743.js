System.register([],(function(e,t){"use strict";return{execute:function(){try{var e,n,r,o,i,u=function(){},c=function(e,t){if(!t)return e&&e.then?e.then(u):Promise.resolve()},s=function(e,t,n){return n?t?t(e):e:(e&&e.then||(e=Promise.resolve(e)),t?e.then(t):e)},a=function(e){return function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];try{return Promise.resolve(e.apply(this,t))}catch(e){return Promise.reject(e)}}};e=document.querySelector("#app"),n=document.querySelector("#splashscreen"),r=a((function(){var r=Date.now(),i=!1,u=a((function(){return n.setAttribute("data-splashout",""),c(new Promise((function(e){setTimeout((function(){i=!1,e()}),300)})))})),f=function(){n.style.display="none",i=!1},l=setTimeout((function(){n.setAttribute("data-splashin",""),i=!0}),300),h=setTimeout((function(){o("booting_is_slow")}),2500);return function(e,t){try{var n=e()}catch(e){return t(e)}return n&&n.then?n.then(void 0,t):n}((function(){return o("booting_start"),s(t.import("./app_loadapp_loader.js"),(function(t){return s((0,t.loadApp)({updateSplashscreenText:function(e){clearTimeout(h),document.querySelector("#splashscreen_message").innerHTML=e}}),(function(){if(clearTimeout(l),clearTimeout(h),!i)return e.removeAttribute("data-booting"),void f();var t,n,o=r+300,s=Date.now()-o;return t=function(){return e.removeAttribute("data-booting"),function(e,t,n){try{var r=Promise.resolve(e());return t?r.then(t):r}catch(e){return Promise.reject(e)}}(u,(function(){f()}))},(n=function(){if(s<650){var e=650-s;return c(new Promise((function(t){setTimeout(t,e)})))}}())&&n.then?n.then(t):t()}))}))}),(function(e){throw clearTimeout(h),o("booting_error",{errorStack:e.stack||"<No stack associated with this error> (Check devtools to get more info)"}),e}))})),o=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=document.querySelector("#splashscreen_message");n.innerHTML="";var r=document.querySelector("#".concat(e)),o=r.cloneNode(!0);i(o,t),n.appendChild(o)},i=function e(t,n){"#text"!==t.nodeName?Array.from(t.childNodes).forEach((function(t){e(t,n)})):t.textContent=t.textContent.replace(/\${(\w*)}/g,(function(e,t){return n.hasOwnProperty(t)?n[t]:""}))};var f=window.browserIsSupported;return l=f&&r(),h=function(e){},!f?h?h(l):l:(l&&l.then||(l=Promise.resolve(l)),h?l.then(h):l)}catch(e){return Promise.reject(e)}var l,h}}}));
//# sourceMappingURL=sboboot-88fdc743.js.map