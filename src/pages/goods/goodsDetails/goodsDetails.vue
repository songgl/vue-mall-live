<template>
  <div class="pageBox">
  	<div class="box_touch">
  		<!-- banner -->
  		<div class="h375">
  			<my-banner :bannerInfo="goodsDetails.imgs" :type="2"></my-banner>
  		</div>
  		<!-- 商品信息 -->
			<div class="p10 back_fff">
				<div class="f14 wbyc2" v-text="goodsDetails.goods_name"></div>
				<div class=""></div>
				<div class="f14 pt5">
					<span class="col_red">现价：¥<em class="f18" v-text="goodsDetails.goods_now_price"></em></span>
					<span class="col_999 scx f12">原价：¥<em v-text="goodsDetails.goods_origin_price"></em></span>
				</div>
				<div class="box_between f12 col_666 pt5">
					<div>库存:<em v-text="goodsDetails.goods_stock"></em></div>
					<div>已售:<em v-text="goodsDetails.total_sales"></em></div>
					<div v-text="goodsDetails.goods_address"></div>
				</div>
			</div>
			<!-- 保证 -->
			<div class="box_start back_fff bor_t h40 f12 col_red pl10 pr10">
				<div class="box_start mr10">
					<div class="ensure_icon w20 h20 mr5"></div>正品保证
				</div>
				<div class="box_start mr10">
					<div class="ensure_icon w20 h20 mr5"></div>微信支付
				</div>
				<div class="box_start mr10">
					<div class="ensure_icon w20 h20 mr5"></div>快递免邮
				</div>
				<div class="box_start mr10">
					<div class="ensure_icon w20 h20 mr5"></div>七天退换货
				</div>
			</div>
			<!-- 店铺信息 -->
			<g-shop :shop-details="shopDetails" />
			<!-- 商品详情 -->
			<div class="mt10" id="goodsDetailsBox">
				<!-- title -->
				<div class="box_center h40 back_fff f16">- 商品详情 -</div>
				<div v-html="goodsDetails.goods_detail"></div>
			</div>
  	</div>
    <div class="w_b100 box_between bor_t back_fff h40">
			<div class="grid_cell box_center f10 h40">
				<div class="grid_cell box_center">
					<a :href="'tel:' + shopDetails.contact_mobile" class="t_c show">
						<div class="kf_icon w22 h22 m0a"></div>
						<div>客服</div>
					</a>
				</div>
				<div class="w1 h_b50 back_ccc"></div>
				<div class="grid_cell box_center">
					<router-link :to="{path: 'shopDetails',query:{id: shopDetails.member_id}}" class="t_c show">
						<div class="shop_icon w22 h22 m0a"></div>
						<div>店铺</div>
					</router-link>
				</div>
				<div class="w1 h_b50 back_ccc"></div>
				<div class="grid_cell box_center">
					<div class="t_c" @click="collectionClick()">
						<div class="w22 h22 m0a" :class="[goodsDetails.is_collect == 1 ? 'collection_act_icon' : 'collection_icon']"></div>
						<div>收藏</div>
					</div>
				</div>
			</div>
			<div class="grid_cell box_between f14 col_fff">
				<div class="grid_cell box_center h40 back_a93c5f" @click="specModelToggle(1,'car')">加入购物车</div>
				<div class="grid_cell box_center h40 back_red" @click="specModelToggle(1,'pay')">立即购买</div>
			</div>
		</div>
		<!-- fixed 定位区 -->
    <!-- 头部信息 -->
    <header class="p_f t0 l0 w_b100 z102 pl10 pr10 backRgba_black_5">
			<div class="box_between h45">
				<div class="left_white_icon w22 h28" @click="backFun()"></div>
				<div class="grid_cell box_center f14 col_fff">
					<span class="pl10 pr10 h30 box_center">商品</span>
					<span class="ml10 mr10 h30 box_center pl10 pr10">详情</span>
					<span class="pl10 pr10 h30 box_center">评价</span>
				</div>
				<router-link :to="{path:'shoppingCar',query:{carType:2}}" class="cart_white_icon w22 h22 show"></router-link>
			</div>
		</header>
		<!-- 规格 -->
		<goods-spec v-if="specState" :spec-type="specType" :goods-info="goodsDetails" @on-close="specModelToggle(0)"></goods-spec>
  </div>
</template>

<script>
import api from '../../../api/api'
import MyBanner from '../../../components/banner/banner'
import GShop from './private/shop' 
import GoodsSpec from './private/goodsSpec'

export default {
	data() {
		return {
			goodsDetails: {}, // 商品详情
			shopDetails: {},  // 店铺信息
			specState: false,  // 规格状态
			specType: null,   // 规格类型，'car'加入购物车，'pay'立即购买
		}
	},
  methods: {
  	// 获取商品详情
  	_getGoodsDetailsFun() {
  		this.setLoading(true)
  		api.getGoodsDetailsFun(this.$route.query.goods_id)
  		.then((res) => {
  			this.setLoading(false)
        if(res.status ==='ok'){
          this.goodsDetails = res.data
          this._getShopDetailsFun(res.data.merchants_id)
        }else if(res.status === 'error'){
          console.log(res.data)
        }
      })
  	},

  	// 获取店铺详情
  	_getShopDetailsFun(id) {
  		api.getShopDetailsFun(id)
  		.then((res) => {
  			if(res.status === 'ok'){
          this.shopDetails = res.data
        }else if(res.status === 'error'){
          console.log(res.data)
        }
  		})
  	},
  	// 规格model事件
  	specModelToggle(state,type) {
  		if(state == 0){ // 关闭
  			this.specType = null
  			this.specState = false
  		}else {  // 打开
  			this.specType = type
  			this.specState = true
  		}
  	},
  	
  	//收藏商品
  	collectionClick () {
  		api.collectionFun(this.$route.query.goods_id)
  		.then((res) => {
  			if(res.status === 'ok'){
  				this.goodsDetails.is_collect = res.data
  				if(res.data == 1) {
  					this.promptFun({
  						content: '恭喜您，收藏成功，你可在个人中心我的收藏中查看',
  						type: 'success'
  					})
  				}else{
  					this.promptFun({
  						content: '取消收藏成功',
  						type: 'success'
  					})
  				}
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
  	this._getGoodsDetailsFun()
  },
  components: {
  	MyBanner,
  	GShop,
  	GoodsSpec
  }
}
</script>
