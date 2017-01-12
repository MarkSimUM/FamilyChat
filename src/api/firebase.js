import firebase from 'firebase'
import Env from './../../fbsettings'
// import moment from 'moment'

firebase.initializeApp(Env.firebase)

var auth = firebase.auth()
var database = firebase.database()
var storage = firebase.storage()


// variable
var _userInfo = {}
var _memos = {}
var _userRef = null
var _publicMemosRef = null


export default {

  // Sets up shortcuts to Firebase features and initiate firebase auth.
  initFirebase () {
    // Initiates Firebase auth and listen to auth state changes.
    auth.onAuthStateChanged(this.onAuthStateChanged.bind(this))
  },

  getAuth () {
    return auth.currentUser || {}
  },
  onAuthStateChanged (user) {
    if (user) { // User is signed in!
      this.fetchUserInfo(user.uid)
        .then(val => {
          _userInfo = {
            loggedIn: true,
            uid: user.uid,
            name: val.name || user.displayName,
            profilePicUrl: user.photoURL
          }
          _App.$store.dispatch('onAuthStateChanged', Object.assign({}, _userInfo))
        }).catch(() => {
          _userInfo = {
            loggedIn: true,
            uid: user.uid,
            name: user.displayName,
            profilePicUrl: user.photoURL
          }
          _App.$store.dispatch('onAuthStateChanged', Object.assign({}, _userInfo))
        })
    } else {
      _userInfo = {
        loggedIn: false,
        uid: '',
        name: 'guest',
        profilePicUrl: ''
      }
      _App.$store.dispatch('onAuthStateChanged', Object.assign({}, _userInfo))
    }
  }
}
// module.exports = { eventBus : eventBus , modelUser : modelUser, modelMsg: modelMsg}   