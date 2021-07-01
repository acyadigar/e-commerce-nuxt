import Cookies from 'js-cookie'

export const state = () => ({
  user: {},
  token: null,
})

export const mutations = {
  SET_USER(state, data) {
    state.user = { email: data.email, username: data.username }
    state.token = data.token
  },
  LOGOUT(state) {
    [state.user, state.token] = [{}, null]
  }
}

export const actions = {
  async initAuth({ commit }, token) {
    const result = await this.$axios.post('/auth/verify', { token })
    const user = {
      ...result.data,
      token
    }
    commit('SET_USER', user)
  },
  async register({ commit }, data) {
    const result = await this.$axios.post('/auth/register', data)
    Cookies.set('Token', result.data.token, {expires: 1})
    commit('SET_USER', result.data)
  },
  async editUser({ commit }, data) {
    const result = await this.$axios.patch('/auth/edit', data)
    Cookies.set('Token', result.data.token, {expires: 1})
    commit('SET_USER', result.data)
  },
  async login({ commit }, data) {
    const result = await this.$axios.post('/auth/login', data)
    Cookies.set('Token', result.data.token, {expires: 1})
    commit('SET_USER', result.data)
  },
  async logout({ commit }) {
    Cookies.remove('Token')
    localStorage.removeItem('cart')
    commit('LOGOUT')
  }
}