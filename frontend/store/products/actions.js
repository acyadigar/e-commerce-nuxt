export default {
  async addProduct(_, product) {
    const user = this.state.user
    const result = await this.$axios.post('/product', { user, product })
    return result.data
  },
  async makeComment(_, userComment) {
    const { productId, comment } = userComment
    const result = await this.$axios.post(`/product/${productId}/comment`, {comment})
    return result.data
  },
  async deleteComment(_, comment) {
    const { productId, commentId } = comment
    const result = await this.$axios.delete(`/product/${productId}/comment/${commentId}`)
    return result.data
  },
  async deleteProduct(_, productId) {
    await this.$axios.delete(`/product/${productId}`)
  }
}
