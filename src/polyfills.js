// Polyfills for Bitcoin libraries
// Purpose: Configure polyfills for browser compatibility
// Related components: index.js, webpack.config.js
// Tags: polyfills, buffer, process, crypto

import { Buffer } from 'buffer';
import process from 'process';

// Make Buffer globally available
window.Buffer = Buffer;

// Make process globally available
window.process = process;

// Configure process environment
if (!window.process.env) {
  window.process.env = {};
}

console.log('✅ Polyfills loaded successfully'); 