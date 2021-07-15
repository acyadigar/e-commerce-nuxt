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
      <h1>E-Bazaar</h1>
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
  font-family: 'Courier New', Courier, monospace;
  font-size: 5rem;
  color: rgba(245, 245, 245, 0.5);
}
.search-block {
  display: flex;
  width: 35rem;
  margin: auto;
}
.search {
  width: 10%;
  height: 2.5rem;
  padding: .3rem;
  background-color: white;
  border-radius: 0 1rem 1rem 0;
}
input {
  width: 90%;
  border-radius: 1rem 0 0 1rem;
  padding: 0.5rem 1rem;
  border: none;
}
input:focus {
  outline: 0;
}
@media screen and (max-width: 600px) {
  header p {
    width: 75%;
    margin-inline: auto;
  }
  h1 {
    font-size: 3rem;
    padding-block: 1rem;
  }
  header {
    background-position-y: 17rem;
    background-size: 24rem;
  }
  .search-block {
    width: 18rem;
  }
}
</style>
