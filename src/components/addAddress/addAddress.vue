<template>
  <div>
		<div class="mk" @click="close(false)"></div>
		<div class="add_addressBox">
			<div class="titleBox">
				<div class="w28 h28"></div>
				<div class="f16 grid_cell t_c">新增收获地址</div>
				<div class="w28 h28 close_gray_icon" @click="close(false)"></div>
			</div>
			<div class="listBox">
				<div class="list bor_b">
					<div class="w_b30">收货人</div>
					<div class="grid_cell">
						<input v-model="name" class="w_b100 " type="text" placeholder="姓名" />
					</div>
				</div>
				<div class="list">
					<div class="w_b30">联系电话</div>
					<div class="grid_cell">
						<input v-model="mobile" class="w_b100" type="text" placeholder="联系电话" />
					</div>
				</div>
				<group label-align="left">
		      <x-address :title="'选择地址'" raw-value v-model="value" :list="addressData" @on-shadow-change="onShadowChange" placeholder="请选择地址" value-text-align="left" :show.sync="showAddress"></x-address>
		    </group>
				<div class="list bor_b">
					<div class="w_b30">详细地址</div>
					<div class="grid_cell" @click="">
						<input v-model="address_detailed" class="w_b100" type="text" placeholder="如街道、楼层、门牌号等" />
					</div>
				</div>
				<div class="list">
					<div class="w_b30">邮政编码</div>
					<div class="grid_cell">
						<input v-model="address_zip_code" class="w_b100" type="text" placeholder="邮政编码（选填）" />
					</div>
				</div>
			</div>
			<div class="h45 w_b100 box_center f16 back_red col_fff" @click="_add_edit_addressFun()">确定</div>
		</div>
	</div>
</template>

<script>
import api from '../../api/api'
import {Group, XAddress,ChinaAddressV4Data,Value2nameFilter as value2name } from 'vux'

export default {
	props:{
		onRefresh: {
      type: Function,
      default: undefined
    },
    addressInfo: {
    	type: Object,
    	default () {
    		return {}
    	}
    }
	},
	data () {
		return {
			valueTxt: [],
			name: this.addressInfo.address_name || null,
			mobile: this.addressInfo.address_mobile || null,
			address_detailed: this.addressInfo.address_detailed || null,
			address_zip_code: this.addressInfo.address_zip_code || null,
			value: [], // 选中的地区数据 
			addressData: ChinaAddressV4Data, // 省市区数据
			showAddress: false
		}
	},
  methods: {
  	/*
  	* model关闭事件
  	*/
  	close (state) {
  		this.$emit("on-close",state)
  	},
  	/*
  	* 新增／编辑地址
  	*/
  	_add_edit_addressFun () {
  		let paramObj = {
	  			address_mobile: this.mobile,
	  			address_name : this.name,
	  			address_province : this.valueTxt[0],
	  			address_city : this.valueTxt[1],
	  			address_country : this.valueTxt[2],
	  			address_detailed : this.address_detailed,
	  			address_zip_code : this.address_zip_code
	  		}
  		if(this.addressInfo.address_id){ // 编辑
  			paramObj.address_id = this.addressInfo.address_id
  		}
  		api.add_edit_addressFun(paramObj)
  		.then((res) => {
  			if(res.status ==='ok'){
  				this.promptFun({
  					content: res.data,
  					type: 'success'
  				})
  				if (this.onRefresh) {
	          this.onRefresh()
	        }
          this.close(false)
        }else if(res.status === 'error'){
        	this.promptFun({
  					content: res.data,
  					type: 'error'
  				})
        }
  		})
  	},
  	/*
  	* 地址栏监听事件
  	*/
  	onShadowChange (ids, names) {
  		this.valueTxt = names
  	}
  },
  mounted () {
  	if(this.addressInfo.address_id){
  		this.$set(this.value,0,this.addressInfo.address_province)
  		this.$set(this.value,1,this.addressInfo.address_city)
  		this.$set(this.value,2,this.addressInfo.address_country)
  	}else{
  		this.value = ['上海市','市辖区','浦东新区']
  	}
  },
  components: {
  	Group,
  	XAddress
  }
}
</script>

<style>
	.vux-no-group-title {
		margin-top: 0 !important
	}
	.weui-cell__hd{width: 30%}
	.weui-cell {
    padding: 10px 0px !important;
    font-size: 14px;
	}
	.add_addressBox {
		position: fixed;
		left:0;
		bottom:0;
		width: 100%;
		z-index:101;
	}
	.titleBox {
		display: flex;
    justify-content: space-between;
    align-items: center;
		height: .9rem;
		padding: 0 .3rem 0 .3rem;
		background-color: #efefef
	}
	.listBox {
		background-color: #fff;
		padding: 0 .3rem .4rem .3rem;
		font-size: .28rem;
	}
	.list {
		display: flex;
		justify-content: flex-start;
    align-items: center;
		height: .8rem;
		border-radius: 1px solid #e5e5e5
	}
</style>
