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
    const answer = await readFile(`${__dirname}/filesForTestMain/bodyForTestMain.txt`);
    const scope = nock('https://page-loader.hexlet.repl.co/')
    .get('/')
    .reply(200, answer, {
        'Content-Type': 'text/html',
      })
    .get('/assets/professions/nodejs.png')
    .replyWithFile(200, `${__dirname}/filesForTestMain/image.png`, {
        'Content-Type': 'image/png'
    });
    await main('https://page-loader.hexlet.repl.co/', `${__dirname}${tempDirectoryName}`);
    const files = await readdir(`${__dirname}${tempDirectoryName}/page-loader-hexlet-repl-co-_files`);
    const countOfHtmlFiles = files.filter((el) => el.split(el.lastIndexOf('.') === 'html')).length;
    const countOfImageFiles = files.filter((el) => el.split(el.lastIndexOf('.') === 'png')).length;
    expect(countOfHtmlFiles+countOfImageFiles).toBe(2);

});