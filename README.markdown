![Focus transition effects](http://n12v.com/keyboard-focus-transition/animation.gif)

## [focus-hug.js](http://n12v.com/keyboard-focus-transition/focus-hug.js)

Totally standalone, includes all necessary CSS and has no external dependencies.

To use, just include `<script src="focus-hug.js"></script>` inside either `<head>` or `<body>`.

To build from source use `rake standalone`.


## API

Focus Hug exposes `focusHug` global variable.

`focusHug.trigger(element)` manually trigger Focus Hug on the specified element.

`focusHug.enabled = true` don't do anything on focus event. Does not affect focusHug.trigger method.
