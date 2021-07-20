<script>
export default {
  computed: {
    isDesktop() {
      if (process.client) return window.innerWidth > 1200
    }
  },
  data() {
    return {
      categories: [
        'Electronics',
        'Fashion',
        'Accessories',
        'Sports',
        'Medical',
        'Pets',
        'Other'
      ]
    }
  } 
}
</script>

<template>
  <div class="category">

    <b-list-group horizontal v-if="isDesktop">
      <b-list-group-item to='?' variant='primary'> All </b-list-group-item>
      <b-list-group-item v-for="category in categories" :key="category._" 
      :to='`?category=${category}`'> 
        {{category}} 
      </b-list-group-item>
    </b-list-group>

    <b-dropdown id="dropdown" text="Category Menu" variant="secondary" v-else>
      <b-dropdown-item to='?'> All </b-dropdown-item>
      <b-dropdown-item to='?category=Electronics'> Electronics </b-dropdown-item>
      <b-dropdown-item v-for="category in categories" :key="category._"
      :to='`?category=${category}`'>
        {{category}}
      </b-dropdown-item>
    </b-dropdown>

  </div>
</template>

<style scoped>
</style>