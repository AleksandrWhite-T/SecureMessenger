import React from 'react';
import { MessageSimple } from 'stream-chat-react';

function SecureMessage(props) {
  const { message } = props;
  
  // Check if message has secure attributes
  const isSecure = message.secure || message.encrypted || message.type === 'secure';
  const isPrivate = message.private || message.confidential;
  
  return (
    <div className={`custom-message ${isSecure ? 'secure-message' : ''}`}>
      <MessageSimple {...props} />
      
      {isSecure && (
        <div className="secure-indicator">
          Secured
        </div>
      )}
      
      {isPrivate && (
        <div className="private-indicator">
          Private
        </div>
      )}
    </div>
  );
}

export default SecureMessage;