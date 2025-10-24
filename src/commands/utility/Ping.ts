import type { CommandInteraction } from 'discord.js';
import Command from '../../models/Command.ts';

export default class Ping extends Command {

	//I don't love this look for other options
	constructor() {
		super('ping', 'Replies with Pong');
	}

	/**
	 * Basic function for testing the bot is online and responding to commands
	 * @param interaction 
	 * @returns Promise<void>
	 */
	async Execute(interaction: CommandInteraction): Promise<void> {
		await interaction.reply('Pong!');
	}
}