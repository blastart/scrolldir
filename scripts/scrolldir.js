/**
 * scrolldir - Prefectly track user scroll direction without the jitter
 * @version v0.0.4
 * @link https://github.com/dollarshaveclub/scrolldir.git
 * @author Patrick Fisher <patrick@pwfisher.com>
 * @license MIT
**/
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.scrollDir=e()}(this,function(){"use strict";function t(t){var e={el:document.documentElement,win:window,attribute:"data-scrolldir"},n=t&&t.el||e.el,i=t&&t.win||e.win,o=t&&t.attribute||e.attribute;if(t&&t.off===!0)return n.setAttribute(o,"off");var r=document.body,u=32,d=512,f=64,a=Array(u),s="down",c=void 0,l=void 0,m=0,w=function(){var t=i.scrollY,e=c.timeStamp,w="down"===s?Math.max:Math.min,p=r.offsetHeight-i.innerHeight;if(t=Math.max(0,t),t=Math.min(p,t),a.unshift({y:t,t:e}),a.pop(),t===w(l,t))return m=e,void(l=t);var v=e-d;if(v>m){l=t;for(var b=0;b<u&&(a[b]&&!(a[b].t<v));b+=1)l=w(l,a[b].y)}Math.abs(t-l)>f&&(l=t,m=e,s="down"===s?"up":"down",n.setAttribute(o,s))},p=function(t){c=t,i.requestAnimationFrame(w)};return l=i.scrollY,n.setAttribute(o,s),i.addEventListener("scroll",p)}var e=window.$||window.jQuery||window.Zepto;return e&&e.fn.extend({scrollDir:function(e){return t(e)}}),t});