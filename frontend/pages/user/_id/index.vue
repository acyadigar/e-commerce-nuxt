<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      editedUser: {},
      isEditing: false,
    }
  },
  async asyncData({ $axios, params, error }) {
    try {
      const userData = await $axios.$get(`/user/${params.id}`)
      return { userData }
    } catch (e) {
      return error({ message: 'No user exists!' })
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
      token: (state) => state.token,
    }),
    isOwner() {
      return this.user.username == this.userData.username
    },
  },
  methods: {
    ...mapActions({
      editUser: 'editUser',
      deleteProduct: 'products/deleteProduct'
    }),
    edit() {
      const user = {
        token: this.token,
        newUser: this.editedUser,
      }
      this.editUser(user)
    },
    toggleEdit() {
      this.isEditing = !this.isEditing
    },
    async del(id) {
      confirm('You sure?') ? await this.deleteProduct(id) : null
      this.$nuxt.refresh()
    }
  },
}
</script>

<template>
  <b-container>
    <b-row class="pt-4">
      <b-col cols="12" md='5'>
        <h4>Profile informations:</h4>
        <!-- User information -->
        <b-list-group class="mb-3">
          <b-list-group-item
            ><b>Username:</b> {{ userData.username }}</b-list-group-item
          >
          <b-list-group-item
            ><b>Email:</b> {{ userData.email }}</b-list-group-item
          >
          <b-list-group-item
            ><b>Products on sale:</b>
            {{ userData.products.length }}</b-list-group-item
          >
        </b-list-group>
        <!-- User information -->
        <b-button
          v-if="isOwner"
          @click="toggleEdit"
          block
          pill
          variant="outline-info"
          :pressed="isEditing"
          >Edit</b-button
        >
        <!-- User info editing card -->
        <b-card class="edit mt-3" v-if="isEditing">
          <b-form-group
            id="input-group-1"
            label="New username:"
            label-for="edited-username"
          >
            <b-form-input
              id="edited-username"
              v-model="editedUser.username"
              type="email"
              placeholder="Enter username"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="New email address:"
            label-for="edited-email"
            description="No need for mail validation."
          >
            <b-form-input
              id="edited-email"
              v-model="editedUser.email"
              type="email"
              placeholder="Enter email"
              required
            ></b-form-input>
          </b-form-group>
          <b-button variant="warning">Cancel</b-button>
          <b-button variant="success" @click="edit">Apply</b-button>
        </b-card>
        <!-- User info editing card -->
      </b-col>
      <b-col cols="12" md='7' class="showcase">
        <h4>Products on the showcase:</h4>
        <b-list-group>
          <b-list-group-item
            class="product-name"
            v-for="product in userData.products"
            :key="product._id"
          >
            <nuxt-link :to="`/products/${product._id}`">
              {{ product.title }}
            </nuxt-link>
            <b-icon v-if="isOwner"
              icon='x-circle-fill' variant='danger'
              @click="del(product._id)"
              class="delete-icon"
            ></b-icon>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<style scoped>
.product-name {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.delete-icon {
  cursor: pointer;
}
@media screen and (max-width: 600px) {
  .showcase {
    margin-top: 2rem !important;
  }
}
</style>