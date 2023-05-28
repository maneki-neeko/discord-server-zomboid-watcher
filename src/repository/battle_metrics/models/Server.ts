export enum ServerStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
}

export class ServerAttributes {
  id: string;
  status: ServerStatus;
}

export class ServerData {
  id: string;
  type: string;
  attributes: ServerAttributes;
}

export default class Server {
  data: ServerData;
}