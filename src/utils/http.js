import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import Storage from '@/utils/storage'



// 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    // baseURL: "http://47.75.131.168:3030",
    timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
    if (store.getters.token) {
        const token = Storage.get("token")
        if (token) {
            config.headers['authorization'] = token.token // 让每个请求携带自定义token 请根据实际情况自行修改
        }
    }
    return config
}, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.status !== 'sucess') {
            if (res.msg === "未登录") {
                Message({
                    message: "未登录，请重新登录！",
                    type: 'error',
                    duration: 3 * 1000,
                    onClose: ()=>{
                        store.dispatch('FedLogOut').then(() => {
                            location.href = "/login";
                        })
                    }
                })
            }else{
                Message({
                    message: res.msg,
                    type: 'error',
                    duration: 5 * 1000
                })
            }
            return false;
        } else {
            return response.data.data
        }
    },
    error => {
        console.log('err' + error)// for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
