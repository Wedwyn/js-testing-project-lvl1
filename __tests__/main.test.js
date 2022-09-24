import main from '../src/main.js';
import nock from 'nock';
import { readdir, rmdir, mkdtemp, readFile } from 'node:fs/promises';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let tempDirectoryName;

beforeEach(async () => {
    tempDirectoryName = await mkdtemp(path.join(os.tmpdir(), 'page-loader-'));
  });

afterEach(async () => {
    await rmdir(`${__dirname}/tmp`, { recursive: true });
});

test('test main.js', async () => {
    const answer = await readFile(`${__dirname}/filesForTest/bodyForTestMain.txt`, 'utf-8');
    const cssFile = await readFile(`${__dirname}/filesForTest/cssForTest.txt`, 'utf-8');
    const scriptFile = await readFile(`${__dirname}/filesForTest/scriptForTest.txt`, 'utf-8');
    const localFileInMain = await readFile(`${__dirname}/filesForTest/LocalFileInMainFile.txt`, 'utf-8');
    // console.log(localFileInMain);
    const scope = nock('https://page-loader.hexlet.repl.co/')
    .persist()
    .get('/')
    .reply(200, answer, {
        'Content-Type': 'text/html',
      })
    .get('/assets/professions/nodejs.png')
    .replyWithFile(200, `${__dirname}/filesForTest/image.png`, {
        'Content-Type': 'image/png'
    })
    .get('/assets/application.css')
    .reply(200, cssFile, {
        'Content-Type': 'text/css',
    })
    .get('/script.js')
    .reply(200, scriptFile, {
        'Content-Type':  'text/js',
    })
    .persist()
    .get('/courses')
    .reply(200, localFileInMain, {
        'Content-Type': 'text/html',
    });

    await main('https://page-loader.hexlet.repl.co/', `${__dirname}${tempDirectoryName}`);
    const files = await readdir(`${__dirname}${tempDirectoryName}/page-loader-hexlet-repl-co-_files`);
    expect(files.length).toBe(5);
    scope.done();

});