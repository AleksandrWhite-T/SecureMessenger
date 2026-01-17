export async function ensureUserExists(chatClient, user) {
  try {
    const userData = {
      id: user.id,
      name: user.name,
      image: user.image,
      role: 'user',
    };

    if (user.wallet_address) userData.wallet_address = user.wallet_address;
    if (user.auth_type) userData.auth_type = user.auth_type;

    await chatClient.upsertUser(userData);
    return true;
  } catch (err) {
    console.error('upsert failed:', err);
    return false;
  }
}

export async function createOrJoinChannel(chatClient, userId, userName) {
  const members = ['aaa', 'bbb', 'ccc'];
  
  try {
    const ch = chatClient.channel('messaging', 'general', {
      name: 'General Chat',
      members: members,
    });
    await ch.watch();
    return ch;
  } catch (err) {
    console.log('general channel failed, creating own');
    const ch = chatClient.channel('messaging', `chat-${userId}`, {
      name: `${userName}'s Chat`,
      members: [userId],
    });
    await ch.create();
    return ch;
  }
}

export function handleStreamError(err) {
  const code = err.code || err.status;
  const msg = err.message || err.details;
  
  if (code === 17) {
    return { type: 'PERMISSION_ERROR', message: 'No permission for this channel', suggestion: 'Check dashboard roles' };
  }
  if (code === 4) {
    return { type: 'RATE_LIMIT', message: 'Rate limited', suggestion: 'Wait a bit' };
  }
  if (code === 40) {
    return { type: 'TOKEN_ERROR', message: 'Invalid token', suggestion: 'Check JWT config' };
  }
  
  return { type: 'UNKNOWN_ERROR', message: msg, suggestion: 'Check console' };
}