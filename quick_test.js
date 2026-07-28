const { spawn } = require('child_process');
const http = require('http');

// Start server on port 8091
const server = spawn('node', ['server.js'], { stdio: ['pipe', 'pipe', 'pipe'] });

// Wait a bit for server to start
setTimeout(() => {
  const options = { hostname: '127.0.0.1', port: 8091, path: '/', method: 'GET' };
  const req = http.request(options, (res) => {
    console.log('Server responded with status:', res.statusCode);
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      console.log('Response length:', data.length);
      console.log('First 200 chars:', data.substring(0, 200));
      // Kill server
      server.kill();
    });
  });
  req.on('error', (e) => { console.error('Request error:', e.message); server.kill(); });
  req.end();
}, 1500);

// Optional: kill server if it doesn't respond within time
setTimeout(() => { if (server.pid) server.kill(); }, 5000);
