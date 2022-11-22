/**
 * @vitest-environment jsdom
 */

import { beforeEach, describe, expect, it, vi } from 'vitest'
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
})

