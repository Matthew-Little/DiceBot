import { Client, Collection } from 'discord.js';
import type Command from './Command.ts';

export default class CustomClient extends Client {

	commands: Collection<string, Command>

	constructor() {
		super({ intents: [] })
		this.commands = new Collection();
	}
}