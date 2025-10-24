import { ChatInputCommandInteraction, Events, MessageFlags, type Interaction } from "discord.js";
import Event from "../models/Event.ts";
import type CustomClient from "../models/CustomClient.ts";

export default class InteractionCreate extends Event<[Interaction]> {

	constructor() {
		super(Events.InteractionCreate, false);
	}
	/**
	 * This is the command event handler that recieves and handles all chat input commands
	 * @param interaction 
	 * @returns Promise<void>
	 */
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