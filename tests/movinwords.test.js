/**
 * @vitest-environment jsdom
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { JSDOM } from 'jsdom'
import Movinwords from '../src/movinwords'

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

describe('Movinwords', () => {
  describe('Initialization', () => {
    it('should return a Movinwords instance', () => {
      const mw = new Movinwords({
        el: '.my-sentence',
        sentence: 'Hello world'
      })

      expect(mw)
        .toBeTypeOf('object')
        .toHaveProperty('_options')
    })

    it('should throw an error when no options payload is provided', () => {
      const rs = () => new Movinwords()
      expect(rs).toThrow()
    })
  })

  describe('Autostart', () => {
    let startMock

    beforeEach(() => {
      startMock = vi
        .spyOn(Movinwords.prototype, 'start')
        .mockImplementation(() => console.log('Start Method Called'))
      startMock.mockClear()

    })

    afterEach(() => {
      vi.restoreAllMocks()
    })

    it('should autostart when the autostart option is NOT provided', () => {
      new Movinwords({
        el: '.my-sentence',
        sentence: 'Hello world'
      })

      expect(startMock).toBeCalled()
    })

    it('should NOT autostart when the autostart option is provided and false', () => {
      new Movinwords({
        el: '.my-sentence',
        sentence: 'Hello world',
        autostart: false
      })

      expect(startMock).not.toBeCalled()
    })
  })

  describe('Event Callbacks', () => {
    it('should NOT have event callbacks defined if none are provided', () => {
      const mw = new Movinwords({
        el: '.my-sentence',
        sentence: 'Hello world'
      })

      expect(mw._options.events).toMatchObject({})
      expect(mw._events).toMatchObject({})
    })

    it('should have all available event callbacks defined', () => {
      const mw = new Movinwords({
        el: '.my-sentence',
        sentence: 'Hello world',
        events: {
          start: () => console.log('Start callback triggered'),
          end: () => console.log('End callback triggered'),
          pause: () => console.log('Pause callback triggered'),
          resume: () => console.log('Resume callback triggered'),
          destroy: () => console.log('Destroy callback triggered'),
          wordTransitionStart: () => console.log('WordTransitionStart callback triggered'),
          wordTransitionEnd: () => console.log('WordTransitionEnd callback triggered'),
          scrambleStart: () => console.log('ScrambleStart callback triggered'),
          scrambleEnd: () => console.log('ScrambleEnd callback triggered'),
          letterScrambleStart: () => console.log('letterScrambleStart callback triggered'),
          letterScrambling: () => console.log('letterScrambling callback triggered'),
          letterScrambleEnd: () => console.log('letterScrambleEnd callback triggered')
        }
      })

      expect(mw._options.events.start).toBeDefined()
      expect(mw._options.events.end).toBeDefined()
      expect(mw._options.events.pause).toBeDefined()
      expect(mw._options.events.resume).toBeDefined()
      expect(mw._options.events.destroy).toBeDefined()
      expect(mw._options.events.wordTransitionStart).toBeDefined()
      expect(mw._options.events.wordTransitionEnd).toBeDefined()
      expect(mw._options.events.scrambleStart).toBeDefined()
      expect(mw._options.events.scrambleEnd).toBeDefined()
      expect(mw._options.events.letterScrambleStart).toBeDefined()
      expect(mw._options.events.letterScrambling).toBeDefined()
      expect(mw._options.events.letterScrambleEnd).toBeDefined()
    })

    it('should reject event callbacks other than the Movinwords ones', () => {
      const mw = new Movinwords({
        el: '.my-sentence',
        sentence: 'Hello world',
        events: {
          wrongEventCb: () => console.log('Wrong callback triggered')
        }
      })

      expect(mw._events).toMatchObject({});
    })

    it('should trigger all the event callbacks', () => {
      const mw = new Movinwords({
        el: '.my-sentence',
        sentence: 'Hello world',
        events: {
          start: () => ('Start callback triggered'),
          end: () => ('End callback triggered'),
          pause: () => ('Pause callback triggered'),
          resume: () => ('Resume callback triggered'),
          destroy: () => ('Destroy callback triggered'),
          wordTransitionStart: () => ('WordTransitionStart callback triggered'),
          wordTransitionEnd: () => ('WordTransitionEnd callback triggered'),
          scrambleStart: () => ('scrambleStart callback triggered'),
          scrambleEnd: () => ('scrambleEnd callback triggered'),
          letterScrambleStart: () => ('letterScrambleStart callback triggered'),
          letterScrambling: () => ('letterScrambling callback triggered'),
          letterScrambleEnd: () => ('letterScrambleEnd callback triggered'),
        }
      })

      expect(mw._options.events.start()).toBe('Start callback triggered')
      expect(mw._options.events.end()).toBe('End callback triggered')
      expect(mw._options.events.pause()).toBe('Pause callback triggered')
      expect(mw._options.events.resume()).toBe('Resume callback triggered')
      expect(mw._options.events.destroy()).toBe('Destroy callback triggered')
      expect(mw._options.events.wordTransitionStart()).toBe('WordTransitionStart callback triggered')
      expect(mw._options.events.wordTransitionEnd()).toBe('WordTransitionEnd callback triggered')
      expect(mw._options.events.scrambleStart()).toBe('scrambleStart callback triggered')
      expect(mw._options.events.scrambleEnd()).toBe('scrambleEnd callback triggered')
      expect(mw._options.events.letterScrambleStart()).toBe('letterScrambleStart callback triggered')
      expect(mw._options.events.letterScrambling()).toBe('letterScrambling callback triggered')
      expect(mw._options.events.letterScrambleEnd()).toBe('letterScrambleEnd callback triggered')
    })
  })

  describe('Pause', () => {
    beforeEach(() => {
      const dom = new JSDOM(`<!doctype html>
        <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body>
            <div class="my-sentence">Hello lovely world!</div>
          </body>
        </html>`)

      global.window = dom.window
      global.document = dom.window.document
    })

    afterEach(() => {
      global.window = undefined
      global.document = undefined
    })

    it('should pause the animation when the pause method is called', () => {
      const mw = new Movinwords({
        el: '.my-sentence',
      })

      expect(mw._paused).toBe(false)
      mw.pause()
      expect(mw._paused).toBe(true)
    })

    it('should resume the animation when the resume method is called', () => {
      const mw = new Movinwords({
        el: '.my-sentence',
      })

      expect(mw._paused).toBe(false)
      mw.pause()
      expect(mw._paused).toBe(true)

      mw.resume()
      expect(mw._paused).toBe(false)
    })
  })

  describe('Destroy', () => {
    beforeEach(() => {
      const dom = new JSDOM(`<!doctype html>
        <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body>
            <div class="my-sentence">Hello lovely world!</div>
          </body>
        </html>`)

      global.window = dom.window
      global.document = dom.window.document
    })

    afterEach(() => {
      global.window = undefined
      global.document = undefined
    })

    it('should emit a destroy event', () => {
      const mockEventCallback = vi.fn()

      const mw = new Movinwords({
        el: '.my-sentence',
        events: {
          destroy: mockEventCallback
        }
      })

      mw.destroy()

      expect(mockEventCallback).toHaveBeenCalledOnce()
    })

    it('should remove all added classes and reset original text', () => {
      const originalText = 'Hello lovely world!'
      const mw = new Movinwords({
        el: '.my-sentence',
        transition: 'fadeIn',
        animateLetters: true
      })

      const sentence = document.querySelector('.my-sentence')
      expect(sentence.getAttribute('data-original-sentence')).toBe(originalText)

      expect(sentence.classList.contains('fadeIn')).toBe(true)
      expect(sentence.classList.contains('mw-al')).toBe(true)

      mw.destroy()

      expect(sentence.classList.contains('fadeIn')).toBe(false)
      expect(sentence.classList.contains('mw-al')).toBe(false)
      expect(sentence.textContent).toBe(originalText)
      expect(sentence.hasAttribute('data-original-sentence')).toBe(false)
    })

    it('should reset the instance properties after destroy', () => {
      const mw = new Movinwords({
        el: '.my-sentence'
      })

      mw.destroy()

      expect(mw._sentences).toBe(null)
      expect(mw._words.length).toBe(0)
      expect(mw._currentLetterIndex).toBe(1)
      expect(mw._letters.length).toBe(0)
      expect(mw._started).toBe(false)
      expect(Object.keys(mw._events).length).toBe(0)
    })

    it('should delete the Movinwords property from the window object', () => {
      const mw = new Movinwords({
        el: '.my-sentence'
      })

      window.Movinwords = mw

      mw.destroy()
      expect(window.Movinwords).toBeUndefined()
    })
  })

  describe('Sentences', () => {
    beforeEach(() => {
      const dom = new JSDOM(`<!doctype html>
        <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body>
            <div class="empty"></div>
            <div class="filled">Hello world</div>
          </body>
        </html>`)

      global.window = dom.window
      global.document = dom.window.document
    })

    afterEach(() => {
      global.window = undefined
      global.document = undefined
    })

    it('should console.error when no sentence exists', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error')
      new Movinwords({ el: '.empty' })

      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('No sentences'))
      consoleErrorSpy.mockRestore()
    })

    it('should set the text alignment of the sentence when textAlignment is true', () => {
      new Movinwords({
        el: '.filled'
      })

      const sentence = document.querySelector('.filled.mw')
      expect(sentence.classList.contains('mw-ta')).toBe(true)
    })
  })

  describe('Words', () => {
    beforeEach(() => {
      const dom = new JSDOM(`<!doctype html>
        <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body>
            <div class="foobar">Hello lovely world!</div>
            <p class="ignore">Some element to be ignored.</p>
            <p class="foobar">I'm Movinwords!</p>
            <p class="injected"></p>
          </body>
        </html>`)

      global.window = dom.window
      global.document = dom.window.document
    })

    afterEach(() => {
      global.window = undefined
      global.document = undefined
    })

    it('should return true for the last word in the sentence', () => {
      const mw = new Movinwords({
        el: '.foobar'
      })

      const lastWord = mw._words[mw._words.length - 1]
      const firstWord = mw._words[0]

      expect(mw._isLastWordOfSentence(lastWord)).toBe(true)
      expect(mw._isLastWordOfSentence(firstWord)).toBe(false)
    })

    it('should have an array of words matching the amount of given sentences', () => {
      const mw = new Movinwords({
        el: '.foobar'
      })

      expect(mw._sentences).toHaveLength(2)
      expect(mw._words).toHaveLength(2)
    })

    it('should highlight the given words', () => {
      new Movinwords({
        el: '.foobar',
        highlight: {
          classname: 'highlight',
          tag: 'strong',
          words: ['world!', 'Hello', 'Movinwords!']
        }
      })

      const rs = document.querySelectorAll('.foobar .highlight')

      expect(rs).toHaveLength(3)
    })

    it('should not highlight any of the given words', () => {
      const mw = new Movinwords({
        el: '.foobar',
        highlight: {
          classname: 'highlight',
          tag: 'strong',
          words: ['world', 'love', 'Movinwords', 'foobar']
        }
      })

      const rs = document.querySelectorAll('.foobar .highlight')

      expect(rs).toHaveLength(0)
    })

    it('should inject the given sentence if the sentence prop provided', () => {
      new Movinwords({
        el: '.injected',
        sentence: 'injected sentence!'
      })

      const expected = `<span class="mw-w"><span class="mw-l" style="--mw-t: null; --mw-w: 1; --mw-l: 0;">i</span><span class="mw-l" style="--mw-t: null; --mw-w: 1; --mw-l: 1;">n</span><span class="mw-l" style="--mw-t: null; --mw-w: 1; --mw-l: 2;">j</span><span class="mw-l" style="--mw-t: null; --mw-w: 1; --mw-l: 3;">e</span><span class="mw-l" style="--mw-t: null; --mw-w: 1; --mw-l: 4;">c</span><span class="mw-l" style="--mw-t: null; --mw-w: 1; --mw-l: 5;">t</span><span class="mw-l" style="--mw-t: null; --mw-w: 1; --mw-l: 6;">e</span><span class="mw-l" style="--mw-t: null; --mw-w: 1; --mw-l: 7;">d</span></span><span class="mw-w"><span class="mw-l" style="--mw-t: null; --mw-w: 2; --mw-l: 0;">s</span><span class="mw-l" style="--mw-t: null; --mw-w: 2; --mw-l: 1;">e</span><span class="mw-l" style="--mw-t: null; --mw-w: 2; --mw-l: 2;">n</span><span class="mw-l" style="--mw-t: null; --mw-w: 2; --mw-l: 3;">t</span><span class="mw-l" style="--mw-t: null; --mw-w: 2; --mw-l: 4;">e</span><span class="mw-l" style="--mw-t: null; --mw-w: 2; --mw-l: 5;">n</span><span class="mw-l" style="--mw-t: null; --mw-w: 2; --mw-l: 6;">c</span><span class="mw-l" style="--mw-t: null; --mw-w: 2; --mw-l: 7;">e</span><span class="mw-l" style="--mw-t: null; --mw-w: 2; --mw-l: 8;">!</span></span>`

      const rs = document.querySelector('.injected')

      expect(rs.innerHTML).toBe(expected)
    })

    it('should apply the given transition name to the given sentences', () => {
      new Movinwords({
        el: '.foobar',
        transition: 'slideInTop'
      })

      const firstSentence = document.querySelector('.mw')
      const rs = firstSentence.classList.contains('slideInTop')

      expect(rs).toBe(true)
    })

    it('should apply the given offset, delay, word spacing, letter spacing and duration to the given sentences', () => {
      new Movinwords({
        el: '.foobar',
        offset: 40,
        delay: 1200,
        wordSpacing: 50,
        letterSpacing: 100,
        duration: 2000
      })

      const firstSentence = document.querySelector('.mw')
      const styles = window.getComputedStyle(firstSentence)
      const rs1 = styles.getPropertyValue('--mw-offset')
      const rs2 = styles.getPropertyValue('--mw-delay')
      const rs3 = styles.getPropertyValue('--mw-word-spacing')
      const rs4 = styles.getPropertyValue('--mw-letter-spacing')
      const rs5 = styles.getPropertyValue('--mw-duration')

      expect(rs1).toBe('40')
      expect(rs2).toBe('1200ms')
      expect(rs3).toBe('50')
      expect(rs4).toBe('100')
      expect(rs5).toBe('2000ms')
    })

    it('should reverse transition the given sentences', () => {
      new Movinwords({
        el: '.foobar',
        reverseTransition: true
      })

      const rs = document.querySelectorAll('.mw.mw-r')

      expect(rs).toHaveLength(2)
    })

    it('should reverse order the given sentences', () => {
      new Movinwords({
        el: '.foobar',
        reverseOrder: true
      })

      const firstSentence = document.querySelector('.mw')
      const words = firstSentence.querySelectorAll('.mw-w')
      const lastWord = words[words.length - 1]
      const lastWordFirstLetter = lastWord.querySelectorAll('.mw-l')[0]
      const rs = window.getComputedStyle(lastWordFirstLetter).getPropertyValue('--mw-w')

      expect(rs).toBe('0')
    })

    it('should append a numeric index to each letter of a word, in a sequential order, based on the letter position inside that word', () => {
      new Movinwords({
        el: '.foobar'
      })

      const firstSentence = document.querySelector('.mw')
      const words = firstSentence.querySelectorAll('.mw-w')
      const firstWord = words[0]
      const secondWord = words[1]

      const firstWordLetters = firstWord.querySelectorAll('.mw-l')
      const firstWordFirstLetter = firstWordLetters[0]
      const firstWordLastLetter = firstWordLetters[firstWordLetters.length - 1]

      const secondWordLetters = secondWord.querySelectorAll('.mw-l')
      const secondWordFirstLetter = secondWordLetters[0]
      const secondWordLastLetter = secondWordLetters[secondWordLetters.length - 1]

      const firstFirst = window.getComputedStyle(firstWordFirstLetter).getPropertyValue('--mw-l')
      const firstLast = window.getComputedStyle(firstWordLastLetter).getPropertyValue('--mw-l')

      const secondFirst = window.getComputedStyle(secondWordFirstLetter).getPropertyValue('--mw-l')
      const secondLast = window.getComputedStyle(secondWordLastLetter).getPropertyValue('--mw-l')

      expect(Number(firstFirst)).toBe(0)
      expect(Number(firstLast)).toBe(firstWordLetters.length - 1)
      expect(Number(secondFirst)).toBe(0)
      expect(Number(secondLast)).toBe(secondWordLetters.length - 1)
    })
  })

  describe('Letters', () => {
    beforeEach(() => {
      const dom = new JSDOM(`<!doctype html>
        <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body>
            <div class="foobar">Hello lovely world!</div>
            <p class="ignore">Some element to be ignored.</p>
          </body>
        </html>`)

      global.window = dom.window
      global.document = dom.window.document
    })

    afterEach(() => {
      global.window = undefined
      global.document = undefined
    })

    it('should append the animate letter class to the sentences to animate when animateLetters is true', () => {
      new Movinwords({
        el: '.foobar',
        animateLetters: true
      })

      const rs = document.querySelectorAll('.mw.mw-al')

      expect(rs).toHaveLength(1)
    })

    it('should append a numeric index to each letter of a sentence in a sequential order when animateLetters is true', () => {
      const firstSentenceRaw = document.querySelectorAll('.foobar')[0]
      const lettersCount = firstSentenceRaw.textContent.replace(/[^a-zA-Z]/g, '').length

      new Movinwords({
        el: '.foobar',
        animateLetters: true
      })

      const firstSentence = document.querySelector('.mw')
      const words = firstSentence.querySelectorAll('.mw-w')
      const lastWord = words[words.length - 1]
      const lastWordLetters = lastWord.querySelectorAll('.mw-l')
      const lastWordLastLetter = lastWordLetters[lastWordLetters.length - 1]

      const rs = window.getComputedStyle(lastWordLastLetter).getPropertyValue('--mw-l')

      expect(Number(rs)).toBe(lettersCount + 1)
    })

    it('should reverse the letter indexes, if reverseOrder is true', () => {
      new Movinwords({
        el: '.foobar',
        animateLetters: true,
        reverseOrder: true
      })

      const lastLetter = '!'
      const firstSentence = document.querySelector('.mw')
      const words = firstSentence.querySelectorAll('.mw-w')
      const lastWord = words[words.length - 1]
      const lastWordLetters = lastWord.querySelectorAll('.mw-l')
      const lastWordLastLetter = lastWordLetters[lastWordLetters.length - 1]
      const rs = window.getComputedStyle(lastWordLastLetter).getPropertyValue('--mw-l')

      expect(Number(rs)).toBe(0)
      expect(lastWordLastLetter.textContent).toBe(lastLetter)
    })

    it('should add the --mw-t cssvar to each letter if animateLetters is true', () => {
      new Movinwords({
        el: '.foobar',
        animateLetters: true
      })

      const firstSentence = document.querySelector('.mw')
      const words = firstSentence.querySelectorAll('.mw-w')
      const lastWord = words[words.length - 1]
      const lastWordLetters = lastWord.querySelectorAll('.mw-l')
      const lastWordLastLetter = lastWordLetters[lastWordLetters.length - 1]

      const rs = window.getComputedStyle(lastWordLastLetter).getPropertyValue('--mw-t')

      expect(rs).toBeDefined()
    })

    it('should ensure the --mw-t cssvar has value=length of the word, if animateLetters is true', () => {
      new Movinwords({
        el: '.foobar',
        animateLetters: true
      })

      const firstSentence = document.querySelector('.mw')
      const words = firstSentence.querySelectorAll('.mw-w')
      const lastWord = words[words.length - 1]
      const lastWordLetters = lastWord.querySelectorAll('.mw-l')
      const lastWordLastLetter = lastWordLetters[lastWordLetters.length - 1]

      const rs = window.getComputedStyle(lastWordLastLetter).getPropertyValue('--mw-t')

      expect(Number(rs)).toBe(lastWordLetters.length)
    })
  })

  describe('Scrambler', () => {
    let mw
    const options = {
      el: '.foobar',
      scrambleLetters: true,
      scrambleChars: 'ABC123',
      scrambleFPS: 16,
      delay: 100,
      duration: 1000,
      scrambleMode: 'unscramble'
    }

    beforeEach(() => {
      const dom = new JSDOM(`<!doctype html>
        <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body>
            <div class="foobar">Hello lovely world!</div>
            <div class="nosentences"></div>
          </body>
        </html>`)

      global.window = dom.window
      global.document = dom.window.document

      mw = new Movinwords(options)
    })

    afterEach(() => {
      vi.restoreAllMocks()
      global.window = undefined
      global.document = undefined
    })

    it('should do scrambling when scrambleLetters is true', () => {
      const createScrambleSpy = vi.spyOn(mw, '_createScramble')

      mw._parseSentences()

      expect(createScrambleSpy).toHaveBeenCalled()
      createScrambleSpy.mockRestore()
    })

    it('should return a random character from scrambleChars', () => {
      const randomChar = mw._getRandomScrambleCharacter()
      expect(options.scrambleChars).toContain(randomChar)
    })

    it('should scramble the letters when scrambleMode is "scramble"', async () => {
      let lettersStart
      let lettersEnd

      return new Promise((resolve) => {
        new Movinwords({
          ...options,
          sentence: 'ab',
          scrambleMode: 'scramble',
          events: {
            scrambleStart: (options) => {
              lettersStart = options.scrambleInfo.letters
                .map(l => l.textContent)
                .join('')
            },
            scrambleEnd: (options) => {
              lettersEnd = options.scrambleInfo.letters
                .map(l => l.textContent)
                .join('')

              expect(lettersStart).not.toEqual(lettersEnd)
              resolve()
            },
          },
        })
      })
    })

    it('should unscramble the letters when scrambleMode is "unscramble"', async () => {
      let lettersStart
      let lettersEnd

      return new Promise((resolve) => {
        new Movinwords({
          ...options,
          sentence: 'ab',
          scrambleMode: 'unscramble',
          events: {
            scrambleStart: (options) => {
              lettersStart = options.scrambleInfo.letters
                .map(l => l.textContent)
                .join('')
            },
            scrambleEnd: (options) => {
              lettersEnd = options.scrambleInfo.letters
                .map(l => l.textContent)
                .join('')

              expect(lettersStart).toEqual(lettersEnd)
              resolve()
            },
          },
        })
      })
    })
  })
})

