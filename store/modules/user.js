const user = {
	state: {
		token: uni.getStorageSync('token'),
		user: {},
		isAuthorize: uni.getStorageSync('token') !== undefined && uni.getStorageSync('token') !== ''
	},
	mutations: {
		SET_AUTHORIZE: (state, isAuthorize) => {
			state.isAuthorize = isAuthorize
		},
	},
	actions: {

	}
}

export default user
