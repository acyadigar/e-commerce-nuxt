<script>
const { validationMixin, default: Vuelidate } = require('vuelidate')
const { required, minLength, email } = require('vuelidate/lib/validators')

import { mapActions } from 'vuex'

export default {
  mixins: [validationMixin],
  validations: {
    user: {
      username: {
        required,
        minLength: minLength(4),
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
    },
  },
  props: {
    message: String,
    isLogin: Boolean,
  },
  data() {
    return {
      user: {
        email: '',
        username: '',
        password: '',
      },
    }
  },
  computed: {
    modal() {
      return this.isLogin ? 'auth-modal-login' : 'auth-modal-register'
    },
    validation() {
      return this.user.name && this.user.name.length > 3
    },
  },
  methods: {
    ...mapActions(['login', 'register']),
    async registerUser() {
      this.$v.user.$touch()
      if (this.$v.user.$anyError) return

      await this.register(this.user)
      return this.$bvModal.hide(this.modal)
    },
    loginUser() {
      this.login(this.user)
    },
    validateState(name) {
      const { $dirty, $error } = this.$v.user[name]
      return $dirty ? !$error : null
    },
  },
}
</script>

<template>
  <div @click="$bvModal.show(modal)">
    <b-link>{{ message }}</b-link>
    <!-- Register Modal Here -->
    <b-modal
      v-if="!isLogin"
      id="auth-modal-register"
      ref="auth-modal-register"
      hide-footer
      title="Register Here!"
    >
      <b-form>
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
          <b-button class="auth-btn" @click="$bvModal.hide(modal)"
            >Close</b-button
          >
          <b-button class="auth-btn" variant="success" @click="registerUser"
            >Register</b-button
          >
        </div>
      </b-form>
    </b-modal>

    <!-- Login Modal Here -->
    <b-modal
      v-else
      id="auth-modal-login"
      ref="auth-modal-login"
      hide-footer
      title="Login Here!"
    >
      <b-form>
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
          <b-button class="auth-btn" @click="$bvModal.hide(modal)"
            >Close</b-button
          >
          <b-button class="auth-btn" variant="success" @click="loginUser"
            >Login</b-button
          >
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
</style>