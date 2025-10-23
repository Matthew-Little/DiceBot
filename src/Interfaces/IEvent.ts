export default interface IEvent<T extends any[] = any[]> {
	name: string;
	Execute(...args: T): any | Promise<any>
}