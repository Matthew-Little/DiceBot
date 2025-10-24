import Event from "../models/Event.ts";
import BaseLoader from "../models/BaseLoader.ts";


export default class EventLoader extends BaseLoader {
	/**
	 * static method to easily load events from a path
	 * @param pathToEvents 
	 * @returns Promise<Event[]>
	 */
	public static async LoadEvents(pathToEvents: string): Promise<Event[]> {
		return await this.Load<Event>('events', pathToEvents);
	}
}