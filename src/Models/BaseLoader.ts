import path from "node:path";
import fs from "node:fs";
import { pathToFileURL } from "node:url";

export default abstract class BaseLoader {

	/**
	 * loads an array of type T items from a folder, ignoring any non-typescript files
	 * @param folderName 
	 * @param pathToFolder 
	 * @returns 
	 */
	public static async Load<T>(folderName: string, pathToFolder: string): Promise<T[]> {
		const items: T[] = [];
		const folderPath: string = path.join(folderName, pathToFolder);
		const itemFiles = fs.readdirSync(folderPath).filter((file) => file.endsWith('.ts'));
		for (const file of itemFiles) {
			const joinedPath: string = path.join(folderPath, file);
			const filePath: string = pathToFileURL(joinedPath).href;
			const item: T = new (await import(filePath)).default();
			items.push(item);
		}
		return items;
	}
}