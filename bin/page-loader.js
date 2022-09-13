#!/usr/bin/env node

import { Command } from 'commander';
import main from "../src/main.js";

const program = new Command();

program // работа с Commander.js
    .name('page-loader')
    .description('Download page from website')
    .version('0.0.1')
    .argument('<url>', 'string')
    .option('-o, --output [dir]', `output dir`, '/home/wedwyn/test/downloads')
    .action((url, options) => main(url, options.output));


program.parse(process.argv);