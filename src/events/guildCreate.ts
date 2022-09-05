import { Logger } from "../utils/logger";
import { Event } from "../structures/Event";
import { Guild } from "discord.js";
import { Deployer } from "../utils/deployer";

export default new Event('guildCreate', async (guild: Guild) => {
    Logger.log('INFO', `Joined guild ${guild.id}`);
    
    Deployer.deployGuild(guild.id);
});