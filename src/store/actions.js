import * as types from './mutations-types'

	// 设置loadingState
export const setLoading = function ({commit,state}, loadingState) {
	commit(types.SET_LOADINGSTATE,loadingState)
}

