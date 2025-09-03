var R={exports:{}},r={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var d=Symbol.for("react.element"),N=Symbol.for("react.portal"),T=Symbol.for("react.fragment"),D=Symbol.for("react.strict_mode"),H=Symbol.for("react.profiler"),U=Symbol.for("react.provider"),B=Symbol.for("react.context"),z=Symbol.for("react.forward_ref"),Q=Symbol.for("react.suspense"),W=Symbol.for("react.memo"),X=Symbol.for("react.lazy"),x=Symbol.iterator;function K(e){return e===null||typeof e!="object"?null:(e=x&&e[x]||e["@@iterator"],typeof e=="function"?e:null)}var g={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},j=Object.assign,M={};function y(e,t,n){this.props=e,this.context=t,this.refs=M,this.updater=n||g}y.prototype.isReactComponent={};y.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};y.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function I(){}I.prototype=y.prototype;function w(e,t,n){this.props=e,this.context=t,this.refs=M,this.updater=n||g}var C=w.prototype=new I;C.constructor=w;j(C,y.prototype);C.isPureReactComponent=!0;var E=Array.isArray,A=Object.prototype.hasOwnProperty,S={current:null},O={key:!0,ref:!0,__self:!0,__source:!0};function P(e,t,n){var u,o={},i=null,l=null;if(t!=null)for(u in t.ref!==void 0&&(l=t.ref),t.key!==void 0&&(i=""+t.key),t)A.call(t,u)&&!O.hasOwnProperty(u)&&(o[u]=t[u]);var s=arguments.length-2;if(s===1)o.children=n;else if(1<s){for(var c=Array(s),a=0;a<s;a++)c[a]=arguments[a+2];o.children=c}if(e&&e.defaultProps)for(u in s=e.defaultProps,s)o[u]===void 0&&(o[u]=s[u]);return{$$typeof:d,type:e,key:i,ref:l,props:o,_owner:S.current}}function Z(e,t){return{$$typeof:d,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function b(e){return typeof e=="object"&&e!==null&&e.$$typeof===d}function G(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var $=/\/+/g;function _(e,t){return typeof e=="object"&&e!==null&&e.key!=null?G(""+e.key):t.toString(36)}function m(e,t,n,u,o){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var l=!1;if(e===null)l=!0;else switch(i){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case d:case N:l=!0}}if(l)return l=e,o=o(l),e=u===""?"."+_(l,0):u,E(o)?(n="",e!=null&&(n=e.replace($,"$&/")+"/"),m(o,t,n,"",function(a){return a})):o!=null&&(b(o)&&(o=Z(o,n+(!o.key||l&&l.key===o.key?"":(""+o.key).replace($,"$&/")+"/")+e)),t.push(o)),1;if(l=0,u=u===""?".":u+":",E(e))for(var s=0;s<e.length;s++){i=e[s];var c=u+_(i,s);l+=m(i,t,n,c,o)}else if(c=K(e),typeof c=="function")for(e=c.call(e),s=0;!(i=e.next()).done;)i=i.value,c=u+_(i,s++),l+=m(i,t,n,c,o);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return l}function h(e,t,n){if(e==null)return e;var u=[],o=0;return m(e,u,"","",function(i){return t.call(n,i,o++)}),u}function J(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var f={current:null},v={transition:null},Y={ReactCurrentDispatcher:f,ReactCurrentBatchConfig:v,ReactCurrentOwner:S};function L(){throw Error("act(...) is not supported in production builds of React.")}r.Children={map:h,forEach:function(e,t,n){h(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return h(e,function(){t++}),t},toArray:function(e){return h(e,function(t){return t})||[]},only:function(e){if(!b(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};r.Component=y;r.Fragment=T;r.Profiler=H;r.PureComponent=w;r.StrictMode=D;r.Suspense=Q;r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Y;r.act=L;r.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var u=j({},e.props),o=e.key,i=e.ref,l=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,l=S.current),t.key!==void 0&&(o=""+t.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(c in t)A.call(t,c)&&!O.hasOwnProperty(c)&&(u[c]=t[c]===void 0&&s!==void 0?s[c]:t[c])}var c=arguments.length-2;if(c===1)u.children=n;else if(1<c){s=Array(c);for(var a=0;a<c;a++)s[a]=arguments[a+2];u.children=s}return{$$typeof:d,type:e.type,key:o,ref:i,props:u,_owner:l}};r.createContext=function(e){return e={$$typeof:B,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:U,_context:e},e.Consumer=e};r.createElement=P;r.createFactory=function(e){var t=P.bind(null,e);return t.type=e,t};r.createRef=function(){return{current:null}};r.forwardRef=function(e){return{$$typeof:z,render:e}};r.isValidElement=b;r.lazy=function(e){return{$$typeof:X,_payload:{_status:-1,_result:e},_init:J}};r.memo=function(e,t){return{$$typeof:W,type:e,compare:t===void 0?null:t}};r.startTransition=function(e){var t=v.transition;v.transition={};try{e()}finally{v.transition=t}};r.unstable_act=L;r.useCallback=function(e,t){return f.current.useCallback(e,t)};r.useContext=function(e){return f.current.useContext(e)};r.useDebugValue=function(){};r.useDeferredValue=function(e){return f.current.useDeferredValue(e)};r.useEffect=function(e,t){return f.current.useEffect(e,t)};r.useId=function(){return f.current.useId()};r.useImperativeHandle=function(e,t,n){return f.current.useImperativeHandle(e,t,n)};r.useInsertionEffect=function(e,t){return f.current.useInsertionEffect(e,t)};r.useLayoutEffect=function(e,t){return f.current.useLayoutEffect(e,t)};r.useMemo=function(e,t){return f.current.useMemo(e,t)};r.useReducer=function(e,t,n){return f.current.useReducer(e,t,n)};r.useRef=function(e){return f.current.useRef(e)};r.useState=function(e){return f.current.useState(e)};r.useSyncExternalStore=function(e,t,n){return f.current.useSyncExternalStore(e,t,n)};r.useTransition=function(){return f.current.useTransition()};r.version="18.3.1";R.exports=r;var k=R.exports;/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var ee={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const te=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),p=(e,t)=>{const n=k.forwardRef(({color:u="currentColor",size:o=24,strokeWidth:i=2,absoluteStrokeWidth:l,className:s="",children:c,...a},q)=>k.createElement("svg",{ref:q,...ee,width:o,height:o,stroke:u,strokeWidth:l?Number(i)*24/Number(o):i,className:["lucide",`lucide-${te(e)}`,s].join(" "),...a},[...t.map(([F,V])=>k.createElement(F,V)),...Array.isArray(c)?c:[c]]));return n.displayName=`${e}`,n};/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const re=p("AlertCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ne=p("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oe=p("FileQuestion",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M10 10.3c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2",key:"1umxtm"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ue=p("HelpCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ce=p("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ie=p("RotateCcw",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const se=p("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);export{re as A,ne as C,oe as F,ue as H,ce as I,ie as R,se as X,k as r};
