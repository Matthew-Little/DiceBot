import type { CommandInteraction } from "discord.js";
import Command from '../../models/Command.ts';

export default class Server extends Command {

	constructor() {
		super('server', 'Provides information about the server.');
	}

	/**
	 * A way to check the current server and how many members it has
	 * @param interaction 
	 * @returns Promise<void>
	 */
	async Execute(interaction: CommandInteraction): Promise<void> {
		if (!interaction.guild) {
			console.log('The guild does not exist!');
			return;
		}

		await interaction.reply(
			`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`,
		);
	}
};