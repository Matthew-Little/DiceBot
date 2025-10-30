import type { CommandInteraction } from 'discord.js';
import Command from '../../models/Command.ts';

/**
 * A basic command for testing the bot is online and responsive
 */
export default class Ping extends Command {

	//I don't love this look for other options
	constructor() {
		super('ping', 'Replies with Pong', 5);
	}

	async Execute(interaction: CommandInteraction): Promise<void> {
		await interaction.reply('Pong!');
	}
}