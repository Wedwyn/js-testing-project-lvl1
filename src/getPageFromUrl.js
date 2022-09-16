import axios from 'axios';
async function getPageFromUrl(url) {
    return axios.get(url);
}

export default getPageFromUrl;