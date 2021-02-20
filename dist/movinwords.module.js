/*
 * movinwords v1.0.2 - Add animation to your words and sentences tags.
 * Copyright (c) 2021 Ignacio Revuelta
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var movinwords = function () {
  function movinwords() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, movinwords);

    this._sentences = null;
    this._started = false;
    this._visible = '--v';
    this._events = {};
    this._eventNames = ['start', 'end', 'wordTransitionStart', 'wordTransitionEnd', 'letterTransitionStart', 'letterTransitionEnd'];
    this._classNames = {
      base: 'mw',
      word: 'mw-w',
      letter: 'mw-l'
    };
    this._options = _extends({
      autostart: true,
      duration: 1000,
      delay: 0,
      offset: 20,
      transition: 'fadeIn',
      wordSpacing: null,
      highlight: {
        classname: 'highlight',
        tag: 'strong',
        words: []
      },
      events: {}
    }, opts);

    this._registerEvents();
    this._getSentences();

    if (this._options.autostart) {
      this.start();
    }
  }

  _createClass(movinwords, [{
    key: 'start',
    value: function start() {
      if (!this._started) {
        this._started = true;
        this._emitEvent('start', this._options);
        this._parseSentences();
      }
    }
  }, {
    key: '_registerEvents',
    value: function _registerEvents() {
      var registeredEvents = this._options.events;

      for (var eventName in registeredEvents) {
        if (registeredEvents.hasOwnProperty(eventName) && this._isAllowedEvent(eventName)) {
          this._addEventListener(eventName, registeredEvents[eventName]);
        }
      }
    }
  }, {
    key: '_addEventListener',
    value: function _addEventListener(event, callback) {
      if (typeof event !== 'string' || typeof callback !== 'function') {
        return false;
      }

      if (this._events[event] === undefined) {
        this._events[event] = {
          listeners: []
        };
      }

      this._events[event].listeners.push(callback);
    }
  }, {
    key: '_emitEvent',
    value: function _emitEvent(event, details) {
      if (this._events[event] === undefined) {
        return false;
      }

      this._events[event].listeners.forEach(function (listener) {
        listener(details);
      });
    }
  }, {
    key: '_isAllowedEvent',
    value: function _isAllowedEvent(eventName) {
      return this._eventNames.includes(eventName);
    }
  }, {
    key: '_isEmptyArray',
    value: function _isEmptyArray(arr) {
      if (Array.isArray(arr) && arr) {
        return !arr.length;
      }
    }
  }, {
    key: '_isHighlightedWord',
    value: function _isHighlightedWord(word) {
      var highlightedWordsArr = this._options.highlight.words;
      return highlightedWordsArr && !this._isEmptyArray(highlightedWordsArr) && highlightedWordsArr.includes(word);
    }
  }, {
    key: '_setCSSVariables',
    value: function _setCSSVariables(sentence) {
      sentence.style.setProperty('--mw-word-spacing', this._getWordSpacing(sentence));
      sentence.style.setProperty('--mw-duration', this._options.duration + 'ms');
      sentence.style.setProperty('--mw-delay', this._options.delay + 'ms');
      sentence.style.setProperty('--mw-offset', this._options.offset);
    }
  }, {
    key: '_getWordSpacing',
    value: function _getWordSpacing(sentence) {
      if (this._options.wordSpacing) {
        return this._options.wordSpacing;
      }

      return parseInt(window.getComputedStyle(sentence, null).getPropertyValue('font-size')) * 0.4;
    }
  }, {
    key: '_getWordsArray',
    value: function _getWordsArray(sentence) {
      return sentence.innerText.trim().split(' ');
    }
  }, {
    key: '_getLettersArray',
    value: function _getLettersArray(word) {
      return [].concat(_toConsumableArray(word.innerText));
    }
  }, {
    key: '_getSentences',
    value: function _getSentences() {
      var _this = this;

      this._sentences = document.querySelectorAll(this._options.el);
      this._sentences.forEach(function (sentence) {
        sentence.classList.add(_this._classNames.base);
        sentence.classList.add(_this._options.transition);
      });
    }
  }, {
    key: '_parseSentences',
    value: function _parseSentences() {
      var _this2 = this;

      this._sentences.forEach(function (sentence) {
        _this2._setCSSVariables(sentence);
        _this2._createAndAppendWordTags(sentence);
        _this2._createAndAppendLetterTags(sentence);

        setTimeout(function () {
          sentence.classList.add(_this2._visible);
          delete sentence.dataset[_this2._classNames.base];
          _this2._emitEvent('end', _this2._options);
        }, 100);
      });
    }
  }, {
    key: '_appendTags',
    value: function _appendTags(el, tagsArr) {
      el.innerHTML = '';

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = tagsArr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var tag = _step.value;

          el.appendChild(tag);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: '_createTag',
    value: function _createTag(options) {
      var tagEl = document.createElement(options.tag);
      tagEl.className = options.className;
      tagEl.innerText = options.text;

      for (var varName in options.vars) {
        tagEl.style.setProperty('--mw-' + varName, options.vars[varName]);
      }

      return tagEl;
    }
  }, {
    key: '_createAndAppendWordTags',
    value: function _createAndAppendWordTags(sentence) {
      var wordTagsArr = this._createWordTags(sentence);
      this._appendTags(sentence, wordTagsArr);
    }
  }, {
    key: '_createAndAppendLetterTags',
    value: function _createAndAppendLetterTags(sentence) {
      var _this3 = this;

      var words = sentence.querySelectorAll('.' + this._classNames.word);

      words.forEach(function (word, index) {
        var letterTagsArr = _this3._createLetterTags(word, index + 1);
        _this3._appendTags(word, letterTagsArr);
      });
    }
  }, {
    key: '_createWordTags',
    value: function _createWordTags(sentence) {
      var wordTagsArr = [];
      var words = this._getWordsArray(sentence);
      var eventPayload = {};

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = words[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var word = _step2.value;

          var tag = 'span';
          var className = this._classNames.word;

          if (this._isHighlightedWord(word)) {
            className += ' ' + this._options.highlight.classname;
            tag = this._options.highlight.tag;
          }

          wordTagsArr.push(this._createTag({
            tag: tag,
            className: className,
            text: word
          }));
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return wordTagsArr;
    }
  }, {
    key: '_createLetterTags',
    value: function _createLetterTags(word, wordIndex) {
      var letterTagsArr = [];
      var letters = this._getLettersArray(word);

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = letters.entries()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _step3$value = _slicedToArray(_step3.value, 2),
              index = _step3$value[0],
              letter = _step3$value[1];

          letterTagsArr.push(this._createTag({
            tag: 'span',
            className: '' + this._classNames.letter,
            text: letter,
            vars: {
              w: wordIndex,
              l: index
            }
          }));
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return letterTagsArr;
    }
  }]);

  return movinwords;
}();

exports.default = movinwords;