import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// import Firebase from './api/firebase'



export default new Vuex.Store({
  state: {
    currentUser: {},
    dfUser: {},
    style: '',
    user: {
      loggedIn: false,
      uid: '',
      name: '',
      profilePicUrl: ''
    },
    memos: {}
  },
  mutations: {
    setCurrentUser: function (state, user) {
      state.currentUser = user
    },
    clearCurrentUser: function (state) {
      state.currentUser = {}
    }
  },
  actions: {
    onAuthStateChanged ({ commit }, user) {
      commit('onAuthStateChanged', { user })
    },
    signIn () {
      Vue.auth.signIn()
    },
    signOut () {
      Vue.auth.signIn()
    },
    setUserInfo ({ commit, state }, { key, val }) {
      return new Promise((resolve, reject) => {
        if (state.user.loggedIn) { // is signed in. Firebase
          Vue.auth.setUserInfo(key, val)
            .then(() => {
              commit('setUser', { key, val })
              resolve()
            }).catch(reject)
        }
        else { // is signed out. Localstrage
          reject('still dev for guest')
        }
      })
    },
    fetchMemo ({ commit, state }) {
      Vue.auth.fetchMemo(state.route.params.id)
        .then(obj => {
          commit('setMemo', {
            key: obj.key,
            memo: obj.memo
          })
        })
    },
    fetchMemos ({ commit }, { count, type }) {
      if (state.user.loggedIn || type === 'public') { // is signed in. Firebase
        Vue.auth.fetchMemos(count, type)
          .then(memos => {
            commit('setMemos', { memos })
          })
      }
      else { // is signed out. Localstrage
      }
    },
    addMemo ({ commit, state }, memo) {
      return new Promise((resolve, reject) => {
        if (state.user.loggedIn) { // is signed in. Firebase
          Vue.auth.addMemo(memo)
            .then(obj => {
              commit('setMemo', {
                key: obj.key,
                memo: obj.memo
              })
              resolve(obj.key)
            }).catch(err => {
              reject()
            })
        }
        else { // is signed out. Localstrage
          reject('still dev for guest')
        }
      })
    },
    deleteMemo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        if (state.user.loggedIn) { // is signed in. Firebase
          Vue.auth.deleteMemo(state.route.params.id)
            .then(key => {
              commit('deleteMemo', { key })
              resolve()
            }).catch(reject)
        }
        else { // is signed out. Localstrage
          reject('still dev for guest')
        }
      })
    },
    updateMemo ({ commit, state }, memo) {
      return new Promise((resolve, reject) => {
        if (state.user.loggedIn) {
          const key = state.route.params.id
          Vue.auth.updateMemo(key, memo)
            .then(() => {
              commit('setMemo', { key, memo })
              resolve(key)
            }).catch(reject)
        }
        else { // is signed out. Localstrage
          reject('still dev for guest')
        }
      })
    }
  }
})
