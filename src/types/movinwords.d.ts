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

declare class Movinwords {
  private _sentences: NodeListOf<HTMLElement> | null
  private _words: string[]
  private _letters: HTMLElement[]
  private _pausedProps: { [key: string]: any }
  private _currentLetterIndex: number
  private _started: boolean
  private _paused: boolean
  private _events: MwEventListeners
  private _eventNames: MwEventName[]
  private _classNames: MwClassNames
  private _options: MwOptions
  private _letterTransitionStartHandlers: Map<HTMLElement, (event: TransitionEvent) => void>
  private _letterTransitionEndHandlers: Map<HTMLElement, (event: TransitionEvent) => void>
  constructor(opts?: Partial<MwOptions>)
  public start(): void
  public pause(): void
  public resume(): void
  public destroy(): void
  private _registerEvents(): void
  private _handleTransitionStart(event: TransitionEvent, payload: any): void
  private _handleTransitionEnd(event: TransitionEvent, payload: any, word: HTMLElement): void
  private _addEventListeners(word: HTMLElement, letterEl: HTMLElement): void
  private _addEventListener(event: string, callback: Function): boolean | void
  private _emitEvent(event: string, payload?: any): boolean | void
  private _removeLetterEventListeners(letterEl: HTMLElement): void
  private _isAllowedEvent(eventName: MwEventName): boolean
  private _isEmptyArray(arr: any[]): boolean | undefined
  private _isHighlightedWord(word: string): boolean
  private _isLastLetterOfWord(index: number, total: number): boolean
  private _isLastWordOfSentence(wordStr: string): boolean
  private _setCSSVariables(sentence: HTMLElement): void
  private _getWordIndex(index: number, words: NodeListOf<HTMLElement>): number
  private _getSpacing(sentence: HTMLElement, type?: 'word' | 'letter'): number
  private _getWordsArray(sentence: HTMLElement): string[]
  private _getLettersArray(word: HTMLElement): string[]
  private _getRandomScrambleCharacter(): string
  private _getSentences(): void
  private _parseSentences(): void
  private _appendTags(el: HTMLElement, tagsArr: HTMLElement[]): void
  private _scrambleLetter(
    letterEl: HTMLElement,
    letterIndex: number,
    finalLetter: string
  ): void
  private _createTag(options: MwWordTag): HTMLElement
  private _createAndAppendWordTags(sentence: HTMLElement): void
  private _createAndAppendLetterTags(sentence: HTMLElement): void
  private _createWordTags(sentence: HTMLElement): HTMLElement[]
  private _createLetterElement(
    letter: string,
    letters: string[],
    index: number,
    wordIndex: number
  ): HTMLElement
  private _createLetterTags(word: HTMLElement, wordIndex: number): HTMLElement[]
  private _createScramble(): void
  private _triggerStart(): void
  private _triggerStartOnIntersection(): void
}

export default Movinwords
