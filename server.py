#!/usr/bin/env python3
"""
Simple HTTP server for San Diego Government Chart visualization
Serves from project root - both dev and production use same paths
"""

import http.server
import socketserver
import os
import sys
import signal
import threading

def start_server(port=8012):
    """Start simple HTTP server for development from project root"""
    
    # Global server reference for signal handler
    httpd = None
    
    def signal_handler(sig, frame):
        """Handle Ctrl+C properly"""
        print(f"\n⏹️  Shutting down server...")
        if httpd:
            httpd.shutdown()
            httpd.server_close()
        sys.exit(0)
    
    # Register signal handler
    signal.signal(signal.SIGINT, signal_handler)
    if sys.platform == "win32":
        signal.signal(signal.SIGBREAK, signal_handler)  # Windows specific
    
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
        # Use SO_REUSEADDR to avoid "Address already in use" errors
        socketserver.TCPServer.allow_reuse_address = True
        httpd = socketserver.TCPServer(("", port), CORSRequestHandler)
        
        print(f"San Diego Government Chart Development Server")
        print(f"Serving from: {os.getcwd()}")
        print(f"Available at: http://localhost:{port}")
        print(f"")
        print(f"📊 Network View: http://localhost:{port}")
        print(f"🌳 Org Chart: http://localhost:{port}/orgchart.html")
        print(f"📁 Data files: /data/")
        print(f"")
        print(f"Press Ctrl+C to stop (or Ctrl+Break on Windows)")
        print(f"PID: {os.getpid()}")
        
        httpd.serve_forever()
        
    except KeyboardInterrupt:
        print(f"\n⏹️  Development server stopped")
        if httpd:
            httpd.shutdown()
            httpd.server_close()
        sys.exit(0)
    except OSError as e:
        if "Address already in use" in str(e):
            print(f"❌ Port {port} is already in use. Try:")
            print(f"   1. Kill existing process: taskkill /F /PID <pid>")
            print(f"   2. Or use different port: python server.py {port + 1}")
        else:
            print(f"❌ Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    port = 8012
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print("Usage: python3 server.py [port]")
            sys.exit(1)
    
    start_server(port)