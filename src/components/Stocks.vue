<template>
  <div>
    <h1>Stocks</h1>
    <div class="d-flex justify-between flex-wrap mx-">
      <div v-for="(stock, index) in stocks" :key="index">
        <v-card
          class="ma-2"
          max-width="344"
        >

        <v-card-title>
          <h1 class="display-1 text--primary bg-secondary">
              {{ stock.company }}
            </h1>
        </v-card-title>

        <v-card-subtitle>
          <div>Price: P {{ stock.price }} </div>
        </v-card-subtitle>
          <v-card-text>
            
            <div class="text--primary">
              <v-text-field type="number" label="Quantity" v-model="stock.quantity"></v-text-field>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
            block
            color="primary"
            @click="buyStock(stock)"
            >
              Buy
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
       
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      quantity: ''
    }
  },
  computed: {
    ...mapGetters({
      stocks: 'getStocks'
    })
  },
  methods: {
    buyStock (stock) {
      this.$store.dispatch('buyStock', stock)
      stock.quantity = ''
    }
  },
  
}
</script>