<script>
export default {
}
</script>

<template>
  <b-dropdown id="dropdown" text="Category Menu" variant="secondary">
    <b-dropdown-item to='?'> All </b-dropdown-item>
    <b-dropdown-item to='?category=Electronics'> Electronics </b-dropdown-item>
    <b-dropdown-item to='?category=Fashion'> Fashion </b-dropdown-item>
    <b-dropdown-item to='?category=Accessories'> Accessories </b-dropdown-item>
    <b-dropdown-item to='?category=Sports'> Sports </b-dropdown-item>
    <b-dropdown-item to='?category=Medical'> Medical </b-dropdown-item>
    <b-dropdown-item to='?category=Pets & Pets Supplies'> Pets </b-dropdown-item>
    <b-dropdown-item to='?category=Other'> Other </b-dropdown-item>
  </b-dropdown>
</template>

<style scoped>
</style>