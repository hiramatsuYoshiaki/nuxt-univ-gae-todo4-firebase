export const state = () => ({
  page: 'home'
})
export const mutations = {
  pagePathSet(state, payload) {
    state.page = payload
  }
}
