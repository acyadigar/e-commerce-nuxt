<script>
export default {
  props: ['error'],
}
</script>

<template>
  <div class="error">
    <b-icon
      icon="exclamation-circle"
      style="width: 120px; height: 120px; color: crimson"
    ></b-icon>
    <h1>Hey, something went wrong!</h1>
    <p v-if="error.message">{{ error.message }}</p>
    <nuxt-link to="/">Go to safe zone!</nuxt-link>
  </div>
</template>

<style scoped>
.error {
  text-align: center;
  margin-top: 2rem;
}
h1 {
  margin: 1rem auto;
}
p {
  font-style: italic;
  font-size: 20px;
}
</style>
