<script>
import { mapState } from 'vuex'
import cartHandler from '@/mixins/cartHandler'

export default {
  mixins: [cartHandler],
  props: ['product', 'isSmall'],
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
    isSmallCol() {
      return this.isSmall ? 6 : 4
    },
  },
  methods: {
    signIn() {
      this.$bvModal.show('auth-modal-register')
    },
  },
}
</script>
<template>
  <b-col cols="12" :md="isSmallCol" class="product-card mb-3">
    <b-row class="border m-0 rounded">
      <b-col cols="5" class="p-0">
        <b-card-img
          class="image"
          :src="product.image"
          :alt="product.title"
        ></b-card-img>
      </b-col>
      <b-col cols="7" class="pl-4">
        <h1 class="card-title">{{ product.title }}</h1>
        <p class="price text-info">{{ product.price }}₺</p>
        <div class="cart-handlers" v-if="Object.keys(user).length">
          <div @click="add" class="add" v-if="!onCart">
            <b-icon icon="cart-check"></b-icon>
            Add To Cart
          </div>
          <div @click="remove" class="remove" v-else>
            <b-icon icon="cart"></b-icon>
            Remove From Cart
          </div>
        </div>
        <div class="cart-handler-else" v-else>
          <div @click="signIn" class="add">
            <b-icon icon="cart-check"></b-icon>
            Add To Cart
          </div>
        </div>
        <nuxt-link :to="`/products/${product._id}`" class="go-detail">
          <b-icon icon="eye"></b-icon>
        </nuxt-link>
      </b-col>
    </b-row>
  </b-col>
</template>

<style scoped>
.image {
  width: 10rem;
  height: 10rem;
}
.card-title {
  margin-top: 0.8rem;
  font-size: 1rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  width: inherit;
  height: 2.5rem;
  overflow-wrap: break-word;
}
.price {
  font-size: 1.8rem;
}
.add,
.remove {
  cursor: pointer;
}
.add:hover {
  color: #5cb85c;
}
.remove:hover {
  color: #d9534f;
}
.go-detail {
  position: absolute;
  bottom: 0;
  right: 0.1rem;
  color: inherit;
}
.go-detail:hover {
  color: #5cb85c;
  cursor: pointer;
}
</style>
