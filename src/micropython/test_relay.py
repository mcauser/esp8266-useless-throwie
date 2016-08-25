import time
from machine import Pin

relay = Pin(5, Pin.OUT)
led = Pin(2, Pin.OUT)

# the onboard led is actually illuminated when low
relay.high()
led.low()

# flip every second
while(True):
	relay.value(not relay.value())
	led.value(not led.value())
	time.sleep_ms(1000)
