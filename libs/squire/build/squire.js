!function(e,t){"use strict";function n(e,t,n){this.root=this.currentNode=e,this.nodeType=t,this.filter=n}function r(e,t){for(var n=e.length;n--;)if(!t(e[n]))return!1;return!0}function o(e,t,n){if(e.nodeName!==t)return!1;for(var r in n)if(e.getAttribute(r)!==n[r])return!1;return!0}function i(e,t){return e.nodeType===t.nodeType&&e.nodeName===t.nodeName&&e.className===t.className&&(!e.style&&!t.style||e.style.cssText===t.style.cssText)}function a(e){return e.nodeType===x&&!!et[e.nodeName]}function s(e){return J.test(e.nodeName)}function d(e){return e.nodeType===x&&!s(e)&&r(e.childNodes,s)}function l(e){return e.nodeType===x&&!s(e)&&!d(e)}function c(e){var t=e.ownerDocument,r=new n(t.body,R,d,!1);return r.currentNode=e,r}function f(e){return c(e).previousNode()}function h(e){return c(e).nextNode()}function u(e,t,n){do if(o(e,t,n))return e;while(e=e.parentNode);return null}function p(e){var t,n,r,o,i=e.parentNode;return i&&e.nodeType===x?(t=p(i),t+=(t?">":"")+e.nodeName,(n=e.id)&&(t+="#"+n),(r=e.className.trim())&&(o=r.split(/\s\s*/),o.sort(),t+=".",t+=o.join("."))):t=i?p(i):"",t}function m(e){var t=e.nodeType;return t===x?e.childNodes.length:e.length||0}function g(e){var t=e.parentNode;return t&&t.removeChild(e),e}function v(e,t){var n=e.parentNode;n&&n.replaceChild(t,e)}function N(e){for(var t=e.ownerDocument.createDocumentFragment(),n=e.childNodes,r=n?n.length:0;r--;)t.appendChild(e.firstChild);return t}function C(e,n,r,o){var i,a,s,d,l=e.createElement(n);if(r instanceof Array&&(o=r,r=null),r)for(i in r)a=r[i],a!==t&&l.setAttribute(i,r[i]);if(o)for(s=0,d=o.length;d>s;s+=1)l.appendChild(o[s]);return l}function S(e){var t,n,r,o,i=e.ownerDocument,d=e;if("BODY"===e.nodeName&&((n=e.firstChild)&&"BR"!==n.nodeName||(t=i.createElement("DIV"),n?e.replaceChild(t,n):e.appendChild(t),e=t,t=null)),s(e)){for(n=e.firstChild;Q&&n&&n.nodeType===L&&!n.data;)e.removeChild(n),n=e.firstChild;if(!n)if(Q)for(t=i.createTextNode(U),r=Nt.length;r--;)o=Nt[r],o._doc===i&&o._didAddZWS();else t=i.createTextNode("")}else if(q){for(;e.nodeType!==L&&!a(e);){if(n=e.firstChild,!n){t=i.createTextNode("");break}e=n}e.nodeType===L?/^ +$/.test(e.data)&&(e.data=""):a(e)&&e.parentNode.insertBefore(i.createTextNode(""),e)}else if(!e.querySelector("BR"))for(t=i.createElement("BR");(n=e.lastElementChild)&&!s(n);)e=n;return t&&e.appendChild(t),d}function _(e){var t,n,r,o,i=e.childNodes,a=e.ownerDocument,d=null;for(t=0,n=i.length;n>t;t+=1)r=i[t],o="BR"===r.nodeName,!o&&s(r)?(d||(d=C(a,"DIV")),d.appendChild(r),t-=1,n-=1):(o||d)&&(d||(d=C(a,"DIV")),S(d),o?e.replaceChild(d,r):(e.insertBefore(d,r),t+=1,n+=1),d=null),l(r)&&_(r);return d&&e.appendChild(S(d)),e}function y(e,t,n){var r,o,i,a=e.nodeType;if(a===L&&e!==n)return y(e.parentNode,e.splitText(t),n);if(a===x){if("number"==typeof t&&(t=t<e.childNodes.length?e.childNodes[t]:null),e===n)return t;for(r=e.parentNode,o=e.cloneNode(!1);t;)i=t.nextSibling,o.appendChild(t),t=i;return S(e),S(o),(i=e.nextSibling)?r.insertBefore(o,i):r.appendChild(o),y(r,o,n)}return t}function E(e,t){if(e.nodeType===x)for(var n,r,o,a=e.childNodes,d=a.length,l=[];d--;)if(n=a[d],r=d&&a[d-1],d&&s(n)&&i(n,r)&&!et[n.nodeName])t.startContainer===n&&(t.startContainer=r,t.startOffset+=m(r)),t.endContainer===n&&(t.endContainer=r,t.endOffset+=m(r)),t.startContainer===e&&(t.startOffset>d?t.startOffset-=1:t.startOffset===d&&(t.startContainer=r,t.startOffset=m(r))),t.endContainer===e&&(t.endOffset>d?t.endOffset-=1:t.endOffset===d&&(t.endContainer=r,t.endOffset=m(r))),g(n),n.nodeType===L?r.appendData(n.data):l.push(N(n));else if(n.nodeType===x){for(o=l.length;o--;)n.appendChild(l.pop());E(n,t)}}function T(e,t,n){for(var r,o,i,a=t;1===a.parentNode.childNodes.length;)a=a.parentNode;g(a),o=e.childNodes.length,r=e.lastChild,r&&"BR"===r.nodeName&&(e.removeChild(r),o-=1),i={startContainer:e,startOffset:o,endContainer:e,endOffset:o},e.appendChild(N(t)),E(e,i),n.setStart(i.startContainer,i.startOffset),n.collapse(!0),K&&(r=e.lastChild)&&"BR"===r.nodeName&&e.removeChild(r)}function B(e){var t,n,r=e.previousSibling,o=e.firstChild,a=e.ownerDocument,s="LI"===e.nodeName;if(!s||o&&/^[OU]L$/.test(o.nodeName))if(r&&i(r,e)){if(!l(r)){if(!s)return;n=a.createElement("DIV"),n.appendChild(N(r)),r.appendChild(n)}g(e),t=!l(e),r.appendChild(N(e)),t&&_(r),o&&B(o)}else s&&(r=a.createElement("DIV"),e.insertBefore(r,o),S(r))}function b(e){var n=e.defaultView,r=e.body;this._win=n,this._doc=e,this._body=r,this._events={},this._sel=n.getSelection(),this._lastSelection=null,G&&this.addEventListener("beforedeactivate",this.getSelection),this._hasZWS=!1,this._lastAnchorNode=null,this._lastFocusNode=null,this._path="",this.addEventListener("keyup",this._updatePathOnEvent),this.addEventListener("mouseup",this._updatePathOnEvent),n.addEventListener("focus",this,!1),n.addEventListener("blur",this,!1),this._undoIndex=-1,this._undoStack=[],this._undoStackLength=0,this._isInUndoState=!1,this.defaultBlockProperties=t,this.addEventListener("keyup",this._docWasChanged),this._awaitingPaste=!1,this.addEventListener(M?"beforecut":"cut",this._onCut),this.addEventListener(M?"beforepaste":"paste",this._onPaste),this.addEventListener(K?"keypress":"keydown",this._onKey),$(e)&&(n.Text.prototype.splitText=function(e){var t=this.ownerDocument.createTextNode(this.data.slice(e)),n=this.nextSibling,r=this.parentNode,o=this.length-e;return n?r.insertBefore(t,n):r.appendChild(t),o&&this.deleteData(e,o),t}),r.setAttribute("contenteditable","true"),this.setHTML("");try{e.execCommand("enableObjectResizing",!1,"false"),e.execCommand("enableInlineTableEditing",!1,"false")}catch(o){}Nt.push(this)}var k=2,x=1,L=3,R=1,A=4,O=0,D=1,I=2,P=3,U="​",w=e.defaultView,F=navigator.userAgent,V=/iP(?:ad|hone|od)/.test(F),H=/Mac OS X/.test(F),W=/Gecko\//.test(F),M=/Trident\/[456]\./.test(F),K=!!w.opera,z=/WebKit\//.test(F),Z=H?"meta-":"ctrl-",q=M||K,Q=M||z,G=M,$=function(e){var t=e.createElement("DIV"),n=e.createTextNode("12");return t.appendChild(n),n.splitText(2),2!==t.childNodes.length},Y=/[^ \t\r\n]/,j=Array.prototype.indexOf,X={1:1,2:2,3:4,8:128,9:256,11:1024};n.prototype.nextNode=function(){for(var e,t=this.currentNode,n=this.root,r=this.nodeType,o=this.filter;;){for(e=t.firstChild;!e&&t&&t!==n;)e=t.nextSibling,e||(t=t.parentNode);if(!e)return null;if(X[e.nodeType]&r&&o(e))return this.currentNode=e,e;t=e}},n.prototype.previousNode=function(){for(var e,t=this.currentNode,n=this.root,r=this.nodeType,o=this.filter;;){if(t===n)return null;if(e=t.previousSibling)for(;t=e.lastChild;)e=t;else e=t.parentNode;if(!e)return null;if(X[e.nodeType]&r&&o(e))return this.currentNode=e,e;t=e}};var J=/^(?:#text|A(?:BBR|CRONYM)?|B(?:R|D[IO])?|C(?:ITE|ODE)|D(?:ATA|FN|EL)|EM|FONT|HR|I(?:NPUT|MG|NS)?|KBD|Q|R(?:P|T|UBY)|S(?:U[BP]|PAN|TR(?:IKE|ONG)|MALL|AMP)?|U|VAR|WBR)$/,et={BR:1,IMG:1,INPUT:1},tt=function(e,t){for(var n=e.childNodes;t&&e.nodeType===x;)e=n[t-1],n=e.childNodes,t=n.length;return e},nt=function(e,t){if(e.nodeType===x){var n=e.childNodes;if(t<n.length)e=n[t];else{for(;e&&!e.nextSibling;)e=e.parentNode;e&&(e=e.nextSibling)}}return e},rt=function(e,t){e=e.cloneRange(),ct(e);for(var r=e.startContainer,o=e.endContainer,i=e.commonAncestorContainer,a=new n(i,A,function(){return!0},!1),s=a.currentNode=r;!t(s,e)&&s!==o&&(s=a.nextNode()););},ot=function(e){var t="";return rt(e,function(e,n){var r=e.data;r&&/\S/.test(r)&&(e===n.endContainer&&(r=r.slice(0,n.endOffset)),e===n.startContainer&&(r=r.slice(n.startOffset)),t+=r)}),t},it=function(e,t){var n,r,o,i,a=e.startContainer,s=e.startOffset,d=e.endContainer,l=e.endOffset;a.nodeType===L?(n=a.parentNode,r=n.childNodes,s===a.length?(s=j.call(r,a)+1,e.collapsed&&(d=n,l=s)):(s&&(i=a.splitText(s),d===a?(l-=s,d=i):d===n&&(l+=1),a=i),s=j.call(r,a)),a=n):r=a.childNodes,o=r.length,s===o?a.appendChild(t):a.insertBefore(t,r[s]),a===d&&(l+=r.length-o),e.setStart(a,s),e.setEnd(d,l)},at=function(e,t){var n=e.startContainer,r=e.startOffset,o=e.endContainer,i=e.endOffset;t||(t=e.commonAncestorContainer),t.nodeType===L&&(t=t.parentNode);for(var a,s=y(o,i,t),d=y(n,r,t),l=t.ownerDocument.createDocumentFragment();d!==s;)a=d.nextSibling,l.appendChild(d),d=a;return e.setStart(t,s?j.call(t.childNodes,s):t.childNodes.length),e.collapse(!0),S(t),l},st=function(e){ft(e),at(e);var t=ht(e),n=ut(e);t&&n&&t!==n&&T(t,n,e),t&&S(t);var r=e.endContainer.ownerDocument.body,o=r.firstChild;o&&"BR"!==o.nodeName||(S(r),e.selectNodeContents(r.firstChild));var i=e.collapsed;ct(e),i&&e.collapse(!0)},dt=function(e,t){for(var n=!0,r=t.childNodes,o=r.length;o--;)if(!s(r[o])){n=!1;break}if(e.collapsed||st(e),ct(e),n)it(e,t),e.collapse(!1);else{for(var i,a,d=y(e.startContainer,e.startOffset,e.startContainer.ownerDocument.body),l=d.previousSibling,c=l,f=c.childNodes.length,u=d,p=0,g=d.parentNode;(i=c.lastChild)&&i.nodeType===x&&"BR"!==i.nodeName;)c=i,f=c.childNodes.length;for(;(i=u.firstChild)&&i.nodeType===x&&"BR"!==i.nodeName;)u=i;for(;(i=t.firstChild)&&s(i);)c.appendChild(i);for(;(i=t.lastChild)&&s(i);)u.insertBefore(i,u.firstChild),p+=1;for(a=t;a=h(a);)S(a);g.insertBefore(t,d),a=d.previousSibling,d.textContent?B(d):g.removeChild(d),d.parentNode||(u=a,p=m(u)),l.textContent?B(l):(c=l.nextSibling,f=0,g.removeChild(l)),e.setStart(c,f),e.setEnd(u,p),ct(e)}},lt=function(e,t,n){var r=t.ownerDocument.createRange();if(r.selectNode(t),n){var o=e.compareBoundaryPoints(P,r)>-1,i=e.compareBoundaryPoints(D,r)<1;return!o&&!i}var a=e.compareBoundaryPoints(O,r)<1,s=e.compareBoundaryPoints(I,r)>-1;return a&&s},ct=function(e){for(var t,n=e.startContainer,r=e.startOffset,o=e.endContainer,i=e.endOffset;n.nodeType!==L&&(t=n.childNodes[r],t&&!a(t));)n=t,r=0;if(i)for(;o.nodeType!==L&&(t=o.childNodes[i-1],t&&!a(t));)o=t,i=m(o);else for(;o.nodeType!==L&&(t=o.firstChild,t&&!a(t));)o=t;e.collapsed?(e.setStart(o,i),e.setEnd(n,r)):(e.setStart(n,r),e.setEnd(o,i))},ft=function(e,t){var n,r=e.startContainer,o=e.startOffset,i=e.endContainer,a=e.endOffset;for(t||(t=e.commonAncestorContainer);r!==t&&!o;)n=r.parentNode,o=j.call(n.childNodes,r),r=n;for(;i!==t&&a===m(i);)n=i.parentNode,a=j.call(n.childNodes,i)+1,i=n;e.setStart(r,o),e.setEnd(i,a)},ht=function(e){var t,n=e.startContainer;return s(n)?t=f(n):d(n)?t=n:(t=tt(n,e.startOffset),t=h(t)),t&&lt(e,t,!0)?t:null},ut=function(e){var t,n,r=e.endContainer;if(s(r))t=f(r);else if(d(r))t=r;else{if(t=nt(r,e.endOffset),!t)for(t=r.ownerDocument.body;n=t.lastChild;)t=n;t=f(t)}return t&&lt(e,t,!0)?t:null},pt=new n(null,A|R,function(e){return e.nodeType===L?Y.test(e.data):"IMG"===e.nodeName}),mt=function(e){var t=e.startContainer,n=e.startOffset;if(t.nodeType===L){if(n)return!1;pt.currentNode=t}else pt.currentNode=nt(t,n);return pt.root=ht(e),!pt.previousNode()},gt=function(e){var t,n=e.endContainer,r=e.endOffset;if(n.nodeType===L){if(t=n.data.length,t&&t>r)return!1;pt.currentNode=n}else pt.currentNode=tt(n,r);return pt.root=ut(e),!pt.nextNode()},vt=function(e){var t,n=ht(e),r=ut(e);n&&r&&(t=n.parentNode,e.setStart(t,j.call(t.childNodes,n)),t=r.parentNode,e.setEnd(t,j.call(t.childNodes,r)+1))},Nt=[],Ct=b.prototype;Ct.createElement=function(e,t,n){return C(this._doc,e,t,n)},Ct.createDefaultBlock=function(e){return S(this.createElement("DIV",this.defaultBlockProperties,e))},Ct.didError=function(e){console.log(e)},Ct.getDocument=function(){return this._doc};var St={focus:1,blur:1,pathChange:1,select:1,input:1,undoStateChange:1};Ct.fireEvent=function(e,t){var n,r,o,i=this._events[e];if(i)for(t||(t={}),t.type!==e&&(t.type=e),i=i.slice(),n=0,r=i.length;r>n;n+=1){o=i[n];try{o.handleEvent?o.handleEvent(t):o.call(this,t)}catch(a){a.details="Squire: fireEvent error. Event type: "+e,this.didError(a)}}return this},Ct.destroy=function(){var e,t=this._win,n=this._doc,r=this._events;t.removeEventListener("focus",this,!1),t.removeEventListener("blur",this,!1);for(e in r)St[e]||n.removeEventListener(e,this,!0);for(var o=Nt.length;o--;)Nt[o]===this&&Nt.splice(o,1)},Ct.handleEvent=function(e){this.fireEvent(e.type,e)},Ct.addEventListener=function(e,t){var n=this._events[e];return t?(n||(n=this._events[e]=[],St[e]||this._doc.addEventListener(e,this,!0)),n.push(t),this):(this.didError({name:"Squire: addEventListener with null or undefined fn",message:"Event type: "+e}),this)},Ct.removeEventListener=function(e,t){var n,r=this._events[e];if(r){for(n=r.length;n--;)r[n]===t&&r.splice(n,1);r.length||(delete this._events[e],St[e]||this._doc.removeEventListener(e,this,!1))}return this},Ct._createRange=function(e,t,n,r){if(e instanceof this._win.Range)return e.cloneRange();var o=this._doc.createRange();return o.setStart(e,t),n?o.setEnd(n,r):o.setEnd(e,t),o},Ct.setSelection=function(e){if(e){V&&this._win.focus();var t=this._sel;t.removeAllRanges(),t.addRange(e)}return this},Ct.getSelection=function(){var e,t,n,r=this._sel;return r.rangeCount?(e=r.getRangeAt(0).cloneRange(),t=e.startContainer,n=e.endContainer,t&&a(t)&&e.setStartBefore(t),n&&a(n)&&e.setEndBefore(n),this._lastSelection=e):e=this._lastSelection,e||(e=this._createRange(this._body.firstChild,0)),e},Ct.getSelectedText=function(){return ot(this.getSelection())},Ct.getPath=function(){return this._path};var _t=function(e){for(var t,r,o=new n(e,A,function(){return!0},!1);t=o.nextNode();)for(;(r=t.data.indexOf(U))>-1;)t.deleteData(r,1)};Ct._didAddZWS=function(){this._hasZWS=!0},Ct._removeZWS=function(){this._hasZWS&&(_t(this._body),this._hasZWS=!1)},Ct._updatePath=function(e,t){var n,r=e.startContainer,o=e.endContainer;(t||r!==this._lastAnchorNode||o!==this._lastFocusNode)&&(this._lastAnchorNode=r,this._lastFocusNode=o,n=r&&o?r===o?p(o):"(selection)":"",this._path!==n&&(this._path=n,this.fireEvent("pathChange",{path:n}))),r!==o&&this.fireEvent("select")},Ct._updatePathOnEvent=function(){this._updatePath(this.getSelection())},Ct.focus=function(){return this._body.focus(),this._win.focus(),this},Ct.blur=function(){return W&&this._body.blur(),top.focus(),this};var yt="squire-selection-start",Et="squire-selection-end";Ct._saveRangeToBookmark=function(e){var t,n=this.createElement("INPUT",{id:yt,type:"hidden"}),r=this.createElement("INPUT",{id:Et,type:"hidden"});it(e,n),e.collapse(!1),it(e,r),n.compareDocumentPosition(r)&k&&(n.id=Et,r.id=yt,t=n,n=r,r=t),e.setStartAfter(n),e.setEndBefore(r)},Ct._getRangeAndRemoveBookmark=function(e){var t=this._doc,n=t.getElementById(yt),r=t.getElementById(Et);if(n&&r){var o,i=n.parentNode,a=r.parentNode,s={startContainer:i,endContainer:a,startOffset:j.call(i.childNodes,n),endOffset:j.call(a.childNodes,r)};i===a&&(s.endOffset-=1),g(n),g(r),E(i,s),i!==a&&E(a,s),e||(e=t.createRange()),e.setStart(s.startContainer,s.startOffset),e.setEnd(s.endContainer,s.endOffset),o=e.collapsed,ct(e),o&&e.collapse(!0)}return e||null},Ct._docWasChanged=function(e){var t=e&&e.keyCode;(!e||!e.ctrlKey&&!e.metaKey&&!e.altKey&&(16>t||t>20)&&(33>t||t>45))&&(this._isInUndoState&&(this._isInUndoState=!1,this.fireEvent("undoStateChange",{canUndo:!0,canRedo:!1})),this.fireEvent("input"))},Ct._recordUndoState=function(e){if(!this._isInUndoState){var t=this._undoIndex+=1,n=this._undoStack;t<this._undoStackLength&&(n.length=this._undoStackLength=t),e&&this._saveRangeToBookmark(e),n[t]=this._getHTML(),this._undoStackLength+=1,this._isInUndoState=!0}},Ct.undo=function(){if(0!==this._undoIndex||!this._isInUndoState){this._recordUndoState(this.getSelection()),this._undoIndex-=1,this._setHTML(this._undoStack[this._undoIndex]);var e=this._getRangeAndRemoveBookmark();e&&this.setSelection(e),this._isInUndoState=!0,this.fireEvent("undoStateChange",{canUndo:0!==this._undoIndex,canRedo:!0}),this.fireEvent("input")}return this},Ct.redo=function(){var e=this._undoIndex,t=this._undoStackLength;if(t>e+1&&this._isInUndoState){this._undoIndex+=1,this._setHTML(this._undoStack[this._undoIndex]);var n=this._getRangeAndRemoveBookmark();n&&this.setSelection(n),this.fireEvent("undoStateChange",{canUndo:!0,canRedo:t>e+2}),this.fireEvent("input")}return this},Ct.hasFormat=function(e,t,r){if(e=e.toUpperCase(),t||(t={}),!r&&!(r=this.getSelection()))return!1;var o,i,a=r.commonAncestorContainer;if(u(a,e,t))return!0;if(a.nodeType===L)return!1;o=new n(a,A,function(e){return lt(r,e,!0)},!1);for(var s=!1;i=o.nextNode();){if(!u(i,e,t))return!1;s=!0}return s},Ct._addFormat=function(e,t,r){var o,i,a,s,d,l,c,f;if(r.collapsed)o=S(this.createElement(e,t)),it(r,o),r.setStart(o.firstChild,o.firstChild.length),r.collapse(!0);else{i=new n(r.commonAncestorContainer,A,function(e){return lt(r,e,!0)},!1),a=r.startContainer,d=r.startOffset,s=r.endContainer,l=r.endOffset,i.currentNode=a,a.nodeType!==L&&(a=i.nextNode(),d=0);do c=i.currentNode,f=!u(c,e,t),f&&(c===s&&c.length>l&&c.splitText(l),c===a&&d&&(c=c.splitText(d),s===a&&(s=c,l-=d),a=c,d=0),o=this.createElement(e,t),v(c,o),o.appendChild(c));while(i.nextNode());s.nodeType!==L&&(s=c,l=c.length),r=this._createRange(a,d,s,l)}return r},Ct._removeFormat=function(e,t,n,r){this._saveRangeToBookmark(n);var i,a=this._doc;n.collapsed&&(Q?(i=a.createTextNode(U),this._didAddZWS()):i=a.createTextNode(""),it(n,i));for(var d=n.commonAncestorContainer;s(d);)d=d.parentNode;var l=n.startContainer,c=n.startOffset,f=n.endContainer,h=n.endOffset,u=[],p=function(e,t){if(!lt(n,e,!1)){var r,o,i=e.nodeType===L;if(!lt(n,e,!0))return void("INPUT"===e.nodeName||i&&!e.data||u.push([t,e]));if(i)e===f&&h!==e.length&&u.push([t,e.splitText(h)]),e===l&&c&&(e.splitText(c),u.push([t,e]));else for(r=e.firstChild;r;r=o)o=r.nextSibling,p(r,t)}},m=Array.prototype.filter.call(d.getElementsByTagName(e),function(r){return lt(n,r,!0)&&o(r,e,t)});r||m.forEach(function(e){p(e,e)}),u.forEach(function(e){var t=e[0].cloneNode(!1),n=e[1];v(n,t),t.appendChild(n)}),m.forEach(function(e){v(e,N(e))}),this._getRangeAndRemoveBookmark(n),i&&n.collapse(!1);var g={startContainer:n.startContainer,startOffset:n.startOffset,endContainer:n.endContainer,endOffset:n.endOffset};return E(d,g),n.setStart(g.startContainer,g.startOffset),n.setEnd(g.endContainer,g.endOffset),n},Ct.changeFormat=function(e,t,n,r){return n||(n=this.getSelection())?(this._recordUndoState(n),this._getRangeAndRemoveBookmark(n),t&&(n=this._removeFormat(t.tag.toUpperCase(),t.attributes||{},n,r)),e&&(n=this._addFormat(e.tag.toUpperCase(),e.attributes||{},n)),this.setSelection(n),this._updatePath(n,!0),this._docWasChanged(),this):void 0};var Tt={DIV:"DIV",PRE:"DIV",H1:"DIV",H2:"DIV",H3:"DIV",H4:"DIV",H5:"DIV",H6:"DIV",P:"DIV",DT:"DD",DD:"DT",LI:"LI"},Bt=function(e,t,n){var r=Tt[e.nodeName],o=y(t,n,e.parentNode);return o.nodeName!==r&&(e=C(o.ownerDocument,r),e.className="rtl"===o.dir?"dir-rtl":"",e.dir=o.dir,v(o,e),e.appendChild(N(o)),o=e),o};Ct.forEachBlock=function(e,t,n){if(!n&&!(n=this.getSelection()))return this;t&&(this._recordUndoState(n),this._getRangeAndRemoveBookmark(n));var r=ht(n),o=ut(n);if(r&&o)do if(e(r)||r===o)break;while(r=h(r));return t&&(this.setSelection(n),this._updatePath(n,!0),this._docWasChanged()),this},Ct.modifyBlocks=function(e,t){if(!t&&!(t=this.getSelection()))return this;this._isInUndoState?this._saveRangeToBookmark(t):this._recordUndoState(t),vt(t);var n,r=this._body;return ft(t,r),n=at(t,r),it(t,e.call(this,n)),t.endOffset<t.endContainer.childNodes.length&&B(t.endContainer.childNodes[t.endOffset]),B(t.startContainer.childNodes[t.startOffset]),this._getRangeAndRemoveBookmark(t),this.setSelection(t),this._updatePath(t,!0),this._docWasChanged(),this};var bt=function(e){return this.createElement("BLOCKQUOTE",[e])},kt=function(e){var t=e.querySelectorAll("blockquote");return Array.prototype.filter.call(t,function(e){return!u(e.parentNode,"BLOCKQUOTE")}).forEach(function(e){v(e,N(e))}),e},xt=function(){return this.createDefaultBlock([this.createElement("INPUT",{id:yt,type:"hidden"}),this.createElement("INPUT",{id:Et,type:"hidden"})])},Lt=function(e,n,r){for(var o,i,a,s,d=c(n);o=d.nextNode();)i=o.parentNode.nodeName,"LI"!==i?(s=e.createElement("LI",{"class":"rtl"===o.dir?"dir-rtl":t,dir:o.dir||t}),(a=o.previousSibling)&&a.nodeName===r?a.appendChild(s):v(o,e.createElement(r,[s])),s.appendChild(o)):(o=o.parentNode.parentNode,i=o.nodeName,i!==r&&/^[OU]L$/.test(i)&&v(o,e.createElement(r,[N(o)])))},Rt=function(e){return Lt(this,e,"UL"),e},At=function(e){return Lt(this,e,"OL"),e},Ot=function(e){var t,n,r,o,i,a,s,d=e.querySelectorAll("UL, OL");for(t=0,n=d.length;n>t;t+=1){for(o=d[t],i=N(o),a=i.childNodes,r=a.length;r--;)s=a[r],v(s,N(s));_(i),v(o,i)}return e},Dt=function(e){var t,n,r,o,i,a=e.querySelectorAll("LI");for(t=0,n=a.length;n>t;t+=1)r=a[t],l(r.firstChild)||(o=r.parentNode.nodeName,i=r.previousSibling,i&&(i=i.lastChild)&&i.nodeName===o||v(r,this.createElement("LI",[i=this.createElement(o)])),i.appendChild(r));return e},It=function(e){var t=e.querySelectorAll("LI");return Array.prototype.filter.call(t,function(e){return!l(e.firstChild)}).forEach(function(t){var n,r=t.parentNode,o=r.parentNode,i=t.firstChild,a=i;for(t.previousSibling&&(r=y(r,t,o));a&&(n=a.nextSibling,!l(a));)o.insertBefore(a,r),a=n;for("LI"===o.nodeName&&i.previousSibling&&y(o,i,o.parentNode);t!==e&&!t.childNodes.length;)r=t.parentNode,r.removeChild(t),t=r},this),_(e),e},Pt=/\b((?:(?:ht|f)tps?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,}\/)(?:[^\s()<>]+|\([^\s()<>]+\))+(?:\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))|([\w\-.%+]+@(?:[\w\-]+\.)+[A-Z]{2,}\b)/i,Ut=function(e){for(var t,r,o,i,a,s,d,l=e.ownerDocument,c=new n(e,A,function(e){return!u(e,"A")},!1);t=c.nextNode();)for(r=t.data,o=t.parentNode;i=Pt.exec(r);)a=i.index,s=a+i[0].length,a&&(d=l.createTextNode(r.slice(0,a)),o.insertBefore(d,t)),d=l.createElement("A"),d.textContent=r.slice(a,s),d.href=i[1]?/^(?:ht|f)tps?:/.test(i[1])?i[1]:"http://"+i[1]:"mailto:"+i[2],o.insertBefore(d,t),t.data=r=r.slice(s)},wt=/^(?:A(?:DDRESS|RTICLE|SIDE)|BLOCKQUOTE|CAPTION|D(?:[DLT]|IV)|F(?:IGURE|OOTER)|H[1-6]|HEADER|L(?:ABEL|EGEND|I)|O(?:L|UTPUT)|P(?:RE)?|SECTION|T(?:ABLE|BODY|D|FOOT|H|HEAD|R)|UL)$/,Ft={1:10,2:13,3:16,4:18,5:24,6:32,7:48},Vt={backgroundColor:{regexp:Y,replace:function(e,t){return C(e,"SPAN",{"class":"highlight",style:"background-color: "+t})}},color:{regexp:Y,replace:function(e,t){return C(e,"SPAN",{"class":"colour",style:"color:"+t})}},fontWeight:{regexp:/^bold/i,replace:function(e){return C(e,"B")}},fontStyle:{regexp:/^italic/i,replace:function(e){return C(e,"I")}},fontFamily:{regexp:Y,replace:function(e,t){return C(e,"SPAN",{"class":"font",style:"font-family:"+t})}},fontSize:{regexp:Y,replace:function(e,t){return C(e,"SPAN",{"class":"size",style:"font-size:"+t})}}},Ht=function(e){return function(t,n){var r=C(t.ownerDocument,e);return n.replaceChild(r,t),r.appendChild(N(t)),r}},Wt={SPAN:function(e,t){var n,r,o,i,a,s,d=e.style,l=e.ownerDocument;for(n in Vt)r=Vt[n],o=d[n],o&&r.regexp.test(o)&&(s=r.replace(l,o),i&&i.appendChild(s),i=s,a||(a=s));return a&&(i.appendChild(N(e)),t.replaceChild(a,e)),i||e},STRONG:Ht("B"),EM:Ht("I"),STRIKE:Ht("S"),FONT:function(e,t){var n,r,o,i,a,s=e.face,d=e.size,l=e.color,c=e.ownerDocument;return s&&(n=C(c,"SPAN",{"class":"font",style:"font-family:"+s}),a=n,i=n),d&&(r=C(c,"SPAN",{"class":"size",style:"font-size:"+Ft[d]+"px"}),a||(a=r),i&&i.appendChild(r),i=r),l&&/^#?([\dA-F]{3}){1,2}$/i.test(l)&&("#"!==l.charAt(0)&&(l="#"+l),o=C(c,"SPAN",{"class":"colour",style:"color:"+l}),a||(a=o),i&&i.appendChild(o),i=o),a||(a=i=C(c,"SPAN")),t.replaceChild(a,e),i.appendChild(N(e)),i},TT:function(e,t){var n=C(e.ownerDocument,"SPAN",{"class":"font",style:'font-family:menlo,consolas,"courier new",monospace'});return t.replaceChild(n,e),n.appendChild(N(e)),n}},Mt=function(e){for(var t,n=e.childNodes,r=n.length;r--;)t=n[r],t.nodeType!==x||a(t)?t.nodeType!==L||t.data||e.removeChild(t):(Mt(t),s(t)&&!t.firstChild&&e.removeChild(t))},Kt=function(e,t){var n,r,o,i,a,d,l,c,f,h,u=e.childNodes;for(n=0,r=u.length;r>n;n+=1)if(o=u[n],i=o.nodeName,a=o.nodeType,d=Wt[i],a===x){if(l=o.childNodes.length,d)o=d(o,e);else{if(!wt.test(i)&&!s(o)){n-=1,r+=l-1,e.replaceChild(N(o),o);continue}!t&&o.style.cssText&&o.removeAttribute("style")}l&&Kt(o,t)}else{if(a===L){if(c=o.data,/\S/.test(c)){if(s(e))continue;if(f=0,h=c.length,!n||!s(u[n-1])){for(;h>f&&!Y.test(c.charAt(f));)f+=1;f&&(o.data=c=c.slice(f),h-=f)}if(n+1===r||!s(u[n+1])){for(f=h;f>0&&!Y.test(c.charAt(f-1));)f-=1;h>f&&(o.data=c.slice(0,f))}continue}if(n&&r>n+1&&s(u[n-1])&&s(u[n+1])){o.data=" ";continue}}e.removeChild(o),n-=1,r-=1}return e},zt=function(e){return e.nodeType===x?"BR"===e.nodeName:Y.test(e.data)},Zt=function(e){for(var t,r=e.parentNode;s(r);)r=r.parentNode;return t=new n(r,R|A,zt),t.currentNode=e,!!t.nextNode()},qt=function(e){var t,n,r,o=e.querySelectorAll("BR"),i=[],a=o.length;for(t=0;a>t;t+=1)i[t]=Zt(o[t]);for(;a--;)if(n=o[a],r=n.parentNode){for(;s(r);)r=r.parentNode;if(d(r)){if(i[a]){if("DIV"!==r.nodeName)continue;y(n.parentNode,n,r.parentNode)}g(n)}else _(r)}};Ct._ensureBottomLine=function(){var e=this._body,t=e.lastChild;t&&"DIV"===t.nodeName&&d(t)||e.appendChild(this.createDefaultBlock())},Ct._onCut=function(){var e=this.getSelection(),t=this;this._recordUndoState(e),this._getRangeAndRemoveBookmark(e),this.setSelection(e),setTimeout(function(){try{t._ensureBottomLine()}catch(e){t.didError(e)}},0)},Ct._onPaste=function(e){if(!this._awaitingPaste){var t,n,r=e.clipboardData,o=r&&r.items,i=!1,a=!1;if(o){for(t=o.length;t--;){if(n=o[t].type,"text/html"===n){a=!1;break}/^image\/.*/.test(n)&&(a=!0)}if(a)return e.preventDefault(),this.fireEvent("dragover",{dataTransfer:r,preventDefault:function(){i=!0}}),void(i&&this.fireEvent("drop",{dataTransfer:r}))}this._awaitingPaste=!0;var s=this,d=this._body,l=this.getSelection(),c=l.startContainer,f=l.startOffset,u=l.endContainer,p=l.endOffset,m=ht(l);s._recordUndoState(l),s._getRangeAndRemoveBookmark(l);var v=this.createElement("DIV",{style:"position: absolute; overflow: hidden; top:"+(d.scrollTop+(m?m.getBoundingClientRect().top:0))+"px; left: 0; width: 1px; height: 1px;"});d.appendChild(v),l.selectNodeContents(v),this.setSelection(l),setTimeout(function(){try{var e=N(g(v)),t=e.firstChild,n=s._createRange(c,f,u,p);if(t){t===e.lastChild&&"DIV"===t.nodeName&&e.replaceChild(N(t),t),e.normalize(),Ut(e),Kt(e,!1),qt(e),Mt(e);for(var r=e,o=!0;r=h(r);)S(r);s.fireEvent("willPaste",{fragment:e,preventDefault:function(){o=!1}}),o&&(dt(n,e),s._docWasChanged(),n.collapse(!1),s._ensureBottomLine())}s.setSelection(n),s._updatePath(n,!0),s._awaitingPaste=!1}catch(i){s.didError(i)}},0)}};var Qt={8:"backspace",9:"tab",13:"enter",32:"space",37:"left",39:"right",46:"delete",219:"[",221:"]"},Gt=function(e){return function(t,n){n.preventDefault(),t[e]()}},$t=function(e,t){return t=t||null,function(n,r){r.preventDefault();var o=n.getSelection();n.hasFormat(e,null,o)?n.changeFormat(null,{tag:e},o):n.changeFormat({tag:e},t,o)}},Yt=function(e,t){try{t||(t=e.getSelection());var n,r=t.startContainer;for(r.nodeType===L&&(r=r.parentNode),n=r;s(n)&&(!n.textContent||n.textContent===U);)r=n,n=r.parentNode;r!==n&&(t.setStart(n,j.call(n.childNodes,r)),t.collapse(!0),n.removeChild(r),d(n)||(n=f(n)),S(n),ct(t)),e._ensureBottomLine(),e.setSelection(t),e._updatePath(t,!0)}catch(o){e.didError(o)}},jt={enter:function(e,t){t.preventDefault();var n,r,o,i,a,s=e.getSelection();if(s){if(e._recordUndoState(s),Ut(s.startContainer),e._removeZWS(),e._getRangeAndRemoveBookmark(s),s.collapsed||st(s),n=ht(s),n&&(r=u(n,"LI"))&&(n=r),o=n?n.nodeName:"DIV",i=Tt[o],!n)return it(s,e.createElement("BR")),s.collapse(!1),e.setSelection(s),e._updatePath(s,!0),void e._docWasChanged();var d,l=s.startContainer,c=s.startOffset;if(i||(l===n&&(l=c?l.childNodes[c-1]:null,c=0,l&&("BR"===l.nodeName?l=l.nextSibling:c=m(l),l&&"BR"!==l.nodeName||(d=S(e.createElement("DIV")),l?n.replaceChild(d,l):n.appendChild(d),l=d))),_(n),i="DIV",l||(l=n.firstChild),s.setStart(l,c),s.setEnd(l,c),n=ht(s)),!n.textContent){if(u(n,"UL")||u(n,"OL"))return e.modifyBlocks(It,s);if(u(n,"BLOCKQUOTE"))return e.modifyBlocks(xt,s)}for(a=Bt(n,l,c),_t(n),Mt(n),S(n);a.nodeType===x;){var f,h=a.firstChild;if("A"!==a.nodeName||a.textContent){for(;h&&h.nodeType===L&&!h.data&&(f=h.nextSibling,f&&"BR"!==f.nodeName);)g(h),h=f;if(!h||"BR"===h.nodeName||h.nodeType===L&&!K)break;a=h}else v(a,N(a)),a=h}s=e._createRange(a,0),e.setSelection(s),e._updatePath(s,!0),a.nodeType===L&&(a=a.parentNode);var p=e._doc,C=e._body;a.offsetTop+a.offsetHeight>(p.documentElement.scrollTop||C.scrollTop)+C.offsetHeight&&a.scrollIntoView(!1),e._docWasChanged()}},backspace:function(e,t){e._removeZWS();var n=e.getSelection();if(e._recordUndoState(n),e._getRangeAndRemoveBookmark(n),n.collapsed)if(mt(n)){t.preventDefault();var r=ht(n),o=r&&f(r);if(o){if(!o.isContentEditable)return void g(o);for(T(o,r,n),r=o.parentNode;r&&!r.nextSibling;)r=r.parentNode;r&&(r=r.nextSibling)&&B(r),e.setSelection(n)}else if(r){if(u(r,"UL")||u(r,"OL"))return e.modifyBlocks(It,n);if(u(r,"BLOCKQUOTE"))return e.modifyBlocks(kt,n);e.setSelection(n),e._updatePath(n,!0)}}else e.setSelection(n),setTimeout(function(){Yt(e)},0);else t.preventDefault(),st(n),Yt(e,n)},"delete":function(e,t){e._removeZWS();var n=e.getSelection();if(e._recordUndoState(n),e._getRangeAndRemoveBookmark(n),n.collapsed)if(gt(n)){t.preventDefault();var r=ht(n),o=r&&h(r);if(o){if(!o.isContentEditable)return void g(o);for(T(r,o,n),o=r.parentNode;o&&!o.nextSibling;)o=o.parentNode;o&&(o=o.nextSibling)&&B(o),e.setSelection(n),e._updatePath(n,!0)}}else e.setSelection(n),setTimeout(function(){Yt(e)},0);else t.preventDefault(),st(n),Yt(e,n)},tab:function(e,t){e._removeZWS();var n,r,o=e.getSelection();if(o.collapsed&&mt(o)&&gt(o)){for(n=ht(o);r=n.parentNode;){if("UL"===r.nodeName||"OL"===r.nodeName){n.previousSibling&&(t.preventDefault(),e.modifyBlocks(Dt,o));break}n=r}t.preventDefault()}},space:function(e){var t,n,r=e.getSelection();e._recordUndoState(r),Ut(r.startContainer),e._getRangeAndRemoveBookmark(r),t=r.endContainer,n=t.parentNode,r.collapsed&&"A"===n.nodeName&&!t.nextSibling&&r.endOffset===m(t)&&r.setStartAfter(n),e.setSelection(r)},left:function(e){e._removeZWS()},right:function(e){e._removeZWS()}};H&&W&&w.getSelection().modify&&(jt["meta-left"]=function(e,t){t.preventDefault(),e._sel.modify("move","backward","lineboundary")},jt["meta-right"]=function(e,t){t.preventDefault(),e._sel.modify("move","forward","lineboundary")}),jt[Z+"b"]=$t("B"),jt[Z+"i"]=$t("I"),jt[Z+"u"]=$t("U"),jt[Z+"shift-7"]=$t("S"),jt[Z+"shift-5"]=$t("SUB",{tag:"SUP"}),jt[Z+"shift-6"]=$t("SUP",{tag:"SUB"}),jt[Z+"shift-8"]=Gt("makeUnorderedList"),jt[Z+"shift-9"]=Gt("makeOrderedList"),jt[Z+"["]=Gt("decreaseQuoteLevel"),jt[Z+"]"]=Gt("increaseQuoteLevel"),jt[Z+"y"]=Gt("redo"),jt[Z+"z"]=Gt("undo"),jt[Z+"shift-z"]=Gt("redo"),Ct._onKey=function(e){var t=e.keyCode,n=Qt[t],r="";n||(n=String.fromCharCode(t).toLowerCase(),/^[A-Za-z0-9]$/.test(n)||(n="")),K&&46===e.which&&(n="."),t>111&&124>t&&(n="f"+(t-111)),"backspace"!==n&&"delete"!==n&&(e.altKey&&(r+="alt-"),e.ctrlKey&&(r+="ctrl-"),e.metaKey&&(r+="meta-")),e.shiftKey&&(r+="shift-"),n=r+n,jt[n]&&jt[n](this,e)},Ct._getHTML=function(){return this._body.innerHTML},Ct._setHTML=function(e){var t=this._body;t.innerHTML=e;do S(t);while(t=h(t))},Ct.getHTML=function(e){var t,n,r,o,i,a=[];if(e&&(i=this.getSelection())&&this._saveRangeToBookmark(i),q)for(t=this._body;t=h(t);)t.textContent||t.querySelector("BR")||(n=this.createElement("BR"),t.appendChild(n),a.push(n));if(r=this._getHTML().replace(/\u200B/g,""),q)for(o=a.length;o--;)g(a[o]);return i&&this._getRangeAndRemoveBookmark(i),r},Ct.setHTML=function(e){var t,n=this._doc.createDocumentFragment(),r=this.createElement("DIV");r.innerHTML=e,n.appendChild(N(r)),Kt(n,!0),qt(n),_(n);for(var o=n;o=h(o);)S(o);for(var i=this._body;t=i.lastChild;)i.removeChild(t);i.appendChild(n),S(i),this._undoIndex=-1,this._undoStack.length=0,this._undoStackLength=0,this._isInUndoState=!1;var a=this._getRangeAndRemoveBookmark()||this._createRange(i.firstChild,0);return this._recordUndoState(a),this._getRangeAndRemoveBookmark(a),G?this._lastSelection=a:this.setSelection(a),this._updatePath(a,!0),this},Ct.insertElement=function(e,t){if(t||(t=this.getSelection()),t.collapse(!0),s(e))it(t,e),t.setStartAfter(e);else{for(var n,r,o=this._body,i=ht(t)||o;i!==o&&!i.nextSibling;)i=i.parentNode;
i!==o&&(n=i.parentNode,r=y(n,i.nextSibling,o)),r?(o.insertBefore(e,r),t.setStart(r,0),t.setStart(r,0),ct(t)):(o.appendChild(e),o.appendChild(this.createDefaultBlock()),t.setStart(e,0),t.setEnd(e,0)),this.focus(),this.setSelection(t),this._updatePath(t)}return this},Ct.insertImage=function(e){var t=this.createElement("IMG",{src:e});return this.insertElement(t),t};var Xt=function(e,t,n){return function(){return this[e](t,n),this.focus()}};Ct.addStyles=function(e){if(e){var t=this._doc.documentElement.firstChild,n=this.createElement("STYLE",{type:"text/css"});n.styleSheet?(t.appendChild(n),n.styleSheet.cssText=e):(n.appendChild(this._doc.createTextNode(e)),t.appendChild(n))}return this},Ct.bold=Xt("changeFormat",{tag:"B"}),Ct.italic=Xt("changeFormat",{tag:"I"}),Ct.underline=Xt("changeFormat",{tag:"U"}),Ct.strikethrough=Xt("changeFormat",{tag:"S"}),Ct.subscript=Xt("changeFormat",{tag:"SUB"},{tag:"SUP"}),Ct.superscript=Xt("changeFormat",{tag:"SUP"},{tag:"SUB"}),Ct.removeBold=Xt("changeFormat",null,{tag:"B"}),Ct.removeItalic=Xt("changeFormat",null,{tag:"I"}),Ct.removeUnderline=Xt("changeFormat",null,{tag:"U"}),Ct.removeStrikethrough=Xt("changeFormat",null,{tag:"S"}),Ct.removeSubscript=Xt("changeFormat",null,{tag:"SUB"}),Ct.removeSuperscript=Xt("changeFormat",null,{tag:"SUP"}),Ct.makeLink=function(e,t){var n=this.getSelection();if(n.collapsed){var r=e.indexOf(":")+1;if(r)for(;"/"===e[r];)r+=1;it(n,this._doc.createTextNode(e.slice(r)))}return t||(t={}),t.href=e,this.changeFormat({tag:"A",attributes:t},{tag:"A"},n),this.focus()},Ct.removeLink=function(){return this.changeFormat(null,{tag:"A"},this.getSelection(),!0),this.focus()},Ct.setFontFace=function(e){return this.changeFormat({tag:"SPAN",attributes:{"class":"font",style:"font-family: "+e+", sans-serif;"}},{tag:"SPAN",attributes:{"class":"font"}}),this.focus()},Ct.setFontSize=function(e){return this.changeFormat({tag:"SPAN",attributes:{"class":"size",style:"font-size: "+("number"==typeof e?e+"px":e)}},{tag:"SPAN",attributes:{"class":"size"}}),this.focus()},Ct.setTextColour=function(e){return this.changeFormat({tag:"SPAN",attributes:{"class":"colour",style:"color: "+e}},{tag:"SPAN",attributes:{"class":"colour"}}),this.focus()},Ct.setHighlightColour=function(e){return this.changeFormat({tag:"SPAN",attributes:{"class":"highlight",style:"background-color: "+e}},{tag:"SPAN",attributes:{"class":"highlight"}}),this.focus()},Ct.setTextAlignment=function(e){return this.forEachBlock(function(t){t.className=(t.className.split(/\s+/).filter(function(e){return!/align/.test(e)}).join(" ")+" align-"+e).trim(),t.style.textAlign=e},!0),this.focus()},Ct.setTextDirection=function(e){return this.forEachBlock(function(t){t.className=(t.className.split(/\s+/).filter(function(e){return!/dir/.test(e)}).join(" ")+" dir-"+e).trim(),t.dir=e},!0),this.focus()},Ct.increaseQuoteLevel=Xt("modifyBlocks",bt),Ct.decreaseQuoteLevel=Xt("modifyBlocks",kt),Ct.makeUnorderedList=Xt("modifyBlocks",Rt),Ct.makeOrderedList=Xt("modifyBlocks",At),Ct.removeList=Xt("modifyBlocks",Ot),Ct.increaseListLevel=Xt("modifyBlocks",Dt),Ct.decreaseListLevel=Xt("modifyBlocks",It),top!==w?(w.editor=new b(e),w.onEditorLoad&&(w.onEditorLoad(w.editor),w.onEditorLoad=null)):w.Squire=b}(document);