/*
   enter settings for firebase and save as fbsettings.js
   reference in main.js:
    import Env from './../fbsettings'
    var firebaseApp = Firebase.initializeApp(Env.firebase)
*/
const Env = {
  firebase: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    storageBucket: '',
    messagingSenderId: ''
  }
}

export default Env
global.Env = Env

