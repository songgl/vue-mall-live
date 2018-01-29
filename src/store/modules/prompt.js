import * as types from '../mutations-types'

const state = {
	promptData:{},
	promptState:false // 状态
}

const getters = {
	promptData : state => state.promptData,
	promptState : state => state.promptState,
}

const actions = {
	// 设置提示文本
	setPromptTxt ({commit}, obj) {
		commit(types.SET_PROMPTDATA,obj)
	},
	// 设置提示model状态
	setPromptState ({commit}, state){
		commit(types.SET_PROMPTSTATE, state)
	}
}

const mutations = {
	[types.SET_PROMPTDATA](state,promptData){
		state.promptData = promptData
	},

	[types.SET_PROMPTSTATE](state,promptState){
		state.promptState = promptState
	}
}

export default {
  state,
  getters,
  actions,
  mutations
}