import type IEvent from "../Interfaces/IEvent.ts";

export default abstract class Event implements IEvent {

	name: string;
	once: boolean;

	constructor(name: string, once: boolean) {
		this.name = name;
		this.once = once;
	}

	abstract Execute(...args: any[]): any | Promise<any>
}