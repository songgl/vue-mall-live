import * as types from './mutations-types'

const mutations = {
	[types.SET_LOADINGSTATE](state,loadingState) {
		state.loadingState = loadingState
	}
}

export default mutations