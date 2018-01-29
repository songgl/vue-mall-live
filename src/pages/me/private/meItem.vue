<template>
	<div class="itemBox">
		<router-link to="my_account" class="item item_b item_r">
			<div>
				<div class="itemImg my_account_icon"></div>
				<div class="itemTxt">我的账户</div>
			</div>
		</router-link>
		<router-link to="my_collection" class="item item_b item_r">
			<div>
				<div class="itemImg my_collection_icon"></div>
				<div class="itemTxt">我的收藏</div>
			</div>
		</router-link>
		<router-link to="my_follow" class="item item_b">
			<div>
				<div class="itemImg my_followt_icon"></div>
				<div class="itemTxt">我的关注</div>
			</div>
		</router-link>
		<router-link to="myAddress" class="item item_b item_r">
			<div>
				<div class="itemImg my_address_icon"></div>
				<div class="itemTxt">我的地址</div>
			</div>
		</router-link>
		<router-link to="my_coupon" class="item item_b item_r">
			<div>
				<div class="itemImg my_coupon_icon"></div>
				<div class="itemTxt">我的优惠券</div>
			</div>
		</router-link>
		<router-link to="becomeSeller" class="item item_b">
			<div>
				<div class="itemImg becoming_a_seller_icon"></div>
				<div class="itemTxt">成为卖家</div>
			</div>
		</router-link>
		<router-link to="" class="item item_r">
			<div>
				<div class="itemImg set_up_icon"></div>
				<div class="itemTxt">设置</div>
			</div>
		</router-link>
		<router-link to="" class="item item_r">
			<div>
				<div class="itemImg help_icon"></div>
				<div class="itemTxt">帮助</div>
			</div>
		</router-link>
		<router-link to="about?id=13&title=关于我们" class="item">
			<div>
				<div class="itemImg about_icon"></div>
				<div class="itemTxt">关于我们</div>
			</div>
		</router-link>
	</div>
</template>

<style scoped>
	.itemBox {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
		margin: .2rem 0 .2rem 0;
		background-color: #fff;
		font-size: .24rem;
	}
	.item {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 33.333%;
		height: 1.9rem;
	}
	.item_b {
		border-bottom: 1px solid #e5e5e5;
	}
	.item_r {
		border-right: 1px solid #e5e5e5;
	}
	.itemImg {
		width: .5rem;
		height: .5rem;
		margin: 0 auto;
	}
	.itemTxt {
		text-align: center;
		margin-top: .1rem;
	}
	/*功能区icon*/
	.my_account_icon { background: url(../../../assets/icon/wode_zhanghao@2x.png) no-repeat center;background-size: cover; }
	.my_collection_icon { background: url(../../../assets/icon/wode_shoucang@2x.png) no-repeat center;background-size: cover; }
	.my_followt_icon { background: url(../../../assets/icon/wode_guanzhu@2x.png) no-repeat center;background-size: cover; }
	.my_address_icon { background: url(../../../assets/icon/wode_dizhi@2x.png) no-repeat center; background-size: cover; }
	.my_coupon_icon { background: url(../../../assets/icon/wode_youhuiquan@2x.png) no-repeat center;background-size: cover; }
	.becoming_a_seller_icon { background: url(../../../assets/icon/wode_chengweimaijia@2x.png) no-repeat center;background-size: cover; }
	.set_up_icon { background: url(../../../assets/icon/wode_shezhi@2x.png) no-repeat center;background-size: cover; }
	.help_icon { background: url(../../../assets/icon/wode_bangzhu@2x.png) no-repeat center;background-size: cover; }
	.about_icon { background: url(../../../assets/icon/wode_guanyuwomen@2x.png) no-repeat center;background-size: cover; }
</style>
