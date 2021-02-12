
# movinwords
A simple plugin to animate sentences and words.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/revueltai/movinwords/blob/main/LICENSE) [![npm version](https://badge.fury.io/js/movinwords.svg)](https://badge.fury.io/js/movinwords)

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
import 'movinwords/dist/movinwords.min.css';
import movinwords from 'movinwords';

const sentence = new movinwords({
  el: '.my-sentence'
})
```

##### Or without
```js
<link rel="stylesheet" href="movinwords.min.css">
<script src="movinwords.min.js"></script>
<script>
  (function () {
    const sentence = new movinwords({
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
| `delay`                 | `number`  | `0`                | Delay of the animation in milliseconds.
| `transition`            | `string`  | `fadeIn`           | Name of the css transition to use ([See Transitions](#transitions)).
| `wordSpacing`           | `number`  | `null`             | Space gap between each word. ([See Word Spacing](#word-spacing))
| `highlight`             | `object`  | ```{ classname: 'highlight', tag: 'strong', words: [] }```      | Object specifying which word should be highlighted and how ([See Highlight](#highlight)).

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

## Word Spacing
By default Movinwords will calculate the space between words based on the sentence's font size, but you can pass a value of your own to override this action:
```js
new movinwords({
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
new movinwords({
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

## Examples
Check out some examples [here](https://github.com/revueltai/movinwords/tree/main/examples).
