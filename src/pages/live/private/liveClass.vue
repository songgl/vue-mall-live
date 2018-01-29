<template>
  <div class="box_start box">
		<router-link :to="{path:'/'}" v-for="item in liveClassList" :key="item.live_class_id">
			<div class="classImgBox">
				<img :src="item.img" alt="">
			</div>
		</router-link>
	</div>
</template>

<script>
import api from '../../../api/live'
export default {
	data () {
		return {
			liveClassList: []
		}
	},
  methods: {
  	// 获取直播分类
  	_getLiveClass () {
  		api.getLiveClass()
  		.then((res) => {
  			if(res.status === 'ok'){
  				this.liveClassList = res.data
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
  	this._getLiveClass()
  }
}
</script>

<style scoped>
	.box{
		height: 1.8rem;
		background-color: #fff;
		padding: 0 .1rem;
		overflow-x: auto;
		white-space: nowrap;
		margin-bottom: .2rem;
	}
	.box a{
		text-align: center;
		padding:0 .1rem;
		display: block;
	}
	.classImgBox{
		width: 1.6rem;
		height: 1.6rem;
		margin: 0 auto;
	}
	.classImgBox img{
		border-radius: 50%;
	}
</style>
