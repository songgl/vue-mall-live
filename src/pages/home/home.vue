<template>
  <div class="pageBox">
    <div class="box_touch">
      <!-- 轮播图 -->
      <div class="h175">
  		  <my-banner :bannerInfo='bannerInfo' :type="1"></my-banner>
      </div>
      <!-- 分类 -->
      <goods-class></goods-class>
      <!-- 推荐信息 -->
      <my-recommend></my-recommend>
    </div>
    <!-- footer -->
    <my-footer></my-footer>
  </div>
</template>

<script>
import api from '../../api/api'
import MyBanner from '../../components/banner/banner'
import GoodsClass from './private/goodsClass'
import MyRecommend from './private/recommend'
import MyFooter from '../../components/footer/footer'

export default {
  data() {
  	return {
  		bannerInfo: []
  	}
  },
  methods: {
  	// 获取首页banner图信息
    _getBannerFun () {
      api.getBannerFun(2)
      .then((res) => {
        if(res.status ==='ok'){
          for(let i=0;i<res.data.length;i++){
            this.bannerInfo.push(res.data[i])
          }
        }else if(res.status === 'error'){
          console.log(res.error)
        }
      })
    },
  },
  created() {
  	this._getBannerFun()
  },
  components: {
  	MyBanner,
    GoodsClass,
    MyRecommend,
    MyFooter
  }
}
</script>
