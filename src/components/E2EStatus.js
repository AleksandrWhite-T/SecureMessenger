import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import './E2EStatus.css';

function E2EStatus({ compact = false }) {
  const { 
    e2eEnabled, 
    e2eSupported, 
    e2eInitialized,
    publicKey, 
    keyFingerprint, 
    user 
  } = useAuth();
  
  const [showDetails, setShowDetails] = useState(false);

  if (!e2eSupported) {
    return (
      <div className={`e2e-status ${compact ? 'compact' : ''} not-supported`}>
        <span className="status-icon">!</span>
        {!compact && <span>E2E not supported</span>}
      </div>
    );
  }

  if (compact) {
    return (
      <div 
        className="e2e-status compact enabled"
        onClick={() => setShowDetails(!showDetails)}
        title="E2E encryption enabled (always on)"
      >
        <span className="status-icon">OK</span>
        
        {showDetails && (
          <div className="e2e-tooltip">
            <div className="tooltip-content">
              <div className="status-text">Encrypted (E2E)</div>
              {keyFingerprint && (
                <div className="fingerprint">
                  Fingerprint: {keyFingerprint}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="e2e-status full enabled">
      <div className="status-header">
        <span className="status-icon">OK</span>
        <div className="status-info">
          <div className="status-title">
            End-to-End Encryption
          </div>
          <div className="status-text">
            Always enabled - All messages are encrypted
          </div>
        </div>
      </div>

      {e2eEnabled && (
        <div className="encryption-details">
          <div className="detail-row">
            <span className="detail-label">User:</span>
            <span className="detail-value">{user?.name || user?.id}</span>
          </div>
          
          {keyFingerprint && (
            <div className="detail-row">
              <span className="detail-label">Key fingerprint:</span>
              <code className="detail-value fingerprint-code">
                {keyFingerprint}
              </code>
            </div>
          )}
          
          <div className="detail-row">
            <span className="detail-label">Algorithm:</span>
            <span className="detail-value">ECDH P-256 + AES-GCM</span>
          </div>
          
          <div className="encryption-info">
            <div className="info-item">
              <span className="info-icon">🔐</span>
              <span>All messages are encrypted on your device</span>
            </div>
            <div className="info-item">
              <span className="info-icon"></span>
              <span>Only you and the recipient can read messages</span>
            </div>
            <div className="info-item">
              <span className="info-icon"></span>
              <span>Stream cannot read encrypted messages</span>
            </div>
            <div className="info-item">
              <span className="info-icon"></span>
              <span>Message hashes are logged to blockchain for verification</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default E2EStatus;