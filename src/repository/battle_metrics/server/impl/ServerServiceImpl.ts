import axios from "axios";
import ServerService from "../ServerService";
import Server from "../../models/Server";

export default class ServerServiceImpl implements ServerService {
    private readonly BASE_URL = "https://api.battlemetrics.com/servers/";


    public async getServerById(id: String) {
        try {
            const serverInfo = await axios.get<Server>(this.BASE_URL + id);

            return serverInfo.data;
        } catch (error) {
            console.error(error);
            throw new Error("Erro ao buscar informações do servidor.");
        }
    }
}