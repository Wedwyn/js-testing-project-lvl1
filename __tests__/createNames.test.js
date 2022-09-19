import {createFileName, createDirectoryName, createImageName} from '../src/createNames.js';

test('createFileName', () => {
    expect(createFileName('https://www.kinopoisk.ru')).toBe('www-kinopoisk-ru.html');
    expect(createFileName('https://ru.hexlet.io/courses')).toBe('ru-hexlet-io-courses.html');
    expect(createFileName('https://www.youtube.com/shorts/2ERjw5VFbaU')).toBe('www-youtube-com-shorts-2ERjw5VFbaU.html');
});

test('createDirectoryName', () => {
    expect(createDirectoryName('https://www.kinopoisk.ru')).toBe('www-kinopoisk-ru_files');
    expect(createDirectoryName('https://ru.hexlet.io/courses')).toBe('ru-hexlet-io-courses_files');
    expect(createDirectoryName('https://www.youtube.com/shorts/2ERjw5VFbaU')).toBe('www-youtube-com-shorts-2ERjw5VFbaU_files');
});

test('createImageName', () => {
    expect(createImageName('/images/prev/9bbd2aae400b961b2858977fb2ffdf3f_w200.png')).toBe('-images-prev-9bbd2aae400b961b2858977fb2ffdf3f-w200.png');
    expect(createImageName('/pub#lic/avatars/avat*ar_92080.jpg')).toBe('-pub-lic-avatars-avat-ar-92080.jpg');
    expect(createImageName('/wwwdata/www/skin/pusto.gif')).toBe('-wwwdata-www-skin-pusto.gif');
});




