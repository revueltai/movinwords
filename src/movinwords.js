class movinwords {
  constructor (opts = {}) {
    this._sentences = null
    this._words = []
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
      letter: 'mw-l'
    }
    this._options = {
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
     events: {},
     eventsTransitionProperty: 'opacity',
      ...opts
    }

    this._registerEvents()
    this._getSentences()

    if (this._options.autostart) {
      this.start()
    }
  }

  _registerEvents () {
    const registeredEvents = this._options.events

    for (const eventName in registeredEvents) {
      if (registeredEvents.hasOwnProperty(eventName) && this._isAllowedEvent(eventName)) {
        this._addEventListener(eventName, registeredEvents[eventName])
      }
    }
  }

  _addEventListener (event, callback) {
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

  _emitEvent (event, details) {
    if (this._events[event] === undefined) {
      return false
    }

    this._events[event].listeners.forEach(listener => {
      listener(details)
    })
  }

  _isAllowedEvent (eventName) {
    return this._eventNames.includes(eventName)
  }

  _isEmptyArray (arr) {
    if (Array.isArray(arr) && arr) {
      return !arr.length
    }
  }

  _isHighlightedWord (word) {
    const highlightedWordsArr = this._options.highlight.words
    return (highlightedWordsArr && !this._isEmptyArray(highlightedWordsArr) && highlightedWordsArr.includes(word))
  }

  _isLastLetterOfWord (index, total) {
    return index === total - 1
  }

  _isLastWordOfSentence (wordStr) {
    let output = false

    for (let [index, word] of this._words.entries()) {
      if ((wordStr === word) && (index + 1 === this._words.length)) {
        output = true
      }
    }

    return output
  }

  _setCSSVariables (sentence) {
    sentence.style.setProperty('--mw-word-spacing', this._getWordSpacing(sentence))
    sentence.style.setProperty('--mw-duration', `${this._options.duration}ms`)
    sentence.style.setProperty('--mw-delay', `${this._options.delay}ms`)
    sentence.style.setProperty('--mw-offset', this._options.offset)
  }

  _getWordSpacing (sentence) {
    if (this._options.wordSpacing) {
      return this._options.wordSpacing
    }

    return parseInt(window.getComputedStyle(sentence, null).getPropertyValue('font-size')) * 0.4
  }

  _getWordsArray (sentence) {
    this._words = sentence.innerText.trim().split(' ')
    return this._words
  }

  _getLettersArray (word) {
    return [...word.innerText]
  }

  _getSentences () {
    this._sentences = document.querySelectorAll(this._options.el)
    this._sentences.forEach(sentence => {
      sentence.classList.add(this._classNames.base)
      sentence.classList.add(this._options.transition)
    })
  }

  _parseSentences () {
    this._sentences.forEach(sentence => {
      this._setCSSVariables(sentence)
      this._createAndAppendWordTags(sentence)
      this._createAndAppendLetterTags(sentence)

      setTimeout(() => {
        sentence.classList.add(this._visible)
        delete sentence.dataset[this._classNames.base]
      }, 100)
    })
  }

  _appendTags (el, tagsArr) {
    el.innerHTML = ''

    for (const tag of tagsArr) {
      el.appendChild(tag)
    }
  }

  _createTag (options) {
    const tagEl = document.createElement(options.tag)
    tagEl.className = options.className
    tagEl.innerText = options.text

    for (const varName in options.vars) {
      tagEl.style.setProperty(`--mw-${varName}`, options.vars[varName])
    }

    return tagEl
  }

  _createAndAppendWordTags (sentence) {
    const wordTagsArr = this._createWordTags(sentence)
    this._appendTags(sentence, wordTagsArr)
  }

  _createAndAppendLetterTags (sentence) {
    const words = sentence.querySelectorAll(`.${this._classNames.word}`)

    words.forEach((word, index) => {
      const letterTagsArr = this._createLetterTags(word, index + 1)
      this._appendTags(word, letterTagsArr)
    })
  }

  _createWordTags (sentence) {
    const wordTagsArr = []
    const words = this._getWordsArray(sentence)
    let eventPayload = {}

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

  _createLetterTags (word, wordIndex) {
    const letterTagsArr = []
    const letters = this._getLettersArray(word)

    for (const [index, letter] of letters.entries()) {
      const tagEl = this._createTag({
        tag: 'span',
        className: `${this._classNames.letter}`,
        text: letter,
        vars: {
          w: wordIndex,
          l: index
        }
      })

      if (this._isLastLetterOfWord(index, letters.length)) {
        const payload = {
          ...this._options,
          word: {
            el: word,
            text: word.innerText
          }
        }

        tagEl.addEventListener('transitionstart', (event) => {
          if (event.propertyName === this._options.eventsTransitionProperty) {
            this._emitEvent(`wordTransitionStart`, payload)
          }
        })

        tagEl.addEventListener('transitionend', (event) => {
          if (event.propertyName === this._options.eventsTransitionProperty) {
            this._emitEvent(`wordTransitionEnd`, payload)

            if (this._isLastWordOfSentence(word.innerText)) {
              this._emitEvent('end', this._options)
            }
          }
        })
      }

      letterTagsArr.push(tagEl)
    }

    return letterTagsArr
  }

  start () {
    if (!this._started) {
      this._started = true
      this._emitEvent('start', this._options)
      this._parseSentences()
    }
  }
}

export default movinwords
