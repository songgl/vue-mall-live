<template>
  <div class="classBox">
    <div class="itemBox" v-for="item in goodsClassList">
      <router-link :to="{path:'goodsList',query:{class_uuid:item.class_uuid,title:item.title}}" class="itemImgBox">
        <img :src="item.img" :alt="item.title" />
      </router-link>
    </div>
  </div>
</template>

<script>
import api from '../../../api/api'
export default {
  data() {
  	return {
  		goodsClassList:[]
  	}
  },
  methods: {
  	_getGoodsClassFun() {
      api.getGoodsClassFun()
      .then((res) => {
        if(res.status ==='ok'){
          for(let i=0;i<res.data.length;i++){
            this.goodsClassList.push(res.data[i])
          }
        }else if(res.status === 'error'){
          console.log(res.error)
        }
      })
    }
  },
  created() {
  	this._getGoodsClassFun()
  }
}
</script>

<style scoped>
  .classBox {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    background: #fff;
  }
  .itemBox {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .itemImgBox {
    width: 1.5rem;
    height: 1.4rem;
    margin: 0 auto;
    display: block;
  }
</style>
