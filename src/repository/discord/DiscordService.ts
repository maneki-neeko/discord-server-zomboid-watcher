import Channel from "./models/Channel";

export default interface DiscordService {
    setChannelNameById(channelId: string, name: string): Promise<Channel>;
}