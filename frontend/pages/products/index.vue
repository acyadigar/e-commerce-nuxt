<script>
export default {
  watchQuery: ['page'],
  async asyncData({ $axios, route }) {
    const [perPage, currentPage] = [
      route.query.perPage || 6,
      route.query.page || 1,
    ]
    let products = await $axios.get(
      `/product/all/paginated?page=${currentPage}&perPage=${perPage}`
    )
    const productsLength = products.data.productsLength
    products = products.data.products
    return { products, productsLength, currentPage, perPage }
  },
  computed: {
    pages() {
      return Math.ceil(this.productsLength / this.perPage)
    },
  },
  methods: {
    link(pageNum) {
      return pageNum == 1 ? '?' : `?page=${pageNum}`
    },
  },
}
</script>

<template>
  <b-container>
    <h1 class="text-center">Here are the products which are added recently!</h1>
    <b-row>
      <ProductCard
        id="product-card"
        v-for="product in products"
        :key="product._id"
        :product="product"
        :isSmall="false"
      />
    </b-row>
    <div class="overflow-auto mt-4">
      <b-pagination-nav
        :link-gen="link"
        :number-of-pages="pages"
        pills
        align="center"
        use-router
      ></b-pagination-nav>
    </div>
  </b-container>
</template>
