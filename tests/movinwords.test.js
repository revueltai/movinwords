/**
 * @vitest-environment jsdom
 */

import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { JSDOM } from 'jsdom'
import Movinwords from '../package/movinwords'

describe('Movinwords', () => {
  describe('Initialization', () => {
    it('should return a Movinwords instance', () => {
      const mw = new Movinwords({
        el: '.my-sentence'
      })

      expect(mw)
        .toBeTypeOf('object')
        .toHaveProperty('_options')
    })

    it('should throw an error when no options payload is provided', () => {
      const rs = () => {
        const mw = new Movinwords()
      }

      expect(rs).toThrow()
    })
  })

  describe('Autostart', () => {
    const startMock = vi
      .spyOn(Movinwords.prototype, 'start')
      .mockImplementation(() => console.log('Start Method Called'))

    beforeEach(() => {
      startMock.mockClear()
    })

    afterEach(() => {
      vi.restoreAllMocks()
    })

    it('should autostart when the autostart option is NOT provided', () => {
      new Movinwords({
        el: '.my-sentence'
      })

      expect(startMock).toBeCalled()
    })

    it('should autostart when the autostart option is provided and true', () => {
      new Movinwords({
        el: '.my-sentence',
        autostart: true
      })

      expect(startMock).toBeCalled()
    })

    it('should NOT autostart when the autostart option is provided and false', () => {
      new Movinwords({
        el: '.my-sentence',
        autostart: false
      })

      expect(startMock).not.toBeCalled()
    })
  })

  describe('Event Callbacks', () => {
    it('should NOT have event callbacks defined if none are provided', () => {
      const mw = new Movinwords({
        el: '.my-sentence'
      })

      expect(mw._options.events).toMatchObject({})
      expect(mw._events).toMatchObject({})
    })

    it('should have the start, end, wordTransitionStart, wordTransitionEnd event callbacks defined', () => {
      const mw = new Movinwords({
        el: '.my-sentence',
        events: {
          start: () => console.log('Start callback triggered'),
          end: () => console.log('End callback triggered'),
          wordTransitionStart: () => console.log('WordTransitionStart callback triggered'),
          wordTransitionEnd: () => console.log('WordTransitionEnd callback triggered')
        }
      })

      expect(mw._options.events.start).toBeDefined()
      expect(mw._options.events.end).toBeDefined()
      expect(mw._options.events.wordTransitionStart).toBeDefined()
      expect(mw._options.events.wordTransitionEnd).toBeDefined()
    })

    it('should reject event callbacks other than start, end, wordTransitionStart, wordTransitionEnd', () => {
      const mw = new Movinwords({
        el: '.my-sentence',
        events: {
          wrongEventCb: () => console.log('Wrong callback triggered')
        }
      })

      expect(mw._events).toMatchObject({});
    })

    it('should trigger the start, end, wordTransitionStart, wordTransitionEnd event callbacks', () => {
      const mw = new Movinwords({
        el: '.my-sentence',
        events: {
          start: () => ('Start callback triggered'),
          end: () => ('End callback triggered'),
          wordTransitionStart: () => ('WordTransitionStart callback triggered'),
          wordTransitionEnd: () => ('WordTransitionEnd callback triggered')
        }
      })

      expect(mw._options.events.start()).toBe('Start callback triggered')
      expect(mw._options.events.end()).toBe('End callback triggered')
      expect(mw._options.events.wordTransitionStart()).toBe('WordTransitionStart callback triggered')
      expect(mw._options.events.wordTransitionEnd()).toBe('WordTransitionEnd callback triggered')
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
          </body>
        </html>`)

      global.window = dom.window
      global.document = dom.window.document
    })

    it('should have an array of words matching the amount of given sentences', () => {
      const mw = new Movinwords({
        el: '.foobar'
      })

      expect(mw._sentences).toHaveLength(2)
      expect(mw._words).toHaveLength(2)
    })

    it('should highlight the given words', () => {
      const mw = new Movinwords({
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

    it('should apply the given transition name to the given sentences', () => {
      const mw = new Movinwords({
        el: '.foobar',
        transition: 'slideInTop'
      })

      const firstSentence = document.querySelector('.mw')
      const rs = firstSentence.classList.contains('slideInTop')

      expect(rs).toBe(true)
    })

    it('should apply the given offset, delay, word spacing and duration to the given sentences', () => {
      const mw = new Movinwords({
        el: '.foobar',
        offset: 40,
        delay: 1200,
        wordSpacing: 50,
        duration: 2000
      })

      const firstSentence = document.querySelector('.mw')
      const styles = window.getComputedStyle(firstSentence)
      const rs1 = styles.getPropertyValue('--mw-offset')
      const rs2 = styles.getPropertyValue('--mw-delay')
      const rs3 = styles.getPropertyValue('--mw-word-spacing')
      const rs4 = styles.getPropertyValue('--mw-duration')

      expect(rs1).toBe('40')
      expect(rs2).toBe('1200ms')
      expect(rs3).toBe('50')
      expect(rs4).toBe('2000ms')
    })

    it('should reverse transition the given sentences', () => {
      const mw = new Movinwords({
        el: '.foobar',
        reverseTransition: true
      })

      const rs = document.querySelectorAll('.mw.mw-r')

      expect(rs).toHaveLength(2)
    })

    it('should reverse order the given sentences', () => {
      const mw = new Movinwords({
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
  })
})

