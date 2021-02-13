/*
 * movinwords v1.0.1 - Add animation to your words and sentences tags.
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

    this.sentences = null;
    this.started = false;
    this.visible = '--v';
    this.classNames = {
      base: 'mw',
      word: 'mw-w',
      letter: 'mw-l'
    };
    this.options = _extends({
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
      }
    }, opts);

    this.getSentences();

    if (this.options.autostart) {
      this.start();
    }
  }

  _createClass(movinwords, [{
    key: 'start',
    value: function start() {
      if (!this.started) {
        this.started = true;
        this.parseSentences();
      }
    }
  }, {
    key: 'getSentences',
    value: function getSentences() {
      var _this = this;

      this.sentences = document.querySelectorAll(this.options.el);
      this.sentences.forEach(function (sentence) {
        sentence.classList.add(_this.classNames.base);
        sentence.classList.add(_this.options.transition);
      });
    }
  }, {
    key: 'parseSentences',
    value: function parseSentences() {
      var _this2 = this;

      this.sentences.forEach(function (sentence) {
        _this2.setCSSVariables(sentence);

        _this2.createAndAppendWordTags(sentence);
        _this2.createAndAppendLetterTags(sentence);

        setTimeout(function () {
          sentence.classList.add(_this2.visible);
          delete sentence.dataset[_this2.classNames.base];
        }, 500);
      });
    }
  }, {
    key: 'createAndAppendWordTags',
    value: function createAndAppendWordTags(sentence) {
      var wordTagsArr = this.createWordTags(sentence);
      this.appendTags(sentence, wordTagsArr);
    }
  }, {
    key: 'createAndAppendLetterTags',
    value: function createAndAppendLetterTags(sentence) {
      var _this3 = this;

      var words = sentence.querySelectorAll('.' + this.classNames.word);

      words.forEach(function (word, index) {
        var letterTagsArr = _this3.createLetterTags(word, index + 1);
        _this3.appendTags(word, letterTagsArr);
      });
    }
  }, {
    key: 'isArray',
    value: function isArray(arr) {
      return Array.isArray(arr);
    }
  }, {
    key: 'isEmptyArray',
    value: function isEmptyArray(arr) {
      if (Array.isArray(arr) && arr) {
        return !arr.length;
      }
    }
  }, {
    key: 'isHighlightedWord',
    value: function isHighlightedWord(word) {
      var highlightedWordsArr = this.options.highlight.words;
      return highlightedWordsArr && !this.isEmptyArray(highlightedWordsArr) && highlightedWordsArr.includes(word);
    }
  }, {
    key: 'createTag',
    value: function createTag(options) {
      var tag = document.createElement(options.tag);
      tag.className = options.className;
      tag.innerText = options.text;

      for (var varName in options.vars) {
        tag.style.setProperty('--mw-' + varName, options.vars[varName]);
      }

      return tag;
    }
  }, {
    key: 'appendTags',
    value: function appendTags(el, tagsArr) {
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
    key: 'getWordSpacing',
    value: function getWordSpacing(sentence) {
      if (this.options.wordSpacing) {
        return this.options.wordSpacing;
      }

      return parseInt(window.getComputedStyle(sentence, null).getPropertyValue('font-size')) * 0.4;
    }
  }, {
    key: 'getWordsArray',
    value: function getWordsArray(sentence) {
      return sentence.innerText.trim().split(' ');
    }
  }, {
    key: 'getLettersArray',
    value: function getLettersArray(word) {
      return [].concat(_toConsumableArray(word.innerText));
    }
  }, {
    key: 'setCSSVariables',
    value: function setCSSVariables(sentence) {
      sentence.style.setProperty('--mw-word-spacing', this.getWordSpacing(sentence));
      sentence.style.setProperty('--mw-duration', this.options.duration + 'ms');
      sentence.style.setProperty('--mw-delay', this.options.delay + 'ms');
      sentence.style.setProperty('--mw-offset', this.options.offset);
    }
  }, {
    key: 'createWordTags',
    value: function createWordTags(sentence) {
      var wordTagsArr = [];
      var words = this.getWordsArray(sentence);

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = words[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var word = _step2.value;

          var tag = 'span';
          var className = this.classNames.word;

          if (this.isHighlightedWord(word)) {
            className += ' ' + this.options.highlight.classname;
            tag = this.options.highlight.tag;
          }

          wordTagsArr.push(this.createTag({
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
    key: 'createLetterTags',
    value: function createLetterTags(word, wordIndex) {
      var letterTagsArr = [];
      var letters = this.getLettersArray(word);

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = letters.entries()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _step3$value = _slicedToArray(_step3.value, 2),
              index = _step3$value[0],
              letter = _step3$value[1];

          letterTagsArr.push(this.createTag({
            tag: 'span',
            className: '' + this.classNames.letter,
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