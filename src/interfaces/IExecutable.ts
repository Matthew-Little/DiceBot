export default interface IExecutable<T extends any[]> {
	name: string;
	Execute(...args: T): void | Promise<void>
}