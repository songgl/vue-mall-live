<template>
  <div class="orderOperateBox">
		<a :href="'tel:' + orderInfo.contact_mobile" class="operateItem item1">联系商家</a>
		<router-link :to="{path:'logisticsDetails', query:{ goods_img:'', logistics_no: orderInfo.logistics_no, logistics_pinyin: orderInfo.logistics_pinyin }}" v-if="state == 'wait_receive' || state == 'wait_assessment'" class="operateItem item1">查看物流</router-link>
		<div v-if="state == 'cancel'" class="operateItem item1" @click="_orderOperate(orderInfo.order_merchants_id,5)">删除订单</div>
		<div v-if="state == 'wait_pay'" class="operateItem item1" @click="_orderOperate(orderInfo.order_merchants_id,1)">取消订单</div>
		<div v-if="state == 'wait_send'" class="operateItem item1" @click="_orderOperate(orderInfo.order_merchants_id,2)">退款</div>
		<!-- 红色背景按钮 -->
		<div v-if="state == 'wait_receive'" class="operateItem item2" @click="_orderOperate(orderInfo.order_merchants_id,4)">确认收货</div>
		<div v-if="state == 'wait_pay'" class="operateItem item2" @click="_payOrderFun()">继续支付</div>
		<div v-if="state == 'wait_send'" class="operateItem item2 " @click="_orderOperate(orderInfo.order_merchants_id,3)">催单</div>
		<div v-if="state == 'wait_assessment'" class="operateItem item2 ">评价</div>
	</div>
</template>

<script>
import api from '../../../api/api'

export default {
	props: {
		state: {
			type: String,
			default: null
		},
		orderInfo: {
			type: Object,
			default () {
				return {}
			}
		},
		onRefresh: {
			type: Function,
			default: undefined
		}
	},
	data () {
		return {
			orderData: {}
		}
	},
  methods: {
  	/*
  	* 订单操作
  	*/
  	_orderOperate (id,type) {
  		api.orderOperate(id,type)
  		.then((res) => {
  			if(res.status === 'ok'){
  				if(this.onRefresh){
  					if(type == 5){
	  					history.back()
	  				}else{
  						this.onRefresh()
  					}
  				}
  				this.promptFun({
  					content: res.data,
  					type: 'success'
  				})
  			}else if(res.status === 'error'){
  				this.promptFun({
  					content: res.data,
  					type: 'error'
  				})
  			}
  		})
  	},
  	/*
  	* 继续支付
  	*/
  	_payOrderFun () {
  		api.payOrderFun(this.orderInfo.pay_no,2)
  		.then((res) => {
  			if(res.status ==='ok'){
        	pingpp.createPayment(res.data, function (result, error) {
	          if (result == "success") {
	          	this.promptFun({
	          		content:'支付成功',
		             type:'success'
	          	})
		          if(this.onRefresh){
		          	this.onRefresh()
		          }
	          } else if (result == "fail") {
	          	this.promptFun({
	          		content:'支付失败',
		             type:'error'
	          	})
	          } else if (result == "cancel") {
	          	this.promptFun({
	          		content:'支付取消',
		             type:'success'
	          	})
	          }
	        })
        }else if(res.status === 'error'){
          this.promptFun({
        		content:res.data,
            type:'error'
        	})
        }
  		})
  	}
  },
  watch: {
  	orderInfo () {
  		this.orderData = this.orderInfo
  	}
  }
}
</script>

<style scoped>
	.orderOperateBox { 
		display: flex;
    justify-content: flex-end;
    align-items: center;
		padding:0 .2rem 0 .2rem; 
		background-color: #fff;
		color: #999;
		height: .8rem;
		border-top: 1px solid #e5e5e5;
	}
	.operateItem {
		display: flex;
    justify-content: center;
    align-items: center;
    font-size: .24rem;
    border-radius: .3rem;
    height: .5rem;
    padding: 0 .2rem 0 .2rem;
    margin-left: .2rem;
	}
	.item1 {
		color: #999;
		border: 1px solid #e5e5e5;
	}
	.item2 {
		color: red;
		border: 1px solid red;
	}
</style>
