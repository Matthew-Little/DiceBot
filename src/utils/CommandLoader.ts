import fs from 'node:fs';
import path from 'node:path';
import type Command from "../models/Command.ts";
import { Collection } from "discord.js";
import { pathToFileURL } from 'node:url';
import BaseLoader from '../models/BaseLoader.ts';

export default class CommandLoader extends BaseLoader {

	/**
	 * This function currently creates a collection of Commands, finds the command folders from the path parameter, and adds the commands to the collection before returning all of the commands. 
	 * @param pathToFolders 
	 * @returns Promise<Collection<string,Command>>
	 */
	public static async LoadCommands(pathToFolders: string): Promise<Collection<string, Command>> {
		const commands: Collection<string, Command> = new Collection();
		const commandFolders: string[] = await this.GetFilePaths('commands', pathToFolders);

		for (const folder of commandFolders) {
			const commandFiles: string[] = fs.readdirSync(folder).filter((file) => file.endsWith('.ts'));
			for (const file of commandFiles) {
				let joinedPath = path.join(folder, file);
				//pathToFileURL handles file paths for all OS and properly encodes special characters
				const filePath = pathToFileURL(joinedPath).href;
				const command: Command = new (await import(filePath)).default();
				if ('data' in command && 'Execute' in command) {
					commands.set(command.name, command);

				} else {
					console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property`);
				}
			}
		}

		return commands;
	};
}
