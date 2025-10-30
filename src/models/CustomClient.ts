import { Client, Collection, type ClientOptions } from 'discord.js';
import type Command from './Command.ts';
import CommandLoader from '../utils/CommandLoader.ts';

/**
 * Extending the discord client so that we may add our own properties to it i.e. the commands
 */
export default class CustomClient extends Client {

	private commands: Collection<string, Command>
	private cooldowns: Collection<string, Collection<string, number>>

	public constructor(options: ClientOptions) {
		super(options);
		this.commands = new Collection();
		this.cooldowns = new Collection();
	}

	public async Initialize(): Promise<void> {
		this.commands = await CommandLoader.LoadCommands(__dirname);
		this.cooldowns = new Collection();
	}

	public GetCommands(): Collection<string, Command> {
		return this.commands;
	}

	public GetCooldowns(): Collection<string, Collection<string, number>> {
		return this.cooldowns;
	}
}