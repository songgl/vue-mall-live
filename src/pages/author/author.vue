<template>
  <div class="authorBox">
    <img src="../../assets/icon/loginImg.jpg" alt="">
    <div class="authorTxt">正在登录，请稍后...</div>
  </div>
</template>

<script>
import api from '../../api/api'
import storage from '../../common/storage'

export default {
  methods: {
    /*获取用户信息*/
    _getUserInfoFun () {
      api.getUserInfo()
      .then((res)=>{
        if(res.status ==='ok'){
          storage.s_setItem('userInfo',res.data)
          storage.l_setItem('openid',res.data.wx_openid || '')
          setTimeout(() => {
            this.goBeforeLoginUrl() // 页面恢复(进入用户一开始请求的页面)
          }, 1000)
        }else if(res.status === 'error'){
          console.log(res)
        }else if (data['error'] === 'token failed') {
          console.log("token failed")
        }
      }).catch((e) => {
        console.log(e)
      })
    },
  },
  created () {
    // 检测有没有登录
    // if (this.getCookie("user", {path: "/"})) {
    //   let user = unescape(this.getCookie("user", {path: "/"}))
    //   let member = {}
    //   if (user.indexOf("{") == 0) {
    //     member = JSON.parse(user)
    //   } else {
    //     member = JSON.parse(user.slice(6))
    //   }
    //   storage.s_setItem('uid', member.member_id)
    //   storage.s_setItem('token', member.app_token)
    //   storage.l_setItem("openid",member.wx_openid)
    //   this._getUserInfoFun();
    // } else {
    //   this.setCookie("url", window.location.href, {path: "/"});
    //   window.location.href = location.href.split(".com")[0] + '.com/api/login/weixin'
    // }
    
    if(!storage.s_getItem('uid') && !storage.s_getItem("token")){
      storage.s_setItem("uid",'8366')
			storage.s_setItem("token",'5a04484fde7e3')
			this._getUserInfoFun()
    }else{
      // 如果有token 但是vuex中没有用户登录信息则做登录操作
      this._getUserInfoFun()
    }
	}
}
</script>

<style scoped>
	.authorBox {
    width: 100%;
    height: 100%;
    overflow:
    hidden;
    position:relative;
  }
  .authorTxt {
    position: absolute;
    top:.2rem;
    right: .2rem;
    height: .6rem; 
    border-radius: .3rem;
    background-color: rgba(0,0,0,.8);
    font-size: .28rem;
    padding:0 .2rem 0 .2rem;
    color:#fff;
    line-height: .6rem;
  }
</style>
