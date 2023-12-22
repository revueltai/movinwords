let opts = {}
const activeClass = 'active'
const exampleOptions = {
  el: '.word',
  sentence: '',
  autostart: false,
  intersectionStart: false,
  reverseTransition: true,
  reverseOrder: true,
  animateLetters: true,
  timers: [0, 100, 200, 500, 800, 1000, 2000],
  spacings: [0, 10, 20, 50, 100],
  transitions: [
    'slideInTop',
    'slideInBottom',
    'slideInLeft',
    'slideInRight',
    'revealInTop',
    'revealInBottom',
    'fadeIn'
  ],
  highlight: {
    classname: 'highlight',
    tag: 'strong',
    words: ['world!', 'Movinwords!']
  },
  events: {
    start: (options) => {
      console.log('Movinwords has Started!', options)
    },
    end: (options) => {
      console.log('Movinwords has Ended!', options)
    },
    wordTransitionStart: (options) => {
      console.log('Word Transition started!', options)
    },
    wordTransitionEnd: (options) => {
      console.log('Word Transition ended!', options)
    }
  },
  intersectionOptions: {
    root: null,
    threshold: 0,
    rootMargin: '0px'
  }
}

const _createLabel = (options) => {
  const labelEl = document.createElement('label')
  labelEl.htmlFor = options.for || options.id || ''
  labelEl.className = options.className || ''
  labelEl.innerText = options.label

  return labelEl
}

const _createInputText = (options) => {
  const inputEl = document.createElement('input')
  inputEl.type = 'search'
  inputEl.placeholder = options.placeholder
  inputEl.id = options.id || ''
  inputEl.dataset.type = options.dataType

  return inputEl
}

const _createInputCheckbox = (options) => {
  const inputEl = document.createElement('input')
  inputEl.type = 'checkbox'
  inputEl.id = options.id || ''
  inputEl.dataset.type = options.dataType
  inputEl.checked = options.checked

  const labelEl = _createLabel(options)
  labelEl.prepend(inputEl)

  return labelEl
}

const _createSelect = (options) => {
  const selectEl = document.createElement('select')
  selectEl.className = options.className || ''
  selectEl.id = options.id || ''
  selectEl.dataset.type = options.dataType

  for (let value of options.values) {
    const option = document.createElement('option')
    option.text = value
    option.value = value

    if (options.selected && options.selected === value) {
      option.selected = true
    }

    selectEl.options.add(option)
  }

  return selectEl
}

const _createButton = (options) => {
  const buttonEl = document.createElement('button')
  buttonEl.className = options.className || ''
  buttonEl.id = options.id || ''
  buttonEl.innerText = options.label

  return buttonEl
}

const _createContainer = (options) => {
  const wrapperEl = document.createElement('div')
  wrapperEl.className = 'ui-option'

  if (options.label) {
    const labelEl = _createLabel(options)
    wrapperEl.appendChild(labelEl)
  }

  wrapperEl.appendChild(options.el)

  return wrapperEl
}

const _createOptionsUI = (options) => {
  const texts = document.getElementById('texts')
  const dropdowns = document.getElementById('dropdowns')
  const checkboxes = document.getElementById('checkboxes')

  const sentenceInput = _createInputText({
    id: 'ui-input-sentence',
    className: 'ui-input-sentence',
    dataType: 'sentence',
    placeholder: 'Enter sentence to inject'
  })

  const durationSelect = _createSelect({
    id: 'ui-select-duration',
    className: 'ui-select-duration',
    values: options.timers,
    selected: 500,
    dataType: 'duration'
  })

  const delaySelect = _createSelect({
    id: 'ui-select-delay',
    className: 'ui-select-delay',
    values: options.timers,
    selected: 500,
    dataType: 'delay'
  })

  const transitionsSelect = _createSelect({
    id: 'ui-select-transitions',
    className: 'ui-select-transitions',
    values: options.transitions,
    dataType: 'transition'
  })

  const offsetSelect = _createSelect({
    id: 'ui-select-offset',
    className: 'ui-select-offset',
    values: options.spacings,
    selected: 10,
    dataType: 'offset'
  })

  const wordSpacingSelect = _createSelect({
    id: 'ui-select-word-spacing',
    className: 'ui-select-word-spacing',
    values: options.spacings,
    selected: 10,
    dataType: 'wordSpacing'
  })

  const letterSpacingSelect = _createSelect({
    id: 'ui-select-letter-spacing',
    className: 'ui-select-letter-spacing',
    values: options.spacings,
    dataType: 'letterSpacing'
  })

  const reverseTransitionCheckbox = _createInputCheckbox({
    id: 'ui-checkbox-reverse-transition',
    className: 'ui-checkbox-reverse-transition',
    label: 'Reverse transitions',
    dataType: 'reverseTransition'
  })

  const reverseOrderCheckbox = _createInputCheckbox({
    id: 'ui-checkbox-reverse-direction',
    className: 'ui-checkbox-reverse-direction',
    label: 'Reverse Order',
    dataType: 'reverseOrder'
  })

  const highlightCheckbox = _createInputCheckbox({
    id: 'ui-checkbox-highlight',
    className: 'ui-checkbox-highlight',
    label: 'Highlight words',
    dataType: 'highlight'
  })

  const eventsCheckbox = _createInputCheckbox({
    id: 'ui-checkbox-events',
    className: 'ui-checkbox-events',
    label: 'Trigger Events',
    dataType: 'events',
    checked: true
  })

  const intersectionObserverCheckbox = _createInputCheckbox({
    id: 'ui-checkbox-intersection',
    className: 'ui-checkbox-intersection',
    label: 'Trigger On Intersection',
    dataType: 'intersectionOptions',
    checked: true
  })

  const animateLettersCheckbox = _createInputCheckbox({
    id: 'ui-checkbox-animate-letters',
    className: 'ui-checkbox-animate-letters',
    label: 'Animate Letters',
    dataType: 'animateLetters',
    checked: false
  })

  // Containers
  const sentenceContainer = _createContainer({
    el: sentenceInput,
    id: 'sentence',
    label: 'Dynamic Sentence',
    for: 'ui-input-sentence'
  })

  const durationContainer = _createContainer({
    el: durationSelect,
    id: 'duration',
    label: 'Duration (ms)',
    for: 'ui-select-duration'
  })

  const delayContainer = _createContainer({
    el: delaySelect,
    id: 'delay',
    label: 'Delay (ms)',
    for: 'ui-select-delay'
  })

  const transitionsContainer = _createContainer({
    el: transitionsSelect,
    id: 'transitions',
    label: 'Transitions',
    for: 'ui-select-transitions'
  })

  const wordSpacingContainer = _createContainer({
    el: wordSpacingSelect,
    id: 'wordSpacingSelect',
    label: 'Word Spacing',
    for: 'ui-select-word-spacing'
  })

  const letterSpacingContainer = _createContainer({
    el: letterSpacingSelect,
    id: 'letterSpacingSelect',
    label: 'Letter Spacing',
    for: 'ui-select-letter-spacing'
  })

  const offsetContainer = _createContainer({
    el: offsetSelect,
    id: 'offset',
    label: 'Offset',
    for: 'ui-select-offset'
  })

  const reverseTransitionContainer = _createContainer({
    el: reverseTransitionCheckbox
  })

  const reverseOrderContainer = _createContainer({
    el: reverseOrderCheckbox
  })

  const animateLettersContainer = _createContainer({
    el: animateLettersCheckbox
  })
  const highlightContainer = _createContainer({
    el: highlightCheckbox
  })

  const eventsContainer = _createContainer({
    el: eventsCheckbox
  })

  const intersectionObserverContainer = _createContainer({
    el: intersectionObserverCheckbox
  })

  texts.appendChild(sentenceContainer)

  dropdowns.appendChild(durationContainer)
  dropdowns.appendChild(delayContainer)
  dropdowns.appendChild(transitionsContainer)
  dropdowns.appendChild(offsetContainer)
  dropdowns.appendChild(wordSpacingContainer)
  dropdowns.appendChild(letterSpacingContainer)

  checkboxes.appendChild(reverseTransitionContainer)
  checkboxes.appendChild(reverseOrderContainer)
  checkboxes.appendChild(highlightContainer)
  checkboxes.appendChild(eventsContainer)
  checkboxes.appendChild(intersectionObserverContainer)
  checkboxes.appendChild(animateLettersContainer)
}

