import { ApplicationCommandType, PermissionFlagsBits } from "discord.js";
import { Command } from "../structures/Command";

export default new Command({
    name: 'test',
    //userPermissions: [PermissionFlagsBits.ModerateMembers],
    type: ApplicationCommandType.Message,
    run: async ({ interaction }) => {
        await interaction.reply("test !");
    }
});