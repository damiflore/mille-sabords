System.register([__v__("/mille-sabords/js/babel_helpers.es5.js")],(function(e,r){"use strict";var t,n,o,s;function a(e,r,t){return t?r?r(e):e:(e&&e.then||(e=Promise.resolve(e)),r?e.then(r):e)}function i(e){return function(){for(var r=[],t=0;t<arguments.length;t++)r[t]=arguments[t];try{return Promise.resolve(e.apply(this,r))}catch(e){return Promise.reject(e)}}}function InlineContent(e,r){let{type:t="text/plain"}=r;this.text=e,this.type=t}return{setters:[function(e){}],execute:function(){t=new InlineContent("@font-face{font-family:ArrrMateyBb;src:url("+__v__("/mille-sabords/other/arrr_matey_bb_wn3.ttf")+");font-display:swap}#splashscreen{font-family:ArrrMateyBb;font-size:50px}",{type:"text/css"}),(n=new CSSStyleSheet).replaceSync(t.text),e("loadApp",i((function(e){let{appNode:t}=e;performance.measure("loading app"),document.adoptedStyleSheets=[...document.adoptedStyleSheets,n];const i=o(),c=s(new URL(__v__("/mille-sabords/css/app.css"),r.meta.url));return a(i,(function(e){return performance.measure("rendering app"),a(e.createMilleSabordGame({into:t,onLoadProgress:()=>{}}),(function(){return performance.measure("app rendered"),a(Promise.all([c,new Promise((e=>{window.requestIdleCallback?window.requestIdleCallback(e,{timeout:60}):window.requestAnimationFrame(e)}))]),(function(){performance.measure("app displayed")}))}))}))}))),o=i((function(){return a(r.import(__v__("/mille-sabords/js/app.es5.js")).then((function(e){return e.am})),(function(e){return performance.measure("app.js ready"),e}))})),s=function(e){try{const r=arguments;let{crossOrigin:t}=r.length>1&&void 0!==r[1]?r[1]:{};return a(new Promise(((r,n)=>{const o=document.createElement("link");o.rel="stylesheet",o.onload=r,o.onerror=n,o.href=e,o.crossOrigin=t,document.head.appendChild(o)})),(function(){performance.measure("app.css ready")}))}catch(e){return Promise.reject(e)}}}}}));