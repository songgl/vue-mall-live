<template>
	<div class="back_fff mt10 pl10 pr10">
		<div class="box_between h80 bor_b">
			<div class="box_start w_b80">
				<div class="w60 h60">
					<img :src="shopDetails.merchants_img" alt="">
				</div>
				<div class="ml10 w_b70 col_666">
					<div class="f14 wbyc w_b100" v-text="shopDetails.merchants_name"></div>
					<div class="f12 box_start h20 wbyc w_b100" v-text="shopDetails.merchants_content"></div>
					<div class="f10 col_999">月销量：<em v-text="shopDetails.month_sales"></em></div>
				</div>
			</div>
			<div class="borCol_red f12 br15 box_center h25 col_red pl10 pr10">关注</div>
		</div>
		<div class="box_between h40 col_999 f10">
			<div class="grid_cell box_center">
				<div class="t_c">
					<div class="col_red" v-text="shopDetails.merchants_star1 || 0"></div>
					<div>商品描述</div>
				</div>
			</div>
			<div class="w1 h_b50 back_ccc"></div>
			<div class="grid_cell box_center">
				<div class="t_c">
					<div class="col_red" v-text="shopDetails.merchants_star2 || 0"></div>
					<div>卖家服务</div>
				</div>
			</div>
			<div class="w1 h_b50 back_ccc"></div>
			<div class="grid_cell box_center">
				<div class="t_c">
					<div class="col_red" v-text="shopDetails.merchants_star3 || 0"></div>
					<div>物流服务</div>
				</div>
			</div>
		</div>
		<div class="box_between f12 h40">
			<div class="grid_cell box_center">
				<router-link :to="{path: 'shopDetails',query: {id: shopDetails.member_id}}" class="box_center h25 br15 borCol_red pl15 pr15 col_red">进入店铺</router-link>
			</div>
			<div class="grid_cell box_center">
				<div class="box_center h25 br15 borCol_red pl15 pr15 col_red">去看直播</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  props:['shopDetails']
}
</script>
