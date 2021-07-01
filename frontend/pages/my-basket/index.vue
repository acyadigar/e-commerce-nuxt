<script>
import cartHandler from '@/mixins/cartHandler'

export default {
  mixins: [cartHandler],
  computed: {
    sum() {
      return this.cart.reduce((sum, product) => sum + parseInt(product.price), 0)
    }
  },
  methods: {
    pushLink() {
      this.$nuxt.$router.push('/products')
    }
  }
}
</script>

<template>
<b-container class="pt-3">
  <h1 class="text-info">CART</h1>
  <div class="cart" v-if="cart.length">
    <b-row class="cart-info">
      <b-col cols='12' md='4' class="mb-3">
        <div class="card-info border p-3">
        <p><span class="text-info">{{cart.length}}</span> products you have on the cart.</p>
          <div class="product-title" v-for="product in cart" :key='product._id'>
            <p class="d-flex justify-content-between">
              <span class="col-7">{{product.title}}</span>
              <span>- {{product.price}}</span>
            </p>
          </div>
          <hr>
            <p class="d-flex justify-content-between font-weight-bold">
              <span class="text-warning">Sum: </span>
              <span>{{sum}}$</span>
            </p>
            <b-button @click='pushLink' variant='outline-secondary'>Continue Shopping</b-button>
            <b-button variant='primary'>Buy!</b-button>
        </div>
      </b-col>
      <b-col cols='12' md='8'>
        <b-row>
          <ProductCard 
          v-for="product in cart"
          :key="product._id"
          :product='product'
          :isSmall='true'/>
        </b-row>
      </b-col>
    </b-row>
  </div>
  <div class="no-cart" v-else>
    <p>Your cart is empty.</p>
    <nuxt-link to='/products'>Click</nuxt-link>
    <span>here to look around.</span>
  </div>  
</b-container>
</template>