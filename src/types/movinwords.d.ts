type MwCSSProperties = 'transform' | 'opacity'

type MwScrambleMode = 'scramble' | 'unscramble'

export interface MwIntersectionObserverProperties {
  root?: Element | null
  rootMargin?: string
  threshold?: number
}

export interface MwEventListeners {
  [key: string]: Record<string, Function> | { listeners: Function[] }
}

export type MwTextAlignment = 'left' | 'right' | 'center' | 'start' | 'end' | 'inherit' | 'initial'

export type MwTransition = 'fadeIn' | 'slideInTop' | 'slideInBottom' | 'slideInLeft' | 'slideInRight' | 'revealInTop' | 'revealInBottom'

export type MwEventName = 'start' | 'end' | 'pause' | 'resume' | 'intersect' | 'destroy' | 'wordTransitionStart' | 'wordTransitionEnd' | 'letterTransitionStart' | 'letterTransitionEnd' | 'scrambleStart' | 'scrambleEnd' | 'letterScrambleStart' | 'letterScrambling' | 'letterScrambleEnd'

export type MwClassNames = {
  _visible: string
  base: string
  word: string
  letter: string
  reverse: string
  textAlignment: string
  animateLetters: string
}

export interface MwHighlightOptions {
  classname: string
  tag: string
  words: string[]
}

export interface MwOptions {
  el: string
  sentence?: string
  initialDelay?: number
  autostart: boolean
  duration: number
  delay: number
  offset: number
  animateLetters: boolean
  reverseTransition: boolean
  reverseOrder: boolean
  pausableProps: MwCSSProperties[]
  transition: MwTransition
  textAlignment: MwTextAlignment
  wordSpacing: number | null
  letterSpacing: number | null
  highlight: MwHighlightOptions
  events: MwEventListeners
  eventsTransitionProperty: string
  intersectionStart: boolean
  intersectionOptions: MwIntersectionObserverProperties
  scrambleLetters: boolean
  scrambleMode: MwScrambleMode
  scrambleChars: string
  scrambleFPS: number
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
