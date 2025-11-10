import BaseLoader from "../models/BaseLoader.ts";
import Event from "../models/Event.ts";

/**
 * Specific Event Loader TODO delete this. BaseLoader will just become the module loader and will load all kinds of modules when complete
 */
export default class EventLoader extends BaseLoader {
	/**
	 * static method to easily load events from a path to an 'events' folder
	 * @param pathToEvents 
	 * @returns Promise<Event[]>
	 */
	public static async LoadEvents(pathToEvents: string): Promise<Event[]> {
		return await this.Load<Event>('events', pathToEvents);
	}
}