/**
 * Change server port from 8090 to 8091 in server.js.
 * Run: node change_port.js
 */
const fs = require('fs');
const path = require('path');

const serverPath = path.join(__dirname, 'server.js');
let content = fs.readFileSync(serverPath, 'utf8');

// Replace the line containing "8090" with "8091", only for the port assignment.
const newContent = content.replace(/const port = Number\(process\.env\.PORT \|\| 8090\);/, 'const port = Number(process.env.PORT || 8091);');

if (newContent === content) {
  console.log('Port not found or already changed.');
} else {
  fs.writeFileSync(serverPath, newContent, 'utf8');
  console.log('Server port changed to 8091.');
}
