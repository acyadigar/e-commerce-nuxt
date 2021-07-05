export default {
  async addProduct(_, product) {
    const user = this.state.user
    const result = await this.$axios.post('/product', { user, product })
    return result.data
  },
}
