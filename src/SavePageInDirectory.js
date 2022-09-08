import { writeFile } from 'node:fs/promises';

const SavePageInDirectory = (path, data) => {
    writeFile(`${path}`, data);
}

export default SavePageInDirectory;