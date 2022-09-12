import { CommandDeployer } from "../../utils/deployer";
import { Command } from "../../structures/Command";
import { PermissionFlagsBits } from "discord.js";

export default new Command({
    name: 'deploy',
    description: 'Deploys global commands and current server commands',
    defaultMemberPermissions: PermissionFlagsBits.ManageGuild,
    run: async ({ interaction, client }) => {
        if (interaction.user.bot) return;

        if (!client.isOwner(interaction.user.id)) return interaction.reply({content:"Debug command, only usable for my admins", ephemeral:true});

        await CommandDeployer.deployGlobal();
        if(interaction.guild) await CommandDeployer.deployGuild(interaction.guild.id);

        await interaction.reply({content:"Successfully deployed!", ephemeral:true});
    }
});