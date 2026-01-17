import React from 'react';
import { showHashVerificationNotification, showNotification } from '../utils/notificationSystem';

function TestHashNotification() {
  const showTestSenderNotification = () => {
    const testMessage = "Hello! This is a test message to check notification functionality.";
    const testHash = "0x1234567890abcdef1234567890abcdef12345678";
    const testTxHash = "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890";
    
    showHashVerificationNotification('sender', testMessage, testHash, testTxHash);
  };

  const showTestRecipientNotification = () => {
    const testMessage = "This message has been successfully verified by the blockchain!";
    const testHash = "0xfedcba0987654321fedcba0987654321fedcba09";
    
    showHashVerificationNotification('recipient', testMessage, testHash, null, { 
      blockNumber: 12345678,
      sender: "0x1234...5678"
    });
  };

  const showTestSimpleNotification = () => {
    showNotification(
      'INFO',
      'Test notification',
      'This is a simple notification to check system functionality.',
      'success'
    );
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h3>Testing hash verification notifications</h3>
      <p>Click the buttons below to show different types of notifications:</p>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
        <button 
          onClick={showTestSenderNotification}
          style={{
            background: 'linear-gradient(135deg, #28a745, #20c997)',
            color: 'white',
            border: 'none',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(40, 167, 69, 0.4)',
            transition: 'all 0.3s ease'
          }}
        >
          Sender notification
        </button>
        
        <button 
          onClick={showTestRecipientNotification}
          style={{
            background: 'linear-gradient(135deg, #17a2b8, #667eea)',
            color: 'white',
            border: 'none',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(23, 162, 184, 0.4)',
            transition: 'all 0.3s ease'
          }}
        >
          Recipient notification
        </button>
        
        <button 
          onClick={showTestSimpleNotification}
          style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            border: 'none',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
            transition: 'all 0.3s ease'
          }}
        >
          Simple notification
        </button>
      </div>
      
      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666', textAlign: 'left' }}>
        <p><strong>Notification types:</strong></p>
        <ul>
          <li><strong>Sender:</strong> Shown when message is successfully recorded in blockchain</li>
          <li><strong>Recipient:</strong> Shown when incoming message is verified</li>
          <li><strong>Simple:</strong> Basic notifications for system messages</li>
        </ul>
        <p>All notifications automatically disappear after 10 seconds or can be closed with X button.</p>
      </div>
    </div>
  );
}

export default TestHashNotification;
