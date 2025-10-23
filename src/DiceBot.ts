import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from 'node:fs';
import { Client, GatewayIntentBits } from "discord.js";
import config from './config/config.json' with {type: "json"}; //modern syntax for importing json file as an object to access its properties
import CustomClient from './models/CustomClient.ts';
import CommandHandler from './utils/CommandHandler.ts';
import type Event from "./models/Event.ts";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Create a new client instance
const client: CustomClient = new Client({ intents: [GatewayIntentBits.Guilds] }) as CustomClient;
//When the client is ready, run this code (only once)
//The distinction between 'client: Client<boolean>' and 'readyClient: Client<true> is it makes some properties non-nullable.

client.commands = await CommandHandler.LoadCommands(__dirname);

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.ts'));

for (const file of eventFiles) {
	let joinedPath = path.join(eventsPath, file);
	//file:/// is required at the start of the path for newer versions of node.js ESM loader
	const filePath = 'file:///' + joinedPath;
	const event: Event = new (await import(filePath)).default();

	if (event.once) {
		client.once(event.name, (...args) => event.Execute(...args));
	} else {
		client.on(event.name, (...args) => event.Execute(...args));
	}
}

//Log in to Discord with your client's token
client.login(config.token);
