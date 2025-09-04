#!/usr/bin/env python3
"""
Simple HTTP server for testing San Diego Government Chart visualization
Following SF CivLab approach - simple static file serving
"""

import http.server
import socketserver
import os
import sys

def start_server(port=8000):
    """Start simple HTTP server for development"""
    
    # Change to src directory
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    # Set up handler with CORS headers for local development
    class CORSRequestHandler(http.server.SimpleHTTPRequestHandler):
        def end_headers(self):
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            super().end_headers()
        
        def log_message(self, format, *args):
            # Cleaner logging
            print(f"[{self.address_string()}] {format % args}")
    
    try:
        with socketserver.TCPServer(("", port), CORSRequestHandler) as httpd:
            print(f"San Diego Government Chart Server")
            print(f"Serving at http://localhost:{port}")
            print(f"Press Ctrl+C to stop the server")
            print(f"")
            print(f"🌐 Open http://localhost:{port} in your browser to view the visualization")
            print(f"")
            
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print(f"\n⏹️  Server stopped")
        sys.exit(0)
    except OSError as e:
        if "Address already in use" in str(e):
            print(f"❌ Port {port} is already in use. Try a different port:")
            print(f"   python3 server.py {port + 1}")
        else:
            print(f"❌ Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    port = 8000
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print("Usage: python3 server.py [port]")
            sys.exit(1)
    
    start_server(port)