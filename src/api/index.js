/**
 * Created by 郭泽伟 on 2017/7/30.
 */
import config from '../config'
import router from '../routers'
const baseURL = config.host;
import store from '../stores';
// const axios = require('axios').create({
//     baseURL: baseURL,
//     timeout: 10000,
//     withCredentials: true, // 允许跨域 cookie
//     headers: { 'X-Requested-With': 'XMLHttpRequest' },
//     transformResponse: [function (data) {
//         let json = {};
//
//         try {
//             json = JSON.parse(data);
//         } catch (e) {
//             json = {};
//         }
//
//         if (json.msg === 'session error') {
//             console.log('session error');
//             router.push('/login');
//         }
//
//         return json;
//     }],
// });
const axios = require('axios').create({
    baseURL: baseURL,            //api请求的baseURL
    timeout: 25000,
    withCredentials: true, // 允许跨域 cookie
    headers: {'X-Requested-With': 'XMLHttpRequest'},
});
// request拦截器
axios.interceptors.request.use(config => {
    // Do something before request is sent
    if (store.getters.token) {
        config.headers['X-Token'] = store.getters.token; // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    }
    return config;
}, error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
});

// respone拦截器
axios.interceptors.response.use(response => {
    if (response.data.status == -1) {
        router.push('/login');
    }
    return response;
})


//get
export const _get = (req) => {
    return axios.get(req.url, {params: req.data})
};

// post
export const _post = (req) => {
    return axios({method: 'post', url: `/${req.url}`, data: req.data})
};
