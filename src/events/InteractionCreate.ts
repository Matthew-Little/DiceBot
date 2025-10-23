import { Events, MessageFlags, type Interaction } from "discord.js";
import Event from "../models/Event.ts";
import type CustomClient from "../models/CustomClient.ts";

export default class InteractionCreate extends Event {

	constructor() {
		super(Events.InteractionCreate, false);
	}
	async Execute(interaction: Interaction) {
		if (!interaction.isChatInputCommand()) return;
		const client: CustomClient = interaction.client as CustomClient;
		const command = client.commands.get(interaction.commandName);

		try {
			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
			} else {
				await command.Execute(interaction);
			}
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