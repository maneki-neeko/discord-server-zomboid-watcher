export enum ServerStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
}

export interface ServerAttributes {
  id: string;
  status: ServerStatus;
}

export interface ServerData {
  id: string;
  type: string;
  attributes: ServerAttributes;
}

export default interface Server {
  data: ServerData;
}