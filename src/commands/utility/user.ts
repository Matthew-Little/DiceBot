import { SlashCommandBuilder } from 'discord.js';
import type { CommandInteraction } from 'discord.js';

export default {
	data: new SlashCommandBuilder().setName('user').setDescription('Provides information about the user'),
	async execute(interaction: CommandInteraction) {
		await interaction.reply(`This command was run by ${interaction.user.username}.`);
		//interaction.member may be null and member has type(s) GuildMember | APIInteractionGuildMember whose joinedAt/joined_at properties are named inconsistently
		//await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
	}
}