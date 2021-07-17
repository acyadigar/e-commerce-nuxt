<script>
export default {
  watchQuery: ['page', 'search', 'category'],
  async asyncData({ $axios, route }) {
    let products;
    const category = route.query.category
    const search = route.query.search
    const [perPage, currentPage] = [route.query.perPage || 6, route.query.page || 1]

    if (route.query.search) {
      products = await $axios.get(
        `/product/all/paginated?search=${search}&page=${currentPage}&perPage=${perPage}`
      )
    }
    else if (route.query.category) {
      products = await $axios.get(
        `/product/all/paginated?category=${category}&page=${currentPage}&perPage=${perPage}`
      )
    } 
    else {
      products = await $axios.get(
        `/product/all/paginated?page=${currentPage}&perPage=${perPage}`
      )
    }
    const productsLength = products.data.productsLength
    products = products.data.products
    return { products, productsLength, currentPage, perPage, category }
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
  <div id="products">
    <div class="info text-center">
      <b-jumbotron header="E-Bazaar">
        <hr>
        <CategoryMenu />
      </b-jumbotron>
      
      <h2 v-if="products.length && !category"> 
        Here are the products which are added recently! 
      </h2>
      <h2 v-else-if="products.length && category"> 
        There are {{ productsLength }} products in {{ category.toLowerCase()}} category! 
      </h2>
      <h2 v-else>
        No products exist!
      </h2>

  </div>
  <b-container class="mt-5">
    <b-row>
      <ProductCard
        id="product-card"
        v-for="product in products"
        :key="product._id"
        :product="product"
        columnSize=4
      />
    </b-row>

    <div v-if='productsLength > 6' class="overflow-auto mt-4">
      <b-pagination-nav
        :link-gen="link"
        :number-of-pages="pages"
        pills
        align="center"
        use-router
      ></b-pagination-nav>
    </div>
  </b-container>
  </div>
</template>

<style scoped>
.jumbotron {
  border-radius: 0;
  background-color: rgba(220, 50, 50, 0.9);
  color: white;
}
.display-3 {
  color: rgba(245, 245, 245, 0.5);
  font-family: 'Courier New', Courier, monospace;
}
@media screen and (max-width: 600px) {
  h2 {
    width: 80%;
    margin: auto;
    font-size: 1.5rem;
  }
}
</style>