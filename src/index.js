// Bitcoin Message Verification with Webpack Bundling
// Purpose: Main entry point for Bitcoin verification tool
// Related components: HTML template, CSS styling, Bitcoin libraries
// Tags: javascript, bitcoin, verification, webpack, cryptography

// Import polyfills first
import './polyfills.js';

// Import CSS files
import './base.css';
import './verify.css';

// Import Bitcoin libraries
import * as bitcoin from 'bitcoinjs-lib';
import { ec as EC } from 'elliptic';
import * as bs58 from 'bs58';
import * as bech32 from 'bech32';
import { Verifier } from 'bip322-js';

// Custom cursor functionality - DISABLED
class CustomCursor {
  constructor() {
    // Cursor functionality disabled - element removed from HTML
    console.log('Custom cursor disabled - element removed from HTML');
  }

  init() {
    // No initialization needed
  }

  updateCursorPosition(x, y) {
    // No cursor to update
  }
}

// Bitcoin Message Verification Class
class BitcoinVerifier {
  constructor() {
    this.addressInput = document.getElementById('address');
    this.messageInput = document.getElementById('message');
    this.signatureInput = document.getElementById('signature');
    this.verifyBtn = document.getElementById('verifyBtn');
    this.resultContainer = document.getElementById('resultContainer');
    this.resultIcon = document.getElementById('resultIcon');
    this.resultTitle = document.getElementById('resultTitle');
    this.resultDetails = document.getElementById('resultDetails');
    
    // Initialize elliptic curve
    this.ec = new EC('secp256k1');
    
    // Use bitcoinjs-lib's built-in ECPair instead of ECPairFactory
    // This avoids compatibility issues with elliptic.js
    
    this.init();
  }

