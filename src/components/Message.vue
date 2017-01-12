<template>
<div>
 <div class="layout-padding">

     <div class="card">
        <div class="item two-lines">
          <img class="item-primary" :src="message.photoUrl|| ~assets/profile_placeholder.png">
          <div class="item-content">
            <div>{{message.name}}</div>
            <div>Web Developer</div>
          </div>
        </div>
        <img class="item-primary" :src="imgData" v-if="imgData">
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
</template>
<script>
/*
import Compname from 'components/Compname.vue'
*/
import {fbstorage} from '../main.js'
export default {
  // componenents: {compname: Compname},
  name: 'message',
  created: function () {
    try {
      this.dataLoading = true
      // data.createList()
    }
    catch (err) {
      console.log(err)
    }
    finally {
      this.dataLoading = false
    }
  },
  props: ['message'],
  data: function () {
    return {
      data: [],
      dataLoading: false,
      x: 8,
      y: 4,
      imgData: ''
    }
  },
  methods: {
    delay: function () {
      return new Promise(function (resolve) {
        setTimeout(resolve, 10000)
      })
    }
  },
  computed: {
    fbImage: function () {
      // If the image is a Firebase Storage URI we fetch the URL.
      var _this = this
      if (this.message.imageUrl) {
        var imgURL = this.message.imageUrl
        if (imgURL.startsWith('gs://')) {
          // var loadingimg = LOADING_IMAGE_URL // Display a loading image first.
          fbstorage.refFromURL(imgURL).getMetadata().then(function (metadata) {
            // this.$set(img)
            let img = metadata.downloadURLs[0]
            // console.log('firbase image url', metadata.downloadURLs[0])
            _this.imgData = img
            return img
          })
        }
        else {
          return imgURL
        }
      }
      else {
        return ''
      }
    },
    computeThis: function () {
      return this.item.toLowerCase()
    }
  },
  asyncComputed: {
    sum1: {
      get () {
        const total1 = this.x + this.y
        return this.delay().then(function () {
          return total1
        })
      },
      default: 'loading'
    },
    sum () {
      const total = this.x + this.y
      return new Promise(resolve =>
        setTimeout(() => resolve(total, 50000))
      )
    },
    img1 () {
      return new Promise(resolve =>
        this.fbImage
      )
    },
    img2: {
      get () {
        return new Promise(resolve =>
          fbstorage.refFromURL(this.message.imageUrl).getMetadata().then(function (metadata) {
            // this.$set(img)
            const img = metadata.downloadURLs[0]
            console.log('firbase image url img2', img)
            // return new Promise(resolve =>
            //   setTimeout(() => resolve(img, 10))
            // )
            return img
          })
        )
      }
    }
  },
  watch: {
    imgData: function (val, oldVal) {
      console.log('new, old', val, oldVal)
    }
  }
  /*
  destroyed: function() {
    //  code here
  } */
}
</script>
<style scoped> 
</style> 