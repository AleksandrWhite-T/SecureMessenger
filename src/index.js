import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'stream-chat-react/dist/css/v2/index.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);