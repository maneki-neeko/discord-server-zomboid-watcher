import { Client, Intents, PartialTypes } from 'discord.js';
import { Inject } from 'typescript-ioc';
import * as dotenv from 'dotenv';

import ServerService from './repository/battle_metrics/server/impl/ServerServiceImpl';
import DiscordService from './repository/discord/impl/DiscordServiceImpl';

import { ServerStatus } from './repository/battle_metrics/models/Server';
import ClientEvents from './utils/ClientEvents';

dotenv.config();

export default class Main {
  
  private readonly CHANNEL_ID = '825085735718879276';
  private readonly ZOMBOID_SERVER_ID = "20718872";
  private readonly INTENTS = [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.MESSAGE_CONTENT]
  private readonly PARTIALS: PartialTypes[] = ['CHANNEL'];

  private client: Client = new Client({intents: this.INTENTS,partials: this.PARTIALS});
  
  @Inject
  private serverService: ServerService;
  
  @Inject
  private discordService: DiscordService;

  public async start() {
    this.client.on(ClientEvents.READY, async () => {
      console.log(`Logged in as ${this.client.user?.tag}!`);

      const serverInfo = await this.serverService.getServerById(this.ZOMBOID_SERVER_ID);

      const serverStatus = serverInfo.data.attributes.status;
      
      const emoji = {
        [ServerStatus.ONLINE]: '🟢',
        [ServerStatus.OFFLINE]: '🔴',
      }
      
      const name = `${emoji[serverStatus]}┃${serverStatus}`.toUpperCase();
      
      const channel = await this.discordService.setChannelNameById(this.CHANNEL_ID, name);

      if (channel.message) {
        console.log(channel.message);
      }
    });

    this.client.login(process.env.BOT_TOKEN);
  }
}

new Main().start();