import React, { useState } from 'react';
import { useAuth } from './AuthContext';

function TestHashVerification() {
  const { user } = useAuth();
  const [testState, setTestState] = useState('none'); // none, verifying, verified, failed

  if (user?.auth_type !== 'metamask') {
    return null;
  }

  const mockMessage = {
    id: 'test-message-123',
    text: 'Test message for hash verification',
    user: {
      id: 'test-sender',
      name: 'Test Sender',
      wallet_address: '0xTestAddress123...'
    },
    created_at: new Date().toISOString()
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: 'white', 
      border: '1px solid #ccc', 
      padding: '10px',
      borderRadius: '8px',
      zIndex: 1000,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h4>Test Hash Verification</h4>
      <button onClick={() => setTestState('verifying')}>Test Verifying</button>
      <button onClick={() => setTestState('verified')}>Test Verified</button>
      <button onClick={() => setTestState('failed')}>Test Failed</button>
      <button onClick={() => setTestState('none')}>Hide</button>
      
      {testState !== 'none' && (
        <div className="verified-message-wrapper" style={{ marginTop: '10px', border: '1px solid #eee', padding: '10px' }}>
          <div className="hash-verification-status">
            {testState === 'verifying' && (
              <div className="hash-verifying">
                <span className="verifying-icon">🔍</span>
                <span className="verifying-text">Checking hash...</span>
              </div>
            )}
            {testState === 'verified' && (
              <div className="hash-verified">
                <span className="metamask-icon"></span>
                <span className="verified-text">Verified by smart contract</span>
              </div>
            )}
            {testState === 'failed' && (
              <div className="hash-not-verified">
                <span className="not-verified-icon"></span>
                <span className="not-verified-text">Verification failed</span>
              </div>
            )}
          </div>
          <div style={{ padding: '8px', background: '#f5f5f5', borderRadius: '4px' }}>
            Test message: "{mockMessage.text}"
          </div>
        </div>
      )}
    </div>
  );
}

export default TestHashVerification;