import {makeListOfLinksToResources, replaceLinksToResurces, createResourceUrl} from '../src/saveAllLinks.js';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as cheerio from 'cheerio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('test createResourceUrl', () => {
    const url1 = 'https://nodejs.org/en/knowledge/HTTP/servers/how-to-serve-static-files/';
    const resource1 = '/static/images/logo.svg';
    const result1 = 'https://nodejs.org/static/images/logo.svg';
    expect(createResourceUrl(url1, resource1)).toBe(result1);
    const url2 = 'https://jino.ru/help/faq/problems/error-403/';
    const resource2 = 'https://jino.ru/static/bld/help.js?ba437';
    const result2 = 'https://jino.ru/static/bld/help.js?ba437';
    expect(createResourceUrl(url2, resource2)).toBe(result2);
    const url3 = 'https://jino.ru/help/faq/problems/error-403/';
    const resource3 = 'https://google.com/problems/file.css';
    expect(createResourceUrl(url3, resource3)).toBeFalsy();
});

test('test makeListOfLinksToResources', () => {
    const directoryPath = 'home/alex/testing';
    const urlsToResources = 
    ['https://www.soldoutticketbox.com/images/logoweb.png',
    'https://nodejs.org/static/images/logo.css', 
    'https://asciinema.org/images/logo-red-949d10005bb389d1ae900a13b5ac53d7.js',
    'https://nodejs.org/static/create/file'];
    const result = [
        'home/alex/testing/www-soldoutticketbox-com-images-logoweb.png',
        'home/alex/testing/nodejs-org-static-images-logo.css',
        'home/alex/testing/asciinema-org-images-logo-red-949d10005bb389d1ae900a13b5ac53d7.js',
        'home/alex/testing/nodejs-org-static-create-file.html'];
    expect(makeListOfLinksToResources(directoryPath, urlsToResources)).toEqual(result);
});

test('test replaceLinksToResources', async () => {
    const directoryPath = 'home/workspace/result';
    const data = await readFile(`${__dirname}/filesForTest/testForReplacingLinks.html`, 'utf-8');
    const result = await readFile(`${__dirname}/filesForTest/resultOfTestReplacingLinks2.html`, 'utf-8');
    const cheerioObjectExpected = cheerio.load(result).html();
    const cheerioObjectReceived = cheerio.load(replaceLinksToResurces(directoryPath, data)).html();
    await writeFile(`${__dirname}/filesForTest/test3.html`, cheerioObjectReceived);
    await writeFile(`${__dirname}/filesForTest/test4.html`, cheerioObjectExpected);

    expect(cheerioObjectReceived).toBe(cheerioObjectExpected);

})