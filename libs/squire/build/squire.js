/* Copyright © 2011-2012 by Neil Jenkins. Licensed under the MIT license. */(function(e){"use strict";var t=!e.createTreeWalker;window.ie===9&&(t=!0),t||function(){var n=e.createElement("div"),r=e.createTextNode("");n.appendChild(r);var i=n.cloneNode(!0),s=n.cloneNode(!0),o=n.cloneNode(!0),u=e.createTreeWalker(n,1,function(e){return 1},!1);n.appendChild(i),n.appendChild(s),n.appendChild(o),u.currentNode=o,u.previousNode()!==s&&(t=!0)}();if(!t)return;var n={1:1,2:2,3:4,8:128,9:256,11:1024},r=1,i=function(e,t,n){this.root=this.currentNode=e,this.nodeType=t,this.filter=n};i.prototype.nextNode=function(){var e=this.currentNode,t=this.root,i=this.nodeType,s=this.filter,o;for(;;){o=e.firstChild;while(!o&&e){if(e===t)break;o=e.nextSibling,o||(e=e.parentNode)}if(!o)return null;if(n[o.nodeType]&i&&s(o)===r)return this.currentNode=o,o;e=o}},i.prototype.previousNode=function(){var e=this.currentNode,t=this.root,i=this.nodeType,s=this.filter,o;for(;;){if(e===t)return null;o=e.previousSibling;if(o)while(e=o.lastChild)o=e;else o=e.parentNode;if(!o)return null;if(n[o.nodeType]&i&&s(o)===r)return this.currentNode=o,o;e=o}},e.createTreeWalker=function(e,t,n){return new i(e,t,n)}})(document),function(){"use strict";var e=function(e,t){var n=e.length,r,i;while(n--){r=e[n].prototype;for(i in t)r[i]=t[i]}},t=function(e,t){var n=e.length;while(n--)if(!t(e[n]))return!1;return!0},n=function(){return!1},r=function(){return!0},i=/^(?:A(?:BBR|CRONYM)?|B(?:R|D[IO])?|C(?:ITE|ODE)|D(?:FN|EL)|EM|FONT|HR|I(?:NPUT|MG|NS)?|KBD|Q|R(?:P|T|UBY)|S(?:U[BP]|PAN|TRONG|AMP)|U)$/,s={BR:1,IMG:1,INPUT:1},o=function(e,t){var n=t.parentNode;return n&&n.replaceChild(e,t),e},u=1,a=3,f=1,l=1,c=3,h=function(e){return e.isBlock()?l:c},p=!!window.opera||!!window.ie,d=/WebKit/.test(navigator.userAgent)||!!window.ie;e(window.Node?[Node]:[Text,Element,HTMLDocument],{isInline:n,isBlock:n,isContainer:n,getPath:function(){var e=this.parentNode;return e?e.getPath():""},detach:function(){var e=this.parentNode;return e&&e.removeChild(this),this},replaceWith:function(e){return o(e,this),this},replaces:function(e){return o(this,e),this},nearest:function(e,t){var n=this.parentNode;return n?n.nearest(e,t):null},getPreviousBlock:function(){var e=this.ownerDocument,t=e.createTreeWalker(e.body,f,h,!1);return t.currentNode=this,t.previousNode()},getNextBlock:function(){var e=this.ownerDocument,t=e.createTreeWalker(e.body,f,h,!1);return t.currentNode=this,t.nextNode()},split:function(e,t){return e},mergeContainers:function(){}}),e([Text],{isLeaf:r,isInline:r,getLength:function(){return this.length},isLike:function(e){return e.nodeType===a},split:function(e,t){var n=this;return n===t?e:n.parentNode.split(n.splitText(e),t)}}),e([Element],{isLeaf:function(){return!!s[this.nodeName]},isInline:function(){return i.test(this.nodeName)},isBlock:function(){return!this.isInline()&&t(this.childNodes,function(e){return e.isInline()})},isContainer:function(){return!this.isInline()&&!this.isBlock()},getLength:function(){return this.childNodes.length},getPath:function(){var e=this.nodeName;if(e==="BODY")return e;var t=this.parentNode.getPath(),n=this.id,r=this.className.trim();return t+=">"+e,n&&(t+="#"+n),r&&(r=r.split(/\s\s*/),r.sort(),t+=".",t+=r.join(".")),t},wraps:function(e){return o(this,e).appendChild(e),this},empty:function(){var e=this.ownerDocument.createDocumentFragment(),t=this.childNodes.length;while(t--)e.appendChild(this.firstChild);return e},is:function(e,t){if(this.nodeName!==e)return!1;var n;for(n in t)if(this.getAttribute(n)!==t[n])return!1;return!0},nearest:function(e,t){var n=this;do if(n.is(e,t))return n;while((n=n.parentNode)&&n.nodeType===u);return null},isLike:function(e){return e.nodeType===u&&e.nodeName===this.nodeName&&e.className===this.className&&e.style.cssText===this.style.cssText},mergeInlines:function(e){var t=this.childNodes,n=t.length,r=[],i,o,f;while(n--){i=t[n],o=n&&t[n-1];if(n&&i.isInline()&&i.isLike(o)&&!s[i.nodeName])e.startContainer===i&&(e.startContainer=o,e.startOffset+=o.getLength()),e.endContainer===i&&(e.endContainer=o,e.endOffset+=o.getLength()),e.startContainer===this&&(e.startOffset>n?e.startOffset-=1:e.startOffset===n&&(e.startContainer=o,e.startOffset=o.getLength())),e.endContainer===this&&(e.endOffset>n?e.endOffset-=1:e.endOffset===n&&(e.endContainer=o,e.endOffset=o.getLength())),i.detach(),i.nodeType===a?o.appendData(i.data.replace(/\u200B/g,"")):r.push(i.empty());else if(i.nodeType===u){f=r.length;while(f--)i.appendChild(r.pop());i.mergeInlines(e)}}},mergeWithBlock:function(e,t){var n=this,r=e,i,s,o;while(r.parentNode.childNodes.length===1)r=r.parentNode;r.detach(),s=n.childNodes.length,i=n.lastChild,i&&i.nodeName==="BR"&&(n.removeChild(i),s-=1),o={startContainer:n,startOffset:s,endContainer:n,endOffset:s},n.appendChild(e.empty()),n.mergeInlines(o),t.setStart(o.startContainer,o.startOffset),t.collapse(!0),window.opera&&(i=n.lastChild)&&i.nodeName==="BR"&&n.removeChild(i)},mergeContainers:function(){var e=this.previousSibling,t=this.firstChild;e&&e.isLike(this)&&e.isContainer()&&(e.appendChild(this.detach().empty()),t&&t.mergeContainers())},split:function(e,t){var n=this;typeof e=="number"&&(e=e<n.childNodes.length?n.childNodes[e]:null);if(n===t)return e;var r=n.parentNode,i=n.cloneNode(!1),s;while(e)s=e.nextSibling,i.appendChild(e),e=s;return n.fixCursor(),i.fixCursor(),(s=n.nextSibling)?r.insertBefore(i,s):r.appendChild(i),r.split(i,t)},fixCursor:function(){var e=this,t=e.ownerDocument,n,r;e.nodeName==="BODY"&&(!(r=e.firstChild)||r.nodeName==="BR")&&(n=t.createElement("DIV"),r?e.replaceChild(n,r):e.appendChild(n),e=n,n=null);if(e.isInline())e.firstChild||(d?(n=t.createTextNode("​"),editor._setPlaceholderTextNode(n)):n=t.createTextNode(""));else if(p){while(!e.isLeaf()){r=e.firstChild;if(!r){n=t.createTextNode("");break}e=r}e.isLeaf()&&(e.nodeType!==a?e.parentNode.insertBefore(t.createTextNode(""),e):/^ +$/.test(e.data)&&(e.data=""))}else if(!e.querySelector("BR")){n=t.createElement("BR");while((r=e.lastElementChild)&&!r.isInline())e=r}return n&&e.appendChild(n),this}});if(function(){var e=document.createElement("div"),t=document.createTextNode("12");return e.appendChild(t),t.splitText(2),e.childNodes.length!==2}())Text.prototype.splitText=function(e){var t=this.ownerDocument.createTextNode(this.data.slice(e)),n=this.nextSibling,r=this.parentNode,i=this.length-e;return n?r.insertBefore(t,n):r.appendChild(t),i&&this.deleteData(e,i),t}}(),function(){"use strict";var e=function(e,t){var n;for(n in t)e[n]=t[n]},t=Array.prototype.indexOf,n=1,r=3,i=4,s=1,o=0,u=1,a=2,f=3,l=function(e,t){var r=e.childNodes;while(t&&e.nodeType===n)e=r[t-1],r=e.childNodes,t=r.length;return e},c=function(e,t){if(e.nodeType===n){var r=e.childNodes;if(t<r.length)e=r[t];else{while(e&&!e.nextSibling)e=e.parentNode;e&&(e=e.nextSibling)}}return e};e(Range.prototype,{forEachTextNode:function(e){var t=this.cloneRange();t.moveBoundariesDownTree();var n=t.startContainer,r=t.endContainer,o=t.commonAncestorContainer,u=o.ownerDocument.createTreeWalker(o,i,function(e){return s},!1),a=u.currentNode=n;while(!e(a,t)&&a!==r&&(a=u.nextNode()));},getTextContent:function(){var e="";return this.forEachTextNode(function(t,n){var r=t.data;r&&/\S/.test(r)&&(t===n.endContainer&&(r=r.slice(0,n.endOffset)),t===n.startContainer&&(r=r.slice(n.startOffset)),e+=r)}),e},_insertNode:function(e){var n=this.startContainer,i=this.startOffset,s=this.endContainer,o=this.endOffset,u,a,f,l;return n.nodeType===r?(u=n.parentNode,a=u.childNodes,i===n.length?(i=t.call(a,n)+1,this.collapsed&&(s=u,o=i)):(i&&(l=n.splitText(i),s===n?(o-=i,s=l):s===u&&(o+=1),n=l),i=t.call(a,n)),n=u):a=n.childNodes,f=a.length,i===f?n.appendChild(e):n.insertBefore(e,a[i]),n===s&&(o+=a.length-f),this.setStart(n,i),this.setEnd(s,o),this},_extractContents:function(e){var n=this.startContainer,i=this.startOffset,s=this.endContainer,o=this.endOffset;e||(e=this.commonAncestorContainer),e.nodeType===r&&(e=e.parentNode);var u=s.split(o,e),a=n.split(i,e),f=e.ownerDocument.createDocumentFragment(),l;while(a!==u)l=a.nextSibling,f.appendChild(a),a=l;return this.setStart(e,u?t.call(e.childNodes,u):e.childNodes.length),this.collapse(!0),e.fixCursor(),f},_deleteContents:function(){this.moveBoundariesUpTree(),this._extractContents();var e=this.getStartBlock(),t=this.getEndBlock();e&&t&&e!==t&&e.mergeWithBlock(t,this),e&&e.fixCursor();var n=this.endContainer.ownerDocument.body,r=n.firstChild;if(!r||r.nodeName==="BR")n.fixCursor(),this.selectNodeContents(n.firstChild);var i=this.collapsed;return this.moveBoundariesDownTree(),i&&this.collapse(!0),this},insertTreeFragment:function(e){var t=!0,r=e.childNodes,i=r.length;while(i--)if(!r[i].isInline()){t=!1;break}this.collapsed||this._deleteContents(),this.moveBoundariesDownTree();if(t)this._insertNode(e),this.collapse(!1);else{var s=this.startContainer.split(this.startOffset,this.startContainer.ownerDocument.body),o=s.previousSibling,u=o,a=u.childNodes.length,f=s,l=0,c=s.parentNode,h,p;while((h=u.lastChild)&&h.nodeType===n&&h.nodeName!=="BR")u=h,a=u.childNodes.length;while((h=f.firstChild)&&h.nodeType===n&&h.nodeName!=="BR")f=h;while((h=e.firstChild)&&h.isInline())u.appendChild(h);while((h=e.lastChild)&&h.isInline())f.insertBefore(h,f.firstChild),l+=1;p=e;while(p=p.getNextBlock())p.fixCursor();c.insertBefore(e,s),s.mergeContainers(),o.nextSibling.mergeContainers(),s===f&&!f.textContent&&(f=f.previousSibling,l=f.getLength(),c.removeChild(s)),o===u&&!u.textContent&&(u=u.nextSibling,a=0,c.removeChild(o)),this.setStart(u,a),this.setEnd(f,l),this.moveBoundariesDownTree()}},containsNode:function(e,t){var n=this,r=e.ownerDocument.createRange();r.selectNode(e);if(t){var i=n.compareBoundaryPoints(f,r)>-1,s=n.compareBoundaryPoints(u,r)<1;return!i&&!s}var l=n.compareBoundaryPoints(o,r)<1,c=n.compareBoundaryPoints(a,r)>-1;return l&&c},moveBoundariesDownTree:function(){var e=this.startContainer,t=this.startOffset,n=this.endContainer,i=this.endOffset,s;while(e.nodeType!==r){s=e.childNodes[t];if(!s||s.nodeName==="BR")break;e=s,t=0}if(i)while(n.nodeType!==r){s=n.childNodes[i-1];if(!s||s.nodeName==="BR")break;n=s,i=n.getLength()}else while(n.nodeType!==r){s=n.firstChild;if(!s||s.nodeName==="BR")break;n=s}return this.collapsed?(this.setStart(n,i),this.setEnd(e,t)):(this.setStart(e,t),this.setEnd(n,i)),this},moveBoundariesUpTree:function(e){var n=this.startContainer,r=this.startOffset,i=this.endContainer,s=this.endOffset,o;e||(e=this.commonAncestorContainer);while(n!==e&&!r)o=n.parentNode,r=t.call(o.childNodes,n),n=o;while(i!==e&&s===i.getLength())o=i.parentNode,s=t.call(o.childNodes,i)+1,i=o;return this.setStart(n,r),this.setEnd(i,s),this},getStartBlock:function(){var e=this.startContainer,t;return e.isInline()?t=e.getPreviousBlock():e.isBlock()?t=e:(t=l(e,this.startOffset),t=t.getNextBlock()),t&&this.containsNode(t,!0)?t:null},getEndBlock:function(){var e=this.endContainer,t,n;if(e.isInline())t=e.getPreviousBlock();else if(e.isBlock())t=e;else{t=c(e,this.endOffset);if(!t){t=e.ownerDocument.body;while(n=t.lastChild)t=n}t=t.getPreviousBlock()}return t&&this.containsNode(t,!0)?t:null},startsAtBlockBoundary:function(){var e=this.startContainer,n=this.startOffset,r,i;while(e.isInline()){if(n)return!1;r=e.parentNode,n=t.call(r.childNodes,e),e=r}while(n&&(i=e.childNodes[n-1])&&(i.data===""||i.nodeName==="BR"))n-=1;return!n},endsAtBlockBoundary:function(){var e=this.endContainer,n=this.endOffset,r=e.getLength(),i,s;while(e.isInline()){if(n!==r)return!1;i=e.parentNode,n=t.call(i.childNodes,e)+1,e=i,r=e.childNodes.length}while(n<r&&(s=e.childNodes[n])&&(s.data===""||s.nodeName==="BR"))n+=1;return n===r},expandToBlockBoundaries:function(){var e=this.getStartBlock(),n=this.getEndBlock(),r;return e&&n&&(r=e.parentNode,this.setStart(r,t.call(r.childNodes,e)),r=n.parentNode,this.setEnd(r,t.call(r.childNodes,n)+1)),this}})}(),function(e){"use strict";var t=2,n=1,r=3,i=4,s=1,o=3,u=e.defaultView,a=e.body,f=!!u.opera,l=!!u.ie,c=u.ie===8,h=/Gecko\//.test(navigator.userAgent),p=/WebKit/.test(navigator.userAgent),d=/iP(?:ad|hone|od)/.test(navigator.userAgent),v=l||f,m=l||p,g=function(t,n,r){var i=e.createElement(t),s,o,u;n instanceof Array&&(r=n,n=null);if(n)for(s in n)i.setAttribute(s,n[s]);if(r)for(o=0,u=r.length;o<u;o+=1)i.appendChild(r[o]);return i},y={cut:1,paste:1,focus:1,blur:1,pathChange:1,select:1,input:1,undoStateChange:1},b={},w=function(e,t){var n=b[e],r,i,s;if(n){t||(t={}),t.type!==e&&(t.type=e);for(r=0,i=n.length;r<i;r+=1)s=n[r],s.handleEvent?s.handleEvent(t):s(t)}},E=function(e){w(e.type,e)},S=function(t,n){var r=b[t];r||(r=b[t]=[],y[t]||e.addEventListener(t,E,!1)),r.push(n)},x=function(t,n){var r=b[t],i;if(r){i=r.length;while(i--)r[i]===n&&r.splice(i,1);r.length||(delete b[t],y[t]||e.removeEventListener(t,E,!1))}},T=function(t,n,r,i){if(t instanceof Range)return t.cloneRange();var s=e.createRange();return s.setStart(t,n),r?s.setEnd(r,i):s.setEnd(t,n),s},N=u.getSelection(),C=function(e){e&&(d&&u.focus(),N.removeAllRanges(),N.addRange(e))},k=null,L=function(){return N.rangeCount&&(k=N.getRangeAt(0).cloneRange()),k};u.ie&&u.addEventListener("beforedeactivate",L,!0);var A,O,M="",_=null,D=!0,P=!1,H=function(){D=!0,P=!1},B=function(e){_&&(D=!0,j()),P||(setTimeout(H,0),P=!0),D=!1,_=e},j=function(){if(!D)return;var e=_,t;_=null;if(e.parentNode){while((t=e.data.indexOf("​"))>-1)e.deleteData(t,1);!e.data&&!e.nextSibling&&!e.previousSibling&&e.parentNode.isInline()&&e.parentNode.detach()}},F=function(e,t){_&&!t&&j(e);var n=e.startContainer,r=e.endContainer,i;if(t||n!==A||r!==O)A=n,O=r,i=n&&r?n===r?r.getPath():"(selection)":"",M!==i&&(M=i,w("pathChange",{path:i}));n!==r&&w("select")},I=function(){F(L())};S("keyup",I),S("mouseup",I);var q=function(){h&&a.focus(),u.focus()},R=function(){a.blur()};u.addEventListener("focus",E,!1),u.addEventListener("blur",E,!1);var U=function(){return a.innerHTML},z=function(e){var t=a;t.innerHTML=e;do t.fixCursor();while(t=t.getNextBlock())},W=function(e,t){t||(t=L()),t.collapse(!0),t._insertNode(e),t.setStartAfter(e),C(t),F(t)},X="ss-"+Date.now()+"-"+Math.random(),V="es-"+Date.now()+"-"+Math.random(),$=function(e){var n=g("INPUT",{id:X,type:"hidden"}),r=g("INPUT",{id:V,type:"hidden"}),i;e._insertNode(n),e.collapse(!1),e._insertNode(r),n.compareDocumentPosition(r)&t&&(n.id=V,r.id=X,i=n,n=r,r=i),e.setStartAfter(n),e.setEndBefore(r)},J=Array.prototype.indexOf,K=function(t){var n=e.getElementById(X),r=e.getElementById(V);if(n&&r){var i=n.parentNode,s=r.parentNode,o,u={startContainer:i,endContainer:s,startOffset:J.call(i.childNodes,n),endOffset:J.call(s.childNodes,r)};i===s&&(u.endOffset-=1),n.detach(),r.detach(),i.mergeInlines(u),i!==s&&s.mergeInlines(u),t||(t=e.createRange()),t.setStart(u.startContainer,u.startOffset),t.setEnd(u.endContainer,u.endOffset),o=t.collapsed,t.moveBoundariesDownTree(),o&&t.collapse(!0)}return t},Q,G,Y,Z,et=function(){Z&&(Z=!1,w("undoStateChange",{canUndo:!0,canRedo:!1})),w("input")};S("keyup",function(e){var t=e.keyCode;if(!e.ctrlKey&&!e.metaKey&&!e.altKey&&(t<16||t>20)&&(t<33||t>45)){var n=a.firstChild;u.ie===8&&n.nodeName==="P"&&($(L()),n.replaceWith(g("DIV",[n.empty()])),C(K())),et()}});var tt=function(e){Z||(Q+=1,Q<Y&&(G.length=Y=Q),e&&$(e),G[Q]=U(),Y+=1,Z=!0)},nt=function(){if(Q!==0||!Z){tt(L()),Q-=1,z(G[Q]);var e=K();e&&C(e),Z=!0,w("undoStateChange",{canUndo:Q!==0,canRedo:!0}),w("input")}},rt=function(){if(Q+1<Y&&Z){Q+=1,z(G[Q]);var e=K();e&&C(e),w("undoStateChange",{canUndo:!0,canRedo:Q+1<Y}),w("input")}},it=function(t,n,u){t=t.toUpperCase(),n||(n={});if(!u&&!(u=L()))return!1;var a=u.commonAncestorContainer,f,l;if(a.nearest(t,n))return!0;if(a.nodeType===r)return!1;f=e.createTreeWalker(a,i,function(e){return u.containsNode(e,!0)?s:o},!1);var c=!1;while(l=f.nextNode()){if(!l.nearest(t,n))return!1;c=!0}return c},st=function(t,n,u){if(u.collapsed){var a=g(t,n).fixCursor();u._insertNode(a),u.setStart(a.firstChild,a.firstChild.length),u.collapse(!0)}else{var f=e.createTreeWalker(u.commonAncestorContainer,i,function(e){return u.containsNode(e,!0)?s:o},!1),l,c,h=0,p=0,d=f.currentNode=u.startContainer,v;d.nodeType!==r&&(d=f.nextNode());do v=!d.nearest(t,n),d===u.endContainer&&(v&&d.length>u.endOffset?d.splitText(u.endOffset):p=u.endOffset),d===u.startContainer&&(v&&u.startOffset?d=d.splitText(u.startOffset):h=u.startOffset),v&&(g(t,n).wraps(d),p=d.length),c=d,l||(l=c);while(d=f.nextNode());u=T(l,h,c,p)}return u},ot=function(t,n,i,s){$(i);var o;i.collapsed&&(m?(o=e.createTextNode("​"),B(o)):o=e.createTextNode(""),i._insertNode(o));var u=i.commonAncestorContainer;while(u.isInline())u=u.parentNode;var a=i.startContainer,f=i.startOffset,l=i.endContainer,c=i.endOffset,h=[],p=function(e,t){if(i.containsNode(e,!1))return;var n=e.nodeType===r,s,o;if(!i.containsNode(e,!0)){e.nodeName!=="INPUT"&&(!n||e.data)&&h.push([t,e]);return}if(n)e===l&&c!==e.length&&h.push([t,e.splitText(c)]),e===a&&f&&(e.splitText(f),h.push([t,e]));else for(s=e.firstChild;s;s=o)o=s.nextSibling,p(s,t)},d=Array.prototype.filter.call(u.getElementsByTagName(t),function(e){return i.containsNode(e,!0)&&e.is(t,n)});s||d.forEach(function(e){p(e,e)}),h.forEach(function(e){e[0].cloneNode(!1).wraps(e[1])}),d.forEach(function(e){e.replaceWith(e.empty())}),K(i),o&&i.collapse(!1);var v={startContainer:i.startContainer,startOffset:i.startOffset,endContainer:i.endContainer,endOffset:i.endOffset};return u.mergeInlines(v),i.setStart(v.startContainer,v.startOffset),i.setEnd(v.endContainer,v.endOffset),i},ut=function(e,t,n,r){if(!n&&!(n=L()))return;tt(n),K(n),t&&(n=ot(t.tag.toUpperCase(),t.attributes||{},n,r)),e&&(n=st(e.tag.toUpperCase(),e.attributes||{},n)),C(n),F(n,!0),et()},at=function(e,t,n){if(!n&&!(n=L()))return;t&&(tt(n),K(n));var r=n.getStartBlock(),i=n.getEndBlock();if(r&&i)for(;;){if(e(r)||r===i)break;r=r.getNextBlock()}t&&(C(n),F(n,!0),et())},ft=function(e,t){if(!t&&!(t=L()))return;f||a.setAttribute("contenteditable","false"),Z?$(t):tt(t),t.expandToBlockBoundaries(),t.moveBoundariesUpTree(a);var n=t._extractContents(a);t._insertNode(e(n)),t.endOffset<t.endContainer.childNodes.length&&t.endContainer.childNodes[t.endOffset].mergeContainers(),t.startContainer.childNodes[t.startOffset].mergeContainers(),f||a.setAttribute("contenteditable","true"),K(t),C(t),F(t,!0),et()},lt=function(e){return g("BLOCKQUOTE",[e])},ct=function(e){var t=e.querySelectorAll("blockquote");return Array.prototype.filter.call(t,function(e){return!e.parentNode.nearest("BLOCKQUOTE")}).forEach(function(e){e.replaceWith(e.empty())}),e},ht=function(e){var t=e.querySelectorAll("blockquote"),n=t.length,r;while(n--)r=t[n],r.replaceWith(r.empty());return e},pt=function(e,t){var n,r,i,s,o,u;for(n=0,r=e.length;n<r;n+=1)i=e[n],s=i.nodeName,i.isBlock()?s!=="LI"&&(u=g("LI",{"class":i.dir==="rtl"?"dir-rtl":"",dir:i.dir},[i.empty()]),i.parentNode.nodeName===t?i.replaceWith(u):(o=i.previousSibling)&&o.nodeName===t?(o.appendChild(u),i.detach(),n-=1,r-=1):i.replaceWith(g(t,[u]))):i.isContainer()&&(s!==t&&/^[DOU]L$/.test(s)?i.replaceWith(g(t,[i.empty()])):pt(i.childNodes,t))},dt=function(e){return pt(e.childNodes,"UL"),e},vt=function(e){return pt(e.childNodes,"OL"),e},mt=function(e){var t=e.querySelectorAll("UL, OL");return Array.prototype.filter.call(t,function(e){return!e.parentNode.nearest("UL")&&!e.parentNode.nearest("OL")}).forEach(function(e){var t=e.empty(),n=t.childNodes,r=n.length,i;while(r--)i=n[r],i.nodeName==="LI"&&t.replaceChild(g("DIV",{"class":i.dir==="rtl"?"dir-rtl":"",dir:i.dir},[i.empty()]),i);e.replaceWith(t)}),e},gt={DIV:"DIV",PRE:"DIV",H1:"DIV",H2:"DIV",H3:"DIV",H4:"DIV",H5:"DIV",H6:"DIV",P:"DIV",DT:"DD",DD:"DT",LI:"LI"},yt=function(e,t,n){var r=gt[e.nodeName],i=t.split(n,e.parentNode);return i.nodeName!==r&&(e=g(r),e.className=i.dir==="rtl"?"dir-rtl":"",e.dir=i.dir,e.replaces(i).appendChild(i.empty()),i=e),i},bt=/\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\([^\s()<>]+\))+(?:\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’])|(?:[\w\-.%+]+@(?:[\w\-]+\.)+[A-Z]{2,4}))/i,wt=function(e){var t=e.ownerDocument,n=t.createTreeWalker(e,i,function(e){return e.nearest("A")?o:s},!1),r,u,a,f,l,c,h;while(r=n.nextNode()){u=r.data.split(bt),f=u.length;if(f>1){c=r.parentNode,h=r.nextSibling;for(a=0;a<f;a+=1)l=u[a],a?(a%2?(r=t.createElement("A"),r.textContent=l,r.href=/@/.test(l)?"mailto:"+l:/^https?:/.test(l)?l:"http://"+l):r=t.createTextNode(l),h?c.insertBefore(r,h):c.appendChild(r)):r.data=l;n.currentNode=r}}},Et=/^A(?:DDRESS|RTICLE|SIDE)|BLOCKQUOTE|CAPTION|D(?:[DLT]|IV)|F(?:IGURE|OOTER)|H[1-6]|HEADER|L(?:ABEL|EGEND|I)|O(?:L|UTPUT)|P(?:RE)?|SECTION|T(?:ABLE|BODY|D|FOOT|H|HEAD|R)|UL$/,St={color:{regexp:/\S/,replace:function(e){return g("SPAN",{"class":"colour",style:"color:"+e})}},fontWeight:{regexp:/^bold/i,replace:function(){return g("B")}},fontStyle:{regexp:/^italic/i,replace:function(){return g("I")}},fontFamily:{regexp:/\S/,replace:function(e){return g("SPAN",{"class":"font",style:"font-family:"+e})}},fontSize:{regexp:/\S/,replace:function(e){return g("SPAN",{"class":"size",style:"font-size:"+e})}}},xt={SPAN:function(e,t){var n=e.style,r,i,s,o,u,a;for(r in St)i=St[r],s=n[r],s&&i.regexp.test(s)&&(a=i.replace(s),o&&o.appendChild(a),o=a,u||(u=a));return u&&(o.appendChild(e.empty()),t.replaceChild(u,e)),o||e},STRONG:function(e,t){var n=g("B");return t.replaceChild(n,e),n.appendChild(e.empty()),n},EM:function(e,t){var n=g("I");return t.replaceChild(n,e),n.appendChild(e.empty()),n},TT:function(e,t){var n=g("SPAN",{"class":"font",style:'font-family:menlo,consolas,"courier new",monospace'});return t.replaceChild(n,e),n.appendChild(e.empty()),n}},Tt=function(e,t){var i=e.childNodes,s,o,u,a,f,l,c;for(s=0,o=i.length;s<o;s+=1){u=i[s],a=u.nodeName,f=u.nodeType,l=xt[a];if(f===n){c=u.childNodes.length;if(l)u=l(u,e);else if(!Et.test(a)&&!u.isInline()){s-=1,o+=c-1,e.replaceChild(u.empty(),u);continue}!t&&u.style.cssText&&u.removeAttribute("style"),c&&Tt(u,t)}else if(f!==r||!/\S/.test(u.data))e.removeChild(u),s-=1,o-=1}return e},Nt=function(e,t){var n=e.childNodes,r=null,i,s,o,u;for(i=0,s=n.length;i<s;i+=1){o=n[i],u=o.nodeName==="BR";if(!u&&o.isInline())r||(r=g(t)),r.appendChild(o),i-=1,s-=1;else if(u||r)r||(r=g(t)),r.fixCursor(),u?e.replaceChild(r,o):(e.insertBefore(r,o),i+=1,s+=1),r=null}return r&&e.appendChild(r.fixCursor()),e},Ct=function(e){var t=e.querySelectorAll("BR"),n=t.length,r,i;while(n--){r=t[n],i=r.parentNode;if(!i)continue;if(r.nextSibling&&r.previousSibling){while(i.isInline())i=i.parentNode;i.isBlock()?gt[i.nodeName]&&(yt(i,r.parentNode,r),r.detach()):Nt(i,"DIV")}else r.detach()}},kt=function(){a.fixCursor()};e.addEventListener(l?"beforecut":"cut",function(){var e=L();tt(e),K(e),setTimeout(kt,0)},!1);var Lt=!1;e.addEventListener(l?"beforepaste":"paste",function(){if(Lt)return;Lt=!0;var e=L(),t=e.startContainer,n=e.startOffset,r=e.endContainer,i=e.endOffset,s=g("DIV",{style:"position: absolute; overflow: hidden;top: -100px; left: -100px; width: 1px; height: 1px;"});a.appendChild(s),e.selectNodeContents(s),C(e),setTimeout(function(){var e=s.detach().empty(),o=e.firstChild,u=T(t,n,r,i);if(o){o===e.lastChild&&o.nodeName==="DIV"&&e.replaceChild(o.empty(),o),e.normalize(),wt(e),Tt(e,!1),Ct(e);var a=e,f=!0;while(a=a.getNextBlock())a.fixCursor();w("willPaste",{fragment:e,preventDefault:function(){f=!1}}),f&&(u.insertTreeFragment(e),et(),u.collapse(!1))}C(u),F(u,!0),Lt=!1},0)},!1);var At={8:"backspace",9:"tab",13:"enter",32:"space",46:"delete"},Ot=function(e){return function(t){t.preventDefault(),e()}},Mt=function(e){return function(t){t.preventDefault();var n=L();it(e,null,n)?ut(null,{tag:e},n):ut({tag:e},null,n)}},_t=function(){var e=L(),t=e.startContainer,n;t.nodeType===r&&(t=t.parentNode);if(t.isInline()&&!t.textContent){do n=t.parentNode;while(n.isInline()&&!n.textContent&&(t=n));e.setStart(n,J.call(n.childNodes,t)),e.collapse(!0),n.removeChild(t),n.isBlock()||(n=n.getPreviousBlock()),n.fixCursor(),e.moveBoundariesDownTree(),C(e),F(e)}},Dt={enter:function(t){t.preventDefault();var i=L();if(!i)return;tt(i),K(i),i.collapsed||i._deleteContents();var s=i.getStartBlock(),o=s?s.nodeName:"DIV",u=gt[o],l;if(!s){i._insertNode(g("BR")),i.collapse(!1),C(i),F(i,!0),et();return}var c=i.startContainer,h=i.startOffset,p;if(!u){if(c===s){c=h?c.childNodes[h-1]:null,h=0;if(c){c.nodeName==="BR"?c=c.nextSibling:h=c.getLength();if(!c||c.nodeName==="BR")p=g("DIV").fixCursor(),c?s.replaceChild(p,c):s.appendChild(p),c=p}}Nt(s,"DIV"),u="DIV",c||(c=s.firstChild),i.setStart(c,h),i.setEnd(c,h),s=i.getStartBlock()}if(!s.textContent){if(s.nearest("UL")||s.nearest("OL"))return ft(mt,i);if(s.nearest("BLOCKQUOTE"))return ft(ht,i)}l=yt(s,c,h);while(l.nodeType===n){var d=l.firstChild,v;if(l.nodeName==="A"){l.replaceWith(l.empty()),l=d;continue}while(d&&d.nodeType===r&&!d.data){v=d.nextSibling;if(!v||v.nodeName==="BR")break;d.detach(),d=v}if(!d||d.nodeName==="BR"||d.nodeType===r&&!f)break;l=d}i=T(l,0),C(i),F(i,!0),l.nodeType===r&&(l=l.parentNode),l.offsetTop+l.offsetHeight>(e.documentElement.scrollTop||a.scrollTop)+a.offsetHeight&&l.scrollIntoView(!1),et()},backspace:function(e){var t=L();if(!t.collapsed)e.preventDefault(),t._deleteContents(),C(t),F(t,!0);else if(t.startsAtBlockBoundary()){e.preventDefault();var n=t.getStartBlock(),r=n.getPreviousBlock();if(r){r.mergeWithBlock(n,t),n=r.parentNode;while(n&&!n.nextSibling)n=n.parentNode;n&&(n=n.nextSibling)&&n.mergeContainers(),C(t)}else{if(n.nearest("UL")||n.nearest("OL"))return ft(mt,t);if(n.nearest("BLOCKQUOTE"))return ft(ct,t);C(t),F(t,!0)}}else setTimeout(_t,0)},"delete":function(e){var t=L();if(!t.collapsed)e.preventDefault(),t._deleteContents(),C(t),F(t,!0);else if(t.endsAtBlockBoundary()){e.preventDefault();var n=t.getStartBlock(),r=n.getNextBlock();if(r){n.mergeWithBlock(r,t),r=n.parentNode;while(r&&!r.nextSibling)r=r.parentNode;r&&(r=r.nextSibling)&&r.mergeContainers(),C(t),F(t,!0)}}else setTimeout(_t,0)},space:function(){var e=L();tt(e),K(e),C(e)},"ctrl-b":Mt("B"),"ctrl-i":Mt("I"),"ctrl-u":Mt("U"),"ctrl-y":Ot(rt),"ctrl-z":Ot(nt),"ctrl-shift-z":Ot(rt)};S(f?"keypress":"keydown",function(e){var t=e.keyCode,n=At[t]||String.fromCharCode(t).toLowerCase(),r="";f&&e.which===46&&(n="."),111<t&&t<124&&(n="f"+(t-111)),e.altKey&&(r+="alt-");if(e.ctrlKey||e.metaKey)r+="ctrl-";e.shiftKey&&(r+="shift-"),n=r+n,Dt[n]&&Dt[n](e)});var Pt=function(e){return function(){return e.apply(null,arguments),this}},Ht=function(e,t,n){return function(){return e(t,n),q(),this}};u.editor={_setPlaceholderTextNode:B,addEventListener:Pt(S),removeEventListener:Pt(x),focus:Pt(q),blur:Pt(R),getDocument:function(){return e},addStyles:function(t){if(t){var n=e.documentElement.firstChild,r=g("STYLE",{type:"text/css"});r.styleSheet?(n.appendChild(r),r.styleSheet.cssText=t):(r.appendChild(e.createTextNode(t)),n.appendChild(r))}return this},getHTML:function(){var e=[],t,n,r,i;if(v){t=a;while(t=t.getNextBlock())!t.textContent&&!t.querySelector("BR")&&(n=g("BR"),t.appendChild(n),e.push(n))}r=U();if(v){i=e.length;while(i--)e[i].detach()}return r},setHTML:function(t){var n=e.createDocumentFragment(),r=g("DIV"),i;r.innerHTML=t,n.appendChild(r.empty()),Tt(n,!0),Ct(n),Nt(n,"DIV");var s=n;while(s=s.getNextBlock())s.fixCursor();while(i=a.lastChild)a.removeChild(i);a.appendChild(n),a.fixCursor(),Q=-1,G=[],Y=0,Z=!1;var o=T(a.firstChild,0);return tt(o),K(o),c||C(o),F(o,!0),this},getSelectedText:function(){return L().getTextContent()},insertImage:function(e){var t=g("IMG",{src:e});return W(t),t},getPath:function(){return M},getSelection:L,setSelection:Pt(C),undo:Pt(nt),redo:Pt(rt),hasFormat:it,changeFormat:Pt(ut),bold:Ht(ut,{tag:"B"}),italic:Ht(ut,{tag:"I"}),underline:Ht(ut,{tag:"U"}),removeBold:Ht(ut,null,{tag:"B"}),removeItalic:Ht(ut,null,{tag:"I"}),removeUnderline:Ht(ut,null,{tag:"U"}),makeLink:function(t){t=encodeURI(t);var n=L();if(n.collapsed){var r=t.indexOf(":")+1;if(r)while(t[r]==="/")r+=1;n._insertNode(e.createTextNode(t.slice(r)))}return ut({tag:"A",attributes:{href:t}},{tag:"A"},n),q(),this},removeLink:function(){return ut(null,{tag:"A"},L(),!0),q(),this},setFontFace:function(e){return ut({tag:"SPAN",attributes:{"class":"font",style:"font-family: "+e+", sans-serif;"}},{tag:"SPAN",attributes:{"class":"font"}}),q(),this},setFontSize:function(e){return ut({tag:"SPAN",attributes:{"class":"size",style:"font-size: "+(typeof e=="number"?e+"px":e)}},{tag:"SPAN",attributes:{"class":"size"}}),q(),this},setTextColour:function(e){return ut({tag:"SPAN",attributes:{"class":"colour",style:"color: "+e}},{tag:"SPAN",attributes:{"class":"colour"}}),q(),this},setHighlightColour:function(e){return ut({tag:"SPAN",attributes:{"class":"highlight",style:"background-color: "+e}},{tag:"SPAN",attributes:{"class":"highlight"}}),q(),this},setTextAlignment:function(e){return at(function(t){t.className=(t.className.split(/\s+/).filter(function(e){return!/align/.test(e)}).join(" ")+" align-"+e).trim(),t.style.textAlign=e},!0),q(),this},setTextDirection:function(e){return at(function(t){t.className=(t.className.split(/\s+/).filter(function(e){return!/dir/.test(e)}).join(" ")+" dir-"+e).trim(),t.dir=e},!0),q(),this},forEachBlock:Pt(at),modifyBlocks:Pt(ft),increaseQuoteLevel:Ht(ft,lt),decreaseQuoteLevel:Ht(ft,ct),makeUnorderedList:Ht(ft,dt),makeOrderedList:Ht(ft,vt),removeList:Ht(ft,mt)},a.setAttribute("contenteditable","true"),u.editor.setHTML(""),u.onEditorLoad&&(u.onEditorLoad(u.editor),u.onEditorLoad=null)}(document);