<script>
import { mapActions } from 'vuex'
import validationHandler from '@/mixins/validationHandler'

export default {
  mixins: [validationHandler],
  data() {
    return {
      user: {
        email: '',
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
    ...mapActions(['register']),
    async registerUser() {
      this.errors = []
      this.$v.user.$touch()
      if (this.$v.user.$anyError) return

      try {
        this.isSaving = true
        await this.register(this.user)
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
  <div @click="$bvModal.show('auth-modal-register')">
    <b-link>Register</b-link>
    <b-modal
      id="auth-modal-register"
      ref="auth-modal-register"
      title="Register Here!"
      hide-footer
      :size="modalSize"
    >
      <b-form>
        <div class="error" v-if="errors.length">
          <p v-for="error in errors" :key="error">{{ error }}</p>
        </div>

        <!-- E-mail Input Here -->
        <b-form-group
          id="input-group-1"
          label="E-mail Adress:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="$v.user.email.$model"
            :state="validateState('email')"
            placeholder="E-mail"
            aria-describedby="email-validation"
          >
          </b-form-input>
          <b-form-invalid-feedback id="email-validation"
            >Email is not valid!</b-form-invalid-feedback
          >
        </b-form-group>

        <!-- User Name Input Here -->
        <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="$v.user.username.$model"
            :state="validateState('username')"
            placeholder="Enter username"
            aria-describedby="username-validation"
            type="text"
          ></b-form-input>
          <b-form-invalid-feedback id="username-validation"
            >Username is required and must be at least 4
            characters.</b-form-invalid-feedback
          >
        </b-form-group>

        <!-- Password Input Here -->
        <b-form-group
          id="input-group-3"
          label="Your Password:"
          label-for="input-3"
        >
          <b-form-input
            id="input-3"
            v-model="$v.user.password.$model"
            :state="validateState('password')"
            placeholder="Password"
            aria-describedby="password-validation"
            type="password"
          ></b-form-input>
          <b-form-invalid-feedback id="password-validation"
            >Password length must be longer.</b-form-invalid-feedback
          >
        </b-form-group>

        <div class="buttons">
          <b-button
            class="auth-btn"
            @click="$bvModal.hide('auth-modal-register')"
            >Close</b-button
          >

          <b-button
            :disabled="isSaving"
            class="auth-btn"
            variant="success"
            @click="registerUser"
          >
            <b-spinner small v-show="isSaving"></b-spinner>
            <span v-show="!isSaving">Register</span>
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
