<template>
<div>

    <!--
      Replace following "div" with
      "<router-view class="layout-view">" component
      if using subRoutes
    -->
 <div class="layout-padding">


 <div v-for="(message,key) in messages" :messagetext="message.text">
      <div class="card">
        <div class="item two-lines">
          <img class="item-primary" :src="message.photoUrl|| ~assets/profile_placeholder.png">
          <div class="item-content">
            <div>{{message.name}}</div>
            <div>Web Developer</div>
          </div>
        </div>
       getHello: {{getHello()}}<br>
       getMsgs: {{getMsgs(key)}}<br>
       messagetext: {{this.messagetext}}<br>
       key: {{key}}<br>
       test compute: {{this.testCompute}}<br>
       this.itemdata: {{this.itemData}}<br>
       message.id: {{message.key}}

        <a :href="getImageUrl(message.imageUrl)"></a>
       <div v-if="message.imageUrl"> 
       message.imageURL: {{message.imageUrl}}
       <p> image {{getImageUrl(message.imageUrl)}}</p>
       <p> test: {{getTest(message.imageUrl)}}</p>
       <img class="item-primary" :src="getImageUrl(message.imageUrl)">
       </div>

        <div class="card-content" v-show="message.text">
        {{message.text}}
        </div>
        <div class="card-actions">
          <div class="text-primary">
            <i>thumb_up</i> 11k likes
          </div>
          <div class="text-primary">
            <i>mode_comment</i> 8 comments
          </div>
          <div class="auto"></div>
          <div class="text-grey-6">
            23 minutes ago.
          </div>
          
          <button class="primary glossy" @click="$refs.modal.open()">
           Launch
           </button>
        </div>
      </div>
  </div>
  </div>
 

<q-modal ref="modal" class="maximized">
  <q-slider arrows dots class="text-white full-height">
    <div slot="slide" class="bg-primary centered">
      <h1>Slide 1</h1>
       <img src="~assets/mountains.jpg">
      <button class="dark glossy" @click="$refs.modal.close()">Close Me</button>
    </div>
    <div slot="slide" class="bg-secondary centered">
      <h1>Slide 2</h1>
      <img src="~assets/quasar-logo.png">
      <button class="dark glossy" @click="$refs.modal.close()">Close Me</button>
    </div>
    <div slot="slide" class="bg-tertiary centered">
      <h1>Slide 3</h1>
      <button class="dark glossy" @click="$refs.modal.close()">Close Me</button>
    </div>
  </q-slider>
</q-modal>
    <div class="layout-padding">
     <h3> Display memos: <h3>
     <div v-for ="message in messages">
      <h6>text: {{ message.text }}</h6>    
      <p>name: {{message.name}}</p>
      <p>imageUrl: {{message.imageUrl}}</p>
      <p>photoUrl: {{message.photoUrl}}</p>
      <p>msgTS: {{message.msgTS}}</p>
      <p>msgDT: {{message.msgDT}}</p>
    
     </div> 
    </div>



 </div> 
</template>
<script>
import Quasar from 'quasar'
// import firebase from 'firebase'
import {fbdb, fbstorage} from '../main.js'
// import modelMessages from '../api/Messages.js'

let messagesRef = fbdb.ref('messages')
/*  <my-component
 v-for="(item, index) in items"
  v-bind:item="item"
  v-bind:index="index">
</my-component>
*/
export default {
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
