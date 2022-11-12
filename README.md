![movinwords](https://a.storyblok.com/f/99692/378x134/92e66ed413/logo.gif)

# movinwords
A plugin to animate sentences and words.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/revueltai/movinwords/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/movinwords)](https://img.shields.io/npm/v/movinwords)

## Installation

```sh
npm install movinwords
```

## Usage

#### HTML
```html
<h1 class="my-sentence">I am an animated sentence.</h1>
```

#### JS & CSS

##### With a bundler
```js
import 'movinwords/dist/movinwords.css';
import movinwords from 'movinwords';

const sentence = new Movinwords({
  el: '.my-sentence'
});
```

##### Or without
```js
<link rel="stylesheet" href="movinwords.css">
<script src="movinwords.min.js"></script>
<script>
  (function () {
    const sentence = new Movinwords({
      el: '.my-sentence'
    });
  })();
</script>
```

## Instance Options
| Option                  | Type      | Default                | Description                                                                                                                                                                                                                                                                                        |
| ----------------------- | --------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `el`                    | `string`  | `null`             | **Required:** Sentence container element.
| `duration`              | `number`  | `1000`             | Duration of the animation in milliseconds.
| `delay`                 | `number`  | `100`              | Delay of the animation in milliseconds.
| `offset`                | `number`  | `20`               | Offset value to use on slide/reveal transitions ([See Transitions](#transitions)).
| `autostart`             | `boolean` | `true`             | Starts or stop the animation of the words on instance creation ([See Autostart](#autostart)).
| `intersectionStart`     | `boolean` | `false`            | Starts the animation when the element intersects the viewport ([See Viewport Intersection](#viewport-intersection)).
| `transition`            | `string`  | `fadeIn`           | Name of the css transition to use ([See Transitions](#transitions)).
| `wordSpacing`           | `number`  | `null`             | Space gap between each word. ([See Word Spacing](#word-spacing))
| `highlight`             | `object`  | ```{ classname: 'highlight', tag: 'strong', words: [] }```      | Object specifying which words should be highlighted and how ([See Highlight](#highlight)).
| `events`                | `object`  | `{}`      | Object specifying callback functions for firing events ([See Events](#events)).
| `eventsTransitionProperty`                | `string`  | `opacity`      | Name of the transition property to be used to control transition events ([See Events and Transitions](#events-and-transitions)).
| `intersectionOptions`   | `object`  | ```{ root: null, threshold: 0, rootMargin: '0px' }```      | Object specifying the intersection properties ([See Viewport Intersection](#viewport-intersection)).

## Methods
| Method | Description |
|--|--|
| `start` | Starts the animation ([See Autostart](#autostart)).|


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

### Offset
You can define an offset value to be used with `slide` and `reveal` animations.
This will tell Movinwords how offsetted the words should be from the baseline anchor point (0px).

```js
new Movinwords({
  el: '.my-sentence',
  transition: 'slideInLeft',
  offset: 50 // Words will be 50px offset from the start (0px) and slide in from left to right
})
```

## Word Spacing
By default Movinwords will calculate the space between words based on the sentence's font size, but you can pass a value of your own to override this action:
```js
new Movinwords({
  el: '.my-sentence',
  wordSpacing: 50 // Will force a 50px space between each word.
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

## Sandbox
Check out the sandbox [here](https://revueltai.github.io/movinwords/).
