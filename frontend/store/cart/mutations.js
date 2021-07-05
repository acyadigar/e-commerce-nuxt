export default {
  SET_CART(state, data) {
    state.cart = data
  },
  ADD_TO_CART(state, data) {
    state.cart.push(data)
  },
  REMOVE_FROM_CART(state, data) {
    state.cart = state.cart.filter((item) => item._id != data._id)
  },
}
