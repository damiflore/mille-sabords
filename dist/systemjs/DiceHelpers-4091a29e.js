System.register([],(function(e){"use strict";return{execute:function(){e("_",t);var r=function(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e};function t(e){for(var t=1;t<arguments.length;t++){var o=null===arguments[t]?{}:arguments[t];t%2?n(Object(o),!0).forEach((function(t){r(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):n(Object(o)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(o,r))}))}return e}function n(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}var o=e("a","coin"),i=e("b","diamond"),c=e("c","sword"),u=e("d","parrot"),s=e("e","monkey"),l=e("S","skull"),b={x:0,y:0},y=[t({},b,{id:1,symbol:o}),t({},b,{id:2,symbol:i}),t({},b,{id:3,symbol:c}),t({},b,{id:4,symbol:u}),t({},b,{id:5,symbol:s}),t({},b,{id:6,symbol:l}),t({},b,{id:7,symbol:l}),t({},b,{id:8,symbol:l})],f=e("s",(function(e){var r=[],t=[];return e.forEach((function(e){e.symbol===l?t.push(e):r.push(e)})),{withoutSkulls:r,skulls:t}}));e("D",Object.freeze({__proto__:null,getDiceArray:function(){return y.map((function(e){return t({},e)}))},splitSkulls:f}))}}}));
//# sourceMappingURL=DiceHelpers-4091a29e.js.map
