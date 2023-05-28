export default interface Channel {
    id: string
    type: number
    last_message_id: string
    flags: number
    guild_id: string
    name: string
    parent_id: string
    rate_limit_per_user: number
    bitrate: number
    user_limit: number
    rtc_region: string
    video_quality_mode: number
    position: number
    permission_overwrites: []
    nsfw: boolean
    icon_emoji: string
    theme_color: string
    message: string
}