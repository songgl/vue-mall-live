<template>
	<div>
		<div class="back_fff box_center">
			<div class="mt40 mb40">
				<div class="col_1fc2a6 f18 mb20">购物车里什么都没有哦</div>
				<div class="w150 h105 m0a cart_null_icon"></div>
			</div>
		</div>
		<div class="box_center h50 f18 col_666">- <span>推荐商品</span> -</div>
		<div class="box_start flex_wrap p5">
			<!--列表项-->
			<div class="w_b50 p5" v-for="m in recommendInfo">
				<router-link :to="{path:'goodsDetails',query:{goods_id:m.goods_id}}" class="show">
					<div class="w_b100 goodsListImgBox" ref="goodsListImgBox">
						<img :src="m.goods_img" alt="" />
					</div>
					<div class="back_fff p5">
						<div class="wbyc2 f12 h30 lh15" v-text="m.goods_name"></div>
						<div class="pt5">
							<span class="col_red f12">现价：¥<em class="f14" v-text="m.goods_now_price"></em></span>
							<span class="scx col_999 ml10">¥<em v-text="m.goods_origin_price"></em></span>
						</div>
					</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import api from '../../../api/api'

export default {
	data () {
		return {
			recommendInfo: {}, // 推荐商品
		}
	},
  methods: {
  	/*
		* 推荐商品列表
		*/
		_getMaybeEnjoyFun () {
			api.getMaybeEnjoyFun()
			.then((res) => {
				if(res.status === 'ok'){
					this.recommendInfo = res.data
					this.$nextTick(function(){ // 设置商品图片的高度等于它的宽度
						let domW = this.$refs.goodsListImgBox[0].offsetWidth
						for(let i = 0; i < this.$refs.goodsListImgBox.length; i++){
							this.$refs.goodsListImgBox[i].style.height = domW + 'px'
						}
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
  	this._getMaybeEnjoyFun()
  }
}
</script>

<style scoped>
	.cart_null_icon { background: url(../../../assets/icon/gouwuche_kong@2x.png) no-repeat center;background-size: cover; }
</style>
