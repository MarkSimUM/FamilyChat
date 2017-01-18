<template>
  <div>
    <div v-if="!image">
        <div class="dropzone-area" drag-over="handleDragOver" @dragenter="hovering = true" @dragleave="hovering = false" :class="{'hovered': hovering}">
            <div class="dropzone-text">
                <span class="dropzone-title">Drop image here or click to select</span>
                <span class="dropzone-info"></span>
            </div>
            <input type="file" @change="onFileChange">
        </div>
    </div>
    <div class="dropzone-preview">
   
        <small v-if="image">  filename: {{filename}} </small>
        <img :src="image" width="80%"  />

       
       <button class="red" @click="removeImage" v-if="image">Remove</button>
      
 
   </div>  
  </div>
</template>
<script>
// import Compname from 'components/Compname.vue'
import {eventBus} from '../main.js'
export default {
  // componenents: {compname: Compname},
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
  /* props: ['propdata'], */
  data: function () {
    return {
      image: '',
      hovering:false,
      filename: ''
    }
  },
methods: {
  onFileChange(e) {
     var files = e.target.files || e.dataTransfer.files
     if (!files.length) return
        this.createImage(files[0])

  },
  createImage(file) {
    var _this = this
    _this.filename = file.name
    console.log('filetype: ',file.type)
    // console.log('file', file.name)
    var image = new Image()
    var reader = new FileReader()
    var vm = this
    reader.onload = (e) => {
      vm.image = e.target.result
      // _this.newImage(_this.filename)
      eventBus.$emit('add-image',  vm.image)
      eventBus.$emit('add-imagefile', file)
      // console.log('eventbus$emit: add-imagefile', file.name)
    }
    reader.readAsDataURL(file)
  },
  removeImage: function (e) {
    this.image = ''
    this.filename = ''
    eventBus.$emit('remove-image')
  },
  newImage: function (filename) {
    return filename
  }
}  
 
  /*
  computed: {
    computeThis: function() {
       return this.item.toLowerCase()
    }
  } */
  /*
  watch: {
    endpoint: function () {
      this.data = []
    }
  }, */
  /*
  destroyed: function() {
    //  code here
  } */
}
</script>
<style scoped> 
.dropzone-area {
    width: 100%;
    height: 200px;
    position: relative;
    border: 2px dashed #CBCBCB;
    &.hovered {
        border: 2px dashed #2E94C4;
        .dropzone-title {
          color: #1975A0;
        }

    }
}

.dropzone-area input {
    position: absolute;
    cursor: pointer;
    top: 0px;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
}

.dropzone-text {
    position: absolute;
    top: 50%;
    text-align: center;
    transform: translate(0, -50%);
    width: 100%;
    span {
        display: block;
        font-family: Arial, Helvetica;
        line-height: 1.9;
    }
}

.dropzone-title {
    font-size: 13px;
    color: #787878;
    letter-spacing: 0.4px;
}
.dropzone-info {
    font-size: 13px;
    font-size: 0.8125rem;
    color: #A8A8A8;
    letter-spacing: 0.4px;
}

.dropzone-button {
    position: absolute;
    top: 10px;
    right: 10px;
    display: none;
}

.dropzone-preview {
    width: 80%;
    position: relative;
    &:hover .dropzone-button {
        display: block;
    }
    img {
      display: block;
      
      height: auto;
   
      max-width: 100%;
    }
    
}
</style> 