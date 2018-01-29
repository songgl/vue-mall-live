<template>
  <div class="box">
  	<div class="itemBox">
			<div class="box_between">
				<div class="grid_cell box_start">
					<div class="liveImg">
						<img :src="liveInfo.header_img" alt="">
					</div>
					<div class="roomCount">
						<div>直播</div>
						<div><em v-text="peopleNum"></em>人</div>
					</div>
					<div class="followBtn box_center" @click.stop="_isFollow" v-text="isFollow == 1 ? '关注' : '取消关注'"></div>
				</div>
				<div class="grid_cell box_end">
					<div class="userImg" v-for="item in liveUserInfo">
						<img :src="item.header_img" alt="" />
					</div>
				</div>
			</div>
			<div class="box_between gift_Id">
				<div class="box_center giftNum">礼物：<em v-text="giftNum"></em></div>
				<div>ID号：<em v-text="liveInfo.ID"></em></div>
			</div>
			<div class="box_end topGoods" v-show="topGoods.goods_id">
				<router-link :to="{path: 'goodsDetails', query:{goods_id: topGoods.goods_id, live_id: liveInfo.live_id, member_id: liveInfo.member_id}}">
					<img :src="topGoods.goods_img" alt="" />
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import api from '../../../api/live'

export default {
	methods: {
		// 关注与取消关注
		_isFollow () {
			api.isFollow(this.liveInfo.user_id,this.isFollow)
			.then(res => {
				if(res.status === 'ok'){
					if(this.isFollow == 1){
						this.setIsFollow(2)
					}else{
						this.setIsFollow(1)
					}
				}
			})
		},
		...mapActions([
			'setIsFollow'
		])
	},
  computed: {
  	...mapGetters([
      'liveInfo',
      'giftNum',
      'peopleNum',
      'liveUserInfo',
      'isFollow',
      'topGoods'
    ])
  }
}
</script>

<style scoped>
	.box{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		padding: .2rem;
		color: #fff;
	}
	.itemBox{
		position: relative;
		width: 100%;
	}
	.liveImg{
		width: .8rem;
		height: .8rem;
	}
	.liveImg img,
	.userImg img,
	.topGoods img {
		border-radius: 50%;
	}
	.roomCount {
		margin: 0 .2rem;
	}
	.followBtn{
		background-color: #3BB20B;
		font-size: .2rem;
		border-radius: .3rem;
		height: .4rem;
		padding: 0 .1rem;
	}
	.userImg{
		width: .7rem;
		height: .7rem;
		margin-right: .1rem;
	}
	.gift_Id,
	.topGoods{
		padding-top: .2rem;
	}
	.giftNum{
		background-color: rgba(0,0,0,.5);
		border-radius: .3rem;
		height: .5rem;
		padding: 0 .3rem;
	}
	.topGoods a{
		display: block;
		width: 1.2rem;
		height: 1.2rem;
	}
</style>
