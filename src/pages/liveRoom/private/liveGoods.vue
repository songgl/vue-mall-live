<template>
  <div class="box" v-if="state == 1">
  	<div class="boxPage">
			<div class="box_between titleBox">
				<div class="grid_cell box_center titleTxt">商品列表</div>
				<div class="close_gray_icon titleIcon" @click.stop="close"></div>
			</div>
			<div class="listBox">
				<!-- 列表项 -->
				<router-link :to="{path: 'goodsDetails', query: {goods_id: item.goods_id,live_id: liveInfo.live_id,member_id: liveInfo.member_id}}" class="box_start" v-for="item in goodsList" :key="item.goods_id">
					<div class="goodsImg">
						<img :src="item.goods_img" alt="">
					</div>
					<div class="grid_cell box_direction goodsInfoBox">
						<div class="grid_cell">
							<div class="goodsName" v-text="item.goods_name"></div>
						</div>
						<div class="now_price">现价：¥<em v-text="item.goods_now_price"></em></div>
						<div class="box_start origin_price">原价：¥<em v-text="item.goods_origin_price"></em></div>
					</div>
					<div class="btn box_center">立即购买</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import api from '../../../api/live'
import { mapGetters } from 'vuex'
export default {
	props: ['state'],
	data () {
		return {
			goodsList: []
		}
	},
  methods: {
  	// 关闭
  	close () {
  		this.$emit('on-close',1)
  	},
  	// 获取直播间商品列表
  	_getLiveGoods () {
  		api.getLiveGoods(this.$route.query.live_id)
  		.then(res => {
  			console.log(res)
  			if(res.status === 'ok'){
  				this.goodsList = res.data
  			}else if(res.status === 'error'){
  				this.promptFun({
  					content: res.data,
  					type: 'error'
  				})
  			}
  		})
  	},
  },
  computed: {
  	...mapGetters([
      'liveInfo',
    ])
  },
  mounted () {
  	this._getLiveGoods()
  }
}
</script>

<style scoped>
	.box{
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #fff;
		border-radius: .3rem .3rem 0 0;
	}
	.boxPage{
		position: relative;
		width: 100%;
	}
	.titleBox{
		height: .8rem;
		padding: 0 .3rem;
		border-bottom: 1px solid #e5e5e5;
	}
	.titleTxt{
		margin-left: .56rem;
		font-size: .32rem;
	}
	.titleIcon{
		width: .56rem;
		height: .56rem;
	}
	.listBox{
		overflow-y: scroll;
		height: 7.5rem;
	}
	.listBox a{
		height: 2.2rem;
		border-bottom: 1px solid #e5e5e5;
		padding: 0 .2rem;
		position: relative;
	}
	.goodsImg {
		width: 1.8rem;
		height: 1.8rem;
	}
	.goodsInfoBox{
		padding-left: .2rem;
		height: 1.8rem;
	}
	.goodsName{
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		font-size: .28rem;
	}
	.now_price{
		color: red;
		font-size: .24rem;
	}
	.now_price em{
		font-size: .32rem;
	}
	.origin_price{
		color: #999;
		text-decoration:line-through;
		height: .4rem;
	}
	.btn{
		position: absolute;
		bottom: .2rem;
		right: .2rem;
		background-color: red;
		border-radius: .3rem;
		height: .5rem;
		padding: 0 .3rem;
		color: #fff;
	}
</style>
