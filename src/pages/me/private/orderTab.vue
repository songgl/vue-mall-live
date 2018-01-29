<template>
  <div>
    <div class="allOrderBox" @click="orderTypeClick('')">
			<div class="allTitle">我的订单</div>
			<div class="allBtn">
				<div>查看全部订单</div>
				<div class="right_icon right_wh"></div>
			</div>
		</div>
		<div class="itemBox">
			<div class="item">
				<div class="p_r" @click="orderTypeClick('wait_pay')">
					<div class="itemImgBox stay_payment_icon"></div>
					<div class="itemTxt">待付款</div>
					<div class="itemNumBox" v-show="userInfo.wait_count !=0 " v-text="userInfo.wait_count"></div>
				</div>
			</div>
			<div class="item">
				<div class="p_r" @click="orderTypeClick('wait_send')">
					<div class="itemImgBox stay_delivery_icon"></div>
					<div class="itemTxt">待发货</div>
					<div class="itemNumBox" v-show="userInfo.seed_count !=0 " v-text="userInfo.seed_count"></div>
				</div>
			</div>
			<div class="item">
				<div class="p_r" @click="orderTypeClick('wait_receive')">
					<div class="itemImgBox stay_Goods_receipt_icon"></div>
					<div class="itemTxt">待收货</div>
					<div class="itemNumBox" v-show="userInfo.receive_count !=0 " v-text="userInfo.receive_count"></div>
				</div>
			</div>
			<div class="item">
				<div class="p_r" @click="orderTypeClick('wait_assessment')">
					<div class="itemImgBox complete_icon"></div>
					<div class="itemTxt">待评价</div>
					<div class="itemNumBox" v-show="userInfo.assessment_count !=0 "
					v-text="userInfo.assessment_count"></div>
				</div>
			</div>
			<div class="refund_line_icon"></div>
			<div class="item">
				<router-link to="saleAfterOrderList" class="refundBox">
					<div class="itemImgBox refund_icon"></div>
					<div class="itemTxt">退款售后</div>
					<div class="itemNumBox" v-show="userInfo.returns_count !=0 " v-text="userInfo.returns_count"></div>
				</router-link>
			</div>
		</div>
  </div>
</template>

<script>
import storage from '../../../common/storage'

export default {
	props: {
		userInfo: {
			type: Object,
			default: function () {//默认值
        return {}
    	}
		}
	},
  methods: {
  	/*
		* 订单列表跳转
		*/
  	orderTypeClick (state) {
  		storage.s_setItem("orderListState",state)
  		this.$router.push({
        path:'/orderList'
      })
  	}
  }
}
</script>

<style scoped>
	.allOrderBox {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		height: .8rem;
		padding: 0 .2rem 0 .2rem;
		border-bottom: 1px solid #e5e5e5;
	}
	.allTitle {
		font-size: .28rem;
	}
	.allBtn {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-size: .24rem;
		color: #999;
	}
	.right_wh{
		width: .44rem;
		height: .48rem;
	}
	.itemBox {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		height: 1.8rem;
		font-size:.24rem;
	}
	.item{
		display: flex;
		justify-content: center;
		align-items: center;
		flex:1; 
	}
	.itemImgBox {
		margin: 0 auto;
		width: .48rem;
		height: .48rem;
	}
	.itemTxt{
		text-align: center;
		margin-top: .1rem;
	}
	.itemNumBox{
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		font-size: .2rem;
		right: -.1rem;
		top: -.1rem;
		background-color: red;
		color: #fff;
		border-radius: 50%;
		width: .36rem;
		height: .36rem;
	}
	.refundBox{
		display: block;
		position: relative;
	}

	.stay_payment_icon{ 
		background:url(../../../assets/icon/wode_daifukuan@2x.png) no-repeat center;
		background-size: cover;
	}
	.stay_delivery_icon{
		background:url(../../../assets/icon/wode_daifahuo@2x.png) no-repeat center;
		background-size: cover;
	}
	.stay_Goods_receipt_icon{
		background:url(../../../assets/icon/wode_daishouhuo@2x.png) no-repeat center;
		background-size: cover;
	}
	.complete_icon{
		background:url(../../../assets/icon/wode_daipingjia@2x.png) no-repeat center;
		background-size: cover;
	}
	.refund_icon{
		background:url(../../../assets/icon/wode_tuikuanshou@2x.png) no-repeat center;
		background-size: cover;
	}
	.refund_line_icon { 
		background: url(../../../assets/icon/wode_xian@2x.png) no-repeat center;
		background-size: cover;
		height: 80%;
		width: .1rem;
	}
</style>
