// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

import Vue from 'vue'
import Quasar from 'quasar'
import router from './router'

import Firebase from 'firebase'
import VueFire from 'vuefire'
// import moment from 'moment'
// import store from './store.js'
// import './../fbsettings' // imports firebase settings
import Env from './../fbsettings'

import Auth from './api/Auth.js'
import AsyncComputed from 'vue-async-computed'

Vue.use(Quasar) // Install Quasar Framework
Vue.use(VueFire)
Vue.use(Auth)
Vue.use(AsyncComputed)

var firebaseApp = Firebase.initializeApp(Env.firebase)
// export const firebase = Firebase.initializeApp(Env.firebase)
export const fbauth = firebaseApp.auth()
export const fbdb = firebaseApp.database()
export const fbstorage = firebaseApp.storage()
export const LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif'

//  use eventHub to emit events
/*
   a.  eventHub.$emit('add-todo', { text: this.newTodoText })
   b.  eventHub.$on('add-todo', this.addTodo)
   c.  eventHub.$off('add-todo', this.addTodo))
// in component A
methods: {
  addTodo: function () {
    eventHub.$emit('add-todo', { text: this.newTodoText })
    this.newTodoText = ''
  }
}
// in component B
created: function () {
  eventHub.$on('add-todo', this.addTodo)
  eventHub.$on('delete-todo', this.deleteTodo)
 },
beforeDestroy: function () {
  eventHub.$off('add-todo', this.addTodo)
  eventHub.$off('delete-todo', this.deleteTodo)
},

*/

export const eventBus = new Vue()

const eventHub = new Vue({
  data: {
    eventhub: 'This is the event central event hub'
  },
  methods: {
    changeMsg (msg) {
      this.$emit('msgEdited', msg)
    }
  }
})


router.beforeEach(function (to, from, next) {
  // prevent access to 'requiresGuest' routes;
  // check router path for  meta: { requiresAuth: ... }
  if (to.matched.some(function (record) { return record.meta.requiresGuest }) && Vue.auth.loggedIn()) {
    next({
      path: '/mainpanel'
    })
  }
  else if (to.matched.some(function (record) { return record.meta.requiresAuth }) && !Vue.auth.loggedIn()) {
    next({
      path: '/auth/login',
      query: { redirect: to.fullPath }
    })
  }
  else {
    next() // make sure to always call next()!
  }
})

 /* eslint-disable no-new */
const app = new Vue({
  el: '#q-app',
  router,
  // store: store,
  render: h => h(require('./App'))

})
Quasar.start(() => app)
/*
Quasar.start(() => {
  new Vue({
    el: '#q-app',
    router,
    render: h => h(require('./App'))
  })
})
*/

global._App = app
