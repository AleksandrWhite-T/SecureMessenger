import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import './LoginForm.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Username is required');
      return;
    }

    setIsLoading(true);
    setError('');

    const result = await login(username, userId);
    
    if (!result.success) {
      setError(result.error || 'Login failed');
    }
    
    setIsLoading(false);
  };

  const handleDemoLogin = async (demoUser) => {
    setIsLoading(true);
    setError('');
    
    const result = await login(demoUser.name, demoUser.id);
    
    if (!result.success) {
      setError(result.error || 'Login failed');
    }
    
    setIsLoading(false);
  };

  const demoUsers = [
    { id: 'aaa', name: 'Test User AAA' },
    { id: 'bbb', name: 'Test User BBB' },
    { id: 'ccc', name: 'Test User CCC' },
    { id: 'alice', name: 'Alice Johnson' },
    { id: 'bob', name: 'Bob Smith' },
    { id: 'charlie', name: 'Charlie Brown' },
  ];

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="login-header">
          <h1>SecureMessenger</h1>
          <p>Enter your details to start chatting</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Display Name</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your display name"
              disabled={isLoading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="userId">User ID (optional)</label>
            <input
              id="userId"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Leave empty for auto-generated ID"
              disabled={isLoading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Connecting...' : 'Start Chatting'}
          </button>
        </form>

        <div className="demo-section">
          <div className="divider">
            <span>Or try a demo user</span>
          </div>
          
          <div className="demo-users">
            {demoUsers.slice(0, 3).map((demoUser) => (
              <button
                key={demoUser.id}
                className="demo-user-button test-user"
                onClick={() => handleDemoLogin(demoUser)}
                disabled={isLoading}
                title="These users have pre-generated JWT tokens"
              >
                🔑 {demoUser.name} (Test User)
              </button>
            ))}
            
            <div className="divider-small">
              <span>Other demo users</span>
            </div>
            
            {demoUsers.slice(3).map((demoUser) => (
              <button
                key={demoUser.id}
                className="demo-user-button"
                onClick={() => handleDemoLogin(demoUser)}
                disabled={isLoading}
                title="These users require server-side token generation"
              >
                Login as {demoUser.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;