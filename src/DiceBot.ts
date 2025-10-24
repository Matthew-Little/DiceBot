import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import fs from 'node:fs';
import { Client, GatewayIntentBits } from "discord.js";
import config from './config/config.json' with {type: "json"}; //modern syntax for importing json file as an object to access its properties
import CustomClient from './models/CustomClient.ts';
import type Event from "./models/Event.ts";
import CommandLoader from "./utils/CommandLoader.ts";
import EventLoader from "./utils/EventLoader.ts";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Create a new client instance
const client: CustomClient = new Client({ intents: [GatewayIntentBits.Guilds] }) as CustomClient;

client.commands = await CommandLoader.LoadCommands(__dirname);

const eventList: Event[] = await EventLoader.LoadEvents(__dirname);

for (const event of eventList) {

	if (event.once) {
		client.once(event.name, (...args) => event.Execute(...args));
	} else {
		client.on(event.name, (...args) => event.Execute(...args));
	}
}

//Log in to Discord with your client's token
client.login(config.token);
