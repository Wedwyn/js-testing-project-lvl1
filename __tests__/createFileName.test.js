import createFileName from '../src/createFileName.js';

test('createFileName test one', () => {
    expect(createFileName('https://www.kinopoisk.ru')).toBe('www-kinopoisk-ru.html');
    expect(createFileName('https://ru.hexlet.io/courses')).toBe('ru-hexlet-io-courses.html');
    expect(createFileName('https://www.youtube.com/shorts/2ERjw5VFbaU')).toBe('www-youtube-com-shorts-2ERjw5VFbaU.html');
});

// NODE_OPTIONS=--experimental-vm-modules npx jest