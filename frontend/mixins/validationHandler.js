const { validationMixin } = require('vuelidate')
const { required, minLength, email } = require('vuelidate/lib/validators')

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
        email
      },
      password: {
        required,
        minLength: minLength(6),
      }
    }
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.user[name]
      return $dirty ? !$error : null
    }
  }
}