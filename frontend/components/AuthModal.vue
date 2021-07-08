<script>
import { mapActions } from 'vuex'
import validationHandler from '@/mixins/validationHandler'

export default {
  mixins: [validationHandler],
  props: ['message', 'isLogin'],
  data() {
    return {
      user: {
        email: '',
        username: '',
        password: '',
      },
      errors: [],
      isSaving: false
    }
  },
  computed: {
    modal() {
      return this.isLogin ? 'auth-modal-login' : 'auth-modal-register'
    },
    modalSize() {
      if(process.client) return (window.innerWidth > 760) ? 'md' : 'sm'
    },
    validation() {
      return this.user.name && this.user.name.length > 3
    }
  },
  methods: {
    ...mapActions(['login', 'register']),
    async registerUser() {
      this.errors = []
      this.$v.user.$touch()
      if (this.$v.user.$anyError) return

      try {
        this.isSaving = true
        await this.register(this.user)
        this.$bvModal.hide(this.modal)
      } catch(e) { this.errors.push(e.response.data) }

      this.isSaving = false
    },
    async loginUser() {
      this.errors = []

      try {
        this.isSaving = true
        await this.login(this.user)
        this.$bvModal.hide(this.modal)
      } catch (e) { this.errors.push(e.response.data) }
      
      this.isSaving = false
    }
  }
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
      title="Register Here!"
      hide-footer
      :size='modalSize'
    >
      <b-form>
        <div class="error" v-if="errors.length">
          <p v-for="error in errors" :key='error'>{{error}}</p>
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
            >Email is not valid!</b-form-invalid-feedback>
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
            characters.</b-form-invalid-feedback>
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
            >Password length must be longer.</b-form-invalid-feedback>
        </b-form-group>
        
        <div class="buttons">
          <b-button class="auth-btn" @click="$bvModal.hide(modal)"
            >Close</b-button>
            
          <b-button :disabled='isSaving'
            class="auth-btn" variant="success" @click="registerUser"
          >
          <b-spinner small v-show="isSaving"></b-spinner>
            <span v-show="!isSaving">Register</span> 
          </b-button>
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
      :size='modalSize'
    >
      <b-form>
        <div class="error" v-if="errors.length">
          <p v-for="error in errors" :key='error'>{{error}}</p>
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
          <b-button class="auth-btn" @click="$bvModal.hide(modal)"
            >Close</b-button>

          <b-button :disabled='isSaving'
            class="auth-btn" variant="success" @click="loginUser">
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
  animation: shake .6s;
  text-align: center;
}

@keyframes shake {
  0% { transform: translateX(-1rem); }
  25% { transform: translateX(1rem); }
  50% { transform: translateX(-.5rem); }
  75% { transform: translateX(.5rem); }
  100% { transform: translateX(0); }  
}
</style>
