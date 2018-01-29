<template>
  <header class="headerBox">
		<div class="header">
			<div class="header-items item-left">
				<div class="left_icon icon" @click="backFun()"></div>
			</div>
			<div class="item-center" v-text="titleTxt"></div>
			<div class="header-items item-right">
			</div>
		</div>
		<slot></slot>
	</header>
</template>

<script>
export default {
  props:['titleTxt'],
}
</script>

<style scoped>
	.headerBox {
		background-color: #fff;
	}
	.header{
		display: flex;
		justify-content: center;
		align-items: center;
		height: .9rem;
		padding: 0 .2rem 0 .2rem;
		width: 100%;
		border-bottom:1px solid #e5e5e5;
	}
	.header-items{
		display: flex;
		align-items: center;
		flex: 1;
	}
	.item-left{
		justify-content: flex-start;
	}
	.item-left .icon{
		width: .44rem;
		height: .56rem;
	}
	.item-center {
		justify-content: center;
		font-size: .32rem;
	}
	.item-right {
		justify-content: flex-end
	}
</style>
