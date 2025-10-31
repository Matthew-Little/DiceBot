import { CommandInteraction } from "discord.js";
import type IExecutable from "../interfaces/IExecutable.ts";

/**
 * base class for all Commands to inherit from that enforces the IExecutabe contract
 */
export default abstract class Command implements IExecutable<[CommandInteraction]> {
	name: string;
	description: string;
	cooldown?: number | null;

	/**
	 * All commands are required to be Executable and this abstract function upholds and enforces that contract
	 * @param interaction 
	 * @returns void | Promise<void>
	 */
	abstract Execute(interaction: CommandInteraction): void | Promise<void>

	constructor(name: string, description: string, cooldown: number | null = null) {
		this.name = name;
		this.description = description;
		this.cooldown = cooldown;
	}
}