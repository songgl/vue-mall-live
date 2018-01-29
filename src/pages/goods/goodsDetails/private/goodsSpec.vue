<template>
  <div>
		<div class="mk" @click="closeModel"></div>
		<div class="specBox p_f b0 l0 w_b100 back_fff z101">
			<div class="pl15 pr15 pb20">
				<div class="p_r box_start h90">
					<div class="w100"></div>
					<div class="f12 ml10">
						<div><em class="col_red f16">￥<em v-text="data.specification_price || goodsInfo.goods_now_price"></em></em></div>
						<div class="col_999 pt5 pb5">库存<em v-text="data.specification_stock || goodsInfo.goods_stock "></em>件</div>
						<div class="col_999" v-text="data.specification_names"></div>
					</div>
					<div class="p_a w100 h100 t_f10 l0 p3 back_fff br3">
						<img :src="data.specification_img || goodsInfo.goods_img" alt="" />
					</div>
					<div class="p_a t10 r0 w30 h30 close_red_icon" @click="closeModel"></div>
				</div>
				<!-- 规格 -->
				<div class="maxH220 over_y">	
					<div class="mt20 bor_b pb5" v-for="(item,paIndex) in specData" :key="item.specification_id">
						<div class="f14 h22 mb10" v-text="item.specification_value"></div>
						<div class="box_start flex_wrap f12">
							<div class="h30 pl15 pr15 br15 box_center mr10 mb10 bor" :class="{'back_red col_fff':g.specification_id == specIdArr[paIndex]}" @click="keepSpecIdClick(paIndex, g.specification_id, g.specification_value)" v-for="(g,index) in item.specificationBeans" v-text="g.specification_value"></div>
						</div>
					</div>
				</div>
				<div class="mt10 mb10 box_between f14">
					<div>选择购买数量：</div>
					<count :maxNum="data.specification_stock" @on-plus="numPlus" @on-minus="numMinus"></count>
				</div>
			</div>
			<div class="box_center h45 col_fff back_red f16" @click="determineFun()" v-if="data.specification_names && data.specification_stock!=0">确定</div>
			<div class="box_center h45 col_666 back_ccc f16" v-else="data.specification_names && data.specification_stock!=0">{{data.specification_stock==0 ? '库存不足' : !data.specification_names ? '请选择规格' : '确定'}}</div>
		</div>
	</div>
</template>

<script>
import api from '@/api/api'
import count from '@/components/count/count'
import storage from '@/common/storage'

export default {
	props: ['specType','goodsInfo'],
  data() {
  	return {
  		data: {}, // 存放规格数据
  		specIdArr: [], // 存放规格ID
  		specNameArr: [], // 存放规格名称
      itemIdArr: [],
  		goodsNum: 1, // 存放数量
      confirmGoodsObj: {} // 存放跳转到确认订单的商品信息
  	}
  },
  methods: {
  	// 关闭model
  	closeModel(){
      this.$emit('on-close')
  	},

  	// 规格Item点击事件
  	keepSpecIdClick(paIndex,id,name,){ // paIndex:外层循环下标 , id:规格ID, name:规格名称 
      this.$set(this.specIdArr, paIndex, id)
      this.$set(this.specNameArr, paIndex, name)
      this.itemIdArr = []
      for(let i=0; i<this.specIdArr.length; i++){
        if(this.specIdArr[i]){
          this.itemIdArr.push(this.specIdArr[i])
        }
      }
      if(this.itemIdArr.length == this.specData.length){
  		  this._calculatedPrice(this.specIdArr)
      }
  	},
  	
  	// 计算价格
  	_calculatedPrice(spec_id) {
  		api.calculatedPrice(this.goodsInfo.goods_id,spec_id)
      .then((res) => {
  			if(res.status ==='ok'){
          this.data = res.data
        }else if(res.status === 'error'){
          this.promptFun({
            content: res.data,
            type: 'error'
          })
        }
  		})
  	},

  	// 加
  	numPlus(count) {
  		this.goodsNum = count
  	},

  	// 减
  	numMinus(count) {
  		this.goodsNum = count
  	},

    // 加入购物车
    _addShoppingCarFun() {
      api.addShoppingCarFun({
        goods_id: this.goodsInfo.goods_id,
        goods_num: this.goodsNum,
        specification_id: this.data.specification_id
      })
      .then((res) => {
        if(res.status ==='ok'){
          this.closeModel() // 关闭model
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
  	
  	// 确定
  	determineFun() {
      if(this.specType === 'car'){
        this._addShoppingCarFun()
      }else{
        this.confirmGoodsObj = {
          goods_id: this.goodsInfo.goods_id,
          merchants_id: this.goodsInfo.merchants_id, // 商家ID
          specification_id: this.data.specification_id,
          num: this.goodsNum
        }
        storage.s_setItem('confirmGoodsObj',this.confirmGoodsObj)
        this.$router.push({
          path:'/confirmOrder'
        })
      }
  	}
  },
  computed:{
    specData () {
      return this.goodsInfo.goodsSpecificationBeans
    }
  },
  mounted() {

  },
  components: {
  	count
  }
}
</script>
