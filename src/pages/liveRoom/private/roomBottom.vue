<template>
  <div class="box box_between">
		<div class="liveRoom_goods_icon icon" @click.stop="open(1)"></div>
		<div class="box_end">
			<div class="liveRoom_msg_icon icon" @click.stop="open(2)"></div>
			<div class="liveRoom_gift_icon icon" @click.stop="open(3)"></div>
			<router-link to="home">
				<div class="liveRoom_close_icon icon"></div>
			</router-link>
		</div>
	</div>
</template>

<script>
export default {
  methods: {
  	open (type) {
  		this.$emit('on-open',type)
  	}
  }
}
</script>

<style scoped>
	.icon{
		width: .6rem;
		height: .6rem;
		margin-left: .4rem;
	}
	.liveRoom_close_icon {
		background: url(../../../assets/icon/kanzhibo_guanbi@2x.png) no-repeat center;
		background-size: cover;
	}
	.liveRoom_goods_icon {
		background: url(../../../assets/icon/kanzhibo_shangpingku@2x.png) no-repeat center;
		background-size: cover;
	}
	.liveRoom_gift_icon {
		background: url(../../../assets/icon/zengsongliwu@2x.png)no-repeat center;
		background-size: cover;
	}
	.liveRoom_msg_icon {
		background: url(../../../assets/icon/fasongxiaoxi@2x.png) no-repeat center;
		background-size: cover;
	}

	.box{
		height: .8rem;
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		padding: 0 .3rem .2rem 0;
	}
</style>
