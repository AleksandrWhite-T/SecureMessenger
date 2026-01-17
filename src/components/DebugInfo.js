import React, { useState } from 'react';
import { useAuth } from './AuthContext';

function DebugInfo({ chatClient, channel }) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');

  const runDiagnostics = async () => {
    let info = 'Stream Chat Diagnostics\n\n';
    
    try {
      info += `Current User:\n`;
      info += `   ID: ${user?.id}\n`;
      info += `   Name: ${user?.name}\n`;
      info += `   Connected: ${chatClient?.user ? 'Yes' : 'No'}\n\n`;
      
      if (channel) {
        info += `Current Channel:\n`;
        info += `   ID: ${channel.id}\n`;
        info += `   Type: ${channel.type}\n`;
        info += `   Members: ${Object.keys(channel.state.members || {}).join(', ')}\n\n`;
      }
      
      info += `Permission Tests:\n`;
      
      try {
        const testChannel = chatClient.channel('messaging', `test-${Date.now()}`, {
          name: 'Test Channel',
          members: [user.id],
        });
        await testChannel.create();
        info += `   OK: Can create channels\n`;
        await testChannel.delete();
      } catch (error) {
        info += `   ERROR: Cannot create channels: ${error.message}\n`;
      }
      
      try {
        const userInfo = await chatClient.queryUsers({ id: user.id });
        info += `   OK: Can query users\n`;
        info += `   Role: ${userInfo.users[0]?.role || 'unknown'}\n`;
      } catch (error) {
        info += `   ERROR: Cannot query users: ${error.message}\n`;
      }
      
    } catch (error) {
      info += `ERROR: Diagnostics failed: ${error.message}\n`;
    }
    
    setDebugInfo(info);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: '#ff6b6b',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          fontSize: '20px',
          cursor: 'pointer',
          zIndex: 1000,
        }}
        title="Debug Stream Chat"
      >
        Debug
      </button>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: 'white',
      border: '2px solid #ddd',
      borderRadius: '8px',
      padding: '20px',
      maxWidth: '400px',
      maxHeight: '500px',
      overflow: 'auto',
      zIndex: 1000,
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h3 style={{ margin: 0 }}>Debug Info</h3>
        <button 
          onClick={() => setIsOpen(false)}
          style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}
        >
          X
        </button>
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <button 
          onClick={runDiagnostics}
          style={{
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Run Diagnostics
        </button>
      </div>
      
      {debugInfo && (
        <pre style={{
          background: '#f5f5f5',
          padding: '10px',
          borderRadius: '4px',
          fontSize: '12px',
          whiteSpace: 'pre-wrap',
          margin: 0,
        }}>
          {debugInfo}
        </pre>
      )}
    </div>
  );
}

export default DebugInfo;