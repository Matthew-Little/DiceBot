import { Events } from "discord.js";
import type CustomClient from "../models/CustomClient.ts";
import Event from "../models/Event.ts";

export default class Ready extends Event {

	constructor() {
		super(Events.ClientReady, true);
	}

	Execute(client: CustomClient) {
		if (!client.user) {
			console.log(`[WARNING] The ${client}'s 'user' is null or undefined`);
		} else {
			console.log(`Ready! Logged in as ${client.user.tag}`);
		}
	}
}