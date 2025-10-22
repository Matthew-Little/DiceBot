import fs from 'node:fs';
import path from 'node:path';
import type Command from "../models/Command.ts";
import { Collection } from "discord.js";

export default class CommandLoader {

	public static async LoadCommands(pathToFolders: string): Promise<Collection<string, Command>> {
		const commands: Collection<string, Command> = new Collection();
		const foldersPath: string = path.join(pathToFolders, 'commands');
		const commandFolders: string[] = fs.readdirSync(foldersPath);

		for (const folder of commandFolders) {
			const commandsPath = path.join(foldersPath, folder);
			const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.ts'));
			for (const file of commandFiles) {
				let joinedPath = path.join(commandsPath, file);
				//file:/// is required at the start of the path for newer versions of node.js ESM loader
				const filePath = 'file:///' + joinedPath;
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
