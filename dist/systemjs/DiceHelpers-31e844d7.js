System.register([],(function(e){"use strict";return{execute:function(){e("_",t);var r=function(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e};function t(e){for(var t=1;t<arguments.length;t++){var o=null===arguments[t]?{}:arguments[t];t%2?n(Object(o),!0).forEach((function(t){r(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):n(Object(o)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(o,r))}))}return e}function n(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}var o=e("a","coin"),i=e("b","diamond"),c=e("c","sword"),u=e("d","parrot"),s=e("e","monkey"),b=e("S","skull"),l=(e("g",(function(){return y.map((function(e){return t({},e)}))})),{x:0,y:0}),y=[t({},l,{id:1,symbol:o}),t({},l,{id:2,symbol:i}),t({},l,{id:3,symbol:c}),t({},l,{id:4,symbol:u}),t({},l,{id:5,symbol:s}),t({},l,{id:6,symbol:b}),t({},l,{id:7,symbol:b}),t({},l,{id:8,symbol:b})];e("s",(function(e){var r=[],t=[];return e.forEach((function(e){e.symbol===b?t.push(e):r.push(e)})),{withoutSkulls:r,skulls:t}}))}}}));
//# sourceMappingURL=DiceHelpers-31e844d7.js.map
