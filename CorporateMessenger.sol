// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
/**
 * @title CorporateMessenger
 * @dev Corporate messenger with access tokens and message verification via blockchain
 *
 * Contract Address: 0xA4dEC8E76dc65D90343C4d91DD8C4d187E46Cd85
 * Owner Address: 0xBEe0eCb78Ea888fDd859B3019DfCDeA53fa172D6
 * Network: Polygon Mainnet (chainId: 137)
 *
 * Concept:
 * - Only users in whitelist with CORP tokens can send messages
 * - Messages can be encrypted (E2E), then only hash is logged to blockchain
 * - Message hashes are logged to blockchain for integrity verification
 * - Contract owner manages whitelist and can mint tokens
 */
contract CorporateMessenger is ERC20, Ownable {
    // Whitelist mapping
    mapping(address => bool) private whiteList;
    // Message struct
    struct Message {
        address sender; // Sender
        address recipient; // Recipient
        string content; // Content (empty for encrypted)
        uint256 timestamp; // Timestamp
        bytes32 hash; // Hash for verification
    }
    // Received messages per address
    mapping(address => Message[]) private receivedMessages;
   
    // Sent messages per address
    mapping(address => Message[]) private sentMessages;
    /**
     * @dev Emitted on message send
     * @param sender Sender
     * @param recipient Recipient
     * @param timestamp Time
     * @param messageHash Hash
     */
    event MessageSent(
        address indexed sender,
        address indexed recipient,
        uint256 timestamp,
        bytes32 messageHash
    );
    /**
     * @dev Constructor
     * @param initialSupply Initial tokens for owner
     * @param initialOwner Owner address
     */
    constructor(uint256 initialSupply, address initialOwner)
        ERC20("CorporateToken", "CORP")
        Ownable(initialOwner)
    {
        require(initialOwner != address(0), "Invalid owner address");
        _mint(initialOwner, initialSupply * (10 ** decimals()));
    }
    /**
     * @dev Modifier for authorization
     * Requires tokens and whitelist
     */
    modifier isAuthorized() {
        require(balanceOf(msg.sender) > 0, "Not authorized: you need CORP tokens");
        require(whiteList[msg.sender], "Not authorized: you are not in the white list");
        _;
    }
    /**
     * @dev Mint tokens (owner only)
     * @param to Recipient
     * @param amount Amount
     */
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
    /**
     * @dev Add to whitelist (owner only)
     * @param user User
     */
    function addToWhiteList(address user) public onlyOwner {
        whiteList[user] = true;
    }
    /**
     * @dev Remove from whitelist (owner only)
     * @param user User
     */
    function removeFromWhiteList(address user) public onlyOwner {
        whiteList[user] = false;
    }
    /**
     * @dev Check whitelist
     * @param user Address
     * @return Bool
     */
    function isInWhiteList(address user) public view returns (bool) {
        return whiteList[user];
    }
    /**
     * @dev Get all messages for user (owner only)
     * @param user User
     * @return Messages array
     */
    function getAllMessages(address user) public view onlyOwner returns (Message[] memory) {
        return receivedMessages[user];
    }
    /**
     * @dev Send unencrypted message
     * Hash calculated on-chain
     *
     * @param recipient Recipient
     * @param content Text
     */
    function sendMessage(address recipient, string calldata content) public isAuthorized {
        require(recipient != address(0), "Invalid recipient");
        require(bytes(content).length > 0, "Empty message");
        // Hash from content
        bytes32 messageHash = keccak256(abi.encodePacked(content));
        // New message
        Message memory newMsg = Message({
            sender: msg.sender,
            recipient: recipient,
            content: content,
            timestamp: block.timestamp,
            hash: messageHash
        });
        // Store for both
        receivedMessages[recipient].push(newMsg);
        sentMessages[msg.sender].push(newMsg);
        // Emit
        emit MessageSent(msg.sender, recipient, block.timestamp, messageHash);
    }
    /**
     * @dev Log hash for encrypted message
     * Hash from client
     *
     * @param recipient Recipient
     * @param messageHash Hash
     */
    function logMessageHash(address recipient, bytes32 messageHash) public isAuthorized {
        require(recipient != address(0), "Invalid recipient");
        require(messageHash != bytes32(0), "Empty hash");
        // New message (empty content)
        Message memory newMsg = Message({
            sender: msg.sender,
            recipient: recipient,
            content: "", 
            timestamp: block.timestamp,
            hash: messageHash 
        });
        // Store
        receivedMessages[recipient].push(newMsg);
        sentMessages[msg.sender].push(newMsg);
        // Emit
        emit MessageSent(msg.sender, recipient, block.timestamp, messageHash);
    }
   
    /**
     * @dev Get received messages
     * @return Array
     */
    function getReceivedMessages() public view returns (Message[] memory) {
        return receivedMessages[msg.sender];
    }
    /**
     * @dev Get sent messages
     * @return Array
     */
    function getSentMessages() public view returns (Message[] memory) {
        return sentMessages[msg.sender];
    }
}