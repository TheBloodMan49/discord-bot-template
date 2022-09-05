import { ApplicationCommandType, EmbedBuilder, GuildMember, PermissionFlagsBits } from 'discord.js';
import { Command } from "../structures/Command";

export default new Command({
    name: 'userinfo',
	//description: "Gives infos about the specified user",
    userPermissions: [PermissionFlagsBits.ModerateMembers],
    type: ApplicationCommandType.User,
    run: async ({ interaction }) => {
        const target = interaction.options.getMember("user");
        if(!(target instanceof GuildMember)) return await interaction.reply({content: "Target invalid", ephemeral: true});
        let embed = new EmbedBuilder()
          .setColor("#000194")
          .setTitle("Infos on user : "+target.user.username)
          .setAuthor({name:target.displayName, iconURL:target.user.avatarURL() ?? undefined})
          .setDescription(
                'Name : ' + target.displayName + '\n' +
                'Tag : ' + target.user.tag + '\n' +
                'Id : ' + target.id + '\n' +
                'Arrival date : ' + target.joinedAt?.toString() + '\n' +
                'Account creation date : ' + target.user.createdAt.toString() + '\n' +
                'Is a bot : ' + target.user.bot + '\n' +
                'Is manageable by me : ' + target.manageable
          )
          .setTimestamp();
      await interaction.reply({embeds:[embed], ephemeral:true});
      return;
  }
})