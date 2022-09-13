const createFileName = (url) => {
    const urlWithoutProtocol =  url.split('://').slice(1).join('');
    let modifiedUrl = '';
    const allForbiddenSymbols = `!@#$%&*()+="';:{}[]~/.,`;
    for (let i = 0; i < urlWithoutProtocol.length; i +=1) {
        let currentSymbol = urlWithoutProtocol[i];
        if (allForbiddenSymbols.indexOf(currentSymbol) !== -1) {
            currentSymbol = '-';
        }
        modifiedUrl += currentSymbol;
    }
    return `${modifiedUrl}.html`;
}

export default createFileName;