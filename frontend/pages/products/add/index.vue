<script>
import { mapActions } from 'vuex'

export default {
  middleware: ['check-auth'],
  data() {
    return {
      product: {},
    }
  },
  computed: {
    isFilled() {
      if (
        this.product.title ||
        this.product.image ||
        this.product.price ||
        this.product.info
      ) {
        return true
      }
    },
  },
  methods: {
    ...mapActions({
      addProduct: 'products/addProduct',
    }),
    async post() {
      await this.addProduct(this.product)
      this.$nuxt.$router.push('/products')
    },
    reset(e) {
      e.preventDefault()
      this.product = {}
    },
  },
}
</script>

<template>
  <div class="container col-6">
    <h1 class="text-center m-3">Add a product to sell!</h1>
    <b-form>
      <b-form-group
        id="input-group-1"
        label="Product Image (URL):"
        label-for="image-url"
        description="Image has to be a URL."
      >
        <b-form-input
          id="image-url"
          v-model="product.image"
          type="email"
          placeholder="URL"
          required
        ></b-form-input>
      </b-form-group>

      <div style="display: flex">
        <label class="sr-only" for="title">Title</label>
        <b-form-input
          id="title"
          placeholder="Product Title"
          v-model="product.title"
        ></b-form-input>

        <label class="sr-only" for="price">Price</label>
        <b-input-group prepend="₺">
          <b-form-input
            id="price"
            placeholder="Price"
            v-model="product.price"
          ></b-form-input>
        </b-input-group>
      </div>

      <b-form-textarea
        id="info"
        v-model="product.info"
        placeholder="Product information will be displayed at details section"
        rows="3"
        max-rows="10"
        class="mt-4"
      ></b-form-textarea>
      <div class="d-flex justify-content-between pt-3">
        <b-button @click="reset" variant="outline-danger"> Reset </b-button>
        <b-button @click="post" variant="primary"> Add Product </b-button>
      </div>
    </b-form>
    <div class="preview pt-3" v-if="isFilled">
      <ProductCard
        class="col-8 m-auto p-0"
        :product="product"
        :key="product._id"
        columnSize=8
      />
    </div>
  </div>
</template>
