import axios from 'axios';
import { Client, Guild, Intents} from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const channelID = "1111855897493372978";

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.MESSAGE_CONTENT],
  partials: ['CHANNEL'],
});

enum ServerStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
}

client.on('ready', async () => {
  console.log(`Logged in as ${client.user!.tag}!`);
  
  const guild = client.guilds.cache.get('825085735718879272') as Guild;
  
  const getServerInfo = await axios.get('https://api.battlemetrics.com/servers/20718872');
  const serverStatus = getServerInfo.data.data.attributes.status;

  const channel = await guild.channels.fetch(channelID);

  if (!channel) {
    console.log('Canal não encontrado.');
    return;
  }
  
  const emoji = serverStatus === ServerStatus.ONLINE ? '🟢' : '🔴';
  
  await channel.setName(`${emoji} | ${serverStatus}`);
});

client.login(process.env.BOT_TOKEN);