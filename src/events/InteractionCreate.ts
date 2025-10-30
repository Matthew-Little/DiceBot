import { ChatInputCommandInteraction, Events, MessageFlags } from "discord.js";
import Event from "../models/Event.ts";
import CustomClient from "../models/CustomClient.ts";
import type Command from "../models/Command.ts";

/**
 * This event is the handler of the various commands created for the bot
 */
export default class InteractionCreate extends Event<[ChatInputCommandInteraction]> {

	constructor() {
		super(Events.InteractionCreate, false);
	}

	async Execute(interaction: ChatInputCommandInteraction): Promise<void> {
		const client: CustomClient = interaction.client as CustomClient;
		const command: Command = client.commands.get(interaction.commandName)!;

		if (!command) {
			interaction.reply({ content: `This command does not exist`, ephemeral: true, });
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