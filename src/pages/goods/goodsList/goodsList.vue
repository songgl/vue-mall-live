<template>
  <div class="pageBox">
  	<my-header :titleTxt="$route.query.title">
      <!-- tab -->
      <div class="tabBox">
        <div class="tabItem" @click="tabGoodsListClick(1)">
          <div :class="{tab_act_color:type==1}">综合</div>
        </div>
        <div class="tabItem" @click="tabGoodsListClick(2)">
          <div :class="{tab_act_color:type==2}">销量</div>
        </div>
        <div class="tabItem" @click="sortClick(sortType)">
          <div :class="{tab_act_color:type==3 || type==4}">价格</div>
          <div class="ml5 price_sort_icon w6 h15" :class="{price_sort_rise_icon:type==4,price_sort_drop_icon:type==3}"></div>
        </div>
      </div>
    </my-header>
    <div class="box_touch">
      <load-mord :on-refresh="onRefresh" :on-infinite="onInfinite">
        <goods-item :item="item" :type="'goods'" :class="{ bor_t: index != 0 }" v-for="(item,index) in goodsList" :key="item.goods_id"></goods-item>
      </load-mord>
    </div>
  </div>
</template>

<script>
import api from '../../../api/api'
import MyHeader from '../../../components/header/header'
import LoadMord from '../../../components/loadMord/loadMord'
import GoodsItem from '../../../components/goodsItem/goodsItem'

export default {
	data() {
		return {
			allPage: null, // 总页数
			page:1, // 当前页数，默认为1
			type:1, // 类型
			sortType:0,
			goodsList:[]
		}
	},
	methods: {
    // 获取商品列表
		_getGoodsListFun(type,page) {
      this.setLoading(true)
			this.page = page || 1
			this.type = type || 1
      api.getGoodsListFun({
        name: '',
        class_uuid: this.$route.query.class_uuid,
        type: this.type,
        p: this.page
      }).then((res) => {
        this.setLoading(false)
        if(res.status ==='ok'){
        	this.allPage = res.data.page
          for(let i=0;i<res.data.goodsBean.length;i++){
            this.goodsList.push(res.data.goodsBean[i])
          }
        }else if(res.status === 'error'){
          console.log(res.error)
        }
      })
		},
		/*下拉刷新*/
    onRefresh(done) {
      this.goodsList = []
      this._getGoodsListFun (this.type)
      done() // call done
    },
    /*上拉加载*/
    onInfinite(done) {
      let vm = this;
      if(this.allPage > this.page){ // 总页数大于当前页数
        this._getGoodsListFun(this.type,++this.page)
        done(true)
      }else{
        done(false) // call done
      }
    },
    /*tab切换使用*/
    tabGoodsListClick(type) {
    	this.goodsList = []
    	this._getGoodsListFun(type)
    },
    /*高低价排序*/
    sortClick(sortType) {
    	if(sortType==0){
    		this.sortType = 1;
    		this.tabGoodsListClick(3)
    	}else{
    		this.sortType =0;
    		this.tabGoodsListClick(4)
    	}
    }
	},
	mounted() {
		this.goodsList = []
		this._getGoodsListFun()
	},
  components: {
  	MyHeader,
  	LoadMord,
  	GoodsItem
  }
}
</script>

<style scoped>
  .tabBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color:#fff;
    height: .9rem;
    font-size: .24rem;
    color:#999;
    border-bottom: 1px solid #e5e5e5;
  }
  .tabItem {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
  }
  .tab_act_color {
    color: red
  }
  .price_sort_icon { 
    background: url(../../../assets/icon/Sales-volume_unselected@2x.png) no-repeat center;
    background-size: cover;
  }
  .price_sort_rise_icon {
    background: url(../../../assets/icon/Sales-volume_High-to-low@2x.png) no-repeat center;
    background-size: cover;
  }
  .price_sort_drop_icon {
    background: url(../../../assets/icon/Sales-volume_Low-to-high@2x.png) no-repeat center;
    background-size: cover;
  }
</style>
