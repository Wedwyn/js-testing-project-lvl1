import {createFileName, createDirectoryName} from './createNames.js';
import savePageInDirectory from './SavePageInDirectory.js';
import getPageFromUrl from './getPageFromUrl.js';
import { mkdir } from 'node:fs/promises';
import {saveImagesInDirectory} from './saveImages.js';


async function main(url, path) {

    const result = await getPageFromUrl(url);

    const directoryWithAllSavedStuff = createDirectoryName(url);
    const directoryPath = `${path}/${directoryWithAllSavedStuff}`;
    const htmlPagePath = `${directoryPath}/${createFileName(url)}`; 

    const createDir = await mkdir(directoryPath, { recursive: true });
    saveImagesInDirectory(directoryPath, result.data, url);
    savePageInDirectory(htmlPagePath, result.data);
    
    console.log(`Page was successfully downloaded into: ${directoryPath}`);
}

export default main;