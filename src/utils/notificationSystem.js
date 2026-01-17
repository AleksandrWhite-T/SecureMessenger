export function showHashVerificationNotification(type, originalText, messageHash, transactionHash, verificationData = {}) {
  const notification = document.createElement('div');
  notification.className = 'hash-verification-notification';
  
  const closeNotification = () => {
    notification.classList.add('closing');
    setTimeout(() => notification.remove(), 500);
  };
  
  let title, body, icon;
  
  if (type === 'sender') {
    icon = 'OK';
    title = 'Message verified';
    body = `
      <p><strong>Message was not tampered with!</strong></p>
      <p>Your message hash has been successfully recorded in the blockchain.</p>
    `;
  } else if (type === 'recipient') {
    icon = '🔍✅';
    title = 'Verified message received';
    body = `
      <p><strong>Message confirmed by blockchain!</strong></p>
      <p>The sender proved message authenticity through the smart contract.</p>
    `;
  }
  
  notification.innerHTML = `
    <div class="notification-content">
      <div class="notification-header">
        <span class="notification-icon">${icon}</span>
        <span class="notification-title">${title}</span>
      </div>
      <div class="notification-body">
        ${body}
        <div class="notification-details">
          <p><strong>Text:</strong> "${originalText.length > 50 ? originalText.substring(0, 50) + '...' : originalText}"</p>
          <p><strong>Hash:</strong> ${messageHash.substring(0, 10)}...${messageHash.substring(messageHash.length - 8)}</p>
          ${transactionHash ? `<p><strong>Transaction:</strong> <a href="https://polygonscan.com/tx/${transactionHash}" target="_blank" rel="noopener noreferrer">${transactionHash.substring(0, 10)}...${transactionHash.substring(transactionHash.length - 8)}</a></p>` : ''}
          ${verificationData.blockNumber ? `<p><strong>Block:</strong> #${verificationData.blockNumber}</p>` : ''}
        </div>
      </div>
      <button class="notification-close">✕</button>
    </div>
  `;

  const closeButton = notification.querySelector('.notification-close');
  closeButton.addEventListener('click', closeNotification);

  document.body.appendChild(notification);

  setTimeout(() => {
    if (notification.parentElement) {
      closeNotification();
    }
  }, 10000);
}

export function showNotification(icon, title, message, type = 'info', duration = 5000) {
  const notification = document.createElement('div');
  notification.className = `simple-notification ${type}`;
  
  const closeNotification = () => {
    notification.classList.add('closing');
    setTimeout(() => notification.remove(), 500);
  };
  
  notification.innerHTML = `
    <div class="simple-notification-content">
      <span class="simple-notification-icon">${icon}</span>
      <div class="simple-notification-text">
        <div class="simple-notification-title">${title}</div>
        <div class="simple-notification-message">${message}</div>
      </div>
      <button class="simple-notification-close">✕</button>
    </div>
  `;

  const closeButton = notification.querySelector('.simple-notification-close');
  closeButton.addEventListener('click', closeNotification);

  document.body.appendChild(notification);

  setTimeout(() => {
    if (notification.parentElement) {
      closeNotification();
    }
  }, duration);
}

export function showVerificationErrorNotification(originalText, error) {
  showNotification(
    'ERROR', 
    'Verification error', 
    `Failed to verify message: "${originalText.length > 30 ? originalText.substring(0, 30) + '...' : originalText}". ${error}`,
    'error',
    8000
  );
}
