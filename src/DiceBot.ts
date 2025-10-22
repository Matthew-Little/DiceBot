import { fileURLToPath } from "node:url";
import path from "node:path";
import { Client, Events, GatewayIntentBits, MessageFlags, type Interaction } from "discord.js";
import config from './config/config.json' with {type: "json"}; //modern syntax for importing json file as an object to access its properties
import CustomClient from './models/CustomClient.ts';
import CommandLoader from './utils/CommandLoader.ts';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Create a new client instance
const client: CustomClient = new Client({ intents: [GatewayIntentBits.Guilds] }) as CustomClient;
//When the client is ready, run this code (only once)
//The distinction between 'client: Client<boolean>' and 'readyClient: Client<true> is it makes some properties non-nullable.
client.once(Events.ClientReady, (readyClient) => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});
console.log(__dirname);
client.commands = await CommandLoader.LoadCommands(__dirname);

//Log in to Discord with your client's token
client.login(config.token);

//basic command handling
client.on(Events.InteractionCreate, async (interaction: Interaction) => {
	if (!interaction.isChatInputCommand()) return;

	//client needs to be of type CustomClient to ensure the commands are available
	const client = interaction.client as CustomClient;
	const command = client.commands.get(interaction.commandName);

	try {
		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
		} else {
			await command.Execute(interaction);
		}
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