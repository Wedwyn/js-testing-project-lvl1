const createFileName = (url) => {
    const urlWithoutProtocol =  url.split('://').slice(1).join('');
    let modifiedUrl = '';
    const allForbiddenSymbols = `!@#$%&*()+="';:{}[]~/.,_`;
    for (let i = 0; i < urlWithoutProtocol.length; i +=1) {
        let currentSymbol = urlWithoutProtocol[i];
        if (allForbiddenSymbols.indexOf(currentSymbol) !== -1) {
            currentSymbol = '-';
        }
        modifiedUrl += currentSymbol;
    }
    return `${modifiedUrl}.html`;
}

const createDirectoryName = (url) => {
    const urlWithoutProtocol =  url.split('://').slice(1).join('');
    let modifiedUrl = '';
    const allForbiddenSymbols = `!@#$%&*()+="';:{}[]~/.,_`;
    for (let i = 0; i < urlWithoutProtocol.length; i +=1) {
        let currentSymbol = urlWithoutProtocol[i];
        if (allForbiddenSymbols.indexOf(currentSymbol) !== -1) {
            currentSymbol = '-';
        }
        modifiedUrl += currentSymbol;
    }
    return `${modifiedUrl}_files`;
}

const createImageName = (url) => {
    let urlWithoutProtocol = url.slice(0, url.lastIndexOf('.'));
    if (urlWithoutProtocol.indexOf('://') !== -1) {
        urlWithoutProtocol =  url.slice(0, url.lastIndexOf('.')).split('://').slice(1).join('');
    }
    let modifiedUrl = '';
    const allForbiddenSymbols = `!@#$%&*()+="';:{}[]~/.,_`;
    for (let i = 0; i < urlWithoutProtocol.length; i +=1) {
        let currentSymbol = urlWithoutProtocol[i];
        if (allForbiddenSymbols.indexOf(currentSymbol) !== -1) {
            currentSymbol = '-';
        }
        modifiedUrl += currentSymbol;
    }
    return `${modifiedUrl}${url.slice(url.lastIndexOf('.'))}`;
}

export {createFileName, createDirectoryName, createImageName};