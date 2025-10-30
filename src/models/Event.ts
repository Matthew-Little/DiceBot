import type IExecutable from "../interfaces/IExecutable.ts";

/**
 * base class for all Events handled by our bot to inherit from that enforces the IExecutable contract
 */
export default abstract class Event<T extends any[] = any[]> implements IExecutable<T> {

	name: string;
	once: boolean;

	constructor(name: string, once: boolean) {
		this.name = name;
		this.once = once;
	}

	/**
	 * All events are required to be Executable and this abstract function upholds and enforces that contract
	 * @param args 
	 * @returns void | Promise<void>
	 */
	abstract Execute(...args: T): void | Promise<void>
}