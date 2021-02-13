class movinwords {
  constructor (opts = {}) {
    this.sentences = null
    this.started = false
    this.visible = '--v'
    this.classNames = {
      base: 'mw',
      word: 'mw-w',
      letter: 'mw-l'
    }
    this.options = {
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
      ...opts
    }

    this.getSentences()

    if (this.options.autostart) {
      this.start()
    }
  }

  start () {
    if (!this.started) {
      this.started = true
      this.parseSentences()
    }
  }

  getSentences () {
    this.sentences = document.querySelectorAll(this.options.el)
    this.sentences.forEach(sentence => {
      sentence.classList.add(this.classNames.base)
      sentence.classList.add(this.options.transition)
    })
  }

  parseSentences () {
    this.sentences.forEach(sentence => {
      this.setCSSVariables(sentence)

      this.createAndAppendWordTags(sentence)
      this.createAndAppendLetterTags(sentence)

      setTimeout(() => {
        sentence.classList.add(this.visible)
        delete sentence.dataset[this.classNames.base]
      }, 500)
    })
  }

  createAndAppendWordTags (sentence) {
    const wordTagsArr = this.createWordTags(sentence)
    this.appendTags(sentence, wordTagsArr)
  }

  createAndAppendLetterTags (sentence) {
    const words = sentence.querySelectorAll(`.${this.classNames.word}`)

    words.forEach((word, index) => {
      const letterTagsArr = this.createLetterTags(word, index + 1)
      this.appendTags(word, letterTagsArr)
    })
  }

  isArray (arr) {
    return Array.isArray(arr)
  }

  isEmptyArray (arr) {
    if (Array.isArray(arr) && arr) {
      return !arr.length
    }
  }

  isHighlightedWord (word) {
    const highlightedWordsArr = this.options.highlight.words
    return (highlightedWordsArr && !this.isEmptyArray(highlightedWordsArr) && highlightedWordsArr.includes(word))
  }

  createTag (options) {
    const tag = document.createElement(options.tag)
    tag.className = options.className
    tag.innerText = options.text

    for (let varName in options.vars) {
      tag.style.setProperty(`--mw-${varName}`, options.vars[varName])
    }

    return tag
  }

  appendTags (el, tagsArr) {
    el.innerHTML = ''

    for (const tag of tagsArr) {
      el.appendChild(tag)
    }
  }

  getWordSpacing (sentence) {
    if (this.options.wordSpacing) {
      return this.options.wordSpacing
    }

    return parseInt(window.getComputedStyle(sentence, null).getPropertyValue('font-size')) * 0.4
  }

  getWordsArray (sentence) {
    return sentence.innerText.trim().split(' ')
  }

  getLettersArray (word) {
    return [...word.innerText]
  }

  setCSSVariables (sentence) {
    sentence.style.setProperty('--mw-word-spacing', this.getWordSpacing(sentence))
    sentence.style.setProperty('--mw-duration', `${this.options.duration}ms`)
    sentence.style.setProperty('--mw-delay', `${this.options.delay}ms`)
    sentence.style.setProperty('--mw-offset', this.options.offset)
  }

  createWordTags (sentence) {
    const wordTagsArr = []
    const words = this.getWordsArray(sentence)

    for (const word of words) {
      let tag = 'span'
      let className = this.classNames.word

      if (this.isHighlightedWord(word)) {
        className += ` ${this.options.highlight.classname}`
        tag = this.options.highlight.tag
      }

      wordTagsArr.push(this.createTag({
        tag,
        className,
        text: word
      }))
    }

    return wordTagsArr
  }

  createLetterTags (word, wordIndex) {
    const letterTagsArr = []
    const letters = this.getLettersArray(word)

    for (const [index, letter] of letters.entries()) {
      letterTagsArr.push(this.createTag({
        tag: 'span',
        className: `${this.classNames.letter}`,
        text: letter,
        vars: {
          w: wordIndex,
          l: index
        }
      }))
    }

    return letterTagsArr
  }
}

export default movinwords
