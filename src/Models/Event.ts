import type IEvent from "../Interfaces/IEvent.ts";

export default abstract class Event<T extends any[] = any[]> implements IEvent<T> {

	name: string;
	once: boolean;

	constructor(name: string, once: boolean) {
		this.name = name;
		this.once = once;
	}

	/**
	 * Abstract function for fufilling contract
	 * @param args 
	 * @returns void | Promise<void>
	 */
	abstract Execute(...args: T): void | Promise<void>
}