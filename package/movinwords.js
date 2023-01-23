class Movinwords {
  constructor(opts = {}) {
    this._sentences = null
    this._words = []
    this.currentLetterIndex = 0
    this._started = false
    this._visible = '--v'
    this._events = {}
    this._eventNames = [
      'start',
      'end',
      'wordTransitionStart',
      'wordTransitionEnd',
      'letterTransitionStart',
      'letterTransitionEnd'
    ]

    this._classNames = {
      base: 'mw',
      word: 'mw-w',
      letter: 'mw-l',
      reverse: 'mw-r',
      animateLetters: 'mw-al'
    }

    this._options = {
      autostart: true,
      duration: 1000,
      delay: 100,
      offset: 20,
      animateLetters: false,
      reverseTransition: false,
      reverseOrder: false,
      transition: 'fadeIn',
      wordSpacing: null,
      highlight: {
        classname: 'highlight',
        tag: 'strong',
        words: []
      },
      events: {},
      eventsTransitionProperty: 'opacity',
      intersectionStart: false,
      intersectionOptions: {
        root: null,
        threshold: 0,
        rootMargin: '0px'
      },
      ...opts
    }

    if (!this._options.el) {
      throw new Error('No element provided.')
    }

    this._sentences = document.querySelectorAll(this._options.el)

    if (this._sentences) {
      this._registerEvents()
      this._getSentences()

      if (this._options.autostart) {
        this.start()
      }
    }
  }

  _registerEvents() {
    const registeredEvents = this._options.events

    for (const eventName in registeredEvents) {
      if (registeredEvents.hasOwnProperty(eventName) && this._isAllowedEvent(eventName)) {
        this._addEventListener(eventName, registeredEvents[eventName])
      }
    }
  }

  _addEventListener(event, callback) {
    if (typeof event !== 'string' || typeof callback !== 'function') {
      return false
    }

    if (this._events[event] === undefined) {
      this._events[event] = {
        listeners: []
      }
    }

    this._events[event].listeners.push(callback)
  }

  _emitEvent(event, details) {
    if (this._events[event] === undefined) {
      return false
    }

    this._events[event].listeners.forEach(listener => {
      listener(details)
    })
  }

  _isAllowedEvent(eventName) {
    return this._eventNames.includes(eventName)
  }

  _isEmptyArray(arr) {
    if (Array.isArray(arr) && arr) {
      return !arr.length
    }
  }

  _isHighlightedWord(word) {
    const highlightedWordsArr = this._options.highlight.words
    return (highlightedWordsArr && !this._isEmptyArray(highlightedWordsArr) && highlightedWordsArr.includes(word))
  }

  _isLastLetterOfWord(index, total) {
    return index === total - 1
  }

  _isLastWordOfSentence(wordStr) {
    let output = false

    for (let [index, word] of this._words.entries()) {
      if ((wordStr === word) && (index + 1 === this._words.length)) {
        output = true
      }
    }

    return output
  }

  _setCSSVariables(sentence) {
    sentence.style.setProperty('--mw-word-spacing', this._getWordSpacing(sentence))
    sentence.style.setProperty('--mw-duration', `${this._options.duration}ms`)
    sentence.style.setProperty('--mw-delay', `${this._options.delay}ms`)
    sentence.style.setProperty('--mw-offset', this._options.offset)
  }

  _getWordIndex(index, words) {
    const realIndex = index + 1
    return this._options.reverseOrder
      ? words.length - realIndex
      : realIndex
  }

  _getWordSpacing(sentence) {
    if (this._options.wordSpacing) {
      return this._options.wordSpacing
    }

    return parseInt(window.getComputedStyle(sentence, null).getPropertyValue('font-size')) * 0.4
  }

  _getWordsArray(sentence) {
    this._words = sentence.textContent.trim().split(' ')
    return this._words
  }

  _getLettersArray(word) {
    return [...word.textContent]
  }

  _getSentences() {
    for (const sentence of this._sentences) {
      sentence.classList.add(this._classNames.base)
      sentence.classList.add(this._options.transition)

      if (this._options.reverseTransition) {
        sentence.classList.add(this._classNames.reverse)
      }

      if (this._options.animateLetters) {
        sentence.classList.add(this._classNames.animateLetters)
      }
    }
  }

  _parseSentences() {
    for (const sentence of this._sentences) {
      this._setCSSVariables(sentence)
      this._createAndAppendWordTags(sentence)
      this._createAndAppendLetterTags(sentence)

      setTimeout(() => {
        sentence.classList.add(this._visible)
        delete sentence.dataset[this._classNames.base]
      }, 100)
    }
  }

  _appendTags(el, tagsArr) {
    el.innerHTML = ''

    for (const tag of tagsArr) {
      el.appendChild(tag)
    }
  }

  _createTag(options) {
    const tagEl = document.createElement(options.tag)
    tagEl.className = options.className
    tagEl.textContent = options.text

    for (const varName in options.vars) {
      tagEl.style.setProperty(`--mw-${varName}`, options.vars[varName])
    }

    return tagEl
  }

  _createAndAppendWordTags(sentence) {
    const wordTagsArr = this._createWordTags(sentence)
    this._appendTags(sentence, wordTagsArr)
  }

  _createAndAppendLetterTags(sentence) {
    const words = sentence.querySelectorAll(`.${this._classNames.word}`)

    words.forEach((word, index) => {
      const letterTagsArr = this._createLetterTags(word, this._getWordIndex(index, words))
      this._appendTags(word, letterTagsArr)
    })
  }

  _createWordTags(sentence) {
    const wordTagsArr = []
    const words = this._getWordsArray(sentence)

    for (const word of words) {
      let tag = 'span'
      let className = this._classNames.word

      if (this._isHighlightedWord(word)) {
        className += ` ${this._options.highlight.classname}`
        tag = this._options.highlight.tag
      }

      wordTagsArr.push(this._createTag({
        tag,
        className,
        text: word
      }))
    }

    return wordTagsArr
  }

  _createLetterElement(letter, letters, index, wordIndex) {
    const payload = {
      tag: 'span',
      className: `${this._classNames.letter}`,
      text: letter,
      vars: {
        w: wordIndex,
        l: index
      }
    }

    if (this._options.animateLetters) {
      payload.vars.t = letters.length
      payload.vars.l = this.currentLetterIndex++
    }

    return this._createTag(payload)
  }

  _addLetterEventListeners(word, letterEl) {
    const payload = {
      ...this._options,
      word: {
        el: word,
        text: word.textContent
      }
    }

    letterEl.addEventListener('transitionstart', (event) => {
      if (event.propertyName === this._options.eventsTransitionProperty) {
        this._emitEvent(`wordTransitionStart`, payload)
      }
    })

    letterEl.addEventListener('transitionend', (event) => {
      if (event.propertyName === this._options.eventsTransitionProperty) {
        this._emitEvent(`wordTransitionEnd`, payload)

        if (this._isLastWordOfSentence(word.textContent)) {
          this._emitEvent('end', this._options)
        }
      }
    })
  }

  _createLetterTags(word, wordIndex) {
    const letterTagsArr = []
    const letters = this._getLettersArray(word)

    for (const [index, letter] of letters.entries()) {
      const letterEl = this._createLetterElement(letter, letters, index, wordIndex)

      if (this._isLastLetterOfWord(index, letters.length)) {
        this._addLetterEventListeners(word, letterEl)
      }

      letterTagsArr.push(letterEl)
    }

    return letterTagsArr
  }

  _triggerStart() {
    this._started = true
    this._emitEvent('start', this._options)
    this._parseSentences()
  }

  _triggerStartOnIntersection() {
    if (
      'IntersectionObserver' in window &&
      'IntersectionObserverEntry' in window &&
      'intersectionRatio' in window.IntersectionObserverEntry.prototype &&
      this._options.el
    ) {
      const observer = new IntersectionObserver((elements) => {
        elements.forEach((el) => {
          if (el.isIntersecting) {
            this._triggerStart()
          }
        })
      }, this._options.intersectionOptions)

      this._sentences.forEach((el) => {
        if (el) {
          observer.observe(el)
        }
      })
    }
  }

  start() {
    if (!this._started) {
      if (this._options.intersectionStart) {
        this._triggerStartOnIntersection()
      } else {
        this._triggerStart()
      }
    }
  }
}

export default Movinwords
