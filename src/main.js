import { Command } from 'commander';
import createFileName from './createFileName.js';
import savePageInDirectory from './SavePageInDirectory.js';
import getPageFromUrl from './getPageFromUrl.js';


const program = new Command();

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
        getPageFromUrl(url).then(result => savePageInDirectory(modifiedPath, result.data));
    });

program.parse(process.argv);

