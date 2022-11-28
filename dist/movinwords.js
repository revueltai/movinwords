"use strict";module.exports=class Movinwords{constructor(t={}){if(this._sentences=null,this._words=[],this._started=!1,this._visible="--v",this._events={},this._eventNames=["start","end","wordTransitionStart","wordTransitionEnd","letterTransitionStart","letterTransitionEnd"],this._classNames={base:"mw",word:"mw-w",letter:"mw-l",reverse:"mw-r"},this._options={autostart:!0,duration:1e3,delay:100,offset:20,reverseTransition:!1,reverseOrder:!1,transition:"fadeIn",wordSpacing:null,highlight:{classname:"highlight",tag:"strong",words:[]},events:{},eventsTransitionProperty:"opacity",intersectionStart:!1,intersectionOptions:{root:null,threshold:0,rootMargin:"0px"},...t},!this._options.el)throw new Error("No element provided.");this._sentences=document.querySelectorAll(this._options.el),this._sentences&&(this._registerEvents(),this._getSentences(),this._options.autostart&&this.start())}_registerEvents(){const t=this._options.events;for(const e in t)t.hasOwnProperty(e)&&this._isAllowedEvent(e)&&this._addEventListener(e,t[e])}_addEventListener(t,e){if("string"!=typeof t||"function"!=typeof e)return!1;void 0===this._events[t]&&(this._events[t]={listeners:[]}),this._events[t].listeners.push(e)}_emitEvent(t,e){if(void 0===this._events[t])return!1;this._events[t].listeners.forEach((t=>{t(e)}))}_isAllowedEvent(t){return this._eventNames.includes(t)}_isEmptyArray(t){if(Array.isArray(t)&&t)return!t.length}_isHighlightedWord(t){const e=this._options.highlight.words;return e&&!this._isEmptyArray(e)&&e.includes(t)}_isLastLetterOfWord(t,e){return t===e-1}_isLastWordOfSentence(t){let e=!1;for(let[s,r]of this._words.entries())t===r&&s+1===this._words.length&&(e=!0);return e}_setCSSVariables(t){t.style.setProperty("--mw-word-spacing",this._getWordSpacing(t)),t.style.setProperty("--mw-duration",`${this._options.duration}ms`),t.style.setProperty("--mw-delay",`${this._options.delay}ms`),t.style.setProperty("--mw-offset",this._options.offset)}_getWordIndex(t,e){const s=t+1;return this._options.reverseOrder?e.length-s:s}_getWordSpacing(t){return this._options.wordSpacing?this._options.wordSpacing:.4*parseInt(window.getComputedStyle(t,null).getPropertyValue("font-size"))}_getWordsArray(t){return this._words=t.textContent.trim().split(" "),this._words}_getLettersArray(t){return[...t.textContent]}_getSentences(){for(const t of this._sentences)t.classList.add(this._classNames.base),t.classList.add(this._options.transition),this._options.reverseTransition&&t.classList.add(this._classNames.reverse)}_parseSentences(){for(const t of this._sentences)this._setCSSVariables(t),this._createAndAppendWordTags(t),this._createAndAppendLetterTags(t),setTimeout((()=>{t.classList.add(this._visible),delete t.dataset[this._classNames.base]}),100)}_appendTags(t,e){t.innerHTML="";for(const s of e)t.appendChild(s)}_createTag(t){const e=document.createElement(t.tag);e.className=t.className,e.textContent=t.text;for(const s in t.vars)e.style.setProperty(`--mw-${s}`,t.vars[s]);return e}_createAndAppendWordTags(t){const e=this._createWordTags(t);this._appendTags(t,e)}_createAndAppendLetterTags(t){const e=t.querySelectorAll(`.${this._classNames.word}`);e.forEach(((t,s)=>{const r=this._createLetterTags(t,this._getWordIndex(s,e));this._appendTags(t,r)}))}_createWordTags(t){const e=[],s=this._getWordsArray(t);for(const t of s){let s="span",r=this._classNames.word;this._isHighlightedWord(t)&&(r+=` ${this._options.highlight.classname}`,s=this._options.highlight.tag),e.push(this._createTag({tag:s,className:r,text:t}))}return e}_createLetterTags(t,e){const s=[],r=this._getLettersArray(t);for(const[i,n]of r.entries()){const o=this._createTag({tag:"span",className:`${this._classNames.letter}`,text:n,vars:{w:e,l:i}});if(this._isLastLetterOfWord(i,r.length)){const e={...this._options,word:{el:t,text:t.textContent}};o.addEventListener("transitionstart",(t=>{t.propertyName===this._options.eventsTransitionProperty&&this._emitEvent("wordTransitionStart",e)})),o.addEventListener("transitionend",(s=>{s.propertyName===this._options.eventsTransitionProperty&&(this._emitEvent("wordTransitionEnd",e),this._isLastWordOfSentence(t.textContent)&&this._emitEvent("end",this._options))}))}s.push(o)}return s}_triggerStart(){this._started=!0,this._emitEvent("start",this._options),this._parseSentences()}_triggerStartOnIntersection(){if("IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype&&this._options.el){const t=new IntersectionObserver((t=>{t.forEach((t=>{t.isIntersecting&&this._triggerStart()}))}),this._options.intersectionOptions);this._sentences.forEach((e=>{e&&t.observe(e)}))}}start(){this._started||(this._options.intersectionStart?this._triggerStartOnIntersection():this._triggerStart())}};
