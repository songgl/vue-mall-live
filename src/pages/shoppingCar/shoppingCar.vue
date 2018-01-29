<template>
  <div class="pageBox">
  	<!-- header -->
		<div class="back_fff">
			<div class="box_center h45 pr10 pl10 w_b100 bor_b">
				<div class="box_start">
					<div class="left_icon w22 h28" v-show="$route.query.carType == 2" @click="backFun()"></div>
				</div>
				<div class="f16 grid_cell box_center">购物车<span v-text="'('+ (carInfo.valid_count || 0) + ')'"></span></div>
				<div class="box_end">
					<div class="col_red f12" v-show="carInfo.valid_count != 0" @click="carEditClick(carEditState)" v-text="carEditState?'编辑':'完成'"></div>
				</div>
			</div>
		</div>
  	<div class="box_touch">
    	<!-- 店铺列表 -->
			<div class="mb10 back_fff" v-for="(merchants, paIndex) in validInfo">
				<div class="box_start pl10 pr10 h40 bor_b">
					<div class="w22 h22" :class="[merchants.checked ? 'check_act_icon' : 'check_icon']" @click="shopCheckAllClick(paIndex)"></div>
					<div class="h30 w30 ml10 mr10">
						<img :src="merchants.merchants_img" alt="" />
					</div>
					<div class="f12" v-text="merchants.merchants_name"></div>
				</div>
				<div class="pl10 pr10">
					<!--商品列表-->
					<div class="box_start h110 bor_b p_r goodsListBox" v-for="(goods, index) in merchants.goods">
						<div class="w22 h22" :class="[goods.checked ? 'check_act_icon' : 'check_icon']" @click="carGoodsItemClick(paIndex,index)"></div>
						<a href="#/goodsDetails" class="w90 h90 ml10 mr10 show">
							<img :src="goods.goods_img" alt="">
						</a>
						<div class="pl10 grid_cell box_direction h90">
							<div class="f12 grid_cell">
								<div class="wbyc2" v-text="goods.goods_name"></div>
							</div>
							<div class="col_999 f12 ">规格：<em v-text="goods.specification_names"></em></div>
							<div class="col_red box_start h20 f14">¥<em class="priceTxt" v-text="goods.goods_now_price"></em></div>
						</div>
						<div class="box_center p_a b10 r10">
							<div class="w22 h22 back_ccc box_center" @click="numberfn(0,paIndex,index)">-</div>
							<div class="w40 h22 box_center">
								<input readonly v-model="goods.goods_num" class="w_b100 h20 t_c" type="text">
							</div>
							<div class="w22 h22 back_ccc box_center" @click="numberfn(1,paIndex,index)">+</div>
						</div>
					</div>
				</div>
			</div>
			<car-invalid :invalidInfo="carInfo.no_valid_data" @on-del="_getCarGoodsListFun"></car-invalid>
			<car-recommend v-if="recommendState"></car-recommend>
    </div>
    <!-- footer -->
    <my-footer>
    	<div class="box_between back_fff bor_t h40" v-if="validInfo.length != 0">
				<div class="grid_cell box_between pl10 pr10">
					<div class="box_start f12 col_999">
						<div class="w22 h22" :class="[allChecked ? 'check_act_icon' : 'check_icon']" @click="checkAllClick()"></div>全选
					</div>
					<div>
						<div class="box_end f12">总计：<span class="col_red">¥<em v-text="totalMoney"></em></span></div>
						<div class="col_999 box_end">(不含运费)</div>
					</div>
				</div>
				<div class="back_red h40 col_fff w80 box_center f14" @click="carClick()" v-text="carEditState ? '结算' : '删除' "></div>
			</div>
    </my-footer>
  </div>
</template>

<script>
import api from '../../api/api'
import storage from '../../common/storage'
import MyFooter from '../../components/footer/footer'
import CarInvalid from './private/invalid'
import CarRecommend from './private/recommend'

