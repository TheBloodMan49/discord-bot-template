import { info } from 'console';
import { ApplicationCommandOptionType, EmbedBuilder, PermissionsBitField } from 'discord.js';
import { Command } from "../../structures/Command";

export default new Command({
    name: 'infos',
    description: "Shows infos on the current channel",
    userPermissions: [PermissionsBitField.Flags.ManageChannels],
    options: [
      {
        name: 'show',
        description: 'Show only to you, default : false',
        type: ApplicationCommandOptionType.Boolean,
        required: false,
      }
	  ],
    run: async({ interaction, client }) => {

      if(interaction.user.bot) return;

      if(!interaction.inGuild()) return await interaction.reply("Only possible in guild channels");
      
      const show = interaction.options.get('show')?.value == true ? true : false;
      
      const channel = interaction.channel;
      let embed = new EmbedBuilder()
            .setColor(0xffe402)
            .setTitle("Infos sur le channel :")
            .setAuthor({name:"Ingénieur", iconURL:client.user?.avatarURL() ?? undefined, url:'https://google.com/'})
            .setDescription(
                'Nom : ' + channel?.name + '\n' +
                'Id : ' + channel?.id + '\n' +
                'Catégorie : ' + channel?.parent?.name + '\n' +
                'Date de création : ' + channel?.createdAt?.toString() + '\n' +
                'Id du serveur : ' + channel?.guild.id + '\n'
            )
            .setTimestamp();

      if(show) await interaction.reply({embeds : [embed], ephemeral : false});
      else await interaction.reply({embeds : [embed], ephemeral : true});
        
    }
  }
)