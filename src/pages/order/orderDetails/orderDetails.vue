<template>
  <div class="pageBox">
  	<my-header :titleTxt="'确认订单'"></my-header>
    <div class="box_touch">
    	<order-state :order-info="orderInfo"></order-state>
    	<div class="back_fff pl15 pr15 box_between h80 bor_t">
				<div class="address_icon w25 h30"></div>
				<div class="f12 ml10 mr10 grid_cell">
					<div class="box_between">
						<div>收货人：<span v-text="orderInfo.address_name"></span></div>
						<div v-text="orderInfo.address_mobile"></div>
					</div>
					<div class="mt5">
						收货地址：
						<span v-text="orderInfo.address_province"></span>
						<span v-text="orderInfo.address_city"></span>
						<span v-text="orderInfo.address_country"></span>
						<span v-text="orderInfo.address_detailed"></span>
					</div>
				</div>
				<div class="w25"></div>
			</div>
			<div class="h5 w_b100 colour_line_icon"></div>
			<div class="box_between back_fff h40 pl10 pr10">
				<div class="box_start">
					<div class="w30 h30">
						<img :src="orderInfo.merchants_img" alt="">
					</div>
					<div class="ml10" v-text="orderInfo.merchants_name"></div>
				</div>
			</div>
			<div class="bor_t back_fa">
				<!-- 商品信息 -->
				<div v-for="goods in orderInfo.orderBeans">
					<div class="h105 box_start pl10 pr10">
						<div class="w85 h85">
							<img :src="goods.goods_img" alt="">
						</div>
						<div class="ml10 grid_cell box_direction h85">
							<div class="f14 wbyc2 grid_cell" v-text="goods.goods_name"></div>
							<div class="f12 col_999" v-text="goods.specification_names"></div>
							<div class="box_between f12 col_999">
								<div class="mt5 col_red">¥<em class="f16 " v-text="goods.specification_price"></em></div>
								<div>x<em v-text="goods.goods_num"></em></div>
							</div>
						</div>
					</div>
					<div class="box_end h40 pl10 pr10" v-if="(orderInfo.order_state=='wait_assessment' || orderInfo.order_state=='wait_receive') && goods.has_refund == 0">
						<router-link :to="{path:'orderRefund',query:{order_id:orderInfo.order_merchants_id,order_goods_id:goods.order_goods_id}}" class="box_center bor f12 br15 h25 pl10 pr10 ml10">申请售后</router-link>
					</div>
					<div class="box_end h40 pl10 pr10 col_e4c931" v-if="(orderInfo.order_state=='wait_assessment' || orderInfo.order_state == 'wait_receive') && goods.has_refund == 1">退款中</div>
					<div class="back_fff w_b100 h3"></div>
				</div>
			</div>
			<div class="f12 back_fff">
				<div class="h40 box_between bor_b pl15 pr15">
					<div>配送方式</div>
					<div>快递免邮</div>
				</div>
				<div class="box_start h40 pl15 pr15">社员留言：<span class="col_666" v-text="orderInfo.order_remark"></span></div>
			</div>
			<div class="back_fff h40 box_end mt10 f14 pr15">
				实际支付：<span class="col_red">¥<em v-text="orderInfo.order_actual_price"></em></span>
			</div>
			<div class="back_fff mt10 p15 f12 lh25">
				<div>订单编号：<span v-text="orderInfo.order_no"></span></div>
				<div>创建时间：<span v-text="orderInfo.create_time"></span></div>
				<div v-show="orderInfo.pay_time != '0000-00-00 00:00:00'">支付时间：<span v-text="orderInfo.pay_time"></span></div>
				<div v-show="orderInfo.send_time != '0000-00-00 00:00:00'">发货时间：<span v-text="orderInfo.seed_time"></span></div>
				<div v-show="orderInfo.receive_time != '0000-00-00 00:00:00'">收货时间：<span v-text="orderInfo.receive_time"></span></div>
			</div>
    </div>
    <order-operate :state="orderInfo.order_state" :order-info="orderInfo" :on-refresh="_getOrderDetailsFun"></order-operate>
  </div>
</template>

<script>
import api from '../../../api/api'
import MyHeader from '../../../components/header/header'
import OrderState from './private/orderState'
import OrderOperate from '../orderOperate/orderOperate'

export default {
	data () {
		return {
			orderInfo: {}
		}
	},
  methods: {
  	// 获取订单详情
  	_getOrderDetailsFun () {
  		this.setLoading(true)
  		api.getOrderDetailsFun(this.$route.query.order_id)
  		.then((res) => {
  			this.setLoading(false)
  			if(res.status === 'ok'){
  				this.orderInfo = res.data
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
  	this._getOrderDetailsFun()
  },
  components: {
  	MyHeader,
  	OrderState,
  	OrderOperate
  }
}
</script>

<style scoped>

</style>
