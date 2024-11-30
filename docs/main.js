let opts = {}
let mw = null
let paused = false
const optionsIds = []
const dropdownProps = []
const checkboxProps = []
const sentenceProps = []
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
  fps: [16, 30, 60],
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
    },
    scrambleStart: (options) => {
      console.log('Scramble Started!', options)
    },
    scrambleEnd: (options) => {
      console.log('Scramble Ended!', options)
    },
    letterScrambleStart: (options) => {
      console.log('Letter Scramble Started!', options)
    },
    letterScrambling: (options) => {
      console.log('Letter Scrambling!', options)
    },
    letterScrambleEnd: (options) => {
      console.log('Letter Scramble Ended!', options)
    },
  },
  scrambleLetters: true,
  scrambleMode: 'unscramble',
  scrambleFPS: 16,
  intersectionOptions: {
    root: null,
    threshold: 0,
    rootMargin: '0px'
  }
}
const UIElementsConfig = [
  // Inputs
  {
    type: 'sentence',
    id: 'sentence',
    label: 'Dynamic Sentence',
    el: {
      dataType: 'sentence',
      placeholder: 'Enter sentence to inject'
    }
  },

  // Dropdowns
  {
    type: 'dropdown',
    id: 'selectDuration',
    label: 'Duration (ms)',
    el: {
      dataType: 'duration',
      values: exampleOptions.timers,
      selected: 1000,
    }
  },
  {
    type: 'dropdown',
    id: 'selectDelay',
    label: 'Delay (ms)',
    el: {
      dataType: 'delay',
      values: exampleOptions.timers,
      selected: 500,
    }
  },
  {
    type: 'dropdown',
    id: 'selectTransitions',
    label: 'Transitions',
    el: {
      dataType: 'transition',
      values: exampleOptions.transitions,
      selected: 500,
    }
  },
  {
    type: 'dropdown',
    id: 'selectOffsets',
    label: 'Offset',
    el: {
      dataType: 'offset',
      values: exampleOptions.spacings,
      selected: 10,
    }
  },
  {
    type: 'dropdown',
    id: 'textAlignment',
    label: 'Text Alignment',
    el: {
      dataType: 'textAlignment',
      values: ['left', 'right', 'center', 'start', 'end', 'inherit', 'initial'],
      selected: 'right',
    }
  },
  {
    type: 'dropdown',
    id: 'wordSpacing',
    label: 'Word Spacing',
    el: {
      dataType: 'wordSpacing',
      values: exampleOptions.spacings,
      selected: 10,
    }
  },
  {
    type: 'dropdown',
    id: 'letterSpacing',
    label: 'Letter Spacing',
    el: {
      dataType: 'letterSpacing',
      values: exampleOptions.spacings,
      selected: 0,
    }
  },
  {
    type: 'dropdown',
    id: 'scrambleFPS',
    label: 'Scramble FPS',
    el: {
      dataType: 'scrambleFPS',
      values: [16, 30, 60],
    }
  },

  // Checkboxes
  {
    type: 'checkbox',
    id: 'reverseTransition',
    label: 'Reverse transitions',
    el: {
      dataType: 'reverseTransition'
    }
  },
  {
    type: 'checkbox',
    id: 'reverseOrder',
    label: 'Reverse Order',
    el: {
      dataType: 'reverseOrder'
    }
  },
  {
    type: 'checkbox',
    id: 'reverseDirection',
    label: 'Reverse Direction',
    el: {
      dataType: 'reverseOrder'
    }
  },
  {
    type: 'checkbox',
    id: 'highlight',
    label: 'Highlight words',
    el: {
      dataType: 'highlight'
    }
  },
  {
    type: 'checkbox',
    id: 'animateLetters',
    label: 'Animate Letters',
    el: {
      dataType: 'animateLetters',
      checked: true,
    }
  },
  {
    type: 'checkbox',
    id: 'scrambleLetters',
    label: 'Scramble Letters',
    el: {
      dataType: 'scrambleLetters'
    }
  },
  {
    type: 'checkbox',
    id: 'events',
    label: 'Trigger Events',
    el: {
      dataType: 'events',
      checked: true
    }
  },
  {
    type: 'checkbox',
    id: 'intersectionOptions',
    label: 'Trigger On Intersection',
    el: {
      dataType: 'intersectionOptions',
      checked: true
    }
  },
  {
    type: 'checkbox',
    id: 'pause',
    label: 'Show Pause',
    el: {
      dataType: 'pause',
    }
  },
]

const _createLabel = (options) => {
  const labelEl = document.createElement('label')
  labelEl.htmlFor = options.for || options.id || ''
  labelEl.className = options.htmlFor || ''
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
  inputEl.checked = options.checked || false

  const labelEl = _createLabel(options)
  labelEl.prepend(inputEl)

  return labelEl
}

const _createSelect = (options) => {
  const selectEl = document.createElement('select')
  selectEl.className = options.id || ''
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

const _createOptionsUI = () => {
  const sentences = document.getElementById('texts')
  const dropdowns = document.getElementById('dropdowns')
  const checkboxes = document.getElementById('checkboxes')

  for (const element of UIElementsConfig) {
    switch (element.type) {
      case 'sentence':
        const sentence = _createContainer({
          id: element.id,
          for: element.id,
          label: element.label,
          el: _createInputText(
            {
              id: element.id,
              dataType: element.el.dataType,
              placeholder: element.el.placeholder,
            }),
        })

        sentenceProps.push(element.id)
        sentences.appendChild(sentence)
        break

      case 'dropdown':
        const dropdown = _createContainer({
          id: element.id,
          for: element.id,
          label: element.label,
          el: _createSelect({
            id: element.id,
            dataType: element.el.dataType,
            values: element.el.values,
            selected: element.el.selected,
          })
        })

        dropdownProps.push(element.id)
        dropdowns.appendChild(dropdown)
        break

      case 'checkbox':
        const checkbox = _createContainer({
          id: element.id,
          for: element.id,
          el: _createInputCheckbox({
            id: element.id,
            dataType: element.el.dataType,
            label: element.label,
            checked: element.el.checked
          })
        })

        checkboxProps.push(element.id)
        checkboxes.appendChild(checkbox)
        break
    }

    optionsIds.push(element.id)
  }
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
  const btnRun = document.getElementById('ui-button-cta')
  const btnPause = document.getElementById('ui-button-pause')

  codeBtn.addEventListener('click', (event) => {
    event.target.classList.toggle(activeClass)
    document.getElementById('pre').classList.toggle(activeClass)
  })

  btnRun.addEventListener('click', (event) => {
    event.preventDefault()
    _initExample()
  })

  btnPause.addEventListener('click', (event) => {
    event.preventDefault()
    if (paused) {
      mw.resume()
      btnPause.innerText = 'Pause'
      paused = false
    } else {
      mw.pause()
      btnPause.innerText = 'Resume'
      paused = true
    }
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
  let payload = {
    el: exampleOptions.el,
    autostart: exampleOptions.autostart,
    intersectionStart: exampleOptions.intersectionStart
  }

  document.getElementById('pause').addEventListener('click', () => {
    document.getElementById('ui-button-pause').classList.toggle('visible')
  })

  for (const id of optionsIds) {
    const el = document.getElementById(id)
    const prop = el.dataset.type

    if (sentenceProps.includes(prop)) {
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
    mw = new Movinwords(opts)
    mw.start()

    // setTimeout(() => mw.destroy(), 1000)
  } catch (error) {
    throw error
  }
}

window.addEventListener('DOMContentLoaded', () => {
  _createOptionsUI(exampleOptions)
  _prepareOptionsEvents()
  _initExample()
})
