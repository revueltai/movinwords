![movinwords](https://a.storyblok.com/f/99692/378x134/92e66ed413/logo.gif)

# Movinwords
A plugin to animate sentences, words and letters in many ways.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/revueltai/movinwords/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/movinwords)](https://img.shields.io/npm/v/movinwords)

## Playground

Check out the playground [here](https://revueltai.github.io/movinwords/).

## Installation

```sh
npm install movinwords
```
or
```sh
yarn add movinwords
```

## Basic Usage

#### HTML
```html
<!-- Get Movinwords to animate a given sentence -->
<h1 class="my-sentence">I am an animated sentence.</h1>

<!-- Or you can provide the sentence dynamically (see below) -->
<h1 class="my-injected-sentence"></h1>
```

#### JS & CSS

##### With a bundler
```js
import Movinwords from 'movinwords';
import 'movinwords/movinwords.css';

const sentence = new Movinwords({
  el: '.my-sentence'
});

const injectedSentence = new Movinwords({
  el: '.my-injected-sentence',
  sentence: 'Hello world, I am a sentence!'
});
```

##### From a CDN
```html
<link rel="stylesheet" href="https://unpkg.com/movinwords/dist/movinwords.css">
<script src="https://unpkg.com/movinwords/dist/movinwords.min.js"></script>

<script>
  (function () {
    const sentence = new Movinwords({
      el: '.my-sentence'
    });

    const injectedSentence = new Movinwords({
      el: '.my-injected-sentence',
      sentence: 'Hello world, I am a sentence!'
    });
  })();
</script>
```

## Instance Options
| Option                  | Type      | Default                | Description                                                                                                                                                                                                                                                                                        |
| ----------------------- | --------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `el`                    | `string`  | `null`             | **Required:** Sentence container element.
| `sentence`              | `string`  | `''`               | Sentence you want to inject dynamically.
| `initialDelay`          | `number`  | `1000`             | Initial delay of Movinword's start. ([See Offset](#initial-delay))
| `duration`              | `number`  | `1000`             | Duration of the animation in milliseconds.
| `delay`                 | `number`  | `100`              | Delay of the animation in milliseconds.
| `offset`                | `number`  | `20`               | Offset value to use on slide/reveal transitions ([See Offset](#offset)).
| `reverseTransition`     | `boolean` | `false`            | Reverses the transition animation ([See Reverse Transition](#reverse-transition)).
| `reverseOrder`          | `boolean` | `false`            | Reverses the word's appearance order ([See Reverse Order](#reverse-order)).
| `animateLetters`        | `boolean` | `false`            | Animates the individual letters of a sentence ([See Animate Letters](#animate-letters)).
| `autostart`             | `boolean` | `true`             | Starts or stop the animation of the words on instance creation ([See Autostart](#autostart)).
| `transition`            | `MwTransition`  | `fadeIn`           | Name of the css transition to use ([See Transitions](#transitions)).
| `pausableProps`         | `MwCSSProperties[]`  | `['opacity','transform']` | Name of the css properties to be paused when pause is triggered ([See Pause](#pause)).
| `wordSpacing`           | `number`  | `null`             | Space gap between each word. ([See Word Spacing](#word-spacing))
| `letterSpacing`         | `number`  | `null`             | Space gap between each letter. ([See Letter Spacing](#letter-spacing))
| `highlight`             | `MwHighlightOptions`  | ```{ classname: 'highlight', tag: 'strong', words: [] }```      | Object specifying which words should be highlighted and how ([See Highlight](#highlight)).
| `textAlignment`                | `MwTextAlignment`  | `initial`               | Alignment of the texts inside sentences ([See Text Alignment](#text-alignment))
| `events`                | `MwEventListeners`  | `{}`      | Object specifying callback functions for firing events ([See Events](#events)).
| `eventsTransitionProperty` | `string`  | `opacity`      | Name of the transition property to be used to control transition events ([See Events and Transitions](#events-and-transitions)).
| `scrambleLetters` | `boolean`  | `false`      | Scrambles or Unscrambles the letters in the sentence ([See Scramble Letters](#scramble-letters)).
| `scrambleMode` | `MwScrambleMode`  | `unscramble`      | Modes that the scrambler can take ([See Scramble Letters](#scramble-letters)).
| `scrambleChars` | `string`  | `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`      | Characters to show while scrambling ([See Scramble Letters](#scramble-letters)).
| `scrambleFPS` | `number`  | `16`      | Speed of the scramble animation ([See Scramble Letters](#scramble-letters)).
| `intersectionStart`     | `boolean` | `false`            | Starts the animation when the element intersects the viewport ([See Viewport Intersection](#viewport-intersection)).
| `intersectionOptions`   | `MwIntersectionObserverProperties`  | ```{ root: null, threshold: 0, rootMargin: '0px' }```      | Object specifying the intersection properties ([See Viewport Intersection](#viewport-intersection)).

## Methods
| Method | Description |
|--|--|
| `start` | Starts the animation ([See Autostart](#autostart)).|
| `pause` | Pauses the animation ([See Pause](#pause)).|
| `resume` | Resumes the animation ([See Resume](#resume)).|
| `destroy` | Destroys the current Movinwords Instance ([See Destroy](#destroy)).|

## Events
You can register events callbacks to be fired at different points of Movinword's lifecycle.
```js
const mw = new Movinwords({
  el: '.my-sentence',
  events: {
    start: (options) => {
      console.log('Started!', options)
    },
    wordTransitionStart: (options) => {
      console.log('Word Transition Started', options)
    },
    wordTransitionEnd: (options) => {
      console.log('Word Transition Ended', options)
    },
    end: (options) => {
      console.log('Ended!', options)
    },
    destroy: (options) => {
      console.log('Instance destroyed!', options)
    }
  }
})
```

| Event Name | Description |
|--|--|
| `start` | Fires on Start of Movinwords |
| `end` | Fires on End of Movinwords |
| `pause` | Fires on Pause of Movinwords |
| `resume` | Fires on Resume of Movinwords |
| `destroy` | Fires on Movinwords instance destroy |
| `wordTransitionStart` | Fires when a word transition starts |
| `wordTransitionEnd` | Fires when a word transition ends |
| `scrambleStart` | Fires when the letters scrambler starts |
| `scrambleEnd` | Fires when the letters scrambler ends |
| `letterScrambleStart` | Fires when a letter scrambling starts |
| `letterScrambling` | Fires when a letter scrambles |
| `letterScrambleEnd` | Fires when a letter scrambling ends |

#### Events and Transitions:
`wordTransitionStart` and `wordTransitionEnd` use Javascript's `transitionstart` and `transitionend` events under the hood to know when they need to fire. These last two fire for each CSS transition property declared (e.g: If a CSS transition uses opacity and transform, the events will fire twice).

To avoid this issue we have exposed the `eventsTransitionProperty` property.
It expects the CSS transition name you want to use as 'filter' to focus on and exclude all other props:
```css
.mw.slideInBottom .mw-l {
  opacity: 0;
  transition-property: opacity, transform;
```
```js
const mw = new Movinwords({
  el: '.my-sentence',
  transition: 'slideInBottom',
  events: { [YOUR EVENT CALLBACKS ] },
  eventsTransitionProperty: 'opacity' // Movinwords will focus on the opacity prop and ignore the transform one.
})
```

## Autostart
By default Movinwords will start as soon as you create the instance.
But you can override this action and trigger the start action manually by passing `autostart: false` in the instance options, and using the `start()` method:
```js
const mw = new Movinwords({
  el: '.my-sentence',
  autostart: false
})

// Triggers start after 2 seconds.
setTimeout(() => mw.start(), 2000)
```

## Pause
To pause an animation you can call the `pause()` method:
```js
const mw = new Movinwords({
  el: '.my-sentence',
  autostart: false
})

mw.start() // Triggers start

setTimeout(() => mw.pause(), 2000) // Triggers a pause after 2 seconds
```

Internally Movinwords will pause those css properties provided in `pausableProps`.
By default, all transitions shipped with Movinwords target the *opacity* and *transform* css properties.

If you create custom [transitions](#transitions) which target other css properties, be sure to provide them through `pausableProps`.

```js
const mw = new Movinwords({
  el: '.my-sentence',
  autostart: false,
  transition: 'customTransition',
  pausableProps: ['backgroundColor'] // Will pause the background-color property defined in 'customTransition' when pause() is triggered
})

mw.start()
setTimeout(() => mw.pause(), 2000)
```

## Resume
To resume (unpause) the animation you need to call the `resume()` method:
```js
const mw = new Movinwords({
  el: '.my-sentence',
  autostart: false
})

mw.start() // Triggers start

setTimeout(() => mw.pause(), 2000) // Triggers a pause after 2 seconds
setTimeout(() => mw.resume(), 4000) // Resumes the animation after 4 seconds
```

## Destroy
To destroy a Movinwords instance (including events, classes, etc) you need to call the `destroy()` method:
```js
const mw = new Movinwords({
  el: '.my-sentence',
  autostart: false
})

mw.start() // Triggers start
setTimeout(() => mw.destroy(), 2000) // Triggers the destroy after 2 seconds
```

Note: After destroy finishes each original sentence (or the injected ones) will be placed in their respective container element.

## Initial Delay
You can delay the start of a Movinwords instance by setting `initialDelay`.
```js
const mw = new Movinwords({
  el: '.my-sentence',
  initialDelay: 2000 // Delays the start of Movinwords by 2 seconds.
})
```

This is similar to doing:
```js
const mw = new Movinwords({
  el: '.my-sentence',
  autostart: false
})

setTimeout(() => mw.start(), 2000) // Delays the start of Movinwords by 2 seconds
```


## Transitions
Movinwords ships with these css transitions to use:

| Name | Effect |
|--|--|
| `fadeIn` | Words fade in |
| `slideInTop`    | Words slide+fade in from top to bottom |
| `slideInBottom` | Words slide+fade in from bottom to top |
| `slideInLeft`   | Words slide+fade in from left to right |
| `slideInRight`  | Words slide+fade in from right to left |
| `revealInTop`   | Words slide+fade in from top to bottom inside a hidden container |
| `revealInBottom`   | Words slide+fade in from bottom to top inside a hidden container |

```js
new Movinwords({
  el: '.my-sentence',
  transition: 'slideInLeft' // Words will slide from the left
})
```

## Offset
You can define an offset value to be used with `slide` and `reveal` animations.
This will tell Movinwords how offsetted the words should be from the baseline anchor point (0px).

```js
new Movinwords({
  el: '.my-sentence',
  transition: 'slideInLeft',
  offset: 50 // Words will be 50px offset from the start (0px) and slide in from left to right
})
```

## Reverse Transition
You can reverse the transition animations.
This will tell Movinwords to execute a reversed version of the transition you have defined.
_Note: this property makes the transition names counterintuitive, as "In" transitions behave like "out" ones._

```js
new Movinwords({
  el: '.my-sentence',
  transition: 'fadeIn',
  reverseTransition: true // Transition "fadeIn" will behave like a "fade out" (from opacity 1, to opacity 0)
})
```

## Reverse Order
You can reverse the order in which the words and/or letters appear/disappear.
This will tell Movinwords to transition the words and/or letters in the opposite order (e.g: Last word of the sentence is the first to transition).

### Reverse Words Order
```html
<h2 class="my-sentence">Hello lovely world!</h2>
```
```js
new Movinwords({
  el: '.my-sentence',
  reverseOrder: true // "world!" will appear first, "lovely" second, "Hello" last (From right to left)
})
```

### Reverse Letters Order
```html
<h2 class="my-sentence">Hello lovely world!</h2>
```
```js
new Movinwords({
  el: '.my-sentence',
  reverseOrder: true, // "!" will appear first, "d" second, "l" third, etc (From right to left)
  animateLetters: true // Enable letters animation
})
```

## Word Spacing
By default Movinwords will calculate the space between words based on the sentence's font size, but you can pass a value of your own to override this action:
```js
new Movinwords({
  el: '.my-sentence',
  wordSpacing: 50 // Will set a 50px space between each word
})
```

## Letter Spacing
You can provide a space between each letter:
```js
new Movinwords({
  el: '.my-sentence',
  letterSpacing: 50 // Will set a 50px space between each letter
})
```

## Text Alignment
You can set the text alignment each sentence will have:
```js
new Movinwords({
  el: '.my-sentence',
  textAlignment: 'left' // Sentences will have their text left aligned
})
```

## Highlight
To highlight words you need to pass a `highlight` object in the instance options:

```html
<h1 class="my-sentence">Hello world! I am an animated sentence.</h1>
```
```js
new Movinwords({
  el: '.my-sentence',
  highlight: {
    classname: 'highlight',
    tag: 'strong',
    words: ['world!', 'am']
  }
})
```

| Options | Type | Default | Description
|--|--|--|--|
| `classname` | `string` | `highlight` | Classname to append to the highlighted word tags
| `tag` | `string` | `strong` | HTML tag we want the word to be wrapped-highlighted in
| `words` | `array` | `[]` | Array containing the words that we want to highlight.

## Viewport Intersection
You can define if you want to trigger Movinwords **only when the element is in the Viewport**.

```js
new Movinwords({
  el: '.my-sentence',
  intersectionStart: true // Movinwords will start when the element enters the viewport
})
```

Movinwords uses [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) behind the scenes.
If you wish to modify the intersection properties you can provide `intersectionOptions` in the options:

```js
new Movinwords({
  el: '.my-sentence',
  intersectionStart: true,
  intersectionOptions: {
    root: null,
    threshold: 0,
    rootMargin: '0px'
  }
})
```

## Animate Letters
By default Movinwords animates the words in a sentence.
If you wish to animate each single letter in a word instead you can set `animateLetters` to `true`.

```html
<h2 class="my-sentence">Hello lovely world!</h2>
```
```js
new Movinwords({
  el: '.my-sentence',
  transition: 'slideInBottom',
  animateLetters: true // Each letter will slide in from the bottom
})
```

## Scramble Letters
You can _Scramble_ or _Unscramble_ the letters in a sentence.

```html
<h2 class="my-sentence">Hello lovely world!</h2>
```
```js
new Movinwords({
  el: '.my-sentence',
  scrambleLetters: true, // Enables the scrambler. By default each letter will be unscrambled from gibberish to the final letter
})
```

You can change the scrambler's mode to _scramble_ the letters:
```js
new Movinwords({
  el: '.my-sentence',
  scrambleLetters: true, // Enables the scrambler
  scrambleMode: 'scramble', // Each letter will scrambled into gibberish
})
```

Set some more scrambling options to achieve different results:

```js
new Movinwords({
  el: '.my-sentence',
  scrambleLetters: true, // Enables the scrambler
  scrambleChars: '123456789', // A custom set of characters to use for the scrambler
  scrambleFPS: 30, // The scrambler's scrambling speed in FPS
})
```

You can also combine the scramble options with other Movinwords options for even more results:

```js
new Movinwords({
  el: '.my-sentence',
  scrambleLetters: true,
  reverseOrder: true, // The scramble will be done in the letter's opposite direction
  animateLetters: true // The letters will have an animation
})
```
