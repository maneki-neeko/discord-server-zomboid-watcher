export enum ServerStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
}

export class ServerAttributes {
  id: String;
  status: ServerStatus;
}

export class ServerData {
  id: String;
  type: String;
  attributes: ServerAttributes;
}

export default class Server {
  data: ServerData;
}