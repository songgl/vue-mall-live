<template>
  <div class="back_fff mb10" v-if="invalidInfo != ''">
		<div class="h40 box_between bor_b f12 pl15 pr15">
			<div>失效宝贝<span v-text="'('+ (invalidInfo.length || 0 )+')'"></span>件</div>
			<div class="col_1fc2a6" @click="delInvalidShopCarClick()">清空失效宝贝</div>
		</div>
		<div class="pl10 pr10">
			<!--商品列表-->
			<a class="box_start h110 bor_b p_r" v-for="item in invalidInfo">
				<div class="back_999 pl5 pr5 br15 col_fff">失效</div>
				<div class="w90 h90 ml10 mr10">
					<img :src="item.goods_img" alt="" />
				</div>
				<div class="pl10 grid_cell box_direction h90">
					<div class="f12 grid_cell">
						<div class="wbyc2" v-text="item.goods_name"></div>
					</div>
					<div class="col_999 f12 ">规格：<em v-text="item.specification_names"></em></div>
					<div class="col_red box_start h20 f12">宝贝已不能购买，请联系卖家</div>
				</div>
			</a>
		</div>
	</div>
</template>

<script>
import api from '../../../api/api'

export default {
	props:{
    invalidInfo: {
      type: Array,
      default: function () {//默认值
        return []
    	}
    },
  },
  methods: {
  	delInvalidShopCarClick () {
  		api.delInvalidShopCar()
      .then((res) => {
  			if(res.status === 'ok'){
  				this.promptFun({
  					content: res.data,
  					type: 'success'
  				})
	        this.$emit('on-del')
  			}else if(res.status === 'error'){
  				this.promptFun({
  					content: res.data,
  					type: 'error'
  				})
  			}
  		})
  	}
  }
}
</script>

<style scoped>

</style>
