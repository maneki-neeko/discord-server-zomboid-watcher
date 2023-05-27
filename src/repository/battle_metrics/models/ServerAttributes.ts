export enum ServerStatus {
    ONLINE = 'online',
    OFFLINE = 'offline',
}

export default class ServerAttributes {
    id: String;
    status: ServerStatus;
}