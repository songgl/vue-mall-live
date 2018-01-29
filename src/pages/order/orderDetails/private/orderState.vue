<template>
  <div class="back_DEF3ED col_00AE95 h80 box_start">
    <!-- 未付款 -->
		<div class="ml30" v-if="orderInfo.order_state == 'wait_pay'">
			<div class="f16">等待小主付款</div>
			<div class="box_start f12">
				<count-down :endTime="orderInfo.cancel_end_time" :callback="callback" endText="倒计时已结束了"></count-down>
				后未支付，订单将自动关闭
			</div>
		</div>
		<!-- 待发货 -->
		<div class="ml30" v-else-if="orderInfo.order_state == 'wait_send'">
			<div class="f16">等待商家发货</div>
			<div class="f14">商家正在积极备货中，请耐心等待</div>
		</div>
		<!-- 待收货 -->
		<div class="ml30" v-else-if="orderInfo.order_state == 'wait_receive'">
			<div class="f16">等待收货</div>
			<div class="f14" v-text="orderInfo.send_time"></div>
		</div>
		<!-- 待评价 -->
		<div class="ml30" v-else-if="orderInfo.order_state == 'wait_assessment'">
			<div class="f16">交易成功</div>
			<div class="f14">买家已确认收货</div>
		</div>
		<!-- 已完成 -->
		<div class="ml30" v-else-if="orderInfo.order_state == 'end'">
			<div class="f16">恭喜您，交易成功</div>
			<div class="f14" v-text="orderInfo.receive_time"></div>
		</div>
		<!-- 已取消 -->
		<div class="ml30" v-else-if="orderInfo.order_state == 'cancel'">
			<div class="f16">订单已取消</div>
			<div class="f14" v-text="orderInfo.cancel_time"></div>
		</div>
		<!-- 退款成功 -->
		<div class="ml30" v-else="orderInfo.order_state == 'returns'">
			<div class="f16">退款成功</div>
			<div class="f14"></div>
		</div>
  </div>
</template>

<script>
import CountDown from '../../../../components/countDown/countDown'

export default {
	props: {
		orderInfo: {
			type: Object,
			default () {
				return {}
			}
		},

	},
	data() {
		return {
			
		}
	},
  methods: {
  	// 倒计时结束的回调
  	callback () {
  		console.log("1111")
  	}
  },
  components: {
  	CountDown
  }
}
</script>

<style scoped>

</style>
