


var DAVE = {
  init : function() {
    if ($('#wrapper').hasClass('mobile')) {
      setTimeout(function() {
        try { window.scrollTo(0, 1); } catch(e) { }
      }, 0);
    }

    

    DAVE.animate();
  },

  /* Request animation frame loop ( initialised in DAVE.init() )
  /* ====================================================== */
  animate: function() {
      requestAnimationFrame(DAVE.animate);
      TWEEN.update();
  }
};


$(document).ready(function() {
  // Try and hide web debug to keep out of the way on dev
  try { sfWebDebugToggleMenu(); } catch(e) { }
  
  // IE fix for errant console.log
  if (typeof console === "undefined") console = { log: function() { } };
  
  // SITE init
  DAVE.init();
});


// date.now() needed for Tween.js
// For IE8 and earlier version.
if (!Date.now) {
  Date.now = function() {
    return new Date().valueOf();
  }
}

// Request animation frame
(function() {var lastTime=0;var vendors=['ms','moz','webkit','o'];for(var x=0;x<vendors.length&&!window.requestAnimationFrame;++x) {window.requestAnimationFrame=window[vendors[x]+'RequestAnimationFrame'];window.cancelAnimationFrame=window[vendors[x]+'CancelAnimationFrame']||window[vendors[x]+'CancelRequestAnimationFrame']}if(!window.requestAnimationFrame)window.requestAnimationFrame=function(callback,element) {var currTime=new Date().getTime();var timeToCall=Math.max(0,16-(currTime-lastTime));var id=window.setTimeout(function() {callback(currTime+timeToCall)},timeToCall);lastTime=currTime+timeToCall;return id};if(!window.cancelAnimationFrame)window.cancelAnimationFrame=function(id) {clearTimeout(id)}}());

