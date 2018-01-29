<template>
  <div class="loadingPageBox" v-if="loadingState">
    <div class="loading-conent">
      <div class="loadingBox">
    	 <div class="loading"></div>
      </div>
      <div class="loadingTxt">正在加载</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'loadingState'
    ])
  }
}
</script>

<style scoped>
	.loadingPageBox {
		width:100%;
		height: 100%;
		overflow: hidden;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.loading-conent {
    padding: .4rem;
    border-radius: .05rem;
    background-color: rgba(0,0,0,.8)
	}
  .loadingBox {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .loadingTxt {
    font-size: .24rem;
    color: #fff;
    text-align: center;
    margin-top: .1rem;
  }
  .loading {
    width: .6rem;
    height: .6rem;
    border: 1px #fff solid;
    border-radius: 50%;
    -webkit-animation: rotation 1s ease-in-out infinite;
    -moz-animation: rotation 1s ease-in-out infinite;
    animation: rotation 1s ease-in-out infinite;
  }
  .loading:after {
    width: .1rem;
    height: .1rem;
    background-color: rgba(255,255,255,1);
    border-radius: 100%;
    position: absolute;
    content: "";
  }
  @-webkit-keyframes rotation{
    0%{-webkit-transform: rotate(0deg);}
    100%{-webkit-transform: rotate(360deg);}
  }
  @-moz-keyframes rotation{
    0%{-moz-transform: rotate(0deg);}
    100%{-moz-transform: rotate(360deg);}
  }
  @keyframes rotation{
    0%{transform: rotate(0deg);}
    100%{transform: rotate(360deg);}
  }
	
</style>
