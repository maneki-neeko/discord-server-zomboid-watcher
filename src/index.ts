import { Client, Intents, PartialTypes } from 'discord.js';
import { Inject } from 'typescript-ioc';
import * as dotenv from 'dotenv';

import DiscordService from './repository/discord/impl/DiscordServiceImpl';

import ClientEvents from './utils/ClientEvents';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

export default class Main {
  private readonly INTENTS = [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.MESSAGE_CONTENT]
  private readonly PARTIALS: PartialTypes[] = ['CHANNEL'];
  private readonly ID_FRANCISCO = '1111847016344059985';
  private readonly FRANSCISCO_CHANNEL_ID = '1112896040211853412';

  private client: Client = new Client({intents: this.INTENTS,partials: this.PARTIALS});
  
  @Inject
  private discordService: DiscordService;

   gpt = async (message: string) => {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    // Atue como se você fosse o Papa francisco e responda a seguinte mensagem abaixo
    
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "user",
        content: `Atue como se você fosse o Papa francisco e responda a seguinte mensagem abaixo: ${message}`
      }],
    });

    return completion.data.choices[0].message.content;
  }

  public async start() {
    this.client.on(ClientEvents.READY, async () => {
      console.log(`Logged in as ${this.client.user?.tag}!`);

    });
    
    this.client.on(ClientEvents.MESSAGE_CREATE, async (message) => {
      console.log(`[author: ${message.author.username}] [message: ${message.content}]`)

      console.log(typeof message.author.id, message.author.id);
      
      if (message.channelId === this.FRANSCISCO_CHANNEL_ID && message.author.username !== 'francisquin') {
        console.log('entrou');
        const response = await this.gpt(message.content);
        this.discordService.sendMessage(this.FRANSCISCO_CHANNEL_ID, response);
      }
    });

    this.client.login(process.env.BOT_TOKEN);
  }
}

new Main().start();