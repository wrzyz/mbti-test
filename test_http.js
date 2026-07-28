const http = require('http');

const options = {
  hostname: '127.0.0.1',
  port: 8091,
  path: '/',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log('Status:', res.statusCode);
  console.log('Headers:', res.headers);
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('Response length:', data.length);
    console.log('First 200 chars:', data.substring(0, 200));
  });
});

req.on('error', (e) => {
  console.error('Request error:', e.message);
});

req.end();
