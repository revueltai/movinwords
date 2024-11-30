!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).MovinWords=e()}(this,(function(){"use strict";var t=Object.defineProperty,e=(e,s,r)=>((e,s,r)=>s in e?t(e,s,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[s]=r)(e,"symbol"!=typeof s?s+"":s,r);class Movinwords{constructor(t={}){if(e(this,"_sentences"),e(this,"_words"),e(this,"_letters"),e(this,"_pausedProps"),e(this,"_currentLetterIndex"),e(this,"_started"),e(this,"_paused"),e(this,"_visible"),e(this,"_events"),e(this,"_eventNames"),e(this,"_classNames"),e(this,"_options"),this._sentences=null,this._words=[],this._letters=[],this._pausedProps={},this._currentLetterIndex=1,this._started=!1,this._paused=!1,this._visible="--v",this._events={},this._eventNames=["start","end","wordTransitionStart","wordTransitionEnd","letterTransitionStart","letterTransitionEnd","scrambleStart","scrambleEnd","letterScrambleStart","letterScrambling","letterScrambleEnd"],this._classNames={base:"mw",word:"mw-w",letter:"mw-l",reverse:"mw-r",textAlignment:"mw-ta",animateLetters:"mw-al"},this._options={el:"",sentence:"",autostart:!0,duration:1e3,delay:100,offset:20,animateLetters:!1,reverseTransition:!1,reverseOrder:!1,transition:"fadeIn",pausableProps:["opacity","transform"],wordSpacing:0,letterSpacing:0,textAlignment:"initial",highlight:{classname:"highlight",tag:"strong",words:[]},events:{},eventsTransitionProperty:"opacity",intersectionStart:!1,intersectionOptions:{root:null,threshold:0,rootMargin:"0px"},scrambleLetters:!1,scrambleMode:"unscramble",scrambleChars:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",scrambleFPS:16,...t},!this._options.el)throw new Error("No element provided.");this._sentences=document.querySelectorAll(this._options.el),this._options.sentence||this._sentences instanceof NodeList&&!(this._sentences.length<=1)||this._sentences[0].textContent||console.error(`No sentences found for scrambling for ${this._options.el}.`),this._sentences&&(this._registerEvents(),this._getSentences(),this._options.autostart&&this.start())}_registerEvents(){const t=this._options.events;for(const e in t)t.hasOwnProperty(e)&&this._isAllowedEvent(e)&&this._addEventListener(e,t[e])}_addEventListener(t,e){if("string"!=typeof t||"function"!=typeof e)return!1;void 0===this._events[t]&&(this._events[t]={listeners:[]}),this._events[t].listeners.push(e)}_emitEvent(t,e=null){if(void 0===this._events[t])return!1;this._events[t].listeners.forEach((t=>t({...this._options,...e})))}_isAllowedEvent(t){return this._eventNames.includes(t)}_isEmptyArray(t){if(Array.isArray(t)&&t)return!t.length}_isHighlightedWord(t){const e=this._options.highlight.words;return e&&!this._isEmptyArray(e)&&e.includes(t)}_isLastLetterOfWord(t,e){return t===e-1}_isLastWordOfSentence(t){let e=!1;for(let[s,r]of this._words.entries())t===r&&s+1===this._words.length&&(e=!0);return e}_setCSSVariables(t){t.classList.add(this._classNames.textAlignment),t.style.setProperty("--mw-word-spacing",String(this._getSpacing(t))),t.style.setProperty("--mw-letter-spacing",String(this._getSpacing(t,"letter"))),t.style.setProperty("--mw-duration",`${this._options.duration}ms`),t.style.setProperty("--mw-delay",`${this._options.delay}ms`),t.style.setProperty("--mw-offset",String(this._options.offset)),t.style.setProperty("--mw-text-alignment",String(this._options.textAlignment))}_getWordIndex(t,e){const s=t+1;return this._options.reverseOrder?e.length-s:s}_getSpacing(t,e="word"){const s="word"===e?this._options.wordSpacing:this._options.letterSpacing;return s||("word"===e?.4*parseInt(window.getComputedStyle(t,null).getPropertyValue("font-size")):0)}_getWordsArray(t){return t.textContent&&(this._words=t.textContent.trim().split(" ")),this._words}_getLettersArray(t){return t.textContent?[...t.textContent]:[]}_getRandomScrambleCharacter(){const t=Math.floor(Math.random()*this._options.scrambleChars.length);return this._options.scrambleChars[t]}_getSentences(){if(this._sentences)for(const t of this._sentences)this._options.sentence&&(t.innerHTML=this._options.sentence),t.classList.add(this._classNames.base),t.classList.add(this._options.transition),this._options.reverseTransition&&t.classList.add(this._classNames.reverse),this._options.animateLetters&&t.classList.add(this._classNames.animateLetters)}_parseSentences(){if(this._sentences)for(const t of this._sentences)this._setCSSVariables(t),this._createAndAppendWordTags(t),this._createAndAppendLetterTags(t),this._options.scrambleLetters&&this._createScramble(),setTimeout((()=>{t.classList.add(this._visible),delete t.dataset[this._classNames.base]}),100)}_appendTags(t,e){t.innerHTML="";for(const s of e)t.appendChild(s)}_scrambleLetter(t,e,s){const r=1e3/this._options.scrambleFPS,n=this._options.delay*e;setTimeout((()=>{let n=Date.now();const i={scrambleLetterInfo:{letterEl:t,finalLetter:s,letterText:t.textContent}};this._emitEvent("letterScrambleStart",i);const o=()=>{if(this._paused)return n=Date.now(),void requestAnimationFrame(o);const a=Date.now()-n;a<this._options.duration?(a%r<this._options.scrambleFPS&&(t.textContent=this._getRandomScrambleCharacter()),i.scrambleLetterInfo.letterText=t.textContent,this._emitEvent("letterScrambling",i),requestAnimationFrame(o)):("unscramble"===this._options.scrambleMode&&(t.textContent=s),i.scrambleLetterInfo.letterText=t.textContent,this._emitEvent("letterScrambleEnd",i),e===this._letters.length-1&&this._emitEvent("scrambleEnd",{scrambleInfo:{letters:this._letters}}))};o()}),n)}_createTag(t){const e=document.createElement(t.tag);e.className=t.className,e.textContent=t.text;for(const s in t.vars)if(s){const r=t.vars[s]??null;e.style.setProperty(`--mw-${s}`,String(r))}return e}_createAndAppendWordTags(t){const e=this._createWordTags(t);this._appendTags(t,e)}_createAndAppendLetterTags(t){const e=t.querySelectorAll(`.${this._classNames.word}`);this._options.reverseOrder&&(this._currentLetterIndex=this._words.join("").length-1),e.forEach(((t,s)=>{const r=this._createLetterTags(t,this._getWordIndex(s,e));this._appendTags(t,r)}))}_createWordTags(t){const e=[],s=this._getWordsArray(t);for(const r of s){let t="span",s=this._classNames.word;this._isHighlightedWord(r)&&(s+=` ${this._options.highlight.classname}`,t=this._options.highlight.tag),e.push(this._createTag({tag:t,className:s,text:r,vars:{}}))}return e}_createLetterElement(t,e,s,r){const n={tag:"span",className:`${this._classNames.letter}`,text:t,vars:{t:void 0,w:r,l:s}};return this._options.animateLetters&&"object"==typeof n.vars&&!Array.isArray(n.vars)&&(n.vars.t=e.length,n.vars.l=this._options.reverseOrder?this._currentLetterIndex--:this._currentLetterIndex++),this._createTag(n)}_createLetterTags(t,e){const s=[],r=this._getLettersArray(t);for(const[n,i]of r.entries()){const o=this._createLetterElement(i,r,n,e);this._isLastLetterOfWord(n,r.length)&&this._addLetterEventListeners(t,o),this._letters.push(o),s.push(o)}return s}_createScramble(){this._options.reverseOrder&&this._letters.reverse(),this._emitEvent("scrambleStart",{scrambleInfo:{letters:this._letters}}),this._letters.forEach(((t,e)=>{if(t.textContent){const s=t.textContent;this._scrambleLetter(t,e,s)}}))}_addLetterEventListeners(t,e){const s={word:{el:t,text:t.textContent}};e.addEventListener("transitionstart",(t=>{t.propertyName===this._options.eventsTransitionProperty&&this._emitEvent("wordTransitionStart",s)})),e.addEventListener("transitionend",(e=>{e.propertyName===this._options.eventsTransitionProperty&&(this._emitEvent("wordTransitionEnd",s),t.textContent&&this._isLastWordOfSentence(t.textContent)&&this._emitEvent("end"))}))}_triggerStart(){this._started=!0,this._emitEvent("start"),this._parseSentences()}_triggerStartOnIntersection(){var t;if("IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype&&this._options.el){const e=new IntersectionObserver((t=>{t.forEach((t=>{t.isIntersecting&&this._triggerStart()}))}),this._options.intersectionOptions);null==(t=this._sentences)||t.forEach((t=>{t&&e.observe(t)}))}}pause(){if(!this._paused&&this._sentences){document.querySelectorAll(`.${this._classNames.letter}`).forEach(((t,e)=>{const s=t;this._pausedProps[e]={};const r=window.getComputedStyle(t);for(const n of this._options.pausableProps)this._pausedProps[e][n]=r[n],s.style[n]=r[n]})),this._paused=!0}}resume(){if(this._paused&&this._sentences){document.querySelectorAll(`.${this._classNames.letter}`).forEach((t=>{const e=t;for(const s of this._options.pausableProps)e.style[s]=""})),this._paused=!1}}start(){this._started||(this._options.intersectionStart?this._triggerStartOnIntersection():this._triggerStart())}}return"undefined"!=typeof window&&(window.Movinwords=Movinwords),Movinwords}));
