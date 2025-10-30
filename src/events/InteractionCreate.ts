import { ChatInputCommandInteraction, Collection, Events, MessageFlags } from "discord.js";
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
		const cooldowns = client.cooldowns;

		if (!command) {
			interaction.reply({ content: `This command does not exist`, flags: MessageFlags.Ephemeral, });
			return;
		}

		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.name)!;
		const defaultCooldownDuration = 3;
		const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;
		if (timestamps.has(interaction.user.id)) {
			const expirationTime = timestamps.get(interaction.user.id) || 0 + cooldownAmount;
			const expiredTimestamp = Math.round(expirationTime / 1000)
			interaction.reply({
				content: `Please wait you are on cooldown for \'${command.name}\'. You can use it again <t:${expiredTimestamp}:R>`,
				flags: MessageFlags.Ephemeral,
			});
			return;
		}

		timestamps.set(interaction.user.id, now);
		setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

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