import axios from 'axios'

const state = {
  portfolio: [],
  funds: 0
}

const getters = {
  getPortfolio: state => {
    return state.portfolio
  },
  getFunds: state => {
    return state.funds
  }
}

const mutations = {
  'ADD_STOCK' ({state, commit}, {order, getters}) {
    // this will add the stock to the firebase portfolio user
    
    const data = {
      company: order.company,
      price: order.price,
      quantity: order.quantity
    }
    axios.post('https://vuedemy-stock-trader.firebaseio.com/portfolio.json', data)
      .then(res => {
        let amount = parseInt(data.price) * parseInt(data.quantity)
        const balance = getters.getFunds - amount
        axios.patch('https://vuedemy-stock-trader.firebaseio.com/funds.json', { balance: balance })
          .then(res => { balance })
          .catch(err => console.log(err))
      }).catch(err => console.log(err))
   
    
  },
  'SET_PORTFOLIO' (state, portfolios) {
    for(let key in portfolios) {
      const data = portfolios[key]
      data.id = key
      state.portfolio.push(data)
    }
  },
  'CLEAR_PORTFOLIO' (state) {
    state.portfolio = []
  },
  'SELL_STOCK': ({state}, {id, quantity, quantityToSell}) => {
    return new Promise((resolve, reject) => {
      quantity -= quantityToSell
      axios.patch(`https://vuedemy-stock-trader.firebaseio.com/portfolio/${id}.json`, {
        quantity: quantity
      }).then(res => resolve(true))
        .catch(err => reject(err))
    })
  },
  setFunds (state, funds) {
    state.funds = funds
  }
}

const actions = {
  initPortfolio: ({commit, dispatch}) => {
    axios.get('https://vuedemy-stock-trader.firebaseio.com/portfolio.json')
      .then(res => {
        commit('SET_PORTFOLIO', res.data)
        dispatch('initFunds')
      })
      .catch(err => console.log(err))
  },
  initFunds: ({commit}) => {
    axios.get('https://vuedemy-stock-trader.firebaseio.com/funds.json')
      .then(res => {
        commit('setFunds', res.data.balance)
      })
  },
  clearPortfolio: ({commit}) => {
    commit('CLEAR_PORTFOLIO')
  },
  sellStock ({dispatch, commit}, stock) {
    commit('SELL_STOCK', stock)
    commit('CLEAR_PORTFOLIO')
    dispatch('initPortfolio')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}