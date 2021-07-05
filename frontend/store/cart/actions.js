export default {
  setCart({ commit }) {
    const data = JSON.parse(localStorage.getItem('cart'))
    commit('SET_CART', data)
  },
  addToCart({ commit }, data) {
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([data]))
    } else {
      const cart = JSON.parse(localStorage.getItem('cart'))
      cart.push(data)
      localStorage.setItem('cart', JSON.stringify(cart))
    }
    commit('ADD_TO_CART', data)
  },
  removeFromCart({ commit }, data) {
    let cart = JSON.parse(localStorage.getItem('cart'))
    cart = cart.filter((product) => product._id != data._id)
    localStorage.setItem('cart', JSON.stringify(cart))

    commit('REMOVE_FROM_CART', data)
  },
}
