<template>
<div>

    <!--
      Replace following "div" with
      "<router-view class="layout-view">" component
      if using subRoutes
    -->
    <div class="layout-padding">
     <div class="card">    
     <div class="card-title bg-green text-white">
      {{currentUser.displayName}}
      </div>
        <div class="card-content">
          <textarea  style="width: 100%" class="form-control" rows="1" placeholder="Write your message here!" 
                    v-model="newMsg"></textarea>
        </div>

        <div class="card-actions">
           <button @click="addImage = !addImage"> <i>attachment</i></button>

         
    <!--  <button @click="addImgMsg()"> <i>test addimgmsg</i></button> -->
           <button class="primary push full-width small" @click='addMsg()' v-if="!imageFile"> <i>comment</i> Post!</button>
           <button class="primary push full-width small" @click='addImgMsg()' v-if="imageFile"> <i>comment</i> Post with Image</button>
        </div>   
         <upload-image help="Specific requirements for this dropzone"  v-if="addImage"></upload-image>
          <button @click="addImage = false" v-if="addImage">close picture</button>
     </div>     

    </div>
    <message v-for="(message,key) in messagesSorted" :message="message">
    </message>
 </div> 
</template>
<script>
import Quasar from 'quasar'
// import firebase from 'firebase'
import {fbdb, fbstorage, eventBus} from '../main.js'
// import modelMessages from '../api/Messages.js'
import message from 'components/Message.vue'
import Vue from 'vue'
import uploadImage from 'components/UploadImage'
let messagesRef = fbdb.ref('messages')

/*
  <my-component
 v-for="(item, index) in items"
  v-bind:item="item"
  v-bind:index="index">
</my-component>
*/
export default {
  components: {
    message: message,
    Vue: Vue,
    uploadImage: uploadImage
  },
  created () {
    // this.messagesRef = fbdb.ref('messages')
    var _this = this
    // console.log('messages', this.messages)
    eventBus.$on('add-image', function (img) {
      _this.image = img
     //  console.log('this.image',img)
    })
    eventBus.$on('add-imagefile', function (imgfile) {
      _this.imageFile = imgfile
      console.log('event.$on add-imagefile', imgfile.name)
    })
    eventBus.$on('remove-image', function () {
      _this.imageFile = ''
      _this.image = ''
      console.log('event.$on remove-image')
    })
  },
  firebase: {
    // messagelist: fbdb.ref('messages'),
    // messages.sort(sort_by('msgTS', false, parseInt))
    messages: messagesRef.limitToLast(20)
  },
  props: ['messagetext'],
  computed: {
    // a computed getter
    user: function () {
      // return Vue.auth.getAuth()
      console.log('vue.auth.getToken', Vue.auth.getToken())
      this.currentUser = Vue.auth.getToken()
      return Vue.auth.getToken() 
      // return this.currentUserComp
    },
    messagesSorted: function () {
      return this.messages.sort(this.sort_by('msgTS', true, parseInt))
    },
    testCompute: function () {
      return 'test'
    },
    imageCompute: function () {
      // `this` points to the vm instance
      var imgUrl = this.itemData.imageUrl
      if (imgUrl) {
        if (imgUrl.startsWith('gs://')) {
          // var loadingimg = LOADING_IMAGE_URL // Display a loading image first.
          fbstorage.refFromURL(imgUrl).getMetadata().then(function (metadata) {
            let img = metadata.downloadURLs[0]
           // console.log('firbase image url', metadata.downloadURLs[0])
            return img
          })
        }
        else {
          return imgUrl
        }
      }
    },
    imageUrlCompute: function () {
      // If the image is a Firebase Storage URI we fetch the URL.
      var msg = this.messages
      return msg
    }
 
  },
  data () {
    return {
      // messages: {},
      image: {},
      imageFile: '',
      file: '',
      filename: '',
      newMsg: '',
      currentUser: '',
      addImage: false ,
      showImage: false,
      quasarVersion: Quasar.version,
      newMessage: {
        name: '',
        text: ''
      },
      gallery: [
        '`assets/mountains.jpg',
        '/assets/quasar-logo.png'
      ]
    }
  },
  methods: {
    setFilename (event) { 
      this.filename = event.target.name
    },
    getImageFile () {
      var file = event.target.files[0]
      // console.log('filename:', file.name)
    },
    getMsgs: function (key) {
      var msg = this.messages[key]
      return msg
    },
    addMsg (imageUrl) {
      var _this = this
      var name = _this.user.displayName
      if (!name) {
        name = _this.user.email
      }
      var nowTS = Date.now() // Unix Timestamp
      var nowDT = new Date(nowTS)
      var nowDTString = nowDT.toString()
      messagesRef.push({
        name: name,
        text: _this.newMsg,
        // photoUrl: _this.user.photoURL || '/images/profile_placeholder.png',
        imageUrl: imageUrl || '',
        photoUrl: _this.user.photoURL || 'https://lh3.googleusercontent.com/-zlm-dt5DLZ4/AAAAAAAAAAI/AAAAAAAAAAA/DwcwNnOZbIg/s120-c/photo.jpg',
        // https://lh3.googleusercontent.com/-zlm-dt5DLZ4/AAAAAAAAAAI/AAAAAAAAAAA/DwcwNnOZbIg/s120-c/photo.jpg
        msgDT: nowDTString,
        msgTS: nowTS
      }).catch(function (error) {
        console.error('Error writing new message to Firebase Database', error)
      })
      _this.newMsg = ''
      // modelMsg.postMsg(this.newMsg)
    },
    putImgPath(path, file) {
       return new Promise((resolve, reject) => {
        fbstorage.ref(path).put(file, {contentType: file.type})
        .then(response => resolve(response))
        .catch(() => reject)
      })
    },
    addImgMsg () {
      var _this = this
      const user = _this.user
      var name = _this.user.displayName
      const file = _this.imageFile 
      if (!file.type.match('image.*')) {
        console.log('Error! Not an image file')
        return
      }
      if (!name) {
        name = user.email
      }
      // _this.$bindAsObject('user', myFirebaseRef.child('user'))
      // var ref = fbstorage.ref(user.uid + '/' + Date.now() + '/' + file.name).put(file, {contentType: file.type})
      this.putImgPath(user.uid + '/' + Date.now() + '/' + file.name, file).then((response) => {
        var uri = 'gs://simonsonchat.appspot.com/'+response.metadata.fullPath
        _this.addMsg(uri);
      })
     
     
      /*      return new Promise((resolve, reject) => {
              fbstorage.ref(user.uid + '/' + Date.now() + '/' + file.name).put(file, {contentType: file.type})
              .then(response => resolve(response))
              .catch(() => reject)
            })
      */      
      return
    },
    /* eslint-disable no-return-assign */
    sort_by (field, reverse, primer) {
      // parseFloat, parseInt
      // function(a){return a.toUpperCase()}
      // users.sort(sort_by('dateTS', false, parseInt))
      var key = primer
      ? function (x) { return primer(x[field]) }
      : function (x) { return x[field] }

      reverse = !reverse ? 1 : -1
      return function (a, b) {
        return a = key(a) , b = key (b) , reverse * ((a > b) - (b > a))
      }
    }
  }
  /*
  asyncComputed: {
    currentUserComp () {
      return new Promise(resolve =>
        Vue.auth.getAuth()
      )
    }
  }
  */

}
</script>

<style lang="styl">
.logo-container
  width 192px
  height 268px
  perspective 800px
  position absolute
  top 50%
  left 50%
  transform translateX(-50%) translateY(-50%)
.logo
  position absolute
  transform-style preserve-3d
</style>
