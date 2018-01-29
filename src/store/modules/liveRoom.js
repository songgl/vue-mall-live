import * as types from '../mutations-types'

const state = {
	liveInfo: {}, // 直播间信息
	liveUserInfo: [], // 直播间用户信息
	topGoods: {}, // 直播间商品列表
	giftNum: null, // 直播间礼物数量
	peopleNum: null, // 直播间人数
	isFollow: null // 关注状态
}

const getters = {
	liveInfo : state => state.liveInfo,
	liveUserInfo : state => state.liveUserInfo,
	topGoods : state => state.topGoods,
	giftNum : state => state.giftNum,
	peopleNum : state => state.peopleNum,
	isFollow : state => state.isFollow
}

const actions = {
	// 设置直播间信息
	setLiveInfo ({commit}, obj) {
		commit(types.SET_LIVEINFO,obj)
	},
	// 设置直播间用户信息
	setLiveUserInfo ({commit}, arr) {
		commit(types.SET_LIVEUSERINFO, arr)
	},
	// 设置直播间商品列表
	setTopGoods ({commit}, obj) {
		commit(types.SET_TOPGOODS, obj)
	},
	// 设置礼物数量
	setGiftNum ({commit}, num){
		commit(types.SET_GIFTNUM, num)
	},
	// 设置直播间人数
	setPeopleNum ({commit}, num){
		commit(types.SET_PEOPLENUM, num)
	},
	// 设置关注状态
	setIsFollow ({commit}, type){
		commit(types.SET_ISFOLLOW, type)
	}
}

const mutations = {
	[types.SET_LIVEINFO](state,liveInfo){
		state.liveInfo = liveInfo
	},

	[types.SET_LIVEUSERINFO](state,liveUserInfo){
		state.liveUserInfo = liveUserInfo
	},

	[types.SET_TOPGOODS](state,topGoods){
		state.topGoods = topGoods
	},

	[types.SET_GIFTNUM](state,giftNum){
		state.giftNum = giftNum
	},

	[types.SET_PEOPLENUM](state,peopleNum){
		state.peopleNum = peopleNum
	},

	[types.SET_ISFOLLOW](state, type){
		state.isFollow = type
	}
}

export default {
  state,
  getters,
  actions,
  mutations
}