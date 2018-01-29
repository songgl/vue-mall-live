<template>
  <router-link :to="{path:'goodsDetails',query:{goods_id:item.goods_id}}" class="goodsItemBox">
		<div class="goodsImgBox">
			<img v-lazy="item.goods_img" alt="" />
		</div>
		<div class="goodsInfoBox">
			<div class="goodsNameBox">
				<div class="name" v-text="item.goods_name"></div>
			</div>
			<div v-if="type==='confirm'" v-text='item.specification_names'></div>
			<div class="now_priceBox">
				<span class="now_price">现价：¥<em v-text="item.goods_now_price"></em></span>
				<span v-if="type==='confirm'">x<em v-text="item.goods_num"></em></span>
			</div>
			<div v-if="type==='goods'" class="origin_price">原价：¥<em v-text="item.goods_origin_price"></em></div>
		</div>
		<div v-if="type==='goods'" class="goodsItemBtn">立即购买</div>
  </router-link>
</template>

<script>
export default {
  props:{
  	item: { // 商品信息
  		type: Object,
  		default: {}
  	},
  	type: {
  		type: String,
  		default: 'goods'
  	}
  }
}
</script>

<style scoped>
	.goodsItemBox {
		display: flex;
		justify-content: flex-start;
		align-items:center;
		height: 2.2rem;
		padding: 0 .2rem 0 .2rem;
		position: relative;
		background-color: #fff
	}
	.goodsImgBox{
		width: 1.8rem;
		height: 1.8rem;
	}
	.goodsInfoBox {
		display: flex;
		flex-direction: column;
		flex:1;
		padding-left: .2rem;
		font-size: .24rem;
		height: 1.8rem;	
	}
	.goodsNameBox {
		flex: 1;
		font-size: .24rem;
	}
	.goodsNameBox .name{
		display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
	}
	.now_priceBox{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.now_priceBox em{
		font-size: .32rem;
	}
	.now_price {
		color: red;
	}
	.origin_price {
		display: flex;
		justify-content: space-start;
		align-items: center;
		height: .4rem;
		color:#999;
		text-decoration: line-through;
	}
	.goodsItemBtn{
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		bottom:.2rem;
		right:.2rem;
		background-color: red;
		border-radius: .3rem;
		height: .5rem;
		padding:0 .3rem 0 .3rem;
		color:#fff;
		font-size: .24rem;
	}
</style>
