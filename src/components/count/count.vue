<template>
  <div class="countBox">
		<div class="items" @click="minusClick">-</div>
		<div class="inputBox">
			<input readonly v-model="count" type="text">
		</div>
		<div class="items" @click="plusClick">+</div>
	</div>
</template>

<script>
export default {
	props: ['maxNum'],
	data() {
		return {
			count:1
		}
	},
  methods: {
  	/*
  	* 加
  	*/
  	plusClick() {
  		if(this.count<=this.maxNum){
  			++this.count
  		}else{
  			alert("不能再加了")
  		}
  		console.log(this.count)
  		this.$emit('on-plus',this.count)
  	},
  	minusClick() {
  		if(this.count>1){
  			--this.count
  		}else{
  			alert("不能再减了")
  		}
  		console.log(this.count)
  		this.$emit('on-minus',this.count)
  	}
  }
}
</script>

<style scoped>
  .countBox,.items,.inputBox {
    display: flex;
    justify-content:center;
    align-items:center;
  }
  .countBox .items {
    height: .44rem;
    width: .44rem;
    background-color: #ccc
  }
  .inputBox input{
    width: .8rem;
    height: .4rem;
    text-align:center;
  }
</style>
