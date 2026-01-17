# SecureMessenger

A secure chat application with end-to-end encryption and blockchain verification, built with React and Stream Chat.

## Quick Start

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `env.example` to `.env` and add Stream Chat API credentials
4. Start: `npm start`

Application runs at `http://localhost:3000`

**Test users:** aaa, bbb, ccc (available without configuration)

## Features

- End-to-End Encryption (ECDH P-256 + AES-GCM)
- Blockchain Message Verification (Polygon Network)
- MetaMask Authentication with Whitelist
- Token-Based Access Control
- Direct Messages with E2E encryption
- Real-time messaging
- Online status tracking

## Prerequisites

- Node.js 16+
- npm or yarn
- Stream Chat account ([sign up](https://getstream.io/chat/))
- MetaMask wallet (optional, for blockchain features)

## Getting Started

### Installation

```bash
npm install
```

### Environment Setup

1. Copy environment template:
```bash
cp env.example .env
```

2. Add your credentials to `.env`:
```env
REACT_APP_STREAM_API_KEY=your_api_key
REACT_APP_STREAM_API_SECRET=your_api_secret
REACT_APP_APP_NAME=SecureMessenger
```

### Run Application

```bash
npm start
```

## How to Use

### Login Options

**Quick Testing (No MetaMask):**
- Click on test user buttons: User AAA, BBB, or CCC

**MetaMask Login:**
- Connect wallet and sign message
- Requires whitelist approval and CORP tokens

### Features

**Channels Tab:**
- View and join group channels
- Switch between conversations

#### Features
- **Channel List**: View and switch between different chat channels
- **User List**: See all users with real-time online status
- **Direct Messages**: One-click DM creation with E2E encryption
- **End-to-End Encryption**: ECDH P-256 + AES-GCM encryption
- **Real-time Messaging**: Send and receive messages instantly  
- **Secure Messages**: Messages are secured with authentication tokens
- **Responsive Design**: Works on desktop and mobile

**Admin Panel:**
- Manage whitelist (add/remove addresses)
- Mint CORP tokens
- Check balances and permissions

**E2E Encryption:**
- Enable in Settings
- Automatic encryption for direct messages
- Key fingerprint verification

## Security Features

### End-to-End Encryption
- ECDH P-256 key exchange
- AES-GCM 256-bit encryption
- Client-side encryption
- Forward secrecy

### Blockchain Verification
- Message hash logging to Polygon Network
- Smart contract verification
- Immutable audit trail

### Access Control
- MetaMask wallet authentication
- Whitelist-based access
- Token-gated messaging (CORP tokens)
- JWT-based authorization

### Transport Security
- HTTPS/WSS encrypted connections
- TLS encryption
- Secure WebSocket for real-time

## Troubleshooting

### Common Issues

**"Invalid API Key"**
- Verify API key in `.env` file
- Restart server after changes

**"Not in whitelist"**
- Contact admin to add your address
- Use Admin Panel to manage whitelist

**"Insufficient CORP tokens"**
- Mint tokens via Admin Panel
- Check balance in Admin Panel

**Permission Errors**
- Go to Stream Dashboard → Roles & Permissions
- Enable "Read Channel" for 'user' role
- Use test users (aaa, bbb, ccc) for immediate testing

**MetaMask Not Detected**
- Install MetaMask extension
- Check network (should be Polygon Mainnet)
- Refresh page after installation

**Wrong Network**
- Switch to Polygon Mainnet in MetaMask
- Contract address: 0xA4dEC8E76dc65D90343C4d91DD8C4d187E46Cd85

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

- [Stream Chat Documentation](https://getstream.io/chat/docs/)
- [Community Forum](https://github.com/GetStream/stream-chat-react/discussions)
- [GitHub Issues](https://github.com/GetStream/stream-chat-react/issues)

---

Built with ❤️ using [Stream Chat](https://getstream.io/chat/) and React.