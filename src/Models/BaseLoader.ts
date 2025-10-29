import path from "node:path";
import fs from "node:fs";
import { pathToFileURL } from "node:url";
import { Collection, ThreadMemberFlagsBitField } from "discord.js";

export default abstract class BaseLoader {

	/**
	 * loads an array of type T items from a folder, ignoring any non-typescript files
	 * @param folderName 
	 * @param pathToFolder 
	 * @returns 
	 */
	public static async Load<T>(folderName: string, pathToFolder: string): Promise<T[]> {
		const items: T[] = [];
		const filePaths: string[] = await this.GetFilePaths(folderName, pathToFolder);
		const itemFiles: string[] = filePaths.filter(file => file.endsWith('.ts'));
		for (const file of itemFiles) {
			const filePath: string = pathToFileURL(file).href;
			const item: T = new (await import(filePath)).default();
			items.push(item);
		}
		return items;
	}

	protected static async GetFilePaths(folderName: string, pathToFolder: string): Promise<string[]> {
		const filePaths: string[] = [];
		const folders: Collection<string, string> = await this.GetFolders(folderName, pathToFolder);

		folders.forEach((value, key) => {
			const filePath: string = path.join(key, value);
			filePaths.push(filePath)
		});

		return filePaths;
	}

	protected static async GetFolders(folderName: string, pathToFolder: string): Promise<Collection<string, string>> {
		const folderCollection: Collection<string, string> = new Collection();
		const folderPath: string = path.join(pathToFolder, folderName);
		const folders: string[] = fs.readdirSync(folderPath);

		for (const folder of folders) {
			folderCollection.set(folderPath, folder);
		}

		return folderCollection;
	}
}