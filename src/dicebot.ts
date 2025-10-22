import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Client, Collection, Events, GatewayIntentBits, MessageFlags, type Interaction } from "discord.js";
import config from './config/config.json' with {type: "json"}; //modern syntax for importing json file as an object to access its properties
import CustomClient from './models/CustomClient.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Create a new client instance
const client: CustomClient = new Client({ intents: [GatewayIntentBits.Guilds] }) as CustomClient;
//When the client is ready, run this code (only once)
//The distinction between 'client: Client<boolean>' and 'readyClient: Client<true> is it makes some properties non-nullable.
client.once(Events.ClientReady, (readyClient) => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.commands = new Collection();
const foldersPath: string = path.join(__dirname, 'commands');
const commandFolders: string[] = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.ts'));
	for (const file of commandFiles) {
		let joinedPath = path.join(commandsPath, file);
		//file:/// is required at the start of the path for newer versions of node.js ESM loader
		const filePath = 'file:///' + joinedPath;
		console.log(filePath);
		let command;
		import(filePath)
			.then(filePathExport => {
				command = filePathExport.default;
				// Set a new item in the Collection with the key as the command name and the value as the exported module
				if ('data' in command && 'execute' in command) {
					client.commands.set(command.data.name, command);
				} else {
					console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property`);
				}
			})
			.catch(error => {
				console.error(`[ERROR: ${error}] Failed to load the command at ${filePath}`);
			});

	}
}

//Log in to Discord with your client's token
client.login(config.token);

//basic command handling
client.on(Events.InteractionCreate, async (interaction: Interaction) => {
	if (!interaction.isChatInputCommand()) return;

	//client needs to be of type CustomClient to ensure the commands are available
	const client = interaction.client as CustomClient;
	const command = client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
	}

	try {
		await command.execute(interaction);
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
	//console.log(interaction);
});