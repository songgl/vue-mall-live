<template>
  <div class="pageBox">
    <my-header :titleTxt="'个人信息'"></my-header>
    <div class="box_touch">
    	<div class="userHeaderBox box_between">
				<div class="title">头像</div>
				<div class="userImgBox">
					<img :src="userInfo.header_img" alt="头像" />	
					<form>
						<input id="file" class="userFile" type="file" @change="_upImg($event)" name="img" >
					</form>
				</div>
			</div>
			<div class="userBox">
				<div class="box_between userItem">
					<div class="title">手机号码</div>
					<div v-text="userInfo.phone ? userInfo.phone : '未绑定手机'"></div>
				</div>
				<div class="box_between userItem">
					<div class="title">昵称</div>
					<div class="userName">
						<input v-model="userInfo.username" type="text" placeholder="用户名">
					</div>
				</div>
				<div class="box_between userItem">
					<div class="title">性别</div>
					<div class="userSex">
						<div class="box_center" v-text="userInfo.sex == '1' ? '男' : '女' "></div>
            <select v-model="userInfo.sex" class="sexSelect">
              <option value="1">男</option>
              <option value="2">女</option>
            </select>
					</div>
				</div>
			</div>
			<div class="userBox">
				<div class="box_start userItem">
					<span class="title">签名</span>
				</div>
				<div class="textareaBox">	
					<textarea v-model="userInfo.signature" maxlength="200" placeholder="您的意见对我们非常重要"></textarea>
				</div>
			</div>
    </div>
    <div class="box_center">
			<div class="box_center footerBtn" @click="_editUserInfo()">保存修改</div>
		</div>
  </div>
</template>

<script>
import api from '../../api/api'
import MyHeader from '../../components/header/header'
import storage from '../../common/storage'

export default {
	data () {
		return {
			userInfo: {}
		}
	},
  methods: {
  	/*
  	* 获取用户信息
  	*/
  	_getUserInfo () {
  		api.getUserInfo()
  		.then((res) => {
  			if(res.status === 'ok'){
  				this.userInfo = res.data
  				storage.s_setItem('userInfo',res.data)
  			}else if(res.status === 'error'){
  				console.log(res.error)
  				this.promptFun({
  					content: res.data,
  					type: 'error'
  				})
  			}
  		})
  	},
  	/*
  	* 上传图片
  	* 单张
  	*/
  	_upImg (e) {
  		api.upImg(e)
  		.then((res) => {
  			if(res.status === 'ok'){
  				this.userInfo.header_img = res.data[0]
  			}else if(res.status === 'error'){
  				this.promptFun({
  					content: res.data,
  					type: 'error'
  				})
  			}
  		})
  	},
  	/*
  	* 修改个人信息
  	*/
  	_editUserInfo () {
  		api.editUserInfo({
  			username: this.userInfo.username,
  			header_img: this.userInfo.header_img,
  			sex: this.userInfo.sex,
  			signature: this.userInfo.signature
  		})
  		.then((res) => {
  			if(res.status === 'ok'){
  				this.promptBackFun({
  					content: '修改成功',
  					type: 'success'
  				})
  			}else if(res.status === 'error'){
  				this.promptFun({
  					content: res.data,
  					type: 'error'
  				})
  			}
  		})
  	}
  },
  created () {
  	this._getUserInfo();
  },
  components: {
  	MyHeader
  }
}
</script>

<style scoped>
	.userHeaderBox{
		height: 1.6rem;
		padding: 0 .2rem 0 .2rem;
		background-color: #fff;
		font-size: .24rem;
	}
	.userImgBox{
		width: 1.2rem;
		height: 1.2rem;
		position: relative;
	}
	.userImgBox img{
		border-radius: 50%;
	}
	.userFile{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
	.userBox {
		background-color: #fff;
		margin-top: .2rem;
	}
	.userItem{
		height: .9rem;
		padding: 0 .2rem 0 .2rem;
		border-top: 1px solid #e5e5e5;
		font-size: .24rem;
		color: #666;
	}
	.title{
		font-size: .28rem;
		color:#333;
	}
	.userName input{
		width: 2.4rem;
		text-align: right;
		color: #666
	}
	.userSex {
		position: relative;
		height: .4rem;
		width: .5rem;
	}
	.sexSelect{
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
	.textareaBox{
		height: 1.6rem;
		padding: .2rem;
	}
	.textareaBox textarea{
		max-width: 100%;
		min-width: 100%;
		max-height: 100%;
		min-height: 100%;
		font-size: .24rem;
	}
	.footerBtn {
		width: 90%;
		height: .8rem;
		color: #fff;
		font-size: .32rem;
		background-color: red;
		border-radius: .06rem;
		margin:.2rem 0 .2rem 0;
	}
</style>
