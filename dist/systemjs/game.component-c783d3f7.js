System.register(["./index-89543370.js"],(function(e){"use strict";var n,t,r,o,c,i,l,a,u,d,s,f,v,m,p,h,g,E,b,y,k,x,C,w,N,O,S,M,A,D,I,R,F,T,P,K,L,_,j,q,B,U,W,z,H,V;return{setters:[function(e){n=e.r,t=e._,r=e.i,o=e.T,c=e.a,i=e.b,l=e.c,a=e.F,u=e.d,d=e.S,s=e.e,f=e.f,v=e.g,m=e.h,p=e.j,h=e.k,g=e.l,E=e.m,b=e.s,y=e.u,k=e.n,x=e.o,C=e.p,w=e.q,N=e.t,O=e.v,S=e.w,M=e.x,A=e.y,D=e.z,I=e.A,R=e.B,F=e.C,T=e.D,P=e.E,K=e.G,L=e.H,_=e.I,j=e.J,q=e.K,B=e.L,U=e.M,W=e.N,z=e.O,H=e.P,V=e.Q}],execute:function(){var G=n.useEffect,J=n.useRef,Q=function(e,n){var r=J(!1);G((function(){!1===r.current&&(r.current=!0)}));var o=J(n);return G((function(){o.current=n}),n),!!r.current&&Boolean(e.apply(void 0,t(o.current)))},Y=function(e){var n=e.card,g=e.symbolsFromDicesKept,E=e.scoreMarked,b=e.markScoreAllowed;return r(n)?E||b?X(g,{goal:o.numberOfSwords,gamble:o.gambleAmount}):-o.gambleAmount:c(n)?E||b?X(g,{goal:i.numberOfSwords,gamble:i.gambleAmount}):-i.gambleAmount:l(n)?E||b?X(g,{goal:a.numberOfSwords,gamble:a.gambleAmount}):-a.gambleAmount:u(n)?$(g.map((function(e){return e===d?s:e}))):f(n)?2*$(g):v(n)?$([].concat(t(g),[m]),9):p(n)?$([].concat(t(g),[h]),9):$(g)},X=function(e,n){var t=n.goal,r=n.gamble;return Z(e,g)>=t?$(e)+r:-r},Z=function(e,n){return e.filter((function(e){return e===n})).length},$=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:8,t=0,r=0,o=ee(e);return Object.values(o).forEach((function(e){3===e&&(t+=100),4===e&&(t+=200),5===e&&(t+=500),6===e&&(t+=1e3),7===e&&(t+=2e3),8===e&&(t+=4e3),e>2&&(r+=e)})),e.forEach((function(e){e===h&&(t+=100,o[h]<3&&(r+=1)),e===m&&(t+=100,o[m]<3&&(r+=1))})),r===n&&(t+=500),t},ee=function(e){var n={};return e.forEach((function(e){n.hasOwnProperty(e)?n[e]++:n[e]=1})),n},ne=n.useMemo,te=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.rollCount,t=void 0===n?y():n;return 0===t},re=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.rollCount,t=void 0===n?y():n;return t>1},oe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.currentCard,t=void 0===n?w():n;return v(t)?[m]:p(t)?[h]:A(t)?[D]:I(t)?[D,D]:[]},ce=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.dicesKept,t=void 0===n?R():n;return t.map((function(e){return M(e)}))},ie=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.skullCountInCursedArea,t=void 0===n?se():n;return 3-t},le=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.dicesToCurse,t=void 0===n?ae():n;return t.length>0},ae=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.dicesRolled,t=void 0===n?k():n,r=e.witchUncursedDiceId,o=void 0===r?x():r,c=e.remainingSpotInCursedArea,i=void 0===c?ie():c;return t.filter((function(e){return E(e)&&e.id!==o})).slice(0,i)},ue=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.currentCard,t=void 0===n?w():n,r=e.hasNeverRolled,o=void 0===r?te():r,c=e.dicesRolled,i=void 0===c?k():c,l=e.scoreMarked,a=void 0===l?O():l,u=e.threeSkullsOrMoreInCursedArea,d=void 0===u?de():u,s=e.hasDicesToCurse,f=void 0===s?le():s;return!!t&&(!a&&(!!o||!d&&(!f&&!(i.length<2))))},de=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.skullCountInCursedArea,t=void 0===n?se():n;return t>2},se=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.dicesCursed,t=void 0===n?C():n,r=e.symbolsFromCard,o=void 0===r?oe():r;return t.length+o.filter((function(e){return b(e)})).length},fe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.hasRolledMoreThanOnce,t=void 0===n?re():n,r=e.scoreMarked,o=void 0===r?O():r,c=e.currentCard,i=void 0===c?w():c,l=e.threeSkullsOrMoreInCursedArea,a=void 0===l?de():l,u=e.hasDicesToCurse,d=void 0===u?le():u;return!o&&(a?!(!S(i)||!t):!d)},ve=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.currentCard,t=void 0===n?w():n,r=e.symbolsFromDicesKept,o=void 0===r?ce():r,c=e.scoreMarked,i=void 0===c?O():c,l=e.markScoreAllowed,a=void 0===l?fe():l;return ne((function(){return Y({card:t,symbolsFromDicesKept:o,scoreMarked:i,markScoreAllowed:a})}),[t,o,i,a])},me=F((function(e,n){var t=e.totalScore;return T({},e,{totalScore:Math.max(t+n,0),scoreMarked:!0})})),pe=F((function(e){return T({},e,{isOnSkullIsland:!0})})),he=F((function(e,n){var r=e.dicesRolled,o=e.dicesCursed;return T({},e,{dicesRolled:r.filter((function(e){return e.id!==n.id})),dicesCursed:[].concat(t(o),[n])})})),ge=F((function(e,n){var r=e.dicesRolled,o=e.dicesCursed;return T({},e,{witchUncursedDiceId:n.id,dicesRolled:[].concat(t(r),[n]),dicesCursed:o.filter((function(e){return e.id!==n.id}))})})),Ee=F((function(e,n){var r=e.dicesRolled,o=e.dicesKept;return T({},e,{dicesRolled:[].concat(t(r),[n]),dicesKept:o.filter((function(e){return e.id!==n.id}))})})),be=F((function(e,n){var r=e.dicesRolled,o=e.dicesKept;return T({},e,{dicesRolled:r.filter((function(e){return e.id!==n.id})),dicesKept:[].concat(t(o),[n])})})),ye=n.useEffect,ke=function(){return xe(),null},xe=function(){Ce(),we(),Ne()},Ce=function(){var e=ae(),n=he();ye((function(){if(0===e.length)return function(){};var t=setTimeout((function(){e.forEach((function(e){n(e)}))}),1e3);return function(){clearTimeout(t)}}),[e])},we=function(){var e=w(),n=O(),t=me(),r=de(),o=Q((function(e){return!e&&r}),[r]),c=ve(),i=K(e);ye((function(){i&&!n&&o&&t(c)}),[i,n,o,c])},Ne=function(){var e=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.rollCount,t=void 0===n?y():n;return 1===t}(),n=w(),t=P(),r=se(),o=pe();ye((function(){e&&(t||K(n)||r<4||o())}),[e,t,n,r])},Oe=function(){return n.createElement("div",{style:{display:"none"}},n.createElement("img",{src:"src/skull-island/witch-label.png"}),n.createElement("img",{src:"src/dice-kept/pirate-hook.png",v:!0}))},Se=function(e,n){return!(e.right<=n.left)&&(!(e.left>=n.right)&&(!(e.bottom<=n.top)&&!(e.top>=n.bottom)))},Me=function(e){var t=e.dice,r=e.disabled,o=e.onClickAction,c=e.specificStyle,i=E(t);return n.createElement("button",{disabled:r,"data-dice-id":t.id,ref:L(t.id),onClick:function(){return o(t)},className:"dice",style:T({width:50,height:50,background:i?"black":"#fcfcfc",color:i?"black":"#fcfcfc",borderColor:i?"black":"#b9b9b9"},c)},n.createElement("img",{src:"src/dices/dice_".concat(M(t),".png"),style:{width:"100%",height:"100%"}}))},Ae=function(){var e=k(),t=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.scoreMarked,t=void 0===n?O():n,r=e.threeSkullsOrMoreInCursedArea,o=void 0===r?de():r;return!t&&!o}(),r=be();return n.createElement("div",{className:"dice-ongoing"},n.createElement("div",{className:"map"}),n.createElement("div",{className:"area",ref:_()},e.map((function(e){return n.createElement(Me,{key:e.id,dice:e,disabled:!!E(e)||!t,onClickAction:function(e){r(e)},specificStyle:{left:"".concat(e.x,"px"),top:"".concat(e.y,"px"),transform:"rotate(".concat(e.rotation,"deg)"),position:"absolute"}})}))))},De=function(){var e=w();return n.createElement("div",{className:"score-area"},e?n.createElement(Ie,null):null)},Ie=function(){var e=ve(),t=w();return n.createElement(n.Fragment,null,n.createElement("div",{className:"bonds"}),f(t)?n.createElement(Re,null):null,n.createElement("div",{className:"round-score"},e))},Re=function(){return n.createElement("div",{className:"pirate-hook"})},Fe=function(){var e=w(),t=R(),r=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.scoreMarked,t=void 0===n?O():n,r=e.threeSkullsOrMoreInCursedArea,o=void 0===r?de():r;return!t&&!o}(),o=Ee();return n.createElement("div",{className:"dice-kept"},n.createElement("div",{className:"dice-area"},n.createElement("div",{className:"box"},v(e)?n.createElement(Te,{card:e}):null,p(e)?n.createElement(Pe,{card:e}):null,t.map((function(e){return n.createElement(Me,{key:e.id,dice:e,disabled:!r,onClickAction:function(e){o(e)},specificStyle:{margin:"5px"}})}))),n.createElement("div",{className:"top-left-corner"}),n.createElement("div",{className:"top-right-corner"}),n.createElement("div",{className:"bottom-left-corner"}),n.createElement("div",{className:"bottom-right-corner"}),n.createElement(Ke,null)),n.createElement(De,null))},Te=function(e){var t=e.card;return n.createElement("button",{className:"dice",style:{width:50,height:50,color:"#fcfcfc",margin:"5px",backgroundColor:j[t].color1,borderColor:j[t].color2,borderWidth:"2px",borderStyle:"solid"}},n.createElement("img",{src:"src/dices/dice_coin.png",style:{width:"100%",height:"100%"}}))},Pe=function(e){var t=e.card;return n.createElement("button",{className:"dice",style:{width:50,height:50,color:"#fcfcfc",margin:"5px",backgroundColor:j[t].color1,borderColor:j[t].color2,borderWidth:"2px",borderStyle:"solid"}},n.createElement("img",{src:"src/dices/dice_diamond.png",style:{width:"100%",height:"100%"}}))},Ke=function(){return de()?n.createElement("div",{className:"cursed-cover"},n.createElement("img",{src:"src/dice-kept/cursed-cover.png",alt:"cursed-cover"})):null},Le=F((function(e){var n=e.cardDeck,r=e.cardsUsed,o=n[0];return T({},e,{cardDeck:n.slice(1),cardsUsed:[].concat(t(r),[o]),currentCard:o})})),_e=F((function(e){var n=e.cardsUsed;return T({},e,{cardsUsed:[],cardDeck:q(n)})}));var je=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},qe=function(e){var t=e.href,r=e.children;return t?B.createPortal(n.createElement("link",{href:t,rel:"stylesheet",type:"text/css"}),document.head):B.createPortal(n.createElement("style",{type:"text/css"},r),document.head)},Be=function(e,n){if(null===e)return{};var t,r,o=function(e,n){if(null===e)return{};var t,r,o={},c=Object.keys(e);for(r=0;r<c.length;r++)t=c[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)t=c[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o},Ue=function(e){return e.window===e},We=function(e){return 9===e.nodeType},ze=function(e){if(1!==e.nodeType)return!1;var n=e.nodeName.toLowerCase();return"input"===n?"hidden"!==e.type&&He(e):["button","select","datalist","iframe","textarea"].indexOf(n)>-1||e.hasAttribute("tabindex")||e.hasAttribute("tabIndex")||e.hasAttribute("draggable")?He(e):["a","area"].indexOf(n)>-1?!1!==e.hasAttribute("href")&&He(e):["audio","video"].indexOf(n)>-1&&(!1!==e.hasAttribute("controls")&&He(e))},He=function(e){if(Ve(e))return!0;if("hidden"===Ge(e,"visibility"))return!1;for(var n=e;n&&!Ve(n);){if("none"===Ge(n,"display"))return!1;n=n.parentNode}return!0},Ve=function(e){return e===e.ownerDocument.documentElement},Ge=function(e,n){return function(e){return Je(e).getComputedStyle(e)}(e).getPropertyValue(n)},Je=function(e){return Ue(e)?e:We(e)?e.defaultView:Qe(e).defaultView},Qe=function(e){return Ue(e)?e.document:We(e)?e:e.ownerDocument},Ye=function(e,n){for(var t=Ze(e,e),r=t.next(),o=r.done,c=r.value;!1===o;){if(n(c))return c;var i=t.next();o=i.done,c=i.value}return null},Xe=function e(n,t){var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(!r){var o=n.firstChild;if(o)return o}var c=n.nextSibling;if(c)return c;var i=n.parentNode;return i&&i!==t?e(i,t,!0):null},Ze=function(e,n){var t=e;return{next:function(){var e=Xe(t,n);return t=e,{done:!1===Boolean(e),value:e}}}},$e=function(e,n){var t=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=e,o=!1,c=function(){var e=Xe(r,n,t&&!1===o);return o=!0,r=e,{done:!1===Boolean(e),value:e}};return{next:c}},en=function(e){for(var n=e.lastChild;n;){var t=n.lastChild;if(!t)break;n=t}return n},nn=function(e,n){var t=e;return{next:function(){var e=function(e,n){var t=e.previousSibling;if(t){var r=en(t);return r||t}if(e!==n){var o=e.parentNode;if(o&&o!==n)return o}return null}(t,n);return t=e,{done:!1===Boolean(e),value:e}}}},tn=function(e){var n=Ye(e,ze);return n||(ze(e)?e:null)},rn=function(e){if(3===e.nodeType)return console.warn("cannot trap focus inside a text node"),function(){};if(ln.find((function(n){return n.element===e})))return console.warn("focus already trapped inside this element"),function(){};var n=function(){return Ye(e,on)},t=function(){return function(e,n){var t=en(e);if(t)for(var r=nn(t,e),o=r.next(),c=o.done,i=o.value;!1===c;){if(n(i))return i;var l=r.next();c=l.done,i=l.value}return null}(e,on)},r=function(){return function(e){for(var n=e.from,t=e.root,r=void 0===t?null:t,o=e.predicate,c=nn(n,r),i=c.next(),l=i.done,a=i.value;!1===l;){if(o(a))return a;var u=c.next();l=u.done,a=u.value}return null}({from:document.activeElement,root:e,predicate:on})||t()},o=function(){return function(e){for(var n=e.from,t=e.root,r=void 0===t?null:t,o=e.predicate,c=e.skipChildren,i=$e(n,r,void 0!==c&&c),l=i.next(),a=l.done,u=l.value;!1===a;){if(o(u))return u;var d=i.next();a=d.done,u=d.value}return null}({from:document.activeElement,root:e,predicate:on})||n()},c=an({element:e,lock:function(){var c=function(n){(function(n){return n.target!==e&&!e.contains(n.target)})(n)&&(n.preventDefault(),n.stopImmediatePropagation())},i=function(e){cn(e)&&(e.preventDefault(),function(e){var c=document.activeElement===document.body;if(e.shiftKey){var i=c?t():r();i&&i.focus()}else{var l=c?n():o();l&&l.focus()}}(e))};return document.addEventListener("mousedown",c,{capture:!0,passive:!1}),document.addEventListener("keydown",i,{capture:!0,passive:!1}),function(){document.removeEventListener("mousedown",c,{capture:!0,passive:!1}),document.removeEventListener("keydown",i,{capture:!0,passive:!1})}}});return function(){c()}},on=function(e){return!function(e){return e.hasAttribute&&e.hasAttribute("tabIndex")&&Number(e.getAttribute("tabindex"))<0}(e)&&ze(e)},cn=function(e){return"Tab"===e.key||9===e.keyCode},ln=[],an=function(e){var n,t=e.lock;ln.length>0&&(n=ln[ln.length-1]).unlock();var r={lock:t,unlock:t()};return ln.push(r),function(){if(0!==ln.length){var e=ln[ln.length-1];r===e?(ln.pop(),r.unlock(),n&&(n.unlock=n.lock())):console.warn("you must deactivate trap in the same order they were activated")}else console.warn("cannot deactivate an already deactivated trap")}},un=function(e){if("object"!==U(e)||1!==e.nodeType)throw new TypeError("getScrollableParent first argument must be DOM node");var n=e;return"fixed"===Ge(n,"position")?dn(n.ownerDocument):yn(n)||dn(n.ownerDocument)},dn=function(e){if("scrollingElement"in e)return e.scrollingElement;if(pn(e))return e.documentElement;var n=e.body,t=n&&!/body/i.test(n.tagName)?sn(n):n;return t&&vn(t)?null:t},sn=function(e){for(var n=e;n=n.nextSibling;)if(1===n.nodeType&&fn(n))return n;return null},fn=function(e){return e.ownerDocument.body===e},vn=function(e){if(!gn(e))return!1;if(mn(e))return!1;var n=e.ownerDocument.documentElement;return!!gn(n)&&!mn(n)},mn=function(e){var n=Ge(e,"display");return"none"!==n&&("table-row"!==n&&"table-group"!==n&&"table-column"!==n||"collapsed"!==Ge(e,"visibility"))},pn=function(e){return!!/^CSS1/.test(e.compatMode)&&hn(e)},hn=function(e){var n=e.createElement("iframe");n.style.height="1px",(e.body||e.documentElement||e).appendChild(n);var t=n.contentWindow.document;t.write('<!DOCTYPE html><div style="height:9999em">x</div>'),t.close();var r=t.documentElement.scrollHeight>t.body.scrollHeight;return n.parentNode.removeChild(n),r},gn=function(e){return!En(e)||!bn(e)},En=function(e){return"visible"===Ge(e,"overflow-x")||"visible"===Ge(e,"overflow")},bn=function(e){return"visible"===Ge(e,"overflow-y")||"visible"===Ge(e,"overflow")},yn=function(e){for(var n=Ge(e,"position"),t=e.parentNode;t;)if("absolute"!==n||"static"!==Ge(t,"position")){if(gn(t))return t;t=t.parentNode}return null},kn=n.useEffect,xn={position:"fixed",zIndex:1e3,top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(255, 255, 255, 0.75)"},Cn={position:"absolute",top:"40px",left:"40px",right:"40px",bottom:"40px",border:"1px solid rgb(204, 204, 204)",overflow:"auto",overscrollBehavior:"contain",borderRadius:"4px",outline:"none",padding:"20px"},wn=function(e){var t=e.children,r=e.isOpen,o=e.closeMethod,c=void 0===o?"display-none":o,i=e.stealFocus,l=void 0===i||i,a=e.restoreStolenFocus,u=void 0===a||a,d=e.trapFocus,s=void 0===d||d,f=e.requestCloseOnEscape,v=void 0===f||f,m=e.requestCloseOnClickOutside,p=void 0!==m&&m,h=e.onAfterOpen,g=void 0===h?function(){}:h,E=e.onRequestClose,b=void 0===E?function(){}:E,y=e.onFocusIn,k=void 0===y?function(){}:y,x=e.onFocusOut,C=void 0===x?function(){}:x,w=e.overlayProps,N=void 0===w?{}:w,O=Be(e,["children","isOpen","closeMethod","stealFocus","restoreStolenFocus","trapFocus","requestCloseOnEscape","requestCloseOnClickOutside","onAfterOpen","onRequestClose","onFocusIn","onFocusOut","overlayProps"]),S=n.useState(null),M=W(S,2),A=M[0],D=M[1],I="dom-remove"===c?Boolean(A):r;return Q((function(e){return!e&&I}),[I])&&g(),kn((function(){if(!I)return function(){};var e=function(e){k(e)},n=function(e){Mn(A)||C(e)};return A.addEventListener("focus",e,!0),document.addEventListener("focus",n,!0),function(){A.removeEventListener("focus",e,!0),document.removeEventListener("focus",n,!0)}}),[I,k,C]),kn((function(){return I?function(e){for(var n=[],t=e.previousSibling;t;)1===t.nodeType&&gn(t)&&n.push(t),t=t.previousSibling;var r=un(e);n.push(r);var o=n.map((function(e){var n=e.style.overflow||null;return e.style.overflow="hidden",function(){e.style.overflow=n}}));return function(){o.forEach((function(e){e()}))}}(A):function(){}}),[I]),kn((function(){if(!I||!s)return function(){};var e=Sn(A);return rn(e)}),[I,s]),kn((function(){if(!I||!l)return function(){};var e=document.activeElement,n=Sn(A),t=tn(n);return t&&t.focus(),function(){t&&("function"==typeof u?u(e):!0===u&&e.focus())}}),[I,l]),kn((function(){if(!I)return function(){};var e=On(A),n=function(e){if(e.preventDefault(),!Mn(A)){var n=Sn(A),t=tn(n);t&&t.focus()}};return e.addEventListener("mousedown",n,{passive:!1}),function(){e.removeEventListener("mousedown",n,{passive:!1})}}),[I]),kn((function(){if(!I)return function(){};var e=[];return Array.from(A.parentNode.children).forEach((function(n){n!==A&&e.push(n)})),e.forEach((function(e){e.setAttribute("aria-hidden","true")})),function(){e.forEach((function(e){e.removeAttribute("aria-hidden","true")}))}}),[I]),"dom-remove"!==c||r?B.createPortal(n.createElement("div",je({style:T({},xn,{},r?{}:Nn(c),{},N.style),hidden:!r&&"hidden-attribute"===c||void 0,ref:function(e){D(e),N.ref&&N.ref(e)},onClick:function(e){if(p){var n=Sn(A),t=e.target;t===n||n.contains(t)||b(e)}N.onClick&&N.onClick(e)},onKeyDown:function(e){v&&e.keyCode===An&&b(e),N.onKeyDown&&N.onKeyDown(e)}},N),n.createElement("div",je({tabIndex:"-1",style:T({},Cn,{},O.style)},O),t)),document.body):null},Nn=function(e){return"display-none"===e?{display:"none"}:"visibility-hidden"===e?{visibility:"hidden"}:{}},On=function(e){return e},Sn=function(e){return e.firstChild},Mn=function(e){var n=document.activeElement;return e===n||e.contains(n)},An=27,Dn=function(e){return n.createElement(n.Fragment,null,n.createElement(In,null),n.createElement(wn,je({overlayProps:{className:"dialog--overlay"},className:"dialog"},e)))},In=function(){return n.createElement(qe,{href:"/src/dialog/dialog.css"})};In=n.memo(In);var Rn=function(){var e=w(),t=ce(),u=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.currentCard,t=void 0===n?w():n;return r(t)?o.numberOfSwords:c(t)?i.numberOfSwords:l(t)?a.numberOfSwords:null}();if(!e||!K(e))return null;var d=Z(t,g),s=new Array(u).fill("");return n.createElement("div",{className:"sword-challenge-indicators"},s.map((function(e,t){return d>=t+1?n.createElement(Fn,{key:t}):n.createElement(Tn,{key:t})})))},Fn=function(){return n.createElement("div",{className:"sword-icon"},n.createElement("img",{src:"src/dices/dice_sword.png"}))},Tn=function(){return n.createElement("div",{className:"sword-icon disabled"},n.createElement("img",{src:"src/header/swords-disabled.png"}))},Pn=function(){return n.createElement("div",{className:"header"},n.createElement("div",{className:"card-container"},n.createElement(Kn,null),n.createElement(Rn,null)),n.createElement(Wn,null))},Kn=function(){return n.createElement("div",{className:"small-card"},n.createElement(Ln,null),n.createElement(qn,null))},Ln=function(){var e=w();return e?n.createElement(jn,{card:e}):n.createElement(_n,null)},_n=function(){return n.createElement("div",{className:"card default-card",style:{backgroundImage:"url('src/cards/card_default.png')",backgroundSize:"217px"}})},jn=function(e){var t=e.card;return n.createElement("div",{className:"card current-card",style:{backgroundColor:j[t].color1,borderColor:j[t].color2}},n.createElement("img",{src:"src/cards/card_small-".concat(K(t)?"sword-challenge":t,".png"),alt:t}))},qn=function(){var e=w(),t=z();return e?null:0===t.length?n.createElement(Un,null):n.createElement(Bn,null)},Bn=function(){var e=Le();return n.createElement("button",{className:"draw-card-btn",onClick:e},"Draw a card")},Un=function(){var e=_e();return n.createElement("button",{className:"draw-card-btn",onClick:e},"Shuffle deck")},Wn=function(){var e=n.useState(!1),t=W(e,2),r=t[0],o=t[1],c=H();return n.createElement("div",{className:"total-score"},n.createElement("span",{onClick:function(){o(!0)},className:"score"},c),n.createElement(Dn,{isOpen:r,onRequestClose:function(){o(!1)},requestCloseOnClickOutside:!0},n.createElement("div",{style:{height:"2000px"}},"Total score dialog content")))},zn=function(){var e=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.rollDiceAllowed,t=void 0===n?ue():n,r=e.markScoreAllowed,o=void 0===r?fe():r,c=e.hasDicesToCurse,i=void 0===c?le():c;return!t&&(!o&&!i)}(),t=Hn();return e?n.createElement("div",{className:"next-round-action"},n.createElement("button",{onClick:t},"Next round")):null},Hn=F((function(e){return T({},e,{witchUncursedDiceId:null,rollCount:0,dicesRolled:[],dicesCursed:[],dicesKept:[],scoreMarked:!1,currentCard:null,isOnSkullIsland:!1})})),Vn=function(e,n){var t=n.diceParentElement.getBoundingClientRect(),r=t.width-50,o=t.height-50,c=[];return e.forEach((function(e){var n=Gn(e,{dicesRolled:c,xMin:0,xMax:r,yMin:0,yMax:o});c.push(n)})),c},Gn=function(e,n){var t=n.dicesRolled,r=n.xMin,o=n.xMax,c=n.yMin,i=n.yMax,l=Jn(t,{xMin:r,xMax:o,yMin:c,yMax:i}),a=l.x,u=l.y;return T({},e,{visibleFaceIndex:Yn(e),x:a,y:u,rotation:Qn()})},Jn=function(e,n){var t=n.xMin,r=n.xMax,o=n.yMin,c=n.yMax,i=0;return function n(){var l,a={x:Xn(t,r),y:Xn(o,c)};return l=a,e.some((function(e){return Se({top:l.y-6.25,left:l.x-6.25,bottom:l.y+50+6.25,right:l.x+50+6.25},{top:e.y-6.25,left:e.x-6.25,bottom:e.y+50+6.25,right:e.x+50+6.25})}))?++i>50?a:n():a}()},Qn=function(){return Xn(-35,35)},Yn=function(e){return Xn(0,e.faces.length-1)},Xn=function(e,n){return Math.floor(Math.random()*(n-e+1)+e)},Zn=function(){var e=ue(),t=V(),r=$n();return e?n.createElement("div",{className:"roll-action"},n.createElement("button",{onClick:function(){r(t)}},"Roll")):null},$n=F((function(e,n){var t=e.rollCount,r=e.dices,o=e.dicesRolled;return T({},e,{rollCount:t+1,dicesRolled:Vn(0===t?r:o,{diceParentElement:n})})})),et=function(){var e=me(),t=ve();return n.createElement("div",{className:"actions"},n.createElement(Zn,null),n.createElement(nt,{onClick:function(){e(t)}}),n.createElement(zn,null))},nt=function(e){var t=e.onClick,r=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.rollCount,t=void 0===n?y():n;return t>0}(),o=fe(),c=ve(),i=c<0?"-":"+";return o&&r?n.createElement("div",{className:"collect-action"},n.createElement("button",{onClick:t},n.createElement("span",null,"Collect"),n.createElement("span",{className:"score"},i," ",Math.abs(c)))):null},tt=function(){var e=w(),t=C(),r=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.witchUncursedDiceId,t=void 0===n?x():n,r=e.currentCard,o=void 0===r?w():r,c=e.threeSkullsOrMoreInCursedArea,i=void 0===c?de():c;return!!N(o)&&(!i&&!t)}(),o=ge();return n.createElement("div",{className:"skull-island"},N(e)?n.createElement(ot,null):null,n.createElement("div",{className:"bottle"},n.createElement("div",{className:"area"},t.map((function(e){return n.createElement(Me,{key:e.id,dice:e,disabled:!r,onClickAction:function(e){o(e)},specificStyle:{margin:"1px 5px"}})})),A(e)?n.createElement(rt,{card:e}):null,I(e)?n.createElement(n.Fragment,null,n.createElement(rt,{card:e}),n.createElement(rt,{card:e})):null)))},rt=function(e){var t=e.card;return n.createElement("button",{className:"dice",style:{width:50,height:50,color:"#fcfcfc",margin:"1px 5px",backgroundColor:j[t].color1,borderColor:j[t].color2,borderWidth:"2px"}},n.createElement("img",{src:"src/dices/dice_skull.png",style:{width:"100%",height:"100%"}}))},ot=function(){return n.createElement("div",{className:"witch-label"},n.createElement("img",{src:"src/skull-island/witch-label.png"}),n.createElement("svg",{x:"0px",y:"0px",width:"156.083px",height:"208.667px",viewBox:"0 0 156.083 208.667"},n.createElement("path",{id:"path_01",fill:"none",stroke:"#E4AD30",d:"M8.406,107.82 c2.541,2.178,2.375,2.875,14.25,3.5c14.782,0.778,19.26-11.965,19.26-11.965S47.918,88,40.251,72.917s-18.916,4.583-9.083,8.167 s27.759-1.338,35.142-12.417C74.75,56,77.583,45.333,79.25,37S78.477,15.833,66.31,3.833"}),n.createElement("path",{id:"path_02",fill:"none",stroke:"#E4AD30",d:"M44.031,110.094 c0,0,1,1.313-4.438,3.344s-14.244,7.281-32.125-2"}),n.createElement("path",{id:"path_03",fill:"none",stroke:"#E4AD30",d:"M42.125,103.688 c0,0,1.313,6.594-9.313,8.625S10.281,108.719,9.406,101"}),n.createElement("path",{id:"path_04",fill:"none",stroke:"#E4AD30",d:"M33.114,112.253c0,0,39.886-19.253,43.011,24.747 c0.372,0.447-0.959,1.208-2.542,1.625"})))},ct=n.useMemo;e("Game",(function(){return ct((function(){return n.createElement("div",{id:"mille-sabord-container"},n.createElement(ke,null),n.createElement(Oe,null),n.createElement(Pn,null),n.createElement("div",{className:"dice-kept-and-skulls"},n.createElement(Fe,null),n.createElement(tt,null)),n.createElement(Ae,null),n.createElement(et,null))}))}))}}}));
//# sourceMappingURL=game.component-c783d3f7.js.map
