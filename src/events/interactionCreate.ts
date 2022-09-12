import { Event } from '../structures/Event';
import { client } from '../index';
import { CommandInteractionOptionResolver } from 'discord.js';
import { ExtendedInteraction } from '../typings/Command';
import { Logger } from '../utils/logger';
export default new Event('interactionCreate', async (interaction) => {

    if(interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName);

        if(!command) return await interaction.reply("Command doesn't exist !");

        if(client.devMode) Logger.log('INFO', `Running command ${interaction.commandName} in guild ${interaction.guild?.id}, channel ${interaction.channel?.id}`);

        if(typeof interaction.member?.permissions === "string") return await interaction.reply("Permission problem encountered");
        if(
            client.isOwner(interaction.user.id) ||
            (command.userPermissions && interaction.member?.permissions.has(command.userPermissions)) || 
            !command.userPermissions
            ) {
                command.run({
                    args: interaction.options as CommandInteractionOptionResolver,
                    client,
                    interaction: interaction as ExtendedInteraction
                }).catch((err: string) => {
                    if(interaction.replied) interaction.followUp("Command couldn't be run! Please check with the admin");
                    else interaction.reply("Command couldn't be run! Please check with the admin");
                    if(typeof err === "string") Logger.log('ERROR', err);
                    else console.log(err);
                });
        } else {
            interaction.reply("You don't have permission to execute this command!");
        }
    }
})