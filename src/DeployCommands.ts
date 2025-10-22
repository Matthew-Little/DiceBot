import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Collection, REST, Routes } from 'discord.js';
import config from './config/config.json' with {type: 'json'};
import type Command from './models/Command.ts';
import CommandLoader from './utils/CommandLoader.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commands: Collection<string, Command> = await CommandLoader.LoadCommands(__dirname);
const commandList: Command[] = Array.from(commands.values());

const rest = new REST().setToken(config.token);

(async () => {
	try {
		console.log(`Started refreshing ${commands.size} application (/) commands.`)
		//for global commands replace applicationGuildCommands(clientId,guildId) with applicationCommands(clientId)
		//TODO: figure out how to replace any
		const data: any = await rest.put(Routes.applicationGuildCommands(config.clientId, config.guildId), { body: commandList });

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();