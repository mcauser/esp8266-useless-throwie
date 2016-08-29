# ESP8266 Useless Throwie

An ESP8266 configured as an access point with a tiny web server which serves a page displaying a toggle switch, which flips a relay when clicked.

![Demo](https://raw.github.com/mcauser/esp8266-useless-throwie/master/demo.png)

Precompiled [demo.html](https://raw.githubusercontent.com/mcauser/esp8266-useless-throwie/master/demo.html) can be [viewed here](https://mcauser.github.io/esp8266-useless-throwie/index.html) - just the button, finger and audio only.

## Install:

Install [node.js](http://nodejs.org) 5.12.0 or later.

Install [grunt](http://gruntjs.com/) task runner and dev dependencies listed in package.json

```
$ npm install -g grunt-cli
$ npm install
```

## Build:

Run grunt to compile each of the platforms into the `dist/` folder. This executes the default task defined in `Gruntfile.js`.

```
$ grunt
```

### Directories:

* /build - temporary dir used when compiling
* /dist - compiled files dir
* /src - source files dir

## Platform specific instructions:

Further instructions for configuring each device.

* [MicroPython](src/micropython/readme.md)
* [Arduino](src/arduino/readme.md)
* [Web](/src/web/readme.md)

## Development Notes:

### Arduino:

- [ ] web server
- [ ] web server with gzip
- [ ] captive portal
- [ ] is there an ino linter / testing framework?

### MicroPython:

- [x] web server
- [x] web server with gzip
- [ ] add to main.py
- [ ] captive portal
- [ ] websockets for bidirectional toggles
- [ ] multiple client/station bidirectional toggle support
- [ ] pylint
- [ ] precompiled firmware

### Web:

- [ ] css flexbox fallback
- [ ] css autoprefixer
- [ ] css rotate finger on swipe
- [ ] js tests
- [ ] js uglify mangle
- [ ] js touch support
- [ ] js add polyfills for old browsers
- [ ] js check if device can play mp3s
- [ ] js check if offline and skip XMLHttpRequests
- [ ] js cross platform event listeners
- [ ] js finger add rage personality
- [ ] js finger add preempt personality
- [ ] js on resize move finger offscreen
- [ ] grunt add imagemin for png
- [ ] svg reduce decimal places
- [ ] svg on state glow filter does not work in ios chrome
- [ ] svg randomise button led colour
- [ ] svg randomise skin tone
- [ ] svg adjust button shadow using device accelerometers
- [ ] svg switch animate rocker instead of duplicate button and shadow groups
- [ ] add easter eggs for excessive clickers
- [ ] deploy html to paas with MQTT or sockets bridge

### Common:

- [ ] add photos
- [ ] grunt add concurrent
- [ ] grunt add open
- [ ] grunt add connect, watch, livereload
- [ ] MQTT publish
- [ ] swap relay for OLED, char LCD, buzzer, LED, WS2818, etc

## Links:

* [demo](https://mcauser.github.io/esp8266-useless-throwie/index.html)
* [WeMos D1 Mini](http://www.wemos.cc/Products/d1_mini.html)
* [WeMos D1 Mini Relay Shield](http://www.wemos.cc/Products/relay_shield.html)
* [micropython.org](http://micropython.org)
* [node.js](http://nodejs.org)
* [grunt](http://gruntjs.com/)
* [hackaday project](https://hackaday.io/project/13322-esp8266-useless-throwie)

## Credits:

* MicroPython socket web server examples based on [MicroPython examples](https://github.com/micropython/micropython/tree/master/examples/network).
* Python captive portal code based on [Mini Fake DNS server](http://code.activestate.com/recipes/491264-mini-fake-dns-server/).
* [easings.net](http://easings.net/) for the CSS Bezier curves
