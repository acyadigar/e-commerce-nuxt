<script>
import { mapActions } from 'vuex'

  export default {
    props: {
      message: String,
      isLogin: Boolean
    },
    data() {
      return {
        user: {}
      }
    },
    computed: {
      modal() {
        return (this.isLogin ? 'auth-modal-login' : 'auth-modal-register')
      },
      validation() {
        return this.user.name && this.user.name.length > 3
      }
    },
    methods: {
      ...mapActions(['login', 'register']),
      async registerUser() {
        await this.register(this.user)
        return this.$bvModal.hide(this.modal)
      },
      loginUser() {
        this.login(this.user)
      }
    }
  }
</script>

<template>
  <div @click="$bvModal.show(modal)">
    <b-link>{{message}}</b-link>
      <!-- Register Modal Here -->
    <b-modal v-if='!isLogin' id='auth-modal-register' 
    ref='auth-modal-register' hide-footer title='Register Here!'>
      <b-form>
        <!-- E-mail Input Here -->
        <b-form-group
        id='input-group-1'
        label='E-mail Adress:'
        label-for='input-1'
        >
          <b-form-input
          id='input-1'
          v-model='user.email'
          type='email'
          placeholder='E-mail'
          required
          >
          </b-form-input>
          <p></p>
        </b-form-group>

        <!-- User Name Input Here -->
      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="user.username"
          placeholder="Enter name"
          :state='validation'
          required
        ></b-form-input>
      <b-form-invalid-feedback :state="validation">
        Your name must be longer than 3 characters.
      </b-form-invalid-feedback>
      </b-form-group>

        <!-- Password Input Here -->
      <b-form-group id="input-group-3" label="Your Password:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="user.password"
          type='password'
          placeholder="Password"
          required
        ></b-form-input>
      </b-form-group>
      <div class="buttons">
        <b-button class="auth-btn" @click="$bvModal.hide(modal)">Close</b-button>
        <b-button class="auth-btn" variant='success' @click='registerUser'>Register</b-button>
      </div>

      </b-form>
    </b-modal>

        <!-- Login Modal Here -->
    <b-modal v-else id='auth-modal-login' 
      ref='auth-modal-login' hide-footer title='Login Here!'>
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
    <b-form-group id="input-group-3" label="Your Password:" label-for="input-3">
      <b-form-input
        id="input-3"
        v-model="user.password"
        type='password'
        placeholder="Password"
        required
      ></b-form-input>
    </b-form-group>
      <div class="buttons">
        <b-button class="auth-btn" @click="$bvModal.hide(modal)">Close</b-button>
        <b-button class="auth-btn" variant='success' @click='loginUser'>Login</b-button>
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