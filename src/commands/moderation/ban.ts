import { ApplicationCommandOptionType, Colors, EmbedBuilder, PermissionsBitField } from "discord.js";
import { Command } from "../../structures/Command";

export default new Command({
    name: 'ban',
    description: 'Bans the specified user',
    userPermissions: [PermissionsBitField.Flags.BanMembers],
    dmPermission: false,
    options: [
        {
          name: 'target',
          description: 'Who shall we strike with the ban hammer ?',
          type: ApplicationCommandOptionType.User,
          required: true
        },
        {
            name: 'reason',
            description: 'What did this person to deserve this judjment ?',
            type: ApplicationCommandOptionType.String,
            required: false
        },
        {
            name: 'slaymessages',
            description: 'Shall we erase this person\'s messages ?',
            type: ApplicationCommandOptionType.String,
            choices: [
                {name:'none', value:'none'},
                {name:'24h',value:'24h'},
                {name:'7d',value:'7d'}
            ],
            required: false
        }
    ],

    run: async ({ interaction, args }) => {

        if (interaction.user.bot) return;

        if(!interaction.guild) return await interaction.reply("You can't ban someone outside of a guild!");


        const target = args.getUser("target");
        if(!target) return await interaction.reply("No target specified");

        const reason = args.get("reason")?.value ?? "No reason specified";
        if(typeof reason !== "string") return await interaction.reply("The reason specified has a problem");

        const slayMessages = args.get('slaymessages')?.value ?? 'none';

        const targetMember = interaction.guild?.members.cache.get(target.id);
        if(!targetMember) return await interaction.reply("That member does not exist.");

        if(!targetMember.bannable) return await interaction.reply("That member cannot be banned.");

        let deleteMessageDays;
        switch(slayMessages) {
            case "none": {
                deleteMessageDays = 0;
                break;
            }
            case "24h": {
                deleteMessageDays = 1;
                break;
            }
            case "7d": {
                deleteMessageDays = 7;
                break;
            }
            default: {
                deleteMessageDays = 0;
                break;
            }
        }
        
        await targetMember.ban({deleteMessageDays: deleteMessageDays, reason: reason});

        let replyEmbed = new EmbedBuilder()
            .setTitle(`**Ban**`)
            .setColor(Colors.Green)
            .setTimestamp()
            .addFields({name: "User", value: targetMember.user.tag})
            .addFields({name: "Reason", value: reason})
            .setAuthor({name: targetMember.displayName, iconURL: targetMember.avatarURL() ?? undefined});
        await interaction.reply({embeds: [replyEmbed]});
    }
});