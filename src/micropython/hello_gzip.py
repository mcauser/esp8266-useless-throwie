try:
    import usocket as socket
except:
    import socket

okResponse = b"""\
HTTP/1.1 200 OK

%s
"""

badResponse = b"""\
HTTP/1.1 400 Bad Request
Content-Type: text/html; charset=utf-8

<h1>400 Bad Request</h1>
"""

def main():
    headers = b"""\
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Content-Encoding: gzip
Content-Length: %d

"""

    # read the gzipped html
    f = open('hello_world.min.html.gz','rb')
    html = f.read()
    f.close()

    # set the content length
    headers = headers % len(html)

    # create server
    s = socket.socket()
    s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    s.bind(('0.0.0.0', 80))
    s.listen(5)
    print("Listening for http requests on port 80")

    # process requests
    while True:
        client_s, client_addr = s.accept()

        req = client_s.recv(4096)

        print("Request:\n%s\n" % req)

        # grab some variables from request header
        # eg. GET /on HTTP/1.1
        method, path, protocol = req.split(b'\r\n',1)[0].split()

        if path == b'/':
            client_s.send(headers)
            client_s.sendall(html)
        else:
            client_s.send(badResponse)
        client_s.close()

main()
