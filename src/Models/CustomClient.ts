import { Client, Collection, type ClientOptions } from 'discord.js';
import type Command from './Command.ts';

export default class CustomClient extends Client {

	commands: Collection<string, Command>

	constructor(options: ClientOptions) {
		super(options);
		this.commands = new Collection();
	}
}