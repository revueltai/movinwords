var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
class Movinwords {
  constructor(opts = {}) {
    __publicField(this, "_sentences");
    __publicField(this, "_words");
    __publicField(this, "_letters");
    __publicField(this, "_pausedProps");
    __publicField(this, "_currentLetterIndex");
    __publicField(this, "_started");
    __publicField(this, "_paused");
    __publicField(this, "_visible");
    __publicField(this, "_events");
    __publicField(this, "_eventNames");
    __publicField(this, "_classNames");
    __publicField(this, "_options");
    this._sentences = null;
    this._words = [];
    this._letters = [];
    this._pausedProps = {};
    this._currentLetterIndex = 1;
    this._started = false;
    this._paused = false;
    this._visible = "--v";
    this._events = {};
    this._eventNames = [
      "start",
      "end",
      "wordTransitionStart",
      "wordTransitionEnd",
      "letterTransitionStart",
      "letterTransitionEnd",
      "scrambleStart",
      "scrambleEnd",
      "letterScrambleStart",
      "letterScrambling",
      "letterScrambleEnd"
    ];
    this._classNames = {
      base: "mw",
      word: "mw-w",
      letter: "mw-l",
      reverse: "mw-r",
      textAlignment: "mw-ta",
      animateLetters: "mw-al"
    };
    this._options = {
      el: "",
      sentence: "",
      autostart: true,
      duration: 1e3,
      delay: 100,
      offset: 20,
      animateLetters: false,
      reverseTransition: false,
      reverseOrder: false,
      transition: "fadeIn",
      pausableProps: ["opacity", "transform"],
      wordSpacing: 0,
      letterSpacing: 0,
      textAlignment: "initial",
      highlight: {
        classname: "highlight",
        tag: "strong",
        words: []
      },
      events: {},
      eventsTransitionProperty: "opacity",
      intersectionStart: false,
      intersectionOptions: {
        root: null,
        threshold: 0,
        rootMargin: "0px"
      },
      scrambleLetters: false,
      scrambleMode: "unscramble",
      scrambleChars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
      scrambleFPS: 16,
      ...opts
    };
    if (!this._options.el) {
      throw new Error("No element provided.");
    }
    this._sentences = document.querySelectorAll(this._options.el);
    if (!this._options.sentence && (!(this._sentences instanceof NodeList) || this._sentences.length <= 1)) {
      if (!this._sentences[0].textContent) {
        console.error(`No sentences found for scrambling for ${this._options.el}.`);
      }
    }
    if (this._sentences) {
      this._registerEvents();
      this._getSentences();
      if (this._options.autostart) {
        this.start();
      }
    }
  }
  _registerEvents() {
    const registeredEvents = this._options.events;
    for (const eventName in registeredEvents) {
      if (registeredEvents.hasOwnProperty(eventName) && this._isAllowedEvent(eventName)) {
        this._addEventListener(eventName, registeredEvents[eventName]);
      }
    }
  }
  _addEventListener(event, callback) {
    if (typeof event !== "string" || typeof callback !== "function") {
      return false;
    }
    if (this._events[event] === void 0) {
      this._events[event] = {
        listeners: []
      };
    }
    this._events[event].listeners.push(callback);
  }
  _emitEvent(event, payload = null) {
    if (this._events[event] === void 0) {
      return false;
    }
    this._events[event].listeners.forEach((listener) => listener({
      ...this._options,
      ...payload
    }));
  }
  _isAllowedEvent(eventName) {
    return this._eventNames.includes(eventName);
  }
  _isEmptyArray(arr) {
    if (Array.isArray(arr) && arr) {
      return !arr.length;
    }
  }
  _isHighlightedWord(word) {
    const highlightedWordsArr = this._options.highlight.words;
    return highlightedWordsArr && !this._isEmptyArray(highlightedWordsArr) && highlightedWordsArr.includes(word);
  }
  _isLastLetterOfWord(index, total) {
    return index === total - 1;
  }
  _isLastWordOfSentence(wordStr) {
    let output = false;
    for (let [index, word] of this._words.entries()) {
      if (wordStr === word && index + 1 === this._words.length) {
        output = true;
      }
    }
    return output;
  }
  _setCSSVariables(sentence) {
    sentence.classList.add(this._classNames.textAlignment);
    sentence.style.setProperty("--mw-word-spacing", String(this._getSpacing(sentence)));
    sentence.style.setProperty("--mw-letter-spacing", String(this._getSpacing(sentence, "letter")));
    sentence.style.setProperty("--mw-duration", `${this._options.duration}ms`);
    sentence.style.setProperty("--mw-delay", `${this._options.delay}ms`);
    sentence.style.setProperty("--mw-offset", String(this._options.offset));
    sentence.style.setProperty("--mw-text-alignment", String(this._options.textAlignment));
  }
  _getWordIndex(index, words) {
    const realIndex = index + 1;
    return this._options.reverseOrder ? words.length - realIndex : realIndex;
  }
  _getSpacing(sentence, type = "word") {
    const spacing = type === "word" ? this._options.wordSpacing : this._options.letterSpacing;
    if (spacing) {
      return spacing;
    }
    return type === "word" ? parseInt(window.getComputedStyle(sentence, null).getPropertyValue("font-size")) * 0.4 : 0;
  }
  _getWordsArray(sentence) {
    if (sentence.textContent) {
      this._words = sentence.textContent.trim().split(" ");
    }
    return this._words;
  }
  _getLettersArray(word) {
    return word.textContent ? [...word.textContent] : [];
  }
  _getRandomScrambleCharacter() {
    const randomFactor = Math.floor(Math.random() * this._options.scrambleChars.length);
    return this._options.scrambleChars[randomFactor];
  }
  _getSentences() {
    if (this._sentences) {
      for (const sentence of this._sentences) {
        if (this._options.sentence) {
          sentence.innerHTML = this._options.sentence;
        }
        sentence.classList.add(this._classNames.base);
        sentence.classList.add(this._options.transition);
        if (this._options.reverseTransition) {
          sentence.classList.add(this._classNames.reverse);
        }
        if (this._options.animateLetters) {
          sentence.classList.add(this._classNames.animateLetters);
        }
      }
    }
  }
  _parseSentences() {
    if (this._sentences) {
      for (const sentence of this._sentences) {
        this._setCSSVariables(sentence);
        this._createAndAppendWordTags(sentence);
        this._createAndAppendLetterTags(sentence);
        if (this._options.scrambleLetters) {
          this._createScramble();
        }
        setTimeout(() => {
          sentence.classList.add(this._visible);
          delete sentence.dataset[this._classNames.base];
        }, 100);
      }
    }
  }
  _appendTags(el, tagsArr) {
    el.innerHTML = "";
    for (const tag of tagsArr) {
      el.appendChild(tag);
    }
  }
  _scrambleLetter(letterEl, letterIndex, finalLetter) {
    const frameDuration = 1e3 / this._options.scrambleFPS;
    const scrambleDelay = this._options.delay * letterIndex;
    const startScramble = () => {
      let startTime = Date.now();
      const letterEventPayload = {
        scrambleLetterInfo: {
          letterEl,
          finalLetter,
          letterText: letterEl.textContent
        }
      };
      this._emitEvent("letterScrambleStart", letterEventPayload);
      const animate = () => {
        if (this._paused) {
          startTime = Date.now();
          requestAnimationFrame(animate);
          return;
        }
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < this._options.duration) {
          if (elapsedTime % frameDuration < this._options.scrambleFPS) {
            letterEl.textContent = this._getRandomScrambleCharacter();
          }
          letterEventPayload.scrambleLetterInfo.letterText = letterEl.textContent;
          this._emitEvent("letterScrambling", letterEventPayload);
          requestAnimationFrame(animate);
        } else {
          if (this._options.scrambleMode === "unscramble") {
            letterEl.textContent = finalLetter;
          }
          letterEventPayload.scrambleLetterInfo.letterText = letterEl.textContent;
          this._emitEvent("letterScrambleEnd", letterEventPayload);
          if (letterIndex === this._letters.length - 1) {
            this._emitEvent("scrambleEnd", {
              scrambleInfo: {
                letters: this._letters
              }
            });
          }
        }
      };
      animate();
    };
    setTimeout(startScramble, scrambleDelay);
  }
  _createTag(options) {
    const tagEl = document.createElement(options.tag);
    tagEl.className = options.className;
    tagEl.textContent = options.text;
    for (const varName in options.vars) {
      if (varName) {
        const vars = options.vars[varName] ?? null;
        tagEl.style.setProperty(`--mw-${varName}`, String(vars));
      }
    }
    return tagEl;
  }
  _createAndAppendWordTags(sentence) {
    const wordTagsArr = this._createWordTags(sentence);
    this._appendTags(sentence, wordTagsArr);
  }
  _createAndAppendLetterTags(sentence) {
    const words = sentence.querySelectorAll(`.${this._classNames.word}`);
    if (this._options.reverseOrder) {
      this._currentLetterIndex = this._words.join("").length - 1;
    }
    words.forEach((word, index) => {
      const letterTagsArr = this._createLetterTags(word, this._getWordIndex(index, words));
      this._appendTags(word, letterTagsArr);
    });
  }
  _createWordTags(sentence) {
    const wordTagsArr = [];
    const words = this._getWordsArray(sentence);
    for (const word of words) {
      let tag = "span";
      let className = this._classNames.word;
      if (this._isHighlightedWord(word)) {
        className += ` ${this._options.highlight.classname}`;
        tag = this._options.highlight.tag;
      }
      wordTagsArr.push(this._createTag({
        tag,
        className,
        text: word,
        vars: {}
      }));
    }
    return wordTagsArr;
  }
  _createLetterElement(letter, letters, index, wordIndex) {
    const payload = {
      tag: "span",
      className: `${this._classNames.letter}`,
      text: letter,
      vars: {
        t: void 0,
        w: wordIndex,
        l: index
      }
    };
    if (this._options.animateLetters && typeof payload.vars === "object" && !Array.isArray(payload.vars)) {
      payload.vars.t = letters.length;
      payload.vars.l = this._options.reverseOrder ? this._currentLetterIndex-- : this._currentLetterIndex++;
    }
    return this._createTag(payload);
  }
  _createLetterTags(word, wordIndex) {
    const letterTagsArr = [];
    const letters = this._getLettersArray(word);
    for (const [index, letter] of letters.entries()) {
      const letterEl = this._createLetterElement(letter, letters, index, wordIndex);
      if (this._isLastLetterOfWord(index, letters.length)) {
        this._addLetterEventListeners(word, letterEl);
      }
      this._letters.push(letterEl);
      letterTagsArr.push(letterEl);
    }
    return letterTagsArr;
  }
  _createScramble() {
    if (this._options.reverseOrder) {
      this._letters.reverse();
    }
    this._emitEvent("scrambleStart", {
      scrambleInfo: {
        letters: this._letters
      }
    });
    this._letters.forEach((letterEl, index) => {
      if (letterEl.textContent) {
        const letterContent = letterEl.textContent;
        this._scrambleLetter(letterEl, index, letterContent);
      }
    });
  }
  _addLetterEventListeners(word, letterEl) {
    const payload = {
      word: {
        el: word,
        text: word.textContent
      }
    };
    letterEl.addEventListener("transitionstart", (event) => {
      if (event.propertyName === this._options.eventsTransitionProperty) {
        this._emitEvent(`wordTransitionStart`, payload);
      }
    });
    letterEl.addEventListener("transitionend", (event) => {
      if (event.propertyName === this._options.eventsTransitionProperty) {
        this._emitEvent(`wordTransitionEnd`, payload);
        if (word.textContent && this._isLastWordOfSentence(word.textContent)) {
          this._emitEvent("end");
        }
      }
    });
  }
  _triggerStart() {
    this._started = true;
    this._emitEvent("start");
    this._parseSentences();
  }
  _triggerStartOnIntersection() {
    var _a;
    if ("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype && this._options.el) {
      const observer = new IntersectionObserver((elements) => {
        elements.forEach((el) => {
          if (el.isIntersecting) {
            this._triggerStart();
          }
        });
      }, this._options.intersectionOptions);
      (_a = this._sentences) == null ? void 0 : _a.forEach((el) => {
        if (el) {
          observer.observe(el);
        }
      });
    }
  }
  pause() {
    if (!this._paused && this._sentences) {
      const elements = document.querySelectorAll(`.${this._classNames.letter}`);
      elements.forEach((el, index) => {
        const htmlEl = el;
        this._pausedProps[index] = {};
        const computedStyle = window.getComputedStyle(el);
        for (const prop of this._options.pausableProps) {
          this._pausedProps[index][prop] = computedStyle[prop];
          htmlEl.style[prop] = computedStyle[prop];
        }
      });
      this._paused = true;
    }
  }
  resume() {
    if (this._paused && this._sentences) {
      const elements = document.querySelectorAll(`.${this._classNames.letter}`);
      elements.forEach((el) => {
        const htmlEl = el;
        for (const prop of this._options.pausableProps) {
          htmlEl.style[prop] = "";
        }
      });
      this._paused = false;
    }
  }
  start() {
    if (!this._started) {
      if (this._options.intersectionStart) {
        this._triggerStartOnIntersection();
      } else {
        this._triggerStart();
      }
    }
  }
}
if (typeof window !== "undefined") {
  window.Movinwords = Movinwords;
}
export {
  Movinwords as default
};
