import axios, { Axios } from "axios";
import ServerService from "../ServerService";
import Server from "../../models/Server";

export default class ServerServiceImpl implements ServerService {
    private readonly BASE_URL = "https://api.battlemetrics.com/servers/";
    private api: Axios;

    constructor() {
        this.api = axios.create({
            baseURL: this.BASE_URL,
        });
    }

    public async getServerById(id: string) {
        try {
            const serverInfo = await this.api.get<Server>(id);

            return serverInfo.data;
        } catch (error) {
            console.error(error);
            throw new Error("Erro ao buscar informações do servidor.");
        }
    }
}