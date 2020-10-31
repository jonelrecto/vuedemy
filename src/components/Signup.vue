<template>
  <div class="container text-center">
    <v-card class="mx-auto" max-width="344" outlined>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="headline">Sign up</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="userData.name" :rules="nameRules" label="Name" required></v-text-field>

          <v-text-field v-model="userData.email" :rules="emailRules" label="E-mail" required></v-text-field>

          <v-text-field
            v-model="userData.password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[passwordRules.required, passwordRules.min]"
            :type="showPassword ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <v-text-field
            v-model="userData.confirmPassword"
            :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[confirmPasswordRules.required, confirmPasswordRules.passwordMatch]"
            :type="showConfirmPassword ? 'text' : 'password'"
            name="input-10-1"
            label="Confirm Password"
            @click:append="showConfirmPassword = !showConfirmPassword"
          ></v-text-field>

          <v-btn color="primary mb-2" block @click="signup">Sign up</v-btn>
          <v-btn color="secondary" block @click="clearFields">Reset</v-btn>
        </v-form>
      </v-card-text>
    </v-card>

    
    <v-snackbar
      :color="notif.color"
      v-model="notif.toggle"
      :timeout="notif.timeout"
    >
      {{ notif.message }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
			valid: false,
			nameRules: [
				v => !!v || 'Name is required'
			],
			emailRules: [
				v => !!v || 'E-mail is required',
				v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
			],
			passwordRules: {
				required: value => !!value || 'Required.',
				min: v => v.length >= 6 || 'Min 6 characters',
      },
      confirmPasswordRules: {
				required: value => !!value || 'Required.',
				passwordMatch: () => this.userData.password === this.userData.confirmPassword || 'Password did not match',
			},
			showPassword: false,
			showConfirmPassword: false,
      userData: {
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
      },
      notif: {
        toggle: false,
        color: 'success',
        text: '',
        timeout: 2000
      }
    }
  },
  methods: {
    signup () {
      this.$refs.form.validate()
      if (this.valid) {
        this.$store.dispatch('signup', this.userData)
          .then(res => {
            this.notif.toggle = true
            this.notif.color = 'success'
            this.notif.message = "Signup Success"
            this.clearFields()
          }).catch(err => {
            this.notif.toggle = true
            this.notif.color = 'error'
            this.notif.message = "Invalid Fields"
          })
      } else {
        alert('Please check fields')
      }
    },
    clearFields () {
      this.userData = {
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
      }
    }
  }
};
</script>

<style>
</style>