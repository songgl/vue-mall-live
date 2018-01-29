<template>
  <div class="liveRoomBox" @click="play">
		<div class="videoBox">
			<video ref="myVideo" width="100%" height="100%" preload="auto" poster="" webkit-playsinline="true" x-webkit-airplay="true" x5-video-player-type="h5" x5-video-player-fullscreen="true"></video>
		</div>
		<div class="playImg" v-show="playImgState">
			<img :src="liveInfo.play_img" alt="" />
		</div>
		<div class="play_icon palyBtn" v-show="playImgState"></div>
		<!-- 消息区 -->
		<div class="msgBox">
			<div class="msgListBox" v-for='item in chatInfo'>
				<span :style='{color: item.nameColor}' v-text="item.name + ':'"></span>
				<span :style='{color: item.txtColor}' v-text="item.content"></span>
			</div>
			<div id="bottomBox"></div>
		</div>
		<live-top></live-top>
		<room-bottom @on-open="onOpen"></room-bottom>
		<live-goods :state='btnType' @on-close="onClose"></live-goods>
		<input-model :state='btnType' @on-close="onClose" @on-send="sendMsg"></input-model>
		<gift :state='btnType' @on-close="onClose" @on-send='sendGiftMsg'></gift>
	</div>
</template>

<script>
import storage from '../../common/storage'
import api from '../../api/live'
import LiveTop from './private/liveTop'
import RoomBottom from './private/roomBottom'
import InputModel from './private/inputModel'
import LiveGoods from './private/liveGoods'
import gift from './private/gift'
import { mapMutations, mapActions } from 'vuex'

export default {
	data () {
		return {
			videoSrc: null,
			playImgState: true,
			btnType: null,
			chatInfo: [],
			liveInfo: {}
		}
	},
  methods: {
  	...mapActions([
  		'setLiveInfo',
  		'setGiftNum',
  		'setLiveUserInfo',
  		'setPeopleNum',
  		'setIsFollow'
  	]),
  	// 播放
  	play () {
  		this.playImgState = false
  		this.$refs.myVideo.play();
  	},
  	// model 打开事件
  	onOpen (type) {
  		this.btnType = type
  	},
  	// model 关闭事件
  	onClose (type) {
  		this.btnType = null
  	},
  	// 进入直播间
  	_intoLiveRoom () {
  		api.intoLiveRoom(this.$route.query.live_id)
  		.then((res) => {
  			console.log(res)
  			if(res.status === 'ok'){
  				this.setIsFollow(res.data.is_follow)
  				this.chatInfo.push({
  					name: '直播消息',
  					content: res.data.prompt,
  					txtColor: '#d55343',
  					nameColor: '#fff'
  				})
  			}else if(res.status === 'error'){
  				this.promptBackFun({
  					content: res.data,
  					type: 'error'
  				})
  			}
  		})
  	},
  	// 获取直播信息
  	_getLiveInfo () {
  		api.getLiveInfo(this.$route.query.live_id)
  		.then((res) => {
  			console.log(res)
  			if(res.status === 'ok'){
  				this.liveInfo = res.data
  				this.setLiveInfo(res.data)
  				this.$nextTick(function(){
		  			this.$refs.myVideo.src = res.data.play_address_m3u8
					})
					this._getGiftCount(res.data.user_id)
  			}else if(res.status === 'error'){
  				this.prompt({
  					content: res.data,
  					type: 'error'
  				})
  			}
  		})
  	},
  	// 获取直播间人数
  	_getRoomUser () {
  		api.getRoomUser(this.$route.query.live_id)
  		.then((res) => {
  			if(res.status === 'ok'){
  				this.setLiveUserInfo(res.data.list)
  				this.setPeopleNum(res.data.count)
  			}
  		})
  	},
  	// 获取主播收到的礼物数量
  	_getGiftCount (id) {
  		api.getGiftCount(id)
  		.then(res => {
  			if(res.status === 'ok'){
  				this.setGiftNum(res.data)
  			}else if(res.status === 'error'){
  				this.prompt({
  					content: res.data,
  					type: 'error'
  				})
  			}
  		})
  	},
  	// 发送礼物消息
  	sendGiftMsg (obj,num) {
  		this.chatInfo.push({
				name: storage.s_getItem('userInfo').username,
				content: '送了' + num + '个' + obj.name,
				txtColor: '#e4c931',
				nameColor: '#fff'
			})
  	},
  	// 发送普通消息
  	sendMsg (msg){
  		this.chatInfo.push({
  			name: storage.s_getItem('userInfo').username,
  			content: msg,
  			txtColor: '#e4c931',
				nameColor: '#fff'
  		})
  	}

  },
  created () {
  	this._intoLiveRoom()
  	this._getLiveInfo()
  },
  mounted () {
  	this._getRoomUser()
  },
  components: {
  	RoomBottom,
  	InputModel,
  	LiveGoods,
  	gift,
  	LiveTop
  }
}
</script>

<style scoped>
	.liveRoomBox{
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: relative;
	}
	.videoBox{
		width: 100%;
		height: 100%;
	}
	.videoBox video{
		object-fit: cover;
		border: 0px;
		background: rgb(0, 0, 0);
	}
	.playImg{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.playImg img { 
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		object-fit: cover;
		filter: blur(4px);
	}
	.palyBtn{
		width: 1rem;
		height: 1rem;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -0.5rem;
		margin-top: -0.5rem;
	}
	.msgBox{
		position: fixed;
		width: 70%;
		left: 0;
		bottom: 1.4rem;
		overflow-y: scroll;
		padding: .2rem;
		max-height: 4.4rem;
	}
	.msgListBox{
		padding-bottom: .1rem;
		font-size: .24rem;
	}
</style>
