import axios from 'axios';
import { Client, Guild, Intents } from 'discord.js';
import dotenv from 'dotenv';
import { Inject } from 'typescript-ioc';

import ServerService from './repository/battle_metrics/server/ServerService';
import { ServerStatus } from './repository/battle_metrics/models/ServerAttributes';

dotenv.config();

export default class Main {
  private readonly client: Client;

  private readonly CHANNEL_ID = '1111855897493372978';
  private readonly SERVER_ID = '825085735718879272';
  private readonly ZOMBOID_SERVER_ID = "20718872";

  @Inject
  private serverService: ServerService;


  constructor() {
    this.client = new Client({
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.MESSAGE_CONTENT,
      ],
      partials: ['CHANNEL'],
    });

    this.start();
  }

  private async start() {
    this.client.on('ready', async () => {
      console.log(`Logged in as ${this.client.user!.tag}!`);

      const guild = this.client.guilds.cache.get(this.SERVER_ID) as Guild;

      const serverInfo = await this.serverService.getServerById(this.ZOMBOID_SERVER_ID);

      const serverStatus = serverInfo.data.attributes.status;

      const channel = await guild.channels.fetch(this.CHANNEL_ID);

      if (!channel) {
        console.log('Canal não encontrado.');
        return;
      }

      const emoji = {
        [ServerStatus.ONLINE]: '🟢',
        [ServerStatus.OFFLINE]: '🔴',
      }

      await channel.setName(`${emoji} | ${serverStatus}`);
    });

    this.client.login(process.env.BOT_TOKEN);
  }
}