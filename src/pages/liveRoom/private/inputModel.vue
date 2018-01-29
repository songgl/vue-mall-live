<template>
  <div class="box" v-if="state == 2">
		<div class="box_direction boxCenter">
			<div class="grid_cell" @click.stop="close"></div>
			<!-- 输入model -->
			<div class="box_between inputBox">
				<div class="grid_cell box_center itemInput">
					<input ref="msgInput" v-model="liveMsg" type="text" placeholder="说些什么吧">
				</div>
				<div class="msgBtn box_center" @click.stop="sendMsg">发送</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['state'],
	data () {
		return {
			liveMsg: null
		}
	},
	watch: {
		state () {
			if(this.state == 2){
				this.$nextTick(function(){
					this.$refs.msgInput.focus()
				})
			}
		}
	},
  methods: {
  	// 关闭
  	close () {
  		this.$emit('on-close',2)
  	},
  	// 发送消息
  	sendMsg () {
  		if(this.liveMsg){
  			this.$emit('on-send', this.liveMsg)
  			this.liveMsg = null
  			this.close()
  		}else{
  			this.promptFun({
  				content: '内容不能为空',
  				type: 'error'
  			})
  		}
  	}
  }
}
</script>

<style scoped>
	.box{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.boxCenter{
		position: relative;
		width: 100%;
		height: 100%;
	}
	.inputBox{
		border-top: 1px solid #e5e5e5;
		height: 1rem;
		background-color: #000;
		padding: .3rem;
	}
	.itemInput{
		padding: 0 .2rem;
		margin-right: .2rem;
	}
	.itemInput input{
		width: 100%;
		background-color: transparent;
		font-size: .24rem;
		color: #fff;
	}
	.msgBtn{
		background-color: #3BB20B;
		padding: 0 .3rem;
		border-radius: .1rem;
		color: #fff;
		font-size: .28rem;
		height: .6rem;
	}
</style>
