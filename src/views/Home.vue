<template>
  <div>
   <v-app-bar 

   flat
   color="white"
    >
      

     <v-btn
        to="/"
        text
      >
        <span class="mr-2">Portfolio</span>
      </v-btn>

      <v-btn
        :to="{ name: 'Stocks'}"
        text
      >
        <span class="mr-2">Stocks</span>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        :to="{ name: 'Signin'}"
        text
      >
        <span class="mr-2">End Day</span>
      </v-btn>
      
      <div>
        Funds: P {{ funds }}
      </div>

    </v-app-bar>

      <!-- <HelloWorld/> -->
      <div class="container">
          <router-view></router-view>
        
      </div>
      
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data () {
    return {
      tab: null,
      items: [
        'Portfolio', 'Stocks'
      ],
    }
  },
  computed: {
    ...mapGetters({
      funds: 'getFunds'
    })
  },
  created () {
    
  }
}
</script>