// Tween.js 
var TWEEN=TWEEN||(function() {var _tweens=[];return{REVISION:'6',getAll:function() {return _tweens},removeAll:function() {_tweens=[]},add:function(tween) {_tweens.push(tween)},remove:function(tween) {var i=_tweens.indexOf(tween);if(i!==-1) {_tweens.splice(i,1)}},update:function(time) {var i=0;var num_tweens=_tweens.length;var time=time!==undefined?time:Date.now();while(i<num_tweens) {if(_tweens[i].update(time)) {i++}else{_tweens.splice(i,1);num_tweens--}}}}})();TWEEN.Tween=function(object) {var _object=object;var _valuesStart={};var _valuesEnd={};var _duration=1000;var _delayTime=0;var _startTime=null;var _easingFunction=TWEEN.Easing.Linear.None;var _interpolationFunction=TWEEN.Interpolation.Linear;var _chainedTween=null;var _onUpdateCallback=null;var _onCompleteCallback=null;this.to=function(properties,duration) {if(duration!==null) {_duration=duration}_valuesEnd=properties;return this};this.start=function(time) {TWEEN.add(this);_startTime=time!==undefined?time:Date.now();_startTime+=_delayTime;for(var property in _valuesEnd) {if(_object[property]===null) {continue}if(_valuesEnd[property]instanceof Array) {if(_valuesEnd[property].length===0) {continue}_valuesEnd[property]=[_object[property]].concat(_valuesEnd[property])}_valuesStart[property]=_object[property]}return this};this.stop=function() {TWEEN.remove(this);return this};this.delay=function(amount) {_delayTime=amount;return this};this.easing=function(easing) {_easingFunction=easing;return this};this.interpolation=function(interpolation) {_interpolationFunction=interpolation;return this};this.chain=function(chainedTween) {_chainedTween=chainedTween;return this};this.onUpdate=function(onUpdateCallback) {_onUpdateCallback=onUpdateCallback;return this};this.onComplete=function(onCompleteCallback) {_onCompleteCallback=onCompleteCallback;return this};this.update=function(time) {if(time<_startTime) {return true}var elapsed=(time-_startTime)/_duration;elapsed=elapsed>1?1:elapsed;var value=_easingFunction(elapsed);for(var property in _valuesStart) {var start=_valuesStart[property];var end=_valuesEnd[property];if(end instanceof Array) {_object[property]=_interpolationFunction(end,value)}else{_object[property]=start+(end-start)*value}}if(_onUpdateCallback!==null) {_onUpdateCallback.call(_object,value)}if(elapsed==1) {if(_onCompleteCallback!==null) {_onCompleteCallback.call(_object)}if(_chainedTween!==null) {_chainedTween.start()}return false}return true}};TWEEN.Easing={Linear:{None:function(k) {return k}},Quadratic:{In:function(k) {return k*k},Out:function(k) {return k*(2-k)},InOut:function(k) {if((k*=2)<1)return 0.5*k*k;return-0.5*(--k*(k-2)-1)}},Cubic:{In:function(k) {return k*k*k},Out:function(k) {return--k*k*k+1},InOut:function(k) {if((k*=2)<1)return 0.5*k*k*k;return 0.5*((k-=2)*k*k+2)}},Quartic:{In:function(k) {return k*k*k*k},Out:function(k) {return 1- --k*k*k*k},InOut:function(k) {if((k*=2)<1)return 0.5*k*k*k*k;return-0.5*((k-=2)*k*k*k-2)}},Quintic:{In:function(k) {return k*k*k*k*k},Out:function(k) {return--k*k*k*k*k+1},InOut:function(k) {if((k*=2)<1)return 0.5*k*k*k*k*k;return 0.5*((k-=2)*k*k*k*k+2)}},Sinusoidal:{In:function(k) {return 1-Math.cos(k*Math.PI/2)},Out:function(k) {return Math.sin(k*Math.PI/2)},InOut:function(k) {return 0.5*(1-Math.cos(Math.PI*k))}},Exponential:{In:function(k) {return k===0?0:Math.pow(1024,k-1)},Out:function(k) {return k===1?1:1-Math.pow(2,-10*k)},InOut:function(k) {if(k===0)return 0;if(k===1)return 1;if((k*=2)<1)return 0.5*Math.pow(1024,k-1);return 0.5*(-Math.pow(2,-10*(k-1))+2)}},Circular:{In:function(k) {return 1-Math.sqrt(1-k*k)},Out:function(k) {return Math.sqrt(1- --k*k)},InOut:function(k) {if((k*=2)<1)return-0.5*(Math.sqrt(1-k*k)-1);return 0.5*(Math.sqrt(1-(k-=2)*k)+1)}},Elastic:{In:function(k) {var s,a=0.1,p=0.4;if(k===0)return 0;if(k===1)return 1;if(!a||a<1) {a=1;s=p/4}else s=p*Math.asin(1/a)/(2*Math.PI);return-(a*Math.pow(2,10*(k-=1))*Math.sin((k-s)*(2*Math.PI)/p))},Out:function(k) {var s,a=0.1,p=0.4;if(k===0)return 0;if(k===1)return 1;if(!a||a<1) {a=1;s=p/4}else s=p*Math.asin(1/a)/(2*Math.PI);return(a*Math.pow(2,-10*k)*Math.sin((k-s)*(2*Math.PI)/p)+1)},InOut:function(k) {var s,a=0.1,p=0.4;if(k===0)return 0;if(k===1)return 1;if(!a||a<1) {a=1;s=p/4}else s=p*Math.asin(1/a)/(2*Math.PI);if((k*=2)<1)return-0.5*(a*Math.pow(2,10*(k-=1))*Math.sin((k-s)*(2*Math.PI)/p));return a*Math.pow(2,-10*(k-=1))*Math.sin((k-s)*(2*Math.PI)/p)*0.5+1}},Back:{In:function(k) {var s=1.70158;return k*k*((s+1)*k-s)},Out:function(k) {var s=1.70158;return--k*k*((s+1)*k+s)+1},InOut:function(k) {var s=1.70158*1.525;if((k*=2)<1)return 0.5*(k*k*((s+1)*k-s));return 0.5*((k-=2)*k*((s+1)*k+s)+2)}},Bounce:{In:function(k) {return 1-TWEEN.Easing.Bounce.Out(1-k)},Out:function(k) {if(k<(1/2.75)) {return 7.5625*k*k}else if(k<(2/2.75)) {return 7.5625*(k-=(1.5/ 2.75 ) ) * k + 0.75} else if ( k < ( 2.5 /2.75)) {return 7.5625*(k-=(2.25/2.75))*k+0.9375}else{return 7.5625*(k-=(2.625/2.75))*k+0.984375}},InOut:function(k) {if(k<0.5)return TWEEN.Easing.Bounce.In(k*2)*0.5;return TWEEN.Easing.Bounce.Out(k*2-1)*0.5+0.5}}};TWEEN.Interpolation={Linear:function(v,k) {var m=v.length-1,f=m*k,i=Math.floor(f),fn=TWEEN.Interpolation.Utils.Linear;if(k<0)return fn(v[0],v[1],f);if(k>1)return fn(v[m],v[m-1],m-f);return fn(v[i],v[i+1>m?m:i+1],f-i)},Bezier:function(v,k) {var b=0,n=v.length-1,pw=Math.pow,bn=TWEEN.Interpolation.Utils.Bernstein,i;for(i=0;i<=n;i++) {b+=pw(1-k,n-i)*pw(k,i)*v[i]*bn(n,i)}return b},CatmullRom:function(v,k) {var m=v.length-1,f=m*k,i=Math.floor(f),fn=TWEEN.Interpolation.Utils.CatmullRom;if(v[0]===v[m]) {if(k<0)i=Math.floor(f=m*(1+k));return fn(v[(i-1+m)%m],v[i],v[(i+1)%m],v[(i+2)%m],f-i)}else{if(k<0)return v[0]-(fn(v[0],v[0],v[1],v[1],-f)-v[0]);if(k>1)return v[m]-(fn(v[m],v[m],v[m-1],v[m-1],f-m)-v[m]);return fn(v[i?i-1:0],v[i],v[m<i+1?m:i+1],v[m<i+2?m:i+2],f-i)}},Utils:{Linear:function(p0,p1,t) {return(p1-p0)*t+p0},Bernstein:function(n,i) {var fc=TWEEN.Interpolation.Utils.Factorial;return fc(n)/fc(i)/fc(n-i)},Factorial:(function() {var a=[1];return function(n) {var s=1,i;if(a[n])return a[n];for(i=n;i>1;i--)s*=i;return a[n]=s}})(),CatmullRom:function(p0,p1,p2,p3,t) {var v0=(p2-p0)*0.5,v1=(p3-p1)*0.5,t2=t*t,t3=t*t2;return(2*p1-2*p2+v0+v1)*t3+(-3*p1+3*p2-2*v0-v1)*t2+v0*t+p1}}};

// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function noop() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

//Detect high res displays (Retina, HiDPI, etc...)
Modernizr.addTest('highresdisplay', function() { 
  if (window.matchMedia) { 
    var mq = window.matchMedia("only screen and (-moz-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
    if(mq && mq.matches) {
      return true;
    } else {
      return false;
    }
  }
});

/* Jquery Placeholder Plugin ( minified ) */
/*! http://mths.be/placeholder v2.0.7 by @mathias */
;(function(f,h,$){var a='placeholder' in h.createElement('input'),d='placeholder' in h.createElement('textarea'),i=$.fn,c=$.valHooks,k,j;if(a&&d){j=i.placeholder=function(){return this};j.input=j.textarea=true}else{j=i.placeholder=function(){var l=this;l.filter((a?'textarea':':input')+'[placeholder]').not('.placeholder').bind({'focus.placeholder':b,'blur.placeholder':e}).data('placeholder-enabled',true).trigger('blur.placeholder');return l};j.input=a;j.textarea=d;k={get:function(m){var l=$(m);return l.data('placeholder-enabled')&&l.hasClass('placeholder')?'':m.value},set:function(m,n){var l=$(m);if(!l.data('placeholder-enabled')){return m.value=n}if(n==''){m.value=n;if(m!=h.activeElement){e.call(m)}}else{if(l.hasClass('placeholder')){b.call(m,true,n)||(m.value=n)}else{m.value=n}}return l}};a||(c.input=k);d||(c.textarea=k);$(function(){$(h).delegate('form','submit.placeholder',function(){var l=$('.placeholder',this).each(b);setTimeout(function(){l.each(e)},10)})});$(f).bind('beforeunload.placeholder',function(){$('.placeholder').each(function(){this.value=''})})}function g(m){var l={},n=/^jQuery\d+$/;$.each(m.attributes,function(p,o){if(o.specified&&!n.test(o.name)){l[o.name]=o.value}});return l}function b(m,n){var l=this,o=$(l);if(l.value==o.attr('placeholder')&&o.hasClass('placeholder')){if(o.data('placeholder-password')){o=o.hide().next().show().attr('id',o.removeAttr('id').data('placeholder-id'));if(m===true){return o[0].value=n}o.focus()}else{l.value='';o.removeClass('placeholder');l==h.activeElement&&l.select()}}}function e(){var q,l=this,p=$(l),m=p,o=this.id;if(l.value==''){if(l.type=='password'){if(!p.data('placeholder-textinput')){try{q=p.clone().attr({type:'text'})}catch(n){q=$('<input>').attr($.extend(g(this),{type:'text'}))}q.removeAttr('name').data({'placeholder-password':true,'placeholder-id':o}).bind('focus.placeholder',b);p.data({'placeholder-textinput':q,'placeholder-id':o}).before(q)}p=p.removeAttr('id').hide().prev().attr('id',o).show()}p.addClass('placeholder');p[0].value=p.attr('placeholder')}else{p.removeClass('placeholder')}}}(this,document,jQuery));