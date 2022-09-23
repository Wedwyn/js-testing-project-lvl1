import {createImageUrl, replaceLinksToImages, makeListOfLinksToImages} from '../src/saveImages.js';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as cheerio from 'cheerio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('test createImageUrl', () => {
    const url1 = 'https://nodejs.org/en/knowledge/HTTP/servers/how-to-serve-static-files/';
    const image1 = '/static/images/logo.svg';
    const result1 = 'https://nodejs.org/static/images/logo.svg';
    expect(createImageUrl(url1, image1)).toBe(result1);
    const url2 = 'https://www.soldoutticketbox.com/easyconsole.cfm/page/select_seats_newil/block_id/1685&event_day_id=7433&lang=ru';
    const image2 = '/images/logoweb.png';
    const result2 = 'https://www.soldoutticketbox.com/images/logoweb.png';
    expect(createImageUrl(url2, image2)).toBe(result2);
});

test('test makeListOfLinksToImages', () => {
    const directoryPath = 'home/alex/testing';
    const urlsToImages = 
    ['https://www.soldoutticketbox.com/images/logoweb.png',
    'https://nodejs.org/static/images/logo.svg', 
    'https://asciinema.org/images/logo-red-949d10005bb389d1ae900a13b5ac53d7.svg'];
    const result = [
        'home/alex/testing/www-soldoutticketbox-com-images-logoweb.png',
        'home/alex/testing/nodejs-org-static-images-logo.svg',
        'home/alex/testing/asciinema-org-images-logo-red-949d10005bb389d1ae900a13b5ac53d7.svg'
    ];
    expect(makeListOfLinksToImages(directoryPath, urlsToImages)).toEqual(result);

})

test('replaceLinksToImages', async () => {
    const directoryPath = 'home/workspace/result';
    const data = await readFile(`${__dirname}/filesForTest/testForReplacingLinks.html`, 'utf-8');
    const result = await readFile(`${__dirname}/filesForTest/resultOfTestReplacingLinks.html`, 'utf-8');
    const cheerioObjectExpected = cheerio.load(result).html();
    const cheerioObjectReceived = cheerio.load(replaceLinksToImages(directoryPath, data)).html();
    await writeFile(`${__dirname}/filesForTest/test1.html`, cheerioObjectReceived);
    await writeFile(`${__dirname}/filesForTest/test2.html`, cheerioObjectExpected);

    expect(cheerioObjectReceived).toBe(cheerioObjectExpected);
})