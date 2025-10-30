import { ChatInputCommandInteraction, Events, MessageFlags, type Interaction } from "discord.js";
import Event from "../models/Event.ts";
import type CustomClient from "../models/CustomClient.ts";

/**
 * This event is the handler of the various commands created for the bot
 */
export default class InteractionCreate extends Event<[Interaction]> {

	constructor() {
		super(Events.InteractionCreate, false);
	}

	async Execute(interaction: ChatInputCommandInteraction): Promise<void> {
		const client: CustomClient = interaction.client as CustomClient;
		const command = client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.Execute(interaction);

		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({
					content: 'There was an error while executing this command!',
					flags: MessageFlags.Ephemeral,
				});
			} else {
				await interaction.reply({
					content: 'There was an error while executing this command!',
					flags: MessageFlags.Ephemeral,
				});
			}
		}
	}

}