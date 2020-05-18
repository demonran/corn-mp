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
		SET_USER: (state, user) => {
			state.user = user
		},
	},
	actions: {

	}
}

export default user
