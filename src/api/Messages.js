import Vue from 'vue'
import {fbdb} from '../main.js'
// import Firebase from 'firebase'
const eventBus = new Vue({
  data: {
    datacentral: 'data central'
  },
  methods: {
    changeMsg (msg) {
      this.$emit('changeMsg', msg)
    }
  }
})
let messagesRef = fbdb.ref('messages')

const modelMessages = new Vue({
  created () {
    // firebase.initializeApp(this.fbconfig)
  },
  computed: function () {
    //   usersRef =  firebase.database().ref('users')
  },
  firebase: {
    // messages: fbdb.ref('messages').limitToLast(20)
    messages: messagesRef.limitToLast(20)
  },
  data: {
    user: {},
    messagesRef: {message: this},
    userList: {}
    // * temp holding place for core_user
  },
  methods: {
    getMessageList: function () {
      return this.user
    },
    getMessages () {
      console.log('messages')
      return this.messages
    },
    setdfUser (value) {
      this.dfUser = value
      // store.commit('setDfUser', this.dfUser);
    }
  }
})

module.exports = {eventBus: eventBus, modelMessages: modelMessages}
