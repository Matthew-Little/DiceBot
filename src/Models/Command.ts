import { SlashCommandBuilder } from "discord.js";
import type IEvent from '../Interfaces/IEvent.ts'

export default abstract class Command implements IEvent {
	name: string;
	description: string;

	data: SlashCommandBuilder;

	abstract Execute(...args: any[]): any | Promise<any>

	constructor(name: string, description: string) {
		this.name = name;
		this.description = description;
		this.data = new SlashCommandBuilder().setName(this.name).setDescription(this.description);
	}
}