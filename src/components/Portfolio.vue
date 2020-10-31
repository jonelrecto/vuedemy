<template>
  <div>
    <h1>Portfolio</h1>
    <div class="d-flex justify-between flex-wrap mx-">
      <div v-for="portfolio in portfolios" :key="portfolio.id">
        <v-card
          class="ma-2"
          max-width="344"
        >

        <v-card-title>
          <h1 class="display-1 text--primary bg-secondary">
            {{ portfolio.company}}
          </h1>
        </v-card-title>

        <v-card-subtitle>
          <div>Quantity: {{ portfolio.quantity }}</div>
          <div>Price: P {{ portfolio.price }}</div>
        </v-card-subtitle>
          <v-card-text>
            
            <div class="text--primary">
              <v-text-field type="number" label="Quantity" v-model="portfolio.quantityToSell"></v-text-field>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="success" dark block @click="sellStock(portfolio)">Sell</v-btn>
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
      portfolios: 'getPortfolio'
    })
  },
  methods: {
    sellStock (stock) {
      this.$store.dispatch('sellStock', stock)
      stock.quantityToSell = ''
    }
  },
  async created () {
    await this.$store.dispatch('initPortfolio')
    await this.$store.dispatch('initFunds')
  },
  destroyed () {
    this.$store.dispatch('clearPortfolio')
  } 
}
</script>