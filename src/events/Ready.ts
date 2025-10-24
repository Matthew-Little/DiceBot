import { Client, Events } from "discord.js";
import Event from "../models/Event.ts";

export default class Ready extends Event<[Client<true>]> {

	constructor() {
		super(Events.ClientReady, true);
	}

	/**
	 * Recieves the client when it is ready
	 * @param client 
	 * @returns void
	 */
	Execute(client: Client<true>): void {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	}
}