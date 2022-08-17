import { Event } from '../structures/Event';
import { client } from '..';
import { CommandInteractionOptionResolver } from 'discord.js';
import { ExtendedInteraction } from '../typings/Command';
import { Logger } from '../utils/logger';
export default new Event('interactionCreate', async (interaction) => {
    
    // Chat Input Commands
    if(interaction.isCommand()) {

        //if(!interaction.inGuild()) return await interaction.reply("Running commands outside of guilds is not yet supported");

        const command = client.commands.get(interaction.commandName);

        if(!command) return await interaction.reply("Command doesn't exist !");

        if(client.devMode) Logger.log('INFO', `Running command ${interaction.commandName} in guild ${interaction.guild?.id}, channel ${interaction.channel?.id}`);

        if(typeof interaction.member?.permissions === "string") return await interaction.reply("Permission problem encountered");
        if((command.userPermissions && interaction.member?.permissions.has(command.userPermissions)) || !command.userPermissions) {
            try {
                command.run({
                    args: interaction.options as CommandInteractionOptionResolver,
                    client,
                    interaction: interaction as ExtendedInteraction
                });
            } catch(err) {
                if(interaction.replied) await interaction.followUp("Command couldn't be run! Please check with the admin");
                else await interaction.reply("Command couldn't be run! Please check with the admin");
                if(typeof err === "string") Logger.log('ERROR', err);
                else console.log(err);
            }
        } else {
            interaction.reply("You don't have permission to execute this command!");
        }
    }
})