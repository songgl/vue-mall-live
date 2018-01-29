<template>
  <div class="pageBox">
  	<my-header :titleTxt="'确认订单'"></my-header>
  	<section class="box_touch">
	    <!-- 地址模块 -->
	    <confirm-address @get-address='getAddressId'></confirm-address>
			<div class="mb10" v-for="(item,paIndex) in data.list">
				<!-- 店铺信息 -->
				<div class="box_start pl10 pr10 h40 bor_b back_fff">
					<div class="h30 w30 ml10 mr10">
						<img :src="item.merchants_img" alt="" />
					</div>
					<div class="f12" v-text="item.merchants_name"></div>
				</div>
				<!-- 商品信息 -->
				<div class="pl15 pr15 back_fff bor_b">
					<!-- 商品列表 -->
					<goods-item :item="goods" :type="'confirm'" :class="{ bor_t: index != 0 }" v-for="(goods, index) in item.goods" :key="goods.goods_id"></goods-item>
				</div>
				<div class="back_fff pl15 pr15 f12">
					<div class="h40 box_between">
						<div>配送方式</div>
						<div>快递免邮</div>
					</div>
					<div class="h40 box_start bor_t">
						<div>买家留言：</div>
						<div class="grid_cell">
							<input v-model="orderJson.orderBeans[paIndex].order_remark" class="w_b100" type="text" placeholder="（选填）在这里留下您的建议和要求">
						</div>
					</div>
					<div class="h40 box_end bor_t">
						共<em v-text="item.totalNum"></em>
						件商品 小计：
						<span class="col_red">¥<em v-text="item.totalPrice"></em></span>
					</div>
				</div>
			</div>
    </section>
    <!-- confirmOrder footer -->
		<div class="back_fff h50 box_end f16">
			<div class="grid_cell box_end mr10">总计：<span class="col_red">¥<em v-text="data.amount"></em></span></div>
			<div class="w120 h_b100 back_red col_fff box_center" v-if="payState" @click="_preOrderFun()">提交订单</div>
			<div class="w120 h_b100 back_ccc col_666 box_center" v-else="payState">正在提交...</div>
		</div>
  </div>
</template>

<script>
import api from '@/api/api'
import MyHeader from '@/components/header/header'
import ConfirmAddress from './private/confirm_address'
import GoodsItem from '@/components/goodsItem/goodsItem'
import storage from '@/common/storage'

export default {
	data () {
		return {
			data: {},
			payState: true, // 支付状态
			orderJson: {
				member_id: storage.s_getItem("uid"), // 用户id
		    address_id: "", // 地址ID
		    deduct_integral_value: "", // 抵扣积分
		    coupon_ids: "", // 优惠券id,有多个用‘,’分隔
		    orderBeans:[]
			}
		}
	},
	methods: {

		//支付成功／失败／取消的跳转
		payRouter () {
			this.$router.replace({
        path:'/me'
      })
		},
		//获取地址ID
		getAddressId (id) {
			this.orderJson.address_id = id
		},

		// 获取下单商品信息
		_getGoodsInfo (param,type) {
			this.setLoading(true)
			api.getGoodsInfo(param,type)
			.then((res) => {
				this.setLoading(false)
				if(res.status === 'ok'){
					this.data = res.data
					/*循环数据为orderJson赋值*/
		      for(let i = 0; i < res.data.list.length; i++){
		        let merchantsObj = {
		          merchants_id: res.data.list[i].merchants_id, // 商家ID
		          order_type: "", // 订单类型
		          order_remark: "", // 订单备注
		          member_group_id: "", // 团购下单 需传值 用户开团主键
		          orderGoodsBeans: []
		        };
		        this.orderJson.orderBeans.push(merchantsObj);
		        for(let j = 0; j < res.data.list[i].goods.length; j++){
		        	let goodsItem = res.data.list[i].goods
		          let goodsObj = {
		            goods_id: goodsItem[j].goods_id, // 商品ID
		            specification_id: goodsItem[j].specification_id, // 规格ID
		            goods_num: goodsItem[j].goods_num, //购买数量
		            goods_group_id: ""  // 团购下单ID
		          }
		          this.orderJson.orderBeans[i].orderGoodsBeans.push(goodsObj);
		        }
		      }
				}else if(res.status === 'error'){
					this.promptFun({
						content: res.data,
						type: 'error'
					})
				}
			})
		},

		//下单
		_preOrderFun () {
			this.payState = false
			api.preOrderFun (this.orderJson,this.$route.query.car_ids)
			.then((res) => {
				if(res.status ==='ok'){
        	this._payOrderFun(res.data.order_no)
        }else if(res.status === 'error'){
          this.promptFun({
          	content: res.data,
          	type: 'error'
          })
        }
			})
		},

		//支付
		_payOrderFun (order_no) {
			api.payOrderFun (order_no,1)
			.then((res) => {
				if(res.status ==='ok'){
        	pingpp.createPayment(res.data, function (result, error) {
	          if (result == "success") {
	          	this.promptFun({
	          		content: '支付成功',
	          		type: 'success'
	          	})
		          this.payRouter()
	          } else if (result == "fail") {
	          	this.promptFun({
	          		content: '支付失败',
	          		type: 'error'
	          	})
	            this.payRouter()
	          } else if (result == "cancel") {
	          	this.promptFun({
	          		content: '支付取消',
	          		type: 'error'
	          	})
	            this.payRouter()
	          }
	        })
        }else if(res.status === 'error'){
        	this.payState = true
          this.promptFun({
        		content: res.data,
        		type: 'error'
        	})
        }
			})
		}
	},
	created () {
		if(this.$route.query.car_ids){
			this._getGoodsInfo(this.$route.query.car_ids,1)
		}else{
			this._getGoodsInfo(storage.s_getItem('confirmGoodsObj'),0)
		}
	},
  components: {
  	MyHeader,
  	ConfirmAddress,
  	GoodsItem
  }
}
</script>

<style scoped>

</style>
