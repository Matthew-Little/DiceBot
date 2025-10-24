import path from "node:path";
import fs from "node:fs";
import { pathToFileURL } from "node:url";

export default abstract class BaseLoader {
	public static async Load<T>(itemType: string, pathToItems: string): Promise<T[]> {
		const items: T[] = [];
		const itemPath: string = path.join(pathToItems, itemType);
		const itemFiles = fs.readdirSync(itemPath).filter((file) => file.endsWith('.ts'));
		for (const file of itemFiles) {
			const joinedPath: string = path.join(itemPath, file);
			const filePath: string = pathToFileURL(joinedPath).href;
			const item: T = new (await import(filePath)).default();
			items.push(item);
		}
		return items;
	}
}