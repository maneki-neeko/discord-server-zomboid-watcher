enum ClientEvents {
    CHANNEL_CREATE = 'channelCreate',
    CHANNEL_DELETE = 'channelDelete',
    CHANNEL_PINS_UPDATE = 'channelPinsUpdate',
    CHANNEL_UPDATE = 'channelUpdate',
    DEBUG = 'debug',
    EMOJI_CREATE = 'emojiCreate',
    EMOJI_DELETE = 'emojiDelete',
    EMOJI_UPDATE = 'emojiUpdate',
    ERROR = 'error',
    GUILD_BAN_ADD = 'guildBanAdd',
    GUILD_BAN_REMOVE = 'guildBanRemove',
    GUILD_CREATE = 'guildCreate',
    GUILD_DELETE = 'guildDelete',
    GUILD_INTEGRATIONS_UPDATE = 'guildIntegrationsUpdate',
    GUILD_MEMBER_ADD = 'guildMemberAdd',
    GUILD_MEMBER_AVAILABLE = 'guildMemberAvailable',
    GUILD_MEMBER_REMOVE = 'guildMemberRemove',
    GUILD_MEMBERS_CHUNK = 'guildMembersChunk',
    GUILD_MEMBER_UPDATE = 'guildMemberUpdate',
    GUILD_UNAVAILABLE = 'guildUnavailable',
    GUILD_UPDATE = 'guildUpdate',
    INVALIDATED = 'invalidated',
    INVITE_CREATE = 'inviteCreate',
    INVITE_DELETE = 'inviteDelete',
    MESSAGE = 'message',
    MESSAGE_CREATE = 'messageCreate',
    MESSAGE_DELETE = 'messageDelete',
    MESSAGE_DELETE_BULK = 'messageDeleteBulk',
    MESSAGE_REACTION_ADD = 'messageReactionAdd',
    MESSAGE_REACTION_REMOVE = 'messageReactionRemove',
    MESSAGE_REACTION_REMOVE_ALL = 'messageReactionRemoveAll',
    MESSAGE_REACTION_REMOVE_EMOJI = 'messageReactionRemoveEmoji',
    MESSAGE_UPDATE = 'messageUpdate',
    PRESENCE_UPDATE = 'presenceUpdate',
    RATE_LIMIT = 'rateLimit',
    READY = 'ready',
    ROLE_CREATE = 'roleCreate',
    ROLE_DELETE = 'roleDelete',
    ROLE_UPDATE = 'roleUpdate',
    SHARD_DISCONNECT = 'shardDisconnect',
    SHARD_ERROR = 'shardError',
    SHARD_READY = 'shardReady',
    SHARD_RECONNECTING = 'shardReconnecting',
    SHARD_RESUME = 'shardResume',
    TYPING_START = 'typingStart',
}

export default ClientEvents;