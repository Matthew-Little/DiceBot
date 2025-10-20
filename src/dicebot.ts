import { Client, Events, GatewayIntentBits } from "discord.js"
const { token } = require('./config.json');

//Create a new client instance
const client: Client<boolean> = new Client({ intents: [GatewayIntentBits.Guilds] });

//When the client is ready, run this code (only once)
//The distinction between 'client: Client<boolean>' and 'readyClient: Client<true> is it makes some properties non-nullable.
client.once(Events.ClientReady, (readyClient) => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

//Log in to Discord with your client's token
client.login(token);