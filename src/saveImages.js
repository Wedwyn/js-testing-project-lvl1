import * as cheerio from 'cheerio';
import fs from 'node:fs';
import axios from 'axios';
import {createImageName} from './createNames.js';

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

const makeListOfLinksToImages = (directoryPath, urlsToImages) => {
    const pathToImages = [];
    for (let i = 0; i < urlsToImages.length; i += 1) {
        const fileName = createImageName(urlsToImages[i]);
        const filePath = `${directoryPath}/${fileName}`;
        pathToImages.push(filePath);
    }
    return pathToImages;
}

async function saveImagesInDirectory(directoryPath,data, url) {

    const $ = cheerio.load(data);
    const body = $('body');
    const images = body.find('img');
    const urlsToImages = [];
    images.each(function(i, item) {
        urlsToImages.push(item.attribs.src);
    });

    const pathToImages = makeListOfLinksToImages(directoryPath, urlsToImages);

    for (let i = 0; i < urlsToImages.length; i += 1) {
        await axios({
            method: 'get',
            url : createImageUrl(url, urlsToImages[i]),
            responseType: 'stream'
          })
            .then(function (response) {
              response.data.pipe(fs.createWriteStream(pathToImages[i]));
            });
    }
}
const replaceLinksToImages = (directoryPath, data) => {
    const $ = cheerio.load(data);
    const body = $('body');
    const images = body.find('img');
    const urlsToImages = [];
    images.each(function(i, item) {
        urlsToImages.push(item.attribs.src);
    });
    const pathToImages = makeListOfLinksToImages(directoryPath, urlsToImages);
    body.find('img').each(function(i, item) {
        item.attribs.src = `${pathToImages[i]}`;
    });
    return body.html();
    
}

export {saveImagesInDirectory, replaceLinksToImages, createImageUrl, makeListOfLinksToImages};

// https://page-loader.hexlet.repl.co/
// https://edgestile.com/works/show-work/1770/