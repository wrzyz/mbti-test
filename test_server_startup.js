/**
 * Test server startup quickly and check if it responds.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

// Temporarily modify server.js to set port to 8091 and run a quick test.
// Instead of starting the actual server, we'll just check if server.js loads without syntax errors.
const serverPath = path.join(__dirname, 'server.js');
try {
  // Require the server module? It doesn't export anything, it just starts the server.
  // Instead, we can run it in a child process with short timeout.
  const { spawn } = require('child_process');
  const child = spawn('node', [serverPath], { stdio: ['pipe', 'pipe', 'pipe'] });

  let output = '';
  child.stdout.on('data', (data) => { output += data.toString(); });
  child.stderr.on('data', (data) => { output += data.toString(); });

  child.on('close', (code) => {
    console.log('Server exited with code ' + code);
    console.log('Output snippet: ' + output.substring(0, 500));
    // Check if we saw "LAB_SERVER" message
    if (output.includes('LAB_SERVER')) {
      console.log('✓ Server started successfully (LAB_SERVER message found).');
    } else {
      console.log('✗ No LAB_SERVER message in output.');
    }
  });

  // Give it a moment to start and maybe crash
  setTimeout(() => {
    if (child.killed === false) {
      child.kill();
      console.log('Killed child after timeout.');
    }
  }, 3000);
} catch (err) {
  console.error('Error:', err);
}
