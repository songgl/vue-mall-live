<template>
  <div class="pageBox">
		<!--header-->
		<my-header :titleTxt="'我的订单'">
			<!-- tab -->
			<div class="box_between back_fff h45 f14 col_999 bor_b over_x">
				<div class="box_center grid_cell pl5 pr5 ml10 mr10 h45" :class="{'nav_act col_red':state==''}" @click="tabOrderListClick('')">全部</div>
				<div class="box_center grid_cell pl5 pr5 ml10 mr10 h45" :class="{'nav_act col_red':state=='wait_pay'}" @click="tabOrderListClick('wait_pay')">待付款</div>
				<div class="box_center grid_cell pl5 pr5 ml10 mr10 h45" :class="{'nav_act col_red':state=='wait_send'}" @click="tabOrderListClick('wait_send')">待发货</div>
				<div class="box_center grid_cell pl5 pr5 ml10 mr10 h45" :class="{'nav_act col_red':state=='wait_receive'}" @click="tabOrderListClick('wait_receive')">待收货</div>
				<div class="box_center grid_cell pl5 pr5 ml10 mr10 h45" :class="{'nav_act col_red':state=='wait_assessment'}" @click="tabOrderListClick('wait_assessment')">待评价</div>
			</div>
		</my-header>
		<div class="box_touch">
			<!-- content -->
			<load-mord :on-refresh="onRefresh" :on-infinite="onInfinite">
				<div class="p10">
					<!-- 订单列表项 -->
					<div class="mb10" v-for="item in orderListInfo">
						<div class="h40 pl10 pr10 box_between f12 back_fff">
							<div class="box_start">
								<div class="w30 h30">
									<img :src="item.merchants_img" alt="">
								</div>
								<div class="ml10" v-text="item.merchants_name"></div>
							</div>
							<div class="col_red" v-text="item.order_state == 'wait_pay' ? '待付款' : item.order_state=='wait_send' ? '待发货' : item.order_state== 'wait_receive'? '待收货' : item.order_state=='cancel' ? '已取消' : item.order_state=='wait_assessment'? '待评价' : item.order_state=='end' ? '已完成' : '未知'"></div>
						</div>
						<!-- 商品列表 -->
						<router-link :to="{path: 'orderDetails', query:{ order_id: item.order_merchants_id }}" class="back_fa show">
							<!-- 商品列表项 -->
							<div class="box_start p_r h115 bor_t" v-for="goods in item.orderBeans">
								<div class="w95 h95 ml10">
									<img :src="goods.goods_img" alt="" />
								</div>
								<div class="w_b65 ml10">
									<div class="w_b100 h40">
										<div class="f12 col_666 wbyc2" v-text="goods.goods_name"></div>
									</div>
									<div class="f12 col_999 wbyc2"><span v-text="goods.specification_names"></span></div>
									<div class="f12 col_red">￥<em class="f16" v-text="goods.specification_price"></em></div>
									<div class="box_between col_999 f12">
										<div></div>
										<div>x<em v-text="goods.goods_num"></em></div>
									</div>
								</div>
							</div>
						</router-link>
						<order-operate :state="item.order_state" :order-info="item" :on-refresh="operateRefresh"></order-operate>
					</div>
				</div>
			</load-mord>
		</div>
  </div>
</template>

<script>
import api from '../../../api/api'
import MyHeader from '../../../components/header/header'
import LoadMord from '../../../components/loadMord/loadMord'
import OrderOperate from '../orderOperate/orderOperate'
import storage from '../../../common/storage'

export default {
	data () {
		return {
			allPage: null, // 总页数
			page: 1, // 当前页数，默认为1
			orderListInfo: [], // 列表数据
			state: storage.s_getItem("orderListState")
		}
	},
  methods: {
  	/*
  	* 获取订单列表
  	*/
  	_getOrderListFun(state,page) {
  		this.setLoading(true)
			this.page = page || 1
			this.state = state || ''
			api.getOrderListFun(this.state,this.page)
      .then((res) => {
  			this.setLoading(false)
        if(res.status ==='ok'){
        	this.allPage = res.data.page
          for(let i=0;i<res.data.list.length;i++){
            this.orderListInfo.push(res.data.list[i])
          }
        }else if(res.status === 'error'){
          this.promptFun({
          	content: res.data,
          	type: 'error'
          })
        }
      })
		},
		/*
		* 订单操作刷新方法
		*/
		operateRefresh(){
			this.orderListInfo = []
  		this._getOrderListFun(this.state)
  	},
		/*下拉刷新*/
    onRefresh(done) {
      this.orderListInfo = []
      this._getOrderListFun(this.state)
      done() // call done
    },
    /*上拉加载*/
    onInfinite(done) {
      let vm = this;
      if(this.allPage > this.page){ // 总页数大于当前页数
        this._getOrderListFun(this.state,++this.page)
        done(true)
      }else{
        done(false) // call done
      }
    },
    /*tab切换使用*/
    tabOrderListClick(state) {
    	storage.s_setItem("orderListState",state)
    	this.orderListInfo = []
    	this._getOrderListFun(state)
    },
  },
  mounted () {
  	this._getOrderListFun(this.state)
  },
  components: {
  	MyHeader,
  	LoadMord,
  	OrderOperate
  }
}
</script>
