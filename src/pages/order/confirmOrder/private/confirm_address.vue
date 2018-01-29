<template>
  <div>
    <!-- 地址 -->
		<router-link to="myAddress" class="back_fff con_addressBox" v-if="addressInfo.address_id">
			<div class="address_icon w25 h30"></div>
			<div class="f12 ml10 mr10 grid_cell">
				<div class="box_between">
					<div>收货人：<span v-text="addressInfo.address_name"></span></div>
					<div v-text="addressInfo.address_mobile"></div>
				</div>
				<div class="mt5">
					收货地址：
					<span v-text="addressInfo.address_city"></span>
					<span v-text="addressInfo.address_province"></span>
					<span v-text="addressInfo.address_country"></span>
					<span v-text="addressInfo.address_detailed"></span>
				</div>
			</div>
			<div class="right_icon w18 h22"></div>
		</router-link>
		<div class="back_fa con_addressBox" v-else="addressInfo.address_id" @click="modelToogle(true)">
			<div class="box_start">
				<div class="add_address_icon"></div>
				<div class="f14 ml10">添加新地址</div>
			</div>
			<div class="right_icon w18 h22"></div>
		</div>
		<div class="colour_line_icon h5 w_b100"></div>
		
		<!-- 新增地址 -->
		<add-address v-show="addressModelState" :on-refresh="_getDefaultAddressFun" @on-close="modelToogle"></add-address>
  </div>
</template>

<script>
import api from '../../../../api/api'
import AddAddress from '../../../../components/addAddress/addAddress'

export default {
	data () {
		return {
			addressInfo:{},
			addressModelState:false
		}
	},
  methods: {
  	/*
  	* 获取默认地址信息
  	*/
  	_getDefaultAddressFun () {
  		api.getDefaultAddressFun()
  		.then((res) => {
  			if(res.status ==='ok'){
          this.addressInfo = res.data
          this.$emit("get-address",res.data.address_id)
        }else if(res.status === 'error'){
          this.promptFun({
            content: res.data,
            type: 'error'
          })
        }
  		})
  	},
  	
  	/*
  	* 新增地址mdel
  	* state=true(打开)
  	* state=false(关闭)
  	*/
  	modelToogle (state) {
  		this.addressModelState = state
  	}
  },
  created () {
  	this._getDefaultAddressFun()
  },
  components: {
  	AddAddress
  }
}
</script>

<style scoped>
  .con_addressBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 .3rem 0 .3rem;
    height: 1.6rem;
  }
  .add_address_icon { 
    background: url(../../../../assets/icon/querendingdan-wudizhi-tianjia@2x.png) no-repeat center; 
    background-size: cover;
    width: .8rem;
    height: .8rem;
  }

</style>
