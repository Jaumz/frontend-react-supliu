import axios from 'axios';

const apiKey = axios.create({
    baseURL: 'https://tiao.supliu.com.br/api/',
})

export default apiKey;