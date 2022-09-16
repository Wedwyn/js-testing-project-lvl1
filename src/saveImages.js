import * as cheerio from 'cheerio';
import fs from 'node:fs';
import axios from 'axios';
import {createImageName} from './createFileName.js';

const createImageUrl = (url, urlToImage) => {
    try { // если путь до изображения полный
        const host = new URL(urlToImage).hostname;
        return urlToImage;
    }
    catch(e) { // если путь до изображения относительный
        const host = new URL(url).hostname;
        return `${new URL(url).protocol}//${host}${urlToImage}`;
    }

}

async function saveImagesInDirectory(directoryPath, data, url) {

    const $ = cheerio.load(data);
    const body = $('body');
    const images = body.find('img');
    const urlsToImages = [];
    images.each(function(i, item) {
        urlsToImages.push(item.attribs.src);
    });

    for (let i = 0; i < urlsToImages.length; i += 1) {
        const fileName = createImageName(urlsToImages[i]);
        const filePath = `${directoryPath}/${fileName}`;
        await axios({
            method: 'get',
            url : createImageUrl(url, urlsToImages[i]),
            responseType: 'stream'
          })
            .then(function (response) {
              response.data.pipe(fs.createWriteStream(filePath));
            });
    }
}

export {saveImagesInDirectory};
// https://page-loader.hexlet.repl.co/
// https://edgestile.com/works/show-work/1770/