let opts = {}
const activeClass = 'active'
const exampleOptions = {
  el: '.word',
  autostart: false,
  timers: [500, 800, 1000, 2000],
  spacings: [10, 20, 50, 100],
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
  }
}

const _createLabel = (options) => {
  const labelEl = document.createElement('label')
  labelEl.htmlFor = options.for || options.id || ''
  labelEl.className = options.className || ''
  labelEl.innerText = options.label

  return labelEl
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
  const container = document.getElementById('ui-options')

  const durationSelect = _createSelect({
    id: 'ui-select-duration',
    className: 'ui-select-duration',
    values: options.timers,
    dataType: 'duration'
  })
  const delaySelect = _createSelect({
    id: 'ui-select-delay',
    className: 'ui-select-delay',
    values: options.timers,
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
    dataType: 'offset'
  })
  const wordSpacingSelect = _createSelect({
    id: 'ui-select-word-spacing',
    className: 'ui-select-word-spacing',
    values: options.spacings,
    dataType: 'wordSpacing'
  })
  const highlightCheckbox = _createInputCheckbox({
    id: 'ui-checkbox-highlight',
    className: 'ui-checkbox-highlight',
    label: 'Highlight words?',
    dataType: 'highlight'
  })
  const eventsCheckbox = _createInputCheckbox({
    id: 'ui-checkbox-events',
    className: 'ui-checkbox-events',
    label: 'Trigger Events?',
    dataType: 'events',
    checked: true
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
  const offsetContainer = _createContainer({
    el: offsetSelect,
    id: 'offset',
    label: 'Offset',
    for: 'ui-select-offset'
  })
  const highlightContainer = _createContainer({
    el: highlightCheckbox
  })
  const eventsContainer = _createContainer({
    el: eventsCheckbox
  })

  container.appendChild(durationContainer)
  container.appendChild(delayContainer)
  container.appendChild(transitionsContainer)
  container.appendChild(offsetContainer)
  container.appendChild(wordSpacingContainer)
  container.appendChild(highlightContainer)
  container.appendChild(eventsContainer)
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

  _initExample()
}

const _initExample = () => {
  _updateOptionsPayload()
  _prepareSentence()
  _appendCode()

  const mw = new movinwords(opts)
  mw.start()
}

const _appendCode = () => {
  const payload = JSON.stringify(opts, (key, value) => {
    if (typeof value === 'function') {
      return value.toString().replace(/\n+/g, '')
    }

    return value
  }, 4)

  document.getElementById('code').innerText = `
const mw = new movinwords(${payload});

mw.start();
`
}

const _updateOptionsPayload = () => {
  const dropdownProps = ['duration', 'delay', 'transition', 'offset', 'wordSpacing']
  const checkboxProps = ['highlight', 'events']
  const optionsIds = [
    'ui-select-delay',
    'ui-select-duration',
    'ui-select-transitions',
    'ui-select-offset',
    'ui-select-word-spacing',
    'ui-select-transitions',
    'ui-checkbox-highlight',
    'ui-checkbox-events'
  ]

  let payload = {
    el: exampleOptions.el,
    autostart: exampleOptions.autostart
  }

  for (const id of optionsIds) {
    const el = document.getElementById(id)
    const prop = el.dataset.type

    if (dropdownProps.includes(prop)) {
      payload[prop] = el.value
    }

    if (checkboxProps.includes(prop)) {
      if (el.checked) {
        payload[prop] = exampleOptions[prop]
      }
    }

    opts = payload
  }
}

window.addEventListener('load', () => {
  _createOptionsUI(exampleOptions)
  _prepareOptionsEvents()
})
