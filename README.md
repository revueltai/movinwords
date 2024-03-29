![movinwords](https://a.storyblok.com/f/99692/378x134/92e66ed413/logo.gif)

# movinwords
A plugin to animate sentences, words and letters.

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
| `events`                | `MwEventListeners`  | `{}`      | Object specifying callback functions for firing events ([See Events](#events)).
| `eventsTransitionProperty` | `string`  | `opacity`      | Name of the transition property to be used to control transition events ([See Events and Transitions](#events-and-transitions)).
| `intersectionStart`     | `boolean` | `false`            | Starts the animation when the element intersects the viewport ([See Viewport Intersection](#viewport-intersection)).
| `intersectionOptions`   | `MwIntersectionObserverProperties`  | ```{ root: null, threshold: 0, rootMargin: '0px' }```      | Object specifying the intersection properties ([See Viewport Intersection](#viewport-intersection)).

## Methods
| Method | Description |
|--|--|
| `start` | Starts the animation ([See Autostart](#autostart)).|
| `pause` | Pauses the animation ([See Pause](#pause)).|
| `resume` | Resumes the animation ([See Resume](#resume)).|

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
    }
  }
})
```

| Event Name | Description |
|--|--|
| `start` | Fires on Starts of Movinwords |
| `end` | Fires on End of Movinwords |
| `wordTransitionStart` | Fires when a word transition starts |
| `wordTransitionEnd` | Fires when a word transition ends |

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
setTimeout(() => {
  mw.start()
}, 2000)
```

## Pause
To pause an animation you can call the `pause()` method:
```js
const mw = new Movinwords({
  el: '.my-sentence',
  autostart: false
})

// Triggers start.
mw.start()

setTimeout(() => {
  // Triggers a pause after 2 seconds.
  mw.pause()
}, 2000)
```

Internally Movinwords will pause those css properties provided in `pausableProps`.
By default, all transitions shipped with Movinwords target the *opacity* and *transform* css properties.

If you create custom [transitions](#transitions) which target other css properties, be sure to provide them through `pausableProps`.

## Resume
To resume (unpause) the animation you need to call the `resume()` method:
```js
const mw = new Movinwords({
  el: '.my-sentence',
  autostart: false
})

// Triggers start.
mw.start()

setTimeout(() => {
  // Triggers a pause after 2 seconds.
  mw.pause()
}, 2000)

setTimeout(() => {
  // Resumes the animation after 4 seconds.
  mw.resume()
}, 4000)
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
  reverseTransition: true // Transition "fadeIn" will behave like a "fade out" (from opacity 1, to opacity 0).
})
```

## Reverse Order
You can reverse the order in which the words appear/disappear.
This will tell Movinwords to transition the words the opposite order (Last word of the sentence is the first to transition).

```html
<h2 class="my-sentence">Hello lovely world!</h2>
```
```js
new Movinwords({
  el: '.my-sentence',
  reverseOrder: true // "world!" will appear first, "lovely" second, "Hello" last (From right to left).
})
```

## Word Spacing
By default Movinwords will calculate the space between words based on the sentence's font size, but you can pass a value of your own to override this action:
```js
new Movinwords({
  el: '.my-sentence',
  wordSpacing: 50 // Will set a 50px space between each word.
})
```

## Letter Spacing
You can provide a space between each letter:
```js
new Movinwords({
  el: '.my-sentence',
  letterSpacing: 50 // Will set a 50px space between each letter.
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
  intersectionStart: true // Movinwords will start when the element enters the viewport.
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
