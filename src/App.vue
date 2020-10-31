<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex justify-center">
        <v-toolbar-title>
          <router-link to="/" tag="button"><h1>Stock Trader</h1></router-link>
        </v-toolbar-title>
        
      </div>
      <v-spacer></v-spacer>
      <div v-if="!user">
        <v-btn :to="{ name: 'Signup'}" text >Signup</v-btn>
        <v-btn :to="{ name: 'Signin'}" text > Sign in </v-btn>
        
      </div>
      <v-btn v-if="user" text @click="logout">Logout</v-btn>

    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import { mapGetters } from 'vuex'

export default {
  name: 'App',

  components: {
    HelloWorld,
  },
  computed: {
    ...mapGetters({
      user: 'getUser'
    })
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
        .then(res => {
          console.log(this.user)
          this.$router.push('/signin')
          })
    }
  },
  created () {
    // console.log('app created')
    // console.log(localStorage.getItem('user'))
    this.$store.dispatch('tryLogin')
  }
}
</script>
