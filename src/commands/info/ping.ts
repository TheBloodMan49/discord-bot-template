import { Command } from "../../structures/Command";

export default new Command({
    name: 'ping',
    description: 'Replies with the latency',
    run: async ({ interaction, client }) => {
        
        if (interaction.user.bot) return;

        await interaction.reply({content: "Checking ping..."});
        if(interaction.inGuild()) {
            await interaction.channel?.send("Pong!")?.then(msg => {
                const lat = msg.createdTimestamp - interaction.createdTimestamp;
                msg.delete();
                interaction.editReply({content: `Pong!\nClient latency: ${lat}ms, Web socket latency: ${client.ws.ping}ms`});
            });
        } else {
            await interaction.user.send("Ping!")?.then(msg => {
                const lat = msg.createdTimestamp - interaction.createdTimestamp;
                msg.delete();
                interaction.editReply({content: `Ping!\nClient latency: ${lat}ms, Web socket latency: ${client.ws.ping}ms`});
            });
        }
    }
});