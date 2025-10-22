import { SlashCommandBuilder, type CommandInteraction } from "discord.js";

export default abstract class Command {
	name: string;
	description: string;

	data: SlashCommandBuilder;

	abstract Execute(interaction: CommandInteraction): Promise<any>

	constructor(name: string, description: string) {
		this.name = name;
		this.description = description;
		this.data = new SlashCommandBuilder().setName(this.name).setDescription(this.description);
	}
}