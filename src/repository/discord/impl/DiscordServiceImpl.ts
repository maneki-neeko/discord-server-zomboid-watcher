import DiscordService from "../DiscordService";
import axios, { Axios } from 'axios';

import Channel from "../models/Channel";

export default class DiscordServiceImpl implements DiscordService {
    private readonly URL = 'https://discord.com/api/v8';
    private readonly CHANNELS_ENDPOINT = `${this.URL}/channels`;
    private api: Axios;

    constructor() {
        this.api = axios.create({
            baseURL: this.URL,
            headers: {
                'Authorization': `Bot ${process.env.DISCORD_TOKEN}`,
            },
        });
    }

    setChannelNameById = async (id: string, name: string): Promise<Channel> => {
        const body = { name };

        const channel = await this.api.patch(`${this.CHANNELS_ENDPOINT}/${id}`, body);

        return channel.data;
    }

    sendMessage = async (channelId: string, message: string): Promise<void> => {
        const body = { content: message };

        await this.api.post(`${this.CHANNELS_ENDPOINT}/${channelId}/messages`, body);
    }
}