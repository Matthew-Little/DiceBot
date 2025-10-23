import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import type IEvent from '../Interfaces/IEvent.ts'

export default abstract class Command implements IEvent<[CommandInteraction]> {
	name: string;
	description: string;

	data: SlashCommandBuilder;

	abstract Execute(interaction: CommandInteraction): void | Promise<void>

	constructor(name: string, description: string) {
		this.name = name;
		this.description = description;
		this.data = new SlashCommandBuilder().setName(this.name).setDescription(this.description);
	}
}