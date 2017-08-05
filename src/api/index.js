/**
 * Created by 郭泽伟 on 2017/7/30.
 */
import config from '../config'
const baseURL = config.host;

const axios = require('axios').create({
    baseURL: baseURL,
    timeout: 10000,
    withCredentials: true, // 允许跨域 cookie
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    transformResponse: [function (data) {
        let json = {};

        try {
            json = JSON.parse(data);
        } catch (e) {
            json = {};
        }

        if (json.msg === 'session error') {
            console.log('session error');
            router.push('/login');
        }

        return json;
    }],
});
//get
export const _get = (req)=>{
    return axios.get(req.url, {params: req.data})
}

// post
export const _post = (req) => {
    return axios({ method: 'post', url: `/${req.url}`, data: req.data })
}
