System.register([],(function(e,t){"use strict";return{execute:function(){const a=!1,n=async(e,{timeout:t=1e3,onCssReady:a=(()=>{}),onFontsReady:n=(()=>{})}={})=>{const o=(async()=>{try{await s(e),a(),n&&(await document.fonts.ready,n())}catch(e){return}})();return Promise.race([o,new Promise((e=>{setTimeout(e,t)}))])},s=(e,{crossOrigin:t}={})=>new Promise(((a,n)=>{const s=document.createElement("link");s.rel="stylesheet",s.onload=a,s.onerror=n,s.href=e,s.crossOrigin=t,document.head.appendChild(s)})),o=window.requestIdleCallback?({timeout:e=60}={})=>new Promise((t=>{window.requestIdleCallback(t,{timeout:e})})):()=>new Promise((e=>{window.requestAnimationFrame(e)})),r=(e("loadApp",(async({updateSplashscreenText:e})=>{const s=n(new URL(System.resolve("./assets/app_loader.css",t.meta.url)),{timeout:400,onCssReady:()=>{a},onFontsReady:()=>{a}}),i=r({onJsReady:()=>{}}),c=n(new URL(System.resolve("./assets/app.css",t.meta.url)),{onCssReady:()=>{a}});await s;const d=await i;await d.createMilleSabordGame({into:document.querySelector("#app"),onLoadProgress:({loadedCount:t,total:a})=>{e(`\n  Chargement du jeu...\n  <div>${t}/${a}</div>\n`)}}),await c,await o()})),async({onJsReady:e=(()=>{})})=>{const a=await t.import("./app.js").then((e=>e.ao));return e(),a})}}}));

//# sourceMappingURL=app_loader_6effbb01.js.map