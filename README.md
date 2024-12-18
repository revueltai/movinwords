![Movinwords Logo](https://a.storyblok.com/f/99692/378x134/92e66ed413/logo.gif)

# Movinwords
Movinwords is a versatile plugin for animating sentences, words, and letters in various creative ways.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/revueltai/movinwords/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/movinwords)](https://img.shields.io/npm/v/movinwords)

## Playground

Explore Movinword's capabilities in the [Playground](https://revueltai.github.io/movinwords/).

## Installation

Install Movinwords using npm or yarn:

```sh
npm install movinwords
# npx movinwords
# pnpm add movinwords
# yarn add movinwords
```

## Basic Usage

#### HTML
```html
<!-- Static animated sentence -->
<h1 class="my-sentence">I am an animated sentence.</h1>
<!-- <h1 id="my-sentence">I am an animated sentence.</h1> -->

<!-- Dynamically provided sentence -->
<h1 class="my-dynamic-sentence"></h1>
<!-- <h1 id="my-dynamic-sentence"></h1> -->
```

### JavaScript & CSS

#### Using a Framework or Bundler
```javascript
import Movinwords from 'movinwords';
import 'movinwords/styles';

const staticSentence = new Movinwords({
  el: '.my-sentence',
});

const dynamicSentence = new Movinwords({
  el: '.my-dynamic-sentence',
  sentence: 'I am a dynamic sentence!',
});
```

##### Using a CDN
```html
<link rel="stylesheet" href="https://unpkg.com/movinwords/dist/movinwords.css">
<script src="https://unpkg.com/movinwords/dist/movinwords.min.js"></script>

<script>
  (function () {
    const sentence = new Movinwords({
      el: '.my-sentence'
    });

    const injectedSentence = new Movinwords({
      el: '.my-dynamic-sentence',
      sentence: 'I am a dynamic sentence!'
    });
  })();
</script>
```

## Options
Customize Movinwords with various configuration options:

| Option                  | Type      | Default                | Description                                                                                                                                         |
|-------------------------|-----------|------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| `el`                    | `string`  | `null`                 | **Required:** The element containing the sentence.                                                                                                  |
| `sentence`              | `string`  | `''`                   | The sentence to animate dynamically.                                                                                                                |
| `initialDelay`          | `number`  | `0`                    | The delay before animation starts, in milliseconds ([See Initial Delay](#initial-delay))                                                            |
| `duration`              | `number`  | `1000`                 | The duration of the animation, in milliseconds.                                                                                                     |
| `delay`                 | `number`  | `100`                  | The delay between word/letter animations, in milliseconds.                                                                                          |
| `offset`                | `number`  | `20`                   | The offset for slide/reveal transitions ([See Offset](#offset)).                                                                                    |
| `reverseTransition`     | `boolean` | `false`                | If true, reverses the animation transition ([See Reverse Transition](#reverse-transition)).                                                                                                        |
| `reverseOrder`          | `boolean` | `false`                | If true, reverses the order of word/letter animations ([See Reverse Order](#reverse-order)).                                                                                             |
| `animateLetters`        | `boolean` | `false`                | If true, animates individual letters ([See Animate Letters](#animate-letters)).                                                                                                              |
| `autostart`             | `boolean` | `true`                 | If true, starts the animation on instance creation ([See Autostart](#autostart)).                                                                                                |
| `transition`            | `MwTransition`  | `fadeIn`         | The transition effect to apply ([See Transitions](#transitions)).                                                                                                                    |
| `pausableProps`         | `MwCSSProperties[]`  | `['opacity', 'transform']` | CSS properties to pause when animation is paused ([See Pause](#pause)).                                                                                                 |
| `wordSpacing`           | `number`  | `null`                 | Custom spacing between words (in pixels) ([See Word Spacing](#word-spacing)).                                                   |
| `letterSpacing`         | `number`  | `null`                 | Custom spacing between letters (in pixels) ([See Letter Spacing](#letter-spacing)).                                                 |
| `highlight`                | `MwHighlightOptions`        | `{ classname: 'highlight', tag: 'strong', words: [] }` | Configuration to highlight specific words.                                                    |
| `textAlignment`            | `MwTextAlignment`           | `initial`                      | The alignment of text inside the sentence (e.g., `left`, `center`, `right`).                    |
| `events`                   | `MwEventListeners`          | `{}`                           | Callbacks for lifecycle events like `start`, `pause`, or `end`.                                 |
| `eventsTransitionProperty` | `string`                    | `opacity`                      | The CSS property used to control transition-related events.                                      |
| `scrambleLetters`          | `boolean`                   | `false`                        | Enables the scrambling or unscrambling of letters in the sentence ([See Scramble Letters](#scramble-letters)).  |
| `scrambleMode`             | `MwScrambleMode`            | `unscramble`                   | The mode for scrambling letters (e.g., `scramble`, `unscramble`) ([See Scramble Letters](#scramble-letters)).  |
| `scrambleChars`            | `string`                    | `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789` | The characters used during the scrambling process ([See Scramble Letters](#scramble-letters)). |
| `scrambleFPS`              | `number`                    | `16`                           | The frames per second for the scrambling animation ([See Scramble Letters](#scramble-letters)). |
| `intersectionStart`     | `boolean` | `false`            | Starts the animation when the element intersects the viewport ([See Viewport Intersection](#viewport-intersection)). |
| `intersectionOptions`      | `MwIntersectionObserverProperties` | `{ root: null, threshold: 0, rootMargin: '0px' }` | Configuration for the viewport intersection behavior ([See Viewport Intersection](#viewport-intersection)). |


## Methods
Movinwords provides methods for additional control:

| Method | Description |
|--|--|
| `start` | Starts the animation ([See Autostart](#autostart)).|
| `pause` | Pauses the animation ([See Pause](#pause)).|
| `resume` | Resumes the animation ([See Resume](#resume)).|
| `destroy` | Destroys the instance and cleans up all associated resources ([See Destroy](#destroy)).|

## Events
Movinwords emits events at key points in its lifecycle.
Use these events to implement custom behavior:

| Event Name            | Description                                             |
|-----------------------|---------------------------------------------------------|
| `start`               | Triggered when the animation starts.                   |
| `end`                 | Triggered when the animation ends.                     |
| `pause`               | Triggered when the animation is paused.                |
| `resume`              | Triggered when the animation is resumed.               |
| `destroy`             | Triggered when the instance is destroyed.              |
| `wordTransitionStart` | Triggered at the start of a word transition.            |
| `wordTransitionEnd`   | Triggered at the end of a word transition.              |
| `scrambleStart`            | Triggered when the letters scrambler starts.                                 |
| `scrambleEnd`              | Triggered when the letters scrambler ends.                                   |
| `letterScrambleStart`      | Triggered when a letter scrambling starts.                                   |
| `letterScrambling`         | Triggered when a letter scrambles.                                           |
| `letterScrambleEnd`        | Triggered when a letter scrambling ends.                                     |

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

#### Events and Transitions:
`wordTransitionStart` and `wordTransitionEnd` use JavaScript's `transitionstart` and `transitionend` events under the hood to determine when they need to fire.
These events are triggered for each CSS transition property declared (e.g., if a CSS transition uses `opacity` and `transform`, the events will fire twice).

To avoid this issue, we have exposed the `eventsTransitionProperty` property.
It expects the CSS transition property name you want to focus on (e.g., `'filter'`) and excludes all other properties:

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
By default, Movinwords will start as soon as you create the instance.

However, you can override this behavior and trigger the start action manually by passing `autostart: false` in the instance options and using the `start()` method:

```js
const mw = new Movinwords({
  el: '.my-sentence',
  autostart: false
})

setTimeout(() => mw.start(), 2000) // Triggers start after 2 seconds.
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

Internally, Movinwords will pause the CSS properties listed in `pausableProps`.
By default, all transitions provided by Movinwords target the *opacity* and *transform* properties.

If you create custom [transitions](#transitions) that target other CSS properties, ensure to include them in `pausableProps`.


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
To resume (unpause) the animation, simply call the `resume()` method:

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
To destroy a Movinwords instance (including events, classes, and other resources), call the `destroy()` method:

```js
const mw = new Movinwords({
  el: '.my-sentence',
  autostart: false
})

mw.start() // Triggers start
setTimeout(() => mw.destroy(), 2000) // Triggers the destroy after 2 seconds
```
**Note:** After `destroy()` completes, each original sentence (or any injected ones) will be restored to their respective container elements.

## Initial Delay
You can delay the start of a Movinwords instance by setting the `initialDelay` property.

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
Movinwords comes with the following CSS transitions for use:

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
You can define an offset value for use with the `slide` and `reveal` animations.
This value determines how far the words should be offset from the baseline anchor point (0px).

```js
new Movinwords({
  el: '.my-sentence',
  transition: 'slideInLeft',
  offset: 50 // Words will be offset by 50px from the start (0px) and slide in from left to right.

})
```

## Reverse Transition
You can reverse the transition animations.
This instructs Movinwords to execute the reversed version of the transition you have defined.

**Note:** This property may make transition names seem counterintuitive, as "In" transitions will behave like "Out" transitions.

```js
new Movinwords({
  el: '.my-sentence',
  transition: 'fadeIn',
  reverseTransition: true // Transition "fadeIn" will behave like a "fade out" (from opacity 1, to opacity 0)
})
```

## Reverse Order
You can reverse the order in which the words and/or letters appear or disappear.
This will instruct Movinwords to transition the words and/or letters in the opposite order (e.g., the last word of the sentence will be the first to transition).

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
By default, Movinwords calculates the space between words based on the sentence's font size.
However, you can provide your own value to override this default behavior:

```js
new Movinwords({
  el: '.my-sentence',
  wordSpacing: 50 // Will set a 50px space between each word
})
```

## Letter Spacing
You can specify the space between each letter:

```js
new Movinwords({
  el: '.my-sentence',
  letterSpacing: 50 // Will set a 50px space between each letter
})
```

## Text Alignment
You can set the text alignment for each sentence:

```js
new Movinwords({
  el: '.my-sentence',
  textAlignment: 'left' // Sentences will have their text left aligned
})
```

## Highlight
To highlight words, pass a `highlight` object in the instance options:

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

| Options    | Type    | Default    | Description                                                            |
|------------|---------|------------|------------------------------------------------------------------------|
| `classname` | `string` | `highlight` | Class name to append to the highlighted word tags                   |
| `tag`      | `string` | `strong`   | HTML tag to wrap the highlighted word                                 |
| `words`    | `array`  | `[]`       | Array containing the words to highlight                               |

## Viewport Intersection
You can define whether you want to trigger Movinwords **only when the element is in the viewport**.

```js
new Movinwords({
  el: '.my-sentence',
  intersectionStart: true // Movinwords will start when the element enters the viewport
})
```

Movinwords uses [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) behind the scenes.
If you wish to modify the intersection properties, you can provide `intersectionOptions` in the instance options:

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
By default, Movinwords animates the words in a sentence.
If you wish to animate each individual letter in a word instead, set `animateLetters` to `true`.

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
You can `scramble` or `unscramble` the letters in a sentence.

```html
<h2 class="my-sentence">Hello lovely world!</h2>
```

```js
new Movinwords({
  el: '.my-sentence',
  scrambleLetters: true, // Enables the scrambler. By default each letter will be unscrambled from gibberish to the final letter
})
```

You can change the scrambler's mode to `scramble` the letters:

```js
new Movinwords({
  el: '.my-sentence',
  scrambleLetters: true, // Enables the scrambler
  scrambleMode: 'scramble', // Each letter will scrambled into gibberish
})
```

Set additional scrambling options to achieve different results:

```js
new Movinwords({
  el: '.my-sentence',
  scrambleLetters: true, // Enables the scrambler
  scrambleChars: '123456789', // A custom set of characters to use for the scrambler
  scrambleFPS: 30, // The scrambler's scrambling speed in FPS
})
```

You can also combine the scramble options with other Movinwords features for even cooler results:

```js
new Movinwords({
  el: '.my-sentence',
  scrambleLetters: true,
  reverseOrder: true, // The scramble will be done in the letter's opposite direction
  animateLetters: true // The letters will have an animation
})
```
