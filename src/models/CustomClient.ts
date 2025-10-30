import { Client, Collection, type ClientOptions } from 'discord.js';
import type Command from './Command.ts';

/**
 * Extending the discord client so that we may add our own properties to it i.e. the commands
 */
export default class CustomClient extends Client {

	commands: Collection<string, Command>
	cooldowns: Collection<string, Collection<string, number>>

	constructor(options: ClientOptions) {
		super(options);
		this.commands = new Collection();
		this.cooldowns = new Collection();
	}
}