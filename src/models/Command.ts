import { ChatInputCommandInteraction } from "discord.js";
import type IExecutable from "../interfaces/IExecutable.ts";


const DEFAULT_COOLDOWN_DURATION = 3;
/**
 * base class for all Commands to inherit from that enforces the IExecutabe contract
 */
export default abstract class Command implements IExecutable<[ChatInputCommandInteraction]> {
	name: string;
	description: string;
	cooldown?: number;

	/**
	 * All commands are required to be Executable and this abstract function upholds and enforces that contract
	 * @param interaction 
	 * @returns void | Promise<void>
	 */
	abstract Execute(interaction: ChatInputCommandInteraction): void | Promise<void>

	constructor(name: string, description: string, cooldown: number = DEFAULT_COOLDOWN_DURATION) {
		this.name = name;
		this.description = description;
		this.cooldown = cooldown;
	}
}