// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import util from './common/util'
import storage from './common/storage'

import errorImg from './assets/icon/error.png'
import loadingImg from './assets/icon/loading.png'

Vue.config.productionTip = false

// 公用操作方法插件
Vue.use(util);

// 图片懒加载
Vue.use(VueLazyload, {
  error: errorImg, // 图片路径错误时加载图片
  loading: loadingImg // 预加载图片
})

// 实现登录后跳转方法
Vue.prototype.goBeforeLoginUrl = () => {
  let url = storage.s_getItem('beforeLoginUrl')
  if(!url || url.indexOf('/author') != -1){
    router.push('/home')
  }else{
    if(url == '/'){
      url = '/home'
    }
    router.push(url)
    storage.s_setItem('beforeLoginUrl', '')
  }
}

// 登录失效方法
Vue.loginInvalid  = () => {
  storage.s_clear() // 清空所有sessionStorage
  storage.s_setItem('beforeLoginUrl',router.history.current.path) // 保存用户进入的url
  router.push('/author')
  return false
}

/*
* 路由钩子函数
* url进入网站都会先触发router.beforeEach钩子
*/
router.beforeEach((to, from, next) => {
  if(to.path == '/author' && storage.s_getItem('uid') && storage.s_getItem('token')){
    // 用户使用后退返回到授权页，则默认回到首页
    next('/home')
    return false
  }
  /*
  * 判断sessionStorage里有没有用户信息
  * 并且是否是微信授权页
  */
  if(!storage.s_getItem('uid') && !storage.s_getItem('token') && to.path !='/author'){
    storage.s_setItem('beforeLoginUrl', to.fullPath) // 保存用户进入的url
    next('/author') // 进入到微信授权页
    return false
  }else {
    next()
  }
})

// 判断数组中有没有某个属性
Array.prototype.contains = function(obj) {
  console.log(this);
  for (var i = 0; i < this.length + 1; i++) {
    if (this[i] == obj) {
      return true;
    }
  }
  return false;
}

/** 
* 删除数组指定下标或指定对象 
**/ 
Array.prototype.remove=function(obj){ 
  for(var i =0;i <this.length;i++){ 
    var temp = this[i]; 
    if(!isNaN(obj)){ 
    temp=i; 
  } 
  if(temp == obj){ 
    for(var j = i;j <this.length;j++){ 
      this[j]=this[j+1]; 
    } 
    this.length = this.length-1; 
    } 
  } 
}


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
