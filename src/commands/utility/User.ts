import type { CommandInteraction } from 'discord.js';
import Command from '../../models/Command.ts';

export default class User extends Command {
	constructor() {
		super('user', 'Provides information about the user.');
	}

	async Execute(interaction: CommandInteraction) {
		await interaction.reply(`This command was run by ${interaction.user.username}.`);
		//interaction.member may be null and member has type(s) GuildMember | APIInteractionGuildMember whose joinedAt/joined_at properties are named inconsistently
		//await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
	}
}