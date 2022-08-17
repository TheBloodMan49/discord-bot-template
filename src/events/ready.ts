import { Logger } from "../utils/logger";
import { client } from "../index";
import { Event } from "../structures/Event";

export default new Event('ready', async () => {
    Logger.log('SUCCESS',`Bot online as ${client.user?.tag}`);
});