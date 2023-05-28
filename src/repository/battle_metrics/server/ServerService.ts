import Server from "../models/Server";

export default interface ServerService {
    getServerById(id: string): Promise<Server>;
}