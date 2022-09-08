import { Command } from 'commander';
import axios from 'axios';
import createFileName from './createFileName.js';
import savePageInDirectory from './SavePageInDirectory.js';


const program = new Command();

const getPageFromUrl = async (url) => {
    return await axios.get(url);
}

program // работа с Commander.js
    .name('page-loader')
    .description('Download page from website')
    .version('0.0.1')
    .argument('<url>', 'string')
    .option('-o, --output [dir]', `output dir`, '/home/wedwyn/test/downloads')
    .action((url, options) => {
        const path = options.output;
        console.log(`This is path: ${path}`);
        const modifiedPath = `${path}/${createFileName(url)}`;
        getPageFromUrl(url).then(result => SavePageInDirectory(modifiedPath, result.data));
    });

program.parse(process.argv);

