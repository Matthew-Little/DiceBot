export default interface IEvent<T extends any[]> {
	name: string;
	Execute(...args: T): void | Promise<void>
}