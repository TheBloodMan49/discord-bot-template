import { Logger } from "../utils/logger";
import { Event } from "../structures/Event";

export default new Event('debug', async (message: string) => {
    Logger.log('DEBUG', message);
});