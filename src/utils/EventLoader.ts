import Event from "../models/Event.ts";
import BaseLoader from "../models/BaseLoader.ts";


export default class EventLoader extends BaseLoader {
	public static async LoadEvents(pathToEvents: string): Promise<Event[]> {
		return await this.Load<Event>('events', pathToEvents);
	}
}