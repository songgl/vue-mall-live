<template>
	<footer>
		<slot></slot>
	  <div class="itemBox" v-show="$route.query.carType != 2">
			<router-link to="live" class="items">
				<div class="footer_live_icon live"></div>
			</router-link>
			<div class="itemLine"></div>
			<router-link to="home" class="items">
				<div class="footer_mall_icon mall"></div>
			</router-link>
			<div class="itemLine"></div>
			<router-link :to="{path:'shoppingCar'}" class="items">
				<div class="footer_car_icon car"></div>
			</router-link>
			<div class="itemLine"></div>
			<router-link to="me" class="items">
				<div class="footer_me_icon me"></div>
			</router-link>
		</div>
	</footer>

</template>

<style scoped>
	.itemBox {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		background-color: #fff;
		height: .8rem;
		border-top: 1px solid #e5e5e5
	}
	.items {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
	.itemLine {
		width: 1px;
		height: 50%;
		background-color: #ccc;
	}
	.items div{
		width: .8rem;
		height: .8rem;
	}
	.router-link-active .live {background: url(../../assets/icon/zhibo@2x.png) no-repeat center;background-size: cover;}
	.router-link-active .mall {background: url(../../assets/icon/shangcheng@2x.png) no-repeat center;background-size: cover;}
	.router-link-active .car {background: url(../../assets/icon/gouwuche@2x.png) no-repeat center;background-size: cover;}
	.router-link-active .me {background: url(../../assets/icon/wode@2x.png) no-repeat center;background-size: cover;}
	
	.footer_live_icon { background: url(../../assets/icon/zhibo1@2x.png) no-repeat center;background-size: cover; }
	.footer_mall_icon { background: url(../../assets/icon/shangcheng1@2x.png) no-repeat center;background-size: cover; }
	.footer_car_icon { background: url(../../assets/icon/gouwuche1@2x.png) no-repeat center;background-size: cover; }
	.footer_me_icon { background: url(../../assets/icon/wode1@2x.png) no-repeat center;background-size: cover; }

</style>
