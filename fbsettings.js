/*
   enter settings for firebase and save as fbsettings.js
   reference in main.js:
    import Env from './../fbsettings'
    var firebaseApp = Firebase.initializeApp(Env.firebase)
    (exclude from git )
*/
const Env = {
  firebase: {
    apiKey: 'AIzaSyChfae1T55vJ_rFwfX_AMLlX_p30SZxRq4',
    authDomain: 'simonsonchat.firebaseapp.com',
    databaseURL: 'https://simonsonchat.firebaseio.com',
    storageBucket: 'simonsonchat.appspot.com',
    messagingSenderId: '283119063703'
  }
}

export default Env
global.Env = Env