export default {
	data () {
		return {
			carInfo: {}, // 购物车商品
			validInfo: {}, // 有效商品
			all_price: null, // 总价
			carEditState: true, //按钮状态
			recommendState: false, // 推荐模块状态
			allChecked: false, // 是否全选
			totalMoney: 0, // 总价
			car_ids:[] // 购物车id数组
		}
	},
	methods: {
		/*
		* 获取购物车商品列表
		*/
		_getCarGoodsListFun () {
			this.setLoading(true)
			api.getCarGoodsListFun()
			.then((res) => {
				this.setLoading(false)
				if(res.status === 'ok'){
					this.carInfo = res.data
					/*
					* 遍历店铺与商品
					* 为其添加是否选中字段
					*/
					this.validInfo = res.data.valid_data
					for(let i=0;i<this.validInfo.length;i++){
						this.validInfo[i].checked = false
						for(let a=0;a<this.validInfo[i].goods.length;a++){
							this.validInfo[i].goods[a].checked = false
						}
					}
					if(res.data.valid_data.length == 0 && res.data.no_valid_data.length == 0){
						this.recommendState = true
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
		* 判断商品是否全部选中
		*/
    isChooseAll () {
      let flag1 = true;
      for ( let i = 0; i < this.validInfo.length; i++ ) {
        if ( this.validInfo[i]['checked'] == false ) {
          flag1 = false;
          break;
        }
      }
      flag1 == true ? this.allChecked = true : this.allChecked = false;
    },

		/*
		* 全选
		*/
		checkAllClick () {
			let flag = true;
      if ( this.allChecked ) {
        flag = false;
      }
      for ( let i = 0; i < this.validInfo.length; i++ ) {
        this.validInfo[i]['checked'] = flag;
        let list = this.validInfo[i]['goods'];
        for ( let k = 0, len1 = list.length; k < len1; k++ ) {
          list[k]['checked'] = flag;
        }
      }
      this.allChecked = !this.allChecked;
      this.carTotalMoney(); // 计算总价
		},
		
		/*
		* 店铺全选
		*/
		shopCheckAllClick (index) {
			let listObj = this.validInfo[index]
			let goods = this.validInfo[index]['goods'] // 当前店铺下的商品数组

      if ( this.validInfo[index]['checked'] ) {
        for (let i = 0; i < goods.length; i++ ) {
          goods[i]['checked'] = false
        }
      } else {
        for (let i = 0; i < goods.length; i++ ) {
          goods[i]['checked'] = true
        }
      }
      // this.validInfo[index]['checked'] = !this.validInfo[index]['checked']; // Vue 不能检测这样变动的数组，所以视图不会更新

      listObj.checked = !listObj.checked
      this.$set(this.validInfo,index,listObj)
      
      this.isChooseAll() // 判断是否选择所有商品的全选
      this.carTotalMoney() // 计算总价
		},

		/*
		* 单个商品选中
		*/
		carGoodsItemClick (paIndex,index) {
			let goodsArr = this.validInfo[paIndex]['goods'] // 当前店铺下的商品数组
			let goodsListObj = this.validInfo[paIndex].goods[index] // 当前的商品

      if ( goodsArr[index]['checked'] ) {
        this.validInfo[paIndex]['checked'] = false;
        this.allChecked = false;
        goodsListObj.checked = !goodsListObj.checked
        this.$set(goodsArr,index,goodsListObj)
      } else {
        goodsListObj.checked = !goodsListObj.checked
        this.$set(goodsArr,index,goodsListObj)

        // 判断当前店铺是否全选
        let flag = true
        for (let i = 0; i < goodsArr.length; i++ ) {
          if ( goodsArr[i]['checked'] == false ) {
            flag = false
            break;
          }
        }
        flag == true ? this.validInfo[paIndex]['checked'] = true : this.validInfo[paIndex]['checked'] = false
      }
      this.isChooseAll()    // 判断是否选择所有商品的全选
      this.carTotalMoney()  //计算总价
		},
			
		/*
		* 数量加减
		*/
		numberfn (type,paIndex,index) { // type=0(加)，type=1(减)
			let merchantsObj = this.validInfo[paIndex],
					goodsObj = this.validInfo[paIndex].goods[index]

			api.carNumToggle(type,goodsObj.car_id)
			.then((res) => {
				if(res.status === 'ok'){
					if(type == 0){
						goodsObj.goods_num--
					}else{
						goodsObj.goods_num++
					}
				}else if(res.status === 'error'){
					this.promptFun({
						content: res.data,
						type: 'error'
					})
				}
			})
			this.carTotalMoney() // 计算总价
		},
		/*
		* 计算商品总金额
		*/
    carTotalMoney () {
      let oThis = this
      this.totalMoney = 0
      for ( let i = 0; i < this.validInfo.length; i++ ) {
        let goods = this.validInfo[i]['goods']
        goods.forEach(function(item, index, arr) {
          if ( goods[index]['checked'] ) {
            oThis.totalMoney += parseFloat(item.goods_now_price) * parseFloat(item.goods_num)
          }
        });
      }
    },

		/*
		* 编辑
		*/
		carEditClick () {
			this.carEditState = !this.carEditState
		},
		
		/*
		* 结算
		*/
		settlement () {
			this.$router.push({
        path:'/confirmOrder',
        query: {
        	car_ids: this.car_ids.join(",")
        }
      })
		},

		/*
		* 删除
		*/
		delCarGoods () {
			api.delCarGoodsFun(this.car_ids)
			.then((res) => {
				if(res.status === 'ok'){
					this._getCarGoodsListFun()
					this.promptFun({
						content:res.data,
	          type:'success'
					})
				}else if(res.status === 'error'){
					this.promptFun({
						content:res.data,
	          type:'error'
					})
				}
			})
		},
		/*
		* 底部按钮事件
		*/
		carClick () {
			let _this = this
			this.car_ids = []
			for( let i = 0; i<this.validInfo.length; i++){
				let goods = this.validInfo[i]['goods']
				goods.forEach(function(item, index, arr){
					if(goods[index]['checked']){
						_this.car_ids.push(goods[index].car_id)
					}
				})
			}
			if(this.car_ids.length < 1){
				this.promptFun({
					content:'您还没有选择商品哦',
          type:'error'
				})
        return false
			}
			if(this.carEditState){ // 结算
				this.settlement()
			}else { // 删除
				this.delCarGoods()
			}
		}
	},
	created () {
		this._getCarGoodsListFun()
	},
  components: {
  	CarInvalid,
  	CarRecommend,
  	MyFooter
  }
}
</script>
