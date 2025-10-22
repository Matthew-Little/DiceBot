import { Client, Collection } from 'discord.js';

export default class CustomClient extends Client {

	commands: Collection<string, any>

	constructor() {
		super({ intents: [] })
		this.commands = new Collection();
	}
}