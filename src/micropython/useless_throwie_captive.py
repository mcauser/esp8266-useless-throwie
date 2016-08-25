# This is incomplete and only partially works

try:
	import usocket as socket
except:
	import socket

class DNSQuery:
	def __init__(self, data):
		self.data = data
		self.domain = ''

		kind = (data[2] >> 3) & 15   # Opcode bits
		if kind == 0:                # Standard query
			ini = 12
			lon = data[ini]
			while lon != 0:
				self.domain += data[ini + 1:ini + lon + 1].decode() + '.'
				ini += lon + 1
				lon = data[ini]

	def response(self, ip):
		packet = b''
		if self.domain:
			packet += self.data[:2] + "\x81\x80"
			packet += self.data[4:6] + self.data[4:6] + '\x00\x00\x00\x00'   # Questions and Answers Counts
			packet += self.data[12:]                                         # Original Domain Name Question
			packet += '\xc0\x0c'                                             # Pointer to domain name
			packet += '\x00\x01\x00\x01\x00\x00\x00\x3c\x00\x04'             # Response type, ttl and resource data length -> 4 bytes
			packet += str.join('',map(lambda x: chr(int(x)), ip.split('.'))) # 4bytes of IP
		return packet

def main():
	ip = '192.168.4.1'
	print('pyminifakeDNS:: dom.query. 60 IN A %s' % ip)

	udps = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
	udps.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
	udps.bind(('0.0.0.0', 53))
	print("Listening for UDP DNS requests on port 53")

	s = socket.socket()
	s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
	s.bind(('0.0.0.0', 80))
	s.listen(5)
	print("Listening for TCP HTTP requests on port 80")

	counter = 0
	try:
		while 1:
			# dns request
			data, addr = udps.recvfrom(1024)
			p = DNSQuery(data)
			packet = p.response(ip)
			udps.sendto(packet, addr)
			print('Response: %s -> %s' % (p.domain, ip))

			# http request
			res = s.accept()
			client_s = res[0]
			client_addr = res[1]
			req = client_s.recv(4096)
			print("Request:\n%s\n" % req)
			client_s.send(CONTENT % counter)
			client_s.close()
			counter += 1
			print()
	except KeyboardInterrupt:
		print('Finalise')
		udps.close()

main()
