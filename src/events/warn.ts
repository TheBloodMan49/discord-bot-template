import { Logger } from "../utils/logger";
import { Event } from "../structures/Event";

export default new Event('warn', async (message) => {
    Logger.log('WARNING', message);
});