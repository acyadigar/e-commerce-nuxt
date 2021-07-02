<script>
import { mapActions } from 'vuex'
export default {
  middleware: ['auth'],
  methods: {
    ...mapActions('cart', ['setCart'])
  },
  mounted() {
    if(localStorage.getItem('cart')) return this.setCart()
  }
}
</script>

<template>
  <div>
    <Navbar />
    <Nuxt />
  </div>
</template>