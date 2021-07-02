<script>
export default {
  props: ['total', 'currentPage'],
  data() {
    return {
      perPage: 6
    }
  },
  computed: {
    pages() {
      return [...Array(Math.ceil(this.total / this.perPage)).keys()].slice(1)
    },
    isCurrentPage() {
      return (this.currentPage == (this.number + 1)) ? true : false
    }
  }
}
</script>

<template>
  <div class="links float-right mt-4">
    <b-list-group horizontal>
      <b-list-group-item>
        <nuxt-link to='/products'>1</nuxt-link>
      </b-list-group-item>
      <b-list-group-item 
        v-for="number in pages"
        :active='isCurrentPage'
        :key='number'>
        <nuxt-link 
        :to="`/products?page=${number + 1}`">
          {{number + 1}}
        </nuxt-link>
      </b-list-group-item>
  </b-list-group>
    
  </div>
</template>

<style scoped>
a {
  text-decoration: none !important;
}
</style>