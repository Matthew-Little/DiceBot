import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { REST, Routes } from 'discord.js';
import config from './config/config.json' with {type: 'json'};
import type Command from './models/Command.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commands: Command[] = [];
const foldersPath: string = path.join(__dirname, 'commands');
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
			commands.push(command);

		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property`);
		}
	}
}


const rest = new REST().setToken(config.token);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`)
		//for global commands replace applicationGuildCommands(clientId,guildId) with applicationCommands(clientId)
		//TODO: figure out how to replace any
		const data: any = await rest.put(Routes.applicationGuildCommands(config.clientId, config.guildId), { body: commands });

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();