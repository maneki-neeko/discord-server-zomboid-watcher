import { Client, Intents, PartialTypes } from 'discord.js';
import { Inject } from 'typescript-ioc';
import * as dotenv from 'dotenv';

import DiscordService from './repository/discord/impl/DiscordServiceImpl';

import ClientEvents from './utils/ClientEvents';

dotenv.config();

export default class Main {
  private readonly INTENTS = [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.MESSAGE_CONTENT]
  private readonly PARTIALS: PartialTypes[] = ['CHANNEL'];

  private client: Client = new Client({intents: this.INTENTS,partials: this.PARTIALS});
  
  @Inject
  private discordService: DiscordService;

  public async start() {
    this.client.on(ClientEvents.READY, async () => {
      console.log(`Logged in as ${this.client.user?.tag}!`);
    });

    this.client.login(process.env.BOT_TOKEN);
  }
}

new Main().start();