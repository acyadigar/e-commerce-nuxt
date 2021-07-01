import { mapState, mapActions} from 'vuex'

export default {
  computed: {
    ...mapState({
      cart: state => state.cart.cart
    }),
    onCart() {
      return this.cart.find(item => item._id == this.product._id)
    }
  },
  methods: {
    ...mapActions('cart', [
      'addToCart',
      'removeFromCart'
    ]),
    add() {
      this.addToCart(this.product)
    },
    remove() {
      this.removeFromCart(this.product)
    }
  }
}