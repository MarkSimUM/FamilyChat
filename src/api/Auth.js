// import Vue from 'vue'
import {fbauth} from '../main.js'
import Firebase from 'firebase'
// import {firebase} from '../main.js'

var _userInfo = {}

// const Authentication = new Vue({
var Authentication = {
  initFirebase () {
    // Initiates Firebase auth and listen to auth state changes.
    fbauth.onAuthStateChanged(this.onAuthStateChanged.bind(this))
  },
  setToken: function (token) {
    localStorage.setItem('fbUser', token)
  },
  destroyToken: function () {
    localStorage.removeItem('fbUser')
  },
  getToken: function () {
    var token = localStorage.getItem('fbUser')
    // return token
    return JSON.parse(token)
    // JSON.parse(retrievedObject))
  },
  getfbToken: function () {
    var token = localStorage.getItem('fbUser')
    return token
  },
  getAuth () {
    return fbauth.currentUser || {}
  },
  userInfo () {
    return {}
  },
  data () {
    return {
      token: '',
      user: ''
    }
  },
  signIn () {
    // var provider =  fbauth.GoogleAuthProvider
    var _this = this
    var provider = new Firebase.auth.GoogleAuthProvider()
    provider.addScope('profile')
    provider.addScope('email')
    fbauth.signInWithPopup(provider).then(function (result) {
      // This gives you a Google Access Token.
      // var token = result.credential.accessToken
      // _this.setToken(token)
      // this.token = token
      // The signed-in user info.
      var user = result.user
      _this.setToken(JSON.stringify(user))
      // this.user = user
    })
   // fbauth.signInWithPopup(provider)
  },
  signOut () {
    fbauth.signOut()
    this.destroyToken()
  },
  loggedIn: function () {
    if (_userInfo.loggedIn) {
      return true
    }
    else {
      return false
    }
  },
  onAuthStateChanged (user) {
    var _this = this
    if (user) { // User is signed in!
      this.fetchUserInfo(user.uid)
        .then(val => {
          _userInfo = {
            loggedIn: true,
            uid: user.uid,
            name: val.name || user.displayName,
            profilePicUrl: user.photoURL
          }
          _this.setToken(user)
          // _App.$store.dispatch('onAuthStateChanged', Object.assign({}, _userInfo))
        }).catch(() => {
          _userInfo = {
            loggedIn: true,
            uid: user.uid,
            name: user.displayName,
            profilePicUrl: user.photoURL
          }
          _this.setToken(user)
          // _App.$store.dispatch('onAuthStateChanged', Object.assign({}, _userInfo))
        })
    }
    else {
      _userInfo = {
        loggedIn: false,
        uid: '',
        name: 'guest',
        profilePicUrl: ''
      }
      //  _App.$store.dispatch('onAuthStateChanged', Object.assign({}, _userInfo))
    }
    this.userInfo = _userInfo
  }
}

export default function (Vue) {
  Vue.auth = Authentication
  Object.defineProperties(Vue.prototype, {
    $auth: {
      get: function () {
        return Vue.auth
      }
    }
  })
}
