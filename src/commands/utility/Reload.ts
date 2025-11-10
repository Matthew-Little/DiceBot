import type { ChatInputCommandInteraction } from "discord.js";
import Command from "../../models/Command.ts";

export default class Reload extends Command {

	constructor() {
		super('reload', 'Reloads a command.');
	}
	Execute(interaction: ChatInputCommandInteraction): void | Promise<void> {

	}

}