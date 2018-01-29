/****************
* 封装vue全局操作方法
****************/
import store from '../store'

export default{
  install(Vue,options){
  	/*------------- cookie 操作 start -------------*/
    //获取cookie
    Vue.prototype.getCookie = function (name) {
		 	let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		 	if (arr = document.cookie.match(reg))
		  	return (arr[2]);
		 	else
		  	return null;
		}
		
		//设置cookie
		Vue.prototype.setCookie = function (c_name, value, expiredays) {
		 	let exdate = new Date();
		 	exdate.setDate(exdate.getDate() + expiredays);
		 	document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
		}

		//删除cookie
		Vue.prototype.removeCookie = function (name) {
		 	let exp = new Date();
		 	exp.setTime(exp.getTime() - 1);
		 	let cval = getCookie(name);
		 	if (cval != null)
		  	document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
		}
		/*------------- cookie 操作 end -------------*/

		/*------------- 提示操作 start -------------*/
		Vue.prompt = function(obj){
			store.dispatch('setPromptState', true)
	    store.dispatch('setPromptTxt', obj)
	    setTimeout(() => {
	      store.dispatch('setPromptState', false)
	    },1500);
		}
		Vue.prototype.promptFun = function(obj) { // obj(提示文本，类型等)
			store.dispatch('setPromptState', true)
	    store.dispatch('setPromptTxt', obj)
	    setTimeout(() => {
	      store.dispatch('setPromptState', false)
	    },1500);
		}
		// 提示后返回上一页
		Vue.prototype.promptBackFun = function(obj) {
			store.dispatch('setPromptState', true)
	    store.dispatch('setPromptTxt', obj)
	    setTimeout(() => {
	      store.dispatch('setPromptState', false)
	      history.back()
	    },1500);
		}
		/*------------- 提示操作 end -------------*/

		// loading 操作
		Vue.prototype.setLoading = function (state) {
			if(state){
				store.dispatch('setLoading', state)
			}else{
				setTimeout(function() {
					store.dispatch('setLoading', state)
				}, 800);
			}
			
		}

		//返回上一页
		Vue.prototype.backFun = function () {
			history.back()
		}
		
		//返回上上一页
		Vue.prototype.backTwoFun = function () {
			history.go(-2)
		}
  }
}