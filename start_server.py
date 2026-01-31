import http.server
import socketserver
import socket

def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        local_ip = s.getsockname()[0]
        s.close()
        return local_ip
    except:
        return "127.0.0.1"

PORT = 8000
local_ip = get_local_ip()

class CORSHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

Handler = CORSHTTPRequestHandler
httpd = socketserver.TCPServer(("", PORT), Handler)

print(f"\nServeur lancé sur:")
print(f"➜ Local:   http://localhost:{PORT}")
print(f"➜ Network: http://{local_ip}:{PORT}")
print("\nPour accéder depuis un mobile, utilisez l'adresse Network")
print("Ctrl+C pour arrêter le serveur\n")

httpd.serve_forever()
