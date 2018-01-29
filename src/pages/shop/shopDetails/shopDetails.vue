<template>
  <div class="pageBox">
  	<div class="h120 w_b100 p_r">
			<div class="p_a w_b100 h_b100 z100 box_direction">
				<div class="h45 w_b100 box_between pl10 pr10">
					<div class="left_white_icon w22 h28" @click="backFun()"></div>
					<div class="searchBox">
						<div class="w22 h22 search_white_icon"></div>
						<a class="grid_cell box_start col_fff f12 col_fff">输入您要搜索的商品名称</a>
					</div>
					<router-link :to="{path: 'shoppingCar', query:{carType: 2}}" class="cart_white_icon show w22 h22 ml20 mr20"></router-link>
					<div class="info_white_icon w22 h22" @click="rightTopBtnClick()"></div>
				</div>
				<div class="box_between grid_cell pl15 pr15">
					<div class="box_start w_b75">
						<div class="w50 h50">
							<img :src="shopDetailsInfo.merchants_img" alt="">
						</div>
						<div class="ml10 w_b70 col_fff">
							<div class="f14 wbyc w_b100" v-text="shopDetailsInfo.merchants_name"></div>
							<div class="f12 box_start h20 wbyc w_b100" v-text="shopDetailsInfo.merchants_content"></div>
						</div>
					</div>
					<div v-show="shopDetailsInfo.is_follow != 3" class="borCol_red f12 br15 box_center h25 col_red pl10 pr10" @click="followClick(shopDetailsInfo.is_follow)" v-text="shopDetailsInfo.is_follow == 1 ? '取消关注' : '关注'"></div>
				</div>
			</div>
			<img style="filter: blur(2px)" src="../../../assets/images/wode_beijin@2x.png" alt="">
		</div>
		<!-- tab -->
		<div class="box_between back_fff h45 f14 col_999 bor_b over_x">
			<div class="grid_cell box_center ">
				<span class="box_center h42 pl10 pr10" :class="{'nav_act col_red' : shopTabType==1}" @click="shopTabClick(1)">全部商品</span>
			</div>
			<div class="grid_cell box_center ">
				<span class="box_center h42 pl10 pr10" :class="{'nav_act col_red' : shopTabType==2}" @click="shopTabClick(2)">直播&回放</span>
			</div>
			<div class="grid_cell box_center">
				<span class="box_center h42 pl10 pr10" :class="{'nav_act col_red' : shopTabType==3}" @click="shopTabClick(3)">导购视频</span>
			</div>
		</div>
    <div class="box_touch">
    	
    </div>
  </div>
</template>

<script>
import api from '../../../api/api'
export default {
	data () {
		return {
			shopDetailsInfo: {},
			shopTabType: 1
		}
	},
  methods: {
  	/*
  	* 获取店铺详情
  	*/
  	_getShopDetailsFun () {
  		api.getShopDetailsFun(this.$route.query.id)
  		.then((res) => {
  			if(res.status ==='ok'){
          this.shopDetailsInfo = res.data
        }else if(res.status === 'error'){
          console.log(res.data)
        }
  		})
  	},
  	/*
  	* 关注
  	*/
  	followClick () {
  		console.log("关注")
  	},
  	/*
  	* tab
  	*/
  	shopTabClick (type) {
  		this.shopTabType = type
  	},
  	rightTopBtnClick () {
  		console.log(111)
  	}
  },
  created () {
  	this._getShopDetailsFun()
  },
}
</script>

<style scoped>
	.info_white_icon {
		background: url(../../../assets/icon/dianpu_gendui_1@2x.png) no-repeat center;
		background-size: cover;
	}
	.searchBox{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex:1;
		margin-left: .4rem;
		border-bottom: 1px solid #fff;
	}
</style>
