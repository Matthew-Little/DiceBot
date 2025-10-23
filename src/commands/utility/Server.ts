import type { CommandInteraction } from "discord.js";
import Command from '../../models/Command.ts';

export default class Server extends Command {

	constructor() {
		super('server', 'Provides information about the server.');
	}

	async Execute(interaction: CommandInteraction): Promise<void> {
		// interaction.guild is the object representing the Guild in which the command was run
		// guild could be null
		// await interaction.reply(
		// 	`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`,
		// );
		await interaction.reply('too many nullable properties make me sad');
	}
};