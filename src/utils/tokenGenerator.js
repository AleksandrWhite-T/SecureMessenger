import CryptoJS from 'crypto-js';

const TEST_TOKENS = {
  'aaa': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWFhIn0.Cy507jW7mFtLjiTYeIGyXs4qV4AgMcpgE21xnHPfsXk',
  'bbb': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYmJiIn0.P2YdgobPm4sroWrw1LVMO0APrXtYh3BsHUGc3YR3Xu0',
  'ccc': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiY2NjIn0._4KDN0QkaX7zD1LtClWu4sgbn5NqNcCevss9jljvKPA',
};

function isEthAddr(userId) {
  return typeof userId === 'string' && 
         userId.startsWith('0x') && 
         userId.length === 42 && 
         /^0x[a-fA-F0-9]{40}$/.test(userId);
}

function makeJWT(payload, secret) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const encHeader = btoa(JSON.stringify(header)).replace(/=/g, '');
  const encPayload = btoa(JSON.stringify(payload)).replace(/=/g, '');
  const data = `${encHeader}.${encPayload}`;
  const sig = CryptoJS.HmacSHA256(data, secret);
  const encSig = CryptoJS.enc.Base64.stringify(sig).replace(/=/g, '');
  return `${encHeader}.${encPayload}.${encSig}`;
}

export function generateUserToken(userId) {
  if (TEST_TOKENS[userId]) {
    return TEST_TOKENS[userId];
  }
  
  const secret = process.env.REACT_APP_STREAM_API_SECRET;
  if (!secret) {
    throw new Error('Unable to generate token: No API secret configured and no pre-generated token available');
  }

  try {
    return makeJWT({ user_id: userId }, secret);
  } catch (err) {
    console.error('Token gen failed:', err);
    throw new Error(`Failed to generate token: ${err.message}`);
  }
}
