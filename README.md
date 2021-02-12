# movinwords
Add animation to your words and sentences tags.

## Installation

```sh
npm install movinwords
```

## Usage

#### HTML
```html
<h1 class="my-sentence">I am an animated sentence.</h1>
```

#### CSS
Add the base styles to your CSS file.

[`movinwords.css`]()

#### JS

##### With a bundler
```js
import Movinwords from 'movinwords';

const sentence = new Movinwords({
  el: '.my-sentence'
})
```

##### Or without
```js
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
| `delay`                 | `number`  | `0`                | Delay of the animation in milliseconds.
| `transition`            | `string`  | `slideInTop`       | Name of the transition to use (See Transitions).
| `highlight`             | `object`  | ```{ classname: 'highlight', tag: 'strong', matches: [] }```      | Object specifying which word should be highlighted and how (See Highlight).

## Transitions
Movinwords ships with these transitions to use:

| Name | Effect |
|--|--|
| `fadeIn` | Words fade in |
| `slideInTop` 	  | Words slide+fade in from top to bottom |
| `slideInBottom` | Words slide+fade in from bottom to top |
| `slideInLeft`   | Words slide+fade in from left to right |
| `slideInRight`  | Words slide+fade in from right to left |
| `revealInTop`   | Words slide+fade in from top to bottom inside a hidden container |
| `revealInBottom`   | Words slide+fade in from bottom to top inside a hidden container |


## Highlight
To highlight words you need to pass a `highlight` object as part of the instance payload:

```html
<h1 class="my-sentence">Hello world! I am an animated sentence.</h1>
```
```js
new Movinwords({
  el: '.my-sentence',
  highlight: {
   classname: 'highlight',
   tag: 'strong',
   matches: ['world!', 'am']
  }
})
```

| Options | Type | Default | Description
|--|--|--|--|
| `classname` | `string` | `highlight` | Classname to append to the word html tag
| `tag` | `string` | `strong` | HTML tag we want the word to be wrapped-highlighted in
| `matches` | `array` | `[]` | Array containing the words that we want to highlight.
