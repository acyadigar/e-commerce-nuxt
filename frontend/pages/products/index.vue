<script>
export default {
  watchQuery: ['page', 'search'],
  async asyncData({ $axios, route }) {
    let products;
    const search = route.query.search
    const [perPage, currentPage] = [route.query.perPage || 6, route.query.page || 1]

    if (route.query.search) {
      products = await $axios.get(
        `/product/all/paginated?search=${search}&page=${currentPage}&perPage=${perPage}`
      )
    } else {
      products = await $axios.get(
        `/product/all/paginated?page=${currentPage}&perPage=${perPage}`
      )
    }
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
      const search = this.$route.query.search
      if(!search) return pageNum == 1 ? '?' : `?page=${pageNum}`
      return pageNum == 1 ? `?search=${search}&` : `?search=${search}&page=${pageNum}`
    }
  },
}
</script>

<template>
  <b-container>
    <h1 class="text-center mb-5">Here are the products which are added recently!</h1>
    <b-row>
      <ProductCard
        id="product-card"
        v-for="product in products"
        :key="product._id"
        :product="product"
        columnSize=4
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
