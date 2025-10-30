import path from "node:path";
import fs from "node:fs";
import { pathToFileURL } from "node:url";
import { Collection } from "discord.js";

/**
 * This class provides the base loading functionality required to load the events and commands from their respective directories
 */
export default abstract class BaseLoader {

	/**
	 * loads an array of type T items from a folder, ignoring any non-typescript files
	 * @param folderName 
	 * @param pathToFolder 
	 * @returns 
	 */
	public static async Load<T>(rootFolderName: string, pathToRootFolder: string): Promise<T[]> {
		const items: T[] = [];
		const filePaths: string[] = await this.GetFilePaths(rootFolderName, pathToRootFolder);
		//because we are loading typescript objects we are filtering out non-typescript files using the file extension
		const itemFiles: string[] = filePaths.filter(file => file.endsWith('.ts'));
		for (const file of itemFiles) {
			const filePath: string = pathToFileURL(file).href;
			const item: T = new (await import(filePath)).default();
			items.push(item);
		}
		return items;
	}

	/** 
	 * Creates an array of filePaths for loading files (specifically commands and events)
	 * @param folderName
	 * @param pathToFolder 
	 * @returns a string[] of filePaths
	*/
	protected static async GetFilePaths(rootFolderName: string, pathToRootFolder: string): Promise<string[]> {
		const filePaths: string[] = [];
		const folders: Collection<string, string> = await this.GetFolders(rootFolderName, pathToRootFolder);

		folders.forEach((value, key) => {
			//use the path (value) and the key (file/foldername) to get a full file path
			const filePath: string = path.join(value, key);
			filePaths.push(filePath)
		});

		return filePaths;
	}

	/**
	 * Creates a map of folders found inside a specified folder from a specified path to that folder
	 * @param folderName name of the folder containing the folders we are retrieving
	 * @param pathToFolder path to the folder named above
	 * @returns a discord.js Collection<string, string> (extends the javascript map) where the key is the path to the gathered folder(s) and the value is the name of each folder
	 */
	protected static async GetFolders(rootFolderName: string, pathToRootFolder: string): Promise<Collection<string, string>> {
		const folderCollection: Collection<string, string> = new Collection();
		const folderPath: string = path.join(pathToRootFolder, rootFolderName);
		console.log(folderPath);
		//readdirSync returns an array of file/folder names in the directory whose path is passed as an argument
		const folders: string[] = fs.readdirSync(folderPath);
		console.log(folders);

		for (const folder of folders) {
			//Set folder as the key as the path does not change and will overwrite instead
			folderCollection.set(folder, folderPath);
		}

		return folderCollection;
	}
}