import * as cheerio from 'cheerio';
import axios from 'axios';
import { writeFile } from 'node:fs/promises';
import {createResourceName, createFileName} from './createNames.js';

const createResourceUrl = (url, urlToResource) => {
    try { // если ссылка находится на этом же хосте
        new URL(urlToResource, url);
        try { // если путь до файла полный
            if (new URL(urlToResource).hostname) {
                return urlToResource;
            }
        }
        catch(e) { // если путь до файла относительный
            const host = new URL(url).hostname;
            return `${new URL(url).protocol}//${host}${urlToResource}`;
        }
    }
    catch(e) { // если ссылка ведет на другой хост
        return false;
    }

}

const makeListOfLinksToResources = (directoryPath, urlsToResources) => {
    const pathToResources = [];
    for (let i = 0; i < urlsToResources.length; i += 1) {
        let fileName = '';
        if (urlsToResources[i].indexOf('.') === -1) {
            fileName = createFileName(urlsToResources[i]);
        } else {
            fileName = createResourceName(urlsToResources[i]);
        }
        const filePath = `${directoryPath}/${fileName}`;
        pathToResources.push(filePath);
    }
    return pathToResources;
}

async function saveResourcesInDirectory(directoryPath, data, url) {

    const $ = cheerio.load(data);
    const html = $('html');
    const resources = html.find('link');
    const scripts = html.find('script');
    const urlsToResources = [];
    resources.each(function(i, item) {
        urlsToResources.push(item.attribs.href);
    });
    scripts.each(function(i, item) {
        urlsToResources.push(item.attribs.src);
    });

    const pathToResources = makeListOfLinksToResources(directoryPath, urlsToResources);

    for (let i = 0; i < urlsToResources.length; i += 1) {
        if (createResourceUrl(url, urlsToResources[i])) {
            const content = await axios.get(createResourceUrl(url, urlsToResources[i]));
            writeFile(pathToResources[i], content.data);
        }
    }
}

const replaceLinksToResurces = (directoryPath, data) => {
    const $ = cheerio.load(data);
    const html = $('html');
    const resources = html.find('link');
    const scripts = html.find('script');
    const urlsToResources = [];
    resources.each(function(i, item) {
        urlsToResources.push(item.attribs.href);
    });
    scripts.each(function(i, item) {
        urlsToResources.push(item.attribs.src);
    });
    const pathToResources = makeListOfLinksToResources(directoryPath, urlsToResources);
    $('html').find('link').each(function(i, item) {
        item.attribs.href = `${pathToResources[i]}`;
    });
    $('html').find('script').each(function(i, item) {
        item.attribs.src = `${pathToResources[i]}`;
    });
    return $.html();
}

// const directoryPath = '/home/wedwyn/test/downloads/links4';
// const url = 'https://page-loader.hexlet.repl.co/';
// const res = await axios.get(url);
// const data = res.data;
// await saveResourcesInDirectory(directoryPath, data, url);

export {makeListOfLinksToResources, replaceLinksToResurces, createResourceUrl, saveResourcesInDirectory};

// https://page-loader.hexlet.repl.co/
// https://edgestile.com/works/show-work/1770/