import { Logger } from "../utils/logger";
import { Event } from "../structures/Event";

export default new Event('error', async (e) => {
    Logger.log('ERROR', e.message);
});