  init() {
    // Bind event listeners
    this.verifyBtn.addEventListener('click', () => this.verifyMessage());
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'Enter') {
        this.verifyMessage();
      }
    });

    // Initialize time display
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);

    console.log('✅ Bitcoin Verifier initialized with Webpack bundling');
  }

  updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit',
      timeZone: 'UTC'
    });
    document.getElementById('current-time').textContent = timeString + ' UTC';
  }

  async verifyMessage() {
    const address = this.addressInput.value.trim();
    const message = this.messageInput.value.trim();
    const signature = this.signatureInput.value.trim();

    // Validate inputs
    if (!address || !message || !signature) {
      this.showError('Please fill in all fields');
      return;
    }

    this.verifyBtn.disabled = true;
    this.verifyBtn.textContent = '🔍 VERIFYING...';

    try {
      const result = await this.verifySignature(address, message, signature);
      this.showResult(result);
    } catch (error) {
      console.error('Verification error:', error);
      this.showError(`Verification failed: ${error.message}`);
    } finally {
      this.verifyBtn.disabled = false;
      this.verifyBtn.textContent = '🔍 VERIFY SIGNATURE';
    }
  }

  async verifySignature(address, message, signature) {
    // Detect address type
    const addressType = this.detectAddressType(address);
    
    // Decode signature
    const decodedSignature = this.decodeSignature(signature);
    
    // Check if this is a BIP-322 signature
    if (decodedSignature.type === 'bip322') {
      return await this.verifyBIP322Signature(address, message, decodedSignature);
    }
    
    // Create message hash for traditional signatures
    const messageHash = this.createMessageHash(message);
    
    // Verify based on address type
    let isValid = false;

    try {
      switch (addressType) {
        case 'legacy':
          isValid = await this.verifyLegacySignature(messageHash, decodedSignature, address);
          break;
        case 'segwit':
          isValid = await this.verifySegWitSignature(messageHash, decodedSignature, address);
          break;
        case 'taproot':
          isValid = await this.verifyTaprootSignature(messageHash, decodedSignature, address);
          break;
        default:
          throw new Error('Unsupported address type');
      }
    } catch (error) {
      throw new Error(`Signature verification failed: ${error.message}`);
    }

    return {
      isValid,
      addressType,
      address,
      message,
      signature
    };
  }

  async verifyBIP322Signature(address, message, decodedSignature) {
    try {
      // Use the BIP-322 Verifier for proper verification
      const isValid = Verifier.verifySignature(address, message, decodedSignature.signature);
      
      console.log('BIP-322 verification result:', {
        address,
        messageLength: message.length,
        signatureLength: decodedSignature.length,
        isValid
      });
      
      return {
        isValid: isValid,
        addressType: this.detectAddressType(address),
        address,
        message,
        signature: decodedSignature.signature,
        signatureType: 'BIP-322'
      };
    } catch (error) {
      console.error('BIP-322 verification error:', error);
      return {
        isValid: 'bip322_detected',
        addressType: this.detectAddressType(address),
        address,
        message,
        signature: decodedSignature.signature,
        signatureType: 'BIP-322',
        error: error.message
      };
    }
  }

  detectAddressType(address) {
    if (address.startsWith('1')) return 'legacy';
    if (address.startsWith('bc1q')) return 'segwit';
    if (address.startsWith('bc1p')) return 'taproot';
    throw new Error('Invalid Bitcoin address format');
  }

  createMessageHash(message) {
    // Bitcoin message signing format
    const prefix = Buffer.from('\x18Bitcoin Signed Message:\n');
    const messageBuffer = Buffer.from(message, 'utf8');
    const lengthBuffer = Buffer.from([messageBuffer.length]);
    
    const combined = Buffer.concat([prefix, lengthBuffer, messageBuffer]);
    
    // Double SHA256
    const firstHash = bitcoin.crypto.sha256(combined);
    const secondHash = bitcoin.crypto.sha256(firstHash);
    
    return secondHash;
  }

  decodeSignature(signature) {
    try {
      console.log('Decoding signature:', signature.substring(0, 50) + '...');
      
      // Handle traditional signature formats first
      let sigBuffer;
      if (signature.includes('-----BEGIN')) {
        // PEM format
        sigBuffer = this.decodePEMSignature(signature);
      } else {
        // Base64 format
        sigBuffer = Buffer.from(signature, 'base64');
      }
      
      // Try to parse as traditional signature
      try {
        const decoded = bitcoin.script.signature.decode(sigBuffer);
        console.log('Successfully decoded as traditional signature');
        return decoded;
      } catch (error) {
        // If it fails with hashType 102 or other BIP-322 related errors, treat as BIP-322
        if (error.message.includes('Invalid hashType 102') || 
            error.message.includes('Invalid hashType')) {
          console.log('Detected as BIP-322 signature (hashType error)');
          return this.decodeBIP322Signature(signature);
        }
        throw error;
      }
    } catch (error) {
      console.error('Signature decode error:', error);
      throw new Error(`Invalid signature format: ${error.message}`);
    }
  }

  isBIP322Signature(signature) {
    // BIP-322 signatures are typically longer and have a specific structure
    // They often contain additional data beyond just r and s values
    try {
      const decoded = Buffer.from(signature, 'base64');
      
      // Check if it's a BIP-322 signature by trying to decode it as traditional first
      // If it fails with hashType 102, it's likely BIP-322
      try {
        bitcoin.script.signature.decode(decoded);
        // If it succeeds, it's traditional
        return false;
      } catch (error) {
        // If it fails with hashType 102 or other BIP-322 related errors, it's BIP-322
        if (error.message.includes('Invalid hashType 102') || 
            error.message.includes('Invalid hashType') ||
            decoded.length >= 80) {
          return true;
        }
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  decodeBIP322Signature(signature) {
    try {
      const decoded = Buffer.from(signature, 'base64');
      
      // BIP-322 signature structure is more complex
      // For now, we'll return the signature as-is for detection purposes
      // Full BIP-322 parsing would require more sophisticated parsing
      
      console.log('BIP-322 signature detected:', {
        length: decoded.length,
        signature: signature.substring(0, 50) + '...'
      });
      
      return {
        type: 'bip322',
        raw: decoded,
        signature: signature,
        length: decoded.length
      };
    } catch (error) {
      console.error('BIP-322 decode error:', error);
      throw new Error('Invalid BIP-322 signature format');
    }
  }

  decodePEMSignature(pemSignature) {
    // Remove PEM headers and decode base64
    const base64 = pemSignature
      .replace(/-----BEGIN.*-----/, '')
      .replace(/-----END.*-----/, '')
      .replace(/\s/g, '');
    return Buffer.from(base64, 'base64');
  }

  async verifyLegacySignature(messageHash, signature, address) {
    try {
      // Use elliptic.js directly for signature verification
      const r = signature.r;
      const s = signature.s;
      
      // Try both recovery IDs (0 and 1)
      for (let recoveryId = 0; recoveryId < 2; recoveryId++) {
        try {
          const recovered = this.ec.recoverPubKey(messageHash, { r, s }, recoveryId);
          const publicKey = recovered.encodeCompressed();
          
          // Generate address from public key
          const recoveredAddress = bitcoin.payments.p2pkh({ pubkey: publicKey });
          
          if (recoveredAddress.address === address) {
            return true;
          }
        } catch (error) {
          continue;
        }
      }
      
      return false;
    } catch (error) {
      return false;
    }
  }

  async verifySegWitSignature(messageHash, signature, address) {
    try {
      // Use elliptic.js directly for signature verification
      const r = signature.r;
      const s = signature.s;
      
      // Try both recovery IDs (0 and 1)
      for (let recoveryId = 0; recoveryId < 2; recoveryId++) {
        try {
          const recovered = this.ec.recoverPubKey(messageHash, { r, s }, recoveryId);
          const publicKey = recovered.encodeCompressed();
          
          // Generate SegWit address from public key
          const segwitAddress = bitcoin.payments.p2wpkh({ pubkey: publicKey });
          
          if (segwitAddress.address === address) {
            return true;
          }
        } catch (error) {
          continue;
        }
      }
      
      return false;
    } catch (error) {
      return false;
    }
  }

  async verifyTaprootSignature(messageHash, signature, address) {
    try {
      // Use elliptic.js directly for signature verification
      const r = signature.r;
      const s = signature.s;
      
      // Try both recovery IDs (0 and 1)
      for (let recoveryId = 0; recoveryId < 2; recoveryId++) {
        try {
          const recovered = this.ec.recoverPubKey(messageHash, { r, s }, recoveryId);
          const publicKey = recovered.encodeCompressed();
          
          // Generate Taproot address from public key
          const taprootAddress = bitcoin.payments.p2tr({ pubkey: publicKey });
          
          if (taprootAddress.address === address) {
            return true;
          }
        } catch (error) {
          continue;
        }
      }
      
      return false;
    } catch (error) {
      return false;
    }
  }

  showResult(result) {
    this.resultContainer.style.display = 'block';
    
    if (result.isValid === 'bip322_detected') {
      // Special handling for BIP-322 signatures (detection only)
      this.resultContainer.className = 'result-container result-success';
      this.resultIcon.textContent = '🔍';
      this.resultTitle.textContent = 'BIP-322 Signature Detected';
      
      const addressTypeLabel = this.getAddressTypeLabel(result.addressType);
      
      this.resultDetails.innerHTML = `
        <p><strong>Status:</strong> <span style="color: var(--terminal-green);">🔍 BIP-322 DETECTED</span></p>
        <p><strong>Address:</strong> ${result.address} ${addressTypeLabel}</p>
        <p><strong>Address Type:</strong> ${result.addressType.toUpperCase()}</p>
        <p><strong>Signature Type:</strong> <span style="color: var(--primary-green);">BIP-322</span></p>
        <p><strong>Message:</strong> "${result.message}"</p>
        <p><strong>Signature:</strong> ${result.signature.substring(0, 50)}...</p>
        <p style="color: var(--light-gray); margin-top: 15px;">
          <strong>Note:</strong> This is a BIP-322 signature. For full verification, 
          please use Bitcoin Core CLI or specialized BIP-322 tools like Sparrow Wallet.
        </p>
        <p style="color: var(--light-gray); font-size: 12px;">
          Command: <code>bitcoin-cli verifymessage "${result.address}" "${result.signature}" "${result.message}"</code>
        </p>
      `;
    } else if (result.signatureType === 'BIP-322' && result.isValid === true) {
      // Successful BIP-322 verification
      this.resultContainer.className = 'result-container result-success';
      this.resultIcon.textContent = '✓';
      this.resultTitle.textContent = 'BIP-322 Signature Verified Successfully';
      
      const addressTypeLabel = this.getAddressTypeLabel(result.addressType);
      
      this.resultDetails.innerHTML = `
        <p><strong>Status:</strong> <span style="color: var(--terminal-green);">✓ BIP-322 VERIFIED</span></p>
        <p><strong>Address:</strong> ${result.address} ${addressTypeLabel}</p>
        <p><strong>Address Type:</strong> ${result.addressType.toUpperCase()}</p>
        <p><strong>Signature Type:</strong> <span style="color: var(--primary-green);">BIP-322</span></p>
        <p><strong>Message:</strong> "${result.message}"</p>
        <p><strong>Signature:</strong> ${result.signature.substring(0, 50)}...</p>
      `;
    } else if (result.signatureType === 'BIP-322' && result.isValid === false) {
      // Failed BIP-322 verification
      this.resultContainer.className = 'result-container result-error';
      this.resultIcon.textContent = '✗';
      this.resultTitle.textContent = 'BIP-322 Signature Verification Failed';
      
      this.resultDetails.innerHTML = `
        <p><strong>Status:</strong> <span style="color: #ff4444;">✗ BIP-322 INVALID</span></p>
        <p><strong>Address:</strong> ${result.address}</p>
        <p><strong>Message:</strong> "${result.message}"</p>
        <p><strong>Signature Type:</strong> <span style="color: var(--primary-green);">BIP-322</span></p>
        <p>The BIP-322 signature could not be verified for this address and message combination.</p>
      `;
    } else if (result.isValid) {
      this.resultContainer.className = 'result-container result-success';
      this.resultIcon.textContent = '✓';
      this.resultTitle.textContent = 'Signature Verified Successfully';
      
      const addressTypeLabel = this.getAddressTypeLabel(result.addressType);
      
      this.resultDetails.innerHTML = `
        <p><strong>Status:</strong> <span style="color: var(--terminal-green);">✓ VALID</span></p>
        <p><strong>Address:</strong> ${result.address} ${addressTypeLabel}</p>
        <p><strong>Address Type:</strong> ${result.addressType.toUpperCase()}</p>
        <p><strong>Message:</strong> "${result.message}"</p>
        <p><strong>Signature:</strong> ${result.signature.substring(0, 50)}...</p>
      `;
    } else {
      this.resultContainer.className = 'result-container result-error';
      this.resultIcon.textContent = '✗';
      this.resultTitle.textContent = 'Signature Verification Failed';
      
      this.resultDetails.innerHTML = `
        <p><strong>Status:</strong> <span style="color: #ff4444;">✗ INVALID</span></p>
        <p><strong>Address:</strong> ${result.address}</p>
        <p><strong>Message:</strong> "${result.message}"</p>
        <p>The signature could not be verified for this address and message combination.</p>
      `;
    }
  }

  showError(message) {
    this.resultContainer.style.display = 'block';
    this.resultContainer.className = 'result-container result-error';
    this.resultIcon.textContent = '⚠';
    this.resultTitle.textContent = 'Verification Error';
    this.resultDetails.innerHTML = `<p style="color: #ff4444;">${message}</p>`;
  }

  getAddressTypeLabel(type) {
    const labels = {
      legacy: '<span class="address-type legacy">LEGACY</span>',
      segwit: '<span class="address-type segwit">SEGWIT</span>',
      taproot: '<span class="address-type taproot">TAPROOT</span>'
    };
    return labels[type] || '';
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new CustomCursor();
  new BitcoinVerifier();
});

// Export for potential use in other modules
export default BitcoinVerifier; 