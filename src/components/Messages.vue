<template>
<div>

    <!--
      Replace following "div" with
      "<router-view class="layout-view">" component
      if using subRoutes
    -->

    <message v-for="(message,key) in messages" :message="message">

  </message>
 </div> 
</template>
<script>
import Quasar from 'quasar'
// import firebase from 'firebase'
import {fbdb, fbstorage} from '../main.js'
// import modelMessages from '../api/Messages.js'
import message from 'components/Message.vue'
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
    message: message
  },
  created () {
    // this.messagesRef = fbdb.ref('messages')
    console.log('messages', this.messages)
  },
  firebase: {
    // messagelist: fbdb.ref('messages'),
    messages: messagesRef.limitToLast(20)
  },
  props: ['messagetext'],
  computed: {
    // a computed getter
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
            console.log('firbase image url', metadata.downloadURLs[0])
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
      messagetext1: '',
      messages5: this.getMsgs(),
      showImage: false,
      myimage: '',
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
    getMsgs: function (key) {
      var msg = this.messages[key]
      return msg
    },
    getHello: function () {
      return 'hello'
    },
    getTest: function (image) {
      var img = this.getImageUrl(image)
      console.log('img', img)
      return img
    },
    getImageUrl: function (imageUri) {
      // If the image is a Firebase Storage URI we fetch the URL.
      if (imageUri) {
        this.showImage = true
        if (imageUri.startsWith('gs://')) {
          // var loadingimg = LOADING_IMAGE_URL // Display a loading image first.
          fbstorage.refFromURL(imageUri).getMetadata().then(function (metadata) {
            // this.$set(img)
            let img = metadata.downloadURLs[0]
            console.log('firbase image url', metadata.downloadURLs[0])
            return img
          })
        }
        else {
          return imageUri
        }
      }
      else {
        this.showImage = false
        return ''
      }
    }

  }
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
