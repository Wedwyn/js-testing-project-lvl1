import axios from 'axios';
const getPageFromUrl = async (url) => {
    return await axios.get(url);
}

export default getPageFromUrl;