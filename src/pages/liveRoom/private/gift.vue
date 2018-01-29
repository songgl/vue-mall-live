<template>
  <div class="box box_direction" v-if="state == 3">
		<div class="grid_cell" @click.stop="close"></div>
		<div class="content">
			<div class="flex_wrap box_start media giftBox">
				<!--列表-->
				<div class="giftItem" :class="{act: onGift.gift_id == item.gift_id}" @click.stop="giftClick(item)" v-for="item in giftList" :key="item.gift_id">
					<div class="giftImg">
						<img :src="item.img" alt="">
					</div>
					<div class="giftTxt">
						<div v-text="item.name"></div>
						<div><em v-text="item.price"></em>钻石</div>
					</div>
				</div>
			</div>
			<div class="box_between bottom">
				<router-link to="my_account" class="box_start">
					<div class="diamonds_icon d_icon"></div>
					<div class="d_count" v-text="userMoney"></div>
					<div class="left_yellow_icon"></div>
				</router-link>
				<div class="box_end">
					<div class="box_start numInput">
						数量：
						<input v-model="num" type="tel" />
					</div>
					<div class="giftBtn" @click.stop="sendBtnClick()">发送</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import api from '../../../api/live'

export default {
	props: ['state'],
	data () {
		return {
			giftList: [],
  		onGift: {},
  		num: 1,
  		userMoney: null
		}
	},
  methods: {
  	// 关闭
  	close () {
  		this.$emit('on-close',3)
  	},
  	// 选择礼物
  	giftClick (item) {
  		this.onGift = item
  	},
  	// 获取礼物列表
  	_getGift () {
  		api.getGift()
  		.then(res => {
  			console.log(res)
  			if(res.status === 'ok'){
  				this.giftList = res.data
  				this.giftClick(res.data[0]) // 默认选择第一个
  			}else if(res.status === 'error'){
  				this.promptFun({
  					content: res.data,
  					type: 'error'
  				})
  			}
  		})
  	},
  	// 获取账号余额
  	_getUserMoney () {
  		api.getUserMoney()
  		.then(res => {
  			if(res.status === 'ok'){
  				this.userMoney = res.data.money
  			}else if(res.status === 'error'){
  				this.promptFun({
  					content: res.data,
  					type: 'error'
  				})
  			}
  		})
  	},
  	
  	// 发送礼物
  	sendBtnClick () {
  		api.sendGift({
  			live_id : this.$route.query.live_id,
        gift_id : this.onGift.gift_id,
        number : this.num
  		}).then(res => {
  			if(res.status === 'ok'){
  				this.$emit('on-send',this.onGift,this.num)
  				this._getUserMoney()
  				this.close()
  				this.num = 1
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
  	this._getGift()
  	this._getUserMoney()
  }
}
</script>

<style scoped>
	.box{
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.content{
		position: relative;
		background-color: rgba(0,0,0,.8);
	}
	.giftBox{
		overflow-y: scroll;
		height: 4.4rem;
	}
	.giftItem{
		width: 20%;
		padding: 0 .2rem;
	}
	.act{
		border: 1px solid red;
	}
	.giftImg {
		width: 100%;
	}
	.giftTxt{
		color: #fff;
		padding: .2rem 0;
		text-align: center;
	}
	.bottom{
		height: 1rem;
		padding: 0 .3rem;
	}
	.d_icon{
		width: .44rem;
		height: .36rem;
	}
	.d_count {
		color: yellow;
		font-size: .24rem;
		margin: 0 .2rem;
	}
	.left_yellow_icon {
		background: url(../../../assets/icon/arrow_yellow@2x.png) no-repeat center;
		background-size: cover;
		width: .2rem;
		height: .3rem;
	}
	.numInput{
		color: yellow;
	}
	.numInput input{
		width: .6rem;
		height: .4rem;
		background-color: transparent;
		border: 1px solid yellow;
		border-radius: .06rem;
		text-align: center;
		color: yellow;
	}
	.giftBtn{
		color: #156ee7;
		font-size: .32rem;
		margin-left: .2rem;
	}
</style>
