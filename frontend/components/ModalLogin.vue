<script>
import { mapActions } from 'vuex'
import validationHandler from '@/mixins/validationHandler'

export default {
  mixins: [validationHandler],
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      errors: [],
      isSaving: false,
    }
  },
  computed: {
    modalSize() {
      if (process.client) return window.innerWidth > 760 ? 'md' : 'sm'
    },
  },
  methods: {
    ...mapActions(['login']),
    async loginUser() {
      this.errors = []

      try {
        this.isSaving = true
        await this.login(this.user)
        this.$bvModal.hide(this.modal)
      } catch (e) {
        this.errors.push(e.response.data)
      }

      this.isSaving = false
    },
  },
}
</script>

<template>
  <div @click="$bvModal.show('auth-modal-login')">
    <b-link>Login</b-link>
    <b-modal
      id="auth-modal-login"
      ref="auth-modal-login"
      hide-footer
      title="Login Here!"
      :size="modalSize"
    >
      <b-form>
        <div class="error" v-if="errors.length">
          <p v-for="error in errors" :key="error">{{ error }}</p>
        </div>

        <!-- User Name Input Here -->
        <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="user.username"
            placeholder="Enter name"
            required
          ></b-form-input>
        </b-form-group>

        <!-- Password Input Here -->
        <b-form-group
          id="input-group-3"
          label="Your Password:"
          label-for="input-3"
        >
          <b-form-input
            id="input-3"
            v-model="user.password"
            type="password"
            placeholder="Password"
            required
          ></b-form-input>
        </b-form-group>
        <div class="buttons">
          <b-button class="auth-btn" @click="$bvModal.hide('auth-modal-login')"
            >Close</b-button
          >

          <b-button
            :disabled="isSaving"
            class="auth-btn"
            variant="success"
            @click="loginUser"
          >
            <b-spinner small v-if="isSaving"></b-spinner>
            <span v-show="!isSaving">Login</span>
          </b-button>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<style scoped>
.auth-btn {
  width: 6rem !important;
}

.buttons {
  margin: auto;
  width: 15rem;
  display: flex;
  justify-content: space-between;
}

.error {
  color: red;
  animation: shake 0.6s;
  text-align: center;
}

@keyframes shake {
  0% {transform: translateX(-1rem)}
  25% {transform: translateX(1rem)}
  50% {transform: translateX(-0.5rem)}
  75% {transform: translateX(0.5rem)}
  100% {transform: translateX(0)}
}
</style>
