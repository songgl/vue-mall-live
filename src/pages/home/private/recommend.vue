<template>
  <div>
    <div v-for="item in recommendList">
      <div class="w_b100 h120">
        <img :src="item.img" alt="" />
      </div>
      <!-- 3 -->
      <div class="h240 box_start" v-if="item.layout==3">
        <div class="grid_cell">
          <div class="h120">
            <img :src="item.seedBeans[0].img" alt="">
          </div>
          <div class="h120">
            <img :src="item.seedBeans[1].img" alt="">
          </div>
        </div>
        <div class="w_b33 h240">
          <img :src="item.seedBeans[2].img" alt="">
        </div>
      </div>
      <!-- 4 -->
      <div class="h240 box_start flex_wrap" v-if="item.layout==4">
        <div class="w_b50 h120" v-for="four in item.seedBeans">
          <img :src="four.img" alt="">
        </div>
      </div>
      <!-- 5 -->
      <div class="h240 box_start flex_wrap" v-if="item.layout==5">
        <div class="h120 w_b33" :class="{'w_b50':(index==0||index==1)}"  v-for="(five, index) in item.seedBeans">
          <img :src="five.img" alt="" />
        </div>
      </div>
      <!-- 6 -->
      <div class="h240 box_start flex_wrap" v-if="item.layout==6">
        <div class="w_b33 h120" v-for="six in item.seedBeans">
          <img :src="six.img" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../../api/api'

export default {
  data() {
  	return {
  		recommendList:[]
  	}
  },
  methods: {
  	_getRecommendFun() {
      this.setLoading(true)
      api.getRecommendFun().then((res) => {
        this.setLoading(false)
        if(res.status ==='ok'){
          for(let i=0;i<res.data.length;i++){
            this.recommendList.push(res.data[i])
          }
        }else if(res.status === 'error'){
          this.promptFun({
            content: res.data,
            type: 'error'
          })
        }
      })
    }
  },
  created() {
  	this._getRecommendFun()
  }
}
</script>
