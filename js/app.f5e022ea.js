(function(e){function n(n){for(var r,u,a=n[0],i=n[1],d=n[2],l=0,f=[];l<a.length;l++)u=a[l],Object.prototype.hasOwnProperty.call(o,u)&&o[u]&&f.push(o[u][0]),o[u]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);b&&b(n);while(f.length)f.shift()();return c.push.apply(c,d||[]),t()}function t(){for(var e,n=0;n<c.length;n++){for(var t=c[n],r=!0,u=1;u<t.length;u++){var i=t[u];0!==o[i]&&(r=!1)}r&&(c.splice(n--,1),e=a(a.s=t[0]))}return e}var r={},o={app:0},c=[];function u(e){return a.p+"js/"+({}[e]||e)+"."+{"chunk-030b1752":"c1dd1061","chunk-1fe7f04a":"d9c10401","chunk-72cb84b7":"40b7ea47","chunk-73702a0e":"172de5a5","chunk-2d21a3d2":"516ff24c","chunk-2d21e30b":"15ac2e3c","chunk-4bec8d34":"217ccd95","chunk-69bafd36":"928ac390","chunk-6e934cbe":"31677eda"}[e]+".js"}function a(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,a),t.l=!0,t.exports}a.e=function(e){var n=[],t=o[e];if(0!==t)if(t)n.push(t[2]);else{var r=new Promise((function(n,r){t=o[e]=[n,r]}));n.push(t[2]=r);var c,i=document.createElement("script");i.charset="utf-8",i.timeout=120,a.nc&&i.setAttribute("nonce",a.nc),i.src=u(e);var d=new Error;c=function(n){i.onerror=i.onload=null,clearTimeout(l);var t=o[e];if(0!==t){if(t){var r=n&&("load"===n.type?"missing":n.type),c=n&&n.target&&n.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+c+")",d.name="ChunkLoadError",d.type=r,d.request=c,t[1](d)}o[e]=void 0}};var l=setTimeout((function(){c({type:"timeout",target:i})}),12e4);i.onerror=i.onload=c,document.head.appendChild(i)}return Promise.all(n)},a.m=e,a.c=r,a.d=function(e,n,t){a.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,n){if(1&n&&(e=a(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(a.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)a.d(t,r,function(n){return e[n]}.bind(null,r));return t},a.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(n,"a",n),n},a.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},a.p="",a.oe=function(e){throw console.error(e),e};var i=window["webpackJsonp"]=window["webpackJsonp"]||[],d=i.push.bind(i);i.push=n,i=i.slice();for(var l=0;l<i.length;l++)n(i[l]);var b=d;c.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"56d7":function(e,n,t){"use strict";t.r(n);t("e260"),t("e6cf"),t("cca6"),t("a79d"),t("d3b7"),t("159b"),t("b64b");var r=t("7a23");function o(e,n){var t=Object(r["G"])("router-view");return Object(r["y"])(),Object(r["e"])(t)}t("fa33");var c=t("6b0d"),u=t.n(c);const a={},i=u()(a,[["render",o]]);var d=i,l=(t("3ca3"),t("ddb0"),t("6c02")),b=[{path:"/",component:function(){return t.e("chunk-2d21a3d2").then(t.bind(null,"bb51"))},children:[{path:"/index",name:"首頁",component:function(){return t.e("chunk-2d21e30b").then(t.bind(null,"d504"))}},{path:"/products",name:"產品列表",component:function(){return Promise.all([t.e("chunk-030b1752"),t.e("chunk-73702a0e")]).then(t.bind(null,"e6dc"))}},{path:"/cart",name:"購物車",component:function(){return t.e("chunk-69bafd36").then(t.bind(null,"b789"))}},{path:"/login",name:"登入畫面",component:function(){return t.e("chunk-4bec8d34").then(t.bind(null,"a55b"))}}]},{path:"/admin",name:"後台管理",component:function(){return t.e("chunk-6e934cbe").then(t.bind(null,"9057"))},children:[{path:"productList",name:"後台產品列表",component:function(){return Promise.all([t.e("chunk-030b1752"),t.e("chunk-72cb84b7")]).then(t.bind(null,"d6ab"))}},{path:"orders",name:"訂單管理",component:function(){return Promise.all([t.e("chunk-030b1752"),t.e("chunk-1fe7f04a")]).then(t.bind(null,"b06d"))}}]}],f=Object(l["a"])({history:Object(l["b"])(),linkActiveClass:"active",routes:b}),p=f,h=t("8a14"),s=(t("fe26"),t("7bb1")),m=t("3aa8"),v=t("cbdf"),k=t("9457"),y=t("bc3a"),O=t.n(y),g=t("130e");Object.keys(m["a"]).forEach((function(e){Object(s["e"])(e,m["a"][e])})),Object(s["d"])({generateMessage:Object(v["a"])({zh_TW:k}),validateOnInput:!0}),Object(v["b"])("zh_TW"),Object(r["d"])(d).use(p).use(g["a"],O.a).component("Form",s["c"]).component("Field",s["b"]).component("ErrorMessage",s["a"]).component("Loading",h["a"]).mount("#app")},c55d:function(e,n,t){},fa33:function(e,n,t){"use strict";t("c55d")}});
//# sourceMappingURL=app.f5e022ea.js.map