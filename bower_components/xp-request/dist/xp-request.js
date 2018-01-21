!function(t){var e={};function s(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:i})},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=0)}([function(t,e,s){t.exports=s(1)},function(t,e,s){(function(e){const i="undefined"!=typeof window?window:e,r="undefined"!=typeof window?null:s(3),n="undefined"!=typeof window?null:s(4),o="undefined"!=typeof window?{}:r.STATUS_CODES,a=i.location||{},h=i.XP||s(5),d=i.XPBuffer||s(6),l=i.XPEmitter||s(7);t.exports=new h.Class("XPRequest",{extends:l,initialize:{promise:!0,value(t,e){l.call(this),h.isObject(t)||(t={url:t}),h.isFalsy(t.url)||Object.assign(t,h.pick(h.parseURL(t.url),["hostname","path","port","protocol"])),this.downLoaded=0,this.chunks=[],this.state="idle",this.options=t,this.headers=this.options.headers||{},this.hostname=this.options.hostname||a.hostname||"",this.keepAlive=this.options.keepAlive||0,this.method=this.options.method||"GET",this.parser=this.options.parser||"json",this.path=this.options.path||"",this.port=this.options.port||!this.options.hostname&&a.port||null,this.protocol=this.options.protocol||!this.options.hostname&&a.protocol||"http:",this.url=h.toURL({hostname:this.hostname,pathname:this.pathname,port:this.port,protocol:this.protocol,search:this.search}),this._handleDownload=this._handleDownload.bind(this),this._handleEnd=this._handleEnd.bind(this,e),this._handleError=this._handleError.bind(this,e),this._handleResponse=this._handleResponse.bind(this,e)}},getHeader(t){return h.assertArgument(h.isString(t,!0),1,"string"),this.headers[t]},setHeader(t,e){h.assertArgument(h.isString(t,!0),1,"string"),h.assertArgument(h.isVoid(e)||h.isFalse(e)||h.isInput(e),2,"string"),"idle"===this.state&&(h.isInput(e,!0)?this.headers[t]=e.toString():delete this.headers[t])},abort:{promise:!0,value(t){!this.tsAbort&&this.tsSubmit?(this.adaptee.abort(),this.state="aborted",this.tsAbort=Date.now(),t(null,!0)):t(null,!1)}},submit:{promise:!0,value(t,e){if(!(h.isVoid(t)||d.isBuffer(t)||h.isInput(t)||h.isCollection(t)))return void e(h.error(400));if(this.tsSubmit)return;this.ready(e);let s=["PATCH","POST","PUT"].includes(this.method),i=s?"":h.toQueryString(t,!0),o=s?t:void 0;if(o&&h.isCollection(t)&&!d.isBuffer(t)&&(o=JSON.stringify(t)),r){let t=this.protocol.startsWith("https")?n:r,e=this.adaptee=t.request({hostname:this.hostname,keepAlive:this.keepAlive>0,keepAliveMsecs:this.keepAlive,method:this.method,path:this.pathname+(i||this.search),port:this.port,protocol:this.protocol,withCredentials:!1});Object.keys(this.headers).forEach(t=>h.isInput(this.headers[t],!0)&&e.setHeader(t,this.headers[t])),e.once("error",this._handleError),e.once("response",this._handleResponse)}if(!r){let t=this.adaptee=new XMLHttpRequest;t.open(this.method,i?`${this.url.replace(/\?.*/,"")}${i}`:this.url,!0),Object.keys(this.headers).forEach(e=>h.isInput(this.headers[e],!0)&&t.setRequestHeader(e,this.headers[e])),t.addEventListener("progress",this._handleResponse),t.addEventListener("progress",this._handleDownload),t.addEventListener("load",this._handleResponse),t.addEventListener("load",this._handleEnd),t.addEventListener("error",this._handleError),t.upload.addEventListener("error",this._handleError)}this.state="pending",this.tsSubmit=Date.now(),this.adaptee[r?"end":"send"](o),this.emit("submit",t)}},adaptee:{set(t){return this.adaptee||t},validate:t=>!h.isObject(t)&&"Object"},chunks:{set(t){return this.chunks||t},validate:t=>!h.isArray(t)&&"Array"},data:{set(t){return h.isDefined(this.data)?this.data:t}},downLoaded:{set:t=>t,validate:t=>!h.isInt(t,!0)&&"number"},downRatio:{get(){return h.isVoid(this.downTotal)?null:this.downTotal?this.downLoaded/this.downTotal:1}},downTotal:{set(t){return h.isDefined(this.downTotal)?this.downTotal:t},validate:t=>!h.isNull(t)&&!h.isInt(t,!0)&&"number"},error:{set(t){return h.isDefined(this.error)?this.error:t},validate:t=>!h.isNull(t)&&!h.isObject(t)&&"Object"},headers:{set(t){return this.headers||h.isObject(t)&&h.cloneDeep(t)},validate:t=>!h.isObject(t)&&"Object"},host:{get(){return`${this.hostname||""}${this.port?`:${this.port}`:""}`}},hostname:{set(t){return this.hostname||t},validate:t=>!h.isString(t,!0)&&"string"},keepAlive:{set(t){return h.isDefined(this.keepAlive)?this.keepAlive:t},validate:t=>!h.isInt(t,!0)&&"number"},method:{set(t){return this.method||h.upperCase(t)},validate:t=>!h.isString(t,!0)&&"string"},parser:{set(t){return this.parser||t},validate(t){return!this.parsers.includes(t)&&"string"}},parsers:{frozen:!0,writable:!1,value:["buffer","json","text"]},path:{set(t){return h.isDefined(this.path)?this.path:t},then(t){let e=t.match(/([^?]*)(.*)/);this.pathname=e[1],this.query=e[2].slice(1)},validate:t=>!h.isString(t)&&"string"},pathname:{set(t){return h.isDefined(this.pathname)?this.pathname:t},validate:t=>!h.isString(t)&&"string"},port:{set(t){return h.isDefined(this.port)?this.port:t},validate:t=>!h.isNull(t)&&!h.isNumeric(t,!0)&&"number"},protocol:{set(t){return this.protocol||t},validate:t=>!h.isString(t,!0)&&"string"},query:{set(t){return h.isDefined(this.query)?this.query:t},validate:t=>!h.isString(t)&&"string"},response:{set(t){return this.response||t},validate:t=>!h.isObject(t)&&"Object"},search:{get(){return this.query?`?${this.query}`:""}},state:{set:t=>t,then(t){return"idle"!==t&&this.emit("state",t)},validate(t){return!this.states.includes(t)&&"string"}},states:{frozen:!0,writable:!1,value:["aborted","complete","failed","idle","pending"]},statusCode:{set(t){return this.statusCode||t},validate:t=>!h.isInt(t,!0)&&"number"},statusMessage:{set(t){return h.isDefined(this.statusMessage)?this.statusMessage:t},validate:t=>!h.isNull(t)&&!h.isString(t)&&"string"},time:{get(){return this.tsData?this.tsData-this.tsSubmit:void 0}},tsAbort:{set(t){return this.tsAbort||t},validate:t=>!h.isInt(t,!0)&&"number"},tsData:{set(t){return this.tsData||t},validate:t=>!h.isInt(t,!0)&&"number"},tsResponse:{set(t){return this.tsResponse||t},validate:t=>!h.isInt(t,!0)&&"number"},tsSubmit:{set(t){return this.tsSubmit||t},validate:t=>!h.isInt(t,!0)&&"number"},url:{set(t){return this.url||t},validate:t=>!h.isString(t,!0)&&"string"},_handleDownload(t){r&&"buffer"!==this.parser&&this.chunks.push(t),this.emit("download",this.downLoaded+=r?h.byteLength(t):t.loaded,this.downTotal)},_handleEnd(t,e){let s="buffer"!==this.parser?r?this.chunks.join(""):e.target.response:null;this.data="json"===this.parser?h.toDefined(h.parseJSON(s.toString())):s,this.state=this.error?"failed":"complete",this.tsData=Date.now(),this.emit(this.error?"error":"data",this.error||this.data),"buffer"!==this.parser&&t(this.error,this.data)},_handleError(t,e){this.error=h.error(0,r?e.message:"Request not sent."),this.state="failed",this.emit("error",this.error),t(this.error,null)},_handleResponse(t,e){h.isDefined(this.statusCode)||(this.response=r?e:e.target,this.statusCode=this.response[r?"statusCode":"status"]||502,this.statusMessage=this.response[r?"statusMessage":"statusText"]||o[this.statusCode]||null,this.error=this.statusCode>=400?h.error(this.statusCode,this.statusMessage):null,this.downTotal=h.toDefined(h.toFinite(r?this.response.headers["content-length"]:this.response.getResponseHeader("Content-Length"))),this.tsResponse=Date.now(),r&&this.response.on("data",this._handleDownload),r&&this.response.once("end",this._handleEnd),this.emit("response",this.response),"buffer"===this.parser&&t(this.error,this.error?null:this.response))}}),"undefined"!=typeof window&&(window.XPRequest=t.exports)}).call(e,s(2))},function(t,e){var s;s=function(){return this}();try{s=s||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(s=window)}t.exports=s},function(t,e){t.exports=http},function(t,e){t.exports=https},function(t,e){t.exports=XP},function(t,e){t.exports=XPBuffer},function(t,e){t.exports=XPEmitter}]);