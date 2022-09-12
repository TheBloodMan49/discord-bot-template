import { Logger } from "../utils/logger";
import { Event } from "../structures/Event";
import { Message } from "discord.js";
import { client } from "../index";

export default new Event('messageCreate', async (message: Message) => {
    
    if(!client.application) return;
    if(message.author.bot) return;

    // DM channel handling
    if(!message.inGuild()) {
        // Basic init to get the bot to a usable state
        if(client.isOwner(message.author.id) && message.content === "$init") {
            await message.reply("Initializing");
            if(!client.application.commands.cache.has("deploy")) {
                const deploy = client.commands.get("deploy");
                if(deploy) client.application.commands.create(deploy);
            }
        }
    }
});