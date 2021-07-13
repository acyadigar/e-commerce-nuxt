<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      user: (state) => state.user,
      cart: (state) => state.cart.cart,
    }),
  },
  methods: {
    ...mapActions(['logout']),
  },
}
</script>

<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand class="mr-5">E-Bazaar</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item to="/products">Products</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/products/add">Sell Product</b-nav-item>

        <b-nav-item-dropdown right v-if="!user.username">
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <span>Get an</span>
            <em><b>Account</b></em>
          </template>
          <b-dropdown-item>
            <ModalLogin />
          </b-dropdown-item>
          <b-dropdown-item>
            <ModalRegister />
          </b-dropdown-item>
        </b-nav-item-dropdown>

        <!-- If logged in -->
        <b-nav-item-dropdown right v-else>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <span>{{ user.username }}'s</span>
            <em><b>Basket</b></em>
          </template>
          <b-dropdown-item to="/my-basket">
            <b-icon icon="cart-fill"></b-icon>
            Basket <span v-if="cart.length">{{ cart.length }}</span>
          </b-dropdown-item>
          <b-dropdown-item :to="`/user/${user.username}`">
            <b-icon icon="person-fill"></b-icon>
            Account Info
          </b-dropdown-item>
          <b-dropdown-item @click="logout">
            <b-icon icon="power" aria-hidden="true"></b-icon>
            Logout
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
