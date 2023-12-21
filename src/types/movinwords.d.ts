export interface MwIntersectionObserverProperties {
  root?: Element | null
  rootMargin?: string
  threshold?: number
}

export interface MwEventListeners {
  [key: string]: Record<string, Function> | { listeners: Function[] }
}

export type MwEventName = 'start' | 'end' | 'wordTransitionStart' | 'wordTransitionEnd' | 'letterTransitionStart' | 'letterTransitionEnd'

export type MwClassNames = {
  base: string
  word: string
  letter: string
  reverse: string
  animateLetters: string
}

export interface MwHighlightOptions {
  classname: string
  tag: string
  words: string[]
}

export interface MwOptions {
  el: string
  autostart: boolean
  duration: number
  delay: number
  offset: number
  animateLetters: boolean
  reverseTransition: boolean
  reverseOrder: boolean
  transition: string
  wordSpacing: number | null
  letterSpacing: number | null
  highlight: MwHighlightOptions
  events: MwEventListeners
  eventsTransitionProperty: string
  intersectionStart: boolean
  intersectionOptions: MwIntersectionObserverProperties
}

export type MwWord = {
  el: string
  text: string
}

export type MwWordTag = {
  tag: string
  className: string
  text: string
  vars: Record<string, undefined | string | number>
}
