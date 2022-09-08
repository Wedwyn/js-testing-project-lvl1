const createFileName = (url) => {
    const urlWithoutProtocol =  url.split('://').slice(1).join('');
    let modifiedUrl = '';
    for (let i = 0; i < urlWithoutProtocol.length; i +=1) {
        let currentSymbol = urlWithoutProtocol[i];
        if (currentSymbol === '.' || currentSymbol === '/'
        || currentSymbol === '_' || currentSymbol === '?') {
            currentSymbol = '-';
        }
        modifiedUrl += currentSymbol;
    }
    return `${modifiedUrl}.html`;
}

export default createFileName;