# ESP8266 Useless Throwie, MicroPython version

## Parts:

* [WeMos D1 Mini](http://www.aliexpress.com/store/product/D1-mini-Mini-NodeMcu-4M-bytes-Lua-WIFI-Internet-of-Things-development-board-based-ESP8266/1331105_32529101036.html) $4.00 USD
* [WeMos Relay Shield](http://www.aliexpress.com/store/product/Relay-Shield-for-WeMos-D1-mini-button/1331105_32596395175.html) $2.10 USD

## Configure:

* Set as AP
* Enable webrepl
* Upload files
* Reboot

```
import network
sta_if = network.WLAN(network.STA_IF)
sta_if.active(False)

ap_if = network.WLAN(network.AP_IF)
ap_if.active(True)

import webrepl
webrepl.start()

import os
os.listdir()
```

## Run:

* Open REPL `import useless_throwie`
* Connect to AP
* Open [192.168.4.1](http://192.168.4.1) in a web browser
* Click the toggle switch
* Watch the relay

## Development Notes:

### hello_captive.py

First attempts at a captive portal with DNS spoofing.

Based on [Mini Fake DNS server](http://code.activestate.com/recipes/491264-mini-fake-dns-server/).

### hello_gzip.py

Simple web server that reponds with pre-gzipped html content `dist/web/hello_world.min.html.gz`.

### test_relay.py

Testing the relay and onboard LED.

### useless_throwie.py

Simple web server that serves the html toggle switch that can flip the relay (GPIO5) and onboard LED (GPIO2) when clicked.

Given the gzipped html, `dist/web/useless_throwie.min.html.gz`, is around 8kb, this might only work on ESP8266s with larger flash chips. Without gzip, the minified html is around 15kb.

### useless_throwie_captive.py

Work in progress. Useless throwie combined with a captive portal / DNS spoofing.
