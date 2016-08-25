# ESP8266 Useless Throwie, Web version

## Requirements:

* A modern web browser

## Run:

```
$ grunt serve
```

## Development Notes:

A HTML5 page with a SVG toggle switch and SVG finger positioned offscreen.

Clicking the toggle switch triggers a finger animation, using CSS3 transformations, that restores the switch to the off position.

The animation gracefully handles an abort scenario, where the switch has been toggled to the off position before the animation completes.

Each animation is randomised, resulting in a more human-like feel. Top, left, delay and speed are randomised for each of the 3 steps.

Each position of the toggle has a matching MP3 which is played with JavaScript.

CSS, JavaScript, Favicon and MP3s moved inline with base64 to avoid additional http requests.

When the switch is toggled, JavaScript executes an ajax request with the current state. GET /on and GET /off.

Grunt workflow compiles and minifies the Sass into CSS, minifies the JS, minifies the SVG, base64 encodes the Favicon and MP3s, injects Base64 MP3s into the JS, injects inline CSS, JS, SVG and Base64 Favicon into the HTML, minifies the HTML, gzips the HTML and publishes in /dist.
