import { post, get } from './config'
import storage from '../common/storage'

export default {
	// 获取直播分类
	getLiveClass () {
		return get('api/live/live_class')
	},

	// 获取直播列表
	getLiveList (type,p) {
		return post(
			'api/live/anchor_list',
			{
				uid : storage.s_getItem("uid"),
        token : storage.s_getItem("token"),
        p,
        type
			}
		)
	},
	// 进入/退出直播间
	intoLiveRoom (live_id) {
		return post(
			'api/live/into_live',
			{
				uid : storage.s_getItem("uid"),
        token : storage.s_getItem("token"),
        live_id
			}
		)
	},
	// 退出直播间
	outLiveRoom (live_id) {
		return post(
			'api/live/into_live',
			{
				uid : storage.s_getItem("uid"),
        token : storage.s_getItem("token"),
        live_id
			}
		)
	},
	// 获取直播信息
	getLiveInfo (live_id) {
		return post(
			'api/live/live_info',
			{
				live_id
			}
		)
	},
	// 获取主播信息
	getAnchorInfo (live_id,user_id){
		return post(
			'api/live/get_live_info',
			{
				uid : storage.s_getItem("uid"),
        token : storage.s_getItem("token"),
				live_id,
				user_id
			}
		)
	},
	// 直播间用户列表
	getRoomUser (live_id) {
		return post(
			'api/live/show_viewer',
			{
				uid : storage.s_getItem("uid"),
        token : storage.s_getItem("token"),
				page: 1,
        pagesize: 5,
				live_id
			}
		)
	},
	// 关注与取消关注
	isFollow (user_id2,type) {
		return post(
			'api/live/follow',
			{
				uid : storage.s_getItem("uid"),
        token : storage.s_getItem("token"),
        user_id2,
        type
			}
		)
	},
	// 获取直播商品列表
	getLiveGoods (live_id) {
		return post(
			'api/merchant/live_goods',
			{
				uid : storage.s_getItem("uid"),
        token : storage.s_getItem("token"),
        live_id
			}
		)
	},
	// 用户的余额
	getUserMoney () {
		return post(
			'api/live/get_money',
			{
				uid : storage.s_getItem("uid"),
        token : storage.s_getItem("token")
			}
		)
	},
	// 获取礼物列表
	getGift () {
		return post(
			'api/live/gift_list',
			{
				uid : storage.s_getItem("uid"),
        token : storage.s_getItem("token")
			}
		)
	},
	// 主播收到的礼物数量
	getGiftCount (user_id) {
		return post(
			'api/live/get_get_money',
			{
				uid : storage.s_getItem("uid"),
        token : storage.s_getItem("token"),
        user_id
			}
		)
	},
	// 送礼
	sendGift (data) {
		return post(
			'api/live/give_gift',
			{
				uid : storage.s_getItem("uid"),
        token : storage.s_getItem("token"),
        ...data
			}
		)
	}
}