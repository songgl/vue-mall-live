<template>
  <div class="pageBox">
		<div class="box_touch">
			<!-- 个人资料 -->
			<div class="h180 p_r">
				<div class="back_000 p_a t0 l0 w_b100 h_b100 opacity6"></div>
				<div class="p_a t0 l0 w_b100 h_b100 z100 pl15 pr15 col_fff">
					<div class="box_between h40">
						<div class="grid_cell box_start"></div>
						<div class="grid_cell box_center">
							<div class="box_center f14">送出<em class="mr5" v-text="userInfo.give_count"></em><div class="diamonds_icon w15 h12"></div></div>
						</div>
						<div class="grid_cell box_end p_r">
							<router-link to="news" class="msg_white_icon w24 h24 p_r">
								<div class="p_a r_f5 t0 back_red w5 h5 br50" v-show="hasMsg != 0"></div>
							</router-link>
						</div>
					</div>
					<router-link to="userDetails" class="box_between mt10 h70 f12 col_fff">
						<div class="w50 h50">
							<img class="br50" :src="userInfo.header_img" alt="">
						</div>
						<div class="grid_cell ml10 w_b80">
							<div class="box_between">
								<div class="box_start maxW_b80">
									<div class="wbyc grid_cell f14" v-text="userInfo.username"></div>
									<div class="w20 h20 ml5" :class="[userInfo.sex == 1 ? 'man_icon' : 'woman_icon']"></div>
								</div>
							</div>
						</div>
					</router-link>
					<div class="f12 mt10 wbyc2" v-text="userInfo.signature"></div>
				</div>
				<img src="../../assets/images/wode_beijin@2x.png" alt="">
			</div>
			<order-tab :userInfo="userInfo"></order-tab>
			<me-item></me-item>
		</div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import api from '../../api/api'
import storage from '../../common/storage'
import MeItem from './private/meItem'
import OrderTab from './private/orderTab'
import MyFooter from '../../components/footer/footer'

export default {
	data () {
		return {
			userInfo: {},
			hasMsg: null
		}
	},
	methods: {

  	/*
  	* 获取用户信息
  	*/
  	_getUserInfoFun () {
  		this.setLoading(true)
      api.getUserInfo()
      .then((res) => {
        if(res.status === 'ok'){
          this.userInfo = res.data
          storage.s_setItem('userInfo',res.data)
          storage.l_setItem('openid',res.data.wx_openid)
          this._hasMsgFun()
        }else if(res.status === 'error'){
          this.promptFun({
        		content: res.data,
        		type: 'error'
        	})
        }
      })
  	},

  	/*
  	* 是否有未读消息
  	*/
  	_hasMsgFun () {
  		api.hasMsgFun()
  		.then((res) => {
        this.setLoading(false)
        if(res.status ==='ok'){
        	this.hasMsg = res.data
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
  	this._getUserInfoFun()
  },
  components: {
  	MyFooter,
  	MeItem,
  	OrderTab
  }
}
</script>
