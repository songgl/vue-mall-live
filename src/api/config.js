import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

let url = location.href.split(".com")[0] + '.com/'
// axios 配置
axios.defaults.baseURL = 'http://dspx.tstmobile.com/'
axios.defaults.withCredentials = false 
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'

// 请求时的拦截
axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {  // 当请求异常时做一些处理
  Vue.prompt({
    content: '错误的传参',
    type: 'error'
  })
  return Promise.reject(error);
});

// 响应时拦截
axios.interceptors.response.use((res) => {
  if(res.data.status === 'pending') {
    Vue.loginInvalid() // 调用登录失效的方法
  }
  return res;
},(err) => { // 当响应异常时做一些处理
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求错误'
        break

      case 401:
        err.message = '未授权，请登录'
        break

      case 403:
        err.message = '拒绝访问'
        break

      case 404:
        err.message = `请求地址出错: ${err.response.config.url}`
        break

      case 408:
        err.message = '请求超时'
        break

      case 500:
        err.message = '服务器内部错误'
        break

      case 501:
        err.message = '服务未实现'
        break

      case 502:
        err.message = '网关错误'
        break

      case 503:
        err.message = '服务不可用'
        break

      case 504:
        err.message = '网关超时'
        break

      case 505:
        err.message = 'HTTP版本不受支持'
        break

      default:
    }
  }
  Vue.prompt({
    content: err.message,
    type: 'error'
  })
  return Promise.reject(err);
});

// 封装post
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(params)) // 将参数序列化
    .then(res => {
      resolve(res.data);
    }, err => {
      reject(err);
    })
    .catch((error) => {
      reject(error)
    })
  })
}

// 封装get方法
export function get(url){
  return new Promise((resolve,reject) => {
    axios.get(url)
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}