const _prepareSentence = () => {
  const elWord = document.getElementById('word')
  const spanEl = document.createElement('span')

  spanEl.className = 'word'
  spanEl.innerText = 'Hello world! This is Movinwords! 👋'

  elWord.innerHTML = ''
  elWord.appendChild(spanEl)
}

const _prepareOptionsEvents = () => {
  const codeBtn = document.getElementById('btn-code')
  const optionsBtn = document.getElementById('ui-button-cta')

  codeBtn.addEventListener('click', (event) => {
    event.target.classList.toggle(activeClass)
    document.getElementById('pre').classList.toggle(activeClass)
  })

  optionsBtn.addEventListener('click', (event) => {
    event.preventDefault()
    _initExample()
  })
}

const _appendCode = () => {
  const payload = JSON.stringify(opts, (key, value) => {
    if (typeof value === 'function') {
      return value.toString().replace(/\n+/g, '')
    }

    return value
  }, 4)

  document.getElementById('code').innerText = `
const mw = new Movinwords(${payload});

mw.start();
`
}

const _updateOptionsPayload = () => {
  const textProps = ['sentence']
  const dropdownProps = ['duration', 'delay', 'transition', 'offset', 'wordSpacing', 'letterSpacing']
  const checkboxProps = ['reverseTransition', 'reverseOrder', 'highlight', 'events', 'intersectionOptions', 'animateLetters']
  const optionsIds = [
    'ui-input-sentence',
    'ui-select-delay',
    'ui-select-duration',
    'ui-select-transitions',
    'ui-select-offset',
    'ui-select-word-spacing',
    'ui-select-letter-spacing',
    'ui-select-transitions',
    'ui-checkbox-reverse-transition',
    'ui-checkbox-reverse-direction',
    'ui-checkbox-highlight',
    'ui-checkbox-events',
    'ui-checkbox-intersection',
    'ui-checkbox-animate-letters',
  ]

  let payload = {
    el: exampleOptions.el,
    autostart: exampleOptions.autostart,
    intersectionStart: exampleOptions.intersectionStart
  }

  console.log(document.getElementById('sentence'));

  for (const id of optionsIds) {
    const el = document.getElementById(id)
    const prop = el.dataset.type

    if (textProps.includes(prop)) {
      payload[prop] = el.value
    }

    if (dropdownProps.includes(prop)) {
      payload[prop] = el.value
    }

    if (checkboxProps.includes(prop)) {
      if (el.checked) {
        payload[prop] = exampleOptions[prop]

        if (prop === 'intersectionOptions') {
          payload.intersectionStart = true
        }
      }
    }

    opts = payload
  }
}

const _initExample = () => {
  _updateOptionsPayload()
  _prepareSentence()
  _appendCode()

  try {
    const mw = new Movinwords(opts)
    mw.start()
  } catch (error) {
    throw error
  }
}

window.addEventListener('DOMContentLoaded', () => {
  _createOptionsUI(exampleOptions)
  _prepareOptionsEvents()
  _initExample()
})
