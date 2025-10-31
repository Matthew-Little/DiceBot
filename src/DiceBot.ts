import { fileURLToPath } from "node:url";
import path from "node:path";
import { Client, GatewayIntentBits } from "discord.js";
//modern syntax for importing json file as an object to access its properties
import config from './config/config.json' with {type: "json"};
import CustomClient from './models/CustomClient.ts';
import type Event from "./models/Event.ts";
import EventLoader from "./utils/EventLoader.ts";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Create a new client instance
const client: CustomClient = new Client({ intents: [GatewayIntentBits.Guilds] }) as CustomClient;
//ensure client is initialized before attempting login
await client.Initialize();
//Load events
const eventList: Event[] = await EventLoader.LoadEvents(__dirname);

//set up event listeners for all loaded events
for (const event of eventList) {
	if (event.once) {
		client.once(event.name, (...args) => event.Execute(...args));
	} else {
		client.on(event.name, (...args) => event.Execute(...args));
	}
}

//Log in to Discord with your client's token
try {
	client.login(config.token);
} catch (error) {
	console.error(error);
}

