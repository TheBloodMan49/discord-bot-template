import { Deployer } from "../../utils/deployer";
import { Command } from "../../structures/Command";

export default new Command({
    name: 'deploy',
    description: 'Deploys global commands and current server commands',
    run: async ({ interaction, client }) => {
        if (interaction.user.bot) return;

        if (!client.isOwner(interaction.user.id)) return interaction.reply({content:"Debug command, only usable for my admins", ephemeral:true});

        await Deployer.deployGlobal();
        if(interaction.guild) await Deployer.deployGuild(interaction.guild.id);
    }
});