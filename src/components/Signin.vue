<template>
  <div class="container text-center">
    <v-card class="mx-auto" max-width="344" outlined>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="headline">Sign in</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="user.email" :rules="emailRules" label="Email" required></v-text-field>

          <v-text-field
            v-model="user.password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[passwordRules.required]"
            :type="showPassword ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <v-btn color="primary" block @click="signin">Sign in</v-btn>
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
      user: {
        email: "",
        password: "",
      },
      emailRules: [
				v => !!v || 'E-mail is required',
				v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
			],
      passwordRules: {
        required: value => !!value || 'Required.',
        emailMatch: () => ('The email and password you entered don\'t match'),
      },
      showPassword: false,
      notif: {
        toggle: false,
        color: 'success',
        text: '',
        timeout: 2000
      }
    };
  },
  methods: {
    async signin () {
      this.$store.dispatch('signin', this.user)
        .then(res => {
          this.notif.toggle = true
          this.notif.color = 'success'
          this.notif.message = "Signup Success"
          this.$router.push('/')
        }).catch(err => {
          this.notif.toggle = true
          this.notif.color = 'error'
          this.notif.message = "Invalid email or password"
        })
    }
  }
}
</script>

<style>
</style>