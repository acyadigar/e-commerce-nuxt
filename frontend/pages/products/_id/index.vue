<script>
import { mapState } from 'vuex'
import cartHandler from '@/mixins/cartHandler'

export default {
  head() {
    return {
      title: `E-Bazaar | ${this.product.title}`,
      meta: [
        {
          hid: 'product',
          name: 'product',
          content: this.product.info,
        },
      ],
    }
  },
  mixins: [cartHandler],
  async asyncData({ $axios, params, error }) {
    try {
      const product = await $axios.$get(`/product/${params.id}`)
      return { product }
    } catch (e) {
      return error({ message: 'No product exists!' })
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
    isLoggedin() {
      return this.user.username ? true : false
    },
    sellers() {
      return this.product.sellers.map((seller) => seller.username)
    },
    undiscounted() {
      return this.product.price * 1.2
    },
    randomStar() {
      return Math.round(Math.random() * 5) + 1
    },
    remainStars() {
      if (this.randomStar != 5) return 5 - this.randomStar
    },
  },
  methods: {
    refreshData() {
      this.$nuxt.refresh()
    }
  }
}
</script>

<template>
  <b-container>
    <b-row class="mt-3">
      <b-col cols="12" md="6">
        <b-card-img class='image' :src="product.image" :alt="product.title"></b-card-img>
      </b-col>

      <!-- Product info starts -->
      <b-col cols="12" md="6">
        <div class="product-info border rounded p-3">
          <h1>{{ product.title }}</h1>
          <b-row class="align-items-center pl-3">
            <span class="discount-card bg-danger">%3 discount</span>
            <p class="undiscounted price m-0">{{ undiscounted }}₺</p>
          </b-row>
          <b-row class="align-items-center pl-3">
            <span class="price-card bg-success"> On Cart %12</span>
            <p class="price m-0">{{ product.price }}₺</p>
          </b-row>
          <b-row class="pl-3 mt-2">
            <b-btn
              @click="add"
              variant="outline-primary"
              v-if="!onCart"
              :disabled="!isLoggedin"
            >
              <b-icon icon="cart-fill"> </b-icon>
              Add To Cart
            </b-btn>
            <b-btn
              @click="remove"
              variant="outline-danger"
              v-else
              :disabled="!isLoggedin"
            >
              <b-icon icon="cart"> </b-icon>
              Remove From Cart
            </b-btn>
          </b-row>
          <b-row
            class="
              sellers
              border
              p-3
              mt-3
              align-items-center
              justify-content-between
            "
          >
            <h6 class="m-0">
              Seller:
              <nuxt-link
                class="seller-link"
                :to="`/user/${seller}`"
                v-for="seller in sellers"
                :key="seller"
              >
                {{ seller }}
              </nuxt-link>
            </h6>
            <div class="stars">
              <b-icon
                v-for="star in Array(randomStar)"
                :key="star"
                icon="star-fill"
                class="text-warning"
              ></b-icon>
              <span v-if="remainStars > 0">
                <b-icon
                  v-for="star in Array(remainStars)"
                  :key="star"
                  icon="star"
                  class="text-warning"
                ></b-icon>
              </span>
              <span class="ml-2">{{ randomStar }}/5</span>
            </div>
          </b-row>
          <b-row class="info mt-3">
            <b-col cols="12">
              <p>
                {{ product.info }}
              </p>
            </b-col>
          </b-row>
        </div>
      </b-col>
      <!-- Product section ends -->
    </b-row>
    <b-row>
      <Comments 
        :product='product' 
        :isLoggedin='isLoggedin'
        :user='user'
        @update-comment='refreshData'
      />
    </b-row>
  </b-container>
</template>

<style scoped>
.image,
.product-info {
  min-height: 22rem !important;
}
.product-info {
  background-color: #ebeff5;
  overflow-wrap: break-word;
}
.product-info h1 {
  font-size: 1.5rem;
}
.discount-card,
.price-card {
  width: 5rem;
  margin-right: 1rem;
  font-weight: bold;
  font-size: 0.9rem;
  text-align: center;
  color: white;
  border-radius: 0.2rem;
}
.price {
  font-size: 2.5rem;
  font-weight: bold;
}
.undiscounted {
  font-size: 1rem;
  text-decoration: line-through;
  color: grey;
}
.sellers {
  background-color: rgb(255, 247, 247);
  border-radius: 5px;
}
@media screen and (max-width: 768px) {
  .product-info {
    margin-block: 2rem;
  }
}
</style>
