import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-app-amasenov.firebaseio.com/'
});

export default instance;