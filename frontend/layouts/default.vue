<script>
import { mapActions } from 'vuex'
export default {
  middleware: ['auth'],
  methods: {
    ...mapActions('cart', ['setCart'])
  },
  mounted() {
    this.setCart()
  }
}
</script>

<template>
  <div>
    <Navbar />
    <Nuxt />
  </div>
</template>