import type { CommandInteraction, GuildMember } from 'discord.js';
import Command from '../../models/Command.ts';
import CommandError from '../../error/CommandError.ts';

/**
 * A command for providing limited info on the user who ran it
 */
export default class User extends Command {
	constructor() {
		super('user', 'Provides information about the user.');
	}

	async Execute(interaction: CommandInteraction): Promise<void> {
		const guildMember: GuildMember = interaction.member as GuildMember;
		if (!guildMember) {
			throw new CommandError(`The guild member was not found when executing command ${interaction.commandName}`);
		}
		if (!interaction.user) {
			throw new CommandError(`The user was not found when executing the command ${interaction.commandName}`);
		}

		await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${guildMember.joinedAt}.`);
	}
}