const state = {
  stocks: [
    { company: 'Jollibee', price: 1300 },
    { company: 'Mcdo', price: 1020 },
    { company: 'Inasal', price: 1030 },
    { company: 'Chowking', price: 1020 },
    { company: 'Wendys', price: 1002 },
    { company: 'Burger King', price: 1300 },
  ]
}

const getters = {
  getStocks: state => {
    return state.stocks
  }
}

const actions = {
  buyStock ({commit, getters}, order) {
    commit('ADD_STOCK', {order, getters})
  }
}

export default {
  state,
  getters,
  actions
}