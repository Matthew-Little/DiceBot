import { Client, Events } from "discord.js";
import Event from "../models/Event.ts";

/**
 * Basic event that recieves the client when it is ready to let you know the bot is ready to recieve commands / react to events
 */
export default class Ready extends Event<[Client<true>]> {

	constructor() {
		super(Events.ClientReady, true);
	}

	Execute(client: Client<true>): void {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	}
}