# ESP8266 Useless Throwie, Arduino IDE version

## Parts:

* [WeMos D1 Mini](http://www.aliexpress.com/store/product/D1-mini-Mini-NodeMcu-4M-bytes-Lua-WIFI-Internet-of-Things-development-board-based-ESP8266/1331105_32529101036.html) $4.00 USD
* [WeMos Relay Shield](http://www.aliexpress.com/store/product/Relay-Shield-for-WeMos-D1-mini-button/1331105_32596395175.html) $2.10 USD

## Configure:

* Open useless_throwie.ino in Arduino IDE
* Set board to WeMos D1 Mini
* Verify and upload
* Reboot

## Run:

* Connect to AP
* Open [192.168.4.1](http://192.168.4.1) in a web browser
* Click the toggle switch
* Watch the relay

## Development Notes:

### useless_throwie

Simple web server that serves the html toggle switch that can flip the relay (GPIO5) and onboard LED (GPIO2) when clicked.
