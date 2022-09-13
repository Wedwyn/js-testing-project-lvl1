import createFileName from './createFileName.js';
import savePageInDirectory from './SavePageInDirectory.js';
import getPageFromUrl from './getPageFromUrl.js';


const main = (url, path) => {
    console.log(`Page was successfully downloaded into: ${path}`);
    const modifiedPath = `${path}/${createFileName(url)}`;
    getPageFromUrl(url).then(result => savePageInDirectory(modifiedPath, result.data));
}

export default main;