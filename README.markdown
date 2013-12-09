[Flying Focus](//github.com/NV/flying-focus/)
 · [Focus Snail](//github.com/NV/focus-snail/)
 · [Focus Zoom](//github.com/NV/focus-zoom/)
 · **Focus Hug**

## [focus-hug.js](http://nv.github.io/focus-hug/standalone/focus-hug.js)

To use, just include `<script src="focus-hug.js"></script>` inside either `<head>` or `<body>`.
It includes all necessary CSS and has no external dependencies.

To build from source use `rake standalone`.

### API

Focus Hug exposes `focusHug` global variable.

`focusHug.trigger(element)` manually runs for the specified element.

`focusHug.enabled = true` trigger the effect on focus event.
