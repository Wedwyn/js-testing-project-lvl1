#!/usr/bin/env node

import { Command } from 'commander';
import main from "../src/main.js";

const program = new Command();

program // работа с Commander.js
    .name('page-loader')
    .description('Download page from website')
    .version('0.1.0')
    .argument('<url>', 'string')
    .option('-o, --output [dir]', `output dir`, process.cwd())
    .action((url, options) => main(url, options.output));


program.parse(process.argv);