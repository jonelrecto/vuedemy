import axios from "axios"
import router from '../../router/index'

const state = {
  user: null
}

const getters = {
  getUser (state) {
    return state.user
  }
}

const mutations = {
  setUser (state, idToken) {
    state.user = idToken
  },
  clearUser (state) {
    state.user = null
    localStorage.removeItem('user')
  }
}


const actions = {
  signup ({commit}, user) {
    return new Promise((resolve, reject) => {
      axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBvc7b6STabqI54iNNrFpENqopIKeqUVzI', {
        email: user.email,
        password: user.password,
        returnSecureToken: true
      }).then((res) => {
        resolve(res)
      }).catch(err => console.log(err))
    })
  },
  signin ({commit}, user) {
    return new Promise((resolve, reject) => {
      axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBvc7b6STabqI54iNNrFpENqopIKeqUVzI', {
        email: user.email,
        password: user.password,
        returnSecureToken: true
      }).then((res) => {
        localStorage.setItem('user', res.data.idToken)
        commit('setUser', res.data.idToken)
        resolve(res.data)
      }).catch(err => reject(err))
    })
  },
  logout({commit}) {
    return new Promise((resolve) => {
      commit('clearUser')
      resolve(true)
    })
  },
  tryLogin ({commit}) {
    const token = localStorage.getItem('user')
    
    if (!token) {
      console.log(token)
      return
    }
    commit('setUser', token)
  }
}


export default {
  state,
  actions,
  getters,
  mutations
}