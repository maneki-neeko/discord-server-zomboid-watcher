import axios from 'axios';
import { Client, Guild, Intents, PartialTypes } from 'discord.js';
import { Inject } from 'typescript-ioc';
const dotenv = require('dotenv');

import ServerService from './repository/battle_metrics/server/impl/ServerServiceImpl';
import { ServerStatus } from './repository/battle_metrics/models/Server';

dotenv.config();

export default class Main {
  private readonly client: Client;

  private readonly CHANNEL_ID = '1112241335957721159';
  private readonly SERVER_ID = '825085735718879272';
  private readonly ZOMBOID_SERVER_ID = "20718872";
  private readonly INTENTS = [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.MESSAGE_CONTENT]
  private readonly PARTIALS: PartialTypes[] = ['CHANNEL'];

  @Inject
  private serverService: ServerService;

  constructor() {
    this.client = new Client({
      intents: this.INTENTS,
      partials: this.PARTIALS,
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

      const name = `${emoji[serverStatus]} | ${serverStatus}`

      await channel.setName(name);
    });

    this.client.login(process.env.BOT_TOKEN);
  }
}

new Main();