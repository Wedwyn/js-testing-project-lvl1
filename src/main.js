import {createFileName, createDirectoryName} from './createNames.js';
import savePageInDirectory from './SavePageInDirectory.js';
import getPageFromUrl from './getPageFromUrl.js';
import { mkdir } from 'node:fs/promises';
import {saveImagesInDirectory, replaceLinksToImages} from './saveImages.js';
import {saveResourcesInDirectory, replaceLinksToResurces} from './saveAllLinks.js';

async function main(url, path) {

    const result = await getPageFromUrl(url);

    const directoryWithAllSavedStuff = createDirectoryName(url);
    const directoryPath = `${path}/${directoryWithAllSavedStuff}`;
    const htmlPagePath = `${directoryPath}/${createFileName(url)}`; 

    await mkdir(directoryPath, { recursive: true });
    await saveImagesInDirectory(directoryPath, result.data, url);
    const PageWithLocalImages = replaceLinksToImages(directoryPath, result.data);
    await saveResourcesInDirectory(directoryPath, result.data, url);
    const finishedPage = replaceLinksToResurces(directoryPath, PageWithLocalImages);
    savePageInDirectory(htmlPagePath, finishedPage);

    console.log(`Page was successfully downloaded into: ${directoryPath}`);
}

export default main;