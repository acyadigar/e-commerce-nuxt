<script>
export default {
  data() {
    return {
      search: '',
    }
  },
  methods: {
    submit(e) {
      e.preventDefault()
      if(!this.search) return
      this.$nuxt.$router.push(`/products?search=${this.search}`)
    }
  }
}
</script>

<template>
  <div class="main">
    <header>
      <h1>Alper's Bazaar</h1>
      <p>In order to find your most needed product;</p>
      <form @submit='submit' class="search-block">
        <input
          type="text"
          placeholder="Search product or any brand"
          v-model="search"
        />
        <b-icon @click='submit' class="search" icon="search"></b-icon>
      </form>
    </header>
  </div>
</template>

<style scoped>
p {
  text-shadow: 2px 2px 3px black;
  margin-block: 2rem;
  color: white;
  font-size: 1.5rem;
}
header {
  text-align: center;
  background-image: url(https://www.gkslegal.com/wp-content/uploads/2020/01/ecommerce.png);
  background-blend-mode: darken;
  background-size: 60rem;
  background-position: center;
  background-position-y: 4rem;
  background-repeat: no-repeat;
  min-height: calc(100vh - 3.5rem);
  background-color: rgba(220, 50, 50, 0.9);
}
h1 {
  padding-block: 1rem 2.5rem;
  text-align: center;
  font-family: 'Walter Turncoat', cursive;
  font-size: 5rem;
  color: rgba(245, 245, 245, 0.5);
}
.search-block {
  display: flex;
  width: 35rem;
  margin: auto;
}
.search {
  font-size: 2.5rem;
  background-color: white;
  height: 2.5rem;
  align-self: center;
  padding-right: 1rem;
  border-radius: 0 1rem 1rem 0;
}
input {
  margin: auto;
  width: 100%;
  border-radius: 1rem 0 0 1rem;
  padding: 0.5rem 1rem;
  border: none;
}
input:focus {
  outline: 0;
}
</style>
