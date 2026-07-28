/**
 * Diagnostic script to check server and bank status.
 */
const fs = require('fs');
const path = require('path');

console.log('=== Diagnostic Report ===\n');

// 1. Check bank.json exists and is valid.
const bankPath = path.join(__dirname, 'bank.json');
if (fs.existsSync(bankPath)) {
  const stat = fs.statSync(bankPath);
  console.log('1. bank.json exists, size:', stat.size / (1024*1024).toFixed(2), 'MB');
  try {
    const bank = fs.readFileSync(bankPath, 'utf8');
    const data = JSON.parse(bank);
    if (Array.isArray(data)) {
      console.log('   - Valid JSON array, length:', data.length);
      // Check first row structure
      if (data.length > 0 && Array.isArray(data[0]) && data[0].length >= 10) {
        console.log('   - Row structure ok (array, 10+ fields):', data[0].slice(0,5));
      } else {
        console.log('   - WARNING: Row structure unexpected.');
      }
    } else {
      console.log('   - WARNING: bank.json is not an array.');
    }
  } catch (e) {
    console.log('   - ERROR: Failed to parse bank.json:', e.message);
  }
} else {
  console.log('1. bank.json NOT FOUND');
}

// 2. Check data.js exists and can be loaded.
const dataPath = path.join(__dirname, 'data.js');
if (fs.existsSync(dataPath)) {
  console.log('2. data.js exists');
  try {
    // Use vm to safely evaluate CATEGORIES
    const vm = require('vm');
    const sandbox = { require: require };
    const script = new fs.readFileSync(dataPath, 'utf8');
    vm.createContext(sandbox);
    vm.runInContext(script, sandbox);
    if (Array.isArray(sandbox.CATEGORIES)) {
      console.log('   - CATEGORIES loaded, count:', sandbox.CATEGORIES.length);
      console.log('   - Category IDs:', sandbox.CATEGORIES.map(c => c.id).join(', '));
    } else {
      console.log('   - WARNING: CATEGORIES not an array or not found.');
    }
  } catch (e) {
    console.log('   - ERROR: Failed to load data.js:', e.message);
  }
} else {
  console.log('2. data.js NOT FOUND');
}

// 3. Check app.js has expandOne function.
const appPath = path.join(__dirname, 'app.js');
if (fs.existsSync(appPath)) {
  console.log('3. app.js exists');
  const content = fs.readFileSync(appPath, 'utf8');
  if (content.includes('function expandOne')) {
    console.log('   - expandOne function present');
    // Check if emotionMap exists
    if (content.includes('const emotionMap = {')) {
      console.log('   - emotionMap present');
      // Count entries (simple heuristic)
      const mapMatch = content.match(/const emotionMap = \{([\s\S]*?)\};/);
      if (mapMatch) {
        const entries = (mapMatch[1].match(/".*?":/g) || []).length;
        console.log('   - emotionMap entries (approx):', entries);
      }
    } else {
      console.log('   - WARNING: emotionMap NOT found in app.js');
    }
  } else {
    console.log('   - WARNING: expandOne NOT found');
  }
} else {
  console.log('3. app.js NOT FOUND');
}

// 4. Check server.js syntax.
const serverPath = path.join(__dirname, 'server.js');
if (fs.existsSync(serverPath)) {
  console.log('4. server.js exists');
  try {
    // Just check syntax by requiring in a sandbox (without running server)
    const vm = require('vm');
    const sandbox = { require: require, __dirname: __dirname, __filename: serverPath };
    vm.createContext(sandbox);
    // We'll not run the server, just check it parses.
    const serverCode = fs.readFileSync(serverPath, 'utf8');
    // Extract the port assignment check if it's 8091
    const portMatch = serverCode.match(/const port\s*=\s*Number\(process\.env\.PORT\s*\|\s*(\d+)\)/);
    if (portMatch) {
      console.log('   - Server port:', portMatch[1]);
    }
    // Try to parse as script (without executing server startup)
    vm.runInContext(serverCode, sandbox);
    console.log('   - server.js syntax OK');
  } catch (e) {
    console.log('   - ERROR: server.js syntax error:', e.message);
  }
} else {
  console.log('4. server.js NOT FOUND');
}

console.log('\n=== Diagnostic End ===');
