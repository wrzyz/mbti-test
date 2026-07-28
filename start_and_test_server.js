const { spawn, ChildProcess } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Start server as a child process.
const server = new ChildProcess(); // placeholder
const cp = spawn('node', [path.join(__dirname, 'server.js')], {
  stdio: ['pipe', 'pipe', 'pipe']
});

let output = '';
cp.stdout.on('data', (data) => { output += data.toString(); console.log(data.trim()); });
cp.stderr.on('data', (data) => { output += data.toString(); console.error('STDERR:', data.trim()); });

// Wait for server to start (look for LAB_SERVER)
let started = false;
const waitInterval = setInterval(() => {
  if (!started && output.includes('LAB_SERVER')) {
    started = true;
    console.log('\n✓ Server started, waiting a moment for readiness...');
    clearInterval(waitInterval);
    // After a short delay, send HTTP request
    setTimeout(() => {
      const options = {
        hostname: '127.0.0.1',
        port: 8091, // make sure server.js uses 8091, or read from env
        path: '/',
        method: 'GET'
      };

      const req = http.request(options, (res) => {
        console.log('HTTP Status:', res.statusCode);
        let body = '';
        res.on('data', (chunk) => { body += chunk; });
        res.on('end', () => {
          console.log('Response length:', body.length);
          console.log('First 300 chars:', body.substring(0, 300));
          // Shutdown server
          cp.kill();
          console.log('\nTest complete.');
        });
      });

      req.on('error', (e) => {
        console.error('Request error:', e.message);
        cp.kill();
      });

      req.end();
    }, 1000);
  }
}, 100);

// Keep the process alive until test done
// The script will end after server killed.
