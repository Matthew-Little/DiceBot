import type { CommandInteraction } from "discord.js";
import Command from '../../Models/Command.ts';
import CommandError from "../../error/CommandError.ts";

/**
 * A command that provides generic info about the server it is run in
 */
export default class Server extends Command {

	constructor() {
		super('server', 'Provides information about the server.');
	}

	async Execute(interaction: CommandInteraction): Promise<void> {

		if (!interaction.guild) {
			throw new CommandError(`No guild found when executing command: ${interaction.commandName}`);
		}

		await interaction.reply(
			`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`,
		);
	}
};