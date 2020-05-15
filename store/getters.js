const getters = {
  token: state => state.user.token,
  user: state => state.user.user,
  isAuthorize: state => state.user.isAuthorize,
}
export default getters