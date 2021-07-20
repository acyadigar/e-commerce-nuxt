<script>
export default {
  computed: {
    isDesktop() {
      if (process.client) return window.innerWidth > 1200 ? true : false
    }
  }
}
</script>

<template>
  <div class="category">
    <b-list-group horizontal v-if="isDesktop">
      <b-list-group-item to='?' variant='primary'> All </b-list-group-item>
      <b-list-group-item to='?category=Electronics'> Electronics </b-list-group-item>
      <b-list-group-item to='?category=Fashion'> Fashion </b-list-group-item>
      <b-list-group-item to='?category=Accessories'> Accessories </b-list-group-item>
      <b-list-group-item to='?category=Sports'> Sports </b-list-group-item>
      <b-list-group-item to='?category=Medical'> Medical </b-list-group-item>
      <b-list-group-item to='?category=Pets & Pets Supplies'> Pets </b-list-group-item>
      <b-list-group-item to='?category=Other'> Other </b-list-group-item>
    </b-list-group>
    <b-dropdown id="dropdown" text="Category Menu" variant="secondary" v-else>
      <b-dropdown-item to='?'> All </b-dropdown-item>
      <b-dropdown-item to='?category=Electronics'> Electronics </b-dropdown-item>
      <b-dropdown-item to='?category=Fashion'> Fashion </b-dropdown-item>
      <b-dropdown-item to='?category=Accessories'> Accessories </b-dropdown-item>
      <b-dropdown-item to='?category=Sports'> Sports </b-dropdown-item>
      <b-dropdown-item to='?category=Medical'> Medical </b-dropdown-item>
      <b-dropdown-item to='?category=Pets & Pets Supplies'> Pets </b-dropdown-item>
      <b-dropdown-item to='?category=Other'> Other </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<style scoped>
</style>