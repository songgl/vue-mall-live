<template>
  <div class="pageBox">
    <my-header :titleTxt="'我的地址'"></my-header>
    <div class="box_touch">
    	<!-- 地址列表 -->
			<div class="itemBox" v-for="item in addressList">
				<div class="addressBox">
					<div class="box_between">
						<div class="addressUser box_start">收件人：<span v-text="item.address_name"></span> </div>
						<div class="box_end">联系电话：<span v-text="item.address_mobile"></span></div>
					</div>
					<div class="address">
						寄送地址：
						<span v-text="item.address_province"></span>
						<span v-text="item.address_city"></span>
						<span v-text="item.address_country"></span>
						<span v-text="item.address_detailed"></span>
					</div>
				</div>
				<div class="box_between operateBox">
					<div class="box_start" @click="_setAddress(item.address_id,1)">
						<div class="check_wh check_icon" :class="{check_act_icon: item.is_default == 1}"></div>
						<div class="">默认地址</div>
					</div>
					<div class="box_end">
						<div class="box_center" @click="_setAddress(item.address_id,2)">
							<div class="del_icon"></div>
							<div>删除</div>
						</div>
						<div class="box_center" @click="modelToogle(true,item)">
							<div class="edit_icon"></div>
							<div>编辑</div>
						</div>
					</div>
				</div>
			</div>
    </div>
    <div class="footerBtn" @click="modelToogle(true)">添加新地址</div>
    <!-- 新增地址 -->
		<add-address v-if="addressModelState" :address-info="item" :on-refresh="_getMyAddress" @on-close="modelToogle"></add-address>
  </div>
</template>

<script>
import api from '../../api/api'
import MyHeader from '../../components/header/header'
import AddAddress from '../../components/addAddress/addAddress'

export default {
	data () {
		return {
			addressList: [],
			addressModelState: false,
			item:{}
		}
	},
  methods: {
  	/*
  	* 获取地址
  	*/
  	_getMyAddress () {
  		api.getMyAddress().then((res) => {
  			if(res.status === 'ok'){
  				this.addressList = res.data
  			}else if(res.status === 'error'){
  				this.promptFun({
            content: res.data,
            type: 'error'
          })
  			}
  		})
  	},
  	/*
  	* 设置默认／删除地址
  	*/
  	_setAddress (id,type) {
  		api.setAddress(id,type).then((res) => {
  			console.log(res)
  			if(res.status === 'ok'){
  				this._getMyAddress()
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
  	* 新增地址mdel
  	* state=true(打开)
  	* state=false(关闭)
  	*/
  	modelToogle (state,i) {
  		this.addressModelState = state
  		this.item = i || undefined
  	}
  },
  created () {
  	this._getMyAddress()
  },
  components: {
  	AddAddress,
  	MyHeader
  }
}
</script>

<style scoped>
  .itemBox{
    background-color: #fff;
    font-size: .24rem;
    margin-bottom: .2rem;
  }
  .addressBox{
    padding: .2rem;
  }
  .addressUser{
    max-width: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .address{
    margin-top: .2rem;
  }
  .operateBox{
    height: .8rem;
    border-top: 1px solid #e5e5e5;
    padding: 0 .2rem 0 .2rem;
  }
  .check_wh{
    width: .56rem;
    height: .56rem;
  }
	.footerBtn {
		display: flex;
		justify-content: center;
		align-items: center;
		height: .9rem;
		background-color: red;
		color: #fff;
		font-size: .32rem;
	}
  .del_icon{
    background:url(../../assets/icon/wode_dizhi_shanchu@2x.png) no-repeat center;
    background-size: cover;
    width: .5rem;
    height: .56rem;
  }
  .edit_icon{
    background:url(../../assets/icon/wode_dizhi_bianji@2x.png) no-repeat center;
    background-size: cover;
    width: .5rem;
    height: .56rem;
    margin-left: .4rem;
  }
</style>
